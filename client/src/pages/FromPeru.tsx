import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Plane, MapPin, Star, Calendar, Users, Shield, Clock, 
  CheckCircle, ArrowRight, Phone, MessageCircle, Heart,
  Building, Utensils, Camera, Compass, Mountain
} from "lucide-react";
import { FAQSchema, LocalBusinessSchema } from "@/components/SEOSchema";
import { openWhatsAppQuote } from "@/lib/whatsapp";

const PACKAGES_PERU = [
  {
    id: "europa-machu-picchu-combo",
    title: "Europa + Machu Picchu Combo",
    destinations: ["Paris", "Roma", "Barcelona", "Cusco"],
    days: 18,
    price: 3200,
    pricePEN: 11840,
    departure: "Lima",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=70&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "españa-peru",
    title: "España Completa desde Lima",
    destinations: ["Madrid", "Barcelona", "Sevilla", "Valencia"],
    days: 14,
    price: 2100,
    pricePEN: 7770,
    departure: "Lima",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "italia-peru",
    title: "Gran Tour Italia desde Lima",
    destinations: ["Roma", "Florencia", "Venecia", "Milan", "Costa Amalfitana"],
    days: 15,
    price: 2400,
    pricePEN: 8880,
    departure: "Lima",
    rating: 4.9,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "alpes-peru",
    title: "Alpes y Naturaleza Europa",
    destinations: ["Suiza", "Austria", "Bavaria", "Dolomitas"],
    days: 12,
    price: 2800,
    pricePEN: 10360,
    departure: "Lima",
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=70&w=800&auto=format&fit=crop",
  },
];

const TESTIMONIALS_PERU = [
  {
    name: "Carlos Quispe",
    city: "Lima",
    trip: "Europa Clásica 14 dias",
    text: "Excelente organizacion. Todo salio como esperabamos. Los guias en espanol fueron muy profesionales y conocedores.",
    rating: 5,
  },
  {
    name: "Maria Elena Vargas",
    city: "Arequipa",
    trip: "Luna de Miel Italia",
    text: "Nuestro viaje de luna de miel fue increíble. Los hoteles romanticos y la atencion personalizada superaron nuestras expectativas.",
    rating: 5,
  },
  {
    name: "Fernando Mendoza",
    city: "Cusco",
    trip: "España + Portugal 12 dias",
    text: "Como guia turístico en Peru, se lo que es un buen tour. Este fue de primera calidad. Los recomiendo totalmente.",
    rating: 5,
  },
];

const FAQ_PERU = [
  {
    question: "Los peruanos necesitan visa para viajar a Europa?",
    answer: "No! Desde 2016, los ciudadanos peruanos NO necesitan visa Schengen para estancias turisticas de hasta 90 dias en la zona Schengen. Solo necesitas pasaporte vigente, seguro de viaje y demostrar solvencia economica."
  },
  {
    question: "Cuanto tiempo debo tener de vigencia en mi pasaporte?",
    answer: "Tu pasaporte debe tener al menos 6 meses de vigencia desde la fecha de regreso y 2 paginas en blanco. Si tu pasaporte vence pronto, tramita la renovacion con anticipacion."
  },
  {
    question: "Que documentos debo llevar para inmigracion?",
    answer: "Lleva tu pasaporte, reserva de hotel, itinerario de viaje, pasaje de regreso, seguro de viaje con cobertura de 30,000 EUR y comprobante de solvencia economica (100 EUR/dia aproximadamente)."
  },
  {
    question: "Hay vuelos directos de Lima a Europa?",
    answer: "LATAM y otras aerolineas ofrecen vuelos con escala en ciudades como Madrid, Amsterdam o Paris. El tiempo de vuelo total es aproximadamente 14-16 horas dependiendo de la conexion."
  },
];

export default function FromPeru() {
  const { language } = useI18n();

  const content = {
    badge: { es: "Viajes desde Peru", en: "Travel from Peru" },
    h1: { es: "Viajes a Europa desde Peru", en: "Travel to Europe from Peru" },
    subtitle: { es: "Paquetes exclusivos con salidas desde Lima. SIN VISA para peruanos. Vuelos con las mejores conexiones, hoteles 4-5 estrellas, guias en espanol.", en: "Exclusive packages departing from Lima. NO VISA required for Peruvians. Flights with best connections, 4-5 star hotels, Spanish-speaking guides." },
    noVisa: { es: "SIN VISA PARA PERUANOS", en: "NO VISA FOR PERUVIANS" },
    stats: {
      travelers: { es: "800+ viajeros peruanos", en: "800+ Peruvian travelers" },
      rating: { es: "4.9 calificacion promedio", en: "4.9 average rating" },
      noVisa: { es: "Sin visa Schengen", en: "No Schengen visa required" },
    },
    cta: { es: "Cotizar Mi Viaje", en: "Quote My Trip" },
    whatsapp: { es: "WhatsApp Peru", en: "WhatsApp Peru" },
    packages: { es: "Paquetes Populares desde Peru", en: "Popular Packages from Peru" },
    testimonials: { es: "Lo que dicen nuestros viajeros peruanos", en: "What our Peruvian travelers say" },
    faq: { es: "Preguntas Frecuentes - Viajes desde Peru", en: "FAQ - Travel from Peru" },
    combo: { es: "Combina Europa + Peru", en: "Combine Europe + Peru" },
    comboText: { es: "Ofrecemos paquetes exclusivos que combinan lo mejor de Europa con experiencias únicas en Peru como Machu Picchu, Cusco y la gastronomía peruana.", en: "We offer exclusive packages combining the best of Europe with unique Peru experiences like Machu Picchu, Cusco and Peruvian gastronomy." },
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
      <Header />

      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-peru-hero">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1531968455001-5c5272a67571?q=60&w=1200&auto=format&fit=crop" 
            alt="Lima Peru" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-green-500 text-white border-green-400 mb-4" data-testid="badge-no-visa-peru">
              {t("noVisa")}
            </Badge>
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4 ml-2" data-testid="badge-peru">
              {t("badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-peru-h1">
              {t("h1")}
            </h1>
            <p className="text-xl text-white/80 mb-8" data-testid="text-peru-subtitle">
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
                <span>{content.stats.noVisa[language]}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-accent text-primary hover:bg-accent/90" 
                data-testid="button-cta-peru"
                onClick={() => openWhatsAppQuote({ es: "viajes a Europa desde Peru", en: "travel to Europe from Peru", pt: "viagens para Europa do Peru" }, language)}
              >
                {t("cta")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10" data-testid="button-whatsapp-peru">
                <MessageCircle className="mr-2 w-5 h-5" /> {t("whatsapp")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background" data-testid="section-combo-peru">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <Mountain className="w-16 h-16 text-accent" />
              <div className="flex-1">
                <h3 className="text-2xl font-display font-bold mb-2">{t("combo")}</h3>
                <p className="text-muted-foreground">{t("comboText")}</p>
              </div>
              <Link href="/packages">
                <Button className="bg-accent text-primary">
                  {language === "es" ? "Ver Combos" : "View Combos"} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-muted/30" data-testid="section-packages-peru">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" data-testid="text-packages-title-peru">
            {t("packages")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_PERU.map((pkg) => (
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
                    <span className="text-2xl font-bold text-accent">S/{pkg.pricePEN.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">${pkg.price} USD</span>
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

      <section className="py-20 bg-background" data-testid="section-testimonials-peru">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("testimonials")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_PERU.map((testimonial, index) => (
              <Card key={index} className="p-6" data-testid={`card-testimonial-peru-${index}`}>
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

      <section className="py-20 bg-muted/30" data-testid="section-faq-peru">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("faq")}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_PERU.map((faq, index) => (
              <Card key={index} className="p-6" data-testid={`card-faq-peru-${index}`}>
                <h3 className="font-display font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
      
      <LocalBusinessSchema country="Peru" city="Lima" />
      <FAQSchema questions={FAQ_PERU} />
    </div>
  );
}
