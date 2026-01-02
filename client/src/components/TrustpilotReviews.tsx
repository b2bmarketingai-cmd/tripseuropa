import { useI18n } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, ShieldCheck, Mail, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  rating: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  verified: boolean;
  byInvitation: boolean;
}

export function TrustpilotReviews() {
  const { language } = useI18n();

  const content = {
    es: {
      excellent: "Excelente",
      basedOn: "En base a 28,547 opiniones",
      ourReviews: "Nuestras opiniones preferidas",
      byInvitation: "Por invitacion",
      verified: "Verificada",
      reviews: [
        {
          id: 1,
          rating: 5,
          title: "Viajar con Trips Europa significa seguridad",
          excerpt: "Viajar con Trips Europa significa profesionalismo, seguridad y excelencia. Todo estuvo perfectamente organizado.",
          author: "Carlos Martinez",
          date: "15 diciembre",
          verified: false,
          byInvitation: true,
        },
        {
          id: 2,
          rating: 5,
          title: "Un viaje espectacular a Italia",
          excerpt: "Nuestro viaje este año ha sido a Italia y Grecia. Ya conociamos Trips Europa del año pasado y volvimos a confiar en ellos.",
          author: "Maria Fernanda Lopez",
          date: "28 noviembre",
          verified: false,
          byInvitation: true,
        },
        {
          id: 3,
          rating: 4,
          title: "Viaje inolvidable por Europa",
          excerpt: "Puedo decir que ha sido un viaje inolvidable. Desde el minuto cero el equipo estuvo atento a todos los detalles.",
          author: "Roberto Sanchez Perez",
          date: "10 noviembre",
          verified: false,
          byInvitation: true,
        },
        {
          id: 4,
          rating: 5,
          title: "Muy buena atencion al cliente",
          excerpt: "Muy buena atencion desde el primer contacto. El viaje salio perfecto y los hoteles fueron excelentes.",
          author: "Ana Garcia",
          date: "5 octubre",
          verified: true,
          byInvitation: false,
        },
        {
          id: 5,
          rating: 5,
          title: "Experiencia de primera clase",
          excerpt: "Todo el proceso fue muy facil. El equipo de Trips Europa se encargo de todo y pudimos disfrutar sin preocupaciones.",
          author: "Luis Eduardo Ruiz",
          date: "22 septiembre",
          verified: true,
          byInvitation: false,
        },
      ] as Review[],
    },
    en: {
      excellent: "Excellent",
      basedOn: "Based on 28,547 reviews",
      ourReviews: "Our favorite reviews",
      byInvitation: "By invitation",
      verified: "Verified",
      reviews: [
        {
          id: 1,
          rating: 5,
          title: "Traveling with Trips Europa means security",
          excerpt: "Traveling with Trips Europa means professionalism, security and excellence. Everything was perfectly organized.",
          author: "Carlos Martinez",
          date: "December 15",
          verified: false,
          byInvitation: true,
        },
        {
          id: 2,
          rating: 5,
          title: "A spectacular trip to Italy",
          excerpt: "Our trip this year was to Italy and Greece. We already knew Trips Europa from last year and trusted them again.",
          author: "Maria Fernanda Lopez",
          date: "November 28",
          verified: false,
          byInvitation: true,
        },
        {
          id: 3,
          rating: 4,
          title: "Unforgettable trip through Europe",
          excerpt: "I can say it was an unforgettable trip. From minute zero the team was attentive to all the details.",
          author: "Roberto Sanchez Perez",
          date: "November 10",
          verified: false,
          byInvitation: true,
        },
        {
          id: 4,
          rating: 5,
          title: "Very good customer service",
          excerpt: "Very good attention from the first contact. The trip was perfect and the hotels were excellent.",
          author: "Ana Garcia",
          date: "October 5",
          verified: true,
          byInvitation: false,
        },
        {
          id: 5,
          rating: 5,
          title: "First class experience",
          excerpt: "The whole process was very easy. The Trips Europa team took care of everything and we could enjoy worry-free.",
          author: "Luis Eduardo Ruiz",
          date: "September 22",
          verified: true,
          byInvitation: false,
        },
      ] as Review[],
    },
  };

  const c = content[language as "es" | "en"];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-5 h-5 flex items-center justify-center ${
              i < rating ? "bg-[#00b67a]" : "bg-muted"
            }`}
          >
            <Star className="w-3 h-3 text-white fill-white" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-muted/30" data-testid="section-trustpilot-reviews">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-shrink-0 lg:w-48">
            <h3 className="text-3xl font-bold text-foreground mb-2">{c.excellent}</h3>
            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-[#00b67a] flex items-center justify-center">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{c.basedOn}</p>
            <p className="text-xs text-muted-foreground mt-4">{c.ourReviews}</p>
          </div>

          <div className="flex-1 min-w-0">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {c.reviews.map((review) => (
                  <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <Card className="p-4 h-full" data-testid={`card-review-${review.id}`}>
                      <div className="flex items-center justify-between mb-3">
                        {renderStars(review.rating)}
                        <Badge variant="outline" className="text-xs gap-1">
                          {review.verified ? (
                            <>
                              <ShieldCheck className="w-3 h-3" />
                              {c.verified}
                            </>
                          ) : (
                            <>
                              <Mail className="w-3 h-3" />
                              {c.byInvitation}
                            </>
                          )}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-foreground text-sm mb-2 line-clamp-1">
                        {review.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        {review.excerpt}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{review.author}</span>, {review.date}
                      </p>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
