import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const errorTranslations = {
  pageNotFound: { es: "Página No Encontrada", en: "Page Not Found", pt: "Página Não Encontrada" },
  pageNotFoundDesc: { es: "Lo sentimos, la página que buscas no existe o ha sido movida.", en: "Sorry, the page you are looking for does not exist or has been moved.", pt: "Desculpe, a página que você procura não existe ou foi movida." },
  backToHome: { es: "Volver al Inicio", en: "Back to Home", pt: "Voltar ao Início" }
};

const t = (translations: Record<string, Record<string, string>>, key: string, lang: string): string => {
  return translations[key]?.[lang] || translations[key]?.es || key;
};

/**
 * 404 Not Found Page
 * Handles all missing pages with multilingual support
 */
export default function NotFound() {
  const { language } = useI18n();
  const lang = language as "es" | "en" | "pt";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Visual */}
          <div className="mb-8">
            <h1 className="text-9xl font-display font-bold text-accent mb-4">404</h1>
            <div className="w-32 h-1 bg-accent mx-auto mb-8"></div>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t(errorTranslations, 'pageNotFound', lang)}
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            {t(errorTranslations, 'pageNotFoundDesc', lang)}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <Home className="w-4 h-4" />
                {t(errorTranslations, 'backToHome', lang)}
              </Button>
            </Link>

            <Link href="/destinations">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                <Search className="w-4 h-4" />
                {lang === 'es' ? 'Explorar Destinos' : lang === 'en' ? 'Explore Destinations' : 'Explorar Destinos'}
              </Button>
            </Link>
          </div>

          {/* Popular Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
              {lang === 'es' ? 'Enlaces Populares' : lang === 'en' ? 'Popular Links' : 'Links Populares'}
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/packages">
                <Button variant="ghost" className="text-accent hover:text-accent/80">
                  {lang === 'es' ? 'Paquetes' : lang === 'en' ? 'Packages' : 'Pacotes'}
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="ghost" className="text-accent hover:text-accent/80">
                  Blog
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="text-accent hover:text-accent/80">
                  {lang === 'es' ? 'Nosotros' : lang === 'en' ? 'About Us' : 'Sobre Nós'}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="text-accent hover:text-accent/80">
                  {lang === 'es' ? 'Contacto' : lang === 'en' ? 'Contact' : 'Contato'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
