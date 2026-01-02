import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Gift, Tag, Compass, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSignup() {
  const { language } = useI18n();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const content = {
    es: {
      badge: "Newsletter Exclusiva",
      title: "Recibe Las Mejores Ofertas",
      subtitle: "Suscribete y recibe ofertas exclusivas, promociones especiales e inspiracion viajera directamente en tu email.",
      benefits: [
        { icon: Tag, text: "Ofertas exclusivas hasta 60% dto." },
        { icon: Gift, text: "Promociones especiales solo para suscriptores" },
        { icon: Compass, text: "Inspiracion viajera y guias de destinos" },
      ],
      placeholder: "Tu correo electronico",
      cta: "Suscribirme",
      subscribing: "Suscribiendo...",
      success: "Suscripcion exitosa",
      successDesc: "Te hemos enviado un correo de confirmacion.",
      error: "Por favor ingresa un correo valido",
      privacy: "Respetamos tu privacidad. Puedes cancelar en cualquier momento.",
    },
    en: {
      badge: "Exclusive Newsletter",
      title: "Get The Best Offers",
      subtitle: "Subscribe and receive exclusive offers, special promotions and travel inspiration directly to your email.",
      benefits: [
        { icon: Tag, text: "Exclusive offers up to 60% off" },
        { icon: Gift, text: "Special promotions only for subscribers" },
        { icon: Compass, text: "Travel inspiration and destination guides" },
      ],
      placeholder: "Your email address",
      cta: "Subscribe",
      subscribing: "Subscribing...",
      success: "Subscription successful",
      successDesc: "We've sent you a confirmation email.",
      error: "Please enter a valid email",
      privacy: "We respect your privacy. You can cancel anytime.",
    },
  };

  const c = content[language as "es" | "en"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: c.error,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Send notification to backend (emails)
      await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      // Open WhatsApp with notification
      const whatsappMessage = `Nueva suscripcion al Newsletter!\n\nEmail: ${email}`;
      window.open(`https://wa.me/34611105448?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
      
      setIsSubscribed(true);
      toast({
        title: c.success,
        description: c.successDesc,
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-accent/10" data-testid="section-newsletter">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center p-8 bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
            <CardContent className="pt-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-accent mb-2">{c.success}</h3>
              <p className="text-muted-foreground">{c.successDesc}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-accent/10" data-testid="section-newsletter">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
                <Badge className="mb-4 bg-accent text-primary font-bold">
                  <Mail className="w-3 h-3 mr-1" /> {c.badge}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                  {c.title}
                </h2>
                <p className="text-white/80 mb-6">
                  {c.subtitle}
                </p>
                <ul className="space-y-3">
                  {c.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/90">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-4 h-4 text-accent" />
                      </div>
                      {benefit.text}
                    </li>
                  ))}
                </ul>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder={c.placeholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12"
                      data-testid="input-newsletter-email"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-accent text-primary hover:bg-accent/90 font-bold"
                    disabled={isLoading}
                    data-testid="button-newsletter-submit"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {c.subscribing}
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        {c.cta}
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    {c.privacy}
                  </p>
                </form>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
