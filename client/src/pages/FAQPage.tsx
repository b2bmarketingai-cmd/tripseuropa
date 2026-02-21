import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { FloatingContactButtons } from "@/components/support";
import { FAQSchema } from "@/components/SEOSchema";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  HelpCircle, CreditCard, FileText, Plane,
  Building, ShieldCheck, Globe, Phone
} from "lucide-react";

type Lang = "es" | "en" | "pt";

interface FAQEntry {
  question: Record<Lang, string>;
  answer: Record<Lang, string>;
}

interface FAQCategory {
  title: Record<Lang, string>;
  icon: typeof HelpCircle;
  items: FAQEntry[];
}

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    title: { es: "Reservas y Pagos", en: "Bookings & Payments", pt: "Reservas e Pagamentos" },
    icon: CreditCard,
    items: [
      {
        question: { es: "Como puedo reservar un viaje con Trips Europa?", en: "How can I book a trip with Trips Europa?", pt: "Como posso reservar uma viagem com a Trips Europa?" },
        answer: { es: "Puedes reservar a traves de nuestra pagina web, por WhatsApp al +34 611 105 448 o llamando a nuestro centro de atencion. Un asesor te guiara en todo el proceso de reserva y personalizara tu itinerario.", en: "You can book through our website, via WhatsApp at +34 611 105 448, or by calling our support center. An advisor will guide you through the entire booking process and customize your itinerary.", pt: "Voce pode reservar atraves do nosso site, pelo WhatsApp no +34 611 105 448 ou ligando para nosso centro de atendimento. Um consultor ira guia-lo em todo o processo de reserva e personalizar seu roteiro." },
      },
      {
        question: { es: "Que metodos de pago aceptan?", en: "What payment methods do you accept?", pt: "Quais metodos de pagamento voces aceitam?" },
        answer: { es: "Aceptamos tarjetas de credito y debito (Visa, Mastercard, American Express), transferencias bancarias internacionales, PayPal y plataformas de pago digital. Tambien ofrecemos planes de pago en cuotas sin intereses.", en: "We accept credit and debit cards (Visa, Mastercard, American Express), international bank transfers, PayPal, and digital payment platforms. We also offer interest-free installment payment plans.", pt: "Aceitamos cartoes de credito e debito (Visa, Mastercard, American Express), transferencias bancarias internacionais, PayPal e plataformas de pagamento digital. Tambem oferecemos planos de pagamento parcelado sem juros." },
      },
      {
        question: { es: "Puedo cancelar o modificar mi reserva?", en: "Can I cancel or modify my booking?", pt: "Posso cancelar ou modificar minha reserva?" },
        answer: { es: "Si, puedes modificar o cancelar tu reserva segun nuestras politicas. Modificaciones sin cargo hasta 30 dias antes de la salida. Cancelaciones con reembolso parcial o total dependiendo del tiempo de anticipacion. Consulta nuestras condiciones de venta para mas detalles.", en: "Yes, you can modify or cancel your booking according to our policies. Free modifications up to 30 days before departure. Cancellations with partial or full refund depending on advance notice. Check our sales conditions for more details.", pt: "Sim, voce pode modificar ou cancelar sua reserva de acordo com nossas politicas. Modificacoes sem custo ate 30 dias antes da partida. Cancelamentos com reembolso parcial ou total dependendo da antecedencia. Consulte nossas condicoes de venda para mais detalhes." },
      },
      {
        question: { es: "Ofrecen financiacion o pago en cuotas?", en: "Do you offer financing or installment payments?", pt: "Voces oferecem financiamento ou pagamento parcelado?" },
        answer: { es: "Si, ofrecemos planes de financiacion de hasta 12 cuotas sin intereses con tarjetas de credito seleccionadas. Tambien puedes reservar con un deposito inicial del 30% y completar el pago antes de la fecha de viaje.", en: "Yes, we offer financing plans of up to 12 interest-free installments with select credit cards. You can also book with an initial deposit of 30% and complete payment before your travel date.", pt: "Sim, oferecemos planos de financiamento de ate 12 parcelas sem juros com cartoes de credito selecionados. Voce tambem pode reservar com um deposito inicial de 30% e completar o pagamento antes da data da viagem." },
      },
    ],
  },
  {
    title: { es: "Documentos y Visas", en: "Documents & Visas", pt: "Documentos e Vistos" },
    icon: FileText,
    items: [
      {
        question: { es: "Necesito visa para viajar a Europa?", en: "Do I need a visa to travel to Europe?", pt: "Preciso de visto para viajar para a Europa?" },
        answer: { es: "Depende de tu nacionalidad. Los ciudadanos de Colombia, Mexico, Argentina, Chile, Brasil y Peru pueden visitar el espacio Schengen por hasta 90 dias sin visa para turismo. Los ciudadanos de Venezuela y Ecuador necesitan visa Schengen. Te asesoramos con todos los requisitos.", en: "It depends on your nationality. Citizens of Colombia, Mexico, Argentina, Chile, Brazil, and Peru can visit the Schengen area for up to 90 days without a visa for tourism. Citizens of Venezuela and Ecuador need a Schengen visa. We assist you with all requirements.", pt: "Depende da sua nacionalidade. Cidadaos da Colombia, Mexico, Argentina, Chile, Brasil e Peru podem visitar o espaco Schengen por ate 90 dias sem visto para turismo. Cidadaos da Venezuela e Equador precisam de visto Schengen. Assessoramos com todos os requisitos." },
      },
      {
        question: { es: "Que documentos necesito para viajar a Europa?", en: "What documents do I need to travel to Europe?", pt: "Quais documentos preciso para viajar para a Europa?" },
        answer: { es: "Necesitas pasaporte vigente con al menos 6 meses de validez, seguro de viaje con cobertura minima de 30,000 EUR, comprobante de alojamiento, boletos de avion de ida y vuelta, y solvencia economica demostrable. Para visa Schengen, se requieren documentos adicionales.", en: "You need a valid passport with at least 6 months validity, travel insurance with minimum coverage of 30,000 EUR, proof of accommodation, round-trip plane tickets, and demonstrable financial solvency. For a Schengen visa, additional documents are required.", pt: "Voce precisa de passaporte valido com pelo menos 6 meses de validade, seguro viagem com cobertura minima de 30.000 EUR, comprovante de hospedagem, passagens aereas de ida e volta e comprovacao de solvencia financeira. Para visto Schengen, documentos adicionais sao necessarios." },
      },
      {
        question: { es: "Que es el visado Schengen y como tramitarlo?", en: "What is the Schengen visa and how to apply?", pt: "O que e o visto Schengen e como solicita-lo?" },
        answer: { es: "El visado Schengen permite viajar por 26 paises europeos. Se tramita en la embajada o consulado del pais principal de destino. Requiere formulario de solicitud, fotos, seguro de viaje, reservas y extractos bancarios. Nuestro equipo te asesora en cada paso del proceso.", en: "The Schengen visa allows travel across 26 European countries. It is processed at the embassy or consulate of the main destination country. It requires an application form, photos, travel insurance, reservations, and bank statements. Our team advises you at every step.", pt: "O visto Schengen permite viajar por 26 paises europeus. E processado na embaixada ou consulado do principal pais de destino. Requer formulario de solicitacao, fotos, seguro viagem, reservas e extratos bancarios. Nossa equipe assessora voce em cada etapa do processo." },
      },
      {
        question: { es: "Es obligatorio el seguro de viaje para Europa?", en: "Is travel insurance mandatory for Europe?", pt: "O seguro viagem e obrigatorio para a Europa?" },
        answer: { es: "Si, el seguro de viaje es obligatorio para ingresar al espacio Schengen. Debe tener una cobertura minima de 30,000 EUR y cubrir gastos medicos, hospitalizacion y repatriacion. Todos nuestros paquetes incluyen seguro de viaje completo.", en: "Yes, travel insurance is mandatory to enter the Schengen area. It must have minimum coverage of 30,000 EUR and cover medical expenses, hospitalization, and repatriation. All our packages include comprehensive travel insurance.", pt: "Sim, o seguro viagem e obrigatorio para entrar no espaco Schengen. Deve ter cobertura minima de 30.000 EUR e cobrir despesas medicas, hospitalizacao e repatriacao. Todos os nossos pacotes incluem seguro viagem completo." },
      },
    ],
  },
  {
    title: { es: "Sobre los Viajes", en: "About the Trips", pt: "Sobre as Viagens" },
    icon: Plane,
    items: [
      {
        question: { es: "Que incluyen los paquetes de viaje?", en: "What is included in the travel packages?", pt: "O que esta incluido nos pacotes de viagem?" },
        answer: { es: "Nuestros paquetes incluyen vuelos de ida y vuelta, alojamiento en hoteles 4-5 estrellas, traslados aeropuerto-hotel, tours guiados en espanol, seguro de viaje y algunas comidas segun el paquete. Los detalles especificos se indican en cada oferta.", en: "Our packages include round-trip flights, accommodation in 4-5 star hotels, airport-hotel transfers, guided tours in Spanish, travel insurance, and some meals depending on the package. Specific details are indicated in each offer.", pt: "Nossos pacotes incluem voos de ida e volta, hospedagem em hoteis 4-5 estrelas, traslados aeroporto-hotel, tours guiados em espanhol, seguro viagem e algumas refeicoes dependendo do pacote. Detalhes especificos sao indicados em cada oferta." },
      },
      {
        question: { es: "Cuanto equipaje puedo llevar?", en: "How much luggage can I bring?", pt: "Quanta bagagem posso levar?" },
        answer: { es: "Generalmente los vuelos incluyen una maleta de mano (hasta 10 kg) y una maleta facturada (hasta 23 kg). Las politicas varian segun la aerolinea. Te informaremos de los limites exactos al confirmar tu reserva.", en: "Generally, flights include one carry-on bag (up to 10 kg) and one checked bag (up to 23 kg). Policies vary by airline. We will inform you of the exact limits when confirming your booking.", pt: "Geralmente os voos incluem uma mala de mao (ate 10 kg) e uma mala despachada (ate 23 kg). As politicas variam de acordo com a companhia aerea. Informaremos os limites exatos ao confirmar sua reserva." },
      },
      {
        question: { es: "Cual es la mejor epoca para viajar a Europa?", en: "What is the best time to travel to Europe?", pt: "Qual e a melhor epoca para viajar para a Europa?" },
        answer: { es: "Depende del destino y tus preferencias. La primavera (abril-junio) y el otono (septiembre-noviembre) ofrecen buen clima y menos turistas. El verano (julio-agosto) es ideal para playas y festivales. El invierno es perfecto para mercados navidenos y esqui en los Alpes.", en: "It depends on the destination and your preferences. Spring (April-June) and fall (September-November) offer good weather and fewer tourists. Summer (July-August) is ideal for beaches and festivals. Winter is perfect for Christmas markets and Alpine skiing.", pt: "Depende do destino e de suas preferencias. A primavera (abril-junho) e o outono (setembro-novembro) oferecem bom clima e menos turistas. O verao (julho-agosto) e ideal para praias e festivais. O inverno e perfeito para mercados natalinos e esqui nos Alpes." },
      },
      {
        question: { es: "Los tours son en espanol?", en: "Are the tours in Spanish?", pt: "Os tours sao em espanhol?" },
        answer: { es: "Si, todos nuestros tours incluyen guias que hablan espanol. Tambien ofrecemos opciones con guias bilingues (espanol-ingles o espanol-portugues) segun la demanda del grupo.", en: "Yes, all our tours include Spanish-speaking guides. We also offer bilingual guide options (Spanish-English or Spanish-Portuguese) depending on group demand.", pt: "Sim, todos os nossos tours incluem guias que falam espanhol. Tambem oferecemos opcoes com guias bilingues (espanhol-ingles ou espanhol-portugues) de acordo com a demanda do grupo." },
      },
    ],
  },
  {
    title: { es: "Sobre Trips Europa", en: "About Trips Europa", pt: "Sobre a Trips Europa" },
    icon: Building,
    items: [
      {
        question: { es: "Quienes son Trips Europa?", en: "Who is Trips Europa?", pt: "Quem e a Trips Europa?" },
        answer: { es: "Somos una agencia de viajes premium especializada en paquetes turisticos a Europa desde Latinoamerica. Contamos con mas de 15,000 viajeros satisfechos, presencia en mas de 10 paises y un equipo de asesores expertos en destinos europeos.", en: "We are a premium travel agency specializing in tourist packages to Europe from Latin America. We have over 15,000 satisfied travelers, a presence in more than 10 countries, and a team of expert advisors on European destinations.", pt: "Somos uma agencia de viagens premium especializada em pacotes turisticos para a Europa a partir da America Latina. Temos mais de 15.000 viajantes satisfeitos, presenca em mais de 10 paises e uma equipe de consultores especialistas em destinos europeus." },
      },
      {
        question: { es: "Como puedo contactar al soporte?", en: "How can I contact support?", pt: "Como posso entrar em contato com o suporte?" },
        answer: { es: "Puedes contactarnos por WhatsApp al +34 611 105 448 (disponible 24/7), por email a info@tripseuropa.com, a traves del chat en vivo en nuestra web, o llamando a nuestro centro de atencion. Tambien puedes visitarnos en nuestras oficinas.", en: "You can contact us via WhatsApp at +34 611 105 448 (available 24/7), by email at info@tripseuropa.com, through live chat on our website, or by calling our support center. You can also visit us at our offices.", pt: "Voce pode nos contatar pelo WhatsApp no +34 611 105 448 (disponivel 24/7), por email em info@tripseuropa.com, atraves do chat ao vivo em nosso site ou ligando para nosso centro de atendimento. Voce tambem pode nos visitar em nossos escritorios." },
      },
      {
        question: { es: "Ofrecen garantia en sus viajes?", en: "Do you offer a guarantee on your trips?", pt: "Voces oferecem garantia nas viagens?" },
        answer: { es: "Si, ofrecemos nuestra Garantia de Mejor Precio: si encuentras el mismo paquete a menor precio en otra agencia, igualamos o mejoramos la oferta. Ademas, todos nuestros viajes estan respaldados por seguros de viaje completos y nuestro equipo de soporte 24/7.", en: "Yes, we offer our Best Price Guarantee: if you find the same package at a lower price with another agency, we match or beat the offer. Additionally, all our trips are backed by comprehensive travel insurance and our 24/7 support team.", pt: "Sim, oferecemos nossa Garantia de Melhor Preco: se voce encontrar o mesmo pacote a um preco menor em outra agencia, igualamos ou superamos a oferta. Alem disso, todas as nossas viagens sao respaldadas por seguros de viagem completos e nossa equipe de suporte 24/7." },
      },
    ],
  },
];

export default function FAQPage() {
  const { t, language } = useI18n();
  const lang = language as Lang;

  const content = {
    seoTitle: { es: "Preguntas Frecuentes - Trips Europa", en: "Frequently Asked Questions - Trips Europa", pt: "Perguntas Frequentes - Trips Europa" },
    seoDesc: { es: "Encuentra respuestas a las preguntas mas frecuentes sobre viajes a Europa, reservas, pagos, visas y mas.", en: "Find answers to frequently asked questions about travel to Europe, bookings, payments, visas and more.", pt: "Encontre respostas para as perguntas mais frequentes sobre viagens para a Europa, reservas, pagamentos, vistos e mais." },
    heroBadge: { es: "Centro de Ayuda", en: "Help Center", pt: "Central de Ajuda" },
    heroTitle: { es: "Preguntas Frecuentes", en: "Frequently Asked Questions", pt: "Perguntas Frequentes" },
    heroSubtitle: { es: "Encuentra respuestas rapidas a las dudas mas comunes sobre nuestros viajes, reservas, pagos y servicios.", en: "Find quick answers to the most common questions about our trips, bookings, payments and services.", pt: "Encontre respostas rapidas para as duvidas mais comuns sobre nossas viagens, reservas, pagamentos e servicos." },
    contactTitle: { es: "No encuentras lo que buscas?", en: "Can't find what you're looking for?", pt: "Nao encontra o que procura?" },
    contactDesc: { es: "Nuestro equipo de soporte esta disponible 24/7 para ayudarte con cualquier consulta.", en: "Our support team is available 24/7 to help you with any questions.", pt: "Nossa equipe de suporte esta disponivel 24/7 para ajuda-lo com qualquer duvida." },
    contactWhatsApp: { es: "WhatsApp: +34 611 105 448", en: "WhatsApp: +34 611 105 448", pt: "WhatsApp: +34 611 105 448" },
    contactEmail: { es: "Email: info@tripseuropa.com", en: "Email: info@tripseuropa.com", pt: "Email: info@tripseuropa.com" },
  };

  const tx = (key: keyof typeof content) => content[key][lang] || content[key].es;

  const allFaqsFlat = FAQ_CATEGORIES.flatMap((cat) =>
    cat.items.map((item) => ({
      question: item.question[lang] || item.question.es,
      answer: item.answer[lang] || item.answer.es,
    }))
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title={tx("seoTitle")} description={tx("seoDesc")} />
      <Header />

      <section className="relative py-24 md:py-32 bg-primary overflow-hidden" data-testid="section-faq-hero">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=60&w=1200&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/95" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-6 h-6 text-accent" />
            <Badge className="bg-accent/20 text-accent border-accent/30" data-testid="badge-faq">
              {tx("heroBadge")}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-faq-title">
            {tx("heroTitle")}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto" data-testid="text-faq-subtitle">
            {tx("heroSubtitle")}
          </p>
        </div>
      </section>

      <section className="py-20" data-testid="section-faq-content">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-10">
            {FAQ_CATEGORIES.map((category, catIndex) => {
              const Icon = category.icon;
              return (
                <div key={catIndex} data-testid={`faq-category-${catIndex}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-md bg-accent/10">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h2 className="text-2xl font-display font-bold" data-testid={`text-faq-category-${catIndex}`}>
                      {category.title[lang] || category.title.es}
                    </h2>
                  </div>
                  <Card data-testid={`card-faq-category-${catIndex}`}>
                    <CardContent className="p-0">
                      <Accordion type="single" collapsible className="w-full">
                        {category.items.map((item, itemIndex) => (
                          <AccordionItem
                            key={itemIndex}
                            value={`cat-${catIndex}-item-${itemIndex}`}
                            className="px-6"
                            data-testid={`faq-item-${catIndex}-${itemIndex}`}
                          >
                            <AccordionTrigger className="text-left font-medium" data-testid={`faq-trigger-${catIndex}-${itemIndex}`}>
                              {item.question[lang] || item.question.es}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed" data-testid={`faq-content-${catIndex}-${itemIndex}`}>
                              {item.answer[lang] || item.answer.es}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-faq-contact">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <ShieldCheck className="w-10 h-10 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-3" data-testid="text-faq-contact-title">
                {tx("contactTitle")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {tx("contactDesc")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent" />
                  <span>{tx("contactWhatsApp")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent" />
                  <span>{tx("contactEmail")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />

      <FAQSchema questions={allFaqsFlat} />
    </div>
  );
}
