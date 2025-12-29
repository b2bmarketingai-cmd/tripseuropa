import { Plane, Hotel, Users, Shield, Wallet, Headphones } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const BENEFITS = [
  {
    icon: Plane,
    title: { es: "Vuelos Incluidos", en: "Flights Included" },
    description: {
      es: "Todos nuestros circuitos incluyen vuelos desde las principales ciudades.",
      en: "All our tours include flights from major cities.",
    },
  },
  {
    icon: Hotel,
    title: { es: "Hoteles Seleccionados", en: "Selected Hotels" },
    description: {
      es: "Alojamientos de 4 y 5 estrellas cuidadosamente elegidos para tu confort.",
      en: "4 and 5 star accommodations carefully selected for your comfort.",
    },
  },
  {
    icon: Users,
    title: { es: "Guias Expertos", en: "Expert Guides" },
    description: {
      es: "Guias locales profesionales que haran tu experiencia inolvidable.",
      en: "Professional local guides who will make your experience unforgettable.",
    },
  },
  {
    icon: Shield,
    title: { es: "Viaje Seguro", en: "Safe Travel" },
    description: {
      es: "Seguro de viaje completo incluido en todos nuestros paquetes.",
      en: "Comprehensive travel insurance included in all our packages.",
    },
  },
  {
    icon: Wallet,
    title: { es: "Pago Flexible", en: "Flexible Payment" },
    description: {
      es: "Reserva con solo 100EUR y paga el resto hasta 30 dias antes del viaje.",
      en: "Book with only 100EUR and pay the rest up to 30 days before the trip.",
    },
  },
  {
    icon: Headphones,
    title: { es: "Soporte 24/7", en: "24/7 Support" },
    description: {
      es: "Asistencia telefonica disponible las 24 horas durante todo tu viaje.",
      en: "Phone assistance available 24 hours throughout your trip.",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, index) => (
            <div 
              key={index} 
              className="text-center p-6"
              data-testid={`card-benefit-${index}`}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <benefit.icon className="w-8 h-8 text-primary" />
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

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div data-testid="stat-experience">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-experience-value">15+</div>
            <p className="text-muted-foreground" data-testid="text-stat-experience-label">{lang === "es" ? "Anos de experiencia" : "Years of experience"}</p>
          </div>
          <div data-testid="stat-travelers">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-travelers-value">50K+</div>
            <p className="text-muted-foreground" data-testid="text-stat-travelers-label">{lang === "es" ? "Viajeros satisfechos" : "Satisfied travelers"}</p>
          </div>
          <div data-testid="stat-tours">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-tours-value">120+</div>
            <p className="text-muted-foreground" data-testid="text-stat-tours-label">{lang === "es" ? "Circuitos unicos" : "Unique tours"}</p>
          </div>
          <div data-testid="stat-rating">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-rating-value">4.9</div>
            <p className="text-muted-foreground" data-testid="text-stat-rating-label">{lang === "es" ? "Valoracion media" : "Average rating"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
