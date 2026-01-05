import { useState } from "react";
import { X, Download, Check, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";

const PDF_BENEFITS = {
  es: [
    "50+ destinos europeos detallados",
    "Itinerarios día a día descargables", 
    "Consejos de ahorro exclusivos",
    "Lista de documentos necesarios",
    "Mejores épocas para viajar",
    "Presupuestos estimados por destino"
  ],
  en: [
    "50+ detailed European destinations",
    "Downloadable day-by-day itineraries",
    "Exclusive money-saving tips",
    "Required documents checklist",
    "Best travel seasons",
    "Estimated budgets by destination"
  ],
  pt: [
    "50+ destinos europeus detalhados",
    "Itinerários dia a dia para download",
    "Dicas exclusivas de economia",
    "Lista de documentos necessários",
    "Melhores épocas para viajar",
    "Orçamentos estimados por destino"
  ]
};

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeadMagnetModal({ isOpen, onClose }: LeadMagnetModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language } = useI18n();

  const emailSchema = z.object({
    email: z.string().email(language === "es" ? "Ingresa un email válido" : language === "pt" ? "Insira um email válido" : "Enter a valid email"),
    name: z.string().min(2, language === "es" ? "Ingresa tu nombre" : language === "pt" ? "Insira seu nome" : "Enter your name"),
  });

  type FormData = z.infer<typeof emailSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", name: "" },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/leads", {
        name: data.name,
        email: data.email,
        phone: "",
        serviceInterest: "lead-magnet-pdf",
        message: "Descargó la guía PDF de Europa",
      });
      setSubmitted(true);
      toast({
        title: language === "es" ? "Descarga lista" : language === "pt" ? "Download pronto" : "Download ready",
        description: language === "es" ? "Revisa tu correo electrónico" : language === "pt" ? "Verifique seu e-mail" : "Check your email",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: language === "es" ? "Hubo un error, intenta de nuevo" : language === "pt" ? "Houve um erro, tente novamente" : "There was an error, try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const benefits = PDF_BENEFITS[language] || PDF_BENEFITS.es;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className={cn(
          "relative w-full max-w-lg bg-white dark:bg-card rounded-2xl shadow-2xl overflow-hidden",
          "animate-in zoom-in-95 duration-300"
        )}
        data-testid="modal-lead-magnet"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-card/80 hover:bg-gray-100 dark:hover:bg-muted transition-colors"
          data-testid="button-close-lead-magnet"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-primary p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">
            {language === "es" ? "Guía Definitiva de Europa 2025" : language === "pt" ? "Guia Definitivo da Europa 2025" : "Ultimate Europe Guide 2025"}
          </h2>
          <p className="text-white/80 text-sm">
            {language === "es" ? "Descarga gratis nuestra guía completa" : language === "pt" ? "Baixe grátis nosso guia completo" : "Download our complete guide for free"}
          </p>
        </div>

        <div className="p-6">
          {!submitted ? (
            <>
              <ul className="space-y-2 mb-6">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={language === "es" ? "Tu nombre" : language === "pt" ? "Seu nome" : "Your name"}
                            {...field}
                            data-testid="input-lead-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={language === "es" ? "Tu correo electrónico" : language === "pt" ? "Seu e-mail" : "Your email"}
                              className="pl-10"
                              {...field}
                              data-testid="input-lead-email"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-accent text-primary font-bold py-5"
                    disabled={isLoading}
                    data-testid="button-download-guide"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        {language === "es" ? "Procesando..." : language === "pt" ? "Processando..." : "Processing..."}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        {language === "es" ? "Descargar Guía Gratis" : language === "pt" ? "Baixar Guia Grátis" : "Download Free Guide"}
                      </span>
                    )}
                  </Button>
                </form>
              </Form>

              <p className="text-xs text-center text-muted-foreground mt-4">
                {language === "es" 
                  ? "No spam. Puedes darte de baja en cualquier momento." 
                  : language === "pt"
                  ? "Sem spam. Você pode cancelar a qualquer momento."
                  : "No spam. You can unsubscribe at any time."}
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === "es" ? "¡Descarga exitosa!" : language === "pt" ? "Download realizado!" : "Download successful!"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {language === "es" 
                  ? "Revisa tu bandeja de entrada para acceder a la guía." 
                  : language === "pt"
                  ? "Verifique sua caixa de entrada para acessar o guia."
                  : "Check your inbox to access the guide."}
              </p>
              <Button onClick={onClose} variant="outline" data-testid="button-close-success">
                {language === "es" ? "Cerrar" : language === "pt" ? "Fechar" : "Close"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function LeadMagnetTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useI18n();

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-accent text-primary font-bold"
        data-testid="button-open-lead-magnet"
      >
        <Download className="w-4 h-4 mr-2" />
        {language === "es" ? "Guía Gratis" : language === "pt" ? "Guia Grátis" : "Free Guide"}
      </Button>
      <LeadMagnetModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
