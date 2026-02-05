import { useI18n } from "@/lib/i18n";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQ[];
  category?: string;
}

/**
 * FAQSchema component for rich snippets in Google Search
 * Implements Schema.org FAQPage markup for better SERP visibility
 *
 * Benefits:
 * - FAQ rich snippets in Google Search Results
 * - Increased click-through rate (CTR)
 * - Better visibility in voice search
 * - Enhanced user experience
 */
export default function FAQSchema({ faqs, category = "travel" }: FAQSchemaProps) {
  const { language } = useI18n();

  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })),
    "about": {
      "@type": "TravelAgency",
      "name": "Trips Europa",
      "category": category
    },
    "inLanguage": language === "pt" ? "pt-BR" : language === "en" ? "en-US" : "es-ES"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

/**
 * Common FAQs for European Travel (ES, EN, PT)
 */
export const commonTravelFAQs = {
  es: [
    {
      question: "¿Necesito visa para viajar a Europa desde Latinoamérica?",
      answer: "Depende de tu nacionalidad. Ciudadanos de México, Argentina, Chile, Colombia (con e-visa), Brasil, Panamá, Costa Rica, Uruguay y Paraguay NO necesitan visa Schengen para estadías turísticas de hasta 90 días. Otros países sí requieren visa. Trips Europa ofrece asesoría completa para el trámite de visa Schengen."
    },
    {
      question: "¿Cuál es la mejor época para viajar a Europa?",
      answer: "La mejor época es primavera (abril-junio) y otoño (septiembre-octubre) por clima agradable y menos turistas. Verano (julio-agosto) es ideal para playas pero más caro y concurrido. Invierno (diciembre-febrero) es perfecto para mercados navideños y deportes de nieve con precios más bajos."
    },
    {
      question: "¿Cuánto cuesta un viaje a Europa desde Latinoamérica?",
      answer: "Un paquete completo de 10-15 días con vuelos, hoteles 4 estrellas, desayuno y tours cuesta entre $1,800-$3,500 USD por persona. Factores que afectan el precio: temporada, ciudades visitadas, categoría de hoteles, duración del viaje. Trips Europa ofrece paquetes desde $1,200 USD con opciones de financiamiento."
    },
    {
      question: "¿Qué documentos necesito para viajar a Europa?",
      answer: "Documentos esenciales: pasaporte vigente (mínimo 6 meses), seguro de viaje obligatorio (mínimo €30,000 cobertura), reserva de hotel confirmada, boletos de avión ida y vuelta, comprobante de solvencia económica (tarjeta de crédito o estados de cuenta). Para algunos países: visa Schengen."
    },
    {
      question: "¿Los tours en Europa son en español?",
      answer: "Sí, todos los paquetes de Trips Europa incluyen guías certificados en español. También ofrecemos tours en portugués e inglés según disponibilidad. Los grupos son de viajeros latinoamericanos, creando un ambiente familiar y cómodo durante todo el viaje."
    },
    {
      question: "¿Puedo pagar mi viaje a Europa en cuotas?",
      answer: "Sí, ofrecemos planes de financiamiento flexibles: hasta 12 meses sin intereses con tarjetas de crédito participantes, pagos parciales desde la reserva, descuentos por pago anticipado. Aceptamos pagos en USD, EUR, MXN, COP, ARS, BRL según tu país de origen."
    },
    {
      question: "¿Qué está incluido en los paquetes de Trips Europa?",
      answer: "Incluido: vuelos internacionales, hoteles 4-5 estrellas con desayuno, traslados aeropuerto-hotel, tours guiados en español, entradas a principales atracciones, seguro de viaje básico, asistencia 24/7. No incluido: comidas no especificadas, propinas, gastos personales, excursiones opcionales."
    },
    {
      question: "¿Es seguro viajar a Europa actualmente?",
      answer: "Sí, Europa es uno de los destinos más seguros del mundo para turismo. Principales ciudades cuentan con excelente infraestructura turística, transporte público seguro y servicios médicos de calidad. Recomendamos seguir medidas básicas de seguridad, contratar seguro de viaje y mantenerse informado sobre condiciones locales."
    }
  ],
  en: [
    {
      question: "Do I need a visa to travel to Europe from Latin America?",
      answer: "It depends on your nationality. Citizens of Mexico, Argentina, Chile, Colombia (with e-visa), Brazil, Panama, Costa Rica, Uruguay, and Paraguay do NOT need a Schengen visa for tourist stays up to 90 days. Other countries do require a visa. Trips Europa offers complete Schengen visa assistance."
    },
    {
      question: "When is the best time to travel to Europe?",
      answer: "The best time is spring (April-June) and autumn (September-October) for pleasant weather and fewer tourists. Summer (July-August) is ideal for beaches but more expensive and crowded. Winter (December-February) is perfect for Christmas markets and snow sports with lower prices."
    },
    {
      question: "How much does a trip to Europe from Latin America cost?",
      answer: "A complete 10-15 day package with flights, 4-star hotels, breakfast and tours costs between $1,800-$3,500 USD per person. Factors affecting price: season, cities visited, hotel category, trip duration. Trips Europa offers packages from $1,200 USD with financing options."
    },
    {
      question: "What documents do I need to travel to Europe?",
      answer: "Essential documents: valid passport (minimum 6 months), mandatory travel insurance (minimum €30,000 coverage), confirmed hotel reservation, round-trip flight tickets, proof of financial solvency (credit card or bank statements). For some countries: Schengen visa."
    },
    {
      question: "Are tours in Europe in Spanish?",
      answer: "Yes, all Trips Europa packages include certified Spanish-speaking guides. We also offer tours in Portuguese and English depending on availability. Groups consist of Latin American travelers, creating a familiar and comfortable atmosphere throughout the trip."
    },
    {
      question: "Can I pay for my Europe trip in installments?",
      answer: "Yes, we offer flexible financing plans: up to 12 months interest-free with participating credit cards, partial payments from reservation, early payment discounts. We accept payments in USD, EUR, MXN, COP, ARS, BRL depending on your country of origin."
    },
    {
      question: "What is included in Trips Europa packages?",
      answer: "Included: international flights, 4-5 star hotels with breakfast, airport-hotel transfers, guided tours in Spanish, entrance to main attractions, basic travel insurance, 24/7 assistance. Not included: unspecified meals, tips, personal expenses, optional excursions."
    },
    {
      question: "Is it safe to travel to Europe currently?",
      answer: "Yes, Europe is one of the safest destinations in the world for tourism. Major cities have excellent tourist infrastructure, safe public transportation and quality medical services. We recommend following basic safety measures, purchasing travel insurance and staying informed about local conditions."
    }
  ],
  pt: [
    {
      question: "Preciso de visto para viajar para a Europa da América Latina?",
      answer: "Depende da sua nacionalidade. Cidadãos do México, Argentina, Chile, Colômbia (com e-visa), Brasil, Panamá, Costa Rica, Uruguai e Paraguai NÃO precisam de visto Schengen para estadias turísticas de até 90 dias. Outros países sim necessitam visto. Trips Europa oferece assessoria completa para o processo de visto Schengen."
    },
    {
      question: "Qual é a melhor época para viajar para a Europa?",
      answer: "A melhor época é primavera (abril-junho) e outono (setembro-outubro) por clima agradável e menos turistas. Verão (julho-agosto) é ideal para praias mas mais caro e lotado. Inverno (dezembro-fevereiro) é perfeito para mercados de Natal e esportes na neve com preços mais baixos."
    },
    {
      question: "Quanto custa uma viagem para a Europa da América Latina?",
      answer: "Um pacote completo de 10-15 dias com voos, hotéis 4 estrelas, café da manhã e passeios custa entre $1,800-$3,500 USD por pessoa. Fatores que afetam o preço: temporada, cidades visitadas, categoria dos hotéis, duração da viagem. Trips Europa oferece pacotes desde $1,200 USD com opções de financiamento."
    },
    {
      question: "Quais documentos preciso para viajar para a Europa?",
      answer: "Documentos essenciais: passaporte válido (mínimo 6 meses), seguro viagem obrigatório (mínimo €30,000 cobertura), reserva de hotel confirmada, passagens aéreas ida e volta, comprovante de capacidade financeira (cartão de crédito ou extratos bancários). Para alguns países: visto Schengen."
    },
    {
      question: "Os tours na Europa são em espanhol?",
      answer: "Sim, todos os pacotes da Trips Europa incluem guias certificados em espanhol. Também oferecemos tours em português e inglês conforme disponibilidade. Os grupos são de viajantes latino-americanos, criando um ambiente familiar e confortável durante toda a viagem."
    },
    {
      question: "Posso pagar minha viagem à Europa em parcelas?",
      answer: "Sim, oferecemos planos de financiamento flexíveis: até 12 meses sem juros com cartões de crédito participantes, pagamentos parciais desde a reserva, descontos por pagamento antecipado. Aceitamos pagamentos em USD, EUR, MXN, COP, ARS, BRL conforme seu país de origem."
    },
    {
      question: "O que está incluído nos pacotes da Trips Europa?",
      answer: "Incluído: voos internacionais, hotéis 4-5 estrelas com café da manhã, transfers aeroporto-hotel, passeios guiados em espanhol, entradas às principais atrações, seguro viagem básico, assistência 24/7. Não incluído: refeições não especificadas, gorjetas, gastos pessoais, excursões opcionais."
    },
    {
      question: "É seguro viajar para a Europa atualmente?",
      answer: "Sim, a Europa é um dos destinos mais seguros do mundo para turismo. As principais cidades têm excelente infraestrutura turística, transporte público seguro e serviços médicos de qualidade. Recomendamos seguir medidas básicas de segurança, contratar seguro viagem e manter-se informado sobre condições locais."
    }
  ]
};
