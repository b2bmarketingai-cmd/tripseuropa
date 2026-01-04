import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { SEOHead } from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { Link, useParams } from "wouter";
import { BLOG_POSTS_DATA, type BlogPostData, type BlogSection } from "@/lib/blogData";
import { BLOG_POSTS_SIMPLE, type SimpleBlogPost } from "@/pages/BlogPostsSimple";
import { ContactForm } from "@/components/ContactForm";


export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useI18n();
  
  const fullPost = BLOG_POSTS_DATA.find((p: BlogPostData) => p.slug === slug || p.id === slug);
  const simplePost = !fullPost ? BLOG_POSTS_SIMPLE.find((p: SimpleBlogPost) => p.id === slug) : null;
  const post = fullPost || simplePost;
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-display text-accent mb-4">Articulo No Encontrado</h1>
          <p className="text-muted-foreground mb-8">El articulo que buscas no existe o ha sido movido.</p>
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Blog
            </Button>
          </Link>
        </main>
        <FloatingContactButtons />
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
      <main className="pt-24">
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
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-accent mb-4 leading-tight" data-testid="text-post-title">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              {fullPost?.author && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{fullPost.author}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-lg overflow-hidden mb-8">
            <img 
              src={post.image} 
              alt={title}
              className="w-full h-full object-cover object-center"
              loading="eager"
              data-testid="img-post-hero"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {excerpt}
            </p>

            {fullPost?.sections && fullPost.sections.map((section: BlogSection, index: number) => (
              <section key={index} className="mb-10">
                <h2 className="text-2xl font-display text-accent mb-4">{section.title}</h2>
                
                <p className="text-foreground leading-relaxed mb-4 whitespace-pre-line">{section.content}</p>
                
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    {section.list.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {fullPost?.faqs && fullPost.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-display text-accent mb-6">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                  {fullPost.faqs.map((faq: { question: string; answer: string }, index: number) => (
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
            <ContactForm 
              variant="page"
              title="Contactanos Para Mas Informacion"
              subtitle="Nuestros asesores te ayudaran a planificar tu viaje perfecto a Europa"
            />
          </div>
        </article>
      </main>
      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
