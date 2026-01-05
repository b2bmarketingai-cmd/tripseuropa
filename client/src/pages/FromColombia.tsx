import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { ColombiaPageSEO } from "@/components/SEOHead";
import { LocalBusinessSchema, BreadcrumbSchema } from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Plane, MapPin, Star, Calendar, Users, Shield, Clock, 
  CheckCircle, ArrowRight, Phone, MessageCircle, Heart,
  Building, Utensils, Camera, Compass
} from "lucide-react";
import { openWhatsAppQuote } from "@/lib/whatsapp";

const PACKAGES_COLOMBIA = [
  {
    id: "europa-express-col",
    title: "Europa Express desde Bogota",
    destinations: ["Paris", "Amsterdam", "Bruselas"],
    days: 8,
    price: 1200,
    priceCOP: 4800000,
    departure: "Bogota",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "españa-clásica-col",
    title: "España Clásica desde Medellin",
    destinations: ["Madrid", "Barcelona", "Sevilla", "Granada"],
    days: 12,
    price: 2100,
    priceCOP: 8400000,
    departure: "Medellin",
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "italia-romántica-col",
    title: "Italia Romántica desde Cali",
    destinations: ["Roma", "Florencia", "Venecia", "Milan"],
    days: 14,
    price: 2800,
    priceCOP: 11200000,
    departure: "Cali",
    rating: 4.9,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "lujo-paris-col",
    title: "Paris Lujo VIP desde Bogota",
    destinations: ["Paris", "Versalles", "Champagne"],
    days: 7,
    price: 4500,
    priceCOP: 18000000,
    departure: "Bogota",
    rating: 5.0,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=70&w=800&auto=format&fit=crop",
    featured: true,
  },
];

const TESTIMONIALS_COLOMBIA = [
  {
    name: "Carolina Gutierrez",
    city: "Bogota",
    trip: "Europa Clásica 15 dias",
    text: "Increible experiencia. Todo salio perfecto desde el vuelo hasta los hoteles. El guia en espanol fue excelente.",
    rating: 5,
  },
  {
    name: "Andres Mejia",
    city: "Medellin", 
    trip: "Luna de Miel Paris-Roma",
    text: "Mi esposa y yo tuvimos el viaje de nuestros sueños. Los hoteles boutique fueron espectaculares.",
    rating: 5,
  },
  {
    name: "Maria Fernanda Lopez",
    city: "Cali",
    trip: "España Total 12 dias",
    text: "Primera vez en Europa y quede encantada. La organizacion fue impecable y los precios muy justos.",
    rating: 5,
  },
];

const FAQ_COLOMBIA = [
  {
    question: "Necesito visa Schengen para viajar a Europa desde Colombia?",
    answer: "Si, los ciudadanos colombianos necesitan visa Schengen para viajar a la mayoria de paises europeos. Te ayudamos con todo el proceso de solicitud, incluyendo la carta de invitacion y documentacion requerida."
  },
  {
    question: "Cuanto dinero necesito demostrar para la visa Schengen?",
    answer: "Debes demostrar solvencia economica de aproximadamente 100 EUR por dia de estancia. Para un viaje de 15 dias, esto seria alrededor de 1,500 EUR (aproximadamente $6,500,000 COP)."
  },
  {
    question: "Desde que ciudades de Colombia salen los vuelos?",
    answer: "Ofrecemos salidas desde Bogota (El Dorado), Medellin (Jose Maria Cordova), Cali (Alfonso Bonilla Aragon), Barranquilla y Cartagena con conexiones internacionales."
  },
  {
    question: "Incluyen seguro de viaje los paquetes?",
    answer: "Si, todos nuestros paquetes incluyen seguro de viaje internacional con cobertura medica de hasta $50,000 USD, requerido para la visa Schengen."
  },
];

export default function FromColombia() {
  const { language } = useI18n();

  const content = {
    badge: { es: "Viajes desde Colombia", en: "Travel from Colombia" },
    h1: { es: "Viajes a Europa desde Colombia", en: "Travel to Europe from Colombia" },
    subtitle: { es: "Paquetes exclusivos con salidas desde Bogota, Medellin, Cali y principales ciudades colombianas. Vuelos directos, hoteles 4-5 estrellas, guias en espanol.", en: "Exclusive packages departing from Bogota, Medellin, Cali and major Colombian cities. Direct flights, 4-5 star hotels, Spanish-speaking guides." },
    stats: {
      travelers: { es: "2,500+ viajeros colombianos", en: "2,500+ Colombian travelers" },
      rating: { es: "4.9 calificacion promedio", en: "4.9 average rating" },
      cities: { es: "5 ciudades de salida", en: "5 departure cities" },
    },
    cta: { es: "Cotizar Mi Viaje", en: "Quote My Trip" },
    whatsapp: { es: "WhatsApp Colombia", en: "WhatsApp Colombia" },
    packages: { es: "Paquetes Populares desde Colombia", en: "Popular Packages from Colombia" },
    testimonials: { es: "Lo que dicen nuestros viajeros colombianos", en: "What our Colombian travelers say" },
    faq: { es: "Preguntas Frecuentes - Viajes desde Colombia", en: "FAQ - Travel from Colombia" },
    visa: { es: "Asistencia Visa Schengen", en: "Schengen Visa Assistance" },
    visaDesc: { es: "Te ayudamos con todo el proceso de visa. Carta de invitacion, documentos y asesoria completa.", en: "We help you with the entire visa process. Invitation letter, documents and complete assistance." },
    departures: { es: "Salidas desde", en: "Departures from" },
    days: { es: "dias", en: "days" },
    from: { es: "Desde", en: "From" },
    viewPackage: { es: "Ver Paquete", en: "View Package" },
    allPackages: { es: "Ver Todos los Paquetes", en: "View All Packages" },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ColombiaPageSEO />
      <LocalBusinessSchema country="Colombia" city="Bogota" />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://tripseuropa.com" },
        { name: "Viajes desde Colombia", url: "https://tripseuropa.com/desde-colombia" }
      ]} />
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-colombia-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1555992336-fb0d29498b13?q=60&w=1200&auto=format&fit=crop" 
            alt="Bogota Colombia" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-colombia">
              {content.badge[language]}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-colombia-h1">
              {content.h1[language]}
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl" data-testid="text-colombia-subtitle">
              {content.subtitle[language]}
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Users className="w-5 h-5 text-accent" />
                <span>{content.stats.travelers[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span>{content.stats.rating[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Plane className="w-5 h-5 text-accent" />
                <span>{content.stats.cities[language]}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-accent text-primary font-bold hover:bg-accent/90" 
                data-testid="button-colombia-cta"
                onClick={() => openWhatsAppQuote({ es: "viajes a Europa desde Colombia", en: "travel to Europe from Colombia", pt: "viagens para Europa da Colombia" }, language)}
              >
                {content.cta[language]}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <a href="https://api.whatsapp.com/send?phone=34611105448" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" data-testid="button-colombia-whatsapp">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {content.whatsapp[language]}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b" data-testid="section-colombia-cities">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {["Bogota", "Medellin", "Cali", "Barranquilla", "Cartagena"].map((city) => (
              <div key={city} className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="font-semibold">{content.departures[language]} {city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-r from-green-50 to-green-100 border-b" data-testid="section-colombia-visa">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-green-800">{content.visa[language]}</h3>
                <p className="text-green-700 text-sm">{content.visaDesc[language]}</p>
              </div>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                {language === "es" ? "Guia Visa Schengen" : "Schengen Visa Guide"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-colombia-packages">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4" data-testid="text-colombia-packages-title">
            {content.packages[language]}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {language === "es" 
              ? "Paquetes disenados especialmente para viajeros colombianos con los mejores precios y servicios." 
              : "Packages specially designed for Colombian travelers with the best prices and services."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_COLOMBIA.map((pkg) => (
              <Card key={pkg.id} className={`group overflow-hidden ${pkg.featured ? "ring-2 ring-accent shadow-xl" : ""}`} data-testid={`card-colombia-${pkg.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge className="absolute top-3 left-3 bg-accent text-primary">
                    {pkg.days} {content.days[language]}
                  </Badge>
                  {pkg.featured && (
                    <Badge className="absolute top-3 right-3 bg-primary text-white">
                      VIP
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm font-bold">{pkg.rating}</span>
                    <span className="text-muted-foreground text-xs">({pkg.reviews})</span>
                  </div>
                  <h3 className="font-bold mb-2 line-clamp-2">{pkg.title}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
                    <MapPin className="w-3 h-3" />
                    {pkg.destinations.join(" - ")}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">{content.from[language]}</div>
                      <div className="font-bold text-accent">
                        {language === "es" ? `$${pkg.priceCOP.toLocaleString('es-CO')}` : `$${pkg.price.toLocaleString('en-US')} USD`}
                      </div>
                    </div>
                    <Link href="/packages">
                      <Button size="sm" data-testid={`button-view-${pkg.id}`}>
                        {content.viewPackage[language]}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/packages">
              <Button size="lg" variant="outline" data-testid="button-colombia-all-packages">
                {content.allPackages[language]}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-colombia-testimonials">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-12" data-testid="text-colombia-testimonials-title">
            {content.testimonials[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_COLOMBIA.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6" data-testid={`testimonial-colombia-${index}`}>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.city}, Colombia</div>
                  </div>
                  <Badge className="bg-accent/20 text-accent text-xs">{testimonial.trip}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-colombia-faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" data-testid="text-colombia-faq-title">
            {content.faq[language]}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_COLOMBIA.map((faq, index) => (
              <Card key={index} className="p-6" data-testid={`faq-colombia-${index}`}>
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-accent" data-testid="section-colombia-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
            {language === "es" ? "Listo para tu viaje a Europa?" : "Ready for your trip to Europe?"}
          </h2>
          <p className="text-primary/80 mb-6 max-w-xl mx-auto">
            {language === "es" 
              ? "Contactanos hoy y recibe una cotizacion personalizada en menos de 24 horas." 
              : "Contact us today and receive a personalized quote in less than 24 hours."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary text-white hover:bg-primary/90" 
              data-testid="button-colombia-contact"
              onClick={() => openWhatsAppQuote({ es: "viajes a Europa desde Colombia", en: "travel to Europe from Colombia", pt: "viagens para Europa da Colombia" }, language)}
            >
              <Phone className="w-5 h-5 mr-2" />
              {language === "es" ? "Contactar Ahora" : "Contact Now"}
            </Button>
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "Trips Europa - Viajes desde Colombia",
          "description": "Agencia de viajes especializada en paquetes turísticos a Europa desde Colombia. Vuelos, hoteles, tours y asistencia visa Schengen.",
          "url": "https://tripseuropa.com/desde-colombia",
          "areaServed": {
            "@type": "Country",
            "name": "Colombia"
          },
          "serviceType": ["Travel Agency", "Tour Operator", "Visa Assistance"],
          "priceRange": "$$$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "536",
            "bestRating": "5"
          }
        })
      }} />
    </div>
  );
}
