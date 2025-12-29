import { Shield, Award, Headphones, Wallet, Plane, CheckCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const BENEFITS = [
  {
    icon: Shield,
    title: { es: "Viajes Seguros", en: "Safe Travels" },
    description: {
      es: "Todos nuestros paquetes incluyen seguro de viaje completo",
      en: "All our packages include comprehensive travel insurance",
    },
  },
  {
    icon: Award,
    title: { es: "Calidad Garantizada", en: "Guaranteed Quality" },
    description: {
      es: "Hoteles 4 y 5 estrellas cuidadosamente seleccionados",
      en: "Carefully selected 4 and 5 star hotels",
    },
  },
  {
    icon: Headphones,
    title: { es: "Soporte 24/7", en: "24/7 Support" },
    description: {
      es: "Asistencia en espanol durante todo tu viaje",
      en: "Spanish assistance throughout your trip",
    },
  },
  {
    icon: Wallet,
    title: { es: "Financiamiento", en: "Financing" },
    description: {
      es: "Planes de pago flexibles hasta 12 cuotas sin interes",
      en: "Flexible payment plans up to 12 interest-free installments",
    },
  },
  {
    icon: Plane,
    title: { es: "Vuelos Incluidos", en: "Flights Included" },
    description: {
      es: "Boletos aereos con las mejores aerolineas europeas",
      en: "Air tickets with the best European airlines",
    },
  },
  {
    icon: CheckCircle,
    title: { es: "Reserva Facil", en: "Easy Booking" },
    description: {
      es: "Proceso de reserva simple y transparente",
      en: "Simple and transparent booking process",
    },
  },
];

export function WhyChooseUs() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  const content = {
    es: {
      title: "Por que elegir TripsEuropa?",
      subtitle: "Mas de 10 anos de experiencia creando viajes inolvidables por Europa",
    },
    en: {
      title: "Why choose TripsEuropa?",
      subtitle: "More than 10 years of experience creating unforgettable trips through Europe",
    },
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-950" data-testid="section-why-choose">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-foreground" data-testid="text-why-title">
            {content[lang].title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{content[lang].subtitle}</p>
        </div>

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
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-experience-value">10+</div>
            <p className="text-muted-foreground" data-testid="text-stat-experience-label">{lang === "es" ? "Anos de experiencia" : "Years of experience"}</p>
          </div>
          <div data-testid="stat-travelers">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-travelers-value">50K+</div>
            <p className="text-muted-foreground" data-testid="text-stat-travelers-label">{lang === "es" ? "Viajeros felices" : "Happy travelers"}</p>
          </div>
          <div data-testid="stat-packages">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-packages-value">200+</div>
            <p className="text-muted-foreground" data-testid="text-stat-packages-label">{lang === "es" ? "Paquetes disponibles" : "Available packages"}</p>
          </div>
          <div data-testid="stat-countries">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-countries-value">30+</div>
            <p className="text-muted-foreground" data-testid="text-stat-countries-label">{lang === "es" ? "Paises en Europa" : "Countries in Europe"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
