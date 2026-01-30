import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

const TOP_SALES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Grand Tour de Italia", en: "Grand Tour of Italy" },
    country: { es: "Italia en 14 Dias", en: "Italy in 14 Days" },
    currentPrice: 2299,
    originalPrice: 4599,
    discount: 50,
    rating: 4.9,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Santorini y Mykonos", en: "Santorini and Mykonos" },
    country: { es: "Grecia en 10 Dias", en: "Greece in 10 Days" },
    currentPrice: 1999,
    originalPrice: 3999,
    discount: 50,
    rating: 4.8,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Paris y la Provenza", en: "Paris and Provence" },
    country: { es: "Francia en 11 Dias", en: "France in 11 Days" },
    currentPrice: 2149,
    originalPrice: 4299,
    discount: 50,
    rating: 4.9,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Andalucia Magica", en: "Magical Andalusia" },
    country: { es: "España en 9 Dias", en: "Spain in 9 Days" },
    currentPrice: 1749,
    originalPrice: 3499,
    discount: 50,
    rating: 4.7,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Fiordos y Auroras Boreales", en: "Fjords and Northern Lights" },
    country: { es: "Noruega en 8 Dias", en: "Norway in 8 Days" },
    currentPrice: 2499,
    originalPrice: 4999,
    discount: 50,
    rating: 4.9,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1541343672885-9be56236c64e?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Croacia y los Balcanes", en: "Croatia and the Balkans" },
    country: { es: "Croacia en 10 Dias", en: "Croatia in 10 Days" },
    currentPrice: 1899,
    originalPrice: 3799,
    discount: 50,
    rating: 4.8,
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Escocia Legendaria", en: "Legendary Scotland" },
    country: { es: "Escocia en 9 Dias", en: "Scotland in 9 Days" },
    currentPrice: 1999,
    originalPrice: 3999,
    discount: 50,
    rating: 4.8,
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Islandia Salvaje", en: "Wild Iceland" },
    country: { es: "Islandia en 7 Dias", en: "Iceland in 7 Days" },
    currentPrice: 2299,
    originalPrice: 4599,
    discount: 50,
    rating: 4.9,
  },
];

export function TopSales() {
  const { language } = useI18n();
  const lang = language as "es" | "en";
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const content = {
    es: {
      title: "Top Ventas",
      subtitle: "Los mas recomendados",
      from: "Desde",
      off: "off",
      viewAll: "Ver ofertas",
    },
    en: {
      title: "Top Sales",
      subtitle: "Most recommended",
      from: "From",
      off: "off",
      viewAll: "View offers",
    },
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="section-top-sales">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-accent" data-testid="text-top-sales-title">
              {content[lang].title}
            </h2>
            <p className="text-muted-foreground text-lg">{content[lang].subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              data-testid="button-top-scroll-left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              data-testid="button-top-scroll-right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {TOP_SALES.map((offer) => (
            <Link 
              key={offer.id} 
              href={`/packages/${offer.id}`}
              className="block flex-shrink-0 w-[280px] group"
              style={{ scrollSnapAlign: "start" }}
              data-testid={`link-top-sale-${offer.id}`}
            >
              <Card className="overflow-hidden bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <Badge className="absolute top-3 left-3 bg-primary text-white border-0 font-bold">
                    {offer.discount}% {content[lang].off}
                  </Badge>
                  
                  <Badge className="absolute top-3 right-3 bg-white text-primary border-0 text-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    {offer.rating}
                  </Badge>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-accent font-bold text-lg leading-tight mb-1">
                      {offer.title[lang]}
                    </h3>
                    <p className="text-white/70 text-sm mb-3">{offer.country[lang]}</p>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-white/50 text-sm">{content[lang].from}</span>
                      <span className="text-accent text-2xl font-bold">{offer.currentPrice.toLocaleString()}</span>
                      <span className="text-white/50 text-sm line-through">{offer.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/packages">
            <Button 
              size="lg" 
              className="bg-primary text-white font-bold hover:bg-primary/90 px-8"
              data-testid="button-top-view-all"
            >
              {content[lang].viewAll}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
