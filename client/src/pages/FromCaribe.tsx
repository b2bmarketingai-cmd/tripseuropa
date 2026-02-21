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

const PACKAGES_CARIBE = [
  {
    id: "europa-clasica-caribe",
    title: "Europa Clasica desde el Caribe",
    destinations: ["Madrid", "Paris", "Roma", "Barcelona"],
    days: 15,
    price: 2700,
    priceLocal: "$2,700",
    departure: "Caribe",
    rating: 4.9,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "espana-caribe",
    title: "Espana Completa desde el Caribe",
    destinations: ["Madrid", "Barcelona", "Sevilla", "Valencia", "Granada"],
    days: 14,
    price: 2400,
    priceLocal: "$2,400",
    departure: "Caribe",
    rating: 4.8,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "italia-caribe",
    title: "Italia Gran Tour",
    destinations: ["Roma", "Florencia", "Venecia", "Milan", "Costa Amalfitana"],
    days: 16,
    price: 2900,
    priceLocal: "$2,900",
    departure: "Caribe",
    rating: 4.9,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "francia-benelux-caribe",
    title: "Francia & Benelux",
    destinations: ["Paris", "Bruselas", "Amsterdam", "Brujas", "Luxemburgo"],
    days: 13,
    price: 2550,
    priceLocal: "$2,550",
    departure: "Caribe",
    rating: 4.8,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=70&w=800&auto=format&fit=crop",
  },
];

const TESTIMONIALS_CARIBE = [
  {
    name: "Maria del Carmen Torres",
    city: "San Juan, Puerto Rico",
    trip: "Europa Clasica 15 dias",
    text: "Desde el Caribe, viajar a Europa parece complicado, pero Trips Europa hizo todo increiblemente facil. Los vuelos, los hoteles y las excursiones fueron de primera calidad.",
    rating: 5,
  },
  {
    name: "Carlos Rivera",
    city: "Aruba",
    trip: "Espana Completa 14 dias",
    text: "Excelente experiencia desde el inicio. La asesoria para la documentacion fue clave y los guias en espanol hicieron el viaje inolvidable.",
    rating: 5,
  },
];

const FAQ_CARIBE = [
  {
    question: "Los viajeros del Caribe necesitan visa para Europa?",
    answer: "Depende de la nacionalidad. Ciudadanos de algunos territorios del Caribe como Aruba, Curacao y las Antillas Holandesas (pasaporte holandes) no necesitan visa Schengen. Otras nacionalidades requieren tramitar la visa. Contactenos para asesoria personalizada segun su pais."
  },
  {
    question: "Hay vuelos directos del Caribe a Europa?",
    answer: "Existen vuelos con conexiones desde las principales islas del Caribe hacia Europa. Las rutas mas comunes son via Miami, Panama, Bogota o directamente desde islas como Aruba y Curacao hacia Amsterdam con KLM."
  },
  {
    question: "Que documentos necesito para viajar a Europa desde el Caribe?",
    answer: "Necesita: pasaporte vigente (minimo 6 meses de validez), visa Schengen (segun nacionalidad), seguro de viaje con cobertura medica de al menos 30,000 EUR, reservas de alojamiento y boletos aereos de ida y vuelta."
  },
  {
    question: "Puedo pagar en dolares americanos?",
    answer: "Si, aceptamos pagos en dolares americanos (USD) mediante transferencia bancaria, tarjeta de credito internacional o plataformas de pago digital. Tambien ofrecemos planes de financiamiento."
  },
  {
    question: "Cual es la mejor epoca para viajar a Europa desde el Caribe?",
    answer: "La mejor epoca es entre mayo y septiembre (verano europeo). Sin embargo, cada temporada tiene su encanto: primavera para flores y festivales, otono para menos turistas, e invierno para mercados navidenos."
  },
];

export default function FromCaribe() {
  const { language } = useI18n();

  const content = {
    badge: { es: "Viajes desde el Caribe", en: "Travel from the Caribbean", pt: "Viagens do Caribe" },
    h1: { es: "Viajes a Europa desde el Caribe", en: "Trips to Europe from the Caribbean", pt: "Viagens para Europa do Caribe" },
    subtitle: { es: "Paquetes exclusivos con salidas desde el Caribe. Vuelos con las mejores conexiones, hoteles 4-5 estrellas, guias en espanol y asesoria completa de documentacion.", en: "Exclusive packages departing from the Caribbean. Flights with best connections, 4-5 star hotels, Spanish-speaking guides and full documentation assistance.", pt: "Pacotes exclusivos com saidas do Caribe. Voos com melhores conexoes, hoteis 4-5 estrelas, guias em espanhol e assessoria completa de documentacao." },
    stats: {
      travelers: { es: "300+ viajeros caribenos", en: "300+ Caribbean travelers", pt: "300+ viajantes caribenhos" },
      rating: { es: "4.9 calificacion promedio", en: "4.9 average rating", pt: "4.9 avaliacao media" },
      support: { es: "Asesoria de visa incluida", en: "Visa assistance included", pt: "Assessoria de visto incluida" },
    },
    cta: { es: "Cotizar Mi Viaje", en: "Quote My Trip", pt: "Orcamento" },
    whatsapp: { es: "WhatsApp Caribe", en: "WhatsApp Caribbean", pt: "WhatsApp Caribe" },
    packages: { es: "Paquetes Populares desde el Caribe", en: "Popular Packages from the Caribbean", pt: "Pacotes Populares do Caribe" },
    testimonials: { es: "Lo que dicen nuestros viajeros caribenos", en: "What our Caribbean travelers say", pt: "O que dizem nossos viajantes caribenhos" },
    faq: { es: "Preguntas Frecuentes - Viajes desde el Caribe", en: "FAQ - Travel from the Caribbean", pt: "Perguntas Frequentes - Viagens do Caribe" },
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
        title={content.h1[language] || "Viajes a Europa desde el Caribe"} 
        description="Paquetes de viaje a Europa desde el Caribe. Vuelos con conexiones, hoteles premium, guias en espanol y asesoria de visa." 
      />
      <Header />

      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-caribe-hero">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=60&w=1200&auto=format&fit=crop" 
            alt="Caribe playa tropical" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-caribe">
              {t("badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-caribe-h1">
              {t("h1")}
            </h1>
            <p className="text-xl text-white/80 mb-8" data-testid="text-caribe-subtitle">
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
                <span>{content.stats.support[language]}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-accent text-primary hover:bg-accent/90" 
                data-testid="button-cta-caribe"
                onClick={() => openWhatsAppQuote({ es: "viajes a Europa desde el Caribe", en: "travel to Europe from the Caribbean", pt: "viagens para Europa do Caribe" }, language)}
              >
                {t("cta")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10" data-testid="button-whatsapp-caribe">
                <MessageCircle className="mr-2 w-5 h-5" /> {t("whatsapp")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30" data-testid="section-packages-caribe">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" data-testid="text-packages-title-caribe">
            {t("packages")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_CARIBE.map((pkg) => (
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

      <section className="py-20 bg-background" data-testid="section-testimonials-caribe">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("testimonials")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS_CARIBE.map((testimonial, index) => (
              <Card key={index} className="p-6" data-testid={`card-testimonial-caribe-${index}`}>
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

      <section className="py-20 bg-muted/30" data-testid="section-faq-caribe">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("faq")}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_CARIBE.map((faq, index) => (
              <Card key={index} className="p-6" data-testid={`card-faq-caribe-${index}`}>
                <h3 className="font-display font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
      
      <LocalBusinessSchema country="Caribe" city="Caribbean" />
      <FAQSchema questions={FAQ_CARIBE} />
    </div>
  );
}
