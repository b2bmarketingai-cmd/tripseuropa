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
    question: { es: "Que es una eSIM?", en: "What is an eSIM?", pt: "O que e um eSIM?" },
    answer: { es: "Una eSIM es una tarjeta SIM digital que te permite activar un plan de datos sin necesidad de una tarjeta fisica. Se descarga e instala directamente en tu telefono, permitiendote conectarte a internet inmediatamente al llegar a tu destino.", en: "An eSIM is a digital SIM card that allows you to activate a data plan without needing a physical card. It downloads and installs directly on your phone, allowing you to connect to the internet immediately upon arriving at your destination.", pt: "Um eSIM e um cartao SIM digital que permite ativar um plano de dados sem precisar de um cartao fisico. Ele e baixado e instalado diretamente no seu celular, permitindo que voce se conecte a internet imediatamente ao chegar ao seu destino." }
  },
  {
    question: { es: "Mi telefono es compatible con eSIM?", en: "Is my phone eSIM compatible?", pt: "Meu celular e compativel com eSIM?" },
    answer: { es: "La mayoria de los telefonos modernos son compatibles con eSIM, incluyendo iPhone XS y posteriores, Samsung Galaxy S20 y posteriores, Google Pixel 3 y posteriores, y muchos otros. Puedes verificar en la configuracion de tu telefono si tienes la opcion de agregar un plan eSIM.", en: "Most modern phones are eSIM compatible, including iPhone XS and later, Samsung Galaxy S20 and later, Google Pixel 3 and later, and many others. You can check in your phone settings if you have the option to add an eSIM plan.", pt: "A maioria dos celulares modernos sao compativeis com eSIM, incluindo iPhone XS e posteriores, Samsung Galaxy S20 e posteriores, Google Pixel 3 e posteriores, e muitos outros. Voce pode verificar nas configuracoes do seu celular se tem a opcao de adicionar um plano eSIM." }
  },
  {
    question: { es: "Como activo mi eSIM?", en: "How do I activate my eSIM?", pt: "Como ativo meu eSIM?" },
    answer: { es: "Despues de la compra, recibiras un codigo QR por email. Simplemente escanea el codigo con tu telefono, sigue las instrucciones de instalacion y tu eSIM estara lista para usar. Recomendamos instalarla antes de viajar.", en: "After purchase, you'll receive a QR code by email. Simply scan the code with your phone, follow the installation instructions, and your eSIM will be ready to use. We recommend installing it before traveling.", pt: "Apos a compra, voce recebera um codigo QR por email. Simplesmente escaneie o codigo com seu celular, siga as instrucoes de instalacao e seu eSIM estara pronto para usar. Recomendamos instala-lo antes de viajar." }
  },
  {
    question: { es: "Puedo usar mi numero de telefono local con la eSIM?", en: "Can I use my local phone number with the eSIM?", pt: "Posso usar meu numero de telefone local com o eSIM?" },
    answer: { es: "Si, tu eSIM funciona junto con tu SIM fisica. Puedes mantener tu numero local para llamadas y mensajes mientras usas la eSIM para datos en Europa. Tu telefono puede manejar ambas SIM simultaneamente.", en: "Yes, your eSIM works alongside your physical SIM. You can keep your local number for calls and messages while using the eSIM for data in Europe. Your phone can handle both SIMs simultaneously.", pt: "Sim, seu eSIM funciona junto com seu SIM fisico. Voce pode manter seu numero local para ligacoes e mensagens enquanto usa o eSIM para dados na Europa. Seu celular pode gerenciar ambos os SIMs simultaneamente." }
  },
  {
    question: { es: "Que paises cubre la eSIM para Europa?", en: "Which countries does the Europe eSIM cover?", pt: "Quais paises o eSIM para Europa cobre?" },
    answer: { es: "Nuestra eSIM para Europa cubre los 27 paises de la Union Europea mas Suiza, Noruega, Islandia, Reino Unido y otros. Incluye cobertura en Francia, Italia, España, Alemania, Portugal, Grecia, Paises Bajos, Austria, Belgica y mas.", en: "Our Europe eSIM covers all 27 EU countries plus Switzerland, Norway, Iceland, United Kingdom, and others. It includes coverage in France, Italy, Spain, Germany, Portugal, Greece, Netherlands, Austria, Belgium, and more.", pt: "Nosso eSIM para Europa cobre os 27 paises da Uniao Europeia mais Suica, Noruega, Islandia, Reino Unido e outros. Inclui cobertura na Franca, Italia, Espanha, Alemanha, Portugal, Grecia, Holanda, Austria, Belgica e mais." }
  },
  {
    question: { es: "Que pasa si me quedo sin datos?", en: "What happens if I run out of data?", pt: "O que acontece se eu ficar sem dados?" },
    answer: { es: "Si agotas tus datos, puedes comprar facilmente un paquete adicional a traves de nuestra plataforma. Recibiras un nuevo codigo QR para agregar mas datos a tu eSIM existente.", en: "If you run out of data, you can easily purchase an additional package through our platform. You'll receive a new QR code to add more data to your existing eSIM.", pt: "Se voce esgotar seus dados, pode facilmente comprar um pacote adicional atraves da nossa plataforma. Voce recebera um novo codigo QR para adicionar mais dados ao seu eSIM existente." }
  }
];

const ESIM_PLANS = [
  {
    id: "basic",
    name: { es: "Esencial", en: "Essential", pt: "Essencial" },
    data: "3 GB",
    duration: { es: "7 dias", en: "7 days", pt: "7 dias" },
    price: 19,
    features: { 
      es: ["Cobertura en 30+ paises", "Activacion instantanea", "Soporte 24/7"], 
      en: ["Coverage in 30+ countries", "Instant activation", "24/7 support"],
      pt: ["Cobertura em 30+ paises", "Ativacao instantanea", "Suporte 24/7"]
    },
    popular: false
  },
  {
    id: "standard",
    name: { es: "Viajero", en: "Traveler", pt: "Viajante" },
    data: "5 GB",
    duration: { es: "15 dias", en: "15 days", pt: "15 dias" },
    price: 29,
    features: { 
      es: ["Cobertura en 30+ paises", "Activacion instantanea", "Soporte 24/7", "Hotspot compartido"], 
      en: ["Coverage in 30+ countries", "Instant activation", "24/7 support", "Hotspot sharing"],
      pt: ["Cobertura em 30+ paises", "Ativacao instantanea", "Suporte 24/7", "Compartilhamento de hotspot"]
    },
    popular: true
  },
  {
    id: "premium",
    name: { es: "Explorer", en: "Explorer", pt: "Explorer" },
    data: "10 GB",
    duration: { es: "30 dias", en: "30 days", pt: "30 dias" },
    price: 49,
    features: { 
      es: ["Cobertura en 30+ paises", "Activacion instantanea", "Soporte 24/7", "Hotspot compartido", "Recarga ilimitada"], 
      en: ["Coverage in 30+ countries", "Instant activation", "24/7 support", "Hotspot sharing", "Unlimited top-up"],
      pt: ["Cobertura em 30+ paises", "Ativacao instantanea", "Suporte 24/7", "Compartilhamento de hotspot", "Recarga ilimitada"]
    },
    popular: false
  },
  {
    id: "unlimited",
    name: { es: "Ilimitado", en: "Unlimited", pt: "Ilimitado" },
    data: { es: "Datos Ilimitados", en: "Unlimited Data", pt: "Dados Ilimitados" },
    duration: { es: "30 dias", en: "30 days", pt: "30 dias" },
    price: 79,
    features: { 
      es: ["Cobertura en 30+ paises", "Activacion instantanea", "Soporte 24/7", "Hotspot compartido", "Velocidad maxima"], 
      en: ["Coverage in 30+ countries", "Instant activation", "24/7 support", "Hotspot sharing", "Maximum speed"],
      pt: ["Cobertura em 30+ paises", "Ativacao instantanea", "Suporte 24/7", "Compartilhamento de hotspot", "Velocidade maxima"]
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
  const lang = language as "es" | "en" | "pt";
  const dataLang = (language === "pt" ? "es" : language) as "es" | "en";

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
              {language === "es" ? "Conectividad Digital" : language === "pt" ? "Conectividade Digital" : "Digital Connectivity"}
            </Badge>
            <Wifi className="w-6 h-6 text-accent" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-esim-title">
            <span className="text-accent">{language === "es" ? "eSIM Para Europa" : language === "pt" ? "eSIM Para Europa" : "eSIM For Europe"}</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8" data-testid="text-esim-subtitle">
            {language === "es" 
              ? "Mantente conectado durante tu viaje por Europa con nuestra eSIM. Activa datos instantaneos en mas de 30 paises sin necesidad de cambiar tu tarjeta SIM." 
              : language === "pt"
              ? "Mantenha-se conectado durante sua viagem pela Europa com nosso eSIM. Ative dados instantaneos em mais de 30 paises sem precisar trocar seu cartao SIM."
              : "Stay connected during your trip through Europe with our eSIM. Activate instant data in over 30 countries without needing to change your SIM card."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Activacion instantanea" : language === "pt" ? "Ativacao instantanea" : "Instant activation"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "30+ paises europeos" : language === "pt" ? "30+ paises europeus" : "30+ European countries"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Sin roaming" : language === "pt" ? "Sem roaming" : "No roaming"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Pago seguro" : language === "pt" ? "Pagamento seguro" : "Secure payment"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-esim-benefits">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Por Que Elegir Nuestra eSIM?" : language === "pt" ? "Por Que Escolher Nosso eSIM?" : "Why Choose Our eSIM?"}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Olvida los problemas de conectividad. Con nuestra eSIM, tienes internet de alta velocidad desde el momento que aterrizas." 
                : language === "pt"
                ? "Esqueca os problemas de conectividade. Com nosso eSIM, voce tem internet de alta velocidade desde o momento que aterrissa."
                : "Forget connectivity problems. With our eSIM, you have high-speed internet from the moment you land."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{language === "es" ? "Activacion Inmediata" : language === "pt" ? "Ativacao Imediata" : "Instant Activation"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" 
                    ? "Escanea el codigo QR y conectate en minutos. Sin esperas, sin tiendas." 
                    : language === "pt"
                    ? "Escaneie o codigo QR e conecte-se em minutos. Sem esperas, sem lojas."
                    : "Scan the QR code and connect in minutes. No waiting, no stores."}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{language === "es" ? "Cobertura Total" : language === "pt" ? "Cobertura Total" : "Total Coverage"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" 
                    ? "Funciona en mas de 30 paises europeos con una sola eSIM." 
                    : language === "pt"
                    ? "Funciona em mais de 30 paises europeus com um unico eSIM."
                    : "Works in over 30 European countries with a single eSIM."}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{language === "es" ? "Dual SIM" : language === "pt" ? "Dual SIM" : "Dual SIM"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" 
                    ? "Mantiene tu numero local activo mientras usas datos en Europa." 
                    : language === "pt"
                    ? "Mantenha seu numero local ativo enquanto usa dados na Europa."
                    : "Keep your local number active while using data in Europe."}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{language === "es" ? "Soporte 24/7" : language === "pt" ? "Suporte 24/7" : "24/7 Support"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" 
                    ? "Asistencia en espanol disponible a cualquier hora del dia." 
                    : language === "pt"
                    ? "Assistencia em portugues disponivel a qualquer hora do dia."
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
              <span className="text-accent">{language === "es" ? "Nuestros Planes de eSIM" : language === "pt" ? "Nossos Planos de eSIM" : "Our eSIM Plans"}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Elige el plan que mejor se adapte a la duracion y necesidades de tu viaje." 
                : language === "pt"
                ? "Escolha o plano que melhor se adapta a duracao e necessidades da sua viagem."
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
                    {language === "es" ? "Mas Popular" : language === "pt" ? "Mais Popular" : "Most Popular"}
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
                    {language === "es" ? "Comprar Ahora" : language === "pt" ? "Comprar Agora" : "Buy Now"}
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
              <span className="text-accent">{language === "es" ? "Paises Con Cobertura" : language === "pt" ? "Paises Com Cobertura" : "Countries With Coverage"}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Nuestra eSIM funciona en toda Europa. Una sola tarjeta para todos tus destinos." 
                : language === "pt"
                ? "Nosso eSIM funciona em toda a Europa. Um unico cartao para todos os seus destinos."
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
              {language === "es" ? "Como Funciona" : language === "pt" ? "Como Funciona" : "How It Works"}
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              {language === "es" 
                ? "En solo 3 sencillos pasos tendras internet en Europa." 
                : language === "pt"
                ? "Em apenas 3 passos simples voce tera internet na Europa."
                : "In just 3 simple steps you'll have internet in Europe."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center text-primary text-2xl font-bold">
                1
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">
                {language === "es" ? "Elige tu Plan" : language === "pt" ? "Escolha seu Plano" : "Choose Your Plan"}
              </h3>
              <p className="text-white/70 text-sm">
                {language === "es" 
                  ? "Selecciona el plan que mejor se adapte a tu viaje y duracion." 
                  : language === "pt"
                  ? "Selecione o plano que melhor se adapta a sua viagem e duracao."
                  : "Select the plan that best fits your trip and duration."}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center text-primary text-2xl font-bold">
                2
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">
                {language === "es" ? "Recibe el QR" : language === "pt" ? "Receba o QR" : "Receive the QR"}
              </h3>
              <p className="text-white/70 text-sm">
                {language === "es" 
                  ? "Recibiras un codigo QR por email inmediatamente despues del pago." 
                  : language === "pt"
                  ? "Voce recebera um codigo QR por email imediatamente apos o pagamento."
                  : "You'll receive a QR code by email immediately after payment."}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center text-primary text-2xl font-bold">
                3
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">
                {language === "es" ? "Conectate" : language === "pt" ? "Conecte-se" : "Connect"}
              </h3>
              <p className="text-white/70 text-sm">
                {language === "es" 
                  ? "Escanea el QR con tu telefono y disfruta de internet en Europa." 
                  : language === "pt"
                  ? "Escaneie o QR com seu celular e aproveite a internet na Europa."
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
