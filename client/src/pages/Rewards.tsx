import { useState } from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";
import { Check, Gift, Star, Users, Plane, Crown, Sparkles, ArrowRight, ChevronRight, Mail, Loader2 } from "lucide-react";
import { DESTINATIONS_DATA } from "@/lib/destinationsData";
import { FloatingContactButtons, SupportContactSection } from "@/components/support";
import { useToast } from "@/hooks/use-toast";

const CONTENT = {
  es: {
    heroTitle: "Viaja Mas, Gana Mas: Bienvenido a",
    heroBrand: "TripsEuropa GO",
    heroSubtitle: "Convierte tus sueños en realidad con nuestro programa de recompensas creado para viajeros exigentes. Sin barreras, sin limites, solo oportunidades ilimitadas.",
    level1Title: "Nivel 1",
    level1Subtitle: "Inscripcion gratuita",
    level1Benefits: [
      "Ofertas exclusivas Nivel 1",
      "Invita a un amigo y gana $150 USD",
      "Newsletter con ofertas anticipadas",
      "Acceso a contenido exclusivo de viaje"
    ],
    level2Title: "Nivel 2",
    level2Subtitle: "Despues de tu primera reserva",
    level2Benefits: [
      "Oferta especial: Recibe 10% del valor de tu reserva en credito para futuros viajes (hasta $350 USD)",
      "Acceso prioritario a nuevos destinos",
      "Ofertas exclusivas Nivel 2",
      "Invita a un amigo y gana $150 USD",
      "Concierge de viaje dedicado",
      "Upgrades de habitacion cuando esten disponibles"
    ],
    level3Title: "Nivel 3",
    level3Subtitle: "VIP Platino - 3+ viajes",
    level3Benefits: [
      "Todos los beneficios Nivel 2",
      "15% de credito en cada reserva (hasta $500 USD)",
      "Traslados aeropuerto incluidos",
      "Experiencias VIP exclusivas",
      "Linea directa de atencion 24/7",
      "Invita a un amigo y gana $200 USD"
    ],
    signupTitle: "Unete a TripsEuropa GO",
    signupSubtitle: "Registrate gratis y comienza a acumular recompensas desde tu primera consulta",
    emailPlaceholder: "tu@email.com",
    namePlaceholder: "Tu nombre completo",
    signupButton: "Unirse Ahora",
    faqTitle: "Preguntas Frecuentes",
    faqs: [
      {
        question: "Como me registro?",
        answer: "Registrarse es facil y gratuito. Solo tienes que crear una cuenta para comenzar en Nivel 1. Tan pronto reserves tu primer viaje, automaticamente comenzaras a recibir recompensas de Nivel 2."
      },
      {
        question: "Hay limitaciones en los destinos?",
        answer: "No! Nuestro programa hace exactamente lo que dice: te da recompensas a donde vayas. Sin fechas bloqueadas, sin restricciones en ninguno de nuestros itinerarios a Europa."
      },
      {
        question: "Que pasa si reservo mas viajes con TripsEuropa?",
        answer: "Despues de 3 viajes completados, asciendes automaticamente al Nivel 3 VIP Platino con beneficios premium adicionales como traslados incluidos y experiencias exclusivas."
      },
      {
        question: "Los descuentos son acumulables con otras promociones?",
        answer: "Las recompensas de TripsEuropa GO no se pueden combinar con otros descuentos, excepto el credito acreditado a tu billetera TripsEuropa en caso de cancelaciones u otra compensacion."
      },
      {
        question: "Como funciona el programa de referidos?",
        answer: "Cuando invitas a un amigo y realiza su primera reserva, ambos reciben credito en su billetera TripsEuropa: $150 USD en Nivel 1 y 2, y $200 USD en Nivel 3 VIP."
      }
    ],
    featuredTitle: "Gana Recompensas A Donde Vayas",
    featuredSubtitle: "Explora nuestros destinos mas populares y comienza a acumular beneficios",
    viewTrip: "Ver Viaje",
    termsLink: "Ver terminos y condiciones completos"
  },
  en: {
    heroTitle: "Travel More, Earn More: Welcome to",
    heroBrand: "TripsEuropa GO",
    heroSubtitle: "Turn your dreams into reality with our rewards program created for discerning travelers. No barriers, no limits—just boundless opportunities.",
    level1Title: "Level 1",
    level1Subtitle: "Free registration",
    level1Benefits: [
      "Exclusive Level 1 deals",
      "Invite a friend and earn $150 USD",
      "Newsletter with early access offers",
      "Access to exclusive travel content"
    ],
    level2Title: "Level 2",
    level2Subtitle: "After your first booking",
    level2Benefits: [
      "Special offer: Get 10% of your booking value back in credit for future trips (up to $350 USD)",
      "Priority access to new destinations",
      "Exclusive Level 2 deals",
      "Invite a friend and earn $150 USD",
      "Dedicated travel concierge",
      "Room upgrades when available"
    ],
    level3Title: "Level 3",
    level3Subtitle: "Platinum VIP - 3+ trips",
    level3Benefits: [
      "All Level 2 benefits",
      "15% credit on every booking (up to $500 USD)",
      "Airport transfers included",
      "Exclusive VIP experiences",
      "24/7 direct support line",
      "Invite a friend and earn $200 USD"
    ],
    signupTitle: "Join TripsEuropa GO",
    signupSubtitle: "Sign up for free and start earning rewards from your first inquiry",
    emailPlaceholder: "you@email.com",
    namePlaceholder: "Your full name",
    signupButton: "Join Now",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        question: "How do I sign up?",
        answer: "Signing up is easy and free. All you have to do is create an account to get started at Level 1. As soon as you book your first trip, you'll automatically begin receiving Level 2 rewards."
      },
      {
        question: "Are there any destination limitations?",
        answer: "No! Our program does just what it says: earns you rewards wherever you GO! No blackout dates, no restrictions on any of our European itineraries."
      },
      {
        question: "What if I book more trips with TripsEuropa?",
        answer: "After 3 completed trips, you automatically upgrade to Level 3 Platinum VIP with additional premium benefits like included transfers and exclusive experiences."
      },
      {
        question: "Are discounts cumulative with other promotions?",
        answer: "TripsEuropa GO rewards cannot be combined with other discounts, except for money credited to your TripsEuropa Wallet in case of cancellations or other compensation."
      },
      {
        question: "How does the referral program work?",
        answer: "When you invite a friend and they make their first booking, you both receive credit in your TripsEuropa wallet: $150 USD at Level 1 and 2, and $200 USD at Level 3 VIP."
      }
    ],
    featuredTitle: "Earn Rewards Wherever You GO",
    featuredSubtitle: "Explore our most popular destinations and start accumulating benefits",
    viewTrip: "View Trip",
    termsLink: "See full terms and conditions"
  },
  pt: {
    heroTitle: "Viaje Mais, Ganhe Mais: Bem-vindo ao",
    heroBrand: "TripsEuropa GO",
    heroSubtitle: "Transforme seus sonhos em realidade com nosso programa de recompensas criado para viajantes exigentes. Sem barreiras, sem limites, apenas oportunidades ilimitadas.",
    level1Title: "Nivel 1",
    level1Subtitle: "Inscricao gratuita",
    level1Benefits: [
      "Ofertas exclusivas Nivel 1",
      "Convide um amigo e ganhe $150 USD",
      "Newsletter com ofertas antecipadas",
      "Acesso a conteudo exclusivo de viagem"
    ],
    level2Title: "Nivel 2",
    level2Subtitle: "Apos sua primeira reserva",
    level2Benefits: [
      "Oferta especial: Receba 10% do valor da sua reserva em credito para futuras viagens (ate $350 USD)",
      "Acesso prioritario a novos destinos",
      "Ofertas exclusivas Nivel 2",
      "Convide um amigo e ganhe $150 USD",
      "Concierge de viagem dedicado",
      "Upgrades de quarto quando disponiveis"
    ],
    level3Title: "Nivel 3",
    level3Subtitle: "VIP Platina - 3+ viagens",
    level3Benefits: [
      "Todos os beneficios do Nivel 2",
      "15% de credito em cada reserva (ate $500 USD)",
      "Traslados do aeroporto incluidos",
      "Experiencias VIP exclusivas",
      "Linha direta de atendimento 24/7",
      "Convide um amigo e ganhe $200 USD"
    ],
    signupTitle: "Junte-se ao TripsEuropa GO",
    signupSubtitle: "Cadastre-se gratuitamente e comece a acumular recompensas desde sua primeira consulta",
    emailPlaceholder: "seu@email.com",
    namePlaceholder: "Seu nome completo",
    signupButton: "Junte-se Agora",
    faqTitle: "Perguntas Frequentes",
    faqs: [
      {
        question: "Como me cadastro?",
        answer: "Cadastrar-se e facil e gratuito. Basta criar uma conta para comecar no Nivel 1. Assim que reservar sua primeira viagem, automaticamente comecara a receber recompensas do Nivel 2."
      },
      {
        question: "Ha limitacoes nos destinos?",
        answer: "Nao! Nosso programa faz exatamente o que diz: te da recompensas para onde voce for. Sem datas bloqueadas, sem restricoes em nenhum dos nossos roteiros para a Europa."
      },
      {
        question: "O que acontece se eu reservar mais viagens com a TripsEuropa?",
        answer: "Apos 3 viagens concluidas, voce sobe automaticamente para o Nivel 3 VIP Platina com beneficios premium adicionais como traslados incluidos e experiencias exclusivas."
      },
      {
        question: "Os descontos sao acumulaveis com outras promocoes?",
        answer: "As recompensas do TripsEuropa GO nao podem ser combinadas com outros descontos, exceto o credito creditado na sua carteira TripsEuropa em caso de cancelamentos ou outra compensacao."
      },
      {
        question: "Como funciona o programa de indicacao?",
        answer: "Quando voce convida um amigo e ele faz sua primeira reserva, ambos recebem credito na carteira TripsEuropa: $150 USD no Nivel 1 e 2, e $200 USD no Nivel 3 VIP."
      }
    ],
    featuredTitle: "Ganhe Recompensas Onde Voce For",
    featuredSubtitle: "Explore nossos destinos mais populares e comece a acumular beneficios",
    viewTrip: "Ver Viagem",
    termsLink: "Ver termos e condicoes completos"
  }
};

const FEATURED_DESTINATIONS = ["france", "italy", "spain", "greece", "portugal", "switzerland"];

export default function Rewards() {
  const { language } = useI18n();
  const langPrefix = language === "es" ? "" : language === "pt" ? "/pt-br" : `/${language}`;
  const content = CONTENT[language];
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRewardsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast({
        title: language === "es" ? "Campos requeridos" : language === "pt" ? "Campos obrigatorios" : "Required fields",
        description: language === "es" ? "Por favor ingresa tu nombre y correo" : language === "pt" ? "Por favor insira seu nome e e-mail" : "Please enter your name and email",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const whatsappMessage = `Nueva inscripcion TripsEuropa GO!

*Nombre:* ${name}
*Email:* ${email}`;
      window.open(`https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(whatsappMessage)}`, "_blank");
      
      toast({
        title: language === "es" ? "Registro exitoso" : language === "pt" ? "Cadastro realizado" : "Registration successful",
        description: language === "es" ? "Bienvenido a TripsEuropa GO" : language === "pt" ? "Bem-vindo ao TripsEuropa GO" : "Welcome to TripsEuropa GO"
      });
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Rewards signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const featuredPackages = DESTINATIONS_DATA.filter(d => 
    FEATURED_DESTINATIONS.includes(d.slug)
  ).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=60&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 px-4 py-1.5">
              <Sparkles className="w-4 h-4 mr-2" />
              {language === "es" ? "Programa de Recompensas" : language === "pt" ? "Programa de Recompensas" : "Rewards Program"}
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-[#d1d2d6]">
              {content.heroTitle}{" "}
              <span className="text-accent">{content.heroBrand}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {content.heroSubtitle}
            </p>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8"
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-hero-join"
            >
              {content.signupButton}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="relative overflow-hidden border-2 border-transparent hover:border-accent/30 transition-colors">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-blue-600" />
              <CardContent className="pt-8 pb-6 px-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-accent">{content.level1Title}</h3>
                    <p className="text-sm text-muted-foreground">{content.level1Subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {content.level1Benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-accent/50 shadow-lg scale-[1.02]">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-accent to-yellow-500" />
              <Badge className="absolute top-4 right-4 bg-accent text-primary">
                {language === "es" ? "Popular" : language === "pt" ? "Popular" : "Popular"}
              </Badge>
              <CardContent className="pt-8 pb-6 px-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-accent">{content.level2Title}</h3>
                    <p className="text-sm text-muted-foreground">{content.level2Subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {content.level2Benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
              <CardContent className="pt-8 pb-6 px-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-accent">{content.level3Title}</h3>
                    <p className="text-sm text-muted-foreground">{content.level3Subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {content.level3Benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section id="signup" className="py-16 lg:py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl mb-4 text-accent">
              {content.signupTitle}
            </h2>
            <p className="text-white/70 mb-8">
              {content.signupSubtitle}
            </p>
            <form className="space-y-4" onSubmit={handleRewardsSubmit}>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder={content.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                  data-testid="input-rewards-name"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder={content.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                  data-testid="input-rewards-email"
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold h-12"
                disabled={isLoading}
                data-testid="button-rewards-submit"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Mail className="w-5 h-5 mr-2" />
                )}
                {content.signupButton}
              </Button>
            </form>
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-accent mb-4">
              {content.faqTitle}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {content.faqs.map((faq, idx) => (
                <AccordionItem 
                  key={idx} 
                  value={`faq-${idx}`}
                  className="border rounded-lg px-6 bg-card"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline" data-testid={`faq-trigger-${idx}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="text-center mt-8">
              <Link href="/policies" className="text-sm text-muted-foreground hover:text-accent underline">
                {content.termsLink}
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-accent mb-4">
              {content.featuredTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {content.featuredSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((dest) => (
              <Link key={dest.slug} href={`${langPrefix}/destinations/${dest.slug}`}>
                <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={dest.heroImage}
                      alt={dest.name[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-xl text-white mb-1">
                        {dest.name[language]}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {dest.packages[0]?.duration[language]}
                      </p>
                    </div>
                    {dest.packages[0] && (
                      <Badge className="absolute top-4 right-4 bg-accent text-primary">
                        ${dest.packages[0].price.toLocaleString()} USD
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {dest.description[language].substring(0, 120)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Plane className="w-4 h-4" />
                        <span>{dest.highlights[language][0]}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-accent">
                        {content.viewTrip}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SupportContactSection />
      <FloatingContactButtons />

      <Footer />
    </div>
  );
}
