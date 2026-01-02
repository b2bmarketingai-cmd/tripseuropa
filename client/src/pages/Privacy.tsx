import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText, Mail, Clock } from "lucide-react";

export default function Privacy() {
  const { language } = useI18n();

  const sections = [
    {
      icon: FileText,
      title: { es: "Informacion que Recopilamos", en: "Information We Collect" },
      content: {
        es: [
          "Datos personales: nombre, correo electronico, telefono, direccion",
          "Informacion de viaje: pasaporte, preferencias, historial de viajes",
          "Datos de pago: procesados de forma segura con encriptacion SSL",
          "Informacion de navegacion: cookies y datos de uso del sitio"
        ],
        en: [
          "Personal data: name, email, phone, address",
          "Travel information: passport, preferences, travel history",
          "Payment data: securely processed with SSL encryption",
          "Navigation information: cookies and site usage data"
        ]
      }
    },
    {
      icon: Eye,
      title: { es: "Como Usamos tu Informacion", en: "How We Use Your Information" },
      content: {
        es: [
          "Procesar y gestionar tus reservas de viaje",
          "Comunicarnos contigo sobre tu viaje y ofertas relevantes",
          "Mejorar nuestros servicios y experiencia de usuario",
          "Cumplir con requisitos legales y de visas"
        ],
        en: [
          "Process and manage your travel bookings",
          "Communicate with you about your trip and relevant offers",
          "Improve our services and user experience",
          "Comply with legal and visa requirements"
        ]
      }
    },
    {
      icon: Lock,
      title: { es: "Proteccion de Datos", en: "Data Protection" },
      content: {
        es: [
          "Encriptacion SSL en todas las transmisiones de datos",
          "Almacenamiento seguro en servidores certificados",
          "Acceso restringido solo a personal autorizado",
          "Auditorias regulares de seguridad"
        ],
        en: [
          "SSL encryption on all data transmissions",
          "Secure storage on certified servers",
          "Restricted access only to authorized personnel",
          "Regular security audits"
        ]
      }
    },
    {
      icon: Shield,
      title: { es: "Tus Derechos", en: "Your Rights" },
      content: {
        es: [
          "Acceder a tus datos personales en cualquier momento",
          "Solicitar correccion de informacion inexacta",
          "Pedir eliminacion de tus datos (derecho al olvido)",
          "Oponerte al procesamiento de tus datos para marketing"
        ],
        en: [
          "Access your personal data at any time",
          "Request correction of inaccurate information",
          "Request deletion of your data (right to be forgotten)",
          "Object to processing of your data for marketing"
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-privacy-hero">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-privacy">
            {language === "es" ? "Privacidad" : "Privacy"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-privacy-title">
            {language === "es" ? "Politica de Privacidad" : "Privacy Policy"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto" data-testid="text-privacy-subtitle">
            {language === "es" 
              ? "Tu privacidad es nuestra prioridad. Conoce como protegemos tu informacion" 
              : "Your privacy is our priority. Learn how we protect your information"}
          </p>
        </div>
      </section>
      <section className="py-20" data-testid="section-privacy-content">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-accent" />
                  <div>
                    <p className="font-bold">{language === "es" ? "Ultima actualizacion" : "Last updated"}</p>
                    <p className="text-muted-foreground text-sm">28 de Diciembre, 2024</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {language === "es" 
                    ? "Esta politica de privacidad describe como Trips Europa recopila, usa y protege tu informacion personal cuando utilizas nuestros servicios."
                    : "This privacy policy describes how Trips Europa collects, uses and protects your personal information when you use our services."}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {sections.map((section, index) => (
                <Card key={index} data-testid={`card-privacy-section-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-accent" />
                      </div>
                      <h2 className="text-xl font-display font-bold">{section.title[language]}</h2>
                    </div>
                    <ul className="space-y-2">
                      {section.content[language].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 bg-primary text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-accent" />
                  <h2 className="text-xl font-display font-bold">{language === "es" ? "Contacto" : "Contact"}</h2>
                </div>
                <p className="text-white/80 mb-4">
                  {language === "es" 
                    ? "Si tienes preguntas sobre esta politica de privacidad o deseas ejercer tus derechos, contactanos:"
                    : "If you have questions about this privacy policy or wish to exercise your rights, contact us:"}
                </p>
                <div className="space-y-2 text-white/80">
                  <p>Email: info@tripseuropa.com</p>
                  <p>WhatsApp: +34 611 105 448</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
