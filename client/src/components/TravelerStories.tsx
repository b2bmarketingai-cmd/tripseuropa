import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";

const STORIES = [
  {
    id: 1,
    destination: { es: "Paris", en: "Paris" },
    location: { es: "Paris, Francia", en: "Paris, France" },
    title: { es: "Paris, Un Sueno Hecho Realidad", en: "Paris, A Dream Come True" },
    story: {
      es: "En Paris no paramos en todo el viaje. Teniamos la agenda completa de actividades como visitar la Torre Eiffel, el Louvre y pasear por los Campos Eliseos. Una experiencia que recordaremos para siempre.",
      en: "In Paris we didn't stop the whole trip. We had a full schedule of activities like visiting the Eiffel Tower, the Louvre and walking along the Champs-Elysees. An experience we will remember forever."
    },
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop",
    author: "Maria Gonzalez",
    authorCity: "Ciudad de Mexico",
    rating: 5,
  },
  {
    id: 2,
    destination: { es: "Roma", en: "Rome" },
    location: { es: "Roma, Italia", en: "Rome, Italy" },
    title: { es: "Roma, La Ciudad Eterna", en: "Rome, The Eternal City" },
    story: {
      es: "Roma supero todas mis expectativas. El Coliseo, el Vaticano, las plazas y la comida italiana. Cada rincon tiene historia y magia. Trips Europa organizo todo perfectamente.",
      en: "Rome exceeded all my expectations. The Colosseum, the Vatican, the squares and Italian food. Every corner has history and magic. Trips Europa organized everything perfectly."
    },
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop",
    author: "Carlos Rodriguez",
    authorCity: "Bogota",
    rating: 5,
  },
  {
    id: 3,
    destination: { es: "Barcelona", en: "Barcelona" },
    location: { es: "Barcelona, España", en: "Barcelona, Spain" },
    title: { es: "Barcelona, Arte Y Playa", en: "Barcelona, Art And Beach" },
    story: {
      es: "Barcelona nos enamoro con su arquitectura de Gaudi, Las Ramblas y sus playas. El tour por la Sagrada Familia fue increible. Un destino que combina cultura, historia y diversion.",
      en: "Barcelona captivated us with its Gaudi architecture, Las Ramblas and its beaches. The Sagrada Familia tour was incredible. A destination that combines culture, history and fun."
    },
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&auto=format&fit=crop",
    author: "Ana Martinez",
    authorCity: "Lima",
    rating: 5,
  },
  {
    id: 4,
    destination: { es: "Santorini", en: "Santorini" },
    location: { es: "Santorini, Grecia", en: "Santorini, Greece" },
    title: { es: "Santorini, Paraiso En El Egeo", en: "Santorini, Paradise In The Aegean" },
    story: {
      es: "Las puestas de sol en Santorini son magicas. Las casas blancas con cupulas azules, el mar cristalino y la hospitalidad griega hicieron de este viaje algo inolvidable.",
      en: "The sunsets in Santorini are magical. The white houses with blue domes, the crystal-clear sea and Greek hospitality made this trip unforgettable."
    },
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&auto=format&fit=crop",
    author: "Roberto Silva",
    authorCity: "Sao Paulo",
    rating: 5,
  },
  {
    id: 5,
    destination: { es: "Amsterdam", en: "Amsterdam" },
    location: { es: "Amsterdam, Paises Bajos", en: "Amsterdam, Netherlands" },
    title: { es: "Amsterdam, Canales Y Cultura", en: "Amsterdam, Canals And Culture" },
    story: {
      es: "Recorrer Amsterdam en bicicleta fue una experiencia unica. Los canales, los museos como el Van Gogh y el ambiente relajado de la ciudad nos conquistaron completamente.",
      en: "Exploring Amsterdam by bike was a unique experience. The canals, museums like Van Gogh and the relaxed atmosphere of the city completely won us over."
    },
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&auto=format&fit=crop",
    author: "Laura Fernandez",
    authorCity: "Buenos Aires",
    rating: 5,
  },
  {
    id: 6,
    destination: { es: "Londres", en: "London" },
    location: { es: "Londres, Reino Unido", en: "London, United Kingdom" },
    title: { es: "Londres, Tradicion Y Modernidad", en: "London, Tradition And Modernity" },
    story: {
      es: "Londres mezcla perfectamente lo tradicional con lo moderno. El Palacio de Buckingham, el Big Ben y los museos gratuitos nos dejaron maravillados. Una ciudad que hay que visitar.",
      en: "London perfectly blends traditional with modern. Buckingham Palace, Big Ben and free museums left us amazed. A city you must visit."
    },
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop",
    author: "Pedro Gomez",
    authorCity: "Santiago",
    rating: 5,
  },
];

export function TravelerStories() {
  const { language } = useI18n();
  const lang = language as "es" | "en";
  const [currentIndex, setCurrentIndex] = useState(0);

  const content = {
    es: {
      title: "Historias De Nuestros Viajeros",
      subtitle: "Creamos recuerdos inolvidables, viajero a viajero",
    },
    en: {
      title: "Stories From Our Travelers",
      subtitle: "We create unforgettable memories, traveler by traveler",
    },
  };

  const c = content[lang];
  const story = STORIES[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? STORIES.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === STORIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-background" data-testid="section-traveler-stories">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3" data-testid="text-stories-title">
            {c.title}
          </h2>
          <p className="text-muted-foreground">{c.subtitle}</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Button
            size="icon"
            variant="outline"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 rounded-full"
            onClick={goToPrevious}
            data-testid="button-story-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="grid md:grid-cols-2 gap-8 items-center px-8 md:px-0">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <img
                src={story.image}
                alt={story.destination[lang]}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm">{story.location[lang]}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{story.destination[lang]}</span>
              </div>

              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                {story.title[lang]}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {story.story[lang]}
              </p>

              <div className="flex items-center gap-1 pt-2">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>

              <div className="pt-2">
                <p className="font-bold text-foreground">{story.author}</p>
                <p className="text-sm text-muted-foreground">{story.authorCity}</p>
              </div>
            </div>
          </div>

          <Button
            size="icon"
            variant="outline"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 rounded-full"
            onClick={goToNext}
            data-testid="button-story-next"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {STORIES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-foreground"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to story ${index + 1}`}
              data-testid={`button-story-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
