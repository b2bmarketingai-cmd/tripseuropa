import { MapPin, Plane, Star, Clock, Users, CheckCircle, ArrowRight, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { FAQSchema, BreadcrumbSchema, BlogPostSchema } from "@/components/SEOSchema";

const TOP_DESTINATIONS = [
{
  name: "Itália",
  countryCode: "IT",
  image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800",
  why: "Roma, Florença e Veneza oferecem arte, história e culinária incomparáveis para viajantes colombianos que buscam a experiência europeia definitiva.",
  nearby: ["Cinque Terre", "Costa Amalfitana", "Sicília"]
},
{
  name: "França",
  countryCode: "FR",
  image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
  why: "A Torre Eiffel, o Louvre e a gastronomia francesa fazem de Paris o destino dos sonhos para colombianos que visitam a Europa.",
  nearby: ["Versalhes", "Mont Saint-Michel", "Nice"]
},
{
  name: "Espanha",
  countryCode: "ES",
  image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800",
  why: "A língua compartilhada e a cultura vibrante tornam a Espanha o destino europeu mais acessível para viajantes colombianos.",
  nearby: ["Barcelona", "Sevilha", "Granada"]
},
{
  name: "Alemanha",
  countryCode: "DE",
  image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
  why: "Castelos medievais, cerveja artesanal e a eficiência alemã surpreendem cada viajante colombiano que visita o país.",
  nearby: ["Munique", "Berlim", "Hamburgo"]
},
{
  name: "Holanda",
  countryCode: "NL",
  image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800",
  why: "Campos de tulipas, moinhos de vento e os canais de Amsterdã criam uma experiência de conto de fadas para visitantes colombianos.",
  nearby: ["Roterdã", "Haia", "Utrecht"]
},
{
  name: "Reino Unido",
  countryCode: "GB",
  image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
  why: "Os pontos turísticos icônicos de Londres, a história real e a energia multicultural cativam os viajantes colombianos.",
  nearby: ["Oxford", "Bath", "Edimburgo"]
}
];

const DEPARTURE_CITIES = [
{ city: "Bogotá", code: "BOG", flights: "Voos diretos disponíveis" },
{ city: "Medellín", code: "MDE", flights: "Via Bogotá ou Panamá" },
{ city: "Cali", code: "CLO", flights: "Via Bogotá ou Miami" },
{ city: "Barranquilla", code: "BAQ", flights: "Via Bogotá ou Miami" },
{ city: "Cartagena", code: "CTG", flights: "Via Bogotá" },
{ city: "Bucaramanga", code: "BGA", flights: "Via Bogotá" }
];

const POPULAR_ROUTES = [
{
  id: "gran-tour-italia-pt",
  name: "Gran Tour Itália",
  description: "Descubra o melhor da Itália em um tour abrangente que combina história, arte e a melhor culinária mediterrânea para viajantes colombianos.",
  destinations: ["Roma", "Florença", "Veneza", "Milão"],
  highlights: ["Coliseu Romano", "Galeria Uffizi", "Canal Grande", "Catedral de Milão"],
  image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800"
},
{
  id: "eurotrip-express-alemanha-pt",
  name: "Eurotrip Express Alemanha",
  description: "Um tour expresso pelas cidades mais icônicas da Alemanha e paisagens de conto de fadas, perfeito para colombianos com tempo limitado.",
  destinations: ["Berlim", "Munique", "Hamburgo", "Colônia"],
  highlights: ["Portão de Brandemburgo", "Castelo Neuschwanstein", "Porto de Hamburgo", "Catedral de Colônia"],
  image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800"
},
{
  id: "europa-romantica-inglaterra-pt",
  name: "Europa Romântica Inglaterra",
  description: "Uma viagem romântica pelas cidades mais charmosas e pelo interior da Inglaterra, ideal para casais colombianos.",
  destinations: ["Londres", "Bath", "Oxford", "Edimburgo"],
  highlights: ["Torre de Londres", "Stonehenge", "Universidade de Oxford", "Castelo de Edimburgo"],
  image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800"
},
{
  id: "europa-familiar-holanda-pt",
  name: "Europa Familiar Holanda",
  description: "Um tour familiar pela Holanda com atividades para todas as idades, perfeito para famílias colombianas.",
  destinations: ["Amsterdã", "Roterdã", "Haia", "Utrecht"],
  highlights: ["Jardins de Keukenhof", "Rijksmuseum", "Moinhos de Kinderdijk", "Madurodam"],
  image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800"
}
];

const FAQS = [
{
  category: "Vistos e Documentos",
  items: [
    {
      question: "Os colombianos precisam de visto para viajar à Europa?",
      answer: "Os cidadãos colombianos precisam de visto Schengen para entrar na maioria dos países europeus. O processo leva entre 15 e 30 dias úteis. Recomendamos iniciar o processo com pelo menos 2 meses de antecedência. Nossa equipe orienta você em todo o processo sem custo adicional."
    },
    {
      question: "Quais documentos preciso para solicitar o visto Schengen da Colômbia?",
      answer: "Você precisa de: passaporte válido com pelo menos 6 meses de validade, fotos recentes, comprovante de reserva de voo e hotel, seguro de viagem com cobertura mínima de €30.000, extratos bancários dos últimos 3 meses, carta de trabalho ou comprovante de atividade econômica e formulário de solicitação preenchido."
    }
  ]
},
{
  category: "Voos da Colômbia",
  items: [
    {
      question: "Quanto tempo dura o voo da Colômbia para a Europa?",
      answer: "De Bogotá, os voos diretos para Madri levam aproximadamente 9-10 horas. Para Paris são cerca de 10-11 horas. Com escala, os tempos aumentam para 14-20 horas dependendo da conexão. Companhias aéreas como Avianca, Iberia, Air France e KLM oferecem rotas frequentes."
    },
    {
      question: "Qual é a melhor época para viajar à Europa da Colômbia?",
      answer: "A primavera (abril-junho) e o outono (setembro-outubro) são ideais: clima agradável, menos turistas e preços mais acessíveis. O verão (julho-agosto) é alta temporada com preços mais altos. O inverno oferece os melhores preços, mas clima frio, ideal para mercados de Natal."
    }
  ]
},
{
  category: "Custos e Orçamento",
  items: [
    {
      question: "Quanto custa uma viagem à Europa da Colômbia?",
      answer: "Um pacote completo de 10 dias da Colômbia para a Europa custa entre $2.200 e $4.500 USD por pessoa, incluindo voos, hotéis 3-4 estrelas, café da manhã e passeios. Os voos sozinhos variam de $500 a $1.000 USD na temporada regular. Entre em contato conosco para um orçamento personalizado."
    },
    {
      question: "Posso pagar minha viagem à Europa em pesos colombianos?",
      answer: "Sim, oferecemos planos de pagamento em pesos colombianos com opções de financiamento. Aceitamos transferências bancárias, cartões de crédito e pagamentos em dinheiro em nossos escritórios em Bogotá, Medellín e Cali."
    }
  ]
},
{
  category: "Pacotes e Tours",
  items: [
    {
      question: "O que incluem os pacotes de viagem à Europa da Colômbia?",
      answer: "Nossos pacotes incluem: voos de ida e volta de Bogotá, hotéis centrais 3-4 estrelas, café da manhã diário, traslados aeroporto-hotel, passeios guiados em espanhol, seguro de viagem, assistência 24/7 e guia local em cada destino."
    },
    {
      question: "Vocês oferecem tours em grupo ou apenas viagens individuais?",
      answer: "Oferecemos ambas as opções. Os tours em grupo saem às sextas-feiras com grupos de 15-25 pessoas, perfeitos para conhecer novas pessoas e reduzir custos. As viagens individuais ou em casal são totalmente personalizadas de acordo com suas preferências e datas."
    }
  ]
}
];

export default function BlogColombiaEuropaPt() {
const seoData = {
  title: "Viagens à Europa da Colômbia 2025 | Pacotes, Preços e Visto Schengen",
  description: "Descubra os melhores pacotes de viagem à Europa da Colômbia. Voos de Bogotá, visto Schengen, tours em espanhol e preços a partir de $2.200 USD. Solicite um orçamento grátis hoje!",
  keywords: "viagens europa colombia, pacotes europa colombia, visto schengen colombia, voos colombia europa, tours europa espanhol, viagem europa bogota",
  canonicalUrl: "https://tripseuropa.com/pt/blog/viagens-europa-colombia",
  ogImage: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200"
};

const breadcrumbs = [
  { name: "Início", url: "https://tripseuropa.com/pt" },
  { name: "Blog", url: "https://tripseuropa.com/pt/blog" },
  { name: "Viagens à Europa da Colômbia", url: "https://tripseuropa.com/pt/blog/viagens-europa-colombia" }
];

return (
  <>
    <SEOHead {...seoData} />
    <FAQSchema faqs={FAQS.flatMap(cat => cat.items)} />
    <BreadcrumbSchema items={breadcrumbs} />
    <BlogPostSchema
      title={seoData.title}
      description={seoData.description}
      image={seoData.ogImage}
      datePublished="2025-03-04"
      dateModified="2025-03-04"
      authorName="Trips Europa"
      url={seoData.canonicalUrl}
    />

    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-500 via-blue-700 to-red-600 text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1600')" }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <Badge className="mb-4 bg-yellow-500 text-white text-sm px-4 py-1">
            🇨🇴 Da Colômbia para a Europa
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Viagens À Europa<br />
            <span className="text-yellow-300">Da Colômbia</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            Pacotes completos com voos de Bogotá, assistência para visto Schengen e guias em espanhol.
            Mais de 8.000 colombianos viajam conosco todos os anos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 text-lg">
              <Plane className="mr-2 h-5 w-5" />
              Orçamento Grátis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 font-bold px-8 py-4 text-lg">
              <Globe className="mr-2 h-5 w-5" />
              Ver Pacotes
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">8.000+</div>
              <div className="text-sm text-gray-200">Colombianos viajaram</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">20+</div>
              <div className="text-sm text-gray-200">Destinos europeus</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">4.9★</div>
              <div className="text-sm text-gray-200">Avaliação média</div>
            </div>
          </div>
        </div>
      </section>

      {/* Departure Cities */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Voos para a Europa da Sua Cidade
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Partidas disponíveis das principais cidades colombianas
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {DEPARTURE_CITIES.map((city) => (
              <Card key={city.code} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-100 rounded-full p-2">
                      <Plane className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{city.city}</div>
                      <div className="text-xs text-gray-500">{city.code} - {city.flights}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Destinos Mais Populares para Colombianos
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Os destinos europeus favoritos dos viajantes colombianos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_DESTINATIONS.map((dest) => (
              <Card key={dest.name} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={`Viagem para ${dest.name} da Colômbia`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white text-gray-800 font-bold">{dest.countryCode}</Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{dest.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{dest.why}</p>
                  <div className="flex flex-wrap gap-1">
                    {dest.nearby.map((place) => (
                      <Badge key={place} variant="secondary" className="text-xs">{place}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Pacotes de Viagem à Europa da Colômbia
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Nossos tours mais vendidos para viajantes colombianos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {POPULAR_ROUTES.map((route) => (
              <Card key={route.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{route.name}</h3>
                </div>
                <CardContent className="p-5">
                  <p className="text-gray-600 mb-4">{route.description}</p>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-semibold text-gray-700">Cidades incluídas:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {route.destinations.map((d) => (
                        <Badge key={d} className="bg-yellow-100 text-yellow-800 text-xs">{d}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-gray-700">Destaques:</span>
                    </div>
                    <ul className="space-y-1">
                      {route.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                    Ver Detalhes <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Perguntas Frequentes: Viagens à Europa da Colômbia
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Tudo o que você precisa saber antes de viajar à Europa da Colômbia
          </p>
          <div className="space-y-8">
            {FAQS.map((category) => (
              <div key={category.category}>
                <h3 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items.map((faq) => (
                    <Card key={faq.question} className="border-l-4 border-l-yellow-500">
                      <CardContent className="p-5">
                        <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para sua Viagem à Europa da Colômbia?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Solicite um orçamento grátis e receba seu itinerário personalizado em menos de 24 horas.
            Mais de 8.000 colombianos já viajaram conosco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 font-bold px-8 py-4 text-lg">
              <Plane className="mr-2 h-5 w-5" />
              Solicitar Orçamento - É Grátis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 font-bold px-8 py-4 text-lg">
              <Users className="mr-2 h-5 w-5" />
              Falar com um Consultor
            </Button>
          </div>
        </div>
      </section>
    </div>
  </>
);
}
