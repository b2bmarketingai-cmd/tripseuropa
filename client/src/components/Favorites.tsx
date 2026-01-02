import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const FAVORITES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600&auto=format&fit=crop",
    title: { es: "Escapada a Grecia", en: "Greece Getaway" },
    price: "599",
    taxes: "399",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?q=80&w=600&auto=format&fit=crop",
    title: { es: "Turquia, Egipto y Dubai", en: "Turkey, Egypt and Dubai" },
    price: "1,999",
    taxes: "999",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=600&auto=format&fit=crop",
    title: { es: "Descubre Portugal", en: "Discover Portugal" },
    price: "1,299",
    taxes: "799",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=600&auto=format&fit=crop",
    title: { es: "Visita Madrid", en: "Visit Madrid" },
    price: "1,599",
    taxes: "799",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=600&auto=format&fit=crop",
    title: { es: "Escandinavia Magica", en: "Magical Scandinavia" },
    price: "2,199",
    taxes: "899",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    title: { es: "Roma y Florencia", en: "Rome and Florence" },
    price: "999",
    taxes: "699",
  },
];

export function Favorites() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { language } = useI18n();
  const lang = language as "es" | "en";

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
      badge: "Favoritos",
      title: "Los Imperdibles del Mes",
      from: "Desde",
      currency: "USD",
      taxes: "+ IMP",
      perPerson: "Por persona en habitacion doble",
    },
    en: {
      badge: "Favorites",
      title: "This month's must-see",
      from: "From",
      currency: "USD",
      taxes: "+ Taxes",
      perPerson: "Per person in double room",
    },
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800" data-testid="section-favorites">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-red-500" />
            <div>
              <Badge variant="secondary" className="mb-1">{content[lang].badge}</Badge>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-accent" data-testid="text-favorites-title">
                {content[lang].title}
              </h2>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => scroll("left")}
              data-testid="button-favorites-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => scroll("right")}
              data-testid="button-favorites-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {FAVORITES.map((fav) => (
            <Card
              key={fav.id}
              className="flex-shrink-0 w-[260px] overflow-hidden hover-elevate cursor-pointer"
              style={{ scrollSnapAlign: "start" }}
              data-testid={`card-favorite-${fav.id}`}
            >
              <div className="relative">
                <img
                  src={fav.image}
                  alt={fav.title[lang]}
                  className="w-full h-[320px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-display font-bold text-lg mb-2 text-accent">{fav.title[lang]}</h3>
                  <p className="text-white/70 text-sm">{content[lang].from}</p>
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-xl font-bold text-accent">{fav.price}{content[lang].currency}</span>
                  </div>
                  <p className="text-white/60 text-xs mt-1">{content[lang].perPerson}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
