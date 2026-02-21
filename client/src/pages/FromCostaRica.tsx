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
  Building, Utensils, Camera, Compass, Leaf
} from "lucide-react";
import { FAQSchema, LocalBusinessSchema } from "@/components/SEOSchema";
import { openWhatsAppQuote } from "@/lib/whatsapp";

const PACKAGES_COSTARICA = [
  {
    id: "europa-verde-cr",
    title: "Europa Verde - Ecoturismo",
    destinations: ["Suiza", "Austria", "Noruega", "Islandia"],
    days: 14,
    price: 3400,
    departure: "San Jose",
    rating: 4.9,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=70&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "mediterraneo-cr",
    title: "Mediterraneo Clasico desde San Jose",
    destinations: ["Barcelona", "Costa Brava", "Niza", "Monaco", "Roma"],
    days: 12,
    price: 2200,
    departure: "San Jose",
    rating: 4.8,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "ciudades-imperiales-cr",
    title: "Ciudades Imperiales",
    destinations: ["Viena", "Praga", "Budapest", "Berlin"],
    days: 10,
    price: 1900,
    departure: "San Jose",
    rating: 4.9,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "islas-griegas-cr",
    title: "Islas Griegas Premium",
    destinations: ["Atenas", "Santorini", "Mykonos", "Creta"],
    days: 11,
    price: 2600,
    departure: "San Jose",
    rating: 4.9,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=70&w=800&auto=format&fit=crop",
  },
];

const TESTIMONIALS_COSTARICA = [
  {
    name: "Ana Lucia Solano",
    city: "San Jose",
    trip: "Europa Clasica 15 dias",
    text: "Pura vida! Todo estuvo perfecto. Desde el vuelo hasta los hoteles. El itinerario fue muy bien planificado.",
    rating: 5,
  },
  {
    name: "Roberto Mora",
    city: "Heredia",
    trip: "Escandinavia 12 dias",
    text: "Como amantes de la naturaleza, el tour por los fiordos noruegos fue espectacular. Muy recomendado.",
    rating: 5,
  },
  {
    name: "Carmen Jimenez",
    city: "Alajuela",
    trip: "España Total 10 dias",
    text: "Primera vez viajando a Europa y quede encantada. La organizacion fue impecable. Definitivamente repetire.",
    rating: 5,
  },
];

const FAQ_COSTARICA = [
  {
    question: "Los costarricenses necesitan visa para Europa?",
    answer: "No! Los ciudadanos costarricenses NO necesitan visa Schengen para viajes turisticos de hasta 90 dias. Solo necesitas pasaporte vigente con 6 meses de validez, seguro de viaje y comprobante de solvencia economica."
  },
  {
    question: "Hay vuelos directos de Costa Rica a Europa?",
    answer: "Actualmente no hay vuelos directos. Las mejores conexiones son via Madrid, Miami o Panama City. El tiempo total de viaje es aproximadamente 14-18 horas dependiendo de la escala."
  },
  {
    question: "Cuanto dinero debo demostrar en inmigracion?",
    answer: "Se recomienda demostrar aproximadamente 100 EUR por dia de estancia. Para un viaje de 14 dias, esto seria unos 1,400 EUR. Puedes mostrar estados de cuenta bancarios o tarjetas de credito."
  },
  {
    question: "Que seguro de viaje necesito?",
    answer: "Necesitas un seguro con cobertura medica minima de 30,000 EUR que cubra toda tu estancia en Europa. Todos nuestros paquetes incluyen seguro de viaje que cumple con estos requisitos."
  },
];

export default function FromCostaRica() {
  const { language } = useI18n();

  const content = {
    badge: { es: "Viajes desde Costa Rica", en: "Travel from Costa Rica" },
    h1: { es: "Viajes a Europa desde Costa Rica", en: "Travel to Europe from Costa Rica" },
    subtitle: { es: "Paquetes exclusivos con salidas desde San Jose. SIN VISA para ticos. Vuelos con las mejores conexiones, hoteles 4-5 estrellas, guias en espanol.", en: "Exclusive packages departing from San Jose. NO VISA required for Costa Ricans. Flights with best connections, 4-5 star hotels, Spanish-speaking guides." },
    noVisa: { es: "SIN VISA PARA TICOS", en: "NO VISA FOR COSTA RICANS" },
    stats: {
      travelers: { es: "400+ viajeros ticos", en: "400+ Costa Rican travelers" },
      rating: { es: "4.9 calificacion promedio", en: "4.9 average rating" },
      noVisa: { es: "Sin visa Schengen", en: "No Schengen visa required" },
    },
    cta: { es: "Cotizar Mi Viaje", en: "Quote My Trip" },
    whatsapp: { es: "WhatsApp Costa Rica", en: "WhatsApp Costa Rica" },
    packages: { es: "Paquetes Populares desde Costa Rica", en: "Popular Packages from Costa Rica" },
    testimonials: { es: "Lo que dicen nuestros viajeros ticos", en: "What our Costa Rican travelers say" },
    faq: { es: "Preguntas Frecuentes - Viajes desde Costa Rica", en: "FAQ - Travel from Costa Rica" },
    eco: { es: "Ecoturismo en Europa", en: "Ecotourism in Europe" },
    ecoText: { es: "Como amantes de la naturaleza, ofrecemos tours especiales de ecoturismo: fiordos noruegos, Alpes suizos, parques nacionales y turismo sostenible.", en: "As nature lovers, we offer special ecotourism tours: Norwegian fjords, Swiss Alps, national parks and sustainable tourism." },
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
      <SEOHead title="Viajes a Europa desde Costa Rica" description="Paquetes de viaje a Europa desde Costa Rica. Sin visa Schengen. Vuelos desde San Jose." />
      <Header />

      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-costarica-hero">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=60&w=1200&auto=format&fit=crop" 
            alt="Costa Rica" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-green-500 text-white border-green-400 mb-4" data-testid="badge-no-visa-cr">
              {t("noVisa")}
            </Badge>
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4 ml-2" data-testid="badge-cr">
              {t("badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-cr-h1">
              {t("h1")}
            </h1>
            <p className="text-xl text-white/80 mb-8" data-testid="text-cr-subtitle">
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
                data-testid="button-cta-cr"
                onClick={() => openWhatsAppQuote({ es: "viajes a Europa desde Costa Rica", en: "travel to Europe from Costa Rica", pt: "viagens para Europa da Costa Rica" }, language)}
              >
                {t("cta")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10" data-testid="button-whatsapp-cr">
                <MessageCircle className="mr-2 w-5 h-5" /> {t("whatsapp")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background" data-testid="section-eco-cr">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <Leaf className="w-16 h-16 text-green-600 dark:text-green-400" />
              <div className="flex-1">
                <h3 className="text-2xl font-display font-bold mb-2">{t("eco")}</h3>
                <p className="text-muted-foreground">{t("ecoText")}</p>
              </div>
              <Link href="/packages">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  {language === "es" ? "Ver Tours Eco" : "View Eco Tours"} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-muted/30" data-testid="section-packages-cr">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" data-testid="text-packages-title-cr">
            {t("packages")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_COSTARICA.map((pkg) => (
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
                    <span className="text-2xl font-bold text-accent">${pkg.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">USD</span>
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

      <section className="py-20 bg-background" data-testid="section-testimonials-cr">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("testimonials")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_COSTARICA.map((testimonial, index) => (
              <Card key={index} className="p-6" data-testid={`card-testimonial-cr-${index}`}>
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

      <section className="py-20 bg-muted/30" data-testid="section-faq-cr">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t("faq")}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_COSTARICA.map((faq, index) => (
              <Card key={index} className="p-6" data-testid={`card-faq-cr-${index}`}>
                <h3 className="font-display font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
      
      <LocalBusinessSchema country="Costa Rica" city="San Jose" />
      <FAQSchema questions={FAQ_COSTARICA} />
    </div>
  );
}
