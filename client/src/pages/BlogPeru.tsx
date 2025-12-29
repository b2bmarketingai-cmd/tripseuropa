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
  HelpCircle, ChevronDown, ChevronUp
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
    why: ["Idioma español", "Conexiones faciles", "Cultura hispana", "Gastronomia"],
    duration: "8-10 dias",
    priceRange: "$10,500 USD",
    bestTime: "Abril - Octubre",
    routes: ["Barcelona", "Sevilla", "Toledo"],
  },
  {
    id: "barcelona",
    name: "Barcelona, España",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600&auto=format&fit=crop",
    why: ["Gaudi y modernismo", "Playa y ciudad", "Vida nocturna", "FC Barcelona"],
    duration: "7-9 dias",
    priceRange: "$11,000 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Costa Brava", "Montserrat"],
  },
  {
    id: "paris",
    name: "Paris, Francia",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    why: ["Ciudad del amor", "Torre Eiffel", "Museo del Louvre", "Moda"],
    duration: "8-10 dias",
    priceRange: "$11,500 USD",
    bestTime: "Abril - Junio, Septiembre",
    routes: ["Versalles", "Disneyland Paris"],
  },
  {
    id: "roma",
    name: "Roma, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    why: ["Historia milenaria", "Vaticano", "Pasta y pizza", "Coliseo"],
    duration: "10-12 dias",
    priceRange: "$12,000 USD",
    bestTime: "Abril - Junio, Septiembre",
    routes: ["Florencia", "Venecia", "Pompeya"],
  },
  {
    id: "portugal",
    name: "Lisboa, Portugal",
    countryCode: "PT",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=600&auto=format&fit=crop",
    why: ["Precio accesible", "Cultura unica", "Playas", "Pasteles de Belem"],
    duration: "5-7 dias",
    priceRange: "$9,500 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Sintra", "Oporto", "Algarve"],
  },
];

const TRAVEL_ROUTES = [
  {
    id: "clasica",
    name: "Europa Clasica",
    duration: "10 dias",
    price: "$11,500 USD",
    route: "Lima - Madrid - Barcelona - Paris",
    highlights: ["3 capitales europeas", "Arte y cultura", "Gastronomia"],
    icon: Compass,
  },
  {
    id: "espana-italia",
    name: "España + Italia",
    duration: "12 dias",
    price: "$12,500 USD",
    route: "Lima - España - Italia",
    highlights: ["2 paises", "Mediterraneo", "Historia"],
    icon: Globe,
  },
  {
    id: "portugal-espana",
    name: "Lisboa + Madrid",
    duration: "8 dias",
    price: "$10,000 USD",
    route: "Lima - Lisboa - Madrid",
    highlights: ["Peninsula Iberica", "Precio accesible", "Cultura hispana"],
    icon: Heart,
  },
];

const DEPARTURE_CITIES = [
  {
    name: "Lima",
    code: "LIM",
    airport: "Jorge Chavez",
    priority: "ALTA",
    population: "9.5M",
    features: ["Capital nacional", "Hub principal"],
    routes: ["Madrid", "Barcelona", "Paris", "Roma"],
  },
  {
    name: "Arequipa",
    code: "AQT",
    airport: "Rodriguez Ballon",
    priority: "MEDIA",
    population: "900k",
    features: ["Segunda ciudad", "Sur de Peru"],
    routes: ["Europa via Lima"],
  },
  {
    name: "Cusco",
    code: "CUS",
    airport: "Velazco Astete",
    priority: "MEDIA",
    population: "430k",
    features: ["Capital turistica", "Machu Picchu"],
    routes: ["Europa via Lima"],
  },
];

const PRICE_TABLE = [
  { duration: "7 dias", low: "$8,500", medium: "$10,000", high: "$13,000" },
  { duration: "10 dias", low: "$9,500", medium: "$11,500", high: "$14,000" },
  { duration: "12 dias", low: "$10,500", medium: "$12,500", high: "$15,000" },
  { duration: "14 dias", low: "$12,000", medium: "$14,000", high: "$17,000" },
];

const FAQS = [
  {
    category: "Documentacion & Visas",
    questions: [
      {
        q: "Necesito visa para viajar a Europa siendo peruano?",
        a: "No. Los peruanos tienen exencion de visa Schengen por 90 dias. Solo necesitas pasaporte valido con minimo 6 meses de vigencia."
      },
      {
        q: "Que documentos necesito llevar?",
        a: "Pasaporte vigente, reservas de hotel, itinerario de vuelo, seguro de viaje recomendado, y comprobante de fondos."
      },
    ]
  },
  {
    category: "Vuelos & Transporte",
    questions: [
      {
        q: "Hay vuelos directos Lima - Europa?",
        a: "Si, hay vuelos directos a Madrid con Iberia y LATAM. Otras ciudades europeas requieren conexion."
      },
      {
        q: "Cuanto dura el vuelo Lima - Madrid?",
        a: "Aproximadamente 11-12 horas en vuelo directo."
      },
    ]
  },
  {
    category: "Dinero & Presupuesto",
    questions: [
      {
        q: "Puedo pagar en soles peruanos?",
        a: "Los precios estan en USD. Aceptamos pago en soles al tipo de cambio del dia."
      },
      {
        q: "Cuanto dinero necesito llevar?",
        a: "Recomendamos $80-150 USD diarios dependiendo del nivel de gasto. Tarjetas de credito aceptadas en toda Europa."
      },
    ]
  },
];

const MARKET_STATS = [
  { label: "Poblacion Peru", value: "35 millones" },
  { label: "Clase Media Objetivo", value: "10 millones (28%)" },
  { label: "Peruanos viajan exterior/año", value: "1.2 millones" },
  { label: "Gasto promedio viaje Europa", value: "$10,000 USD" },
];

export default function BlogPeru() {
  const { language } = useI18n();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const content = {
    badge: { es: "Guia Completa 2025-2026", en: "Complete Guide 2025-2026" },
    h1: { es: "Viajes a Europa desde Peru", en: "Travel to Europe from Peru" },
    subtitle: { es: "Todo lo que necesitas saber: rutas, precios, destinos y consejos para viajeros peruanos", en: "Everything you need to know: routes, prices, destinations and tips for Peruvian travelers" },
    destinations: { es: "Destinos Preferidos por Peruanos", en: "Preferred Destinations by Peruvians" },
    routes: { es: "Rutas Principales desde Peru", en: "Main Routes from Peru" },
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
        title={language === "es" ? "Guia de Viajes a Europa desde Peru - Rutas, Precios y Consejos" : "Guide to Travel Europe from Peru - Routes, Prices and Tips"}
        description={language === "es" 
          ? "Guia completa para peruanos que quieren viajar a Europa: destinos favoritos, vuelos desde Lima, precios 2025, sin visa Schengen, y consejos practicos."
          : "Complete guide for Peruvians wanting to travel to Europe: favorite destinations, flights from Lima, 2025 prices, no Schengen visa needed, and practical tips."}
        keywords="viajes europa peru, europa desde lima, paquetes europa peru, vuelos lima europa"
        url="https://tripseuropa.com/blog/peru"
        type="article"
        locale="es_PE"
        publishedTime="2025-01-01"
        modifiedTime="2025-01-01"
      />
      <BreadcrumbSchema 
        items={[
          { name: "Inicio", url: "https://tripseuropa.com" },
          { name: "Blog", url: "https://tripseuropa.com/blog" },
          { name: "Peru", url: "https://tripseuropa.com/blog/peru" }
        ]}
      />
      <BlogPostSchema
        title={language === "es" ? "Guia Completa: Viajes a Europa desde Peru 2025-2026" : "Complete Guide: Travel to Europe from Peru 2025-2026"}
        description={language === "es" 
          ? "Todo lo que necesitas saber para viajar a Europa desde Peru: destinos, rutas, precios y consejos practicos."
          : "Everything you need to know to travel to Europe from Peru: destinations, routes, prices and practical tips."}
        image="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200"
        datePublished="2025-01-01"
        author="Trips Europa"
        url="https://tripseuropa.com/blog/peru"
      />
      <FAQSchema questions={faqQuestions} />
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-blog-peru-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-peru">
            {content.badge[language]}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent mb-6" data-testid="text-peru-title">
            {content.h1[language]}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8" data-testid="text-peru-subtitle">
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
              ? "Nuestros asesores especializados en viajes desde Peru te ayudaran a planificar tu viaje perfecto a Europa."
              : "Our travel advisors specialized in trips from Peru will help you plan your perfect trip to Europe."}
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
