import { Shield, Award, Headphones, Wallet, Plane, CheckCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const BENEFITS = [
  {
    icon: Shield,
    title: { es: "Viajes Seguros", en: "Safe Travels", pt: "Viagens Seguras" },
    description: {
      es: "Todos nuestros paquetes incluyen seguro de viaje completo",
      en: "All our packages include comprehensive travel insurance",
      pt: "Todos os nossos pacotes incluem seguro de viagem completo",
    },
  },
  {
    icon: Award,
    title: { es: "Calidad Garantizada", en: "Guaranteed Quality", pt: "Qualidade Garantida" },
    description: {
      es: "Hoteles 4 y 5 estrellas cuidadosamente seleccionados",
      en: "Carefully selected 4 and 5 star hotels",
      pt: "Hoteis 4 e 5 estrelas cuidadosamente selecionados",
    },
  },
  {
    icon: Headphones,
    title: { es: "Soporte 24/7", en: "24/7 Support", pt: "Suporte 24/7" },
    description: {
      es: "Asistencia en espanol durante todo tu viaje",
      en: "Spanish assistance throughout your trip",
      pt: "Assistencia em portugues durante toda a sua viagem",
    },
  },
  {
    icon: Wallet,
    title: { es: "Financiamiento", en: "Financing", pt: "Financiamento" },
    description: {
      es: "Planes de pago flexibles hasta 12 cuotas sin interes",
      en: "Flexible payment plans up to 12 interest-free installments",
      pt: "Planos de pagamento flexiveis ate 12 parcelas sem juros",
    },
  },
  {
    icon: Plane,
    title: { es: "Vuelos Incluidos", en: "Flights Included", pt: "Voos Incluidos" },
    description: {
      es: "Boletos aereos con las mejores aerolineas europeas",
      en: "Air tickets with the best European airlines",
      pt: "Passagens aereas com as melhores companhias aereas europeias",
    },
  },
  {
    icon: CheckCircle,
    title: { es: "Reserva Facil", en: "Easy Booking", pt: "Reserva Facil" },
    description: {
      es: "Proceso de reserva simple y transparente",
      en: "Simple and transparent booking process",
      pt: "Processo de reserva simples e transparente",
    },
  },
];

export function WhyChooseUs() {
  const { language } = useI18n();
  const lang = language as "es" | "en" | "pt";

  const content = {
    es: {
      title: "Por que elegir TripsEuropa?",
      subtitle: "Mas de 10 años de experiencia creando viajes inolvidables por Europa",
      years: "Años de experiencia",
      travelers: "Viajeros felices",
      packages: "Paquetes disponibles",
      countries: "Paises en Europa",
    },
    en: {
      title: "Why choose TripsEuropa?",
      subtitle: "More than 10 years of experience creating unforgettable trips through Europe",
      years: "Years of experience",
      travelers: "Happy travelers",
      packages: "Available packages",
      countries: "Countries in Europe",
    },
    pt: {
      title: "Por que escolher TripsEuropa?",
      subtitle: "Mais de 10 años de experiencia criando viagens inesqueciveis pela Europa",
      years: "Años de experiencia",
      travelers: "Viajantes felizes",
      packages: "Pacotes disponiveis",
      countries: "Paises na Europa",
    },
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-950" data-testid="section-why-choose">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-accent" data-testid="text-why-title">
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
            <p className="text-muted-foreground" data-testid="text-stat-experience-label">{content[lang].years}</p>
          </div>
          <div data-testid="stat-travelers">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-travelers-value">50K+</div>
            <p className="text-muted-foreground" data-testid="text-stat-travelers-label">{content[lang].travelers}</p>
          </div>
          <div data-testid="stat-packages">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-packages-value">200+</div>
            <p className="text-muted-foreground" data-testid="text-stat-packages-label">{content[lang].packages}</p>
          </div>
          <div data-testid="stat-countries">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-countries-value">30+</div>
            <p className="text-muted-foreground" data-testid="text-stat-countries-label">{content[lang].countries}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
