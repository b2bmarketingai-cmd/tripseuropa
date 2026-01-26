import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Settings, BarChart, Shield, Clock, Info } from "lucide-react";

export default function Cookies() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  const cookieTypes = [
    {
      icon: Shield,
      title: { es: "Cookies Esenciales", en: "Essential Cookies" },
      description: {
        es: "Necesarias para el funcionamiento basico del sitio web. No pueden desactivarse.",
        en: "Necessary for the basic functioning of the website. Cannot be disabled."
      },
      examples: {
        es: ["Sesion de usuario", "Preferencias de idioma", "Carrito de compras"],
        en: ["User session", "Language preferences", "Shopping cart"]
      }
    },
    {
      icon: BarChart,
      title: { es: "Cookies Analiticas", en: "Analytics Cookies" },
      description: {
        es: "Nos ayudan a entender como los visitantes interactuan con el sitio web.",
        en: "Help us understand how visitors interact with the website."
      },
      examples: {
        es: ["Google Analytics", "Paginas visitadas", "Tiempo de permanencia"],
        en: ["Google Analytics", "Pages visited", "Time on site"]
      }
    },
    {
      icon: Settings,
      title: { es: "Cookies de Funcionalidad", en: "Functionality Cookies" },
      description: {
        es: "Permiten funciones mejoradas y personalizacion.",
        en: "Enable enhanced features and personalization."
      },
      examples: {
        es: ["Preferencias de busqueda", "Historial reciente", "Configuracion de usuario"],
        en: ["Search preferences", "Recent history", "User settings"]
      }
    },
    {
      icon: Cookie,
      title: { es: "Cookies de Marketing", en: "Marketing Cookies" },
      description: {
        es: "Utilizadas para rastrear visitantes y mostrar anuncios relevantes.",
        en: "Used to track visitors and display relevant ads."
      },
      examples: {
        es: ["Facebook Pixel", "Google Ads", "Remarketing"],
        en: ["Facebook Pixel", "Google Ads", "Remarketing"]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-cookies">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <Cookie className="w-16 h-16" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="text-page-title">
              {lang === "es" ? "Politica de Cookies" : "Cookie Policy"}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {lang === "es" 
                ? "Informacion sobre como utilizamos cookies en nuestro sitio web"
                : "Information about how we use cookies on our website"
              }
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      {lang === "es" ? "Que son las cookies?" : "What are cookies?"}
                    </h2>
                    <p className="text-muted-foreground">
                      {lang === "es" 
                        ? "Las cookies son pequenos archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar tu experiencia de navegacion."
                        : "Cookies are small text files stored on your device when you visit a website. They allow us to remember your preferences and improve your browsing experience."
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-6">
              {lang === "es" ? "Tipos de Cookies que Utilizamos" : "Types of Cookies We Use"}
            </h2>

            <div className="grid gap-6 mb-12">
              {cookieTypes.map((cookie, index) => (
                <Card key={index} data-testid={`card-cookie-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <cookie.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2">{cookie.title[lang]}</h3>
                        <p className="text-muted-foreground mb-3">{cookie.description[lang]}</p>
                        <div className="flex flex-wrap gap-2">
                          {cookie.examples[lang].map((example, idx) => (
                            <span key={idx} className="px-2 py-1 bg-muted rounded-md text-sm">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      {lang === "es" ? "Duracion de las Cookies" : "Cookie Duration"}
                    </h2>
                    <p className="text-muted-foreground">
                      {lang === "es" 
                        ? "Las cookies de sesion se eliminan cuando cierras el navegador. Las cookies persistentes permanecen hasta su fecha de expiracion o hasta que las elimines manualmente."
                        : "Session cookies are deleted when you close your browser. Persistent cookies remain until their expiration date or until you manually delete them."
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Settings className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      {lang === "es" ? "Como Gestionar las Cookies" : "How to Manage Cookies"}
                    </h2>
                    <p className="text-muted-foreground">
                      {lang === "es" 
                        ? "Puedes configurar tu navegador para rechazar cookies o alertarte cuando se envien. Sin embargo, algunas funciones del sitio pueden no funcionar correctamente sin cookies."
                        : "You can configure your browser to reject cookies or alert you when they are sent. However, some site features may not work properly without cookies."
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 text-center text-sm text-muted-foreground">
              <p>
                {lang === "es" 
                  ? "Ultima actualizacion: Enero 2026. Para mas informacion, contactenos a privacy@tripseuropa.com"
                  : "Last updated: January 2026. For more information, contact us at privacy@tripseuropa.com"
                }
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButtons />
    </div>
  );
}
