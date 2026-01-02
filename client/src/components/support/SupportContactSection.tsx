import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

interface SupportContactSectionProps {
  destinationPlaceholder?: string;
}

export function SupportContactSection({ destinationPlaceholder }: SupportContactSectionProps) {
  const { language } = useI18n();

  return (
    <section className="py-16 bg-muted/30" data-testid="section-support-contact">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-4">
            <span className="text-accent">{language === "es" ? "Contactanos" : "Contact Us"}</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            {language === "es" 
              ? "Tienes preguntas? Nuestros asesores de viaje estan listos para ayudarte a planificar tu viaje perfecto." 
              : "Have questions? Our travel advisors are ready to help you plan your perfect trip."}
          </p>
          <Card>
            <CardContent className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">{language === "es" ? "Nombre completo" : "Full name"}</Label>
                    <Input id="contact-name" placeholder={language === "es" ? "Tu nombre" : "Your name"} data-testid="input-contact-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="tu@email.com" data-testid="input-contact-email" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">{language === "es" ? "Telefono" : "Phone"}</Label>
                    <Input id="contact-phone" type="tel" placeholder="+57 300 000 0000" data-testid="input-contact-phone" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-destination">{language === "es" ? "Destino de interes" : "Destination of interest"}</Label>
                    <Input 
                      id="contact-destination" 
                      placeholder={destinationPlaceholder || (language === "es" ? "Ej: Italia, España" : "E.g.: Italy, Spain")} 
                      data-testid="input-contact-destination" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">{language === "es" ? "Mensaje" : "Message"}</Label>
                  <Textarea 
                    id="contact-message" 
                    placeholder={language === "es" ? "Cuentanos sobre tu viaje ideal..." : "Tell us about your ideal trip..."} 
                    rows={4}
                    data-testid="input-contact-message"
                  />
                </div>
                <Button className="w-full bg-accent text-primary hover:bg-accent/90" data-testid="button-contact-submit">
                  <Send className="w-4 h-4 mr-2" />
                  {language === "es" ? "Enviar consulta" : "Send inquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
