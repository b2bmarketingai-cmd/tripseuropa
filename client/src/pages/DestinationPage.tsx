import { useParams } from "wouter";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { getDestinationBySlug } from "@/lib/destinationsData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  MapPin,
  Clock,
  Check,
  Star,
  Phone,
  Mail,
  User,
  MessageSquare,
  Globe,
  CreditCard,
  FileText,
  ChevronRight,
  Send,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function DestinationPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useI18n();
  const lang = language as "es" | "en";
  const { toast } = useToast();
  
  const destination = getDestinationBySlug(slug || "");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    packageInterest: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[100px]">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-accent mb-4">
            {lang === "es" ? "Destino no encontrado" : "Destination not found"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {lang === "es" 
              ? "El destino que buscas no existe o ha sido movido." 
              : "The destination you're looking for doesn't exist or has been moved."}
          </p>
          <Button onClick={() => window.location.href = "/"}>
            {lang === "es" ? "Volver al inicio" : "Back to home"}
          </Button>
        </div>
      </div>
    );
  }

  const content = {
    es: {
      highlights: "Puntos Destacados",
      packages: "Nuestros Paquetes",
      from: "Desde",
      taxes: "+ impuestos",
      perPerson: "por persona",
      duration: "Duracion",
      includes: "Incluye",
      selectPackage: "Solicitar Cotizacion",
      itinerary: "Itinerario de Viaje",
      day: "Dia",
      activities: "Actividades",
      faqs: "Preguntas Frecuentes",
      gallery: "Galeria",
      practicalInfo: "Informacion Practica",
      bestTime: "Mejor epoca para visitar",
      currency: "Moneda",
      language: "Idioma",
      visa: "Informacion de visa",
      contactForm: "Solicita tu Cotizacion",
      contactDescription: "Completa el formulario y un asesor se pondra en contacto contigo en menos de 24 horas.",
      name: "Nombre completo",
      email: "Correo electronico",
      phone: "Telefono",
      message: "Mensaje o consulta",
      packageInterest: "Paquete de interes",
      submit: "Enviar Solicitud",
      submitting: "Enviando...",
      successTitle: "Solicitud enviada",
      successMessage: "Nos pondremos en contacto contigo pronto.",
      whatsapp: "Contactar por WhatsApp",
      call: "Llamar ahora"
    },
    en: {
      highlights: "Highlights",
      packages: "Our Packages",
      from: "From",
      taxes: "+ taxes",
      perPerson: "per person",
      duration: "Duration",
      includes: "Includes",
      selectPackage: "Request Quote",
      itinerary: "Travel Itinerary",
      day: "Day",
      activities: "Activities",
      faqs: "Frequently Asked Questions",
      gallery: "Gallery",
      practicalInfo: "Practical Information",
      bestTime: "Best time to visit",
      currency: "Currency",
      language: "Language",
      visa: "Visa information",
      contactForm: "Request Your Quote",
      contactDescription: "Fill out the form and an advisor will contact you within 24 hours.",
      name: "Full name",
      email: "Email",
      phone: "Phone",
      message: "Message or inquiry",
      packageInterest: "Package of interest",
      submit: "Send Request",
      submitting: "Sending...",
      successTitle: "Request sent",
      successMessage: "We will contact you soon.",
      whatsapp: "Contact via WhatsApp",
      call: "Call now"
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: content[lang].successTitle,
      description: content[lang].successMessage,
    });
    
    setFormData({ name: "", email: "", phone: "", message: "", packageInterest: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <section 
        className="relative min-h-[500px] flex items-center justify-center pt-[100px]"
        data-testid="section-destination-hero"
      >
        <div className="absolute inset-0">
          <img
            src={destination.heroImage}
            alt={destination.name[lang]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-primary/30"></div>
        </div>
        
        <div className="container relative z-10 px-4 py-16 text-center">
          <h1 
            className="text-5xl md:text-7xl font-display font-bold text-accent mb-6"
            data-testid="text-destination-title"
          >
            {destination.name[lang]}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            {destination.description[lang].slice(0, 200)}...
          </p>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-highlights">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-8 text-center">
            {content[lang].highlights}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {destination.highlights[lang].map((highlight, idx) => (
              <div 
                key={idx}
                className="bg-card rounded-md p-4 text-center shadow-sm"
                data-testid={`highlight-${idx}`}
              >
                <Star className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-sm font-medium">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-packages">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-8 text-center">
            {content[lang].packages}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {destination.packages.map((pkg, idx) => (
              <Card key={pkg.id} className={`relative ${idx === 1 ? 'border-accent border-2 shadow-lg' : ''}`}>
                {idx === 1 && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-primary">
                    {lang === "es" ? "Mas Popular" : "Most Popular"}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-display text-accent">
                    {pkg.name[lang]}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{pkg.duration[lang]}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-sm text-muted-foreground">{content[lang].from}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-accent">${pkg.price}</span>
                      <span className="text-sm text-muted-foreground">USD</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{content[lang].perPerson}</p>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">{content[lang].includes}:</p>
                    <ul className="space-y-1">
                      {pkg.includes[lang].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full bg-accent text-primary hover:bg-accent/90"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, packageInterest: pkg.name[lang] }));
                      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    data-testid={`button-select-package-${idx}`}
                  >
                    {content[lang].selectPackage}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-itinerary">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-8 text-center">
            {content[lang].itinerary}
          </h2>
          <div className="max-w-4xl mx-auto">
            {destination.itinerary.map((day, idx) => (
              <div 
                key={idx}
                className="relative pl-8 pb-8 border-l-2 border-accent/30 last:border-l-0 last:pb-0"
                data-testid={`itinerary-day-${day.day}`}
              >
                <div className="absolute left-0 top-0 w-6 h-6 -translate-x-1/2 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{day.day}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-display font-bold text-accent mb-1">
                    {content[lang].day} {day.day}: {day.title[lang]}
                  </h3>
                  <p className="text-muted-foreground mb-3">{day.description[lang]}</p>
                  <div className="flex flex-wrap gap-2">
                    {day.activities[lang].map((activity, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-gallery">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-8 text-center">
            {content[lang].gallery}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destination.galleryImages.map((img, idx) => (
              <div 
                key={idx}
                className="aspect-square rounded-md overflow-hidden"
                data-testid={`gallery-image-${idx}`}
              >
                <img
                  src={img}
                  alt={`${destination.name[lang]} ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-practical-info">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-8 text-center">
            {content[lang].practicalInfo}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <Calendar className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="font-medium mb-1">{content[lang].bestTime}</p>
                <p className="text-sm text-muted-foreground">{destination.bestTimeToVisit[lang]}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <CreditCard className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="font-medium mb-1">{content[lang].currency}</p>
                <p className="text-sm text-muted-foreground">{destination.currency}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Globe className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="font-medium mb-1">{content[lang].language}</p>
                <p className="text-sm text-muted-foreground">{destination.language[lang]}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <FileText className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="font-medium mb-1">{content[lang].visa}</p>
                <p className="text-sm text-muted-foreground">{destination.visaInfo[lang]}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-faqs">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-8 text-center">
            {content[lang].faqs}
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {destination.faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-medium">{faq.question[lang]}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer[lang]}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact-form" className="py-16 bg-primary" data-testid="section-contact-form">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-4">
                {content[lang].contactForm}
              </h2>
              <p className="text-white/80">{content[lang].contactDescription}</p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3">
                <form onSubmit={handleSubmit} className="bg-card rounded-md p-6 shadow-lg">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">{content[lang].name}</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="pl-10"
                          required
                          data-testid="input-contact-name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">{content[lang].email}</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                          required
                          data-testid="input-contact-email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">{content[lang].phone}</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="pl-10"
                          required
                          data-testid="input-contact-phone"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="packageInterest">{content[lang].packageInterest}</Label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="packageInterest"
                          value={formData.packageInterest}
                          onChange={(e) => setFormData(prev => ({ ...prev, packageInterest: e.target.value }))}
                          className="pl-10"
                          placeholder={destination.packages[0]?.name[lang] || ""}
                          data-testid="input-contact-package"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">{content[lang].message}</Label>
                      <div className="relative mt-1">
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          rows={4}
                          data-testid="input-contact-message"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-accent text-primary hover:bg-accent/90"
                      disabled={isSubmitting}
                      data-testid="button-submit-contact"
                    >
                      {isSubmitting ? content[lang].submitting : content[lang].submit}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <a 
                  href="https://wa.me/573001234567" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white p-4 rounded-md transition-colors"
                  data-testid="link-whatsapp"
                >
                  <SiWhatsapp className="w-6 h-6" />
                  <div>
                    <p className="font-medium">{content[lang].whatsapp}</p>
                    <p className="text-sm text-white/80">+57 300 123 4567</p>
                  </div>
                </a>
                
                <a 
                  href="tel:+573001234567" 
                  className="flex items-center gap-3 bg-accent hover:bg-accent/90 text-primary p-4 rounded-md transition-colors"
                  data-testid="link-phone"
                >
                  <Phone className="w-6 h-6" />
                  <div>
                    <p className="font-medium">{content[lang].call}</p>
                    <p className="text-sm">+57 300 123 4567</p>
                  </div>
                </a>
                
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="pt-6 text-white">
                    <MessageSquare className="w-8 h-8 text-accent mb-3" />
                    <p className="text-sm">
                      {lang === "es" 
                        ? "Nuestros asesores estan disponibles de lunes a viernes de 9:00 AM a 7:00 PM y sabados de 9:00 AM a 2:00 PM." 
                        : "Our advisors are available Monday to Friday from 9:00 AM to 7:00 PM and Saturdays from 9:00 AM to 2:00 PM."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
