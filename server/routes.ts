import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // 1. Setup Integrations
  await setupAuth(app);
  registerAuthRoutes(app);
  registerChatRoutes(app);
  registerImageRoutes(app);

  // 2. Application Routes

  // -- Flights (Mock) --
  app.post(api.flights.search.path, async (req, res) => {
    try {
      const input = api.flights.search.input.parse(req.body);
      
      // MOCK FLIGHT DATA
      // In a real app, this would call Amadeus API
      const mockFlights = [
        {
          id: "FL001",
          airline: "Iberia",
          flightNumber: "IB6586",
          departure: "18:10",
          arrival: "10:45+1",
          duration: "9h 35m",
          price: 850,
          stops: 0
        },
        {
          id: "FL002",
          airline: "Avianca",
          flightNumber: "AV0010",
          departure: "14:50",
          arrival: "07:10+1",
          duration: "10h 20m",
          price: 720,
          stops: 0
        },
        {
          id: "FL003",
          airline: "Air France",
          flightNumber: "AF423",
          departure: "23:55",
          arrival: "16:25+1",
          duration: "10h 30m",
          price: 910,
          stops: 0
        }
      ];

      res.json(mockFlights);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // -- Bookings --
  app.post(api.bookings.create.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const input = api.bookings.create.input.parse(req.body);
      // Ensure the booking is linked to the logged-in user
      const booking = await storage.createBooking({
        ...input,
        userId: (req.user as any).claims.sub
      });
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.bookings.list.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = (req.user as any).claims.sub;
    const bookings = await storage.getUserBookings(userId);
    res.json(bookings);
  });

  app.get(api.bookings.get.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const id = parseInt(req.params.id);
    const booking = await storage.getBooking(id);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Security check: only allow viewing own bookings
    const userId = (req.user as any).claims.sub;
    if (booking.userId !== userId) {
      return res.status(404).json({ message: "Booking not found" }); // Hide existence
    }

    res.json(booking);
  });

  // -- Posts (Blog) --
  app.get(api.posts.list.path, async (req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  // -- Leads --
  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const lead = await storage.createLead(input);
      res.status(201).json(lead);
    } catch (err) {
       if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data (if empty)
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const posts = await storage.getPosts();
  if (posts.length === 0) {
    console.log("Seeding blog posts...");
    await storage.createPost({
      slug: "guia-visa-schengen-colombianos-2025",
      title: "Guía Completa: Visa Schengen para Colombianos en 2025",
      excerpt: "Todo lo que necesitas saber sobre los nuevos requisitos ETIAS y documentación para viajar a Europa este año.",
      content: `
        <h2>¿Qué cambia en 2025?</h2>
        <p>A partir de mediados de 2025, los ciudadanos colombianos necesitarán tramitar el permiso ETIAS (Sistema Europeo de Información y Autorización de Viajes) para ingresar al espacio Schengen.</p>
        
        <h3>Requisitos principales</h3>
        <ul>
          <li>Pasaporte válido con vigencia mínima de 3 meses después de la fecha de salida.</li>
          <li>Tiquetes aéreos de ida y regreso.</li>
          <li>Reserva de alojamiento o carta de invitación.</li>
          <li>Seguro médico internacional con cobertura mínima de 30.000 euros.</li>
          <li>Medios económicos demostrables (aprox. 100 euros por día).</li>
        </ul>

        <h3>¿Cómo tramitar el ETIAS?</h3>
        <p>El proceso será 100% digital, tendrá un costo de 7 euros y la aprobación suele llegar en minutos. En Trips Europa te asesoramos con todo el proceso al reservar tu paquete.</p>
      `,
      category: "Documentos",
      tags: ["Visa", "ETIAS", "Consejos"],
      published: true,
      coverImage: "https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=1000&auto=format&fit=crop"
    });

    await storage.createPost({
      slug: "mejores-destinos-luna-miel-europa",
      title: "Top 5 Destinos para Luna de Miel en Europa",
      excerpt: "Desde los canales de Venecia hasta las playas de Santorini. Descubre los lugares más románticos del viejo continente.",
      content: `
        <h2>1. Santorini, Grecia</h2>
        <p>Con sus atardeceres de ensueño y arquitectura blanca y azul, es el destino romántico por excelencia.</p>

        <h2>2. Costa Amalfitana, Italia</h2>
        <p>Pueblos coloridos colgados de acantilados, limoncello y paseos en barco privado.</p>

        <h2>3. París, Francia</h2>
        <p>El clásico que nunca falla. Cena en la Torre Eiffel y paseo por el Sena.</p>
        
        <h2>4. Praga, República Checa</h2>
        <p>Un cuento de hadas medieval, ideal para parejas que buscan historia y encanto.</p>

        <h2>5. Sevilla, España</h2>
        <p>Pasión flamenca, arquitectura morisca y una gastronomía increíble.</p>
      `,
      category: "Lujo",
      tags: ["Romance", "Parejas", "Verano"],
      published: true,
      coverImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1000&auto=format&fit=crop"
    });

    await storage.createPost({
      slug: "ruta-gastronomica-madrid",
      title: "Ruta Gastronómica por Madrid: Más allá de las Tapas",
      excerpt: "Una guía para foodies: desde mercados tradicionales hasta estrellas Michelin en la capital española.",
      content: "<p>Contenido sobre gastronomía en Madrid...</p>",
      category: "Destinos",
      tags: ["Gastronomía", "España", "Madrid"],
      published: true,
      coverImage: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1000&auto=format&fit=crop"
    });
  }
}
