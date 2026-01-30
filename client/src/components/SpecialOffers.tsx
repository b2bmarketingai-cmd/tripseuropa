import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const OFFERS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Bellezas de Europa", en: "Beauties of Europe", pt: "Belezas da Europa" },
    price: "2,399",
    taxes: "799",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Europa Magnifica", en: "Magnificent Europe", pt: "Europa Magnifica" },
    price: "1,999",
    taxes: "799",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Magia Turca", en: "Turkish Magic", pt: "Magia Turca" },
    price: "699",
    taxes: "999",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Turquia con Islas Griegas", en: "Turkey with Greek Islands", pt: "Turquia com Ilhas Gregas" },
    price: "1,399",
    taxes: "999",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Encantos de Europa", en: "European Charms", pt: "Encantos da Europa" },
    price: "1,899",
    taxes: "799",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Turquia, Egipto y Dubai", en: "Turkey, Egypt and Dubai", pt: "Turquia, Egito e Dubai" },
    price: "1,999",
    taxes: "999",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Orlando y Europa", en: "Orlando and Europe", pt: "Orlando e Europa" },
    price: "999",
    taxes: "399",
  },
];

export function SpecialOffers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { language } = useI18n();
  const lang = language as "es" | "en" | "pt";

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
      title: "Ofertas Flash",
      from: "Desde",
      currency: "USD",
      taxes: "+ IMP",
      perPerson: "Por persona en habitacion doble",
    },
    en: {
      badge: "Seasonal Offers",
      title: "Flash Offers",
      from: "From",
      currency: "USD",
      taxes: "+ Taxes",
      perPerson: "Per person in double room",
    },
    pt: {
      badge: "Ofertas de Temporada",
      title: "Ofertas Relampago",
      from: "A partir de",
      currency: "USD",
      taxes: "+ Taxas",
      perPerson: "Por pessoa em quarto duplo",
    },
  };

  const c = content[lang] || content.es;

  return (
    <section className="py-16 bg-gradient-to-r from-primary via-primary/95 to-primary" data-testid="section-special-offers">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-accent" />
            <div>
              <Badge className="bg-accent text-primary mb-1">{c.badge}</Badge>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-accent" data-testid="text-offers-title">
                {c.title}
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
          {OFFERS.map((offer) => {
            const title = offer.title[lang] || offer.title.es;
            const whatsappMessage = `Hola! Me interesa la oferta "${title}" desde ${offer.price}${c.currency}. Me gustaria mas informacion.`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(whatsappMessage)}`;
            return (
              <a
                key={offer.id}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <Card
                  className="w-[280px] overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 hover-elevate cursor-pointer"
                  data-testid={`card-seasonal-offer-${offer.id}`}
                >
                  <div className="relative aspect-[4/3] bg-gray-300">
                    <img
                      src={offer.image}
                      alt={title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4 text-white">
                    <h3 className="font-display font-bold text-lg mb-2 text-accent">{title}</h3>
                    <p className="text-white/70 text-sm">{c.from}</p>
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span className="text-xl font-bold text-accent">{offer.price}{c.currency}</span>
                    </div>
                    <p className="text-white/60 text-xs mt-1">{c.perPerson}</p>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
