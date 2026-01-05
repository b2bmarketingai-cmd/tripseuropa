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

export const experiments = pgTable("experiments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  status: text("status").default("draft"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  winningVariant: text("winning_variant"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const experimentVariants = pgTable("experiment_variants", {
  id: serial("id").primaryKey(),
  experimentId: integer("experiment_id").notNull(),
  name: text("name").notNull(),
  config: jsonb("config").notNull(),
  weight: integer("weight").default(50),
  isControl: boolean("is_control").default(false),
});

export const experimentMetrics = pgTable("experiment_metrics", {
  id: serial("id").primaryKey(),
  experimentId: integer("experiment_id").notNull(),
  variantId: integer("variant_id").notNull(),
  impressions: integer("impressions").default(0),
  conversions: integer("conversions").default(0),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 4 }),
  recordedAt: timestamp("recorded_at").defaultNow(),
});

export const sofiaConversations = pgTable("sofia_conversations", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow(),
  userCountry: text("user_country"),
  userName: text("user_name"),
  userEmail: text("user_email"),
  userPhone: text("user_phone"),
  mainTopic: text("main_topic"),
  durationMinutes: integer("duration_minutes"),
  finalStatus: text("final_status").default("completed"),
  recommendedPackage: text("recommended_package"),
  transcription: text("transcription"),
  satisfaction: integer("satisfaction"),
  conversationId: integer("conversation_id"),
  emailsSent: boolean("emails_sent").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const countryPages = pgTable("country_pages", {
  id: serial("id").primaryKey(),
  countryCode: text("country_code").notNull().unique(),
  countryName: text("country_name").notNull(),
  language: text("language").notNull(),
  currency: text("currency").notNull(),
  currencySymbol: text("currency_symbol").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  heroTitle: text("hero_title"),
  heroSubtitle: text("hero_subtitle"),
  ctaText: text("cta_text"),
  urgencyText: text("urgency_text"),
  socialProof: text("social_proof"),
  featuredPackages: jsonb("featured_packages"),
  seoKeywords: text("seo_keywords").array(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertExperimentSchema = createInsertSchema(experiments);
export const insertExperimentVariantSchema = createInsertSchema(experimentVariants);
export const insertCountryPageSchema = createInsertSchema(countryPages);
export const insertSofiaConversationSchema = createInsertSchema(sofiaConversations).omit({ id: true, createdAt: true });

export type Experiment = typeof experiments.$inferSelect;
export type ExperimentVariant = typeof experimentVariants.$inferSelect;
export type ExperimentMetric = typeof experimentMetrics.$inferSelect;
export type CountryPage = typeof countryPages.$inferSelect;
export type SofiaConversation = typeof sofiaConversations.$inferSelect;

export type InsertExperiment = z.infer<typeof insertExperimentSchema>;
export type InsertExperimentVariant = z.infer<typeof insertExperimentVariantSchema>;
export type InsertCountryPage = z.infer<typeof insertCountryPageSchema>;
export type InsertSofiaConversation = z.infer<typeof insertSofiaConversationSchema>;
