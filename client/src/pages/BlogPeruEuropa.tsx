import { Helmet } from "react-helmet";
import { Link } from "wouter";

const TOP_DESTINATIONS = [
{
  city: "Madrid",
  country: "España",
  description: "La capital española es el destino favorito de los peruanos. Idioma compartido, gastronomía fusión y una comunidad peruana vibrante hacen de Madrid el primer destino europeo.",
  bestTime: "Abril a Junio / Septiembre a Noviembre",
  avgFlight: "12-14 horas",
  visa: "Schengen",
},
{
  city: "París",
  country: "Francia",
  description: "La Torre Eiffel, el Louvre y los Campos Elíseos. París es el sueño europeo de muchos peruanos y un destino imperdible en cualquier itinerario europeo.",
  bestTime: "Abril a Junio / Septiembre a Octubre",
  avgFlight: "14-16 horas",
  visa: "Schengen",
},
{
  city: "Roma",
  country: "Italia",
  description: "El Coliseo, el Vaticano y la pasta auténtica. Roma es una ciudad que enamora a primera vista y es perfecta para los amantes de la historia.",
  bestTime: "Marzo a Mayo / Septiembre a Noviembre",
  avgFlight: "14-16 horas",
  visa: "Schengen",
},
{
  city: "Lisboa",
  country: "Portugal",
  description: "La ciudad más accesible de Europa occidental. Lisboa ofrece historia, cultura y una gastronomía excepcional a precios muy razonables.",
  bestTime: "Marzo a Octubre",
  avgFlight: "13-15 horas",
  visa: "Schengen",
},
{
  city: "Ámsterdam",
  country: "Países Bajos",
  description: "Canales, museos y una cultura cosmopolita. Ámsterdam es perfecta como hub para explorar Europa del Norte y Central.",
  bestTime: "Abril a Agosto",
  avgFlight: "15-17 horas",
  visa: "Schengen",
},
{
  city: "Berlín",
  country: "Alemania",
  description: "Historia viva, arte urbano y una escena cultural única. Berlín es una de las ciudades más fascinantes y asequibles de Europa occidental.",
  bestTime: "Mayo a Septiembre",
  avgFlight: "15-17 horas",
  visa: "Schengen",
},
];

const POPULAR_ROUTES = [
{
  origin: "Lima (LIM)",
  destination: "Madrid (MAD)",
  duration: "12-13 horas",
  airlines: ["Iberia", "Air Europa", "LATAM"],
  tip: "Iberia y Air Europa operan vuelos directos desde Lima. Es la ruta más popular y con mayor frecuencia de vuelos.",
},
{
  origin: "Lima (LIM)",
  destination: "Amsterdam (AMS)",
  duration: "15-16 horas",
  airlines: ["KLM", "Air France"],
  tip: "KLM opera vuelos directos Lima-Amsterdam. Excelente opción para explorar Europa del Norte.",
},
{
  origin: "Lima (LIM)",
  destination: "París (CDG)",
  duration: "14-15 horas",
  airlines: ["Air France", "Iberia"],
  tip: "Air France tiene vuelos directos. Considera volar a Madrid y tomar el tren AVE a París para mayor flexibilidad.",
},
{
  origin: "Lima (LIM)",
  destination: "Lisboa (LIS)",
  duration: "13-14 horas",
  airlines: ["TAP Air Portugal", "Iberia"],
  tip: "TAP ofrece buenas conexiones desde Lima. Lisboa es más económica y sirve como puerta de entrada a Europa.",
},
];

const FAQS = [
{
  question: "¿Necesitan visa los peruanos para viajar a Europa?",
  answer: "Sí, los ciudadanos peruanos necesitan visa Schengen para ingresar a los países del espacio Schengen. Debes solicitarla en el consulado del país europeo que sea tu destino principal o primer punto de entrada. El proceso toma entre 15 y 30 días hábiles.",
},
{
  question: "¿Cómo solicitar la visa Schengen desde Perú?",
  answer: "Debes presentarte en el consulado del país de destino principal con: pasaporte vigente, formulario de solicitud, foto reciente, reserva de vuelos, reserva de alojamiento, seguro de viaje, extractos bancarios de los últimos 3 meses, carta de trabajo o actividad económica, y pago de la tasa consular (aprox. EUR 80).",
},
{
  question: "¿Cuánto cuesta un viaje a Europa desde Lima?",
  answer: "Un viaje de 15 días a Europa desde Lima puede costar entre USD 2,800 y USD 5,500 por persona incluyendo vuelos, alojamiento y gastos. Los vuelos directos desde Lima cuestan entre USD 900 y USD 1,600 en clase económica según la temporada.",
},
{
  question: "¿Cuál es la mejor época para viajar a Europa desde Perú?",
  answer: "La primavera europea (abril-mayo) y el otoño (septiembre-octubre) son las mejores épocas por clima y precios. La temporada baja (noviembre-febrero, excepto Navidad) ofrece los precios más bajos. Evita julio-agosto para mejores tarifas.",
},
{
  question: "¿Qué aerolíneas vuelan directo desde Lima a Europa?",
  answer: "Iberia y Air Europa vuelan directo Lima-Madrid. KLM opera Lima-Amsterdam. Air France tiene Lima-París. LATAM también tiene vuelos con escala en ciudades latinoamericanas. Para otros destinos europeos se hace escala generalmente en Madrid o Amsterdam.",
},
{
  question: "¿Cuánto tiempo antes debo solicitar la visa Schengen?",
  answer: "Se recomienda solicitar la visa con al menos 3 meses de anticipación. Los consulados pueden tardar entre 15 y 45 días hábiles en procesar la solicitud. No puedes solicitarla con más de 6 meses de anticipación a tu fecha de viaje.",
},
];

export default function BlogPeruEuropa() {
return (
  <>
    <Helmet>
      <title>Viajes a Europa desde Perú 2025 | Visa Schengen, Vuelos y Guía Completa</title>
      <meta
        name="description"
        content="Guía completa para viajar a Europa desde Perú. Cómo obtener la visa Schengen, vuelos directos desde Lima, precios y los mejores destinos europeos para peruanos."
      />
      <meta
        name="keywords"
        content="viajes a europa desde peru, visa schengen peru, vuelos lima europa, paquetes europa peru, como viajar a europa desde peru"
      />
      <link rel="canonical" href="https://tripseuropa.com/blog/peru-europa" />
      <meta property="og:title" content="Viajes a Europa desde Perú 2025 | Visa Schengen y Guía Completa" />
      <meta property="og:description" content="Todo lo que necesitas saber para viajar a Europa desde Perú: visa Schengen, vuelos, precios y los mejores destinos." />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://tripseuropa.com/blog/peru-europa" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Viajes a Europa desde Perú 2025",
        "description": "Guía completa para viajar a Europa desde Perú con información sobre visa Schengen, vuelos desde Lima y mejores destinos.",
        "author": { "@type": "Organization", "name": "Trips Europa" },
        "publisher": { "@type": "Organization", "name": "Trips Europa", "url": "https://tripseuropa.com" },
        "datePublished": "2025-01-01",
        "dateModified": "2025-06-01",
      })}</script>
    </Helmet>

    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-800 via-red-600 to-orange-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
            🇵🇪 Desde Perú → 🇪🇺 Europa
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Viajes a Europa desde Perú:<br />
            <span className="text-yellow-300">Guía Completa 2025</span>
          </h1>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Todo lo que necesitas saber para viajar a Europa desde Lima: visa Schengen, vuelos directos, precios reales y los mejores destinos europeos.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 rounded-full px-4 py-2">✈️ Vuelos directos desde Lima</span>
            <span className="bg-white/20 rounded-full px-4 py-2">🛂 Visa Schengen requerida</span>
            <span className="bg-white/20 rounded-full px-4 py-2">💰 Desde USD 900 el vuelo</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Viajar a Europa desde Perú es el sueño de muchos peruanos, y cada año más familias y jóvenes hacen realidad ese sueño. Lima cuenta con excelentes conexiones aéreas directas a Madrid, Amsterdam y París, lo que facilita enormemente el acceso al viejo continente.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            El principal requisito es obtener la visa Schengen, un proceso que puede parecer complejo pero que con la documentación correcta es completamente manejable. En esta guía te explicamos todo paso a paso.
          </p>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Mejores Destinos en Europa para Peruanos
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Los destinos más visitados por peruanos en Europa, con información sobre vuelos y la mejor época para viajar.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_DESTINATIONS.map((dest) => (
              <div key={dest.city} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{dest.city}</h3>
                    <p className="text-red-600 font-medium text-sm">{dest.country}</p>
                  </div>
                  <span className="bg-red-50 text-red-700 text-xs font-medium px-2 py-1 rounded-full">{dest.visa}</span>
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
          Vuelos desde Lima a Europa
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Las rutas más populares con aerolíneas, duración y consejos para conseguir los mejores precios.
        </p>
        <div className="space-y-4">
          {POPULAR_ROUTES.map((route) => (
            <div key={route.destination} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-red-300 transition-colors">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-bold text-gray-900">{route.origin}</span>
                <span className="text-red-500 text-xl">→</span>
                <span className="font-bold text-red-700">{route.destination}</span>
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

      {/* Visa Guide */}
      <section className="bg-red-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Visa Schengen para Peruanos: Guía Paso a Paso
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-red-700 mb-3">📋 Documentos requeridos</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>✓ Pasaporte vigente (mín. 6 meses de validez)</li>
                <li>✓ Formulario de solicitud completado</li>
                <li>✓ Foto reciente tipo pasaporte</li>
                <li>✓ Reserva de vuelos ida y vuelta</li>
                <li>✓ Reserva de alojamiento</li>
                <li>✓ Seguro de viaje (mín. EUR 30,000)</li>
                <li>✓ Extractos bancarios (3 meses)</li>
                <li>✓ Carta de trabajo o actividad</li>
                <li>✓ Pago de tasa consular (~EUR 80)</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-blue-700 mb-3">⏱️ Proceso y tiempos</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <p>Reúne todos los documentos (2-3 semanas)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <p>Solicita cita en el consulado (puede tardar semanas)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <p>Presenta tu solicitud en persona</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <p>Espera resolución (15-45 días hábiles)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                  <p>Recoge tu pasaporte con la visa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Preguntas Frecuentes: Viajes a Europa desde Perú
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <details key={faq.question} className="bg-white rounded-xl shadow-sm border border-gray-100 group">
              <summary className="p-6 cursor-pointer font-semibold text-gray-900 flex items-center justify-between list-none">
                {faq.question}
                <span className="text-red-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-red-700 to-red-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Viajar a Europa desde Perú?</h2>
          <p className="text-red-100 text-lg mb-8">
            Te ayudamos con la visa Schengen, los vuelos y el itinerario perfecto para tu viaje europeo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contacto">
              <a className="bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold px-8 py-4 rounded-xl transition-colors text-lg">
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