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

  const content = {
    es: {
      requiredFields: "Campos requeridos",
      fillAllFields: "Por favor completa nombre, email y mensaje",
      messageSent: "Mensaje enviado",
      willContactSoon: "Te contactaremos pronto",
      errorSending: "Error al enviar. Intenta de nuevo.",
      contactUs: "Contactanos",
      haveQuestions: "Tienes preguntas? Nuestros asesores de viaje estan listos para ayudarte a planificar tu viaje perfecto.",
      fullName: "Nombre completo",
      yourName: "Tu nombre",
      phone: "Telefono",
      destinationInterest: "Destino de interes",
      destinationExample: "Ej: Italia, Espana",
      message: "Mensaje",
      idealTrip: "Cuentanos sobre tu viaje ideal...",
      sending: "Enviando...",
      sendInquiry: "Enviar consulta",
    },
    en: {
      requiredFields: "Required fields",
      fillAllFields: "Please fill in name, email and message",
      messageSent: "Message sent",
      willContactSoon: "We will contact you soon",
      errorSending: "Error sending. Please try again.",
      contactUs: "Contact Us",
      haveQuestions: "Have questions? Our travel advisors are ready to help you plan your perfect trip.",
      fullName: "Full name",
      yourName: "Your name",
      phone: "Phone",
      destinationInterest: "Destination of interest",
      destinationExample: "E.g.: Italy, Spain",
      message: "Message",
      idealTrip: "Tell us about your ideal trip...",
      sending: "Sending...",
      sendInquiry: "Send inquiry",
    },
    pt: {
      requiredFields: "Campos obrigatorios",
      fillAllFields: "Por favor preencha nome, email e mensagem",
      messageSent: "Mensagem enviada",
      willContactSoon: "Entraremos em contato em breve",
      errorSending: "Erro ao enviar. Tente novamente.",
      contactUs: "Fale Conosco",
      haveQuestions: "Tem duvidas? Nossos consultores de viagem estao prontos para ajuda-lo a planejar sua viagem perfeita.",
      fullName: "Nome completo",
      yourName: "Seu nome",
      phone: "Telefone",
      destinationInterest: "Destino de interesse",
      destinationExample: "Ex: Italia, Espanha",
      message: "Mensagem",
      idealTrip: "Conte-nos sobre sua viagem ideal...",
      sending: "Enviando...",
      sendInquiry: "Enviar consulta",
    },
  };

  const c = content[language as keyof typeof content] || content.es;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: c.requiredFields,
        description: c.fillAllFields,
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
        const whatsappMessage = `Nueva consulta de contacto!

*Nombre:* ${formData.name}
*Email:* ${formData.email}
*Telefono:* ${formData.phone || "No proporcionado"}
*Destino:* ${formData.destination || "No especificado"}
*Mensaje:* ${formData.message}`;
        window.open(`https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(whatsappMessage)}`, "_blank");
        
        setSubmitted(true);
        toast({
          title: c.messageSent,
          description: c.willContactSoon
        });
        setFormData({ name: "", email: "", phone: "", destination: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      },
      onError: () => {
        toast({
          title: "Error",
          description: c.errorSending,
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
              {c.messageSent}
            </h3>
            <p className="text-muted-foreground">
              {c.willContactSoon}
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
            <span className="text-accent">{c.contactUs}</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            {c.haveQuestions}
          </p>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">{c.fullName}</Label>
                    <Input 
                      id="contact-name" 
                      placeholder={c.yourName} 
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
                    <Label htmlFor="contact-phone">{c.phone}</Label>
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
                    <Label htmlFor="contact-destination">{c.destinationInterest}</Label>
                    <Input 
                      id="contact-destination" 
                      placeholder={destinationPlaceholder || c.destinationExample} 
                      value={formData.destination}
                      onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                      data-testid="input-contact-destination" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">{c.message}</Label>
                  <Textarea 
                    id="contact-message" 
                    placeholder={c.idealTrip} 
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
                      {c.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {c.sendInquiry}
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
