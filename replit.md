# Trips Europa

## Overview

Trips Europa is a premium travel agency web application targeting Colombian travelers seeking luxury European travel experiences. The platform offers flight search, hotel bookings, travel packages, and a concierge chatbot service. Built as a full-stack TypeScript application with React frontend and Express backend, it features Stripe payment integration, Replit Auth for authentication, and AI-powered chat assistance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens (navy primary #0f172a, gold accent #d4af37)
- **Typography**: Playfair Display (headings) and Lato (body) fonts for luxury branding
- **Internationalization**: Custom i18n context supporting Spanish and English

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with Zod schema validation
- **Session Management**: Express sessions with PostgreSQL store via connect-pg-simple
- **Authentication**: Replit Auth integration using OpenID Connect

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Tables**: Users, Sessions (auth), Profiles, Bookings, Posts (blog), Leads, Conversations, Messages (chat)
- **Migrations**: Managed via `drizzle-kit push` command

### Project Structure
```
client/           # React frontend
  src/
    components/   # UI components including shadcn/ui
    hooks/        # Custom React hooks for data fetching
    lib/          # Utilities, i18n, query client
    pages/        # Route components
server/           # Express backend
  replit_integrations/  # Auth, chat, and image generation modules
shared/           # Shared types, schemas, and API contracts
  models/         # Database models for auth and chat
  routes.ts       # API contract definitions with Zod
  schema.ts       # Drizzle table definitions
```

### API Contract Pattern
The application uses a typed API contract pattern in `shared/routes.ts` where endpoints are defined with their HTTP method, path, input schema, and response schemas. This enables type-safe API calls on both client and server.

## External Dependencies

### Payment Processing
- **Stripe**: Payment intent creation and processing via `@stripe/stripe-js` and `@stripe/react-stripe-js`
- Environment variables: `STRIPE_SECRET_KEY`, `STRIPE_PUBLIC_KEY`

### AI Services
- **OpenAI**: Powers the concierge chatbot and image generation features
- Accessed through Replit AI Integrations
- Environment variables: `AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`

### Authentication
- **Replit Auth**: OpenID Connect-based authentication
- Environment variables: `ISSUER_URL`, `REPL_ID`, `SESSION_SECRET`

### Database
- **PostgreSQL**: Primary data store
- Environment variable: `DATABASE_URL`
- Uses connection pooling via `pg` package

### Third-Party UI Libraries
- Radix UI primitives for accessible components
- Lucide React and react-icons for iconography
- react-day-picker for date selection
- date-fns for date formatting with locale support