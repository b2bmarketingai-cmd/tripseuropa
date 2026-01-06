import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=60&w=1200&auto=format&fit=crop",
    title: { es: "Gran Tour de Europa", en: "Grand Tour of Europe", pt: "Grande Tour pela Europa" },
    subtitle: { es: "Paris, Roma, Madrid y mas", en: "Paris, Rome, Madrid and more", pt: "Paris, Roma, Madrid e mais" },
    price: "2,899",
    taxes: "590",
    days: 19,
    nights: 17,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=60&w=1200&auto=format&fit=crop",
    title: { es: "Europa Clasica", en: "Classic Europe", pt: "Europa Classica" },
    subtitle: { es: "Lo mejor de Europa en un viaje", en: "The best of Europe in one trip", pt: "O melhor da Europa em uma viagem" },
    price: "2,299",
    taxes: "520",
    days: 15,
    nights: 13,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=60&w=1200&auto=format&fit=crop",
    title: { es: "España, Portugal y Marruecos", en: "Spain, Portugal and Morocco", pt: "Espanha, Portugal e Marrocos" },
    subtitle: { es: "Desde Barcelona Especial", en: "From Barcelona Special", pt: "Desde Barcelona Especial" },
    price: "1,899",
    taxes: "480",
    days: 17,
    nights: 15,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=60&w=1200&auto=format&fit=crop",
    title: { es: "Turquia y Grecia", en: "Turkey and Greece", pt: "Turquia e Grecia" },
    subtitle: { es: "Estambul, Atenas y Santorini", en: "Istanbul, Athens and Santorini", pt: "Istambul, Atenas e Santorini" },
    price: "1,699",
    taxes: "450",
    days: 16,
    nights: 13,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=60&w=1200&auto=format&fit=crop",
    title: { es: "Viviendo Europa", en: "Living Europe", pt: "Vivendo a Europa" },
    subtitle: { es: "Una experiencia inolvidable", en: "An unforgettable experience", pt: "Uma experiencia inesquecivel" },
    price: "1,599",
    taxes: "420",
    days: 14,
    nights: 12,
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { language } = useI18n();
  const lang = language as "es" | "en" | "pt";

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
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
      {CAROUSEL_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title[lang]}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            // @ts-ignore - fetchpriority is a valid HTML attribute
            fetchpriority={index === 0 ? "high" : "low"}
            decoding={index === 0 ? "sync" : "async"}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/30"></div>
        </div>
      ))}

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
            <Link href="/packages">
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

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors z-30"
        aria-label="Next slide"
        data-testid="button-carousel-next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30" data-testid="carousel-dots">
        {CAROUSEL_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-accent scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            data-testid={`button-carousel-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
