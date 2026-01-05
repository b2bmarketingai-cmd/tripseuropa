import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import { Check, ArrowRight, Clock, Users, Shield } from "lucide-react";

const step1Schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Teléfono requerido"),
});

const step2Schema = z.object({
  destination: z.string().optional(),
  travelDates: z.string().optional(),
  budget: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

interface OptimizedLeadFormProps {
  countryCode?: string;
  variant?: "default" | "urgent" | "social-proof";
  onSuccess?: () => void;
}

const urgencyMessages: Record<string, { text: string; icon: typeof Clock }> = {
  CO: { text: "Últimas 2 ofertas para colombianos", icon: Clock },
  MX: { text: "Solo 3 lugares disponibles desde México", icon: Users },
  BR: { text: "Apenas 2 vagas restantes", icon: Clock },
  AR: { text: "Últimos 2 cupos desde Argentina", icon: Clock },
  PE: { text: "Solo quedan 3 paquetes desde Perú", icon: Clock },
  PA: { text: "Últimas ofertas para Panamá", icon: Clock },
  CR: { text: "Solo 2 cupos desde Costa Rica", icon: Clock },
  DO: { text: "Últimas 3 ofertas desde RD", icon: Clock },
  CB: { text: "Ofertas limitadas para el Caribe", icon: Clock },
};

const socialProofMessages: Record<string, string> = {
  CO: "45 colombianos reservaron esta semana",
  MX: "67 mexicanos viajaron el mes pasado",
  BR: "89 brasileiros viajaram este mês",
  AR: "32 argentinos reservaron ayer",
  PE: "28 peruanos viajaron a Europa",
  PA: "15 panameños reservaron",
  CR: "12 costarricenses viajaron",
  DO: "18 dominicanos reservaron",
  CB: "25 viajeros del Caribe reservaron",
};

export function OptimizedLeadForm({ 
  countryCode = "CO", 
  variant = "default",
  onSuccess 
}: OptimizedLeadFormProps) {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const { toast } = useToast();
  const { t } = useI18n();

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const form2 = useForm<Step2Data>({
    defaultValues: { destination: "", travelDates: "", budget: "" },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: Step1Data & Partial<Step2Data>) => {
      return apiRequest("POST", "/api/leads", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        originCountry: countryCode,
        serviceInterest: data.destination || "Europa",
        message: data.travelDates ? `Fechas: ${data.travelDates}, Presupuesto: ${data.budget}` : "",
      });
    },
    onSuccess: () => {
      setStep(3);
      toast({
        title: t("contact.success"),
        description: t("contact.successMessage"),
      });
      onSuccess?.();
      
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "lead_form_submit", {
          country: countryCode,
          variant: variant,
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: t("form.errorSend"),
        variant: "destructive",
      });
    },
  });

  const handleStep1Submit = (data: Step1Data) => {
    setStep1Data(data);
    setStep(2);
    
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "lead_form_step1_complete", {
        country: countryCode,
      });
    }
  };

  const handleStep2Submit = (data: Step2Data) => {
    if (step1Data) {
      submitMutation.mutate({ ...step1Data, ...data });
    }
  };

  const handleSkipStep2 = () => {
    if (step1Data) {
      submitMutation.mutate(step1Data);
    }
  };

  const urgency = urgencyMessages[countryCode] || urgencyMessages.CO;
  const socialProof = socialProofMessages[countryCode] || socialProofMessages.CO;

  if (step === 3) {
    return (
      <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
        <CardContent className="p-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
            <Check className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2" data-testid="text-form-success">
            {t("contact.success")}
          </h3>
          <p className="text-muted-foreground">
            {t("contact.successMessage")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        {(variant === "urgent" || variant === "social-proof") && (
          <div className="mb-4 flex flex-wrap gap-2">
            {variant === "urgent" && (
              <Badge variant="destructive" className="animate-pulse">
                <urgency.icon className="w-3 h-3 mr-1" />
                {urgency.text}
              </Badge>
            )}
            {variant === "social-proof" && (
              <Badge variant="secondary">
                <Users className="w-3 h-3 mr-1" />
                {socialProof}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}>
            {step > 1 ? <Check className="w-4 h-4" /> : "1"}
          </div>
          <div className={`flex-1 h-1 rounded ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}>
            {step > 2 ? <Check className="w-4 h-4" /> : "2"}
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={form1.handleSubmit(handleStep1Submit)} className="space-y-4">
            <div>
              <Label htmlFor="name">{t("contact.name")}</Label>
              <Input
                id="name"
                data-testid="input-lead-name"
                placeholder={t("form.namePlaceholder")}
                {...form1.register("name")}
              />
              {form1.formState.errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {form1.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">{t("contact.email")}</Label>
              <Input
                id="email"
                type="email"
                data-testid="input-lead-email"
                placeholder={t("form.emailPlaceholder")}
                {...form1.register("email")}
              />
              {form1.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {form1.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">{t("contact.phone")}</Label>
              <Input
                id="phone"
                type="tel"
                data-testid="input-lead-phone"
                placeholder={t("form.phonePlaceholder")}
                {...form1.register("phone")}
              />
              {form1.formState.errors.phone && (
                <p className="text-sm text-destructive mt-1">
                  {form1.formState.errors.phone.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full"
              data-testid="button-lead-step1"
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Datos seguros
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Respuesta en 24h
              </span>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={form2.handleSubmit(handleStep2Submit)} className="space-y-4">
            <div>
              <Label htmlFor="destination">{t("contact.service")}</Label>
              <Input
                id="destination"
                data-testid="input-lead-destination"
                placeholder="París, Roma, Barcelona..."
                {...form2.register("destination")}
              />
            </div>

            <div>
              <Label htmlFor="travelDates">Fechas aproximadas (opcional)</Label>
              <Input
                id="travelDates"
                data-testid="input-lead-dates"
                placeholder="Ej: Marzo 2025"
                {...form2.register("travelDates")}
              />
            </div>

            <div>
              <Label htmlFor="budget">Presupuesto aproximado (opcional)</Label>
              <Input
                id="budget"
                data-testid="input-lead-budget"
                placeholder="Ej: $3,000 - $5,000 USD"
                {...form2.register("budget")}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline"
                className="flex-1"
                onClick={handleSkipStep2}
                disabled={submitMutation.isPending}
                data-testid="button-lead-skip"
              >
                Omitir
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={submitMutation.isPending}
                data-testid="button-lead-submit"
              >
                {submitMutation.isPending ? t("contact.sending") : "Enviar solicitud"}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
