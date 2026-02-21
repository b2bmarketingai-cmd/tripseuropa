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

const PACKAGES_VENEZUELA = [
  {
    id: "europa-clasica-vzla",
    title: "Europa Clasica desde Caracas",
    destinations: ["Madrid", "Paris", "Roma", "Barcelona"],
    days: 15,
    price: 2400,
    priceLocal: "$2,400",
    departure: "Caracas",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=70&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "españa-vzla",
    title: "España Completa desde Venezuela",
    destinations: ["Madrid", "Barcelona", "Sevilla", "Valencia"],
    days: 14,
    price: 2100,
    priceLocal: "$2,100",
    departure: "Caracas",
    rating: 4.8,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "italia-vzla",
    title: "Gran Tour Italia",
    destinations: ["Roma", "Florencia", "Venecia", "Milan", "Costa Amalfitana"],
    days: 15,
    price: 2500,
    priceLocal: "$2,500",
    departure: "Caracas",
    rating: 4.9,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "portugal-vzla",
    title: "Portugal y Espana: Ruta Iberica",
    destinations: ["Lisboa", "Porto", "Madrid", "Barcelona"],
    days: 12,
    price: 1950,
    priceLocal: "$1,950",
    departure: "Caracas",
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=70&w=800&auto=format&fit=crop",
  },
];

const TESTIMONIALS_VENEZUELA = [
  {
    name: "Andrea Martinez",
    city: "Caracas",
    trip: "Europa Clasica 15 dias",
    text: "Increible experiencia! La organizacion fue perfecta y los guias en espanol nos hicieron sentir como en casa. Altamente recomendado para venezolanos.",
    rating: 5,
  },
  {
    name: "Ricardo Hernandez",
    city: "Valencia",
    trip: "Espana + Portugal 12 dias",
    text: "Como venezolano en el exterior, fue maravilloso tener un servicio tan profesional. Todo bien coordinado desde el inicio hasta el final.",
    rating: 5,
  },
  {
    name: "Carolina Perez",
    city: "Maracaibo",
    trip: "Italia Romantica 10 dias",
    text: "Nuestro viaje de aniversario supero todas las expectativas. Los hoteles, restaurantes y tours fueron de primera calidad.",
    rating: 5,
  },
];

const FAQ_VENEZUELA = [
  {
    question: "Los venezolanos necesitan visa para Europa?",
    answer: "Actualmente los venezolanos SI necesitan visa Schengen para viajar a Europa. Nuestro equipo te asesora con toda la documentacion necesaria, carta de invitacion y requisitos consulares para facilitar el proceso."
  },
  {
    question: "Que documentos necesito para la visa Schengen?",
    answer: "Necesitas: pasaporte vigente (minimo 6 meses), formulario de solicitud, fotos, seguro de viaje (30,000 EUR), reservas de vuelo y hotel, extractos bancarios de los ultimos 3 meses, carta de trabajo o constancia de ingresos, y justificacion del viaje."
  },
  {
    question: "Puedo pagar en dolares o bolivares?",
    answer: "Aceptamos pagos en dolares americanos (USD) mediante transferencia bancaria, tarjeta de credito internacional o plataformas de pago digital. Tambien ofrecemos planes de pago fraccionado."
  },
  {
    question: "Hay vuelos directos de Venezuela a Europa?",
    answer: "Existen conexiones desde Caracas a Madrid con Iberia, y conexiones via Panama, Bogota o Miami con varias aerolineas. Te ayudamos a encontrar las mejores opciones y precios de vuelo."
  },
];

export default function FromVenezuela() {
  const { language } = useI18n();

  const content = {
    badge: { es: "Viajes desde Venezuela", en: "Travel from Venezuela", pt: "Viagens da Venezuela" },
    h1: { es: "Viajes a Europa desde Venezuela", en: "Travel to Europe from Venezuela", pt: "Viagens para Europa da Venezuela" },
    subtitle: { es: "Paquetes exclusivos con salidas desde Caracas. Te asesoramos con visa Schengen. Vuelos con las mejores conexiones, hoteles 4-5 estrellas, guias en espanol.", en: "Exclusive packages departing from Caracas. We help you with Schengen visa. Flights with best connections, 4-5 star hotels, Spanish-speaking guides.", pt: "Pacotes exclusivos com saidas de Caracas. Assessoria com visto Schengen. Voos com melhores conexoes, hoteis 4-5 estrelas, guias em espanhol." },
    visaHelp: { es: "ASESORIA VISA SCHENGEN", en: "SCHENGEN VISA ASSISTANCE", pt: "ASSESSORIA VISTO SCHENGEN" },
    stats: {
      travelers: { es: "600+ viajeros venezolanos", en: "600+ Venezuelan travelers", pt: "600+ viajantes venezuelanos" },
      rating: { es: "4.9 calificacion promedio", en: "4.9 average rating", pt: "4.9 avaliacao media" },
      visa: { es: "Asesoria visa incluida", en: "Visa assistance included", pt: "Assessoria visto incluida" },
    },
    cta: { es: "Cotizar Mi Viaje", en: "Quote My Trip", pt: "Orcamento" },
    whatsapp: { es: "WhatsApp Venezuela", en: "WhatsApp Venezuela", pt: "WhatsApp Venezuela" },
    packages: { es: "Paquetes Populares desde Venezuela", en: "Popular Packages from Venezuela", pt: "Pacotes Populares da Venezuela" },
    testimonials: { es: "Lo que dicen nuestros viajeros venezolanos", en: "What our Venezuelan travelers say", pt: "O que dizem nossos viajantes venezuelanos" },
    faq: { es: "Preguntas Frecuentes - Viajes desde Venezuela", en: "FAQ - Travel from Venezuela", pt: "Perguntas Frequentes - Viagens da Venezuela" },
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
      <SEOHead title="Viajes a Europa desde Venezuela" description="Paquetes de viaje a Europa desde Venezuela. Asesoria visa Schengen. Vuelos desde Caracas." />
      <Header />

      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-venezuela-hero">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1589519160732-57fc498494f8?q=60&w=1200&auto=format&fit=crop" 
            alt="Caracas Venezuela" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-blue-500 text-white border-blue-400 mb-4" data-testid="badge-visa-vzla">
              {t("visaHelp")}
            </Badge>
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4 ml-2" data-testid="badge-venezuela">
              {t("badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-venezuela-h1">
              {t("h1")}
            </h1>
            <p className="text-xl text-white/80 mb-8" data-testid="text-venezuela-subtitle">
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
                data-testid="button-cta-venezuela"
                onClick={() => openWhatsAppQuote({ es: "viajes a Europa desde Venezuela", en: "travel to Europe from Venezuela", pt: "viagens para Europa da Venezuela" }, language)}
              >
                {t("cta")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10" data-testid="button-whatsapp-venezuela">
                <MessageCircle className="mr-2 w-5 h-5" /> {t("whatsapp")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30" data-testid="section-packages-venezuela">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" data-testid="text-packages-title-venezuela">
            {t("packages")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_VENEZUELA.map((pkg) => (
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
                      {language === "es" ? "Destacado" : "Featured"}
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
                      <span>{pkg.days} {language === "es" ? "dias" : "days"}</span>
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

      <section className="py-20 bg-background" data-testid="section-testimonials-venezuela">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("testimonials")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_VENEZUELA.map((testimonial, index) => (
              <Card key={index} className="p-6" data-testid={`card-testimonial-venezuela-${index}`}>
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

      <section className="py-20 bg-muted/30" data-testid="section-faq-venezuela">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("faq")}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_VENEZUELA.map((faq, index) => (
              <Card key={index} className="p-6" data-testid={`card-faq-venezuela-${index}`}>
                <h3 className="font-display font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
      
      <LocalBusinessSchema country="Venezuela" city="Caracas" />
      <FAQSchema questions={FAQ_VENEZUELA} />
    </div>
  );
}
