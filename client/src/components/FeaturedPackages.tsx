import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";
import { openWhatsAppQuote } from "@/lib/whatsapp";
import OptimizedImage from "@/components/OptimizedImage";

const PACKAGES = [
  {
    id: "TE-001",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=60&w=800&auto=format&fit=crop",
    title: { es: "Sinfonia Europea", en: "European Symphony" },
    destinations: { es: "Roma, Paris, Madrid y Barcelona", en: "Rome, Paris, Madrid and Barcelona" },
    price: "2,799",
    days: 15,
    nights: 13,
  },
  {
    id: "TE-002",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=60&w=800&auto=format&fit=crop",
    title: { es: "España y Marruecos", en: "Spain and Morocco" },
    destinations: { es: "Madrid, Sevilla, Marrakech y Barcelona", en: "Madrid, Seville, Marrakech and Barcelona" },
    price: "2,899",
    days: 14,
    nights: 12,
  },
  {
    id: "TE-003",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=60&w=800&auto=format&fit=crop",
    title: { es: "Grecia Magica", en: "Magical Greece" },
    destinations: { es: "Atenas, Santorini y Mykonos", en: "Athens, Santorini and Mykonos" },
    price: "3,199",
    days: 12,
    nights: 10,
  },
  {
    id: "TE-004",
    image: "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?q=60&w=800&auto=format&fit=crop",
    title: { es: "Capitales Europeas", en: "European Capitals" },
    destinations: { es: "Londres, Paris, Amsterdam y Berlin", en: "London, Paris, Amsterdam and Berlin" },
    price: "3,499",
    days: 17,
    nights: 15,
  },
  {
    id: "TE-005",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=60&w=800&auto=format&fit=crop",
    title: { es: "Benelux Express", en: "Benelux Express" },
    destinations: { es: "Amsterdam, Bruselas y Brujas", en: "Amsterdam, Brussels and Bruges" },
    price: "2,199",
    days: 10,
    nights: 8,
  },
  {
    id: "TE-006",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=60&w=800&auto=format&fit=crop",
    title: { es: "Europa Central", en: "Central Europe" },
    destinations: { es: "Viena, Praga, Budapest y Munich", en: "Vienna, Prague, Budapest and Munich" },
    price: "2,999",
    days: 14,
    nights: 12,
  },
];

export function FeaturedPackages() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  const content = {
    es: {
      title: "Paquetes Destacados 2025",
      subtitle: "Descubre nuestras ofertas exclusivas para explorar los destinos mas fascinantes de Europa",
      from: "Desde",
      currency: "USD",
      perPerson: "Por persona",
      quote: "Cotizar",
      viewMore: "Ver mas",
      viewAll: "Ver todos los paquetes",
    },
    en: {
      title: "Featured Packages 2025",
      subtitle: "Discover our exclusive offers to explore the most fascinating destinations in Europe",
      from: "From",
      currency: "USD",
      perPerson: "Per person",
      quote: "Get Quote",
      viewMore: "View more",
      viewAll: "View all packages",
    },
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-950" data-testid="section-featured-packages">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-accent" data-testid="text-packages-title">
            {content[lang].title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{content[lang].subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden group" data-testid={`card-package-${pkg.id}`}>
              <div className="relative aspect-[16/10]">
                <OptimizedImage
                  src={pkg.image}
                  alt={pkg.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  objectFit="cover"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-white">
                  {pkg.id}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-accent" data-testid={`text-package-title-${pkg.id}`}>
                  {pkg.title[lang]}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{pkg.destinations[lang]}</p>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-muted-foreground text-sm">{content[lang].from}</span>
                  <span className="text-2xl font-bold text-primary">{content[lang].currency} {pkg.price}</span>
                </div>
                <p className="text-muted-foreground text-xs mb-4">{content[lang].perPerson}</p>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {pkg.days} {lang === "es" ? "dias" : "days"} / {pkg.nights} {lang === "es" ? "noches" : "nights"}
                </p>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-accent text-primary hover:bg-accent/90" 
                    data-testid={`button-quote-${pkg.id}`}
                    onClick={() => openWhatsAppQuote({ es: pkg.title.es, en: pkg.title.en, pt: pkg.title.pt || pkg.title.es }, lang)}
                  >
                    {content[lang].quote}
                  </Button>
                  <Link href={`/packages/${pkg.id}`}>
                    <Button variant="outline" data-testid={`button-view-${pkg.id}`}>
                      {content[lang].viewMore}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/packages">
            <Button variant="outline" size="lg" data-testid="button-view-all-packages">
              {content[lang].viewAll}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
