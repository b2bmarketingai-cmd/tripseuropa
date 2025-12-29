import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const OFFERS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop",
    title: { es: "Bellezas de Europa", en: "Beauties of Europe" },
    price: "2,399",
    taxes: "799",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    title: { es: "Europa Magnifica", en: "Magnificent Europe" },
    price: "1,999",
    taxes: "799",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600&auto=format&fit=crop",
    title: { es: "Magia Turca", en: "Turkish Magic" },
    price: "699",
    taxes: "999",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?q=80&w=600&auto=format&fit=crop",
    title: { es: "Turquia con Islas Griegas", en: "Turkey with Greek Islands" },
    price: "1,399",
    taxes: "999",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=600&auto=format&fit=crop",
    title: { es: "Encantos de Europa", en: "European Charms" },
    price: "1,899",
    taxes: "799",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    title: { es: "Turquia, Egipto y Dubai", en: "Turkey, Egypt and Dubai" },
    price: "1,999",
    taxes: "999",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=600&auto=format&fit=crop",
    title: { es: "Orlando y Europa", en: "Orlando and Europe" },
    price: "999",
    taxes: "399",
  },
];

export function SpecialOffers() {
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
      badge: "Ofertas de Temporada",
      title: "Semana Santa",
      from: "Desde",
      currency: "USD",
      taxes: "+ IMP",
      perPerson: "Por persona en habitacion doble",
    },
    en: {
      badge: "Seasonal Offers",
      title: "Easter Week",
      from: "From",
      currency: "USD",
      taxes: "+ Taxes",
      perPerson: "Per person in double room",
    },
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary via-primary/95 to-primary" data-testid="section-special-offers">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-accent" />
            <div>
              <Badge className="bg-accent text-primary mb-1">{content[lang].badge}</Badge>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-accent" data-testid="text-offers-title">
                {content[lang].title}
              </h2>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => scroll("left")}
              className="border-white/30 text-white hover:bg-white/10"
              data-testid="button-offers-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => scroll("right")}
              className="border-white/30 text-white hover:bg-white/10"
              data-testid="button-offers-next"
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
          {OFFERS.map((offer) => (
            <Card
              key={offer.id}
              className="flex-shrink-0 w-[280px] overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 hover-elevate cursor-pointer"
              style={{ scrollSnapAlign: "start" }}
              data-testid={`card-seasonal-offer-${offer.id}`}
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={offer.image}
                  alt={offer.title[lang]}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-white">
                <h3 className="font-display font-bold text-lg mb-2 text-accent">{offer.title[lang]}</h3>
                <p className="text-white/70 text-sm">{content[lang].from}</p>
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="text-xl font-bold text-accent">{offer.price}{content[lang].currency}</span>
                  <span className="text-sm text-white/70">+ {offer.taxes} {content[lang].taxes}</span>
                </div>
                <p className="text-white/60 text-xs mt-1">{content[lang].perPerson}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
