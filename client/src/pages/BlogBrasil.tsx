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
    id: "roma",
    name: "Roma, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    why: ["Coliseo y Vaticano", "Gastronomia italiana", "Destino romantico", "Arte y cultura"],
    duration: "10-12 dias",
    priceRange: "$12,000 - $16,000 USD",
    bestTime: "Abril - Octubre",
    routes: ["Florencia", "Venecia", "Milan", "Napoles"],
  },
  {
    id: "paris",
    name: "Paris, Francia",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    why: ["Torre Eiffel iconica", "Museo del Louvre", "Gastronomia refinada", "Moda y lujo"],
    duration: "8-10 dias",
    priceRange: "$11,500 - $15,500 USD",
    bestTime: "Abril - Junio, Septiembre",
    routes: ["Versalles", "Normandia", "Provence"],
  },
  {
    id: "madrid",
    name: "Madrid, Espana",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=600&auto=format&fit=crop",
    why: ["Vuelos directos TAP/LATAM", "Idioma similar", "Museos Prado y Reina Sofia", "Vida nocturna"],
    duration: "8-10 dias",
    priceRange: "$11,000 - $14,500 USD",
    bestTime: "Abril - Octubre",
    routes: ["Barcelona", "Sevilla", "Toledo"],
  },
  {
    id: "florencia",
    name: "Florencia, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?q=80&w=600&auto=format&fit=crop",
    why: ["Cuna del Renacimiento", "Galeria Uffizi", "Toscana cercana", "Arte supremo"],
    duration: "6-8 dias",
    priceRange: "$10,500 - $13,500 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Pisa", "Siena", "Toscana"],
  },
  {
    id: "barcelona",
    name: "Barcelona, Espana",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600&auto=format&fit=crop",
    why: ["Gaudi y Sagrada Familia", "Playas mediterraneas", "Vida moderna", "Costa Brava"],
    duration: "7-9 dias",
    priceRange: "$11,000 - $14,000 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Costa Brava", "Montserrat"],
  },
  {
    id: "londres",
    name: "Londres, Reino Unido",
    countryCode: "GB",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop",
    why: ["Via TAP Lisboa", "Historia y monumentos", "Compras de clase mundial", "Cultura britanica"],
    duration: "5-7 dias",
    priceRange: "$10,500 - $13,500 USD",
    bestTime: "Abril - Septiembre",
    routes: ["Oxford", "Stonehenge", "Escocia"],
  },
  {
    id: "lisboa",
    name: "Lisboa, Portugal",
    countryCode: "PT",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=600&auto=format&fit=crop",
    why: ["Vuelos directos TAP (2 diarios)", "Idioma portugues", "Hub para Europa", "Presupuesto accesible"],
    duration: "5-7 dias",
    priceRange: "$9,000 - $11,500 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Cascais", "Oporto", "Sintra"],
  },
  {
    id: "grecia",
    name: "Grecia (Atenas + Islas)",
    countryCode: "GR",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop",
    why: ["Santorini y Mikonos", "Acropolis historica", "Islas paradisiacas", "Gastronomia mediterranea"],
    duration: "8-10 dias",
    priceRange: "$10,500 - $14,000 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Santorini", "Mikonos", "Creta"],
  },
];

const TRAVEL_ROUTES = [
  {
    id: "clasica",
    name: "Clasica Italia + Francia",
    duration: "10 dias",
    route: "Sao Paulo → Roma → Paris → Sao Paulo",
    price: "$12,500 - $15,500 USD",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=800&auto=format&fit=crop",
    highlights: ["Dias 1-4: Roma (Coliseo, Vaticano, gastronomia)", "Dia 5: Vuelo Roma-Paris", "Dias 6-10: Paris (Eiffel, Louvre, Versalles)"],
    keywords: ["viagem Italia Franca Brasil", "Roma Paris desde Sao Paulo"],
  },
  {
    id: "luxo",
    name: "Europa Luxo Mediterranea",
    duration: "12 dias",
    route: "Sao Paulo → Madrid → Barcelona → Roma → Florencia → Sao Paulo",
    price: "$16,000 - $22,000 USD",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800&auto=format&fit=crop",
    highlights: ["Hoteles 5 estrellas", "Espana + Italia", "Toscana premium", "Servicio VIP"],
    keywords: ["viagem luxo Europa Brasil", "pacote premium Europa"],
  },
  {
    id: "cultural",
    name: "Europa Cultural",
    duration: "14 dias",
    route: "Sao Paulo → Lisboa → Madrid → Paris → Brujas → Amsterdam → Sao Paulo",
    price: "$14,500 - $18,500 USD",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop",
    highlights: ["6 ciudades iconicas", "Portugal, Espana, Francia, Belgica, Holanda", "Experiencia cultural completa"],
    keywords: ["tour Europa 14 dias Brasil", "viagem multi-pais Europa"],
  },
  {
    id: "portugal-espana",
    name: "Portugal + Espana",
    duration: "8 dias",
    route: "Sao Paulo → Lisboa → Oporto → Madrid → Sao Paulo",
    price: "$10,500 - $13,500 USD",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800&auto=format&fit=crop",
    highlights: ["Vuelo directo TAP Lisboa", "Idioma familiar", "Ciudades encantadoras"],
    keywords: ["viagem Portugal Espanha Brasil", "Lisboa Porto Madrid"],
  },
  {
    id: "grecia",
    name: "Grecia Romantica",
    duration: "10 dias",
    route: "Sao Paulo → Atenas → Santorini → Mikonos → Sao Paulo",
    price: "$12,000 - $16,000 USD",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    highlights: ["Acropolis de Atenas", "Puesta de sol Santorini", "Vida nocturna Mikonos"],
    keywords: ["viagem Grecia Brasil", "Santorini Mikonos desde Sao Paulo"],
  },
];

const DEPARTURE_CITIES = [
  {
    name: "Sao Paulo",
    code: "GRU",
    airport: "Aeroporto Intl. de Guarulhos",
    priority: "MUY ALTA",
    population: "12M",
    features: ["Mayor ciudad de Sudamerica", "Centro financiero", "Vuelos directos a Lisboa, Madrid"],
    routes: ["Lisboa (TAP direto)", "Madrid (LATAM)", "Paris (conexao)", "Roma (conexao)"],
  },
  {
    name: "Rio de Janeiro",
    code: "GIG",
    airport: "Aeroporto Intl. Tom Jobim",
    priority: "ALTA",
    population: "6.7M",
    features: ["Ciudad turistica iconica", "Conexiones via Lisboa", "Alto poder adquisitivo"],
    routes: ["Lisboa (TAP)", "Madrid (conexao)", "Paris (conexao)"],
  },
  {
    name: "Belo Horizonte",
    code: "CNF",
    airport: "Aeroporto Intl. Tancredo Neves",
    priority: "ALTA",
    population: "2.5M",
    features: ["Tercera ciudad de Brasil", "Centro economico Minas Gerais"],
    routes: ["Lisboa (conexao)", "Madrid (conexao)", "Europa via Sao Paulo"],
  },
  {
    name: "Brasilia",
    code: "BSB",
    airport: "Aeroporto Intl. de Brasilia",
    priority: "MEDIA",
    population: "3M",
    features: ["Capital federal", "Funcionarios publicos", "Alto poder adquisitivo"],
    routes: ["Lisboa (conexao)", "Madrid (conexao)", "Europa via Sao Paulo"],
  },
  {
    name: "Salvador",
    code: "SSA",
    airport: "Aeroporto Intl. de Salvador",
    priority: "MEDIA",
    population: "2.9M",
    features: ["Capital cultural", "Conexiones via Sao Paulo", "Mercado emergente"],
    routes: ["Lisboa (conexao)", "Europa via Sao Paulo/Rio"],
  },
];

const MARKET_DATA = {
  population: "215 millones",
  targetMarket: "60 millones (28%)",
  annualTravelers: "10.4 millones/ano",
  avgSpending: "$10,000 - $18,000 USD",
  marketPotential: "$104-180 billones USD anuales",
  visaStatus: "EXENTO - Sin visa Schengen hasta 90 dias",
};

const PRICE_COMPARISON = [
  { segment: "Economico", priceRange: "$10,000 - $12,000 USD", duration: "8-10 dias", target: "Primera viagem", margin: "20-25%" },
  { segment: "Padrao", priceRange: "$12,500 - $16,000 USD", duration: "10-12 dias", target: "Familias classe media", margin: "25-30%" },
  { segment: "Luxo", priceRange: "$18,000 - $30,000 USD", duration: "12-14 dias", target: "Classe alta", margin: "30-40%" },
];

const FAQ_CATEGORIES = [
  {
    category: "Documentos y Visa",
    icon: Shield,
    faqs: [
      {
        question: "Brasileiros precisam de visto para viajar a Europa?",
        answer: "Nao. Cidadaos brasileiros estao ISENTOS de visto Schengen para estadas turisticas de ate 90 dias. Voce so precisa de passaporte valido com pelo menos 6 meses de validade, passagem de volta confirmada, comprovante de hospedagem e seguro viagem.",
      },
      {
        question: "Quais documentos preciso para viajar para a Europa?",
        answer: "Passaporte brasileiro valido (6+ meses), passagem aerea ida e volta, reservas de hotel confirmadas, seguro viagem internacional com cobertura minima de 30.000 EUR conforme exigido pelo espaco Schengen, e comprovante de meios financeiros.",
      },
      {
        question: "Preciso de visto para o Reino Unido?",
        answer: "Nao, brasileiros podem visitar o Reino Unido sem visto por ate 6 meses como turistas. E um pais separado do espaco Schengen, portanto tem suas proprias regras de entrada.",
      },
    ],
  },
  {
    category: "Vuelos y Transporte",
    icon: Plane,
    faqs: [
      {
        question: "Ha voos diretos do Brasil para a Europa?",
        answer: "Sim, de Sao Paulo ha voos diretos para Lisboa (TAP - 2 voos diarios, 9-10 horas) e Madrid (LATAM/Iberia - 11-13 horas). Do Rio de Janeiro tambem ha opcoes para Lisboa. Outros destinos europeus requerem conexao via Lisboa ou Madrid.",
      },
      {
        question: "Quanto custa uma passagem ida e volta Brasil-Europa?",
        answer: "Os precos variam: Lisboa $700-1,200 USD (direto), Madrid $900-1,600 USD, Roma $1,100-1,800 USD (conexao), Paris $1,000-1,700 USD, Londres $1,000-1,800 USD. A temporada e antecedencia da compra influenciam significativamente.",
      },
      {
        question: "Qual a melhor epoca para encontrar voos baratos?",
        answer: "A baixa temporada (marco-maio, setembro-novembro) oferece os melhores precos. Reserve com 3-4 meses de antecedencia para melhores tarifas. TAP frequentemente oferece promocoes para Lisboa como hub.",
      },
    ],
  },
  {
    category: "Presupuesto y Pagos",
    icon: CreditCard,
    faqs: [
      {
        question: "Quanto custa uma viagem a Europa desde o Brasil tudo incluido?",
        answer: "Dependendo do nivel: Economico $10,000-12,000 USD (8-10 dias), Padrao $12,500-16,000 USD (10-12 dias), Luxo $18,000-30,000 USD (12-14 dias). Inclui voos, hoteis 4-5 estrelas, tours e seguros.",
      },
      {
        question: "Quais formas de pagamento aceitam?",
        answer: "Aceitamos cartao de credito (1-12 parcelas), PIX com 2% de desconto, transferencia bancaria (30% de entrada), e pagamento em dolar com 5% de desconto adicional.",
      },
      {
        question: "Incluem seguro viagem?",
        answer: "Sim, todos os nossos pacotes incluem seguro viagem internacional com cobertura medica minima de 30.000 EUR conforme exigido pelo espaco Schengen, alem de cancelamento de viagem e extravio de bagagem.",
      },
    ],
  },
  {
    category: "Destinos y Rutas",
    icon: Compass,
    faqs: [
      {
        question: "Qual o melhor destino para primeira viagem a Europa?",
        answer: "Lisboa e Portugal sao ideais pelo idioma portugues e voos diretos TAP. A rota 'Portugal + Espanha' de 8 dias ($10,500-13,500 USD) e perfeita para conhecer Europa sem barreira do idioma.",
      },
      {
        question: "Posso combinar varios paises em uma viagem?",
        answer: "Absolutamente. Nossa rota 'Europa Cultural' de 14 dias inclui 6 paises por $14,500-18,500 USD. O trem europeu facilita deslocamentos entre cidades.",
      },
      {
        question: "Qual a melhor epoca para visitar a Europa?",
        answer: "Primavera (abril-junho) e outono (setembro-outubro) oferecem clima agradavel e menos multidoes. Verao (julho-agosto) e alta temporada com precos mais altos. Inverno e economico mas frio.",
      },
    ],
  },
];

function FAQSection({ category, icon: Icon, faqs }: { category: string; icon: React.ElementType; faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-bold text-accent">{category}</h3>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <Card key={index} className="border border-border/50">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 text-left flex items-center justify-between gap-4"
              data-testid={`faq-toggle-${category}-${index}`}
            >
              <span className="font-medium text-foreground">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <CardContent className="pt-0 pb-4 px-4">
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function BlogBrasil() {
  const { language } = useI18n();
  
  const allFaqs = FAQ_CATEGORIES.flatMap(cat => 
    cat.faqs.map(faq => ({ question: faq.question, answer: faq.answer }))
  );

  const breadcrumbs = [
    { name: language === "es" ? "Inicio" : "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: language === "es" ? "Viajes Europa desde Brasil" : "Europe Travel from Brazil", url: "/blog/brasil" },
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-brasil">
      <SEOHead 
        title={language === "es" ? "Viajes a Europa desde Brasil 2025 | Guia Completa, Rutas y Precios" : "Europe Travel from Brazil 2025 | Complete Guide, Routes & Prices"}
        description={language === "es" 
          ? "Guia completa para viajes a Europa desde Brasil. Vuelos directos Sao Paulo-Lisboa, paquetes desde $10,000 USD. Rutas, precios y consejos para brasileiros." 
          : "Complete guide for Europe travel from Brazil. Direct flights Sao Paulo-Lisbon, packages from $10,000 USD. Routes, prices and tips for Brazilians."}
        keywords={language === "es" 
          ? "viajes europa brasil, pacotes europa sao paulo, tours europa rio de janeiro, viagens lisboa brasil, paris desde brasil, roma desde sao paulo" 
          : "europe travel brazil, europe packages sao paulo, europe tours rio, lisbon trips brazil, paris from brazil, rome from sao paulo"}
        url="/blog/brasil"
      />
      <FAQSchema questions={allFaqs} />
      <BreadcrumbSchema items={breadcrumbs} />
      <BlogPostSchema
        title={language === "es" ? "Viajes a Europa desde Brasil: Guia Completa 2025" : "Europe Travel from Brazil: Complete Guide 2025"}
        description={language === "es" ? "Todo lo que necesitas saber para viajar a Europa desde Brasil" : "Everything you need to know to travel to Europe from Brazil"}
        datePublished="2025-01-01"
        author="Trips Europa"
        image="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200"
        url="/blog/brasil"
      />
      
      <Header />

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden" data-testid="section-hero">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1920&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-accent text-primary font-bold">
            <MapPin className="w-3 h-3 mr-1" /> BR
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            {language === "es" ? "Viajes A Europa Desde Brasil" : "Europe Travel From Brazil"}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
            {language === "es" 
              ? "Vuelos directos TAP desde Sao Paulo. Paquetes premium desde $10,000 USD. 10.4 millones de brasileiros viajan cada año." 
              : "Direct TAP flights from Sao Paulo. Premium packages from $10,000 USD. 10.4 million Brazilians travel each year."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-bold" data-testid="button-hero-quote">
                <MessageCircle className="w-4 h-4 mr-2" />
                {language === "es" ? "Cotizacion Gratis" : "Free Quote"}
              </Button>
            </Link>
            <Link href="/packages">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" data-testid="button-hero-packages">
                <Plane className="w-4 h-4 mr-2" />
                {language === "es" ? "Ver Paquetes" : "View Packages"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-accent/10" data-testid="section-market-stats">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="text-center p-4">
              <Users className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{MARKET_DATA.population}</div>
              <div className="text-sm text-muted-foreground">{language === "es" ? "Poblacion" : "Population"}</div>
            </Card>
            <Card className="text-center p-4">
              <Building className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{MARKET_DATA.targetMarket}</div>
              <div className="text-sm text-muted-foreground">{language === "es" ? "Clase Media/Alta" : "Middle/Upper Class"}</div>
            </Card>
            <Card className="text-center p-4">
              <Plane className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{MARKET_DATA.annualTravelers}</div>
              <div className="text-sm text-muted-foreground">{language === "es" ? "Viajeros/Ano" : "Travelers/Year"}</div>
            </Card>
            <Card className="text-center p-4">
              <DollarSign className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{MARKET_DATA.avgSpending}</div>
              <div className="text-sm text-muted-foreground">{language === "es" ? "Gasto Promedio" : "Avg. Spending"}</div>
            </Card>
            <Card className="text-center p-4 col-span-2 md:col-span-1 lg:col-span-2 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-700 dark:text-green-400">{language === "es" ? "Sin Visa Schengen" : "No Schengen Visa"}</div>
              <div className="text-sm text-green-600 dark:text-green-500">{language === "es" ? "90 dias como turista" : "90 days as tourist"}</div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-destinations">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-4">
              {language === "es" ? "Destinos Principales Desde Brasil" : "Top Destinations From Brazil"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Los destinos europeos mas populares entre viajeros brasileiros, con vuelos directos TAP desde Sao Paulo." 
                : "The most popular European destinations for Brazilian travelers, with direct TAP flights from Sao Paulo."}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_DESTINATIONS.map((dest) => (
              <Card key={dest.id} className="overflow-hidden group" data-testid={`card-destination-${dest.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-foreground font-bold">
                      {dest.countryCode}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-accent mb-2">{dest.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {dest.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {dest.bestTime}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-primary mb-3">{dest.priceRange}</div>
                  <ul className="space-y-1 mb-3">
                    {dest.why.slice(0, 3).map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1">
                    {dest.routes.map((route) => (
                      <Badge key={route} variant="outline" className="text-xs">{route}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-routes">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-4">
              {language === "es" ? "Rutas Populares Desde Brasil" : "Popular Routes From Brazil"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Itinerarios probados con las mejores combinaciones de destinos europeos para brasileiros." 
                : "Proven itineraries with the best combinations of European destinations for Brazilians."}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRAVEL_ROUTES.map((route) => (
              <Card key={route.id} className="overflow-hidden" data-testid={`card-route-${route.id}`}>
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={route.image} 
                    alt={route.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <Badge className="bg-accent text-primary font-bold">{route.duration}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-accent mb-2">{route.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                    <Plane className="w-4 h-4" /> {route.route}
                  </p>
                  <div className="text-xl font-bold text-primary mb-3">{route.price}</div>
                  <ul className="space-y-1">
                    {route.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-departures">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-4">
              {language === "es" ? "Ciudades De Salida En Brasil" : "Departure Cities In Brazil"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Vuelos directos TAP y conexiones convenientes desde las principales ciudades brasileiras." 
                : "Direct TAP flights and convenient connections from major Brazilian cities."}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTURE_CITIES.map((city) => (
              <Card key={city.code} className="p-4" data-testid={`card-departure-${city.code}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{city.code}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{city.name}</h3>
                    <p className="text-sm text-muted-foreground">{city.airport}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={city.priority === "MUY ALTA" ? "default" : city.priority === "ALTA" ? "secondary" : "outline"}>
                    {city.priority}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{city.population}</span>
                </div>
                <ul className="space-y-1 mb-3">
                  {city.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground mb-2">{language === "es" ? "Rutas disponibles:" : "Available routes:"}</p>
                  <div className="flex flex-wrap gap-1">
                    {city.routes.map((route) => (
                      <Badge key={route} variant="outline" className="text-xs">{route}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-prices">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-4">
              {language === "es" ? "Comparativa De Precios Brasil" : "Brazil Price Comparison"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Opciones para todos los presupuestos. Precios en USD, pagos en reales disponibles." 
                : "Options for all budgets. Prices in USD, payments in reais available."}
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-card rounded-lg overflow-hidden" data-testid="table-price-comparison">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="p-4 text-left">{language === "es" ? "Segmento" : "Segment"}</th>
                  <th className="p-4 text-left">{language === "es" ? "Rango de Precio" : "Price Range"}</th>
                  <th className="p-4 text-left">{language === "es" ? "Duracion" : "Duration"}</th>
                  <th className="p-4 text-left">{language === "es" ? "Publico Objetivo" : "Target Audience"}</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_COMPARISON.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="p-4 font-medium">{row.segment}</td>
                    <td className="p-4 font-bold text-accent">{row.priceRange}</td>
                    <td className="p-4">{row.duration}</td>
                    <td className="p-4 text-muted-foreground">{row.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-faqs">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-4">
              {language === "es" ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Respuestas a las dudas mas comunes de viajeros brasileiros a Europa." 
                : "Answers to the most common questions from Brazilian travelers to Europe."}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {FAQ_CATEGORIES.map((cat) => (
              <FAQSection key={cat.category} category={cat.category} icon={cat.icon} faqs={cat.faqs} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-primary/90" data-testid="section-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {language === "es" ? "Planifica Tu Viaje A Europa Desde Brasil" : "Plan Your Trip To Europe From Brazil"}
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            {language === "es" 
              ? "Recibe una cotizacion personalizada sin compromiso. Atencion en portugues, pagos en reales, parcelamento disponible." 
              : "Get a personalized quote with no obligation. Portuguese language support, payments in reais, installments available."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-bold" data-testid="button-cta-quote">
                <Phone className="w-4 h-4 mr-2" />
                {language === "es" ? "Solicitar Cotizacion" : "Request Quote"}
              </Button>
            </Link>
            <a href="https://wa.me/+5511999999999" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" data-testid="button-cta-whatsapp">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Sao Paulo
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
