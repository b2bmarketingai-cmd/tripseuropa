import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { BLOG_POSTS_SIMPLE } from "@/pages/BlogPostsSimple";

const featuredPosts = BLOG_POSTS_SIMPLE.filter(p => p.featured).slice(0, 3);
const recentPosts = BLOG_POSTS_SIMPLE.slice(0, 6);

export function BlogHighlights() {
  const { language } = useI18n();
  const lang = language as "es" | "en" | "pt";
  const langPrefix = lang === "es" ? "" : `/${lang}`;
  
  const content = {
    es: {
      title: "Blog de Viajes",
      subtitle: "Guias, consejos y las ultimas novedades sobre viajes a Europa",
      readMore: "Leer mas",
      viewAll: "Ver todos los articulos",
      blogCountries: "Explora por Pais",
    },
    en: {
      title: "Travel Blog",
      subtitle: "Guides, tips and the latest news about traveling to Europe",
      readMore: "Read more",
      viewAll: "View all articles",
      blogCountries: "Explore by Country",
    },
    pt: {
      title: "Blog de Viagens",
      subtitle: "Guias, dicas e as ultimas novidades sobre viagens para a Europa",
      readMore: "Ler mais",
      viewAll: "Ver todos os artigos",
      blogCountries: "Explore por Pais",
    },
  };
  
  const c = content[lang] || content.es;
  
  const blogCountries = [
    { slug: "colombia", name: { es: "Colombia", en: "Colombia", pt: "Colombia" } },
    { slug: "mexico", name: { es: "Mexico", en: "Mexico", pt: "Mexico" } },
    { slug: "argentina", name: { es: "Argentina", en: "Argentina", pt: "Argentina" } },
    { slug: "brasil", name: { es: "Brasil", en: "Brazil", pt: "Brasil" } },
    { slug: "peru", name: { es: "Peru", en: "Peru", pt: "Peru" } },
    { slug: "panama", name: { es: "Panama", en: "Panama", pt: "Panama" } },
  ];
  
  const posts = featuredPosts.length >= 3 ? featuredPosts : recentPosts.slice(0, 3);
  
  return (
    <section className="py-16 bg-background" data-testid="section-blog-highlights">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" data-testid="badge-blog-section">{c.title}</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4" data-testid="text-blog-title">
            {c.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-blog-subtitle">
            {c.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map((post) => (
            <Link key={post.id} href={`${langPrefix}/blog/post/${post.id}`}>
              <Card className="h-full cursor-pointer" data-testid={`card-blog-${post.id}`}>
                <div className="aspect-video relative">
                  <img 
                    src={post.image} 
                    alt={post.title[lang] || post.title.es}
                    className="w-full h-full object-cover rounded-t-md"
                    loading="lazy"
                    data-testid={`img-blog-${post.id}`}
                  />
                </div>
                <CardHeader className="pb-2">
                  <Badge variant="secondary" className="w-fit mb-2" data-testid={`badge-category-${post.id}`}>
                    {post.categoryLabel[lang] || post.categoryLabel.es}
                  </Badge>
                  <CardTitle className="text-lg line-clamp-2" data-testid={`text-title-${post.id}`}>
                    {post.title[lang] || post.title.es}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3" data-testid={`text-excerpt-${post.id}`}>
                    {post.excerpt[lang] || post.excerpt.es}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground" data-testid={`text-meta-${post.id}`}>
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} min</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-center mb-4" data-testid="text-blog-countries">{c.blogCountries}</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {blogCountries.map((country) => (
              <Link key={country.slug} href={`${langPrefix}/blog/${country.slug}`}>
                <Badge variant="outline" className="cursor-pointer" data-testid={`link-blog-${country.slug}`}>
                  {country.name[lang] || country.name.es}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Link href={`${langPrefix}/blog`}>
            <Button variant="outline" size="lg" data-testid="button-view-all-blog">
              {c.viewAll}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
