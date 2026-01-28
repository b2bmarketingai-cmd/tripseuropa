import { useParams, Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";
import { getTravelStyleBySlug } from "@/lib/travelStyleData";
import { 
  Calendar, Clock, Check, ChevronRight, MapPin, 
  Users, Phone, Star, ArrowLeft, MessageSquare
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { FloatingContactButtons } from "@/components/support";
import { ContactForm } from "@/components/ContactForm";

const CONTENT = {
  es: {
    back: "Volver",
    packages: "Paquetes Disponibles",
    from: "Desde",
    perPerson: "por persona",
    selectPackage: "Solicitar Informacion",
    itinerary: "Itinerario De Ejemplo",
    day: "Dia",
    faqs: "Preguntas Frecuentes",
    contactForm: "Solicita Tu Viaje",
    contactDescription: "Completa el formulario y un asesor te contactara en menos de 24 horas",
    name: "Nombre completo",
    email: "Email",
    phone: "Telefono",
    travelers: "Numero de viajeros",
    travelDate: "Fecha de viaje deseada",
    message: "Comentarios adicionales",
    submit: "Enviar Solicitud",
    submitting: "Enviando...",
    bestFor: "Ideal Para",
    idealDuration: "Duracion Recomendada",
    highlights: "Lo Que Incluye",
    whatsapp: "Contactar por WhatsApp",
    call: "Llamar ahora",
    notFound: "Estilo de viaje no encontrado",
    backHome: "Volver al inicio"
  },
  en: {
    back: "Back",
    packages: "Available Packages",
    from: "From",
    perPerson: "per person",
    selectPackage: "Request Information",
    itinerary: "Sample Itinerary",
    day: "Day",
    faqs: "Frequently Asked Questions",
    contactForm: "Request Your Trip",
    contactDescription: "Fill out the form and an advisor will contact you within 24 hours",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    travelers: "Number of travelers",
    travelDate: "Desired travel date",
    message: "Additional comments",
    submit: "Send Request",
    submitting: "Sending...",
    bestFor: "Best For",
    idealDuration: "Recommended Duration",
    highlights: "What's Included",
    whatsapp: "Contact via WhatsApp",
    call: "Call now",
    notFound: "Travel style not found",
    backHome: "Back to home"
  },
  pt: {
    back: "Voltar",
    packages: "Pacotes Disponiveis",
    from: "A partir de",
    perPerson: "por pessoa",
    selectPackage: "Solicitar Informacoes",
    itinerary: "Roteiro de Exemplo",
    day: "Dia",
    faqs: "Perguntas Frequentes",
    contactForm: "Solicite Sua Viagem",
    contactDescription: "Preencha o formulario e um consultor entrara em contato em ate 24 horas",
    name: "Nome completo",
    email: "Email",
    phone: "Telefone",
    travelers: "Numero de viajantes",
    travelDate: "Data de viagem desejada",
    message: "Comentarios adicionais",
    submit: "Enviar Solicitacao",
    submitting: "Enviando...",
    bestFor: "Ideal Para",
    idealDuration: "Duracao Recomendada",
    highlights: "O Que Esta Incluido",
    whatsapp: "Contatar via WhatsApp",
    call: "Ligar agora",
    notFound: "Estilo de viagem nao encontrado",
    backHome: "Voltar ao inicio"
  }
};

type MultiLangText = { es: string; en: string; pt?: string };
type MultiLangArray = { es: string[]; en: string[]; pt?: string[] };

function getText(text: MultiLangText, lang: "es" | "en" | "pt"): string {
  if (lang === "pt") return text.pt || text.es;
  return text[lang];
}

function getArray(arr: MultiLangArray, lang: "es" | "en" | "pt"): string[] {
  if (lang === "pt") return arr.pt || arr.es;
  return arr[lang];
}

export default function TravelStylePage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useI18n();
  const lang = language as "es" | "en" | "pt";
  const content = CONTENT[lang];
  const travelStyle = getTravelStyleBySlug(slug || "");
  
  if (!travelStyle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">
            {content.notFound}
          </h1>
          <Link href="/">
            <Button>{content.backHome}</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryLabels = {
    season: { es: "Por Temporada", en: "By Season", pt: "Por Temporada" },
    interest: { es: "Por Interes", en: "By Interest", pt: "Por Interesse" },
    group: { es: "Por Grupo", en: "By Group", pt: "Por Grupo" }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section 
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center"
        data-testid="section-hero"
      >
        <div className="absolute inset-0">
          <img
            src={travelStyle.heroImage}
            alt={getText(travelStyle.name, lang)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        </div>
        <div className="container relative z-10 px-4 text-white">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {content.back}
          </Link>
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
            {categoryLabels[travelStyle.category][lang]}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-accent" data-testid="text-title">
            {getText(travelStyle.name, lang)}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mb-6">
            {getText(travelStyle.description, lang)}
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-sm">{content.bestFor}: {getText(travelStyle.bestFor, lang)}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="text-sm">{content.idealDuration}: {getText(travelStyle.idealDuration, lang)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30" data-testid="section-highlights">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-8 text-center">
            {content.highlights}
          </h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {getArray(travelStyle.highlights, lang).map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-card p-4 rounded-md">
                <Check className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-packages">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-8 text-center">
            {content.packages}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {travelStyle.packages.map((pkg, idx) => (
              <Card key={pkg.id} className={`overflow-hidden ${idx === 0 ? 'border-accent border-2' : ''}`}>
                {idx === 0 && (
                  <Badge className="absolute top-4 right-4 bg-accent text-primary z-10">
                    <Star className="w-3 h-3 mr-1" />
                    {lang === "es" ? "Recomendado" : lang === "pt" ? "Recomendado" : "Recommended"}
                  </Badge>
                )}
                <div className="relative h-48">
                  <img
                    src={pkg.image}
                    alt={getText(pkg.name, lang)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display font-bold text-lg text-white mb-1">
                      {getText(pkg.name, lang)}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{pkg.destination}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{getText(pkg.duration, lang)}</span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground">{content.from}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-accent">${pkg.price.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">USD</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{content.perPerson}</p>
                  </div>

                  <ul className="space-y-1 mb-4">
                    {getArray(pkg.highlights, lang).map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full bg-accent text-primary hover:bg-accent/90"
                    onClick={() => {
                      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    data-testid={`button-package-${idx}`}
                  >
                    {content.selectPackage}
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
            {content.itinerary}
          </h2>
          <div className="max-w-3xl mx-auto">
            {travelStyle.sampleItinerary.map((day, idx) => (
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
                    {content.day} {day.day}: {getText(day.title, lang)}
                  </h3>
                  <p className="text-muted-foreground">{getText(day.description, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-faqs">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-8 text-center">
            {content.faqs}
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {travelStyle.faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-left hover:no-underline" data-testid={`faq-${idx}`}>
                    <span className="font-medium">{getText(faq.question, lang)}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{getText(faq.answer, lang)}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact-form" className="py-16 bg-primary" data-testid="section-contact">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-4">
                {content.contactForm}
              </h2>
              <p className="text-white/80">{content.contactDescription}</p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3">
                <ContactForm variant="page" defaultMessage={`${lang === "en" ? "Interested in" : lang === "pt" ? "Interessado em" : "Interesado en"}: ${getText(travelStyle.name, lang)}`} />
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <a 
                  href="https://api.whatsapp.com/send?phone=34611105448" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white p-4 rounded-md transition-colors"
                  data-testid="link-whatsapp"
                >
                  <SiWhatsapp className="w-6 h-6" />
                  <div>
                    <p className="font-medium">{content.whatsapp}</p>
                    <p className="text-sm text-white/80">+34 611 105 448</p>
                  </div>
                </a>
                
                <a 
                  href="tel:+34611105448" 
                  className="flex items-center gap-3 bg-accent hover:bg-accent/90 text-primary p-4 rounded-md transition-colors"
                  data-testid="link-phone"
                >
                  <Phone className="w-6 h-6" />
                  <div>
                    <p className="font-medium">{content.call}</p>
                    <p className="text-sm">+34 611 105 448</p>
                  </div>
                </a>
                
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="pt-6 text-white">
                    <MessageSquare className="w-8 h-8 text-accent mb-3" />
                    <p className="text-sm">
                      {lang === "es" 
                        ? "Nuestros asesores estan disponibles de lunes a viernes de 9:00 AM a 7:00 PM y sabados de 9:00 AM a 2:00 PM." 
                        : lang === "pt"
                        ? "Nossos consultores estao disponiveis de segunda a sexta das 9h as 19h e sabados das 9h as 14h."
                        : "Our advisors are available Monday to Friday from 9:00 AM to 7:00 PM and Saturdays from 9:00 AM to 2:00 PM."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingContactButtons />

      <Footer />
    </div>
  );
}
