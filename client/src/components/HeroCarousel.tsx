import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

const CAROUSEL_SLIDES = [
  {
    id: 1,
    imageBase: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    title: { es: "Gran Tour de Europa", en: "Grand Tour of Europe", pt: "Grande Tour pela Europa" },
    subtitle: { es: "Paris, Roma, Madrid y mas", en: "Paris, Rome, Madrid and more", pt: "Paris, Roma, Madrid e mais" },
    price: "2,899",
    taxes: "590",
    days: 19,
    nights: 17,
  },
  {
    id: 2,
    imageBase: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    title: { es: "Europa Clasica", en: "Classic Europe", pt: "Europa Classica" },
    subtitle: { es: "Lo mejor de Europa en un viaje", en: "The best of Europe in one trip", pt: "O melhor da Europa em uma viagem" },
    price: "2,299",
    taxes: "520",
    days: 15,
    nights: 13,
  },
  {
    id: 3,
    imageBase: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017",
    title: { es: "España, Portugal y Marruecos", en: "Spain, Portugal and Morocco", pt: "Espanha, Portugal e Marrocos" },
    subtitle: { es: "Desde Barcelona Especial", en: "From Barcelona Special", pt: "Desde Barcelona Especial" },
    price: "1,899",
    taxes: "480",
    days: 17,
    nights: 15,
  },
  {
    id: 4,
    imageBase: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    title: { es: "Turquia y Grecia", en: "Turkey and Greece", pt: "Turquia e Grecia" },
    subtitle: { es: "Estambul, Atenas y Santorini", en: "Istanbul, Athens and Santorini", pt: "Istambul, Atenas e Santorini" },
    price: "1,699",
    taxes: "450",
    days: 16,
    nights: 13,
  },
  {
    id: 5,
    imageBase: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
    title: { es: "Viviendo Europa", en: "Living Europe", pt: "Vivendo a Europa" },
    subtitle: { es: "Una experiencia inolvidable", en: "An unforgettable experience", pt: "Uma experiencia inesquecivel" },
    price: "1,599",
    taxes: "420",
    days: 14,
    nights: 12,
  },
];

function getResponsiveImageUrl(base: string, isMobile: boolean): string {
  const width = isMobile ? 600 : 1200;
  return `${base}?q=40&w=${width}&auto=format&fit=crop`;
}

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });
  const { language } = useI18n();
  const langPrefix = language === "es" ? "" : language === "pt" ? "/pt-br" : `/${language}`;
  const lang = language as "es" | "en" | "pt";

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentContent = CAROUSEL_SLIDES[currentSlide];

  const content = {
    es: {
      from: "Desde",
      currency: "USD",
      taxes: "+ IMP",
      perPerson: "Por persona en habitacion doble",
      days: "dias",
      nights: "noches",
      quote: "Cotiza Ahora",
      viewMore: "Ver mas",
    },
    en: {
      from: "From",
      currency: "USD",
      taxes: "+ Taxes",
      perPerson: "Per person in double room",
      days: "days",
      nights: "nights",
      quote: "Get Quote",
      viewMore: "View more",
    },
    pt: {
      from: "A partir de",
      currency: "USD",
      taxes: "+ Taxas",
      perPerson: "Por pessoa em quarto duplo",
      days: "dias",
      nights: "noites",
      quote: "Solicitar Orcamento",
      viewMore: "Ver mais",
    },
  };

  const c = content[lang] || content.es;

  return (
    <section 
      className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden" 
      data-testid="section-hero-carousel"
    >
      <div className="absolute inset-0">
        <img
          src={getResponsiveImageUrl(CAROUSEL_SLIDES[currentSlide].imageBase, isMobile)}
          alt={CAROUSEL_SLIDES[currentSlide].title[lang]}
          className="w-full h-full object-cover"
          width={1200}
          height={700}
          loading="eager"
          // @ts-ignore
          fetchpriority="high"
          decoding="sync"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/30"></div>
      </div>

      <div className="container relative z-20 px-4 py-16 md:py-24">
        <div className="max-w-2xl text-white">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-4 animate-fade-in text-accent" 
            data-testid="text-hero-title"
          >
            {currentContent.title[lang]}
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in" 
            data-testid="text-hero-subtitle"
          >
            {currentContent.subtitle[lang]}
          </p>

          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="text-white/70 text-lg">{content[lang].from}</span>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-4xl md:text-5xl font-bold text-accent font-display" data-testid="text-hero-price">
                {currentContent.price}{content[lang].currency}
              </span>
            </div>
            <span className="text-white/70 text-sm">{content[lang].perPerson}</span>
          </div>

          <div className="flex items-center gap-6 mb-8 text-white/80">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">{currentContent.days}</span>
              <span>{content[lang].days}</span>
            </div>
            <div className="w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">{currentContent.nights}</span>
              <span>{content[lang].nights}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <a href="https://api.whatsapp.com/send?phone=34611105448" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="bg-accent text-primary font-bold hover:bg-accent/90 px-8 text-lg"
                data-testid="button-hero-quote"
              >
                {content[lang].quote}
              </Button>
            </a>
            <Link href={`${langPrefix}/packages`}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 text-lg"
                data-testid="button-hero-view-more"
              >
                {content[lang].viewMore}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1 z-30" data-testid="carousel-dots">
        {CAROUSEL_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="w-11 h-11 flex items-center justify-center"
            aria-label={`Go to slide ${index + 1}`}
            data-testid={`button-carousel-dot-${index}`}
          >
            <span className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-accent scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`} />
          </button>
        ))}
      </div>
    </section>
  );
}
