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

## SEO & Sitemap Implementation

### Multinational SEO Strategy
The application implements comprehensive multinational SEO targeting Latin American travelers from 9 countries:
- **Countries**: Colombia (CO), Mexico (MX), Brazil (BR), Argentina (AR), Peru (PE), Panama (PA), Costa Rica (CR), Dominican Republic (DO), Caribbean (CB)
- **Languages**: Spanish (es), English (en), Portuguese (pt-BR)
- **Total Sitemaps**: 27 specialized XML sitemaps
- **Estimated URLs**: ~917 indexed pages

### Sitemap Architecture (`server/sitemaps.ts`)
- **Sitemap Index**: `/sitemaps/sitemap_index.xml` - Master index of all sitemaps
- **Country Sitemaps**: Language-specific sitemaps for each country (e.g., `/sitemaps/sitemap-co-colombia-es.xml`)
- **Destination Sitemaps**: European destinations in 3 languages
- **Content Sitemaps**: Blog posts, images, videos, news
- **Commercial Sitemaps**: Packages, offers, experiences
- **Legal Sitemaps**: Privacy, terms, policies

### Hreflang Implementation
All sitemaps include proper hreflang tags for:
- 9 country-specific Spanish variants (es-CO, es-MX, es-AR, etc.)
- Brazilian Portuguese (pt-BR)
- English (en)
- x-default fallback

### SEO API Endpoints
- `GET /robots.txt` - Dynamically generated with all sitemap references
- `GET /api/seo/countries` - Country configuration data
- `GET /api/seo/sitemap-stats` - Sitemap statistics and metrics

### Content Coverage
- 27 European destination countries
- 36 European cities
- 15 blog posts (multilingual)
- 12 travel packages
- 10 travel experiences
- 6 promotional offers

## Branding Assets (PERMANENTE - NO MODIFICAR)

### Favicon - Avion Dorado
**IMPORTANTE: NO QUITAR NI CAMBIAR ESTOS ARCHIVOS**
- **Archivo original**: `attached_assets/logo_favicon_tripseuropa_1767719517121.png`
- **Ubicacion**: `client/public/`
- **Archivos generados**:
  - `favicon.ico` - Icono ICO para compatibilidad maxima
  - `favicon.png` - 512x512 version alta resolucion
  - `favicon-32.png` - 32x32 para pestanas navegador
  - `favicon-16.png` - 16x16 para pestanas pequenas
  - `apple-touch-icon.png` - 180x180 para iOS
- **Configurado en**: `client/index.html` (lineas 14-19)
- **Manifest**: `client/public/manifest.json`
- **Dominios**: Aplica para tripseuropa.com y tripseuropa.co