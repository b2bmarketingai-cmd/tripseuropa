import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Gift, Users, ArrowRight, Wallet, Share2 } from "lucide-react";

export function ReferralProgram() {
  const { language } = useI18n();

  const content = {
    es: {
      badge: "Programa de Referidos",
      title: "Invita A Un Amigo Y Gana",
      subtitle: "Comparte tu experiencia de viaje con amigos y familiares. Ambos ganan cuando reservan su primer viaje.",
      youGet: "Tu Recibes",
      friendGets: "Tu Amigo Recibe",
      amount: "$150 USD",
      steps: [
        { icon: Share2, title: "Comparte", description: "Envía tu link único a amigos y familiares" },
        { icon: Users, title: "Tu amigo reserva", description: "Cuando reserven su primer viaje con nosotros" },
        { icon: Wallet, title: "Ambos ganan", description: "Reciben $150 USD cada uno para su próximo viaje" },
      ],
      cta: "Obtener Mi Link",
      terms: "Aplican términos y condiciones. El crédito se aplica después de completar el viaje.",
    },
    en: {
      badge: "Referral Program",
      title: "Invite A Friend And Earn",
      subtitle: "Share your travel experience with friends and family. Both of you earn when they book their first trip.",
      youGet: "You Get",
      friendGets: "Your Friend Gets",
      amount: "$150 USD",
      steps: [
        { icon: Share2, title: "Share", description: "Send your unique link to friends and family" },
        { icon: Users, title: "Friend books", description: "When they book their first trip with us" },
        { icon: Wallet, title: "Both earn", description: "Receive $150 USD each for your next trip" },
      ],
      cta: "Get My Link",
      terms: "Terms and conditions apply. Credit is applied after completing the trip.",
    },
  };

  const c = content[language as "es" | "en"];

  return (
    <section className="py-16 bg-gradient-to-br from-accent/5 via-background to-accent/10" data-testid="section-referral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent text-primary font-bold">
            <Gift className="w-3 h-3 mr-1" /> {c.badge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-4">
            {c.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-2">{c.youGet}</p>
                <p className="text-4xl font-bold text-green-700 dark:text-green-300">{c.amount}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center">
                  <Gift className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{c.friendGets}</p>
                <p className="text-4xl font-bold text-blue-700 dark:text-blue-300">{c.amount}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {c.steps.map((step, index) => (
              <Card key={index} className="relative" data-testid={`card-step-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-primary font-bold w-8 h-8 rounded-full flex items-center justify-center p-0">
                      {index + 1}
                    </Badge>
                  </div>
                  <div className="w-12 h-12 mx-auto mt-4 mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-bold" data-testid="button-referral-cta">
                {c.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-4">{c.terms}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
