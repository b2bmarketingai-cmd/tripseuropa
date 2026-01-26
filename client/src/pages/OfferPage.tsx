import { useParams, useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, Clock, Calendar, Percent, Sparkles, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

const offers: Record<string, { 
  title: { es: string; en: string; pt: string };
  description: { es: string; en: string; pt: string };
  image: string;
  discount: string;
  validUntil: string;
  terms: { es: string[]; en: string[]; pt: string[] };
  featured: { es: string[]; en: string[]; pt: string[] };
}> = {
  "black-friday": {
    title: { es: "Black Friday Europa", en: "Black Friday Europe", pt: "Black Friday Europa" },
    description: { 
      es: "Las mejores ofertas del ano para viajar a Europa con descuentos increibles",
      en: "The best deals of the year to travel to Europe with incredible discounts",
      pt: "As melhores ofertas do ano para viajar para a Europa com descontos incriveis"
    },
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&q=60",
    discount: "50%",
    validUntil: "2026-11-30",
    terms: {
      es: ["Valido para reservas hasta el 30 de noviembre", "Viajes entre enero y abril 2027", "Sujeto a disponibilidad"],
      en: ["Valid for bookings until November 30", "Travel between January and April 2027", "Subject to availability"],
      pt: ["Valido para reservas ate 30 de novembro", "Viagens entre janeiro e abril de 2027", "Sujeito a disponibilidade"]
    },
    featured: {
      es: ["Paris desde $899", "Roma desde $799", "Londres desde $999", "Barcelona desde $749"],
      en: ["Paris from $899", "Rome from $799", "London from $999", "Barcelona from $749"],
      pt: ["Paris a partir de $899", "Roma a partir de $799", "Londres a partir de $999", "Barcelona a partir de $749"]
    }
  },
  "cyber-monday": {
    title: { es: "Cyber Monday Viajes", en: "Cyber Monday Travel", pt: "Cyber Monday Viagens" },
    description: { 
      es: "Descuentos exclusivos online para tu proximo viaje a Europa",
      en: "Exclusive online discounts for your next trip to Europe",
      pt: "Descontos exclusivos online para sua proxima viagem a Europa"
    },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=60",
    discount: "45%",
    validUntil: "2026-12-02",
    terms: {
      es: ["Solo reservas online", "Codigo: CYBER2026", "No acumulable con otras ofertas"],
      en: ["Online bookings only", "Code: CYBER2026", "Cannot be combined with other offers"],
      pt: ["Apenas reservas online", "Codigo: CYBER2026", "Nao acumulavel com outras ofertas"]
    },
    featured: {
      es: ["Paquete Europa 10 dias -45%", "Vuelos directos -40%", "Hoteles 4 estrellas -35%"],
      en: ["Europe 10 days package -45%", "Direct flights -40%", "4-star hotels -35%"],
      pt: ["Pacote Europa 10 dias -45%", "Voos diretos -40%", "Hoteis 4 estrelas -35%"]
    }
  },
  "ofertas-invierno": {
    title: { es: "Ofertas de Invierno", en: "Winter Deals", pt: "Ofertas de Inverno" },
    description: { 
      es: "Viaja a Europa en invierno y disfruta de precios especiales y menos turistas",
      en: "Travel to Europe in winter and enjoy special prices and fewer tourists",
      pt: "Viaje para a Europa no inverno e aproveite precos especiais e menos turistas"
    },
    image: "https://images.unsplash.com/photo-1548777123-e216912df7d8?w=1200&q=60",
    discount: "30%",
    validUntil: "2026-02-28",
    terms: {
      es: ["Viajes entre diciembre y febrero", "Minimo 5 noches", "Incluye seguro de viaje"],
      en: ["Travel between December and February", "Minimum 5 nights", "Includes travel insurance"],
      pt: ["Viagens entre dezembro e fevereiro", "Minimo 5 noites", "Inclui seguro viagem"]
    },
    featured: {
      es: ["Mercados navidenos -30%", "Esqui en Alpes -25%", "Ciudades iluminadas -20%"],
      en: ["Christmas markets -30%", "Alps skiing -25%", "Illuminated cities -20%"],
      pt: ["Mercados de Natal -30%", "Esqui nos Alpes -25%", "Cidades iluminadas -20%"]
    }
  },
  "ofertas-ultima-hora": {
    title: { es: "Ofertas de Ultima Hora", en: "Last Minute Deals", pt: "Ofertas de Ultima Hora" },
    description: { 
      es: "Viaja ya con descuentos flash en salidas inmediatas",
      en: "Travel now with flash discounts on immediate departures",
      pt: "Viaje agora com descontos relampago em partidas imediatas"
    },
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=60",
    discount: "40%",
    validUntil: "Proximos 30 dias",
    terms: {
      es: ["Salidas en los proximos 30 dias", "Lugares limitados", "Pago inmediato requerido"],
      en: ["Departures within next 30 days", "Limited spots", "Immediate payment required"],
      pt: ["Partidas nos proximos 30 dias", "Lugares limitados", "Pagamento imediato necessario"]
    },
    featured: {
      es: ["Vuelo + Hotel Paris 5 noches $699", "Roma escapada 4 dias $549", "Barcelona fin de semana $399"],
      en: ["Flight + Hotel Paris 5 nights $699", "Rome getaway 4 days $549", "Barcelona weekend $399"],
      pt: ["Voo + Hotel Paris 5 noites $699", "Roma escapada 4 dias $549", "Barcelona fim de semana $399"]
    }
  },
  "ofertas-verano": {
    title: { es: "Ofertas de Verano", en: "Summer Deals", pt: "Ofertas de Verao" },
    description: { 
      es: "Disfruta del verano europeo con las mejores ofertas de temporada",
      en: "Enjoy the European summer with the best seasonal deals",
      pt: "Desfrute do verao europeu com as melhores ofertas da temporada"
    },
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60",
    discount: "35%",
    validUntil: "2026-08-31",
    terms: {
      es: ["Reserva anticipada requerida", "Viajes entre junio y agosto", "Cancelacion flexible"],
      en: ["Early booking required", "Travel between June and August", "Flexible cancellation"],
      pt: ["Reserva antecipada necessaria", "Viagens entre junho e agosto", "Cancelamento flexivel"]
    },
    featured: {
      es: ["Islas griegas -35%", "Costa Amalfitana -30%", "Ibiza y Mallorca -25%", "Croacia costera -30%"],
      en: ["Greek islands -35%", "Amalfi Coast -30%", "Ibiza and Mallorca -25%", "Croatian coast -30%"],
      pt: ["Ilhas gregas -35%", "Costa Amalfitana -30%", "Ibiza e Mallorca -25%", "Costa croata -30%"]
    }
  },
  "promociones-especiales": {
    title: { es: "Promociones Especiales", en: "Special Promotions", pt: "Promocoes Especiais" },
    description: { 
      es: "Ofertas exclusivas para miembros y clientes frecuentes",
      en: "Exclusive offers for members and frequent customers",
      pt: "Ofertas exclusivas para membros e clientes frequentes"
    },
    image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200&q=60",
    discount: "25%",
    validUntil: "Permanente",
    terms: {
      es: ["Exclusivo para miembros registrados", "Acumulable con puntos de recompensa", "Valido todo el ano"],
      en: ["Exclusive for registered members", "Combinable with reward points", "Valid all year"],
      pt: ["Exclusivo para membros registrados", "Acumulavel com pontos de recompensa", "Valido todo o ano"]
    },
    featured: {
      es: ["Cumpleanos: 15% extra", "Aniversario: upgrade gratis", "Referidos: $50 credito", "Repetidor: 10% fidelidad"],
      en: ["Birthday: 15% extra", "Anniversary: free upgrade", "Referrals: $50 credit", "Repeat customer: 10% loyalty"],
      pt: ["Aniversario: 15% extra", "Data comemorativa: upgrade gratis", "Indicacoes: $50 credito", "Cliente fiel: 10% fidelidade"]
    }
  }
};

export default function OfferPage() {
  const params = useParams<{ slug: string }>();
  const [location] = useLocation();
  const { language } = useI18n();
  
  const slug = params.slug || "";
  const offer = offers[slug];
  
  const getLang = (): "es" | "en" | "pt" => {
    if (location.includes("/pt-br") || location.includes("/pt/")) return "pt";
    if (location.includes("/en-") || location.includes("/en/")) return "en";
    return language as "es" | "en" | "pt";
  };
  
  const lang = getLang();

  if (!offer) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {lang === "es" ? "Oferta no encontrada" : lang === "en" ? "Offer not found" : "Oferta nao encontrada"}
            </h1>
            <Link href="/ofertas-ultima-hora">
              <Button>{lang === "es" ? "Ver todas las ofertas" : lang === "en" ? "View all offers" : "Ver todas as ofertas"}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-offer">
      <Header />
      
      <main className="flex-1">
        <section 
          className="relative h-[50vh] min-h-[400px] bg-cover bg-center"
          style={{ backgroundImage: `url(${offer.image})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="text-white max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-accent text-primary px-4 py-2 rounded-full mb-4">
                <Percent className="w-5 h-5" />
                <span className="font-bold text-xl">Hasta {offer.discount} OFF</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="text-offer-title">
                {offer.title[lang]}
              </h1>
              <p className="text-xl opacity-90">{offer.description[lang]}</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-accent" />
                  {lang === "es" ? "Ofertas Destacadas" : lang === "en" ? "Featured Deals" : "Ofertas em Destaque"}
                </h2>
                <div className="space-y-4 mb-8">
                  {offer.featured[lang].map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <Tag className="w-5 h-5 text-accent" />
                        <span className="font-medium">{item}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-muted-foreground" />
                  {lang === "es" ? "Terminos y Condiciones" : lang === "en" ? "Terms and Conditions" : "Termos e Condicoes"}
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  {offer.terms[lang].map((term, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Card className="sticky top-24">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <p className="text-sm text-muted-foreground mb-2">
                        {lang === "es" ? "Descuento de hasta" : lang === "en" ? "Discount up to" : "Desconto de ate"}
                      </p>
                      <p className="text-6xl font-bold text-accent">{offer.discount}</p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
                      <Calendar className="w-5 h-5" />
                      <span>
                        {lang === "es" ? "Valido hasta: " : lang === "en" ? "Valid until: " : "Valido ate: "}
                        {offer.validUntil}
                      </span>
                    </div>

                    <Link href="/contact">
                      <Button className="w-full" size="lg" data-testid="button-claim-offer">
                        {lang === "es" ? "Aprovechar oferta" : lang === "en" ? "Claim offer" : "Aproveitar oferta"}
                      </Button>
                    </Link>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      {lang === "es" ? "Cupos limitados. Reserva ahora para garantizar tu descuento." 
                        : lang === "en" ? "Limited spots. Book now to guarantee your discount."
                        : "Vagas limitadas. Reserve agora para garantir seu desconto."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButtons />
    </div>
  );
}
