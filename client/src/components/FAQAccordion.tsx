import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    id: 1,
    question: {
      es: "Cuales son los metodos de pago aceptados?",
      en: "What payment methods are accepted?"
    },
    answer: {
      es: "Aceptamos tarjetas de credito y debito (Visa, Mastercard, American Express), transferencias bancarias, pagos en cuotas sin intereses con Scalapay, y criptomonedas a traves de Binance Pay. Tambien puedes pagar en efectivo en nuestras oficinas o a traves de puntos de pago autorizados como Efecty y Baloto en Colombia.",
      en: "We accept credit and debit cards (Visa, Mastercard, American Express), bank transfers, interest-free installment payments with Scalapay, and cryptocurrencies through Binance Pay. You can also pay in cash at our offices or through authorized payment points like Efecty and Baloto in Colombia."
    }
  },
  {
    id: 2,
    question: {
      es: "Cual es la politica de cancelacion?",
      en: "What is the cancellation policy?"
    },
    answer: {
      es: "Ofrecemos cancelacion gratuita hasta 60 dias antes del viaje con reembolso completo. Entre 30-60 dias, se retiene el 25% del valor. Entre 15-30 dias, se retiene el 50%. Menos de 15 dias, el 75%. Cancelaciones de ultimo momento (menos de 7 dias) no tienen reembolso, pero puedes reprogramar para otra fecha pagando la diferencia de tarifas si aplica.",
      en: "We offer free cancellation up to 60 days before the trip with a full refund. Between 30-60 days, 25% is retained. Between 15-30 days, 50% is retained. Less than 15 days, 75%. Last-minute cancellations (less than 7 days) are non-refundable, but you can reschedule for another date paying the fare difference if applicable."
    }
  },
  {
    id: 3,
    question: {
      es: "El seguro de viaje esta incluido?",
      en: "Is travel insurance included?"
    },
    answer: {
      es: "Si, todos nuestros paquetes incluyen seguro de viaje internacional con cobertura medica de hasta $50,000 USD, cancelacion de viaje, perdida de equipaje, asistencia 24/7 en espanol, y repatriacion. Puedes ampliar la cobertura con nuestro seguro VIP que incluye deportes extremos y condiciones preexistentes.",
      en: "Yes, all our packages include international travel insurance with medical coverage up to $50,000 USD, trip cancellation, lost luggage, 24/7 assistance in Spanish, and repatriation. You can extend coverage with our VIP insurance that includes extreme sports and pre-existing conditions."
    }
  },
  {
    id: 4,
    question: {
      es: "Ofrecen viajes en grupo o solo individuales?",
      en: "Do you offer group trips or just individual ones?"
    },
    answer: {
      es: "Ofrecemos ambas modalidades. Tenemos salidas grupales programadas cada mes con grupos de 15-30 personas, perfectas para viajeros solos que quieren conocer gente. Tambien diseñamos viajes privados totalmente personalizados para familias, parejas, lunas de miel, grupos de amigos, viajes corporativos y excursiones escolares.",
      en: "We offer both options. We have scheduled group departures every month with groups of 15-30 people, perfect for solo travelers who want to meet people. We also design fully customized private trips for families, couples, honeymoons, groups of friends, corporate trips, and school excursions."
    }
  },
  {
    id: 5,
    question: {
      es: "Pueden personalizar el itinerario?",
      en: "Can you customize the itinerary?"
    },
    answer: {
      es: "Absolutamente. Somos expertos en diseñar viajes a la medida. Puedes modificar cualquiera de nuestros paquetes existentes o crear uno desde cero. Añade dias extra, cambia hoteles, incluye experiencias exclusivas como tours privados, cenas gourmet, clases de cocina, o cualquier actividad especial. Nuestros asesores te ayudan a crear el viaje perfecto.",
      en: "Absolutely. We are experts in designing tailor-made trips. You can modify any of our existing packages or create one from scratch. Add extra days, change hotels, include exclusive experiences like private tours, gourmet dinners, cooking classes, or any special activity. Our advisors help you create the perfect trip."
    }
  },
];

export function FAQAccordion() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { language } = useI18n();

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const lang = language as "es" | "en";

  return (
    <section className="py-24 bg-gray-50" data-testid="section-faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" data-testid="badge-faq">
            {language === "es" ? "Preguntas Frecuentes" : "FAQ"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-accent mb-4" data-testid="text-faq-title">
            {language === "es" ? "Resolvemos Tus Dudas" : "We Answer Your Questions"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-faq-subtitle">
            {language === "es" 
              ? "Encuentra respuestas a las preguntas mas comunes sobre nuestros servicios de viaje"
              : "Find answers to the most common questions about our travel services"}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              data-testid={`faq-item-${index}`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={openItems.includes(item.id)}
                data-testid={`button-faq-${index}`}
              >
                <span className="font-semibold text-primary pr-8" data-testid={`text-faq-question-${index}`}>
                  {item.question[lang]}
                </span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300",
                    openItems.includes(item.id) && "rotate-180"
                  )}
                />
              </button>
              <div 
                className={cn(
                  "grid transition-all duration-300",
                  openItems.includes(item.id) ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p 
                    className="px-6 pb-6 text-muted-foreground leading-relaxed"
                    data-testid={`text-faq-answer-${index}`}
                  >
                    {item.answer[lang]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
