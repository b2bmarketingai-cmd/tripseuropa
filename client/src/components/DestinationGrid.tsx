import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

const DESTINATIONS = [
  {
    id: "france",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    name: { es: "Francia", en: "France" },
    trips: 24,
  },
  {
    id: "italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop",
    name: { es: "Italia", en: "Italy" },
    trips: 32,
  },
  {
    id: "greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop",
    name: { es: "Grecia", en: "Greece" },
    trips: 18,
  },
  {
    id: "spain",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=800&auto=format&fit=crop",
    name: { es: "Espana", en: "Spain" },
    trips: 28,
  },
  {
    id: "switzerland",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop",
    name: { es: "Suiza", en: "Switzerland" },
    trips: 12,
  },
];

export function DestinationGrid() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  const content = {
    es: {
      title: "Explora Europa",
      subtitle: "Descubre los destinos mas fascinantes del viejo continente con nuestros circuitos exclusivos",
      trips: "circuitos",
      viewAll: "Ver todos los destinos",
    },
    en: {
      title: "Explore Europe",
      subtitle: "Discover the most fascinating destinations of the old continent with our exclusive tours",
      trips: "tours",
      viewAll: "View all destinations",
    },
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-destination-grid">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground" data-testid="text-destination-grid-title">
            {content[lang].title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{content[lang].subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {DESTINATIONS.map((dest) => (
            <Link 
              key={dest.id} 
              href={`/destinations/${dest.id}`}
              className="block group"
              data-testid={`link-destination-${dest.id}`}
            >
              <Card className="overflow-hidden bg-transparent border-0 shadow-none hover-elevate">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg mb-0.5">
                      {dest.name[lang]}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {dest.trips} {content[lang].trips}
                    </p>
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
