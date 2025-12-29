import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play, Star, Award } from "lucide-react";
import logoPath from "@assets/erasebg-transformed_(2)_1767029138652.png";

export function PromotionalVideoBanner() {
  const { language } = useI18n();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const content = {
    es: {
      headline: "Viajes Organizados Extraordinarios A Destinos Europeos",
      subheadline: "Elegido por mas de 50,000 viajeros cada año - descubre la magia de Europa con nuestros paquetes exclusivos.",
      watchVideo: "Ver Video",
      videoTitle: "Video Promocional",
      tagline: "TRIPS EUROPA PRESENTA",
      movieTitle: "TU MOMENTO DE VIAJAR",
      movieSubtitle: "Una experiencia que cambiara tu vida",
      rating: "Calificacion 5 estrellas",
      award: "Mejor agencia 2024",
    },
    en: {
      headline: "Extraordinary Organized Trips To European Destinations",
      subheadline: "Chosen by more than 50,000 travelers each year - discover the magic of Europe with our exclusive packages.",
      watchVideo: "Watch Video",
      videoTitle: "Promotional Video",
      tagline: "TRIPS EUROPA PRESENTS",
      movieTitle: "YOUR TIME TO TRAVEL",
      movieSubtitle: "A life-changing experience",
      rating: "5 star rating",
      award: "Best agency 2024",
    },
  };

  const c = content[language as "es" | "en"];

  return (
    <>
      <section className="py-16 bg-[#0f172a]" data-testid="section-promotional-video">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-white">
              <img 
                src={logoPath} 
                alt="Trips Europa" 
                className="h-8 mb-6 brightness-0 invert"
                data-testid="img-promo-logo"
              />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                {c.headline}
              </h2>
              <p className="text-lg text-white/70 mb-8">
                {c.subheadline}
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span>{c.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" />
                  <span>{c.award}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card 
                className="overflow-hidden cursor-pointer group border-0 bg-transparent"
                onClick={() => setIsVideoOpen(true)}
                data-testid="card-video-thumbnail"
              >
                <AspectRatio ratio={16 / 9}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] via-[#0f172a] to-[#064e3b]">
                    <img
                      src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop"
                      alt="European adventure"
                      className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <p className="text-xs tracking-[0.3em] text-accent mb-2 font-medium">
                      {c.tagline}
                    </p>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-center mb-2 text-accent">
                      {c.movieTitle}
                    </h3>
                    <p className="text-sm text-white/70 mb-6 italic">
                      {c.movieSubtitle}
                    </p>
                    
                    <Button
                      size="lg"
                      className="rounded-full w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all"
                      data-testid="button-play-video"
                    >
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </Button>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs text-white/60">
                    <span className="italic">"Una historia que cambia vidas"</span>
                    <span>2024</span>
                  </div>
                </AspectRatio>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-accent font-display">{c.videoTitle}</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <AspectRatio ratio={16 / 9}>
              <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {language === "es" ? "Video promocional proximamente" : "Promotional video coming soon"}
                  </p>
                </div>
              </div>
            </AspectRatio>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
