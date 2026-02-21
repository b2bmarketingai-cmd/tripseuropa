import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { FloatingContactButtons } from "@/components/support";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Sun, Snowflake, Leaf, Flower2, TreePine, Gift,
  Globe, Umbrella, Mountain, Binoculars, Ship, Heart,
  Trees, Landmark, Crown,
  User, Users, HeartHandshake, GraduationCap, UsersRound, Backpack,
  ArrowRight, Compass
} from "lucide-react";

const SEASON_STYLES = [
  { slug: "fall", icon: Leaf, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=70&w=600&auto=format&fit=crop", labels: { es: "Otono", en: "Fall", pt: "Outono" } },
  { slug: "summer", icon: Sun, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=600&auto=format&fit=crop", labels: { es: "Verano", en: "Summer", pt: "Verao" } },
  { slug: "spring", icon: Flower2, image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?q=70&w=600&auto=format&fit=crop", labels: { es: "Primavera", en: "Spring", pt: "Primavera" } },
  { slug: "easter", icon: Gift, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=70&w=600&auto=format&fit=crop", labels: { es: "Semana Santa", en: "Easter", pt: "Pascoa" } },
  { slug: "winter", icon: Snowflake, image: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?q=70&w=600&auto=format&fit=crop", labels: { es: "Invierno", en: "Winter", pt: "Inverno" } },
  { slug: "christmas", icon: TreePine, image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=70&w=600&auto=format&fit=crop", labels: { es: "Navidad", en: "Christmas", pt: "Natal" } },
];

const INTEREST_STYLES = [
  { slug: "multi-country", icon: Globe, image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=70&w=600&auto=format&fit=crop", labels: { es: "Multi-Pais", en: "Multi-Country", pt: "Multi-Pais" } },
  { slug: "beach", icon: Umbrella, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=600&auto=format&fit=crop", labels: { es: "Playa", en: "Beach", pt: "Praia" } },
  { slug: "adventure", icon: Mountain, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=70&w=600&auto=format&fit=crop", labels: { es: "Aventura", en: "Adventure", pt: "Aventura" } },
  { slug: "safari", icon: Binoculars, image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=70&w=600&auto=format&fit=crop", labels: { es: "Safari", en: "Safari", pt: "Safari" } },
  { slug: "cruises", icon: Ship, image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=70&w=600&auto=format&fit=crop", labels: { es: "Cruceros", en: "Cruises", pt: "Cruzeiros" } },
  { slug: "honeymoon", icon: Heart, image: "https://images.unsplash.com/photo-1529903384028-929ae5dccdf1?q=70&w=600&auto=format&fit=crop", labels: { es: "Luna de Miel", en: "Honeymoon", pt: "Lua de Mel" } },
  { slug: "nature", icon: Trees, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=70&w=600&auto=format&fit=crop", labels: { es: "Naturaleza", en: "Nature", pt: "Natureza" } },
  { slug: "culture", icon: Landmark, image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=600&auto=format&fit=crop", labels: { es: "Cultural", en: "Culture", pt: "Cultural" } },
  { slug: "luxury", icon: Crown, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=70&w=600&auto=format&fit=crop", labels: { es: "Lujo", en: "Luxury", pt: "Luxo" } },
];

const GROUP_STYLES = [
  { slug: "solo", icon: User, image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=70&w=600&auto=format&fit=crop", labels: { es: "Viajeros Solos", en: "Solo Travelers", pt: "Viajantes Solo" } },
  { slug: "family", icon: Users, image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=70&w=600&auto=format&fit=crop", labels: { es: "Familia", en: "Family", pt: "Familia" } },
  { slug: "couples", icon: HeartHandshake, image: "https://images.unsplash.com/photo-1529903384028-929ae5dccdf1?q=70&w=600&auto=format&fit=crop", labels: { es: "Parejas", en: "Couples", pt: "Casais" } },
  { slug: "senior", icon: GraduationCap, image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=70&w=600&auto=format&fit=crop", labels: { es: "Seniors", en: "Senior", pt: "Seniors" } },
  { slug: "friends-private", icon: UsersRound, image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=70&w=600&auto=format&fit=crop", labels: { es: "Amigos y Tours Privados", en: "Friends & Private Tours", pt: "Amigos e Tours Privados" } },
  { slug: "backpacker", icon: Backpack, image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=70&w=600&auto=format&fit=crop", labels: { es: "Mochileros", en: "Backpacker", pt: "Mochileiros" } },
];

const SECTION_TITLES = {
  bySeason: { es: "Por Temporada", en: "By Season", pt: "Por Temporada" },
  byInterest: { es: "Por Interes", en: "By Interest", pt: "Por Interesse" },
  byGroup: { es: "Por Grupo", en: "By Group", pt: "Por Grupo" },
};

const SECTION_SUBTITLES = {
  bySeason: { es: "Encuentra el viaje perfecto segun la temporada del ano", en: "Find the perfect trip based on the season", pt: "Encontre a viagem perfeita de acordo com a temporada" },
  byInterest: { es: "Explora Europa segun tus intereses y pasiones", en: "Explore Europe based on your interests and passions", pt: "Explore a Europa de acordo com seus interesses e paixoes" },
  byGroup: { es: "Viajes disenados para cada tipo de viajero", en: "Trips designed for every type of traveler", pt: "Viagens projetadas para cada tipo de viajante" },
};

export default function TravelStylesLanding() {
  const { t, language } = useI18n();

  const pageContent = {
    h1: { es: "Estilos de Viaje", en: "Travel Styles", pt: "Estilos de Viagem" },
    subtitle: { es: "Descubre Europa a tu manera. Elige tu estilo de viaje ideal y encuentra paquetes disenados especialmente para ti.", en: "Discover Europe your way. Choose your ideal travel style and find packages designed especially for you.", pt: "Descubra a Europa do seu jeito. Escolha seu estilo de viagem ideal e encontre pacotes especialmente projetados para voce." },
    explore: { es: "Explorar", en: "Explore", pt: "Explorar" },
  };

  const renderStyleCards = (styles: typeof SEASON_STYLES) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {styles.map((style) => {
        const IconComponent = style.icon;
        return (
          <Link key={style.slug} href={`/travel-style/${style.slug}`}>
            <Card className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" data-testid={`card-style-${style.slug}`}>
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={style.image} 
                  alt={style.labels[language] || style.labels.es} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white">
                    {style.labels[language] || style.labels.es}
                  </h3>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {pageContent.explore[language] || pageContent.explore.es}
                  </span>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead 
        title={`${pageContent.h1[language] || "Estilos de Viaje"} - Trips Europa`} 
        description="Descubre todos los estilos de viaje a Europa. Por temporada, interes o grupo. Encuentra el paquete perfecto para ti." 
      />
      <Header />

      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-travel-styles-hero">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=60&w=1200&auto=format&fit=crop" 
            alt="Travel Styles" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-travel-styles">
              <Compass className="w-4 h-4 mr-1" />
              {pageContent.h1[language] || pageContent.h1.es}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-travel-styles-h1">
              {pageContent.h1[language] || pageContent.h1.es}
            </h1>
            <p className="text-xl text-white/80" data-testid="text-travel-styles-subtitle">
              {pageContent.subtitle[language] || pageContent.subtitle.es}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30" data-testid="section-by-season">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3" data-testid="text-section-season-title">
              {SECTION_TITLES.bySeason[language] || SECTION_TITLES.bySeason.es}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {SECTION_SUBTITLES.bySeason[language] || SECTION_SUBTITLES.bySeason.es}
            </p>
          </div>
          {renderStyleCards(SEASON_STYLES)}
        </div>
      </section>

      <section className="py-20 bg-background" data-testid="section-by-interest">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3" data-testid="text-section-interest-title">
              {SECTION_TITLES.byInterest[language] || SECTION_TITLES.byInterest.es}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {SECTION_SUBTITLES.byInterest[language] || SECTION_SUBTITLES.byInterest.es}
            </p>
          </div>
          {renderStyleCards(INTEREST_STYLES)}
        </div>
      </section>

      <section className="py-20 bg-muted/30" data-testid="section-by-group">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3" data-testid="text-section-group-title">
              {SECTION_TITLES.byGroup[language] || SECTION_TITLES.byGroup.es}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {SECTION_SUBTITLES.byGroup[language] || SECTION_SUBTITLES.byGroup.es}
            </p>
          </div>
          {renderStyleCards(GROUP_STYLES)}
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
