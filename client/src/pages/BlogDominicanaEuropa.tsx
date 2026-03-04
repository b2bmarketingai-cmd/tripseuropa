import { Helmet } from "react-helmet";
import { Link } from "wouter";

const TOP_DESTINATIONS = [
{
  city: "Madrid",
  country: "España",
  description: "La capital española es el destino europeo más popular para los dominicanos. Idioma compartido, una gran comunidad dominicana y vuelos directos desde Santo Domingo hacen de Madrid el destino ideal.",
  bestTime: "Abril a Junio / Septiembre a Noviembre",
  avgFlight: "9-10 horas",
  visa: "Schengen",
},
{
  city: "París",
  country: "Francia",
  description: "La Torre Eiffel, el Louvre y la gastronomía francesa. París es el destino romántico por excelencia y un imperdible en cualquier viaje europeo desde República Dominicana.",
  bestTime: "Abril a Junio / Septiembre a Octubre",
  avgFlight: "10-12 horas",
  visa: "Schengen",
},
{
  city: "Roma",
  country: "Italia",
  description: "El Coliseo, el Vaticano y la pasta auténtica. Roma es una ciudad que enamora a primera vista y perfecta para los amantes de la historia y la cultura.",
  bestTime: "Marzo a Mayo / Septiembre a Noviembre",
  avgFlight: "11-13 horas",
  visa: "Schengen",
},
{
  city: "Barcelona",
  country: "España",
  description: "Gaudí, playas mediterráneas y tapas. Barcelona es una ciudad vibrante que combina arte, cultura y gastronomía en un entorno mediterráneo único.",
  bestTime: "Mayo a Octubre",
  avgFlight: "9-11 horas",
  visa: "Schengen",
},
{
  city: "Lisboa",
  country: "Portugal",
  description: "La capital portuguesa ofrece historia, fado y pasteles de nata a precios muy accesibles. Una joya europea perfecta para explorar con presupuesto moderado.",
  bestTime: "Marzo a Octubre",
  avgFlight: "9-11 horas",
  visa: "Schengen",
},
{
  city: "Ámsterdam",
  country: "Países Bajos",
  description: "Canales, museos de clase mundial y una cultura cosmopolita. Ámsterdam es perfecta como base para explorar Europa del Norte y Central.",
  bestTime: "Abril a Agosto",
  avgFlight: "10-12 horas",
  visa: "Schengen",
},
];

const POPULAR_ROUTES = [
{
  origin: "Santo Domingo (SDQ)",
  destination: "Madrid (MAD)",
  duration: "9-10 horas",
  airlines: ["Iberia", "Air Europa", "LATAM"],
  tip: "Iberia y Air Europa operan vuelos directos SDQ-Madrid. Es la ruta más popular con múltiples frecuencias semanales. Reserva con 3-4 meses de anticipación.",
},
{
  origin: "Santo Domingo (SDQ)",
  destination: "París (CDG)",
  duration: "10-11 horas",
  airlines: ["Air France", "Iberia"],
  tip: "Air France tiene vuelos directos. Considera volar a Madrid y tomar el tren AVE a París para mayor flexibilidad.",
},
{
  origin: "Punta Cana (PUJ)",
  destination: "Madrid (MAD)",
  duration: "9-10 horas",
  airlines: ["Iberia", "Air Europa"],
  tip: "Iberia opera vuelos directos desde Punta Cana. Excelente opción si vives en el este del país.",
},
{
  origin: "Santo Domingo (SDQ)",
  destination: "Lisboa (LIS)",
  duration: "9-10 horas",
  airlines: ["TAP Air Portugal", "Iberia"],
  tip: "TAP ofrece buenas conexiones. Lisboa es más económica que Madrid o París y sirve como puerta de entrada a Europa.",
},
];

const FAQS = [
{
  question: "¿Necesitan visa los dominicanos para viajar a Europa?",
  answer: "Sí, los ciudadanos dominicanos necesitan visa Schengen para ingresar a los países del espacio Schengen. Debes solicitarla en el consulado del país europeo que sea tu destino principal. El proceso toma entre 15 y 30 días hábiles.",
},
{
  question: "¿Cómo solicitar la visa Schengen desde República Dominicana?",
  answer: "Debes presentarte en el consulado del país de destino principal con: pasaporte vigente, formulario de solicitud, foto reciente, reserva de vuelos, reserva de alojamiento, seguro de viaje, extractos bancarios de los últimos 3 meses, carta de trabajo o actividad económica, y pago de la tasa consular (aprox. EUR 80).",
},
{
  question: "¿Cuánto cuesta un viaje a Europa desde República Dominicana?",
  answer: "Un viaje de 12-15 días a Europa desde Santo Domingo puede costar entre USD 2,000 y USD 4,500 por persona incluyendo vuelos, alojamiento y gastos. Los vuelos directos desde SDQ cuestan entre USD 600 y USD 1,200 en clase económica según la temporada.",
},
{
  question: "¿Cuál es la mejor época para viajar a Europa desde República Dominicana?",
  answer: "La primavera europea (abril-mayo) y el otoño (septiembre-octubre) son ideales por clima y precios. La temporada baja (noviembre-febrero, excepto Navidad) ofrece los mejores precios. Julio-agosto es temporada alta con precios más elevados.",
},
{
  question: "¿Qué aerolíneas vuelan directo desde Santo Domingo a Europa?",
  answer: "Iberia y Air Europa vuelan directo SDQ-Madrid. Air France tiene vuelos directos a París. TAP Air Portugal opera conexiones vía Lisboa. Desde Punta Cana también hay vuelos directos a Madrid con Iberia.",
},
{
  question: "¿Cuánto tiempo antes debo solicitar la visa Schengen?",
  answer: "Se recomienda solicitar la visa con al menos 3 meses de anticipación. Los consulados pueden tardar entre 15 y 45 días hábiles en procesar la solicitud. No puedes solicitarla con más de 6 meses de anticipación a tu fecha de viaje.",
},
];

export default function BlogDominicanaEuropa() {
return (
  <>
    <Helmet>
      <title>Viajes a Europa desde República Dominicana 2025 | Visa, Vuelos y Guía</title>
      <meta
        name="description"
        content="Guía completa para viajar a Europa desde República Dominicana. Visa Schengen, vuelos directos desde Santo Domingo y Punta Cana, precios y los mejores destinos europeos."
      />
      <meta
        name="keywords"
        content="viajes a europa desde republica dominicana, visa schengen dominicana, vuelos santo domingo europa, paquetes europa dominicana, como viajar a europa desde dominicana"
      />
      <link rel="canonical" href="https://tripseuropa.com/blog/dominicana-europa" />
      <meta property="og:title" content="Viajes a Europa desde República Dominicana 2025 | Guía Completa" />
      <meta property="og:description" content="Todo lo que necesitas saber para viajar a Europa desde República Dominicana: visa Schengen, vuelos y los mejores destinos." />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://tripseuropa.com/blog/dominicana-europa" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Viajes a Europa desde República Dominicana 2025",
        "description": "Guía completa para viajar a Europa desde República Dominicana con información sobre visa Schengen, vuelos y mejores destinos.",
        "author": { "@type": "Organization", "name": "Trips Europa" },
        "publisher": { "@type": "Organization", "name": "Trips Europa", "url": "https://tripseuropa.com" },
        "datePublished": "2025-01-01",
        "dateModified": "2025-06-01",
      })}</script>
    </Helmet>

    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-red-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
            🇩🇴 Desde República Dominicana → 🇪🇺 Europa
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Viajes a Europa desde República Dominicana:<br />
            <span className="text-yellow-300">Guía Completa 2025</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Todo lo que necesitas saber para viajar a Europa desde Santo Domingo o Punta Cana: visa Schengen, vuelos directos, precios y los mejores destinos.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 rounded-full px-4 py-2">✈️ Vuelos directos disponibles</span>
            <span className="bg-white/20 rounded-full px-4 py-2">🛂 Visa Schengen requerida</span>
            <span className="bg-white/20 rounded-full px-4 py-2">💰 Desde USD 600 el vuelo</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            República Dominicana tiene excelentes conexiones aéreas hacia Europa. Desde el Aeropuerto Internacional Las Américas (SDQ) en Santo Domingo y el Aeropuerto Internacional de Punta Cana (PUJ), existen vuelos directos a Madrid y París, con tiempos de vuelo de apenas 9-11 horas.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            El principal requisito es obtener la visa Schengen. Con la documentación correcta y suficiente anticipación, el proceso es completamente manejable. En esta guía te explicamos todo paso a paso.
          </p>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Mejores Destinos en Europa para Dominicanos
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Los destinos más populares entre los viajeros dominicanos, con información práctica sobre vuelos y la mejor época para visitar.
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
          Vuelos desde República Dominicana a Europa
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Las rutas más populares con aerolíneas, duración y consejos para conseguir los mejores precios.
        </p>
        <div className="space-y-4">
          {POPULAR_ROUTES.map((route) => (
            <div key={`${route.origin}-${route.destination}`} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
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

      {/* FAQ */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Preguntas Frecuentes: Viajes a Europa desde República Dominicana
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
          <h2 className="text-3xl font-bold mb-4">¿Listo para Viajar a Europa desde República Dominicana?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Te ayudamos con la visa Schengen, los vuelos y el itinerario perfecto para tu viaje europeo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contacto">
              <a className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-4 rounded-xl transition-colors text-lg">
                Consultar Ahora
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
