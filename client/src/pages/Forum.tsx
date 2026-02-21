import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Search, 
  Plus, 
  MapPin, 
  Calendar,
  Users,
  TrendingUp,
  Filter,
  ChevronRight,
  Sparkles,
  Send
} from "lucide-react";
import { FloatingContactButtons } from "@/components/support";

interface ForumThread {
  id: string;
  title: string;
  content: string;
  author: { name: string; avatar?: string; country: string };
  category: string;
  replies: number;
  likes: number;
  createdAt: string;
  tags: string[];
  sofiaResponse?: string;
}

const FORUM_CATEGORIES = {
  es: [
    { id: "tips", name: "Consejos de Viaje", icon: TrendingUp, color: "bg-blue-500" },
    { id: "destinations", name: "Destinos", icon: MapPin, color: "bg-green-500" },
    { id: "planning", name: "Planificación", icon: Calendar, color: "bg-purple-500" },
    { id: "community", name: "Comunidad", icon: Users, color: "bg-orange-500" },
  ],
  en: [
    { id: "tips", name: "Travel Tips", icon: TrendingUp, color: "bg-blue-500" },
    { id: "destinations", name: "Destinations", icon: MapPin, color: "bg-green-500" },
    { id: "planning", name: "Planning", icon: Calendar, color: "bg-purple-500" },
    { id: "community", name: "Community", icon: Users, color: "bg-orange-500" },
  ],
  pt: [
    { id: "tips", name: "Dicas de Viagem", icon: TrendingUp, color: "bg-blue-500" },
    { id: "destinations", name: "Destinos", icon: MapPin, color: "bg-green-500" },
    { id: "planning", name: "Planejamento", icon: Calendar, color: "bg-purple-500" },
    { id: "community", name: "Comunidade", icon: Users, color: "bg-orange-500" },
  ],
};

const SAMPLE_THREADS: ForumThread[] = [
  {
    id: "1",
    title: "Mi experiencia en París: 10 días increíbles",
    content: "Acabo de regresar de mi viaje a París y quiero compartir con ustedes los mejores lugares que visité. La Torre Eiffel al atardecer fue mágica...",
    author: { name: "María García", country: "Colombia" },
    category: "destinations",
    replies: 24,
    likes: 89,
    createdAt: "2025-01-03",
    tags: ["París", "Francia", "Primera vez"],
    sofiaResponse: "Que maravilla María! París en 10 días es perfecto. Te recomiendo también visitar el Barrio Le Marais y hacer un paseo en barco por el Sena al atardecer. Si necesitas ayuda planificando tu próximo viaje, estoy aquí para ti!",
  },
  {
    id: "2",
    title: "Consejos para viajar con niños a Europa",
    content: "Viajamos en familia por primera vez a Europa y estos son mis consejos para que el viaje sea más fácil con los pequeños...",
    author: { name: "Carlos Rodríguez", country: "México" },
    category: "tips",
    replies: 45,
    likes: 156,
    createdAt: "2025-01-02",
    tags: ["Familia", "Niños", "Consejos"],
    sofiaResponse: "Excelentes consejos Carlos! Agregaría que muchos museos en Europa tienen entrada gratuita para niños menores de 12 años. También recomiendo llevar snacks de casa y planificar actividades cortas. Puedo ayudarte a encontrar hoteles familiares con descuentos especiales!",
  },
  {
    id: "3",
    title: "¿Cuánto presupuesto necesito para 15 días en Italia?",
    content: "Estoy planificando mi viaje a Italia para el próximo año y quisiera saber cuánto dinero debería llevar aproximadamente...",
    author: { name: "Ana Martínez", country: "Argentina" },
    category: "planning",
    replies: 32,
    likes: 67,
    createdAt: "2025-01-01",
    tags: ["Italia", "Presupuesto", "Planificación"],
    sofiaResponse: "Hola Ana! Para 15 días en Italia te recomiendo un presupuesto de EUR 1,500-2,500 sin incluir vuelos. Esto cubre alojamiento, comidas y entradas. Tenemos paquetes especiales desde Colombia con todo incluido. Te puedo enviar una cotización personalizada!",
  },
  {
    id: "4",
    title: "Grupo de viaje: Camino de Santiago abril 2025",
    content: "Estoy organizando un grupo para hacer el Camino de Santiago en abril. ¿Alguien se anima a unirse?",
    author: { name: "Pedro Sánchez", country: "Perú" },
    category: "community",
    replies: 18,
    likes: 45,
    createdAt: "2024-12-28",
    tags: ["España", "Camino de Santiago", "Grupo"],
    sofiaResponse: "Que emocionante Pedro! El Camino de Santiago en abril es ideal por el clima. Ofrecemos paquetes grupales con albergues reservados, transporte de equipaje y guía. Abril tiene disponibilidad limitada, así que reserva pronto!",
  },
  {
    id: "5",
    title: "Mejor época para visitar Turquía",
    content: "Quiero ir a Turquía este año pero no sé cuál es la mejor época. ¿Primavera u otoño? ¿Alguien ha ido en ambas temporadas?",
    author: { name: "Laura Torres", country: "Costa Rica" },
    category: "destinations",
    replies: 21,
    likes: 38,
    createdAt: "2024-12-27",
    tags: ["Turquía", "Clima", "Temporada"],
    sofiaResponse: "Hola Laura! Turquía es espectacular tanto en primavera (abril-mayo) como en otoño (septiembre-octubre). La primavera tiene flores y menos turistas, mientras que el otoño tiene temperaturas perfectas. Tenemos un paquete nuevo a Estambul y Capadocia que te encantará!",
  },
];

export default function Forum() {
  const { language } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);

  const categories = FORUM_CATEGORIES[language] || FORUM_CATEGORIES.es;

  const filteredThreads = SAMPLE_THREADS.filter(thread => {
    if (selectedCategory && thread.category !== selectedCategory) return false;
    if (searchQuery && !thread.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background flex flex-col">
      <SEOHead
        title={language === "es" ? "Comunidad de Viajeros - Foro Trips Europa" : language === "pt" ? "Comunidade de Viajantes - Fórum Trips Europa" : "Travel Community - Trips Europa Forum"}
        description={language === "es" ? "Únete a nuestra comunidad de viajeros latinoamericanos. Comparte experiencias, consejos y planifica tu viaje a Europa con otros viajeros." : "Join our Latin American traveler community. Share experiences, tips, and plan your trip to Europe with other travelers."}
        keywords="foro viajes europa, comunidad viajeros, consejos viaje europa, experiencias europa"
        url="https://tripseuropa.com/forum"
      />
      <Header />

      <section className="relative py-24 bg-primary overflow-hidden" data-testid="section-forum-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=60&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
            {language === "es" ? "Comunidad" : language === "pt" ? "Comunidade" : "Community"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {language === "es" ? "Foro de Viajeros" : language === "pt" ? "Fórum de Viajantes" : "Travelers Forum"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {language === "es" 
              ? "Comparte tus experiencias, pregunta a la comunidad y planifica tu próximo viaje a Europa" 
              : language === "pt"
              ? "Compartilhe suas experiências, pergunte à comunidade e planeje sua próxima viagem à Europa"
              : "Share your experiences, ask the community, and plan your next trip to Europe"}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 shrink-0">
              <Card className="sticky top-24">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    {language === "es" ? "Categorías" : language === "pt" ? "Categorias" : "Categories"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-accent/20 text-primary font-medium' : 'hover:bg-accent/10'}`}
                    data-testid="button-category-all"
                  >
                    {language === "es" ? "Todas las categorías" : language === "pt" ? "Todas as categorias" : "All categories"}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-accent/20 text-primary font-medium' : 'hover:bg-accent/10'}`}
                      data-testid={`button-category-${cat.id}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${cat.color}`}></span>
                      {cat.name}
                    </button>
                  ))}
                </CardContent>
              </Card>
            </aside>

            <main className="flex-1">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === "es" ? "Buscar en el foro..." : language === "pt" ? "Buscar no fórum..." : "Search the forum..."}
                    className="pl-10"
                    data-testid="input-forum-search"
                  />
                </div>
                <Button 
                  onClick={() => setShowNewPost(true)}
                  className="bg-accent text-primary font-bold gap-2"
                  data-testid="button-new-post"
                >
                  <Plus className="w-4 h-4" />
                  {language === "es" ? "Nueva Publicación" : language === "pt" ? "Nova Publicação" : "New Post"}
                </Button>
              </div>

              {showNewPost && (
                <Card className="mb-6 border-accent">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {language === "es" ? "Crear Nueva Publicación" : language === "pt" ? "Criar Nova Publicação" : "Create New Post"}
                      <Button variant="ghost" size="sm" onClick={() => setShowNewPost(false)}>
                        {language === "es" ? "Cancelar" : language === "pt" ? "Cancelar" : "Cancel"}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input 
                      placeholder={language === "es" ? "Título de tu publicación" : language === "pt" ? "Título da sua publicação" : "Your post title"}
                      data-testid="input-new-post-title"
                    />
                    <Textarea 
                      placeholder={language === "es" ? "Comparte tu experiencia, pregunta o consejo..." : language === "pt" ? "Compartilhe sua experiência, pergunta ou dica..." : "Share your experience, question or tip..."}
                      rows={4}
                      data-testid="input-new-post-content"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setShowNewPost(false)}>
                        {language === "es" ? "Cancelar" : language === "pt" ? "Cancelar" : "Cancel"}
                      </Button>
                      <Button className="bg-accent text-primary font-bold" data-testid="button-submit-post">
                        {language === "es" ? "Publicar" : language === "pt" ? "Publicar" : "Publish"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {filteredThreads.map((thread) => (
                  <Card key={thread.id} className="hover-elevate cursor-pointer" data-testid={`card-thread-${thread.id}`}>
                    <CardContent className="p-5">
                      <div className="flex gap-4">
                        <Avatar className="w-12 h-12 shrink-0">
                          <AvatarImage src={thread.author.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {thread.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-lg line-clamp-1">{thread.title}</h3>
                            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                          </div>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{thread.content}</p>
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="text-muted-foreground">{thread.author.name}</span>
                            <Badge variant="secondary" className="text-xs">{thread.author.country}</Badge>
                            <div className="flex items-center gap-3 ml-auto">
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <MessageSquare className="w-4 h-4" />
                                {thread.replies}
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Heart className="w-4 h-4" />
                                {thread.likes}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {thread.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {thread.sofiaResponse && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8962e] flex items-center justify-center shrink-0">
                              <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm">Sofia</span>
                                <Badge className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] border-0">
                                  {language === "es" ? "Agente de Viajes" : language === "pt" ? "Agente de Viagens" : "Travel Agent"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{thread.sofiaResponse}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex gap-2">
                          <Input 
                            placeholder={language === "es" ? "Escribe tu respuesta..." : language === "pt" ? "Escreva sua resposta..." : "Write your reply..."}
                            className="flex-1"
                            data-testid={`input-reply-${thread.id}`}
                          />
                          <Button size="icon" className="bg-accent text-primary shrink-0" data-testid={`button-send-reply-${thread.id}`}>
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredThreads.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {language === "es" ? "No se encontraron publicaciones" : language === "pt" ? "Nenhuma publicação encontrada" : "No posts found"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "es" ? "Sé el primero en publicar en esta categoría" : language === "pt" ? "Seja o primeiro a publicar nesta categoria" : "Be the first to post in this category"}
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
