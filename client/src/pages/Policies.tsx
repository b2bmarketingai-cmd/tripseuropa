import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/lib/i18n";
import { FileText, XCircle, RefreshCw, RotateCcw, CheckCircle, AlertTriangle, Clock, Mail } from "lucide-react";
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
    intro: "Entendemos que los planes pueden cambiar. Nuestra política de cancelación está diseñada para ser justa:",
    policies: [
      { days: "Más de 60 días", percentage: "100%", desc: "Reembolso completo menos gastos administrativos (50 USD)" },
      { days: "30-60 días", percentage: "75%", desc: "Reembolso del 75% del monto total" },
      { days: "15-29 días", percentage: "50%", desc: "Reembolso del 50% del monto total" },
      { days: "7-14 días", percentage: "25%", desc: "Reembolso del 25% del monto total" },
      { days: "Menos de 7 días", percentage: "0%", desc: "Sin reembolso disponible" },
    ],
    notes: [
      "Las cancelaciones deben solicitarse por escrito a info@tripseuropa.com",
      "Los vuelos pueden tener políticas de cancelación diferentes según la aerolínea",
      "Los seguros de viaje pueden cubrir cancelaciones por causas justificadas",
    ]
  } : {
    title: "Cancellation Policy",
    intro: "We understand plans can change. Our cancellation policy is designed to be fair:",
    policies: [
      { days: "More than 60 days", percentage: "100%", desc: "Full refund minus administrative fees (50 USD)" },
      { days: "30-60 days", percentage: "75%", desc: "75% refund of total amount" },
      { days: "15-29 days", percentage: "50%", desc: "50% refund of total amount" },
      { days: "7-14 days", percentage: "25%", desc: "25% refund of total amount" },
      { days: "Less than 7 days", percentage: "0%", desc: "No refund available" },
    ],
    notes: [
      "Cancellations must be requested in writing to info@tripseuropa.com",
      "Flights may have different cancellation policies depending on the airline",
      "Travel insurance may cover cancellations for justified reasons",
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
          {content.policies.map((policy, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-primary">{policy.days}</p>
                  <p className="text-sm text-muted-foreground">{policy.desc}</p>
                </div>
              </div>
              <Badge className={policy.percentage === "0%" ? "bg-red-500" : "bg-green-600"}>
                {policy.percentage}
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="space-y-1">
              {content.notes.map((note, idx) => (
                <p key={idx} className="text-sm text-amber-800">{note}</p>
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
    intro: "Procesamos los reembolsos de manera rápida y transparente:",
    timeline: [
      { step: "1", title: "Solicitud recibida", desc: "Confirmamos recepción en 24 horas" },
      { step: "2", title: "Revisión", desc: "Evaluamos tu solicitud en 3-5 días hábiles" },
      { step: "3", title: "Aprobación", desc: "Notificamos la decisión por correo electrónico" },
      { step: "4", title: "Procesamiento", desc: "Reembolso procesado en 7-10 días hábiles" },
    ],
    methods: [
      "Tarjeta de crédito/débito: Reembolso al mismo método de pago original",
      "Transferencia bancaria: Depósito directo a cuenta proporcionada",
      "Crédito de viaje: Opción de mantener saldo para futuras reservas (+10% bonus)",
    ]
  } : {
    title: "Refund Policy",
    intro: "We process refunds quickly and transparently:",
    timeline: [
      { step: "1", title: "Request received", desc: "We confirm receipt within 24 hours" },
      { step: "2", title: "Review", desc: "We evaluate your request in 3-5 business days" },
      { step: "3", title: "Approval", desc: "Decision notified by email" },
      { step: "4", title: "Processing", desc: "Refund processed in 7-10 business days" },
    ],
    methods: [
      "Credit/debit card: Refund to original payment method",
      "Bank transfer: Direct deposit to provided account",
      "Travel credit: Option to keep balance for future bookings (+10% bonus)",
    ]
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {content.timeline.map((item, idx) => (
            <div key={idx} className="text-center p-4 bg-accent/10 rounded-lg">
              <div className="w-10 h-10 bg-accent text-primary font-bold rounded-full flex items-center justify-center mx-auto mb-2">
                {item.step}
              </div>
              <h4 className="font-medium text-primary text-sm">{item.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-primary">{language === "es" ? "Métodos de reembolso" : "Refund methods"}</h4>
          <ul className="space-y-2">
            {content.methods.map((method, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                {method}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function ReturnsSection({ language }: { language: string }) {
  const content = language === "es" ? {
    title: "Política de Devoluciones",
    intro: "Para productos y servicios adicionales adquiridos a través de Trips Europa:",
    items: [
      {
        product: "eSIM Europa",
        policy: "No reembolsable una vez activada. Antes de activación: reembolso completo.",
        icon: "esim"
      },
      {
        product: "Seguro de Viaje",
        policy: "Cancelación gratuita hasta 14 días después de la compra si no ha iniciado el viaje.",
        icon: "insurance"
      },
      {
        product: "Excursiones y Tours",
        policy: "Reembolso completo si se cancela 48 horas antes. Menos de 48 horas: 50%.",
        icon: "tour"
      },
      {
        product: "Traslados",
        policy: "Cancelación gratuita hasta 24 horas antes del servicio.",
        icon: "transfer"
      },
    ],
    contact: "Para cualquier solicitud de devolución, contáctanos:"
  } : {
    title: "Returns Policy",
    intro: "For additional products and services purchased through Trips Europa:",
    items: [
      {
        product: "Europe eSIM",
        policy: "Non-refundable once activated. Before activation: full refund.",
        icon: "esim"
      },
      {
        product: "Travel Insurance",
        policy: "Free cancellation up to 14 days after purchase if trip hasn't started.",
        icon: "insurance"
      },
      {
        product: "Excursions and Tours",
        policy: "Full refund if canceled 48 hours before. Less than 48 hours: 50%.",
        icon: "tour"
      },
      {
        product: "Transfers",
        policy: "Free cancellation up to 24 hours before service.",
        icon: "transfer"
      },
    ],
    contact: "For any return request, contact us:"
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
                <h4 className="font-medium text-primary">{item.product}</h4>
                <p className="text-sm text-muted-foreground mt-1">{item.policy}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">{content.contact}</p>
          <a href="mailto:info@tripseuropa.com" className="flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors">
            <Mail className="w-4 h-4" />
            info@tripseuropa.com
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
