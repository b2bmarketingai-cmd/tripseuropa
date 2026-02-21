import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { FloatingContactButtons } from "@/components/support";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, MapPin } from "lucide-react";

import carolinaImg from "@assets/testimonial-carolina-128.png";
import robertoImg from "@assets/testimonial-roberto-128.png";
import anaMariaImg from "@assets/testimonial-ana-128.png";
import miguelImg from "@assets/testimonial-miguel-128.png";
import lauraImg from "@assets/testimonial-laura-128.png";
import pedroImg from "@assets/testimonial-pedro-128.png";

const TESTIMONIALS = [
  {
    name: "Carolina Mendez",
    location: { es: "Bogotá, Colombia", en: "Bogota, Colombia" },
    trip: { es: "Luna de Miel en Italia", en: "Honeymoon in Italy" },
    text: { 
      es: "Nuestra luna de miel fue absolutamente perfecta. Desde el momento en que los contactamos, María y su equipo se encargaron de cada detalle. Los hoteles eran increíbles, los tours privados nos permitieron evitar las multitudes, y las recomendaciones de restaurantes fueron exquisitas. Sin duda, superaron todas nuestras expectativas.",
      en: "Our honeymoon was absolutely perfect. From the moment we contacted them, Maria and her team took care of every detail. The hotels were incredible, the private tours allowed us to avoid crowds, and the restaurant recommendations were exquisite. They definitely exceeded all our expectations."
    },
    rating: 5,
    image: carolinaImg
  },
  {
    name: "Roberto González",
    location: { es: "Medellín, Colombia", en: "Medellin, Colombia" },
    trip: { es: "Tour por 5 países", en: "5 Country Tour" },
    text: { 
      es: "Viajé con mi familia (4 personas) por Francia, Suiza, Italia, Austria y Alemania. La logística fue impecable, todos los traslados puntuales, hoteles céntricos y de excelente calidad. Lo mejor fue el soporte 24/7, siempre estuvieron disponibles cuando los necesitamos.",
      en: "I traveled with my family (4 people) through France, Switzerland, Italy, Austria and Germany. The logistics were impeccable, all transfers on time, hotels centrally located and of excellent quality. The best part was the 24/7 support, they were always available when we needed them."
    },
    rating: 5,
    image: robertoImg
  },
  {
    name: "Ana María Torres",
    location: { es: "Cali, Colombia", en: "Cali, Colombia" },
    trip: { es: "Escapada a París", en: "Paris Getaway" },
    text: { 
      es: "Siempre soñé con conocer París y Trips Europa hizo ese sueño realidad. Me ayudaron con todo el proceso de visa (que parecía complicado) y planificaron un itinerario perfecto de 7 días. Cada experiencia fue mágica, desde subir a la Torre Eiffel hasta los paseos por Montmartre.",
      en: "I always dreamed of visiting Paris and Trips Europa made that dream come true. They helped me with the entire visa process (which seemed complicated) and planned a perfect 7-day itinerary. Every experience was magical, from climbing the Eiffel Tower to walks through Montmartre."
    },
    rating: 5,
    image: anaMariaImg
  },
  {
    name: "Miguel Hernández",
    location: { es: "Barranquilla, Colombia", en: "Barranquilla, Colombia" },
    trip: { es: "Crucero Mediterráneo", en: "Mediterranean Cruise" },
    text: { 
      es: "El crucero por el Mediterráneo fue espectacular. La asesoría para elegir el mejor camarote, las excursiones en cada puerto, todo fue primera clase. Trips Europa negoció un upgrade que no esperábamos. Totalmente recomendados para viajes de lujo.",
      en: "The Mediterranean cruise was spectacular. The advice for choosing the best cabin, the excursions at each port, everything was first class. Trips Europa negotiated an upgrade we didn't expect. Totally recommended for luxury travel."
    },
    rating: 5,
    image: miguelImg
  },
  {
    name: "Laura Sánchez",
    location: { es: "Caracas, Venezuela", en: "Caracas, Venezuela" },
    trip: { es: "Tour de Castillos en Alemania", en: "Castle Tour in Germany" },
    text: { 
      es: "Como venezolana, tenía muchas dudas sobre el proceso de visa y viaje. El equipo de Trips Europa me guió paso a paso, resolviendo todas mis preguntas con paciencia. El tour por los castillos de Baviera fue un cuento de hadas hecho realidad.",
      en: "As a Venezuelan, I had many doubts about the visa and travel process. The Trips Europa team guided me step by step, answering all my questions with patience. The tour of Bavarian castles was a fairy tale come true."
    },
    rating: 5,
    image: lauraImg
  },
  {
    name: "Pedro Ramírez",
    location: { es: "Bucaramanga, Colombia", en: "Bucaramanga, Colombia" },
    trip: { es: "Viaje de negocios + turismo", en: "Business + tourism trip" },
    text: { 
      es: "Necesitaba combinar una conferencia en Londres con vacaciones familiares. Trips Europa organizó todo perfectamente: vuelos, hoteles ejecutivos para mis días de trabajo y luego un hotel familiar para las vacaciones. Increíble atención al detalle.",
      en: "I needed to combine a conference in London with family vacation. Trips Europa organized everything perfectly: flights, executive hotels for my work days and then a family hotel for the vacation. Incredible attention to detail."
    },
    rating: 5,
    image: pedroImg
  }
];

export default function Testimonials() {
  const { language } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEOHead title="Testimonios de Viajeros - Trips Europa" description="Lee las experiencias de viajeros latinoamericanos que viajaron a Europa con Trips Europa." />
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-testimonials-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=60&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-testimonials">
            {language === "es" ? "Testimonios" : "Testimonials"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-testimonials-title">
            {language === "es" ? "Lo Que Dicen Nuestros Viajeros" : "What Our Travelers Say"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8" data-testid="text-testimonials-subtitle">
            {language === "es" 
              ? "Más de 5,000 viajeros felices nos respaldan. Lee sus experiencias" 
              : "More than 5,000 happy travelers support us. Read their experiences"}
          </p>
          <a href="https://api.whatsapp.com/send?phone=34611105448&text=Hola!%20Quiero%20planificar%20mi%20viaje%20a%20Europa" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90" data-testid="button-hero-whatsapp">
              {language === "es" ? "Solicita tu Cotización" : "Get a quote"}
            </Button>
          </a>
        </div>
      </section>

      <section className="py-20" data-testid="section-testimonials-grid">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="relative" data-testid={`card-testimonial-${index}`}>
                <CardContent className="p-6">
                  <Quote className="w-10 h-10 text-accent/20 absolute top-4 right-4" />
                  
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location[language]}
                      </div>
                    </div>
                  </div>

                  <Badge variant="secondary" className="mb-3">{testimonial.trip[language]}</Badge>
                  
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    "{testimonial.text[language]}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent/10" data-testid="section-testimonials-stats">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-display font-bold text-primary mb-2">5,000+</p>
              <p className="text-muted-foreground">{language === "es" ? "Viajeros felices" : "Happy travelers"}</p>
            </div>
            <div>
              <p className="text-4xl font-display font-bold text-primary mb-2">4.9</p>
              <p className="text-muted-foreground">{language === "es" ? "Calificacion promedio" : "Average rating"}</p>
            </div>
            <div>
              <p className="text-4xl font-display font-bold text-primary mb-2">98%</p>
              <p className="text-muted-foreground">{language === "es" ? "Nos recomiendan" : "Recommend us"}</p>
            </div>
            <div>
              <p className="text-4xl font-display font-bold text-primary mb-2">85%</p>
              <p className="text-muted-foreground">{language === "es" ? "Clientes recurrentes" : "Returning customers"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-testimonials-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {language === "es" ? "Se Parte de Nuestra Historia" : "Be Part of Our Story"}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {language === "es" 
              ? "Unete a miles de viajeros satisfechos y vive tu propia experiencia europea" 
              : "Join thousands of satisfied travelers and live your own European experience"}
          </p>
          <a href="https://api.whatsapp.com/send?phone=34611105448&text=Hola!%20Quiero%20planificar%20mi%20viaje%20a%20Europa" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90" data-testid="button-testimonials-contact">
              {language === "es" ? "Planificar mi viaje" : "Plan my trip"}
            </Button>
          </a>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
