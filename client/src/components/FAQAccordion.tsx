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
      en: "What payment methods are accepted?",
      pt: "Quais sao os metodos de pagamento aceitos?"
    },
    answer: {
      es: "Aceptamos tarjetas de credito y debito (Visa, Mastercard, American Express), transferencias bancarias, pagos en cuotas sin intereses con Scalapay, y criptomonedas a traves de Binance Pay. Tambien puedes pagar en efectivo a traves de puntos de pago autorizados como Bancolombia, Efecty y Baloto en Colombia.",
      en: "We accept credit and debit cards (Visa, Mastercard, American Express), bank transfers, interest-free installment payments with Scalapay, and cryptocurrencies through Binance Pay. You can also pay in cash through authorized payment points like Bancolombia, Efecty and Baloto in Colombia.",
      pt: "Aceitamos cartoes de credito e debito (Visa, Mastercard, American Express), transferencias bancarias, pagamentos parcelados sem juros com Scalapay e criptomoedas atraves do Binance Pay. Voce tambem pode pagar em dinheiro atraves de pontos de pagamento autorizados como Bancolombia, Efecty e Baloto na Colombia."
    }
  },
  {
    id: 3,
    question: {
      es: "El seguro de viaje esta incluido?",
      en: "Is travel insurance included?",
      pt: "O seguro de viagem esta incluido?"
    },
    answer: {
      es: "Si, todos nuestros paquetes incluyen seguro de viaje internacional con cobertura medica de hasta $50,000 USD, cancelacion de viaje, perdida de equipaje, asistencia 24/7 en espanol, y repatriacion. Puedes ampliar la cobertura con nuestro seguro VIP que incluye deportes extremos y condiciones preexistentes.",
      en: "Yes, all our packages include international travel insurance with medical coverage up to $50,000 USD, trip cancellation, lost luggage, 24/7 assistance in Spanish, and repatriation. You can extend coverage with our VIP insurance that includes extreme sports and pre-existing conditions.",
      pt: "Sim, todos os nossos pacotes incluem seguro de viagem internacional com cobertura medica de ate $50.000 USD, cancelamento de viagem, perda de bagagem, assistencia 24/7 em portugues e repatriacao. Voce pode ampliar a cobertura com nosso seguro VIP que inclui esportes radicais e condicoes preexistentes."
    }
  },
  {
    id: 4,
    question: {
      es: "Ofrecen viajes en grupo o solo individuales?",
      en: "Do you offer group trips or just individual ones?",
      pt: "Voces oferecem viagens em grupo ou apenas individuais?"
    },
    answer: {
      es: "Ofrecemos ambas modalidades. Tenemos salidas grupales programadas cada mes con grupos de 15-30 personas, perfectas para viajeros solos que quieren conocer gente. Tambien diseñamos viajes privados totalmente personalizados para familias, parejas, lunas de miel, grupos de amigos, viajes corporativos y excursiones escolares.",
      en: "We offer both options. We have scheduled group departures every month with groups of 15-30 people, perfect for solo travelers who want to meet people. We also design fully customized private trips for families, couples, honeymoons, groups of friends, corporate trips, and school excursions.",
      pt: "Oferecemos ambas as modalidades. Temos saidas em grupo programadas todo mes com grupos de 15-30 pessoas, perfeitas para viajantes sozinhos que querem conhecer pessoas. Tambem projetamos viagens privadas totalmente personalizadas para familias, casais, luas de mel, grupos de amigos, viagens corporativas e excursoes escolares."
    }
  },
  {
    id: 5,
    question: {
      es: "Pueden personalizar el itinerario?",
      en: "Can you customize the itinerary?",
      pt: "Voces podem personalizar o itinerario?"
    },
    answer: {
      es: "Absolutamente. Somos expertos en diseñar viajes a la medida. Puedes modificar cualquiera de nuestros paquetes existentes o crear uno desde cero. Añade dias extra, cambia hoteles, incluye experiencias exclusivas como tours privados, cenas gourmet, clases de cocina, o cualquier actividad especial. Nuestros asesores te ayudan a crear el viaje perfecto.",
      en: "Absolutely. We are experts in designing tailor-made trips. You can modify any of our existing packages or create one from scratch. Add extra days, change hotels, include exclusive experiences like private tours, gourmet dinners, cooking classes, or any special activity. Our advisors help you create the perfect trip.",
      pt: "Absolutamente. Somos especialistas em projetar viagens sob medida. Voce pode modificar qualquer um dos nossos pacotes existentes ou criar um do zero. Adicione dias extras, mude hoteis, inclua experiencias exclusivas como tours privados, jantares gourmet, aulas de culinaria ou qualquer atividade especial. Nossos consultores ajudam voce a criar a viagem perfeita."
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

  const lang = language as "es" | "en" | "pt";

  const content = {
    es: {
      badge: "Preguntas Frecuentes",
      title: "Resolvemos Tus Dudas",
      subtitle: "Encuentra respuestas a las preguntas mas comunes sobre nuestros servicios de viaje",
    },
    en: {
      badge: "FAQ",
      title: "We Answer Your Questions",
      subtitle: "Find answers to the most common questions about our travel services",
    },
    pt: {
      badge: "Perguntas Frequentes",
      title: "Resolvemos Suas Duvidas",
      subtitle: "Encontre respostas para as perguntas mais comuns sobre nossos servicos de viagem",
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
