import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/lib/i18n";
import { FileText, XCircle, RefreshCw, RotateCcw, CheckCircle, AlertTriangle, Clock, Mail, Phone } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function Policies() {
  const { t, language } = useI18n();
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("terms");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get("tab");
    if (tab && ["terms", "cancellations", "refunds", "returns"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-policies">{t("policies.badge")}</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4" data-testid="text-policies-title">
              {t("policies.title")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-policies-subtitle">
              {t("policies.subtitle")}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="terms" className="gap-2" data-testid="tab-terms">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">{t("policies.terms")}</span>
              </TabsTrigger>
              <TabsTrigger value="cancellations" className="gap-2" data-testid="tab-cancellations">
                <XCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{t("policies.cancellations")}</span>
              </TabsTrigger>
              <TabsTrigger value="refunds" className="gap-2" data-testid="tab-refunds">
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">{t("policies.refunds")}</span>
              </TabsTrigger>
              <TabsTrigger value="returns" className="gap-2" data-testid="tab-returns">
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">{t("policies.returns")}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="terms">
              <TermsSection language={language} />
            </TabsContent>

            <TabsContent value="cancellations">
              <CancellationsSection language={language} />
            </TabsContent>

            <TabsContent value="refunds">
              <RefundsSection language={language} />
            </TabsContent>

            <TabsContent value="returns">
              <ReturnsSection language={language} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}

function TermsSection({ language }: { language: string }) {
  const content = language === "es" ? {
    title: "Términos y Condiciones",
    intro: "Al utilizar los servicios de Trips Europa, usted acepta los siguientes términos y condiciones:",
    sections: [
      {
        title: "1. Servicios de Viaje",
        items: [
          "Trips Europa actúa como intermediario entre el cliente y los proveedores de servicios turísticos.",
          "Los precios están sujetos a disponibilidad y pueden cambiar sin previo aviso.",
          "La confirmación de reservas está sujeta a la recepción del pago completo.",
        ]
      },
      {
        title: "2. Responsabilidades del Cliente",
        items: [
          "Proporcionar información veraz y completa para todas las reservas.",
          "Verificar que los documentos de viaje (pasaporte, visa) estén vigentes.",
          "Cumplir con los requisitos de entrada de cada país de destino.",
        ]
      },
      {
        title: "3. Pagos",
        items: [
          "Aceptamos pagos en USD, EUR y COP mediante tarjetas de crédito/débito.",
          "Las reservas requieren un depósito mínimo del 30% para confirmación.",
          "El saldo debe pagarse 30 días antes de la fecha de viaje.",
        ]
      },
      {
        title: "4. Protección de Datos",
        items: [
          "Sus datos personales serán tratados conforme a nuestra política de privacidad.",
          "No compartimos información personal con terceros sin su consentimiento.",
          "Utilizamos encriptación SSL para proteger todas las transacciones.",
        ]
      }
    ]
  } : {
    title: "Terms and Conditions",
    intro: "By using Trips Europa services, you agree to the following terms and conditions:",
    sections: [
      {
        title: "1. Travel Services",
        items: [
          "Trips Europa acts as an intermediary between the client and travel service providers.",
          "Prices are subject to availability and may change without notice.",
          "Booking confirmation is subject to receipt of full payment.",
        ]
      },
      {
        title: "2. Client Responsibilities",
        items: [
          "Provide truthful and complete information for all bookings.",
          "Verify that travel documents (passport, visa) are valid.",
          "Comply with entry requirements for each destination country.",
        ]
      },
      {
        title: "3. Payments",
        items: [
          "We accept payments in USD, EUR and COP via credit/debit cards.",
          "Bookings require a minimum deposit of 30% for confirmation.",
          "Balance must be paid 30 days before travel date.",
        ]
      },
      {
        title: "4. Data Protection",
        items: [
          "Your personal data will be handled according to our privacy policy.",
          "We do not share personal information with third parties without your consent.",
          "We use SSL encryption to protect all transactions.",
        ]
      }
    ]
  };

  return (
    <Card data-testid="card-terms">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <FileText className="w-6 h-6 text-accent" />
          {content.title}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{content.intro}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {content.sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="font-bold text-primary">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function CancellationsSection({ language }: { language: string }) {
  const content = language === "es" ? {
    title: "Política de Cancelaciones",
    intro: "Una vez emitidos los servicios, las políticas de cancelación están sujetas a las condiciones de cada proveedor:",
    services: [
      { 
        service: "Boletos Aéreos", 
        desc: "Las cancelaciones y cambios están sujetos a las políticas de cada aerolínea. Algunas tarifas son no reembolsables.",
        icon: "plane"
      },
      { 
        service: "Hoteles", 
        desc: "Cada hotel tiene sus propias políticas de cancelación. Consulta las condiciones específicas de tu reserva.",
        icon: "hotel"
      },
      { 
        service: "Seguro de Viaje", 
        desc: "Una vez emitida la póliza, aplican las condiciones de la aseguradora. Revisa los términos antes de contratar.",
        icon: "insurance"
      },
      { 
        service: "eSIM Europa", 
        desc: "No reembolsable una vez activada. Antes de la activación se puede cancelar.",
        icon: "esim"
      },
      { 
        service: "Tours y Excursiones", 
        desc: "Sujeto a las políticas del operador turístico. Generalmente requieren aviso previo de 48-72 horas.",
        icon: "tour"
      },
    ],
    notes: [
      "Trips Europa actúa como intermediario. Una vez emitidos los servicios, las condiciones de cancelación las establece cada proveedor.",
      "Te recomendamos contratar seguro de viaje que cubra cancelaciones imprevistas.",
      "Para cualquier solicitud de cancelación, contáctanos a info@tripseuropa.com / agente@tripseuropa.com o al +34 611 105 448.",
    ]
  } : {
    title: "Cancellation Policy",
    intro: "Once services are issued, cancellation policies are subject to each provider's conditions:",
    services: [
      { 
        service: "Flight Tickets", 
        desc: "Cancellations and changes are subject to each airline's policies. Some fares are non-refundable.",
        icon: "plane"
      },
      { 
        service: "Hotels", 
        desc: "Each hotel has its own cancellation policies. Check the specific conditions of your booking.",
        icon: "hotel"
      },
      { 
        service: "Travel Insurance", 
        desc: "Once the policy is issued, the insurer's conditions apply. Review the terms before purchasing.",
        icon: "insurance"
      },
      { 
        service: "Europe eSIM", 
        desc: "Non-refundable once activated. Can be canceled before activation.",
        icon: "esim"
      },
      { 
        service: "Tours and Excursions", 
        desc: "Subject to tour operator policies. Generally require 48-72 hours advance notice.",
        icon: "tour"
      },
    ],
    notes: [
      "Trips Europa acts as an intermediary. Once services are issued, cancellation conditions are set by each provider.",
      "We recommend purchasing travel insurance that covers unexpected cancellations.",
      "For any cancellation request, contact us at info@tripseuropa.com / agente@tripseuropa.com or +34 611 105 448.",
    ]
  };

  return (
    <Card data-testid="card-cancellations">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <XCircle className="w-6 h-6 text-accent" />
          {content.title}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{content.intro}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3">
          {content.services.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-primary">{item.service}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="space-y-1">
              {content.notes.map((note, idx) => (
                <p key={idx} className="text-sm text-amber-800 dark:text-amber-200">{note}</p>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RefundsSection({ language }: { language: string }) {
  const content = language === "es" ? {
    title: "Política de Reembolsos",
    intro: "Los reembolsos están sujetos a las políticas de cada proveedor de servicios:",
    info: [
      "Los reembolsos de boletos aéreos dependen de las condiciones de la aerolínea y tipo de tarifa adquirida.",
      "Los reembolsos de hoteles están sujetos a las políticas de cancelación de cada establecimiento.",
      "Los seguros de viaje y eSIM tienen condiciones específicas establecidas por el proveedor.",
      "Trips Europa gestionará tu solicitud de reembolso ante el proveedor correspondiente.",
    ],
    process: "Para solicitar un reembolso, contáctanos con tu número de reserva y te informaremos las condiciones aplicables según cada proveedor.",
    contact: "Escríbenos a info@tripseuropa.com / agente@tripseuropa.com o llámanos al +34 611 105 448"
  } : {
    title: "Refund Policy",
    intro: "Refunds are subject to each service provider's policies:",
    info: [
      "Flight ticket refunds depend on the airline's conditions and the type of fare purchased.",
      "Hotel refunds are subject to each property's cancellation policies.",
      "Travel insurance and eSIM have specific conditions set by the provider.",
      "Trips Europa will manage your refund request with the corresponding provider.",
    ],
    process: "To request a refund, contact us with your booking number and we will inform you of the applicable conditions for each provider.",
    contact: "Write to us at info@tripseuropa.com / agente@tripseuropa.com or call +34 611 105 448"
  };

  return (
    <Card data-testid="card-refunds">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <RefreshCw className="w-6 h-6 text-accent" />
          {content.title}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{content.intro}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {content.info.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-lg p-4 space-y-3">
          <p className="text-sm text-muted-foreground">{content.process}</p>
          <a href="mailto:info@tripseuropa.com" className="flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors">
            <Mail className="w-4 h-4" />
            {content.contact}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

function ReturnsSection({ language }: { language: string }) {
  const content = language === "es" ? {
    title: "Información Importante",
    intro: "Trips Europa actúa como intermediario entre tú y los proveedores de servicios turísticos:",
    items: [
      {
        title: "Rol de Intermediario",
        desc: "Facilitamos la reserva de servicios de aerolíneas, hoteles, aseguradoras y operadores turísticos. Una vez emitidos los servicios, las políticas de cada proveedor aplican directamente.",
      },
      {
        title: "Documentación",
        desc: "Al realizar tu reserva, recibirás los términos y condiciones específicos de cada servicio contratado. Te recomendamos leerlos cuidadosamente.",
      },
      {
        title: "Asistencia Garantizada",
        desc: "Aunque las políticas las establecen los proveedores, nuestro equipo te asistirá en todo el proceso de gestión de cambios, cancelaciones o reembolsos.",
      },
      {
        title: "Recomendación",
        desc: "Siempre te sugerimos contratar seguro de viaje con cobertura de cancelación para proteger tu inversión ante imprevistos.",
      },
    ],
    contact: "¿Tienes dudas sobre las políticas de tu reserva? Contáctanos:"
  } : {
    title: "Important Information",
    intro: "Trips Europa acts as an intermediary between you and tourism service providers:",
    items: [
      {
        title: "Intermediary Role",
        desc: "We facilitate booking services from airlines, hotels, insurers, and tour operators. Once services are issued, each provider's policies apply directly.",
      },
      {
        title: "Documentation",
        desc: "When making your reservation, you will receive the specific terms and conditions for each contracted service. We recommend reading them carefully.",
      },
      {
        title: "Guaranteed Assistance",
        desc: "Although policies are set by providers, our team will assist you throughout the process of managing changes, cancellations, or refunds.",
      },
      {
        title: "Recommendation",
        desc: "We always suggest purchasing travel insurance with cancellation coverage to protect your investment against unforeseen circumstances.",
      },
    ],
    contact: "Have questions about your booking policies? Contact us:"
  };

  return (
    <Card data-testid="card-returns">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <RotateCcw className="w-6 h-6 text-accent" />
          {content.title}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{content.intro}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {content.items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-primary">{item.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">{content.contact}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="mailto:info@tripseuropa.com" className="flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
              info@tripseuropa.com
            </a>
            <a href="mailto:agente@tripseuropa.com" className="flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
              agente@tripseuropa.com
            </a>
            <a href="tel:+34611105448" className="flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              +34 611 105 448
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
