import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building, Star, MapPin, CheckCircle, Shield, Calendar, 
  DollarSign, Users, ArrowRight, Wifi, Coffee, Car
} from "lucide-react";
import { FloatingContactButtons, SupportFAQSection, SupportContactSection, type FAQItem } from "@/components/support";
import { openWhatsAppQuote } from "@/lib/whatsapp";

const HOTEL_FAQS: FAQItem[] = [
  {
    question: { es: "Que categorias de hoteles ofrecen?", en: "What hotel categories do you offer?" },
    answer: { es: "Ofrecemos hoteles de 3, 4 y 5 estrellas, boutique hotels, apartamentos turisticos y alojamientos de lujo. Todos son seleccionados por su calidad, ubicacion y servicio.", en: "We offer 3, 4, and 5-star hotels, boutique hotels, tourist apartments, and luxury accommodations. All are selected for their quality, location, and service." }
  },
  {
    question: { es: "Puedo cancelar mi reserva de hotel?", en: "Can I cancel my hotel reservation?" },
    answer: { es: "La mayoria de nuestras reservas ofrecen cancelacion gratuita hasta 24-72 horas antes del check-in. Las politicas especificas varian segun el hotel y la tarifa seleccionada.", en: "Most of our reservations offer free cancellation up to 24-72 hours before check-in. Specific policies vary by hotel and selected rate." }
  },
  {
    question: { es: "El desayuno esta incluido?", en: "Is breakfast included?" },
    answer: { es: "Depende del hotel y la tarifa. Indicamos claramente si el desayuno esta incluido. Muchos hoteles europeos ofrecen excelentes desayunos buffet.", en: "It depends on the hotel and rate. We clearly indicate if breakfast is included. Many European hotels offer excellent buffet breakfasts." }
  },
  {
    question: { es: "Cual es el horario de check-in y check-out?", en: "What are the check-in and check-out times?" },
    answer: { es: "Generalmente el check-in es a partir de las 14:00-15:00 y el check-out antes de las 11:00-12:00. Podemos solicitar early check-in o late check-out segun disponibilidad.", en: "Generally check-in is from 14:00-15:00 and check-out before 11:00-12:00. We can request early check-in or late check-out based on availability." }
  },
  {
    question: { es: "Ofrecen hoteles con ubicacion centrica?", en: "Do you offer centrally located hotels?" },
    answer: { es: "Si, priorizamos hoteles en ubicaciones centricas o bien conectadas con transporte publico. Esto te permite aprovechar mejor tu tiempo en cada destino.", en: "Yes, we prioritize hotels in central locations or well-connected with public transport. This allows you to make the most of your time at each destination." }
  },
  {
    question: { es: "Puedo solicitar habitacion con vista especifica?", en: "Can I request a room with a specific view?" },
    answer: { es: "Si, podemos solicitar preferencias como vista al mar, a la ciudad o habitaciones en pisos altos. No siempre estan garantizadas pero hacemos nuestro mejor esfuerzo.", en: "Yes, we can request preferences such as sea view, city view, or rooms on high floors. They're not always guaranteed but we do our best." }
  }
];

const HOTEL_CATEGORIES = [
  {
    stars: 5,
    name: { es: "Lujo Premium", en: "Premium Luxury" },
    description: { es: "Hoteles de cadenas internacionales con servicios excepcionales", en: "International chain hotels with exceptional services" },
    amenities: ["Spa", "Restaurante gourmet", "Concierge 24h", "Gym"],
    priceRange: "desde €180/noche"
  },
  {
    stars: 4,
    name: { es: "Superior", en: "Superior" },
    description: { es: "Excelente relacion calidad-precio con todas las comodidades", en: "Excellent value with all amenities" },
    amenities: ["Desayuno buffet", "WiFi gratis", "Ubicacion centrica", "Room service"],
    priceRange: "desde €90/noche"
  },
  {
    stars: 3,
    name: { es: "Confort", en: "Comfort" },
    description: { es: "Hoteles comodos y bien ubicados para viajeros practicos", en: "Comfortable and well-located hotels for practical travelers" },
    amenities: ["WiFi gratis", "Recepcion 24h", "Desayuno opcional", "Limpieza diaria"],
    priceRange: "desde €50/noche"
  },
];

const FEATURED_CITIES = [
  { city: "Paris", country: "Francia", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=60&w=400" },
  { city: "Roma", country: "Italia", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=60&w=400" },
  { city: "Barcelona", country: "España", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=60&w=400" },
  { city: "Amsterdam", country: "Paises Bajos", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=60&w=400" },
  { city: "Londres", country: "Reino Unido", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=60&w=400" },
  { city: "Praga", country: "Rep. Checa", image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=60&w=400" },
];

export default function Hotels() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <section className="relative py-24 md:py-32 bg-primary overflow-hidden" data-testid="section-hotels-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=60&w=1600&auto=format&fit=crop" 
            alt="Luxury hotel room with city view" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/95"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building className="w-6 h-6 text-accent" />
            <Badge className="bg-accent/20 text-accent border-accent/30" data-testid="badge-hotels">
              {language === "es" ? "Alojamiento Premium" : "Premium Accommodation"}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-hotels-title">
            <span className="text-accent">{language === "es" ? "Hoteles en Europa" : "Hotels in Europe"}</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8" data-testid="text-hotels-subtitle">
            {language === "es" 
              ? "Seleccion de los mejores hoteles en ubicaciones privilegiadas. Desde boutique hotels con encanto hasta grandes cadenas internacionales." 
              : "Selection of the best hotels in prime locations. From charming boutique hotels to major international chains."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Hoteles 3-5 estrellas" : "3-5 star hotels"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Ubicaciones centricas" : "Central locations"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Cancelacion flexible" : "Flexible cancellation"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-hotels-categories">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Categorias de Alojamiento" : "Accommodation Categories"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOTEL_CATEGORIES.map((category, idx) => (
              <Card key={idx} data-testid={`card-category-${idx}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(category.stars)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">{category.name[lang]}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{category.description[lang]}</p>
                  
                  <div className="space-y-2 mb-4">
                    {category.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <span className="text-lg font-bold text-accent">{category.priceRange}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-hotels-cities">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Ciudades Destacadas" : "Featured Cities"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_CITIES.map((city, idx) => (
              <Card key={idx} className="overflow-hidden" data-testid={`card-city-${idx}`}>
                <div className="aspect-square relative">
                  <img 
                    src={city.image} 
                    alt={`Hotels in ${city.city}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="font-bold">{city.city}</p>
                    <p className="text-xs text-white/70">{city.country}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-hotels-amenities">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Servicios Incluidos" : "Included Services"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Wifi className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-bold">{language === "es" ? "WiFi Gratuito" : "Free WiFi"}</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Coffee className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-bold">{language === "es" ? "Desayuno" : "Breakfast"}</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Car className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-bold">{language === "es" ? "Parking" : "Parking"}</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-bold">{language === "es" ? "Recepcion 24h" : "24h Reception"}</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-hotels-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-accent mb-4">
            {language === "es" ? "Reserva Tu Hotel Ideal" : "Book Your Ideal Hotel"}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {language === "es" 
              ? "Te ayudamos a encontrar el alojamiento perfecto para tu viaje a Europa." 
              : "We help you find the perfect accommodation for your trip to Europe."}
          </p>
          <Button 
            size="lg" 
            className="bg-accent text-primary hover:bg-accent/90 gap-2" 
            data-testid="button-hotels-contact"
            onClick={() => openWhatsAppQuote({ es: "hoteles en Europa", en: "hotels in Europe", pt: "hoteis na Europa" }, language)}
          >
            <ArrowRight className="w-5 h-5" />
            {language === "es" ? "Cotizar Hotel" : language === "pt" ? "Orcamento Hotel" : "Quote Hotel"}
          </Button>
        </div>
      </section>

      <SupportFAQSection faqs={HOTEL_FAQS} />
      <SupportContactSection />
      <FloatingContactButtons />

      <Footer />
    </div>
  );
}
