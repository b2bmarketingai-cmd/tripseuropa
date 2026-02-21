import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { FloatingContactButtons } from "@/components/support";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Plane, MapPin, Star, Calendar, Users, Shield, Clock, 
  CheckCircle, ArrowRight, Phone, MessageCircle, Heart,
  Building, Utensils, Camera, Compass
} from "lucide-react";
import { FAQSchema, LocalBusinessSchema } from "@/components/SEOSchema";
import { openWhatsAppQuote } from "@/lib/whatsapp";

const PACKAGES_ECUADOR = [
  {
    id: "europa-clasica-ec",
    title: "Europa Clasica desde Quito",
    destinations: ["Madrid", "Paris", "Roma", "Barcelona"],
    days: 15,
    price: 2500,
    priceLocal: "$2,500",
    departure: "Quito",
    rating: 4.9,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "españa-completa-ec",
    title: "España Completa desde Ecuador",
    destinations: ["Madrid", "Barcelona", "Sevilla", "Valencia"],
    days: 14,
    price: 2200,
    priceLocal: "$2,200",
    departure: "Quito",
    rating: 4.8,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "italia-gran-tour-ec",
    title: "Italia Gran Tour",
    destinations: ["Roma", "Florencia", "Venecia", "Milan", "Costa Amalfitana"],
    days: 16,
    price: 2700,
    priceLocal: "$2,700",
    departure: "Quito",
    rating: 4.9,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "francia-benelux-ec",
    title: "Francia & Benelux",
    destinations: ["Paris", "Bruselas", "Amsterdam", "Brujas", "Luxemburgo"],
    days: 13,
    price: 2350,
    priceLocal: "$2,350",
    departure: "Quito",
    rating: 4.8,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=70&w=800&auto=format&fit=crop",
  },
];

const TESTIMONIALS_ECUADOR = [
  {
    name: "Maria Jose Cevallos",
    city: "Quito",
    trip: "Europa Clasica 15 dias",
    text: "Desde Quito nos organizaron todo de manera impecable. La asesoria para la visa Schengen fue fundamental y el viaje supero todas nuestras expectativas. Los guias en espanol fueron excelentes.",
    rating: 5,
  },
  {
    name: "Carlos Andrade",
    city: "Guayaquil",
    trip: "Italia Gran Tour 16 dias",
    text: "Increible experiencia viajando desde Ecuador. El equipo nos ayudo con todos los tramites y el itinerario fue perfecto. Cada ciudad fue una sorpresa nueva. Totalmente recomendado.",
    rating: 5,
  },
];

const FAQ_ECUADOR = [
  {
    question: "Los ecuatorianos necesitan visa para viajar a Europa?",
    answer: "Si, los ciudadanos ecuatorianos SI necesitan visa Schengen para viajar a Europa. Nuestro equipo te asesora con toda la documentacion necesaria, carta de invitacion y requisitos consulares para facilitar el proceso de solicitud."
  },
  {
    question: "Que documentos necesito para la visa Schengen desde Ecuador?",
    answer: "Necesitas: pasaporte vigente (minimo 6 meses), formulario de solicitud, fotos tamano pasaporte, seguro de viaje (cobertura minima 30,000 EUR), reservas de vuelo y hotel, extractos bancarios de los ultimos 3 meses, carta de trabajo o constancia de ingresos, y justificacion del viaje."
  },
  {
    question: "Hay vuelos directos de Ecuador a Europa?",
    answer: "No hay vuelos directos desde Ecuador a Europa. Las mejores conexiones desde Quito (UIO) y Guayaquil (GYE) son via Madrid con Iberia, via Amsterdam con KLM, o via Panama, Bogota o Miami con diversas aerolineas. Te ayudamos a encontrar las mejores opciones."
  },
  {
    question: "Puedo pagar en dolares?",
    answer: "Si, Ecuador utiliza el dolar americano (USD) como moneda oficial, por lo que todos nuestros precios estan en USD. Aceptamos transferencia bancaria, tarjeta de credito internacional y plataformas de pago digital. Tambien ofrecemos planes de pago fraccionado."
  },
  {
    question: "Cual es la mejor epoca para viajar a Europa desde Ecuador?",
    answer: "La mejor epoca para viajar a Europa desde Ecuador es entre mayo y septiembre (verano europeo), cuando el clima es mas calido y los dias son mas largos. Sin embargo, cada temporada tiene su atractivo: primavera para jardines y festivales, otono para menos turistas, e invierno para mercados navidenos."
  },
];

export default function FromEcuador() {
  const { language } = useI18n();

  const content = {
    badge: { es: "Viajes desde Ecuador", en: "Travel from Ecuador", pt: "Viagens do Equador" },
    h1: { es: "Viajes a Europa desde Ecuador", en: "Trips to Europe from Ecuador", pt: "Viagens para Europa do Equador" },
    subtitle: { es: "Paquetes exclusivos con salidas desde Quito. Te asesoramos con visa Schengen. Vuelos con las mejores conexiones, hoteles 4-5 estrellas, guias en espanol.", en: "Exclusive packages departing from Quito. We help you with Schengen visa. Flights with best connections, 4-5 star hotels, Spanish-speaking guides.", pt: "Pacotes exclusivos com saidas de Quito. Assessoria com visto Schengen. Voos com melhores conexoes, hoteis 4-5 estrelas, guias em espanhol." },
    visaHelp: { es: "ASESORIA VISA SCHENGEN", en: "SCHENGEN VISA ASSISTANCE", pt: "ASSESSORIA VISTO SCHENGEN" },
    stats: {
      travelers: { es: "400+ viajeros ecuatorianos", en: "400+ Ecuadorian travelers", pt: "400+ viajantes equatorianos" },
      rating: { es: "4.9 calificacion promedio", en: "4.9 average rating", pt: "4.9 avaliacao media" },
      visa: { es: "Asesoria visa incluida", en: "Visa assistance included", pt: "Assessoria visto incluida" },
    },
    cta: { es: "Cotizar Mi Viaje", en: "Quote My Trip", pt: "Orcamento" },
    whatsapp: { es: "WhatsApp Ecuador", en: "WhatsApp Ecuador", pt: "WhatsApp Ecuador" },
    packages: { es: "Paquetes Populares desde Ecuador", en: "Popular Packages from Ecuador", pt: "Pacotes Populares do Equador" },
    testimonials: { es: "Lo que dicen nuestros viajeros ecuatorianos", en: "What our Ecuadorian travelers say", pt: "O que dizem nossos viajantes equatorianos" },
    faq: { es: "Preguntas Frecuentes - Viajes desde Ecuador", en: "FAQ - Travel from Ecuador", pt: "Perguntas Frequentes - Viagens do Equador" },
  };

  const t = (key: keyof typeof content) => {
    const value = content[key];
    if (typeof value === "object" && "es" in value) {
      return value[language] || value.es;
    }
    return String(value);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead 
        title={content.h1[language] || "Viajes a Europa desde Ecuador"} 
        description="Paquetes de viaje a Europa desde Ecuador. Asesoria visa Schengen. Vuelos desde Quito." 
      />
      <Header />

      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-ecuador-hero">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=60&w=1200&auto=format&fit=crop" 
            alt="Quito Ecuador" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-blue-500 text-white border-blue-400 mb-4" data-testid="badge-visa-ec">
              {t("visaHelp")}
            </Badge>
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4 ml-2" data-testid="badge-ecuador">
              {t("badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-ecuador-h1">
              {t("h1")}
            </h1>
            <p className="text-xl text-white/80 mb-8" data-testid="text-ecuador-subtitle">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap gap-6 text-white/90 mb-8">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                <span>{content.stats.travelers[language]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                <span>{content.stats.rating[language]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>{content.stats.visa[language]}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-accent text-primary hover:bg-accent/90" 
                data-testid="button-cta-ecuador"
                onClick={() => openWhatsAppQuote({ es: "viajes a Europa desde Ecuador", en: "travel to Europe from Ecuador", pt: "viagens para Europa do Equador" }, language)}
              >
                {t("cta")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10" data-testid="button-whatsapp-ecuador">
                <MessageCircle className="mr-2 w-5 h-5" /> {t("whatsapp")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30" data-testid="section-packages-ecuador">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" data-testid="text-packages-title-ecuador">
            {t("packages")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_ECUADOR.map((pkg) => (
              <Card key={pkg.id} className="group overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-package-${pkg.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {pkg.featured && (
                    <Badge className="absolute top-4 right-4 bg-accent text-primary">
                      {language === "es" ? "Destacado" : language === "pt" ? "Destaque" : "Featured"}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display font-bold text-lg mb-2">{pkg.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{pkg.destinations.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>{pkg.days} {language === "es" ? "dias" : language === "pt" ? "dias" : "days"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent" />
                      <span>{pkg.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-accent">${pkg.price.toLocaleString()} USD</span>
                  </div>
                  <Button 
                    className="w-full" 
                    data-testid={`button-quote-${pkg.id}`}
                    onClick={() => openWhatsAppQuote({ es: pkg.title, en: pkg.title, pt: pkg.title }, language)}
                  >
                    {language === "es" ? "Cotizar" : language === "pt" ? "Orcamento" : "Quote"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background" data-testid="section-testimonials-ecuador">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("testimonials")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS_ECUADOR.map((testimonial, index) => (
              <Card key={index} className="p-6" data-testid={`card-testimonial-ecuador-${index}`}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.city} - {testimonial.trip}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30" data-testid="section-faq-ecuador">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("faq")}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ECUADOR.map((faq, index) => (
              <Card key={index} className="p-6" data-testid={`card-faq-ecuador-${index}`}>
                <h3 className="font-display font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
      
      <LocalBusinessSchema country="Ecuador" city="Quito" />
      <FAQSchema questions={FAQ_ECUADOR} />
    </div>
  );
}
