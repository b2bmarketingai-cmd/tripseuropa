import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

const OFFERS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop",
    title: { es: "GRECIA EN SEMANA SANTA", en: "GREECE IN EASTER" },
    originalPrice: "3,599",
    discountPrice: "2,899",
    discount: 20,
    days: 10,
    deadline: { es: "Hasta 15 Ene 2025", en: "Until Jan 15, 2025" },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?q=80&w=800&auto=format&fit=crop",
    title: { es: "LONDRES EXPRESS", en: "LONDON EXPRESS" },
    originalPrice: "1,899",
    discountPrice: "1,499",
    discount: 21,
    days: 5,
    deadline: { es: "Hasta 20 Ene 2025", en: "Until Jan 20, 2025" },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=800&auto=format&fit=crop",
    title: { es: "VIENA Y PRAGA", en: "VIENNA AND PRAGUE" },
    originalPrice: "2,499",
    discountPrice: "1,999",
    discount: 20,
    days: 8,
    deadline: { es: "Hasta 31 Dic 2024", en: "Until Dec 31, 2024" },
  },
];

export function SpecialOffers() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  const content = {
    es: {
      badge: "Ofertas limitadas",
      title: "Ofertas Especiales",
      currency: "USD",
      days: "dias",
      reserve: "Reservar ahora",
      viewAll: "Ver todas las ofertas",
    },
    en: {
      badge: "Limited offers",
      title: "Special Offers",
      currency: "USD",
      days: "days",
      reserve: "Book now",
      viewAll: "View all offers",
    },
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" data-testid="section-special-offers">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
              {content[lang].badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground" data-testid="text-offers-title">
              {content[lang].title}
            </h2>
          </div>
          <Link href="/offers">
            <Button variant="outline" data-testid="button-view-all-offers">
              {content[lang].viewAll}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERS.map((offer) => (
            <Card key={offer.id} className="overflow-hidden group" data-testid={`card-offer-${offer.id}`}>
              <div className="relative aspect-[4/3]">
                <img
                  src={offer.image}
                  alt={offer.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0 text-lg px-3 py-1">
                  -{offer.discount}%
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 text-foreground" data-testid={`text-offer-title-${offer.id}`}>
                  {offer.title[lang]}
                </h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-muted-foreground line-through">
                    {content[lang].currency} {offer.originalPrice}
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {content[lang].currency} {offer.discountPrice}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{offer.days} {content[lang].days}</span>
                  <span>{offer.deadline[lang]}</span>
                </div>

                <Link href="/contact">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90" data-testid={`button-reserve-${offer.id}`}>
                    {content[lang].reserve}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
