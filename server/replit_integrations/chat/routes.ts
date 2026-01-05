import type { Express, Request, Response } from "express";
import OpenAI from "openai";
import { chatStorage } from "./storage";
import { db } from "../../db";
import { sofiaConversations } from "@shared/schema";
import { sendSofiaConversationEmail } from "../email";
import { desc, eq } from "drizzle-orm";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const TRAVEL_ASSISTANT_SYSTEM_PROMPT = `Eres "Sofia", asistente inteligente especializada en viajes a Europa para clientes de Latinoamérica (Colombia, México, Brasil, Argentina, Perú, Panamá, Costa Rica, República Dominicana y Caribe).

Tu rol es ser una asesora de viajes profesional, amable, eficiente y bien informada que trabaja representando a Trips Europa, una agencia de viajes especializada en paquetes turísticos de Europa con enfoque en experiencias personalizadas para viajeros latinoamericanos.

VALORES CLAVE:
- Profesionalismo: Responde con información verificada y confiable
- Empatía: Entiende las necesidades y preocupaciones del cliente
- Eficiencia: Resuelve problemas rápidamente
- Transparencia: Sé honesto sobre limitaciones y ofrece escalamiento cuando sea necesario
- Multilingüe: Ofrece atención en Español, Portugués (Brasil) e Inglés
- Conocimiento Local: Personaliza respuestas según el país del usuario

CONOCIMIENTO ESPECIALIZADO:
- Destinos europeos: París, Barcelona, Roma, Madrid, Londres, Ámsterdam, Praga, Viena, etc.
- Paquetes turísticos disponibles y precios aproximados
- Requisitos de visa Schengen (90 días sin visa para latinoamericanos)
- Documentación necesaria: pasaporte (6 meses vigencia), comprobante hotel, seguro viaje
- Mejores épocas para visitar cada destino
- Hoteles de 3, 4 y 5 estrellas
- Experiencias: cultura, gastronomía, romántico, aventura, familia

FLUJO DE CONVERSACIÓN:
1. Saluda cálidamente y preséntate como Sofia
2. Pregunta el país de origen del viajero
3. Pregunta el destino de interés
4. Pregunta duración del viaje (días)
5. Pregunta presupuesto aproximado (Económico: $1,500-2,000 USD, Medio: $2,500-3,500 USD, Confort: $4,000-6,000 USD)
6. Pregunta si viaja solo, pareja, familia o grupo
7. Pregunta tipo de experiencia (cultura, playa, aventura, gastronomía, romántico)

PAQUETES EJEMPLO:
- "Europa Clásica 10 Días": París-Barcelona-Roma desde $2,890 USD
- "Barcelona Romántica": 8 noches hotel 4 estrellas desde $2,500 USD
- "Italia Histórica": Roma-Florencia-Venecia desde $2,700 USD

ESCALAMIENTO A AGENTE HUMANO - Escala cuando:
- El usuario quiere hacer una reserva
- Pregunta sobre casos especiales (discapacidad, niños pequeños, restricciones médicas)
- Solicita cotización personalizada detallada
- Grupos grandes (15+ personas)
- Expresa insatisfacción o queja
- Pide hablar con un agente

CONTACTO PARA ESCALAMIENTO:
- WhatsApp: +57 para Colombia, +52 para México, +55 para Brasil
- Email: contacto@tripseuropa.co, reservas@tripseuropa.co
- Web: www.tripseuropa.co
- Horario: Lun-Vie 9AM-6PM, Sábado 10AM-2PM (Hora Colombia)

REGLAS CRÍTICAS:
- NUNCA inventes información o precios exactos no verificados
- NUNCA prometas descuentos sin autorización
- NUNCA solicites información bancaria
- NUNCA hagas críticas a competidores
- Usa máximo 2-3 emojis por mensaje
- Responde en el idioma que el usuario escribe
- Sé conciso pero informativo

Para Brasil (pt-BR): Usa "você", términos como "viagem", "pacote", "destino"
Para México: Adapta referencias culturales mexicanas
Para Argentina: Menciona conexión con cultura europea

Recuerda: Convierte visitantes en clientes brindando información útil y personalizada.`;

export function registerChatRoutes(app: Express): void {
  // Get all conversations
  app.get("/api/conversations", async (req: Request, res: Response) => {
    try {
      const conversations = await chatStorage.getAllConversations();
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  // Get single conversation with messages
  app.get("/api/conversations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const conversation = await chatStorage.getConversation(id);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      const messages = await chatStorage.getMessagesByConversation(id);
      res.json({ ...conversation, messages });
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });

  // Create new conversation
  app.post("/api/conversations", async (req: Request, res: Response) => {
    try {
      const { title } = req.body;
      const conversation = await chatStorage.createConversation(title || "New Chat");
      res.status(201).json(conversation);
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  // Delete conversation
  app.delete("/api/conversations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await chatStorage.deleteConversation(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting conversation:", error);
      res.status(500).json({ error: "Failed to delete conversation" });
    }
  });

  // Send message and get AI response (streaming)
  app.post("/api/conversations/:id/messages", async (req: Request, res: Response) => {
    try {
      const conversationId = parseInt(req.params.id);
      const { content } = req.body;

      // Save user message
      await chatStorage.createMessage(conversationId, "user", content);

      // Get conversation history for context
      const messages = await chatStorage.getMessagesByConversation(conversationId);
      const chatMessages = messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

      // Set up SSE
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      // Stream response from OpenAI with travel assistant system prompt
      const stream = await openai.chat.completions.create({
        model: "gpt-5.1",
        messages: [
          { role: "system", content: TRAVEL_ASSISTANT_SYSTEM_PROMPT },
          ...chatMessages
        ],
        stream: true,
        max_completion_tokens: 2048,
      });

      let fullResponse = "";

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullResponse += content;
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      // Save assistant message
      await chatStorage.createMessage(conversationId, "assistant", fullResponse);

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      console.error("Error sending message:", error);
      // Check if headers already sent (SSE streaming started)
      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ error: "Failed to send message" })}\n\n`);
        res.end();
      } else {
        res.status(500).json({ error: "Failed to send message" });
      }
    }
  });

  // Save Sofia conversation summary
  app.post("/api/sofia/conversations", async (req: Request, res: Response) => {
    try {
      const body = req.body;
      
      const [conversation] = await db.insert(sofiaConversations).values({
        timestamp: body.timestamp ? new Date(body.timestamp) : new Date(),
        userCountry: body.userCountry || null,
        userName: body.userName || null,
        userEmail: body.userEmail || null,
        userPhone: body.userPhone || null,
        mainTopic: body.mainTopic || null,
        durationMinutes: body.durationMinutes || 0,
        finalStatus: body.finalStatus || "completed",
        recommendedPackage: body.recommendedPackage || null,
        transcription: body.transcription || "",
        satisfaction: body.satisfaction || null,
        conversationId: body.conversationId || null,
        emailsSent: false,
      }).returning();

      // Send email notification
      const emailSent = await sendSofiaConversationEmail({
        timestamp: (body.timestamp ? new Date(body.timestamp) : new Date()).toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
        userCountry: body.userCountry || null,
        userName: body.userName || null,
        userEmail: body.userEmail || null,
        userPhone: body.userPhone || null,
        mainTopic: body.mainTopic || null,
        durationMinutes: body.durationMinutes || 0,
        finalStatus: body.finalStatus || "completed",
        recommendedPackage: body.recommendedPackage || null,
        transcription: body.transcription || "",
        satisfaction: body.satisfaction || null,
        conversationId: body.conversationId || null,
      });

      // Update emailsSent status
      if (emailSent) {
        await db.update(sofiaConversations)
          .set({ emailsSent: true })
          .where(eq(sofiaConversations.id, conversation.id));
      }

      res.status(201).json({
        success: true,
        conversationId: conversation.id,
        emailsSent,
        message: "Conversacion registrada exitosamente"
      });
    } catch (error) {
      console.error("Error saving Sofia conversation:", error);
      res.status(500).json({ error: "Failed to save conversation" });
    }
  });

  // Get Sofia conversations (for admin dashboard)
  app.get("/api/sofia/conversations", async (req: Request, res: Response) => {
    try {
      const conversations = await db.select().from(sofiaConversations).orderBy(desc(sofiaConversations.createdAt)).limit(100);
      
      // Calculate stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayConversations = conversations.filter(c => c.createdAt && new Date(c.createdAt) >= today);
      const escalatedConversations = conversations.filter(c => c.finalStatus === "escalado");
      const satisfactionScores = conversations.filter(c => c.satisfaction != null).map(c => c.satisfaction as number);
      const avgSatisfaction = satisfactionScores.length > 0 
        ? satisfactionScores.reduce((a, b) => a + b, 0) / satisfactionScores.length 
        : 0;

      res.json({
        total: conversations.length,
        hoy: todayConversations.length,
        escaladas: escalatedConversations.length,
        satisfaccion_promedio: avgSatisfaction,
        conversaciones: conversations
      });
    } catch (error) {
      console.error("Error fetching Sofia conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  // Get single Sofia conversation
  app.get("/api/sofia/conversations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const [conversation] = await db.select().from(sofiaConversations).where(eq(sofiaConversations.id, id));
      
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      
      res.json(conversation);
    } catch (error) {
      console.error("Error fetching Sofia conversation:", error);
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });
}

