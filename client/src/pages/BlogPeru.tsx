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
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=60&w=600&auto=format&fit=crop",
    why: ["Idioma espanol", "Conexiones faciles desde Lima", "Museos de clase mundial", "Vida cultural vibrante"],
    nearby: ["Barcelona", "Sevilla", "Toledo", "Valencia"],
  },
  {
    id: "barcelona",
    name: "Barcelona, España",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=60&w=600&auto=format&fit=crop",
    why: ["Gaudi y modernismo", "Playas mediterraneas", "Sagrada Familia", "FC Barcelona"],
    nearby: ["Costa Brava", "Montserrat", "Girona"],
  },
  {
    id: "paris",
    name: "Paris, Francia",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=60&w=600&auto=format&fit=crop",
    why: ["Ciudad del amor", "Torre Eiffel", "Museo del Louvre", "Moda y gastronomia"],
    nearby: ["Versalles", "Disneyland Paris", "Normandia"],
  },
  {
    id: "roma",
    name: "Roma, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=60&w=600&auto=format&fit=crop",
    why: ["Historia milenaria", "Vaticano y Coliseo", "Gastronomia italiana", "Arte renacentista"],
    nearby: ["Florencia", "Venecia", "Napoles", "Pompeya"],
  },
  {
    id: "lisboa",
    name: "Lisboa, Portugal",
    countryCode: "PT",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=60&w=600&auto=format&fit=crop",
    why: ["Destino accesible", "Cultura unica", "Pasteles de Belem", "Playas cercanas"],
    nearby: ["Sintra", "Cascais", "Oporto", "Algarve"],
  },
  {
    id: "londres",
    name: "Londres, Reino Unido",
    countryCode: "GB",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=60&w=600&auto=format&fit=crop",
    why: ["Historia y monumentos", "Big Ben y Buckingham", "Museos gratuitos", "Compras de clase mundial"],
    nearby: ["Oxford", "Stonehenge", "Bath"],
  },
  {
    id: "amsterdam",
    name: "Amsterdam, Paises Bajos",
    countryCode: "NL",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=60&w=600&auto=format&fit=crop",
    why: ["Canales pintorescos", "Museo Van Gogh", "Bicicletas y tulipanes", "Cultura liberal"],
    nearby: ["Bruselas", "Brujas", "Rotterdam"],
  },
  {
    id: "florencia",
    name: "Florencia, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?q=60&w=600&auto=format&fit=crop",
    why: ["Cuna del Renacimiento", "Galeria Uffizi", "Duomo impresionante", "Toscana cercana"],
    nearby: ["Pisa", "Siena", "San Gimignano"],
  },
];

const DEPARTURE_CITIES = [
  {
    name: "Lima",
    code: "LIM",
    airport: "Aeropuerto Internacional Jorge Chavez",
    priority: "MAXIMA",
    population: "10 millones",
    description: "La capital peruana es el principal hub internacional, con conexiones a toda Europa via Madrid, Amsterdam y otras ciudades.",
    topDestinations: ["Madrid", "Barcelona", "Paris", "Roma", "Amsterdam"],
    airlines: ["LATAM", "Iberia", "KLM", "Air France"],
  },
  {
    name: "Arequipa",
    code: "AQP",
    airport: "Aeropuerto Internacional Alfredo Rodriguez Ballon",
    priority: "MEDIA",
    population: "1.1 millones",
    description: "La Ciudad Blanca conecta con Europa via Lima, ideal para viajeros del sur del Peru.",
    topDestinations: ["Madrid", "Barcelona", "Paris"],
    airlines: ["LATAM", "Sky Airline"],
  },
  {
    name: "Cusco",
    code: "CUZ",
    airport: "Aeropuerto Internacional Alejandro Velasco Astete",
    priority: "MEDIA",
    population: "450 mil",
    description: "Capital historica del Peru con conexiones via Lima hacia Europa.",
    topDestinations: ["Madrid", "Barcelona", "Roma"],
    airlines: ["LATAM", "Sky Airline", "JetSmart"],
  },
];

const POPULAR_ROUTES = [
  {
    id: "espana",
    name: "España Completa",
    description: "El destino favorito de los peruanos: Madrid y Barcelona con toda la cultura espanola.",
    destinations: ["Madrid", "Barcelona", "Sevilla", "Granada"],
    highlights: ["Idioma espanol", "Flamenco y tapas", "Gaudi y modernismo", "Historia andaluza"],
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=60&w=800&auto=format&fit=crop",
  },
  {
    id: "clasica",
    name: "Europa Clasica",
    description: "El recorrido tradicional europeo: Madrid, Paris y Roma.",
    destinations: ["Madrid", "Paris", "Roma"],
    highlights: ["3 capitales iconicas", "Arte y cultura", "Gastronomia variada", "Monumentos historicos"],
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=60&w=800&auto=format&fit=crop",
  },
  {
    id: "romantica",
    name: "Europa Romantica",
    description: "Perfecta para parejas y lunas de miel: Paris, Roma y Venecia.",
    destinations: ["Paris", "Roma", "Venecia", "Florencia"],
    highlights: ["Ciudades del amor", "Torre Eiffel", "Gondolas venecianas", "Arte renacentista"],
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=60&w=800&auto=format&fit=crop",
  },
  {
    id: "accesible",
    name: "Europa Accesible",
    description: "La mejor relacion calidad-precio: Lisboa, Madrid y Barcelona.",
    destinations: ["Lisboa", "Madrid", "Barcelona"],
    highlights: ["Destinos accesibles", "Idioma similar", "Playas mediterraneas", "Cultura iberica"],
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=60&w=800&auto=format&fit=crop",
  },
];

const FAQS = [
  {
    category: "Documentacion y Visas",
    questions: [
      {
        q: "Necesito visa para viajar a Europa siendo peruano?",
        a: "No. Los peruanos estan exentos de visa Schengen para estancias turisticas de hasta 90 dias. Solo necesitas pasaporte vigente con minimo 6 meses de validez."
      },
      {
        q: "Que documentos necesito?",
        a: "Pasaporte peruano vigente, pasaje ida y vuelta, reservas de alojamiento, seguro de viaje internacional y comprobante de fondos suficientes."
      },
    ]
  },
  {
    category: "Vuelos y Conexiones",
    questions: [
      {
        q: "Hay vuelos directos desde Peru a Europa?",
        a: "No hay vuelos directos, pero hay excelentes conexiones via Madrid (Iberia), Amsterdam (KLM) y Panama (Copa). El tiempo total es aproximadamente 14-16 horas."
      },
      {
        q: "Cuales son las mejores aerolineas?",
        a: "LATAM, Iberia, KLM y Air France ofrecen las mejores conexiones. Copa Airlines tambien tiene buenas opciones via Panama."
      },
    ]
  },
  {
    category: "Destinos Recomendados",
    questions: [
      {
        q: "Cual es el mejor destino para peruanos?",
        a: "España es perfecta por el idioma y la facilidad cultural. Madrid y Barcelona son los destinos favoritos de los viajeros peruanos."
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

export default function BlogPeru() {
  const { language } = useI18n();
  
  const allFaqs = FAQS.flatMap(cat => 
    cat.questions.map(faq => ({ question: faq.q, answer: faq.a }))
  );

  const breadcrumbs = [
    { name: "Inicio", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Viajes desde Peru", url: "/blog/peru" },
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-peru">
      <SEOHead 
        title="Viajes a Europa desde Peru | Lima, Arequipa, Cusco"
        description="Descubre los mejores destinos europeos para viajeros peruanos. Vuelos desde Lima, Arequipa y Cusco hacia Madrid, Paris, Roma, Barcelona y mas."
        keywords="viajes europa peru, vuelos lima madrid, europa desde arequipa, viajes cusco europa, paris desde peru, roma desde lima"
        url="/blog/peru"
      />
      <FAQSchema questions={allFaqs} />
      <BreadcrumbSchema items={breadcrumbs} />
      <BlogPostSchema
        title="Viajes a Europa desde Peru: Guia Completa"
        description="Todo lo que necesitas saber para viajar a Europa desde Peru"
        datePublished="2025-01-01"
        author="Trips Europa"
        image="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=60&w=1200"
        url="/blog/peru"
      />
      
      <Header />

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526392060635-9d6019884377?q=60&w=1200&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-[#d4af37] text-primary font-bold">
            <MapPin className="w-3 h-3 mr-1" /> Peru
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Viajes A Europa Desde Peru
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
            Desde Lima, Arequipa y Cusco hacia los destinos mas fascinantes de Europa. Las mejores conexiones para viajeros peruanos.
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
              Conectamos a viajeros de las principales ciudades peruanas con los mejores destinos europeos.
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
              Destinos Europeos Favoritos De Los Peruanos
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
              Rutas Populares Desde Peru
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
              Por Que Viajar A Europa Desde Peru
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Sin Visa Schengen</h3>
              <p className="text-sm text-muted-foreground">Peruanos exentos de visa para estancias de hasta 90 dias en Europa.</p>
            </Card>
            <Card className="text-center p-6">
              <Plane className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Buenas Conexiones</h3>
              <p className="text-sm text-muted-foreground">Excelentes conexiones via Madrid, Amsterdam y Panama.</p>
            </Card>
            <Card className="text-center p-6">
              <Globe className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Ventaja Cultural</h3>
              <p className="text-sm text-muted-foreground">El espanol te facilita la comunicacion en España y otros paises.</p>
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
            Contactanos hoy y recibe una cotizacion personalizada para tu viaje sonado a Europa desde Peru.
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
