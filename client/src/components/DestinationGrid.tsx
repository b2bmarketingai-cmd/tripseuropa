import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

const DESTINATIONS = [
  {
    id: "spain",
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=40&w=400&auto=format&fit=crop",
    name: { es: "España", en: "Spain", pt: "Espanha" },
    trips: 24,
  },
  {
    id: "france",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=40&w=400&auto=format&fit=crop",
    name: { es: "Francia", en: "France", pt: "Franca" },
    trips: 18,
  },
  {
    id: "italy",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=40&w=400&auto=format&fit=crop",
    name: { es: "Italia", en: "Italy", pt: "Italia" },
    trips: 22,
  },
  {
    id: "portugal",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=40&w=400&auto=format&fit=crop",
    name: { es: "Portugal", en: "Portugal", pt: "Portugal" },
    trips: 12,
  },
  {
    id: "greece",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=40&w=400&auto=format&fit=crop",
    name: { es: "Grecia", en: "Greece", pt: "Grecia" },
    trips: 8,
  },
  {
    id: "uk",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=40&w=400&auto=format&fit=crop",
    name: { es: "Reino Unido", en: "United Kingdom", pt: "Reino Unido" },
    trips: 15,
  },
  {
    id: "germany",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=40&w=400&auto=format&fit=crop",
    name: { es: "Alemania", en: "Germany", pt: "Alemanha" },
    trips: 10,
  },
  {
    id: "netherlands",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=40&w=400&auto=format&fit=crop",
    name: { es: "Paises Bajos", en: "Netherlands", pt: "Paises Baixos" },
    trips: 6,
  },
  {
    id: "switzerland",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=40&w=400&auto=format&fit=crop",
    name: { es: "Suiza", en: "Switzerland", pt: "Suica" },
    trips: 9,
  },
  {
    id: "croatia",
    image: "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?q=40&w=400&auto=format&fit=crop",
    name: { es: "Croacia", en: "Croatia", pt: "Croacia" },
    trips: 5,
  },
  {
    id: "turkey",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=40&w=400&auto=format&fit=crop",
    name: { es: "Turquía", en: "Turkey", pt: "Turquia" },
    trips: 7,
  },
];

export function DestinationGrid() {
  const { language } = useI18n();
  const lang = language as "es" | "en" | "pt";
  const langPrefix = lang === "es" ? "" : lang === "pt" ? "/pt-br" : `/${lang}`;

  const content = {
    es: {
      title: "Donde Quieres Ir?",
      trips: "Viajes",
      viewAll: "Ver todos los destinos",
    },
    en: {
      title: "Where Do You Want To Go?",
      trips: "Trips",
      viewAll: "View all destinations",
    },
    pt: {
      title: "Para Onde Voce Quer Ir?",
      trips: "Viagens",
      viewAll: "Ver todos os destinos",
    },
  };

  return (
    <section className="py-16 bg-background" data-testid="section-destination-grid">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-10" data-testid="text-destination-grid-title">
          <span className="text-accent">{content[lang].title.split(" ")[0]}</span>{" "}
          {content[lang].title.split(" ").slice(1).join(" ")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {DESTINATIONS.map((dest) => (
            <Link 
              key={dest.id} 
              href={`${langPrefix}/destinations/${dest.id}`}
              data-testid={`link-destination-${dest.id}`}
            >
              <div className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer bg-gray-200">
                <img
                  src={dest.image}
                  alt={dest.name[lang]}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-2" data-testid={`text-destination-name-${dest.id}`}>
                    {dest.name[lang]}
                  </h3>
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs"
                  >
                    {dest.trips} {content[lang].trips}
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href={`${langPrefix}/destinations`}>
            <Button variant="outline" size="lg" data-testid="button-view-all-destinations">
              {content[lang].viewAll}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
