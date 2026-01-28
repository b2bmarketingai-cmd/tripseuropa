import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { FloatingContactButtons, SupportFAQSection, SupportContactSection } from "@/components/support";

const DESTINATIONS = [
  {
    slug: "france",
    name: { es: "Francia", en: "France" },
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=70&w=800&auto=format&fit=crop",
    price: "1,899",
    days: 8,
    highlights: { es: ["Paris", "Valle del Loira", "Costa Azul"], en: ["Paris", "Loire Valley", "French Riviera"] }
  },
  {
    slug: "italy",
    name: { es: "Italia", en: "Italy" },
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=70&w=800&auto=format&fit=crop",
    price: "1,799",
    days: 10,
    highlights: { es: ["Roma", "Florencia", "Venecia"], en: ["Rome", "Florence", "Venice"] }
  },
  {
    slug: "spain",
    name: { es: "España", en: "Spain" },
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=70&w=800&auto=format&fit=crop",
    price: "1,799",
    days: 10,
    highlights: { es: ["Madrid", "Barcelona", "Sevilla"], en: ["Madrid", "Barcelona", "Seville"] }
  },
  {
    slug: "germany",
    name: { es: "Alemania", en: "Germany" },
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=70&w=800&auto=format&fit=crop",
    price: "1,899",
    days: 8,
    highlights: { es: ["Berlin", "Munich", "Valle del Rin"], en: ["Berlin", "Munich", "Rhine Valley"] }
  },
  {
    slug: "portugal",
    name: { es: "Portugal", en: "Portugal" },
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=70&w=800&auto=format&fit=crop",
    price: "1,599",
    days: 8,
    highlights: { es: ["Lisboa", "Porto", "Algarve"], en: ["Lisbon", "Porto", "Algarve"] }
  },
  {
    slug: "greece",
    name: { es: "Grecia", en: "Greece" },
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=70&w=800&auto=format&fit=crop",
    price: "1,799",
    days: 8,
    highlights: { es: ["Atenas", "Santorini", "Mykonos"], en: ["Athens", "Santorini", "Mykonos"] }
  },
  {
    slug: "netherlands",
    name: { es: "Paises Bajos", en: "Netherlands" },
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=70&w=800&auto=format&fit=crop",
    price: "1,699",
    days: 6,
    highlights: { es: ["Amsterdam", "Tulipanes", "Molinos"], en: ["Amsterdam", "Tulips", "Windmills"] }
  },
  {
    slug: "switzerland",
    name: { es: "Suiza", en: "Switzerland" },
    image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=70&w=800&auto=format&fit=crop",
    price: "2,299",
    days: 7,
    highlights: { es: ["Alpes", "Zurich", "Lucerna"], en: ["Alps", "Zurich", "Lucerne"] }
  },
  {
    slug: "croatia",
    name: { es: "Croacia", en: "Croatia" },
    image: "https://images.unsplash.com/photo-1555990793-da11153b2473?q=70&w=800&auto=format&fit=crop",
    price: "1,699",
    days: 8,
    highlights: { es: ["Dubrovnik", "Split", "Plitvice"], en: ["Dubrovnik", "Split", "Plitvice"] }
  },
  {
    slug: "united-kingdom",
    name: { es: "Reino Unido", en: "United Kingdom" },
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=70&w=800&auto=format&fit=crop",
    price: "1,499",
    days: 10,
    highlights: { es: ["Londres", "Escocia", "Stonehenge"], en: ["London", "Scotland", "Stonehenge"] }
  },
  {
    slug: "albania",
    name: { es: "Albania", en: "Albania" },
    image: "https://images.unsplash.com/photo-1580402427914-a3c37a185e6b?q=70&w=800&auto=format&fit=crop",
    price: "1,299",
    days: 7,
    highlights: { es: ["Tirana", "Riviera", "Berat"], en: ["Tirana", "Riviera", "Berat"] }
  },
  {
    slug: "austria",
    name: { es: "Austria", en: "Austria" },
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=70&w=800&auto=format&fit=crop",
    price: "1,799",
    days: 7,
    highlights: { es: ["Viena", "Salzburgo", "Alpes"], en: ["Vienna", "Salzburg", "Alps"] }
  },
  {
    slug: "belgium",
    name: { es: "Belgica", en: "Belgium" },
    image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=70&w=800&auto=format&fit=crop",
    price: "1,599",
    days: 5,
    highlights: { es: ["Bruselas", "Brujas", "Gante"], en: ["Brussels", "Bruges", "Ghent"] }
  },
  {
    slug: "czech-republic",
    name: { es: "Republica Checa", en: "Czech Republic" },
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=70&w=800&auto=format&fit=crop",
    price: "1,499",
    days: 6,
    highlights: { es: ["Praga", "Cesky Krumlov", "Karlovy Vary"], en: ["Prague", "Cesky Krumlov", "Karlovy Vary"] }
  },
  {
    slug: "denmark",
    name: { es: "Dinamarca", en: "Denmark" },
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=70&w=800&auto=format&fit=crop",
    price: "1,799",
    days: 5,
    highlights: { es: ["Copenhague", "Nyhavn", "Tivoli"], en: ["Copenhagen", "Nyhavn", "Tivoli"] }
  },
  {
    slug: "finland",
    name: { es: "Finlandia", en: "Finland" },
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=70&w=800&auto=format&fit=crop",
    price: "2,099",
    days: 7,
    highlights: { es: ["Helsinki", "Laponia", "Aurora Boreal"], en: ["Helsinki", "Lapland", "Northern Lights"] }
  },
  {
    slug: "hungary",
    name: { es: "Hungria", en: "Hungary" },
    image: "https://images.unsplash.com/photo-1551867633-194f125bddfa?q=70&w=800&auto=format&fit=crop",
    price: "1,399",
    days: 5,
    highlights: { es: ["Budapest", "Balnearios", "Danubio"], en: ["Budapest", "Thermal Baths", "Danube"] }
  },
  {
    slug: "iceland",
    name: { es: "Islandia", en: "Iceland" },
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=70&w=800&auto=format&fit=crop",
    price: "2,499",
    days: 8,
    highlights: { es: ["Reykjavik", "Geysers", "Glaciares"], en: ["Reykjavik", "Geysers", "Glaciers"] }
  },
  {
    slug: "ireland",
    name: { es: "Irlanda", en: "Ireland" },
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=70&w=800&auto=format&fit=crop",
    price: "1,699",
    days: 7,
    highlights: { es: ["Dublin", "Acantilados Moher", "Ring of Kerry"], en: ["Dublin", "Cliffs of Moher", "Ring of Kerry"] }
  },
  {
    slug: "norway",
    name: { es: "Noruega", en: "Norway" },
    image: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?q=70&w=800&auto=format&fit=crop",
    price: "2,299",
    days: 8,
    highlights: { es: ["Fiordos", "Bergen", "Oslo"], en: ["Fjords", "Bergen", "Oslo"] }
  },
  {
    slug: "poland",
    name: { es: "Polonia", en: "Poland" },
    image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=70&w=800&auto=format&fit=crop",
    price: "1,399",
    days: 7,
    highlights: { es: ["Cracovia", "Varsovia", "Auschwitz"], en: ["Krakow", "Warsaw", "Auschwitz"] }
  },
  {
    slug: "romania",
    name: { es: "Rumania", en: "Romania" },
    image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=70&w=800&auto=format&fit=crop",
    price: "1,399",
    days: 7,
    highlights: { es: ["Transilvania", "Bucarest", "Castillo Bran"], en: ["Transylvania", "Bucharest", "Bran Castle"] }
  },
  {
    slug: "sweden",
    name: { es: "Suecia", en: "Sweden" },
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=70&w=800&auto=format&fit=crop",
    price: "1,899",
    days: 6,
    highlights: { es: ["Estocolmo", "Gotemburgo", "Laponia"], en: ["Stockholm", "Gothenburg", "Lapland"] }
  },
  {
    slug: "baltic-states",
    name: { es: "Estados Balticos", en: "Baltic States" },
    image: "https://images.unsplash.com/photo-1565711561500-49678a10a63f?q=70&w=800&auto=format&fit=crop",
    price: "1,599",
    days: 10,
    highlights: { es: ["Tallin", "Riga", "Vilna"], en: ["Tallinn", "Riga", "Vilnius"] }
  },
  {
    slug: "cyprus",
    name: { es: "Chipre", en: "Cyprus" },
    image: "https://images.unsplash.com/photo-1580752300992-559f8e56d98e?q=70&w=800&auto=format&fit=crop",
    price: "1,499",
    days: 7,
    highlights: { es: ["Paphos", "Limassol", "Nicosia"], en: ["Paphos", "Limassol", "Nicosia"] }
  },
  {
    slug: "scotland",
    name: { es: "Escocia", en: "Scotland" },
    image: "https://images.unsplash.com/photo-1506377585622-bedcbb5f0d5b?q=70&w=800&auto=format&fit=crop",
    price: "1,799",
    days: 8,
    highlights: { es: ["Edimburgo", "Highlands", "Lago Ness"], en: ["Edinburgh", "Highlands", "Loch Ness"] }
  }
];

export default function Destinations() {
  const { t, language } = useI18n();
  const langPrefix = language === "es" ? "" : language === "pt" ? "/pt-br" : `/${language}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-destinations-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=60&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-destinations">
            {language === "es" ? "Destinos Premium" : language === "pt" ? "Destinos Premium" : "Premium Destinations"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-destinations-title">
            {language === "es" ? "Explora Europa" : language === "pt" ? "Explore a Europa" : "Explore Europe"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto" data-testid="text-destinations-subtitle">
            {language === "es" 
              ? "Descubre los destinos mas exclusivos de Europa con nuestros paquetes personalizados" 
              : language === "pt"
              ? "Descubra os destinos mais exclusivos da Europa com nossos pacotes personalizados"
              : "Discover the most exclusive destinations in Europe with our personalized packages"}
          </p>
        </div>
      </section>

      <section className="py-20" data-testid="section-destinations-grid">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DESTINATIONS.map((dest) => {
              const dataLang = (language === "pt" ? "es" : language) as "es" | "en";
              return (
                <Link key={dest.slug} href={`${langPrefix}/destinations/${dest.slug}`}>
                  <Card className="group overflow-hidden cursor-pointer hover-elevate" data-testid={`card-destination-${dest.slug}`}>
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={dest.image} 
                        alt={dest.name[dataLang]} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-white/90 text-primary">
                        {dest.days} {language === "es" ? "dias" : language === "pt" ? "dias" : "days"}
                      </Badge>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-display font-bold text-accent">{dest.name[dataLang]}</h3>
                        <div className="flex items-center gap-1 text-white/80 text-sm">
                          <MapPin className="w-3 h-3" />
                          {language === "es" ? "Europa" : language === "pt" ? "Europa" : "Europe"}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {dest.highlights[dataLang].slice(0, 3).map((h, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{h}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">{language === "es" ? "Desde" : language === "pt" ? "A partir de" : "From"}</p>
                          <p className="text-lg font-bold text-accent">${dest.price} USD</p>
                        </div>
                        <Button size="sm" data-testid={`button-destination-${dest.slug}`}>
                          {language === "es" ? "Ver mas" : language === "pt" ? "Ver mais" : "View more"}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-destinations-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {language === "es" ? "¿No encuentras tu destino ideal?" : language === "pt" ? "Não encontra seu destino ideal?" : "Can't find your ideal destination?"}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {language === "es" 
              ? "Nuestros asesores pueden crear un viaje personalizado a cualquier destino europeo" 
              : language === "pt"
              ? "Nossos consultores podem criar uma viagem personalizada para qualquer destino europeu"
              : "Our advisors can create a personalized trip to any European destination"}
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90" data-testid="button-contact-advisor">
              {language === "es" ? "Hablar con un asesor" : language === "pt" ? "Falar com um consultor" : "Talk to an advisor"}
            </Button>
          </Link>
        </div>
      </section>

      <SupportFAQSection />
      <SupportContactSection />
      <FloatingContactButtons />

      <Footer />
    </div>
  );
}
