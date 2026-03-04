import { MapPin, Plane, Clock, Star, Users, Globe, CheckCircle, ArrowRight, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { FAQSchema, BreadcrumbSchema, BlogPostSchema } from "@/components/SEOSchema";

const TOP_DESTINATIONS = [
{
  name: "España",
  countryCode: "ES",
  image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80",
  why: "Idioma compartido, cultura latina y vuelos directos desde Bogotá y Medellín hacen de España el destino europeo favorito de los colombianos.",
  nearby: ["Portugal", "Francia", "Marruecos"]
},
{
  name: "Francia",
  countryCode: "FR",
  image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
  why: "París es el sueño europeo por excelencia. Arte, gastronomía y moda en una ciudad que enamora a cada colombiano que la visita.",
  nearby: ["Bélgica", "Suiza", "Italia"]
},
{
  name: "Italia",
  countryCode: "IT",
  image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80",
  why: "Roma, Florencia y Venecia ofrecen historia, arte y gastronomía incomparables. Los colombianos adoran la calidez italiana.",
  nearby: ["Croacia", "Austria", "Grecia"]
},
{
  name: "Alemania",
  countryCode: "DE",
  image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
  why: "Berlín, Múnich y el Castillo de Neuschwanstein. Alemania combina modernidad, historia y la famosa Oktoberfest.",
  nearby: ["Austria", "República Checa", "Polonia"]
},
{
  name: "Portugal",
  countryCode: "PT",
  image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
  why: "Lisboa y Oporto ofrecen una Europa auténtica y asequible. El fado, los pasteles de nata y el Algarve conquistan a los viajeros colombianos.",
  nearby: ["España", "Islas Canarias", "Madeira"]
},
{
  name: "Países Bajos",
  countryCode: "NL",
  image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80",
  why: "Ámsterdam con sus canales, museos y tulipanes es una experiencia única. Hub perfecto para explorar el norte de Europa.",
  nearby: ["Bélgica", "Alemania", "Dinamarca"]
}
];

const DEPARTURE_CITIES = [
{ city: "Bogotá", code: "BOG", airlines: ["Avianca", "Air France", "Iberia", "KLM"], avgTime: "10-12h" },
{ city: "Medellín", code: "MDE", airlines: ["Avianca", "Copa Airlines", "Latam"], avgTime: "11-13h" },
{ city: "Cali", code: "CLO", airlines: ["Avianca", "Copa Airlines"], avgTime: "12-14h" },
{ city: "Cartagena", code: "CTG", airlines: ["Avianca", "Copa Airlines"], avgTime: "13-15h" },
{ city: "Barranquilla", code: "BAQ", airlines: ["Avianca", "Copa Airlines"], avgTime: "12-14h" }
];

const POPULAR_ROUTES = [
{
  id: "bog-mad",
  name: "Bogotá → Madrid",
  description: "La ruta más popular de Colombia a Europa. Vuelos directos con Avianca e Iberia en aproximadamente 10 horas.",
  destinations: ["Madrid", "Barcelona", "Sevilla", "Valencia"],
  highlights: ["Vuelos directos disponibles", "Sin visa para colombianos con pasaporte vigente", "Conexión fácil al resto de Europa"],
  image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80"
},
{
  id: "bog-par",
  name: "Bogotá → París",
  description: "Vuelos con escala en Madrid o Miami. París es la puerta de entrada perfecta para explorar Europa occidental.",
  destinations: ["París", "Lyon", "Niza", "Burdeos"],
  highlights: ["Conexiones frecuentes vía Madrid", "Visa Schengen cubre toda Europa", "Hub de transporte europeo"],
  image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80"
},
{
  id: "bog-rom",
  name: "Bogotá → Roma",
  description: "Descubre la Ciudad Eterna. Vuelos con escala en Madrid o Lisboa, con tiempos de viaje de 13-15 horas.",
  destinations: ["Roma", "Florencia", "Venecia", "Milán"],
  highlights: ["Visa Schengen única para toda Italia", "Conexiones vía Madrid y Lisboa", "Temporada alta: abril-octubre"],
  image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80"
},
{
  id: "mde-ams",
  name: "Medellín → Ámsterdam",
  description: "KLM opera vuelos desde Medellín con escala en Bogotá. Ámsterdam es el hub perfecto para el norte de Europa.",
  destinations: ["Ámsterdam", "Bruselas", "Berlín", "Copenhague"],
  highlights: ["KLM vuela desde Medellín", "Hub de conexiones europeas", "Ideal para múltiples países"],
  image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80"
}
];

const FAQS = [
{
  category: "Visa y Documentos",
  questions: [
    {
      q: "¿Necesitan visa los colombianos para viajar a Europa?",
      a: "Sí, los colombianos necesitan visa Schengen para visitar la mayoría de países europeos. La visa Schengen permite visitar 26 países con un solo trámite. Se solicita en el consulado del país de destino principal o de primera entrada. El proceso toma entre 15-30 días hábiles."
    },
    {
      q: "¿Cuánto cuesta la visa Schengen para colombianos?",
      a: "La visa Schengen tiene un costo oficial de €80 (aproximadamente $350.000 COP). Algunos consulados cobran tarifas adicionales de servicio. Se requiere seguro de viaje con cobertura mínima de €30.000, extractos bancarios, carta de invitación o reservas de hotel, y tiquetes de avión."
    },
    {
      q: "¿Cuánto tiempo de anticipación debo solicitar la visa?",
      a: "Se recomienda solicitar la visa Schengen con al menos 3 meses de anticipación. Los consulados más solicitados como el español, francés e italiano pueden tener citas con 2-3 meses de espera. No se puede solicitar con más de 6 meses de anticipación al viaje."
    }
  ]
},
{
  category: "Vuelos y Precios",
  questions: [
    {
      q: "¿Cuánto cuesta un tiquete de Colombia a Europa?",
      a: "Los tiquetes de Colombia a Europa varían entre $1.800.000 y $5.000.000 COP en clase económica, dependiendo de la temporada y anticipación de compra. Las mejores tarifas se encuentran comprando con 3-6 meses de anticipación. Temporada baja (noviembre-marzo) ofrece precios más económicos."
    },
    {
      q: "¿Cuáles son las mejores aerolíneas para volar de Colombia a Europa?",
      a: "Las principales aerolíneas son Avianca (vuelos directos Bogotá-Madrid), Iberia (vuelos directos Bogotá-Madrid), Air France (vía París), KLM (vía Ámsterdam), y Lufthansa (vía Frankfurt). Para mejores precios, también considere Copa Airlines con conexión en Panamá."
    },
    {
      q: "¿Hay vuelos directos de Colombia a Europa?",
      a: "Sí, existen vuelos directos desde Bogotá (BOG) a Madrid (MAD) operados por Avianca e Iberia con duración de aproximadamente 10 horas. Desde otras ciudades colombianas como Medellín, Cali o Cartagena, los vuelos tienen escala generalmente en Bogotá, Madrid o Panamá."
    }
  ]
},
{
  category: "Presupuesto y Costos",
  questions: [
    {
      q: "¿Cuánto dinero necesito para viajar a Europa desde Colombia?",
      a: "Para un viaje de 15 días a Europa desde Colombia, presupuesta entre $8.000.000 y $15.000.000 COP por persona, incluyendo tiquetes, alojamiento, alimentación y actividades. Europa del Este (Polonia, República Checa, Hungría) es más económica que Europa Occidental. Hostales y Airbnb reducen significativamente los costos."
    },
    {
      q: "¿Cuál es la mejor época para viajar de Colombia a Europa?",
      a: "La mejor época para viajar de Colombia a Europa depende del destino. Primavera (abril-junio) y otoño (septiembre-octubre) ofrecen clima agradable y menos turistas. Verano (julio-agosto) es temporada alta con precios elevados. Invierno (diciembre-febrero) tiene precios bajos pero clima frío, ideal para mercados navideños."
    }
  ]
},
{
  category: "Consejos Prácticos",
  questions: [
    {
      q: "¿Qué seguro de viaje necesito para Europa?",
      a: "Para obtener la visa Schengen, es obligatorio contar con un seguro de viaje con cobertura mínima de €30.000 para gastos médicos y repatriación. Recomendamos seguros de empresas como Assist Card, Allianz, o AXA que tienen buena cobertura en Europa y atención en español."
    },
    {
      q: "¿Puedo usar mi tarjeta de crédito colombiana en Europa?",
      a: "Sí, las tarjetas Visa y Mastercard colombianas funcionan en toda Europa. Sin embargo, informe a su banco antes de viajar para evitar bloqueos por transacciones internacionales. Considere llevar algo de efectivo en euros para mercados, propinas y lugares pequeños que no aceptan tarjeta."
    }
  ]
}
];

export default function BlogColombiaEuropa() {
const seoData = {
  title: "Viajes a Europa desde Colombia 2025 | Guía Completa de Vuelos y Visa",
  description: "Guía definitiva para viajar a Europa desde Colombia. Vuelos directos desde Bogotá, requisitos de visa Schengen, costos reales y los mejores destinos europeos para colombianos.",
  keywords: "viajes a europa desde colombia, vuelos colombia europa, visa schengen colombia, tiquetes bogota madrid, europa desde bogota, viaje europa colombianos",
  canonicalUrl: "https://tripseuropa.com/blog/colombia-europa",
  ogImage: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&q=80",
  lang: "es",
  hreflang: [
    { lang: "es", url: "https://tripseuropa.com/blog/colombia-europa" },
    { lang: "en", url: "https://tripseuropa.com/en/blog/colombia-europe" },
    { lang: "pt", url: "https://tripseuropa.com/pt/blog/colombia-europa" }
  ]
};

const breadcrumbs = [
  { name: "Inicio", url: "https://tripseuropa.com" },
  { name: "Blog", url: "https://tripseuropa.com/blog" },
  { name: "Colombia a Europa", url: "https://tripseuropa.com/blog/colombia-europa" }
];

const allFaqs = FAQS.flatMap(cat => cat.questions);

return (
  <>
    <SEOHead {...seoData} />
    <FAQSchema faqs={allFaqs} />
    <BreadcrumbSchema items={breadcrumbs} />
    <BlogPostSchema
      title={seoData.title}
      description={seoData.description}
      image={seoData.ogImage}
      datePublished="2025-01-15"
      dateModified="2025-06-01"
      authorName="Equipo TripsEuropa"
      url={seoData.canonicalUrl}
    />

    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 font-semibold">
              🇨🇴 Colombia → Europa
            </Badge>
            <Badge variant="outline" className="border-white text-white">
              Guía 2025
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Viajes a Europa desde Colombia:<br />
            <span className="text-yellow-400">La Guía Definitiva 2025</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl">
            Todo lo que necesitas saber para planear tu viaje a Europa desde Colombia. 
            Vuelos directos, visa Schengen, presupuestos reales y los mejores destinos para colombianos.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <Plane className="w-5 h-5 text-yellow-400" />
              <span>Vuelos directos desde BOG</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span>10-15 horas de vuelo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <Globe className="w-5 h-5 text-yellow-400" />
              <span>26 países con visa Schengen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Departure Cities */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vuelos a Europa desde Ciudades Colombianas
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Compara opciones de vuelo desde las principales ciudades de Colombia hacia Europa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTURE_CITIES.map((city) => (
              <Card key={city.code} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{city.city}</h3>
                    <Badge className="bg-blue-100 text-blue-800 font-mono">{city.code}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Tiempo de vuelo: <strong>{city.avgTime}</strong></span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Aerolíneas principales:</p>
                    <div className="flex flex-wrap gap-1">
                      {city.airlines.map((airline) => (
                        <Badge key={airline} variant="outline" className="text-xs">
                          {airline}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mejores Destinos en Europa para Colombianos
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Los destinos europeos más visitados por viajeros colombianos, con información práctica para cada uno.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOP_DESTINATIONS.map((dest) => (
              <Card key={dest.countryCode} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={`Viaje a ${dest.name} desde Colombia`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white text-gray-800 font-semibold shadow">
                      {dest.countryCode}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dest.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{dest.why}</p>
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">
                      Países cercanos para combinar:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {dest.nearby.map((country) => (
                        <Badge key={country} variant="outline" className="text-xs">
                          {country}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Rutas Más Populares Colombia - Europa
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Las conexiones aéreas más frecuentes y mejor valoradas por viajeros colombianos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {POPULAR_ROUTES.map((route) => (
              <Card key={route.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-white font-bold text-lg">{route.name}</h3>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{route.description}</p>
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Destinos incluidos:</p>
                    <div className="flex flex-wrap gap-1">
                      {route.destinations.map((d) => (
                        <Badge key={d} className="bg-blue-50 text-blue-700 text-xs">{d}</Badge>
                      ))}
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {route.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Section */}
      <section className="py-16 px-4 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Visa Schengen para Colombianos: Todo lo que Necesitas Saber
          </h2>
          <p className="text-blue-200 mb-10 text-lg">
            Requisitos, costos y proceso paso a paso para obtener tu visa europea desde Colombia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <DollarSign className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="font-bold text-lg mb-2">Costo Oficial</h3>
                <p className="text-blue-200 text-sm">€80 (aprox. $350.000 COP) + seguro de viaje obligatorio desde €30.000 de cobertura</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <Calendar className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="font-bold text-lg mb-2">Tiempo de Proceso</h3>
                <p className="text-blue-200 text-sm">15-30 días hábiles. Solicita con 3 meses de anticipación para evitar contratiempos.</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <Globe className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="font-bold text-lg mb-2">Cobertura</h3>
                <p className="text-blue-200 text-sm">26 países del espacio Schengen con una sola visa. Válida hasta 90 días en 180 días.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes: Viajes a Europa desde Colombia
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Resolvemos las dudas más comunes de los colombianos que planean viajar a Europa.
          </p>
          {FAQS.map((category) => (
            <div key={category.category} className="mb-10">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-500 rounded-full inline-block" />
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, i) => (
                  <Card key={i} className="border-l-4 border-l-blue-200">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                        <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                        {faq.q}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed pl-6">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para tu Viaje a Europa desde Colombia?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Compara precios de vuelos, encuentra los mejores paquetes y planea tu aventura europea con TripsEuropa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 font-bold">
              <Plane className="w-5 h-5 mr-2" />
              Buscar Vuelos a Europa
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <ArrowRight className="w-5 h-5 mr-2" />
              Ver Paquetes Todo Incluido
            </Button>
          </div>
        </div>
      </section>
    </div>
  </>
);
}
