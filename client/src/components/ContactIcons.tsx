import { Phone, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Badge } from "@/components/ui/badge";

interface ContactSectionProps {
  content: {
    ctaBadge: string;
    ctaTitle: string;
    ctaSubtitle: string;
    callUs: string;
    phone: string;
    email: string;
    office: string;
    address: string;
    whatsapp: string;
    formTitle: string;
  };
  contactForm: React.ReactNode;
}

export default function ContactSection({ content: c, contactForm }: ContactSectionProps) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" data-testid="section-contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" data-testid="badge-contact">{c.ctaBadge}</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4" data-testid="text-contact-title">
            {c.ctaTitle}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-subtitle">
            {c.ctaSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4" data-testid="contact-phone">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{c.callUs}</h3>
                <p className="text-xl font-bold text-primary">{c.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4" data-testid="contact-email">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{c.email}</h3>
                <p className="text-primary">info@tripseuropa.com</p>
                <p className="text-primary">agente@tripseuropa.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4" data-testid="contact-office">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{c.office}</h3>
                <p className="text-muted-foreground">{c.address}</p>
              </div>
            </div>

            <a
              href="https://api.whatsapp.com/send?phone=34611105448"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-md font-medium hover:bg-green-600 transition-colors"
              data-testid="link-whatsapp"
            >
              <SiWhatsapp className="w-5 h-5" />
              {c.whatsapp}
            </a>
          </div>

          <div>
            {contactForm}
          </div>
        </div>
      </div>
    </section>
  );
}
