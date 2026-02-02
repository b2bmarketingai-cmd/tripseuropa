import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const PACKAGES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=40&w=400&auto=format&fit=crop&fm=webp",
    title: { es: "Europa Clasica Smart", en: "Classic Europe Smart", pt: "Europa Classica Smart" },
    price: "1,699",
    taxes: "799",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=40&w=400&auto=format&fit=crop&fm=webp",
    title: { es: "Estrellas de Europa Smart", en: "Stars of Europe Smart", pt: "Estrelas da Europa Smart" },
    price: "2,399",
    taxes: "799",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=40&w=400&auto=format&fit=crop&fm=webp",
    title: { es: "Magia Italiana", en: "Italian Magic", pt: "Magia Italiana" },
    price: "1,299",
    taxes: "799",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=40&w=400&auto=format&fit=crop&fm=webp",
    title: { es: "Viva Europa", en: "Viva Europe", pt: "Viva Europa" },
    price: "1,599",
    taxes: "799",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=40&w=400&auto=format&fit=crop&fm=webp",
    title: { es: "Bellezas de Europa", en: "Beauties of Europe", pt: "Belezas da Europa" },
    price: "2,399",
    taxes: "799",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?q=40&w=400&auto=format&fit=crop&fm=webp",
    title: { es: "Europa Magnifica", en: "Magnificent Europe", pt: "Europa Magnifica" },
    price: "1,999",
    taxes: "799",
  },
];

export function ReserveSpot() {
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
      badge: "Bloqueos",
      title: "Aparta tu lugar",
      from: "Desde",
      currency: "USD",
      taxes: "+ IMP",
      perPerson: "Por persona en habitacion doble",
    },
    en: {
      badge: "Reserve",
      title: "Book your spot",
      from: "From",
      currency: "USD",
      taxes: "+ Taxes",
      perPerson: "Per person in double room",
    },
    pt: {
      badge: "Reserve",
      title: "Reserve seu lugar",
      from: "A partir de",
      currency: "USD",
      taxes: "+ Taxas",
      perPerson: "Por pessoa em quarto duplo",
    },
  };

  const c = content[lang] || content.es;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" data-testid="section-reserve-spot">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            <div>
              <Badge className="mb-1">{c.badge}</Badge>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-accent" data-testid="text-reserve-title">
                {c.title}
              </h2>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => scroll("left")}
              data-testid="button-reserve-prev"
              aria-label="Ver paquetes anteriores"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => scroll("right")}
              data-testid="button-reserve-next"
              aria-label="Ver siguientes paquetes"
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
          {PACKAGES.map((pkg) => {
            const title = pkg.title[lang] || pkg.title.es;
            const whatsappMessage = `Hola! Me interesa reservar el paquete "${title}" desde ${pkg.price}${c.currency}. Me gustaria mas informacion.`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(whatsappMessage)}`;
            return (
              <a
                key={pkg.id}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <Card
                  className="w-[260px] overflow-hidden hover-elevate cursor-pointer"
                  data-testid={`card-reserve-${pkg.id}`}
                >
                  <div className="relative">
                    <img
                      src={pkg.image}
                      alt={title}
                      className="w-full h-[320px] object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-display font-bold text-lg mb-2 text-accent">{title}</h3>
                      <p className="text-white/70 text-sm">{c.from}</p>
                      <div className="flex items-baseline gap-1 flex-wrap">
                        <span className="text-xl font-bold text-accent">{pkg.price}{c.currency}</span>
                      </div>
                      <p className="text-white/60 text-xs mt-1">{c.perPerson}</p>
                    </div>
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
