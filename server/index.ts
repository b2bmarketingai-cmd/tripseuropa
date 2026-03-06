import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { testDatabaseConnection } from "./db";
import { serveSitemap } from "./sitemap";

const app = express();

// Health check endpoints (must be before HTTPS redirect middleware)
app.get("/_health", (_req, res) => res.status(200).json({ status: "ok" }));
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
app.get("/", (_req, res, next) => {
  const userAgent = _req.headers['user-agent'] || '';
  const accept = _req.headers.accept || '';
  if (!accept || userAgent.toLowerCase().includes('health') || userAgent.toLowerCase().includes('check')) {
    return res.status(200).json({ status: "ok" });
  }
  next();
});

// SEO: Redirect www -> non-www and http -> https (301 permanent)
app.use((req, res, next) => {
  const host = req.headers.host || '';
  const proto = req.headers['x-forwarded-proto'] || req.protocol;

  // Redirect www to non-www
  if (host.startsWith('www.')) {
    const newHost = host.slice(4);
    return res.redirect(301, `https://${newHost}${req.originalUrl}`);
  }

  // Redirect http to https in production
  if (proto === 'http' && process.env.NODE_ENV === 'production') {
    return res.redirect(301, `https://${host}${req.originalUrl}`);
  }

  next();
});

// SEO: Fix duplicate pages without canonical - redirect to canonical URLs
app.get('/es-co/paquetes', (_req, res) => res.redirect(301, '/paquetes'));
app.get('/en/contact', (_req, res) => res.redirect(301, '/contact'));
app.get('/en-co', (_req, res) => res.redirect(301, '/'));
app.get('/experiences', (_req, res) => res.redirect(301, '/experiencias'));
app.get('/es-co/destinos/:slug', (req, res) => res.redirect(301, `/destinos/${req.params.slug}`));
app.get('/es-pe/destinos/:slug', (req, res) => res.redirect(301, `/destinos/${req.params.slug}`));
app.get('/es-ar/vuelos/:slug', (req, res) => res.redirect(301, `/vuelos/${req.params.slug}`));
app.get('/about', (_req, res) => res.redirect(301, '/sobre-nosotros'));

// Fix: /destinos with ?lang= query string
app.get('/destinos', (req, res, next) => {
  if (req.query.lang) {
    return res.redirect(301, '/destinos');
  }
  next();
});

app.use(compression());

if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    if (req.accepts("html") && !req.path.match(/\.\w+$/)) {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("Surrogate-Control", "no-store");
    }
    next();
  });
}

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=(self)",
  );
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.google-analytics.com https://www.googletagmanager.com https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: http: blob:",
    "connect-src 'self' https://api.openai.com https://www.google-analytics.com https://api.perplexity.ai https://ipapi.co wss:",
    "frame-src 'self' https://www.youtube.com https://player.vimeo.com https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
  res.setHeader("Content-Security-Policy", csp);
  if (
    req.url.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/)
  ) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  } else {
    res.setHeader("Cache-Control", "public, max-age=3600, must-revalidate");
  }
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

// Redirects
app.get("/es-br", (_req, res) => res.redirect(301, "/pt-br"));
app.get("/es-br/*", (req, res) => res.redirect(301, `/pt-br${req.path.slice(6)}`));
app.get("/en-br", (_req, res) => res.redirect(301, "/en"));
app.get("/en-br/*", (req, res) => res.redirect(301, `/en${req.path.slice(6)}`));

app.get("/destination/:slug", (req, res) => {
  const slugMap: Record<string, string> = {
    "italia": "italy",
    "espana": "spain",
    "francia": "france",
    "grecia": "greece",
    "portugal": "portugal",
    "alemania": "germany",
    "suiza": "switzerland",
    "reino-unido": "united-kingdom",
    "paises-bajos": "netherlands",
    "belgica": "belgium",
    "austria": "austria",
    "republica-checa": "czech-republic",
    "turquia": "turkey",
    "croacia": "croatia",
    "polonia": "poland",
    "hungria": "hungary"
  };
  const resolved = slugMap[req.params.slug] || req.params.slug;
  res.redirect(301, `/destinos/${resolved}`);
});

app.get("/package/:slug", (req, res) => res.redirect(301, `/paquetes/${req.params.slug}`));
app.get("/colombia", (_req, res) => res.redirect(301, "/desde-colombia"));
app.get("/mexico", (_req, res) => res.redirect(301, "/desde-mexico"));
app.get("/brasil", (_req, res) => res.redirect(301, "/desde-brasil"));
app.get("/argentina", (_req, res) => res.redirect(301, "/desde-argentina"));
app.get("/peru", (_req, res) => res.redirect(301, "/desde-peru"));
app.get("/panama", (_req, res) => res.redirect(301, "/desde-panama"));
app.get("/costa-rica", (_req, res) => res.redirect(301, "/desde-costa-rica"));
app.get("/venezuela", (_req, res) => res.redirect(301, "/desde-venezuela"));
app.get("/chile", (_req, res) => res.redirect(301, "/desde-chile"));
app.get("/ecuador", (_req, res) => res.redirect(301, "/desde-ecuador"));
app.get("/blog/spain", (_req, res) => res.redirect(301, "/destinos/spain"));
app.get("/uk", (_req, res) => res.redirect(301, "/destinos/united-kingdom"));
app.get("/destinations/uk", (_req, res) => res.redirect(301, "/destinations/united-kingdom"));
app.get("/estilo-de-viaje", (_req, res) => res.redirect(301, "/estilos-de-viaje"));
app.get("/blog/mejores-apps-viajeros", (_req, res) => res.redirect(301, "/blog"));
app.get("/blog/post/mejor-epoca-visitar-europa", (_req, res) => res.redirect(301, "/blog/post/mejor-epoca-europa"));
app.get("/blog/post/documentos-necesarios-viajar-europa", (_req, res) => res.redirect(301, "/blog/post/documentos-viajar-europa"));
app.get("/blog/post/presupuesto-viaje-europa", (_req, res) => res.redirect(301, "/blog/post/presupuesto-viaje-europa-2026"));
app.get("/blog/post/visa-schengen-guia-completa", (_req, res) => res.redirect(301, "/blog/post/visa-schengen-colombianos"));
app.get("/blog/post/mejores-destinos-europa", (_req, res) => res.redirect(301, "/blog/post/mejores-destinos-europa-presupuesto"));
app.get("/blog/post/consejos-primera-vez-europa", (_req, res) => res.redirect(301, "/blog/post/primera-vez-europa"));
app.get("/blog/post/visa-schengen-colombia-2025", (_req, res) => res.redirect(301, "/blog/post/visa-schengen-colombianos"));
app.get("/blog/post/guia-viaje-espa%C3%B1a", (_req, res) => res.redirect(301, "/blog/post/guia-viaje-espana"));
app.get("/blog/post/budapest-ba%C3%B1os-termales", (_req, res) => res.redirect(301, "/blog/post/budapest-banos-termales"));
app.get("/last-minute", (_req, res) => res.redirect(301, "/ofertas-ultima-hora"));
app.get("/testimonials", (_req, res) => res.redirect(301, "/testimonios"));
app.get("/es-caribe", (_req, res) => res.redirect(301, "/es-cb"));
app.get("/es-caribe/*", (req, res) => res.redirect(301, `/es-cb${req.path.slice(10)}`));
app.get("/es/caribe", (_req, res) => res.redirect(301, "/es-cb"));
app.get("/es/caribe/*", (req, res) => res.redirect(301, `/es-cb${req.path.slice(10)}`));
app.get("/terms", (_req, res) => res.redirect(301, "/terminos-condiciones"));
app.get("/politica-cancelacion", (_req, res) => res.redirect(301, "/condiciones-venta"));
app.get("/offers/:slug", (req, res) => res.redirect(301, `/ofertas/${req.params.slug}`));

app.use((req, res, next) => {
  const match = req.path.match(/^(\/pt-br)(\/pt-br)+(\/.*)?$/);
  if (match) {
    const remaining = match[3] || "";
    return res.redirect(301, `/pt-br${remaining}`);
  }
  next();
});

app.use((req, res, next) => {
  const malformedMatch = req.path.match(/^\/((?:pt|en|es)(?:-br){2,})(\/.*)?$/);
  if (malformedMatch) {
    const prefix = malformedMatch[1];
    const rest = malformedMatch[2] || '';
    let cleanPrefix = '';
    if (prefix.startsWith('pt')) cleanPrefix = '/pt-br';
    else if (prefix.startsWith('en')) cleanPrefix = '/en';
    const query = req.originalUrl.includes('?') ? req.originalUrl.substring(req.originalUrl.indexOf('?')) : '';
    return res.redirect(301, `${cleanPrefix}${rest}${query}` || '/');
  }
  next();
});

let isServerReady = false;

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
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      log("Warning: Database connection failed");
    }
    app.get("/sitemap.xml", serveSitemap);
    await registerRoutes(httpServer, app);
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`Error: ${message} (status: ${status})`);
      res.status(status).json({ message });
    });

    if (process.env.NODE_ENV === "production") {
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    const port = parseInt(process.env.PORT || "80", 10);
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
    log(
      `Fatal error during server startup: ${error instanceof Error ? error.message : String(error)}`,
    );
    console.error(error);
    process.exit(1);
  }
}

process.on("uncaughtException", (error) => {
  log(`Uncaught Exception: ${error.message}`);
  console.error(error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  log(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  console.error(reason);
});

startServer();
