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

const PACKAGES_RD = [
  {
    id: "europa-clasica-rd",
    title: "Europa Clasica desde Santo Domingo",
    destinations: ["Madrid", "Paris", "Roma", "Barcelona"],
    days: 15,
    price: 2650,
    priceLocal: "$2,650",
    departure: "Santo Domingo",
    rating: 4.9,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "espana-completa-rd",
    title: "Espana Completa desde RD",
    destinations: ["Madrid", "Barcelona", "Sevilla", "Valencia", "Granada"],
    days: 14,
    price: 2350,
    priceLocal: "$2,350",
    departure: "Santo Domingo",
    rating: 4.8,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "italia-rd",
    title: "Italia Gran Tour",
    destinations: ["Roma", "Florencia", "Venecia", "Milan", "Costa Amalfitana"],
    days: 16,
    price: 2850,
    priceLocal: "$2,850",
    departure: "Santo Domingo",
    rating: 4.9,
    reviews: 93,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "francia-benelux-rd",
    title: "Francia & Benelux",
    destinations: ["Paris", "Bruselas", "Amsterdam", "Brujas", "Luxemburgo"],
    days: 13,
    price: 2500,
    priceLocal: "$2,500",
    departure: "Santo Domingo",
    rating: 4.8,
    reviews: 81,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=70&w=800&auto=format&fit=crop",
  },
];

const TESTIMONIALS_RD = [
  {
    name: "Yolanda Reyes",
    city: "Santo Domingo",
    trip: "Europa Clasica 15 dias",
    text: "Viajar a Europa desde Republica Dominicana fue un sueno hecho realidad. Trips Europa nos ayudo con todo el proceso de visa y la organizacion del viaje fue impecable.",
    rating: 5,
  },
  {
    name: "Miguel Angel Sanchez",
    city: "Santiago de los Caballeros",
    trip: "Espana Completa 14 dias",
    text: "La asesoria para la visa Schengen fue excelente. Todo el equipo estuvo pendiente de nosotros desde la reserva hasta el regreso. Altamente recomendados.",
    rating: 5,
  },
];

const FAQ_RD = [
  {
    question: "Los dominicanos necesitan visa para viajar a Europa?",
    answer: "Si, los ciudadanos dominicanos necesitan visa Schengen para viajar a Europa. Trips Europa le ofrece asesoria completa para el tramite de visa, incluyendo preparacion de documentos, carta de invitacion y acompanamiento en todo el proceso."
  },
  {
    question: "Que documentos necesito para la visa Schengen desde RD?",
    answer: "Necesita: pasaporte dominicano vigente (minimo 6 meses de validez), formulario de solicitud, fotos tipo pasaporte, seguro de viaje (cobertura minima 30,000 EUR), reservas de hotel y vuelo, estados de cuenta bancarios, carta laboral y comprobante de ingresos."
  },
  {
    question: "Hay vuelos directos de Santo Domingo a Europa?",
    answer: "Existen vuelos con conexiones desde el Aeropuerto Internacional de las Americas (SDQ) y Punta Cana (PUJ) hacia las principales ciudades europeas. Las conexiones mas comunes son via Madrid con Iberia, via Paris con Air France, o via Miami."
  },
  {
    question: "Puedo pagar en pesos dominicanos o dolares?",
    answer: "Aceptamos pagos en dolares americanos (USD) mediante transferencia bancaria, tarjeta de credito internacional o plataformas de pago digital. Tambien ofrecemos planes de financiamiento adaptados a las necesidades de nuestros viajeros dominicanos."
  },
  {
    question: "Cual es la mejor epoca para viajar a Europa desde Republica Dominicana?",
    answer: "La mejor epoca es entre mayo y septiembre (verano europeo). Sin embargo, cada temporada tiene su encanto: primavera para flores y festivales, otono para precios mas accesibles, e invierno para mercados navidenos y deportes de nieve."
  },
];

export default function FromRepublicaDominicana() {
  const { language } = useI18n();

  const content = {
    badge: { es: "Viajes desde Rep. Dominicana", en: "Travel from Dominican Republic", pt: "Viagens da Rep. Dominicana" },
    h1: { es: "Viajes a Europa desde Republica Dominicana", en: "Trips to Europe from Dominican Republic", pt: "Viagens para Europa da Republica Dominicana" },
    subtitle: { es: "Paquetes exclusivos con salidas desde Santo Domingo y Punta Cana. Asesoria de visa Schengen incluida. Vuelos con las mejores conexiones, hoteles 4-5 estrellas, guias en espanol.", en: "Exclusive packages departing from Santo Domingo and Punta Cana. Schengen visa assistance included. Flights with best connections, 4-5 star hotels, Spanish-speaking guides.", pt: "Pacotes exclusivos com saidas de Santo Domingo e Punta Cana. Assessoria de visto Schengen incluida. Voos com melhores conexoes, hoteis 4-5 estrelas, guias em espanhol." },
    visaAssist: { es: "ASESORIA VISA INCLUIDA", en: "VISA ASSISTANCE INCLUDED", pt: "ASSESSORIA VISTO INCLUIDA" },
    stats: {
      travelers: { es: "400+ viajeros dominicanos", en: "400+ Dominican travelers", pt: "400+ viajantes dominicanos" },
      rating: { es: "4.9 calificacion promedio", en: "4.9 average rating", pt: "4.9 avaliacao media" },
      visa: { es: "Asesoria visa Schengen", en: "Schengen visa assistance", pt: "Assessoria visto Schengen" },
    },
    cta: { es: "Cotizar Mi Viaje", en: "Quote My Trip", pt: "Orcamento" },
    whatsapp: { es: "WhatsApp RD", en: "WhatsApp DR", pt: "WhatsApp RD" },
    packages: { es: "Paquetes Populares desde Republica Dominicana", en: "Popular Packages from Dominican Republic", pt: "Pacotes Populares da Republica Dominicana" },
    testimonials: { es: "Lo que dicen nuestros viajeros dominicanos", en: "What our Dominican travelers say", pt: "O que dizem nossos viajantes dominicanos" },
    faq: { es: "Preguntas Frecuentes - Viajes desde Rep. Dominicana", en: "FAQ - Travel from Dominican Republic", pt: "Perguntas Frequentes - Viagens da Rep. Dominicana" },
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
        title={content.h1[language] || "Viajes a Europa desde Republica Dominicana"} 
        description="Paquetes de viaje a Europa desde Republica Dominicana. Asesoria visa Schengen incluida. Vuelos desde Santo Domingo y Punta Cana." 
      />
      <Header />

      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-rd-hero">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1580541631950-7282082b53ce?q=60&w=1200&auto=format&fit=crop" 
            alt="Republica Dominicana" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-blue-600 text-white border-blue-500 mb-4" data-testid="badge-visa-rd">
              {t("visaAssist")}
            </Badge>
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4 ml-2" data-testid="badge-rd">
              {t("badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-rd-h1">
              {t("h1")}
            </h1>
            <p className="text-xl text-white/80 mb-8" data-testid="text-rd-subtitle">
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
                <Shield className="w-5 h-5 text-accent" />
                <span>{content.stats.visa[language]}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-accent text-primary hover:bg-accent/90" 
                data-testid="button-cta-rd"
                onClick={() => openWhatsAppQuote({ es: "viajes a Europa desde Republica Dominicana", en: "travel to Europe from Dominican Republic", pt: "viagens para Europa da Republica Dominicana" }, language)}
              >
                {t("cta")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10" data-testid="button-whatsapp-rd">
                <MessageCircle className="mr-2 w-5 h-5" /> {t("whatsapp")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30" data-testid="section-packages-rd">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" data-testid="text-packages-title-rd">
            {t("packages")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_RD.map((pkg) => (
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

      <section className="py-20 bg-background" data-testid="section-testimonials-rd">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("testimonials")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS_RD.map((testimonial, index) => (
              <Card key={index} className="p-6" data-testid={`card-testimonial-rd-${index}`}>
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

      <section className="py-20 bg-muted/30" data-testid="section-faq-rd">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("faq")}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_RD.map((faq, index) => (
              <Card key={index} className="p-6" data-testid={`card-faq-rd-${index}`}>
                <h3 className="font-display font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
      
      <LocalBusinessSchema country="Republica Dominicana" city="Santo Domingo" />
      <FAQSchema questions={FAQ_RD} />
    </div>
  );
}
