import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export * from "./models/auth";
export * from "./models/chat";

// === TABLE DEFINITIONS ===

// Users table (extends auth user model conceptually)
// We use the existing 'users' table from Replit Auth but define app-specific fields here if needed
// For now, we'll rely on the auth schema for user basics and add a 'profiles' table for extended info

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(), // Link to Replit Auth user ID
  stripeCustomerId: text("stripe_customer_id"),
  loyaltyPoints: integer("loyalty_points").default(0),
  loyaltyTier: text("loyalty_tier").default("explorer"), // explorer, elite, vip
  preferences: jsonb("preferences"),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  serviceType: text("service_type").notNull(), // flight, hotel, package
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD"),
  details: jsonb("details").notNull(), // flight info, hotel dates, etc.
  paymentStatus: text("payment_status").default("unpaid"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  category: text("category").notNull(),
  tags: text("tags").array(),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  originCountry: text("origin_country"),
  serviceInterest: text("service_interest"),
  message: text("message"),
  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

// === RELATIONS ===

export const profilesRelations = relations(profiles, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  profile: one(profiles, {
    fields: [bookings.userId],
    references: [profiles.userId],
  }),
}));

// === BASE SCHEMAS ===

export const insertProfileSchema = createInsertSchema(profiles);
export const insertBookingSchema = createInsertSchema(bookings);
export const insertPostSchema = createInsertSchema(posts);
export const insertLeadSchema = createInsertSchema(leads);

// === EXPLICIT API CONTRACT TYPES ===

export type Profile = typeof profiles.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Lead = typeof leads.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertLead = z.infer<typeof insertLeadSchema>;

// Request types
export type CreateBookingRequest = InsertBooking;
export type CreateLeadRequest = InsertLead;

// Search/Flight types (Mock data structure)
export const flightSearchSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  date: z.string(),
  passengers: z.number().min(1),
  class: z.enum(["economy", "business", "first"]).optional(),
});

export type FlightSearchRequest = z.infer<typeof flightSearchSchema>;

export interface FlightOffer {
  id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
}
