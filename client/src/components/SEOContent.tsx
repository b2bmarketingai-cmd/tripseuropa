import { useI18n } from "@/lib/i18n";

const seoContent = {
  es: {
    mainTitle: "Viajes a Europa desde Latinoamérica - Tu Aventura Europea Comienza Aquí",
    intro: "Descubre los mejores paquetes de viajes a Europa diseñados especialmente para viajeros latinoamericanos. En Trips Europa, somos expertos en crear experiencias de viaje inolvidables que combinan destinos icónicos, cultura auténtica y el mejor servicio personalizado.",
    sections: [
      {
        title: "Destinos Europeos Más Populares",
        content: "Explora los destinos más solicitados por nuestros viajeros: España con su rica herencia cultural, Italia y su gastronomía excepcional, Francia con el romántico París, Portugal y sus paisajes costeros, Grecia y sus islas paradisíacas. Cada destino ofrece experiencias únicas que harán de tu viaje una aventura inolvidable."
      },
      {
        title: "Paquetes Todo Incluido a Europa",
        content: "Nuestros paquetes turísticos a Europa incluyen vuelos, hoteles de primera categoría, tours guiados en español, traslados y seguro de viaje internacional. Ofrecemos opciones desde económicas hasta de lujo, adaptándonos a tu presupuesto y preferencias de viaje."
      },
      {
        title: "Visa Schengen y Documentación",
        content: "Te asistimos en todo el proceso de visa Schengen. Nuestro equipo de expertos te guía paso a paso con la documentación requerida, carta de invitación, reservas de hotel y seguro médico obligatorio para que tu solicitud sea aprobada sin contratiempos."
      },
      {
        title: "¿Por Qué Elegir Trips Europa?",
        content: "Con más de 15 años de experiencia en viajes europeos, ofrecemos atención personalizada en español, los mejores precios garantizados, y un servicio de emergencias 24/7 durante tu viaje. Miles de viajeros latinoamericanos confían en nosotros cada año."
      },
      {
        title: "Reserva Tu Viaje Europeo Hoy",
        content: "No esperes más para vivir tu sueño europeo. Contáctanos ahora para recibir una cotización personalizada sin compromiso. Aceptamos múltiples formas de pago incluyendo financiamiento hasta en 12 cuotas sin interés."
      }
    ]
  },
  en: {
    mainTitle: "Europe Travel Packages from Latin America - Your European Adventure Starts Here",
    intro: "Discover the best Europe travel packages designed especially for Latin American travelers. At Trips Europa, we are experts in creating unforgettable travel experiences that combine iconic destinations, authentic culture, and the best personalized service.",
    sections: [
      {
        title: "Most Popular European Destinations",
        content: "Explore the most requested destinations by our travelers: Spain with its rich cultural heritage, Italy and its exceptional gastronomy, France with romantic Paris, Portugal and its coastal landscapes, Greece and its paradisiacal islands. Each destination offers unique experiences that will make your trip an unforgettable adventure."
      },
      {
        title: "All-Inclusive Europe Packages",
        content: "Our Europe tour packages include flights, first-class hotels, guided tours in Spanish, transfers, and international travel insurance. We offer options from budget to luxury, adapting to your budget and travel preferences."
      },
      {
        title: "Schengen Visa and Documentation",
        content: "We assist you throughout the Schengen visa process. Our team of experts guides you step by step with the required documentation, invitation letter, hotel reservations, and mandatory medical insurance so your application is approved without setbacks."
      },
      {
        title: "Why Choose Trips Europa?",
        content: "With over 15 years of experience in European travel, we offer personalized attention in Spanish, the best guaranteed prices, and a 24/7 emergency service during your trip. Thousands of Latin American travelers trust us every year."
      },
      {
        title: "Book Your European Trip Today",
        content: "Don't wait any longer to live your European dream. Contact us now to receive a personalized quote with no obligation. We accept multiple forms of payment including financing up to 12 interest-free installments."
      }
    ]
  },
  pt: {
    mainTitle: "Viagens para Europa da América Latina - Sua Aventura Europeia Começa Aqui",
    intro: "Descubra os melhores pacotes de viagem para a Europa projetados especialmente para viajantes latino-americanos. Na Trips Europa, somos especialistas em criar experiências de viagem inesquecíveis que combinam destinos icônicos, cultura autêntica e o melhor serviço personalizado.",
    sections: [
      {
        title: "Destinos Europeus Mais Populares",
        content: "Explore os destinos mais solicitados pelos nossos viajantes: Espanha com sua rica herança cultural, Itália e sua gastronomia excepcional, França com a romântica Paris, Portugal e suas paisagens costeiras, Grécia e suas ilhas paradisíacas. Cada destino oferece experiências únicas que farão da sua viagem uma aventura inesquecível."
      },
      {
        title: "Pacotes Tudo Incluído para Europa",
        content: "Nossos pacotes turísticos para Europa incluem voos, hotéis de primeira categoria, tours guiados em espanhol e português, traslados e seguro viagem internacional. Oferecemos opções desde econômicas até de luxo, adaptando-nos ao seu orçamento e preferências de viagem."
      },
      {
        title: "Visto Schengen e Documentação",
        content: "Auxiliamos você em todo o processo de visto Schengen. Nossa equipe de especialistas guia você passo a passo com a documentação necessária, carta convite, reservas de hotel e seguro médico obrigatório para que sua solicitação seja aprovada sem contratempos."
      },
      {
        title: "Por Que Escolher a Trips Europa?",
        content: "Com mais de 15 anos de experiência em viagens europeias, oferecemos atendimento personalizado em português e espanhol, os melhores preços garantidos e um serviço de emergência 24/7 durante sua viagem. Milhares de viajantes latino-americanos confiam em nós todos os anos."
      },
      {
        title: "Reserve Sua Viagem Europeia Hoje",
        content: "Não espere mais para viver seu sonho europeu. Entre em contato agora para receber um orçamento personalizado sem compromisso. Aceitamos múltiplas formas de pagamento incluindo parcelamento em até 12x sem juros."
      }
    ]
  }
};

export function SEOContent() {
  const { language } = useI18n();
  const content = seoContent[language as keyof typeof seoContent] || seoContent.es;

  return (
    <section className="py-16 bg-white dark:bg-gray-800" data-testid="section-seo-content">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 text-center" data-testid="text-seo-main-title">
          {content.mainTitle}
        </h2>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto" data-testid="text-seo-intro">
          {content.intro}
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.sections.map((section, index) => (
            <article key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6" data-testid={`seo-section-${index}`}>
              <h3 className="text-xl font-bold text-foreground mb-3">{section.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
