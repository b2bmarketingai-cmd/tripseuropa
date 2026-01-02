import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MessageCircle, HelpCircle, Users } from "lucide-react";
import { SiWhatsapp, SiFacebook } from "react-icons/si";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ContactSupportModalProps {
  trigger?: React.ReactNode;
}

export function ContactSupportModal({ trigger }: ContactSupportModalProps) {
  const { language } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    es: {
      bookTrip: "Reserva Tu Viaje",
      bookSubtitle: "Obten consejos y soporte para reservar",
      talkExpert: "Habla con un experto:",
      phone: "+34 611 105 448",
      needHelp: "Necesitas ayuda con una reserva existente?",
      quickHelp: "Recibe asistencia de manera rapida",
      chatSupport: "Asistencia por chat",
      helpCenter: "Centro de Ayuda y FAQs",
      whatsapp: "WhatsApp",
      messenger: "Facebook Messenger",
    },
    en: {
      bookTrip: "Book Your Trip",
      bookSubtitle: "Get advice and support for booking",
      talkExpert: "Talk to an expert:",
      phone: "+34 611 105 448",
      needHelp: "Need help with an existing booking?",
      quickHelp: "Get assistance quickly",
      chatSupport: "Chat Support",
      helpCenter: "Help Center & FAQs",
      whatsapp: "WhatsApp",
      messenger: "Facebook Messenger",
    },
  };

  const c = content[language as "es" | "en"];

  const supportOptions = [
    {
      icon: MessageCircle,
      label: c.chatSupport,
      action: () => {},
    },
    {
      icon: HelpCircle,
      label: c.helpCenter,
      href: "/faq",
    },
    {
      icon: SiWhatsapp,
      label: c.whatsapp,
      href: "https://wa.me/34611105448",
      external: true,
    },
    {
      icon: SiFacebook,
      label: c.messenger,
      href: "https://m.me/tripseuropa",
      external: true,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-contact-modal-trigger">
            <Phone className="w-4 h-4" />
            {c.phone}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" data-testid="modal-contact-support">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-accent">{c.bookTrip}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{c.bookSubtitle}</DialogDescription>
        </DialogHeader>
        
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" />
                <AvatarFallback>TE</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" />
                <AvatarFallback>TE</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{c.talkExpert}</p>
              <a 
                href={`tel:${c.phone.replace(/\s/g, '')}`}
                className="text-xl font-bold text-foreground hover:text-accent transition-colors"
                data-testid="link-phone-call"
              >
                {c.phone}
              </a>
            </div>
          </div>
        </Card>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-foreground mb-1">{c.needHelp}</h3>
          <p className="text-sm text-muted-foreground mb-4">{c.quickHelp}</p>
          
          <div className="space-y-2">
            {supportOptions.map((option, index) => (
              option.href ? (
                <a
                  key={index}
                  href={option.href}
                  target={option.external ? "_blank" : undefined}
                  rel={option.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  data-testid={`link-support-${index}`}
                >
                  <option.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">{option.label}</span>
                </a>
              ) : (
                <button
                  key={index}
                  onClick={option.action}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                  data-testid={`button-support-${index}`}
                >
                  <option.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">{option.label}</span>
                </button>
              )
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
