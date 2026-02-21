import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Calendar, Tag, ArrowRight, CheckCircle, Phone, Percent, Flame, Loader2 } from "lucide-react";
import { FloatingContactButtons, SupportFAQSection, SupportContactSection, type FAQItem } from "@/components/support";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const LAST_MINUTE_FAQS: FAQItem[] = [
  {
    question: { es: "Que incluyen las ofertas de ultima hora?", en: "What's included in last-minute deals?", pt: "O que esta incluido nas ofertas de ultima hora?" },
    answer: { es: "Nuestras ofertas de ultima hora incluyen vuelos de ida y vuelta, alojamiento en hoteles de 4-5 estrellas, traslados, tours guiados y algunas comidas segun el paquete. Todos los impuestos y tasas estan incluidos en el precio.", en: "Our last-minute deals include round-trip flights, accommodation in 4-5 star hotels, transfers, guided tours, and some meals depending on the package. All taxes and fees are included in the price.", pt: "Nossas ofertas de ultima hora incluem voos de ida e volta, hospedagem em hoteis 4-5 estrelas, traslados, passeios guiados e algumas refeicoes dependendo do pacote. Todos os impostos e taxas estao incluidos no preco." }
  },
  {
    question: { es: "Con cuanta anticipacion puedo reservar una oferta de ultima hora?", en: "How far in advance can I book a last-minute deal?", pt: "Com quanta antecedencia posso reservar uma oferta de ultima hora?" },
    answer: { es: "Las ofertas de ultima hora tienen fechas de salida en las proximas 2-6 semanas. Puedes reservar hasta 48 horas antes de la fecha de salida, dependiendo de la disponibilidad.", en: "Last-minute deals have departure dates within the next 2-6 weeks. You can book up to 48 hours before the departure date, depending on availability.", pt: "As ofertas de ultima hora tem datas de partida nas proximas 2-6 semanas. Voce pode reservar ate 48 horas antes da data de partida, dependendo da disponibilidade." }
  },
  {
    question: { es: "Puedo modificar o cancelar mi reserva de ultima hora?", en: "Can I modify or cancel my last-minute booking?", pt: "Posso modificar ou cancelar minha reserva de ultima hora?" },
    answer: { es: "Las reservas de ultima hora tienen politicas de cancelacion especificas debido a su naturaleza. Generalmente ofrecemos modificaciones sin cargo hasta 7 dias antes de la salida. Consulta los terminos especificos de cada oferta.", en: "Last-minute bookings have specific cancellation policies due to their nature. We generally offer free modifications up to 7 days before departure. Check the specific terms for each offer.", pt: "As reservas de ultima hora tem politicas de cancelamento especificas devido a sua natureza. Geralmente oferecemos modificacoes sem custo ate 7 dias antes da partida. Consulte os termos especificos de cada oferta." }
  },
  {
    question: { es: "Por que los precios de ultima hora son mas bajos?", en: "Why are last-minute prices lower?", pt: "Por que os precos de ultima hora sao mais baixos?" },
    answer: { es: "Los hoteles y aerolineas prefieren llenar sus espacios vacios a ofrecer descuentos. Aprovechamos estas oportunidades para ofrecerte precios excepcionales en viajes de alta calidad.", en: "Hotels and airlines prefer to fill empty spaces rather than offer discounts. We take advantage of these opportunities to offer you exceptional prices on high-quality trips.", pt: "Hoteis e companhias aereas preferem preencher seus espacos vazios a oferecer descontos. Aproveitamos essas oportunidades para oferecer precos excepcionais em viagens de alta qualidade." }
  },
  {
    question: { es: "Como puedo pagar mi reserva?", en: "How can I pay for my booking?", pt: "Como posso pagar minha reserva?" },
    answer: { es: "Aceptamos tarjetas de credito y debito (Visa, Mastercard, American Express), transferencias bancarias y PayPal. Para reservas de ultima hora, el pago completo es requerido al momento de la reserva.", en: "We accept credit and debit cards (Visa, Mastercard, American Express), bank transfers, and PayPal. For last-minute bookings, full payment is required at the time of booking.", pt: "Aceitamos cartoes de credito e debito (Visa, Mastercard, American Express), transferencias bancarias e PayPal. Para reservas de ultima hora, o pagamento completo e necessario no momento da reserva." }
  },
  {
    question: { es: "Necesito visa para viajar a Europa?", en: "Do I need a visa to travel to Europe?", pt: "Preciso de visto para viajar para a Europa?" },
    answer: { es: "Depende de tu nacionalidad. Los ciudadanos de paises latinoamericanos generalmente pueden visitar el espacio Schengen por hasta 90 dias sin visa para turismo. Te recomendamos verificar los requisitos especificos para tu pais.", en: "It depends on your nationality. Citizens of Latin American countries can generally visit the Schengen area for up to 90 days without a visa for tourism. We recommend checking the specific requirements for your country.", pt: "Depende da sua nacionalidade. Cidadaos de paises latino-americanos geralmente podem visitar o espaco Schengen por ate 90 dias sem visto para turismo. Recomendamos verificar os requisitos especificos para o seu pais." }
  }
];

const LAST_MINUTE_OFFERS = [
  {
    id: "ireland-emerald",
    slug: "ireland",
    title: { es: "Esencia de la Isla Esmeralda", en: "Essence of the Emerald Isle" },
    country: { es: "Irlanda", en: "Ireland" },
    days: 9,
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=70&w=800&auto=format&fit=crop",
    highlights: ["Cliffs of Moher", "Dublin", "Galway", "Kilkenny", "Ring of Kerry"],
    originalPrice: 3669,
    salePrice: 2199,
    discount: 40,
    departureDates: ["2026-01-15", "2026-01-22", "2026-02-05"],
    badge: null
  },
  {
    id: "spain-grand-tour",
    slug: "spain",
    title: { es: "Madrid, Andalucia, Valencia y Barcelona", en: "Madrid, Andalusia, Valencia & Barcelona" },
    country: { es: "España", en: "Spain" },
    days: 9,
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=70&w=800&auto=format&fit=crop",
    highlights: ["Alhambra", "Barcelona", "Cordoba", "Granada", "Madrid", "Sevilla", "Valencia"],
    originalPrice: 3919,
    salePrice: 2349,
    discount: 40,
    departureDates: ["2026-01-18", "2026-01-25", "2026-02-01"],
    badge: { es: "Mas Vendido", en: "Best Seller", pt: "Mais Vendido" }
  },
  {
    id: "iceland-adventure",
    slug: "iceland",
    title: { es: "De Glaciares y Cascadas a Aguas Termales", en: "From Glaciers & Waterfalls to Hot Springs" },
    country: { es: "Islandia", en: "Iceland" },
    days: 8,
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=70&w=800&auto=format&fit=crop",
    highlights: ["Geysir", "Gullfoss", "Reykjavik", "Skogafoss", "Snaefellsnes"],
    originalPrice: 3919,
    salePrice: 2349,
    discount: 40,
    departureDates: ["2026-01-20", "2026-02-03", "2026-02-17"],
    badge: null
  },
  {
    id: "italy-eternal-cities",
    slug: "italy",
    title: { es: "Ciudades Eternas de Italia", en: "Escorted Eternal Cities" },
    country: { es: "Italia", en: "Italy" },
    days: 9,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=70&w=800&auto=format&fit=crop",
    highlights: ["Assisi", "Bologna", "Florencia", "Padua", "Roma", "Venecia"],
    originalPrice: 6249,
    salePrice: 2499,
    discount: 60,
    departureDates: ["2026-01-12", "2026-01-19", "2026-01-26"],
    badge: { es: "Venta Flash", en: "Flash Sale", pt: "Venda Relampago" }
  },
  {
    id: "switzerland-germany-france",
    slug: "switzerland",
    title: { es: "Selva Negra, Alsacia y Champagne", en: "The Black Forest, Alsace & Champagne" },
    country: { es: "Suiza, Alemania y Francia", en: "Switzerland, Germany & France" },
    days: 8,
    image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=70&w=800&auto=format&fit=crop",
    highlights: ["Basel", "Zurich", "Baden Baden", "Selva Negra", "Alsacia", "Champagne", "Paris"],
    originalPrice: 3769,
    salePrice: 2449,
    discount: 35,
    departureDates: ["2026-01-25", "2026-02-08", "2026-02-22"],
    badge: null
  },
  {
    id: "greece-islands",
    slug: "greece",
    title: { es: "Atenas y las Islas Griegas", en: "Athens & Greek Islands" },
    country: { es: "Grecia", en: "Greece" },
    days: 10,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=70&w=800&auto=format&fit=crop",
    highlights: ["Atenas", "Santorini", "Mykonos", "Delos", "Acropolis"],
    originalPrice: 4599,
    salePrice: 2759,
    discount: 40,
    departureDates: ["2026-02-01", "2026-02-15", "2026-03-01"],
    badge: { es: "Nuevo", en: "New", pt: "Novo" }
  },
  {
    id: "portugal-complete",
    slug: "portugal",
    title: { es: "Portugal Completo: Lisboa, Porto y Algarve", en: "Complete Portugal: Lisbon, Porto & Algarve" },
    country: { es: "Portugal", en: "Portugal" },
    days: 8,
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=70&w=800&auto=format&fit=crop",
    highlights: ["Lisboa", "Porto", "Sintra", "Algarve", "Evora"],
    originalPrice: 3299,
    salePrice: 1979,
    discount: 40,
    departureDates: ["2026-01-18", "2026-02-01", "2026-02-15"],
    badge: null
  },
  {
    id: "croatia-coast",
    slug: "croatia",
    title: { es: "Costa Dalmatina y Lagos de Plitvice", en: "Dalmatian Coast & Plitvice Lakes" },
    country: { es: "Croacia", en: "Croatia" },
    days: 8,
    image: "https://images.unsplash.com/photo-1555990793-da11153b2473?q=70&w=800&auto=format&fit=crop",
    highlights: ["Dubrovnik", "Split", "Plitvice", "Hvar", "Zadar"],
    originalPrice: 3499,
    salePrice: 2099,
    discount: 40,
    departureDates: ["2026-02-10", "2026-02-24", "2026-03-10"],
    badge: null
  },
  {
    id: "norway-fjords",
    slug: "norway",
    title: { es: "Fiordos Noruegos y Aurora Boreal", en: "Norwegian Fjords & Northern Lights" },
    country: { es: "Noruega", en: "Norway" },
    days: 7,
    image: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?q=70&w=800&auto=format&fit=crop",
    highlights: ["Bergen", "Oslo", "Geirangerfjord", "Tromso", "Flam"],
    originalPrice: 4299,
    salePrice: 2579,
    discount: 40,
    departureDates: ["2026-01-22", "2026-02-05", "2026-02-19"],
    badge: { es: "Aurora Boreal", en: "Northern Lights" }
  },
  {
    id: "scotland-highlands",
    slug: "scotland",
    title: { es: "Highlands Escocesas y Castillos", en: "Scottish Highlands & Castles" },
    country: { es: "Escocia", en: "Scotland" },
    days: 8,
    image: "https://images.unsplash.com/photo-1506377585622-bedcbb5f0d5b?q=70&w=800&auto=format&fit=crop",
    highlights: ["Edimburgo", "Highlands", "Lago Ness", "Isla de Skye", "Inverness"],
    originalPrice: 3599,
    salePrice: 2159,
    discount: 40,
    departureDates: ["2026-01-28", "2026-02-11", "2026-02-25"],
    badge: null
  },
  {
    id: "czech-austria",
    slug: "czech-republic",
    title: { es: "Praga, Viena y Budapest", en: "Prague, Vienna & Budapest" },
    country: { es: "Republica Checa, Austria y Hungria", en: "Czech Republic, Austria & Hungary" },
    days: 10,
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=70&w=800&auto=format&fit=crop",
    highlights: ["Praga", "Viena", "Budapest", "Bratislava", "Cesky Krumlov"],
    originalPrice: 4199,
    salePrice: 2519,
    discount: 40,
    departureDates: ["2026-01-15", "2026-01-29", "2026-02-12"],
    badge: { es: "Popular", en: "Popular", pt: "Popular" }
  },
  {
    id: "france-complete",
    slug: "france",
    title: { es: "Francia Completa: Paris, Loira y Provence", en: "Complete France: Paris, Loire & Provence" },
    country: { es: "Francia", en: "France" },
    days: 10,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=70&w=800&auto=format&fit=crop",
    highlights: ["Paris", "Valle del Loira", "Niza", "Provence", "Lyon"],
    originalPrice: 4499,
    salePrice: 2699,
    discount: 40,
    departureDates: ["2026-02-01", "2026-02-15", "2026-03-01"],
    badge: null
  }
];

export default function LastMinuteOffers() {
  const { language } = useI18n();
  const lang = language as "es" | "en" | "pt";
  const langPrefix = language === "es" ? "" : language === "pt" ? "/pt-br" : `/${language}`;
  const dataLang = (language === "pt" ? "es" : language) as "es" | "en";
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
    return date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", options);
  };
  
  const handleNewsletterSubmit = async () => {
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast({
        title: language === "es" ? "Correo invalido" : language === "pt" ? "Email invalido" : "Invalid email",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail })
      });
      
      if (response.ok) {
        const whatsappMessage = `Nueva suscripcion a newsletter!

*Email:* ${newsletterEmail}
*Pagina:* Ofertas de Ultima Hora`;
        window.open(`https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(whatsappMessage)}`, "_blank");
        
        toast({
          title: language === "es" ? "Suscripcion exitosa" : language === "pt" ? "Inscricao bem-sucedida" : "Subscribed successfully",
          description: language === "es" ? "Recibiras nuestras mejores ofertas" : language === "pt" ? "Voce recebera nossas melhores ofertas" : "You'll receive our best deals"
        });
        setNewsletterEmail("");
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast({
        title: "Error",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <section className="relative py-24 md:py-32 bg-primary overflow-hidden" data-testid="section-lastminute-hero">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?q=60&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/90"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-6 h-6 text-accent" />
            <Badge className="bg-accent/20 text-accent border-accent/30" data-testid="badge-lastminute">
              {language === "es" ? "Ofertas Exclusivas" : language === "pt" ? "Ofertas Exclusivas" : "Exclusive Deals"}
            </Badge>
            <Flame className="w-6 h-6 text-accent" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-lastminute-title">
            <span className="text-accent">{language === "es" ? "Ofertas de Ultima Hora" : language === "pt" ? "Ofertas de Ultima Hora" : "Last-Minute Deals"}</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8" data-testid="text-lastminute-subtitle">
            {language === "es" 
              ? "Buscas escaparte pronto? Aprovecha nuestras ofertas de ultima hora y disfruta de un viaje increible a un precio excepcional. Con salidas en las proximas semanas, no tienes que esperar meses para disfrutar de tus merecidas vacaciones." 
              : language === "pt"
              ? "Quer escapar logo? Aproveite nossas ofertas de ultima hora e desfrute de uma viagem incrivel a um preco excepcional. Com partidas nas proximas semanas, voce nao precisa esperar meses para aproveitar suas merecidas ferias."
              : "Looking to get away sooner rather than later? Take advantage of our last-minute deals and enjoy an incredible trip at an exceptional price. With departures in the coming weeks, you don't have to wait months to enjoy your well-deserved vacation."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Hasta 60% de descuento" : language === "pt" ? "Ate 60% de desconto" : "Up to 60% off"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Vuelos incluidos" : language === "pt" ? "Voos incluidos" : "Flights included"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Hoteles 4-5 estrellas" : language === "pt" ? "Hoteis 4-5 estrelas" : "4-5 star hotels"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Guias expertos" : language === "pt" ? "Guias especializados" : "Expert guides"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-lastminute-intro">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-foreground">
              <span className="text-accent">{language === "es" ? "Paquetes de Vacaciones de Ultima Hora" : language === "pt" ? "Pacotes de Ferias de Ultima Hora" : "Last-Minute Vacation Packages"}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === "es" 
                ? "Ya sea que busques un escape todo incluido, un safari espontaneo o un tour cultural de ultima hora, explora nuestra seleccion de viajes con fechas de salida en las proximas semanas. Encuentra las mejores ofertas de ultima hora y comienza la cuenta regresiva hacia tu viaje sonado." 
                : language === "pt"
                ? "Seja voce procurando uma escapada com tudo incluido, um safari espontaneo ou um tour cultural de ultima hora, explore nossa selecao de viagens com datas de partida nas proximas semanas. Encontre as melhores ofertas de ultima hora e comece a contagem regressiva para sua viagem dos sonhos."
                : "Whether you're looking for an all-inclusive escape, a spontaneous safari, or a last-minute cultural tour, explore our selection of trips with departure dates in the coming weeks. Find the best last-minute deals and start counting down to your dream trip."}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20" data-testid="section-lastminute-grid">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LAST_MINUTE_OFFERS.map((offer, index) => (
              <Link key={offer.id} href={`${langPrefix}/destinations/${offer.slug}`}>
                <Card className="group overflow-visible cursor-pointer hover-elevate h-full" data-testid={`card-offer-${offer.id}`}>
                  <div className="relative h-56 overflow-hidden rounded-t-lg">
                    <img 
                      src={offer.image} 
                      alt={offer.title[dataLang]} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                    
                    {offer.badge && (
                      <Badge className="absolute top-3 left-3 bg-accent text-primary font-semibold">
                        {offer.badge[lang] || offer.badge[dataLang]}
                      </Badge>
                    )}
                    
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                      <Percent className="w-3 h-3" />
                      {offer.discount}% OFF
                    </div>
                    
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-lg font-display font-bold text-accent leading-tight">{offer.title[dataLang]}</h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{offer.country[dataLang]}</span>
                        <span className="mx-1">|</span>
                        <Clock className="w-3 h-3" />
                        <span>{offer.days} {language === "es" ? "dias" : language === "pt" ? "dias" : "days"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {offer.highlights.slice(0, 4).map((h, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{h}</Badge>
                      ))}
                      {offer.highlights.length > 4 && (
                        <Badge variant="outline" className="text-xs">+{offer.highlights.length - 4}</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{language === "es" ? "Proximas salidas:" : language === "pt" ? "Proximas partidas:" : "Next departures:"}</span>
                      <span className="font-medium text-foreground">
                        {offer.departureDates.slice(0, 2).map(d => formatDate(d)).join(", ")}
                      </span>
                    </div>
                    
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">{language === "es" ? "Desde" : language === "pt" ? "A partir de" : "From"}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-accent">${offer.salePrice.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground line-through">${offer.originalPrice.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">USD {language === "es" ? "por persona" : language === "pt" ? "por pessoa" : "per person"}</p>
                      </div>
                      <Button size="sm" data-testid={`button-offer-${offer.id}`}>
                        {language === "es" ? "Ver oferta" : language === "pt" ? "Ver oferta" : "View deal"}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50" data-testid="section-lastminute-benefits">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-center">
              <span className="text-accent">{language === "es" ? "Ofertas de Viaje de Ultima Hora" : language === "pt" ? "Ofertas de Viagem de Ultima Hora" : "Last-Minute Travel Deals"}</span>
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                {language === "es" 
                  ? "Nuestras ofertas de ultima hora te permiten volver a las cosas que amas, ya sea sumergirte en nuevas culturas, perderte en la naturaleza o simplemente sentir el calor de la arena bajo tus pies." 
                  : language === "pt"
                  ? "Nossas ofertas de ultima hora permitem que voce volte as coisas que ama, seja mergulhar em novas culturas, se perder na natureza ou simplesmente sentir o calor da areia sob seus pes."
                  : "Our last-minute travel deals help you get back to the things you love, whether that's immersing yourself in new cultures, losing yourself in nature, or simply feeling the warmth of sun-baked sand beneath your feet."}
              </p>
              <p>
                {language === "es" 
                  ? "Con nuestras ofertas de ultima hora, puedes llevar a tus seres queridos a unas vacaciones espontaneas, o disfrutar de un tiempo para ti en un viaje en solitario de ultimo momento. Cuando se trata de unas vacaciones de ultima hora, querras saber que todos los detalles estan cubiertos. Con nuestras ofertas, todo lo que tienes que hacer es empacar tu maleta y dirigirte al aeropuerto." 
                  : language === "pt"
                  ? "Com nossas ofertas de ultima hora, voce pode levar seus entes queridos para ferias espontaneas ou aproveitar um tempo para voce em uma viagem solo de ultimo momento. Quando se trata de ferias de ultima hora, voce vai querer saber que todos os detalhes estao cobertos. Com nossas ofertas, tudo o que voce precisa fazer e arrumar sua mala e ir para o aeroporto!"
                  : "With our last-minute travel deals, you can whisk your loved ones away on a spontaneous vacation, or enjoy a little 'me time' on a spur-of-the-moment solo trip. When it comes to taking a last-minute vacation, you'll want to know all the details are taken care of. With our deals, all you have to do is pack your suitcase and head to the airport!"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-lastminute-newsletter">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              {language === "es" ? "Suscribete y Unete a TripsEuropa GO" : language === "pt" ? "Inscreva-se e Junte-se ao TripsEuropa GO" : "Subscribe and Join TripsEuropa GO"}
            </h2>
            <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>{language === "es" ? "Las mejores ofertas" : language === "pt" ? "As melhores ofertas" : "The best travel deals"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>{language === "es" ? "Promociones exclusivas" : language === "pt" ? "Promocoes exclusivas" : "Exclusive promotions"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>{language === "es" ? "Tips de viaje de expertos" : language === "pt" ? "Dicas de viagem de especialistas" : "Expert travel tips"}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder={language === "es" ? "Ingresa tu email" : language === "pt" ? "Digite seu email" : "Enter your email"}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                data-testid="input-newsletter-email"
              />
              <Button 
                className="bg-accent text-primary hover:bg-accent/90 whitespace-nowrap" 
                data-testid="button-newsletter-subscribe"
                onClick={handleNewsletterSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (language === "es" ? "Suscribirme" : language === "pt" ? "Inscrever-me" : "Subscribe")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-accent/10" data-testid="section-lastminute-guarantee">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <Tag className="w-10 h-10 text-accent" />
              <div>
                <h3 className="font-display font-bold text-lg">
                  {language === "es" ? "Mejor Precio Garantizado" : language === "pt" ? "Melhor Preco Garantido" : "Best Price Guaranteed"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" 
                    ? "Si encuentras una mejor oferta, la igualamos. Reserva con confianza." 
                    : language === "pt"
                    ? "Se voce encontrar uma oferta melhor, igualamos. Reserve com confianca."
                    : "If you find a better deal, we'll match it. Book with confidence."}
                </p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border" />
            <a href="tel:+34611105448" className="flex items-center gap-3">
              <Phone className="w-10 h-10 text-accent" />
              <div>
                <h3 className="font-display font-bold text-lg">
                  {language === "es" ? "Reserva por Telefono" : language === "pt" ? "Reserve por Telefone" : "Book by Phone"}
                </h3>
                <p className="text-sm text-accent font-semibold">+34 611 105 448</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <SupportFAQSection faqs={LAST_MINUTE_FAQS} />
      <SupportContactSection />
      <FloatingContactButtons />

      <Footer />
    </div>
  );
}
