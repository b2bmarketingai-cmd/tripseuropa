import { useParams, useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FloatingContactButtons } from "@/components/support";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Star, Users, Plane, Hotel, Bus } from "lucide-react";
import { Link } from "wouter";

const packages: Record<string, { 
  title: { es: string; en: string; pt: string };
  description: { es: string; en: string; pt: string };
  image: string;
  days: number;
  price: number;
  destinations: string[];
  includes: { es: string[]; en: string[]; pt: string[] };
}> = {
  "capitales-europeas": {
    title: { es: "Capitales Europeas", en: "European Capitals", pt: "Capitais Europeias" },
    description: { 
      es: "Visita las capitales mas emblematicas de Europa en un solo viaje inolvidable",
      en: "Visit Europe's most iconic capitals in one unforgettable trip",
      pt: "Visite as capitais mais emblematicas da Europa em uma viagem inesquecivel"
    },
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=60",
    days: 12,
    price: 2800,
    destinations: ["Paris", "Londres", "Amsterdam", "Berlin"],
    includes: {
      es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Traslados", "Desayunos diarios", "Guia en espanol"],
      en: ["International flights", "4-star hotels", "Transfers", "Daily breakfast", "English guide"],
      pt: ["Voos internacionais", "Hoteis 4 estrelas", "Traslados", "Cafe da manha diario", "Guia em portugues"]
    }
  },
  "europa-10-dias": {
    title: { es: "Europa en 10 Dias", en: "Europe in 10 Days", pt: "Europa em 10 Dias" },
    description: { 
      es: "Un recorrido express por lo mejor de Europa occidental",
      en: "An express tour through the best of Western Europe",
      pt: "Um passeio expresso pelo melhor da Europa Ocidental"
    },
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=60",
    days: 10,
    price: 2200,
    destinations: ["Roma", "Florencia", "Venecia", "Paris"],
    includes: {
      es: ["Vuelos", "Hoteles 3-4 estrellas", "Tren de alta velocidad", "Desayunos"],
      en: ["Flights", "3-4 star hotels", "High-speed train", "Breakfast"],
      pt: ["Voos", "Hoteis 3-4 estrelas", "Trem de alta velocidade", "Cafe da manha"]
    }
  },
  "europa-15-dias": {
    title: { es: "Europa en 15 Dias", en: "Europe in 15 Days", pt: "Europa em 15 Dias" },
    description: { 
      es: "El viaje mas completo para conocer Europa a fondo",
      en: "The most complete trip to know Europe in depth",
      pt: "A viagem mais completa para conhecer a Europa a fundo"
    },
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=60",
    days: 15,
    price: 3200,
    destinations: ["Madrid", "Barcelona", "Paris", "Amsterdam", "Berlin", "Praga", "Viena"],
    includes: {
      es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Transporte terrestre", "Desayunos y algunas cenas"],
      en: ["International flights", "4-star hotels", "Ground transportation", "Breakfast and some dinners"],
      pt: ["Voos internacionais", "Hoteis 4 estrelas", "Transporte terrestre", "Cafe da manha e alguns jantares"]
    }
  },
  "europa-21-dias": {
    title: { es: "Gran Tour Europa 21 Dias", en: "Grand Tour Europe 21 Days", pt: "Grande Tour Europa 21 Dias" },
    description: { 
      es: "La experiencia europea definitiva con todos los destinos imprescindibles",
      en: "The ultimate European experience with all must-see destinations",
      pt: "A experiencia europeia definitiva com todos os destinos imprescindiveis"
    },
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=60",
    days: 21,
    price: 4200,
    destinations: ["Londres", "Paris", "Brujas", "Amsterdam", "Berlin", "Praga", "Viena", "Venecia", "Roma"],
    includes: {
      es: ["Vuelos premium", "Hoteles 4-5 estrellas", "Todos los traslados", "Desayunos y cenas selectas", "Excursiones guiadas"],
      en: ["Premium flights", "4-5 star hotels", "All transfers", "Breakfast and select dinners", "Guided excursions"],
      pt: ["Voos premium", "Hoteis 4-5 estrelas", "Todos os traslados", "Cafe da manha e jantares selecionados", "Excursoes guiadas"]
    }
  },
  "europa-7-dias": {
    title: { es: "Europa Express 7 Dias", en: "Europe Express 7 Days", pt: "Europa Express 7 Dias" },
    description: { 
      es: "Lo mejor de Europa en una semana perfecta",
      en: "The best of Europe in one perfect week",
      pt: "O melhor da Europa em uma semana perfeita"
    },
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=60",
    days: 7,
    price: 1800,
    destinations: ["Paris", "Londres"],
    includes: {
      es: ["Vuelos", "Hoteles centricos", "Eurostar", "Desayunos"],
      en: ["Flights", "Central hotels", "Eurostar", "Breakfast"],
      pt: ["Voos", "Hoteis centrais", "Eurostar", "Cafe da manha"]
    }
  },
  "europa-clasica": {
    title: { es: "Europa Clasica", en: "Classic Europe", pt: "Europa Classica" },
    description: { 
      es: "Los destinos clasicos europeos que no puedes perderte",
      en: "The classic European destinations you can't miss",
      pt: "Os destinos classicos europeus que voce nao pode perder"
    },
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&q=60",
    days: 12,
    price: 2500,
    destinations: ["Roma", "Paris", "Londres"],
    includes: {
      es: ["Vuelos", "Hoteles 4 estrellas", "Tours guiados", "Desayunos"],
      en: ["Flights", "4-star hotels", "Guided tours", "Breakfast"],
      pt: ["Voos", "Hoteis 4 estrelas", "Tours guiados", "Cafe da manha"]
    }
  },
  "europa-express": {
    title: { es: "Europa Express", en: "Europe Express", pt: "Europa Express" },
    description: { 
      es: "Un tour rapido por las principales ciudades europeas",
      en: "A quick tour through Europe's main cities",
      pt: "Um tour rapido pelas principais cidades europeias"
    },
    image: "https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?w=1200&q=60",
    days: 8,
    price: 2000,
    destinations: ["Paris", "Amsterdam", "Brujas"],
    includes: {
      es: ["Vuelos", "Hoteles 3 estrellas", "Tren", "Desayunos"],
      en: ["Flights", "3-star hotels", "Train", "Breakfast"],
      pt: ["Voos", "Hoteis 3 estrelas", "Trem", "Cafe da manha"]
    }
  },
  "europa-oriental": {
    title: { es: "Europa Oriental", en: "Eastern Europe", pt: "Europa Oriental" },
    description: { 
      es: "Descubre la magia de Europa del Este con sus castillos y ciudades medievales",
      en: "Discover the magic of Eastern Europe with its castles and medieval cities",
      pt: "Descubra a magia da Europa Oriental com seus castelos e cidades medievais"
    },
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=60",
    days: 14,
    price: 2600,
    destinations: ["Praga", "Budapest", "Viena", "Cracovia"],
    includes: {
      es: ["Vuelos", "Hoteles 4 estrellas", "Tours guiados", "Desayunos", "Crucero por el Danubio"],
      en: ["Flights", "4-star hotels", "Guided tours", "Breakfast", "Danube cruise"],
      pt: ["Voos", "Hoteis 4 estrelas", "Tours guiados", "Cafe da manha", "Cruzeiro pelo Danubio"]
    }
  },
  "familia-europa": {
    title: { es: "Europa en Familia", en: "Family Europe", pt: "Europa em Familia" },
    description: { 
      es: "Viaje disenado para familias con actividades para todas las edades",
      en: "Trip designed for families with activities for all ages",
      pt: "Viagem projetada para familias com atividades para todas as idades"
    },
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1200&q=60",
    days: 12,
    price: 3500,
    destinations: ["Paris", "Londres", "Amsterdam"],
    includes: {
      es: ["Vuelos", "Hoteles familiares", "Entradas a parques", "Tours infantiles", "Desayunos"],
      en: ["Flights", "Family hotels", "Park tickets", "Kid-friendly tours", "Breakfast"],
      pt: ["Voos", "Hoteis familiares", "Entradas para parques", "Tours infantis", "Cafe da manha"]
    }
  },
  "luna-de-miel": {
    title: { es: "Luna de Miel en Europa", en: "Honeymoon in Europe", pt: "Lua de Mel na Europa" },
    description: { 
      es: "Romance en los destinos mas bellos y romanticos de Europa",
      en: "Romance in Europe's most beautiful and romantic destinations",
      pt: "Romance nos destinos mais belos e romanticos da Europa"
    },
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=1200&q=60",
    days: 10,
    price: 4000,
    destinations: ["Venecia", "Santorini", "Paris"],
    includes: {
      es: ["Vuelos premium", "Hoteles boutique 5 estrellas", "Cenas romanticas", "Tours privados", "Champagne de bienvenida"],
      en: ["Premium flights", "5-star boutique hotels", "Romantic dinners", "Private tours", "Welcome champagne"],
      pt: ["Voos premium", "Hoteis boutique 5 estrelas", "Jantares romanticos", "Tours privados", "Champagne de boas-vindas"]
    }
  },
  "norte-europa": {
    title: { es: "Norte de Europa", en: "Northern Europe", pt: "Norte da Europa" },
    description: { 
      es: "Explora Escandinavia y los paises nordicos con sus paisajes unicos",
      en: "Explore Scandinavia and Nordic countries with their unique landscapes",
      pt: "Explore a Escandinavia e os paises nordicos com suas paisagens unicas"
    },
    image: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=1200&q=60",
    days: 14,
    price: 3800,
    destinations: ["Copenhague", "Estocolmo", "Oslo", "Helsinki"],
    includes: {
      es: ["Vuelos", "Hoteles 4 estrellas", "Crucero por fiordos", "Desayunos", "Tour auroras boreales"],
      en: ["Flights", "4-star hotels", "Fjord cruise", "Breakfast", "Northern lights tour"],
      pt: ["Voos", "Hoteis 4 estrelas", "Cruzeiro pelos fiordes", "Cafe da manha", "Tour auroras boreais"]
    }
  },
  "tour-mediterraeo": {
    title: { es: "Tour Mediterraneo", en: "Mediterranean Tour", pt: "Tour Mediterraneo" },
    description: { 
      es: "Recorre la costa mediterranea con sus playas y gastronomia",
      en: "Travel the Mediterranean coast with its beaches and gastronomy",
      pt: "Percorra a costa mediterranea com suas praias e gastronomia"
    },
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1200&q=60",
    days: 12,
    price: 3000,
    destinations: ["Barcelona", "Niza", "Costa Amalfitana", "Santorini"],
    includes: {
      es: ["Vuelos", "Hoteles frente al mar", "Ferry entre islas", "Desayunos", "Excursiones en barco"],
      en: ["Flights", "Seafront hotels", "Island ferry", "Breakfast", "Boat excursions"],
      pt: ["Voos", "Hoteis a beira-mar", "Ferry entre ilhas", "Cafe da manha", "Excursoes de barco"]
    }
  }
};

export default function PackagePage() {
  const params = useParams<{ slug: string }>();
  const [location] = useLocation();
  const { language } = useI18n();
  
  const slug = params.slug || "";
  const pkg = packages[slug];
  
  const getLang = (): "es" | "en" | "pt" => {
    if (location.includes("/pt-br") || location.includes("/pt/")) return "pt";
    if (location.includes("/en-") || location.includes("/en/")) return "en";
    return language as "es" | "en" | "pt";
  };
  
  const lang = getLang();

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {lang === "es" ? "Paquete no encontrado" : lang === "en" ? "Package not found" : "Pacote nao encontrado"}
            </h1>
            <Link href="/packages">
              <Button>{lang === "es" ? "Ver todos los paquetes" : lang === "en" ? "View all packages" : "Ver todos os pacotes"}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-package">
      <Header />
      <Breadcrumbs
        items={[
          {
            label: lang === "es" ? "Paquetes" : lang === "en" ? "Packages" : "Pacotes",
            href: "/packages"
          },
          {
            label: pkg.title[lang],
            href: `/package/${packageSlug}`
          }
        ]}
      />

      <main className="flex-1">
        <section 
          className="relative h-[50vh] min-h-[400px] bg-cover bg-center"
          style={{ backgroundImage: `url(${pkg.image})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="text-package-title">
                {pkg.title[lang]}
              </h1>
              <p className="text-xl opacity-90">{pkg.description[lang]}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5" />
                  <span>{pkg.days} {lang === "es" ? "dias" : lang === "en" ? "days" : "dias"}</span>
                </div>
                <div className="flex items-center gap-2 bg-accent/90 px-4 py-2 rounded-full text-primary">
                  <span className="font-bold">${pkg.price.toLocaleString()} USD</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  {lang === "es" ? "Destinos" : lang === "en" ? "Destinations" : "Destinos"}
                </h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  {pkg.destinations.map((dest, index) => (
                    <span key={index} className="px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">
                      {dest}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  {lang === "es" ? "Incluye" : lang === "en" ? "Includes" : "Inclui"}
                </h2>
                <div className="space-y-3">
                  {pkg.includes[lang].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {index === 0 && <Plane className="w-5 h-5 text-accent" />}
                      {index === 1 && <Hotel className="w-5 h-5 text-accent" />}
                      {index === 2 && <Bus className="w-5 h-5 text-accent" />}
                      {index > 2 && <Star className="w-5 h-5 text-accent" />}
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Card className="sticky top-24">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <p className="text-sm text-muted-foreground mb-2">
                        {lang === "es" ? "Precio por persona desde" : lang === "en" ? "Price per person from" : "Preco por pessoa a partir de"}
                      </p>
                      <p className="text-4xl font-bold text-primary">${pkg.price.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">USD</p>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between py-2 border-b">
                        <span>{lang === "es" ? "Duracion" : lang === "en" ? "Duration" : "Duracao"}</span>
                        <span className="font-bold">{pkg.days} {lang === "es" ? "dias" : lang === "en" ? "days" : "dias"}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>{lang === "es" ? "Destinos" : lang === "en" ? "Destinations" : "Destinos"}</span>
                        <span className="font-bold">{pkg.destinations.length}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>{lang === "es" ? "Valoracion" : lang === "en" ? "Rating" : "Avaliacao"}</span>
                        <span className="font-bold flex items-center gap-1">
                          <Star className="w-4 h-4 text-accent fill-accent" /> 4.8
                        </span>
                      </div>
                    </div>

                    <Link href="/contact">
                      <Button className="w-full" size="lg" data-testid="button-reserve">
                        {lang === "es" ? "Reservar ahora" : lang === "en" ? "Book now" : "Reservar agora"}
                      </Button>
                    </Link>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      {lang === "es" ? "Sin compromiso. Te contactaremos para confirmar disponibilidad." 
                        : lang === "en" ? "No commitment. We'll contact you to confirm availability."
                        : "Sem compromisso. Entraremos em contato para confirmar disponibilidade."}
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
