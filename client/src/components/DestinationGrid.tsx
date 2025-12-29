import { Card } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

const DESTINATIONS = [
  {
    id: "spain",
    image: "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?q=80&w=800&auto=format&fit=crop",
    name: { es: "Espana", en: "Spain" },
    trips: 12,
  },
  {
    id: "italy",
    image: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?q=80&w=800&auto=format&fit=crop",
    name: { es: "Italia", en: "Italy" },
    trips: 15,
  },
  {
    id: "france",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    name: { es: "Francia", en: "France" },
    trips: 10,
  },
  {
    id: "greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop",
    name: { es: "Grecia", en: "Greece" },
    trips: 8,
  },
  {
    id: "portugal",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800&auto=format&fit=crop",
    name: { es: "Portugal", en: "Portugal" },
    trips: 6,
  },
  {
    id: "germany",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800&auto=format&fit=crop",
    name: { es: "Alemania", en: "Germany" },
    trips: 7,
  },
  {
    id: "norway",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    name: { es: "Noruega", en: "Norway" },
    trips: 5,
  },
  {
    id: "croatia",
    image: "https://images.unsplash.com/photo-1541343672885-9be56236c64e?q=80&w=800&auto=format&fit=crop",
    name: { es: "Croacia", en: "Croatia" },
    trips: 6,
  },
  {
    id: "scotland",
    image: "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?q=80&w=800&auto=format&fit=crop",
    name: { es: "Escocia", en: "Scotland" },
    trips: 4,
  },
  {
    id: "iceland",
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=800&auto=format&fit=crop",
    name: { es: "Islandia", en: "Iceland" },
    trips: 5,
  },
];

export function DestinationGrid() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  const content = {
    es: {
      title: "Donde quieres ir?",
      trips: "Viajes",
    },
    en: {
      title: "Where do you want to go?",
      trips: "Trips",
    },
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-destination-grid">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-10 text-foreground" data-testid="text-destination-grid-title">
          {content[lang].title}
        </h2>

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
      </div>
    </section>
  );
}
