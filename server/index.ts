import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { testDatabaseConnection } from "./db";

const app = express();

// Enable GZIP compression for all responses
app.use(compression());
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

// SEO Redirects: Canonical URL handling, slug aliases, and query param fixes
app.use((req, res, next) => {
  const host = req.headers.host || '';
  const path = req.path;
  const query = req.query;

  // 1. Redirect www to non-www (301 permanent)
  if (host.startsWith('www.')) {
    const newHost = host.replace('www.', '');
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    return res.redirect(301, `${protocol}://${newHost}${req.originalUrl}`);
  }

  // 2. Redirect HTTP to HTTPS (when behind proxy)
  const forwardedProto = req.headers['x-forwarded-proto'];
  if (forwardedProto === 'http' && process.env.NODE_ENV === 'production') {
    return res.redirect(301, `https://${host}${req.originalUrl}`);
  }

  // 3. Redirect query parameter lang to path-based locale
  if (query.lang && typeof query.lang === 'string') {
    const lang = query.lang.toLowerCase();
    const cleanPath = path.replace(/\/$/, '') || '/';
    const langMap: Record<string, string> = {
      'en': '/en',
      'es': '/es',
      'pt': '/pt-br',
      'pt-br': '/pt-br'
    };
    const prefix = langMap[lang];
    if (prefix) {
      // Remove lang from query and redirect
      const newPath = cleanPath === '/' ? prefix : `${prefix}${cleanPath}`;
      return res.redirect(301, newPath);
    }
  }

  // 4. Spanish destination slug aliases → English slugs
  const slugAliases: Record<string, string> = {
    'belgica': 'belgium',
    'francia': 'france',
    'alemania': 'germany',
    'italia': 'italy',
    'espana': 'spain',
    'holanda': 'netherlands',
    'suiza': 'switzerland',
    'austria': 'austria',
    'grecia': 'greece',
    'portugal': 'portugal',
    'irlanda': 'ireland',
    'escocia': 'scotland',
    'croacia': 'croatia',
    'hungria': 'hungary',
    'republica-checa': 'czech-republic',
    'noruega': 'norway',
    'suecia': 'sweden',
    'dinamarca': 'denmark',
    'finlandia': 'finland',
    'turquia': 'turkey'
  };

  // Check if path contains a destination slug that needs aliasing
  const destinoMatch = path.match(/\/(destinos|destinations)\/([^\/]+)/);
  if (destinoMatch) {
    const slug = destinoMatch[2].toLowerCase();
    if (slugAliases[slug]) {
      const newPath = path.replace(`/${destinoMatch[2]}`, `/${slugAliases[slug]}`);
      return res.redirect(301, newPath);
    }
  }

  // 5. Fix blog URL pattern: /blog/slug → /blog/post/slug
  const blogMatch = path.match(/^(\/(?:es|en|pt-br|es-co|es-mx|es-ar|es-pe|es-pa|es-cr|es-do|en-br|en-co|en-mx)?)?\/blog\/([^\/]+)$/);
  if (blogMatch && blogMatch[2] !== 'post' && !['colombia', 'argentina', 'peru', 'panama', 'costa-rica', 'dominicana', 'caribe', 'mexico', 'brasil'].includes(blogMatch[2])) {
    const prefix = blogMatch[1] || '';
    const slug = blogMatch[2];
    return res.redirect(301, `${prefix}/blog/post/${slug}`);
  }

  next();
});

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
