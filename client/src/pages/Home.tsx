import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TravelAgencySchema, WebsiteSchema, FAQSchema } from "@/components/SEOSchema";
import { Chatbot } from "@/components/Chatbot";
import { ContactForm } from "@/components/ContactForm";
import { HeroCarousel } from "@/components/HeroCarousel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { TopOffers } from "@/components/TopOffers";
import { ReserveSpot } from "@/components/ReserveSpot";
import { Favorites } from "@/components/Favorites";
import { SpecialOffers } from "@/components/SpecialOffers";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { Phone, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function Home() {
  const { language } = useI18n();

  const content = {
    es: {
      ctaBadge: "Planifica tu viaje",
      ctaTitle: "Listo para vivir una experiencia europea inolvidable?",
      ctaSubtitle: "Nuestro equipo de expertos esta aqui para ayudarte a disenar el viaje perfecto.",
      callUs: "Llamanos",
      phone: "+34 900 123 456",
      hours: "Lun - Vie: 9:00 - 19:00",
      email: "Email",
      emailAddress: "info@tripseuropa.com",
      office: "Oficina Central",
      address: "Calle Gran Via 45, Madrid, España",
      whatsapp: "Escribenos por WhatsApp",
      formTitle: "Solicita tu cotizacion",
    },
    en: {
      ctaBadge: "Plan your trip",
      ctaTitle: "Ready to live an unforgettable European experience?",
      ctaSubtitle: "Our team of experts is here to help you design the perfect trip.",
      callUs: "Call us",
      phone: "+34 900 123 456",
      hours: "Mon - Fri: 9:00 - 19:00",
      email: "Email",
      emailAddress: "info@tripseuropa.com",
      office: "Central Office",
      address: "Calle Gran Via 45, Madrid, Spain",
      whatsapp: "Write us on WhatsApp",
      formTitle: "Request your quote",
    },
  };

  const lang = language as "es" | "en";
  const c = content[lang];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <HeroCarousel />

      <TopOffers />

      <ReserveSpot />

      <SpecialOffers />

      <Favorites />

      <WhyChooseUs />

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
                  <p className="text-muted-foreground text-sm">{c.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4" data-testid="contact-email">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{c.email}</h3>
                  <p className="text-primary">{c.emailAddress}</p>
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
                href="https://wa.me/34900123456" 
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-md font-medium hover:bg-green-600 transition-colors"
                data-testid="link-whatsapp"
              >
                <SiWhatsapp className="w-5 h-5" />
                {c.whatsapp}
              </a>
            </div>

            <div>
              <ContactForm variant="page" title={c.formTitle} />
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion />

      <Footer />
      <Chatbot />
      <WhatsAppButton />
      
      <TravelAgencySchema />
      <WebsiteSchema />
      <FAQSchema questions={[
        { question: "Necesito visa Schengen para viajar a Europa desde Latinoamerica?", answer: "Si, los ciudadanos de la mayoria de paises latinoamericanos necesitan visa Schengen. Te ayudamos con todo el proceso de solicitud." },
        { question: "Cuanto cuesta un viaje a Europa?", answer: "Nuestros paquetes comienzan desde USD 999 por persona mas impuestos incluyendo hoteles y tours." },
        { question: "Incluyen seguro de viaje los paquetes?", answer: "Si, todos nuestros paquetes incluyen seguro de viaje internacional con cobertura medica completa." },
        { question: "Los tours incluyen guia en espanol?", answer: "Si, todos nuestros tours incluyen guias profesionales en espanol." },
        { question: "Que formas de pago aceptan?", answer: "Aceptamos tarjetas de credito, transferencias bancarias y planes de financiamiento hasta 12 cuotas sin interes." }
      ]} />
    </div>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/34900123456"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label="WhatsApp"
      data-testid="button-whatsapp-float"
    >
      <SiWhatsapp className="w-7 h-7 text-white" />
    </a>
  );
}
