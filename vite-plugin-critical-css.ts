import type { Plugin, UserConfig } from 'vite';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export function criticalCssPlugin(): Plugin {
  let isBuild = false;
  return {
    name: 'vite-plugin-critical-css',
    configureServer(server) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const origEnd = res.end;
        res.end = function (...args: any[]) {
          const ct = res.getHeader('content-type');
          if (ct && typeof ct === 'string' && ct.includes('text/html')) {
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
          }
          return origEnd.apply(this, args);
        };
        next();
      });
    },
    config(config: UserConfig, { command }) {
      isBuild = command === 'build';

      if (!config.resolve) config.resolve = {};
      config.resolve.dedupe = ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'];

      if (!isBuild) {
        if (!config.optimizeDeps) config.optimizeDeps = {};
        config.optimizeDeps.noDiscovery = true;
        config.optimizeDeps.include = [
          'react',
          'react-dom',
          'react-dom/client',
          'react/jsx-runtime',
          'react/jsx-dev-runtime',
          'wouter',
          '@tanstack/react-query',
          'react-hook-form',
          '@hookform/resolvers/zod',
          'zod',
          'drizzle-orm',
          'drizzle-orm/pg-core',
          'drizzle-zod',
          'class-variance-authority',
          'clsx',
          'tailwind-merge',
          'lucide-react',
          'react-icons/si',
          'date-fns',
          'date-fns/locale',
          'react-day-picker',
          '@radix-ui/react-accordion',
          '@radix-ui/react-aspect-ratio',
          '@radix-ui/react-avatar',
          '@radix-ui/react-dialog',
          '@radix-ui/react-dropdown-menu',
          '@radix-ui/react-label',
          '@radix-ui/react-popover',
          '@radix-ui/react-scroll-area',
          '@radix-ui/react-select',
          '@radix-ui/react-slot',
          '@radix-ui/react-tabs',
          '@radix-ui/react-toast',
          '@radix-ui/react-tooltip',
        ];
      }

      if (isBuild) {
        const output = config.build?.rollupOptions?.output;
        if (output && !Array.isArray(output) && typeof output.manualChunks === 'function') {
          output.manualChunks = (id: string) => {
            if (id.includes("node_modules")) {
              if (
                id.includes("/react/") ||
                id.includes("/react-dom/") ||
                id.includes("/react-dom.") ||
                id.includes("/scheduler/")
              ) {
                return "react-vendor";
              }
            }
            if (id.includes("blogData") || id.includes("BlogPostsSimple")) return "blogData";
            if (id.includes("destinationsData")) return "destinationsData";
            if (id.includes("travelStyleData")) return "travelStyleData";
          };
        }
      }
    },
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        if (!isBuild) return html;
        try {
          const criticalCssPath = resolve(process.cwd(), 'client/src/critical.css');
          const criticalCss = readFileSync(criticalCssPath, 'utf-8');

          const cssLinkRegex = /<link[^>]+rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/gi;

          let modifiedHtml = html.replace(cssLinkRegex, (match, cssPath) => {
            return `<!-- Critical CSS Inlined -->
    <style>${criticalCss}</style>

    <!-- Load full CSS asynchronously -->
    <link rel="preload" href="${cssPath}" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${cssPath}"></noscript>`;
          });

          const loadCssScript = `
    <script>
      !function(e){"use strict";var t=function(t,n,r,o){var i,a=e.document,d=a.createElement("link");if(n)i=n;else{var l=(a.body||a.getElementsByTagName("head")[0]).childNodes;i=l[l.length-1]}var s=a.styleSheets;if(o)for(var c in o)o.hasOwnProperty(c)&&d.setAttribute(c,o[c]);d.rel="stylesheet",d.href=t,d.media="only x",function e(t){if(a.body)return t();setTimeout(function(){e(t)})}(function(){i.parentNode.insertBefore(d,n?i:i.nextSibling)});var f=function(e){for(var t=d.href,n=s.length;n--;)if(s[n].href===t)return e();setTimeout(function(){f(e)})};return d.addEventListener&&d.addEventListener("load",function(){this.media=r||"all"}),d.onloadcssdefined=f,f(function(){d.media!==r&&(d.media=r)}),d};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this);
    </script>`;

          modifiedHtml = modifiedHtml.replace('</head>', `${loadCssScript}\n  </head>`);

          return modifiedHtml;
        } catch (error) {
          console.warn('Critical CSS plugin warning:', error);
          return html;
        }
      }
    }
  };
}
