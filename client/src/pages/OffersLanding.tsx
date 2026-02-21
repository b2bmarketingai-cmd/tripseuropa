import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { FloatingContactButtons } from "@/components/support";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Tag, ArrowRight, Clock, Flame, Star, Gift,
  Percent, MapPin, Calendar, Sun, Snowflake, Heart,
  Users, Compass, Crown
} from "lucide-react";

const SEASONAL_OFFERS = [
  {
    slug: "verano-europa",
    icon: Sun,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=800&auto=format&fit=crop",
    title: { es: "Verano en Europa", en: "European Summer", pt: "Verao na Europa" },
    description: { es: "Playas del Mediterraneo, festivales y noches magicas. Paquetes desde $1,899 USD.", en: "Mediterranean beaches, festivals and magical nights. Packages from $1,899 USD.", pt: "Praias do Mediterraneo, festivais e noites magicas. Pacotes desde $1,899 USD." },
    discount: 25,
    badge: { es: "Temporada Alta", en: "Peak Season", pt: "Alta Temporada" },
  },
  {
    slug: "invierno-magico",
    icon: Snowflake,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=70&w=800&auto=format&fit=crop",
    title: { es: "Invierno Magico", en: "Magical Winter", pt: "Inverno Magico" },
    description: { es: "Mercados navidenos, esqui en los Alpes y auroras boreales. Desde $2,199 USD.", en: "Christmas markets, Alpine skiing and Northern Lights. From $2,199 USD.", pt: "Mercados natalinos, esqui nos Alpes e auroras boreais. Desde $2,199 USD." },
    discount: 30,
    badge: { es: "Navidad", en: "Christmas", pt: "Natal" },
  },
  {
    slug: "luna-de-miel",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=70&w=800&auto=format&fit=crop",
    title: { es: "Luna de Miel en Europa", en: "European Honeymoon", pt: "Lua de Mel na Europa" },
    description: { es: "Destinos romanticos: Santorini, Venecia, Paris. Experiencias exclusivas para parejas.", en: "Romantic destinations: Santorini, Venice, Paris. Exclusive experiences for couples.", pt: "Destinos romanticos: Santorini, Veneza, Paris. Experiencias exclusivas para casais." },
    discount: 20,
    badge: { es: "Parejas", en: "Couples", pt: "Casais" },
  },
  {
    slug: "familia-europa",
    icon: Users,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=800&auto=format&fit=crop",
    title: { es: "Europa en Familia", en: "Family Europe", pt: "Europa em Familia" },
    description: { es: "Parques tematicos, ciudades fascinantes y aventuras para toda la familia. Ninos gratis!", en: "Theme parks, fascinating cities and adventures for the whole family. Kids free!", pt: "Parques tematicos, cidades fascinantes e aventuras para toda a familia. Criancas gratis!" },
    discount: 15,
    badge: { es: "Familiar", en: "Family", pt: "Familiar" },
  },
  {
    slug: "aventura-naturaleza",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?q=70&w=800&auto=format&fit=crop",
    title: { es: "Aventura y Naturaleza", en: "Adventure & Nature", pt: "Aventura e Natureza" },
    description: { es: "Fiordos noruegos, Highlands escoceses y rutas de senderismo por los Alpes.", en: "Norwegian fjords, Scottish Highlands and Alpine hiking trails.", pt: "Fiordes noruegueses, Highlands escoceses e trilhas de caminhada nos Alpes." },
    discount: 20,
    badge: { es: "Aventura", en: "Adventure", pt: "Aventura" },
  },
  {
    slug: "lujo-premium",
    icon: Crown,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=70&w=800&auto=format&fit=crop",
    title: { es: "Viajes de Lujo", en: "Luxury Travel", pt: "Viagens de Luxo" },
    description: { es: "Hoteles 5 estrellas, tours privados, restaurantes Michelin y experiencias VIP.", en: "5-star hotels, private tours, Michelin restaurants and VIP experiences.", pt: "Hoteis 5 estrelas, tours privados, restaurantes Michelin e experiencias VIP." },
    discount: 10,
    badge: { es: "Premium", en: "Premium", pt: "Premium" },
  },
];

export default function OffersLanding() {
  const { t, language } = useI18n();
  const lang = language as "es" | "en" | "pt";

  const content = {
    seoTitle: { es: "Ofertas y Promociones - Trips Europa", en: "Deals & Promotions - Trips Europa", pt: "Ofertas e Promocoes - Trips Europa" },
    seoDesc: { es: "Descubre las mejores ofertas y promociones para viajar a Europa. Descuentos exclusivos en paquetes, vuelos y hoteles.", en: "Discover the best deals and promotions for traveling to Europe. Exclusive discounts on packages, flights and hotels.", pt: "Descubra as melhores ofertas e promocoes para viajar para a Europa. Descontos exclusivos em pacotes, voos e hoteis." },
    heroBadge: { es: "Ofertas Exclusivas", en: "Exclusive Deals", pt: "Ofertas Exclusivas" },
    heroTitle: { es: "Ofertas y Promociones", en: "Deals & Promotions", pt: "Ofertas e Promocoes" },
    heroSubtitle: { es: "Encuentra las mejores ofertas para tu proximo viaje a Europa. Descuentos exclusivos, paquetes de ultima hora y promociones especiales todo el ano.", en: "Find the best deals for your next trip to Europe. Exclusive discounts, last-minute packages and special promotions all year round.", pt: "Encontre as melhores ofertas para sua proxima viagem a Europa. Descontos exclusivos, pacotes de ultima hora e promocoes especiais durante todo o ano." },
    lastMinuteTitle: { es: "Ofertas de Ultima Hora", en: "Last-Minute Deals", pt: "Ofertas de Ultima Hora" },
    lastMinuteDesc: { es: "Aprovecha descuentos de hasta 60% en paquetes con salida en las proximas semanas. Vuelos, hoteles y tours incluidos.", en: "Take advantage of discounts up to 60% on packages departing in the coming weeks. Flights, hotels and tours included.", pt: "Aproveite descontos de ate 60% em pacotes com partida nas proximas semanas. Voos, hoteis e tours incluidos." },
    lastMinuteCta: { es: "Ver Ofertas de Ultima Hora", en: "View Last-Minute Deals", pt: "Ver Ofertas de Ultima Hora" },
    lastMinuteBadge: { es: "Hasta 60% OFF", en: "Up to 60% OFF", pt: "Ate 60% OFF" },
    seasonalTitle: { es: "Ofertas por Temporada y Estilo", en: "Seasonal & Themed Deals", pt: "Ofertas por Temporada e Estilo" },
    seasonalSubtitle: { es: "Encuentra el viaje perfecto segun tus intereses y la epoca del ano", en: "Find the perfect trip based on your interests and the time of year", pt: "Encontre a viagem perfeita de acordo com seus interesses e a epoca do ano" },
    rewardsTitle: { es: "Programa TripsEuropa GO", en: "TripsEuropa GO Program", pt: "Programa TripsEuropa GO" },
    rewardsDesc: { es: "Unete a nuestro programa de fidelidad y acumula puntos con cada viaje. Canjea por descuentos, upgrades y experiencias exclusivas.", en: "Join our loyalty program and earn points with every trip. Redeem for discounts, upgrades and exclusive experiences.", pt: "Junte-se ao nosso programa de fidelidade e acumule pontos a cada viagem. Troque por descontos, upgrades e experiencias exclusivas." },
    rewardsCta: { es: "Conocer Programa GO", en: "Learn About GO Program", pt: "Conhecer Programa GO" },
    rewardsBadge: { es: "Programa de Fidelidad", en: "Loyalty Program", pt: "Programa de Fidelidade" },
    viewOffer: { es: "Ver Oferta", en: "View Deal", pt: "Ver Oferta" },
    discountOff: { es: "de descuento", en: "off", pt: "de desconto" },
  };

  const tx = (key: keyof typeof content) => content[key][lang] || content[key].es;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title={tx("seoTitle")} description={tx("seoDesc")} />
      <Header />

      <section className="relative py-24 md:py-32 bg-primary overflow-hidden" data-testid="section-offers-hero">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?q=60&w=1200&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/90" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Tag className="w-6 h-6 text-accent" />
            <Badge className="bg-accent/20 text-accent border-accent/30" data-testid="badge-offers">
              {tx("heroBadge")}
            </Badge>
            <Tag className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-offers-title">
            <span className="text-accent">{tx("heroTitle")}</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8" data-testid="text-offers-subtitle">
            {tx("heroSubtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-last-minute">
        <div className="container mx-auto px-4">
          <Link href="/ofertas-ultima-hora">
            <Card className="overflow-visible cursor-pointer hover-elevate" data-testid="card-last-minute">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/3 h-64 md:h-auto overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                  <img
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?q=60&w=600&auto=format&fit=crop"
                    alt={tx("lastMinuteTitle")}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600 text-white border-red-500">
                      <Flame className="w-3 h-3 mr-1" />
                      {tx("lastMinuteBadge")}
                    </Badge>
                  </div>
                </div>
                <CardContent className="flex-1 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-last-minute-title">
                      {tx("lastMinuteTitle")}
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-6 max-w-2xl">
                    {tx("lastMinuteDesc")}
                  </p>
                  <div>
                    <Button data-testid="button-last-minute-cta">
                      {tx("lastMinuteCta")} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      <section className="py-20" data-testid="section-seasonal-offers">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4" data-testid="text-seasonal-title">
              {tx("seasonalTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {tx("seasonalSubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEASONAL_OFFERS.map((offer) => {
              const Icon = offer.icon;
              return (
                <Link key={offer.slug} href={`/ofertas/${offer.slug}`}>
                  <Card className="group overflow-visible cursor-pointer hover-elevate h-full" data-testid={`card-offer-${offer.slug}`}>
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={offer.image}
                        alt={offer.title[lang] || offer.title.es}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                      <Badge className="absolute top-3 left-3 bg-accent text-primary font-semibold">
                        {offer.badge[lang] || offer.badge.es}
                      </Badge>
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                        <Percent className="w-3 h-3" />
                        {offer.discount}% OFF
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="text-lg font-display font-bold text-accent leading-tight">
                          {offer.title[lang] || offer.title.es}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-4">
                        <Icon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                        <p className="text-muted-foreground text-sm">
                          {offer.description[lang] || offer.description.es}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-accent">
                          {offer.discount}% {tx("discountOff")}
                        </span>
                        <Button size="sm" data-testid={`button-offer-${offer.slug}`}>
                          {tx("viewOffer")} <ArrowRight className="w-4 h-4 ml-1" />
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

      <section className="py-16 bg-muted/30" data-testid="section-rewards">
        <div className="container mx-auto px-4">
          <Link href="/rewards">
            <Card className="overflow-visible cursor-pointer hover-elevate" data-testid="card-rewards">
              <div className="flex flex-col md:flex-row-reverse">
                <div className="relative md:w-1/3 h-64 md:h-auto overflow-hidden rounded-t-lg md:rounded-r-lg md:rounded-tl-none">
                  <img
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=60&w=600&auto=format&fit=crop"
                    alt={tx("rewardsTitle")}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-primary/70 to-transparent" />
                </div>
                <CardContent className="flex-1 p-8 flex flex-col justify-center">
                  <Badge className="w-fit bg-accent/20 text-accent border-accent/30 mb-3">
                    <Gift className="w-3 h-3 mr-1" />
                    {tx("rewardsBadge")}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-3" data-testid="text-rewards-title">
                    {tx("rewardsTitle")}
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl">
                    {tx("rewardsDesc")}
                  </p>
                  <div>
                    <Button data-testid="button-rewards-cta">
                      {tx("rewardsCta")} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
