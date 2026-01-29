import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { testDatabaseConnection } from "./db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// SEO: Serve sitemap XML files from /client/public folder and /client/public/sitemaps
app.get("/sitemap*.xml", (req, res) => {
  let filePath = path.join(__dirname, "../client/public", req.path);
  res.setHeader("Content-Type", "application/xml");
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("Sitemap not found");
    }
  });
});

app.get("/sitemaps/*", (req, res) => {
  const filePath = path.join(__dirname, "../client/public", req.path);
  res.setHeader("Content-Type", "application/xml");
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("Sitemap not found");
    }
  });
});

// SEO: Serve robots.txt from /client/public folder
app.get("/robots.txt", (_req, res) => {
  const filePath = path.join(__dirname, "../client/public/robots.txt");
  res.setHeader("Content-Type", "text/plain");
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("robots.txt not found");
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
