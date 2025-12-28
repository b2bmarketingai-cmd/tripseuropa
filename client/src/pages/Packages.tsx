import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Calendar, Users, Plane, Hotel, Car, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const PACKAGES = [
  {
    id: "honeymoon",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=70&w=800&auto=format&fit=crop",
    titleKey: "pkg.honeymoon.title",
    descKey: "pkg.honeymoon.desc",
    price: { es: "$12,500,000", en: "$12,500" },
    days: 14,
    destinations: ["Paris", "Venecia", "Santorini"],
    features: ["Vuelos directos", "Hoteles 5 estrellas", "Traslados privados", "Tours romanticos"],
    tag: { es: "Luna de Miel", en: "Honeymoon" },
    rating: 4.9,
    featured: false
  },
  {
    id: "adventure",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=70&w=800&auto=format&fit=crop",
    titleKey: "pkg.adventure.title",
    descKey: "pkg.adventure.desc",
    price: { es: "$9,800,000", en: "$9,800" },
    days: 12,
    destinations: ["Suiza", "Austria", "Alemania"],
    features: ["Swiss Travel Pass", "Hoteles de montana", "Teleferico incluido", "Guia local"],
    tag: { es: "Aventura", en: "Adventure" },
    rating: 4.8,
    featured: true
  },
  {
    id: "cultural",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?q=70&w=800&auto=format&fit=crop",
    titleKey: "pkg.cultural.title",
    descKey: "pkg.cultural.desc",
    price: { es: "$10,200,000", en: "$10,200" },
    days: 10,
    destinations: ["Viena", "Praga", "Budapest"],
    features: ["Vuelos + Tren", "Hoteles centricos", "Conciertos clasicos", "Tours guiados"],
    tag: { es: "Cultural", en: "Cultural" },
    rating: 4.9,
    featured: false
  },
  {
    id: "mediterranean",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=70&w=800&auto=format&fit=crop",
    titleKey: "pkg.mediterranean.title",
    descKey: "pkg.mediterranean.desc",
    price: { es: "$11,500,000", en: "$11,500" },
    days: 15,
    destinations: ["Barcelona", "Costa Amalfitana", "Croacia"],
    features: ["Crucero incluido", "Hoteles boutique", "Excursiones en yate", "Gastronomia local"],
    tag: { es: "Mediterraneo", en: "Mediterranean" },
    rating: 4.8,
    featured: false
  },
  {
    id: "family",
    image: "https://images.unsplash.com/photo-1499678329028-101435549a4e?q=70&w=800&auto=format&fit=crop",
    titleKey: "pkg.family.title",
    descKey: "pkg.family.desc",
    price: { es: "$15,800,000", en: "$15,800" },
    days: 12,
    destinations: ["Paris", "Londres", "Amsterdam"],
    features: ["Disneyland Paris", "Actividades para ninos", "Hoteles familiares", "Transporte comodo"],
    tag: { es: "Familiar", en: "Family" },
    rating: 4.7,
    featured: false
  },
  {
    id: "luxury",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=70&w=800&auto=format&fit=crop",
    titleKey: "pkg.luxury.title",
    descKey: "pkg.luxury.desc",
    price: { es: "$25,000,000", en: "$25,000" },
    days: 18,
    destinations: ["Monaco", "St. Tropez", "Capri"],
    features: ["Primera clase", "Suites de lujo", "Experiencias VIP", "Mayordomo privado"],
    tag: { es: "Lujo", en: "Luxury" },
    rating: 5.0,
    featured: false
  }
];

export default function Packages() {
  const { t, language } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-packages-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=60&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-packages">
            {language === "es" ? "Paquetes Exclusivos" : "Exclusive Packages"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-packages-title">
            {language === "es" ? "Viajes a tu Medida" : "Tailored Trips"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto" data-testid="text-packages-subtitle">
            {language === "es" 
              ? "Paquetes disenados para crear experiencias inolvidables en Europa" 
              : "Packages designed to create unforgettable experiences in Europe"}
          </p>
        </div>
      </section>

      <section className="py-20" data-testid="section-packages-grid">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => (
              <Card key={pkg.id} className={`group overflow-hidden ${pkg.featured ? "ring-2 ring-accent shadow-xl" : ""}`} data-testid={`card-package-${pkg.id}`}>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={t(pkg.titleKey)} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge className="absolute top-4 left-4 bg-accent text-primary">{pkg.tag[language]}</Badge>
                  {pkg.featured && (
                    <Badge className="absolute top-4 right-4 bg-primary text-white">
                      {language === "es" ? "Mas vendido" : "Best Seller"}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="text-sm font-bold">{pkg.rating}</span>
                    </div>
                    <span className="text-muted-foreground">|</span>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      {pkg.days} {language === "es" ? "dias" : "days"}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold mb-2">{t(pkg.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{t(pkg.descKey)}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {pkg.destinations.map((d, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{d}</Badge>
                    ))}
                  </div>

                  <div className="space-y-2 mb-6">
                    {pkg.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">{language === "es" ? "Desde" : "From"}</p>
                      <p className="text-2xl font-bold text-accent">{pkg.price[language]}</p>
                      <p className="text-xs text-muted-foreground">{language === "es" ? "por persona" : "per person"}</p>
                    </div>
                    <Button data-testid={`button-package-${pkg.id}`}>
                      {language === "es" ? "Cotizar" : "Quote"}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent/10" data-testid="section-packages-custom">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Plane className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold">{language === "es" ? "Vuelos Premium" : "Premium Flights"}</h3>
              <p className="text-muted-foreground text-sm">
                {language === "es" ? "Vuelos directos o con escalas minimas" : "Direct flights or with minimal stopovers"}
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Hotel className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold">{language === "es" ? "Hoteles Seleccionados" : "Selected Hotels"}</h3>
              <p className="text-muted-foreground text-sm">
                {language === "es" ? "4 y 5 estrellas en ubicaciones privilegiadas" : "4 and 5 stars in privileged locations"}
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Car className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold">{language === "es" ? "Traslados Incluidos" : "Transfers Included"}</h3>
              <p className="text-muted-foreground text-sm">
                {language === "es" ? "Transporte privado en todos los destinos" : "Private transportation in all destinations"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
