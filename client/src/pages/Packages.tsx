import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { PackagesPageSEO } from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Calendar, Users, Plane, Hotel, Car, ArrowRight, Clock, Percent, Zap, Crown, Heart, Mountain, Utensils, Camera, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { openWhatsAppQuote, openWhatsAppCustomQuote } from "@/lib/whatsapp";

const PACKAGE_CATEGORIES = [
  { id: "all", label: { es: "Todos", en: "All" }, icon: Sparkles },
  { id: "express", label: { es: "Express", en: "Express" }, icon: Zap },
  { id: "classic", label: { es: "Clasica", en: "Classic" }, icon: Star },
  { id: "total", label: { es: "Total", en: "Total" }, icon: Crown },
  { id: "luxury", label: { es: "Lujo VIP", en: "VIP Luxury" }, icon: Crown },
  { id: "adventure", label: { es: "Aventura", en: "Adventure" }, icon: Mountain },
  { id: "gastronomy", label: { es: "Gastronomia", en: "Gastronomy" }, icon: Utensils },
  { id: "romantic", label: { es: "Romantico", en: "Romantic" }, icon: Heart },
];

const PACKAGES = [
  {
    id: "paris-express",
    category: "express",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=800&auto=format&fit=crop",
    title: { es: "Paris Express", en: "Paris Express" },
    desc: { es: "Descubre la Ciudad Luz en una semana perfecta. Torre Eiffel, Louvre, Versalles y crucero por el Sena.", en: "Discover the City of Light in a perfect week. Eiffel Tower, Louvre, Versailles and Seine cruise." },
    priceUSD: 1200,
    days: 7,
    nights: 6,
    destinations: ["Paris"],
    features: ["Hotel 3-4 estrellas", "Tour Eiffel y Louvre", "Excursion Versalles", "Crucero Sena"],
    includes: ["Desayunos", "Guia en espanol", "Traslados"],
    excludes: ["Vuelos", "Comidas", "Propinas"],
    departures: ["Bogota", "Ciudad de Mexico", "Panama", "Lima"],
    rating: 4.9,
    reviews: 156,
    discount: 0,
    featured: false,
    groupSize: 18,
  },
  {
    id: "espana-rapida",
    category: "express",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=70&w=800&auto=format&fit=crop",
    title: { es: "España Rapida", en: "Quick Spain" },
    desc: { es: "Madrid y Barcelona en 7 dias. Arte, gastronomia, flamenco y playas mediterraneas.", en: "Madrid and Barcelona in 7 days. Art, gastronomy, flamenco and Mediterranean beaches." },
    priceUSD: 1350,
    days: 7,
    nights: 6,
    destinations: ["Madrid", "Barcelona"],
    features: ["Hoteles 4 estrellas", "Tour Prado y Sagrada Familia", "Show Flamenco", "Tren AVE incluido"],
    includes: ["Desayunos", "Tren Madrid-Barcelona", "Tours guiados"],
    excludes: ["Vuelos", "Almuerzos", "Cenas"],
    departures: ["Bogota", "Medellin", "Cali", "Ciudad de Mexico"],
    rating: 4.8,
    reviews: 203,
    discount: 10,
    featured: true,
    groupSize: 18,
  },
  {
    id: "europa-clasica",
    category: "classic",
    image: "https://images.unsplash.com/photo-1493707553966-283afac8c358?q=70&w=800&auto=format&fit=crop",
    title: { es: "Europa Clasica Completa", en: "Complete Classic Europe" },
    desc: { es: "El tour mas popular: Paris, Amsterdam, Berlin, Praga, Viena y Budapest. La esencia de Europa.", en: "The most popular tour: Paris, Amsterdam, Berlin, Prague, Vienna and Budapest. The essence of Europe." },
    priceUSD: 2200,
    days: 14,
    nights: 13,
    destinations: ["Paris", "Amsterdam", "Berlin", "Praga", "Viena", "Budapest"],
    features: ["Hoteles 4 estrellas", "8 experiencias guiadas", "Todos los transportes", "7 desayunos, 3 cenas"],
    includes: ["Vuelo incluido", "Transportes internos", "Tours guiados", "Seguro de viaje"],
    excludes: ["Propinas", "Gastos personales"],
    departures: ["Bogota", "Sao Paulo", "Buenos Aires", "Ciudad de Mexico"],
    rating: 4.9,
    reviews: 412,
    discount: 15,
    featured: true,
    groupSize: 18,
  },
  {
    id: "mediterraneo",
    category: "classic",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=70&w=800&auto=format&fit=crop",
    title: { es: "Mediterraneo Magico", en: "Magical Mediterranean" },
    desc: { es: "Barcelona, Florencia, Roma y Costa Amalfitana. Sol, arte, vino y gastronomia italiana.", en: "Barcelona, Florence, Rome and Amalfi Coast. Sun, art, wine and Italian gastronomy." },
    priceUSD: 2400,
    days: 12,
    nights: 11,
    destinations: ["Barcelona", "Florencia", "Roma", "Costa Amalfitana"],
    features: ["Wine tasting Toscana", "Tour Vaticano privado", "Yate Costa Amalfi", "Hoteles boutique"],
    includes: ["Vuelos", "Desayunos", "3 cenas gourmet", "Traslados"],
    excludes: ["Almuerzos", "Actividades opcionales"],
    departures: ["Bogota", "Lima", "Santiago", "Buenos Aires"],
    rating: 4.8,
    reviews: 289,
    discount: 0,
    featured: false,
    groupSize: 16,
  },
  {
    id: "gran-tour",
    category: "total",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=70&w=800&auto=format&fit=crop",
    title: { es: "Gran Tour Europa", en: "Grand Tour Europe" },
    desc: { es: "La vuelta completa a Europa: 8 paises, 19 dias de experiencias inolvidables.", en: "The complete tour of Europe: 8 countries, 19 days of unforgettable experiences." },
    priceUSD: 3200,
    days: 19,
    nights: 18,
    destinations: ["Paris", "Amsterdam", "Berlin", "Praga", "Viena", "Venecia", "Florencia", "Roma"],
    features: ["Hoteles 4-5 estrellas", "12 experiencias premium", "Cena crucero Sena", "Opera en Viena"],
    includes: ["Vuelo ida y regreso", "Todos los transportes", "10 desayunos, 5 cenas", "Seguro premium"],
    excludes: ["Propinas", "Extras personales"],
    departures: ["Bogota", "Sao Paulo", "Ciudad de Mexico"],
    rating: 5.0,
    reviews: 178,
    discount: 0,
    featured: true,
    groupSize: 16,
  },
  {
    id: "lujo-total",
    category: "luxury",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=70&w=800&auto=format&fit=crop",
    title: { es: "Europa Lujo Total", en: "Total Luxury Europe" },
    desc: { es: "Experiencia VIP: Ritz, Four Seasons, tours privados, cenas Michelin y concierge 24/7.", en: "VIP experience: Ritz, Four Seasons, private tours, Michelin dinners and 24/7 concierge." },
    priceUSD: 6500,
    days: 17,
    nights: 16,
    destinations: ["Paris", "Suiza", "Venecia", "Roma", "Costa Amalfitana"],
    features: ["Hoteles 5 estrellas exclusivos", "10 cenas Michelin", "Visita privada Vaticano", "Yacht Amalfi"],
    includes: ["Primera clase", "Concierge personal 24/7", "Experiencias VIP exclusivas", "Todo incluido"],
    excludes: ["Gastos personales extras"],
    departures: ["Bogota", "Ciudad de Mexico", "Sao Paulo"],
    rating: 5.0,
    reviews: 67,
    discount: 0,
    featured: false,
    groupSize: 8,
  },
  {
    id: "luna-miel",
    category: "romantic",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=70&w=800&auto=format&fit=crop",
    title: { es: "Luna de Miel Romantica", en: "Romantic Honeymoon" },
    desc: { es: "Paris, Castillos del Loira, Suiza e Italia. Cenas privadas, spa y momentos unicos.", en: "Paris, Loire Castles, Switzerland and Italy. Private dinners, spa and unique moments." },
    priceUSD: 4800,
    days: 10,
    nights: 9,
    destinations: ["Paris", "Castillos Loire", "Suiza", "Venecia"],
    features: ["Suites romanticas", "Cenas privadas", "Spa y wellness", "Sorpresas especiales"],
    includes: ["Champagne", "Petalos y decoracion", "Tours privados", "Fotografo profesional"],
    excludes: ["Vuelos", "Gastos personales"],
    departures: ["Bogota", "Lima", "Ciudad de Mexico", "Buenos Aires"],
    rating: 5.0,
    reviews: 134,
    discount: 0,
    featured: false,
    groupSize: 2,
  },
  {
    id: "aventura-alpes",
    category: "adventure",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=70&w=800&auto=format&fit=crop",
    title: { es: "Aventura en los Alpes", en: "Alps Adventure" },
    desc: { es: "Suiza, Austria y Alemania. Hiking, glaciares, teleferico y naturaleza espectacular.", en: "Switzerland, Austria and Germany. Hiking, glaciers, cable cars and spectacular nature." },
    priceUSD: 2100,
    days: 10,
    nights: 9,
    destinations: ["Zurich", "Interlaken", "Innsbruck", "Munich"],
    features: ["Swiss Travel Pass", "Jungfraujoch Top of Europe", "Hiking guiado", "Hoteles de montana"],
    includes: ["Todos los transportes", "Desayunos", "Equipamiento hiking", "Guia experto"],
    excludes: ["Vuelos", "Almuerzos", "Seguro aventura"],
    departures: ["Bogota", "Ciudad de Mexico", "Sao Paulo"],
    rating: 4.9,
    reviews: 98,
    discount: 0,
    featured: false,
    groupSize: 14,
  },
  {
    id: "wine-dine",
    category: "gastronomy",
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?q=70&w=800&auto=format&fit=crop",
    title: { es: "Vino y Gastronomia", en: "Wine and Gastronomy" },
    desc: { es: "Burdeos, Toscana y Piamonte. Wine tasting, cooking classes y cenas en vinedos.", en: "Bordeaux, Tuscany and Piedmont. Wine tasting, cooking classes and vineyard dinners." },
    priceUSD: 2300,
    days: 10,
    nights: 9,
    destinations: ["Burdeos", "Florencia", "Toscana", "Piamonte"],
    features: ["6 wine tastings premium", "2 cooking classes", "Cenas en vinedos", "Visitas a bodegas"],
    includes: ["Alojamiento boutique", "Desayunos gourmet", "Sommelier guia", "Transportes"],
    excludes: ["Vuelos", "Almuerzos"],
    departures: ["Bogota", "Buenos Aires", "Ciudad de Mexico"],
    rating: 4.9,
    reviews: 87,
    discount: 0,
    featured: false,
    groupSize: 12,
  },
  {
    id: "fotografia-europa",
    category: "adventure",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=70&w=800&auto=format&fit=crop",
    title: { es: "Europa Fotografica", en: "Photographic Europe" },
    desc: { es: "Tour para amantes de la fotografia. Los mejores spots, workshops y golden hours.", en: "Tour for photography lovers. Best spots, workshops and golden hours." },
    priceUSD: 2400,
    days: 12,
    nights: 11,
    destinations: ["Paris", "Amsterdam", "Praga", "Venecia", "Santorini"],
    features: ["Workshops fotografia", "Acceso a spots exclusivos", "Golden hour sessions", "Fotografo profesional"],
    includes: ["Guia fotografo", "Transporte a spots", "Alojamiento", "Edicion basica"],
    excludes: ["Vuelos", "Equipo fotografico"],
    departures: ["Bogota", "Ciudad de Mexico", "Lima"],
    rating: 4.8,
    reviews: 56,
    discount: 0,
    featured: false,
    groupSize: 10,
  },
];

const PROMOTIONS = [
  {
    id: "early-bird",
    title: { es: "Early Bird - 15% OFF", en: "Early Bird - 15% OFF" },
    desc: { es: "Reserva con 45+ dias de anticipacion", en: "Book 45+ days in advance" },
    discount: 15,
    icon: Clock,
    color: "bg-green-500",
  },
  {
    id: "grupos",
    title: { es: "Grupos 10+ - 20% OFF", en: "Groups 10+ - 20% OFF" },
    desc: { es: "Viaja con amigos o familia", en: "Travel with friends or family" },
    discount: 20,
    icon: Users,
    color: "bg-blue-500",
  },
  {
    id: "last-minute",
    title: { es: "Last Minute - Hasta 25% OFF", en: "Last Minute - Up to 25% OFF" },
    desc: { es: "Salidas en los proximos 14 dias", en: "Departures in the next 14 days" },
    discount: 25,
    icon: Zap,
    color: "bg-orange-500",
  },
  {
    id: "referidos",
    title: { es: "Refiere un Amigo - $100 USD", en: "Refer a Friend - $100 USD" },
    desc: { es: "Credito para tu proximo viaje", en: "Credit for your next trip" },
    discount: 100,
    icon: Heart,
    color: "bg-pink-500",
  },
];

export default function Packages() {
  const { language } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPackages = selectedCategory === "all" 
    ? PACKAGES 
    : PACKAGES.filter(pkg => pkg.category === selectedCategory);

  const formatPrice = (usd: number) => {
    if (language === "es") {
      return `$${(usd * 4000).toLocaleString('es-CO')} COP`;
    }
    return `$${usd.toLocaleString('en-US')} USD`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PackagesPageSEO />
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-packages-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=60&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-packages">
            {language === "es" ? "Paquetes Exclusivos 2025" : "Exclusive Packages 2025"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-packages-title">
            {language === "es" ? "Tu Viaje Sonado a Europa" : "Your Dream Trip to Europe"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8" data-testid="text-packages-subtitle">
            {language === "es" 
              ? "Desde $1,200 USD por persona. Paquetes desde Colombia, Mexico, Brasil, Argentina, Panama y toda Latinoamerica." 
              : "From $1,200 USD per person. Packages from Colombia, Mexico, Brazil, Argentina, Panama and all Latin America."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
              <span className="text-2xl font-bold text-accent">10+</span>
              <span className="ml-2 text-sm">{language === "es" ? "Paquetes" : "Packages"}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
              <span className="text-2xl font-bold text-accent">25+</span>
              <span className="ml-2 text-sm">{language === "es" ? "Destinos" : "Destinations"}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
              <span className="text-2xl font-bold text-accent">4.9</span>
              <span className="ml-2 text-sm">{language === "es" ? "Calificacion" : "Rating"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-accent/10 to-accent/5 border-b" data-testid="section-promotions">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-center mb-8" data-testid="text-promotions-title">
            {language === "es" ? "Promociones Activas" : "Active Promotions"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROMOTIONS.map((promo) => (
              <div key={promo.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-testid={`promo-${promo.id}`}>
                <div className={`w-10 h-10 ${promo.color} rounded-lg flex items-center justify-center mb-3`}>
                  <promo.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-sm mb-1">{promo.title[language]}</h3>
                <p className="text-muted-foreground text-xs">{promo.desc[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b" data-testid="section-categories">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {PACKAGE_CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="whitespace-nowrap gap-2"
                data-testid={`button-category-${cat.id}`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label[language]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-packages-grid">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className={`group overflow-hidden ${pkg.featured ? "ring-2 ring-accent shadow-xl" : ""}`} data-testid={`card-package-${pkg.id}`}>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title[language]} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <Badge className="bg-accent text-primary">{pkg.days} {language === "es" ? "dias" : "days"}</Badge>
                    {pkg.discount > 0 && (
                      <Badge className="bg-red-500 text-white">-{pkg.discount}%</Badge>
                    )}
                  </div>
                  {pkg.featured && (
                    <Badge className="absolute top-4 right-4 bg-primary text-white">
                      {language === "es" ? "Mas vendido" : "Best Seller"}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="text-sm font-bold">{pkg.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">({pkg.reviews} {language === "es" ? "resenas" : "reviews"})</span>
                    <span className="text-muted-foreground">|</span>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Users className="w-3 h-3" />
                      {language === "es" ? `Max ${pkg.groupSize}` : `Max ${pkg.groupSize}`}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold mb-2">{pkg.title[language]}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{pkg.desc[language]}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {pkg.destinations.slice(0, 4).map((d, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{d}</Badge>
                    ))}
                    {pkg.destinations.length > 4 && (
                      <Badge variant="secondary" className="text-xs">+{pkg.destinations.length - 4}</Badge>
                    )}
                  </div>

                  <div className="space-y-1.5 mb-6">
                    {pkg.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground mb-4">
                    <span className="font-medium">{language === "es" ? "Salidas:" : "Departures:"}</span> {pkg.departures.slice(0, 3).join(", ")}
                    {pkg.departures.length > 3 && ` +${pkg.departures.length - 3}`}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">{language === "es" ? "Desde" : "From"}</p>
                      {pkg.discount > 0 ? (
                        <div className="flex items-center gap-2">
                          <p className="text-lg font-bold text-accent">${Math.round(pkg.priceUSD * (1 - pkg.discount / 100)).toLocaleString()} USD</p>
                          <p className="text-sm text-muted-foreground line-through">${pkg.priceUSD.toLocaleString()}</p>
                        </div>
                      ) : (
                        <p className="text-xl font-bold text-accent">${pkg.priceUSD.toLocaleString()} USD</p>
                      )}
                      <p className="text-xs text-muted-foreground">{language === "es" ? "por persona" : language === "pt" ? "por pessoa" : "per person"}</p>
                    </div>
                    <Button 
                      data-testid={`button-package-${pkg.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        openWhatsAppQuote({ es: `el paquete "${pkg.title.es}"`, en: `the "${pkg.title.en}" package`, pt: `o pacote "${pkg.title.es}"` }, language);
                      }}
                    >
                      {language === "es" ? "Cotizar" : language === "pt" ? "Cotar" : "Quote"}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white" data-testid="section-custom-package">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
            {language === "es" ? "Viaje Personalizado" : language === "pt" ? "Viagem Personalizada" : "Custom Trip"}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {language === "es" ? "No encuentras lo que buscas?" : language === "pt" ? "Nao encontra o que procura?" : "Can't find what you're looking for?"}
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            {language === "es" 
              ? "Creamos tu viaje a medida. Dinos tus fechas, destinos y presupuesto, y nuestro equipo disenara la experiencia perfecta." 
              : language === "pt"
              ? "Criamos sua viagem sob medida. Diga-nos suas datas, destinos e orcamento, e nossa equipe criara a experiencia perfeita."
              : "We create your custom trip. Tell us your dates, destinations and budget, and our team will design the perfect experience."}
          </p>
          <Button 
            size="lg" 
            className="bg-accent text-primary hover:bg-accent/90" 
            data-testid="button-custom-quote"
            onClick={() => openWhatsAppCustomQuote(language)}
          >
            {language === "es" ? "Solicitar Cotizacion Personalizada" : language === "pt" ? "Solicitar Orcamento Personalizado" : "Request Custom Quote"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-16 bg-accent/10" data-testid="section-packages-features">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Plane className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold">{language === "es" ? "Vuelos Premium" : "Premium Flights"}</h3>
              <p className="text-muted-foreground text-sm">
                {language === "es" ? "Vuelos directos o con escalas minimas" : "Direct flights or with minimal stopovers"}
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Hotel className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold">{language === "es" ? "Hoteles 4-5 Estrellas" : "4-5 Star Hotels"}</h3>
              <p className="text-muted-foreground text-sm">
                {language === "es" ? "Ubicaciones privilegiadas en cada destino" : "Privileged locations in every destination"}
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold">{language === "es" ? "Grupos Pequenos" : "Small Groups"}</h3>
              <p className="text-muted-foreground text-sm">
                {language === "es" ? "Maximo 18 personas para experiencia intima" : "Maximum 18 people for intimate experience"}
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Car className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold">{language === "es" ? "Todo Incluido" : "All Inclusive"}</h3>
              <p className="text-muted-foreground text-sm">
                {language === "es" ? "Transportes, tours y experiencias incluidas" : "Transports, tours and experiences included"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
