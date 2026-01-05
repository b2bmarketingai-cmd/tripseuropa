import { useI18n } from "@/lib/i18n";
import { ContactForm } from "@/components/ContactForm";

interface SupportContactSectionProps {
  destinationPlaceholder?: string;
}

export function SupportContactSection({ destinationPlaceholder }: SupportContactSectionProps) {
  const { language } = useI18n();

  const content = {
    es: {
      contactUs: "Contáctanos",
      haveQuestions: "¿Tienes preguntas? Nuestros asesores de viaje están listos para ayudarte a planificar tu viaje perfecto.",
    },
    en: {
      contactUs: "Contact Us",
      haveQuestions: "Have questions? Our travel advisors are ready to help you plan your perfect trip.",
    },
    pt: {
      contactUs: "Fale Conosco",
      haveQuestions: "Tem dúvidas? Nossos consultores de viagem estão prontos para ajudá-lo a planejar sua viagem perfeita.",
    },
  };

  const c = content[language as keyof typeof content] || content.es;

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
          <ContactForm 
            variant="page" 
            defaultDestination={destinationPlaceholder}
          />
        </div>
      </div>
    </section>
  );
}
