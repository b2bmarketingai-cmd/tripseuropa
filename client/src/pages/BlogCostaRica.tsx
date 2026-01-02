import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Plane, MapPin, Star, Users, Shield, 
  CheckCircle, Phone, MessageCircle,
  Globe, Heart, ChevronDown, ChevronUp, Leaf
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
    why: ["Vuelo directo Iberia desde San Jose", "Idioma espanol", "Museos Prado y Reina Sofia", "Hub para toda Europa"],
    nearby: ["Toledo", "Segovia", "Barcelona", "Sevilla"],
  },
  {
    id: "barcelona",
    name: "Barcelona, España",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600&auto=format&fit=crop",
    why: ["Gaudi y Sagrada Familia", "Playas mediterraneas", "Cultura catalana vibrante", "Gastronomia excepcional"],
    nearby: ["Costa Brava", "Montserrat", "Girona", "Tarragona"],
  },
  {
    id: "paris",
    name: "Paris, Francia",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    why: ["Torre Eiffel iconica", "Museo del Louvre", "Ciudad del amor", "Gastronomia refinada"],
    nearby: ["Versalles", "Normandia", "Champagne", "Valle del Loira"],
  },
  {
    id: "roma",
    name: "Roma, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    why: ["Coliseo y Vaticano", "Historia milenaria", "Gastronomia italiana", "Arte renacentista"],
    nearby: ["Florencia", "Venecia", "Napoles", "Toscana"],
  },
  {
    id: "lisboa",
    name: "Lisboa, Portugal",
    countryCode: "PT",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=600&auto=format&fit=crop",
    why: ["Idioma similar al espanol", "Ciudad costera encantadora", "Pasteles de nata", "Hub TAP para Europa"],
    nearby: ["Sintra", "Cascais", "Porto", "Algarve"],
  },
  {
    id: "amsterdam",
    name: "Amsterdam, Paises Bajos",
    countryCode: "NL",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=600&auto=format&fit=crop",
    why: ["Canales pintorescos", "Museo Van Gogh", "Cultura sostenible", "Arquitectura unica"],
    nearby: ["Rotterdam", "La Haya", "Brujas", "Bruselas"],
  },
  {
    id: "londres",
    name: "Londres, Reino Unido",
    countryCode: "GB",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop",
    why: ["Historia y monumentos", "Museos gratuitos", "Cultura britanica", "Conexiones via Miami"],
    nearby: ["Oxford", "Stonehenge", "Bath", "Escocia"],
  },
  {
    id: "zurich",
    name: "Suiza (Zurich/Ginebra)",
    countryCode: "CH",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop",
    why: ["Alpes espectaculares", "Lagos cristalinos", "Naturaleza pristina", "Ideal para ecoturistas"],
    nearby: ["Interlaken", "Lucerna", "Zermatt", "Grindelwald"],
  },
];

const DEPARTURE_CITIES = [
  {
    name: "San Jose",
    code: "SJO",
    airport: "Aeropuerto Internacional Juan Santamaria",
    priority: "MAXIMA",
    population: "1.4 millones",
    description: "Principal hub internacional de Costa Rica con vuelos directos a Madrid y conexiones globales via Estados Unidos y Panama.",
    topDestinations: ["Madrid", "Paris", "Roma", "Barcelona", "Londres"],
    airlines: ["Iberia", "United", "American Airlines", "Delta", "Copa Airlines"],
  },
  {
    name: "Liberia",
    code: "LIR",
    airport: "Aeropuerto Internacional Daniel Oduber",
    priority: "ALTA",
    population: "65,000",
    description: "Puerta de entrada a Guanacaste con conexiones internacionales y acceso a playas del Pacifico Norte.",
    topDestinations: ["Madrid", "Miami", "Houston", "Atlanta"],
    airlines: ["United", "American Airlines", "Delta", "Southwest"],
  },
];

const POPULAR_ROUTES = [
  {
    id: "espana-portugal",
    name: "Peninsula Iberica",
    description: "El roteiro perfecto para ticos: idioma espanol, cultura familiar y clima agradable.",
    destinations: ["Madrid", "Barcelona", "Lisboa", "Porto"],
    highlights: ["Vuelo directo Iberia", "Idioma espanol", "Gastronomia mediterranea", "Arquitectura historica"],
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "europa-clasica",
    name: "Europa Clasica",
    description: "Las capitales mas iconicas del continente en un solo viaje inolvidable.",
    destinations: ["Paris", "Roma", "Venecia", "Florencia"],
    highlights: ["Torre Eiffel", "Coliseo Romano", "Gondolas venecianas", "Arte renacentista"],
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "europa-verde",
    name: "Europa Verde y Sostenible",
    description: "Ideal para costarricenses amantes de la naturaleza y el ecoturismo.",
    destinations: ["Suiza", "Austria", "Noruega", "Islandia"],
    highlights: ["Alpes suizos", "Lagos austriacos", "Fiordos noruegos", "Geyser islandeses"],
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "mediterraneo",
    name: "Mediterraneo Azul",
    description: "Costas paradisiacas, islas griegas y ciudades costeras encantadoras.",
    destinations: ["Barcelona", "Niza", "Amalfi", "Santorini"],
    highlights: ["Playas mediterraneas", "Gastronomia costera", "Islas griegas", "Costa Amalfitana"],
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
  },
];

const FAQS = [
  {
    category: "Documentacion y Visas",
    questions: [
      {
        q: "Los costarricenses necesitan visa para viajar a Europa?",
        a: "No. Los ciudadanos costarricenses estan exentos de visa Schengen para estancias turisticas de hasta 90 dias. Solo necesita pasaporte vigente con minimo 6 meses de validez."
      },
      {
        q: "Que documentos necesito para viajar a Europa?",
        a: "Pasaporte costarricense vigente (6+ meses), boleto aereo de ida y vuelta, reservas de hotel, seguro de viaje internacional con cobertura minima de 30,000 EUR, y comprobante de fondos suficientes."
      },
    ]
  },
  {
    category: "Vuelos y Conexiones",
    questions: [
      {
        q: "Hay vuelos directos de Costa Rica a Europa?",
        a: "Si, Iberia opera vuelos directos de San Jose a Madrid (aproximadamente 11 horas). Otras opciones incluyen conexiones via Miami, Houston, Atlanta o Panama con Copa, United, American y Delta."
      },
      {
        q: "Cual es la mejor ruta para viajar a Europa desde Costa Rica?",
        a: "El vuelo directo Iberia a Madrid es la opcion mas conveniente. Alternativamente, conexiones via Panama con Copa Airlines o via Estados Unidos con las principales aerolineas americanas."
      },
    ]
  },
  {
    category: "Destinos Recomendados",
    questions: [
      {
        q: "Cual es el mejor destino para ticos primerizos en Europa?",
        a: "España es ideal por el idioma espanol, vuelo directo desde San Jose, y cultura accesible. Madrid o Barcelona son excelentes puntos de partida."
      },
      {
        q: "Que destinos europeos son mejores para amantes de la naturaleza?",
        a: "Suiza, Austria, Noruega e Islandia ofrecen paisajes espectaculares. Los costarricenses, conocidos por su amor a la naturaleza, encontraran en estos destinos una experiencia unica de ecoturismo europeo."
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
              data-testid={`button-faq-${index}`}
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

export default function BlogCostaRica() {
  const { language } = useI18n();
  
  const allFaqs = FAQS.flatMap(cat => 
    cat.questions.map(faq => ({ question: faq.q, answer: faq.a }))
  );

  const breadcrumbs = [
    { name: "Inicio", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Viajes desde Costa Rica", url: "/blog/costa-rica" },
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-costa-rica">
      <SEOHead 
        title="Viajes a Europa desde Costa Rica | San Jose, Liberia | Vuelos Iberia"
        description="Descubre los mejores destinos europeos para viajeros costarricenses. Vuelos directos desde San Jose a Madrid con Iberia, conexiones via Panama y Estados Unidos."
        keywords="viajes europa costa rica, vuelos san jose madrid, europa desde costa rica, iberia costa rica, viajes ticos europa"
        url="/blog/costa-rica"
      />
      <FAQSchema questions={allFaqs} />
      <BreadcrumbSchema items={breadcrumbs} />
      <BlogPostSchema
        title="Viajes a Europa desde Costa Rica: Guia Completa para Ticos"
        description="Todo lo que necesitas saber para viajar a Europa desde Costa Rica"
        datePublished="2025-01-01"
        author="Trips Europa"
        image="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200"
        url="/blog/costa-rica"
      />
      
      <Header />

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1920&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-[#d4af37] text-primary font-bold">
            <Leaf className="w-3 h-3 mr-1" /> Costa Rica
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Viajes A Europa Desde Costa Rica
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
            Desde San Jose y Liberia hacia los destinos mas fascinantes de Europa. Vuelos directos Iberia a Madrid y conexiones globales.
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
              Conectamos viajeros costarricenses con los mejores destinos europeos desde los principales aeropuertos del pais.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
              Destinos Europeos Favoritos De Los Ticos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Los destinos mas buscados por viajeros costarricenses, con informacion sobre que ver y lugares cercanos.
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
              Rutas Populares Desde Costa Rica
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
              Por Que Viajar A Europa Desde Costa Rica
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Sin Visa Schengen</h3>
              <p className="text-sm text-muted-foreground">Costarricenses exentos de visa para estancias de hasta 90 dias en Europa.</p>
            </Card>
            <Card className="text-center p-6">
              <Plane className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Vuelo Directo Iberia</h3>
              <p className="text-sm text-muted-foreground">San Jose a Madrid sin escalas, conexion directa al corazon de Europa.</p>
            </Card>
            <Card className="text-center p-6">
              <Globe className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Idioma Espanol</h3>
              <p className="text-sm text-muted-foreground">España como puerta de entrada facilita la comunicacion para viajeros ticos.</p>
            </Card>
            <Card className="text-center p-6">
              <Heart className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Pura Vida en Europa</h3>
              <p className="text-sm text-muted-foreground">Destinos con naturaleza, cultura y experiencias unicas para costarricenses.</p>
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
            Contactanos hoy y recibe una cotizacion personalizada para tu viaje de suenos a Europa desde Costa Rica.
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

      <Footer />
    </div>
  );
}
