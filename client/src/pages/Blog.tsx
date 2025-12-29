import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, Search, TrendingUp, BookOpen, Plane, MapPin, CreditCard, Shield, Smartphone, Heart, Camera, Utensils } from "lucide-react";
import { useState, useMemo } from "react";

const BLOG_CATEGORIES = [
  { id: "all", label: { es: "Todos", en: "All" }, icon: BookOpen },
  { id: "destinos", label: { es: "Destinos", en: "Destinations" }, icon: MapPin },
  { id: "planificacion", label: { es: "Planificacion", en: "Planning" }, icon: Plane },
  { id: "lujo", label: { es: "Lujo", en: "Luxury" }, icon: Heart },
  { id: "dinero", label: { es: "Dinero", en: "Money" }, icon: CreditCard },
  { id: "consejos", label: { es: "Consejos", en: "Tips" }, icon: TrendingUp },
  { id: "gastronomia", label: { es: "Gastronomia", en: "Gastronomy" }, icon: Utensils },
];

const BLOG_POSTS = [
  {
    id: "visa-schengen-colombia-2025",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Guia Completa: Visa Schengen para Colombianos 2025", en: "Complete Guide: Schengen Visa for Colombians 2025" },
    excerpt: { es: "Requisitos actualizados, documentos necesarios, costo, tiempo de tramite y consejos para aprobar tu visa Schengen desde Colombia.", en: "Updated requirements, necessary documents, cost, processing time and tips to get your Schengen visa from Colombia approved." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning" },
    date: "28 Dic 2024",
    readTime: 12,
    featured: true,
    keywords: ["visa schengen colombia", "requisitos visa europa", "visa schengen 2025"],
  },
  {
    id: "paris-5-dias-guia",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Paris en 5 Dias: Itinerario Perfecto para Colombianos", en: "Paris in 5 Days: Perfect Itinerary for Colombians" },
    excerpt: { es: "Torre Eiffel, Louvre, Versalles, Montmartre y mas. El itinerario dia a dia para aprovechar Paris al maximo.", en: "Eiffel Tower, Louvre, Versailles, Montmartre and more. The day by day itinerary to make the most of Paris." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "26 Dic 2024",
    readTime: 10,
    featured: true,
    keywords: ["paris 5 dias", "itinerario paris", "que hacer en paris"],
  },
  {
    id: "presupuesto-viaje-europa-2025",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Cuanto Cuesta Viajar a Europa en 2025? Presupuesto Real", en: "How Much Does It Cost to Travel to Europe in 2025? Real Budget" },
    excerpt: { es: "Desglose completo: vuelos, hoteles, comida, transporte y actividades. Presupuesto para 7, 14 y 21 dias.", en: "Complete breakdown: flights, hotels, food, transport and activities. Budget for 7, 14 and 21 days." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money" },
    date: "24 Dic 2024",
    readTime: 15,
    featured: true,
    keywords: ["presupuesto europa", "cuanto cuesta europa", "viaje europa precio"],
  },
  {
    id: "hoteles-lujo-paris",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop",
    title: { es: "10 Hoteles de Lujo Imperdibles en Paris 2025", en: "10 Must-Stay Luxury Hotels in Paris 2025" },
    excerpt: { es: "Ritz, Four Seasons, Le Bristol y mas. Los hoteles mas exclusivos de Paris con vista a la Torre Eiffel.", en: "Ritz, Four Seasons, Le Bristol and more. The most exclusive Paris hotels with Eiffel Tower views." },
    category: "lujo",
    categoryLabel: { es: "Lujo", en: "Luxury" },
    date: "22 Dic 2024",
    readTime: 8,
    featured: false,
    keywords: ["hoteles lujo paris", "mejores hoteles paris", "donde alojarse paris"],
  },
  {
    id: "madrid-vs-barcelona",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Madrid vs Barcelona: Cual Elegir para tu Primer Viaje?", en: "Madrid vs Barcelona: Which One to Choose for Your First Trip?" },
    excerpt: { es: "Comparativa completa: clima, costo, atracciones, gastronomia y ambiente. Te ayudamos a decidir.", en: "Complete comparison: weather, cost, attractions, gastronomy and atmosphere. We help you decide." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "20 Dic 2024",
    readTime: 9,
    featured: false,
    keywords: ["madrid o barcelona", "espana primer viaje", "madrid barcelona diferencias"],
  },
  {
    id: "seguro-viaje-europa",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Seguro de Viaje para Europa: Cual Elegir y Por Que es Obligatorio", en: "Travel Insurance for Europe: Which to Choose and Why It's Mandatory" },
    excerpt: { es: "Requisitos Schengen, coberturas necesarias, mejores companias y como reclamar si lo necesitas.", en: "Schengen requirements, necessary coverage, best companies and how to claim if you need it." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning" },
    date: "18 Dic 2024",
    readTime: 7,
    featured: false,
    keywords: ["seguro viaje europa", "seguro schengen", "seguro viaje obligatorio"],
  },
  {
    id: "roma-3-dias",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Roma en 3 Dias: Coliseo, Vaticano y Trastevere", en: "Rome in 3 Days: Colosseum, Vatican and Trastevere" },
    excerpt: { es: "Itinerario optimizado para ver lo mejor de Roma. Evita filas, mejores horarios y tips locales.", en: "Optimized itinerary to see the best of Rome. Skip lines, best times and local tips." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "16 Dic 2024",
    readTime: 8,
    featured: false,
    keywords: ["roma 3 dias", "que hacer en roma", "itinerario roma"],
  },
  {
    id: "vuelos-baratos-europa",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Como Conseguir Vuelos Baratos a Europa desde Colombia", en: "How to Get Cheap Flights to Europe from Colombia" },
    excerpt: { es: "Mejores epocas, aerolineas, buscadores y trucos para ahorrar hasta 40% en tus vuelos.", en: "Best times, airlines, search engines and tricks to save up to 40% on your flights." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money" },
    date: "14 Dic 2024",
    readTime: 10,
    featured: false,
    keywords: ["vuelos baratos europa", "pasajes europa", "vuelos colombia europa"],
  },
  {
    id: "restaurantes-michelin-paris",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Restaurantes Michelin en Paris: Guia para Latinoamericanos", en: "Michelin Restaurants in Paris: Guide for Latin Americans" },
    excerpt: { es: "Desde 2 hasta 3 estrellas. Reservas, dress code, precios y que esperar en una cena Michelin.", en: "From 2 to 3 stars. Reservations, dress code, prices and what to expect at a Michelin dinner." },
    category: "gastronomia",
    categoryLabel: { es: "Gastronomia", en: "Gastronomy" },
    date: "12 Dic 2024",
    readTime: 9,
    featured: false,
    keywords: ["restaurantes michelin paris", "cena lujo paris", "gastronomia paris"],
  },
  {
    id: "esim-europa-guia",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    title: { es: "eSIM en Europa: Internet Ilimitado sin Roaming", en: "eSIM in Europe: Unlimited Internet without Roaming" },
    excerpt: { es: "Mejores opciones de eSIM, como activarla, precios y por que es mejor que el roaming tradicional.", en: "Best eSIM options, how to activate it, prices and why it's better than traditional roaming." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips" },
    date: "10 Dic 2024",
    readTime: 6,
    featured: false,
    keywords: ["esim europa", "internet europa", "roaming europa"],
  },
  {
    id: "amsterdam-tulipanes",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Amsterdam y los Tulipanes: Mejor Epoca para Visitar", en: "Amsterdam and the Tulips: Best Time to Visit" },
    excerpt: { es: "Keukenhof, campos de tulipanes, canales y museos. Todo lo que necesitas para tu viaje.", en: "Keukenhof, tulip fields, canals and museums. Everything you need for your trip." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "8 Dic 2024",
    readTime: 7,
    featured: false,
    keywords: ["amsterdam tulipanes", "keukenhof", "cuando visitar amsterdam"],
  },
  {
    id: "luna-miel-europa",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Luna de Miel en Europa: 5 Destinos Romanticos", en: "Honeymoon in Europe: 5 Romantic Destinations" },
    excerpt: { es: "Paris, Santorini, Venecia, Costa Amalfitana y Suiza. Los destinos mas romanticos para parejas.", en: "Paris, Santorini, Venice, Amalfi Coast and Switzerland. The most romantic destinations for couples." },
    category: "lujo",
    categoryLabel: { es: "Lujo", en: "Luxury" },
    date: "6 Dic 2024",
    readTime: 8,
    featured: false,
    keywords: ["luna de miel europa", "destinos romanticos", "viaje parejas europa"],
  },
  {
    id: "que-empacar-europa",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Que Empacar para Europa: Checklist Completo", en: "What to Pack for Europe: Complete Checklist" },
    excerpt: { es: "Ropa, documentos, tecnologia y accesorios. Lista descargable para no olvidar nada.", en: "Clothes, documents, technology and accessories. Downloadable list so you don't forget anything." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips" },
    date: "4 Dic 2024",
    readTime: 6,
    featured: false,
    keywords: ["que empacar europa", "maleta europa", "checklist viaje"],
  },
  {
    id: "vinos-toscana",
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Ruta del Vino en Toscana: Guia Definitiva", en: "Wine Route in Tuscany: Definitive Guide" },
    excerpt: { es: "Chianti, Brunello, Montepulciano. Las mejores bodegas, tours y experiencias enologicas.", en: "Chianti, Brunello, Montepulciano. The best wineries, tours and wine experiences." },
    category: "gastronomia",
    categoryLabel: { es: "Gastronomia", en: "Gastronomy" },
    date: "2 Dic 2024",
    readTime: 10,
    featured: false,
    keywords: ["vinos toscana", "ruta vino italia", "bodegas toscana"],
  },
  {
    id: "transporte-europa",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Transporte en Europa: Trenes, Buses y Low Cost", en: "Transport in Europe: Trains, Buses and Low Cost" },
    excerpt: { es: "Eurail Pass, Flixbus, Ryanair. Como moverte por Europa de forma economica y eficiente.", en: "Eurail Pass, Flixbus, Ryanair. How to get around Europe economically and efficiently." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money" },
    date: "30 Nov 2024",
    readTime: 11,
    featured: false,
    keywords: ["transporte europa", "eurail pass", "como moverse europa"],
  },
];

export default function Blog() {
  const { language } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, language]);

  const featuredPosts = BLOG_POSTS.filter(p => p.featured);

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
            {language === "es" ? "Guias y Consejos para tu Viaje a Europa" : "Guides and Tips for Your Trip to Europe"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto" data-testid="text-blog-subtitle">
            {language === "es" 
              ? "Visa Schengen, presupuestos, itinerarios y experiencias reales de viajeros latinoamericanos" 
              : "Schengen visa, budgets, itineraries and real experiences from Latin American travelers"}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b" data-testid="section-featured-posts">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent" />
            {language === "es" ? "Articulos Destacados" : "Featured Articles"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-featured-${post.id}`}>
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img 
                    src={post.image} 
                    alt={post.title[language]} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <Badge className="absolute top-4 left-4 bg-accent text-primary">{post.categoryLabel[language]}</Badge>
                  <Badge className="absolute top-4 right-4 bg-primary text-white">
                    {language === "es" ? "Destacado" : "Featured"}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title[language]}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt[language]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b" data-testid="section-blog-filters">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={language === "es" ? "Buscar articulos..." : "Search articles..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  data-testid="input-blog-search"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {BLOG_CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="whitespace-nowrap gap-1.5"
                  data-testid={`button-category-${cat.id}`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label[language]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-blog-grid">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {language === "es" ? "No hay articulos que coincidan con tu busqueda" : "No articles match your search"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-blog-${post.id}`}>
                  <div className="relative h-52 overflow-hidden bg-muted">
                    <img 
                      src={post.image} 
                      alt={post.title[language]} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent text-primary">{post.categoryLabel[language]}</Badge>
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
                    <p className="text-muted-foreground text-sm mb-5 line-clamp-3" data-testid={`text-excerpt-${post.id}`}>{post.excerpt[language]}</p>
                    
                    <Button className="w-full gap-2" data-testid={`button-blog-${post.id}`}>
                      {language === "es" ? "Leer articulo" : "Read article"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-accent/10" data-testid="section-blog-topics">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-center mb-8">
            {language === "es" ? "Temas Populares" : "Popular Topics"}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Visa Schengen", "Paris", "Roma", "Barcelona", "Presupuesto", "Luna de Miel", "Hoteles Lujo", "Vuelos Baratos", "Gastronomia", "Itinerarios", "Seguro Viaje", "eSIM Europa"].map((topic, idx) => (
              <Badge key={idx} variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-accent hover:text-primary transition-colors" data-testid={`badge-topic-${idx}`}>
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-blog-newsletter">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
            {language === "es" ? "Newsletter Exclusivo" : "Exclusive Newsletter"}
          </Badge>
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            {language === "es" ? "Recibe Guias y Ofertas Exclusivas" : "Receive Guides and Exclusive Offers"}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {language === "es" 
              ? "Suscribete y recibe nuestra guia PDF gratuita: 'Top 10 Ciudades Imprescindibles de Europa' + descuento 10% en tu primer viaje" 
              : "Subscribe and receive our free PDF guide: 'Top 10 Must-See Cities in Europe' + 10% discount on your first trip"}
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
          <p className="text-white/50 text-xs mt-4">
            {language === "es" ? "Sin spam. Puedes darte de baja cuando quieras." : "No spam. You can unsubscribe anytime."}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
