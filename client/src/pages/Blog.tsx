import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, Search } from "lucide-react";
import { useState, useMemo } from "react";

const BLOG_POSTS = [
  {
    id: "visa-schengen",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Guia Completa: Visa Schengen para Colombianos 2025", en: "Complete Guide: Schengen Visa for Colombians 2025" },
    excerpt: { es: "Todo lo que necesitas saber sobre los requisitos, documentos y proceso para obtener tu visa Schengen desde Colombia.", en: "Everything you need to know about requirements, documents and process to get your Schengen visa from Colombia." },
    category: { es: "Documentos", en: "Documents" },
    date: "28 Dic 2024",
    readTime: 8,
    content: { 
      es: "La visa Schengen es fundamental para viajar a Europa. En esta guía completa te explicamos paso a paso cómo obtenerla desde Colombia...", 
      en: "The Schengen visa is essential for traveling to Europe. In this complete guide we explain step by step how to obtain it from Colombia..." 
    }
  },
  {
    id: "paris-luxury",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
    title: { es: "10 Experiencias de Lujo Imperdibles en Paris", en: "10 Luxury Experiences Not to Miss in Paris" },
    excerpt: { es: "Desde cenas en la Torre Eiffel hasta cruceros privados por el Sena. Descubre las mejores experiencias de lujo en la ciudad luz.", en: "From dinners at the Eiffel Tower to private cruises on the Seine. Discover the best luxury experiences in the city of light." },
    category: { es: "Lujo", en: "Luxury" },
    date: "25 Dic 2024",
    readTime: 6,
    content: { 
      es: "Paris es sinónimo de lujo y elegancia. Te presentamos 10 experiencias exclusivas que harán tu viaje inolvidable...", 
      en: "Paris is synonymous with luxury and elegance. We present 10 exclusive experiences that will make your trip unforgettable..." 
    }
  },
  {
    id: "madrid-barcelona",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Madrid vs Barcelona: Cual Elegir para tu Primer Viaje?", en: "Madrid vs Barcelona: Which One to Choose for Your First Trip?" },
    excerpt: { es: "Comparamos ambas ciudades para ayudarte a decidir tu proximo destino. Diferencias, ventajas y por que elegir cada una.", en: "We compare both cities to help you decide your next destination. Differences, advantages and why to choose each one." },
    category: { es: "Destinos", en: "Destinations" },
    date: "22 Dic 2024",
    readTime: 7,
    content: { 
      es: "¿Duda entre Madrid y Barcelona? Ambas son ciudades increibles pero con personalidades muy diferentes. Descubre cual se adapta mejor a ti...", 
      en: "Torn between Madrid and Barcelona? Both are incredible cities but with very different personalities. Discover which one suits you best..." 
    }
  },
  {
    id: "rome-hotels",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Los Mejores Hoteles Boutique de Roma", en: "The Best Boutique Hotels in Rome" },
    excerpt: { es: "Alojamientos con encanto que haran tu experiencia italiana inolvidable. Ubicaciones privilegiadas y servicio excepcional.", en: "Charming accommodations that will make your Italian experience unforgettable. Privileged locations and exceptional service." },
    category: { es: "Lujo", en: "Luxury" },
    date: "20 Dic 2024",
    readTime: 5,
    content: { 
      es: "Roma merece un alojamiento especial. Te recomendamos los mejores hoteles boutique con ese toque de elegancia italiana...", 
      en: "Rome deserves special accommodation. We recommend the best boutique hotels with that touch of Italian elegance..." 
    }
  },
  {
    id: "travel-insurance",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Por Que es Obligatorio el Seguro de Viaje para Europa", en: "Why Travel Insurance is Mandatory for Europe" },
    excerpt: { es: "Entiende los requisitos del seguro Schengen y como elegir la mejor cobertura para tu viaje tranquilo.", en: "Understand Schengen insurance requirements and how to choose the best coverage for your peaceful trip." },
    category: { es: "Consejos", en: "Tips" },
    date: "18 Dic 2024",
    readTime: 5,
    content: { 
      es: "El seguro de viaje es obligatorio para el Schengen. Te explicamos que te cubre y como elegir el mejor plan...", 
      en: "Travel insurance is mandatory for Schengen. We explain what it covers and how to choose the best plan..." 
    }
  },
  {
    id: "esim-europe",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    title: { es: "eSIM en Europa: La Mejor Forma de Estar Conectado", en: "eSIM in Europe: The Best Way to Stay Connected" },
    excerpt: { es: "Olvida el roaming costoso. Descubre como usar eSIM para internet ilimitado en tu viaje europeo.", en: "Forget expensive roaming. Discover how to use eSIM for unlimited internet on your European trip." },
    category: { es: "Tecnologia", en: "Technology" },
    date: "15 Dic 2024",
    readTime: 4,
    content: { 
      es: "Las eSIM son la solucion perfecta para mantenerse conectado sin los costos del roaming internacional...", 
      en: "eSIMs are the perfect solution to stay connected without international roaming costs..." 
    }
  }
];

export default function Blog() {
  const { language } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(BLOG_POSTS.map(p => p.category[language])));
    return cats;
  }, [language]);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = !selectedCategory || post.category[language] === selectedCategory;
      const matchesSearch = !searchQuery || 
        post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, language]);

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
            {language === "es" ? "Inspírate para tu próximo viaje" : "Inspire yourself for your next trip"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto" data-testid="text-blog-subtitle">
            {language === "es" 
              ? "Guías, consejos y experiencias para planificar tu viaje perfecto a Europa" 
              : "Guides, tips and experiences to plan your perfect trip to Europe"}
          </p>
        </div>
      </section>

      <section className="py-16 border-b" data-testid="section-blog-filters">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={language === "es" ? "Buscar artículos..." : "Search articles..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  data-testid="input-blog-search"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center md:justify-end">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                data-testid="button-category-all"
              >
                {language === "es" ? "Todos" : "All"}
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  data-testid={`button-category-${cat.toLowerCase()}`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" data-testid="section-blog-grid">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {language === "es" ? "No hay artículos que coincidan con tu búsqueda" : "No articles match your search"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-blog-${post.id}`}>
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <img 
                      src={post.image} 
                      alt={post.title[language]} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent text-primary" data-testid={`badge-category-${post.id}`}>{post.category[language]}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span data-testid={`text-date-${post.id}`}>{post.date}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span data-testid={`text-readtime-${post.id}`}>{post.readTime} min</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-display font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors" data-testid={`text-title-${post.id}`}>
                      {post.title[language]}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3" data-testid={`text-excerpt-${post.id}`}>{post.excerpt[language]}</p>
                    
                    <Button className="w-full gap-2" data-testid={`button-blog-${post.id}`}>
                      {language === "es" ? "Leer más" : "Read more"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
