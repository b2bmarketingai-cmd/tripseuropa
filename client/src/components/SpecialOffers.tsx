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
      prevLabel: "Oferta anterior",
      nextLabel: "Siguiente oferta",
      bookNow: "Cotizar ahora",
    },
    en: {
      badge: "Seasonal Offers",
      title: "Flash Offers",
      from: "From",
      currency: "USD",
      taxes: "+ Taxes",
      perPerson: "Per person in double room",
      prevLabel: "Previous offer",
      nextLabel: "Next offer",
      bookNow: "Get a quote",
    },
    pt: {
      badge: "Ofertas de Temporada",
      title: "Ofertas Relampago",
      from: "A partir de",
      currency: "USD",
      taxes: "+ Taxas",
      perPerson: "Por pessoa em quarto duplo",
      prevLabel: "Oferta anterior",
      nextLabel: "Proxima oferta",
      bookNow: "Solicitar cotacao",
    },
  };

  const c = content[lang] || content.es;

  return (
    <section className="py-12 bg-primary" data-testid="section-special-offers" aria-label={c.badge}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Badge className="mb-2 bg-accent/20 text-accent border-accent/30">
              <Zap className="w-3 h-3 mr-1" />
              {c.badge}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">{c.title}</h2>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="border-white/30 text-white hover:bg-white/10"
              data-testid="button-offers-prev"
              aria-label={c.prevLabel}
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="border-white/30 text-white hover:bg-white/10"
              data-testid="button-offers-next"
              aria-label={c.nextLabel}
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          role="list"
          aria-label={c.title}
        >
          {OFFERS.map((offer) => {
            const title = offer.title[lang] || offer.title.es;
            const whatsappMessage = `Hola! Me interesa la oferta "${title}" - Oferta ID ${offer.id} desde ${offer.price}${c.currency}. Me gustaria mas informacion.`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(whatsappMessage)}`;
            return (
              <a
                key={offer.id}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
                style={{ scrollSnapAlign: "start" }}
                aria-label={`${c.bookNow}: ${title} ${c.from} $${offer.price} ${c.currency}`}
                role="listitem"
              >
                <Card className="w-72 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={offer.image}
                      alt={title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width="288"
                      height="160"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-primary mb-2">{title}</h3>
                    <p className="text-xs text-gray-600 mb-1">{c.from}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-accent">${offer.price}</span>
                      <span className="text-sm text-gray-500">{c.currency}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{c.perPerson}</p>
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
