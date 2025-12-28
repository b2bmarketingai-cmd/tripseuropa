import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FlightSearch } from "@/components/FlightSearch";
import { Chatbot } from "@/components/Chatbot";
import { ContactForm, ContactInfo } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Star, Map, ShieldCheck, Globe, Plane, Hotel, 
  Users, Award, Clock, HeartHandshake, CheckCircle, Quote,
  Calendar, CreditCard, Headphones
} from "lucide-react";
import { Link } from "wouter";

// Premium European destination images from Unsplash
const HERO_IMAGE = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop"; // Paris Eiffel Tower at sunset
const DESTINATION_PARIS = "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop"; // Paris
const DESTINATION_ROME = "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop"; // Rome Colosseum
const DESTINATION_BARCELONA = "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2070&auto=format&fit=crop"; // Barcelona Sagrada Familia
const DESTINATION_SANTORINI = "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1935&auto=format&fit=crop"; // Santorini
const DESTINATION_AMSTERDAM = "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070&auto=format&fit=crop"; // Amsterdam canals
const DESTINATION_LONDON = "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop"; // London

const PACKAGE_ROMANTIC = "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1886&auto=format&fit=crop"; // Cinque Terre
const PACKAGE_ADVENTURE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"; // Alps
const PACKAGE_CULTURAL = "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=2070&auto=format&fit=crop"; // Vienna

// Testimonial avatars
const TESTIMONIAL_BG = "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2031&auto=format&fit=crop"; // Travel couple

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Hero Section with Contact Form */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Premium Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMAGE} 
            alt="Torre Eiffel al atardecer - Viajes a Europa" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-primary/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-primary/40"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Text */}
            <div className="text-white space-y-6">
              <Badge className="bg-accent/20 text-accent border-accent/30 backdrop-blur-sm text-sm px-4 py-1">
                Agencia de Viajes Premium a Europa
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight animate-fade-in">
                Descubre la <span className="text-accent italic">Magia</span> de Europa
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 max-w-xl leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Viajes personalizados, experiencias exclusivas y el mejor servicio en español. Tu aventura europea comienza aquí.
              </p>

              <div className="flex flex-wrap gap-6 pt-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">+15 años</div>
                    <div className="text-white/60 text-sm">de experiencia</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">+50,000</div>
                    <div className="text-white/60 text-sm">viajeros felices</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                    <Star className="w-6 h-6 text-accent fill-accent" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">4.9/5</div>
                    <div className="text-white/60 text-sm">calificación</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <ContactForm 
                variant="hero" 
                title="Cotiza tu Viaje Gratis"
                subtitle="Recibe una propuesta personalizada en 24 horas"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Flight Search */}
      <section className="relative z-20 py-8 -mt-20">
        <FlightSearch />
      </section>

      {/* Features/Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Por qué elegirnos</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              Viaja con los Expertos en Europa
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Somos la agencia líder en viajes a Europa desde Colombia. Conocemos cada destino como la palma de nuestra mano.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Plane className="w-7 h-7" />}
              title="Mejores Tarifas Aéreas"
              description="Acceso a tarifas exclusivas con las principales aerolíneas europeas."
            />
            <FeatureCard 
              icon={<Hotel className="w-7 h-7" />}
              title="Hoteles Seleccionados"
              description="Alojamientos verificados y con las mejores ubicaciones en cada ciudad."
            />
            <FeatureCard 
              icon={<Headphones className="w-7 h-7" />}
              title="Soporte 24/7 en Español"
              description="Asistencia permanente durante todo tu viaje, cuando lo necesites."
            />
            <FeatureCard 
              icon={<CreditCard className="w-7 h-7" />}
              title="Pagos Flexibles"
              description="Financia tu viaje en cuotas sin intereses con tarjeta de crédito."
            />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <Badge className="mb-4">Inspiración</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">Destinos Populares</h2>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Los lugares más soñados por nuestros viajeros colombianos
              </p>
            </div>
            <Link href="/destinations">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-destinations">
                Ver Todos los Destinos <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DestinationCard 
              image={DESTINATION_PARIS}
              title="París"
              country="Francia"
              price="Desde $4,299,000"
              rating={4.9}
              days={7}
            />
            <DestinationCard 
              image={DESTINATION_ROME}
              title="Roma"
              country="Italia"
              price="Desde $3,899,000"
              rating={4.8}
              days={6}
            />
            <DestinationCard 
              image={DESTINATION_BARCELONA}
              title="Barcelona"
              country="España"
              price="Desde $3,499,000"
              rating={4.9}
              days={5}
            />
            <DestinationCard 
              image={DESTINATION_SANTORINI}
              title="Santorini"
              country="Grecia"
              price="Desde $5,199,000"
              rating={4.9}
              days={8}
            />
            <DestinationCard 
              image={DESTINATION_AMSTERDAM}
              title="Ámsterdam"
              country="Holanda"
              price="Desde $3,799,000"
              rating={4.7}
              days={5}
            />
            <DestinationCard 
              image={DESTINATION_LONDON}
              title="Londres"
              country="Inglaterra"
              price="Desde $4,099,000"
              rating={4.8}
              days={6}
            />
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Paquetes Exclusivos</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              Experiencias Diseñadas para Ti
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Paquetes todo incluido con vuelos, hoteles, traslados y experiencias únicas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PackageCard 
              image={PACKAGE_ROMANTIC}
              title="Luna de Miel en Italia"
              description="10 días recorriendo Roma, Florencia, Venecia y la Costa Amalfitana. Incluye cenas románticas y tours privados."
              price="$12,500,000"
              features={["Vuelos incluidos", "Hoteles 5 estrellas", "Traslados privados", "Tours exclusivos"]}
              tag="Romántico"
            />
            <PackageCard 
              image={PACKAGE_ADVENTURE}
              title="Aventura en los Alpes"
              description="8 días entre Suiza, Austria y el norte de Italia. Trenes panorámicos, senderismo y paisajes de ensueño."
              price="$9,800,000"
              features={["Swiss Travel Pass", "Hoteles de montaña", "Teleféricos incluidos", "Guía local"]}
              tag="Aventura"
              featured
            />
            <PackageCard 
              image={PACKAGE_CULTURAL}
              title="Capitales Imperiales"
              description="12 días por Viena, Praga y Budapest. Arte, música clásica, palacios y la mejor gastronomía centroeuropea."
              price="$10,200,000"
              features={["Vuelos + tren", "Hoteles céntricos", "Conciertos y ópera", "Tours guiados"]}
              tag="Cultural"
            />
          </div>

          <div className="text-center mt-12">
            <Link href="/packages">
              <Button size="lg" className="bg-accent text-primary font-bold hover:bg-accent/90 px-8" data-testid="button-view-all-packages">
                Ver Todos los Paquetes <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={TESTIMONIAL_BG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">Testimonios</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Lo que Dicen Nuestros Viajeros
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="María Fernanda López"
              location="Bogotá, Colombia"
              text="¡Increíble experiencia! El equipo de Trips Europa organizó nuestra luna de miel perfecta. Cada detalle estuvo cuidado, desde los traslados hasta las reservas en restaurantes."
              rating={5}
            />
            <TestimonialCard 
              name="Carlos Rodríguez"
              location="Medellín, Colombia"
              text="Viajamos en familia por primera vez a Europa y fue mágico. La asesoría para la visa fue invaluable y el itinerario estuvo perfecto para nuestros hijos."
              rating={5}
            />
            <TestimonialCard 
              name="Andrea Martínez"
              location="Cali, Colombia"
              text="Ya he viajado 3 veces con ellos. Siempre superan mis expectativas. Los precios son justos y la atención personalizada hace toda la diferencia."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Cómo Funciona</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              Tu Viaje en 4 Pasos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ProcessStep 
              number={1}
              title="Cuéntanos tu sueño"
              description="Completa el formulario con tus preferencias y destinos soñados."
            />
            <ProcessStep 
              number={2}
              title="Recibe tu propuesta"
              description="En 24 horas recibirás un itinerario personalizado con opciones."
            />
            <ProcessStep 
              number={3}
              title="Reserva y paga"
              description="Confirma tu viaje con pagos seguros y opciones de financiación."
            />
            <ProcessStep 
              number={4}
              title="Disfruta Europa"
              description="Viaja tranquilo con nuestro soporte 24/7 durante toda tu aventura."
            />
          </div>
        </div>
      </section>

      {/* Final CTA with Contact Form */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4">Comienza tu Aventura</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                ¿Listo para Conocer <span className="text-accent">Europa</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Déjanos tus datos y un asesor experto te contactará para crear juntos el viaje de tus sueños. Sin compromiso, sin costo.
              </p>
              
              <ContactInfo />
            </div>

            <div>
              <ContactForm 
                variant="page"
                title="Solicita tu Cotización Gratis"
                subtitle="Respuesta garantizada en menos de 24 horas"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group border border-gray-100">
      <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-primary mb-3 font-display">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function DestinationCard({ image, title, country, price, rating, days }: { 
  image: string, title: string, country: string, price: string, rating: number, days: number 
}) {
  return (
    <div className="group rounded-2xl overflow-hidden relative aspect-[4/5] cursor-pointer" data-testid={`card-destination-${title.toLowerCase()}`}>
      <img 
        src={image} 
        alt={`${title}, ${country} - Viajes a Europa`} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent"></div>
      
      <div className="absolute top-4 left-4">
        <Badge className="bg-white/90 text-primary backdrop-blur-sm">
          {days} días
        </Badge>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 text-white">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-accent fill-accent" />
          <span className="text-sm font-bold">{rating}</span>
        </div>
        <h3 className="text-2xl font-bold font-display">{title}</h3>
        <p className="text-white/70 text-sm mb-3">{country}</p>
        <div className="flex justify-between items-center">
          <span className="text-accent font-bold text-lg">{price}</span>
          <Button size="sm" className="bg-white text-primary hover:bg-accent hover:text-primary font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
            Ver Más
          </Button>
        </div>
      </div>
    </div>
  );
}

function PackageCard({ image, title, description, price, features, tag, featured }: {
  image: string, title: string, description: string, price: string, features: string[], tag: string, featured?: boolean
}) {
  return (
    <Card className={`overflow-hidden group ${featured ? "ring-2 ring-accent shadow-xl" : ""}`} data-testid={`card-package-${tag.toLowerCase()}`}>
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-4 left-4 bg-accent text-primary">
          {tag}
        </Badge>
        {featured && (
          <Badge className="absolute top-4 right-4 bg-primary text-white">
            Más Vendido
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold font-display text-primary mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-2 mb-6">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-sm text-muted-foreground">Desde</span>
            <div className="text-2xl font-bold text-primary">{price}</div>
            <span className="text-xs text-muted-foreground">por persona</span>
          </div>
          <Button className="bg-accent text-primary font-bold hover:bg-accent/90">
            Cotizar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TestimonialCard({ name, location, text, rating }: {
  name: string, location: string, text: string, rating: number
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
      <Quote className="w-10 h-10 text-accent mb-4" />
      <p className="text-white/90 leading-relaxed mb-6">{text}</p>
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-accent fill-accent" />
        ))}
      </div>
      <div>
        <div className="font-bold text-white">{name}</div>
        <div className="text-white/60 text-sm">{location}</div>
      </div>
    </div>
  );
}

function ProcessStep({ number, title, description }: { number: number, title: string, description: string }) {
  return (
    <div className="text-center relative">
      <div className="w-16 h-16 rounded-full bg-accent text-primary font-bold text-2xl flex items-center justify-center mx-auto mb-6 font-display">
        {number}
      </div>
      <h3 className="text-xl font-bold text-primary mb-2 font-display">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      
      {number < 4 && (
        <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-accent/20">
          <ArrowRight className="absolute -right-2 -top-2 w-5 h-5 text-accent" />
        </div>
      )}
    </div>
  );
}
