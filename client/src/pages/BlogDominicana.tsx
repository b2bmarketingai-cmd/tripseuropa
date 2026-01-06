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
import { FloatingContactButtons, SupportContactSection } from "@/components/support";
import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { FAQSchema, BreadcrumbSchema, BlogPostSchema } from "@/components/SEOSchema";

const TOP_DESTINATIONS = [
  {
    id: "españa",
    name: "España",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=60&w=600&auto=format&fit=crop",
    why: ["Idioma español", "Conexiones directas", "Cultura hispana", "Gastronomia"],
    duration: "8-10 dias",
    priceRange: "$10,500 USD",
    bestTime: "Abril - Octubre",
    routes: ["Madrid", "Barcelona", "Sevilla"],
  },
  {
    id: "paris",
    name: "Paris, Francia",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=60&w=600&auto=format&fit=crop",
    why: ["Ciudad del amor", "Torre Eiffel", "Moda y lujo", "Museo del Louvre"],
    duration: "8-10 dias",
    priceRange: "$11,000 USD",
    bestTime: "Abril - Junio, Septiembre",
    routes: ["Versalles", "Normandia"],
  },
  {
    id: "italia",
    name: "Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=60&w=600&auto=format&fit=crop",
    why: ["Historia milenaria", "Vaticano", "Pizza y pasta", "Arte"],
    duration: "10-12 dias",
    priceRange: "$11,500 USD",
    bestTime: "Abril - Junio, Septiembre",
    routes: ["Roma", "Florencia", "Venecia"],
  },
  {
    id: "portugal",
    name: "Portugal",
    countryCode: "PT",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=60&w=600&auto=format&fit=crop",
    why: ["Precio accesible", "Playas hermosas", "Cultura portuguesa", "Gastronomia"],
    duration: "5-7 dias",
    priceRange: "$9,500 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Lisboa", "Oporto", "Algarve"],
  },
  {
    id: "estambul",
    name: "Estambul, Turquia",
    countryCode: "TR",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=60&w=600&auto=format&fit=crop",
    why: ["Precio accesible", "Cultura única", "Gastronomia", "Historia"],
    duration: "7-8 dias",
    priceRange: "$9,000 USD",
    bestTime: "Abril - Mayo, Septiembre - Octubre",
    routes: ["Capadocia", "Efeso"],
  },
];

const TRAVEL_ROUTES = [
  {
    id: "españa-clásica",
    name: "España Clásica",
    duration: "8 dias",
    price: "$10,500 USD",
    route: "Santo Domingo - Madrid - Barcelona",
    highlights: ["Conexion directa", "Idioma español", "Cultura hispana"],
    icon: Compass,
  },
  {
    id: "españa-italia",
    name: "España + Italia",
    duration: "10 dias",
    price: "$11,500 USD",
    route: "Santo Domingo - España - Italia",
    highlights: ["2 paises", "Mediterraneo", "Historia y arte"],
    icon: Globe,
  },
  {
    id: "estambul-europa",
    name: "Estambul + Europa",
    duration: "12 dias",
    price: "$12,000 USD",
    route: "Santo Domingo - Estambul - Europa",
    highlights: ["2 continentes", "Precio accesible", "Cultura única"],
    icon: Heart,
  },
];

const DEPARTURE_CITIES = [
  {
    name: "Santo Domingo",
    code: "SDQ",
    airport: "Las Americas",
    priority: "ALTA",
    population: "2.9M",
    features: ["Capital nacional", "Hub principal"],
    routes: ["Madrid", "Paris", "Roma", "Barcelona"],
  },
  {
    name: "Santiago",
    code: "STI",
    airport: "Cibao",
    priority: "ALTA",
    population: "800k",
    features: ["Segunda ciudad", "Norte del pais"],
    routes: ["Madrid", "Europa via SDQ"],
  },
];

const PRICE_TABLE = [
  { duration: "7 dias", low: "$8,500", medium: "$10,000", high: "$13,000" },
  { duration: "10 dias", low: "$9,500", medium: "$11,500", high: "$14,000" },
  { duration: "12 dias", low: "$10,500", medium: "$12,000", high: "$15,000" },
  { duration: "14 dias", low: "$11,500", medium: "$13,500", high: "$16,000" },
];

const FAQS = [
  {
    category: "Documentacion & Visas",
    questions: [
      {
        q: "Necesito visa para viajar a Europa siendo dominicano?",
        a: "SI. Los dominicanos necesitan visa Schengen para viajar a Europa. El proceso toma 15-30 dias. Ofrecemos asesoria completa."
      },
      {
        q: "Que documentos necesito para la visa?",
        a: "Pasaporte vigente, formulario de solicitud, fotos, reservas de hotel y vuelo, seguro de viaje, comprobante de fondos, y carta de trabajo."
      },
    ]
  },
  {
    category: "Vuelos & Transporte",
    questions: [
      {
        q: "Hay vuelos directos Santo Domingo - Europa?",
        a: "Hay vuelos con pocas escalas. Iberia y Air France conectan RD con Europa. Mejores conexiones via Miami o Madrid."
      },
      {
        q: "Cuanto dura el viaje a Europa?",
        a: "Aproximadamente 10-12 horas dependiendo de la ruta y escalas."
      },
    ]
  },
  {
    category: "Dinero & Presupuesto",
    questions: [
      {
        q: "Puedo pagar en pesos dominicanos?",
        a: "Los precios estan en USD. Aceptamos pago en pesos dominicanos al tipo de cambio del dia."
      },
      {
        q: "Hay financiamiento disponible?",
        a: "Si. Ofrecemos planes de pago y financiamiento con bancos locales."
      },
    ]
  },
];

const MARKET_STATS = [
  { label: "Poblacion RD", value: "11 millones" },
  { label: "Clase Media Objetivo", value: "3.5 millones (32%)" },
  { label: "Dominicanos viajan exterior/año", value: "500,000" },
  { label: "Gasto promedio viaje Europa", value: "$10,000 USD" },
];

export default function BlogDominicana() {
  const { language } = useI18n();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const content = {
    badge: { es: "Guía Completa 2025-2026", pt: "Guia Completo 2025-2026", en: "Complete Guide 2025-2026" },
    h1: { es: "Viajes a Europa desde República Dominicana", pt: "Viagens à Europa a partir da República Dominicana", en: "Travel to Europe from Dominican Republic" },
    subtitle: { es: "Todo lo que necesitas saber: rutas, precios, destinos, visa y consejos para viajeros dominicanos", pt: "Tudo o que você precisa saber: rotas, preços, destinos, visto e dicas para viajantes dominicanos", en: "Everything you need to know: routes, prices, destinations, visa and tips for Dominican travelers" },
    destinations: { es: "Destinos Preferidos por Dominicanos", pt: "Destinos Preferidos pelos Dominicanos", en: "Preferred Destinations by Dominicans" },
    routes: { es: "Rutas Principales desde RD", pt: "Rotas Principais a partir de RD", en: "Main Routes from DR" },
    departures: { es: "Ciudades de Salida", pt: "Cidades de Partida", en: "Departure Cities" },
    prices: { es: "Comparativa de Precios", pt: "Comparativo de Preços", en: "Price Comparison" },
    faq: { es: "Preguntas Frecuentes", pt: "Perguntas Frequentes", en: "Frequently Asked Questions" },
    cta: { es: "Cotiza Tu Viaje Ahora", pt: "Solicite Seu Orçamento Agora", en: "Quote Your Trip Now" },
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
        title={language === "es" ? "Guía de Viajes a Europa desde República Dominicana - Rutas, Precios y Visa" : language === "pt" ? "Guia de Viagens à Europa a partir da República Dominicana - Rotas, Preços e Visto" : "Guide to Travel Europe from Dominican Republic - Routes, Prices and Visa"}
        description={language === "es" 
          ? "Guía completa para dominicanos que quieren viajar a Europa: destinos favoritos, vuelos desde Santo Domingo, precios 2025, trámite de visa Schengen, y consejos prácticos."
          : language === "pt"
          ? "Guia completo para dominicanos que querem viajar à Europa: destinos favoritos, voos a partir de Santo Domingo, preços 2025, trâmite de visto Schengen e dicas práticas."
          : "Complete guide for Dominicans wanting to travel to Europe: favorite destinations, flights from Santo Domingo, 2025 prices, Schengen visa process, and practical tips."}
        keywords="viajes europa republica dominicana, europa desde santo domingo, visa schengen dominicanos, paquetes europa rd"
        url="https://tripseuropa.com/blog/dominicana"
        type="article"
        locale="es_DO"
        publishedTime="2025-01-01"
        modifiedTime="2025-01-01"
      />
      <BreadcrumbSchema 
        items={[
          { name: "Inicio", url: "https://tripseuropa.com" },
          { name: "Blog", url: "https://tripseuropa.com/blog" },
          { name: "Republica Dominicana", url: "https://tripseuropa.com/blog/dominicana" }
        ]}
      />
      <BlogPostSchema
        title={language === "es" ? "Guía Completa: Viajes a Europa desde República Dominicana 2025-2026" : language === "pt" ? "Guia Completo: Viagens à Europa a partir da República Dominicana 2025-2026" : "Complete Guide: Travel to Europe from Dominican Republic 2025-2026"}
        description={language === "es" 
          ? "Todo lo que necesitas saber para viajar a Europa desde RD: destinos, rutas, precios, visa y consejos prácticos."
          : language === "pt"
          ? "Tudo o que você precisa saber para viajar à Europa a partir de RD: destinos, rotas, preços, visto e dicas práticas."
          : "Everything you need to know to travel to Europe from DR: destinations, routes, prices, visa and practical tips."}
        image="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=60&w=1200"
        datePublished="2025-01-01"
        author="Trips Europa"
        url="https://tripseuropa.com/blog/dominicana"
      />
      <FAQSchema questions={faqQuestions} />
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-blog-dominicana-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1580541631950-7282082b02fe?q=60&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-dominicana">
            {language === "es" ? content.badge.es : language === "pt" ? content.badge.pt : content.badge.en}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent mb-6" data-testid="text-dominicana-title">
            {language === "es" ? content.h1.es : language === "pt" ? content.h1.pt : content.h1.en}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8" data-testid="text-dominicana-subtitle">
            {language === "es" ? content.subtitle.es : language === "pt" ? content.subtitle.pt : content.subtitle.en}
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

      <section className="py-8 bg-amber-50 border-b border-amber-200" data-testid="section-visa-notice">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 justify-center">
            <Shield className="w-8 h-8 text-amber-600" />
            <div className="text-center">
              <p className="font-bold text-amber-800">
                {language === "es" ? "Importante: Los dominicanos necesitan visa Schengen" : language === "pt" ? "Importante: Dominicanos precisam de visto Schengen" : "Important: Dominicans need Schengen visa"}
              </p>
              <p className="text-amber-700 text-sm">
                {language === "es" ? "Ofrecemos asesoría completa para el trámite de visa. Proceso de 15-30 días." : language === "pt" ? "Oferecemos assessoria completa para o trâmite de visto. Processo de 15-30 dias." : "We offer complete visa processing assistance. 15-30 day process."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-destinations">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-8 text-center">
            {language === "es" ? content.destinations.es : language === "pt" ? content.destinations.pt : content.destinations.en}
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
                      <span>{language === "es" ? "Mejor época:" : language === "pt" ? "Melhor época:" : "Best time:"} {dest.bestTime}</span>
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
            {language === "es" ? content.routes.es : language === "pt" ? content.routes.pt : content.routes.en}
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
            {language === "es" ? content.departures.es : language === "pt" ? content.departures.pt : content.departures.en}
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
                      <p className="text-sm font-medium mb-2">{language === "es" ? "Rutas disponibles:" : language === "pt" ? "Rotas disponíveis:" : "Available routes:"}</p>
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
            {language === "es" ? content.prices.es : language === "pt" ? content.prices.pt : content.prices.en}
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="p-4 text-left">{language === "es" ? "Duración" : language === "pt" ? "Duração" : "Duration"}</th>
                        <th className="p-4 text-center">{language === "es" ? "Económico" : language === "pt" ? "Econômico" : "Budget"}</th>
                        <th className="p-4 text-center">{language === "es" ? "Estándar" : language === "pt" ? "Padrão" : "Standard"}</th>
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
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-8 text-center">
            {language === "es" ? content.faq.es : language === "pt" ? content.faq.pt : content.faq.en}
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
            {language === "es" ? content.cta.es : language === "pt" ? content.cta.pt : content.cta.en}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {language === "es" 
              ? "Nuestros asesores especializados en viajes desde Republica Dominicana te ayudaran con la visa y planificacion de tu viaje."
              : language === "pt"
              ? "Nossos consultores especializados em viagens desde Republica Dominicana ajudarao voce com o visto e planejamento da sua viagem."
              : "Our travel advisors specialized in trips from Dominican Republic will help you with visa and trip planning."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 gap-2">
                <Phone className="w-5 h-5" />
                {language === "es" ? "Contactar Asesor" : language === "pt" ? "Contatar Consultor" : "Contact Advisor"}
              </Button>
            </Link>
            <a href="https://api.whatsapp.com/send?phone=34611105448" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <SupportContactSection />
      <FloatingContactButtons />

      <Footer />
    </div>
  );
}
