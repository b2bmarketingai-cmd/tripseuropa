import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Plane, MapPin, Star, Users, Shield, 
  ArrowRight, Phone, MessageCircle
} from "lucide-react";
import { openWhatsAppQuote } from "@/lib/whatsapp";

const PACKAGES_PANAMA = [
  {
    id: "europa-express-pa",
    title: "Europa Express desde Panama City",
    destinations: ["Madrid", "Paris", "Amsterdam"],
    days: 10,
    price: 1400,
    departure: "Panama City",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "españa-portugal-pa",
    title: "España y Portugal desde Panama",
    destinations: ["Madrid", "Lisboa", "Porto", "Sevilla"],
    days: 12,
    price: 2200,
    departure: "Panama City",
    rating: 4.9,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=70&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "italia-grecia-pa",
    title: "Italia y Grecia desde Panama",
    destinations: ["Roma", "Atenas", "Santorini", "Venecia"],
    days: 14,
    price: 3100,
    departure: "Panama City",
    rating: 4.9,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "lujo-francia-pa",
    title: "Francia de Lujo desde Panama",
    destinations: ["Paris", "Niza", "Monaco", "Provence"],
    days: 10,
    price: 4200,
    departure: "Panama City",
    rating: 5.0,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=70&w=800&auto=format&fit=crop",
  },
];

const TESTIMONIALS_PANAMA = [
  {
    name: "Ricardo Morales",
    city: "Panama City",
    trip: "España y Portugal 12 dias",
    text: "Increible experiencia! Todo estuvo perfectamente organizado. Los hoteles de primera categoria.",
    rating: 5,
  },
  {
    name: "Maria Elena Castillo",
    city: "Panama City", 
    trip: "Italia Clásica",
    text: "Mi esposo y yo disfrutamos cada momento. El guia en espanol fue excelente.",
    rating: 5,
  },
  {
    name: "Jose Antonio Ruiz",
    city: "David",
    trip: "Capitales Europeas",
    text: "Primera vez en Europa y quede fascinado. Definitivamente repetire con Trips Europa.",
    rating: 5,
  },
];

const FAQ_PANAMA = [
  {
    question: "Los panamenos necesitan visa Schengen para Europa?",
    answer: "No! Los ciudadanos panamenos pueden viajar a la zona Schengen hasta 90 dias sin visa. Solo necesitas pasaporte vigente con al menos 6 meses de validez."
  },
  {
    question: "Hay vuelos directos desde Panama a Europa?",
    answer: "Si! Copa Airlines ofrece conexiones excelentes a traves de Panama Hub. Tambien hay vuelos con Iberia a Madrid y Air France a Paris con escalas cortas."
  },
  {
    question: "Que formas de pago aceptan?",
    answer: "Aceptamos tarjetas Visa, Mastercard, American Express (hasta 12 meses), transferencias bancarias ACH, y pagos en efectivo en nuestra oficina de Panama City."
  },
  {
    question: "Los paquetes incluyen seguro de viaje?",
    answer: "Si, todos nuestros paquetes incluyen seguro de viaje internacional con cobertura medica de hasta $50,000 USD, asistencia 24/7 y cobertura de equipaje."
  },
];

export default function FromPanama() {
  const { language } = useI18n();

  const content = {
    badge: { es: "Viajes desde Panama", en: "Travel from Panama" },
    h1: { es: "Viajes a Europa desde Panama", en: "Travel to Europe from Panama" },
    subtitle: { es: "Paquetes exclusivos con salidas desde Panama City. Vuelos via Copa Airlines, hoteles 4-5 estrellas, guias en espanol.", en: "Exclusive packages departing from Panama City. Flights via Copa Airlines, 4-5 star hotels, Spanish-speaking guides." },
    stats: {
      travelers: { es: "800+ viajeros panamenos", en: "800+ Panamanian travelers" },
      rating: { es: "4.9 calificacion", en: "4.9 rating" },
      hub: { es: "Hub de las Americas", en: "Hub of the Americas" },
    },
    cta: { es: "Cotizar Viaje", en: "Quote Trip" },
    whatsapp: { es: "WhatsApp Panama", en: "WhatsApp Panama" },
    packages: { es: "Paquetes Populares desde Panama", en: "Popular Packages from Panama" },
    testimonials: { es: "Lo que dicen nuestros viajeros panamenos", en: "What our Panamanian travelers say" },
    faq: { es: "Preguntas Frecuentes - Viajes desde Panama", en: "FAQ - Travel from Panama" },
    noVisa: { es: "Panamenos SIN visa!", en: "Panamanians NO visa needed!" },
    noVisaDesc: { es: "Hasta 90 dias en Europa sin visa Schengen.", en: "Up to 90 days in Europe without Schengen visa." },
    copa: { es: "Conexiones Copa Airlines", en: "Copa Airlines Connections" },
    copaDesc: { es: "El mejor Hub de las Americas", en: "The best Hub of the Americas" },
    days: { es: "dias", en: "days" },
    from: { es: "Desde", en: "From" },
    viewPackage: { es: "Ver Paquete", en: "View Package" },
    allPackages: { es: "Ver Todos los Paquetes", en: "View All Packages" },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-panama-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1563721229246-c3c4be6fc4f9?q=60&w=1200&auto=format&fit=crop" 
            alt="Panama City" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4" data-testid="badge-panama">
              {content.badge[language]}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-panama-h1">
              {content.h1[language]}
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl" data-testid="text-panama-subtitle">
              {content.subtitle[language]}
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Users className="w-5 h-5 text-blue-400" />
                <span>{content.stats.travelers[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span>{content.stats.rating[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Plane className="w-5 h-5 text-blue-400" />
                <span>{content.stats.hub[language]}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-blue-500 text-white font-bold hover:bg-blue-600" 
                data-testid="button-panama-cta"
                onClick={() => openWhatsAppQuote({ es: "viajes a Europa desde Panama", en: "travel to Europe from Panama", pt: "viagens para Europa do Panama" }, language)}
              >
                {content.cta[language]}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <a href="https://api.whatsapp.com/send?phone=34611105448" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" data-testid="button-panama-whatsapp">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {content.whatsapp[language]}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-gradient-to-r from-blue-500 to-blue-600" data-testid="section-panama-benefits">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <Shield className="w-8 h-8 text-white" />
              <div>
                <h3 className="font-bold text-white">{content.noVisa[language]}</h3>
                <p className="text-white/80 text-sm">{content.noVisaDesc[language]}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <Plane className="w-8 h-8 text-white" />
              <div>
                <h3 className="font-bold text-white">{content.copa[language]}</h3>
                <p className="text-white/80 text-sm">{content.copaDesc[language]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-panama-packages">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" data-testid="text-panama-packages-title">
            {content.packages[language]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_PANAMA.map((pkg) => (
              <Card key={pkg.id} className={`group overflow-hidden ${pkg.featured ? "ring-2 ring-blue-500 shadow-xl" : ""}`} data-testid={`card-panama-${pkg.id}`}>
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
                    <Badge className="absolute top-3 right-3 bg-blue-500 text-white">
                      Popular
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
                      <div className="font-bold text-blue-600">
                        ${pkg.price.toLocaleString('en-US')} USD
                      </div>
                    </div>
                    <Link href="/packages">
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600" data-testid={`button-view-${pkg.id}`}>
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
              <Button size="lg" variant="outline" data-testid="button-panama-all-packages">
                {content.allPackages[language]}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-panama-testimonials">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-12">
            {content.testimonials[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_PANAMA.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6" data-testid={`testimonial-panama-${index}`}>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.city}, Panama</div>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-300 text-xs">{testimonial.trip}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-panama-faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            {content.faq[language]}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_PANAMA.map((faq, index) => (
              <Card key={index} className="p-6" data-testid={`faq-panama-${index}`}>
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-blue-500" data-testid="section-panama-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Listo para tu viaje a Europa desde Panama?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Contactanos hoy y recibe una cotizacion personalizada en menos de 24 horas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-white/90" 
              data-testid="button-panama-contact"
              onClick={() => openWhatsAppQuote({ es: "viajes a Europa desde Panama", en: "travel to Europe from Panama", pt: "viagens para Europa do Panama" }, language)}
            >
              <Phone className="w-5 h-5 mr-2" />
              Contactar Ahora
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
          "name": "Trips Europa - Viajes desde Panama",
          "description": "Agencia de viajes especializada en paquetes turísticos a Europa desde Panama. Vuelos, hoteles, tours y guias en espanol.",
          "url": "https://tripseuropa.com/desde-panama",
          "areaServed": {
            "@type": "Country",
            "name": "Panama"
          },
          "serviceType": ["Travel Agency", "Tour Operator"],
          "priceRange": "$$$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "577",
            "bestRating": "5"
          }
        })
      }} />
    </div>
  );
}
