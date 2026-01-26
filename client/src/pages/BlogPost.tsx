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
import { BreadcrumbSchema } from "@/components/SEOSchemas";

function parseSpanishDate(dateStr: string): string {
  const months: Record<string, string> = {
    'Ene': '01', 'Feb': '02', 'Mar': '03', 'Abr': '04', 
    'May': '05', 'Jun': '06', 'Jul': '07', 'Ago': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dic': '12'
  };
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = months[parts[1]] || '01';
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return new Date().toISOString().split('T')[0];
}

function ArticleSchema({ title, description, image, slug, date, author }: { 
  title: string; 
  description: string; 
  image: string; 
  slug: string; 
  date: string;
  author?: string;
}) {
  const isoDate = parseSpanishDate(date);
  const hasPersonAuthor = author && author !== "Trips Europa";
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "url": `https://tripseuropa.co/blog/post/${slug}`,
    "datePublished": isoDate,
    "dateModified": isoDate,
    "author": hasPersonAuthor ? {
      "@type": "Person",
      "name": author
    } : {
      "@type": "Organization",
      "name": "Trips Europa",
      "url": "https://tripseuropa.co"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Trips Europa",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tripseuropa.co/favicon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tripseuropa.co/blog/post/${slug}`
    }
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


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
        <main className="container mx-auto px-4 py-16 text-center" data-testid="section-not-found">
          <h1 className="text-3xl font-display text-accent mb-4" data-testid="text-not-found-title">Articulo No Encontrado</h1>
          <p className="text-muted-foreground mb-8" data-testid="text-not-found-message">El articulo que buscas no existe o ha sido movido.</p>
          <Link href="/blog">
            <Button variant="outline" data-testid="button-not-found-back">
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

  const title = (post.title as Record<string, string>)[language] || post.title.es;
  const excerpt = (post.excerpt as Record<string, string>)[language] || post.excerpt.es;
  const postSlug = fullPost?.slug || post.id;
  const isoDate = parseSpanishDate(post.date);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={title}
        description={excerpt}
        keywords={post.keywords.join(", ")}
        url={`https://tripseuropa.co/blog/post/${postSlug}`}
        image={post.image}
        type="article"
        publishedTime={isoDate}
        modifiedTime={isoDate}
        author={fullPost?.author || "Trips Europa"}
      />
      <ArticleSchema 
        title={title}
        description={excerpt}
        image={post.image}
        slug={postSlug}
        date={post.date}
        author={fullPost?.author}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://tripseuropa.co" },
          { name: "Blog", url: "https://tripseuropa.co/blog" },
          { name: title, url: `https://tripseuropa.co/blog/post/${postSlug}` }
        ]}
      />
      <Header />
      <main className="pt-24">
        <article className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="mb-4" data-testid="button-back-blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Blog
              </Button>
            </Link>
            
            <Badge variant="secondary" className="mb-4" data-testid="badge-post-category">
              {(post.categoryLabel as Record<string, string>)[language] || post.categoryLabel.es}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-accent mb-4 leading-tight" data-testid="text-post-title">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-6" data-testid="text-post-meta">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span data-testid="text-post-date">{post.date}</span>
              </div>
              {fullPost?.author && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span data-testid="text-post-author">{fullPost.author}</span>
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
            <p className="text-lg text-muted-foreground leading-relaxed mb-8" data-testid="text-post-excerpt">
              {excerpt}
            </p>

            {fullPost?.sections && fullPost.sections.map((section: BlogSection, index: number) => (
              <section key={index} className="mb-10" data-testid={`section-content-${index}`}>
                <h2 className="text-2xl font-display text-accent mb-4" data-testid={`text-section-title-${index}`}>{section.title}</h2>
                
                <p className="text-foreground leading-relaxed mb-4 whitespace-pre-line" data-testid={`text-section-content-${index}`}>{section.content}</p>
                
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2 text-foreground" data-testid={`list-section-${index}`}>
                    {section.list.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {fullPost?.faqs && fullPost.faqs.length > 0 && (
              <section className="mt-12" data-testid="section-faq">
                <h2 className="text-2xl font-display text-accent mb-6" data-testid="text-faq-title">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                  {fullPost.faqs.map((faq: { question: string; answer: string }, index: number) => (
                    <Card key={index} data-testid={`card-faq-${index}`}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-2" data-testid={`text-faq-question-${index}`}>{faq.question}</h3>
                        <p className="text-muted-foreground" data-testid={`text-faq-answer-${index}`}>{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="mt-12 pt-8 border-t" data-testid="section-post-footer">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2" data-testid="text-tags-label">Etiquetas:</p>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.slice(0, 5).map((keyword: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs" data-testid={`badge-keyword-${index}`}>
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" data-testid="button-share">
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
