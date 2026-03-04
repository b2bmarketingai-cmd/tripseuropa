import { MapPin, Plane, Star, Clock, Users, CheckCircle, ArrowRight, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { FAQSchema, BreadcrumbSchema, BlogPostSchema } from "@/components/SEOSchema";

const TOP_DESTINATIONS = [
{
  name: "Portugal",
  countryCode: "PT",
  image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800",
  why: "A língua compartilhada, a arquitetura histórica e a gastronomia de Lisboa e Porto fazem de Portugal o destino europeu mais querido pelos brasileiros.",
  nearby: ["Sintra", "Algarve", "Óbidos"]
},
{
  name: "Itália",
  countryCode: "IT",
  image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800",
  why: "Roma, Florença e Veneza encantam os brasileiros com sua arte renascentista, culinária incomparável e romantismo mediterrâneo.",
  nearby: ["Cinque Terre", "Costa Amalfitana", "Toscana"]
},
{
  name: "França",
  countryCode: "FR",
  image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
  why: "Paris é o sonho de todo brasileiro: a Torre Eiffel, o Louvre, a moda e a gastronomia francesa são irresistíveis.",
  nearby: ["Versalhes", "Bordeaux", "Lyon"]
},
{
  name: "Espanha",
  countryCode: "ES",
  image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800",
  why: "Barcelona, Madri e a Andaluzia oferecem uma mistura perfeita de cultura, praias e gastronomia que os brasileiros adoram.",
  nearby: ["Barcelona", "Sevilha", "Granada"]
},
{
  name: "Grécia",
  countryCode: "GR",
  image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
  why: "Santorini, Atenas e as ilhas gregas são o paraíso mediterrâneo que todo brasileiro sonha em conhecer.",
  nearby: ["Santorini", "Mykonos", "Creta"]
},
{
  name: "Alemanha",
  countryCode: "DE",
  image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
  why: "Castelos de conto de fadas, a Oktoberfest e a eficiência alemã surpreendem e encantam os viajantes brasileiros.",
  nearby: ["Munique", "Berlim", "Rothenburg"]
}
];

const DEPARTURE_CITIES = [
{ city: "São Paulo", code: "GRU", flights: "Voos diretos disponíveis" },
{ city: "Rio de Janeiro", code: "GIG", flights: "Voos diretos disponíveis" },
{ city: "Brasília", code: "BSB", flights: "Via São Paulo ou Rio" },
{ city: "Belo Horizonte", code: "CNF", flights: "Via São Paulo" },
{ city: "Porto Alegre", code: "POA", flights: "Via São Paulo" },
{ city: "Recife", code: "REC", flights: "Via Lisboa ou São Paulo" }
];

const POPULAR_ROUTES = [
{
  id: "portugal-brasil-tour",
  name: "Tour Portugal Clássico",
  description: "A viagem perfeita para brasileiros: Lisboa, Porto e o Algarve em um roteiro completo com guias em português e hotéis boutique.",
  destinations: ["Lisboa", "Porto", "Sintra", "Algarve"],
  highlights: ["Torre de Belém", "Palácio da Pena", "Ribeira do Porto", "Praia da Marinha"],
  image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800"
},
{
  id: "italia-brasil-tour",
  name: "Gran Tour Itália",
  description: "Descubra a Itália dos sonhos: Roma imperial, Florença renascentista e a mágica Veneza em um roteiro inesquecível para brasileiros.",
  destinations: ["Roma", "Florença", "Veneza", "Milão"],
  highlights: ["Coliseu", "Galeria Uffizi", "Canal Grande", "Duomo de Milão"],
  image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800"
},
{
  id: "grecia-brasil-tour",
  name: "Grécia Ilhas e Atenas",
  description: "O roteiro mais desejado pelos brasileiros: Atenas histórica e as deslumbrantes ilhas de Santorini e Mykonos.",
  destinations: ["Atenas", "Santorini", "Mykonos", "Creta"],
  highlights: ["Acrópole de Atenas", "Pôr do sol em Oia", "Praias de Mykonos", "Palácio de Cnossos"],
  image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800"
},
{
  id: "europa-classica-brasil",
  name: "Europa Clássica",
  description: "O grand tour europeu para brasileiros: Paris, Roma, Barcelona e Lisboa em um único roteiro épico de 15 dias.",
  destinations: ["Paris", "Roma", "Barcelona", "Lisboa"],
  highlights: ["Torre Eiffel", "Coliseu", "Sagrada Família", "Torre de Belém"],
  image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800"
}
];

const FAQS = [
{
  category: "Visto e Documentos",
  items: [
    {
      question: "Brasileiros precisam de visto para viajar à Europa?",
      answer: "Brasileiros podem entrar nos países do Espaço Schengen sem visto para estadias de até 90 dias a cada 180 dias, para fins turísticos. A partir de 2025, será necessário o ETIAS (Autorização Europeia de Viagem), um registro eletrônico simples e de baixo custo. Nossa equipe mantém você atualizado sobre todos os requisitos."
    },
    {
      question: "O que é o ETIAS e como os brasileiros devem solicitá-lo?",
      answer: "O ETIAS é uma autorização eletrônica de viagem para a Europa, similar ao ESTA americano. Será obrigatório para brasileiros a partir de 2025. O processo é online, custa cerca de €7 e é válido por 3 anos. Você pode solicitar pelo site oficial da União Europeia. Nossa equipe pode orientá-lo no processo."
    }
  ]
},
{
  category: "Voos do Brasil",
  items: [
    {
      question: "Quanto tempo dura o voo do Brasil para a Europa?",
      answer: "De São Paulo (GRU), voos diretos para Lisboa levam cerca de 9-10 horas, para Paris 11-12 horas e para Frankfurt 12-13 horas. Do Rio de Janeiro (GIG), os tempos são similares. Companhias como LATAM, TAP, Air France, Iberia e Lufthansa oferecem voos frequentes."
    },
    {
      question: "Qual é a melhor época para viajar à Europa saindo do Brasil?",
      answer: "A primavera europeia (abril-junho) é ideal: clima agradável, flores em todo lugar e menos turistas que no verão. O verão (julho-agosto) é a alta temporada com preços mais altos. O outono (setembro-outubro) oferece ótima relação custo-benefício. O inverno é perfeito para os mercados de Natal e esqui."
    }
  ]
},
{
  category: "Custos e Orçamento",
  items: [
    {
      question: "Quanto custa uma viagem à Europa saindo do Brasil?",
      answer: "Um pacote completo de 10 dias do Brasil para a Europa custa entre R$8.000 e R$18.000 por pessoa, incluindo passagens, hotéis 3-4 estrelas, café da manhã e passeios. As passagens sozinhas variam de R$3.000 a R$6.000 na temporada regular. Solicite um orçamento personalizado conosco."
    },
    {
      question: "Posso parcelar minha viagem à Europa?",
      answer: "Sim! Oferecemos parcelamento em até 12x no cartão de crédito sem juros para pacotes selecionados. Também aceitamos PIX, transferência bancária e boleto. Trabalhamos com os principais bancos brasileiros e operadoras de cartão."
    }
  ]
},
{
  category: "Pacotes e Roteiros",
  items: [
    {
      question: "O que incluem os pacotes de viagem à Europa para brasileiros?",
      answer: "Nossos pacotes incluem: passagens aéreas de ida e volta, hotéis centrais 3-4 estrelas, café da manhã diário, traslados aeroporto-hotel, passeios guiados em português, seguro viagem, assistência 24h e guia local em cada destino. Tudo para você aproveitar sem preocupações."
    },
    {
      question: "Vocês têm roteiros específicos para brasileiros?",
      answer: "Sim! Nossos roteiros para brasileiros incluem paradas em Portugal (língua compartilhada), restaurantes com culinária familiar, guias que entendem a cultura brasileira e dicas específicas para brasileiros como câmbio, segurança e costumes locais. Também organizamos grupos saindo de São Paulo e Rio de Janeiro."
    }
  ]
}
];

export default function BlogBrasilEuropa() {
const seoData = {
  title: "Viagem para Europa saindo do Brasil 2025 | Pacotes, Preços e Roteiros",
  description: "Os melhores pacotes de viagem para Europa saindo do Brasil. Voos de São Paulo e Rio, roteiros em português, Portugal, Itália, França e mais. Parcele em até 12x. Orçamento grátis!",
  keywords: "viagem europa brasil, pacotes europa brasil, voo brasil europa, roteiro europa brasileiro, viagem europa sao paulo, europa rio de janeiro, portugal brasil tour",
  canonicalUrl: "https://tripseuropa.com/pt/blog/viagem-europa-brasil",
  ogImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200"
};

const breadcrumbs = [
  { name: "Início", url: "https://tripseuropa.com/pt" },
  { name: "Blog", url: "https://tripseuropa.com/pt/blog" },
  { name: "Viagem para Europa do Brasil", url: "https://tripseuropa.com/pt/blog/viagem-europa-brasil" }
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
      <section className="relative bg-gradient-to-br from-green-600 via-yellow-500 to-blue-600 text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600')" }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <Badge className="mb-4 bg-green-500 text-white text-sm px-4 py-1">
            🇧🇷 Do Brasil para a Europa
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Viagem Para Europa<br />
            <span className="text-yellow-300">Saindo do Brasil</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            Pacotes completos com voos de São Paulo e Rio, roteiros em português e guias especializados para brasileiros.
            Parcele em até 12x sem juros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 text-lg">
              <Plane className="mr-2 h-5 w-5" />
              Orçamento Grátis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 font-bold px-8 py-4 text-lg">
              <Globe className="mr-2 h-5 w-5" />
              Ver Roteiros
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">15.000+</div>
              <div className="text-sm text-gray-200">Brasileiros viajaram</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">25+</div>
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
            Partidas disponíveis das principais cidades brasileiras
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {DEPARTURE_CITIES.map((city) => (
              <Card key={city.code} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 rounded-full p-2">
                      <Plane className="h-5 w-5 text-green-600" />
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
            Destinos Favoritos dos Brasileiros na Europa
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Os destinos europeus mais amados pelos viajantes brasileiros
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_DESTINATIONS.map((dest) => (
              <Card key={dest.name} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={`Viagem para ${dest.name} do Brasil`}
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
            Roteiros de Europa para Brasileiros
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Nossos pacotes mais vendidos para viajantes brasileiros
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
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-gray-700">Cidades incluídas:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {route.destinations.map((d) => (
                        <Badge key={d} className="bg-green-100 text-green-800 text-xs">{d}</Badge>
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
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
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
            Perguntas Frequentes: Viagem para Europa do Brasil
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Tudo o que você precisa saber antes de viajar à Europa saindo do Brasil
          </p>
          <div className="space-y-8">
            {FAQS.map((category) => (
              <div key={category.category}>
                <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items.map((faq) => (
                    <Card key={faq.question} className="border-l-4 border-l-green-500">
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
      <section className="py-16 px-4 bg-green-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Realizar o Sonho da Europa?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Solicite um orçamento grátis e receba seu roteiro personalizado em menos de 24 horas.
            Parcele em até 12x sem juros. Mais de 15.000 brasileiros já viajaram conosco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 font-bold px-8 py-4 text-lg">
              <Plane className="mr-2 h-5 w-5" />
              Solicitar Orçamento Grátis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 font-bold px-8 py-4 text-lg">
              <Users className="mr-2 h-5 w-5" />
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>
    </div>
  </>
);
}
