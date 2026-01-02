import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, Heart, Plane, Luggage, CheckCircle, AlertTriangle,
  DollarSign, Users, ArrowRight, Clock, FileText, Phone
} from "lucide-react";
import { FloatingContactButtons, SupportFAQSection, SupportContactSection, type FAQItem } from "@/components/support";
import { openWhatsAppQuote } from "@/lib/whatsapp";

const INSURANCE_FAQS: FAQItem[] = [
  {
    question: { es: "Es obligatorio el seguro de viaje para Europa?", en: "Is travel insurance mandatory for Europe?" },
    answer: { es: "Para ingresar al espacio Schengen, se recomienda contar con seguro de viaje con cobertura medica minima de 30,000 EUR. Aunque no siempre lo solicitan en la frontera, es imprescindible para tu proteccion.", en: "To enter the Schengen area, travel insurance with minimum medical coverage of 30,000 EUR is recommended. Although it's not always requested at the border, it's essential for your protection." }
  },
  {
    question: { es: "Que cubre el seguro de viaje?", en: "What does travel insurance cover?" },
    answer: { es: "Nuestros seguros cubren: gastos medicos y hospitalizacion, evacuacion y repatriacion, perdida de equipaje, cancelacion de viaje, retrasos de vuelos, responsabilidad civil y asistencia 24/7 en español.", en: "Our insurance covers: medical expenses and hospitalization, evacuation and repatriation, lost luggage, trip cancellation, flight delays, civil liability, and 24/7 Spanish-language assistance." }
  },
  {
    question: { es: "Cubren enfermedades preexistentes?", en: "Do you cover pre-existing conditions?" },
    answer: { es: "Depende del plan. Algunos planes premium incluyen cobertura limitada para condiciones preexistentes estables. Consulta las condiciones especificas antes de contratar.", en: "It depends on the plan. Some premium plans include limited coverage for stable pre-existing conditions. Check the specific conditions before purchasing." }
  },
  {
    question: { es: "Desde cuando estoy cubierto?", en: "When does my coverage start?" },
    answer: { es: "La cobertura comienza desde el momento de salida de tu pais de origen y termina al regresar. Algunos planes tambien cubren cancelaciones previas al viaje.", en: "Coverage starts from the moment of departure from your home country and ends upon return. Some plans also cover pre-trip cancellations." }
  },
  {
    question: { es: "Como hago un reclamo si tengo una emergencia?", en: "How do I file a claim if I have an emergency?" },
    answer: { es: "Contacta la linea de asistencia 24/7 incluida en tu poliza. Guarda todos los recibos y documentacion medica. Te guiaremos en todo el proceso de reclamacion.", en: "Contact the 24/7 assistance line included in your policy. Keep all receipts and medical documentation. We'll guide you through the entire claims process." }
  },
  {
    question: { es: "Puedo extender mi seguro si prolongo el viaje?", en: "Can I extend my insurance if I extend my trip?" },
    answer: { es: "Si, puedes solicitar una extension antes de que expire tu poliza actual. Contactanos para gestionar la ampliacion de cobertura.", en: "Yes, you can request an extension before your current policy expires. Contact us to manage the coverage extension." }
  }
];

const INSURANCE_PLANS = [
  {
    id: "basic",
    name: { es: "Esencial", en: "Essential" },
    coverage: "30,000 EUR",
    price: { es: "desde $2/dia", en: "from $2/day" },
    features: {
      es: ["Gastos medicos hasta 30,000 EUR", "Asistencia 24/7 en español", "Perdida de equipaje hasta 500 EUR", "Repatriacion sanitaria"],
      en: ["Medical expenses up to 30,000 EUR", "24/7 Spanish-language assistance", "Lost luggage up to 500 EUR", "Medical repatriation"]
    },
    popular: false
  },
  {
    id: "plus",
    name: { es: "Plus", en: "Plus" },
    coverage: "50,000 EUR",
    price: { es: "desde $4/dia", en: "from $4/day" },
    features: {
      es: ["Gastos medicos hasta 50,000 EUR", "Asistencia 24/7 en español", "Perdida de equipaje hasta 1,500 EUR", "Cancelacion de viaje", "Retrasos de vuelo"],
      en: ["Medical expenses up to 50,000 EUR", "24/7 Spanish-language assistance", "Lost luggage up to 1,500 EUR", "Trip cancellation", "Flight delays"]
    },
    popular: true
  },
  {
    id: "premium",
    name: { es: "Premium", en: "Premium" },
    coverage: "100,000 EUR",
    price: { es: "desde $7/dia", en: "from $7/day" },
    features: {
      es: ["Gastos medicos hasta 100,000 EUR", "Asistencia 24/7 en español", "Perdida de equipaje hasta 3,000 EUR", "Cancelacion por cualquier motivo", "Deportes de aventura", "Cobertura COVID-19"],
      en: ["Medical expenses up to 100,000 EUR", "24/7 Spanish-language assistance", "Lost luggage up to 3,000 EUR", "Cancel for any reason", "Adventure sports", "COVID-19 coverage"]
    },
    popular: false
  },
];

const COVERAGE_ITEMS = [
  { icon: Heart, name: { es: "Gastos Medicos", en: "Medical Expenses" }, description: { es: "Hospitalizacion, consultas, medicamentos", en: "Hospitalization, consultations, medications" } },
  { icon: Plane, name: { es: "Repatriacion", en: "Repatriation" }, description: { es: "Traslado de emergencia a tu pais", en: "Emergency transfer to your country" } },
  { icon: Luggage, name: { es: "Equipaje", en: "Luggage" }, description: { es: "Perdida, robo o daño de equipaje", en: "Lost, stolen, or damaged luggage" } },
  { icon: AlertTriangle, name: { es: "Cancelacion", en: "Cancellation" }, description: { es: "Cancelacion o interrupcion de viaje", en: "Trip cancellation or interruption" } },
  { icon: Clock, name: { es: "Retrasos", en: "Delays" }, description: { es: "Compensacion por retrasos de vuelo", en: "Compensation for flight delays" } },
  { icon: Phone, name: { es: "Asistencia 24/7", en: "24/7 Assistance" }, description: { es: "Linea de ayuda en español siempre", en: "Spanish help line always available" } },
];

export default function Insurance() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <section className="relative py-24 md:py-32 bg-primary overflow-hidden" data-testid="section-insurance-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=60&w=1600&auto=format&fit=crop" 
            alt="Medical professional representing travel insurance" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/95"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-accent" />
            <Badge className="bg-accent/20 text-accent border-accent/30" data-testid="badge-insurance">
              {language === "es" ? "Viaja Protegido" : "Travel Protected"}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-insurance-title">
            <span className="text-accent">{language === "es" ? "Seguros de Viaje" : "Travel Insurance"}</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8" data-testid="text-insurance-subtitle">
            {language === "es" 
              ? "Proteccion completa para tu viaje a Europa. Gastos medicos, cancelaciones, equipaje y asistencia 24/7 en español." 
              : "Complete protection for your trip to Europe. Medical expenses, cancellations, luggage, and 24/7 Spanish-language assistance."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Cobertura medica completa" : "Full medical coverage"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Asistencia 24/7 en español" : "24/7 Spanish assistance"}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Desde $2/dia" : "From $2/day"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-insurance-coverage">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Que Cubrimos" : "What We Cover"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {COVERAGE_ITEMS.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-bold text-sm mb-1">{item.name[lang]}</h3>
                <p className="text-xs text-muted-foreground">{item.description[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-insurance-plans">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Nuestros Planes" : "Our Plans"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {INSURANCE_PLANS.map((plan, idx) => (
              <Card 
                key={idx} 
                className={`relative overflow-visible ${plan.popular ? 'border-accent border-2' : ''}`}
                data-testid={`card-insurance-plan-${idx}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-primary">
                    {language === "es" ? "Mas Popular" : "Most Popular"}
                  </Badge>
                )}
                <CardContent className="pt-8 pb-6">
                  <h3 className="font-display font-bold text-xl text-center mb-2">{plan.name[lang]}</h3>
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-accent">{plan.coverage}</span>
                    <p className="text-sm text-muted-foreground">{language === "es" ? "Cobertura medica" : "Medical coverage"}</p>
                  </div>
                  <div className="text-center mb-6">
                    <span className="text-lg font-bold">{plan.price[lang]}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features[lang].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-accent text-primary hover:bg-accent/90' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                    data-testid={`button-insurance-plan-${idx}`}
                    onClick={() => openWhatsAppQuote({ es: `seguro ${plan.name.es}`, en: `${plan.name.en} insurance`, pt: `seguro ${plan.name.es}` }, language)}
                  >
                    {language === "es" ? "Cotizar" : language === "pt" ? "Orcamento" : "Quote"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-insurance-schengen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2">
                      {language === "es" ? "Requisito Schengen" : "Schengen Requirement"}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {language === "es" 
                        ? "Para viajar a los 26 paises del espacio Schengen, se recomienda contar con un seguro de viaje con cobertura medica minima de 30,000 EUR. Todos nuestros planes cumplen con este requisito." 
                        : "To travel to the 26 Schengen area countries, travel insurance with minimum medical coverage of 30,000 EUR is recommended. All our plans meet this requirement."}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span>{language === "es" ? "Cobertura minima 30,000 EUR" : "Minimum coverage 30,000 EUR"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span>{language === "es" ? "Valido en todos los paises Schengen" : "Valid in all Schengen countries"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-insurance-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-accent mb-4">
            {language === "es" ? "Viaja Con Tranquilidad" : "Travel With Peace of Mind"}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {language === "es" 
              ? "Cotiza tu seguro de viaje en minutos y viaja protegido a Europa." 
              : "Quote your travel insurance in minutes and travel protected to Europe."}
          </p>
          <Button 
            size="lg" 
            className="bg-accent text-primary hover:bg-accent/90 gap-2" 
            data-testid="button-insurance-contact"
            onClick={() => openWhatsAppQuote({ es: "seguro de viaje", en: "travel insurance", pt: "seguro de viagem" }, language)}
          >
            <ArrowRight className="w-5 h-5" />
            {language === "es" ? "Cotizar Seguro" : language === "pt" ? "Orcamento Seguro" : "Quote Insurance"}
          </Button>
        </div>
      </section>

      <SupportFAQSection faqs={INSURANCE_FAQS} />
      <SupportContactSection />
      <FloatingContactButtons />

      <Footer />
    </div>
  );
}
