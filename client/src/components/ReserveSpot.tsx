import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const PACKAGES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Europa Clasica Smart", en: "Classic Europe Smart", pt: "Europa Classica Smart" },
    price: "1,699",
    taxes: "799",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Estrellas de Europa Smart", en: "Stars of Europe Smart", pt: "Estrelas da Europa Smart" },
    price: "2,399",
    taxes: "799",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Magia Italiana", en: "Italian Magic", pt: "Magia Italiana" },
    price: "1,299",
    taxes: "799",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Viva Europa", en: "Viva Europe", pt: "Viva Europa" },
    price: "1,599",
    taxes: "799",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=35&w=400&fm=webp&auto=format&fit=crop",
    title: { es: "Bellezas de Europa", en: "Beauties of Europe", pt: "Belezas da Europa" },
    price: "2,399",
    taxes: "799",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?q=35&w=400&fm=webp&auto=format&fit=crop",
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
      prevLabel: "Paquete anterior",
      nextLabel: "Siguiente paquete",
      bookLabel: "Reservar",
    },
    en: {
      badge: "Reserve",
      title: "Book your spot",
      from: "From",
      currency: "USD",
      taxes: "+ Taxes",
      perPerson: "Per person in double room",
      prevLabel: "Previous package",
      nextLabel: "Next package",
      bookLabel: "Book now",
    },
    pt: {
      badge: "Reserve",
      title: "Reserve seu lugar",
      from: "A partir de",
      currency: "USD",
      taxes: "+ Taxas",
      perPerson: "Por pessoa em quarto duplo",
      prevLabel: "Pacote anterior",
      nextLabel: "Proximo pacote",
      bookLabel: "Reservar",
    },
  };

  const c = content[lang] || content.es;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" data-testid="section-reserve-spot" aria-label={c.title}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Badge className="mb-2">{c.badge}</Badge>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary" data-testid="text-reserve-title">{c.title}</h2>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              data-testid="button-reserve-prev"
              aria-label={c.prevLabel}
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              data-testid="button-reserve-next"
              aria-label={c.nextLabel}
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          role="list"
          aria-label={c.title}
        >
          {PACKAGES.map((pkg) => {
            const title = pkg.title[lang] || pkg.title.es;
            const whatsappMessage = `Hola! Me interesa reservar el paquete "${title}" - Paquete ID ${pkg.id} desde ${pkg.price}${c.currency}. Me gustaria mas informacion.`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(whatsappMessage)}`;
            return (
              <Card key={pkg.id} className="flex-shrink-0 w-72 overflow-hidden hover:shadow-xl transition-shadow" role="listitem">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={pkg.image}
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
                    <span className="text-2xl font-bold text-accent">${pkg.price}</span>
                    <span className="text-sm text-gray-500">{c.currency}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{c.perPerson}</p>
                  <div className="mt-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-accent text-primary text-xs font-bold px-3 py-2 rounded-md hover:bg-accent/90 transition-colors w-full justify-center"
                      aria-label={`${c.bookLabel}: ${title} ${c.from} $${pkg.price} ${c.currency}`}
                    >
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      {c.bookLabel}
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
