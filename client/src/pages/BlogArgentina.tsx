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
    why: ["Idioma espanol", "Fuerte conexion cultural", "Museos Prado y Reina Sofia", "Hub para otros destinos"],
    nearby: ["Barcelona", "Sevilla", "Valencia", "Toledo"],
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
    id: "roma",
    name: "Roma, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    why: ["Herencia italiana argentina", "Coliseo y Vaticano", "Gastronomia autentica", "Arte renacentista"],
    nearby: ["Florencia", "Venecia", "Milan", "Napoles"],
  },
  {
    id: "paris",
    name: "Paris, Francia",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    why: ["Ciudad del amor", "Torre Eiffel", "Museo del Louvre", "Gastronomia mundial"],
    nearby: ["Versalles", "Normandia", "Provence"],
  },
  {
    id: "estambul",
    name: "Estambul, Turquia",
    countryCode: "TR",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=600&auto=format&fit=crop",
    why: ["Destino emergente", "Cultura unica", "Mezquitas impresionantes", "Bazares historicos"],
    nearby: ["Capadocia", "Efeso", "Pamukkale"],
  },
  {
    id: "lisboa",
    name: "Lisboa, Portugal",
    countryCode: "PT",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=600&auto=format&fit=crop",
    why: ["Destino accesible", "Gastronomia portuguesa", "Tranvias historicos", "Fado y cultura"],
    nearby: ["Cascais", "Sintra", "Oporto"],
  },
  {
    id: "florencia",
    name: "Florencia, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?q=80&w=600&auto=format&fit=crop",
    why: ["Cuna del Renacimiento", "Galeria Uffizi", "Duomo impresionante", "Toscana cercana"],
    nearby: ["Pisa", "Siena", "San Gimignano"],
  },
  {
    id: "venecia",
    name: "Venecia, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=600&auto=format&fit=crop",
    why: ["Canales romanticos", "Gondolas", "Plaza San Marcos", "Islas de Murano y Burano"],
    nearby: ["Verona", "Padua", "Trieste"],
  },
];

const DEPARTURE_CITIES = [
  {
    name: "Buenos Aires",
    code: "EZE",
    airport: "Aeropuerto Internacional Ministro Pistarini (Ezeiza)",
    priority: "MAXIMA",
    population: "3.1 millones (metro: 15M)",
    description: "La capital argentina es el principal hub internacional, con vuelos directos a Madrid, Roma y conexiones a toda Europa.",
    topDestinations: ["Madrid", "Barcelona", "Roma", "Paris", "Estambul"],
    airlines: ["Aerolineas Argentinas", "LATAM", "Iberia", "Air Europa"],
  },
  {
    name: "Cordoba",
    code: "COR",
    airport: "Aeropuerto Internacional Ingeniero Ambrosio Taravella",
    priority: "ALTA",
    population: "1.3 millones",
    description: "Segunda ciudad del pais con conexiones internacionales via Buenos Aires y Santiago.",
    topDestinations: ["Madrid", "Barcelona", "Roma", "Paris"],
    airlines: ["Aerolineas Argentinas", "LATAM"],
  },
  {
    name: "Rosario",
    code: "ROS",
    airport: "Aeropuerto Internacional Islas Malvinas",
    priority: "MEDIA",
    population: "950 mil",
    description: "Tercera ciudad argentina con acceso conveniente a Europa via Buenos Aires.",
    topDestinations: ["Madrid", "Barcelona", "Roma"],
    airlines: ["Aerolineas Argentinas", "LATAM"],
  },
];

const POPULAR_ROUTES = [
  {
    id: "clasica",
    name: "Ruta Clasica Argentina",
    description: "El recorrido favorito de los argentinos: Madrid, Barcelona y Paris.",
    destinations: ["Madrid", "Barcelona", "Paris"],
    highlights: ["Idioma espanol en España", "Cultura mediterranea", "Ciudad del amor", "Gastronomia variada"],
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "italiana",
    name: "Italia Completa",
    description: "Para argentinos con raices italianas: Roma, Florencia y Venecia.",
    destinations: ["Roma", "Florencia", "Venecia", "Milan"],
    highlights: ["Conexion con raices", "Arte renacentista", "Gondolas y canales", "Moda italiana"],
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "romantica",
    name: "Europa Romantica",
    description: "Perfecta para lunas de miel: Paris, Roma y Venecia.",
    destinations: ["Paris", "Roma", "Venecia"],
    highlights: ["Ciudades del amor", "Cenas romanticas", "Paseos en gondola", "Torre Eiffel"],
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "economica",
    name: "Europa Accesible",
    description: "La mejor relacion calidad-precio: Lisboa, Madrid y Barcelona.",
    destinations: ["Lisboa", "Madrid", "Barcelona"],
    highlights: ["Destinos accesibles", "Idioma similar", "Playas mediterraneas", "Cultura iberica"],
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800&auto=format&fit=crop",
  },
];

const FAQS = [
  {
    category: "Documentacion y Visas",
    questions: [
      {
        q: "Necesito visa para viajar a Europa siendo argentino?",
        a: "No. Los argentinos estan exentos de visa Schengen para estancias turisticas de hasta 90 dias. Solo necesitas pasaporte vigente con minimo 6 meses de validez."
      },
      {
        q: "Que documentos necesito?",
        a: "Pasaporte argentino vigente, pasaje ida y vuelta, reservas de alojamiento, seguro de viaje internacional y comprobante de fondos suficientes."
      },
    ]
  },
  {
    category: "Vuelos y Conexiones",
    questions: [
      {
        q: "Hay vuelos directos desde Argentina a Europa?",
        a: "Si, desde Buenos Aires hay vuelos directos a Madrid (Aerolineas Argentinas, Iberia) y Roma (Aerolineas Argentinas). Otras ciudades europeas requieren conexion."
      },
      {
        q: "Cuanto dura el vuelo a Europa?",
        a: "Los vuelos directos Buenos Aires-Madrid duran aproximadamente 12-13 horas. A Roma son unas 13 horas."
      },
    ]
  },
  {
    category: "Destinos Recomendados",
    questions: [
      {
        q: "Cual es el mejor destino para argentinos?",
        a: "España e Italia son los favoritos por la conexion cultural e idiomatica. Madrid, Barcelona, Roma y Florencia son los mas populares."
      },
      {
        q: "Puedo visitar varios paises?",
        a: "Si, los trenes europeos y vuelos de bajo costo facilitan recorrer multiples paises. Las rutas mas populares combinan España, Francia e Italia."
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

export default function BlogArgentina() {
  const { language } = useI18n();
  
  const allFaqs = FAQS.flatMap(cat => 
    cat.questions.map(faq => ({ question: faq.q, answer: faq.a }))
  );

  const breadcrumbs = [
    { name: "Inicio", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Viajes desde Argentina", url: "/blog/argentina" },
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-argentina">
      <SEOHead 
        title="Viajes a Europa desde Argentina | Buenos Aires, Cordoba, Rosario"
        description="Descubre los mejores destinos europeos para viajeros argentinos. Vuelos desde Buenos Aires, Cordoba y Rosario hacia Madrid, Roma, Barcelona, Paris y mas."
        keywords="viajes europa argentina, vuelos buenos aires madrid, europa desde cordoba, viajes rosario europa, paris desde argentina, roma desde buenos aires"
        url="/blog/argentina"
      />
      <FAQSchema questions={allFaqs} />
      <BreadcrumbSchema items={breadcrumbs} />
      <BlogPostSchema
        title="Viajes a Europa desde Argentina: Guia Completa"
        description="Todo lo que necesitas saber para viajar a Europa desde Argentina"
        datePublished="2025-01-01"
        author="Trips Europa"
        image="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200"
        url="/blog/argentina"
      />
      
      <Header />

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1920&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-[#d4af37] text-primary font-bold">
            <MapPin className="w-3 h-3 mr-1" /> Argentina
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Viajes A Europa Desde Argentina
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
            Desde Buenos Aires, Cordoba y Rosario hacia los destinos mas fascinantes de Europa. Vuelos directos a Madrid y Roma.
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
              Conectamos a viajeros de las principales ciudades argentinas con los mejores destinos europeos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
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
              Destinos Europeos Favoritos De Los Argentinos
            </h2>
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
              Rutas Populares Desde Argentina
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
              Por Que Viajar A Europa Desde Argentina
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Sin Visa Schengen</h3>
              <p className="text-sm text-muted-foreground">Argentinos exentos de visa para estancias de hasta 90 dias en Europa.</p>
            </Card>
            <Card className="text-center p-6">
              <Plane className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Vuelos Directos</h3>
              <p className="text-sm text-muted-foreground">Conexiones directas desde Buenos Aires a Madrid y Roma.</p>
            </Card>
            <Card className="text-center p-6">
              <Globe className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Conexion Cultural</h3>
              <p className="text-sm text-muted-foreground">Herencia italiana y espanola que facilita la experiencia europea.</p>
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
            Contactanos hoy y recibe una cotizacion personalizada para tu viaje sonado a Europa desde Argentina.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#d4af37] text-primary hover:bg-[#d4af37]/90 font-bold">
                <MessageCircle className="w-4 h-4 mr-2" />
                Solicitar Cotizacion
              </Button>
            </Link>
            <a href="https://api.whatsapp.com/send?phone=34611105448" target="_blank" rel="noopener noreferrer">
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
