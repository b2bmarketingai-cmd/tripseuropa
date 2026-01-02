import { useI18n } from "@/lib/i18n";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface FAQItem {
  question: { es: string; en: string };
  answer: { es: string; en: string };
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: {
      es: "Que incluyen los paquetes de viaje?",
      en: "What's included in travel packages?"
    },
    answer: {
      es: "Nuestros paquetes incluyen vuelos de ida y vuelta, alojamiento en hoteles de 4-5 estrellas, traslados, tours guiados y algunas comidas segun el paquete. Todos los impuestos y tasas estan incluidos en el precio.",
      en: "Our packages include round-trip flights, accommodation in 4-5 star hotels, transfers, guided tours, and some meals depending on the package. All taxes and fees are included in the price."
    }
  },
  {
    question: {
      es: "Como puedo reservar un viaje?",
      en: "How can I book a trip?"
    },
    answer: {
      es: "Puedes reservar directamente en nuestro sitio web, por telefono al +34 611 105 448, o via WhatsApp. Nuestros asesores te guiaran en todo el proceso de reserva.",
      en: "You can book directly on our website, by phone at +34 611 105 448, or via WhatsApp. Our advisors will guide you through the entire booking process."
    }
  },
  {
    question: {
      es: "Cual es la politica de cancelacion?",
      en: "What is the cancellation policy?"
    },
    answer: {
      es: "Ofrecemos cancelacion gratuita hasta 30 dias antes de la salida para la mayoria de los paquetes. Las condiciones especificas pueden variar segun el destino y la temporada.",
      en: "We offer free cancellation up to 30 days before departure for most packages. Specific conditions may vary depending on the destination and season."
    }
  },
  {
    question: {
      es: "Que formas de pago aceptan?",
      en: "What payment methods do you accept?"
    },
    answer: {
      es: "Aceptamos tarjetas de credito y debito (Visa, Mastercard, American Express), transferencias bancarias y PayPal. Tambien ofrecemos planes de pago a cuotas sin intereses.",
      en: "We accept credit and debit cards (Visa, Mastercard, American Express), bank transfers, and PayPal. We also offer interest-free installment payment plans."
    }
  },
  {
    question: {
      es: "Necesito visa para viajar a Europa?",
      en: "Do I need a visa to travel to Europe?"
    },
    answer: {
      es: "Depende de tu nacionalidad. Los ciudadanos de paises latinoamericanos generalmente pueden visitar el espacio Schengen por hasta 90 dias sin visa para turismo. Te recomendamos verificar los requisitos especificos para tu pais.",
      en: "It depends on your nationality. Citizens of Latin American countries can generally visit the Schengen area for up to 90 days without a visa for tourism. We recommend checking the specific requirements for your country."
    }
  },
  {
    question: {
      es: "Ofrecen asistencia durante el viaje?",
      en: "Do you offer assistance during the trip?"
    },
    answer: {
      es: "Si, ofrecemos asistencia 24/7 durante todo tu viaje. Puedes contactarnos por telefono, WhatsApp o email en cualquier momento si necesitas ayuda.",
      en: "Yes, we offer 24/7 assistance throughout your trip. You can contact us by phone, WhatsApp, or email anytime if you need help."
    }
  }
];

interface SupportFAQSectionProps {
  faqs?: FAQItem[];
  title?: { es: string; en: string };
}

export function SupportFAQSection({ faqs = DEFAULT_FAQS, title }: SupportFAQSectionProps) {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  const sectionTitle = title || {
    es: "Preguntas Frecuentes",
    en: "Frequently Asked Questions"
  };

  return (
    <section className="py-16 bg-background" data-testid="section-support-faq">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-8">
            <span className="text-accent">{sectionTitle[lang]}</span>
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left font-medium" data-testid={`faq-item-${index + 1}`}>
                  {faq.question[lang]}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer[lang]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
