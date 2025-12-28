import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm, ContactInfo } from "@/components/ContactForm";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";

export default function Contact() {
  const { language } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-contact-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=60&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-contact">
            {language === "es" ? "Contactanos" : "Contact Us"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-contact-title">
            {language === "es" ? "Estamos Aqui para Ayudarte" : "We're Here to Help"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto" data-testid="text-contact-subtitle">
            {language === "es" 
              ? "Nuestro equipo de expertos en viajes esta listo para crear tu experiencia europea perfecta" 
              : "Our team of travel experts is ready to create your perfect European experience"}
          </p>
        </div>
      </section>

      <section className="py-20" data-testid="section-contact-form">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">
                {language === "es" ? "Envianos un Mensaje" : "Send Us a Message"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {language === "es" 
                  ? "Completa el formulario y te responderemos en menos de 24 horas" 
                  : "Fill out the form and we'll respond within 24 hours"}
              </p>
              <ContactForm />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">
                {language === "es" ? "Informacion de Contacto" : "Contact Information"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {language === "es" 
                  ? "Tambien puedes contactarnos directamente por estos medios" 
                  : "You can also contact us directly through these channels"}
              </p>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent/10" data-testid="section-contact-hours">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-bold mb-2">{language === "es" ? "Horario de Atencion" : "Business Hours"}</h3>
              <p className="text-muted-foreground">
                {language === "es" ? "Lunes a Viernes: 8:00 AM - 6:00 PM" : "Monday to Friday: 8:00 AM - 6:00 PM"}
              </p>
              <p className="text-muted-foreground">
                {language === "es" ? "Sabados: 9:00 AM - 2:00 PM" : "Saturdays: 9:00 AM - 2:00 PM"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">{language === "es" ? "Tiempo de Respuesta" : "Response Time"}</h3>
              <p className="text-muted-foreground">
                {language === "es" ? "Respondemos en menos de 24 horas" : "We respond within 24 hours"}
              </p>
              <p className="text-muted-foreground">
                {language === "es" ? "Emergencias 24/7 via WhatsApp" : "24/7 emergencies via WhatsApp"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">{language === "es" ? "Oficina Principal" : "Main Office"}</h3>
              <p className="text-muted-foreground">
                {language === "es" ? "Bogota, Colombia" : "Bogota, Colombia"}
              </p>
              <p className="text-muted-foreground">
                {language === "es" ? "Zona horaria: GMT-5" : "Time zone: GMT-5"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
