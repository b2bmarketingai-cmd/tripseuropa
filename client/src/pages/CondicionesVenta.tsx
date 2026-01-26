import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CreditCard, Shield, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export default function CondicionesVenta() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  const sections = [
    {
      icon: FileText,
      title: { es: "Terminos Generales", en: "General Terms" },
      content: {
        es: [
          "Las presentes condiciones regulan la contratacion de servicios turisticos a traves de Trips Europa",
          "Al realizar una reserva, el cliente acepta integramente estas condiciones",
          "Trips Europa actua como intermediario entre el cliente y los proveedores de servicios",
          "Todos los precios incluyen impuestos aplicables salvo indicacion contraria"
        ],
        en: [
          "These conditions regulate the contracting of tourist services through Trips Europa",
          "By making a reservation, the customer fully accepts these conditions",
          "Trips Europa acts as an intermediary between the customer and service providers",
          "All prices include applicable taxes unless otherwise indicated"
        ]
      }
    },
    {
      icon: CreditCard,
      title: { es: "Pagos y Reservas", en: "Payments and Reservations" },
      content: {
        es: [
          "El pago se realiza a traves de plataformas seguras con encriptacion SSL",
          "Aceptamos tarjetas de credito, debito y transferencias bancarias",
          "Se requiere un deposito minimo del 30% para confirmar la reserva",
          "El saldo restante debe pagarse 30 dias antes de la fecha de viaje"
        ],
        en: [
          "Payment is made through secure platforms with SSL encryption",
          "We accept credit cards, debit cards, and bank transfers",
          "A minimum deposit of 30% is required to confirm the reservation",
          "The remaining balance must be paid 30 days before the travel date"
        ]
      }
    },
    {
      icon: AlertTriangle,
      title: { es: "Cancelaciones y Reembolsos", en: "Cancellations and Refunds" },
      content: {
        es: [
          "Cancelacion gratuita hasta 60 dias antes del viaje",
          "Cancelacion con 30-59 dias: retencion del 25% del total",
          "Cancelacion con 15-29 dias: retencion del 50% del total",
          "Cancelacion con menos de 15 dias: sin reembolso"
        ],
        en: [
          "Free cancellation up to 60 days before travel",
          "Cancellation 30-59 days before: 25% retention of total",
          "Cancellation 15-29 days before: 50% retention of total",
          "Cancellation less than 15 days before: no refund"
        ]
      }
    },
    {
      icon: Shield,
      title: { es: "Responsabilidades", en: "Responsibilities" },
      content: {
        es: [
          "Trips Europa no es responsable por acciones de terceros proveedores",
          "El cliente es responsable de tener documentacion de viaje valida",
          "Recomendamos encarecidamente contratar seguro de viaje",
          "No somos responsables por cancelaciones debidas a fuerza mayor"
        ],
        en: [
          "Trips Europa is not responsible for actions of third-party providers",
          "The customer is responsible for having valid travel documentation",
          "We strongly recommend purchasing travel insurance",
          "We are not responsible for cancellations due to force majeure"
        ]
      }
    },
    {
      icon: Clock,
      title: { es: "Modificaciones", en: "Modifications" },
      content: {
        es: [
          "Cambios de fecha estan sujetos a disponibilidad y cargos adicionales",
          "Cambios de nombre de pasajeros pueden incurrir en penalidades",
          "Las modificaciones deben solicitarse por escrito",
          "Trips Europa notificara cualquier cambio en los servicios contratados"
        ],
        en: [
          "Date changes are subject to availability and additional charges",
          "Passenger name changes may incur penalties",
          "Modifications must be requested in writing",
          "Trips Europa will notify any changes in contracted services"
        ]
      }
    },
    {
      icon: CheckCircle,
      title: { es: "Garantias", en: "Guarantees" },
      content: {
        es: [
          "Garantizamos la veracidad de la informacion publicada",
          "Todos los proveedores son verificados y cumplen estandares de calidad",
          "Ofrecemos asistencia 24/7 durante tu viaje",
          "Proteccion de datos conforme a normativas internacionales"
        ],
        en: [
          "We guarantee the accuracy of published information",
          "All providers are verified and meet quality standards",
          "We offer 24/7 assistance during your trip",
          "Data protection in accordance with international regulations"
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-condiciones-venta">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="text-page-title">
              {lang === "es" ? "Condiciones de Venta" : "Terms and Conditions"}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {lang === "es" 
                ? "Lee atentamente nuestras condiciones antes de realizar tu reserva"
                : "Please read our conditions carefully before making your reservation"
              }
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 max-w-4xl mx-auto">
              {sections.map((section, index) => (
                <Card key={index} className="overflow-hidden" data-testid={`card-section-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <section.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold mb-4">{section.title[lang]}</h2>
                        <ul className="space-y-2">
                          {section.content[lang].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                              <span className="text-primary mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
              <p>
                {lang === "es" 
                  ? "Ultima actualizacion: Enero 2026. Para consultas sobre estas condiciones, contactenos a legal@tripseuropa.com"
                  : "Last updated: January 2026. For inquiries about these conditions, contact us at legal@tripseuropa.com"
                }
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButtons />
    </div>
  );
}
