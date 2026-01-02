import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Smartphone, Globe, Wifi, Check, Zap, Clock, Shield, CreditCard, MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { FloatingContactButtons, SupportFAQSection, SupportContactSection, type FAQItem } from "@/components/support";

const ESIM_FAQS: FAQItem[] = [
  {
    question: { es: "Que es una eSIM?", en: "What is an eSIM?" },
    answer: { es: "Una eSIM es una tarjeta SIM digital que te permite activar un plan de datos sin necesidad de una tarjeta fisica. Se descarga e instala directamente en tu telefono, permitiendote conectarte a internet inmediatamente al llegar a tu destino.", en: "An eSIM is a digital SIM card that allows you to activate a data plan without needing a physical card. It downloads and installs directly on your phone, allowing you to connect to the internet immediately upon arriving at your destination." }
  },
  {
    question: { es: "Mi telefono es compatible con eSIM?", en: "Is my phone eSIM compatible?" },
    answer: { es: "La mayoria de los telefonos modernos son compatibles con eSIM, incluyendo iPhone XS y posteriores, Samsung Galaxy S20 y posteriores, Google Pixel 3 y posteriores, y muchos otros. Puedes verificar en la configuracion de tu telefono si tienes la opcion de agregar un plan eSIM.", en: "Most modern phones are eSIM compatible, including iPhone XS and later, Samsung Galaxy S20 and later, Google Pixel 3 and later, and many others. You can check in your phone settings if you have the option to add an eSIM plan." }
  },
  {
    question: { es: "Como activo mi eSIM?", en: "How do I activate my eSIM?" },
    answer: { es: "Despues de la compra, recibiras un codigo QR por email. Simplemente escanea el codigo con tu telefono, sigue las instrucciones de instalacion y tu eSIM estara lista para usar. Recomendamos instalarla antes de viajar.", en: "After purchase, you'll receive a QR code by email. Simply scan the code with your phone, follow the installation instructions, and your eSIM will be ready to use. We recommend installing it before traveling." }
  },
  {
    question: { es: "Puedo usar mi numero de telefono local con la eSIM?", en: "Can I use my local phone number with the eSIM?" },
    answer: { es: "Si, tu eSIM funciona junto con tu SIM fisica. Puedes mantener tu numero local para llamadas y mensajes mientras usas la eSIM para datos en Europa. Tu telefono puede manejar ambas SIM simultaneamente.", en: "Yes, your eSIM works alongside your physical SIM. You can keep your local number for calls and messages while using the eSIM for data in Europe. Your phone can handle both SIMs simultaneously." }
  },
  {
    question: { es: "Que paises cubre la eSIM para Europa?", en: "Which countries does the Europe eSIM cover?" },
    answer: { es: "Nuestra eSIM para Europa cubre los 27 paises de la Union Europea mas Suiza, Noruega, Islandia, Reino Unido y otros. Incluye cobertura en Francia, Italia, España, Alemania, Portugal, Grecia, Paises Bajos, Austria, Belgica y mas.", en: "Our Europe eSIM covers all 27 EU countries plus Switzerland, Norway, Iceland, United Kingdom, and others. It includes coverage in France, Italy, Spain, Germany, Portugal, Greece, Netherlands, Austria, Belgium, and more." }
  },
  {
    question: { es: "Que pasa si me quedo sin datos?", en: "What happens if I run out of data?" },
    answer: { es: "Si agotas tus datos, puedes comprar facilmente un paquete adicional a traves de nuestra plataforma. Recibiras un nuevo codigo QR para agregar mas datos a tu eSIM existente.", en: "If you run out of data, you can easily purchase an additional package through our platform. You'll receive a new QR code to add more data to your existing eSIM." }
  }
];

const ESIM_PLANS = [
  {
    id: "basic",
    name: { es: "Esencial", en: "Essential" },
    data: "3 GB",
    duration: { es: "7 dias", en: "7 days" },
    price: 19,
    features: { 
      es: ["Cobertura en 30+ paises", "Activacion instantanea", "Soporte 24/7"], 
      en: ["Coverage in 30+ countries", "Instant activation", "24/7 support"] 
    },
    popular: false
  },
  {
    id: "standard",
    name: { es: "Viajero", en: "Traveler" },
    data: "5 GB",
    duration: { es: "15 dias", en: "15 days" },
    price: 29,
    features: { 
      es: ["Cobertura en 30+ paises", "Activacion instantanea", "Soporte 24/7", "Hotspot compartido"], 
      en: ["Coverage in 30+ countries", "Instant activation", "24/7 support", "Hotspot sharing"] 
    },
    popular: true
  },
  {
    id: "premium",
    name: { es: "Explorer", en: "Explorer" },
    data: "10 GB",
    duration: { es: "30 dias", en: "30 days" },
    price: 49,
    features: { 
      es: ["Cobertura en 30+ paises", "Activacion instantanea", "Soporte 24/7", "Hotspot compartido", "Recarga ilimitada"], 
      en: ["Coverage in 30+ countries", "Instant activation", "24/7 support", "Hotspot sharing", "Unlimited top-up"] 
    },
    popular: false
  },
  {
    id: "unlimited",
    name: { es: "Ilimitado", en: "Unlimited" },
    data: { es: "Datos Ilimitados", en: "Unlimited Data" },
    duration: { es: "30 dias", en: "30 days" },
    price: 79,
    features: { 
      es: ["Cobertura en 30+ paises", "Activacion instantanea", "Soporte 24/7", "Hotspot compartido", "Velocidad maxima"], 
      en: ["Coverage in 30+ countries", "Instant activation", "24/7 support", "Hotspot sharing", "Maximum speed"] 
    },
    popular: false
  }
];

const COVERED_COUNTRIES = [
  "Alemania", "Austria", "Belgica", "Bulgaria", "Chipre", "Croacia", "Dinamarca", "Eslovaquia", 
  "Eslovenia", "España", "Estonia", "Finlandia", "Francia", "Grecia", "Hungria", "Irlanda", 
  "Islandia", "Italia", "Letonia", "Liechtenstein", "Lituania", "Luxemburgo", "Malta", "Noruega", 
  "Paises Bajos", "Polonia", "Portugal", "Reino Unido", "Republica Checa", "Rumania", "Suecia", "Suiza"
];

export default function ESim() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <section className="relative py-24 md:py-32 bg-primary overflow-hidden" data-testid="section-esim-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=60&w=1600&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/95"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Smartphone className="w-6 h-6 text-accent" />
            <Badge className="bg-accent/20 text-accent border-accent/30" data-testid="badge-esim">
              {language === "es" ? "Conectividad Digital" : "Digital Connectivity"}
            </Badge>
            <Wifi className="w-6 h-6 text-accent" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-esim-title">
            <span className="text-accent">{language === "es" ? "eSIM Para Europa" : "eSIM For Europe"}</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8" data-testid="text-esim-subtitle">
            {language === "es" 
              ? "Mantente conectado durante tu viaje por Europa con nuestra eSIM. Activa datos instantaneos en mas de 30 paises sin necesidad de cambiar tu tarjeta SIM." 
              : "Stay connected during your trip through Europe with our eSIM. Activate instant data in over 30 countries without needing to change your SIM card."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Activacion instantanea" : "Instant activation"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "30+ paises europeos" : "30+ European countries"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Sin roaming" : "No roaming"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Pago seguro" : "Secure payment"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-esim-benefits">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Por Que Elegir Nuestra eSIM?" : "Why Choose Our eSIM?"}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Olvida los problemas de conectividad. Con nuestra eSIM, tienes internet de alta velocidad desde el momento que aterrizas." 
                : "Forget connectivity problems. With our eSIM, you have high-speed internet from the moment you land."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{language === "es" ? "Activacion Inmediata" : "Instant Activation"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" 
                    ? "Escanea el codigo QR y conectate en minutos. Sin esperas, sin tiendas." 
                    : "Scan the QR code and connect in minutes. No waiting, no stores."}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{language === "es" ? "Cobertura Total" : "Total Coverage"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" 
                    ? "Funciona en mas de 30 paises europeos con una sola eSIM." 
                    : "Works in over 30 European countries with a single eSIM."}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{language === "es" ? "Dual SIM" : "Dual SIM"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" 
                    ? "Mantiene tu numero local activo mientras usas datos en Europa." 
                    : "Keep your local number active while using data in Europe."}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{language === "es" ? "Soporte 24/7" : "24/7 Support"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" 
                    ? "Asistencia en espanol disponible a cualquier hora del dia." 
                    : "Spanish-language assistance available at any time of day."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-esim-plans">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Nuestros Planes de eSIM" : "Our eSIM Plans"}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Elige el plan que mejor se adapte a la duracion y necesidades de tu viaje." 
                : "Choose the plan that best fits the duration and needs of your trip."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ESIM_PLANS.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative overflow-visible ${plan.popular ? 'border-accent border-2' : ''}`}
                data-testid={`card-plan-${plan.id}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-primary">
                    {language === "es" ? "Mas Popular" : "Most Popular"}
                  </Badge>
                )}
                <CardContent className="pt-8 pb-6">
                  <h3 className="font-display font-bold text-xl text-center mb-2">{plan.name[lang]}</h3>
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-accent">
                      {typeof plan.data === "string" ? plan.data : plan.data[lang]}
                    </span>
                    <p className="text-sm text-muted-foreground">{plan.duration[lang]}</p>
                  </div>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground"> USD</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features[lang].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-accent text-primary hover:bg-accent/90' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                    data-testid={`button-plan-${plan.id}`}
                  >
                    {language === "es" ? "Comprar Ahora" : "Buy Now"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-esim-coverage">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Paises Con Cobertura" : "Countries With Coverage"}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Nuestra eSIM funciona en toda Europa. Una sola tarjeta para todos tus destinos." 
                : "Our eSIM works throughout Europe. One card for all your destinations."}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {COVERED_COUNTRIES.map((country, idx) => (
              <Badge key={idx} variant="secondary" className="text-sm py-1 px-3">
                <MapPin className="w-3 h-3 mr-1" />
                {country}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-esim-howto">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              {language === "es" ? "Como Funciona" : "How It Works"}
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              {language === "es" 
                ? "En solo 3 sencillos pasos tendras internet en Europa." 
                : "In just 3 simple steps you'll have internet in Europe."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center text-primary text-2xl font-bold">
                1
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">
                {language === "es" ? "Elige tu Plan" : "Choose Your Plan"}
              </h3>
              <p className="text-white/70 text-sm">
                {language === "es" 
                  ? "Selecciona el plan que mejor se adapte a tu viaje y duracion." 
                  : "Select the plan that best fits your trip and duration."}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center text-primary text-2xl font-bold">
                2
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">
                {language === "es" ? "Recibe el QR" : "Receive the QR"}
              </h3>
              <p className="text-white/70 text-sm">
                {language === "es" 
                  ? "Recibiras un codigo QR por email inmediatamente despues del pago." 
                  : "You'll receive a QR code by email immediately after payment."}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center text-primary text-2xl font-bold">
                3
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">
                {language === "es" ? "Conectate" : "Connect"}
              </h3>
              <p className="text-white/70 text-sm">
                {language === "es" 
                  ? "Escanea el QR con tu telefono y disfruta de internet en Europa." 
                  : "Scan the QR with your phone and enjoy internet in Europe."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SupportFAQSection faqs={ESIM_FAQS} />
      <SupportContactSection />
      <FloatingContactButtons />

      <Footer />
    </div>
  );
}
