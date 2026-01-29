import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static files with aggressive caching for immutable assets
  app.use(express.static(distPath, {
    maxAge: '1y', // Cache for 1 year (assets have hashed filenames)
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      // Immutable cache for hashed assets (JS, CSS bundles)
      if (filePath.match(/\.(js|css)$/) && filePath.includes('assets')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      // Long cache for images
      else if (filePath.match(/\.(png|jpg|jpeg|gif|webp|avif|svg|ico)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=2592000'); // 30 days
      }
      // Short cache for HTML and other files
      else if (filePath.match(/\.(html)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      }
      // XML sitemaps and robots.txt
      else if (filePath.match(/\.(xml|txt)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
