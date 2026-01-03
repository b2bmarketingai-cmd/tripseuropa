import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Camera, MapPin, Clock, Users, CheckCircle, Shield, 
  Calendar, Star, ArrowRight, Compass, Heart, Sparkles
} from "lucide-react";
import { Link } from "wouter";
import { FloatingContactButtons, SupportFAQSection, SupportContactSection, type FAQItem } from "@/components/support";

const TOUR_FAQS: FAQItem[] = [
  {
    question: { es: "Los tours son en español?", en: "Are tours in Spanish?", pt: "Os tours sao em portugues?" },
    answer: { es: "Si, todos nuestros tours tienen guias profesionales que hablan español. En algunos destinos ofrecemos guias bilingues o grupos exclusivos en español.", en: "Yes, all our tours have professional Spanish-speaking guides. In some destinations, we offer bilingual guides or exclusive Spanish-speaking groups.", pt: "Sim, todos os nossos tours tem guias profissionais. Em alguns destinos, oferecemos guias bilingues ou grupos exclusivos." }
  },
  {
    question: { es: "Cual es el tamaño tipico de los grupos?", en: "What is the typical group size?", pt: "Qual e o tamanho tipico dos grupos?" },
    answer: { es: "Nuestros tours regulares tienen grupos de 15-25 personas. Tambien ofrecemos tours privados para parejas, familias o grupos pequeños.", en: "Our regular tours have groups of 15-25 people. We also offer private tours for couples, families, or small groups.", pt: "Nossos tours regulares tem grupos de 15-25 pessoas. Tambem oferecemos tours privados para casais, familias ou pequenos grupos." }
  },
  {
    question: { es: "Que incluyen los tours?", en: "What do tours include?", pt: "O que os tours incluem?" },
    answer: { es: "Los tours incluyen guia en español, transporte segun el itinerario, entradas a monumentos especificados y seguro. Algunos incluyen comidas.", en: "Tours include Spanish-speaking guide, transportation as per itinerary, entrance fees to specified monuments, and insurance. Some include meals.", pt: "Os tours incluem guia, transporte conforme o itinerario, entradas para monumentos especificados e seguro. Alguns incluem refeicoes." }
  },
  {
    question: { es: "Puedo reservar un tour privado?", en: "Can I book a private tour?", pt: "Posso reservar um tour privado?" },
    answer: { es: "Si, ofrecemos tours privados con guia exclusivo. Es ideal para familias, parejas o grupos de amigos que prefieren flexibilidad en horarios y ritmo.", en: "Yes, we offer private tours with an exclusive guide. Ideal for families, couples, or groups of friends who prefer flexibility in schedules and pace.", pt: "Sim, oferecemos tours privados com guia exclusivo. Ideal para familias, casais ou grupos de amigos que preferem flexibilidade em horarios e ritmo." }
  },
  {
    question: { es: "Hay tours para personas con movilidad reducida?", en: "Are there tours for people with reduced mobility?", pt: "Ha tours para pessoas com mobilidade reduzida?" },
    answer: { es: "Si, tenemos tours adaptados y podemos organizar itinerarios especiales. Informanos con anticipacion para preparar la mejor experiencia.", en: "Yes, we have adapted tours and can organize special itineraries. Let us know in advance to prepare the best experience.", pt: "Sim, temos tours adaptados e podemos organizar itinerarios especiais. Avise-nos com antecedencia para preparar a melhor experiencia." }
  },
  {
    question: { es: "Que pasa si llueve el dia del tour?", en: "What happens if it rains on the tour day?", pt: "O que acontece se chover no dia do tour?" },
    answer: { es: "Los tours se realizan llueva o haga sol, excepto en condiciones extremas. En ese caso, se ofrece reprogramacion o reembolso.", en: "Tours run rain or shine, except in extreme conditions. In that case, rescheduling or refund is offered.", pt: "Os tours sao realizados com chuva ou sol, exceto em condicoes extremas. Nesse caso, oferecemos remarcacao ou reembolso." }
  }
];

const TOUR_TYPES = [
  {
    id: "panoramic",
    name: { es: "Tours Panoramicos", en: "Panoramic Tours", pt: "Tours Panoramicos" },
    description: { es: "Conoce lo esencial de cada ciudad en pocas horas", en: "Discover the essentials of each city in a few hours", pt: "Conheca o essencial de cada cidade em poucas horas" },
    duration: { es: "2-4 horas", en: "2-4 hours", pt: "2-4 horas" },
    icon: Camera,
    examples: ["City tour Paris", "Roma Imperial", "Barcelona Gaudi"]
  },
  {
    id: "daytrips",
    name: { es: "Excursiones de Dia", en: "Day Trips", pt: "Passeios de Um Dia" },
    description: { es: "Escapa de la ciudad y descubre lugares cercanos", en: "Escape the city and discover nearby places", pt: "Escape da cidade e descubra lugares proximos" },
    duration: { es: "6-10 horas", en: "6-10 hours", pt: "6-10 horas" },
    icon: Compass,
    examples: ["Versalles", "Toledo", "Pompeya", "Stonehenge"]
  },
  {
    id: "gastro",
    name: { es: "Tours Gastronomicos", en: "Food Tours", pt: "Tours Gastronomicos" },
    description: { es: "Degusta la mejor cocina local con expertos", en: "Taste the best local cuisine with experts", pt: "Deguste a melhor culinaria local com especialistas" },
    duration: { es: "3-4 horas", en: "3-4 hours", pt: "3-4 horas" },
    icon: Heart,
    examples: ["Tapas Madrid", "Pasta Roma", "Quesos Amsterdam"]
  },
  {
    id: "night",
    name: { es: "Tours Nocturnos", en: "Night Tours", pt: "Tours Noturnos" },
    description: { es: "Descubre la magia de las ciudades iluminadas", en: "Discover the magic of illuminated cities", pt: "Descubra a magia das cidades iluminadas" },
    duration: { es: "2-3 horas", en: "2-3 hours", pt: "2-3 horas" },
    icon: Sparkles,
    examples: ["Paris de noche", "Roma iluminada", "Pub crawl Londres"]
  },
];

const POPULAR_TOURS = [
  {
    name: { es: "Louvre Sin Colas", en: "Louvre Skip-the-Line", pt: "Louvre Sem Filas" },
    city: "Paris",
    duration: "3h",
    rating: 4.9,
    price: { es: "desde €65", en: "from €65", pt: "a partir de €65" }
  },
  {
    name: { es: "Vaticano Completo", en: "Complete Vatican", pt: "Vaticano Completo" },
    city: "Roma",
    duration: "4h",
    rating: 4.8,
    price: { es: "desde €75", en: "from €75", pt: "a partir de €75" }
  },
  {
    name: { es: "Sagrada Familia", en: "Sagrada Familia", pt: "Sagrada Familia" },
    city: "Barcelona",
    duration: "2h",
    rating: 4.9,
    price: { es: "desde €55", en: "from €55", pt: "a partir de €55" }
  },
  {
    name: { es: "Anne Frank + Canales", en: "Anne Frank + Canals", pt: "Anne Frank + Canais" },
    city: "Amsterdam",
    duration: "4h",
    rating: 4.7,
    price: { es: "desde €60", en: "from €60", pt: "a partir de €60" }
  },
  {
    name: { es: "Castillo de Praga", en: "Prague Castle", pt: "Castelo de Praga" },
    city: "Praga",
    duration: "3h",
    rating: 4.8,
    price: { es: "desde €45", en: "from €45", pt: "a partir de €45" }
  },
  {
    name: { es: "Tower of London", en: "Tower of London", pt: "Torre de Londres" },
    city: { es: "Londres", en: "London", pt: "Londres" },
    duration: "3h",
    rating: 4.8,
    price: { es: "desde €70", en: "from €70", pt: "a partir de €70" }
  },
];

export default function Tours() {
  const { language } = useI18n();
  const lang = language as "es" | "en" | "pt";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <section className="relative py-24 md:py-32 bg-primary overflow-hidden" data-testid="section-tours-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1499678329028-101435549a4e?q=60&w=1600&auto=format&fit=crop" 
            alt="Tour guide with tourists in European city" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/95"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Camera className="w-6 h-6 text-accent" />
            <Badge className="bg-accent/20 text-accent border-accent/30" data-testid="badge-tours">
              {language === "es" ? "Experiencias Guiadas" : language === "pt" ? "Experiencias Guiadas" : "Guided Experiences"}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-tours-title">
            <span className="text-accent">{language === "es" ? "Tours y Excursiones" : language === "pt" ? "Tours e Excursoes" : "Tours and Excursions"}</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8" data-testid="text-tours-subtitle">
            {language === "es" 
              ? "Descubre Europa con guias expertos en español. Desde tours panoramicos hasta experiencias gastronomicas unicas." 
              : language === "pt"
              ? "Descubra a Europa com guias especializados. Desde tours panoramicos ate experiencias gastronomicas unicas."
              : "Discover Europe with expert Spanish-speaking guides. From panoramic tours to unique gastronomic experiences."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Guias en español" : language === "pt" ? "Guias em portugues" : "Spanish-speaking guides"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Acceso sin colas" : language === "pt" ? "Acesso sem filas" : "Skip-the-line access"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "+4.8 estrellas promedio" : language === "pt" ? "+4.8 estrelas em media" : "+4.8 average stars"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-tours-types">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Tipos de Tours" : language === "pt" ? "Tipos de Tours" : "Types of Tours"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOUR_TYPES.map((type, idx) => (
              <Card key={idx} data-testid={`card-tour-type-${idx}`}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <type.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{type.name[lang]}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{type.description[lang]}</p>
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>{type.duration[lang]}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {type.examples.map((ex, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{ex}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-tours-popular">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Tours Mas Populares" : language === "pt" ? "Tours Mais Populares" : "Most Popular Tours"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_TOURS.map((tour, idx) => {
              const tourName = typeof tour.name === 'string' ? tour.name : (tour.name as any)[language] || (tour.name as any).es;
              const tourCity = typeof tour.city === 'string' ? tour.city : (tour.city as any)[language] || (tour.city as any).es;
              const tourPrice = typeof tour.price === 'string' ? tour.price : (tour.price as any)[language] || (tour.price as any).es;
              return (
              <Card key={idx} data-testid={`card-popular-tour-${idx}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold">{tourName}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {tourCity}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-bold">{tour.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <span className="font-bold text-accent">{tourPrice}</span>
                  </div>
                </CardContent>
              </Card>
            );})}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-tours-benefits">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                <span className="text-accent">{language === "es" ? "Por Que Elegir Nuestros Tours" : language === "pt" ? "Por Que Escolher Nossos Tours" : "Why Choose Our Tours"}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold mb-2">{language === "es" ? "Guias Expertos" : language === "pt" ? "Guias Especialistas" : "Expert Guides"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" 
                    ? "Guias locales certificados que hablan español y conocen cada rincon." 
                    : language === "pt"
                    ? "Guias locais certificados que conhecem cada canto."
                    : "Certified local guides who speak Spanish and know every corner."}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold mb-2">{language === "es" ? "Acceso Prioritario" : language === "pt" ? "Acesso Prioritario" : "Priority Access"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" 
                    ? "Evita las colas con entradas reservadas a los principales monumentos." 
                    : language === "pt"
                    ? "Evite filas com ingressos reservados para os principais monumentos."
                    : "Skip the lines with reserved tickets to major monuments."}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold mb-2">{language === "es" ? "Cancelacion Flexible" : language === "pt" ? "Cancelamento Flexivel" : "Flexible Cancellation"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" 
                    ? "Cancela gratis hasta 24h antes sin penalizacion." 
                    : language === "pt"
                    ? "Cancele gratuitamente ate 24h antes sem penalidade."
                    : "Cancel free up to 24h before without penalty."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-tours-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-accent mb-4">
            {language === "es" ? "Reserva Tu Tour" : language === "pt" ? "Reserve Seu Tour" : "Book Your Tour"}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {language === "es" 
              ? "Te ayudamos a elegir los mejores tours para tu viaje a Europa." 
              : language === "pt"
              ? "Ajudamos voce a escolher os melhores tours para sua viagem a Europa."
              : "We help you choose the best tours for your trip to Europe."}
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 gap-2" data-testid="button-tours-contact">
              <ArrowRight className="w-5 h-5" />
              {language === "es" ? "Consultar Tours" : language === "pt" ? "Consultar Tours" : "Inquire Tours"}
            </Button>
          </Link>
        </div>
      </section>

      <SupportFAQSection faqs={TOUR_FAQS} />
      <SupportContactSection />
      <FloatingContactButtons />

      <Footer />
    </div>
  );
}
