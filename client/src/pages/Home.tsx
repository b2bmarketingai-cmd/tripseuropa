import { Suspense, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TravelAgencySchema, WebsiteSchema, FAQSchema } from "@/components/SEOSchema";
import { HomePageSEO } from "@/components/SEOHead";
import { HeroCarousel } from "@/components/HeroCarousel";
import { UrgencyBanner } from "@/components/UrgencyBanner";
import { useI18n } from "@/lib/i18n";
import { HeroFlightSearch } from "@/components/HeroFlightSearch";
import { TopOffers } from "@/components/TopOffers";
import { DestinationGrid } from "@/components/DestinationGrid";
import { Chatbot } from "@/components/Chatbot";
import { ContactForm } from "@/components/ContactForm";
import { SmartSearchBar } from "@/components/SmartSearchBar";
import { FAQAccordion } from "@/components/FAQAccordion";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ReserveSpot } from "@/components/ReserveSpot";
import { Favorites } from "@/components/Favorites";
import { SpecialOffers } from "@/components/SpecialOffers";
import { BestPriceGuarantee } from "@/components/BestPriceGuarantee";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { TravelerStories } from "@/components/TravelerStories";
import { TrustpilotReviews } from "@/components/TrustpilotReviews";
import { PromotionalVideoBanner } from "@/components/PromotionalVideoBanner";
import { BlogHighlights } from "@/components/BlogHighlights";
import SEOContent from "@/components/SEOContent";
import { FloatingContactButtons } from "@/components/support";
import ContactIcons from "@/components/ContactIcons";

export default function Home() {
  const { language } = useI18n();
  const [showIdleComponents, setShowIdleComponents] = useState(false);

  useEffect(() => {
    const loadIdle = () => setShowIdleComponents(true);
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadIdle, { timeout: 4000 });
    } else {
      setTimeout(loadIdle, 3000);
    }
  }, []);

  const content = {
    es: {
      ctaBadge: "Planifica tu viaje",
      ctaTitle: "¿Listo para vivir una experiencia europea inolvidable?",
      ctaSubtitle: "Nuestro equipo de expertos está aquí para ayudarte a diseñar el viaje perfecto.",
      callUs: "Llámanos",
      phone: "+34 611 105 448",
      email: "Email",
      emailAddress: "info@tripseuropa.com",
      office: "Oficina Central",
      address: "Calle Gran Vía 45, Madrid, España",
      whatsapp: "Escríbenos por WhatsApp",
      formTitle: "Solicita tu Cotización",
    },
    en: {
      ctaBadge: "Plan your trip",
      ctaTitle: "Ready to live an unforgettable European experience?",
      ctaSubtitle: "Our team of experts is here to help you design the perfect trip.",
      callUs: "Call us",
      phone: "+34 611 105 448",
      email: "Email",
      emailAddress: "info@tripseuropa.com",
      office: "Central Office",
      address: "Calle Gran Via 45, Madrid, Spain",
      whatsapp: "Write us on WhatsApp",
      formTitle: "Request your quote",
    },
    pt: {
      ctaBadge: "Planeje sua viagem",
      ctaTitle: "Pronto para viver uma experiência europeia inesquecível?",
      ctaSubtitle: "Nossa equipe de especialistas está aqui para ajudá-lo a projetar a viagem perfeita.",
      callUs: "Ligue para nós",
      phone: "+34 611 105 448",
      email: "Email",
      emailAddress: "info@tripseuropa.com",
      office: "Escritório Central",
      address: "Calle Gran Vía 45, Madrid, Espanha",
      whatsapp: "Escreva-nos pelo WhatsApp",
      formTitle: "Solicite seu orçamento",
    },
  };

  const c = content[language as keyof typeof content] || content.es;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full overflow-x-hidden">
      <HomePageSEO />
      <UrgencyBanner />
      <Header />
      <HeroCarousel />

      <HeroFlightSearch />
      <TopOffers />
      <DestinationGrid />

      <div className="lazy-section-tall">
        <ReserveSpot />
        <SpecialOffers />
        <Favorites />
        <WhyChooseUs />
        <section className="py-12 bg-[#d5b034]" data-testid="section-smart-search">
          <div className="container mx-auto px-4 max-w-4xl">
            <SmartSearchBar variant="hero" />
          </div>
        </section>
        <BestPriceGuarantee />
        <BlogHighlights />
        <SEOContent />
        <NewsletterSignup />
      </div>

      <div className="lazy-section">
        <TrustpilotReviews />
        <PromotionalVideoBanner />
        <TravelerStories />
      </div>

      <div className="lazy-section-tall">
        <ContactIcons content={c} contactForm={<ContactForm variant="page" title={c.formTitle} />} />
        <FAQAccordion />
      </div>

      <Footer />

      {showIdleComponents && (
        <>
          <Chatbot />
          <FloatingContactButtons />
        </>
      )}
      <TravelAgencySchema />
      <WebsiteSchema />
      <FAQSchema questions={[
        { question: "Necesito visa Schengen para viajar a Europa desde Latinoamerica?", answer: "Si, los ciudadanos de la mayoria de paises latinoamericanos necesitan visa Schengen. Te ayudamos con todo el proceso de solicitud." },
        { question: "Cuanto cuesta un viaje a Europa?", answer: "Nuestros paquetes comienzan desde USD 999 por persona mas impuestos incluyendo hoteles y tours." },
        { question: "Incluyen seguro de viaje los paquetes?", answer: "Si, todos nuestros paquetes incluyen seguro de viaje internacional con cobertura medica completa." },
        { question: "Los tours incluyen guia en espanol?", answer: "Si, todos nuestros tours incluyen guias profesionales en espanol." },
        { question: "Que formas de pago aceptan?", answer: "Aceptamos tarjetas de credito, transferencias bancarias y planes de financiamiento hasta 12 cuotas sin interes." }
      ]} />
    </div>
  );
}
