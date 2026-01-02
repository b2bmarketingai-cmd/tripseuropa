import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useRoute } from "wouter";
import { 
  Plane, MapPin, Star, Calendar, Clock, 
  CheckCircle, ArrowRight, Shield, Users
} from "lucide-react";

interface RouteInfo {
  originCity: string;
  originCode: string;
  originCountry: string;
  destCity: string;
  destCode: string;
  destCountry: string;
  flightTime: string;
  image: string;
  highlights: string[];
}

const ROUTES_DATA: Record<string, RouteInfo> = {
  "bogota-madrid": {
    originCity: "Bogota",
    originCode: "BOG",
    originCountry: "Colombia",
    destCity: "Madrid",
    destCode: "MAD",
    destCountry: "España",
    flightTime: "10h 30min",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=1200&auto=format&fit=crop",
    highlights: ["Vuelos directos disponibles", "Conexion Avianca/Iberia", "Sin cambio de horario", "Visa Schengen requerida"]
  },
  "bogota-paris": {
    originCity: "Bogota",
    originCode: "BOG",
    originCountry: "Colombia",
    destCity: "Paris",
    destCode: "CDG",
    destCountry: "Francia",
    flightTime: "11h 15min",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=70&w=1200&auto=format&fit=crop",
    highlights: ["Vuelos via Madrid", "Conexion Air France", "Hub Charles de Gaulle", "Visa Schengen requerida"]
  },
  "mexico-madrid": {
    originCity: "Ciudad de Mexico",
    originCode: "MEX",
    originCountry: "Mexico",
    destCity: "Madrid",
    destCode: "MAD",
    destCountry: "España",
    flightTime: "10h 45min",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=1200&auto=format&fit=crop",
    highlights: ["Vuelos directos Iberia/Aeromexico", "Sin escala", "Exencion visa 90 dias", "Conexiones a toda Europa"]
  },
  "mexico-roma": {
    originCity: "Ciudad de Mexico",
    originCode: "MEX",
    originCountry: "Mexico",
    destCity: "Roma",
    destCode: "FCO",
    destCountry: "Italia",
    flightTime: "12h 30min",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=70&w=1200&auto=format&fit=crop",
    highlights: ["Vuelos via Madrid", "Aeropuerto Fiumicino", "Conexiones Alitalia", "Exencion visa 90 dias"]
  },
  "saopaulo-paris": {
    originCity: "Sao Paulo",
    originCode: "GRU",
    originCountry: "Brasil",
    destCity: "Paris",
    destCode: "CDG",
    destCountry: "Francia",
    flightTime: "11h 45min",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=70&w=1200&auto=format&fit=crop",
    highlights: ["Vuelos directos LATAM/Air France", "Guarulhos Internacional", "Hub Paris CDG", "Exencion visa 90 dias"]
  },
  "buenosaires-madrid": {
    originCity: "Buenos Aires",
    originCode: "EZE",
    originCountry: "Argentina",
    destCity: "Madrid",
    destCode: "MAD",
    destCountry: "España",
    flightTime: "12h 30min",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=1200&auto=format&fit=crop",
    highlights: ["Vuelos directos Aerolineas/Iberia", "Aeropuerto Ezeiza", "Conexion directa", "Exencion visa 90 dias"]
  },
  "lima-madrid": {
    originCity: "Lima",
    originCode: "LIM",
    originCountry: "Peru",
    destCity: "Madrid",
    destCode: "MAD",
    destCountry: "España",
    flightTime: "11h 45min",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=1200&auto=format&fit=crop",
    highlights: ["Vuelos directos LATAM/Iberia", "Jorge Chavez Internacional", "Sin escala", "Visa Schengen requerida"]
  },
  "bogota-barcelona": {
    originCity: "Bogota",
    originCode: "BOG",
    originCountry: "Colombia",
    destCity: "Barcelona",
    destCode: "BCN",
    destCountry: "España",
    flightTime: "10h 45min",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=70&w=1200&auto=format&fit=crop",
    highlights: ["Vuelos via Madrid", "El Prat Internacional", "Conexion Vueling", "Visa Schengen requerida"]
  },
  "bogota-roma": {
    originCity: "Bogota",
    originCode: "BOG",
    originCountry: "Colombia",
    destCity: "Roma",
    destCode: "FCO",
    destCountry: "Italia",
    flightTime: "12h 15min",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=70&w=1200&auto=format&fit=crop",
    highlights: ["Vuelos via Madrid/Paris", "Aeropuerto Fiumicino", "Conexion Alitalia", "Visa Schengen requerida"]
  },
  "panama-madrid": {
    originCity: "Panama City",
    originCode: "PTY",
    originCountry: "Panama",
    destCity: "Madrid",
    destCode: "MAD",
    destCountry: "España",
    flightTime: "9h 45min",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=1200&auto=format&fit=crop",
    highlights: ["Vuelos directos Copa/Iberia", "Hub Tocumen", "Excelentes conexiones", "Exencion visa 90 dias"]
  },
};

const PACKAGES_BY_ROUTE = [
  {
    id: "express",
    title: "Express Tour",
    days: 7,
    includes: ["Vuelo ida y vuelta", "Hotel 4 estrellas", "Desayuno incluido", "Traslados aeropuerto"],
    rating: 4.8,
  },
  {
    id: "classic",
    title: "Tour Clasico",
    days: 10,
    includes: ["Vuelo ida y vuelta", "Hotel 4-5 estrellas", "Media pension", "Tours guiados", "Seguro viaje"],
    rating: 4.9,
  },
  {
    id: "premium",
    title: "Premium Experience",
    days: 14,
    includes: ["Vuelo clase ejecutiva", "Hotel 5 estrellas", "Pension completa", "Tours privados", "Concierge 24/7"],
    rating: 5.0,
    featured: true,
  },
];

export default function RouteTemplate() {
  const { language } = useI18n();
  const [, params] = useRoute("/routes/:route");
  const routeSlug = params?.route || "bogota-madrid";
  
  const routeInfo = ROUTES_DATA[routeSlug] || ROUTES_DATA["bogota-madrid"];
  
  const content = {
    badge: { es: "Ruta Popular", en: "Popular Route" },
    h1: { es: `Viajes de ${routeInfo.originCity} a ${routeInfo.destCity}`, en: `Travel from ${routeInfo.originCity} to ${routeInfo.destCity}` },
    subtitle: { 
      es: `Paquetes turisticos completos desde ${routeInfo.originCity} (${routeInfo.originCode}) hasta ${routeInfo.destCity} (${routeInfo.destCode}). Vuelos incluidos, hoteles seleccionados, y experiencias unicas.`, 
      en: `Complete travel packages from ${routeInfo.originCity} (${routeInfo.originCode}) to ${routeInfo.destCity} (${routeInfo.destCode}). Flights included, selected hotels, and unique experiences.` 
    },
    flightTime: { es: "Tiempo de vuelo", en: "Flight time" },
    packages: { es: "Paquetes Disponibles", en: "Available Packages" },
    highlights: { es: "Destacados de la Ruta", en: "Route Highlights" },
    whyBook: { es: "Por que reservar con nosotros", en: "Why book with us" },
    whyItems: {
      es: ["Garantia de mejor precio", "Atencion 24/7 en espanol", "Flexibilidad de cambios", "Seguro de viaje incluido"],
      en: ["Best price guarantee", "24/7 Spanish support", "Flexible changes", "Travel insurance included"]
    },
    days: { es: "dias", en: "days" },
    viewPackage: { es: "Ver Detalles", en: "View Details" },
    cta: { es: "Cotizar Ahora", en: "Get Quote" },
    includes: { es: "Incluye", en: "Includes" },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEOHead
        title={`Viajes ${routeInfo.originCity} ${routeInfo.destCity} - Paquetes Turisticos`}
        description={`Paquetes turisticos desde ${routeInfo.originCity} a ${routeInfo.destCity}. Vuelos incluidos, hoteles 4-5 estrellas, seguro completo. Reserva ahora con Trips Europa.`}
        keywords={`viajes ${routeInfo.originCity} ${routeInfo.destCity}, paquetes ${routeInfo.originCity} ${routeInfo.destCity}, tours ${routeInfo.originCity} ${routeInfo.destCity}`}
        url={`https://tripseuropa.com/routes/${routeSlug}`}
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://tripseuropa.com" },
        { name: `Desde ${routeInfo.originCountry}`, url: `https://tripseuropa.com/desde-${routeInfo.originCountry.toLowerCase()}` },
        { name: `${routeInfo.originCity} - ${routeInfo.destCity}`, url: `https://tripseuropa.com/routes/${routeSlug}` }
      ]} />
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-route-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={routeInfo.image}
            alt={`Viaje ${routeInfo.originCity} a ${routeInfo.destCity}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-route">
              {content.badge[language]}
            </Badge>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{routeInfo.originCode}</div>
                <div className="text-white/70 text-sm">{routeInfo.originCity}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-0.5 bg-accent"></div>
                <Plane className="w-6 h-6 text-accent" />
                <div className="w-16 h-0.5 bg-accent"></div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{routeInfo.destCode}</div>
                <div className="text-white/70 text-sm">{routeInfo.destCity}</div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6" data-testid="text-route-h1">
              {content.h1[language]}
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl" data-testid="text-route-subtitle">
              {content.subtitle[language]}
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="w-5 h-5 text-accent" />
                <span>{content.flightTime[language]}: {routeInfo.flightTime}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="w-5 h-5 text-accent" />
                <span>Seguro Incluido</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Users className="w-5 h-5 text-accent" />
                <span>+500 viajeros</span>
              </div>
            </div>

            <Link href="/contacto">
              <Button size="lg" className="bg-accent text-primary font-bold hover:bg-accent/90">
                {content.cta[language]}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-route-highlights">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-8 text-center">
            {content.highlights[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {routeInfo.highlights.map((highlight, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-4" />
                  <p className="font-medium">{highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-route-packages">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-8 text-center">
            {content.packages[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PACKAGES_BY_ROUTE.map((pkg) => (
              <Card key={pkg.id} className={`relative ${pkg.featured ? 'ring-2 ring-accent' : ''}`}>
                {pkg.featured && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-primary">
                    Recomendado
                  </Badge>
                )}
                <CardContent className="pt-8">
                  <h3 className="text-xl font-bold text-primary mb-2">{pkg.title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{pkg.days} {content.days[language]}</span>
                    <Star className="w-4 h-4 text-accent fill-accent ml-auto" />
                    <span className="text-sm">{pkg.rating}</span>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm font-medium text-muted-foreground mb-2">{content.includes[language]}:</p>
                    <ul className="space-y-2">
                      {pkg.includes.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href="/contacto">
                    <Button className="w-full" variant={pkg.featured ? "default" : "outline"}>
                      {content.viewPackage[language]}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white" data-testid="section-route-why">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-accent mb-8">
            {content.whyBook[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {content.whyItems[language].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-accent mb-4" />
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
