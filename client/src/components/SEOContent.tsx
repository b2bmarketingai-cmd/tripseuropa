import { useI18n } from "@/lib/i18n";
import FAQSchema, { commonTravelFAQs } from "./FAQSchema";

/**
 * SEOContent Component - Rich content for top Google rankings
 *
 * Strategy:
 * - Semantic HTML5 (article, section, h1-h6)
 * - Strategic keyword placement (density 1-2%)
 * - Long-tail keywords for voice search
 * - LSI keywords (Latent Semantic Indexing)
 * - FAQ schema for rich snippets
 * - Internal linking optimization
 * - E-A-T signals (Expertise, Authority, Trust)
 *
 * Target keywords (ES): "viajes a europa", "paquetes europa",
 * "viajes europa desde colombia/mexico/brasil"
 *
 * Target keywords (EN): "europe travel packages", "european tours",
 * "travel to europe from latin america"
 *
 * Target keywords (PT): "viagens para europa", "pacotes europa",
 * "viajar para europa do brasil"
 */
export default function SEOContent() {
  const { language } = useI18n();
  const lang = language as "es" | "en" | "pt";

  const content = {
    es: {
      h1: "Viajes a Europa desde Latinoamérica - Paquetes Turísticos",
      h2Main: "Los Mejores Paquetes de Viaje a Europa con Todo Incluido",
      intro: `Descubre Europa con <strong>Trips Europa</strong>, la agencia de viajes líder en paquetes turísticos a Europa desde Latinoamérica.
      Ofrecemos viajes a Europa desde Colombia, México, Argentina, Brasil, Perú, Panamá y toda América Latina con <em>vuelos, hoteles 5 estrellas,
      tours en español y asistencia completa para visa Schengen</em>.`,

      h2Why: "¿Por Qué Elegir Trips Europa para tu Viaje a Europa?",
      whyPoints: [
        "<strong>Especialistas en Europa</strong>: Más de 10 años organizando viajes a Europa para viajeros latinoamericanos",
        "<strong>Tours en Español</strong>: Todos nuestros paquetes incluyen guías certificados en español, portugués e inglés",
        "<strong>Mejor Precio Garantizado</strong>: Comparamos más de 500 proveedores para ofrecerte las mejores tarifas en viajes a Europa",
        "<strong>Financiamiento Flexible</strong>: Paga tu viaje en hasta 12 cuotas sin intereses con tarjetas de crédito",
        "<strong>Asistencia Visa Schengen</strong>: Te ayudamos con todo el proceso de solicitud de visa para viajar a Europa",
        "<strong>Atención 24/7</strong>: Soporte en español durante tu viaje por Europa"
      ],

      h2Destinations: "Destinos Más Populares para Viajar a Europa",
      destinations: [
        {
          name: "Viajes a Francia",
          desc: "París, Torre Eiffel, Louvre, Versalles, Riviera Francesa. Paquetes desde $1,899 USD"
        },
        {
          name: "Viajes a Italia",
          desc: "Roma, Vaticano, Venecia, Florencia, Costa Amalfitana. Paquetes desde $2,099 USD"
        },
        {
          name: "Viajes a España",
          desc: "Madrid, Barcelona, Sevilla, Granada, Costa del Sol. Paquetes desde $1,799 USD"
        },
        {
          name: "Viajes a Grecia",
          desc: "Atenas, Santorini, Mykonos, Meteora, Delfos. Paquetes desde $2,299 USD"
        }
      ],

      h2Countries: "Viajes a Europa desde tu País",
      countryLinks: [
        "Viajes a Europa desde Colombia - Vuelos desde Bogotá y Medellín",
        "Viajes a Europa desde México - Salidas desde CDMX, sin visa requerida",
        "Viagens para Europa do Brasil - Voos de São Paulo e Rio de Janeiro",
        "Viajes a Europa desde Argentina - Tours con ciudadanía italiana/española",
        "Viajes a Europa desde Perú - Vuelos desde Lima con conexiones",
        "Viajes a Europa desde Panamá - Hub Copa Airlines, sin visa",
        "Viajes a Europa desde Costa Rica - Paquetes todo incluido sin visa"
      ],

      h2Process: "Cómo Funciona tu Viaje a Europa con Trips Europa",
      steps: [
        "<strong>1. Elige tu Destino</strong>: Selecciona entre más de 50 paquetes de viajes a Europa o personaliza tu itinerario",
        "<strong>2. Solicita Cotización</strong>: Recibe una propuesta detallada con precios, incluidos vuelos internacionales y hoteles",
        "<strong>3. Reserva y Paga</strong>: Asegura tu viaje con un anticipo del 30% y paga el saldo en cuotas",
        "<strong>4. Asistencia de Visa</strong>: Te guiamos en el proceso de visa Schengen (si aplica) con documentación completa",
        "<strong>5. Viaja y Disfruta</strong>: Vuela a Europa y disfruta tu viaje con guías en español y soporte 24/7"
      ],

      h2FAQ: "Preguntas Frecuentes sobre Viajes a Europa",
      cta: "Cotiza tu Viaje a Europa Ahora - Respuesta en 24 Horas"
    },

    en: {
      h1: "European Travel Packages from Latin America - Tours",
      h2Main: "Best All-Inclusive Europe Travel Packages",
      intro: `Discover Europe with <strong>Trips Europa</strong>, the leading travel agency in European tour packages from Latin America.
      We offer Europe travel from Colombia, Mexico, Argentina, Brazil, Peru, Panama and all of Latin America with <em>flights, 5-star hotels,
      Spanish-speaking tours and complete Schengen visa assistance</em>.`,

      h2Why: "Why Choose Trips Europa for Your European Trip?",
      whyPoints: [
        "<strong>Europe Specialists</strong>: Over 10 years organizing European trips for Latin American travelers",
        "<strong>Spanish-Speaking Tours</strong>: All our packages include certified guides in Spanish, Portuguese and English",
        "<strong>Best Price Guaranteed</strong>: We compare over 500 suppliers to offer you the best European travel rates",
        "<strong>Flexible Financing</strong>: Pay for your trip in up to 12 interest-free installments with credit cards",
        "<strong>Schengen Visa Assistance</strong>: We help you with the entire visa application process to travel to Europe",
        "<strong>24/7 Support</strong>: Spanish-language support during your European trip"
      ],

      h2Destinations: "Most Popular Destinations for European Travel",
      destinations: [
        {
          name: "France Travel",
          desc: "Paris, Eiffel Tower, Louvre, Versailles, French Riviera. Packages from $1,899 USD"
        },
        {
          name: "Italy Travel",
          desc: "Rome, Vatican, Venice, Florence, Amalfi Coast. Packages from $2,099 USD"
        },
        {
          name: "Spain Travel",
          desc: "Madrid, Barcelona, Seville, Granada, Costa del Sol. Packages from $1,799 USD"
        },
        {
          name: "Greece Travel",
          desc: "Athens, Santorini, Mykonos, Meteora, Delphi. Packages from $2,299 USD"
        }
      ],

      h2Countries: "European Travel from Your Country",
      countryLinks: [
        "Europe Travel from Colombia - Flights from Bogotá and Medellín",
        "Europe Travel from Mexico - Departures from CDMX, no visa required",
        "Viagens para Europa do Brasil - Flights from São Paulo and Rio",
        "Europe Travel from Argentina - Tours with Italian/Spanish citizenship",
        "Europe Travel from Peru - Flights from Lima with connections",
        "Europe Travel from Panama - Copa Airlines hub, no visa required",
        "Europe Travel from Costa Rica - All-inclusive packages, no visa"
      ],

      h2Process: "How Your European Trip Works with Trips Europa",
      steps: [
        "<strong>1. Choose Your Destination</strong>: Select from over 50 European travel packages or customize your itinerary",
        "<strong>2. Request a Quote</strong>: Receive a detailed proposal with prices, including international flights and hotels",
        "<strong>3. Book and Pay</strong>: Secure your trip with a 30% down payment and pay the balance in installments",
        "<strong>4. Visa Assistance</strong>: We guide you through the Schengen visa process (if applicable) with complete documentation",
        "<strong>5. Travel and Enjoy</strong>: Fly to Europe and enjoy your trip with Spanish-speaking guides and 24/7 support"
      ],

      h2FAQ: "Frequently Asked Questions About European Travel",
      cta: "Request Your Europe Trip Quote Now - 24 Hour Response"
    },

    pt: {
      h1: "Viagens para Europa da América Latina - Pacotes Turísticos",
      h2Main: "Melhores Pacotes de Viagem para Europa com Tudo Incluído",
      intro: `Descubra a Europa com <strong>Trips Europa</strong>, a agência de viagens líder em pacotes turísticos para a Europa da América Latina.
      Oferecemos viagens para Europa da Colômbia, México, Argentina, Brasil, Peru, Panamá e toda América Latina com <em>voos, hotéis 5 estrelas,
      passeios em espanhol e assistência completa para visto Schengen</em>.`,

      h2Why: "Por Que Escolher Trips Europa para sua Viagem à Europa?",
      whyPoints: [
        "<strong>Especialistas em Europa</strong>: Mais de 10 anos organizando viagens à Europa para viajantes latino-americanos",
        "<strong>Passeios em Espanhol</strong>: Todos os nossos pacotes incluem guias certificados em espanhol, português e inglês",
        "<strong>Melhor Preço Garantido</strong>: Comparamos mais de 500 fornecedores para oferecer as melhores tarifas em viagens à Europa",
        "<strong>Financiamento Flexível</strong>: Pague sua viagem em até 12 parcelas sem juros com cartões de crédito",
        "<strong>Assistência Visto Schengen</strong>: Ajudamos com todo o processo de solicitação de visto para viajar à Europa",
        "<strong>Atendimento 24/7</strong>: Suporte em espanhol durante sua viagem pela Europa"
      ],

      h2Destinations: "Destinos Mais Populares para Viajar à Europa",
      destinations: [
        {
          name: "Viagens para França",
          desc: "Paris, Torre Eiffel, Louvre, Versailles, Riviera Francesa. Pacotes desde $1,899 USD"
        },
        {
          name: "Viagens para Itália",
          desc: "Roma, Vaticano, Veneza, Florença, Costa Amalfitana. Pacotes desde $2,099 USD"
        },
        {
          name: "Viagens para Espanha",
          desc: "Madri, Barcelona, Sevilha, Granada, Costa del Sol. Pacotes desde $1,799 USD"
        },
        {
          name: "Viagens para Grécia",
          desc: "Atenas, Santorini, Mykonos, Meteora, Delfos. Pacotes desde $2,299 USD"
        }
      ],

      h2Countries: "Viagens para Europa do seu País",
      countryLinks: [
        "Viagens para Europa da Colômbia - Voos de Bogotá e Medellín",
        "Viagens para Europa do México - Saídas da CDMX, sem visto necessário",
        "Viagens para Europa do Brasil - Voos de São Paulo e Rio de Janeiro",
        "Viagens para Europa da Argentina - Tours com cidadania italiana/espanhola",
        "Viagens para Europa do Peru - Voos de Lima com conexões",
        "Viagens para Europa do Panamá - Hub Copa Airlines, sem visto",
        "Viagens para Europa da Costa Rica - Pacotes tudo incluído, sem visto"
      ],

      h2Process: "Como Funciona sua Viagem à Europa com Trips Europa",
      steps: [
        "<strong>1. Escolha seu Destino</strong>: Selecione entre mais de 50 pacotes de viagens à Europa ou personalize seu itinerário",
        "<strong>2. Solicite Cotação</strong>: Receba uma proposta detalhada com preços, incluindo voos internacionais e hotéis",
        "<strong>3. Reserve e Pague</strong>: Garanta sua viagem com entrada de 30% e pague o saldo em parcelas",
        "<strong>4. Assistência de Visto</strong>: Orientamos no processo de visto Schengen (se aplicável) com documentação completa",
        "<strong>5. Viaje e Aproveite</strong>: Voe para Europa e aproveite sua viagem com guias em espanhol e suporte 24/7"
      ],

      h2FAQ: "Perguntas Frequentes sobre Viagens à Europa",
      cta: "Solicite sua Cotação de Viagem à Europa Agora - Resposta em 24 Horas"
    }
  };

  const c = content[lang];

  return (
    <>
      {/* FAQ Schema for Rich Snippets */}
      <FAQSchema faqs={commonTravelFAQs[lang]} category="European Travel" />

      {/* SEO-Optimized Content */}
      <article className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Main Heading (H1) */}
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-primary">
            {c.h1}
          </h1>

          {/* Introduction with Keywords */}
          <section className="mb-12">
            <p
              className="text-lg text-muted-foreground leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: c.intro }}
            />
          </section>

          {/* Why Choose Us */}
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold mb-6 text-accent">
              {c.h2Why}
            </h2>
            <ul className="space-y-4">
              {c.whyPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                  dangerouslySetInnerHTML={{ __html: `✈️ ${point}` }}
                />
              ))}
            </ul>
          </section>

          {/* Popular Destinations */}
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold mb-6 text-accent">
              {c.h2Destinations}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {c.destinations.map((dest, index) => (
                <div key={index} className="border-l-4 border-accent pl-4">
                  <h3 className="text-xl font-bold mb-2 text-primary">
                    {dest.name}
                  </h3>
                  <p className="text-muted-foreground">{dest.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Country-Specific Pages */}
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold mb-6 text-accent">
              {c.h2Countries}
            </h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {c.countryLinks.map((link, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-accent">🌍</span>
                  <span className="text-muted-foreground">{link}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Process Steps */}
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold mb-6 text-accent">
              {c.h2Process}
            </h2>
            <ol className="space-y-4">
              {c.steps.map((step, index) => (
                <li
                  key={index}
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: step }}
                />
              ))}
            </ol>
          </section>

          {/* CTA */}
          <section className="text-center py-8 bg-accent/5 rounded-lg">
            <p className="text-2xl font-bold text-primary mb-4">{c.cta}</p>
            <a
              href="https://api.whatsapp.com/send?phone=34611105448"
              className="inline-block bg-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-accent/90 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +34 611 105 448
            </a>
          </section>
        </div>
      </article>
    </>
  );
}
