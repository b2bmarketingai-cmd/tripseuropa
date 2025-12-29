import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

const BLOG_IMAGE_1 = "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=600&auto=format&fit=crop";
const BLOG_IMAGE_2 = "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=70&w=600&auto=format&fit=crop";
const BLOG_IMAGE_3 = "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=70&w=600&auto=format&fit=crop";

const TRAVELER_STORIES = [
  {
    id: 1,
    image: BLOG_IMAGE_1,
    title: {
      es: "Mi primera vez en Paris: Un sueno hecho realidad",
      en: "My first time in Paris: A dream come true"
    },
    excerpt: {
      es: "Despues de anos soñando con la Torre Eiffel, finalmente pude verla con mis propios ojos. La experiencia con Trips Europa supero todas mis expectativas...",
      en: "After years of dreaming about the Eiffel Tower, I was finally able to see it with my own eyes. The experience with Trips Europa exceeded all my expectations..."
    },
    author: "Maria Gonzalez",
    location: "Bogota, Colombia",
    date: "28 Dic 2024",
    readTime: 8,
    category: { es: "Experiencias", en: "Experiences" }
  },
  {
    id: 2,
    image: BLOG_IMAGE_2,
    title: {
      es: "Roma en familia: Consejos para viajar con niños",
      en: "Rome with family: Tips for traveling with children"
    },
    excerpt: {
      es: "Viajar con tres niños a Europa parecia imposible hasta que descubrimos los paquetes familiares de Trips Europa. El Coliseo fue el momento favorito de todos...",
      en: "Traveling with three children to Europe seemed impossible until we discovered Trips Europa's family packages. The Colosseum was everyone's favorite moment..."
    },
    author: "Carlos Mendez",
    location: "Ciudad de Mexico",
    date: "25 Dic 2024",
    readTime: 6,
    category: { es: "Viajes Familiares", en: "Family Trips" }
  },
  {
    id: 3,
    image: BLOG_IMAGE_3,
    title: {
      es: "Amsterdam en bicicleta: La mejor forma de explorar",
      en: "Amsterdam by bike: The best way to explore"
    },
    excerpt: {
      es: "Nunca habia estado en una ciudad tan amigable con las bicicletas. El tour incluido por los canales fue magico, especialmente al atardecer...",
      en: "I had never been in such a bike-friendly city. The included canal tour was magical, especially at sunset..."
    },
    author: "Ana Paula Silva",
    location: "Sao Paulo, Brasil",
    date: "22 Dic 2024",
    readTime: 5,
    category: { es: "Aventuras", en: "Adventures" }
  },
];

export function TravelerStories() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  return (
    <section className="py-24 bg-white" data-testid="section-traveler-stories">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <Badge className="mb-4" data-testid="badge-stories">
              {language === "es" ? "Blog" : "Blog"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-accent" data-testid="text-stories-title">
              {language === "es" ? "Historias de Viajeros" : "Traveler Stories"}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl" data-testid="text-stories-subtitle">
              {language === "es" 
                ? "Descubre las experiencias de quienes ya vivieron su sueno europeo"
                : "Discover the experiences of those who already lived their European dream"}
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="gap-2" data-testid="button-view-all-stories">
              {language === "es" ? "Ver todas las historias" : "View all stories"} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAVELER_STORIES.map((story, index) => (
            <article 
              key={story.id}
              className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              data-testid={`card-story-${index}`}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  data-testid={`img-story-${index}`}
                />
                <Badge 
                  className="absolute top-4 left-4 bg-accent text-primary"
                  data-testid={`badge-story-category-${index}`}
                >
                  {story.category[lang]}
                </Badge>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1" data-testid={`text-story-date-${index}`}>
                    {story.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                  <span className="flex items-center gap-1" data-testid={`text-story-readtime-${index}`}>
                    <Clock className="w-3 h-3" /> {story.readTime} min
                  </span>
                </div>

                <h3 
                  className="text-xl font-bold text-primary mb-3 font-display line-clamp-2 group-hover:text-accent transition-colors"
                  data-testid={`text-story-title-${index}`}
                >
                  {story.title[lang]}
                </h3>

                <p 
                  className="text-muted-foreground text-sm line-clamp-3 mb-4"
                  data-testid={`text-story-excerpt-${index}`}
                >
                  {story.excerpt[lang]}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-primary" data-testid={`text-story-author-${index}`}>
                      {story.author}
                    </p>
                    <p className="text-xs text-muted-foreground" data-testid={`text-story-location-${index}`}>
                      {story.location}
                    </p>
                  </div>
                </div>

                <Link href="/blog">
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-accent hover:text-accent/80 hover:bg-accent/5"
                    data-testid={`button-read-story-${index}`}
                  >
                    {language === "es" ? "Leer mas" : "Read more"} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
