import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, Plane, Building, Bus, Camera, CheckCircle, Shield, 
  Calendar, DollarSign, Users, ArrowRight, MapPin, Clock
} from "lucide-react";
import { Link } from "wouter";
import { FloatingContactButtons, SupportFAQSection, SupportContactSection, type FAQItem } from "@/components/support";
import { openWhatsAppQuote } from "@/lib/whatsapp";

const PACKAGE_FAQS: FAQItem[] = [
  {
    question: { es: "Que incluyen los paquetes de viaje?", en: "What do travel packages include?" },
    answer: { es: "Nuestros paquetes tipicamente incluyen: vuelos ida y vuelta, alojamiento en hoteles seleccionados, traslados aeropuerto-hotel, tours guiados, algunas comidas y seguro de viaje. El contenido especifico varia segun el paquete.", en: "Our packages typically include: round-trip flights, accommodation in selected hotels, airport-hotel transfers, guided tours, some meals, and travel insurance. Specific content varies by package." }
  },
  {
    question: { es: "Puedo personalizar un paquete?", en: "Can I customize a package?" },
    answer: { es: "Si, todos nuestros paquetes son personalizables. Puedes agregar noches adicionales, cambiar hoteles, añadir excursiones o modificar itinerarios segun tus preferencias.", en: "Yes, all our packages are customizable. You can add extra nights, change hotels, add excursions, or modify itineraries according to your preferences." }
  },
  {
    question: { es: "Los tours son en español?", en: "Are tours in Spanish?" },
    answer: { es: "Si, todos nuestros tours incluyen guias profesionales en español. En algunos casos tambien disponemos de guias bilingues.", en: "Yes, all our tours include professional Spanish-speaking guides. In some cases, we also have bilingual guides available." }
  },
  {
    question: { es: "Cual es la politica de pago?", en: "What is the payment policy?" },
    answer: { es: "Generalmente requerimos un deposito del 30% para confirmar la reserva y el saldo 30 dias antes del viaje. Ofrecemos planes de financiamiento hasta 12 cuotas.", en: "We generally require a 30% deposit to confirm the booking and the balance 30 days before the trip. We offer financing plans up to 12 installments." }
  },
  {
    question: { es: "Que pasa si necesito cancelar el viaje?", en: "What happens if I need to cancel the trip?" },
    answer: { es: "Nuestros paquetes incluyen seguro de cancelacion. Las condiciones varian segun el momento de la cancelacion y el tipo de tarifa. Consulta los terminos especificos de cada paquete.", en: "Our packages include cancellation insurance. Conditions vary according to the cancellation timing and rate type. Check the specific terms of each package." }
  },
  {
    question: { es: "Hay paquetes para grupos?", en: "Are there group packages?" },
    answer: { es: "Si, ofrecemos tarifas especiales para grupos de 10 o mas personas. Incluyen beneficios adicionales como guia privado y actividades exclusivas.", en: "Yes, we offer special rates for groups of 10 or more people. They include additional benefits such as private guide and exclusive activities." }
  }
];

const FEATURED_PACKAGES = [
  {
    id: "espana-portugal",
    name: { es: "España y Portugal Clasico", en: "Classic Spain and Portugal" },
    duration: { es: "10 dias / 9 noches", en: "10 days / 9 nights" },
    cities: ["Madrid", "Toledo", "Sevilla", "Lisboa", "Sintra"],
    price: "desde $2,490 USD",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=60&w=600",
    highlights: { es: ["Vuelos incluidos", "Hoteles 4*", "Tours guiados", "Desayunos"], en: ["Flights included", "4* Hotels", "Guided tours", "Breakfasts"] }
  },
  {
    id: "italia-clasica",
    name: { es: "Italia Clasica", en: "Classic Italy" },
    duration: { es: "12 dias / 11 noches", en: "12 days / 11 nights" },
    cities: ["Roma", "Florencia", "Venecia", "Milan"],
    price: "desde $2,890 USD",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=60&w=600",
    highlights: { es: ["Vuelos incluidos", "Hoteles 4*", "Entradas museos", "Tren alta velocidad"], en: ["Flights included", "4* Hotels", "Museum tickets", "High-speed train"] }
  },
  {
    id: "paris-londres",
    name: { es: "Paris y Londres", en: "Paris and London" },
    duration: { es: "8 dias / 7 noches", en: "8 days / 7 nights" },
    cities: ["Paris", "Londres"],
    price: "desde $2,190 USD",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=60&w=600",
    highlights: { es: ["Vuelos incluidos", "Eurostar incluido", "Tours panoramicos", "Desayunos"], en: ["Flights included", "Eurostar included", "Panoramic tours", "Breakfasts"] }
  },
];

const PACKAGE_INCLUDES = [
  { icon: Plane, name: { es: "Vuelos Internacionales", en: "International Flights" } },
  { icon: Building, name: { es: "Hoteles Seleccionados", en: "Selected Hotels" } },
  { icon: Bus, name: { es: "Traslados", en: "Transfers" } },
  { icon: Camera, name: { es: "Tours Guiados", en: "Guided Tours" } },
  { icon: Shield, name: { es: "Seguro de Viaje", en: "Travel Insurance" } },
  { icon: Users, name: { es: "Asistencia 24/7", en: "24/7 Assistance" } },
];

export default function Packages() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <section className="relative py-24 md:py-32 bg-primary overflow-hidden" data-testid="section-packages-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=60&w=1600&auto=format&fit=crop" 
            alt="Travelers exploring European city" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/95"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="w-6 h-6 text-accent" />
            <Badge className="bg-accent/20 text-accent border-accent/30" data-testid="badge-packages">
              {language === "es" ? "Todo Incluido" : "All Inclusive"}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-packages-title">
            <span className="text-accent">{language === "es" ? "Paquetes de Viaje" : "Travel Packages"}</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8" data-testid="text-packages-subtitle">
            {language === "es" 
              ? "Paquetes completos con vuelo, hotel, tours y traslados. Todo organizado para que solo te preocupes de disfrutar." 
              : "Complete packages with flight, hotel, tours, and transfers. All organized so you only worry about enjoying."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Todo incluido" : "All included"}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Financiamiento disponible" : "Financing available"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Guias en español" : "Spanish-speaking guides"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-packages-includes">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Que Incluyen Nuestros Paquetes" : "What Our Packages Include"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PACKAGE_INCLUDES.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-medium text-sm">{item.name[lang]}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-packages-featured">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Paquetes Destacados" : "Featured Packages"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_PACKAGES.map((pkg, idx) => (
              <Card key={idx} className="overflow-hidden" data-testid={`card-package-${idx}`}>
                <div className="aspect-video relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name[lang]}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-accent text-primary">{pkg.duration[lang]}</Badge>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-display font-bold text-lg mb-2">{pkg.name[lang]}</h3>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{pkg.cities.join(" - ")}</span>
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    {pkg.highlights[lang].map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-accent" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-xl font-bold text-accent">{pkg.price}</span>
                    <Button 
                      size="sm" 
                      data-testid={`button-package-${idx}`}
                      onClick={() => openWhatsAppQuote({ es: pkg.name.es, en: pkg.name.en, pt: pkg.name.pt || pkg.name.es }, language)}
                    >
                      {language === "es" ? "Cotizar" : language === "pt" ? "Orcamento" : "Quote"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-packages-benefits">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                <span className="text-accent">{language === "es" ? "Ventajas de Viajar Con Paquete" : "Benefits of Package Travel"}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <DollarSign className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{language === "es" ? "Ahorro Garantizado" : "Guaranteed Savings"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === "es" 
                          ? "Los paquetes ofrecen hasta 30% de ahorro comparado con reservar todo por separado." 
                          : "Packages offer up to 30% savings compared to booking everything separately."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{language === "es" ? "Sin Preocupaciones" : "Worry-Free"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === "es" 
                          ? "Todo esta organizado y coordinado. Solo disfrutas de tu viaje." 
                          : "Everything is organized and coordinated. You just enjoy your trip."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Shield className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{language === "es" ? "Proteccion Total" : "Full Protection"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === "es" 
                          ? "Seguro de viaje incluido y asistencia 24/7 en español." 
                          : "Travel insurance included and 24/7 Spanish-language assistance."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Calendar className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{language === "es" ? "Fechas Flexibles" : "Flexible Dates"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === "es" 
                          ? "Salidas durante todo el año. Tu eliges cuando viajar." 
                          : "Departures throughout the year. You choose when to travel."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-packages-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-accent mb-4">
            {language === "es" ? "Diseñamos Tu Paquete Ideal" : "We Design Your Ideal Package"}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {language === "es" 
              ? "Cuentanos tus preferencias y creamos un paquete a tu medida." 
              : "Tell us your preferences and we'll create a package tailored to you."}
          </p>
          <Button 
            size="lg" 
            className="bg-accent text-primary hover:bg-accent/90 gap-2" 
            data-testid="button-packages-contact"
            onClick={() => openWhatsAppQuote({ es: "paquete personalizado", en: "custom package", pt: "pacote personalizado" }, language)}
          >
            <ArrowRight className="w-5 h-5" />
            {language === "es" ? "Solicitar Cotizacion" : language === "pt" ? "Solicitar Orcamento" : "Request Quote"}
          </Button>
        </div>
      </section>

      <SupportFAQSection faqs={PACKAGE_FAQS} />
      <SupportContactSection />
      <FloatingContactButtons />

      <Footer />
    </div>
  );
}
