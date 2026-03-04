import { Helmet } from "react-helmet";
import { Link } from "wouter";

const TOP_DESTINATIONS = [
{
  city: "París",
  country: "Francia",
  description: "La Ciudad Luz te espera con el Louvre, la Torre Eiffel y una gastronomía inigualable. Vuelos directos desde Buenos Aires en aproximadamente 14 horas.",
  bestTime: "Abril a Junio / Septiembre a Noviembre",
  avgFlight: "14-16 horas",
  visa: "Schengen",
},
{
  city: "Roma",
  country: "Italia",
  description: "El Coliseo, el Vaticano y la Fontana di Trevi son solo el comienzo. Italia es el destino favorito de los argentinos por su cultura y gastronomía.",
  bestTime: "Marzo a Mayo / Septiembre a Noviembre",
  avgFlight: "13-15 horas",
  visa: "Schengen",
},
{
  city: "Barcelona",
  country: "España",
  description: "Gaudí, Las Ramblas y la playa en una sola ciudad. España es el destino más visitado por argentinos gracias al idioma compartido.",
  bestTime: "Mayo a Octubre",
  avgFlight: "12-14 horas",
  visa: "Schengen",
},
{
  city: "Lisboa",
  country: "Portugal",
  description: "La capital portuguesa ofrece historia, fado y pasteles de nata a precios muy accesibles. Una joya europea cada vez más popular entre los argentinos.",
  bestTime: "Marzo a Octubre",
  avgFlight: "13-15 horas",
  visa: "Schengen",
},
{
  city: "Ámsterdam",
  country: "Países Bajos",
  description: "Canales, museos de clase mundial y una cultura vibrante. Ámsterdam es perfecta como base para explorar Europa del Norte.",
  bestTime: "Abril a Agosto",
  avgFlight: "14-16 horas",
  visa: "Schengen",
},
{
  city: "Berlín",
  country: "Alemania",
  description: "Historia, arte y una escena cultural única. Berlín es una de las ciudades más fascinantes de Europa con una energía inigualable.",
  bestTime: "Mayo a Septiembre",
  avgFlight: "14-16 horas",
  visa: "Schengen",
},
];

const POPULAR_ROUTES = [
{
  origin: "Buenos Aires (EZE)",
  destination: "Madrid (MAD)",
  duration: "12-13 horas",
  airlines: ["Aerolíneas Argentinas", "Iberia", "Air Europa"],
  tip: "Aerolíneas Argentinas opera vuelos directos diarios. Reserva con 3-4 meses de anticipación para mejores tarifas.",
},
{
  origin: "Buenos Aires (EZE)",
  destination: "París (CDG)",
  duration: "14-15 horas",
  airlines: ["Air France", "Aerolíneas Argentinas"],
  tip: "Air France opera vuelos directos. Considera volar a Madrid y tomar un tren AVE a París para ahorrar.",
},
{
  origin: "Buenos Aires (EZE)",
  destination: "Roma (FCO)",
  duration: "13-14 horas",
  airlines: ["Aerolíneas Argentinas", "Alitalia/ITA", "Iberia"],
  tip: "Aerolíneas Argentinas tiene vuelos directos a Roma. Temporada alta es julio-agosto, reserva con anticipación.",
},
{
  origin: "Buenos Aires (EZE)",
  destination: "Lisboa (LIS)",
  duration: "13-14 horas",
  airlines: ["TAP Air Portugal", "Aerolíneas Argentinas"],
  tip: "TAP ofrece excelentes conexiones. Lisboa es más económica que Madrid o París y sirve como puerta de entrada a Europa.",
},
];

const FAQS = [
{
  question: "¿Necesitan visa los argentinos para viajar a Europa?",
  answer: "Los ciudadanos argentinos con pasaporte argentino pueden ingresar a los países del espacio Schengen sin visa por hasta 90 días dentro de un período de 180 días. Sin embargo, a partir de 2025 se implementará el sistema ETIAS (similar al ESTA de EE.UU.) que requerirá una autorización previa de viaje.",
},
{
  question: "¿Cuánto cuesta un viaje a Europa desde Argentina?",
  answer: "Un viaje de 15 días a Europa desde Buenos Aires puede costar entre USD 2,500 y USD 5,000 por persona incluyendo vuelos, alojamiento y gastos básicos. Los vuelos representan el mayor gasto, con precios que van desde USD 800 hasta USD 1,800 en clase económica según la temporada.",
},
{
  question: "¿Cuál es la mejor época para viajar a Europa desde Argentina?",
  answer: "La temporada baja europea (noviembre a marzo, excluyendo Navidad) ofrece los mejores precios. La primavera europea (abril-mayo) y el otoño (septiembre-octubre) son ideales por el clima y menor afluencia turística. Evita julio-agosto si buscas precios económicos.",
},
{
  question: "¿Qué aerolíneas vuelan directo desde Buenos Aires a Europa?",
  answer: "Aerolíneas Argentinas vuela directo a Madrid, Roma y Barcelona. Air France opera vuelos directos a París. Iberia y Air Europa también tienen vuelos directos a Madrid. Para otros destinos europeos, generalmente se hace escala en Madrid, Lisboa o París.",
},
{
  question: "¿Cuánto dinero llevar para un viaje a Europa?",
  answer: "Se recomienda presupuestar entre EUR 80 y EUR 150 por día para gastos en Europa (alojamiento, comidas, transporte local y actividades). Europa del Este y Portugal son más económicos, mientras que Suiza, Noruega y los países nórdicos son los más caros.",
},
{
  question: "¿Conviene comprar el pasaje en pesos o en dólares?",
  answer: "Dado el contexto cambiario argentino, es recomendable comparar precios en diferentes monedas y plataformas. Muchas aerolíneas permiten pagar en pesos a tipo de cambio oficial, mientras que otras plataformas pueden ofrecer mejores precios en dólares. Consulta con un agente de viajes especializado.",
},
];

export default function BlogArgentinaEuropa() {
return (
  <>
    <Helmet>
      <title>Viajes a Europa desde Argentina 2025 | Vuelos, Precios y Guía Completa</title>
      <meta
        name="description"
        content="Guía completa para viajar a Europa desde Argentina. Vuelos directos desde Buenos Aires, precios, visa Schengen, mejores destinos y consejos para argentinos. ¡Planifica tu viaje europeo!"
      />
      <meta
        name="keywords"
        content="viajes a europa desde argentina, vuelos buenos aires europa, visa schengen argentina, paquetes europa argentina, cuanto cuesta viajar a europa desde argentina"
      />
      <link rel="canonical" href="https://tripseuropa.com/blog/argentina-europa" />
      <meta property="og:title" content="Viajes a Europa desde Argentina 2025 | Guía Completa" />
      <meta property="og:description" content="Todo lo que necesitas saber para viajar a Europa desde Argentina: vuelos, precios, visa y los mejores destinos." />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://tripseuropa.com/blog/argentina-europa" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Viajes a Europa desde Argentina 2025",
        "description": "Guía completa para viajar a Europa desde Argentina con información sobre vuelos, precios, visa Schengen y mejores destinos.",
        "author": { "@type": "Organization", "name": "Trips Europa" },
        "publisher": { "@type": "Organization", "name": "Trips Europa", "url": "https://tripseuropa.com" },
        "datePublished": "2025-01-01",
        "dateModified": "2025-06-01",
      })}</script>
    </Helmet>

    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
            🇦🇷 Desde Argentina → 🇪🇺 Europa
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Viajes a Europa desde Argentina:<br />
            <span className="text-yellow-300">Guía Completa 2025</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Todo lo que necesitas saber para planificar tu viaje a Europa desde Buenos Aires: vuelos directos, precios reales, visa Schengen y los mejores destinos.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 rounded-full px-4 py-2">✈️ Vuelos directos disponibles</span>
            <span className="bg-white/20 rounded-full px-4 py-2">🛂 Sin visa hasta 90 días</span>
            <span className="bg-white/20 rounded-full px-4 py-2">💰 Desde USD 800 el vuelo</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Argentina tiene una conexión especial con Europa. Con una gran parte de la población de origen europeo, viajar al viejo continente es casi un viaje a las raíces. Desde Buenos Aires, existen vuelos directos a Madrid, Roma, París y Barcelona, lo que facilita enormemente la planificación.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            En esta guía encontrarás toda la información actualizada para 2025: aerolíneas, precios, requisitos de entrada, los mejores destinos y consejos prácticos para que tu viaje a Europa sea perfecto.
          </p>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Los Mejores Destinos en Europa para Argentinos
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Estos son los destinos más populares entre los viajeros argentinos, con información práctica sobre vuelos y la mejor época para visitar.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_DESTINATIONS.map((dest) => (
              <div key={dest.city} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{dest.city}</h3>
                    <p className="text-blue-600 font-medium text-sm">{dest.country}</p>
                  </div>
                  <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">{dest.visa}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{dest.description}</p>
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>🗓️</span>
                    <span><strong>Mejor época:</strong> {dest.bestTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✈️</span>
                    <span><strong>Vuelo:</strong> {dest.avgFlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Rutas de Vuelo desde Buenos Aires a Europa
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Las rutas más populares con aerolíneas, duración y consejos para conseguir los mejores precios.
        </p>
        <div className="space-y-4">
          {POPULAR_ROUTES.map((route) => (
            <div key={route.destination} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-bold text-gray-900">{route.origin}</span>
                <span className="text-blue-500 text-xl">→</span>
                <span className="font-bold text-blue-700">{route.destination}</span>
                <span className="ml-auto bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                  ⏱️ {route.duration}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {route.airlines.map((airline) => (
                  <span key={airline} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{airline}</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm">💡 {route.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visa Info */}
      <section className="bg-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Visa Schengen para Argentinos: Lo Que Debes Saber
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-green-700 mb-3">✅ Acceso sin visa</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Los ciudadanos argentinos pueden ingresar al espacio Schengen (26 países europeos) sin visa por hasta <strong>90 días en un período de 180 días</strong>. Solo necesitas pasaporte vigente con al menos 6 meses de validez.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-orange-700 mb-3">⚠️ ETIAS desde 2025</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A partir de 2025, se implementará el sistema <strong>ETIAS</strong> (Autorización Europea de Viaje e Información). Será un trámite online simple, similar al ESTA de EE.UU., con un costo aproximado de EUR 7.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-blue-700 mb-3">📋 Documentos necesarios</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Pasaporte vigente (mín. 6 meses)</li>
                <li>• Reserva de vuelos de ida y vuelta</li>
                <li>• Reserva de alojamiento</li>
                <li>• Seguro de viaje con cobertura médica</li>
                <li>• Medios económicos suficientes</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-purple-700 mb-3">🌍 Países Schengen</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Alemania, Austria, Bélgica, Dinamarca, Eslovenia, España, Estonia, Finlandia, Francia, Grecia, Hungría, Islandia, Italia, Letonia, Liechtenstein, Lituania, Luxemburgo, Malta, Noruega, Países Bajos, Polonia, Portugal, República Checa, Suecia, Suiza y Eslovaquia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Guide */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          ¿Cuánto Cuesta Viajar a Europa desde Argentina?
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-sm rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="text-left p-4 font-semibold">Gasto</th>
                <th className="text-left p-4 font-semibold">Económico</th>
                <th className="text-left p-4 font-semibold">Estándar</th>
                <th className="text-left p-4 font-semibold">Confort</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Vuelo ida y vuelta", "USD 800-1,000", "USD 1,000-1,400", "USD 1,400-2,000"],
                ["Alojamiento (por noche)", "EUR 30-50", "EUR 60-100", "EUR 120-200"],
                ["Comidas (por día)", "EUR 20-30", "EUR 40-60", "EUR 70-100"],
                ["Transporte local", "EUR 5-10/día", "EUR 15-25/día", "EUR 30-50/día"],
                ["Actividades", "EUR 10-20/día", "EUR 30-50/día", "EUR 60-100/día"],
                ["Total 15 días", "USD 2,000-2,800", "USD 3,200-4,500", "USD 5,000-8,000"],
              ].map(([item, eco, std, com]) => (
                <tr key={item} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{item}</td>
                  <td className="p-4 text-green-700">{eco}</td>
                  <td className="p-4 text-blue-700">{std}</td>
                  <td className="p-4 text-purple-700">{com}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Preguntas Frecuentes: Viajes a Europa desde Argentina
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details key={faq.question} className="bg-white rounded-xl shadow-sm border border-gray-100 group">
                <summary className="p-6 cursor-pointer font-semibold text-gray-900 flex items-center justify-between list-none">
                  {faq.question}
                  <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Viajar a Europa desde Argentina?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Nuestros especialistas en viajes europeos te ayudarán a planificar el viaje perfecto con los mejores precios del mercado.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contacto">
              <a className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-4 rounded-xl transition-colors text-lg">
                Consultar Precios
              </a>
            </Link>
            <Link href="/paquetes">
              <a className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg border border-white/30">
                Ver Paquetes
              </a>
            </Link>
          </div>
        </div>
      </section>
    </main>
  </>
);
}
