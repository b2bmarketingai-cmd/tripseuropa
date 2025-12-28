import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, User } from "lucide-react";

const BLOG_POSTS = [
  {
    id: "visa-schengen",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=70&w=800&auto=format&fit=crop",
    title: { es: "Guia Completa: Visa Schengen para Colombianos 2025", en: "Complete Guide: Schengen Visa for Colombians 2025" },
    excerpt: { es: "Todo lo que necesitas saber sobre los requisitos, documentos y proceso para obtener tu visa Schengen desde Colombia.", en: "Everything you need to know about requirements, documents and process to get your Schengen visa from Colombia." },
    category: { es: "Visas", en: "Visas" },
    date: "28 Dic 2024",
    readTime: 8,
    author: "Maria Rodriguez"
  },
  {
    id: "paris-tips",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=800&auto=format&fit=crop",
    title: { es: "10 Secretos de Paris que Solo los Locales Conocen", en: "10 Paris Secrets Only Locals Know" },
    excerpt: { es: "Descubre los rincones mas autenticos de la Ciudad Luz, lejos de las multitudes turisticas.", en: "Discover the most authentic corners of the City of Light, away from tourist crowds." },
    category: { es: "Destinos", en: "Destinations" },
    date: "25 Dic 2024",
    readTime: 6,
    author: "Carlos Martinez"
  },
  {
    id: "madrid-gastronomy",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=70&w=800&auto=format&fit=crop",
    title: { es: "Ruta Gastronomica por Madrid: Los Mejores Restaurantes", en: "Gastronomic Route through Madrid: The Best Restaurants" },
    excerpt: { es: "Desde tapas tradicionales hasta alta cocina, explora la deliciosa escena culinaria madrilena.", en: "From traditional tapas to haute cuisine, explore Madrid's delicious culinary scene." },
    category: { es: "Gastronomia", en: "Gastronomy" },
    date: "22 Dic 2024",
    readTime: 7,
    author: "Ana Gonzalez"
  },
  {
    id: "rome-history",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=70&w=800&auto=format&fit=crop",
    title: { es: "Roma en 3 Dias: Itinerario Perfecto para Principiantes", en: "Rome in 3 Days: Perfect Itinerary for Beginners" },
    excerpt: { es: "Maximiza tu tiempo en la Ciudad Eterna con este itinerario cuidadosamente planificado.", en: "Maximize your time in the Eternal City with this carefully planned itinerary." },
    category: { es: "Itinerarios", en: "Itineraries" },
    date: "20 Dic 2024",
    readTime: 5,
    author: "Pedro Sanchez"
  },
  {
    id: "travel-insurance",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=70&w=800&auto=format&fit=crop",
    title: { es: "Por Que es Obligatorio el Seguro de Viaje para Europa", en: "Why Travel Insurance is Mandatory for Europe" },
    excerpt: { es: "Entiende los requisitos del seguro Schengen y como elegir la mejor cobertura para tu viaje.", en: "Understand Schengen insurance requirements and how to choose the best coverage for your trip." },
    category: { es: "Consejos", en: "Tips" },
    date: "18 Dic 2024",
    readTime: 5,
    author: "Laura Torres"
  },
  {
    id: "esim-europe",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=70&w=800&auto=format&fit=crop",
    title: { es: "eSIM en Europa: La Mejor Forma de Estar Conectado", en: "eSIM in Europe: The Best Way to Stay Connected" },
    excerpt: { es: "Olvida el roaming costoso. Descubre como usar eSIM para internet ilimitado en tu viaje europeo.", en: "Forget expensive roaming. Discover how to use eSIM for unlimited internet on your European trip." },
    category: { es: "Tecnologia", en: "Technology" },
    date: "15 Dic 2024",
    readTime: 4,
    author: "Diego Hernandez"
  }
];

export default function Blog() {
  const { language } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-blog-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=60&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-blog">
            {language === "es" ? "Blog de Viajes" : "Travel Blog"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-blog-title">
            {language === "es" ? "Inspiracion y Consejos" : "Inspiration & Tips"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto" data-testid="text-blog-subtitle">
            {language === "es" 
              ? "Guias, consejos y experiencias para planificar tu viaje perfecto a Europa" 
              : "Guides, tips and experiences to plan your perfect trip to Europe"}
          </p>
        </div>
      </section>

      <section className="py-20" data-testid="section-blog-grid">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <Card key={post.id} className="group overflow-hidden" data-testid={`card-blog-${post.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title[language]} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge className="absolute top-4 left-4 bg-accent text-primary">{post.category[language]}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime} min
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-display font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title[language]}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt[language]}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <Button variant="ghost" size="sm" data-testid={`button-blog-${post.id}`}>
                      {language === "es" ? "Leer mas" : "Read more"}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-blog-newsletter">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            {language === "es" ? "Suscribete a Nuestro Newsletter" : "Subscribe to Our Newsletter"}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {language === "es" 
              ? "Recibe las ultimas guias, ofertas exclusivas y consejos de viaje directamente en tu correo" 
              : "Receive the latest guides, exclusive offers and travel tips directly in your email"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder={language === "es" ? "Tu correo electronico" : "Your email address"}
              className="flex-1 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-accent"
              data-testid="input-newsletter-email"
            />
            <Button className="bg-accent text-primary hover:bg-accent/90" data-testid="button-newsletter-subscribe">
              {language === "es" ? "Suscribirse" : "Subscribe"}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
