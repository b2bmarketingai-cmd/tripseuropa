import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

const CAROUSEL_SLIDES = [
  {
    id: 1,
    imageBase: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    title: {
      es: "Gran Tour de Europa",
      en: "Grand Tour of Europe",
      pt: "Grande Tour pela Europa",
    },
    subtitle: {
      es: "Paris, Roma, Madrid y mas",
      en: "Paris, Rome, Madrid and more",
      pt: "Paris, Roma, Madrid e mais",
    },
    price: "2,899",
    taxes: "590",
    days: 19,
    nights: 17,
  },
  {
    id: 2,
    imageBase: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    title: {
      es: "Europa Clasica",
      en: "Classic Europe",
      pt: "Europa Classica",
    },
    subtitle: {
      es: "Lo mejor de Europa en un viaje",
      en: "The best of Europe in one trip",
      pt: "O melhor da Europa em uma viagem",
    },
    price: "2,299",
    taxes: "520",
    days: 15,
    nights: 13,
  },
  {
    id: 3,
    imageBase: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017",
    title: {
      es: "España, Portugal y Marruecos",
      en: "Spain, Portugal and Morocco",
      pt: "Espanha, Portugal e Marrocos",
    },
    subtitle: {
      es: "Desde Barcelona Especial",
      en: "From Barcelona Special",
      pt: "Desde Barcelona Especial",
    },
    price: "1,899",
    taxes: "480",
    days: 17,
    nights: 15,
  },
  {
    id: 4,
    imageBase: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    title: {
      es: "Turquia y Grecia",
      en: "Turkey and Greece",
      pt: "Turquia e Grecia",
    },
    subtitle: {
      es: "Estambul, Atenas y Santorini",
      en: "Istanbul, Athens and Santorini",
      pt: "Istambul, Atenas e Santorini",
    },
    price: "1,699",
    taxes: "450",
    days: 16,
    nights: 13,
  },
  {
    id: 5,
    imageBase: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
    title: {
      es: "Viviendo Europa",
      en: "Living Europe",
      pt: "Vivendo a Europa",
    },
    subtitle: {
      es: "Una experiencia inolvidable",
      en: "An unforgettable experience",
      pt: "Uma experiencia inesquecivel",
    },
    price: "1,599",
    taxes: "420",
    days: 14,
    nights: 12,
  },
];

// Generate optimized image URL - must match index.html preload exactly for LCP
const getImageUrl = (baseUrl: string, width: number, quality: number) =>
  `${baseUrl}?w=${width}&q=${quality}&auto=format&fit=crop&fm=webp`;

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const { language } = useI18n();
  const lang = language as "es" | "en" | "pt";

  // Mark hydrated after first render - prevents flash during React takeover
  useEffect(() => {
    setIsHydrated(true);
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
    if (!isAutoPlaying || !isHydrated) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHydrated, nextSlide]);

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
      viewMore: "Ver mas paquetes de",
      goToSlide: "Ir a diapositiva",
    },
    en: {
      from: "From",
      currency: "USD",
      taxes: "+ Taxes",
      perPerson: "Per person in double room",
      days: "days",
      nights: "nights",
      quote: "Get Quote",
      viewMore: "View packages for",
      goToSlide: "Go to slide",
    },
    pt: {
      from: "A partir de",
      currency: "USD",
      taxes: "+ Taxas",
      perPerson: "Por pessoa em quarto duplo",
      days: "dias",
      nights: "noites",
      quote: "Solicitar Orcamento",
      viewMore: "Ver pacotes de",
      goToSlide: "Ir para slide",
    },
  };

  const c = content[lang] || content.es;

  return (
    <section className="hero-shell" aria-label="Hero carousel">
      {/* LCP Image - URLs must exactly match index.html preload for instant LCP */}
      <img
        src={getImageUrl(CAROUSEL_SLIDES[currentSlide].imageBase, 1200, 60)}
        srcSet={`${getImageUrl(CAROUSEL_SLIDES[currentSlide].imageBase, 800, 50)} 800w, ${getImageUrl(CAROUSEL_SLIDES[currentSlide].imageBase, 1200, 60)} 1200w`}
        sizes="100vw"
        alt={CAROUSEL_SLIDES[currentSlide].title[lang]}
        {...(currentSlide === 0 ? { fetchpriority: "high" } : {})}
        loading={currentSlide === 0 ? "eager" : "lazy"}
        decoding="async"
        width={1200}
        height={700}
      />
      <div className="overlay" aria-hidden="true" />

      <div className="content">
        <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-2 text-accent">
          {currentContent.title[lang]}
        </h1>
        <p className="text-lg opacity-85 mb-4">
          {currentContent.subtitle[lang]}
        </p>

        <div className="flex flex-col gap-1 mb-4">
          <span className="text-sm text-white/70">{c.from}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-accent">
              ${currentContent.price}
            </span>
            <span className="text-sm text-white/70">{c.currency}</span>
          </div>
          <p className="text-xs text-white/60">{c.perPerson}</p>
          <div className="flex gap-4 text-sm">
            <span>
              {currentContent.days}&nbsp;{c.days}
            </span>
            <span>
              {currentContent.nights}&nbsp;{c.nights}
            </span>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <a
            href="https://api.whatsapp.com/send?phone=34611105448"
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={`${c.quote}: ${currentContent.title[lang]}`}
          >
            {c.quote}
          </a>
          <Link
            to="/destinos"
            className="inline-flex items-center justify-center rounded-md border border-white/40 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={`${c.viewMore} ${currentContent.title[lang]}`}
          >
            {c.viewMore} {currentContent.title[lang]}
          </Link>
        </div>
      </div>

      {/* Carousel dots - min 44x44px touch targets for accessibility */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1"
        role="tablist"
        aria-label="Carousel slides"
      >
        {CAROUSEL_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`${c.goToSlide} ${index + 1}: ${slide.title[lang]}`}
            onClick={() => goToSlide(index)}
            className="w-11 h-11 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white rounded-full"
            data-testid={`button-carousel-dot-${index}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-3 h-3 bg-accent scale-125"
                  : "w-2 h-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
