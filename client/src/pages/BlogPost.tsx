import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowLeft, Calendar, User, Share2, Phone } from "lucide-react";
import { Link, useParams } from "wouter";
import { BLOG_POSTS_DATA, type BlogPostData, type BlogSection } from "@/lib/blogData";
import { BLOG_POSTS_SIMPLE } from "./BlogPostsSimple";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useI18n();
  
  const fullPost = BLOG_POSTS_DATA.find((p: BlogPostData) => p.slug === slug || p.id === slug);
  const simplePost = !fullPost ? BLOG_POSTS_SIMPLE.find((p) => p.id === slug) : null;
  const post = fullPost || simplePost;
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-display text-gold mb-4">Articulo No Encontrado</h1>
          <p className="text-muted-foreground mb-8">El articulo que buscas no existe o ha sido movido.</p>
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Blog
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const title = post.title[language] || post.title.es;
  const excerpt = post.excerpt[language] || post.excerpt.es;
  const postSlug = fullPost?.slug || post.id;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={title}
        description={excerpt}
        keywords={post.keywords.join(", ")}
        url={`https://tripseuropa.com/blog/post/${postSlug}`}
        image={post.image}
        type="article"
      />
      <Header />
      
      <main>
        <article className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Blog
              </Button>
            </Link>
            
            <Badge variant="secondary" className="mb-4">
              {post.categoryLabel[language] || post.categoryLabel.es}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-gold mb-4 leading-tight" data-testid="text-post-title">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min de lectura</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
            <img 
              src={post.image} 
              alt={title}
              className="w-full h-full object-cover"
              data-testid="img-post-hero"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {excerpt}
            </p>

            {post.sections && post.sections.map((section: BlogSection, index: number) => (
              <section key={index} className="mb-10">
                <h2 className="text-2xl font-display text-gold mb-4">{section.title}</h2>
                <p className="text-foreground leading-relaxed mb-4 whitespace-pre-line">{section.content}</p>
                
                {section.image && (
                  <div className="my-6 rounded-lg overflow-hidden">
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    {section.list.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {post.faqs && post.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-display text-gold mb-6">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                  {post.faqs.map((faq: { question: string; answer: string }, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Etiquetas:</p>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.slice(0, 5).map((keyword: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>

          <div className="mt-12">
            <Card className="bg-gradient-to-r from-primary/10 to-gold/10 border-gold/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-display text-gold mb-2">Planifica Tu Viaje a Europa</h3>
                <p className="text-muted-foreground mb-4">Contacta con nuestros asesores para disenar tu viaje perfecto</p>
                <Link href="/contact">
                  <Button className="bg-gold hover:bg-gold/90 text-primary-foreground">
                    Solicitar Cotizacion
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}
