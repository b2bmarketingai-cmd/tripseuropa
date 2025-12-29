import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

const DESTINATIONS = [
  {
    id: "paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    name: { es: "Paris", en: "Paris" },
    country: { es: "Francia", en: "France" },
    packages: 12,
  },
  {
    id: "roma",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop",
    name: { es: "Roma", en: "Rome" },
    country: { es: "Italia", en: "Italy" },
    packages: 15,
  },
  {
    id: "barcelona",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=800&auto=format&fit=crop",
    name: { es: "Barcelona", en: "Barcelona" },
    country: { es: "España", en: "Spain" },
    packages: 10,
  },
  {
    id: "santorini",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop",
    name: { es: "Santorini", en: "Santorini" },
    country: { es: "Grecia", en: "Greece" },
    packages: 8,
  },
  {
    id: "amsterdam",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=800&auto=format&fit=crop",
    name: { es: "Amsterdam", en: "Amsterdam" },
    country: { es: "Paises Bajos", en: "Netherlands" },
    packages: 6,
  },
];

export function DestinationGrid() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  const content = {
    es: {
      title: "Destinos Populares",
      subtitle: "Explora los rincones mas bellos de Europa con nuestros viajes disenados especialmente para ti",
      packages: "paquetes disponibles",
      explore: "Explorar",
      viewAll: "Ver todos los destinos",
    },
    en: {
      title: "Popular Destinations",
      subtitle: "Explore the most beautiful corners of Europe with our trips designed especially for you",
      packages: "packages available",
      explore: "Explore",
      viewAll: "View all destinations",
    },
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" data-testid="section-destination-grid">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-accent" data-testid="text-destination-grid-title">
            {content[lang].title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{content[lang].subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {DESTINATIONS.map((dest) => (
            <Link 
              key={dest.id} 
              href={`/destinations/${dest.id}`}
              data-testid={`link-destination-${dest.id}`}
            >
              <Card className="group overflow-hidden cursor-pointer h-full">
                <div className="relative aspect-[4/5]">
                  <img
                    src={dest.image}
                    alt={dest.name[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <Badge className="absolute top-4 left-4 bg-accent/90 text-primary border-0">
                    {dest.country[lang]}
                  </Badge>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1" data-testid={`text-destination-name-${dest.id}`}>
                      {dest.name[lang]}
                    </h3>
                    <p className="text-white/80 text-sm mb-3">
                      {dest.packages} {content[lang].packages}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-white/50 text-white hover:bg-white/20 w-full"
                      data-testid={`button-explore-${dest.id}`}
                    >
                      {content[lang].explore}
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/destinations">
            <Button variant="outline" size="lg" data-testid="button-view-all-destinations">
              {content[lang].viewAll}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
