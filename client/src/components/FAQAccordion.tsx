import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    category: {
      es: "Reservas y Pagos",
      en: "Bookings and Payments",
      pt: "Reservas e Pagamentos"
    },
    items: [
      {
        id: 1,
        question: {
          es: "¿Cuáles son los métodos de pago aceptados?",
          en: "What payment methods are accepted?",
          pt: "Quais são os métodos de pagamento aceitos?"
        },
        answer: {
          es: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, pagos en cuotas sin intereses con Scalapay, y criptomonedas a través de Binance Pay. También puedes pagar en efectivo a través de puntos de pago autorizados.",
          en: "We accept credit and debit cards (Visa, Mastercard, American Express), bank transfers, interest-free installment payments with Scalapay, and cryptocurrencies through Binance Pay. You can also pay in cash through authorized payment points.",
          pt: "Aceitamos cartões de crédito e débito (Visa, Mastercard, American Express), transferências bancárias, pagamentos parcelados sem juros com Scalapay e criptomoedas através do Binance Pay. Você também pode pagar em dinheiro através de pontos de pagamento autorizados."
        }
      },
      {
        id: 2,
        question: {
          es: "¿Es seguro pagar a través de la web?",
          en: "Is it safe to pay through the website?",
          pt: "É seguro pagar pelo site?"
        },
        answer: {
          es: "Sí, utilizamos pasarelas de pago con encriptación SSL de nivel bancario para garantizar que tu información financiera esté siempre protegida.",
          en: "Yes, we use payment gateways with bank-level SSL encryption to ensure your financial information is always protected.",
          pt: "Sim, utilizamos gateways de pagamento com criptografia SSL de nível bancário para garantir que suas informações financeiras estejam sempre protegidas."
        }
      }
    ]
  },
  {
    category: {
      es: "Seguros y Asistencia",
      en: "Insurance and Assistance",
      pt: "Seguros e Assistência"
    },
    items: [
      {
        id: 3,
        question: {
          es: "¿El seguro de viaje está incluido?",
          en: "Is travel insurance included?",
          pt: "O seguro de viagem está incluído?"
        },
        answer: {
          es: "Sí, todos nuestros paquetes incluyen seguro de viaje internacional con cobertura médica integral, asistencia 24/7 y repatriación.",
          en: "Yes, all our packages include international travel insurance with comprehensive medical coverage, 24/7 assistance, and repatriation.",
          pt: "Sim, todos os nossos pacotes incluem seguro de viagem internacional com cobertura médica abrangente, assistência 24/7 e repatriação."
        }
      }
    ]
  },
  {
    category: {
      es: "Personalización",
      en: "Customization",
      pt: "Personalização"
    },
    items: [
      {
        id: 4,
        question: {
          es: "¿Ofrecen viajes en grupo o solo individuales?",
          en: "Do you offer group trips or just individual ones?",
          pt: "Vocês oferecem viagens em grupo ou apenas individuais?"
        },
        answer: {
          es: "Ofrecemos ambas modalidades. Tenemos salidas grupales programadas y también diseñamos viajes privados totalmente personalizados.",
          en: "We offer both options. We have scheduled group departures and also design fully customized private trips.",
          pt: "Oferecemos ambas as modalidades. Temos saídas em grupo programadas e também projetamos viagens privadas totalmente personalizadas."
        }
      },
      {
        id: 5,
        question: {
          es: "¿Pueden personalizar el itinerario?",
          en: "Can you customize the itinerary?",
          pt: "Vocês podem personalizar o itinerário?"
        },
        answer: {
          es: "Absolutamente. Somos expertos en diseñar viajes a la medida. Puedes modificar hoteles, añadir días o experiencias exclusivas.",
          en: "Absolutely. We are experts in designing tailor-made trips. You can modify hotels, add days, or exclusive experiences.",
          pt: "Absolutamente. Somos especialistas em projetar viagens sob medida. Você pode modificar hotéis, adicionar dias ou experiências exclusivas."
        }
      }
    ]
  }
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

  const lang = (language?.split('-')[0] || "es") as "es" | "en" | "pt";
  const content = {
    es: {
      badge: "Preguntas Frecuentes",
      title: "Resolvemos Tus Dudas",
      subtitle: "Encuentra respuestas a las preguntas más comunes sobre nuestros servicios de viaje",
    },
    en: {
      badge: "FAQ",
      title: "We Answer Your Questions",
      subtitle: "Find answers to the most common questions about our travel services",
    },
    pt: {
      badge: "Perguntas Frequentes",
      title: "Resolvemos Suas Dúvidas",
      subtitle: "Encontre respostas para as perguntas mais comuns sobre nossos serviços de viagem",
    },
  };

  const c = content[lang] || content.es;

  return (
    <section className="py-24 bg-gray-50" data-testid="section-faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" data-testid="badge-faq">
            {c.badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-accent mb-4" data-testid="text-faq-title">
            {c.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-faq-subtitle">
            {c.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {FAQ_ITEMS.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-6">
              <h3 className="text-2xl font-bold text-primary border-b pb-2">
                {cat.category[lang]}
              </h3>
              <div className="space-y-4">
                {cat.items.map((item, index) => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      aria-expanded={openItems.includes(item.id)}
                    >
                      <span className="font-semibold text-primary pr-8">
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
                        <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                          {item.answer[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
