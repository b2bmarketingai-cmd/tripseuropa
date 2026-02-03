import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

const FLASH_OFFERS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=40&w=400&auto=format&fit=crop",
    title: { es: "Paris y Castillos del Loira", en: "Paris and Loire Castles", pt: "Paris e Castelos do Loire" },
    country: { es: "Francia en 8 Dias", en: "France in 8 Days", pt: "Franca em 8 Dias" },
    currentPrice: 999,
    originalPrice: 2499,
    discount: 60,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=40&w=400&auto=format&fit=crop",
    title: { es: "Roma, Florencia y Venecia", en: "Rome, Florence and Venice", pt: "Roma, Florenca e Veneza" },
    country: { es: "Italia en 10 Dias", en: "Italy in 10 Days", pt: "Italia em 10 Dias" },
    currentPrice: 1299,
    originalPrice: 2899,
    discount: 55,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=40&w=400&auto=format&fit=crop",
    title: { es: "Islas Griegas y Atenas", en: "Greek Islands and Athens", pt: "Ilhas Gregas e Atenas" },
    country: { es: "Grecia en 12 Dias", en: "Greece in 12 Days", pt: "Grecia em 12 Dias" },
    currentPrice: 1449,
    originalPrice: 3199,
    discount: 55,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=40&w=400&auto=format&fit=crop",
    title: { es: "Barcelona y Costa Brava", en: "Barcelona and Costa Brava", pt: "Barcelona e Costa Brava" },
    country: { es: "España en 7 Dias", en: "Spain in 7 Days", pt: "Espanha em 7 Dias" },
    currentPrice: 799,
    originalPrice: 1899,
    discount: 58,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=40&w=400&auto=format&fit=crop",
    title: { es: "Alpes Suizos Panoramicos", en: "Panoramic Swiss Alps", pt: "Alpes Suicos Panoramicos" },
    country: { es: "Suiza en 9 Dias", en: "Switzerland in 9 Days", pt: "Suica em 9 Dias" },
    currentPrice: 1599,
    originalPrice: 3499,
    discount: 54,
  },
];

export function FlashOffers() {
  const { language } = useI18n();
  const lang = language as "es" | "en" | "pt";
  const langPrefix = lang === "es" ? "" : lang === "pt" ? "/pt-br" : `/${lang}`;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const content = {
    es: {
      title: "Ofertas Flash",
      subtitle: "60% dto. en lo mejor del ano",
      countdown: "3 dias restantes",
      from: "Desde",
      off: "off",
      viewAll: "Ver ofertas",
    },
    en: {
      title: "Flash Offers",
      subtitle: "60% off the best of the year",
      countdown: "3 days left",
      from: "From",
      off: "off",
      viewAll: "View offers",
    },
    pt: {
      title: "Ofertas Relampago",
      subtitle: "60% de desconto nos melhores do ano",
      countdown: "3 dias restantes",
      from: "A partir de",
      off: "off",
      viewAll: "Ver ofertas",
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#0f172a] to-[#1e293b]" data-testid="section-flash-offers">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-accent" data-testid="text-flash-title">
                {content[lang].title}
              </h2>
              <Badge className="bg-red-500 text-white border-0 animate-pulse">
                <Clock className="w-3 h-3 mr-1" />
                {content[lang].countdown}
              </Badge>
            </div>
            <p className="text-white/70 text-lg">{content[lang].subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
              data-testid="button-flash-scroll-left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
              data-testid="button-flash-scroll-right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {FLASH_OFFERS.map((offer) => (
            <Link 
              key={offer.id} 
              href={`${langPrefix}/packages/${offer.id}`}
              className="block flex-shrink-0 w-[280px] group"
              style={{ scrollSnapAlign: "start" }}
              data-testid={`link-flash-offer-${offer.id}`}
            >
              <Card className="overflow-hidden bg-white/5 border-white/10 hover:border-accent/50 transition-all duration-300 h-full">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0 font-bold">
                    {offer.discount}% off
                  </Badge>
                  
                  <Badge className="absolute top-3 right-3 bg-accent text-primary border-0 text-xs">
                    {lang === "es" ? "Oferta Flash" : "Flash Offer"}
                  </Badge>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-accent font-bold text-lg leading-tight mb-1">
                      {offer.title[lang]}
                    </h3>
                    <p className="text-white/70 text-sm mb-3">{offer.country[lang]}</p>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-white/50 text-sm">{content[lang].from}</span>
                      <span className="text-accent text-2xl font-bold">{offer.currentPrice.toLocaleString()}</span>
                      <span className="text-white/50 text-sm line-through">{offer.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href={`${langPrefix}/packages`}>
            <Button 
              size="lg" 
              className="bg-accent text-primary font-bold hover:bg-accent/90 px-8"
              data-testid="button-flash-view-all"
            >
              {content[lang].viewAll}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
