import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Plane, MapPin, Star, Users, Shield, 
  ArrowRight, Phone, MessageCircle
} from "lucide-react";

const PACKAGES_BRAZIL = [
  {
    id: "europa-classica-br",
    title: "Europa Classica desde Sao Paulo",
    destinations: ["Paris", "Roma", "Barcelona", "Madrid"],
    days: 15,
    price: 2800,
    priceBRL: 14000,
    departure: "Sao Paulo",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "portugal-especial-br",
    title: "Portugal Especial desde Rio",
    destinations: ["Lisboa", "Porto", "Sintra", "Algarve"],
    days: 10,
    price: 1900,
    priceBRL: 9500,
    departure: "Rio de Janeiro",
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=70&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "italia-completa-br",
    title: "Italia Completa desde Brasilia",
    destinations: ["Roma", "Florencia", "Venecia", "Milan", "Costa Amalfitana"],
    days: 14,
    price: 3200,
    priceBRL: 16000,
    departure: "Brasilia",
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=70&w=800&auto=format&fit=crop",
  },
  {
    id: "lua-de-mel-europa-br",
    title: "Lua de Mel Europa desde Sao Paulo",
    destinations: ["Paris", "Santorini", "Venecia"],
    days: 12,
    price: 5500,
    priceBRL: 27500,
    departure: "Sao Paulo",
    rating: 5.0,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=70&w=800&auto=format&fit=crop",
  },
];

const TESTIMONIALS_BRAZIL = [
  {
    name: "Mariana Silva",
    city: "Sao Paulo",
    trip: "Europa Classica 15 dias",
    text: "Viagem incrivel! Tudo perfeito desde o voo ate os hoteis. O guia em portugues foi excelente.",
    rating: 5,
  },
  {
    name: "Roberto Santos",
    city: "Rio de Janeiro", 
    trip: "Portugal Especial",
    text: "Conhecer Portugal foi um sonho realizado. A organizacao foi impecavel.",
    rating: 5,
  },
  {
    name: "Ana Paula Costa",
    city: "Brasilia",
    trip: "Italia Romantica",
    text: "Nossa lua de mel foi magica. Os hoteis boutique foram espetaculares.",
    rating: 5,
  },
];

const FAQ_BRAZIL = [
  {
    question: "Brasileiros precisam de visto Schengen para a Europa?",
    answer: "Nao! Cidadaos brasileiros podem viajar para a area Schengen por ate 90 dias sem visto. Apenas passaporte valido e comprovante de hospedagem sao necessarios."
  },
  {
    question: "De quais cidades do Brasil saem os voos?",
    answer: "Oferecemos saidas de Sao Paulo (GRU), Rio de Janeiro (GIG), Brasilia (BSB), Belo Horizonte, Salvador, Recife e outras capitais com conexoes internacionais."
  },
  {
    question: "Os pacotes incluem seguro viagem?",
    answer: "Sim, todos os nossos pacotes incluem seguro viagem internacional com cobertura medica de ate $50,000 USD."
  },
  {
    question: "Como funciona o pagamento?",
    answer: "Aceitamos cartao de credito (ate 12x), PIX, transferencia bancaria e Binance Pay. Entrada de 20% e saldo ate 30 dias antes da viagem."
  },
];

export default function FromBrazil() {
  const { language } = useI18n();

  const content = {
    badge: { es: "Viajes desde Brasil", en: "Travel from Brazil" },
    h1: { es: "Viagens para Europa do Brasil", en: "Travel to Europe from Brazil" },
    subtitle: { es: "Pacotes exclusivos com saidas de Sao Paulo, Rio de Janeiro, Brasilia e principais cidades brasileiras. Voos diretos, hoteis 4-5 estrelas, guias em portugues.", en: "Exclusive packages departing from Sao Paulo, Rio de Janeiro, Brasilia and major Brazilian cities. Direct flights, 4-5 star hotels, Portuguese-speaking guides." },
    stats: {
      travelers: { es: "3,200+ viajantes brasileiros", en: "3,200+ Brazilian travelers" },
      rating: { es: "4.9 avaliacao media", en: "4.9 average rating" },
      cities: { es: "8 cidades de partida", en: "8 departure cities" },
    },
    cta: { es: "Solicitar Orcamento", en: "Request Quote" },
    whatsapp: { es: "WhatsApp Brasil", en: "WhatsApp Brazil" },
    packages: { es: "Pacotes Populares do Brasil", en: "Popular Packages from Brazil" },
    testimonials: { es: "O que dizem nossos viajantes brasileiros", en: "What our Brazilian travelers say" },
    faq: { es: "Perguntas Frequentes - Viagens do Brasil", en: "FAQ - Travel from Brazil" },
    noVisa: { es: "Brasileiros NAO precisam de visto!", en: "Brazilians do NOT need a visa!" },
    noVisaDesc: { es: "Ate 90 dias na Europa sem visto. Apenas passaporte valido.", en: "Up to 90 days in Europe without visa. Just valid passport." },
    departures: { es: "Saidas de", en: "Departures from" },
    days: { es: "dias", en: "days" },
    from: { es: "A partir de", en: "From" },
    viewPackage: { es: "Ver Pacote", en: "View Package" },
    allPackages: { es: "Ver Todos os Pacotes", en: "View All Packages" },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-brazil-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=60&w=1200&auto=format&fit=crop" 
            alt="Rio de Janeiro Brasil" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-4" data-testid="badge-brazil">
              {content.badge[language]}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-brazil-h1">
              {content.h1[language]}
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl" data-testid="text-brazil-subtitle">
              {content.subtitle[language]}
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Users className="w-5 h-5 text-green-400" />
                <span>{content.stats.travelers[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span>{content.stats.rating[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Plane className="w-5 h-5 text-green-400" />
                <span>{content.stats.cities[language]}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-green-500 text-white font-bold hover:bg-green-600" data-testid="button-brazil-cta">
                  {content.cta[language]}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" data-testid="button-brazil-whatsapp">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {content.whatsapp[language]}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b" data-testid="section-brazil-cities">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {["Sao Paulo", "Rio de Janeiro", "Brasilia", "Belo Horizonte", "Salvador", "Recife", "Curitiba", "Porto Alegre"].map((city) => (
              <div key={city} className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-500" />
                <span className="font-semibold text-sm">{content.departures[language]} {city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 bg-gradient-to-r from-green-500 to-green-600" data-testid="section-brazil-novisa">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <Shield className="w-10 h-10 text-white" />
            <div>
              <h3 className="font-bold text-white text-lg">{content.noVisa[language]}</h3>
              <p className="text-white/90 text-sm">{content.noVisaDesc[language]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-brazil-packages">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" data-testid="text-brazil-packages-title">
            {content.packages[language]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_BRAZIL.map((pkg) => (
              <Card key={pkg.id} className={`group overflow-hidden ${pkg.featured ? "ring-2 ring-green-500 shadow-xl" : ""}`} data-testid={`card-brazil-${pkg.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge className="absolute top-3 left-3 bg-accent text-primary">
                    {pkg.days} {content.days[language]}
                  </Badge>
                  {pkg.featured && (
                    <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                      Popular
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm font-bold">{pkg.rating}</span>
                    <span className="text-muted-foreground text-xs">({pkg.reviews})</span>
                  </div>
                  <h3 className="font-bold mb-2 line-clamp-2">{pkg.title}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
                    <MapPin className="w-3 h-3" />
                    {pkg.destinations.join(" - ")}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">{content.from[language]}</div>
                      <div className="font-bold text-green-600">
                        R$ {pkg.priceBRL.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <Link href="/packages">
                      <Button size="sm" className="bg-green-500 hover:bg-green-600" data-testid={`button-view-${pkg.id}`}>
                        {content.viewPackage[language]}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/packages">
              <Button size="lg" variant="outline" data-testid="button-brazil-all-packages">
                {content.allPackages[language]}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-brazil-testimonials">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-12">
            {content.testimonials[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_BRAZIL.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6" data-testid={`testimonial-brazil-${index}`}>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.city}, Brasil</div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 text-xs">{testimonial.trip}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-brazil-faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            {content.faq[language]}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_BRAZIL.map((faq, index) => (
              <Card key={index} className="p-6" data-testid={`faq-brazil-${index}`}>
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-green-500" data-testid="section-brazil-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Pronto para sua viagem a Europa?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Entre em contato hoje e receba um orcamento personalizado em menos de 24 horas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-green-600 hover:bg-white/90" data-testid="button-brazil-contact">
                <Phone className="w-5 h-5 mr-2" />
                Falar com Consultor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "Trips Europa - Viagens do Brasil",
          "description": "Agencia de viagens especializada em pacotes turisticos para Europa saindo do Brasil. Voos, hoteis, tours e guias em portugues.",
          "url": "https://tripseuropa.com/desde-brasil",
          "areaServed": {
            "@type": "Country",
            "name": "Brazil"
          },
          "serviceType": ["Travel Agency", "Tour Operator"],
          "priceRange": "$$$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "891",
            "bestRating": "5"
          }
        })
      }} />
    </div>
  );
}
