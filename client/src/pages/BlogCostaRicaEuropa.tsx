import { Helmet } from "react-helmet";
import { Link } from "wouter";

const TOP_DESTINATIONS = [
{
  city: "Madrid",
  country: "España",
  description: "La capital española es el destino europeo más popular para los costarricenses. Idioma compartido, cultura vibrante y vuelos directos desde San José hacen de Madrid la puerta de entrada a Europa.",
  bestTime: "Abril a Junio / Septiembre a Noviembre",
  avgFlight: "10-11 horas",
  visa: "Schengen",
},
{
  city: "París",
  country: "Francia",
  description: "La Torre Eiffel, el Louvre y los Campos Elíseos. París es el destino romántico por excelencia y un imperdible en cualquier viaje europeo desde Costa Rica.",
  bestTime: "Abril a Junio / Septiembre a Octubre",
  avgFlight: "11-13 horas",
  visa: "Schengen",
},
{
  city: "Roma",
  country: "Italia",
  description: "El Coliseo, el Vaticano y la pasta auténtica. Roma es una ciudad que enamora a primera vista y perfecta para los amantes de la historia y la gastronomía.",
  bestTime: "Marzo a Mayo / Septiembre a Noviembre",
  avgFlight: "12-14 horas",
  visa: "Schengen",
},
{
  city: "Barcelona",
  country: "España",
  description: "Gaudí, playas mediterráneas y tapas. Barcelona es una ciudad vibrante que combina arte, cultura y gastronomía en un entorno mediterráneo único.",
  bestTime: "Mayo a Octubre",
  avgFlight: "10-12 horas",
  visa: "Schengen",
},
{
  city: "Lisboa",
  country: "Portugal",
  description: "La capital portuguesa ofrece historia, fado y pasteles de nata a precios muy accesibles. Una joya europea perfecta para explorar con presupuesto moderado.",
  bestTime: "Marzo a Octubre",
  avgFlight: "11-13 horas",
  visa: "Schengen",
},
{
  city: "Ámsterdam",
  country: "Países Bajos",
  description: "Canales, museos de clase mundial y una cultura cosmopolita. Ámsterdam es perfecta como base para explorar Europa del Norte y Central.",
  bestTime: "Abril a Agosto",
  avgFlight: "12-14 horas",
  visa: "Schengen",
},
];

const POPULAR_ROUTES = [
{
  origin: "San José (SJO)",
  destination: "Madrid (MAD)",
  duration: "10-11 horas",
  airlines: ["Iberia", "Air Europa", "Copa Airlines"],
  tip: "Iberia opera vuelos directos SJO-Madrid. Copa Airlines tiene excelentes conexiones vía Panamá. Es la ruta más popular y con mejor relación precio-calidad.",
},
{
  origin: "San José (SJO)",
  destination: "París (CDG)",
  duration: "11-12 horas",
  airlines: ["Air France", "Iberia"],
  tip: "Air France tiene vuelos directos. Considera volar a Madrid y tomar el tren AVE a París para mayor flexibilidad y ahorro.",
},
{
  origin: "San José (SJO)",
  destination: "Amsterdam (AMS)",
  duration: "12-13 horas",
  airlines: ["KLM", "Copa Airlines"],
  tip: "KLM opera vuelos directos SJO-Amsterdam. Excelente opción para explorar Europa del Norte.",
},
{
  origin: "San José (SJO)",
  destination: "Lisboa (LIS)",
  duration: "11-12 horas",
  airlines: ["TAP Air Portugal", "Iberia"],
  tip: "TAP ofrece buenas conexiones. Lisboa es más económica que Madrid o París y sirve como puerta de entrada a Europa.",
},
];

const FAQS = [
{
  question: "¿Necesitan visa los costarricenses para viajar a Europa?",
  answer: "Los ciudadanos costarricenses con pasaporte costarricense pueden ingresar al espacio Schengen sin visa por hasta 90 días en un período de 180 días. Solo necesitas pasaporte vigente con al menos 6 meses de validez. A partir de 2025 se implementará el sistema ETIAS.",
},
{
  question: "¿Cuánto cuesta un viaje a Europa desde Costa Rica?",
  answer: "Un viaje de 12-15 días a Europa desde San José puede costar entre USD 2,000 y USD 4,500 por persona incluyendo vuelos, alojamiento y gastos. Los vuelos directos desde SJO cuestan entre USD 700 y USD 1,300 en clase económica según la temporada.",
},
{
  question: "¿Cuál es la mejor época para viajar a Europa desde Costa Rica?",
  answer: "La primavera europea (abril-mayo) y el otoño (septiembre-octubre) son ideales por clima y precios. La temporada baja (noviembre-febrero, excepto Navidad) ofrece los mejores precios. Julio-agosto es temporada alta con precios más elevados.",
},
{
  question: "¿Qué aerolíneas vuelan directo desde San José a Europa?",
  answer: "Iberia vuela directo SJO-Madrid. Air France tiene vuelos directos a París. KLM opera SJO-Amsterdam. Copa Airlines tiene excelentes conexiones con múltiples destinos europeos vía su hub en Panamá.",
},
{
  question: "¿Cuánto tiempo de anticipación debo comprar el vuelo?",
  answer: "Para conseguir los mejores precios, se recomienda comprar con 3-4 meses de anticipación para temporada baja y 5-6 meses para temporada alta (julio-agosto y Navidad). Usa alertas de precio en Google Flights o Skyscanner.",
},
{
  question: "¿Qué seguro de viaje necesito para Europa?",
  answer: "Aunque no es obligatorio para entrar al espacio Schengen con pasaporte costarricense, es altamente recomendable. Un seguro de viaje con cobertura médica de al menos EUR 30,000 te protege ante emergencias médicas, cancelaciones y pérdida de equipaje.",
},
];

export default function BlogCostaRicaEuropa() {
return (
  <>
    <Helmet>
      <title>Viajes a Europa desde Costa Rica 2025 | Vuelos, Precios y Guía Completa</title>
      <meta
        name="description"
        content="Guía completa para viajar a Europa desde Costa Rica. Vuelos directos desde San José, precios, sin visa Schengen y los mejores destinos europeos para costarricenses."
      />
      <meta
        name="keywords"
        content="viajes a europa desde costa rica, vuelos san jose europa, sin visa schengen costa rica, paquetes europa costa rica, cuanto cuesta viajar a europa desde costa rica"
      />
      <link rel="canonical" href="https://tripseuropa.com/blog/costa-rica-europa" />
      <meta property="og:title" content="Viajes a Europa desde Costa Rica 2025 | Guía Completa" />
      <meta property="og:description" content="Todo lo que necesitas saber para viajar a Europa desde Costa Rica: vuelos directos, precios y los mejores destinos." />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://tripseuropa.com/blog/costa-rica-europa" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Viajes a Europa desde Costa Rica 2025",
        "description": "Guía completa para viajar a Europa desde Costa Rica con información sobre vuelos directos, precios y mejores destinos.",
        "author": { "@type": "Organization", "name": "Trips Europa" },
        "publisher": { "@type": "Organization", "name": "Trips Europa", "url": "https://tripseuropa.com" },
        "datePublished": "2025-01-01",
        "dateModified": "2025-06-01",
      })}</script>
    </Helmet>

    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-600 to-blue-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
            🇨🇷 Desde Costa Rica → 🇪🇺 Europa
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Viajes a Europa desde Costa Rica:<br />
            <span className="text-yellow-300">Guía Completa 2025</span>
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Todo lo que necesitas saber para planificar tu viaje a Europa desde San José: vuelos directos, precios reales y los mejores destinos europeos.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 rounded-full px-4 py-2">✈️ Vuelos directos disponibles</span>
            <span className="bg-white/20 rounded-full px-4 py-2">🛂 Sin visa Schengen</span>
            <span className="bg-white/20 rounded-full px-4 py-2">💰 Desde USD 700 el vuelo</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Costa Rica tiene excelentes conexiones aéreas hacia Europa. Desde el Aeropuerto Internacional Juan Santamaría (SJO) en San José, existen vuelos directos a Madrid, París y Amsterdam, con tiempos de vuelo de apenas 10-13 horas.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Los ciudadanos costarricenses tienen la ventaja de no necesitar visa para ingresar al espacio Schengen, lo que simplifica enormemente la planificación. En esta guía encontrarás toda la información actualizada para 2025.
          </p>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Mejores Destinos en Europa para Costarricenses
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Los destinos más populares entre los viajeros costarricenses, con información práctica sobre vuelos y la mejor época para visitar.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_DESTINATIONS.map((dest) => (
              <div key={dest.city} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{dest.city}</h3>
                    <p className="text-green-600 font-medium text-sm">{dest.country}</p>
                  </div>
                  <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full">{dest.visa}</span>
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
          Vuelos desde San José a Europa
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Las rutas más populares con aerolíneas, duración y consejos para conseguir los mejores precios.
        </p>
        <div className="space-y-4">
          {POPULAR_ROUTES.map((route) => (
            <div key={route.destination} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-bold text-gray-900">{route.origin}</span>
                <span className="text-green-500 text-xl">→</span>
                <span className="font-bold text-green-700">{route.destination}</span>
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

      {/* FAQ */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Preguntas Frecuentes: Viajes a Europa desde Costa Rica
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details key={faq.question} className="bg-white rounded-xl shadow-sm border border-gray-100 group">
                <summary className="p-6 cursor-pointer font-semibold text-gray-900 flex items-center justify-between list-none">
                  {faq.question}
                  <span className="text-green-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Viajar a Europa desde Costa Rica?</h2>
          <p className="text-green-100 text-lg mb-8">
            Nuestros especialistas te ayudarán a planificar el viaje europeo perfecto con los mejores precios del mercado.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contacto">
              <a className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-4 rounded-xl transition-colors text-lg">
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