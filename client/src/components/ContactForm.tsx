import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  phone: z.string().optional(),
  serviceInterest: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  variant?: "hero" | "footer" | "page";
  title?: string;
  subtitle?: string;
}

export function ContactForm({ variant = "page", title, subtitle }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { mutate: createLead, isPending } = useCreateLead();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceInterest: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    createLead(data, {
      onSuccess: () => {
        setSubmitted(true);
        toast({
          title: "Mensaje enviado",
          description: "Nos pondremos en contacto contigo pronto.",
        });
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      },
      onError: () => {
        toast({
          title: "Error",
          description: "No se pudo enviar el mensaje. Intenta de nuevo.",
          variant: "destructive",
        });
      },
    });
  };

  if (submitted) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 text-center ${variant === "hero" ? "text-white" : ""}`}>
        <CheckCircle className="w-16 h-16 text-accent mb-4" />
        <h3 className="text-2xl font-display font-bold mb-2">¡Gracias por contactarnos!</h3>
        <p className={variant === "hero" ? "text-white/70" : "text-muted-foreground"}>
          Un asesor de viajes te contactará en las próximas 24 horas.
        </p>
      </div>
    );
  }

  const isHero = variant === "hero";
  const isFooter = variant === "footer";

  return (
    <div className={`${isHero ? "glass-panel rounded-2xl p-6 md:p-8" : isFooter ? "" : "bg-white rounded-2xl shadow-xl p-8"}`}>
      {(title || subtitle) && (
        <div className={`mb-6 ${isHero ? "text-center" : ""}`}>
          {title && <h3 className={`text-2xl font-display font-bold mb-2 ${isHero ? "text-primary" : ""}`}>{title}</h3>}
          {subtitle && <p className={isHero ? "text-gray-600" : "text-muted-foreground"}>{subtitle}</p>}
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className={`grid ${isFooter ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4`}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={isFooter ? "text-white/70" : ""}>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Tu nombre" 
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
                  <FormLabel className={isFooter ? "text-white/70" : ""}>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="tu@email.com" 
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
                  <FormLabel className={isFooter ? "text-white/70" : ""}>Teléfono (Opcional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+57 300 123 4567" 
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
              name="serviceInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={isFooter ? "text-white/70" : ""}>Servicio de Interés</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger 
                        className={isFooter ? "bg-white/5 border-white/10 text-white" : ""}
                        data-testid="select-contact-service"
                      >
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="vuelos">Vuelos a Europa</SelectItem>
                      <SelectItem value="paquetes">Paquetes Todo Incluido</SelectItem>
                      <SelectItem value="hoteles">Reserva de Hoteles</SelectItem>
                      <SelectItem value="luna-miel">Luna de Miel</SelectItem>
                      <SelectItem value="grupos">Viajes en Grupo</SelectItem>
                      <SelectItem value="corporativo">Viajes Corporativos</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
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
                <FormLabel className={isFooter ? "text-white/70" : ""}>Mensaje</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Cuéntanos sobre tu viaje soñado a Europa..." 
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

          <Button 
            type="submit" 
            className="w-full bg-accent text-primary font-bold hover:bg-accent/90 py-6 text-lg"
            disabled={isPending}
            data-testid="button-contact-submit"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                Enviando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Enviar Mensaje
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h4 className="font-bold text-lg mb-1">Llámanos</h4>
          <p className="text-muted-foreground">+57 601 123 4567</p>
          <p className="text-muted-foreground">+34 91 123 4567</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h4 className="font-bold text-lg mb-1">Escríbenos</h4>
          <p className="text-muted-foreground">info@tripseuropa.com</p>
          <p className="text-muted-foreground">reservas@tripseuropa.com</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h4 className="font-bold text-lg mb-1">Visítanos</h4>
          <p className="text-muted-foreground">Bogotá: Cra 7 #71-21, Of. 501</p>
          <p className="text-muted-foreground">Madrid: Gran Vía 42, 3º</p>
        </div>
      </div>
    </div>
  );
}
