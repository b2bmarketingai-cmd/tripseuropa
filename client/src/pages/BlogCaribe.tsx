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
  HelpCircle, ChevronDown, ChevronUp, Anchor
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
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=600&auto=format&fit=crop",
    why: ["Conexiones aereas", "Idioma español", "Cultura hispana", "Gastronomia"],
    duration: "8-10 dias",
    priceRange: "$10,500 USD",
    bestTime: "Abril - Octubre",
    routes: ["Madrid", "Barcelona", "Sevilla"],
  },
  {
    id: "francia",
    name: "Francia",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    why: ["Paris ciudad luz", "Moda y lujo", "Gastronomia francesa", "Romantico"],
    duration: "8-10 dias",
    priceRange: "$11,000 USD",
    bestTime: "Abril - Junio, Septiembre",
    routes: ["Paris", "Versalles", "Riviera"],
  },
  {
    id: "italia",
    name: "Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    why: ["Historia milenaria", "Arte renacentista", "Gastronomia", "Moda"],
    duration: "10-12 dias",
    priceRange: "$11,500 USD",
    bestTime: "Abril - Junio, Septiembre",
    routes: ["Roma", "Florencia", "Venecia"],
  },
  {
    id: "portugal",
    name: "Portugal",
    countryCode: "PT",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=600&auto=format&fit=crop",
    why: ["Precio accesible", "Playas hermosas", "Cultura única", "Gastronomia"],
    duration: "5-7 dias",
    priceRange: "$9,500 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Lisboa", "Oporto", "Algarve"],
  },
  {
    id: "grecia",
    name: "Grecia",
    countryCode: "GR",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop",
    why: ["Islas paradisiacas", "Historia antigua", "Mediterraneo", "Gastronomia"],
    duration: "8-10 dias",
    priceRange: "$10,000 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Atenas", "Santorini", "Mykonos"],
  },
];

const TRAVEL_ROUTES = [
  {
    id: "europa-clásica",
    name: "Europa Clásica",
    duration: "10 dias",
    price: "$11,000 USD",
    route: "Caribe - Madrid - Barcelona - Paris",
    highlights: ["3 capitales europeas", "Arte y cultura", "Gastronomia"],
    icon: Compass,
  },
  {
    id: "estambul-europa",
    name: "Estambul + Europa",
    duration: "12 dias",
    price: "$12,000 USD",
    route: "Caribe - Estambul - Europa Occidental",
    highlights: ["2 continentes", "Turkish Airlines", "Historia única"],
    icon: Globe,
  },
  {
    id: "portugal-españa",
    name: "Portugal + España",
    duration: "8 dias",
    price: "$9,500 USD",
    route: "Caribe - Lisboa - Madrid - Barcelona",
    highlights: ["Peninsula Iberica", "Precio accesible", "Cultura hispana"],
    icon: Heart,
  },
];

const CARIBBEAN_COUNTRIES = [
  {
    name: "Jamaica",
    code: "KIN",
    airport: "Norman Manley",
    population: "2.9M",
    features: ["Kingston hub", "Conexiones British Airways"],
    routes: ["Londres", "Madrid via Miami"],
  },
  {
    name: "Trinidad & Tobago",
    code: "POS",
    airport: "Piarco",
    population: "1.4M",
    features: ["Hub sur del Caribe", "Conexiones Caribbean Airlines"],
    routes: ["Londres", "Europa via Miami"],
  },
  {
    name: "Bahamas",
    code: "NAS",
    airport: "Lynden Pindling",
    population: "400k",
    features: ["Cercania a USA", "Hub American Airlines"],
    routes: ["Europa via Miami", "Londres via Nueva York"],
  },
  {
    name: "Barbados",
    code: "BGI",
    airport: "Grantley Adams",
    population: "290k",
    features: ["Hub British Airways Caribe", "Vuelos directos Londres"],
    routes: ["Londres (directo)", "Europa via Londres"],
  },
];

const PRICE_TABLE = [
  { duration: "7 dias", low: "$9,000", medium: "$10,500", high: "$13,000" },
  { duration: "10 dias", low: "$10,000", medium: "$11,500", high: "$14,500" },
  { duration: "12 dias", low: "$11,000", medium: "$12,500", high: "$16,000" },
  { duration: "14 dias", low: "$12,000", medium: "$14,000", high: "$17,500" },
];

const FAQS = [
  {
    category: "Documentacion & Visas",
    questions: [
      {
        q: "Necesito visa para viajar a Europa desde el Caribe?",
        a: "Depende de tu nacionalidad. Ciudadanos de Commonwealth (Jamaica, Bahamas, Barbados, Trinidad) pueden necesitar visa. Consulta los requisitos especificos de tu pais."
      },
      {
        q: "Que documentos necesito?",
        a: "Pasaporte vigente con minimo 6 meses de validez, reservas de hotel, boleto de regreso, seguro de viaje, y comprobante de fondos."
      },
    ]
  },
  {
    category: "Vuelos & Transporte",
    questions: [
      {
        q: "Cuales son las mejores conexiones desde el Caribe?",
        a: "Las mejores rutas son via Miami, Nueva York o Londres. British Airways ofrece vuelos directos Barbados-Londres."
      },
      {
        q: "Cuanto dura el viaje a Europa?",
        a: "Aproximadamente 10-14 horas dependiendo de la ruta y escalas."
      },
    ]
  },
  {
    category: "Dinero & Presupuesto",
    questions: [
      {
        q: "En que moneda estan los precios?",
        a: "Todos los precios estan en USD para facilidad de comparacion regional."
      },
      {
        q: "Hay paquetes premium disponibles?",
        a: "Si. Ofrecemos experiencias de lujo con hoteles 5 estrellas, vuelos business class, y tours privados."
      },
    ]
  },
];

const MARKET_STATS = [
  { label: "Poblacion Caribe", value: "7 millones" },
  { label: "Clase Media Objetivo", value: "2 millones (28%)" },
  { label: "Caribenos viajan exterior/año", value: "250,000" },
  { label: "Gasto promedio viaje Europa", value: "$9,500 USD" },
];

export default function BlogCaribe() {
  const { language } = useI18n();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const content = {
    badge: { es: "Guia Regional 2025-2026", pt: "Guia Regional 2025-2026", en: "Regional Guide 2025-2026" },
    h1: { es: "Viajes a Europa desde el Caribe", pt: "Viagens a Europa desde o Caribe", en: "Travel to Europe from the Caribbean" },
    subtitle: { es: "Jamaica, Trinidad & Tobago, Bahamas, Barbados y mas: rutas, precios y consejos para viajeros caribenos", pt: "Jamaica, Trinidad & Tobago, Bahamas, Barbados e mais: rotas, precos e dicas para viajantes caribenhos", en: "Jamaica, Trinidad & Tobago, Bahamas, Barbados and more: routes, prices and tips for Caribbean travelers" },
    destinations: { es: "Destinos Preferidos", pt: "Destinos Preferidos", en: "Preferred Destinations" },
    routes: { es: "Rutas Principales", pt: "Rotas Principais", en: "Main Routes" },
    countries: { es: "Paises del Caribe", pt: "Paises do Caribe", en: "Caribbean Countries" },
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
        title={language === "es" ? "Guia de Viajes a Europa desde el Caribe - Jamaica, Trinidad, Bahamas" : language === "pt" ? "Guia de Viagens a Europa desde o Caribe - Jamaica, Trinidad, Bahamas" : "Guide to Travel Europe from Caribbean - Jamaica, Trinidad, Bahamas"}
        description={language === "es" 
          ? "Guia completa para caribenos que quieren viajar a Europa: destinos favoritos, vuelos desde Jamaica, Trinidad, Bahamas, precios 2025 y consejos practicos."
          : language === "pt" 
          ? "Guia completo para caribenhos que querem viajar a Europa: destinos favoritos, voos de Jamaica, Trinidad, Bahamas, precos 2025 e dicas praticas."
          : "Complete guide for Caribbean residents wanting to travel to Europe: favorite destinations, flights from Jamaica, Trinidad, Bahamas, 2025 prices and practical tips."}
        keywords="viajes europa caribe, europa desde jamaica, europa desde trinidad, vuelos caribbean europa"
        url="https://tripseuropa.com/blog/caribe"
        type="article"
        locale="en_JM"
        publishedTime="2025-01-01"
        modifiedTime="2025-01-01"
      />
      <BreadcrumbSchema 
        items={[
          { name: "Inicio", url: "https://tripseuropa.com" },
          { name: "Blog", url: "https://tripseuropa.com/blog" },
          { name: "Caribe", url: "https://tripseuropa.com/blog/caribe" }
        ]}
      />
      <BlogPostSchema
        title={language === "es" ? "Guia Regional: Viajes a Europa desde el Caribe 2025-2026" : language === "pt" ? "Guia Regional: Viagens a Europa desde o Caribe 2025-2026" : "Regional Guide: Travel to Europe from Caribbean 2025-2026"}
        description={language === "es" 
          ? "Todo lo que necesitas saber para viajar a Europa desde el Caribe: destinos, rutas, precios y consejos practicos."
          : language === "pt"
          ? "Tudo o que voce precisa saber para viajar a Europa desde o Caribe: destinos, rotas, precos e dicas praticas."
          : "Everything you need to know to travel to Europe from the Caribbean: destinations, routes, prices and practical tips."}
        image="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200"
        datePublished="2025-01-01"
        author="Trips Europa"
        url="https://tripseuropa.com/blog/caribe"
      />
      <FAQSchema questions={faqQuestions} />
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-blog-caribe-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-caribe">
            {content.badge[language]}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent mb-6" data-testid="text-caribe-title">
            {content.h1[language]}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8" data-testid="text-caribe-subtitle">
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

      <section className="py-16 bg-white" data-testid="section-countries">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-8 text-center">
            {content.countries[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARIBBEAN_COUNTRIES.map((country) => (
              <Card key={country.code} className="hover:shadow-lg transition-shadow" data-testid={`card-country-${country.code}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Anchor className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{country.name}</h3>
                      <span className="text-sm text-muted-foreground">{country.code}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>{country.airport}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{country.population}</span>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-sm font-medium mb-2">{language === "es" ? "Rutas:" : language === "pt" ? "Rotas:" : "Routes:"}</p>
                      <div className="flex flex-wrap gap-1">
                        {country.routes.map((route, idx) => (
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
              ? "Nuestros asesores especializados en viajes desde el Caribe te ayudaran a planificar tu viaje perfecto a Europa."
              : language === "pt"
              ? "Nossos consultores especializados em viagens do Caribe ajudarao voce a planejar sua viagem perfeita para a Europa."
              : "Our travel advisors specialized in trips from the Caribbean will help you plan your perfect trip to Europe."}
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
