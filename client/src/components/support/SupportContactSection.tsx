import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateLead } from "@/hooks/use-leads";

interface SupportContactSectionProps {
  destinationPlaceholder?: string;
}

export function SupportContactSection({ destinationPlaceholder }: SupportContactSectionProps) {
  const { language } = useI18n();
  const { toast } = useToast();
  const { mutate: createLead, isPending } = useCreateLead();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: language === "es" ? "Campos requeridos" : "Required fields",
        description: language === "es" ? "Por favor completa nombre, email y mensaje" : "Please fill in name, email and message",
        variant: "destructive"
      });
      return;
    }

    createLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      originCountry: null,
      serviceInterest: formData.destination || null,
      message: formData.message
    }, {
      onSuccess: () => {
        // Send WhatsApp notification
        const whatsappMessage = `Nueva consulta de contacto!

*Nombre:* ${formData.name}
*Email:* ${formData.email}
*Telefono:* ${formData.phone || "No proporcionado"}
*Destino:* ${formData.destination || "No especificado"}
*Mensaje:* ${formData.message}`;
        window.open(`https://wa.me/34611105448?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
        
        setSubmitted(true);
        toast({
          title: language === "es" ? "Mensaje enviado" : "Message sent",
          description: language === "es" ? "Te contactaremos pronto" : "We will contact you soon"
        });
        setFormData({ name: "", email: "", phone: "", destination: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      },
      onError: () => {
        toast({
          title: "Error",
          description: language === "es" ? "Error al enviar. Intenta de nuevo." : "Error sending. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  if (submitted) {
    return (
      <section className="py-16 bg-muted/30" data-testid="section-support-contact">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-12">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold mb-2">
              {language === "es" ? "Mensaje enviado" : "Message sent"}
            </h3>
            <p className="text-muted-foreground">
              {language === "es" ? "Te contactaremos pronto" : "We will contact you soon"}
            </p>
          </div>
        </div>
      </section>
    );
  }

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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">{language === "es" ? "Nombre completo" : "Full name"}</Label>
                    <Input 
                      id="contact-name" 
                      placeholder={language === "es" ? "Tu nombre" : "Your name"} 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      data-testid="input-contact-name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input 
                      id="contact-email" 
                      type="email" 
                      placeholder="tu@email.com" 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      data-testid="input-contact-email" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">{language === "es" ? "Telefono" : "Phone"}</Label>
                    <Input 
                      id="contact-phone" 
                      type="tel" 
                      placeholder="+34 611 105 448" 
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      data-testid="input-contact-phone" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-destination">{language === "es" ? "Destino de interes" : "Destination of interest"}</Label>
                    <Input 
                      id="contact-destination" 
                      placeholder={destinationPlaceholder || (language === "es" ? "Ej: Italia, España" : "E.g.: Italy, Spain")} 
                      value={formData.destination}
                      onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
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
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    data-testid="input-contact-message"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-accent text-primary hover:bg-accent/90" 
                  disabled={isPending}
                  data-testid="button-contact-submit"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {language === "es" ? "Enviando..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {language === "es" ? "Enviar consulta" : "Send inquiry"}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
