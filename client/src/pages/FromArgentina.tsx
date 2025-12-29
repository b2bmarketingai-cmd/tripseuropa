import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Plane, MapPin, Star, Users, Shield, 
  ArrowRight, Phone, MessageCircle
} from "lucide-react";

const PACKAGES_ARGENTINA = [
  {
    id: "europa-clasica-ar",
    title: "Europa Clasica desde Buenos Aires",
    destinations: ["Madrid", "Paris", "Roma", "Barcelona"],
    days: 15,
    price: 2600,
    priceARS: 2340000,
    departure: "Buenos Aires",
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "italia-ancestral-ar",
    title: "Italia Ancestral desde Cordoba",
    destinations: ["Roma", "Napoles", "Calabria", "Sicilia"],
    days: 14,
    price: 2900,
    priceARS: 2610000,
    departure: "Cordoba",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "espana-raices-ar",
    title: "España de las Raices desde Rosario",
    destinations: ["Madrid", "Galicia", "Asturias", "Pais Vasco"],
    days: 12,
    price: 2400,
    priceARS: 2160000,
    departure: "Rosario",
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "lujo-paris-ar",
    title: "Paris de Lujo desde Mendoza",
    destinations: ["Paris", "Versalles", "Champagne", "Bordeaux"],
    days: 10,
    price: 4800,
    priceARS: 4320000,
    departure: "Buenos Aires",
    rating: 5.0,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=70&w=800&auto=format&fit=crop",
  },
];

const TESTIMONIALS_ARGENTINA = [
  {
    name: "Martin Gonzalez",
    city: "Buenos Aires",
    trip: "Italia Ancestral 14 dias",
    text: "Visite los pueblos de mis abuelos en Calabria. Una experiencia emotiva e inolvidable. Todo perfectamente organizado.",
    rating: 5,
  },
  {
    name: "Lucia Fernandez",
    city: "Cordoba", 
    trip: "España de las Raices",
    text: "Conoci Galicia donde nacio mi bisabuelo. Los hoteles fueron excelentes y el guia muy conocedor.",
    rating: 5,
  },
  {
    name: "Federico Alvarez",
    city: "Rosario",
    trip: "Europa Clasica",
    text: "Tercera vez que viajo con Trips Europa. Siempre impecables. Ya estoy planeando el proximo viaje.",
    rating: 5,
  },
];

const FAQ_ARGENTINA = [
  {
    question: "Los argentinos necesitan visa Schengen para Europa?",
    answer: "No! Los ciudadanos argentinos pueden viajar a la zona Schengen hasta 90 dias sin visa. Solo necesitas pasaporte argentino vigente con al menos 6 meses de validez."
  },
  {
    question: "Desde que ciudades de Argentina salen los vuelos?",
    answer: "Ofrecemos salidas desde Buenos Aires (EZE), Cordoba (COR), Rosario (ROS), Mendoza (MDZ), y conexiones desde otras ciudades principales."
  },
  {
    question: "Puedo pagar en pesos argentinos?",
    answer: "Los precios estan en dolares estadounidenses. Aceptamos pagos con tarjeta de credito internacional, transferencia bancaria en dolares, y criptomonedas (USDT, BTC via Binance)."
  },
  {
    question: "Tienen paquetes para buscar raices italianas o espanolas?",
    answer: "Si! Tenemos paquetes especiales para argentinos que buscan sus raices en Italia y España. Incluimos visitas a registros civiles, iglesias y pueblos de origen familiar."
  },
];

export default function FromArgentina() {
  const { language } = useI18n();

  const content = {
    badge: { es: "Viajes desde Argentina", en: "Travel from Argentina" },
    h1: { es: "Viajes a Europa desde Argentina", en: "Travel to Europe from Argentina" },
    subtitle: { es: "Paquetes exclusivos con salidas desde Buenos Aires, Cordoba, Rosario y principales ciudades argentinas. Vuelos directos, hoteles 4-5 estrellas, guias en espanol.", en: "Exclusive packages departing from Buenos Aires, Cordoba, Rosario and major Argentine cities. Direct flights, 4-5 star hotels, Spanish-speaking guides." },
    stats: {
      travelers: { es: "1,800+ viajeros argentinos", en: "1,800+ Argentine travelers" },
      rating: { es: "4.9 calificacion", en: "4.9 rating" },
      ancestry: { es: "Tours de raices", en: "Ancestry tours" },
    },
    cta: { es: "Cotizar Viaje", en: "Quote Trip" },
    whatsapp: { es: "WhatsApp Argentina", en: "WhatsApp Argentina" },
    packages: { es: "Paquetes Populares desde Argentina", en: "Popular Packages from Argentina" },
    testimonials: { es: "Lo que dicen nuestros viajeros argentinos", en: "What our Argentine travelers say" },
    faq: { es: "Preguntas Frecuentes - Viajes desde Argentina", en: "FAQ - Travel from Argentina" },
    noVisa: { es: "Argentinos SIN visa!", en: "Argentines NO visa needed!" },
    noVisaDesc: { es: "Hasta 90 dias en Europa sin visa Schengen.", en: "Up to 90 days in Europe without Schengen visa." },
    ancestry: { es: "Tours de Raices", en: "Ancestry Tours" },
    ancestryDesc: { es: "Italia, España - Busca tus origenes", en: "Italy, Spain - Find your origins" },
    days: { es: "dias", en: "days" },
    from: { es: "Desde", en: "From" },
    viewPackage: { es: "Ver Paquete", en: "View Package" },
    allPackages: { es: "Ver Todos los Paquetes", en: "View All Packages" },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-argentina-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1612294037637-ec328d0e075e?q=60&w=1200&auto=format&fit=crop" 
            alt="Buenos Aires Argentina" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-sky-400/20 text-sky-300 border-sky-400/30 mb-4" data-testid="badge-argentina">
              {content.badge[language]}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-argentina-h1">
              {content.h1[language]}
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl" data-testid="text-argentina-subtitle">
              {content.subtitle[language]}
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Users className="w-5 h-5 text-sky-400" />
                <span>{content.stats.travelers[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span>{content.stats.rating[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-5 h-5 text-sky-400" />
                <span>{content.stats.ancestry[language]}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-sky-500 text-white font-bold hover:bg-sky-600" data-testid="button-argentina-cta">
                  {content.cta[language]}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" data-testid="button-argentina-whatsapp">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {content.whatsapp[language]}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-gradient-to-r from-sky-400 via-white to-sky-400" data-testid="section-argentina-benefits">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3 bg-sky-500/90 rounded-lg px-6 py-3">
              <Shield className="w-8 h-8 text-white" />
              <div>
                <h3 className="font-bold text-white">{content.noVisa[language]}</h3>
                <p className="text-white/80 text-sm">{content.noVisaDesc[language]}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-sky-500/90 rounded-lg px-6 py-3">
              <MapPin className="w-8 h-8 text-white" />
              <div>
                <h3 className="font-bold text-white">{content.ancestry[language]}</h3>
                <p className="text-white/80 text-sm">{content.ancestryDesc[language]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b" data-testid="section-argentina-cities">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {["Buenos Aires", "Cordoba", "Rosario", "Mendoza", "Mar del Plata", "Tucuman"].map((city) => (
              <div key={city} className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-sky-500" />
                <span className="font-semibold text-sm">{language === "es" ? "Salidas desde" : "Departures from"} {city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-argentina-packages">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" data-testid="text-argentina-packages-title">
            {content.packages[language]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_ARGENTINA.map((pkg) => (
              <Card key={pkg.id} className={`group overflow-hidden ${pkg.featured ? "ring-2 ring-sky-500 shadow-xl" : ""}`} data-testid={`card-argentina-${pkg.id}`}>
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
                    <Badge className="absolute top-3 right-3 bg-sky-500 text-white">
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
                      <div className="font-bold text-sky-600">
                        ${pkg.price.toLocaleString('en-US')} USD
                      </div>
                    </div>
                    <Link href="/packages">
                      <Button size="sm" className="bg-sky-500 hover:bg-sky-600" data-testid={`button-view-${pkg.id}`}>
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
              <Button size="lg" variant="outline" data-testid="button-argentina-all-packages">
                {content.allPackages[language]}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-argentina-testimonials">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-12">
            {content.testimonials[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_ARGENTINA.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6" data-testid={`testimonial-argentina-${index}`}>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.city}, Argentina</div>
                  </div>
                  <Badge className="bg-sky-500/20 text-sky-300 text-xs">{testimonial.trip}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-argentina-faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            {content.faq[language]}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ARGENTINA.map((faq, index) => (
              <Card key={index} className="p-6" data-testid={`faq-argentina-${index}`}>
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-sky-500" data-testid="section-argentina-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Listo para tu viaje a Europa desde Argentina?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Contactanos hoy y recibe una cotizacion personalizada. Consulta por nuestros tours de raices italianas y espanolas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-sky-600 hover:bg-white/90" data-testid="button-argentina-contact">
                <Phone className="w-5 h-5 mr-2" />
                Contactar Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "Trips Europa - Viajes desde Argentina",
          "description": "Agencia de viajes especializada en paquetes turisticos a Europa desde Argentina. Tours de raices italianas y espanolas. Vuelos, hoteles y guias en espanol.",
          "url": "https://tripseuropa.com/desde-argentina",
          "areaServed": {
            "@type": "Country",
            "name": "Argentina"
          },
          "serviceType": ["Travel Agency", "Tour Operator", "Ancestry Tours"],
          "priceRange": "$$$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "880",
            "bestRating": "5"
          }
        })
      }} />
    </div>
  );
}
