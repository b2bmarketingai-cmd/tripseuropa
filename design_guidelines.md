# Trips Europa - Design Guidelines

## Design Approach
**Reference-Based Luxury Travel:** Drawing inspiration from Airbnb Luxe, Four Seasons, and premium European hospitality sites. The design emphasizes aspirational imagery, refined typography, and sophisticated spatial hierarchy that communicates exclusivity and trust.

## Typography System

**Primary Font:** Playfair Display (serif) - for headings, conveys European elegance
**Secondary Font:** Inter (sans-serif) - for body text, ensures readability

**Hierarchy:**
- Hero Headline: 4xl-6xl, Playfair Display, font-semibold
- Section Headlines: 3xl-4xl, Playfair Display, font-medium
- Subheadings: xl-2xl, Inter, font-semibold
- Body Text: base-lg, Inter, font-normal
- Captions/Labels: sm, Inter, font-medium

## Layout System

**Spacing Units:** Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistency
**Container Max-Widths:** 
- Full content: max-w-7xl
- Text blocks: max-w-4xl
- Forms: max-w-2xl

**Section Padding:** py-16 (mobile) → py-24 (desktop)

## Component Library

### Hero Section (Full-width, 85vh)
- Large hero image showcasing iconic European destinations
- Centered content overlay with blurred backdrop for text/CTA
- Primary headline + subtitle + dual CTAs (Explorar Destinos / Contactar Experto)
- Floating search bar with destination autocomplete, date picker, travelers dropdown
- Blurred button backgrounds (backdrop-blur-md bg-white/20)

### Destination Showcase (3-column grid on desktop)
- Large imagery cards with hover lift effect
- Overlay gradient for text legibility
- Destination name, starting price, duration badge
- Featured destinations: Paris, Rome, Barcelona, Santorini, Swiss Alps, Amsterdam

### Trust Builders Section
- 4-column stats grid (mobile stacks)
- "10+ Años de Experiencia", "5000+ Viajeros Felices", "50+ Destinos Premium", "Atención 24/7"
- Large numbers in Playfair Display with descriptive text below

### Curated Experiences (2-column alternating layout)
- Image left/right alternating
- Detailed descriptions of luxury experiences
- "Escapadas Románticas", "Tours Culturales", "Experiencias Gastronómicas", "Aventuras Exclusivas"

### Testimonials Carousel
- 3 testimonials visible on desktop, 1 on mobile
- Client photo, name, country flag icon
- Quote in italic Inter
- 5-star rating display

### Community Forum Preview
- Grid of recent discussions with avatars
- "Únete a nuestra comunidad de viajeros" headline
- CTA to full forum experience

### Lead Magnet Section (centered, contained)
- "Descarga Gratis: Guía Definitiva de Europa 2024"
- Email capture form with inline submit
- List of guide benefits with checkmarks
- Background with subtle European landmark illustration

### Contact Form Section (2-column split)
- Left: Full contact form (Name, Email, Phone with country validation, Destination interest dropdown, Message, GDPR consent)
- Right: Contact details, office hours, emergency contact number, trust badges

### Footer (4-column on desktop)
- Company info & social links
- Destinations by region
- Recursos (Blog, Guías, FAQs)
- Newsletter signup
- Payment method icons, certifications, language switcher

### Floating Chatbot
- Bottom-right corner, pulsing dot for attention
- Expandable chat interface with agent avatar
- "¿Necesitas ayuda? Chatea con nosotros"

## Images Section

**Hero Image:** Full-width panoramic shot of iconic European architecture (Eiffel Tower silhouette at golden hour, or Santorini blue domes). High-quality, aspirational, warm lighting. Position: background cover, center focus.

**Destination Cards:** 6 premium destination images - architectural landmarks and scenic vistas. Each 400x300px minimum, professionally shot.

**Experience Section:** 4 lifestyle images showing couples/groups enjoying luxury travel moments (dining, touring, relaxing). Authentic, not stock-feeling.

**Testimonial Avatars:** Circular headshots of diverse Latin American travelers.

**Lead Magnet Background:** Subtle watermark-style European map or landmark illustration.

## Responsive Behavior

**Mobile (< 768px):**
- Hero height: 70vh
- Single column grids
- Search bar: stacked inputs
- Typography scales down one size

**Tablet (768-1024px):**
- 2-column grids
- Hero: 80vh

**Desktop (> 1024px):**
- Full multi-column layouts
- Maximum visual impact