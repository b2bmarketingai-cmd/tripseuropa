import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

const HERO_CONTENT = {
  es: {
    badge: "Ofertas de Temporada",
    title: "Descubre Europa,",
    subtitle: "vive la aventura",
    description: "Circuitos exclusivos con vuelos, hoteles y experiencias unicas incluidas",
    cta: "Ver ofertas",
  },
  en: {
    badge: "Seasonal Offers",
    title: "Discover Europe,",
    subtitle: "live the adventure",
    description: "Exclusive tours with flights, hotels and unique experiences included",
    cta: "View offers",
  },
};

const HERO_IMAGE = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1920&auto=format&fit=crop";

export function HeroCarousel() {
  const { language } = useI18n();
  const lang = language as "es" | "en";
  const content = HERO_CONTENT[lang];

  return (
    <section 
      className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden pt-[100px]" 
      data-testid="section-hero"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Europe travel destination"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
      </div>

      <div className="container relative z-10 px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center text-white">
          <Badge 
            className="bg-accent/20 text-accent border-accent/30 backdrop-blur-sm text-sm px-4 py-1 mb-6" 
            data-testid="badge-hero"
          >
            {content.badge}
          </Badge>

          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-2 animate-fade-in" 
            data-testid="text-hero-title"
          >
            {content.title}
          </h1>
          
          <h2 
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-accent italic mb-6 animate-fade-in" 
            data-testid="text-hero-subtitle"
          >
            {content.subtitle}
          </h2>

          <p 
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in" 
            style={{ animationDelay: "0.2s" }}
            data-testid="text-hero-description"
          >
            {content.description}
          </p>

          <Link href="/packages">
            <Button 
              size="lg" 
              className="bg-accent text-primary font-bold hover:bg-accent/90 px-10 py-6 text-lg animate-fade-in"
              style={{ animationDelay: "0.4s" }}
              data-testid="button-hero-cta"
            >
              {content.cta}
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>
    </section>
  );
}
