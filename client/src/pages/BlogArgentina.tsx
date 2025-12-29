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
    why: ["Vuelos directos Aerolineas", "Idioma español", "Hub europeo", "Cultura vibrante"],
    duration: "10-12 dias",
    priceRange: "$11,500 USD",
    bestTime: "Abril - Octubre",
    routes: ["Barcelona", "Sevilla", "Toledo"],
  },
  {
    id: "barcelona",
    name: "Barcelona, España",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600&auto=format&fit=crop",
    why: ["Gaudi y arquitectura", "Playas mediterraneas", "Gastronomia", "Vida nocturna"],
    duration: "8-10 dias",
    priceRange: "$12,000 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Costa Brava", "Montserrat", "Girona"],
  },
  {
    id: "roma",
    name: "Roma, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    why: ["Historia milenaria", "Ciudadania italiana", "Gastronomia", "Arte renacentista"],
    duration: "10-12 dias",
    priceRange: "$13,000 USD",
    bestTime: "Abril - Junio, Septiembre",
    routes: ["Florencia", "Venecia", "Napoles"],
  },
  {
    id: "paris",
    name: "Paris, Francia",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    why: ["Torre Eiffel", "Museo del Louvre", "Moda y lujo", "Romanticismo"],
    duration: "8-10 dias",
    priceRange: "$12,500 USD",
    bestTime: "Abril - Junio, Septiembre",
    routes: ["Versalles", "Normandia", "Loire"],
  },
  {
    id: "estambul",
    name: "Estambul, Turquia",
    countryCode: "TR",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=600&auto=format&fit=crop",
    why: ["Precio accesible", "Cultura unica", "Gastronomia", "Puente Europa-Asia"],
    duration: "7-8 dias",
    priceRange: "$10,500 USD",
    bestTime: "Abril - Mayo, Septiembre - Octubre",
    routes: ["Capadocia", "Efeso", "Pamukkale"],
  },
];

const TRAVEL_ROUTES = [
  {
    id: "clasica",
    name: "Europa Clasica",
    duration: "12 dias",
    price: "$13,500 USD",
    route: "Buenos Aires - Madrid - Barcelona - Paris - Buenos Aires",
    highlights: ["3 capitales europeas", "Arte y cultura", "Gastronomia"],
    icon: Compass,
  },
  {
    id: "italia",
    name: "Italia Completa",
    duration: "10 dias",
    price: "$12,500 USD",
    route: "Buenos Aires - Roma - Florencia - Venecia",
    highlights: ["Ciudadania italiana", "Arte renacentista", "Cocina italiana"],
    icon: Heart,
  },
  {
    id: "iberia",
    name: "Peninsula Iberica",
    duration: "10 dias",
    price: "$12,000 USD",
    route: "Buenos Aires - Lisboa - Madrid - Barcelona",
    highlights: ["Portugal + España", "Costas mediterraneas", "Flamenco"],
    icon: Globe,
  },
];

const DEPARTURE_CITIES = [
  {
    name: "Buenos Aires",
    code: "AEP/EZE",
    airport: "Ezeiza/Aeroparque",
    priority: "ALTA",
    population: "3.1M",
    features: ["Capital nacional", "Hub principal Aerolineas"],
    routes: ["Madrid (directo)", "Roma", "Paris", "Barcelona"],
  },
  {
    name: "Cordoba",
    code: "COR",
    airport: "Ambrosio Taravella",
    priority: "MEDIA",
    population: "1.3M",
    features: ["Segunda ciudad", "Centro del pais"],
    routes: ["Europa via Buenos Aires", "Madrid (conexion)"],
  },
  {
    name: "Rosario",
    code: "ROS",
    airport: "Islas Malvinas",
    priority: "MEDIA",
    population: "950k",
    features: ["Tercera ciudad", "Zona industrial"],
    routes: ["Europa via Buenos Aires"],
  },
];

const PRICE_TABLE = [
  { duration: "8 dias", low: "$10,500", medium: "$12,000", high: "$15,000" },
  { duration: "10 dias", low: "$11,500", medium: "$13,000", high: "$16,500" },
  { duration: "12 dias", low: "$12,500", medium: "$13,500", high: "$18,000" },
  { duration: "14 dias", low: "$14,000", medium: "$15,500", high: "$20,000" },
];

const FAQS = [
  {
    category: "Documentacion & Visas",
    questions: [
      {
        q: "Necesito visa para viajar a Europa siendo argentino?",
        a: "No. Los argentinos tienen exencion de visa Schengen por 90 dias. Solo necesitas pasaporte valido con minimo 6 meses de vigencia."
      },
      {
        q: "Puedo tramitar ciudadania italiana durante el viaje?",
        a: "Si, muchos argentinos aprovechan para iniciar tramites. Ofrecemos tours especiales que incluyen visitas a comunas y asesoria."
      },
    ]
  },
  {
    category: "Vuelos & Transporte",
    questions: [
      {
        q: "Hay vuelos directos desde Buenos Aires a Europa?",
        a: "Si. Aerolineas Argentinas opera vuelos directos a Madrid y Roma. LATAM conecta via Sao Paulo."
      },
      {
        q: "Cuanto dura el vuelo Buenos Aires - Madrid?",
        a: "Aproximadamente 12-13 horas en vuelo directo."
      },
    ]
  },
  {
    category: "Dinero & Pagos",
    questions: [
      {
        q: "Puedo pagar en pesos argentinos?",
        a: "Los precios estan en USD para estabilidad. Aceptamos pago en pesos al tipo de cambio del dia."
      },
      {
        q: "Hay financiamiento disponible?",
        a: "Si. Ofrecemos hasta 12 cuotas sin interes con tarjetas argentinas seleccionadas."
      },
    ]
  },
  {
    category: "Seguridad & Seguros",
    questions: [
      {
        q: "Es seguro viajar a Europa en 2025?",
        a: "Si. Europa es muy segura para turistas. Mantener precauciones basicas como en cualquier gran ciudad."
      },
      {
        q: "Necesito seguro de viaje?",
        a: "Altamente recomendado aunque no obligatorio para argentinos. Cubre emergencias medicas y perdida de equipaje."
      },
    ]
  },
];

const MARKET_STATS = [
  { label: "Poblacion Argentina", value: "47 millones" },
  { label: "Clase Media Objetivo", value: "20 millones (42%)" },
  { label: "Argentinos viajan exterior/año", value: "2.1 millones" },
  { label: "Gasto promedio viaje Europa", value: "$11,500 USD" },
];

export default function BlogArgentina() {
  const { language } = useI18n();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const content = {
    badge: { es: "Guia Completa 2025-2026", en: "Complete Guide 2025-2026" },
    h1: { es: "Viajes a Europa desde Argentina", en: "Travel to Europe from Argentina" },
    subtitle: { es: "Todo lo que necesitas saber: rutas, precios, destinos y consejos para viajeros argentinos", en: "Everything you need to know: routes, prices, destinations and tips for Argentine travelers" },
    destinations: { es: "Destinos Preferidos por Argentinos", en: "Preferred Destinations by Argentines" },
    routes: { es: "Rutas Principales desde Argentina", en: "Main Routes from Argentina" },
    departures: { es: "Ciudades de Salida", en: "Departure Cities" },
    prices: { es: "Comparativa de Precios", en: "Price Comparison" },
    faq: { es: "Preguntas Frecuentes", en: "Frequently Asked Questions" },
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
        title={language === "es" ? "Guia de Viajes a Europa desde Argentina - Rutas, Precios y Consejos" : "Guide to Travel Europe from Argentina - Routes, Prices and Tips"}
        description={language === "es" 
          ? "Guia completa para argentinos que quieren viajar a Europa: destinos favoritos, vuelos desde Buenos Aires, precios 2025, sin visa Schengen, y consejos practicos."
          : "Complete guide for Argentines wanting to travel to Europe: favorite destinations, flights from Buenos Aires, 2025 prices, no Schengen visa needed, and practical tips."}
        keywords="viajes europa argentina, europa desde buenos aires, paquetes europa argentina, vuelos buenos aires europa"
        url="https://tripseuropa.com/blog/argentina"
        type="article"
        locale="es_AR"
        publishedTime="2025-01-01"
        modifiedTime="2025-01-01"
      />
      <BreadcrumbSchema 
        items={[
          { name: "Inicio", url: "https://tripseuropa.com" },
          { name: "Blog", url: "https://tripseuropa.com/blog" },
          { name: "Argentina", url: "https://tripseuropa.com/blog/argentina" }
        ]}
      />
      <BlogPostSchema
        title={language === "es" ? "Guia Completa: Viajes a Europa desde Argentina 2025-2026" : "Complete Guide: Travel to Europe from Argentina 2025-2026"}
        description={language === "es" 
          ? "Todo lo que necesitas saber para viajar a Europa desde Argentina: destinos, rutas, precios y consejos practicos."
          : "Everything you need to know to travel to Europe from Argentina: destinations, routes, prices and practical tips."}
        image="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200"
        datePublished="2025-01-01"
        author="Trips Europa"
        url="https://tripseuropa.com/blog/argentina"
      />
      <FAQSchema questions={faqQuestions} />
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-blog-argentina-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1612294037637-ec328d0e075e?q=80&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-argentina">
            {content.badge[language]}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent mb-6" data-testid="text-argentina-title">
            {content.h1[language]}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8" data-testid="text-argentina-subtitle">
            {content.subtitle[language]}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {MARKET_STATS.map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-destinations">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-8 text-center">
            {content.destinations[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_DESTINATIONS.map((dest) => (
              <Card key={dest.id} className="group overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-dest-${dest.id}`}>
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
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{dest.duration}</span>
                    </div>
                    <div className="text-accent font-bold">{dest.priceRange}</div>
                  </div>
                  <div className="space-y-2">
                    {dest.why.slice(0, 3).map((reason, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{language === "es" ? "Mejor epoca:" : "Best time:"} {dest.bestTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-routes">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-8 text-center">
            {content.routes[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRAVEL_ROUTES.map((route) => (
              <Card key={route.id} className="hover:shadow-lg transition-shadow" data-testid={`card-route-${route.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <route.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{route.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{route.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-accent mb-4">{route.price}</div>
                  <div className="flex items-start gap-2 mb-4">
                    <Plane className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <span className="text-sm">{route.route}</span>
                  </div>
                  <div className="space-y-2">
                    {route.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-departures">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-8 text-center">
            {content.departures[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEPARTURE_CITIES.map((city) => (
              <Card key={city.code} className="hover:shadow-lg transition-shadow" data-testid={`card-city-${city.code}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Plane className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{city.name}</h3>
                        <span className="text-sm text-muted-foreground">{city.code}</span>
                      </div>
                    </div>
                    <Badge variant={city.priority === "ALTA" ? "default" : "secondary"}>
                      {city.priority}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>{city.airport}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{city.population} habitantes</span>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-sm font-medium mb-2">{language === "es" ? "Rutas disponibles:" : "Available routes:"}</p>
                      <div className="flex flex-wrap gap-1">
                        {city.routes.map((route, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{route}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-prices">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-8 text-center">
            {content.prices[language]}
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="p-4 text-left">{language === "es" ? "Duracion" : "Duration"}</th>
                        <th className="p-4 text-center">{language === "es" ? "Economico" : "Budget"}</th>
                        <th className="p-4 text-center">{language === "es" ? "Estandar" : "Standard"}</th>
                        <th className="p-4 text-center">{language === "es" ? "Premium" : "Premium"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRICE_TABLE.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                          <td className="p-4 font-medium">{row.duration}</td>
                          <td className="p-4 text-center">{row.low}</td>
                          <td className="p-4 text-center font-bold text-accent">{row.medium}</td>
                          <td className="p-4 text-center">{row.high}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground text-center mt-4">
              {language === "es" 
                ? "* Precios en USD por persona. Incluye vuelos, hoteles 3-5 estrellas, traslados y tours. Impuestos no incluidos."
                : "* Prices in USD per person. Includes flights, 3-5 star hotels, transfers and tours. Taxes not included."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-8 text-center">
            {content.faq[language]}
          </h2>
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

      <section className="py-16 bg-primary" data-testid="section-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-accent mb-4">
            {content.cta[language]}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {language === "es" 
              ? "Nuestros asesores especializados en viajes desde Argentina te ayudaran a planificar tu viaje perfecto a Europa."
              : "Our travel advisors specialized in trips from Argentina will help you plan your perfect trip to Europe."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 gap-2">
                <Phone className="w-5 h-5" />
                {language === "es" ? "Contactar Asesor" : "Contact Advisor"}
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
