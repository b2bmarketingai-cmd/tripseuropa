import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Plane, MapPin, Star, Calendar, Users, Shield, Clock, 
  CheckCircle, ArrowRight, Phone, MessageCircle, DollarSign,
  Building, CreditCard, Globe, Compass, Camera, Heart,
  HelpCircle, ChevronDown, ChevronUp, Briefcase
} from "lucide-react";
import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { FAQSchema, BreadcrumbSchema, BlogPostSchema } from "@/components/SEOSchema";

const TOP_DESTINATIONS = [
  {
    id: "madrid",
    name: "Madrid, España",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=600&auto=format&fit=crop",
    why: ["Idioma español (ventaja cultural)", "Facil acceso a otros paises", "Vida nocturna vibrante", "Museos: Prado, Reina Sofia"],
    duration: "8-10 dias",
    priceRange: "$9,500 - $12,500 USD",
    bestTime: "Abril - Octubre",
    routes: ["Barcelona", "Valencia", "Sevilla"],
  },
  {
    id: "roma",
    name: "Roma, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    why: ["Patrimonio historico unico", "Gastronomia superior", "Destino romantico", "Seguro para familias"],
    duration: "10-12 dias",
    priceRange: "$10,000 - $13,500 USD",
    bestTime: "Mayo, Septiembre, Octubre",
    routes: ["Florencia", "Venecia", "Milan", "Pompeya"],
  },
  {
    id: "paris",
    name: "Paris, Francia",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    why: ["Lujo y sofisticacion", "Torre Eiffel iconica", "Museo del Louvre", "Gastronomia mundial"],
    duration: "8-10 dias",
    priceRange: "$9,800 - $13,000 USD",
    bestTime: "Abril - Junio, Septiembre",
    routes: ["Versalles", "Normandia", "Provence"],
  },
  {
    id: "barcelona",
    name: "Barcelona, España",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600&auto=format&fit=crop",
    why: ["Playas + arquitectura", "Obras de Gaudi", "Vida moderna", "Fiestas en verano"],
    duration: "6-8 dias",
    priceRange: "$8,500 - $11,000 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Costa Brava", "Montserrat"],
  },
  {
    id: "lisboa",
    name: "Lisboa, Portugal",
    countryCode: "PT",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=600&auto=format&fit=crop",
    why: ["Presupuesto accesible", "Playas cercanas", "Cultura autentica", "Crecimiento turistico"],
    duration: "5-7 dias",
    priceRange: "$7,500 - $9,500 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Cascais", "Oporto", "Algarve"],
  },
  {
    id: "amsterdam",
    name: "Amsterdam, Paises Bajos",
    countryCode: "NL",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=600&auto=format&fit=crop",
    why: ["Canales pintorescos", "Cultura liberal", "Bicicletas + museos", "Acceso a Belgica"],
    duration: "4-5 dias",
    priceRange: "$6,500 - $8,500 USD",
    bestTime: "Abril - Octubre",
    routes: ["Bruselas", "Brujas"],
  },
];

const TRAVEL_ROUTES = [
  {
    id: "clasica",
    name: "Ruta Clasica Europa",
    duration: "12-14 dias",
    route: "Bogota/Medellin → Madrid → Roma → Paris → Bogota/Medellin",
    price: "$11,550 - $14,050 USD",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop",
    highlights: ["3 noches Madrid", "3 noches Roma", "3 noches Paris"],
    keywords: ["viaje Europa 14 dias desde Colombia", "ruta Madrid Roma Paris Colombia"],
  },
  {
    id: "romantica",
    name: "Europa Romantica",
    duration: "10-12 dias",
    route: "Bogota → Paris → Roma → Venecia → Bogota",
    price: "$10,200 - $13,500 USD",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop",
    highlights: ["Luna de miel perfecta", "Ciudades romanticas", "Cenas especiales"],
    keywords: ["luna de miel Europa Colombia", "Paris Roma Venecia desde Bogota"],
  },
  {
    id: "aventura",
    name: "Europa Aventura",
    duration: "15-18 dias",
    route: "Bogota → Madrid → Barcelona → Paris → Amsterdam → Bogota",
    price: "$12,500 - $16,000 USD",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
    highlights: ["4 paises en un viaje", "Vida nocturna", "Experiencias urbanas"],
    keywords: ["tour Europa 15 dias Colombia", "viaje multi-pais Europa"],
  },
  {
    id: "economica",
    name: "Europa Economica",
    duration: "8-10 dias",
    route: "Bogota → Lisboa → Barcelona → Bogota",
    price: "$7,500 - $9,500 USD",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800&auto=format&fit=crop",
    highlights: ["Mejor relacion precio-calidad", "Ciudades accesibles", "Primera vez ideal"],
    keywords: ["viajes economicos Europa Colombia", "paquete barato Portugal España"],
  },
  {
    id: "lujo",
    name: "Europa Lujo",
    duration: "12-14 dias",
    route: "Bogota → Paris (5 estrellas) → Suiza → Italia (5 estrellas) → Bogota",
    price: "$18,000 - $25,000 USD",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    highlights: ["Hoteles 5 estrellas", "Experiencias exclusivas", "Servicio VIP"],
    keywords: ["viajes de lujo Europa desde Colombia", "tour premium Europa"],
  },
  {
    id: "marruecos",
    name: "Europa + Norte de Africa",
    duration: "14-16 dias",
    route: "Bogota → Madrid → Marruecos → Paris → Bogota",
    price: "$11,500 - $14,500 USD",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=800&auto=format&fit=crop",
    highlights: ["2 continentes", "Cultura diversa", "Experiencia unica"],
    keywords: ["viaje España Marruecos Francia", "tour Mediterraneo desde Colombia"],
  },
];

const DEPARTURE_CITIES = [
  {
    name: "Bogota",
    code: "BOG",
    airport: "El Dorado",
    priority: "ALTA",
    population: "8.2M",
    features: ["Capital financiera", "Mayor poder adquisitivo", "Vuelos directos a Europa"],
    routes: ["Paris (Avianca/LATAM)", "Madrid (LATAM)", "Roma (conexion)", "Barcelona (conexion)"],
  },
  {
    name: "Medellin",
    code: "MDE",
    airport: "Rionegro (Jose Maria Cordova)",
    priority: "ALTA",
    population: "2.6M",
    features: ["Ciudad de negocios", "Turismo empresarial + ocio"],
    routes: ["Madrid", "Barcelona", "Paris", "Italia"],
  },
  {
    name: "Cali",
    code: "CLO",
    airport: "Bonilla Aragon",
    priority: "MEDIA",
    population: "2.3M",
    features: ["Tercera ciudad Colombia", "Mercado emergente"],
    routes: ["Madrid", "Barcelona", "Europa (conexion Miami/Panama)"],
  },
  {
    name: "Barranquilla",
    code: "BAQ",
    airport: "Errazuriz",
    priority: "MEDIA",
    population: "1.4M",
    features: ["Puerta al Caribe", "Crecimiento turistico"],
    routes: ["Europa via Miami", "Europa via Panama"],
  },
];

const PRICE_TABLE = [
  { duration: "5 dias", low: "$3,500", medium: "$5,500", high: "$9,000" },
  { duration: "7 dias", low: "$4,500", medium: "$7,000", high: "$12,000" },
  { duration: "10 dias", low: "$6,500", medium: "$10,000", high: "$17,000" },
  { duration: "12 dias", low: "$7,500", medium: "$12,000", high: "$20,000" },
  { duration: "14 dias", low: "$8,500", medium: "$14,000", high: "$24,000" },
];

const FAQS = [
  {
    category: "Documentacion & Visas",
    questions: [
      {
        q: "Necesito visa para viajar a Europa siendo colombiano?",
        a: "No. Los colombianos tienen exencion de visa para Schengen por 90 dias. Solo necesitas pasaporte valido con minimo 6 meses de vigencia."
      },
      {
        q: "Pasaporte o cedula?",
        a: "OBLIGATORIO pasaporte. La cedula NO es valida en Europa."
      },
    ]
  },
  {
    category: "Dinero & Pagos",
    questions: [
      {
        q: "Que moneda uso en Europa?",
        a: "EUR (Euro) en la mayoria de paises. GBP (Libra) en Reino Unido. CHF (Franco) en Suiza."
      },
      {
        q: "Puedo pagar con tarjeta en Europa?",
        a: "Si, todas las tarjetas funcionan. Recomendamos llevar 2 tarjetas por contingencia."
      },
      {
        q: "Cuanto dinero debo llevar?",
        a: "Presupuesto diario: $60-120 USD dependiendo de la ciudad. Maximo $200-300 USD en efectivo, el resto en tarjeta."
      },
    ]
  },
  {
    category: "Vuelos",
    questions: [
      {
        q: "Puedo volar directo desde Bogota a Europa?",
        a: "Si. Avianca y LATAM ofrecen vuelos directos a Madrid, Paris y Londres desde Bogota."
      },
      {
        q: "Cuando debo reservar vuelos?",
        a: "6-8 semanas antes es optimo. Minimo 4 semanas antes para mejores precios."
      },
      {
        q: "Cuantas maletas puedo llevar?",
        a: "Depende de la aerolinea. Tipicamente: 1 de mano + 1 facturada (23 kg)."
      },
    ]
  },
  {
    category: "Seguridad",
    questions: [
      {
        q: "Es peligroso viajar a Europa en 2025?",
        a: "Europa es muy segura para turistas. Mantén precauciones basicas como en cualquier gran ciudad."
      },
      {
        q: "Debo contratar seguro viaje?",
        a: "SI. Aunque no es obligatorio para Schengen (colombianos exentos de visa), es altamente recomendado. Cubre emergencia medica y perdida de equipaje."
      },
    ]
  },
  {
    category: "Viaje Grupal & Presupuesto",
    questions: [
      {
        q: "Viajamos en grupo? Es mas barato?",
        a: "Si. Grupos de 10+ personas obtienen 15-20% de descuento."
      },
      {
        q: "Puedo pagar en cuotas?",
        a: "Si. Financiamiento 0% por 6-12 meses con tarjeta de credito. 30% de deposito para reservar, resto 30 dias antes del viaje."
      },
      {
        q: "Cuantos dias es ideal en Europa?",
        a: "10-14 dias es lo optimo. Menos es muy corto, mas puede ser cansador."
      },
    ]
  },
];

const MARKET_STATS = [
  { label: "Poblacion Colombia", value: "52 millones" },
  { label: "Clase Media Objetivo", value: "18 millones (35%)" },
  { label: "Colombianos viajan al exterior/año", value: "5.2 millones" },
  { label: "Gasto promedio viaje Europa", value: "$8,500 - $15,000 USD" },
];

export default function BlogColombia() {
  const { language } = useI18n();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const content = {
    badge: { es: "Guia Completa 2025-2026", en: "Complete Guide 2025-2026" },
    h1: { es: "Viajes a Europa desde Colombia", en: "Travel to Europe from Colombia" },
    subtitle: { es: "Todo lo que necesitas saber: rutas, precios, destinos y consejos para viajeros colombianos", en: "Everything you need to know: routes, prices, destinations and tips for Colombian travelers" },
    destinations: { es: "Destinos Preferidos por Colombianos", en: "Preferred Destinations by Colombians" },
    routes: { es: "Rutas Principales desde Colombia", en: "Main Routes from Colombia" },
    departures: { es: "Ciudades de Salida", en: "Departure Cities" },
    prices: { es: "Comparativa de Precios", en: "Price Comparison" },
    faq: { es: "Preguntas Frecuentes", en: "Frequently Asked Questions" },
    trends: { es: "Tendencias 2025-2026", en: "2025-2026 Trends" },
    cta: { es: "Cotiza Tu Viaje Ahora", en: "Quote Your Trip Now" },
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const faqQuestions = FAQS.flatMap(cat => 
    cat.questions.map(faq => ({
      question: faq.q,
      answer: faq.a
    }))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEOHead
        title={language === "es" ? "Guia de Viajes a Europa desde Colombia - Rutas, Precios y Consejos" : "Guide to Travel Europe from Colombia - Routes, Prices and Tips"}
        description={language === "es" 
          ? "Guia completa para colombianos que quieren viajar a Europa: destinos favoritos, rutas desde Bogota y Medellin, precios 2025, exencion de visa Schengen 90 dias, y consejos practicos."
          : "Complete guide for Colombians wanting to travel to Europe: favorite destinations, routes from Bogota and Medellin, 2025 prices, 90-day Schengen visa exemption, and practical tips."}
        keywords="viajes europa colombia, europa desde bogota, visa schengen colombianos, paquetes europa colombia, vuelos europa colombia"
        url="https://tripseuropa.com/blog/colombia"
        type="article"
        locale="es_CO"
        publishedTime="2025-01-01"
        modifiedTime="2025-01-01"
      />
      <BreadcrumbSchema 
        items={[
          { name: "Inicio", url: "https://tripseuropa.com" },
          { name: "Blog", url: "https://tripseuropa.com/blog" },
          { name: "Colombia", url: "https://tripseuropa.com/blog/colombia" }
        ]}
      />
      <BlogPostSchema
        title={language === "es" ? "Guia Completa: Viajes a Europa desde Colombia 2025-2026" : "Complete Guide: Travel to Europe from Colombia 2025-2026"}
        description={language === "es" 
          ? "Todo lo que necesitas saber para viajar a Europa desde Colombia: destinos, rutas, precios y consejos practicos."
          : "Everything you need to know to travel to Europe from Colombia: destinations, routes, prices and practical tips."}
        image="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200"
        datePublished="2025-01-01"
        author="Trips Europa"
        url="https://tripseuropa.com/blog/colombia"
      />
      <FAQSchema questions={faqQuestions} />
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-blog-colombia-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1555992336-fb0d29498b13?q=60&w=1400&auto=format&fit=crop" 
            alt="Vista de Bogota Colombia" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-blog-colombia">
              {content.badge[language]}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent mb-6" data-testid="text-blog-colombia-h1">
              {content.h1[language]}
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl" data-testid="text-blog-colombia-subtitle">
              {content.subtitle[language]}
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              {MARKET_STATS.slice(0, 3).map((stat, index) => (
                <div key={index} className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-sm">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-accent text-primary font-bold hover:bg-accent/90" data-testid="button-blog-colombia-cta">
                  {content.cta[language]}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Colombia
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b" data-testid="section-blog-trends">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-accent mb-2" />
              <span className="text-sm text-muted-foreground">Grupos de</span>
              <span className="font-bold">4-8 personas</span>
            </div>
            <div className="flex flex-col items-center">
              <Calendar className="w-8 h-8 text-accent mb-2" />
              <span className="text-sm text-muted-foreground">Duracion promedio</span>
              <span className="font-bold">10-15 dias</span>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="w-8 h-8 text-accent mb-2" />
              <span className="text-sm text-muted-foreground">Presupuesto</span>
              <span className="font-bold">$10,000-12,000 USD</span>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-8 h-8 text-accent mb-2" />
              <span className="text-sm text-muted-foreground">Preferencia</span>
              <span className="font-bold">Italia, España, Francia</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-blog-destinations">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-accent" data-testid="text-blog-destinations-title">
            {content.destinations[language]}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {language === "es" 
              ? "Los 6 destinos europeos mas solicitados por viajeros colombianos, con precios y recomendaciones." 
              : "The 6 most requested European destinations by Colombian travelers, with prices and recommendations."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_DESTINATIONS.map((dest) => (
              <Card key={dest.id} className="group overflow-hidden" data-testid={`card-dest-${dest.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-primary font-bold">
                    {dest.countryCode}
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-3 left-3 text-xl font-bold text-accent" data-testid={`text-dest-name-${dest.id}`}>
                    {dest.name}
                  </h3>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="font-medium">Duracion:</span>
                      <span className="text-muted-foreground">{dest.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <span className="font-medium">Precio:</span>
                      <span className="text-muted-foreground">{dest.priceRange}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="font-medium">Mejor epoca:</span>
                      <span className="text-muted-foreground">{dest.bestTime}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Por que ir:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {dest.why.slice(0, 3).map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <CheckCircle className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-2">
                      {dest.routes.map((route, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          + {route}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-blog-routes">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-accent" data-testid="text-blog-routes-title">
            {content.routes[language]}
          </h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            {language === "es" 
              ? "Rutas probadas y optimizadas para viajeros colombianos con los mejores precios y experiencias." 
              : "Proven and optimized routes for Colombian travelers with the best prices and experiences."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRAVEL_ROUTES.map((route) => (
              <Card key={route.id} className="bg-white/10 border-white/20 backdrop-blur-sm overflow-hidden" data-testid={`card-route-${route.id}`}>
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={route.image} 
                    alt={route.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                  <Badge className="absolute top-3 right-3 bg-accent text-primary">
                    {route.duration}
                  </Badge>
                </div>
                <CardContent className="p-4 text-white">
                  <h3 className="text-lg font-bold text-accent mb-2" data-testid={`text-route-name-${route.id}`}>
                    {route.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">{route.route}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-4 h-4 text-accent" />
                    <span className="font-bold">{route.price}</span>
                  </div>
                  <div className="space-y-1">
                    {route.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/60">
                        <CheckCircle className="w-3 h-3 text-accent" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/packages">
              <Button size="lg" className="bg-accent text-primary font-bold hover:bg-accent/90">
                {language === "es" ? "Ver Todos los Paquetes" : "View All Packages"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-blog-departures">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-accent" data-testid="text-blog-departures-title">
            {content.departures[language]}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {language === "es" 
              ? "Salidas disponibles desde las principales ciudades colombianas hacia Europa." 
              : "Available departures from major Colombian cities to Europe."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEPARTURE_CITIES.map((city) => (
              <Card key={city.code} className="p-6" data-testid={`card-city-${city.code}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Plane className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-accent">{city.name}</h3>
                      <p className="text-muted-foreground text-sm">{city.airport} ({city.code})</p>
                    </div>
                  </div>
                  <Badge className={city.priority === "ALTA" ? "bg-red-500 text-white" : "bg-yellow-500 text-primary"}>
                    {city.priority}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-accent" />
                    <span>Poblacion: {city.population}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Caracteristicas:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {city.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Rutas disponibles:</p>
                    <div className="flex flex-wrap gap-1">
                      {city.routes.map((route, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {route}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100" data-testid="section-blog-prices">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-accent" data-testid="text-blog-prices-title">
            {content.prices[language]}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {language === "es" 
              ? "Precios aproximados todo incluido (vuelos, hoteles, tours, seguros) por duracion de viaje." 
              : "Approximate all-inclusive prices (flights, hotels, tours, insurance) by trip duration."}
          </p>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="p-4 text-left font-bold">Duracion</th>
                      <th className="p-4 text-center font-bold">Presupuesto Bajo</th>
                      <th className="p-4 text-center font-bold">Presupuesto Medio</th>
                      <th className="p-4 text-center font-bold">Presupuesto Alto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRICE_TABLE.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-4 font-bold">{row.duration}</td>
                        <td className="p-4 text-center text-green-600 font-medium">{row.low}</td>
                        <td className="p-4 text-center text-accent font-bold">{row.medium}</td>
                        <td className="p-4 text-center text-primary font-medium">{row.high}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card className="p-4 border-l-4 border-l-green-500">
                <h4 className="font-bold mb-2 text-green-700">Presupuesto Bajo</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Hoteles 3 estrellas</li>
                  <li>Tours grupales</li>
                  <li>Transporte economico</li>
                </ul>
              </Card>
              <Card className="p-4 border-l-4 border-l-accent">
                <h4 className="font-bold mb-2 text-accent">Presupuesto Medio</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Hoteles 4 estrellas</li>
                  <li>Tours semi-privados</li>
                  <li>Transporte comodo</li>
                </ul>
              </Card>
              <Card className="p-4 border-l-4 border-l-primary">
                <h4 className="font-bold mb-2">Presupuesto Alto</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Hoteles 5 estrellas</li>
                  <li>Tours privados VIP</li>
                  <li>Transporte premium</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-blog-faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-accent" data-testid="text-blog-faq-title">
            {content.faq[language]}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {language === "es" 
              ? "Respuestas a las preguntas mas comunes de viajeros colombianos sobre Europa." 
              : "Answers to the most common questions from Colombian travelers about Europe."}
          </p>

          <div className="max-w-3xl mx-auto space-y-6">
            {FAQS.map((category, catIdx) => (
              <div key={catIdx}>
                <h3 className="text-lg font-bold text-accent mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.questions.map((faq, faqIdx) => {
                    const faqId = `${catIdx}-${faqIdx}`;
                    const isExpanded = expandedFaq === faqId;
                    return (
                      <Card 
                        key={faqIdx} 
                        className="cursor-pointer"
                        onClick={() => toggleFaq(faqId)}
                        data-testid={`faq-${faqId}`}
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="font-medium">{faq.q}</h4>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-accent flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </div>
                          {isExpanded && (
                            <p className="text-muted-foreground mt-3 text-sm">{faq.a}</p>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-accent" data-testid="section-blog-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
            {language === "es" ? "Listo para tu viaje a Europa desde Colombia?" : "Ready for your trip to Europe from Colombia?"}
          </h2>
          <p className="text-primary/80 mb-6 max-w-xl mx-auto">
            {language === "es" 
              ? "Contactanos hoy y recibe una cotizacion personalizada con los mejores precios para viajeros colombianos." 
              : "Contact us today and receive a personalized quote with the best prices for Colombian travelers."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                <Phone className="w-5 h-5 mr-2" />
                {language === "es" ? "Contactar Ahora" : "Contact Now"}
              </Button>
            </Link>
            <Link href="/desde-colombia">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Compass className="w-5 h-5 mr-2" />
                {language === "es" ? "Ver Paquetes Colombia" : "View Colombia Packages"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Viajes a Europa desde Colombia 2025-2026: Guia Completa",
          "description": "Guia completa para viajeros colombianos: rutas, precios, destinos, documentos y consejos para viajar a Europa desde Bogota, Medellin, Cali y otras ciudades.",
          "author": {
            "@type": "Organization",
            "name": "Trips Europa"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Trips Europa"
          },
          "datePublished": "2024-12-29",
          "dateModified": "2024-12-29",
          "keywords": ["viajes Europa Colombia", "paquetes Europa Bogota", "tours Europa Medellin", "viaje Europa precio Colombia"]
        })
      }} />
    </div>
  );
}
