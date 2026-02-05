import { lazy, Suspense, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TravelAgencySchema, WebsiteSchema, FAQSchema } from "@/components/SEOSchema";
import { HomePageSEO } from "@/components/SEOHead";
import { HeroCarousel } from "@/components/HeroCarousel";
import { UrgencyBanner } from "@/components/UrgencyBanner";
import { useI18n } from "@/lib/i18n";

// Near-fold components - lazy loaded but fetched early
const HeroFlightSearch = lazy(() => import("@/components/HeroFlightSearch").then(m => ({ default: m.HeroFlightSearch })));
const TopOffers = lazy(() => import("@/components/TopOffers").then(m => ({ default: m.TopOffers })));
const DestinationGrid = lazy(() => import("@/components/DestinationGrid").then(m => ({ default: m.DestinationGrid })));

// Lazy load non-critical below-the-fold components
const Chatbot = lazy(() => import("@/components/Chatbot").then(m => ({ default: m.Chatbot })));
const ContactForm = lazy(() => import("@/components/ContactForm").then(m => ({ default: m.ContactForm })));
const SmartSearchBar = lazy(() => import("@/components/SmartSearchBar").then(m => ({ default: m.SmartSearchBar })));
const FAQAccordion = lazy(() => import("@/components/FAQAccordion").then(m => ({ default: m.FAQAccordion })));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs").then(m => ({ default: m.WhyChooseUs })));
const ReserveSpot = lazy(() => import("@/components/ReserveSpot").then(m => ({ default: m.ReserveSpot })));
const Favorites = lazy(() => import("@/components/Favorites").then(m => ({ default: m.Favorites })));
const SpecialOffers = lazy(() => import("@/components/SpecialOffers").then(m => ({ default: m.SpecialOffers })));
const BestPriceGuarantee = lazy(() => import("@/components/BestPriceGuarantee").then(m => ({ default: m.BestPriceGuarantee })));
const NewsletterSignup = lazy(() => import("@/components/NewsletterSignup").then(m => ({ default: m.NewsletterSignup })));
const TravelerStories = lazy(() => import("@/components/TravelerStories").then(m => ({ default: m.TravelerStories })));
const TrustpilotReviews = lazy(() => import("@/components/TrustpilotReviews").then(m => ({ default: m.TrustpilotReviews })));
const PromotionalVideoBanner = lazy(() => import("@/components/PromotionalVideoBanner").then(m => ({ default: m.PromotionalVideoBanner })));
const BlogHighlights = lazy(() => import("@/components/BlogHighlights").then(m => ({ default: m.BlogHighlights })));
const SEOContent = lazy(() => import("@/components/SEOContent"));
const FloatingContactButtons = lazy(() => import("@/components/support").then(m => ({ default: m.FloatingContactButtons })));

// Lazy load icons to reduce main bundle
const ContactIcons = lazy(() => import("@/components/ContactIcons"));

export default function Home() {
  const { language } = useI18n();
  const [showIdleComponents, setShowIdleComponents] = useState(false);

  // Defer Chatbot and FloatingContactButtons until browser is idle
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

      {/* Near-fold components - lazy but fetched early */}
      <Suspense fallback={<div className="h-48 loading-skeleton" />}>
        <HeroFlightSearch />
        <TopOffers />
        <DestinationGrid />
      </Suspense>

      {/* Below-fold components - lazy loaded on scroll */}
      <Suspense fallback={<div className="h-96 loading-skeleton" />}>
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
      </Suspense>

      {/* Heavy third-party components - separate Suspense boundary */}
      <Suspense fallback={<div className="h-64 loading-skeleton" />}>
        <TrustpilotReviews />
        <PromotionalVideoBanner />
        <TravelerStories />
      </Suspense>

      {/* Contact section with lazy icons */}
      <Suspense fallback={<div className="h-96 loading-skeleton" />}>
        <ContactIcons content={c} contactForm={<ContactForm variant="page" title={c.formTitle} />} />
        <FAQAccordion />
      </Suspense>

      <Footer />

      {/* Chatbot & floating buttons - deferred until browser is idle */}
      {showIdleComponents && (
        <Suspense fallback={null}>
          <Chatbot />
          <FloatingContactButtons />
        </Suspense>
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

function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=34611105448"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label="WhatsApp"
      data-testid="button-whatsapp-float"
    >
      <SiWhatsapp className="w-7 h-7 text-white" />
    </a>
  );
}

function SupportButton() {
  return (
    <ContactSupportModal
      trigger={
        <button
          className="fixed bottom-6 left-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-50"
          aria-label="Support"
          data-testid="button-support-float"
        >
          <Phone className="w-6 h-6 text-primary-foreground" />
        </button>
      }
    />
  );
}
