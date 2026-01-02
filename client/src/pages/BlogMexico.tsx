import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Plane, MapPin, Star, Users, Shield, 
  CheckCircle, Phone, MessageCircle,
  Globe, Heart, ChevronDown, ChevronUp
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
    why: ["Vuelo directo desde CDMX (11 horas)", "Idioma espanol", "Museos Prado y Reina Sofia", "Hub para otros destinos"],
    nearby: ["Barcelona", "Sevilla", "Valencia", "Toledo"],
  },
  {
    id: "paris",
    name: "Paris, Francia",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    why: ["Vuelo directo desde CDMX", "Torre Eiffel iconica", "Museo del Louvre", "Gastronomia mundial"],
    nearby: ["Versalles", "Normandia", "Provence", "Champagne"],
  },
  {
    id: "roma",
    name: "Roma, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    why: ["Coliseo y Vaticano", "Gastronomia italiana", "Historia milenaria", "Arte renacentista"],
    nearby: ["Florencia", "Venecia", "Milan", "Napoles"],
  },
  {
    id: "barcelona",
    name: "Barcelona, España",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600&auto=format&fit=crop",
    why: ["Playas mediterraneas", "Arquitectura de Gaudi", "Sagrada Familia", "Vida nocturna vibrante"],
    nearby: ["Costa Brava", "Montserrat", "Girona"],
  },
  {
    id: "lisboa",
    name: "Lisboa, Portugal",
    countryCode: "PT",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=600&auto=format&fit=crop",
    why: ["Vuelo directo desde CDMX", "Destino accesible", "Gastronomia portuguesa", "Cultura autentica"],
    nearby: ["Cascais", "Sintra", "Oporto", "Algarve"],
  },
  {
    id: "londres",
    name: "Londres, Reino Unido",
    countryCode: "GB",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop",
    why: ["Vuelo directo desde CDMX", "Big Ben y Buckingham", "Compras de clase mundial", "Museos gratuitos"],
    nearby: ["Oxford", "Stonehenge", "Bath", "Escocia"],
  },
  {
    id: "amsterdam",
    name: "Amsterdam, Paises Bajos",
    countryCode: "NL",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=600&auto=format&fit=crop",
    why: ["Canales pintorescos", "Museo Van Gogh", "Cultura unica", "Tulipanes y bicicletas"],
    nearby: ["Bruselas", "Brujas", "Rotterdam"],
  },
  {
    id: "praga",
    name: "Praga, Republica Checa",
    countryCode: "CZ",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=600&auto=format&fit=crop",
    why: ["Ciudad de cuento de hadas", "Arquitectura medieval", "Cerveza artesanal", "Muy accesible"],
    nearby: ["Viena", "Budapest", "Berlin"],
  },
];

const DEPARTURE_CITIES = [
  {
    name: "Ciudad de Mexico (CDMX)",
    code: "MEX",
    airport: "Aeropuerto Internacional Benito Juarez",
    priority: "MAXIMA",
    population: "21 millones",
    description: "La capital mexicana es el principal hub internacional, con vuelos directos a Madrid, Paris, Londres y Lisboa.",
    topDestinations: ["Madrid", "Paris", "Roma", "Londres", "Lisboa"],
    airlines: ["Aeromexico", "Iberia", "Air France", "British Airways"],
  },
  {
    name: "Guadalajara",
    code: "GDL",
    airport: "Aeropuerto Internacional Miguel Hidalgo",
    priority: "ALTA",
    population: "5.3 millones",
    description: "La Perla Tapatio conecta con Europa via CDMX y Houston, ideal para viajeros del Bajio.",
    topDestinations: ["Madrid", "Barcelona", "Paris", "Roma"],
    airlines: ["Aeromexico", "United", "American Airlines"],
  },
  {
    name: "Monterrey",
    code: "MTY",
    airport: "Aeropuerto Internacional Mariano Escobedo",
    priority: "ALTA",
    population: "4.3 millones",
    description: "Capital industrial del norte, con excelentes conexiones via Dallas y Houston hacia Europa.",
    topDestinations: ["Madrid", "Paris", "Roma", "Barcelona"],
    airlines: ["Aeromexico", "United", "Delta", "American Airlines"],
  },
  {
    name: "Cancun",
    code: "CUN",
    airport: "Aeropuerto Internacional de Cancun",
    priority: "MEDIA",
    population: "888 mil",
    description: "Hub turistico con vuelos estacionales directos a Europa, ideal para combinar Caribe + Europa.",
    topDestinations: ["Madrid", "Paris", "Londres", "Frankfurt"],
    airlines: ["Aeromexico", "Iberia", "Condor"],
  },
  {
    name: "Puebla",
    code: "PBC",
    airport: "Aeropuerto Internacional de Puebla",
    priority: "MEDIA",
    population: "2.8 millones",
    description: "Cuarta ciudad del pais con acceso conveniente a Europa via CDMX.",
    topDestinations: ["Madrid", "Barcelona", "Paris"],
    airlines: ["Aeromexico", "Volaris"],
  },
];

const POPULAR_ROUTES = [
  {
    id: "espana",
    name: "España Completa",
    description: "El destino favorito de los mexicanos: Madrid y Barcelona con toda la cultura espanola.",
    destinations: ["Madrid", "Barcelona", "Sevilla", "Granada"],
    highlights: ["Idioma espanol", "Flamenco y tapas", "Gaudi y Sagrada Familia", "Plazas historicas"],
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "romantica",
    name: "Europa Romantica",
    description: "Paris y Roma: las ciudades del amor para lunas de miel y escapadas romanticas.",
    destinations: ["Paris", "Roma", "Venecia", "Florencia"],
    highlights: ["Torre Eiffel", "Coliseo Romano", "Gondolas en Venecia", "Cenas romanticas"],
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "completa",
    name: "Europa Completa",
    description: "El gran tour europeo: España, Francia e Italia en un viaje inolvidable.",
    destinations: ["Madrid", "Barcelona", "Paris", "Roma"],
    highlights: ["4 ciudades iconicas", "3 paises", "Trenes de alta velocidad", "Gastronomia variada"],
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "portugal",
    name: "Portugal y España",
    description: "Descubre la peninsula iberica: Lisboa, Oporto y las principales ciudades espanolas.",
    destinations: ["Lisboa", "Oporto", "Madrid", "Barcelona"],
    highlights: ["Cultura portuguesa", "Vinos del Douro", "Arquitectura morisca", "Costas atlanticas"],
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800&auto=format&fit=crop",
  },
];

const FAQS = [
  {
    category: "Documentacion y Visas",
    questions: [
      {
        q: "Necesito visa para viajar a Europa siendo mexicano?",
        a: "No. Los mexicanos estan exentos de visa Schengen para estancias turisticas de hasta 90 dias. Solo necesitas pasaporte vigente con minimo 6 meses de validez."
      },
      {
        q: "Que documentos necesito para viajar?",
        a: "Pasaporte mexicano vigente, boleto de avion ida y vuelta, reservas de hotel, seguro de viaje internacional y comprobante de solvencia economica."
      },
    ]
  },
  {
    category: "Vuelos y Conexiones",
    questions: [
      {
        q: "Hay vuelos directos desde Mexico a Europa?",
        a: "Si, desde CDMX hay vuelos directos a Madrid (Aeromexico, Iberia), Paris (Air France), Londres (British Airways) y Lisboa (TAP). Aproximadamente 10-11 horas de vuelo."
      },
      {
        q: "Cuales son las mejores aerolineas?",
        a: "Aeromexico, Iberia, Air France y British Airways ofrecen excelentes conexiones directas. United y American Airlines tienen buenas opciones via sus hubs."
      },
    ]
  },
  {
    category: "Destinos Recomendados",
    questions: [
      {
        q: "Cual es el mejor destino para primera vez?",
        a: "España es perfecta por el idioma y la facilidad cultural. Madrid y Barcelona son ideales para iniciarse en Europa."
      },
      {
        q: "Puedo combinar varios paises?",
        a: "Absolutamente. Los trenes europeos y vuelos de bajo costo facilitan visitar multiples paises. Las rutas mas populares combinan España, Francia e Italia."
      },
    ]
  },
];

function FAQSection({ category, questions }: { category: string; questions: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-[#d4af37] mb-4">{category}</h3>
      <div className="space-y-3">
        {questions.map((faq, index) => (
          <Card key={index} className="border border-border/50">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 text-left flex items-center justify-between gap-4"
            >
              <span className="font-medium text-foreground">{faq.q}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <CardContent className="pt-0 pb-4 px-4">
                <p className="text-muted-foreground">{faq.a}</p>
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
  
  const allFaqs = FAQS.flatMap(cat => 
    cat.questions.map(faq => ({ question: faq.q, answer: faq.a }))
  );

  const breadcrumbs = [
    { name: "Inicio", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Viajes desde Mexico", url: "/blog/mexico" },
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-mexico">
      <SEOHead 
        title="Viajes a Europa desde Mexico | CDMX, Guadalajara, Monterrey, Cancun"
        description="Descubre los mejores destinos europeos para viajeros mexicanos. Vuelos desde Ciudad de Mexico, Guadalajara, Monterrey y Cancun hacia Madrid, Paris, Roma y mas."
        keywords="viajes europa mexico, vuelos cdmx madrid, europa desde guadalajara, viajes monterrey europa, cancun europa, paris desde mexico, roma desde cdmx"
        url="/blog/mexico"
      />
      <FAQSchema questions={allFaqs} />
      <BreadcrumbSchema items={breadcrumbs} />
      <BlogPostSchema
        title="Viajes a Europa desde Mexico: Guia Completa"
        description="Todo lo que necesitas saber para viajar a Europa desde Mexico"
        datePublished="2025-01-01"
        author="Trips Europa"
        image="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200"
        url="/blog/mexico"
      />
      
      <Header />

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1920&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-[#d4af37] text-primary font-bold">
            <MapPin className="w-3 h-3 mr-1" /> Mexico
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Viajes A Europa Desde Mexico
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
            Desde Ciudad de Mexico, Guadalajara, Monterrey y Cancun hacia los destinos mas fascinantes de Europa. Vuelos directos y las mejores conexiones.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#d4af37] text-primary hover:bg-[#d4af37]/90 font-bold">
                <MessageCircle className="w-4 h-4 mr-2" />
                Cotizacion Gratis
              </Button>
            </Link>
            <Link href="/packages">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <Plane className="w-4 h-4 mr-2" />
                Ver Paquetes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#d4af37]/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#d4af37] mb-4">
              Viaja Desde Tu Ciudad
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conectamos a viajeros de las principales ciudades mexicanas con los mejores destinos europeos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTURE_CITIES.map((city) => (
              <Card key={city.code} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#d4af37]">{city.name}</h3>
                      <p className="text-sm text-muted-foreground">{city.airport}</p>
                    </div>
                    <Badge variant="secondary" className="font-bold">{city.code}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{city.description}</p>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#d4af37]" />
                      Poblacion: {city.population}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Destinos Populares:</p>
                    <div className="flex flex-wrap gap-1">
                      {city.topDestinations.map((dest) => (
                        <Badge key={dest} variant="outline" className="text-xs">{dest}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Aerolineas:</p>
                    <div className="flex flex-wrap gap-1">
                      {city.airlines.map((airline) => (
                        <Badge key={airline} variant="secondary" className="text-xs">{airline}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#d4af37] mb-4">
              Destinos Europeos Favoritos De Los Mexicanos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Los destinos mas buscados por viajeros mexicanos, con informacion sobre que ver y lugares cercanos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_DESTINATIONS.map((dest) => (
              <Card key={dest.id} className="overflow-hidden group">
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
                  <h3 className="text-xl font-bold text-[#d4af37] mb-3">{dest.name}</h3>
                  <ul className="space-y-1 mb-4">
                    {dest.why.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Cerca de:</p>
                    <div className="flex flex-wrap gap-1">
                      {dest.nearby.map((place) => (
                        <Badge key={place} variant="outline" className="text-xs">{place}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#d4af37] mb-4">
              Rutas Populares Desde Mexico
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {POPULAR_ROUTES.map((route) => (
              <Card key={route.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/5 h-48 md:h-auto">
                    <img src={route.image} alt={route.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="md:w-3/5 p-6">
                    <h3 className="text-xl font-bold text-[#d4af37] mb-2">{route.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{route.description}</p>
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Destinos:</p>
                      <div className="flex flex-wrap gap-1">
                        {route.destinations.map((dest) => (
                          <Badge key={dest} className="bg-[#d4af37]/20 text-[#d4af37] text-xs">{dest}</Badge>
                        ))}
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {route.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="w-3 h-3 text-[#d4af37]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#d4af37] mb-4">
              Por Que Viajar A Europa Desde Mexico
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Sin Visa Schengen</h3>
              <p className="text-sm text-muted-foreground">Mexicanos exentos de visa para estancias de hasta 90 dias en Europa.</p>
            </Card>
            <Card className="text-center p-6">
              <Plane className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Vuelos Directos</h3>
              <p className="text-sm text-muted-foreground">Conexiones directas desde CDMX a Madrid, Paris, Londres y Lisboa.</p>
            </Card>
            <Card className="text-center p-6">
              <Globe className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Ventaja Cultural</h3>
              <p className="text-sm text-muted-foreground">El espanol te abre puertas en España y facilita la comunicacion.</p>
            </Card>
            <Card className="text-center p-6">
              <Heart className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Experiencia Unica</h3>
              <p className="text-sm text-muted-foreground">Arte, historia, gastronomia y paisajes que cambiaran tu vida.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#d4af37] mb-4">
              Preguntas Frecuentes
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {FAQS.map((section, idx) => (
              <FAQSection key={idx} category={section.category} questions={section.questions} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#d4af37] mb-4">
            Comienza Tu Aventura Europea
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Contactanos hoy y recibe una cotizacion personalizada para tu viaje sonado a Europa desde Mexico.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#d4af37] text-primary hover:bg-[#d4af37]/90 font-bold">
                <MessageCircle className="w-4 h-4 mr-2" />
                Solicitar Cotizacion
              </Button>
            </Link>
            <a href="https://wa.me/34611105448" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
