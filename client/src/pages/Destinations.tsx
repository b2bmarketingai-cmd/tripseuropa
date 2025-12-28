import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const DESTINATIONS = [
  {
    id: "paris",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=800&auto=format&fit=crop",
    titleKey: "dest.paris",
    countryKey: "country.france",
    descKey: "dest.paris.desc",
    price: { es: "Desde $4,299,000", en: "From $4,299" },
    rating: 4.9,
    days: 7,
    highlights: ["Torre Eiffel", "Louvre", "Versalles", "Montmartre"]
  },
  {
    id: "rome",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=70&w=800&auto=format&fit=crop",
    titleKey: "dest.rome",
    countryKey: "country.italy",
    descKey: "dest.rome.desc",
    price: { es: "Desde $3,899,000", en: "From $3,899" },
    rating: 4.8,
    days: 6,
    highlights: ["Coliseo", "Vaticano", "Fontana di Trevi", "Pantheon"]
  },
  {
    id: "barcelona",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=70&w=800&auto=format&fit=crop",
    titleKey: "dest.barcelona",
    countryKey: "country.spain",
    descKey: "dest.barcelona.desc",
    price: { es: "Desde $3,499,000", en: "From $3,499" },
    rating: 4.9,
    days: 5,
    highlights: ["Sagrada Familia", "Park Guell", "La Rambla", "Casa Batllo"]
  },
  {
    id: "santorini",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=70&w=800&auto=format&fit=crop",
    titleKey: "dest.santorini",
    countryKey: "country.greece",
    descKey: "dest.santorini.desc",
    price: { es: "Desde $5,199,000", en: "From $5,199" },
    rating: 4.9,
    days: 8,
    highlights: ["Oia", "Fira", "Red Beach", "Akrotiri"]
  },
  {
    id: "amsterdam",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=70&w=800&auto=format&fit=crop",
    titleKey: "dest.amsterdam",
    countryKey: "country.netherlands",
    descKey: "dest.amsterdam.desc",
    price: { es: "Desde $3,799,000", en: "From $3,799" },
    rating: 4.7,
    days: 5,
    highlights: ["Canales", "Rijksmuseum", "Casa de Ana Frank", "Vondelpark"]
  },
  {
    id: "london",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=70&w=800&auto=format&fit=crop",
    titleKey: "dest.london",
    countryKey: "country.england",
    descKey: "dest.london.desc",
    price: { es: "Desde $4,099,000", en: "From $4,099" },
    rating: 4.8,
    days: 6,
    highlights: ["Big Ben", "Tower Bridge", "Buckingham Palace", "British Museum"]
  },
  {
    id: "madrid",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=70&w=800&auto=format&fit=crop",
    titleKey: "dest.madrid",
    countryKey: "country.spain",
    descKey: "dest.madrid.desc",
    price: { es: "Desde $3,299,000", en: "From $3,299" },
    rating: 4.7,
    days: 5,
    highlights: ["Museo del Prado", "Palacio Real", "Parque del Retiro", "Gran Via"]
  },
  {
    id: "vienna",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=70&w=800&auto=format&fit=crop",
    titleKey: "dest.vienna",
    countryKey: "country.austria",
    descKey: "dest.vienna.desc",
    price: { es: "Desde $4,199,000", en: "From $4,199" },
    rating: 4.8,
    days: 6,
    highlights: ["Schonbrunn", "Opera de Viena", "Hofburg", "Prater"]
  }
];

export default function Destinations() {
  const { t, language } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-destinations-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=60&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-destinations">
            {language === "es" ? "Destinos Premium" : "Premium Destinations"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-destinations-title">
            {language === "es" ? "Explora Europa" : "Explore Europe"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto" data-testid="text-destinations-subtitle">
            {language === "es" 
              ? "Descubre los destinos mas exclusivos de Europa con nuestros paquetes personalizados" 
              : "Discover the most exclusive destinations in Europe with our personalized packages"}
          </p>
        </div>
      </section>

      <section className="py-20" data-testid="section-destinations-grid">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DESTINATIONS.map((dest, index) => (
              <Card key={dest.id} className="group overflow-hidden" data-testid={`card-destination-${dest.id}`}>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={t(dest.titleKey)} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                  <Badge className="absolute top-4 left-4 bg-white/90 text-primary">
                    {dest.days} {language === "es" ? "dias" : "days"}
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="text-sm font-bold">{dest.rating}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold">{t(dest.titleKey)}</h3>
                    <div className="flex items-center gap-1 text-white/80 text-sm">
                      <MapPin className="w-3 h-3" />
                      {t(dest.countryKey)}
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {dest.highlights.slice(0, 3).map((h, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{h}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{language === "es" ? "Desde" : "From"}</p>
                      <p className="text-lg font-bold text-accent">{dest.price[language]}</p>
                    </div>
                    <Button size="sm" data-testid={`button-destination-${dest.id}`}>
                      {language === "es" ? "Ver mas" : "View more"}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-destinations-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {language === "es" ? "No encuentras tu destino ideal?" : "Can't find your ideal destination?"}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {language === "es" 
              ? "Nuestros asesores pueden crear un viaje personalizado a cualquier destino europeo" 
              : "Our advisors can create a personalized trip to any European destination"}
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90" data-testid="button-contact-advisor">
              {language === "es" ? "Hablar con un asesor" : "Talk to an advisor"}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
