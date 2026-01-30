import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { criticalCssPlugin } from "./vite-plugin-critical-css";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    criticalCssPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // React core - loaded first, cached long-term
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-helmet-async') || id.includes('scheduler')) {
              return 'react-vendor';
            }
            // UI components
            if (id.includes('@radix-ui')) {
              return 'ui';
            }
            // Icons - deferred
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'icons';
            }
            // Forms - only on form pages
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
              return 'forms';
            }
            // Animations - deferred
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            // Carousel - isolated to reduce reflow impact
            if (id.includes('embla-carousel')) {
              return 'carousel';
            }
            return 'vendor';
          }
          // Split large static data into separate lazy chunks
          if (id.includes('blogData') || id.includes('BlogPostsSimple')) {
            return 'blogData';
          }
          if (id.includes('destinationsData')) {
            return 'destinationsData';
          }
          if (id.includes('travelStyleData')) {
            return 'travelStyleData';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
    },
    chunkSizeWarningLimit: 600,
    target: 'es2020',
    reportCompressedSize: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
