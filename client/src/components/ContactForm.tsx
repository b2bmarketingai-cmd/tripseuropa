import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { useCreateLead } from "@/hooks/use-leads";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactFormProps {
  variant?: "hero" | "footer" | "page";
  title?: string;
  subtitle?: string;
}

export function ContactForm({ variant = "page", title, subtitle }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { t, language } = useI18n();
  const { mutate: createLead, isPending } = useCreateLead();

  const contactSchema = z.object({
    name: z.string().min(2, t("form.validation.nameMin")),
    email: z.string().email(t("form.validation.emailInvalid")),
    phone: z.string().optional(),
    originCountry: z.string().min(1, language === "es" ? "Selecciona tu pais de origen" : "Select your origin country"),
    serviceInterest: z.string().optional(),
    message: z.string().min(10, t("form.validation.messageMin")),
    honeypot: z.string().max(0).optional(),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      originCountry: "",
      serviceInterest: "",
      message: "",
      honeypot: "",
    },
  });

  const originCountries = [
    { value: "colombia", label: "Colombia" },
    { value: "mexico", label: "Mexico" },
    { value: "argentina", label: "Argentina" },
    { value: "brasil", label: "Brasil" },
    { value: "peru", label: "Peru" },
    { value: "chile", label: "Chile" },
    { value: "ecuador", label: "Ecuador" },
    { value: "panama", label: "Panama" },
    { value: "costa-rica", label: "Costa Rica" },
    { value: "venezuela", label: "Venezuela" },
    { value: "otro", label: language === "es" ? "Otro pais" : "Other country" },
  ];

  const onSubmit = (data: ContactFormData) => {
    if (data.honeypot && data.honeypot.length > 0) {
      return;
    }
    const { honeypot, ...leadData } = data;
    createLead(leadData as any, {
      onSuccess: () => {
        setSubmitted(true);
        toast({
          title: t("contact.success"),
          description: t("contact.successMessage"),
        });
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      },
      onError: () => {
        toast({
          title: "Error",
          description: t("form.errorSend"),
          variant: "destructive",
        });
      },
    });
  };

  if (submitted) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 text-center ${variant === "hero" ? "text-white" : ""}`} data-testid="contact-success-message">
        <CheckCircle className="w-16 h-16 text-accent mb-4" />
        <h3 className="text-2xl font-display font-bold mb-2">{t("contact.success")}</h3>
        <p className={variant === "hero" ? "text-white/70" : "text-muted-foreground"}>
          {t("contact.successMessage")}
        </p>
      </div>
    );
  }

  const isHero = variant === "hero";
  const isFooter = variant === "footer";

  const serviceOptions = [
    { value: "vuelos", label: t("contact.services.flights") },
    { value: "paquetes", label: t("contact.services.packages") },
    { value: "hoteles", label: t("contact.services.hotels") },
    { value: "luna-miel", label: t("contact.services.honeymoon") },
    { value: "grupos", label: t("contact.services.groups") },
    { value: "corporativo", label: t("contact.services.corporate") },
    { value: "otro", label: t("contact.services.other") },
  ];

  return (
    <div className={`${isHero ? "glass-panel rounded-2xl p-6 md:p-8" : isFooter ? "" : "bg-white rounded-2xl shadow-xl p-8"}`} data-testid="contact-form-container">
      {(title || subtitle) && (
        <div className={`mb-6 ${isHero ? "text-center" : ""}`}>
          {title && <h3 className={`text-2xl font-display font-bold mb-2 ${isHero ? "text-primary" : ""}`} data-testid="text-contact-title">{title}</h3>}
          {subtitle && <p className={isHero ? "text-gray-600" : "text-muted-foreground"} data-testid="text-contact-subtitle">{subtitle}</p>}
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-contact">
          <div className={`grid ${isFooter ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4`}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={isFooter ? "text-white/70" : ""}>{t("contact.name")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("form.namePlaceholder")} 
                      {...field} 
                      className={isFooter ? "bg-white/5 border-white/10 text-white placeholder:text-white/30" : ""}
                      data-testid="input-contact-name"
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
                  <FormLabel className={isFooter ? "text-white/70" : ""}>{t("contact.email")}</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder={t("form.emailPlaceholder")} 
                      {...field} 
                      className={isFooter ? "bg-white/5 border-white/10 text-white placeholder:text-white/30" : ""}
                      data-testid="input-contact-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={`grid ${isFooter ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4`}>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={isFooter ? "text-white/70" : ""}>{t("contact.phone")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("form.phonePlaceholder")} 
                      {...field} 
                      className={isFooter ? "bg-white/5 border-white/10 text-white placeholder:text-white/30" : ""}
                      data-testid="input-contact-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="originCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={isFooter ? "text-white/70" : ""}>
                    {language === "es" ? "Pais de Origen" : "Origin Country"} *
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger 
                        className={isFooter ? "bg-white/5 border-white/10 text-white" : ""}
                        data-testid="select-contact-origin"
                      >
                        <SelectValue placeholder={language === "es" ? "Selecciona tu pais" : "Select your country"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {originCountries.map((country) => (
                        <SelectItem key={country.value} value={country.value} data-testid={`option-origin-${country.value}`}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={`grid ${isFooter ? "grid-cols-1" : "grid-cols-1"} gap-4`}>
            <FormField
              control={form.control}
              name="serviceInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={isFooter ? "text-white/70" : ""}>{t("contact.service")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger 
                        className={isFooter ? "bg-white/5 border-white/10 text-white" : ""}
                        data-testid="select-contact-service"
                      >
                        <SelectValue placeholder={t("contact.selectService")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} data-testid={`option-service-${option.value}`}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={isFooter ? "text-white/70" : ""}>{t("contact.message")}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t("contact.messagePlaceholder")} 
                    rows={4}
                    {...field} 
                    className={isFooter ? "bg-white/5 border-white/10 text-white placeholder:text-white/30" : ""}
                    data-testid="textarea-contact-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="hidden" aria-hidden="true">
            <FormField
              control={form.control}
              name="honeypot"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      {...field} 
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-accent text-primary font-bold hover:bg-accent/90 py-6 text-lg"
            disabled={isPending}
            data-testid="button-contact-submit"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                {t("contact.sending")}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                {t("contact.submit")}
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export function ContactInfo() {
  const { t } = useI18n();
  
  return (
    <div className="space-y-6" data-testid="contact-info-section">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h4 className="font-bold text-lg mb-1">{t("contactInfo.call")}</h4>
          <p className="text-muted-foreground">+57 601 123 4567</p>
          <p className="text-muted-foreground">+34 91 123 4567</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h4 className="font-bold text-lg mb-1">{t("contactInfo.write")}</h4>
          <p className="text-muted-foreground">info@tripseuropa.com</p>
          <p className="text-muted-foreground">reservas@tripseuropa.com</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h4 className="font-bold text-lg mb-1">{t("contactInfo.visit")}</h4>
          <p className="text-muted-foreground">Bogotá: Cra 7 #71-21, Of. 501</p>
          <p className="text-muted-foreground">Madrid: Gran Vía 42, 3º</p>
        </div>
      </div>
    </div>
  );
}
