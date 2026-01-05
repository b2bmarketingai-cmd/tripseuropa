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

const PACKAGES_MEXICO = [
  {
    id: "clásica-españa-mx",
    title: "Clásica Madrid + Barcelona desde CDMX",
    destinations: ["Madrid", "Barcelona"],
    days: 8,
    price: 10500,
    priceMXN: 189000,
    departure: "Ciudad de Mexico",
    rating: 4.9,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "romántica-paris-roma-mx",
    title: "Romántica Paris + Roma desde CDMX",
    destinations: ["Paris", "Roma"],
    days: 10,
    price: 11500,
    priceMXN: 207000,
    departure: "Ciudad de Mexico",
    rating: 4.9,
    reviews: 345,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "europa-completa-mx",
    title: "Europa Completa desde Guadalajara",
    destinations: ["Madrid", "Barcelona", "Paris", "Roma"],
    days: 14,
    price: 13500,
    priceMXN: 243000,
    departure: "Guadalajara",
    rating: 4.9,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "europa-premium-mx",
    title: "Europa Premium desde Monterrey",
    destinations: ["Paris", "Suiza", "Italia"],
    days: 12,
    price: 15000,
    priceMXN: 270000,
    departure: "Monterrey",
    rating: 5.0,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=70&w=800&auto=format&fit=crop",
  },
];

const TESTIMONIALS_MEXICO = [
  {
    name: "Carlos Rodriguez",
    city: "Ciudad de Mexico",
    trip: "España Total 14 dias",
    text: "Excelente servicio desde el inicio. Los hoteles fueron de primera y el guia en espanol muy profesional.",
    rating: 5,
  },
  {
    name: "Patricia Hernandez",
    city: "Guadalajara", 
    trip: "Italia Romántica",
    text: "Mi esposo y yo quedamos encantados. Todo estuvo perfectamente organizado.",
    rating: 5,
  },
  {
    name: "Fernando Garcia",
    city: "Monterrey",
    trip: "Capitales Europeas",
    text: "Segunda vez que viajo con Trips Europa. Siempre superan las expectativas.",
    rating: 5,
  },
];

const FAQ_MEXICO = [
  {
    question: "Los mexicanos necesitan visa Schengen para Europa?",
    answer: "No! Los ciudadanos mexicanos pueden viajar a la zona Schengen hasta 90 dias sin visa. Solo necesitas pasaporte vigente, comprobante de hospedaje y seguro de viaje."
  },
  {
    question: "Desde que ciudades de Mexico salen los vuelos?",
    answer: "Ofrecemos salidas desde Ciudad de Mexico (MEX), Cancun (CUN), Guadalajara (GDL), Monterrey (MTY), Tijuana (TIJ), y otras ciudades principales."
  },
  {
    question: "Puedo pagar en meses sin intereses?",
    answer: "Si! Aceptamos tarjetas de credito mexicanas hasta 12 MSI con Banamex, BBVA, Santander, HSBC y American Express. Tambien aceptamos OXXO Pay y transferencia SPEI."
  },
  {
    question: "Los paquetes incluyen el vuelo desde Mexico?",
    answer: "Si, todos nuestros paquetes incluyen vuelo redondo desde tu ciudad de salida, con aerolineas como Aeromexico, Iberia, Air France y KLM."
  },
];

export default function FromMexico() {
  const { language } = useI18n();

  const content = {
    badge: { es: "Viajes desde Mexico", en: "Travel from Mexico" },
    h1: { es: "Tours a Europa desde Mexico", en: "Tours to Europe from Mexico" },
    subtitle: { es: "Paquetes exclusivos con salidas desde Ciudad de Mexico, Cancun, Guadalajara, Monterrey y principales ciudades mexicanas. Vuelos directos, hoteles 4-5 estrellas, guias en espanol.", en: "Exclusive packages departing from Mexico City, Cancun, Guadalajara, Monterrey and major Mexican cities. Direct flights, 4-5 star hotels, Spanish-speaking guides." },
    stats: {
      travelers: { es: "8.9M viajeros mexicanos/año", en: "8.9M Mexican travelers/year" },
      rating: { es: "4.9 calificacion", en: "4.9 rating" },
      cities: { es: "5 ciudades de salida", en: "5 departure cities" },
    },
    cta: { es: "Cotizar Ahora", en: "Quote Now" },
    whatsapp: { es: "WhatsApp Mexico", en: "WhatsApp Mexico" },
    packages: { es: "Paquetes Populares desde Mexico", en: "Popular Packages from Mexico" },
    testimonials: { es: "Lo que dicen nuestros viajeros mexicanos", en: "What our Mexican travelers say" },
    faq: { es: "Preguntas Frecuentes - Viajes desde Mexico", en: "FAQ - Travel from Mexico" },
    noVisa: { es: "Mexicanos NO necesitan visa!", en: "Mexicans do NOT need visa!" },
    noVisaDesc: { es: "Hasta 90 dias en Europa sin visa. Solo pasaporte vigente.", en: "Up to 90 days in Europe without visa. Just valid passport." },
    msi: { es: "Hasta 12 MSI", en: "Up to 12 months no interest" },
    msiDesc: { es: "Con tarjetas participantes", en: "With participating cards" },
    departures: { es: "Salidas desde", en: "Departures from" },
    days: { es: "dias", en: "days" },
    from: { es: "Desde", en: "From" },
    viewPackage: { es: "Ver Paquete", en: "View Package" },
    allPackages: { es: "Ver Todos los Paquetes", en: "View All Packages" },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-mexico-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=60&w=1200&auto=format&fit=crop" 
            alt="Mexico City" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 mb-4" data-testid="badge-mexico">
              {content.badge[language]}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-mexico-h1">
              {content.h1[language]}
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl" data-testid="text-mexico-subtitle">
              {content.subtitle[language]}
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Users className="w-5 h-5 text-red-400" />
                <span>{content.stats.travelers[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span>{content.stats.rating[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Plane className="w-5 h-5 text-red-400" />
                <span>{content.stats.cities[language]}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-red-500 text-white font-bold hover:bg-red-600" 
                data-testid="button-mexico-cta"
                onClick={() => openWhatsAppQuote({ es: "viajes a Europa desde Mexico", en: "travel to Europe from Mexico", pt: "viagens para Europa do Mexico" }, language)}
              >
                {content.cta[language]}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <a href="https://api.whatsapp.com/send?phone=34611105448" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" data-testid="button-mexico-whatsapp">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {content.whatsapp[language]}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b" data-testid="section-mexico-cities">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {["Ciudad de Mexico", "Cancun", "Guadalajara", "Monterrey", "Tijuana", "Puebla"].map((city) => (
              <div key={city} className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="font-semibold text-sm">{content.departures[language]} {city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 bg-gradient-to-r from-green-600 via-white to-red-600" data-testid="section-mexico-benefits">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3 bg-white/90 rounded-lg px-6 py-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-bold text-green-700">{content.noVisa[language]}</h3>
                <p className="text-green-600 text-sm">{content.noVisaDesc[language]}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/90 rounded-lg px-6 py-3">
              <Star className="w-8 h-8 text-red-600" />
              <div>
                <h3 className="font-bold text-red-700">{content.msi[language]}</h3>
                <p className="text-red-600 text-sm">{content.msiDesc[language]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-mexico-packages">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" data-testid="text-mexico-packages-title">
            {content.packages[language]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_MEXICO.map((pkg) => (
              <Card key={pkg.id} className={`group overflow-hidden ${pkg.featured ? "ring-2 ring-red-500 shadow-xl" : ""}`} data-testid={`card-mexico-${pkg.id}`}>
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
                    <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                      Mas Vendido
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
                      <div className="font-bold text-red-600">
                        ${pkg.priceMXN.toLocaleString('es-MX')} MXN
                      </div>
                    </div>
                    <Link href="/packages">
                      <Button size="sm" className="bg-red-500 hover:bg-red-600" data-testid={`button-view-${pkg.id}`}>
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
              <Button size="lg" variant="outline" data-testid="button-mexico-all-packages">
                {content.allPackages[language]}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-mexico-testimonials">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-12">
            {content.testimonials[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_MEXICO.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6" data-testid={`testimonial-mexico-${index}`}>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.city}, Mexico</div>
                  </div>
                  <Badge className="bg-red-500/20 text-red-300 text-xs">{testimonial.trip}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-mexico-faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            {content.faq[language]}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_MEXICO.map((faq, index) => (
              <Card key={index} className="p-6" data-testid={`faq-mexico-${index}`}>
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-green-600 to-red-600" data-testid="section-mexico-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Listo para tu viaje a Europa?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Contactanos hoy y recibe una cotizacion personalizada. Hasta 12 MSI con tarjetas participantes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90" 
              data-testid="button-mexico-contact"
              onClick={() => openWhatsAppQuote({ es: "viajes a Europa desde Mexico", en: "travel to Europe from Mexico", pt: "viagens para Europa do Mexico" }, language)}
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
          "name": "Trips Europa - Viajes desde Mexico",
          "description": "Agencia de viajes especializada en paquetes turísticos a Europa desde Mexico. Vuelos, hoteles, tours y guias en espanol.",
          "url": "https://tripseuropa.com/desde-mexico",
          "areaServed": {
            "@type": "Country",
            "name": "Mexico"
          },
          "serviceType": ["Travel Agency", "Tour Operator"],
          "priceRange": "$$$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1046",
            "bestRating": "5"
          }
        })
      }} />
    </div>
  );
}
