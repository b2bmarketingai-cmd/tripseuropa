import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import path from "path";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { testDatabaseConnection } from "./db";

// Use process.cwd() for production compatibility (works in both ESM and CJS)
const __dirname = process.cwd();

const app = express();

// Trust proxy for correct protocol detection behind reverse proxies
app.set('trust proxy', true);

// WWW to non-WWW redirect and HTTP to HTTPS redirect (for production)
app.use((req, res, next) => {
  const host = req.get('host') || '';
  const isProduction = process.env.NODE_ENV === 'production' || 
    host.endsWith('tripseuropa.com') || 
    host.endsWith('tripseuropa.co') ||
    host.endsWith('.replit.app');
  
  // Redirect www to non-www and ensure HTTPS in production
  if (host.startsWith('www.')) {
    const newHost = host.replace('www.', '');
    return res.redirect(301, `https://${newHost}${req.originalUrl}`);
  }
  
  // Force HTTPS in production
  if (isProduction && req.protocol === 'http') {
    return res.redirect(301, `https://${host}${req.originalUrl}`);
  }
  
  // Redirect legacy query param URLs to proper paths
  if (req.query.lang) {
    const lang = req.query.lang as string;
    const path = req.path;
    
    // Build the correct language prefix
    let langPrefix = '';
    if (lang === 'en') langPrefix = '/en';
    else if (lang === 'pt' || lang === 'pt-br') langPrefix = '/pt-br';
    else if (lang === 'es') langPrefix = ''; // Spanish is default
    
    // Handle common paths
    if (langPrefix && (path === '/destinos' || path === '/destinations')) {
      return res.redirect(301, `${langPrefix}/destinations`);
    }
    if (langPrefix && (path === '/paquetes' || path === '/packages')) {
      return res.redirect(301, `${langPrefix}/packages`);
    }
    if (langPrefix && path === '/blog') {
      return res.redirect(301, `${langPrefix}/blog`);
    }
    if (langPrefix && path === '/contact') {
      return res.redirect(301, `${langPrefix}/contact`);
    }
  }
  
  // Redirect /blog/:slug to /blog/post/:slug for canonical consistency (all locales)
  const blogCategories = ['colombia', 'argentina', 'peru', 'panama', 'costa-rica', 'dominicana', 'caribe', 'mexico', 'brasil', 'post'];
  
  // Root /blog/:slug
  const blogMatch = req.path.match(/^\/blog\/([a-z0-9-]+)$/);
  if (blogMatch && !blogCategories.includes(blogMatch[1])) {
    return res.redirect(301, `/blog/post/${blogMatch[1]}`);
  }
  
  // Locale-specific blog redirects: /es/blog/:slug, /en/blog/:slug, /pt-br/blog/:slug, etc.
  const localeBlogMatch = req.path.match(/^\/(es|en|pt-br|es-co|es-mx|es-ar|es-pe|es-cr|es-pa|es-do|en-br|en-ar|en-co|en-mx)\/blog\/([a-z0-9-]+)$/);
  if (localeBlogMatch && !blogCategories.includes(localeBlogMatch[2])) {
    const locale = localeBlogMatch[1];
    const slug = localeBlogMatch[2];
    return res.redirect(301, `/${locale}/blog/post/${slug}`);
  }
  
  next();
});

// Enable GZIP compression for all responses
app.use(compression());

// Security headers middleware
app.use((_req, res, next) => {
  // Content Security Policy - balanced for functionality and security
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://js.stripe.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: blob: https:; " +
    "connect-src 'self' https://api.stripe.com https://api.openai.com https://ipapi.co https://*.replit.dev https://*.replit.app wss://*.replit.dev; " +
    "frame-src 'self' https://js.stripe.com; " +
    "object-src 'none'; " +
    "base-uri 'self'"
  );
  // HTTP Strict Transport Security
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Referrer Policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

// Health check endpoint - must be registered before other middleware
let isServerReady = false;

app.get("/health", async (_req, res) => {
  try {
    const dbHealthy = await testDatabaseConnection();
    if (isServerReady && dbHealthy) {
      res.status(200).json({ 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        database: "connected"
      });
    } else {
      res.status(503).json({ 
        status: "unhealthy", 
        ready: isServerReady,
        database: dbHealthy ? "connected" : "disconnected"
      });
    }
  } catch (error) {
    res.status(503).json({ 
      status: "error", 
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// Simple readiness probe
app.get("/ready", (_req, res) => {
  if (isServerReady) {
    res.status(200).send("OK");
  } else {
    res.status(503).send("Not Ready");
  }
});

// SEO: Serve sitemap XML files - check both dist/public and client/public
app.get("/sitemap*.xml", (req, res) => {
  const prodPath = path.join(__dirname, "dist/public", req.path);
  const devPath = path.join(__dirname, "client/public", req.path);
  res.setHeader("Content-Type", "application/xml");
  
  // Try production path first, then development path
  res.sendFile(prodPath, (err) => {
    if (err) {
      res.sendFile(devPath, (devErr) => {
        if (devErr) {
          res.status(404).send("Sitemap not found");
        }
      });
    }
  });
});

app.get("/sitemaps/*", (req, res) => {
  const prodPath = path.join(__dirname, "dist/public", req.path);
  const devPath = path.join(__dirname, "client/public", req.path);
  res.setHeader("Content-Type", "application/xml");
  
  res.sendFile(prodPath, (err) => {
    if (err) {
      res.sendFile(devPath, (devErr) => {
        if (devErr) {
          res.status(404).send("Sitemap not found");
        }
      });
    }
  });
});

// SEO: Serve robots.txt
app.get("/robots.txt", (_req, res) => {
  const prodPath = path.join(__dirname, "dist/public/robots.txt");
  const devPath = path.join(__dirname, "client/public/robots.txt");
  res.setHeader("Content-Type", "text/plain");
  
  res.sendFile(prodPath, (err) => {
    if (err) {
      res.sendFile(devPath, (devErr) => {
        if (devErr) {
          res.status(404).send("robots.txt not found");
        }
      });
    }
  });
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

async function startServer() {
  try {
    log("Starting server initialization...");
    
    // Test database connection before starting
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      log("Warning: Database connection failed, some features may not work");
    }

    await registerRoutes(httpServer, app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      log(`Error: ${message} (status: ${status})`);
      res.status(status).json({ message });
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (process.env.NODE_ENV === "production") {
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(
      {
        port,
        host: "0.0.0.0",
        reusePort: true,
      },
      () => {
        isServerReady = true;
        log(`serving on port ${port}`);
      },
    );
  } catch (error) {
    log(`Fatal error during server startup: ${error instanceof Error ? error.message : String(error)}`);
    console.error(error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  log(`Uncaught Exception: ${error.message}`);
  console.error(error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  log(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  console.error(reason);
});

startServer();
