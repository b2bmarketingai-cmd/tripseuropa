import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { ContactForm } from "@/components/ContactForm";

const CAROUSEL_SLIDES = [
  {
    id: 1,
    country: { es: "Espana", en: "Spain" },
    title: { es: "El Oferton Europa", en: "The Europe Deal" },
    subtitle: { es: "Madrid + Barcelona", en: "Madrid + Barcelona" },
    price: "799",
    days: 8,
    includes: { es: "Todo incluido", en: "All inclusive" },
    gradient: "linear-gradient(135deg, #1a3a52 0%, #d4a574 100%)",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 2,
    country: { es: "Portugal", en: "Portugal" },
    title: { es: "Lisboa y Porto", en: "Lisbon & Porto" },
    subtitle: { es: "Costa Atlantica", en: "Atlantic Coast" },
    price: "849",
    days: 9,
    includes: { es: "Vuelos + Hoteles 4*", en: "Flights + 4* Hotels" },
    gradient: "linear-gradient(135deg, #2d5a7b 0%, #87ceeb 100%)",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 3,
    country: { es: "Grecia", en: "Greece" },
    title: { es: "Islas Griegas", en: "Greek Islands" },
    subtitle: { es: "Santorini + Mykonos", en: "Santorini + Mykonos" },
    price: "1199",
    days: 10,
    includes: { es: "Ferry incluido", en: "Ferry included" },
    gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 4,
    country: { es: "Italia", en: "Italy" },
    title: { es: "Roma + Florencia + Venecia", en: "Rome + Florence + Venice" },
    subtitle: { es: "El Clasico Italiano", en: "Italian Classic" },
    price: "949",
    days: 10,
    includes: { es: "Todo incluido", en: "All inclusive" },
    gradient: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 5,
    country: { es: "Francia", en: "France" },
    title: { es: "Paris + Versalles", en: "Paris + Versailles" },
    subtitle: { es: "Romance Frances", en: "French Romance" },
    price: "1099",
    days: 12,
    includes: { es: "Guia en espanol", en: "Spanish guide" },
    gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 6,
    country: { es: "Alemania", en: "Germany" },
    title: { es: "Berlin + Munich", en: "Berlin + Munich" },
    subtitle: { es: "Cultura Alemana", en: "German Culture" },
    price: "799",
    days: 8,
    includes: { es: "Cerveceria incluida", en: "Brewery included" },
    gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 7,
    country: { es: "Austria", en: "Austria" },
    title: { es: "Viena + Salzburgo", en: "Vienna + Salzburg" },
    subtitle: { es: "Musica y Arte", en: "Music & Art" },
    price: "899",
    days: 9,
    includes: { es: "Concierto incluido", en: "Concert included" },
    gradient: "linear-gradient(135deg, #f39c12 0%, #d35400 100%)",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=1920&auto=format&fit=crop",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { language, t } = useI18n();
  const { toast } = useToast();

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

  const handleDownloadCatalog = () => {
    toast({
      title: language === "es" ? "Descargando Catalogo" : "Downloading Catalog",
      description: language === "es" 
        ? "El catalogo 2025 se descargara en breve. Revisa tu carpeta de descargas." 
        : "The 2025 catalog will download shortly. Check your downloads folder.",
    });
  };

  const currentContent = CAROUSEL_SLIDES[currentSlide];
  const lang = language as "es" | "en";

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden" data-testid="section-hero-carousel">
      {CAROUSEL_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title[lang]}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/30"></div>
        </div>
      ))}

      <div className="container relative z-10 px-4 py-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white text-center lg:text-left">
            <Badge className="bg-accent/20 text-accent border-accent/30 backdrop-blur-sm text-sm px-4 py-1 mb-6" data-testid="badge-carousel-country">
              {currentContent.country[lang]}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4 animate-fade-in" data-testid="text-carousel-title">
              {currentContent.title[lang]}
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-2" data-testid="text-carousel-subtitle">
              {currentContent.subtitle[lang]}
            </p>

            <p className="text-lg text-accent font-semibold mb-6" data-testid="text-carousel-includes">
              {currentContent.days} {language === "es" ? "dias" : "days"} - {currentContent.includes[lang]}
            </p>

            <div className="mb-8">
              <span className="text-white/60 text-lg">{language === "es" ? "Desde" : "From"}</span>
              <div className="text-5xl md:text-6xl font-bold text-accent font-display" data-testid="text-carousel-price">
                {currentContent.price}
              </div>
              <span className="text-white/60">EUR {language === "es" ? "por persona" : "per person"}</span>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button 
                size="lg" 
                className="bg-accent text-primary font-bold hover:bg-accent/90 px-8 text-lg"
                data-testid="button-carousel-reserve"
              >
                {language === "es" ? "Reservar Ahora" : "Book Now"}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 text-lg gap-2"
                onClick={handleDownloadCatalog}
                data-testid="button-download-catalog"
              >
                <Download className="w-5 h-5" />
                {language === "es" ? "Descargar Catalogo" : "Download Catalog"}
              </Button>
            </div>
          </div>

          <div className="animate-fade-in hidden lg:block" style={{ animationDelay: "0.3s" }}>
            <ContactForm 
              variant="hero" 
              title={language === "es" ? "Cotiza tu viaje" : "Get a Quote"} 
              subtitle={language === "es" ? "Recibe una propuesta personalizada" : "Receive a personalized proposal"} 
            />
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors z-20"
        aria-label="Previous slide"
        data-testid="button-carousel-prev"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors z-20"
        aria-label="Next slide"
        data-testid="button-carousel-next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20" data-testid="carousel-dots">
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
