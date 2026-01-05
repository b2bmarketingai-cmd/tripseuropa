import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Plane, MapPin, Star, Users, Shield, 
  CheckCircle, Phone, MessageCircle,
  Globe, Heart, ChevronDown, ChevronUp
} from "lucide-react";
import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { FAQSchema, BreadcrumbSchema, BlogPostSchema } from "@/components/SEOSchema";

const TOP_DESTINATIONS = [
  {
    id: "roma",
    name: "Roma, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=600&auto=format&fit=crop",
    why: ["Coliseu e Vaticano", "Gastronomia italiana autentica", "Destino romantico", "Arte e cultura milenar"],
    nearby: ["Florenca", "Veneza", "Milao", "Napoles"],
  },
  {
    id: "paris",
    name: "Paris, Franca",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop",
    why: ["Torre Eiffel iconica", "Museu do Louvre", "Gastronomia refinada", "Moda e luxo"],
    nearby: ["Versalhes", "Normandia", "Provenca", "Champagne"],
  },
  {
    id: "madrid",
    name: "Madrid, Espanha",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=600&auto=format&fit=crop",
    why: ["Voos via Lisboa com TAP", "Museus Prado e Reina Sofia", "Vida noturna vibrante", "Hub para outros destinos"],
    nearby: ["Barcelona", "Sevilha", "Toledo", "Valencia"],
  },
  {
    id: "lisboa",
    name: "Lisboa, Portugal",
    countryCode: "PT",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=600&auto=format&fit=crop",
    why: ["Voos diretos TAP (2 diarios)", "Idioma portugues", "Hub para toda Europa", "Cultura familiar"],
    nearby: ["Cascais", "Sintra", "Porto", "Algarve"],
  },
  {
    id: "florencia",
    name: "Florenca, Italia",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?q=80&w=600&auto=format&fit=crop",
    why: ["Berco do Renascimento", "Galeria Uffizi", "Toscana proxima", "Arte suprema"],
    nearby: ["Pisa", "Siena", "San Gimignano"],
  },
  {
    id: "barcelona",
    name: "Barcelona, Espanha",
    countryCode: "ES",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600&auto=format&fit=crop",
    why: ["Gaudi e Sagrada Familia", "Praias mediterraneas", "Vida moderna", "Costa Brava"],
    nearby: ["Costa Brava", "Montserrat", "Girona"],
  },
  {
    id: "londres",
    name: "Londres, Reino Unido",
    countryCode: "GB",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop",
    why: ["Via TAP Lisboa", "Historia e monumentos", "Compras de classe mundial", "Cultura britanica"],
    nearby: ["Oxford", "Stonehenge", "Bath", "Escocia"],
  },
  {
    id: "grecia",
    name: "Grecia (Atenas + Ilhas)",
    countryCode: "GR",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop",
    why: ["Santorini e Mykonos", "Acropole historica", "Ilhas paradisiacas", "Gastronomia mediterranea"],
    nearby: ["Santorini", "Mykonos", "Creta", "Rodes"],
  },
];

const DEPARTURE_CITIES = [
  {
    name: "Sao Paulo",
    code: "GRU",
    airport: "Aeroporto Internacional de Guarulhos",
    priority: "MAXIMA",
    population: "12 milhoes",
    description: "A maior cidade da America do Sul e o principal hub internacional, com voos diretos para Lisboa e Madrid.",
    topDestinations: ["Lisboa", "Roma", "Paris", "Madrid", "Barcelona"],
    airlines: ["TAP Portugal", "LATAM", "Iberia", "Air France"],
  },
  {
    name: "Rio de Janeiro",
    code: "GIG",
    airport: "Aeroporto Internacional Tom Jobim (Galeao)",
    priority: "ALTA",
    population: "6.7 milhoes",
    description: "A Cidade Maravilhosa oferece conexoes via Lisboa e excelentes opcoes para viajantes cariocas.",
    topDestinations: ["Lisboa", "Madrid", "Paris", "Roma"],
    airlines: ["TAP Portugal", "LATAM", "Air France"],
  },
  {
    name: "Belo Horizonte",
    code: "CNF",
    airport: "Aeroporto Internacional Tancredo Neves (Confins)",
    priority: "ALTA",
    population: "2.5 milhoes",
    description: "Capital mineira com crescente demanda de viagens internacionais via Sao Paulo e Lisboa.",
    topDestinations: ["Lisboa", "Madrid", "Paris", "Roma"],
    airlines: ["LATAM", "Gol", "Azul"],
  },
  {
    name: "Brasilia",
    code: "BSB",
    airport: "Aeroporto Internacional de Brasilia",
    priority: "MEDIA",
    population: "3 milhoes",
    description: "Capital federal com alto poder aquisitivo e demanda crescente por viagens a Europa.",
    topDestinations: ["Lisboa", "Madrid", "Paris"],
    airlines: ["LATAM", "Gol", "Azul"],
  },
  {
    name: "Salvador",
    code: "SSA",
    airport: "Aeroporto Internacional de Salvador",
    priority: "MEDIA",
    population: "2.9 milhoes",
    description: "Capital cultural do Brasil com conexoes via Sao Paulo e Rio para Europa.",
    topDestinations: ["Lisboa", "Madrid", "Barcelona"],
    airlines: ["LATAM", "Gol", "Azul"],
  },
];

const POPULAR_ROUTES = [
  {
    id: "italia-franca",
    name: "Italia + Franca",
    description: "O roteiro mais classico: Roma e Paris, as duas cidades mais romanticas da Europa.",
    destinations: ["Roma", "Florenca", "Paris", "Versalhes"],
    highlights: ["Coliseu e Vaticano", "Arte renascentista", "Torre Eiffel", "Gastronomia refinada"],
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "portugal-espanha",
    name: "Portugal + Espanha",
    description: "Roteiro perfeito para brasileiros: idioma familiar e cultura ibérica.",
    destinations: ["Lisboa", "Porto", "Madrid", "Barcelona"],
    highlights: ["Idioma português", "Vinho do Porto", "Museus de Madrid", "Praias mediterrâneas"],
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "romantica",
    name: "Europa Romântica",
    description: "Perfeita para lua de mel: Paris, Roma e Veneza.",
    destinations: ["Paris", "Roma", "Veneza", "Florença"],
    highlights: ["Cidade do amor", "Gôndolas em Veneza", "Cenas românticas", "Arte e cultura"],
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "grecia",
    name: "Grécia Paradisíaca",
    description: "Ilhas gregas: Santorini, Mykonos e a histórica Atenas.",
    destinations: ["Atenas", "Santorini", "Mykonos", "Creta"],
    highlights: ["Acrópole de Atenas", "Pôr do sol em Santorini", "Praias paradisíacas", "Gastronomia grega"],
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
  },
];

const FAQS = [
  {
    category: "Documentação e Vistos",
    questions: [
      {
        q: "Brasileiros precisam de visto para viajar a Europa?",
        a: "Não. Cidadãos brasileiros estão isentos de visto Schengen para estadias turísticas de até 90 dias. Você só precisa de passaporte válido com pelo menos 6 meses de validade."
      },
      {
        q: "Quais documentos preciso para viajar?",
        a: "Passaporte brasileiro válido (6+ meses), passagem aérea ida e volta, reservas de hotel, seguro viagem internacional com cobertura mínima de 30.000 EUR e comprovante de meios financeiros."
      },
    ]
  },
  {
    category: "Voos e Conexões",
    questions: [
      {
        q: "Ha voos diretos do Brasil para a Europa?",
        a: "Sim, de São Paulo há voos diretos para Lisboa (TAP - 2 voos diários, 9-10 horas) e Madrid (LATAM/Iberia). Do Rio de Janeiro também há opções para Lisboa."
      },
      {
        q: "Qual a melhor aerolinea para brasileiros?",
        a: "TAP Portugal é a mais popular por ter voos diretos para Lisboa e conexões para toda Europa. LATAM, Air France e Iberia também oferecem excelentes opções."
      },
    ]
  },
  {
    category: "Destinos Recomendados",
    questions: [
      {
        q: "Qual o melhor destino para primeira viagem?",
        a: "Portugal é ideal pelo idioma português e voos diretos TAP. O roteiro Lisboa + Porto é perfeito para conhecer Europa sem barreira do idioma."
      },
      {
        q: "Posso combinar varios paises em uma viagem?",
        a: "Absolutamente. Os trens europeus e voos de baixo custo facilitam visitar múltiplos países. As rotas mais populares combinam Portugal, Espanha, França e Itália."
      },
    ]
  },
];

function FAQSection({ category, questions }: { category: string; questions: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-[#d4af37] mb-4">{category}</h3>
      <div className="space-y-3">
        {questions.map((faq, index) => (
          <Card key={index} className="border border-border/50">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 text-left flex items-center justify-between gap-4"
            >
              <span className="font-medium text-foreground">{faq.q}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <CardContent className="pt-0 pb-4 px-4">
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function BlogBrasil() {
  const { language } = useI18n();
  
  const allFaqs = FAQS.flatMap(cat => 
    cat.questions.map(faq => ({ question: faq.q, answer: faq.a }))
  );

  const breadcrumbs = [
    { name: "Inicio", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Viagens desde Brasil", url: "/blog/brasil" },
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-brasil">
      <SEOHead 
        title="Viagens a Europa desde Brasil | Sao Paulo, Rio, Belo Horizonte, Brasilia"
        description="Descubra os melhores destinos europeus para viajantes brasileiros. Voos desde Sao Paulo, Rio de Janeiro, Belo Horizonte e Brasilia para Lisboa, Paris, Roma e mais."
        keywords="viagens europa brasil, voos sao paulo lisboa, europa desde rio, viagens belo horizonte europa, brasilia europa, paris desde brasil, roma desde sao paulo"
        url="/blog/brasil"
      />
      <FAQSchema questions={allFaqs} />
      <BreadcrumbSchema items={breadcrumbs} />
      <BlogPostSchema
        title="Viagens a Europa desde Brasil: Guia Completo"
        description="Tudo que voce precisa saber para viajar a Europa desde Brasil"
        datePublished="2025-01-01"
        author="Trips Europa"
        image="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200"
        url="/blog/brasil"
      />
      
      <Header />

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1920&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-[#d4af37] text-primary font-bold">
            <MapPin className="w-3 h-3 mr-1" /> Brasil
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Viagens A Europa Desde Brasil
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
            Desde Sao Paulo, Rio de Janeiro, Belo Horizonte, Brasilia e Salvador para os destinos mais fascinantes da Europa. Voos diretos TAP para Lisboa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#d4af37] text-primary hover:bg-[#d4af37]/90 font-bold">
                <MessageCircle className="w-4 h-4 mr-2" />
                Orcamento Gratis
              </Button>
            </Link>
            <Link href="/packages">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <Plane className="w-4 h-4 mr-2" />
                Ver Pacotes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#d4af37]/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#d4af37] mb-4">
              Viaje Desde Sua Cidade
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conectamos viajantes das principais cidades brasileiras com os melhores destinos europeus.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTURE_CITIES.map((city) => (
              <Card key={city.code} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#d4af37]">{city.name}</h3>
                      <p className="text-sm text-muted-foreground">{city.airport}</p>
                    </div>
                    <Badge variant="secondary" className="font-bold">{city.code}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{city.description}</p>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#d4af37]" />
                      Populacao: {city.population}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Destinos Populares:</p>
                    <div className="flex flex-wrap gap-1">
                      {city.topDestinations.map((dest) => (
                        <Badge key={dest} variant="outline" className="text-xs">{dest}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Companhias Aereas:</p>
                    <div className="flex flex-wrap gap-1">
                      {city.airlines.map((airline) => (
                        <Badge key={airline} variant="secondary" className="text-xs">{airline}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#d4af37] mb-4">
              Destinos Europeus Favoritos Dos Brasileiros
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Os destinos mais procurados por viajantes brasileiros, com informacoes sobre o que ver e lugares proximos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_DESTINATIONS.map((dest) => (
              <Card key={dest.id} className="overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-foreground font-bold">
                      {dest.countryCode}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-[#d4af37] mb-3">{dest.name}</h3>
                  <ul className="space-y-1 mb-4">
                    {dest.why.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Proximo de:</p>
                    <div className="flex flex-wrap gap-1">
                      {dest.nearby.map((place) => (
                        <Badge key={place} variant="outline" className="text-xs">{place}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#d4af37] mb-4">
              Roteiros Populares Desde Brasil
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {POPULAR_ROUTES.map((route) => (
              <Card key={route.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/5 h-48 md:h-auto">
                    <img src={route.image} alt={route.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="md:w-3/5 p-6">
                    <h3 className="text-xl font-bold text-[#d4af37] mb-2">{route.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{route.description}</p>
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Destinos:</p>
                      <div className="flex flex-wrap gap-1">
                        {route.destinations.map((dest) => (
                          <Badge key={dest} className="bg-[#d4af37]/20 text-[#d4af37] text-xs">{dest}</Badge>
                        ))}
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {route.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="w-3 h-3 text-[#d4af37]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#d4af37] mb-4">
              Por Que Viajar Para Europa Desde Brasil
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Sem Visto Schengen</h3>
              <p className="text-sm text-muted-foreground">Brasileiros isentos de visto para estadias de até 90 dias na Europa.</p>
            </Card>
            <Card className="text-center p-6">
              <Plane className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Voos Diretos TAP</h3>
              <p className="text-sm text-muted-foreground">Conexões diretas de São Paulo e Rio para Lisboa, hub para toda Europa.</p>
            </Card>
            <Card className="text-center p-6">
              <Globe className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Vantagem Cultural</h3>
              <p className="text-sm text-muted-foreground">Portugal oferece idioma português e cultura familiar para brasileiros.</p>
            </Card>
            <Card className="text-center p-6">
              <Heart className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Experiência Única</h3>
              <p className="text-sm text-muted-foreground">Arte, história, gastronomia e paisagens que mudarão sua vida.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#d4af37] mb-4">
              Perguntas Frequentes
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {FAQS.map((section, idx) => (
              <FAQSection key={idx} category={section.category} questions={section.questions} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#d4af37] mb-4">
            Comece Sua Aventura Europeia
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Entre em contato hoje e receba um orçamento personalizado para sua viagem dos sonhos à Europa a partir do Brasil.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#d4af37] text-primary hover:bg-[#d4af37]/90 font-bold">
                <MessageCircle className="w-4 h-4 mr-2" />
                Solicitar Orcamento
              </Button>
            </Link>
            <a href="https://api.whatsapp.com/send?phone=34611105448" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
