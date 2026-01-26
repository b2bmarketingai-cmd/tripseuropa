import { useParams, useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Star, Users, Sparkles } from "lucide-react";
import { Link } from "wouter";

const experiences: Record<string, { 
  title: { es: string; en: string; pt: string };
  description: { es: string; en: string; pt: string };
  image: string;
  highlights: { es: string[]; en: string[]; pt: string[] };
  duration: string;
  bestTime: { es: string; en: string; pt: string };
}> = {
  "ano-nuevo-europa": {
    title: { es: "Ano Nuevo en Europa", en: "New Year in Europe", pt: "Ano Novo na Europa" },
    description: { 
      es: "Celebra el ano nuevo en las ciudades mas emblematicas de Europa con fiestas inolvidables",
      en: "Celebrate the new year in Europe's most iconic cities with unforgettable parties",
      pt: "Celebre o ano novo nas cidades mais emblematicas da Europa com festas inesqueciveis"
    },
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1200&q=60",
    highlights: {
      es: ["Fuegos artificiales en Londres", "Fiesta en Berlin", "Celebracion en Paris", "Nochevieja en Barcelona"],
      en: ["Fireworks in London", "Party in Berlin", "Celebration in Paris", "New Year's Eve in Barcelona"],
      pt: ["Fogos de artificio em Londres", "Festa em Berlim", "Celebracao em Paris", "Reveillon em Barcelona"]
    },
    duration: "5-7",
    bestTime: { es: "Diciembre - Enero", en: "December - January", pt: "Dezembro - Janeiro" }
  },
  "arte-cultura": {
    title: { es: "Arte y Cultura", en: "Art and Culture", pt: "Arte e Cultura" },
    description: { 
      es: "Sumérgete en la rica historia artística y cultural de Europa visitando los mejores museos y monumentos",
      en: "Immerse yourself in Europe's rich artistic and cultural history visiting the best museums and monuments",
      pt: "Mergulhe na rica historia artística e cultural da Europa visitando os melhores museus e monumentos"
    },
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=60",
    highlights: {
      es: ["Museo del Louvre", "Galeria Uffizi", "Museo del Prado", "British Museum"],
      en: ["Louvre Museum", "Uffizi Gallery", "Prado Museum", "British Museum"],
      pt: ["Museu do Louvre", "Galeria Uffizi", "Museu do Prado", "British Museum"]
    },
    duration: "7-14",
    bestTime: { es: "Todo el ano", en: "All year", pt: "Todo o ano" }
  },
  "aventura-naturaleza": {
    title: { es: "Aventura y Naturaleza", en: "Adventure and Nature", pt: "Aventura e Natureza" },
    description: { 
      es: "Explora los paisajes naturales mas impresionantes de Europa con actividades al aire libre",
      en: "Explore Europe's most impressive natural landscapes with outdoor activities",
      pt: "Explore as paisagens naturais mais impressionantes da Europa com atividades ao ar livre"
    },
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60",
    highlights: {
      es: ["Alpes suizos", "Fiordos noruegos", "Dolomitas italianas", "Costa irlandesa"],
      en: ["Swiss Alps", "Norwegian Fjords", "Italian Dolomites", "Irish Coast"],
      pt: ["Alpes suicos", "Fiordes noruegueses", "Dolomitas italianas", "Costa irlandesa"]
    },
    duration: "7-10",
    bestTime: { es: "Mayo - Septiembre", en: "May - September", pt: "Maio - Setembro" }
  },
  "ciudades-historicas": {
    title: { es: "Ciudades Historicas", en: "Historic Cities", pt: "Cidades Historicas" },
    description: { 
      es: "Viaja en el tiempo visitando las ciudades con mayor historia y patrimonio de Europa",
      en: "Travel back in time visiting Europe's cities with the greatest history and heritage",
      pt: "Viaje no tempo visitando as cidades com mais historia e patrimonio da Europa"
    },
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=60",
    highlights: {
      es: ["Roma Imperial", "Atenas antigua", "Praga medieval", "Viena imperial"],
      en: ["Imperial Rome", "Ancient Athens", "Medieval Prague", "Imperial Vienna"],
      pt: ["Roma Imperial", "Atenas antiga", "Praga medieval", "Viena imperial"]
    },
    duration: "10-14",
    bestTime: { es: "Primavera y Otono", en: "Spring and Fall", pt: "Primavera e Outono" }
  },
  "gastronomia-europa": {
    title: { es: "Gastronomia Europea", en: "European Gastronomy", pt: "Gastronomia Europeia" },
    description: { 
      es: "Descubre los sabores autenticos de Europa con tours gastronomicos y experiencias culinarias",
      en: "Discover the authentic flavors of Europe with gastronomic tours and culinary experiences",
      pt: "Descubra os sabores autenticos da Europa com tours gastronomicos e experiencias culinarias"
    },
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=60",
    highlights: {
      es: ["Vinos de Francia", "Pasta italiana", "Tapas espanolas", "Cerveza alemana"],
      en: ["French wines", "Italian pasta", "Spanish tapas", "German beer"],
      pt: ["Vinhos franceses", "Massa italiana", "Tapas espanholas", "Cerveja alema"]
    },
    duration: "7-10",
    bestTime: { es: "Todo el ano", en: "All year", pt: "Todo o ano" }
  },
  "invierno-europa": {
    title: { es: "Invierno en Europa", en: "Winter in Europe", pt: "Inverno na Europa" },
    description: { 
      es: "Vive la magia del invierno europeo con nieve, esqui y paisajes de cuento",
      en: "Experience the magic of European winter with snow, skiing, and fairy-tale landscapes",
      pt: "Viva a magia do inverno europeu com neve, esqui e paisagens de conto de fadas"
    },
    image: "https://images.unsplash.com/photo-1548777123-e216912df7d8?w=1200&q=60",
    highlights: {
      es: ["Esqui en los Alpes", "Auroras boreales", "Mercados de invierno", "Castillos nevados"],
      en: ["Skiing in the Alps", "Northern Lights", "Winter markets", "Snowy castles"],
      pt: ["Esqui nos Alpes", "Auroras boreais", "Mercados de inverno", "Castelos nevados"]
    },
    duration: "7-10",
    bestTime: { es: "Diciembre - Febrero", en: "December - February", pt: "Dezembro - Fevereiro" }
  },
  "navidad-europa": {
    title: { es: "Navidad en Europa", en: "Christmas in Europe", pt: "Natal na Europa" },
    description: { 
      es: "Vive la magia navidena en los mercados y ciudades mas festivas de Europa",
      en: "Experience Christmas magic in Europe's most festive markets and cities",
      pt: "Viva a magia do Natal nos mercados e cidades mais festivos da Europa"
    },
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=1200&q=60",
    highlights: {
      es: ["Mercados navidenos alemanes", "Viena festiva", "Praga iluminada", "Londres en Navidad"],
      en: ["German Christmas markets", "Festive Vienna", "Illuminated Prague", "London at Christmas"],
      pt: ["Mercados de Natal alemaes", "Viena festiva", "Praga iluminada", "Londres no Natal"]
    },
    duration: "5-7",
    bestTime: { es: "Noviembre - Diciembre", en: "November - December", pt: "Novembro - Dezembro" }
  },
  "otono-europa": {
    title: { es: "Otono en Europa", en: "Autumn in Europe", pt: "Outono na Europa" },
    description: { 
      es: "Disfruta de los colores del otono europeo con temperaturas agradables y menos turistas",
      en: "Enjoy the colors of European autumn with pleasant temperatures and fewer tourists",
      pt: "Desfrute das cores do outono europeu com temperaturas agradaveis e menos turistas"
    },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=60",
    highlights: {
      es: ["Vendimia francesa", "Bosques alemanes", "Festivales de otono", "Gastronomia de temporada"],
      en: ["French grape harvest", "German forests", "Autumn festivals", "Seasonal gastronomy"],
      pt: ["Vindima francesa", "Florestas alemas", "Festivais de outono", "Gastronomia da estacao"]
    },
    duration: "7-14",
    bestTime: { es: "Septiembre - Noviembre", en: "September - November", pt: "Setembro - Novembro" }
  },
  "primavera-europa": {
    title: { es: "Primavera en Europa", en: "Spring in Europe", pt: "Primavera na Europa" },
    description: { 
      es: "Descubre Europa en su mejor momento con flores, festivales y clima perfecto",
      en: "Discover Europe at its best with flowers, festivals, and perfect weather",
      pt: "Descubra a Europa no seu melhor momento com flores, festivais e clima perfeito"
    },
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=60",
    highlights: {
      es: ["Tulipanes holandeses", "Cerezos en flor", "Festivales de primavera", "Jardines europeos"],
      en: ["Dutch tulips", "Cherry blossoms", "Spring festivals", "European gardens"],
      pt: ["Tulipas holandesas", "Flores de cerejeira", "Festivais de primavera", "Jardins europeus"]
    },
    duration: "7-14",
    bestTime: { es: "Marzo - Mayo", en: "March - May", pt: "Marco - Maio" }
  },
  "verano-europa": {
    title: { es: "Verano en Europa", en: "Summer in Europe", pt: "Verao na Europa" },
    description: { 
      es: "Disfruta del verano europeo con playas, festivales y dias largos y soleados",
      en: "Enjoy European summer with beaches, festivals, and long sunny days",
      pt: "Desfrute do verao europeu com praias, festivais e dias longos e ensolarados"
    },
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60",
    highlights: {
      es: ["Playas mediterraneas", "Festivales de musica", "Islas griegas", "Costa amalfitana"],
      en: ["Mediterranean beaches", "Music festivals", "Greek islands", "Amalfi Coast"],
      pt: ["Praias mediterraneas", "Festivais de musica", "Ilhas gregas", "Costa amalfitana"]
    },
    duration: "10-14",
    bestTime: { es: "Junio - Agosto", en: "June - August", pt: "Junho - Agosto" }
  }
};

export default function ExperiencePage() {
  const params = useParams<{ slug: string }>();
  const [location] = useLocation();
  const { language } = useI18n();
  
  const slug = params.slug || "";
  const normalizedSlug = slug.replace("año", "ano");
  const experience = experiences[normalizedSlug];
  
  const getLang = (): "es" | "en" | "pt" => {
    if (location.includes("/pt-br") || location.includes("/pt/")) return "pt";
    if (location.includes("/en-") || location.includes("/en/")) return "en";
    return language as "es" | "en" | "pt";
  };
  
  const lang = getLang();

  if (!experience) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {lang === "es" ? "Experiencia no encontrada" : lang === "en" ? "Experience not found" : "Experiencia nao encontrada"}
            </h1>
            <Link href="/experiences">
              <Button>{lang === "es" ? "Ver todas las experiencias" : lang === "en" ? "View all experiences" : "Ver todas as experiencias"}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-experience">
      <Header />
      
      <main className="flex-1">
        <section 
          className="relative h-[50vh] min-h-[400px] bg-cover bg-center"
          style={{ backgroundImage: `url(${experience.image})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="text-experience-title">
                {experience.title[lang]}
              </h1>
              <p className="text-xl opacity-90">{experience.description[lang]}</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <Clock className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {lang === "es" ? "Duracion recomendada" : lang === "en" ? "Recommended duration" : "Duracao recomendada"}
                    </p>
                    <p className="font-bold">{experience.duration} {lang === "es" ? "dias" : lang === "en" ? "days" : "dias"}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <Calendar className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {lang === "es" ? "Mejor epoca" : lang === "en" ? "Best time" : "Melhor epoca"}
                    </p>
                    <p className="font-bold">{experience.bestTime[lang]}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <Star className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {lang === "es" ? "Valoracion" : lang === "en" ? "Rating" : "Avaliacao"}
                    </p>
                    <p className="font-bold">4.8/5</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mb-6">
              {lang === "es" ? "Lo mas destacado" : lang === "en" ? "Highlights" : "Destaques"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {experience.highlights[lang].map((highlight, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <span>{highlight}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/contact">
                <Button size="lg" className="px-8" data-testid="button-contact">
                  {lang === "es" ? "Consultar disponibilidad" : lang === "en" ? "Check availability" : "Consultar disponibilidade"}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButtons />
    </div>
  );
}
