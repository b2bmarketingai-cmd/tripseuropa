import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { SEOHead } from "@/components/SEOHead";
import { FAQSchema, BreadcrumbSchema } from "@/components/SEOSchema";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  MapPin, Globe, Star, ChevronRight, Plane, 
  Mountain, Ship, Heart, Wine, Castle,
  ArrowRight, Quote, Sparkles
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

const REGIONS = [
  { id: "all", label: "Todos", count: 110 },
  { id: "western-europe", label: "Europa Occidental", count: 59 },
  { id: "central-europe", label: "Europa Central", count: 18 },
  { id: "scandinavia", label: "Escandinavia y Balticos", count: 16 },
  { id: "balkans", label: "Los Balcanes", count: 14 },
  { id: "eastern-mediterranean", label: "Mediterraneo Oriental", count: 2 },
  { id: "eastern-europe", label: "Europa del Este", count: 1 },
];

const FEATURED_PACKAGES = [
  {
    id: "portugal-coastal",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=800&auto=format&fit=crop",
    title: "Ciudades Costeras y Tesoros Culturales",
    country: "Portugal",
    cities: ["Lisboa", "Sintra", "Porto", "Coimbra"],
    badge: "Flash Sale",
    badgeColor: "bg-red-500",
  },
  {
    id: "spain-complete",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    title: "Madrid, Andalucia, Valencia y Barcelona",
    country: "España",
    cities: ["Madrid", "Sevilla", "Valencia", "Barcelona"],
    badge: "Best Seller",
    badgeColor: "bg-accent",
  },
  {
    id: "ireland-emerald",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=800&auto=format&fit=crop",
    title: "Esencia de la Isla Esmeralda",
    country: "Irlanda",
    cities: ["Dublin", "Galway", "Cork", "Killarney"],
    badge: "Top Pick",
    badgeColor: "bg-green-600",
  },
  {
    id: "italy-eternal",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=800&auto=format&fit=crop",
    title: "Ciudades Eternas de Italia",
    country: "Italia",
    cities: ["Roma", "Florencia", "Venecia", "Milan"],
    badge: "Best Seller",
    badgeColor: "bg-accent",
  },
  {
    id: "portugal-algarve",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800&auto=format&fit=crop",
    title: "Tesoros Culturales y Escapada al Algarve",
    country: "Portugal",
    cities: ["Lisboa", "Porto", "Faro", "Lagos"],
    badge: null,
    badgeColor: "",
  },
  {
    id: "portugal-douro",
    image: "https://images.unsplash.com/photo-1558018333-bcb8c3600a7f?q=80&w=800&auto=format&fit=crop",
    title: "Ciudades Costeras y el Valle del Douro",
    country: "Portugal",
    cities: ["Porto", "Douro", "Braga", "Guimaraes"],
    badge: null,
    badgeColor: "",
  },
  {
    id: "italy-amalfi",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800&auto=format&fit=crop",
    title: "Ischia, Costa Amalfitana y Pompeya",
    country: "Italia",
    cities: ["Napoles", "Positano", "Amalfi", "Pompeya"],
    badge: "Flash Sale",
    badgeColor: "bg-red-500",
  },
  {
    id: "ireland-celtic",
    image: "https://images.unsplash.com/photo-1564959130747-897c7e0fb6ab?q=80&w=800&auto=format&fit=crop",
    title: "Viaje Celta: Irlanda e Irlanda del Norte",
    country: "Irlanda",
    cities: ["Dublin", "Belfast", "Giants Causeway", "Cliffs of Moher"],
    badge: null,
    badgeColor: "",
  },
  {
    id: "italy-puglia",
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=800&auto=format&fit=crop",
    title: "Maravillas Costeras de Amalfi y Puglia",
    country: "Italia",
    cities: ["Napoles", "Amalfi", "Bari", "Lecce"],
    badge: "Best Seller",
    badgeColor: "bg-accent",
  },
  {
    id: "france-normandy",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    title: "Joyas de Normandia y la Riviera Francesa",
    country: "Francia",
    cities: ["Paris", "Mont Saint-Michel", "Niza", "Cannes"],
    badge: null,
    badgeColor: "",
  },
  {
    id: "switzerland-alps",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    title: "Alpes y Ciudades de Suiza",
    country: "Suiza",
    cities: ["Zurich", "Lucerna", "Interlaken", "Zermatt"],
    badge: "Top Pick",
    badgeColor: "bg-green-600",
  },
  {
    id: "baltics-guided",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=800&auto=format&fit=crop",
    title: "Viaje Guiado por los Balticos",
    country: "Balticos",
    cities: ["Vilna", "Riga", "Tallin", "Helsinki"],
    badge: null,
    badgeColor: "",
  },
];

const TRIP_CATEGORIES = [
  {
    id: "cultural",
    title: "Tesoros Culturales",
    description: "Explora museos de clase mundial, arquitectura historica y el rico patrimonio artistico de Europa.",
    icon: Castle,
    destinations: ["Italia", "Francia", "España", "Grecia"],
  },
  {
    id: "mediterranean",
    title: "Mediterraneo y Ciudades Costeras",
    description: "Descubre playas pristinas, pueblos pesqueros encantadores y la vibrante vida costera.",
    icon: Ship,
    destinations: ["Portugal", "Croacia", "Grecia", "Italia"],
  },
  {
    id: "baltic",
    title: "Viajes Magicos al Baltico",
    description: "Experimenta los paisajes nordicos, ciudades medievales y la aurora boreal.",
    icon: Sparkles,
    destinations: ["Finlandia", "Estonia", "Letonia", "Lituania"],
  },
  {
    id: "alps",
    title: "Los Encantadores Alpes",
    description: "Montanas majestuosas, lagos cristalinos y pueblos alpinos de cuento de hadas.",
    icon: Mountain,
    destinations: ["Suiza", "Austria", "Alemania", "Italia"],
  },
  {
    id: "romantic",
    title: "Escapadas Romanticas",
    description: "Los destinos mas romanticos de Europa para parejas y lunas de miel.",
    icon: Heart,
    destinations: ["Paris", "Venecia", "Santorini", "Viena"],
  },
  {
    id: "gastronomy",
    title: "Tours Gastronomicos",
    description: "Saborea la cocina europea con tours de vino, clases de cocina y mercados locales.",
    icon: Wine,
    destinations: ["Toscana", "Burdeos", "San Sebastian", "Oporto"],
  },
];

const TOP_COUNTRIES = [
  {
    id: "portugal",
    name: "Portugal",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=600&auto=format&fit=crop",
    description: "Desde Lisboa hasta el Algarve, descubre historia, playas y la calidez portuguesa.",
    trips: 24,
  },
  {
    id: "greece",
    name: "Grecia",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600&auto=format&fit=crop",
    description: "Islas paradisiacas, ruinas antiguas y la cuna de la civilizacion occidental.",
    trips: 18,
  },
  {
    id: "italy",
    name: "Italia",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    description: "Arte, historia, gastronomia y paisajes que han inspirado al mundo por siglos.",
    trips: 32,
  },
  {
    id: "switzerland",
    name: "Suiza",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop",
    description: "Los Alpes majestuosos, lagos cristalinos y precision en cada detalle.",
    trips: 12,
  },
  {
    id: "ireland",
    name: "Irlanda",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=600&auto=format&fit=crop",
    description: "La isla esmeralda te espera con castillos, acantilados y pubs acogedores.",
    trips: 14,
  },
];

const FAQS = [
  {
    question: "Cual es la mejor epoca para visitar Europa?",
    answer: "Europa es hermosa todo el ano. La primavera (abril-junio) y el otono (septiembre-octubre) ofrecen clima agradable y menos multitudes. El verano es ideal para playas y festivales, mientras que el invierno es perfecto para mercados navidenos y esqui en los Alpes.",
  },
  {
    question: "Necesito visa para viajar a Europa desde Latinoamerica?",
    answer: "Depende de tu nacionalidad. Ciudadanos de Mexico, Argentina, Brasil, Chile y Colombia pueden visitar el espacio Schengen hasta 90 dias sin visa para turismo. Ciudadanos colombianos SI requieren visa Schengen. Siempre verifica los requisitos actuales antes de viajar.",
  },
  {
    question: "Que incluyen los paquetes de viaje?",
    answer: "Nuestros paquetes tipicamente incluyen vuelos internacionales, alojamiento en hoteles seleccionados, traslados entre ciudades, guias locales en espanol, y actividades culturales. Cada paquete detalla exactamente lo que esta incluido.",
  },
  {
    question: "Puedo personalizar mi itinerario?",
    answer: "Absolutamente. Ofrecemos paquetes predefinidos y tambien servicios de personalizacion. Contacta a nuestros asesores de viaje para crear el itinerario perfecto segun tus preferencias, presupuesto y tiempo disponible.",
  },
  {
    question: "Como funcionan los pagos y reservas?",
    answer: "Aceptamos pagos con tarjeta de credito, transferencia bancaria y financiamiento. Generalmente se requiere un deposito inicial para confirmar la reserva, con el saldo pagadero antes de la fecha de viaje. Ofrecemos planes de pago flexibles.",
  },
];

const TESTIMONIALS = [
  {
    name: "Maria Fernandez",
    location: "Bogota, Colombia",
    rating: 5,
    comment: "Nuestro viaje a Italia fue magico. Todo estuvo perfectamente organizado, desde los vuelos hasta las visitas guiadas. Volveremos a viajar con TripsEuropa.",
    date: "Noviembre 2024",
    trip: "Italia en 12 dias",
  },
  {
    name: "Carlos Rodriguez",
    location: "Ciudad de Mexico",
    rating: 5,
    comment: "El circuito por España supero todas nuestras expectativas. Los hoteles excelentes, los guias muy preparados y las experiencias inolvidables.",
    date: "Octubre 2024",
    trip: "España Completa",
  },
  {
    name: "Ana Paula Santos",
    location: "Sao Paulo, Brasil",
    rating: 5,
    comment: "Viajamos a Portugal y Francia. La atencion personalizada y la calidad del servicio fueron excepcionales. Recomendado 100%.",
    date: "Septiembre 2024",
    trip: "Portugal y Francia",
  },
];

export default function VacacionesEuropa() {
  const { t, language } = useI18n();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [showFullIntro, setShowFullIntro] = useState(false);

  const filteredPackages = selectedRegion === "all" 
    ? FEATURED_PACKAGES 
    : FEATURED_PACKAGES.slice(0, 6);

  const faqsForSchema = FAQS.map(faq => ({ question: faq.question, answer: faq.answer }));

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Vacaciones en Europa - Paquetes de Viaje Todo Incluido"
        description="Descubre los mejores paquetes de vacaciones a Europa desde Latinoamerica. Portugal, España, Italia, Francia y mas. Tours guiados en espanol, hoteles seleccionados, experiencias unicas."
        keywords="vacaciones europa, paquetes europa, viaje europa todo incluido, tour europa espanol, europa desde latinoamerica"
        url="https://tripseuropa.com/vacaciones-europa"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://tripseuropa.com" },
        { name: "Vacaciones Europa", url: "https://tripseuropa.com/vacaciones-europa" }
      ]} />
      <FAQSchema questions={faqsForSchema} />
      <Header />
      
      <section 
        className="relative min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1920&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-testid="hero-vacaciones-europa"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Badge className="bg-accent text-primary mb-4" data-testid="badge-hero">
            <Plane className="w-3 h-3 mr-1" />
            Vacaciones de Ensueno
          </Badge>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4" style={{ color: "#d4af37" }}>
            Vacaciones para Europa
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Descubre los destinos mas fascinantes del viejo continente con nuestros paquetes todo incluido diseñados para viajeros latinoamericanos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90" data-testid="button-search-trip">
              <Globe className="w-4 h-4 mr-2" />
              Buscar Mi Viaje Perfecto
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-contact-advisor">
              Hablar con un Asesor
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-playfair text-3xl font-bold text-center mb-6" style={{ color: "#d4af37" }}>
            Descubre Europa
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Europa es un mosaico de culturas, idiomas y paisajes que ha cautivado a viajeros durante siglos. 
              Desde las romanticas calles de Paris hasta los canales de Venecia, desde las playas del Mediterraneo 
              hasta los fiordos noruegos, cada rincon del viejo continente ofrece experiencias unicas e inolvidables.
            </p>
            {showFullIntro && (
              <>
                <p>
                  La riqueza historica de Europa es incomparable. Camina por las mismas calles donde caminaron emperadores romanos, 
                  admira catedrales goticas que tardaron siglos en construirse, y descubre castillos que cuentan historias de reyes y guerras. 
                  Ciudades como Roma, Atenas y Praga son museos vivientes donde el pasado y el presente se entrelazan armoniosamente.
                </p>
                <p>
                  La gastronomia europea es otra razon para visitar. Desde la pasta fresca en Italia hasta los churros con chocolate 
                  en España, desde los croissants parisinos hasta las salchichas alemanas, cada pais tiene su propia tradicion culinaria 
                  que refleja su cultura e historia. Los vinos franceses, portugueses e italianos son reconocidos mundialmente.
                </p>
                <p>
                  Para los viajeros latinoamericanos, Europa representa una conexion especial con nuestras raices. España y Portugal 
                  nos heredaron el idioma, la religion y muchas tradiciones. Italia ha influenciado nuestra cultura con su arte, musica 
                  y cocina. Visitar Europa es, en cierto modo, conocer de donde venimos.
                </p>
              </>
            )}
            <Button 
              variant="ghost" 
              className="text-accent"
              onClick={() => setShowFullIntro(!showFullIntro)}
              data-testid="button-read-more"
            >
              {showFullIntro ? "Leer menos" : "Leer mas..."} 
              <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${showFullIntro ? "rotate-90" : ""}`} />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {REGIONS.map((region) => (
              <Button
                key={region.id}
                variant={selectedRegion === region.id ? "default" : "outline"}
                className={selectedRegion === region.id ? "bg-accent text-primary" : ""}
                onClick={() => setSelectedRegion(region.id)}
                data-testid={`button-region-${region.id}`}
              >
                {region.label} ({region.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-playfair text-3xl font-bold" style={{ color: "#d4af37" }}>
              Paquetes Destacados
            </h2>
            <Link href="/packages">
              <Button variant="ghost" className="text-accent" data-testid="link-view-all-packages">
                Ver todos <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="group overflow-hidden hover-elevate" data-testid={`card-package-${pkg.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {pkg.badge && (
                    <Badge className={`absolute top-3 left-3 ${pkg.badgeColor} text-white`}>
                      {pkg.badge}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{pkg.country}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 line-clamp-2">{pkg.title}</h3>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {pkg.cities.slice(0, 3).map((city) => (
                      <Badge key={city} variant="secondary" className="text-xs">
                        {city}
                      </Badge>
                    ))}
                    {pkg.cities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{pkg.cities.length - 3}
                      </Badge>
                    )}
                  </div>
                  <Button className="w-full bg-primary text-white" data-testid={`button-view-${pkg.id}`}>
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-center mb-4" style={{ color: "#d4af37" }}>
            Categorias de Viaje
          </h2>
          <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
            Encuentra el estilo de viaje perfecto para ti. Desde aventuras culturales hasta escapadas romanticas.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRIP_CATEGORIES.map((category) => (
              <Card key={category.id} className="bg-white/10 border-white/20 hover-elevate" data-testid={`card-category-${category.id}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                    <category.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-xl text-white mb-2">{category.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.destinations.map((dest) => (
                      <Badge key={dest} variant="outline" className="border-accent/50 text-accent text-xs">
                        {dest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-center mb-4" style={{ color: "#d4af37" }}>
            Paises Mas Populares
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Los destinos favoritos de nuestros viajeros latinoamericanos
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {TOP_COUNTRIES.map((country) => (
              <Card key={country.id} className="group overflow-hidden hover-elevate" data-testid={`card-country-${country.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={country.image} 
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-playfair text-xl font-bold text-white mb-1">{country.name}</h3>
                    <p className="text-white/80 text-sm line-clamp-2 mb-2">{country.description}</p>
                    <Badge className="bg-accent text-primary text-xs">
                      {country.trips} viajes
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-center mb-4" style={{ color: "#d4af37" }}>
            Lo Que Dicen Nuestros Viajeros
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Miles de viajeros latinoamericanos han confiado en nosotros para sus vacaciones en Europa
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <Card key={idx} className="hover-elevate" data-testid={`card-testimonial-${idx}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-accent/30 mb-2" />
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">{testimonial.trip}</Badge>
                      <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/testimonios">
              <Button variant="outline" data-testid="link-all-testimonials">
                Ver Todas las Opiniones <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-playfair text-3xl font-bold text-center mb-8" style={{ color: "#d4af37" }}>
            Preguntas Frecuentes
          </h2>
          
          <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left font-medium" data-testid={`faq-trigger-${idx}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Tienes mas preguntas?</p>
            <Link href="/contact">
              <Button className="bg-accent text-primary" data-testid="button-contact-us">
                Contactanos <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-accent">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="font-playfair text-3xl font-bold text-primary mb-4">
            Recibe Ofertas Exclusivas
          </h2>
          <p className="text-primary/80 mb-8">
            Suscribete a nuestro newsletter y recibe las mejores ofertas de viajes a Europa, consejos de viaje y destinos imperdibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Tu correo electronico"
              className="flex-1 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-primary"
              data-testid="input-newsletter-email"
            />
            <Button className="bg-primary text-white hover:bg-primary/90" data-testid="button-subscribe">
              Suscribirme
            </Button>
          </div>
          <p className="text-primary/60 text-sm mt-4">
            Al suscribirte aceptas nuestra politica de privacidad. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-center mb-8" style={{ color: "#d4af37" }}>
            Explora por Pais
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "España", "Francia", "Italia", "Portugal", "Grecia", "Suiza", 
              "Austria", "Alemania", "Irlanda", "Reino Unido", "Croacia", 
              "Holanda", "Belgica", "Noruega", "Islandia", "Turquia"
            ].map((country) => (
              <Link key={country} href={`/destinations/${country.toLowerCase()}`}>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover-elevate px-4 py-2"
                  data-testid={`link-country-${country.toLowerCase()}`}
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  {country}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
