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
    name: "Madrid, Espana",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=600&auto=format&fit=crop",
    why: ["Vuelo directo desde CDMX (11 horas)", "Idioma español", "Hub para otros paises", "Museos Prado y Reina Sofia"],
    duration: "8-10 dias",
    priceRange: "$10,500 - $13,500 USD",
    bestTime: "Abril - Octubre",
    routes: ["Barcelona", "Sevilla", "Valencia"],
  },
  {
    id: "roma",
    name: "Roma, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    why: ["Patrimonio historico unico", "Gastronomia superior", "Coliseo y Vaticano", "Destino romantico"],
    duration: "10-12 dias",
    priceRange: "$11,000 - $14,000 USD",
    bestTime: "Mayo, Septiembre, Octubre",
    routes: ["Florencia", "Venecia", "Milan", "Pompeya"],
  },
  {
    id: "paris",
    name: "Paris, Francia",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    why: ["Vuelo directo desde CDMX", "Torre Eiffel iconica", "Museo del Louvre", "Gastronomia mundial"],
    duration: "8-10 dias",
    priceRange: "$10,800 - $13,800 USD",
    bestTime: "Abril - Junio, Septiembre",
    routes: ["Versalles", "Normandia", "Provence"],
  },
  {
    id: "barcelona",
    name: "Barcelona, Espana",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600&auto=format&fit=crop",
    why: ["Playas mediterraneas", "Obras de Gaudi", "Vida moderna vibrante", "Sagrada Familia"],
    duration: "7-9 dias",
    priceRange: "$10,000 - $12,500 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Costa Brava", "Montserrat"],
  },
  {
    id: "lisboa",
    name: "Lisboa, Portugal",
    countryCode: "PT",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=600&auto=format&fit=crop",
    why: ["Presupuesto mas accesible", "Playas cercanas", "Cultura autentica", "Destino emergente"],
    duration: "6-8 dias",
    priceRange: "$8,500 - $10,500 USD",
    bestTime: "Mayo - Octubre",
    routes: ["Cascais", "Oporto", "Algarve"],
  },
  {
    id: "londres",
    name: "Londres, Reino Unido",
    countryCode: "GB",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop",
    why: ["Vuelo directo CDMX (10 horas)", "Historia y cultura", "Monumentos iconicos", "Compras de clase mundial"],
    duration: "5-7 dias",
    priceRange: "$9,500 - $12,000 USD",
    bestTime: "Abril - Septiembre",
    routes: ["Oxford", "Stonehenge", "Escocia"],
  },
];

const TRAVEL_ROUTES = [
  {
    id: "clasica",
    name: "Clasica Madrid + Barcelona",
    duration: "8 dias",
    route: "CDMX → Madrid → Barcelona → CDMX",
    price: "$10,500 - $13,000 USD",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800&auto=format&fit=crop",
    highlights: ["Dias 1-4: Madrid (Prado, Retiro, nightlife)", "Dia 5: Vuelo Madrid-Barcelona (2h)", "Dias 6-8: Barcelona (Gaudi, Sagrada Familia, playas)"],
    keywords: ["viaje Espana desde Mexico", "Madrid Barcelona 8 dias CDMX"],
  },
  {
    id: "romantica",
    name: "Romantica Paris + Roma",
    duration: "10 dias",
    route: "CDMX → Paris → Roma → CDMX",
    price: "$11,500 - $14,500 USD",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
    highlights: ["Dias 1-5: Paris (Eiffel, Louvre, Versalles)", "Dia 6: Vuelo Paris-Roma", "Dias 7-10: Roma (Coliseo, Vaticano, gastronomia)"],
    keywords: ["luna de miel Europa Mexico", "Paris Roma desde CDMX"],
  },
  {
    id: "completa",
    name: "Europa Completa",
    duration: "14 dias",
    route: "CDMX → Madrid → Barcelona → Paris → Roma → CDMX",
    price: "$13,500 - $17,000 USD",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop",
    highlights: ["4 ciudades iconicas", "Espana, Francia e Italia", "Experiencia completa europea"],
    keywords: ["viaje Europa 14 dias Mexico", "tour 4 ciudades Europa CDMX"],
  },
  {
    id: "economica",
    name: "Europa Economica",
    duration: "8 dias",
    route: "CDMX → Lisboa → Barcelona → CDMX",
    price: "$8,500 - $10,500 USD",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800&auto=format&fit=crop",
    highlights: ["Mejor relacion precio-calidad", "Ciudades accesibles", "Ideal primera vez"],
    keywords: ["viajes economicos Europa Mexico", "paquete barato Portugal Espana"],
  },
  {
    id: "lujo",
    name: "Europa Premium",
    duration: "12 dias",
    route: "CDMX → Paris (5 estrellas) → Suiza → Italia → CDMX",
    price: "$15,000 - $20,000 USD",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    highlights: ["Hoteles 5 estrellas", "Experiencias exclusivas", "Servicio VIP"],
    keywords: ["viajes de lujo Europa desde Mexico", "tour premium Europa"],
  },
];

const DEPARTURE_CITIES = [
  {
    name: "Ciudad de Mexico",
    code: "MEX",
    airport: "Aeropuerto Intl. Benito Juarez",
    priority: "MUY ALTA",
    population: "21M",
    features: ["Capital del pais", "Mayor mercado", "Vuelos directos a Madrid, Paris, Londres"],
    routes: ["Madrid (Iberia/LATAM)", "Paris (Air France)", "Londres (British Airways)", "Roma (conexion)"],
  },
  {
    name: "Guadalajara",
    code: "GDL",
    airport: "Aeropuerto Intl. Miguel Hidalgo",
    priority: "ALTA",
    population: "5.3M",
    features: ["Segunda ciudad mas grande", "Fuerte poder adquisitivo", "Conexiones via CDMX/Houston"],
    routes: ["Madrid (via CDMX)", "Paris (via Houston)", "Barcelona (conexion)"],
  },
  {
    name: "Monterrey",
    code: "MTY",
    airport: "Aeropuerto Intl. Mariano Escobedo",
    priority: "ALTA",
    population: "4.3M",
    features: ["Centro industrial", "Alto poder adquisitivo", "Conexiones via Houston/Dallas"],
    routes: ["Madrid (via Dallas)", "Paris (via Houston)", "Roma (conexion)"],
  },
  {
    name: "Cancun",
    code: "CUN",
    airport: "Aeropuerto Intl. de Cancun",
    priority: "MEDIA",
    population: "888K",
    features: ["Hub turistico", "Conexiones internacionales", "Vuelos a Europa estacionales"],
    routes: ["Madrid (estacional)", "Paris (conexion)", "Londres (estacional)"],
  },
  {
    name: "Puebla",
    code: "PBC",
    airport: "Aeropuerto Intl. de Puebla",
    priority: "MEDIA",
    population: "2.8M",
    features: ["Cuarta ciudad del pais", "Mercado emergente", "Acceso via CDMX"],
    routes: ["Europa via CDMX", "Madrid (conexion)", "Paris (conexion)"],
  },
];

const MARKET_DATA = {
  population: "130 millones",
  targetMarket: "45 millones (35%)",
  annualTravelers: "8.9 millones/año",
  avgSpending: "$9,000 - $16,000 USD",
  marketPotential: "$80-144 billones MXN anuales",
  visaStatus: "EXENTO - Sin visa Schengen hasta 90 dias",
};

const PRICE_COMPARISON = [
  { segment: "Economico", priceRange: "$8,500 - $10,000 USD", duration: "8-10 dias", target: "Jovenes/Primera vez", margin: "20-25%" },
  { segment: "Estandar", priceRange: "$10,500 - $13,500 USD", duration: "10-12 dias", target: "Familias clase media", margin: "25-30%" },
  { segment: "Premium", priceRange: "$15,000 - $20,000 USD", duration: "12-14 dias", target: "Clase alta/Lujo", margin: "30-35%" },
];

const FAQ_CATEGORIES = [
  {
    category: "Documentos y Visa",
    icon: Shield,
    faqs: [
      {
        question: "Necesito visa para viajar a Europa desde Mexico?",
        answer: "No. Los ciudadanos mexicanos estan EXENTOS de visa Schengen para estancias turisticas de hasta 90 dias. Solo necesitas pasaporte vigente con al menos 6 meses de validez, boleto de regreso confirmado, comprobante de hospedaje y seguro de viaje.",
      },
      {
        question: "Que documentos necesito para viajar a Europa?",
        answer: "Pasaporte mexicano vigente (6+ meses), boleto de avion ida y vuelta, reservaciones de hotel confirmadas, seguro de viaje internacional con cobertura minima de 30,000 EUR, y comprobante de solvencia economica.",
      },
      {
        question: "Puedo viajar a Reino Unido sin visa?",
        answer: "Si, los mexicanos pueden visitar Reino Unido sin visa hasta por 6 meses como turistas. Es un pais separado del espacio Schengen, por lo que tiene sus propias reglas de entrada.",
      },
    ],
  },
  {
    category: "Vuelos y Transporte",
    icon: Plane,
    faqs: [
      {
        question: "Hay vuelos directos desde Mexico a Europa?",
        answer: "Si, desde CDMX hay vuelos directos a Madrid (Iberia, LATAM - 11 horas), Paris (Air France - 10.5 horas) y Londres (British Airways - 10 horas). Desde Guadalajara y Monterrey los vuelos hacen conexion via Houston, Dallas o CDMX.",
      },
      {
        question: "Cuanto cuesta un vuelo redondo Mexico-Europa?",
        answer: "Los precios varian: Madrid $800-1,400 USD, Paris $850-1,450 USD, Roma $900-1,600 USD (con escala), Barcelona $800-1,300 USD, Londres $800-1,500 USD. La temporada y anticipacion de compra influyen significativamente.",
      },
      {
        question: "Cual es la mejor epoca para encontrar vuelos baratos?",
        answer: "La temporada baja (noviembre-marzo, excepto Navidad) ofrece los mejores precios. Reserva con 3-4 meses de anticipacion para mejores tarifas. Martes y miercoles suelen tener precios mas bajos.",
      },
    ],
  },
  {
    category: "Presupuesto y Pagos",
    icon: CreditCard,
    faqs: [
      {
        question: "Cuanto cuesta un viaje a Europa desde Mexico todo incluido?",
        answer: "Dependiendo del nivel: Economico $8,500-10,000 USD (8-10 dias), Estandar $10,500-13,500 USD (10-12 dias), Premium $15,000-20,000 USD (12-14 dias). Incluye vuelos, hoteles 3-4 estrellas, tours y seguros.",
      },
      {
        question: "Que formas de pago aceptan?",
        answer: "Aceptamos tarjeta de credito (1-6 cuotas sin intereses), PayPal, transferencia bancaria (30% anticipo), y pago de contado con 5% de descuento adicional. Financiamiento disponible hasta 12 meses.",
      },
      {
        question: "Incluyen seguro de viaje?",
        answer: "Si, todos nuestros paquetes incluyen seguro de viaje internacional con cobertura medica minima de 30,000 EUR como requiere el espacio Schengen, mas cancelacion de viaje y perdida de equipaje.",
      },
    ],
  },
  {
    category: "Destinos y Rutas",
    icon: Compass,
    faqs: [
      {
        question: "Cual es el mejor destino para primera vez en Europa?",
        answer: "Madrid y Barcelona son ideales por el idioma español. La ruta 'Clasica Madrid + Barcelona' de 8 dias ($10,500-13,000 USD) es perfecta para conocer Europa sin barrera del idioma.",
      },
      {
        question: "Puedo combinar varios paises en un viaje?",
        answer: "Absolutamente. Nuestra ruta 'Europa Completa' de 14 dias incluye España, Francia e Italia por $13,500-17,000 USD. El tren europeo facilita moverse entre ciudades.",
      },
      {
        question: "Cual es la mejor epoca para visitar Europa?",
        answer: "Primavera (abril-junio) y otoño (septiembre-octubre) ofrecen clima agradable y menos multitudes. Verano (julio-agosto) es temporada alta con precios mas altos. Invierno es economico pero frio.",
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

export default function BlogMexico() {
  const { language } = useI18n();
  
  const allFaqs = FAQ_CATEGORIES.flatMap(cat => 
    cat.faqs.map(faq => ({ question: faq.question, answer: faq.answer }))
  );

  const breadcrumbs = [
    { name: language === "es" ? "Inicio" : "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: language === "es" ? "Viajes Europa desde Mexico" : "Europe Travel from Mexico", url: "/blog/mexico" },
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-mexico">
      <SEOHead 
        title={language === "es" ? "Viajes a Europa desde Mexico 2025 | Guia Completa, Rutas y Precios" : "Europe Travel from Mexico 2025 | Complete Guide, Routes & Prices"}
        description={language === "es" 
          ? "Guia completa para viajes a Europa desde Mexico. Vuelos directos CDMX-Madrid, paquetes desde $8,500 USD. Rutas, precios y consejos para mexicanos." 
          : "Complete guide for Europe travel from Mexico. Direct flights CDMX-Madrid, packages from $8,500 USD. Routes, prices and tips for Mexicans."}
        keywords={language === "es" 
          ? "viajes europa mexico, paquetes europa cdmx, tours europa guadalajara, viajes madrid mexico, paris desde mexico, roma desde cdmx" 
          : "europe travel mexico, europe packages cdmx, europe tours guadalajara, madrid trips mexico, paris from mexico, rome from cdmx"}
        url="/blog/mexico"
      />
      <FAQSchema questions={allFaqs} />
      <BreadcrumbSchema items={breadcrumbs} />
      <BlogPostSchema
        title={language === "es" ? "Viajes a Europa desde Mexico: Guia Completa 2025" : "Europe Travel from Mexico: Complete Guide 2025"}
        description={language === "es" ? "Todo lo que necesitas saber para viajar a Europa desde Mexico" : "Everything you need to know to travel to Europe from Mexico"}
        datePublished="2025-01-01"
        author="Trips Europa"
        image="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200"
        url="/blog/mexico"
      />
      
      <Header />

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden" data-testid="section-hero">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1920&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-accent text-primary font-bold">
            <MapPin className="w-3 h-3 mr-1" /> MX
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            {language === "es" ? "Viajes A Europa Desde Mexico" : "Europe Travel From Mexico"}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
            {language === "es" 
              ? "Vuelos directos desde CDMX. Paquetes todo incluido desde $8,500 USD. 8.9 millones de mexicanos viajan cada año." 
              : "Direct flights from Mexico City. All-inclusive packages from $8,500 USD. 8.9 million Mexicans travel each year."}
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
              <div className="text-sm text-muted-foreground">{language === "es" ? "Clase Media" : "Middle Class"}</div>
            </Card>
            <Card className="text-center p-4">
              <Plane className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{MARKET_DATA.annualTravelers}</div>
              <div className="text-sm text-muted-foreground">{language === "es" ? "Viajeros/Año" : "Travelers/Year"}</div>
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
              {language === "es" ? "Destinos Principales Desde Mexico" : "Top Destinations From Mexico"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Los destinos europeos mas populares entre viajeros mexicanos, con vuelos directos desde CDMX." 
                : "The most popular European destinations for Mexican travelers, with direct flights from Mexico City."}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              {language === "es" ? "Rutas Populares Desde Mexico" : "Popular Routes From Mexico"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Itinerarios probados con las mejores combinaciones de destinos europeos." 
                : "Proven itineraries with the best combinations of European destinations."}
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
              {language === "es" ? "Ciudades De Salida En Mexico" : "Departure Cities In Mexico"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Vuelos directos y conexiones convenientes desde las principales ciudades mexicanas." 
                : "Direct flights and convenient connections from major Mexican cities."}
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
              {language === "es" ? "Comparativa De Precios Mexico" : "Mexico Price Comparison"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Opciones para todos los presupuestos. Precios en USD, impuestos incluidos." 
                : "Options for all budgets. Prices in USD, taxes included."}
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
                ? "Respuestas a las dudas mas comunes de viajeros mexicanos a Europa." 
                : "Answers to the most common questions from Mexican travelers to Europe."}
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
            {language === "es" ? "Planifica Tu Viaje A Europa Desde Mexico" : "Plan Your Trip To Europe From Mexico"}
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            {language === "es" 
              ? "Recibe una cotizacion personalizada sin compromiso. Atencion en español, pagos en pesos mexicanos, financiamiento disponible." 
              : "Get a personalized quote with no obligation. Spanish language support, payments in Mexican pesos, financing available."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-bold" data-testid="button-cta-quote">
                <Phone className="w-4 h-4 mr-2" />
                {language === "es" ? "Solicitar Cotizacion" : "Request Quote"}
              </Button>
            </Link>
            <a href="https://wa.me/+525512345678" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" data-testid="button-cta-whatsapp">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp CDMX
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
