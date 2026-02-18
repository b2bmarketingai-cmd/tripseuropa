import { useI18n } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck } from "lucide-react";

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
          excerpt:
            "Viajar con Trips Europa significa profesionalismo, seguridad y excelencia. Todo estuvo perfectamente organizado.",
          author: "Carlos Martinez",
          date: "15 diciembre",
          verified: false,
          byInvitation: true,
        },
        {
          id: 2,
          rating: 5,
          title: "Un viaje espectacular a Italia",
          excerpt:
            "Nuestro viaje este ano ha sido a Italia y Grecia. Ya conociamos Trips Europa del ano pasado y volvimos a confiar en ellos.",
          author: "Maria Fernanda Lopez",
          date: "28 noviembre",
          verified: false,
          byInvitation: true,
        },
        {
          id: 3,
          rating: 4,
          title: "Viaje inolvidable por Europa",
          excerpt:
            "Puedo decir que ha sido un viaje inolvidable. Desde el minuto cero el equipo estuvo atento a todos los detalles.",
          author: "Roberto Sanchez Perez",
          date: "10 noviembre",
          verified: false,
          byInvitation: true,
        },
        {
          id: 4,
          rating: 5,
          title: "Muy buena atencion al cliente",
          excerpt:
            "Muy buena atencion desde el primer contacto. El viaje salio perfecto y los hoteles fueron excelentes.",
          author: "Ana Garcia",
          date: "5 octubre",
          verified: true,
          byInvitation: false,
        },
        {
          id: 5,
          rating: 5,
          title: "Experiencia de primera clase",
          excerpt:
            "Todo el proceso fue muy facil. El equipo de Trips Europa se encargo de todo y pudimos disfrutar sin preocupaciones.",
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
          excerpt:
            "Traveling with Trips Europa means professionalism, security and excellence. Everything was perfectly organized.",
          author: "Carlos Martinez",
          date: "December 15",
          verified: false,
          byInvitation: true,
        },
        {
          id: 2,
          rating: 5,
          title: "A spectacular trip to Italy",
          excerpt:
            "Our trip this year was to Italy and Greece. We already knew Trips Europa from last year and trusted them again.",
          author: "Maria Fernanda Lopez",
          date: "November 28",
          verified: false,
          byInvitation: true,
        },
        {
          id: 3,
          rating: 4,
          title: "Unforgettable trip through Europe",
          excerpt:
            "I can say it was an unforgettable trip. From minute zero the team was attentive to all the details.",
          author: "Roberto Sanchez Perez",
          date: "November 10",
          verified: false,
          byInvitation: true,
        },
        {
          id: 4,
          rating: 5,
          title: "Very good customer service",
          excerpt:
            "Very good attention from the first contact. The trip was perfect and the hotels were excellent.",
          author: "Ana Garcia",
          date: "October 5",
          verified: true,
          byInvitation: false,
        },
        {
          id: 5,
          rating: 5,
          title: "First class experience",
          excerpt:
            "The whole process was very easy. The Trips Europa team took care of everything and we could enjoy worry-free.",
          author: "Luis Eduardo Ruiz",
          date: "September 22",
          verified: true,
          byInvitation: false,
        },
      ] as Review[],
    },
    pt: {
      excellent: "Excelente",
      basedOn: "Com base em 28.547 avaliacoes",
      ourReviews: "Nossas avaliacoes favoritas",
      byInvitation: "Por convite",
      verified: "Verificada",
      reviews: [
        {
          id: 1,
          rating: 5,
          title: "Viajar com Trips Europa significa seguranca",
          excerpt:
            "Viajar com Trips Europa significa profissionalismo, seguranca e excelencia. Tudo foi perfeitamente organizado.",
          author: "Carlos Martinez",
          date: "15 dezembro",
          verified: false,
          byInvitation: true,
        },
        {
          id: 2,
          rating: 5,
          title: "Uma viagem espetacular para a Italia",
          excerpt:
            "Nossa viagem este ano foi para Italia e Grecia. Ja conheciamos Trips Europa do ano passado e confiamos neles novamente.",
          author: "Maria Fernanda Lopez",
          date: "28 novembro",
          verified: false,
          byInvitation: true,
        },
        {
          id: 3,
          rating: 4,
          title: "Viagem inesquecivel pela Europa",
          excerpt:
            "Posso dizer que foi uma viagem inesquecivel. Desde o minuto zero a equipe estava atenta a todos os detalhes.",
          author: "Roberto Sanchez Perez",
          date: "10 novembro",
          verified: false,
          byInvitation: true,
        },
        {
          id: 4,
          rating: 5,
          title: "Muito bom atendimento ao cliente",
          excerpt:
            "Muito boa atencao desde o primeiro contato. A viagem saiu perfeita e os hoteis foram excelentes.",
          author: "Ana Garcia",
          date: "5 outubro",
          verified: true,
          byInvitation: false,
        },
        {
          id: 5,
          rating: 5,
          title: "Experiencia de primeira classe",
          excerpt:
            "Todo o processo foi muito facil. A equipe da Trips Europa cuidou de tudo e pudemos aproveitar sem preocupacoes.",
          author: "Luis Eduardo Ruiz",
          date: "22 setembro",
          verified: true,
          byInvitation: false,
        },
      ] as Review[],
    },
  };

  const c = content[language as keyof typeof content] || content.es;

  const renderStars = (rating: number) => (
    <div
      className="flex gap-0.5"
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "fill-[#00b67a] text-[#00b67a]"
              : "fill-gray-200 text-gray-200"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );

  return (
    <section
      className="py-16 bg-gray-50"
      aria-labelledby="trustpilot-heading"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex gap-0.5" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-[#00b67a] text-[#00b67a]"
                  aria-hidden="true"
                />
              ))}
            </div>
            <h2
              id="trustpilot-heading"
              className="text-2xl font-bold text-gray-900"
            >
              {c.excellent}
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-2">{c.basedOn}</p>
          <h3 className="text-xl font-semibold text-gray-800">
            {c.ourReviews}
          </h3>
        </div>

        {/* Reviews grid - no carousel to avoid forced reflow */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label={c.ourReviews}
        >
          {c.reviews.slice(0, 3).map((review) => (
            <Card
              key={review.id}
              className="p-5 flex flex-col gap-3 bg-white shadow-sm hover:shadow-md transition-shadow"
              role="listitem"
            >
              <div className="flex items-center justify-between">
                {renderStars(review.rating)}
                {review.verified ? (
                  <Badge
                    variant="outline"
                    className="text-xs flex items-center gap-1 text-green-700 border-green-300"
                  >
                    <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                    {c.verified}
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-xs text-blue-700 border-blue-300"
                  >
                    {c.byInvitation}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                {review.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                {review.excerpt}
              </p>
              <p className="text-xs text-gray-400">
                <span className="font-medium text-gray-700">
                  {review.author}
                </span>{" "}
                &mdash; {review.date}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
