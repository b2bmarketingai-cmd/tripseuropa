import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
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
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=60&w=600&auto=format&fit=crop",
    why: ["Conexiones Copa Airlines", "Idioma español", "Hub europeo", "Cultura hispana"],
    duration: "8-10 dias",
    priceRange: "$10,500 USD",
    bestTime: "Abril - Octubre",
    routes: ["Barcelona", "Sevilla", "Toledo"],
  },
  {
    id: "estambul",
    name: "Estambul, Turquia",
    countryCode: "TR",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=60&w=600&auto=format&fit=crop",
    why: ["Precio accesible", "Conexiones Turkish Airlines", "Cultura unica", "Gastronomia"],
    duration: "7-8 dias",
    priceRange: "$9,500 USD",
    bestTime: "Abril - Mayo, Septiembre - Octubre",
    routes: ["Capadocia", "Efeso", "Pamukkale"],
  },
  {
    id: "paris",
    name: "Paris, Francia",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=60&w=600&auto=format&fit=crop",
    why: ["Ciudad del amor", "Torre Eiffel", "Moda y lujo", "Gastronomia"],
    duration: "8-10 dias",
    priceRange: "$11,000 USD",
    bestTime: "Abril - Junio, Septiembre",
    routes: ["Versalles", "Normandia"],
  },
  {
    id: "roma",
    name: "Roma, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=60&w=600&auto=format&fit=crop",
    why: ["Historia milenaria", "Vaticano", "Pasta y pizza", "Arte"],
    duration: "10-12 dias",
    priceRange: "$11,500 USD",
    bestTime: "Abril - Junio, Septiembre",
    routes: ["Florencia", "Venecia"],
  },
  {
    id: "barcelona",
    name: "Barcelona, España",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=60&w=600&auto=format&fit=crop",
    why: ["Gaudi", "Playa y ciudad", "Vida nocturna", "Gastronomia"],
    duration: "7-9 dias",
    priceRange: "$10,500 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Costa Brava", "Montserrat"],
  },
];

const TRAVEL_ROUTES = [
  {
    id: "clasica",
    name: "Europa Clasica",
    duration: "10 dias",
    price: "$11,500 USD",
    route: "Panama - Madrid - Barcelona - Paris",
    highlights: ["3 capitales europeas", "Arte y cultura", "Conexion Copa"],
    icon: Compass,
  },
  {
    id: "estambul-madrid",
    name: "Estambul + Madrid",
    duration: "8 dias",
    price: "$10,000 USD",
    route: "Panama - Estambul - Madrid",
    highlights: ["2 continentes", "Turkish Airlines", "Precio accesible"],
    icon: Globe,
  },
  {
    id: "europa-completa",
    name: "Europa Completa",
    duration: "14 dias",
    price: "$13,500 USD",
    route: "Panama - Europa Completa",
    highlights: ["Tour completo", "Multiples paises", "Todo incluido"],
    icon: Heart,
  },
];

const DEPARTURE_CITIES = [
  {
    name: "Panama City",
    code: "PTY",
    airport: "Tocumen International",
    priority: "ALTA",
    population: "1.9M",
    features: ["Hub de las Americas", "Conexiones Copa Airlines"],
    routes: ["Madrid", "Paris", "Amsterdam", "Frankfurt"],
  },
  {
    name: "Colon",
    code: "COL",
    airport: "Enrique Adolfo Jimenez",
    priority: "MEDIA",
    population: "260k",
    features: ["Zona Libre", "Puerto importante"],
    routes: ["Europa via Panama City"],
  },
];

const PRICE_TABLE = [
  { duration: "7 dias", low: "$9,500", medium: "$11,000", high: "$14,000" },
  { duration: "10 dias", low: "$10,500", medium: "$12,000", high: "$15,000" },
  { duration: "12 dias", low: "$11,500", medium: "$12,500", high: "$16,000" },
  { duration: "14 dias", low: "$12,500", medium: "$13,500", high: "$17,000" },
];

const FAQS = [
  {
    category: "Documentacion & Visas",
    questions: [
      {
        q: "Necesito visa para viajar a Europa siendo panameno?",
        a: "No. Los panamenos tienen exencion de visa Schengen por 90 dias. Solo necesitas pasaporte valido con minimo 6 meses de vigencia."
      },
      {
        q: "Que documentos debo presentar en migracion?",
        a: "Pasaporte vigente, reserva de hotel, boleto de regreso, seguro de viaje recomendado, y comprobante de fondos."
      },
    ]
  },
  {
    category: "Vuelos & Transporte",
    questions: [
      {
        q: "Copa Airlines vuela directo a Europa?",
        a: "Copa Airlines conecta Panama con Europa via codeshare. Las mejores conexiones son via Madrid con Iberia."
      },
      {
        q: "Cual es la mejor ruta desde Panama?",
        a: "Panama-Madrid es la ruta mas directa. Tambien hay excelentes conexiones via Frankfurt y Amsterdam."
      },
    ]
  },
  {
    category: "Dinero & Presupuesto",
    questions: [
      {
        q: "Panama usa dolares, los precios son directos?",
        a: "Si, Panama usa USD como moneda oficial. Los precios que mostramos son directos sin conversion."
      },
      {
        q: "Hay financiamiento disponible?",
        a: "Si. Ofrecemos planes de pago y financiamiento con bancos panamenos."
      },
    ]
  },
];

const MARKET_STATS = [
  { label: "Poblacion Panama", value: "4.4 millones" },
  { label: "Clase Media Objetivo", value: "1.5 millones (35%)" },
  { label: "Panamenos viajan exterior/año", value: "350,000" },
  { label: "Gasto promedio viaje Europa", value: "$11,000 USD" },
];

export default function BlogPanama() {
  const { language } = useI18n();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const content = {
    badge: { es: "Guia Completa 2025-2026", pt: "Guia Completo 2025-2026", en: "Complete Guide 2025-2026" },
    h1: { es: "Viajes a Europa desde Panama", pt: "Viagens a Europa desde Panama", en: "Travel to Europe from Panama" },
    subtitle: { es: "Todo lo que necesitas saber: rutas, precios, destinos y consejos para viajeros panamenos", pt: "Tudo o que voce precisa saber: rotas, precos, destinos e dicas para viajantes panamenhos", en: "Everything you need to know: routes, prices, destinations and tips for Panamanian travelers" },
    destinations: { es: "Destinos Preferidos por Panamenos", pt: "Destinos Preferidos por Panamenhos", en: "Preferred Destinations by Panamanians" },
    routes: { es: "Rutas Principales desde Panama", pt: "Rotas Principais desde Panama", en: "Main Routes from Panama" },
    departures: { es: "Ciudades de Salida", pt: "Cidades de Partida", en: "Departure Cities" },
    prices: { es: "Comparativa de Precios", pt: "Comparativo de Precos", en: "Price Comparison" },
    faq: { es: "Preguntas Frecuentes", pt: "Perguntas Frequentes", en: "Frequently Asked Questions" },
    cta: { es: "Cotiza Tu Viaje Ahora", pt: "Solicite Seu Orcamento Agora", en: "Quote Your Trip Now" },
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
        title={language === "es" ? "Guia de Viajes a Europa desde Panama - Rutas, Precios y Consejos" : language === "pt" ? "Guia de Viagens a Europa desde Panama - Rotas, Precos e Dicas" : "Guide to Travel Europe from Panama - Routes, Prices and Tips"}
        description={language === "es" 
          ? "Guia completa para panamenos que quieren viajar a Europa: destinos favoritos, vuelos desde Panama City, precios 2025, sin visa Schengen, y consejos practicos."
          : language === "pt" 
          ? "Guia completo para panamenhos que querem viajar a Europa: destinos favoritos, voos desde Panama City, precos 2025, sem visto Schengen, e dicas praticas."
          : "Complete guide for Panamanians wanting to travel to Europe: favorite destinations, flights from Panama City, 2025 prices, no Schengen visa needed, and practical tips."}
        keywords="viajes europa panama, europa desde panama city, paquetes europa panama, vuelos panama europa copa"
        url="https://tripseuropa.com/blog/panama"
        type="article"
        locale="es_PA"
        publishedTime="2025-01-01"
        modifiedTime="2025-01-01"
      />
      <BreadcrumbSchema 
        items={[
          { name: "Inicio", url: "https://tripseuropa.com" },
          { name: "Blog", url: "https://tripseuropa.com/blog" },
          { name: "Panama", url: "https://tripseuropa.com/blog/panama" }
        ]}
      />
      <BlogPostSchema
        title={language === "es" ? "Guia Completa: Viajes a Europa desde Panama 2025-2026" : language === "pt" ? "Guia Completo: Viagens a Europa desde Panama 2025-2026" : "Complete Guide: Travel to Europe from Panama 2025-2026"}
        description={language === "es" 
          ? "Todo lo que necesitas saber para viajar a Europa desde Panama: destinos, rutas, precios y consejos practicos."
          : language === "pt"
          ? "Tudo o que voce precisa saber para viajar a Europa desde Panama: destinos, rotas, precos e dicas praticas."
          : "Everything you need to know to travel to Europe from Panama: destinations, routes, prices and practical tips."}
        image="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=60&w=1200"
        datePublished="2025-01-01"
        author="Trips Europa"
        url="https://tripseuropa.com/blog/panama"
      />
      <FAQSchema questions={faqQuestions} />
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-blog-panama-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1612831455359-970e23a1e4e9?q=60&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-panama">
            {content.badge[language]}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent mb-6" data-testid="text-panama-title">
            {content.h1[language]}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8" data-testid="text-panama-subtitle">
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
                      <span>{language === "es" ? "Mejor epoca:" : language === "pt" ? "Melhor epoca:" : "Best time:"} {dest.bestTime}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
                      <p className="text-sm font-medium mb-2">{language === "es" ? "Rutas disponibles:" : language === "pt" ? "Rotas disponiveis:" : "Available routes:"}</p>
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
                        <th className="p-4 text-left">{language === "es" ? "Duracion" : language === "pt" ? "Duracao" : "Duration"}</th>
                        <th className="p-4 text-center">{language === "es" ? "Economico" : language === "pt" ? "Economico" : "Budget"}</th>
                        <th className="p-4 text-center">{language === "es" ? "Estandar" : language === "pt" ? "Padrao" : "Standard"}</th>
                        <th className="p-4 text-center">{language === "es" ? "Premium" : language === "pt" ? "Premium" : "Premium"}</th>
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
                : language === "pt"
                ? "* Precos em USD por pessoa. Inclui voos, hoteis 3-5 estrelas, traslados e passeios. Impostos nao incluidos."
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
              ? "Nuestros asesores especializados en viajes desde Panama te ayudaran a planificar tu viaje perfecto a Europa."
              : language === "pt"
              ? "Nossos consultores especializados em viagens desde Panama ajudarao voce a planejar sua viagem perfeita a Europa."
              : "Our travel advisors specialized in trips from Panama will help you plan your perfect trip to Europe."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 gap-2">
                <Phone className="w-5 h-5" />
                {language === "es" ? "Contactar Asesor" : language === "pt" ? "Contatar Consultor" : "Contact Advisor"}
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
