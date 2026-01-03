import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Users, Globe, Heart, CheckCircle, Star } from "lucide-react";
import { Link } from "wouter";
import { FloatingContactButtons } from "@/components/support";

const TEAM = [
  {
    name: "Maria Rodriguez",
    role: { es: "Directora General", en: "General Director", pt: "Diretora Geral" },
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=70&w=400&auto=format&fit=crop",
    experience: "15+"
  },
  {
    name: "Carlos Martinez",
    role: { es: "Director de Operaciones", en: "Operations Director", pt: "Diretor de Operacoes" },
    image: "/assets/generated_images/team-carlos-martinez.png",
    experience: "12+"
  },
  {
    name: "Ana Gonzalez",
    role: { es: "Asesora Senior Europa", en: "Senior Europe Advisor", pt: "Consultora Senior Europa" },
    image: "/assets/generated_images/team-ana-gonzalez.png",
    experience: "10+"
  },
  {
    name: "Pedro Sanchez",
    role: { es: "Especialista en Lunas de Miel", en: "Honeymoon Specialist", pt: "Especialista em Lua de Mel" },
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=70&w=400&auto=format&fit=crop",
    experience: "8+"
  }
];

const STATS = [
  { value: "10+", label: { es: "Anos de experiencia", en: "Years of experience", pt: "Anos de experiencia" }, icon: Award },
  { value: "5,000+", label: { es: "Viajeros felices", en: "Happy travelers", pt: "Viajantes felizes" }, icon: Users },
  { value: "25+", label: { es: "Destinos europeos", en: "European destinations", pt: "Destinos europeus" }, icon: Globe },
  { value: "98%", label: { es: "Satisfaccion del cliente", en: "Customer satisfaction", pt: "Satisfacao do cliente" }, icon: Heart }
];

const VALUES = [
  { 
    title: { es: "Excelencia", en: "Excellence", pt: "Excelencia" },
    desc: { es: "Buscamos la perfeccion en cada detalle de tu viaje", en: "We seek perfection in every detail of your trip", pt: "Buscamos a perfeicao em cada detalhe da sua viagem" }
  },
  { 
    title: { es: "Confianza", en: "Trust", pt: "Confianca" },
    desc: { es: "Transparencia y honestidad en todo lo que hacemos", en: "Transparency and honesty in everything we do", pt: "Transparencia e honestidade em tudo o que fazemos" }
  },
  { 
    title: { es: "Personalizacion", en: "Personalization", pt: "Personalizacao" },
    desc: { es: "Cada viaje es unico, como cada viajero", en: "Each trip is unique, like each traveler", pt: "Cada viagem e unica, como cada viajante" }
  },
  { 
    title: { es: "Pasion", en: "Passion", pt: "Paixao" },
    desc: { es: "Amamos lo que hacemos y se nota en cada experiencia", en: "We love what we do and it shows in every experience", pt: "Amamos o que fazemos e isso se reflete em cada experiencia" }
  }
];

export default function About() {
  const { language } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-about-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=60&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-about">
            {language === "es" ? "Sobre Nosotros" : language === "pt" ? "Sobre Nos" : "About Us"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-about-title">
            {language === "es" ? "Tu Viaje, Nuestra Pasion" : language === "pt" ? "Sua Viagem, Nossa Paixao" : "Your Trip, Our Passion"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto" data-testid="text-about-subtitle">
            {language === "es" 
              ? "Desde 2014 ayudando a colombianos y venezolanos a descubrir la magia de Europa" 
              : language === "pt"
              ? "Desde 2014 ajudando colombianos e venezuelanos a descobrir a magia da Europa"
              : "Since 2014 helping Colombians and Venezuelans discover the magic of Europe"}
          </p>
        </div>
      </section>

      <section className="py-20" data-testid="section-about-stats">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <p className="text-4xl font-display font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary/5" data-testid="section-about-story">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
                {language === "es" ? "Nuestra Historia" : language === "pt" ? "Nossa Historia" : "Our Story"}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                {language === "es" ? "Nacimos de un Sueño Europeo" : language === "pt" ? "Nascemos de um Sonho Europeu" : "Born from a European Dream"}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {language === "es" 
                    ? "Trips Europa nacio en 2014 cuando nuestra fundadora, Maria Rodriguez, regreso de su primer viaje a Europa completamente enamorada del continente. Vio la necesidad de una agencia que realmente entendiera las necesidades especificas de los viajeros latinoamericanos."
                    : language === "pt"
                    ? "A Trips Europa nasceu em 2014 quando nossa fundadora, Maria Rodriguez, retornou de sua primeira viagem a Europa completamente apaixonada pelo continente. Ela viu a necessidade de uma agencia que realmente entendesse as necessidades especificas dos viajantes latino-americanos."
                    : "Trips Europa was born in 2014 when our founder, Maria Rodriguez, returned from her first trip to Europe completely in love with the continent. She saw the need for an agency that truly understood the specific needs of Latin American travelers."}
                </p>
                <p>
                  {language === "es" 
                    ? "Desde entonces, hemos ayudado a mas de 5,000 familias a cumplir su sueno de conocer Europa, con un enfoque especial en la atencion personalizada y el acompanamiento en cada paso del proceso, desde la visa hasta el regreso a casa."
                    : language === "pt"
                    ? "Desde entao, ajudamos mais de 5.000 familias a realizar seu sonho de conhecer a Europa, com foco especial no atendimento personalizado e acompanhamento em cada etapa do processo, do visto ate o retorno para casa."
                    : "Since then, we have helped more than 5,000 families fulfill their dream of visiting Europe, with a special focus on personalized attention and support at every step of the process, from visa to returning home."}
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=70&w=800&auto=format&fit=crop" 
                alt="" 
                className="rounded-2xl shadow-xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-primary p-6 rounded-xl shadow-lg">
                <p className="text-3xl font-bold">10+</p>
                <p className="text-sm">{language === "es" ? "Anos creando memorias" : language === "pt" ? "Anos criando memorias" : "Years creating memories"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" data-testid="section-about-values">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
              {language === "es" ? "Nuestros Valores" : language === "pt" ? "Nossos Valores" : "Our Values"}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              {language === "es" ? "Lo Que Nos Define" : language === "pt" ? "O Que Nos Define" : "What Defines Us"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => (
              <Card key={index} className="text-center p-6" data-testid={`value-${index}`}>
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title[language]}</h3>
                <p className="text-muted-foreground text-sm">{value.desc[language]}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary/5" data-testid="section-about-team">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
              {language === "es" ? "Nuestro Equipo" : language === "pt" ? "Nossa Equipe" : "Our Team"}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              {language === "es" ? "Expertos en Viajes Europeos" : language === "pt" ? "Especialistas em Viagens Europeias" : "European Travel Experts"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, index) => (
              <Card key={index} className="overflow-hidden group" data-testid={`team-${index}`}>
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4">
                    <Badge className="bg-accent text-primary mb-2">{member.experience} {language === "es" ? "anos" : language === "pt" ? "anos" : "years"}</Badge>
                  </div>
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role[language]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-about-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {language === "es" ? "Listo para Conocer Europa?" : language === "pt" ? "Pronto para Conhecer a Europa?" : "Ready to Explore Europe?"}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {language === "es" 
              ? "Dejanos ayudarte a planificar el viaje de tus suenos" 
              : language === "pt"
              ? "Deixe-nos ajuda-lo a planejar a viagem dos seus sonhos"
              : "Let us help you plan the trip of your dreams"}
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90" data-testid="button-about-contact">
              {language === "es" ? "Contactar ahora" : language === "pt" ? "Contato agora" : "Contact now"}
            </Button>
          </Link>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
