import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const OFFERS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    title: { es: "Viviendo Europa", en: "Living Europe" },
    price: "1,699",
    taxes: "799",
    days: 14,
    nights: 12,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600&auto=format&fit=crop",
    title: { es: "Europa Clasica", en: "Classic Europe" },
    price: "1,999",
    taxes: "799",
    days: 15,
    nights: 13,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600&auto=format&fit=crop",
    title: { es: "Turquia y Dubai", en: "Turkey and Dubai" },
    price: "999",
    taxes: "999",
    days: 16,
    nights: 13,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
    title: { es: "Gran Tour de Europa", en: "Grand Tour of Europe" },
    price: "1,899",
    taxes: "799",
    days: 19,
    nights: 17,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=600&auto=format&fit=crop",
    title: { es: "Mega Europa Barcelona", en: "Mega Europe Barcelona" },
    price: "1,499",
    taxes: "799",
    days: 12,
    nights: 10,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?q=80&w=600&auto=format&fit=crop",
    title: { es: "Turquia, Egipto y Dubai", en: "Turkey, Egypt and Dubai" },
    price: "1,999",
    taxes: "999",
    days: 18,
    nights: 15,
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    title: { es: "Magia Italiana", en: "Italian Magic" },
    price: "1,299",
    taxes: "799",
    days: 10,
    nights: 8,
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1493707553966-283afac8c358?q=80&w=600&auto=format&fit=crop",
    title: { es: "Viva Europa", en: "Viva Europe" },
    price: "1,599",
    taxes: "799",
    days: 13,
    nights: 11,
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop",
    title: { es: "Escapada a Grecia", en: "Greece Getaway" },
    price: "1,199",
    taxes: "799",
    days: 8,
    nights: 6,
  },
];

export function TopOffers() {
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
      title: "Buscas los mejores viajes al mejor precio? Aqui los tenemos!",
      badge: "Top Ofertas",
      from: "Desde",
      currency: "USD",
      taxes: "+ IMP",
      perPerson: "Por persona en habitacion doble",
    },
    en: {
      title: "Looking for the best trips at the best price? Here they are!",
      badge: "Top Offers",
      from: "From",
      currency: "USD",
      taxes: "+ Taxes",
      perPerson: "Per person in double room",
    },
  };

  return (
    <section className="py-16 bg-primary" data-testid="section-top-offers">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-accent" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-accent" data-testid="text-top-offers-title">
              {content[lang].title}
            </h2>
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
          {OFFERS.map((offer, index) => (
            <Card
              key={offer.id}
              className="flex-shrink-0 w-[260px] overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 hover-elevate cursor-pointer"
              style={{ scrollSnapAlign: "start" }}
              data-testid={`card-offer-${offer.id}`}
            >
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title[lang]}
                  className="w-full h-[320px] object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-accent text-primary font-bold">
                    {index + 1}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-display font-bold text-lg mb-2 text-accent">{offer.title[lang]}</h3>
                  <p className="text-white/70 text-sm">{content[lang].from}</p>
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-xl font-bold text-accent">{offer.price}{content[lang].currency}</span>
                    <span className="text-sm text-white/70">+ {offer.taxes} {content[lang].taxes}</span>
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
