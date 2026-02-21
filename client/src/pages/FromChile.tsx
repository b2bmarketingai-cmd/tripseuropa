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

const PACKAGES_CHILE = [
  {
    id: "europa-clasica-cl",
    title: "Europa Clasica desde Santiago",
    destinations: ["Madrid", "Paris", "Roma", "Barcelona"],
    days: 15,
    price: 2600,
    priceLocal: "$2,600",
    departure: "Santiago",
    rating: 4.9,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "españa-completa-cl",
    title: "España Completa desde Chile",
    destinations: ["Madrid", "Barcelona", "Sevilla", "Valencia", "Granada"],
    days: 14,
    price: 2300,
    priceLocal: "$2,300",
    departure: "Santiago",
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "italia-gran-tour-cl",
    title: "Italia Gran Tour",
    destinations: ["Roma", "Florencia", "Venecia", "Milan", "Costa Amalfitana"],
    days: 16,
    price: 2800,
    priceLocal: "$2,800",
    departure: "Santiago",
    rating: 4.9,
    reviews: 117,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "francia-benelux-cl",
    title: "Francia & Benelux",
    destinations: ["Paris", "Bruselas", "Amsterdam", "Brujas", "Luxemburgo"],
    days: 13,
    price: 2450,
    priceLocal: "$2,450",
    departure: "Santiago",
    rating: 4.8,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=70&w=800&auto=format&fit=crop",
  },
];

const TESTIMONIALS_CHILE = [
  {
    name: "Francisca Rojas",
    city: "Santiago",
    trip: "Europa Clasica 15 dias",
    text: "Viajamos con mi familia desde Santiago y todo fue impecable. La asesoria con la visa Schengen nos facilito mucho el proceso. Los hoteles y guias fueron excelentes.",
    rating: 5,
  },
  {
    name: "Rodrigo Valenzuela",
    city: "Vina del Mar",
    trip: "Francia & Benelux 13 dias",
    text: "Como chileno, fue increible tener un equipo que nos apoyo en todo el proceso. Desde los vuelos hasta las excursiones, todo estuvo perfectamente organizado.",
    rating: 5,
  },
];

const FAQ_CHILE = [
  {
    question: "Los chilenos necesitan visa para viajar a Europa?",
    answer: "No, los ciudadanos chilenos NO necesitan visa Schengen para estancias turisticas de hasta 90 dias en el espacio Schengen. Solo necesitan pasaporte vigente con al menos 6 meses de validez y seguro de viaje."
  },
  {
    question: "Que documentos necesito para viajar a Europa desde Chile?",
    answer: "Necesitas: pasaporte chileno vigente (minimo 6 meses de validez), seguro de viaje con cobertura medica de al menos 30,000 EUR, reservas de alojamiento, boleto de avion de ida y vuelta, y comprobante de solvencia economica."
  },
  {
    question: "Hay vuelos directos de Santiago a Europa?",
    answer: "Existen vuelos con escalas desde Santiago (SCL) a las principales ciudades europeas con aerolineas como LATAM, Iberia, Air France y KLM. Las conexiones mas comunes son via Madrid, Paris o Amsterdam."
  },
  {
    question: "Puedo pagar en dolares o pesos chilenos?",
    answer: "Aceptamos pagos en dolares americanos (USD) mediante transferencia bancaria, tarjeta de credito internacional o plataformas de pago digital. Tambien ofrecemos planes de pago fraccionado para tu comodidad."
  },
  {
    question: "Cual es la mejor epoca para viajar a Europa desde Chile?",
    answer: "La mejor epoca para viajar a Europa desde Chile es entre mayo y septiembre (verano europeo). Sin embargo, cada temporada tiene su encanto: primavera para flores y festivales, otono para menos turistas y precios mas bajos, e invierno para mercados navidenos y deportes de nieve."
  },
];

export default function FromChile() {
  const { language } = useI18n();

  const content = {
    badge: { es: "Viajes desde Chile", en: "Travel from Chile", pt: "Viagens do Chile" },
    h1: { es: "Viajes a Europa desde Chile", en: "Trips to Europe from Chile", pt: "Viagens para Europa do Chile" },
    subtitle: { es: "Paquetes exclusivos con salidas desde Santiago. Chilenos viajan sin visa Schengen. Vuelos con las mejores conexiones, hoteles 4-5 estrellas, guias en espanol.", en: "Exclusive packages departing from Santiago. Chileans travel visa-free to Schengen. Flights with best connections, 4-5 star hotels, Spanish-speaking guides.", pt: "Pacotes exclusivos com saidas de Santiago. Chilenos viajam sem visto Schengen. Voos com melhores conexoes, hoteis 4-5 estrelas, guias em espanhol." },
    visaFree: { es: "SIN VISA SCHENGEN", en: "NO SCHENGEN VISA NEEDED", pt: "SEM VISTO SCHENGEN" },
    stats: {
      travelers: { es: "500+ viajeros chilenos", en: "500+ Chilean travelers", pt: "500+ viajantes chilenos" },
      rating: { es: "4.9 calificacion promedio", en: "4.9 average rating", pt: "4.9 avaliacao media" },
      visa: { es: "Sin visa para chilenos", en: "Visa-free for Chileans", pt: "Sem visto para chilenos" },
    },
    cta: { es: "Cotizar Mi Viaje", en: "Quote My Trip", pt: "Orcamento" },
    whatsapp: { es: "WhatsApp Chile", en: "WhatsApp Chile", pt: "WhatsApp Chile" },
    packages: { es: "Paquetes Populares desde Chile", en: "Popular Packages from Chile", pt: "Pacotes Populares do Chile" },
    testimonials: { es: "Lo que dicen nuestros viajeros chilenos", en: "What our Chilean travelers say", pt: "O que dizem nossos viajantes chilenos" },
    faq: { es: "Preguntas Frecuentes - Viajes desde Chile", en: "FAQ - Travel from Chile", pt: "Perguntas Frequentes - Viagens do Chile" },
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
        title={content.h1[language] || "Viajes a Europa desde Chile"} 
        description="Paquetes de viaje a Europa desde Chile. Chilenos sin visa Schengen. Vuelos desde Santiago." 
      />
      <Header />

      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-chile-hero">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=60&w=1200&auto=format&fit=crop" 
            alt="Santiago Chile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-green-500 text-white border-green-400 mb-4" data-testid="badge-visa-cl">
              {t("visaFree")}
            </Badge>
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4 ml-2" data-testid="badge-chile">
              {t("badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-chile-h1">
              {t("h1")}
            </h1>
            <p className="text-xl text-white/80 mb-8" data-testid="text-chile-subtitle">
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
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>{content.stats.visa[language]}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-accent text-primary hover:bg-accent/90" 
                data-testid="button-cta-chile"
                onClick={() => openWhatsAppQuote({ es: "viajes a Europa desde Chile", en: "travel to Europe from Chile", pt: "viagens para Europa do Chile" }, language)}
              >
                {t("cta")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10" data-testid="button-whatsapp-chile">
                <MessageCircle className="mr-2 w-5 h-5" /> {t("whatsapp")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30" data-testid="section-packages-chile">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" data-testid="text-packages-title-chile">
            {t("packages")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_CHILE.map((pkg) => (
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

      <section className="py-20 bg-background" data-testid="section-testimonials-chile">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("testimonials")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS_CHILE.map((testimonial, index) => (
              <Card key={index} className="p-6" data-testid={`card-testimonial-chile-${index}`}>
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

      <section className="py-20 bg-muted/30" data-testid="section-faq-chile">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("faq")}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_CHILE.map((faq, index) => (
              <Card key={index} className="p-6" data-testid={`card-faq-chile-${index}`}>
                <h3 className="font-display font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
      
      <LocalBusinessSchema country="Chile" city="Santiago" />
      <FAQSchema questions={FAQ_CHILE} />
    </div>
  );
}
