import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, Headphones, Award, CheckCircle } from "lucide-react";

export function BestPriceGuarantee() {
  const { language } = useI18n();

  const content = {
    es: {
      badge: "Nuestras Garantias",
      title: "Por Que Elegir Trips Europa",
      subtitle: "Viaja con la tranquilidad de estar en las mejores manos. Mas de 10,000 viajeros satisfechos nos respaldan.",
      guarantees: [
        {
          icon: Shield,
          title: "Mejor Precio Garantizado",
          description: "Si encuentras una oferta mejor, te la igualamos en 24 horas. Sin preguntas.",
        },
        {
          icon: Award,
          title: "Experiencias Extraordinarias",
          description: "Colaboramos con proveedores locales seleccionados para ofrecerte experiencias autenticas.",
        },
        {
          icon: Clock,
          title: "Todo Bajo Control",
          description: "Itinerarios disenados por expertos. Cada detalle planificado para tu comodidad.",
        },
        {
          icon: Headphones,
          title: "Asistencia 24/7",
          description: "Equipo de soporte en espanol disponible las 24 horas, los 7 dias de la semana.",
        },
      ],
    },
    en: {
      badge: "Our Guarantees",
      title: "Why Choose Trips Europa",
      subtitle: "Travel with the peace of mind of being in the best hands. Over 10,000 satisfied travelers support us.",
      guarantees: [
        {
          icon: Shield,
          title: "Best Price Guaranteed",
          description: "If you find a better offer, we'll match it within 24 hours. No questions asked.",
        },
        {
          icon: Award,
          title: "Extraordinary Experiences",
          description: "We collaborate with selected local providers to offer you authentic experiences.",
        },
        {
          icon: Clock,
          title: "Everything Under Control",
          description: "Itineraries designed by experts. Every detail planned for your comfort.",
        },
        {
          icon: Headphones,
          title: "24/7 Support",
          description: "Support team in Spanish available 24 hours a day, 7 days a week.",
        },
      ],
    },
  };

  const c = content[language as "es" | "en"];

  return (
    <section className="py-16 bg-primary text-primary-foreground" data-testid="section-guarantees">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent text-primary font-bold">
            <Shield className="w-3 h-3 mr-1" /> {c.badge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-4">
            {c.title}
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.guarantees.map((guarantee, index) => (
            <Card 
              key={index} 
              className="bg-white/10 border-white/20 text-primary-foreground"
              data-testid={`card-guarantee-${index}`}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                  <guarantee.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{guarantee.title}</h3>
                <p className="text-sm text-white/80">{guarantee.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-6 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              {language === "es" ? "Pago seguro SSL" : "Secure SSL payment"}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              {language === "es" ? "Sin cargos ocultos" : "No hidden fees"}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              {language === "es" ? "Cancelacion flexible" : "Flexible cancellation"}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              {language === "es" ? "Seguro incluido" : "Insurance included"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
