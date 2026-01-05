import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import { Send, Phone, Mail, CheckCircle, MapPin } from "lucide-react";
import { useCreateLead } from "@/hooks/use-leads";
import { PhoneInput } from "@/components/PhoneInput";
import { DESTINATIONS_DATA } from "@/lib/destinationsData";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ContactFormProps {
  variant?: "hero" | "footer" | "page";
  title?: string;
  subtitle?: string;
  defaultDestination?: string;
  defaultMessage?: string;
}

export function ContactForm({ variant = "page", title, subtitle, defaultDestination, defaultMessage }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { t, language } = useI18n();
  const { mutate: createLead, isPending } = useCreateLead();
  
  const destinationOptions = DESTINATIONS_DATA.map(dest => ({
    value: dest.slug,
    label: language === "es" ? dest.name.es : language === "pt" ? (dest.name.pt || dest.name.en) : dest.name.en
  }));
  
  const initialDestOption = defaultDestination 
    ? destinationOptions.find(d => d.value === defaultDestination || d.label.toLowerCase() === defaultDestination.toLowerCase())
    : null;
  
  const [destSearch, setDestSearch] = useState(initialDestOption?.label || "");
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const phoneRequiredMsg = language === "es" ? "El teléfono es obligatorio" : language === "pt" ? "O telefone é obrigatório" : "Phone is required";
  const destinationRequiredMsg = language === "es" ? "Selecciona un destino" : language === "pt" ? "Selecione um destino" : "Select a destination";
  
  const contactSchema = z.object({
    name: z.string().min(2, t("form.validation.nameMin")),
    email: z.string().email(t("form.validation.emailInvalid")),
    phone: z.string().min(5, phoneRequiredMsg),
    serviceInterest: z.string().min(1, destinationRequiredMsg),
    message: z.string().min(1).optional(),
    honeypot: z.string().max(0).optional(),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceInterest: initialDestOption?.value || "",
      message: defaultMessage || "",
      honeypot: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    if (data.honeypot && data.honeypot.length > 0) {
      return;
    }
    const { honeypot, ...leadData } = data;
    createLead(leadData as any, {
      onSuccess: () => {
        const destinationLabel = destinationOptions.find(d => d.value === data.serviceInterest)?.label || data.serviceInterest;
        const whatsappMessage = `¡Nueva solicitud de contacto!

*Nombre:* ${data.name}
*Email:* ${data.email}
*Teléfono:* ${data.phone}
*Destino de Interés:* ${destinationLabel}
*Mensaje:* ${data.message || "Sin mensaje"}`;
        window.open(`https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(whatsappMessage)}`, "_blank");
        
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

  const filteredDestinations = destinationOptions.filter(dest =>
    dest.label.toLowerCase().includes(destSearch.toLowerCase())
  );

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
                  <FormLabel className={isFooter ? "text-white/70" : ""}>{t("contact.phone")} *</FormLabel>
                  <FormControl>
                    <PhoneInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t("form.phonePlaceholder")}
                      data-testid="input-contact-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={isFooter ? "text-white/70" : ""}>{t("contact.service")} *</FormLabel>
                  <div className="relative">
                    <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 z-10 ${isFooter ? "text-white/50" : "text-primary"}`} />
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t("contact.selectService")}
                        value={destSearch}
                        onChange={(e) => {
                          setDestSearch(e.target.value);
                          setShowDestDropdown(true);
                          if (!e.target.value) {
                            field.onChange("");
                          }
                        }}
                        onFocus={() => setShowDestDropdown(true)}
                        onBlur={() => {
                          setTimeout(() => setShowDestDropdown(false), 200);
                        }}
                        className={`pl-10 ${isFooter ? "bg-white/5 border-white/10 text-white placeholder:text-white/30" : ""}`}
                        data-testid="input-contact-destination"
                      />
                    </FormControl>
                    {showDestDropdown && filteredDestinations.length > 0 && (
                      <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-48 overflow-y-auto">
                        {filteredDestinations.map((dest) => (
                          <button
                            key={dest.value}
                            type="button"
                            onClick={() => {
                              setDestSearch(dest.label);
                              field.onChange(dest.value);
                              setShowDestDropdown(false);
                            }}
                            className="w-full px-4 py-2.5 text-left hover:bg-accent/10 text-sm flex items-center gap-2 border-b border-gray-50 last:border-0"
                            data-testid={`option-destination-${dest.value}`}
                          >
                            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="font-medium text-gray-900">{dest.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
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
          <p className="text-muted-foreground">+34 611 105 448</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h4 className="font-bold text-lg mb-1">{t("contactInfo.write")}</h4>
          <p className="text-muted-foreground">info@tripseuropa.com</p>
          <p className="text-muted-foreground">agente@tripseuropa.com</p>
        </div>
      </div>
    </div>
  );
}
