import { Shield, Award, Headphones } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const BENEFITS = [
  {
    icon: Award,
    title: { es: "Mejor Precio Garantizado", en: "Best Price Guaranteed" },
    description: {
      es: "Tarifas inmejorables. Si encuentras una oferta mejor, te la igualamos en 24 horas!",
      en: "Unbeatable rates. If you find a better offer, we'll match it within 24 hours!",
    },
  },
  {
    icon: Shield,
    title: { es: "Experiencias Extraordinarias", en: "Extraordinary Experiences" },
    description: {
      es: "Colaboramos con proveedores locales para crear itinerarios equilibrados con los que explorar Europa.",
      en: "We partner with local providers to create balanced itineraries to explore Europe.",
    },
  },
  {
    icon: Headphones,
    title: { es: "Todo Bajo Control", en: "Everything Under Control" },
    description: {
      es: "Viajes disenados por expertos al detalle, asistencia 24/7 y actualizaciones en la App para viajeros.",
      en: "Expert-designed trips in detail, 24/7 assistance and updates in the Traveler App.",
    },
  },
];

export function WhyChooseUs() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  const content = {
    es: {
      title: "Por que miles de personas eligen TripsEuropa?",
    },
    en: {
      title: "Why do thousands of people choose TripsEuropa?",
    },
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-why-choose">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-12 text-foreground" data-testid="text-why-title">
          {content[lang].title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, index) => (
            <div 
              key={index} 
              className="text-center p-6"
              data-testid={`card-benefit-${index}`}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <benefit.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">
                {benefit.title[lang]}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
