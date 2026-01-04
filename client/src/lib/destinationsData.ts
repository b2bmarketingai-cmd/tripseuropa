export type MultiLangText = { es: string; en: string; pt?: string };
export type MultiLangArray = { es: string[]; en: string[]; pt?: string[] };

export interface ItineraryDay {
  day: number;
  title: MultiLangText;
  description: MultiLangText;
  activities: MultiLangArray;
}

export interface CategorizedItinerary {
  id: string;
  name: MultiLangText;
  description: MultiLangText;
  days: ItineraryDay[];
}

export interface ItinerariesByCategory {
  bySeason: CategorizedItinerary[];
  byInterest: CategorizedItinerary[];
  byGroup: CategorizedItinerary[];
}

export interface DestinationPackage {
  id: string;
  name: MultiLangText;
  duration: MultiLangText;
  price: string;
  taxes: string;
  includes: MultiLangArray;
}

export interface DestinationFAQ {
  question: MultiLangText;
  answer: MultiLangText;
}

export interface DestinationData {
  slug: string;
  name: MultiLangText;
  heroImage: string;
  galleryImages: string[];
  description: MultiLangText;
  highlights: MultiLangArray;
  packages: DestinationPackage[];
  itinerary: ItineraryDay[];
  categorizedItineraries?: ItinerariesByCategory;
  faqs: DestinationFAQ[];
  bestTimeToVisit: MultiLangText;
  currency: string;
  language: MultiLangText;
  visaInfo: MultiLangText;
}

export const DESTINATIONS_DATA: DestinationData[] = [
  {
    slug: "france",
    name: { es: "Francia", en: "France" },
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551634979-2b11f8c946fe?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=800&auto=format&fit=crop"
    ],
    description: {
      es: "Francia es el destino turistico mas visitado del mundo, y no es dificil entender por que. Desde la romantica Paris con su iconica Torre Eiffel hasta los campos de lavanda de Provenza, pasando por la glamurosa Costa Azul y los castillos del Valle del Loira, Francia ofrece una experiencia unica que combina arte, cultura, gastronomia y paisajes de ensueno. Descubre la elegancia francesa, sus vinos de clase mundial y su patrimonio historico incomparable.",
      en: "France is the most visited tourist destination in the world, and it's not hard to understand why. From romantic Paris with its iconic Eiffel Tower to the lavender fields of Provence, the glamorous French Riviera, and the castles of the Loire Valley, France offers a unique experience combining art, culture, gastronomy, and dreamlike landscapes. Discover French elegance, world-class wines, and unparalleled historical heritage."
    },
    highlights: {
      es: ["Torre Eiffel y Paris romantico", "Castillos del Valle del Loira", "Costa Azul y Niza", "Campos de lavanda de Provenza", "Gastronomia y vinos franceses", "Mont Saint-Michel"],
      en: ["Eiffel Tower and romantic Paris", "Loire Valley Castles", "French Riviera and Nice", "Lavender fields of Provence", "French gastronomy and wines", "Mont Saint-Michel"]
    },
    packages: [
      {
        id: "francia-clasico",
        name: { es: "Francia Clasica", en: "Classic France" },
        duration: { es: "8 dias / 7 noches", en: "8 days / 7 nights" },
        price: "1,899",
        taxes: "380",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno diario", "Traslados", "Guia en espanol", "Entradas a monumentos principales"],
          en: ["International flights", "4-star hotels", "Daily breakfast", "Transfers", "Spanish-speaking guide", "Main monument tickets"]
        }
      },
      {
        id: "francia-romantica",
        name: { es: "Francia Romantica", en: "Romantic France" },
        duration: { es: "10 dias / 9 noches", en: "10 days / 9 nights" },
        price: "2,499",
        taxes: "450",
        includes: {
          es: ["Vuelos internacionales", "Hoteles boutique", "Desayuno y cenas", "Crucero por el Sena", "Tour de vinos", "Experiencia gastronomica"],
          en: ["International flights", "Boutique hotels", "Breakfast and dinners", "Seine cruise", "Wine tour", "Gastronomic experience"]
        }
      },
      {
        id: "francia-completa",
        name: { es: "Gran Tour de Francia", en: "Grand Tour of France" },
        duration: { es: "14 dias / 13 noches", en: "14 days / 13 nights" },
        price: "3,299",
        taxes: "520",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4-5 estrellas", "Media pension", "TGV entre ciudades", "Tours exclusivos", "Seguro de viaje premium"],
          en: ["International flights", "4-5 star hotels", "Half board", "TGV between cities", "Exclusive tours", "Premium travel insurance"]
        }
      }
    ],
    itinerary: [
      {
        day: 1,
        title: { es: "Llegada a Paris", en: "Arrival in Paris" },
        description: { es: "Bienvenida en el aeropuerto y traslado al hotel. Tarde libre para pasear por los Campos Eliseos.", en: "Airport welcome and hotel transfer. Free afternoon to stroll along the Champs-Élysées." },
        activities: { es: ["Recogida en aeropuerto", "Check-in en hotel", "Paseo por Campos Eliseos"], en: ["Airport pickup", "Hotel check-in", "Champs-Élysées walk"] }
      },
      {
        day: 2,
        title: { es: "Paris: Torre Eiffel y Louvre", en: "Paris: Eiffel Tower and Louvre" },
        description: { es: "Visita a la iconica Torre Eiffel y el mundialmente famoso Museo del Louvre.", en: "Visit the iconic Eiffel Tower and the world-famous Louvre Museum." },
        activities: { es: ["Subida a la Torre Eiffel", "Visita guiada al Louvre", "Almuerzo en Le Marais"], en: ["Eiffel Tower ascent", "Louvre guided tour", "Lunch in Le Marais"] }
      },
      {
        day: 3,
        title: { es: "Versalles", en: "Versailles" },
        description: { es: "Excursion al majestuoso Palacio de Versalles y sus jardines.", en: "Excursion to the majestic Palace of Versailles and its gardens." },
        activities: { es: ["Tour del palacio", "Paseo por jardines", "Fuentes musicales"], en: ["Palace tour", "Garden walk", "Musical fountains"] }
      },
      {
        day: 4,
        title: { es: "Valle del Loira", en: "Loire Valley" },
        description: { es: "Descubre los impresionantes castillos del Valle del Loira.", en: "Discover the impressive castles of the Loire Valley." },
        activities: { es: ["Castillo de Chambord", "Castillo de Chenonceau", "Degustacion de vinos"], en: ["Chambord Castle", "Chenonceau Castle", "Wine tasting"] }
      },
      {
        day: 5,
        title: { es: "Provenza", en: "Provence" },
        description: { es: "Traslado a la hermosa region de Provenza, tierra de lavanda y encanto.", en: "Transfer to the beautiful Provence region, land of lavender and charm." },
        activities: { es: ["Viaje en tren TGV", "Llegada a Aviñon", "Tour del centro historico"], en: ["TGV train journey", "Arrival in Avignon", "Historic center tour"] }
      },
      {
        day: 6,
        title: { es: "Costa Azul", en: "French Riviera" },
        description: { es: "Explora la glamurosa Costa Azul: Niza, Cannes y Monaco.", en: "Explore the glamorous French Riviera: Nice, Cannes, and Monaco." },
        activities: { es: ["Paseo por Niza", "Visita a Cannes", "Tour de Monaco"], en: ["Nice promenade", "Cannes visit", "Monaco tour"] }
      },
      {
        day: 7,
        title: { es: "Dia libre en la Riviera", en: "Free day on the Riviera" },
        description: { es: "Dia libre para disfrutar de las playas o actividades opcionales.", en: "Free day to enjoy beaches or optional activities." },
        activities: { es: ["Playa", "Compras", "Gastronomia local"], en: ["Beach", "Shopping", "Local gastronomy"] }
      },
      {
        day: 8,
        title: { es: "Regreso", en: "Return" },
        description: { es: "Traslado al aeropuerto para el vuelo de regreso.", en: "Transfer to airport for return flight." },
        activities: { es: ["Check-out", "Traslado al aeropuerto", "Vuelo de regreso"], en: ["Check-out", "Airport transfer", "Return flight"] }
      }
    ],
    faqs: [
      {
        question: { es: "Necesito visa para viajar a Francia?", en: "Do I need a visa to travel to France?" },
        answer: { es: "Los ciudadanos de la mayoria de paises latinoamericanos pueden ingresar a Francia sin visa por hasta 90 dias para turismo dentro del espacio Schengen.", en: "Citizens of most Latin American countries can enter France without a visa for up to 90 days for tourism within the Schengen area." }
      },
      {
        question: { es: "Cual es la mejor epoca para visitar Francia?", en: "When is the best time to visit France?" },
        answer: { es: "La primavera (abril-junio) y el otono (septiembre-octubre) ofrecen clima agradable y menos turistas. El verano es ideal para la Costa Azul pero Paris puede estar muy concurrido.", en: "Spring (April-June) and autumn (September-October) offer pleasant weather and fewer tourists. Summer is ideal for the French Riviera but Paris can be very crowded." }
      },
      {
        question: { es: "Que idioma se habla en Francia?", en: "What language is spoken in France?" },
        answer: { es: "El idioma oficial es el frances. En zonas turisticas muchas personas hablan ingles, pero es recomendable aprender frases basicas en frances.", en: "The official language is French. In tourist areas, many people speak English, but learning basic French phrases is recommended." }
      },
      {
        question: { es: "Cual es la moneda en Francia?", en: "What is the currency in France?" },
        answer: { es: "La moneda oficial es el Euro (EUR). Se aceptan tarjetas de credito en la mayoria de establecimientos.", en: "The official currency is the Euro (EUR). Credit cards are accepted in most establishments." }
      }
    ],
    bestTimeToVisit: { es: "Abril a Junio y Septiembre a Octubre", en: "April to June and September to October" },
    currency: "EUR",
    language: { es: "Frances", en: "French" },
    visaInfo: { es: "No requiere visa para estancias hasta 90 dias", en: "No visa required for stays up to 90 days" }
  },
  {
    slug: "italy",
    name: { es: "Italia", en: "Italy" },
    heroImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534445867742-43195f401b6c?q=80&w=800&auto=format&fit=crop"
    ],
    description: {
      es: "Italia es la cuna del Renacimiento, hogar de algunas de las obras de arte mas importantes del mundo y destino gastronomico por excelencia. Desde el romantico Venecia hasta la eterna Roma, pasando por la cultural Florencia y la espectacular Costa Amalfitana, Italia cautiva con su historia milenaria, su arquitectura impresionante y su deliciosa cocina. Vive la dolce vita en uno de los paises mas bellos del mundo.",
      en: "Italy is the cradle of the Renaissance, home to some of the world's most important artworks, and a gastronomic destination par excellence. From romantic Venice to eternal Rome, through cultural Florence and the spectacular Amalfi Coast, Italy captivates with its millennial history, impressive architecture, and delicious cuisine. Experience la dolce vita in one of the most beautiful countries in the world."
    },
    highlights: {
      es: ["Coliseo Romano y Vaticano", "Canales de Venecia", "Arte en Florencia", "Costa Amalfitana", "Toscana y sus vinos", "Cinque Terre"],
      en: ["Roman Colosseum and Vatican", "Venice Canals", "Art in Florence", "Amalfi Coast", "Tuscany and its wines", "Cinque Terre"]
    },
    packages: [
      {
        id: "italia-esencial",
        name: { es: "Italia Esencial", en: "Essential Italy" },
        duration: { es: "9 dias / 8 noches", en: "9 days / 8 nights" },
        price: "2,099",
        taxes: "420",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno diario", "Trenes de alta velocidad", "Guia en espanol", "Entradas principales"],
          en: ["International flights", "4-star hotels", "Daily breakfast", "High-speed trains", "Spanish-speaking guide", "Main entrance tickets"]
        }
      },
      {
        id: "italia-romantica",
        name: { es: "Italia Romantica", en: "Romantic Italy" },
        duration: { es: "11 dias / 10 noches", en: "11 days / 10 nights" },
        price: "2,699",
        taxes: "480",
        includes: {
          es: ["Vuelos internacionales", "Hoteles boutique", "Media pension", "Gondola en Venecia", "Tour de vinos en Toscana", "Cena romantica"],
          en: ["International flights", "Boutique hotels", "Half board", "Venice gondola", "Tuscany wine tour", "Romantic dinner"]
        }
      },
      {
        id: "italia-completa",
        name: { es: "Gran Tour de Italia", en: "Grand Tour of Italy" },
        duration: { es: "15 dias / 14 noches", en: "15 days / 14 nights" },
        price: "3,499",
        taxes: "550",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4-5 estrellas", "Media pension", "Todos los traslados", "Tours exclusivos", "Experiencias gastronomicas"],
          en: ["International flights", "4-5 star hotels", "Half board", "All transfers", "Exclusive tours", "Gastronomic experiences"]
        }
      }
    ],
    itinerary: [
      {
        day: 1,
        title: { es: "Llegada a Roma", en: "Arrival in Rome" },
        description: { es: "Bienvenida en Roma, la Ciudad Eterna. Traslado al hotel y tiempo libre.", en: "Welcome to Rome, the Eternal City. Hotel transfer and free time." },
        activities: { es: ["Recogida en aeropuerto", "Check-in hotel", "Paseo por Trastevere"], en: ["Airport pickup", "Hotel check-in", "Trastevere walk"] }
      },
      {
        day: 2,
        title: { es: "Roma Imperial", en: "Imperial Rome" },
        description: { es: "Descubre el Coliseo, el Foro Romano y el Palatino.", en: "Discover the Colosseum, Roman Forum, and Palatine Hill." },
        activities: { es: ["Coliseo", "Foro Romano", "Monte Palatino"], en: ["Colosseum", "Roman Forum", "Palatine Hill"] }
      },
      {
        day: 3,
        title: { es: "Vaticano", en: "Vatican" },
        description: { es: "Visita los Museos Vaticanos, la Capilla Sixtina y la Basilica de San Pedro.", en: "Visit the Vatican Museums, Sistine Chapel, and St. Peter's Basilica." },
        activities: { es: ["Museos Vaticanos", "Capilla Sixtina", "Plaza San Pedro"], en: ["Vatican Museums", "Sistine Chapel", "St. Peter's Square"] }
      },
      {
        day: 4,
        title: { es: "Florencia", en: "Florence" },
        description: { es: "Viaje en tren de alta velocidad a Florencia, cuna del Renacimiento.", en: "High-speed train to Florence, cradle of the Renaissance." },
        activities: { es: ["Tren a Florencia", "Galeria Uffizi", "Ponte Vecchio"], en: ["Train to Florence", "Uffizi Gallery", "Ponte Vecchio"] }
      },
      {
        day: 5,
        title: { es: "Toscana", en: "Tuscany" },
        description: { es: "Excursion por la campiña toscana con degustacion de vinos.", en: "Excursion through the Tuscan countryside with wine tasting." },
        activities: { es: ["San Gimignano", "Siena", "Degustacion Chianti"], en: ["San Gimignano", "Siena", "Chianti tasting"] }
      },
      {
        day: 6,
        title: { es: "Venecia", en: "Venice" },
        description: { es: "Llegada a Venecia, la ciudad flotante.", en: "Arrival in Venice, the floating city." },
        activities: { es: ["Tren a Venecia", "Plaza San Marcos", "Paseo en gondola"], en: ["Train to Venice", "St. Mark's Square", "Gondola ride"] }
      },
      {
        day: 7,
        title: { es: "Islas de Venecia", en: "Venice Islands" },
        description: { es: "Excursion a las coloridas islas de Murano y Burano.", en: "Excursion to the colorful islands of Murano and Burano." },
        activities: { es: ["Murano y cristal", "Burano y encajes", "Torcello"], en: ["Murano and glass", "Burano and lace", "Torcello"] }
      },
      {
        day: 8,
        title: { es: "Milan", en: "Milan" },
        description: { es: "Viaje a Milan, capital de la moda y el diseño.", en: "Trip to Milan, capital of fashion and design." },
        activities: { es: ["Duomo de Milan", "Galeria Vittorio Emanuele", "La Ultima Cena"], en: ["Milan Cathedral", "Galleria Vittorio Emanuele", "The Last Supper"] }
      },
      {
        day: 9,
        title: { es: "Regreso", en: "Return" },
        description: { es: "Traslado al aeropuerto para el vuelo de regreso.", en: "Transfer to airport for return flight." },
        activities: { es: ["Check-out", "Tiempo libre", "Vuelo de regreso"], en: ["Check-out", "Free time", "Return flight"] }
      }
    ],
    faqs: [
      {
        question: { es: "Necesito visa para viajar a Italia?", en: "Do I need a visa to travel to Italy?" },
        answer: { es: "Los ciudadanos de la mayoria de paises latinoamericanos pueden ingresar a Italia sin visa por hasta 90 dias para turismo.", en: "Citizens of most Latin American countries can enter Italy without a visa for up to 90 days for tourism." }
      },
      {
        question: { es: "Cual es la mejor epoca para visitar Italia?", en: "When is the best time to visit Italy?" },
        answer: { es: "La primavera (abril-junio) y el otono (septiembre-octubre) son ideales. El verano puede ser muy caluroso y concurrido.", en: "Spring (April-June) and autumn (September-October) are ideal. Summer can be very hot and crowded." }
      },
      {
        question: { es: "Como me muevo entre ciudades en Italia?", en: "How do I get around between cities in Italy?" },
        answer: { es: "Los trenes de alta velocidad (Frecciarossa) conectan las principales ciudades de manera rapida y comoda.", en: "High-speed trains (Frecciarossa) connect major cities quickly and comfortably." }
      },
      {
        question: { es: "Es caro comer en Italia?", en: "Is eating in Italy expensive?" },
        answer: { es: "Hay opciones para todos los presupuestos. Los trattorias locales ofrecen comida autentica a precios razonables.", en: "There are options for all budgets. Local trattorias offer authentic food at reasonable prices." }
      }
    ],
    bestTimeToVisit: { es: "Abril a Junio y Septiembre a Octubre", en: "April to June and September to October" },
    currency: "EUR",
    language: { es: "Italiano", en: "Italian" },
    visaInfo: { es: "No requiere visa para estancias hasta 90 dias", en: "No visa required for stays up to 90 days" }
  },
  {
    slug: "spain",
    name: { es: "España", en: "Spain" },
    heroImage: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558370781-d6196949e317?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop"
    ],
    description: {
      es: "España es un pais vibrante que combina historia, cultura, gastronomia y vida nocturna como ningun otro. Desde la arquitectura de Gaudi en Barcelona hasta el flamenco apasionado de Sevilla, pasando por los museos de Madrid y las playas de la Costa del Sol, España ofrece experiencias inolvidables. Disfruta de tapas, sangria, y la calidez de su gente en uno de los destinos favoritos de los viajeros latinoamericanos.",
      en: "Spain is a vibrant country that combines history, culture, gastronomy, and nightlife like no other. From Gaudi's architecture in Barcelona to the passionate flamenco of Seville, through Madrid's museums and Costa del Sol beaches, Spain offers unforgettable experiences. Enjoy tapas, sangria, and the warmth of its people in one of Latin American travelers' favorite destinations."
    },
    highlights: {
      es: ["Sagrada Familia en Barcelona", "Alhambra de Granada", "Museo del Prado en Madrid", "Flamenco en Sevilla", "Playas de la Costa Brava", "San Sebastian y su gastronomia"],
      en: ["Sagrada Familia in Barcelona", "Alhambra of Granada", "Prado Museum in Madrid", "Flamenco in Seville", "Costa Brava beaches", "San Sebastian gastronomy"]
    },
    packages: [
      {
        id: "espana-clasica",
        name: { es: "España Clasica", en: "Classic Spain" },
        duration: { es: "10 dias / 9 noches", en: "10 days / 9 nights" },
        price: "1,799",
        taxes: "360",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno diario", "AVE entre ciudades", "Guia en espanol", "Espectaculo flamenco"],
          en: ["International flights", "4-star hotels", "Daily breakfast", "AVE between cities", "Spanish-speaking guide", "Flamenco show"]
        }
      },
      {
        id: "espana-andalucia",
        name: { es: "Andalucia Magica", en: "Magical Andalusia" },
        duration: { es: "8 dias / 7 noches", en: "8 days / 7 nights" },
        price: "1,599",
        taxes: "320",
        includes: {
          es: ["Vuelos internacionales", "Hoteles con encanto", "Desayuno", "Coche de alquiler", "Entradas Alhambra", "Tour de tapas"],
          en: ["International flights", "Charming hotels", "Breakfast", "Rental car", "Alhambra tickets", "Tapas tour"]
        }
      },
      {
        id: "espana-completa",
        name: { es: "Gran Tour de Espana", en: "Grand Tour of Spain" },
        duration: { es: "14 dias / 13 noches", en: "14 days / 13 nights" },
        price: "2,899",
        taxes: "480",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4-5 estrellas", "Media pension", "Trenes AVE", "Tours exclusivos", "Experiencias unicas"],
          en: ["International flights", "4-5 star hotels", "Half board", "AVE trains", "Exclusive tours", "Unique experiences"]
        }
      }
    ],
    itinerary: [
      {
        day: 1,
        title: { es: "Llegada a Madrid", en: "Arrival in Madrid" },
        description: { es: "Bienvenida en Madrid, la vibrante capital de España.", en: "Welcome to Madrid, Spain's vibrant capital." },
        activities: { es: ["Recogida aeropuerto", "Check-in hotel", "Paseo por Gran Via"], en: ["Airport pickup", "Hotel check-in", "Gran Via walk"] }
      },
      {
        day: 2,
        title: { es: "Madrid Monumental", en: "Monumental Madrid" },
        description: { es: "Descubre el Palacio Real, la Plaza Mayor y el Museo del Prado.", en: "Discover the Royal Palace, Plaza Mayor, and Prado Museum." },
        activities: { es: ["Palacio Real", "Plaza Mayor", "Museo del Prado"], en: ["Royal Palace", "Plaza Mayor", "Prado Museum"] }
      },
      {
        day: 3,
        title: { es: "Toledo", en: "Toledo" },
        description: { es: "Excursion a Toledo, la ciudad de las tres culturas.", en: "Excursion to Toledo, the city of three cultures." },
        activities: { es: ["Catedral de Toledo", "Sinagoga", "Alcazar"], en: ["Toledo Cathedral", "Synagogue", "Alcazar"] }
      },
      {
        day: 4,
        title: { es: "Sevilla", en: "Seville" },
        description: { es: "Viaje en AVE a Sevilla, corazon de Andalucia.", en: "AVE train to Seville, heart of Andalusia." },
        activities: { es: ["AVE a Sevilla", "Catedral y Giralda", "Barrio Santa Cruz"], en: ["AVE to Seville", "Cathedral and Giralda", "Santa Cruz quarter"] }
      },
      {
        day: 5,
        title: { es: "Sevilla y Flamenco", en: "Seville and Flamenco" },
        description: { es: "Real Alcazar por la manana y espectaculo flamenco por la noche.", en: "Royal Alcazar in the morning and flamenco show at night." },
        activities: { es: ["Real Alcazar", "Plaza de Espana", "Tablao flamenco"], en: ["Royal Alcazar", "Plaza de España", "Flamenco tablao"] }
      },
      {
        day: 6,
        title: { es: "Granada", en: "Granada" },
        description: { es: "Viaje a Granada para visitar la majestuosa Alhambra.", en: "Trip to Granada to visit the majestic Alhambra." },
        activities: { es: ["Viaje a Granada", "Alhambra", "Generalife"], en: ["Trip to Granada", "Alhambra", "Generalife"] }
      },
      {
        day: 7,
        title: { es: "Barcelona", en: "Barcelona" },
        description: { es: "Vuelo a Barcelona, la capital catalana.", en: "Flight to Barcelona, the Catalan capital." },
        activities: { es: ["Vuelo a Barcelona", "Las Ramblas", "Barrio Gotico"], en: ["Flight to Barcelona", "Las Ramblas", "Gothic Quarter"] }
      },
      {
        day: 8,
        title: { es: "Barcelona Gaudi", en: "Barcelona Gaudi" },
        description: { es: "Descubre las obras maestras de Antoni Gaudi.", en: "Discover Antoni Gaudi's masterpieces." },
        activities: { es: ["Sagrada Familia", "Park Guell", "Casa Batllo"], en: ["Sagrada Familia", "Park Guell", "Casa Batllo"] }
      },
      {
        day: 9,
        title: { es: "Costa Brava", en: "Costa Brava" },
        description: { es: "Excursion opcional a la hermosa Costa Brava.", en: "Optional excursion to the beautiful Costa Brava." },
        activities: { es: ["Tossa de Mar", "Platja d'Aro", "Tiempo libre"], en: ["Tossa de Mar", "Platja d'Aro", "Free time"] }
      },
      {
        day: 10,
        title: { es: "Regreso", en: "Return" },
        description: { es: "Tiempo libre y traslado al aeropuerto.", en: "Free time and airport transfer." },
        activities: { es: ["Compras", "Check-out", "Vuelo de regreso"], en: ["Shopping", "Check-out", "Return flight"] }
      }
    ],
    faqs: [
      {
        question: { es: "Necesito visa para viajar a Espana?", en: "Do I need a visa to travel to Spain?" },
        answer: { es: "Los ciudadanos de la mayoria de paises latinoamericanos pueden ingresar a España sin visa por hasta 90 dias para turismo.", en: "Citizens of most Latin American countries can enter Spain without a visa for up to 90 days for tourism." }
      },
      {
        question: { es: "Cual es la mejor epoca para visitar Espana?", en: "When is the best time to visit Spain?" },
        answer: { es: "Primavera y otono son ideales. El verano es perfecto para playas pero muy caluroso en el sur.", en: "Spring and autumn are ideal. Summer is perfect for beaches but very hot in the south." }
      },
      {
        question: { es: "Es facil comunicarse en espanol?", en: "Is it easy to communicate in Spanish?" },
        answer: { es: "Si, el espanol es el idioma oficial. Los latinoamericanos se sentiran como en casa.", en: "Yes, Spanish is the official language. Latin Americans will feel right at home." }
      },
      {
        question: { es: "Como es la gastronomia espanola?", en: "What is Spanish gastronomy like?" },
        answer: { es: "España es famosa por sus tapas, paella, jamon iberico, y vinos. Cada region tiene sus especialidades.", en: "Spain is famous for tapas, paella, Iberian ham, and wines. Each region has its specialties." }
      }
    ],
    bestTimeToVisit: { es: "Marzo a Junio y Septiembre a Noviembre", en: "March to June and September to November" },
    currency: "EUR",
    language: { es: "Espanol", en: "Spanish" },
    visaInfo: { es: "No requiere visa para estancias hasta 90 dias", en: "No visa required for stays up to 90 days" }
  },
  {
    slug: "germany",
    name: { es: "Alemania", en: "Germany" },
    heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554072675-66db59dba46f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600623471616-8c1966c91ff6?q=80&w=800&auto=format&fit=crop"
    ],
    description: {
      es: "Alemania combina modernidad con tradicion de manera unica. Desde los castillos de cuento de hadas de Baviera hasta la vibrante vida cultural de Berlin, pasando por la romantica Ruta del Rin y los mercados navidenos mas famosos del mundo, Alemania ofrece experiencias diversas. Descubre la eficiencia alemana, su cerveza legendaria, y paisajes que van desde los Alpes hasta el Mar del Norte.",
      en: "Germany uniquely combines modernity with tradition. From Bavaria's fairy-tale castles to Berlin's vibrant cultural life, through the romantic Rhine Route and the world's most famous Christmas markets, Germany offers diverse experiences. Discover German efficiency, legendary beer, and landscapes ranging from the Alps to the North Sea."
    },
    highlights: {
      es: ["Castillo de Neuschwanstein", "Puerta de Brandeburgo", "Selva Negra", "Ruta Romantica", "Mercados navidenos", "Cerveza y Oktoberfest"],
      en: ["Neuschwanstein Castle", "Brandenburg Gate", "Black Forest", "Romantic Road", "Christmas markets", "Beer and Oktoberfest"]
    },
    packages: [
      {
        id: "alemania-esencial",
        name: { es: "Alemania Esencial", en: "Essential Germany" },
        duration: { es: "8 dias / 7 noches", en: "8 days / 7 nights" },
        price: "1,899",
        taxes: "380",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno buffet", "Trenes ICE", "Guia en espanol", "Entradas principales"],
          en: ["International flights", "4-star hotels", "Buffet breakfast", "ICE trains", "Spanish-speaking guide", "Main entrance tickets"]
        }
      },
      {
        id: "alemania-baviera",
        name: { es: "Baviera Magica", en: "Magical Bavaria" },
        duration: { es: "7 dias / 6 noches", en: "7 days / 6 nights" },
        price: "1,699",
        taxes: "340",
        includes: {
          es: ["Vuelos internacionales", "Hoteles tipicos", "Desayuno", "Coche de alquiler", "Neuschwanstein", "Experiencia cervecera"],
          en: ["International flights", "Typical hotels", "Breakfast", "Rental car", "Neuschwanstein", "Beer experience"]
        }
      },
      {
        id: "alemania-completa",
        name: { es: "Gran Tour de Alemania", en: "Grand Tour of Germany" },
        duration: { es: "12 dias / 11 noches", en: "12 days / 11 nights" },
        price: "2,799",
        taxes: "480",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4-5 estrellas", "Media pension", "Rail Pass", "Tours exclusivos", "Crucero por el Rin"],
          en: ["International flights", "4-5 star hotels", "Half board", "Rail Pass", "Exclusive tours", "Rhine cruise"]
        }
      }
    ],
    itinerary: [
      {
        day: 1,
        title: { es: "Llegada a Munich", en: "Arrival in Munich" },
        description: { es: "Bienvenida en Munich, capital de Baviera.", en: "Welcome to Munich, capital of Bavaria." },
        activities: { es: ["Recogida aeropuerto", "Check-in hotel", "Marienplatz"], en: ["Airport pickup", "Hotel check-in", "Marienplatz"] }
      },
      {
        day: 2,
        title: { es: "Munich y Cerveza", en: "Munich and Beer" },
        description: { es: "Explora Munich y su famosa cultura cervecera.", en: "Explore Munich and its famous beer culture." },
        activities: { es: ["Residenz", "Hofbrauhaus", "Jardin Ingles"], en: ["Residenz", "Hofbrauhaus", "English Garden"] }
      },
      {
        day: 3,
        title: { es: "Neuschwanstein", en: "Neuschwanstein" },
        description: { es: "Excursion al castillo de cuento de hadas.", en: "Excursion to the fairy-tale castle." },
        activities: { es: ["Castillo Neuschwanstein", "Hohenschwangau", "Fussen"], en: ["Neuschwanstein Castle", "Hohenschwangau", "Fussen"] }
      },
      {
        day: 4,
        title: { es: "Selva Negra", en: "Black Forest" },
        description: { es: "Viaje a la magica region de la Selva Negra.", en: "Trip to the magical Black Forest region." },
        activities: { es: ["Cascadas Triberg", "Friburgo", "Pueblo tradicional"], en: ["Triberg Waterfalls", "Freiburg", "Traditional village"] }
      },
      {
        day: 5,
        title: { es: "Heidelberg", en: "Heidelberg" },
        description: { es: "Descubre la romantica ciudad universitaria.", en: "Discover the romantic university city." },
        activities: { es: ["Castillo Heidelberg", "Casco antiguo", "Puente viejo"], en: ["Heidelberg Castle", "Old town", "Old bridge"] }
      },
      {
        day: 6,
        title: { es: "Valle del Rin", en: "Rhine Valley" },
        description: { es: "Crucero por el romantico Valle del Rin.", en: "Cruise through the romantic Rhine Valley." },
        activities: { es: ["Crucero fluvial", "Castillos del Rin", "Cata de vinos"], en: ["River cruise", "Rhine castles", "Wine tasting"] }
      },
      {
        day: 7,
        title: { es: "Berlin", en: "Berlin" },
        description: { es: "Viaje en tren de alta velocidad a Berlin.", en: "High-speed train to Berlin." },
        activities: { es: ["Tren a Berlin", "Puerta de Brandeburgo", "Reichstag"], en: ["Train to Berlin", "Brandenburg Gate", "Reichstag"] }
      },
      {
        day: 8,
        title: { es: "Berlin Historico", en: "Historic Berlin" },
        description: { es: "Explora la historia de Berlin dividido.", en: "Explore the history of divided Berlin." },
        activities: { es: ["Muro de Berlin", "Checkpoint Charlie", "Isla de los Museos"], en: ["Berlin Wall", "Checkpoint Charlie", "Museum Island"] }
      }
    ],
    faqs: [
      {
        question: { es: "Necesito visa para viajar a Alemania?", en: "Do I need a visa to travel to Germany?" },
        answer: { es: "Los ciudadanos de la mayoria de paises latinoamericanos pueden ingresar a Alemania sin visa por hasta 90 dias.", en: "Citizens of most Latin American countries can enter Germany without a visa for up to 90 days." }
      },
      {
        question: { es: "Cual es la mejor epoca para visitar Alemania?", en: "When is the best time to visit Germany?" },
        answer: { es: "Mayo a septiembre para buen clima. Diciembre para mercados navidenos y septiembre-octubre para Oktoberfest.", en: "May to September for good weather. December for Christmas markets and September-October for Oktoberfest." }
      },
      {
        question: { es: "Es dificil el idioma aleman?", en: "Is German a difficult language?" },
        answer: { es: "El aleman puede ser desafiante, pero en zonas turisticas muchos hablan ingles. Aprende frases basicas.", en: "German can be challenging, but many speak English in tourist areas. Learn basic phrases." }
      },
      {
        question: { es: "Como es el transporte en Alemania?", en: "How is transportation in Germany?" },
        answer: { es: "Alemania tiene excelente infraestructura. Los trenes ICE son puntuales y conectan todas las ciudades principales.", en: "Germany has excellent infrastructure. ICE trains are punctual and connect all major cities." }
      }
    ],
    bestTimeToVisit: { es: "Mayo a Octubre y Diciembre", en: "May to October and December" },
    currency: "EUR",
    language: { es: "Aleman", en: "German" },
    visaInfo: { es: "No requiere visa para estancias hasta 90 dias", en: "No visa required for stays up to 90 days" }
  },
  {
    slug: "portugal",
    name: { es: "Portugal", en: "Portugal" },
    heroImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1569959220744-ff553533f492?q=80&w=800&auto=format&fit=crop"
    ],
    description: {
      es: "Portugal es un tesoro escondido de Europa, con una historia maritima fascinante, playas impresionantes y una gastronomia deliciosa. Desde los azulejos de Lisboa hasta los vinos de Oporto, pasando por los acantilados del Algarve y los palacios de Sintra, Portugal encanta con su autenticidad y hospitalidad. Descubre el pais de los navegantes, el fado melancolico y los pasteles de nata.",
      en: "Portugal is a hidden treasure of Europe, with fascinating maritime history, stunning beaches, and delicious gastronomy. From Lisbon's tiles to Porto's wines, through the Algarve cliffs and Sintra palaces, Portugal charms with its authenticity and hospitality. Discover the land of navigators, melancholic fado, and pastel de nata."
    },
    highlights: {
      es: ["Torre de Belem en Lisboa", "Bodegas de Oporto", "Playas del Algarve", "Palacios de Sintra", "Fado tradicional", "Gastronomia portuguesa"],
      en: ["Belem Tower in Lisbon", "Porto wine cellars", "Algarve beaches", "Sintra palaces", "Traditional fado", "Portuguese gastronomy"]
    },
    packages: [
      {
        id: "portugal-esencial",
        name: { es: "Portugal Esencial", en: "Essential Portugal" },
        duration: { es: "7 dias / 6 noches", en: "7 days / 6 nights" },
        price: "1,499",
        taxes: "300",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno diario", "Traslados", "Guia en espanol", "Espectaculo de fado"],
          en: ["International flights", "4-star hotels", "Daily breakfast", "Transfers", "Spanish-speaking guide", "Fado show"]
        }
      },
      {
        id: "portugal-algarve",
        name: { es: "Portugal y Algarve", en: "Portugal and Algarve" },
        duration: { es: "10 dias / 9 noches", en: "10 days / 9 nights" },
        price: "1,899",
        taxes: "380",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno", "Coche de alquiler", "Tour de vinos", "Excursion en barco"],
          en: ["International flights", "4-star hotels", "Breakfast", "Rental car", "Wine tour", "Boat excursion"]
        }
      },
      {
        id: "portugal-completo",
        name: { es: "Gran Tour de Portugal", en: "Grand Tour of Portugal" },
        duration: { es: "12 dias / 11 noches", en: "12 days / 11 nights" },
        price: "2,499",
        taxes: "450",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4-5 estrellas", "Media pension", "Todos los traslados", "Tours premium", "Experiencias gastronomicas"],
          en: ["International flights", "4-5 star hotels", "Half board", "All transfers", "Premium tours", "Gastronomic experiences"]
        }
      }
    ],
    itinerary: [
      {
        day: 1,
        title: { es: "Llegada a Lisboa", en: "Arrival in Lisbon" },
        description: { es: "Bienvenida en Lisboa, la ciudad de las siete colinas.", en: "Welcome to Lisbon, the city of seven hills." },
        activities: { es: ["Recogida aeropuerto", "Check-in hotel", "Barrio de Alfama"], en: ["Airport pickup", "Hotel check-in", "Alfama neighborhood"] }
      },
      {
        day: 2,
        title: { es: "Lisboa Monumental", en: "Monumental Lisbon" },
        description: { es: "Explora los monumentos emblematicos de Lisboa.", en: "Explore Lisbon's emblematic monuments." },
        activities: { es: ["Torre de Belem", "Monasterio Jeronimos", "Pasteis de Belem"], en: ["Belem Tower", "Jeronimos Monastery", "Pasteis de Belem"] }
      },
      {
        day: 3,
        title: { es: "Sintra", en: "Sintra" },
        description: { es: "Excursion a los palacios magicos de Sintra.", en: "Excursion to Sintra's magical palaces." },
        activities: { es: ["Palacio da Pena", "Quinta da Regaleira", "Cabo da Roca"], en: ["Pena Palace", "Quinta da Regaleira", "Cabo da Roca"] }
      },
      {
        day: 4,
        title: { es: "Oporto", en: "Porto" },
        description: { es: "Viaje en tren a la encantadora ciudad de Oporto.", en: "Train journey to the charming city of Porto." },
        activities: { es: ["Tren a Oporto", "Ribeira", "Torre dos Clerigos"], en: ["Train to Porto", "Ribeira", "Clerigos Tower"] }
      },
      {
        day: 5,
        title: { es: "Bodegas de Oporto", en: "Porto Wineries" },
        description: { es: "Visita las famosas bodegas de vino de Oporto.", en: "Visit Porto's famous wine cellars." },
        activities: { es: ["Bodegas en Gaia", "Cata de vino", "Libreria Lello"], en: ["Gaia cellars", "Wine tasting", "Lello Bookstore"] }
      },
      {
        day: 6,
        title: { es: "Valle del Duero", en: "Douro Valley" },
        description: { es: "Excursion al pintoresco Valle del Duero.", en: "Excursion to the picturesque Douro Valley." },
        activities: { es: ["Crucero por el Duero", "Vinedos", "Almuerzo tipico"], en: ["Douro cruise", "Vineyards", "Typical lunch"] }
      },
      {
        day: 7,
        title: { es: "Regreso", en: "Return" },
        description: { es: "Traslado al aeropuerto para el vuelo de regreso.", en: "Transfer to airport for return flight." },
        activities: { es: ["Tiempo libre", "Check-out", "Vuelo de regreso"], en: ["Free time", "Check-out", "Return flight"] }
      }
    ],
    faqs: [
      {
        question: { es: "Necesito visa para viajar a Portugal?", en: "Do I need a visa to travel to Portugal?" },
        answer: { es: "Los ciudadanos de la mayoria de paises latinoamericanos pueden ingresar a Portugal sin visa por hasta 90 dias.", en: "Citizens of most Latin American countries can enter Portugal without a visa for up to 90 days." }
      },
      {
        question: { es: "Es facil entender el portugues?", en: "Is Portuguese easy to understand?" },
        answer: { es: "El portugues europeo difiere del brasileno pero es comprensible. Muchos portugueses hablan espanol.", en: "European Portuguese differs from Brazilian but is understandable. Many Portuguese speak Spanish." }
      },
      {
        question: { es: "Cual es la mejor epoca para visitar Portugal?", en: "When is the best time to visit Portugal?" },
        answer: { es: "Primavera y otono son ideales. El verano es perfecto para el Algarve pero puede estar muy concurrido.", en: "Spring and autumn are ideal. Summer is perfect for the Algarve but can be crowded." }
      },
      {
        question: { es: "Portugal es un destino economico?", en: "Is Portugal an affordable destination?" },
        answer: { es: "Portugal es uno de los destinos mas economicos de Europa occidental, con excelente relacion calidad-precio.", en: "Portugal is one of the most affordable destinations in Western Europe, with excellent value for money." }
      }
    ],
    bestTimeToVisit: { es: "Marzo a Junio y Septiembre a Noviembre", en: "March to June and September to November" },
    currency: "EUR",
    language: { es: "Portugues", en: "Portuguese" },
    visaInfo: { es: "No requiere visa para estancias hasta 90 dias", en: "No visa required for stays up to 90 days" }
  },
  {
    slug: "greece",
    name: { es: "Grecia", en: "Greece" },
    heroImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601635671556-7018d4b0e1b0?q=80&w=800&auto=format&fit=crop"
    ],
    description: {
      es: "Grecia es la cuna de la civilizacion occidental, hogar de los dioses del Olimpo y las islas mas hermosas del Mediterraneo. Desde la Acropolis de Atenas hasta las cupulas azules de Santorini, pasando por las playas de Mykonos y las ruinas de Delfos, Grecia ofrece historia, cultura y belleza natural incomparables. Vive la experiencia griega con su hospitalidad legendaria, su cocina mediterranea y sus atardeceres magicos.",
      en: "Greece is the cradle of Western civilization, home to the gods of Olympus and the most beautiful islands in the Mediterranean. From the Athens Acropolis to Santorini's blue domes, through Mykonos beaches and Delphi ruins, Greece offers unparalleled history, culture, and natural beauty. Experience Greek legendary hospitality, Mediterranean cuisine, and magical sunsets."
    },
    highlights: {
      es: ["Acropolis de Atenas", "Santorini y sus atardeceres", "Playas de Mykonos", "Meteora", "Delfos y Olimpia", "Gastronomia griega"],
      en: ["Athens Acropolis", "Santorini sunsets", "Mykonos beaches", "Meteora", "Delphi and Olympia", "Greek gastronomy"]
    },
    packages: [
      {
        id: "grecia-clasica",
        name: { es: "Grecia Clasica", en: "Classic Greece" },
        duration: { es: "8 dias / 7 noches", en: "8 days / 7 nights" },
        price: "1,799",
        taxes: "360",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno diario", "Ferry a islas", "Guia en espanol", "Entradas principales"],
          en: ["International flights", "4-star hotels", "Daily breakfast", "Island ferry", "Spanish-speaking guide", "Main entrance tickets"]
        }
      },
      {
        id: "grecia-islas",
        name: { es: "Islas Griegas", en: "Greek Islands" },
        duration: { es: "10 dias / 9 noches", en: "10 days / 9 nights" },
        price: "2,299",
        taxes: "420",
        includes: {
          es: ["Vuelos internacionales", "Hoteles con vistas", "Desayuno", "Ferries entre islas", "Tour en catamaran", "Cena romantica"],
          en: ["International flights", "Hotels with views", "Breakfast", "Inter-island ferries", "Catamaran tour", "Romantic dinner"]
        }
      },
      {
        id: "grecia-completa",
        name: { es: "Gran Tour de Grecia", en: "Grand Tour of Greece" },
        duration: { es: "14 dias / 13 noches", en: "14 days / 13 nights" },
        price: "3,199",
        taxes: "520",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4-5 estrellas", "Media pension", "Todos los traslados", "Crucero por islas", "Experiencias unicas"],
          en: ["International flights", "4-5 star hotels", "Half board", "All transfers", "Island cruise", "Unique experiences"]
        }
      }
    ],
    itinerary: [
      {
        day: 1,
        title: { es: "Llegada a Atenas", en: "Arrival in Athens" },
        description: { es: "Bienvenida en Atenas, cuna de la democracia.", en: "Welcome to Athens, birthplace of democracy." },
        activities: { es: ["Recogida aeropuerto", "Check-in hotel", "Barrio de Plaka"], en: ["Airport pickup", "Hotel check-in", "Plaka neighborhood"] }
      },
      {
        day: 2,
        title: { es: "Atenas Antigua", en: "Ancient Athens" },
        description: { es: "Explora la Acropolis y el Partenon.", en: "Explore the Acropolis and Parthenon." },
        activities: { es: ["Acropolis", "Partenon", "Museo de la Acropolis"], en: ["Acropolis", "Parthenon", "Acropolis Museum"] }
      },
      {
        day: 3,
        title: { es: "Delfos", en: "Delphi" },
        description: { es: "Excursion al Oraculo de Delfos.", en: "Excursion to the Oracle of Delphi." },
        activities: { es: ["Santuario de Apolo", "Teatro antiguo", "Museo de Delfos"], en: ["Apollo Sanctuary", "Ancient theater", "Delphi Museum"] }
      },
      {
        day: 4,
        title: { es: "Santorini", en: "Santorini" },
        description: { es: "Vuelo a la espectacular isla de Santorini.", en: "Flight to spectacular Santorini island." },
        activities: { es: ["Vuelo a Santorini", "Oia", "Atardecer famoso"], en: ["Flight to Santorini", "Oia", "Famous sunset"] }
      },
      {
        day: 5,
        title: { es: "Santorini Completo", en: "Full Santorini" },
        description: { es: "Explora los pueblos y playas de Santorini.", en: "Explore Santorini's villages and beaches." },
        activities: { es: ["Fira", "Playa Roja", "Bodega local"], en: ["Fira", "Red Beach", "Local winery"] }
      },
      {
        day: 6,
        title: { es: "Tour en Catamaran", en: "Catamaran Tour" },
        description: { es: "Navegacion por la caldera de Santorini.", en: "Sailing around Santorini's caldera." },
        activities: { es: ["Tour en catamaran", "Aguas termales", "Almuerzo a bordo"], en: ["Catamaran tour", "Hot springs", "Lunch on board"] }
      },
      {
        day: 7,
        title: { es: "Mykonos", en: "Mykonos" },
        description: { es: "Ferry a la vibrante isla de Mykonos.", en: "Ferry to vibrant Mykonos island." },
        activities: { es: ["Ferry a Mykonos", "Pequena Venecia", "Molinos de viento"], en: ["Ferry to Mykonos", "Little Venice", "Windmills"] }
      },
      {
        day: 8,
        title: { es: "Playas de Mykonos", en: "Mykonos Beaches" },
        description: { es: "Disfruta de las famosas playas de Mykonos.", en: "Enjoy Mykonos' famous beaches." },
        activities: { es: ["Paradise Beach", "Super Paradise", "Gastronomia griega"], en: ["Paradise Beach", "Super Paradise", "Greek gastronomy"] }
      }
    ],
    faqs: [
      {
        question: { es: "Necesito visa para viajar a Grecia?", en: "Do I need a visa to travel to Greece?" },
        answer: { es: "Los ciudadanos de la mayoria de paises latinoamericanos pueden ingresar a Grecia sin visa por hasta 90 dias.", en: "Citizens of most Latin American countries can enter Greece without a visa for up to 90 days." }
      },
      {
        question: { es: "Cual es la mejor epoca para visitar las islas griegas?", en: "When is the best time to visit the Greek islands?" },
        answer: { es: "Mayo a octubre es ideal. Julio y agosto tienen el mejor clima pero mas turistas y precios altos.", en: "May to October is ideal. July and August have the best weather but more tourists and higher prices." }
      },
      {
        question: { es: "Como me muevo entre las islas?", en: "How do I get around between islands?" },
        answer: { es: "Los ferries son el medio principal. Hay opciones rapidas y economicas. Tambien vuelos entre islas principales.", en: "Ferries are the main means. There are fast and budget options. Also flights between main islands." }
      },
      {
        question: { es: "Es caro visitar Grecia?", en: "Is Greece expensive to visit?" },
        answer: { es: "Grecia ofrece opciones para todos los presupuestos. Las islas turisticas como Santorini son mas caras que el continente.", en: "Greece offers options for all budgets. Tourist islands like Santorini are more expensive than the mainland." }
      }
    ],
    bestTimeToVisit: { es: "Mayo a Octubre", en: "May to October" },
    currency: "EUR",
    language: { es: "Griego", en: "Greek" },
    visaInfo: { es: "No requiere visa para estancias hasta 90 dias", en: "No visa required for stays up to 90 days" }
  },
  {
    slug: "netherlands",
    name: { es: "Paises Bajos", en: "Netherlands" },
    heroImage: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1468436385273-8abca6dfd8d3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=800&auto=format&fit=crop"
    ],
    description: {
      es: "Los Paises Bajos son mucho mas que Amsterdam. Descubre un pais de canales pintorescos, molinos de viento historicos, campos de tulipanes y una rica herencia artistica. Desde los museos de Van Gogh y Rembrandt hasta los quesos de Gouda y la arquitectura innovadora de Rotterdam, los Paises Bajos ofrecen una experiencia unica. Explora en bicicleta como los locales y disfruta de la tolerancia y creatividad holandesa.",
      en: "The Netherlands is much more than Amsterdam. Discover a country of picturesque canals, historic windmills, tulip fields, and rich artistic heritage. From Van Gogh and Rembrandt museums to Gouda cheeses and Rotterdam's innovative architecture, the Netherlands offers a unique experience. Explore by bike like locals and enjoy Dutch tolerance and creativity."
    },
    highlights: {
      es: ["Canales de Amsterdam", "Museo Van Gogh", "Campos de tulipanes", "Molinos de Kinderdijk", "Quesos de Gouda", "Arquitectura de Rotterdam"],
      en: ["Amsterdam canals", "Van Gogh Museum", "Tulip fields", "Kinderdijk windmills", "Gouda cheeses", "Rotterdam architecture"]
    },
    packages: [
      {
        id: "holanda-express",
        name: { es: "Holanda Express", en: "Holland Express" },
        duration: { es: "5 dias / 4 noches", en: "5 days / 4 nights" },
        price: "1,299",
        taxes: "260",
        includes: {
          es: ["Vuelos internacionales", "Hotel 4 estrellas", "Desayuno diario", "Crucero por canales", "Museo Van Gogh", "Traslados"],
          en: ["International flights", "4-star hotel", "Daily breakfast", "Canal cruise", "Van Gogh Museum", "Transfers"]
        }
      },
      {
        id: "holanda-tulipanes",
        name: { es: "Holanda y Tulipanes", en: "Holland and Tulips" },
        duration: { es: "7 dias / 6 noches", en: "7 days / 6 nights" },
        price: "1,699",
        taxes: "340",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno", "Keukenhof", "Zaanse Schans", "Bicicleta incluida"],
          en: ["International flights", "4-star hotels", "Breakfast", "Keukenhof", "Zaanse Schans", "Bicycle included"]
        }
      },
      {
        id: "holanda-belgica",
        name: { es: "Holanda y Belgica", en: "Holland and Belgium" },
        duration: { es: "9 dias / 8 noches", en: "9 days / 8 nights" },
        price: "2,199",
        taxes: "420",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno", "Trenes", "Brujas y Bruselas", "Tours guiados"],
          en: ["International flights", "4-star hotels", "Breakfast", "Trains", "Bruges and Brussels", "Guided tours"]
        }
      }
    ],
    itinerary: [
      {
        day: 1,
        title: { es: "Llegada a Amsterdam", en: "Arrival in Amsterdam" },
        description: { es: "Bienvenida en Amsterdam, la Venecia del Norte.", en: "Welcome to Amsterdam, the Venice of the North." },
        activities: { es: ["Recogida aeropuerto", "Check-in hotel", "Paseo por Jordaan"], en: ["Airport pickup", "Hotel check-in", "Jordaan walk"] }
      },
      {
        day: 2,
        title: { es: "Amsterdam Clasico", en: "Classic Amsterdam" },
        description: { es: "Explora los iconos de Amsterdam.", en: "Explore Amsterdam's icons." },
        activities: { es: ["Museo Van Gogh", "Casa de Ana Frank", "Crucero por canales"], en: ["Van Gogh Museum", "Anne Frank House", "Canal cruise"] }
      },
      {
        day: 3,
        title: { es: "Keukenhof", en: "Keukenhof" },
        description: { es: "Visita los espectaculares jardines de tulipanes (en temporada).", en: "Visit the spectacular tulip gardens (in season)." },
        activities: { es: ["Jardines Keukenhof", "Campos de tulipanes", "Lisse"], en: ["Keukenhof Gardens", "Tulip fields", "Lisse"] }
      },
      {
        day: 4,
        title: { es: "Zaanse Schans", en: "Zaanse Schans" },
        description: { es: "Descubre los molinos de viento tradicionales.", en: "Discover traditional windmills." },
        activities: { es: ["Molinos de viento", "Fabrica de queso", "Casas de madera"], en: ["Windmills", "Cheese factory", "Wooden houses"] }
      },
      {
        day: 5,
        title: { es: "Rotterdam y La Haya", en: "Rotterdam and The Hague" },
        description: { es: "Arquitectura moderna y la sede del gobierno.", en: "Modern architecture and the seat of government." },
        activities: { es: ["Casas cubo", "Markthal", "Palacio de la Paz"], en: ["Cube houses", "Markthal", "Peace Palace"] }
      }
    ],
    faqs: [
      {
        question: { es: "Necesito visa para viajar a Paises Bajos?", en: "Do I need a visa to travel to the Netherlands?" },
        answer: { es: "Los ciudadanos de la mayoria de paises latinoamericanos pueden ingresar sin visa por hasta 90 dias.", en: "Citizens of most Latin American countries can enter without a visa for up to 90 days." }
      },
      {
        question: { es: "Cuando florecen los tulipanes?", en: "When do tulips bloom?" },
        answer: { es: "La temporada de tulipanes es de mediados de marzo a mediados de mayo, con el pico en abril.", en: "Tulip season is mid-March to mid-May, with the peak in April." }
      },
      {
        question: { es: "Es seguro andar en bicicleta?", en: "Is it safe to cycle?" },
        answer: { es: "Los Paises Bajos tienen la mejor infraestructura ciclista del mundo. Es muy seguro y recomendado.", en: "The Netherlands has the world's best cycling infrastructure. It's very safe and recommended." }
      },
      {
        question: { es: "Cual es el clima en Holanda?", en: "What is the weather like in Holland?" },
        answer: { es: "El clima es templado pero variable. Lleva siempre una chaqueta impermeable.", en: "The climate is temperate but variable. Always bring a waterproof jacket." }
      }
    ],
    bestTimeToVisit: { es: "Abril a Mayo y Septiembre", en: "April to May and September" },
    currency: "EUR",
    language: { es: "Holandes", en: "Dutch" },
    visaInfo: { es: "No requiere visa para estancias hasta 90 dias", en: "No visa required for stays up to 90 days" }
  },
  {
    slug: "switzerland",
    name: { es: "Suiza", en: "Switzerland" },
    heroImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=800&auto=format&fit=crop"
    ],
    description: {
      es: "Suiza es sinonimo de paisajes alpinos espectaculares, relojes de precision, chocolate exquisito y calidad de vida excepcional. Desde el majestuoso Matterhorn hasta los lagos cristalinos de Lucerna, pasando por las ciudades cosmopolitas de Zurich y Ginebra, Suiza ofrece experiencias de lujo en un entorno natural incomparable. Descubre los trenes panoramicos mas famosos del mundo y la perfeccion suiza en cada detalle.",
      en: "Switzerland is synonymous with spectacular Alpine landscapes, precision watches, exquisite chocolate, and exceptional quality of life. From the majestic Matterhorn to the crystal-clear lakes of Lucerne, through the cosmopolitan cities of Zurich and Geneva, Switzerland offers luxury experiences in an unparalleled natural setting. Discover the world's most famous panoramic trains and Swiss perfection in every detail."
    },
    highlights: {
      es: ["Matterhorn en Zermatt", "Jungfraujoch", "Lago de Lucerna", "Glacier Express", "Chocolate y relojes", "Interlaken"],
      en: ["Matterhorn in Zermatt", "Jungfraujoch", "Lake Lucerne", "Glacier Express", "Chocolate and watches", "Interlaken"]
    },
    packages: [
      {
        id: "suiza-esencial",
        name: { es: "Suiza Esencial", en: "Essential Switzerland" },
        duration: { es: "7 dias / 6 noches", en: "7 days / 6 nights" },
        price: "2,599",
        taxes: "480",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno buffet", "Swiss Travel Pass", "Guia en espanol", "Jungfraujoch"],
          en: ["International flights", "4-star hotels", "Buffet breakfast", "Swiss Travel Pass", "Spanish-speaking guide", "Jungfraujoch"]
        }
      },
      {
        id: "suiza-glaciar",
        name: { es: "Glacier Express", en: "Glacier Express" },
        duration: { es: "9 dias / 8 noches", en: "9 days / 8 nights" },
        price: "3,299",
        taxes: "550",
        includes: {
          es: ["Vuelos internacionales", "Hoteles de montana", "Media pension", "Glacier Express", "Bernina Express", "Actividades alpinas"],
          en: ["International flights", "Mountain hotels", "Half board", "Glacier Express", "Bernina Express", "Alpine activities"]
        }
      },
      {
        id: "suiza-lujo",
        name: { es: "Suiza de Lujo", en: "Luxury Switzerland" },
        duration: { es: "10 dias / 9 noches", en: "10 days / 9 nights" },
        price: "4,499",
        taxes: "650",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 5 estrellas", "Pension completa", "Todos los trenes", "Experiencias VIP", "Cena gourmet"],
          en: ["International flights", "5-star hotels", "Full board", "All trains", "VIP experiences", "Gourmet dinner"]
        }
      }
    ],
    itinerary: [
      {
        day: 1,
        title: { es: "Llegada a Zurich", en: "Arrival in Zurich" },
        description: { es: "Bienvenida en Zurich, la ciudad financiera de Suiza.", en: "Welcome to Zurich, Switzerland's financial city." },
        activities: { es: ["Recogida aeropuerto", "Check-in hotel", "Casco antiguo"], en: ["Airport pickup", "Hotel check-in", "Old town"] }
      },
      {
        day: 2,
        title: { es: "Lucerna", en: "Lucerne" },
        description: { es: "Viaje a la encantadora Lucerna junto al lago.", en: "Trip to charming Lucerne by the lake." },
        activities: { es: ["Puente de la Capilla", "Monte Pilatus", "Crucero por el lago"], en: ["Chapel Bridge", "Mount Pilatus", "Lake cruise"] }
      },
      {
        day: 3,
        title: { es: "Interlaken", en: "Interlaken" },
        description: { es: "Viaje a Interlaken, capital de los deportes de aventura.", en: "Trip to Interlaken, adventure sports capital." },
        activities: { es: ["Golden Pass", "Llegada Interlaken", "Paseo por lagos"], en: ["Golden Pass", "Interlaken arrival", "Lakes walk"] }
      },
      {
        day: 4,
        title: { es: "Jungfraujoch", en: "Jungfraujoch" },
        description: { es: "Excursion a la cima de Europa.", en: "Excursion to the Top of Europe." },
        activities: { es: ["Tren cremallera", "Jungfraujoch", "Glaciar Aletsch"], en: ["Cog railway", "Jungfraujoch", "Aletsch Glacier"] }
      },
      {
        day: 5,
        title: { es: "Zermatt", en: "Zermatt" },
        description: { es: "Viaje a Zermatt al pie del Matterhorn.", en: "Trip to Zermatt at the foot of the Matterhorn." },
        activities: { es: ["Tren a Zermatt", "Gornergrat", "Vista del Matterhorn"], en: ["Train to Zermatt", "Gornergrat", "Matterhorn view"] }
      },
      {
        day: 6,
        title: { es: "Glacier Express", en: "Glacier Express" },
        description: { es: "El viaje en tren mas espectacular del mundo.", en: "The world's most spectacular train journey." },
        activities: { es: ["Glacier Express", "Paisajes alpinos", "Almuerzo a bordo"], en: ["Glacier Express", "Alpine landscapes", "Lunch on board"] }
      },
      {
        day: 7,
        title: { es: "Regreso", en: "Return" },
        description: { es: "Tiempo libre y vuelo de regreso.", en: "Free time and return flight." },
        activities: { es: ["Compras de chocolate", "Check-out", "Vuelo de regreso"], en: ["Chocolate shopping", "Check-out", "Return flight"] }
      }
    ],
    faqs: [
      {
        question: { es: "Necesito visa para viajar a Suiza?", en: "Do I need a visa to travel to Switzerland?" },
        answer: { es: "Los ciudadanos de la mayoria de paises latinoamericanos pueden ingresar a Suiza sin visa por hasta 90 dias.", en: "Citizens of most Latin American countries can enter Switzerland without a visa for up to 90 days." }
      },
      {
        question: { es: "Suiza es muy cara?", en: "Is Switzerland very expensive?" },
        answer: { es: "Suiza es uno de los paises mas caros del mundo, pero la calidad y experiencias justifican el precio.", en: "Switzerland is one of the world's most expensive countries, but quality and experiences justify the price." }
      },
      {
        question: { es: "Que moneda se usa en Suiza?", en: "What currency is used in Switzerland?" },
        answer: { es: "El Franco Suizo (CHF). Algunos lugares aceptan euros pero dan cambio en francos.", en: "The Swiss Franc (CHF). Some places accept euros but give change in francs." }
      },
      {
        question: { es: "Cual es la mejor epoca para visitar Suiza?", en: "When is the best time to visit Switzerland?" },
        answer: { es: "Verano (junio-agosto) para senderismo, invierno (diciembre-marzo) para esqui. Primavera y otono son menos concurridos.", en: "Summer (June-August) for hiking, winter (December-March) for skiing. Spring and autumn are less crowded." }
      }
    ],
    bestTimeToVisit: { es: "Junio a Septiembre y Diciembre a Marzo", en: "June to September and December to March" },
    currency: "CHF",
    language: { es: "Aleman, Frances, Italiano", en: "German, French, Italian" },
    visaInfo: { es: "No requiere visa para estancias hasta 90 dias", en: "No visa required for stays up to 90 days" }
  },
  {
    slug: "croatia",
    name: { es: "Croacia", en: "Croatia" },
    heroImage: "https://images.unsplash.com/photo-1555990793-da11153b2473?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1565711561500-49678a10a63f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555990793-da11153b2473?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504276048855-f3d60e69632f?q=80&w=800&auto=format&fit=crop"
    ],
    description: {
      es: "Croacia es la joya del Adriatico, un pais de costas impresionantes, ciudades medievales y parques naturales espectaculares. Desde las murallas de Dubrovnik (escenario de Game of Thrones) hasta las cascadas de Plitvice, pasando por las islas de Hvar y Split, Croacia ofrece una combinacion perfecta de historia, naturaleza y vida mediterranea. Descubre playas de aguas cristalinas, gastronomia de mar y hospitalidad balcanica.",
      en: "Croatia is the jewel of the Adriatic, a country of stunning coastlines, medieval cities, and spectacular natural parks. From Dubrovnik's walls (Game of Thrones setting) to Plitvice's waterfalls, through the islands of Hvar and Split, Croatia offers a perfect combination of history, nature, and Mediterranean life. Discover crystal-clear beaches, seafood gastronomy, and Balkan hospitality."
    },
    highlights: {
      es: ["Murallas de Dubrovnik", "Lagos de Plitvice", "Split y Diocleciano", "Isla de Hvar", "Costa del Adriatico", "Juego de Tronos tours"],
      en: ["Dubrovnik walls", "Plitvice Lakes", "Split and Diocletian", "Hvar Island", "Adriatic coast", "Game of Thrones tours"]
    },
    packages: [
      {
        id: "croacia-esencial",
        name: { es: "Croacia Esencial", en: "Essential Croatia" },
        duration: { es: "8 dias / 7 noches", en: "8 days / 7 nights" },
        price: "1,699",
        taxes: "340",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno diario", "Traslados", "Guia en espanol", "Plitvice"],
          en: ["International flights", "4-star hotels", "Daily breakfast", "Transfers", "Spanish-speaking guide", "Plitvice"]
        }
      },
      {
        id: "croacia-islas",
        name: { es: "Croacia e Islas", en: "Croatia and Islands" },
        duration: { es: "10 dias / 9 noches", en: "10 days / 9 nights" },
        price: "2,199",
        taxes: "420",
        includes: {
          es: ["Vuelos internacionales", "Hoteles con vistas", "Desayuno", "Ferries a islas", "Tour en barco", "Excursiones"],
          en: ["International flights", "Hotels with views", "Breakfast", "Island ferries", "Boat tour", "Excursions"]
        }
      },
      {
        id: "croacia-got",
        name: { es: "Ruta Game of Thrones", en: "Game of Thrones Route" },
        duration: { es: "7 dias / 6 noches", en: "7 days / 6 nights" },
        price: "1,899",
        taxes: "380",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno", "Tours GOT", "Dubrovnik completo", "Guia especializado"],
          en: ["International flights", "4-star hotels", "Breakfast", "GOT tours", "Full Dubrovnik", "Specialized guide"]
        }
      }
    ],
    itinerary: [
      {
        day: 1,
        title: { es: "Llegada a Zagreb", en: "Arrival in Zagreb" },
        description: { es: "Bienvenida en Zagreb, la capital croata.", en: "Welcome to Zagreb, the Croatian capital." },
        activities: { es: ["Recogida aeropuerto", "Check-in hotel", "Ciudad alta"], en: ["Airport pickup", "Hotel check-in", "Upper town"] }
      },
      {
        day: 2,
        title: { es: "Lagos de Plitvice", en: "Plitvice Lakes" },
        description: { es: "Excursion al parque nacional mas famoso de Croacia.", en: "Excursion to Croatia's most famous national park." },
        activities: { es: ["Lagos superiores", "Lagos inferiores", "Cascadas"], en: ["Upper lakes", "Lower lakes", "Waterfalls"] }
      },
      {
        day: 3,
        title: { es: "Split", en: "Split" },
        description: { es: "Viaje a Split, ciudad del Palacio de Diocleciano.", en: "Trip to Split, city of Diocletian's Palace." },
        activities: { es: ["Viaje a Split", "Palacio Diocleciano", "Riva"], en: ["Trip to Split", "Diocletian's Palace", "Riva"] }
      },
      {
        day: 4,
        title: { es: "Isla de Hvar", en: "Hvar Island" },
        description: { es: "Ferry a la glamurosa isla de Hvar.", en: "Ferry to glamorous Hvar island." },
        activities: { es: ["Ferry a Hvar", "Ciudad de Hvar", "Playas"], en: ["Ferry to Hvar", "Hvar town", "Beaches"] }
      },
      {
        day: 5,
        title: { es: "Dubrovnik", en: "Dubrovnik" },
        description: { es: "Viaje a la perla del Adriatico.", en: "Trip to the Pearl of the Adriatic." },
        activities: { es: ["Viaje a Dubrovnik", "Murallas", "Casco antiguo"], en: ["Trip to Dubrovnik", "Walls", "Old town"] }
      },
      {
        day: 6,
        title: { es: "Dubrovnik Game of Thrones", en: "Dubrovnik Game of Thrones" },
        description: { es: "Tour por las locaciones de Game of Thrones.", en: "Tour of Game of Thrones locations." },
        activities: { es: ["Tour GOT", "Fuerte Lovrijenac", "Escaleras de la verguenza"], en: ["GOT tour", "Fort Lovrijenac", "Shame stairs"] }
      },
      {
        day: 7,
        title: { es: "Islas Elafiti", en: "Elafiti Islands" },
        description: { es: "Crucero por las Islas Elafiti.", en: "Cruise to the Elafiti Islands." },
        activities: { es: ["Crucero", "Lopud", "Sipan", "Almuerzo de mariscos"], en: ["Cruise", "Lopud", "Sipan", "Seafood lunch"] }
      },
      {
        day: 8,
        title: { es: "Regreso", en: "Return" },
        description: { es: "Tiempo libre y vuelo de regreso.", en: "Free time and return flight." },
        activities: { es: ["Compras", "Check-out", "Vuelo de regreso"], en: ["Shopping", "Check-out", "Return flight"] }
      }
    ],
    faqs: [
      {
        question: { es: "Necesito visa para viajar a Croacia?", en: "Do I need a visa to travel to Croatia?" },
        answer: { es: "Los ciudadanos de la mayoria de paises latinoamericanos pueden ingresar a Croacia sin visa por hasta 90 dias.", en: "Citizens of most Latin American countries can enter Croatia without a visa for up to 90 days." }
      },
      {
        question: { es: "Croacia usa el Euro?", en: "Does Croatia use the Euro?" },
        answer: { es: "Si, desde 2023 Croacia es parte de la Eurozona y usa el Euro como moneda oficial.", en: "Yes, since 2023 Croatia is part of the Eurozone and uses the Euro as official currency." }
      },
      {
        question: { es: "Cual es la mejor epoca para visitar Croacia?", en: "When is the best time to visit Croatia?" },
        answer: { es: "Mayo a octubre. Julio y agosto son los meses mas calurosos y concurridos.", en: "May to October. July and August are the hottest and most crowded months." }
      },
      {
        question: { es: "Vale la pena el tour de Game of Thrones?", en: "Is the Game of Thrones tour worth it?" },
        answer: { es: "Absolutamente, especialmente en Dubrovnik donde se filmaron muchas escenas iconicas de la serie.", en: "Absolutely, especially in Dubrovnik where many iconic scenes from the series were filmed." }
      }
    ],
    bestTimeToVisit: { es: "Mayo a Octubre", en: "May to October" },
    currency: "EUR",
    language: { es: "Croata", en: "Croatian" },
    visaInfo: { es: "No requiere visa para estancias hasta 90 dias", en: "No visa required for stays up to 90 days" }
  },
  {
    slug: "united-kingdom",
    name: { es: "Reino Unido", en: "United Kingdom" },
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483972440757-5a83b95c0b2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=800&auto=format&fit=crop"
    ],
    description: {
      es: "El Reino Unido combina tradicion monarquica con modernidad vibrante. Desde el iconica Londres con el Big Ben y el Palacio de Buckingham hasta los paisajes de las Tierras Altas escocesas, pasando por los castillos de Gales y la campiña inglesa, el Reino Unido ofrece experiencias diversas. Descubre la realeza, los pubs tradicionales, el te de la tarde y una escena cultural de clase mundial.",
      en: "The United Kingdom combines monarchical tradition with vibrant modernity. From iconic London with Big Ben and Buckingham Palace to the Scottish Highlands landscapes, through Welsh castles and the English countryside, the UK offers diverse experiences. Discover royalty, traditional pubs, afternoon tea, and a world-class cultural scene."
    },
    highlights: {
      es: ["Big Ben y Parlamento", "Palacio de Buckingham", "Stonehenge", "Edimburgo y castillo", "Tierras Altas escocesas", "Oxford y Cambridge"],
      en: ["Big Ben and Parliament", "Buckingham Palace", "Stonehenge", "Edinburgh and castle", "Scottish Highlands", "Oxford and Cambridge"]
    },
    packages: [
      {
        id: "londres-express",
        name: { es: "Londres Express", en: "London Express" },
        duration: { es: "5 dias / 4 noches", en: "5 days / 4 nights" },
        price: "1,499",
        taxes: "300",
        includes: {
          es: ["Vuelos internacionales", "Hotel 4 estrellas", "Desayuno ingles", "London Pass", "Guia en espanol", "Tour panoramico"],
          en: ["International flights", "4-star hotel", "English breakfast", "London Pass", "Spanish-speaking guide", "Panoramic tour"]
        }
      },
      {
        id: "uk-clasico",
        name: { es: "Reino Unido Clasico", en: "Classic UK" },
        duration: { es: "10 dias / 9 noches", en: "10 days / 9 nights" },
        price: "2,499",
        taxes: "450",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno", "Trenes", "Stonehenge y Bath", "Edimburgo"],
          en: ["International flights", "4-star hotels", "Breakfast", "Trains", "Stonehenge and Bath", "Edinburgh"]
        }
      },
      {
        id: "uk-completo",
        name: { es: "Gran Tour del Reino Unido", en: "Grand Tour of UK" },
        duration: { es: "14 dias / 13 noches", en: "14 days / 13 nights" },
        price: "3,499",
        taxes: "550",
        includes: {
          es: ["Vuelos internacionales", "Hoteles 4-5 estrellas", "Media pension", "BritRail Pass", "Tours exclusivos", "Tierras Altas"],
          en: ["International flights", "4-5 star hotels", "Half board", "BritRail Pass", "Exclusive tours", "Highlands"]
        }
      }
    ],
    itinerary: [
      {
        day: 1,
        title: { es: "Llegada a Londres", en: "Arrival in London" },
        description: { es: "Bienvenida en Londres, la capital del Reino Unido.", en: "Welcome to London, the capital of the United Kingdom." },
        activities: { es: ["Recogida aeropuerto", "Check-in hotel", "Piccadilly Circus"], en: ["Airport pickup", "Hotel check-in", "Piccadilly Circus"] }
      },
      {
        day: 2,
        title: { es: "Londres Clasico", en: "Classic London" },
        description: { es: "Los iconos mas famosos de Londres.", en: "London's most famous icons." },
        activities: { es: ["Big Ben", "Abadia Westminster", "Cambio de guardia"], en: ["Big Ben", "Westminster Abbey", "Changing of the Guard"] }
      },
      {
        day: 3,
        title: { es: "Torre y Museos", en: "Tower and Museums" },
        description: { es: "Historia y cultura de clase mundial.", en: "World-class history and culture." },
        activities: { es: ["Torre de Londres", "British Museum", "Covent Garden"], en: ["Tower of London", "British Museum", "Covent Garden"] }
      },
      {
        day: 4,
        title: { es: "Stonehenge y Bath", en: "Stonehenge and Bath" },
        description: { es: "Excursion al misterioso Stonehenge y la elegante Bath.", en: "Excursion to mysterious Stonehenge and elegant Bath." },
        activities: { es: ["Stonehenge", "Termas romanas", "Ciudad de Bath"], en: ["Stonehenge", "Roman baths", "City of Bath"] }
      },
      {
        day: 5,
        title: { es: "Oxford", en: "Oxford" },
        description: { es: "La prestigiosa ciudad universitaria.", en: "The prestigious university city." },
        activities: { es: ["Colleges de Oxford", "Biblioteca Bodleian", "Harry Potter tour"], en: ["Oxford Colleges", "Bodleian Library", "Harry Potter tour"] }
      },
      {
        day: 6,
        title: { es: "Edimburgo", en: "Edinburgh" },
        description: { es: "Viaje en tren a la capital escocesa.", en: "Train journey to the Scottish capital." },
        activities: { es: ["Tren a Edimburgo", "Royal Mile", "Castillo de Edimburgo"], en: ["Train to Edinburgh", "Royal Mile", "Edinburgh Castle"] }
      },
      {
        day: 7,
        title: { es: "Tierras Altas", en: "Highlands" },
        description: { es: "Excursion a las espectaculares Tierras Altas.", en: "Excursion to the spectacular Highlands." },
        activities: { es: ["Lago Ness", "Glencoe", "Fort William"], en: ["Loch Ness", "Glencoe", "Fort William"] }
      },
      {
        day: 8,
        title: { es: "Whisky y Cultura", en: "Whisky and Culture" },
        description: { es: "Descubre el whisky escoces y la cultura local.", en: "Discover Scotch whisky and local culture." },
        activities: { es: ["Destileria de whisky", "Museo Nacional", "Gastronomia escocesa"], en: ["Whisky distillery", "National Museum", "Scottish gastronomy"] }
      },
      {
        day: 9,
        title: { es: "York", en: "York" },
        description: { es: "La ciudad medieval mejor conservada de Inglaterra.", en: "England's best-preserved medieval city." },
        activities: { es: ["Tren a York", "Catedral de York", "The Shambles"], en: ["Train to York", "York Minster", "The Shambles"] }
      },
      {
        day: 10,
        title: { es: "Regreso", en: "Return" },
        description: { es: "Regreso a Londres y vuelo de vuelta.", en: "Return to London and flight home." },
        activities: { es: ["Tren a Londres", "Tiempo libre", "Vuelo de regreso"], en: ["Train to London", "Free time", "Return flight"] }
      }
    ],
    faqs: [
      {
        question: { es: "Necesito visa para viajar al Reino Unido?", en: "Do I need a visa to travel to the UK?" },
        answer: { es: "Depende de tu nacionalidad. Ciudadanos de algunos paises latinoamericanos necesitan visa. Verifica antes de viajar.", en: "It depends on your nationality. Citizens of some Latin American countries need a visa. Check before traveling." }
      },
      {
        question: { es: "Que moneda se usa en el Reino Unido?", en: "What currency is used in the UK?" },
        answer: { es: "La Libra Esterlina (GBP). No se usa el Euro en el Reino Unido.", en: "The Pound Sterling (GBP). The Euro is not used in the UK." }
      },
      {
        question: { es: "Cual es la mejor epoca para visitar?", en: "When is the best time to visit?" },
        answer: { es: "Mayo a septiembre tiene mejor clima. Diciembre es magico por los mercados navidenos.", en: "May to September has better weather. December is magical for Christmas markets." }
      },
      {
        question: { es: "Como es el clima en el Reino Unido?", en: "What is the weather like in the UK?" },
        answer: { es: "Variable y lluvioso. Lleva siempre un paraguas y capas de ropa. Los veranos son templados.", en: "Variable and rainy. Always carry an umbrella and layers. Summers are mild." }
      }
    ],
    bestTimeToVisit: { es: "Mayo a Septiembre", en: "May to September" },
    currency: "GBP",
    language: { es: "Ingles", en: "English" },
    visaInfo: { es: "Algunos paises requieren visa - verificar antes de viajar", en: "Some countries require visa - check before traveling" }
  },
  {
    slug: "albania",
    name: { es: "Albania", en: "Albania" },
    heroImage: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1920&q=80",
    description: {
      es: "Albania, la joya escondida de los Balcanes, ofrece playas virgenes en la Riviera Albanesa, montanas majestuosas, ciudades patrimonio UNESCO como Berat y Gjirokaster, y una hospitalidad legendaria. Descubre ruinas antiguas, bunkers de la era comunista y una gastronomia mediterranea unica.",
      en: "Albania, the hidden gem of the Balkans, offers pristine beaches on the Albanian Riviera, majestic mountains, UNESCO heritage cities like Berat and Gjirokaster, and legendary hospitality. Discover ancient ruins, communist-era bunkers, and unique Mediterranean cuisine."
    },
    highlights: {
      es: ["Riviera Albanesa", "Berat ciudad de mil ventanas", "Gjirokaster ciudad de piedra", "Lago Ohrid", "Tirana la capital colorida"],
      en: ["Albanian Riviera", "Berat city of a thousand windows", "Gjirokaster stone city", "Lake Ohrid", "Tirana the colorful capital"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1601556123240-462c758a2d5a?w=800&q=80",
      "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=800&q=80",
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80"
    ],
    packages: [
      { id: "albania-1", name: { es: "Descubre Albania", en: "Discover Albania" }, duration: { es: "8 dias", en: "8 days" }, price: "1,899", taxes: "350", includes: { es: ["Vuelos", "Hoteles 4*", "Tours guiados", "Desayunos"], en: ["Flights", "4* Hotels", "Guided tours", "Breakfasts"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Llegada a Tirana", en: "Arrival in Tirana" }, description: { es: "Bienvenida y traslado al hotel en la vibrante capital albanesa.", en: "Welcome and transfer to hotel in the vibrant Albanian capital." }, activities: { es: ["Traslado aeropuerto", "Check-in hotel", "Paseo plaza Skanderbeg"], en: ["Airport transfer", "Hotel check-in", "Skanderbeg Square walk"] } },
      { day: 2, title: { es: "Tirana", en: "Tirana" }, description: { es: "Explora la colorida capital con su mezcla unica de historia.", en: "Explore the colorful capital with its unique mix of history." }, activities: { es: ["Bunker Art", "Mezquita Et'hem Bey", "Piramide de Tirana"], en: ["Bunker Art", "Et'hem Bey Mosque", "Tirana Pyramid"] } },
      { day: 3, title: { es: "Berat", en: "Berat" }, description: { es: "Visita la ciudad de las mil ventanas, patrimonio UNESCO.", en: "Visit the city of a thousand windows, UNESCO heritage." }, activities: { es: ["Castillo de Berat", "Barrio Mangalem", "Museo Onufri"], en: ["Berat Castle", "Mangalem Quarter", "Onufri Museum"] } },
      { day: 4, title: { es: "Gjirokaster", en: "Gjirokaster" }, description: { es: "Descubre la ciudad de piedra y su impresionante fortaleza.", en: "Discover the stone city and its impressive fortress." }, activities: { es: ["Fortaleza Gjirokaster", "Bazaar otomano", "Casa Zekate"], en: ["Gjirokaster Fortress", "Ottoman Bazaar", "Zekate House"] } },
      { day: 5, title: { es: "Riviera Albanesa", en: "Albanian Riviera" }, description: { es: "Playas paradisiacas en la costa del mar Jonico.", en: "Paradise beaches on the Ionian coast." }, activities: { es: ["Playa Ksamil", "Parque Nacional Butrint", "Atardecer en Himara"], en: ["Ksamil Beach", "Butrint National Park", "Sunset in Himara"] } },
      { day: 6, title: { es: "Saranda", en: "Saranda" }, description: { es: "Relax en el principal resort costero de Albania.", en: "Relax at Albania's main coastal resort." }, activities: { es: ["Blue Eye spring", "Paseo maritimo", "Tiempo libre playa"], en: ["Blue Eye spring", "Seafront promenade", "Beach free time"] } },
      { day: 7, title: { es: "Kruja y Durres", en: "Kruja and Durres" }, description: { es: "Historia y playas en el regreso a Tirana.", en: "History and beaches on the return to Tirana." }, activities: { es: ["Castillo de Kruja", "Museo Skanderbeg", "Anfiteatro romano Durres"], en: ["Kruja Castle", "Skanderbeg Museum", "Roman Amphitheater Durres"] } },
      { day: 8, title: { es: "Regreso", en: "Return" }, description: { es: "Traslado al aeropuerto para vuelo de regreso.", en: "Transfer to airport for return flight." }, activities: { es: ["Desayuno", "Traslado aeropuerto", "Vuelo de regreso"], en: ["Breakfast", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Necesito visa para Albania?", en: "Do I need a visa for Albania?" }, answer: { es: "Ciudadanos de la mayoria de paises latinoamericanos no necesitan visa para estancias hasta 90 dias.", en: "Citizens of most Latin American countries don't need a visa for stays up to 90 days." } },
      { question: { es: "Que moneda se usa?", en: "What currency is used?" }, answer: { es: "El Lek albanes (ALL). Euros son aceptados en zonas turisticas.", en: "The Albanian Lek (ALL). Euros are accepted in tourist areas." } },
      { question: { es: "Es seguro viajar a Albania?", en: "Is it safe to travel to Albania?" }, answer: { es: "Si, Albania es muy segura para turistas con baja criminalidad.", en: "Yes, Albania is very safe for tourists with low crime rates." } }
    ],
    bestTimeToVisit: { es: "Mayo a Octubre", en: "May to October" },
    currency: "ALL",
    language: { es: "Albanes", en: "Albanian" },
    visaInfo: { es: "No se requiere visa para estancias cortas", en: "No visa required for short stays" }
  },
  {
    slug: "austria",
    name: { es: "Austria", en: "Austria" },
    heroImage: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1920&q=80",
    description: {
      es: "Austria encanta con los palacios imperiales de Viena, los paisajes alpinos de Salzburgo, la musica clasica de Mozart y los mercados navidenos mas magicos de Europa. Vive la elegancia del Imperio Habsburgo entre valses, cafes historicos y los Alpes austriacos.",
      en: "Austria enchants with Vienna's imperial palaces, Salzburg's Alpine landscapes, Mozart's classical music, and Europe's most magical Christmas markets. Experience the elegance of the Habsburg Empire among waltzes, historic cafes, and the Austrian Alps."
    },
    highlights: {
      es: ["Palacio Schonbrunn Viena", "Salzburgo ciudad de Mozart", "Hallstatt pueblo de cuento", "Innsbruck capital alpina", "Mercados navidenos"],
      en: ["Schonbrunn Palace Vienna", "Salzburg Mozart's city", "Hallstatt fairytale village", "Innsbruck alpine capital", "Christmas markets"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=800&q=80",
      "https://images.unsplash.com/photo-1535952531083-5baafb2b56f7?w=800&q=80",
      "https://images.unsplash.com/photo-1563890738384-0d3a3c15c14c?w=800&q=80"
    ],
    packages: [
      { id: "austria-1", name: { es: "Austria Imperial", en: "Imperial Austria" }, duration: { es: "9 dias", en: "9 days" }, price: "2,799", taxes: "450", includes: { es: ["Vuelos", "Hoteles 4*", "Desayunos", "Concierto Viena"], en: ["Flights", "4* Hotels", "Breakfasts", "Vienna Concert"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Viena Llegada", en: "Vienna Arrival" }, description: { es: "Bienvenida a la capital imperial austriaca.", en: "Welcome to the Austrian imperial capital." }, activities: { es: ["Traslado hotel", "Paseo Ringstrasse", "Cena de bienvenida"], en: ["Hotel transfer", "Ringstrasse walk", "Welcome dinner"] } },
      { day: 2, title: { es: "Viena Imperial", en: "Imperial Vienna" }, description: { es: "Los grandes palacios y la historia de los Habsburgo.", en: "The grand palaces and Habsburg history." }, activities: { es: ["Palacio Schonbrunn", "Opera Estatal", "Cafe Sacher"], en: ["Schonbrunn Palace", "State Opera", "Cafe Sacher"] } },
      { day: 3, title: { es: "Viena Cultural", en: "Cultural Vienna" }, description: { es: "Museos, arte y musica clasica.", en: "Museums, art, and classical music." }, activities: { es: ["Museo Historia Arte", "Palacio Belvedere", "Concierto Mozart"], en: ["Art History Museum", "Belvedere Palace", "Mozart Concert"] } },
      { day: 4, title: { es: "Salzburgo", en: "Salzburg" }, description: { es: "La ciudad de Mozart y paisajes alpinos.", en: "Mozart's city and Alpine landscapes." }, activities: { es: ["Tren panoramico", "Casco antiguo", "Casa natal Mozart"], en: ["Panoramic train", "Old Town", "Mozart's Birthplace"] } },
      { day: 5, title: { es: "Salzburgo y alrededores", en: "Salzburg surroundings" }, description: { es: "Fortaleza y lagos de los Alpes.", en: "Fortress and Alpine lakes." }, activities: { es: ["Fortaleza Hohensalzburg", "Lago Wolfgang", "Jardines Mirabell"], en: ["Hohensalzburg Fortress", "Lake Wolfgang", "Mirabell Gardens"] } },
      { day: 6, title: { es: "Hallstatt", en: "Hallstatt" }, description: { es: "El pueblo mas fotografiado del mundo.", en: "The world's most photographed village." }, activities: { es: ["Pueblo Hallstatt", "Minas de sal", "Lago Hallstatt"], en: ["Hallstatt Village", "Salt mines", "Hallstatt Lake"] } },
      { day: 7, title: { es: "Innsbruck", en: "Innsbruck" }, description: { es: "Capital de los Alpes austriacos.", en: "Capital of the Austrian Alps." }, activities: { es: ["Tejadillo de Oro", "Palacio Ambras", "Teleferico Alpes"], en: ["Golden Roof", "Ambras Castle", "Alps Cable Car"] } },
      { day: 8, title: { es: "Wachau", en: "Wachau" }, description: { es: "Valle del Danubio con vinedos y castillos.", en: "Danube Valley with vineyards and castles." }, activities: { es: ["Crucero Danubio", "Abadia Melk", "Cata de vinos"], en: ["Danube cruise", "Melk Abbey", "Wine tasting"] } },
      { day: 9, title: { es: "Regreso", en: "Return" }, description: { es: "Vuelo de regreso desde Viena.", en: "Return flight from Vienna." }, activities: { es: ["Tiempo libre", "Traslado aeropuerto", "Vuelo regreso"], en: ["Free time", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Cual es la mejor epoca para visitar Austria?", en: "When is the best time to visit Austria?" }, answer: { es: "Verano para senderismo, diciembre para mercados navidenos, invierno para esqui.", en: "Summer for hiking, December for Christmas markets, winter for skiing." } },
      { question: { es: "Es caro viajar en Austria?", en: "Is Austria expensive to travel?" }, answer: { es: "Austria tiene precios moderados-altos. Viena y zonas turisticas son mas caras.", en: "Austria has moderate-high prices. Vienna and tourist areas are more expensive." } }
    ],
    bestTimeToVisit: { es: "Mayo a Septiembre, Diciembre", en: "May to September, December" },
    currency: "EUR",
    language: { es: "Aleman", en: "German" },
    visaInfo: { es: "Espacio Schengen - verificar requisitos", en: "Schengen Area - check requirements" }
  },
  {
    slug: "belgium",
    name: { es: "Belgica", en: "Belgium" },
    heroImage: "https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?w=1920&q=80",
    description: {
      es: "Belgica sorprende con sus ciudades medievales perfectamente conservadas, el chocolate mas fino del mundo, cervezas artesanales unicas y arquitectura Art Nouveau. Desde la Grand Place de Bruselas hasta los canales romanticos de Brujas, cada rincon cuenta historia.",
      en: "Belgium surprises with perfectly preserved medieval cities, the world's finest chocolate, unique craft beers, and Art Nouveau architecture. From Brussels' Grand Place to Bruges' romantic canals, every corner tells a story."
    },
    highlights: {
      es: ["Grand Place Bruselas", "Canales de Brujas", "Diamantes de Amberes", "Chocolate belga", "Gante medieval"],
      en: ["Brussels Grand Place", "Bruges canals", "Antwerp diamonds", "Belgian chocolate", "Medieval Ghent"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80"
    ],
    packages: [
      { id: "belgium-1", name: { es: "Belgica Esencial", en: "Essential Belgium" }, duration: { es: "6 dias", en: "6 days" }, price: "1,699", taxes: "320", includes: { es: ["Vuelos", "Hoteles 4*", "Desayunos", "Degustaciones"], en: ["Flights", "4* Hotels", "Breakfasts", "Tastings"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Bruselas", en: "Brussels" }, description: { es: "Llegada a la capital de Europa.", en: "Arrival in the capital of Europe." }, activities: { es: ["Grand Place", "Manneken Pis", "Galerias Saint-Hubert"], en: ["Grand Place", "Manneken Pis", "Saint-Hubert Galleries"] } },
      { day: 2, title: { es: "Bruselas Art Nouveau", en: "Art Nouveau Brussels" }, description: { es: "La herencia arquitectonica de Horta.", en: "Horta's architectural heritage." }, activities: { es: ["Museo Horta", "Atomium", "Barrio Europeo"], en: ["Horta Museum", "Atomium", "European Quarter"] } },
      { day: 3, title: { es: "Brujas", en: "Bruges" }, description: { es: "La Venecia del Norte, ciudad de cuento.", en: "The Venice of the North, fairytale city." }, activities: { es: ["Canales en barca", "Plaza del Mercado", "Campanario"], en: ["Canal boat tour", "Market Square", "Belfry"] } },
      { day: 4, title: { es: "Gante", en: "Ghent" }, description: { es: "Ciudad universitaria con historia medieval.", en: "University city with medieval history." }, activities: { es: ["Catedral San Bavon", "Castillo Gravensteen", "Graslei"], en: ["Saint Bavo Cathedral", "Gravensteen Castle", "Graslei"] } },
      { day: 5, title: { es: "Amberes", en: "Antwerp" }, description: { es: "Moda, diamantes y el legado de Rubens.", en: "Fashion, diamonds, and Rubens' legacy." }, activities: { es: ["Barrio diamantes", "Casa Rubens", "MAS museo"], en: ["Diamond district", "Rubens House", "MAS museum"] } },
      { day: 6, title: { es: "Regreso", en: "Return" }, description: { es: "Ultimo paseo y vuelo de regreso.", en: "Last stroll and return flight." }, activities: { es: ["Compras chocolate", "Traslado aeropuerto", "Vuelo regreso"], en: ["Chocolate shopping", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Que idiomas se hablan en Belgica?", en: "What languages are spoken in Belgium?" }, answer: { es: "Frances en Valonia, neerlandes en Flandes, aleman en el este. Ingles es comun.", en: "French in Wallonia, Dutch in Flanders, German in the east. English is common." } },
      { question: { es: "Vale la pena visitar Belgica?", en: "Is Belgium worth visiting?" }, answer: { es: "Absolutamente. Ciudades medievales, gastronomia unica y ubicacion perfecta para explorar Europa.", en: "Absolutely. Medieval cities, unique gastronomy, and perfect location to explore Europe." } }
    ],
    bestTimeToVisit: { es: "Abril a Octubre", en: "April to October" },
    currency: "EUR",
    language: { es: "Frances/Neerlandes/Aleman", en: "French/Dutch/German" },
    visaInfo: { es: "Espacio Schengen - verificar requisitos", en: "Schengen Area - check requirements" }
  },
  {
    slug: "czech-republic",
    name: { es: "Republica Checa", en: "Czech Republic" },
    heroImage: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1920&q=80",
    description: {
      es: "La Republica Checa cautiva con Praga, la ciudad de las cien torres, castillos de cuento como Cesky Krumlov, balnearios historicos y la mejor cerveza del mundo. Descubre la bohemia romantica entre puentes goticos, relojes astronomicos y ciudades medievales perfectas.",
      en: "The Czech Republic captivates with Prague, the city of a hundred towers, fairytale castles like Cesky Krumlov, historic spas, and the world's best beer. Discover romantic Bohemia among Gothic bridges, astronomical clocks, and perfect medieval towns."
    },
    highlights: {
      es: ["Puente Carlos Praga", "Castillo de Praga", "Cesky Krumlov", "Karlovy Vary", "Cerveza checa"],
      en: ["Charles Bridge Prague", "Prague Castle", "Cesky Krumlov", "Karlovy Vary", "Czech beer"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80",
      "https://images.unsplash.com/photo-1562624475-96c2bc08fab9?w=800&q=80",
      "https://images.unsplash.com/photo-1600623471616-8c1966c91ff6?w=800&q=80"
    ],
    packages: [
      { id: "czech-republic-1", name: { es: "Bohemia Romantica", en: "Romantic Bohemia" }, duration: { es: "7 dias", en: "7 days" }, price: "1,799", taxes: "340", includes: { es: ["Vuelos", "Hoteles 4*", "Desayunos", "Tours"], en: ["Flights", "4* Hotels", "Breakfasts", "Tours"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Praga Llegada", en: "Prague Arrival" }, description: { es: "Bienvenida a la ciudad de las cien torres.", en: "Welcome to the city of a hundred towers." }, activities: { es: ["Traslado hotel", "Plaza Ciudad Vieja", "Cena tipica"], en: ["Hotel transfer", "Old Town Square", "Traditional dinner"] } },
      { day: 2, title: { es: "Praga Historica", en: "Historic Prague" }, description: { es: "El corazon gotico y barroco de la ciudad.", en: "The Gothic and Baroque heart of the city." }, activities: { es: ["Puente Carlos", "Reloj Astronomico", "Barrio Judio"], en: ["Charles Bridge", "Astronomical Clock", "Jewish Quarter"] } },
      { day: 3, title: { es: "Castillo de Praga", en: "Prague Castle" }, description: { es: "El complejo de castillos mas grande del mundo.", en: "The world's largest castle complex." }, activities: { es: ["Castillo de Praga", "Catedral San Vito", "Callejon del Oro"], en: ["Prague Castle", "St. Vitus Cathedral", "Golden Lane"] } },
      { day: 4, title: { es: "Cesky Krumlov", en: "Cesky Krumlov" }, description: { es: "Ciudad medieval perfecta, patrimonio UNESCO.", en: "Perfect medieval town, UNESCO heritage." }, activities: { es: ["Castillo Cesky Krumlov", "Centro historico", "Rafting rio Vltava"], en: ["Cesky Krumlov Castle", "Historic center", "Vltava River rafting"] } },
      { day: 5, title: { es: "Karlovy Vary", en: "Karlovy Vary" }, description: { es: "El spa mas famoso de Europa Central.", en: "Central Europe's most famous spa." }, activities: { es: ["Columnata spa", "Aguas termales", "Cristaleria Moser"], en: ["Spa colonnade", "Thermal waters", "Moser glassworks"] } },
      { day: 6, title: { es: "Kutna Hora", en: "Kutna Hora" }, description: { es: "Ciudad minera medieval con el osario de Sedlec.", en: "Medieval mining town with the Sedlec ossuary." }, activities: { es: ["Osario de Sedlec", "Catedral Santa Barbara", "Centro historico"], en: ["Sedlec Ossuary", "St. Barbara's Cathedral", "Historic center"] } },
      { day: 7, title: { es: "Regreso", en: "Return" }, description: { es: "Ultimo paseo y vuelo de regreso.", en: "Last stroll and return flight." }, activities: { es: ["Compras cristal", "Traslado aeropuerto", "Vuelo regreso"], en: ["Crystal shopping", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Cual es la moneda de Republica Checa?", en: "What is the currency of the Czech Republic?" }, answer: { es: "La Corona Checa (CZK). Muchos lugares aceptan euros pero el cambio puede ser desfavorable.", en: "The Czech Crown (CZK). Many places accept euros but the exchange rate may be unfavorable." } },
      { question: { es: "Praga es cara?", en: "Is Prague expensive?" }, answer: { es: "Praga es mas economica que Europa Occidental. Comida y bebida son bastante accesibles.", en: "Prague is cheaper than Western Europe. Food and drinks are quite affordable." } }
    ],
    bestTimeToVisit: { es: "Abril a Octubre", en: "April to October" },
    currency: "CZK",
    language: { es: "Checo", en: "Czech" },
    visaInfo: { es: "Espacio Schengen - verificar requisitos", en: "Schengen Area - check requirements" }
  },
  {
    slug: "denmark",
    name: { es: "Dinamarca", en: "Denmark" },
    heroImage: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=1920&q=80",
    description: {
      es: "Dinamarca, cuna del hygge y la felicidad, ofrece Copenhague con sus canales coloridos, castillos de Hamlet, el diseno nordico mas vanguardista y los parques de Tivoli. Descubre vikingos, palacios reales y la vida danesa que inspira al mundo.",
      en: "Denmark, home of hygge and happiness, offers Copenhagen with its colorful canals, Hamlet's castles, cutting-edge Nordic design, and Tivoli gardens. Discover Vikings, royal palaces, and the Danish lifestyle that inspires the world."
    },
    highlights: {
      es: ["Nyhavn Copenhague", "Jardines Tivoli", "Castillo Kronborg", "Sirenita", "Diseno danes"],
      en: ["Nyhavn Copenhagen", "Tivoli Gardens", "Kronborg Castle", "Little Mermaid", "Danish design"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1552560880-2482cef14240?w=800&q=80",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80"
    ],
    packages: [
      { id: "denmark-1", name: { es: "Dinamarca Hygge", en: "Hygge Denmark" }, duration: { es: "6 dias", en: "6 days" }, price: "2,199", taxes: "380", includes: { es: ["Vuelos", "Hoteles 4*", "Desayunos", "Copenhagen Card"], en: ["Flights", "4* Hotels", "Breakfasts", "Copenhagen Card"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Copenhague", en: "Copenhagen" }, description: { es: "Llegada a la capital mas feliz del mundo.", en: "Arrival in the world's happiest capital." }, activities: { es: ["Traslado hotel", "Nyhavn", "Cena nordica"], en: ["Hotel transfer", "Nyhavn", "Nordic dinner"] } },
      { day: 2, title: { es: "Copenhague Clasica", en: "Classic Copenhagen" }, description: { es: "Los iconos de la capital danesa.", en: "The icons of the Danish capital." }, activities: { es: ["Sirenita", "Palacio Amalienborg", "Jardines Tivoli"], en: ["Little Mermaid", "Amalienborg Palace", "Tivoli Gardens"] } },
      { day: 3, title: { es: "Diseno y Gastronomia", en: "Design and Gastronomy" }, description: { es: "La vanguardia danesa en diseno y cocina.", en: "Danish cutting-edge design and cuisine." }, activities: { es: ["Museo Diseno", "Torvehallerne", "Christiania"], en: ["Design Museum", "Torvehallerne", "Christiania"] } },
      { day: 4, title: { es: "Castillo Kronborg", en: "Kronborg Castle" }, description: { es: "El castillo de Hamlet, patrimonio UNESCO.", en: "Hamlet's castle, UNESCO heritage." }, activities: { es: ["Tren a Helsingor", "Castillo Kronborg", "Cruce a Suecia opcional"], en: ["Train to Helsingor", "Kronborg Castle", "Optional Sweden crossing"] } },
      { day: 5, title: { es: "Roskilde", en: "Roskilde" }, description: { es: "Vikingos y la catedral de los reyes daneses.", en: "Vikings and the cathedral of Danish kings." }, activities: { es: ["Museo Barcos Vikingos", "Catedral Roskilde", "Centro historico"], en: ["Viking Ship Museum", "Roskilde Cathedral", "Historic center"] } },
      { day: 6, title: { es: "Regreso", en: "Return" }, description: { es: "Ultimo paseo por Copenhague y vuelo.", en: "Last walk through Copenhagen and flight." }, activities: { es: ["Stroget compras", "Traslado aeropuerto", "Vuelo regreso"], en: ["Stroget shopping", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Es Dinamarca muy cara?", en: "Is Denmark very expensive?" }, answer: { es: "Si, es uno de los paises mas caros de Europa. La Copenhagen Card ayuda a ahorrar en atracciones.", en: "Yes, it's one of Europe's most expensive countries. The Copenhagen Card helps save on attractions." } },
      { question: { es: "Que es hygge?", en: "What is hygge?" }, answer: { es: "Un concepto danes de bienestar, comodidad y disfrutar los momentos simples de la vida.", en: "A Danish concept of wellbeing, comfort, and enjoying life's simple moments." } }
    ],
    bestTimeToVisit: { es: "Mayo a Septiembre", en: "May to September" },
    currency: "DKK",
    language: { es: "Danes", en: "Danish" },
    visaInfo: { es: "Espacio Schengen - verificar requisitos", en: "Schengen Area - check requirements" }
  },
  {
    slug: "finland",
    name: { es: "Finlandia", en: "Finland" },
    heroImage: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80",
    description: {
      es: "Finlandia es la tierra de la aurora boreal, saunas autenticas, bosques infinitos y el hogar de Papa Noel en Laponia. Desde el diseno vanguardista de Helsinki hasta los lagos cristalinos y la magia del Artico, vive experiencias unicas en el norte de Europa.",
      en: "Finland is the land of the Northern Lights, authentic saunas, endless forests, and Santa Claus' home in Lapland. From Helsinki's cutting-edge design to crystal lakes and Arctic magic, experience unique adventures in Northern Europe."
    },
    highlights: {
      es: ["Aurora boreal Laponia", "Aldea Papa Noel", "Saunas finlandesas", "Lagos cristalinos", "Diseno Helsinki"],
      en: ["Northern Lights Lapland", "Santa Claus Village", "Finnish saunas", "Crystal lakes", "Helsinki design"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1538029038569-6a2c7b22dd65?w=800&q=80",
      "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?w=800&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80"
    ],
    packages: [
      { id: "finland-1", name: { es: "Laponia Magica", en: "Magical Lapland" }, duration: { es: "7 dias", en: "7 days" }, price: "3,299", taxes: "520", includes: { es: ["Vuelos", "Hoteles/Iglus", "Actividades articas", "Aurora tour"], en: ["Flights", "Hotels/Igloos", "Arctic activities", "Aurora tour"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Helsinki", en: "Helsinki" }, description: { es: "Llegada a la capital del diseno nordico.", en: "Arrival in the Nordic design capital." }, activities: { es: ["Traslado hotel", "Catedral Helsinki", "Mercado puerto"], en: ["Hotel transfer", "Helsinki Cathedral", "Market Square"] } },
      { day: 2, title: { es: "Helsinki Moderna", en: "Modern Helsinki" }, description: { es: "Arquitectura, diseno y la vida finlandesa.", en: "Architecture, design, and Finnish life." }, activities: { es: ["Capilla del Silencio", "Museo Diseno", "Sauna publica"], en: ["Chapel of Silence", "Design Museum", "Public sauna"] } },
      { day: 3, title: { es: "Vuelo a Laponia", en: "Flight to Lapland" }, description: { es: "Rumbo al circulo polar artico.", en: "Heading to the Arctic Circle." }, activities: { es: ["Vuelo Rovaniemi", "Aldea Papa Noel", "Cruzar circulo polar"], en: ["Flight to Rovaniemi", "Santa Claus Village", "Cross Arctic Circle"] } },
      { day: 4, title: { es: "Actividades Articas", en: "Arctic Activities" }, description: { es: "Aventuras en el invierno artico.", en: "Adventures in the Arctic winter." }, activities: { es: ["Trineo de huskies", "Trineo renos", "Pesca en hielo"], en: ["Husky sledding", "Reindeer sledding", "Ice fishing"] } },
      { day: 5, title: { es: "Aurora Boreal", en: "Northern Lights" }, description: { es: "Busqueda de las luces del norte.", en: "Northern Lights hunting." }, activities: { es: ["Dia libre", "Cena lapona", "Safari aurora boreal"], en: ["Free day", "Lappish dinner", "Northern Lights safari"] } },
      { day: 6, title: { es: "Iglu de Cristal", en: "Glass Igloo" }, description: { es: "Noche en iglu bajo las estrellas.", en: "Night in an igloo under the stars." }, activities: { es: ["Snowmobile", "Cena artica", "Noche en iglu cristal"], en: ["Snowmobile", "Arctic dinner", "Glass igloo night"] } },
      { day: 7, title: { es: "Regreso", en: "Return" }, description: { es: "Vuelo de regreso via Helsinki.", en: "Return flight via Helsinki." }, activities: { es: ["Desayuno", "Vuelo Helsinki", "Conexion regreso"], en: ["Breakfast", "Flight to Helsinki", "Return connection"] } }
    ],
    faqs: [
      { question: { es: "Cuando ver la aurora boreal?", en: "When to see the Northern Lights?" }, answer: { es: "De septiembre a marzo en Laponia. Mayor probabilidad en diciembre-febrero.", en: "From September to March in Lapland. Higher probability in December-February." } },
      { question: { es: "Hace mucho frio en invierno?", en: "Is it very cold in winter?" }, answer: { es: "Si, puede llegar a -30C. Se proporciona ropa termica para actividades.", en: "Yes, it can reach -30C. Thermal clothing is provided for activities." } }
    ],
    bestTimeToVisit: { es: "Diciembre a Marzo (invierno), Junio a Agosto (verano)", en: "December to March (winter), June to August (summer)" },
    currency: "EUR",
    language: { es: "Finlandes/Sueco", en: "Finnish/Swedish" },
    visaInfo: { es: "Espacio Schengen - verificar requisitos", en: "Schengen Area - check requirements" }
  },
  {
    slug: "hungary",
    name: { es: "Hungria", en: "Hungary" },
    heroImage: "https://images.unsplash.com/photo-1541343672885-9be56236302a?w=1920&q=80",
    description: {
      es: "Hungria deslumbra con Budapest, la Perla del Danubio dividida por el rio entre Buda y Pest. Banos termales legendarios, el Parlamento mas espectacular de Europa, ruinas de bares unicos y la tradicion de los vinos de Tokaj te esperan.",
      en: "Hungary dazzles with Budapest, the Pearl of the Danube divided by the river between Buda and Pest. Legendary thermal baths, Europe's most spectacular Parliament, unique ruin bars, and the tradition of Tokaj wines await you."
    },
    highlights: {
      es: ["Parlamento Budapest", "Banos Szechenyi", "Castillo de Buda", "Ruin bars", "Vinos Tokaj"],
      en: ["Budapest Parliament", "Szechenyi Baths", "Buda Castle", "Ruin bars", "Tokaj wines"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?w=800&q=80",
      "https://images.unsplash.com/photo-1551867633-194f125bddfa?w=800&q=80"
    ],
    packages: [
      { id: "hungary-1", name: { es: "Budapest y Danubio", en: "Budapest and Danube" }, duration: { es: "6 dias", en: "6 days" }, price: "1,599", taxes: "300", includes: { es: ["Vuelos", "Hoteles 4*", "Desayunos", "Crucero Danubio"], en: ["Flights", "4* Hotels", "Breakfasts", "Danube cruise"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Budapest Llegada", en: "Budapest Arrival" }, description: { es: "Bienvenida a la Perla del Danubio.", en: "Welcome to the Pearl of the Danube." }, activities: { es: ["Traslado hotel", "Paseo Pest", "Crucero nocturno Danubio"], en: ["Hotel transfer", "Pest walk", "Danube night cruise"] } },
      { day: 2, title: { es: "Pest", en: "Pest" }, description: { es: "El lado vibrante de la ciudad.", en: "The vibrant side of the city." }, activities: { es: ["Parlamento", "Basilica San Esteban", "Avenida Andrassy"], en: ["Parliament", "St. Stephen's Basilica", "Andrassy Avenue"] } },
      { day: 3, title: { es: "Buda", en: "Buda" }, description: { es: "La colina historica y los palacios.", en: "The historic hill and palaces." }, activities: { es: ["Castillo de Buda", "Bastion Pescadores", "Iglesia Matias"], en: ["Buda Castle", "Fisherman's Bastion", "Matthias Church"] } },
      { day: 4, title: { es: "Banos Termales", en: "Thermal Baths" }, description: { es: "Relax en los legendarios banos hungaros.", en: "Relax in the legendary Hungarian baths." }, activities: { es: ["Banos Szechenyi", "Parque Varosliget", "Ruin bars noche"], en: ["Szechenyi Baths", "Varosliget Park", "Ruin bars night"] } },
      { day: 5, title: { es: "Recodo del Danubio", en: "Danube Bend" }, description: { es: "Excursion a las joyas del Danubio.", en: "Excursion to the Danube gems." }, activities: { es: ["Szentendre", "Visegrad", "Esztergom"], en: ["Szentendre", "Visegrad", "Esztergom"] } },
      { day: 6, title: { es: "Regreso", en: "Return" }, description: { es: "Ultimo paseo y vuelo de regreso.", en: "Last stroll and return flight." }, activities: { es: ["Mercado Central", "Traslado aeropuerto", "Vuelo regreso"], en: ["Central Market", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Hungria usa el euro?", en: "Does Hungary use the euro?" }, answer: { es: "No, la moneda es el Forinto Hungaro (HUF). Muchos lugares aceptan euros pero el cambio puede variar.", en: "No, the currency is the Hungarian Forint (HUF). Many places accept euros but exchange rates vary." } },
      { question: { es: "Son seguros los ruin bars?", en: "Are ruin bars safe?" }, answer: { es: "Si, son bares tematicos en edificios abandonados rehabilitados. Szimpla Kert es el mas famoso.", en: "Yes, they're themed bars in refurbished abandoned buildings. Szimpla Kert is the most famous." } }
    ],
    bestTimeToVisit: { es: "Marzo a Mayo, Septiembre a Noviembre", en: "March to May, September to November" },
    currency: "HUF",
    language: { es: "Hungaro", en: "Hungarian" },
    visaInfo: { es: "Espacio Schengen - verificar requisitos", en: "Schengen Area - check requirements" }
  },
  {
    slug: "iceland",
    name: { es: "Islandia", en: "Iceland" },
    heroImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1920&q=80",
    description: {
      es: "Islandia es la tierra de hielo y fuego donde glaciares, volcanes, geiseres y cascadas crean paisajes de otro mundo. La Laguna Azul, la aurora boreal, ballenas y la unica carretera que rodea la isla ofrecen aventuras incomparables.",
      en: "Iceland is the land of fire and ice where glaciers, volcanoes, geysers, and waterfalls create otherworldly landscapes. The Blue Lagoon, Northern Lights, whales, and the only road circling the island offer unparalleled adventures."
    },
    highlights: {
      es: ["Circulo Dorado", "Laguna Azul", "Aurora boreal", "Cascadas epicas", "Avistamiento ballenas"],
      en: ["Golden Circle", "Blue Lagoon", "Northern Lights", "Epic waterfalls", "Whale watching"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=800&q=80",
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80"
    ],
    packages: [
      { id: "iceland-1", name: { es: "Islandia Esencial", en: "Essential Iceland" }, duration: { es: "8 dias", en: "8 days" }, price: "3,499", taxes: "550", includes: { es: ["Vuelos", "Hoteles/Cabanas", "4x4", "Actividades"], en: ["Flights", "Hotels/Cabins", "4x4", "Activities"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Reykjavik", en: "Reykjavik" }, description: { es: "Llegada a la capital mas septentrional.", en: "Arrival in the world's northernmost capital." }, activities: { es: ["Traslado hotel", "Centro Reykjavik", "Hallgrimskirkja"], en: ["Hotel transfer", "Reykjavik center", "Hallgrimskirkja"] } },
      { day: 2, title: { es: "Circulo Dorado", en: "Golden Circle" }, description: { es: "Los iconos naturales de Islandia.", en: "Iceland's natural icons." }, activities: { es: ["Thingvellir", "Geysir", "Gullfoss"], en: ["Thingvellir", "Geysir", "Gullfoss"] } },
      { day: 3, title: { es: "Costa Sur", en: "South Coast" }, description: { es: "Cascadas y playas de arena negra.", en: "Waterfalls and black sand beaches." }, activities: { es: ["Seljalandsfoss", "Skogafoss", "Playa Reynisfjara"], en: ["Seljalandsfoss", "Skogafoss", "Reynisfjara Beach"] } },
      { day: 4, title: { es: "Laguna Glaciar", en: "Glacier Lagoon" }, description: { es: "Icebergs flotando en agua cristalina.", en: "Icebergs floating in crystal water." }, activities: { es: ["Jokulsarlon", "Diamond Beach", "Barca entre icebergs"], en: ["Jokulsarlon", "Diamond Beach", "Boat among icebergs"] } },
      { day: 5, title: { es: "Glaciar Vatnajokull", en: "Vatnajokull Glacier" }, description: { es: "Caminata sobre el glaciar mas grande de Europa.", en: "Hike on Europe's largest glacier." }, activities: { es: ["Caminata glaciar", "Cueva de hielo", "Parque Nacional"], en: ["Glacier hike", "Ice cave", "National Park"] } },
      { day: 6, title: { es: "Peninsula Snaefellsnes", en: "Snaefellsnes Peninsula" }, description: { es: "Islandia en miniatura.", en: "Iceland in miniature." }, activities: { es: ["Kirkjufell", "Acantilados Arnarstapi", "Playa focas"], en: ["Kirkjufell", "Arnarstapi cliffs", "Seal beach"] } },
      { day: 7, title: { es: "Laguna Azul", en: "Blue Lagoon" }, description: { es: "Relax en las aguas termales mas famosas.", en: "Relax in the most famous thermal waters." }, activities: { es: ["Laguna Azul", "Spa geotermico", "Cena despedida"], en: ["Blue Lagoon", "Geothermal spa", "Farewell dinner"] } },
      { day: 8, title: { es: "Regreso", en: "Return" }, description: { es: "Vuelo de regreso.", en: "Return flight." }, activities: { es: ["Desayuno", "Traslado aeropuerto", "Vuelo regreso"], en: ["Breakfast", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Cuando es mejor visitar Islandia?", en: "When is best to visit Iceland?" }, answer: { es: "Verano (junio-agosto) para sol de medianoche y fauna. Invierno para auroras boreales.", en: "Summer (June-August) for midnight sun and wildlife. Winter for Northern Lights." } },
      { question: { es: "Es muy cara Islandia?", en: "Is Iceland very expensive?" }, answer: { es: "Si, es uno de los paises mas caros del mundo. Planifica bien el presupuesto.", en: "Yes, it's one of the world's most expensive countries. Plan your budget carefully." } }
    ],
    bestTimeToVisit: { es: "Junio a Agosto (verano), Septiembre a Marzo (auroras)", en: "June to August (summer), September to March (auroras)" },
    currency: "ISK",
    language: { es: "Islandes", en: "Icelandic" },
    visaInfo: { es: "Espacio Schengen - verificar requisitos", en: "Schengen Area - check requirements" }
  },
  {
    slug: "ireland",
    name: { es: "Irlanda", en: "Ireland" },
    heroImage: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=1920&q=80",
    description: {
      es: "Irlanda, la Isla Esmeralda, cautiva con acantilados dramaticos, castillos antiguos, pubs con musica tradicional y la calidez de su gente. Desde los Cliffs of Moher hasta Dublin literaria, la magia celta te envuelve en cada rincon verde.",
      en: "Ireland, the Emerald Isle, captivates with dramatic cliffs, ancient castles, pubs with traditional music, and the warmth of its people. From the Cliffs of Moher to literary Dublin, Celtic magic envelops you in every green corner."
    },
    highlights: {
      es: ["Cliffs of Moher", "Ring of Kerry", "Dublin", "Guinness Storehouse", "Giant's Causeway"],
      en: ["Cliffs of Moher", "Ring of Kerry", "Dublin", "Guinness Storehouse", "Giant's Causeway"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1564959130747-897fb406b9af?w=800&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
    ],
    packages: [
      { id: "ireland-1", name: { es: "Irlanda Esmeralda", en: "Emerald Ireland" }, duration: { es: "9 dias", en: "9 days" }, price: "2,499", taxes: "420", includes: { es: ["Vuelos", "Hoteles 4*", "Coche alquiler", "Desayunos irlandeses"], en: ["Flights", "4* Hotels", "Rental car", "Irish breakfasts"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Dublin", en: "Dublin" }, description: { es: "Llegada a la capital literaria.", en: "Arrival in the literary capital." }, activities: { es: ["Traslado hotel", "Temple Bar", "Pub tradicional"], en: ["Hotel transfer", "Temple Bar", "Traditional pub"] } },
      { day: 2, title: { es: "Dublin Historica", en: "Historic Dublin" }, description: { es: "La historia y cultura de la ciudad.", en: "The city's history and culture." }, activities: { es: ["Trinity College", "Libro de Kells", "Guinness Storehouse"], en: ["Trinity College", "Book of Kells", "Guinness Storehouse"] } },
      { day: 3, title: { es: "Galway", en: "Galway" }, description: { es: "La bohemia costa oeste irlandesa.", en: "The bohemian Irish west coast." }, activities: { es: ["Ruta a Galway", "Centro medieval", "Musica en vivo"], en: ["Route to Galway", "Medieval center", "Live music"] } },
      { day: 4, title: { es: "Cliffs of Moher", en: "Cliffs of Moher" }, description: { es: "Los acantilados mas espectaculares de Europa.", en: "Europe's most spectacular cliffs." }, activities: { es: ["Cliffs of Moher", "The Burren", "Doolin"], en: ["Cliffs of Moher", "The Burren", "Doolin"] } },
      { day: 5, title: { es: "Ring of Kerry", en: "Ring of Kerry" }, description: { es: "La ruta costera mas famosa de Irlanda.", en: "Ireland's most famous coastal route." }, activities: { es: ["Ring of Kerry", "Parque Killarney", "Lagos Killarney"], en: ["Ring of Kerry", "Killarney Park", "Killarney Lakes"] } },
      { day: 6, title: { es: "Cork y Blarney", en: "Cork and Blarney" }, description: { es: "La capital gastronomica y el castillo legendario.", en: "The gastronomic capital and the legendary castle." }, activities: { es: ["Castillo Blarney", "Piedra elocuencia", "English Market"], en: ["Blarney Castle", "Eloquence stone", "English Market"] } },
      { day: 7, title: { es: "Kilkenny", en: "Kilkenny" }, description: { es: "La ciudad medieval mejor conservada.", en: "The best-preserved medieval city." }, activities: { es: ["Castillo Kilkenny", "Cerveceria Smithwicks", "Centro medieval"], en: ["Kilkenny Castle", "Smithwicks Brewery", "Medieval center"] } },
      { day: 8, title: { es: "Wicklow", en: "Wicklow" }, description: { es: "El jardin de Irlanda.", en: "The garden of Ireland." }, activities: { es: ["Glendalough", "Powerscourt", "Montanas Wicklow"], en: ["Glendalough", "Powerscourt", "Wicklow Mountains"] } },
      { day: 9, title: { es: "Regreso", en: "Return" }, description: { es: "Vuelo de regreso desde Dublin.", en: "Return flight from Dublin." }, activities: { es: ["Tiempo libre", "Traslado aeropuerto", "Vuelo regreso"], en: ["Free time", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Llueve mucho en Irlanda?", en: "Does it rain a lot in Ireland?" }, answer: { es: "Si, el clima es humedo y cambiante. Lleva siempre una chaqueta impermeable.", en: "Yes, the weather is wet and changeable. Always carry a waterproof jacket." } },
      { question: { es: "Se necesita visa para Irlanda?", en: "Is a visa needed for Ireland?" }, answer: { es: "Irlanda no es parte de Schengen. Verifica los requisitos para tu nacionalidad.", en: "Ireland is not part of Schengen. Check the requirements for your nationality." } }
    ],
    bestTimeToVisit: { es: "Mayo a Septiembre", en: "May to September" },
    currency: "EUR",
    language: { es: "Ingles/Gaelico", en: "English/Gaelic" },
    visaInfo: { es: "No es Schengen - verificar requisitos especificos", en: "Not Schengen - check specific requirements" }
  },
  {
    slug: "norway",
    name: { es: "Noruega", en: "Norway" },
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    description: {
      es: "Noruega sorprende con los fiordos mas dramaticos del mundo, la aurora boreal, el sol de medianoche y ciudades vibrantes como Bergen y Oslo. Cruceros por fiordos, pueblos pesqueros coloridos y naturaleza virgen te esperan en este pais escandinavo.",
      en: "Norway surprises with the world's most dramatic fjords, the Northern Lights, the midnight sun, and vibrant cities like Bergen and Oslo. Fjord cruises, colorful fishing villages, and pristine nature await you in this Scandinavian country."
    },
    highlights: {
      es: ["Fiordos noruegos", "Bergen colorida", "Oslo moderna", "Aurora boreal", "Tren Flam"],
      en: ["Norwegian fjords", "Colorful Bergen", "Modern Oslo", "Northern Lights", "Flam Railway"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1548783301-1a22b1d7f6e3?w=800&q=80",
      "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800&q=80",
      "https://images.unsplash.com/photo-1484264883846-1fd0f423c0b3?w=800&q=80"
    ],
    packages: [
      { id: "norway-1", name: { es: "Fiordos de Noruega", en: "Norway's Fjords" }, duration: { es: "9 dias", en: "9 days" }, price: "3,599", taxes: "560", includes: { es: ["Vuelos", "Hoteles 4*", "Crucero fiordo", "Tren panoramico"], en: ["Flights", "4* Hotels", "Fjord cruise", "Panoramic train"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Oslo", en: "Oslo" }, description: { es: "Llegada a la capital noruega.", en: "Arrival in the Norwegian capital." }, activities: { es: ["Traslado hotel", "Opera Oslo", "Paseo Aker Brygge"], en: ["Hotel transfer", "Oslo Opera", "Aker Brygge walk"] } },
      { day: 2, title: { es: "Oslo Cultura", en: "Oslo Culture" }, description: { es: "Museos y arte en la capital.", en: "Museums and art in the capital." }, activities: { es: ["Museo Munch", "Parque Vigeland", "Fortaleza Akershus"], en: ["Munch Museum", "Vigeland Park", "Akershus Fortress"] } },
      { day: 3, title: { es: "Tren a Bergen", en: "Train to Bergen" }, description: { es: "El viaje en tren mas bello de Europa.", en: "Europe's most beautiful train journey." }, activities: { es: ["Tren Oslo-Bergen", "Paisajes montanas", "Llegada Bergen"], en: ["Oslo-Bergen train", "Mountain landscapes", "Bergen arrival"] } },
      { day: 4, title: { es: "Bergen", en: "Bergen" }, description: { es: "La puerta a los fiordos.", en: "The gateway to the fjords." }, activities: { es: ["Bryggen UNESCO", "Funicular Floyen", "Mercado pescado"], en: ["Bryggen UNESCO", "Floyen Funicular", "Fish market"] } },
      { day: 5, title: { es: "Crucero Fiordo", en: "Fjord Cruise" }, description: { es: "Navegando el Sognefjord, el rey de los fiordos.", en: "Sailing the Sognefjord, king of the fjords." }, activities: { es: ["Crucero Sognefjord", "Cascadas", "Pueblo Flam"], en: ["Sognefjord cruise", "Waterfalls", "Flam village"] } },
      { day: 6, title: { es: "Tren de Flam", en: "Flam Railway" }, description: { es: "Uno de los viajes en tren mas espectaculares.", en: "One of the most spectacular train journeys." }, activities: { es: ["Tren Flam", "Cascada Kjosfossen", "Ruta a Geiranger"], en: ["Flam Railway", "Kjosfossen Waterfall", "Route to Geiranger"] } },
      { day: 7, title: { es: "Geirangerfjord", en: "Geirangerfjord" }, description: { es: "El fiordo patrimonio UNESCO mas famoso.", en: "The most famous UNESCO heritage fjord." }, activities: { es: ["Crucero Geiranger", "Siete Hermanas cascada", "Mirador Flydalsjuvet"], en: ["Geiranger cruise", "Seven Sisters waterfall", "Flydalsjuvet viewpoint"] } },
      { day: 8, title: { es: "Alesund", en: "Alesund" }, description: { es: "Ciudad Art Nouveau unica.", en: "Unique Art Nouveau city." }, activities: { es: ["Centro Alesund", "Mirador Aksla", "Acuario"], en: ["Alesund center", "Aksla viewpoint", "Aquarium"] } },
      { day: 9, title: { es: "Regreso", en: "Return" }, description: { es: "Vuelo de regreso via Oslo.", en: "Return flight via Oslo." }, activities: { es: ["Vuelo interno", "Conexion internacional", "Vuelo regreso"], en: ["Domestic flight", "International connection", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Noruega es muy cara?", en: "Is Norway very expensive?" }, answer: { es: "Si, es uno de los paises mas caros del mundo. Los tours organizados ayudan a optimizar costos.", en: "Yes, it's one of the world's most expensive countries. Organized tours help optimize costs." } },
      { question: { es: "Cual es la mejor epoca para los fiordos?", en: "When is the best time for the fjords?" }, answer: { es: "Mayo a septiembre para clima templado. Junio-julio tienen sol de medianoche.", en: "May to September for mild weather. June-July has the midnight sun." } }
    ],
    bestTimeToVisit: { es: "Mayo a Septiembre", en: "May to September" },
    currency: "NOK",
    language: { es: "Noruego", en: "Norwegian" },
    visaInfo: { es: "Espacio Schengen - verificar requisitos", en: "Schengen Area - check requirements" }
  },
  {
    slug: "poland",
    name: { es: "Polonia", en: "Poland" },
    heroImage: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=1920&q=80",
    description: {
      es: "Polonia sorprende con Cracovia medieval, Varsovia renacida de las cenizas, las minas de sal de Wieliczka y la memoria de Auschwitz. Castillos goticos, montanas Tatra y la calidez polaca crean un destino fascinante lleno de historia y cultura.",
      en: "Poland surprises with medieval Krakow, Warsaw reborn from the ashes, the Wieliczka salt mines, and the memory of Auschwitz. Gothic castles, Tatra mountains, and Polish warmth create a fascinating destination full of history and culture."
    },
    highlights: {
      es: ["Cracovia medieval", "Varsovia historica", "Minas de sal Wieliczka", "Auschwitz memorial", "Montanas Tatra"],
      en: ["Medieval Krakow", "Historic Warsaw", "Wieliczka Salt Mines", "Auschwitz Memorial", "Tatra Mountains"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1580910527948-e26d12ed6d23?w=800&q=80",
      "https://images.unsplash.com/photo-1607427293702-036933bbf746?w=800&q=80"
    ],
    packages: [
      { id: "poland-1", name: { es: "Polonia Esencial", en: "Essential Poland" }, duration: { es: "8 dias", en: "8 days" }, price: "1,799", taxes: "340", includes: { es: ["Vuelos", "Hoteles 4*", "Desayunos", "Tours guiados"], en: ["Flights", "4* Hotels", "Breakfasts", "Guided tours"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Varsovia", en: "Warsaw" }, description: { es: "Llegada a la capital polaca.", en: "Arrival in the Polish capital." }, activities: { es: ["Traslado hotel", "Ciudad Vieja", "Cena polaca"], en: ["Hotel transfer", "Old Town", "Polish dinner"] } },
      { day: 2, title: { es: "Varsovia Historica", en: "Historic Warsaw" }, description: { es: "La ciudad que renacio de sus cenizas.", en: "The city that rose from its ashes." }, activities: { es: ["Palacio Cultura", "Museo Insurreccion", "Lazienki Park"], en: ["Palace of Culture", "Uprising Museum", "Lazienki Park"] } },
      { day: 3, title: { es: "Tren a Cracovia", en: "Train to Krakow" }, description: { es: "Hacia la joya medieval de Polonia.", en: "To Poland's medieval jewel." }, activities: { es: ["Tren a Cracovia", "Plaza Mayor", "Basilica Santa Maria"], en: ["Train to Krakow", "Main Square", "St. Mary's Basilica"] } },
      { day: 4, title: { es: "Cracovia", en: "Krakow" }, description: { es: "El centro historico patrimonio UNESCO.", en: "The UNESCO heritage historic center." }, activities: { es: ["Castillo Wawel", "Barrio Kazimierz", "Tour gastronomico"], en: ["Wawel Castle", "Kazimierz Quarter", "Food tour"] } },
      { day: 5, title: { es: "Auschwitz", en: "Auschwitz" }, description: { es: "Visita al memorial del Holocausto.", en: "Visit to the Holocaust memorial." }, activities: { es: ["Auschwitz I", "Birkenau", "Reflexion y memoria"], en: ["Auschwitz I", "Birkenau", "Reflection and memory"] } },
      { day: 6, title: { es: "Wieliczka", en: "Wieliczka" }, description: { es: "Las minas de sal mas famosas del mundo.", en: "The world's most famous salt mines." }, activities: { es: ["Minas Wieliczka", "Capilla subterranea", "Lagos salados"], en: ["Wieliczka Mines", "Underground chapel", "Salt lakes"] } },
      { day: 7, title: { es: "Zakopane", en: "Zakopane" }, description: { es: "La capital de invierno en los Tatras.", en: "The winter capital in the Tatras." }, activities: { es: ["Montanas Tatra", "Cultura montanesa", "Queso oscypek"], en: ["Tatra Mountains", "Highlander culture", "Oscypek cheese"] } },
      { day: 8, title: { es: "Regreso", en: "Return" }, description: { es: "Vuelo de regreso desde Cracovia.", en: "Return flight from Krakow." }, activities: { es: ["Tiempo libre", "Traslado aeropuerto", "Vuelo regreso"], en: ["Free time", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Polonia es economica?", en: "Is Poland affordable?" }, answer: { es: "Si, Polonia ofrece excelente relacion calidad-precio comparado con Europa Occidental.", en: "Yes, Poland offers excellent value for money compared to Western Europe." } },
      { question: { es: "Es dificil visitar Auschwitz?", en: "Is it difficult to visit Auschwitz?" }, answer: { es: "Emocionalmente si. Es una experiencia profunda e importante. Se recomienda prepararse mentalmente.", en: "Emotionally, yes. It's a profound and important experience. Mental preparation is recommended." } }
    ],
    bestTimeToVisit: { es: "Mayo a Septiembre", en: "May to September" },
    currency: "PLN",
    language: { es: "Polaco", en: "Polish" },
    visaInfo: { es: "Espacio Schengen - verificar requisitos", en: "Schengen Area - check requirements" }
  },
  {
    slug: "romania",
    name: { es: "Rumania", en: "Romania" },
    heroImage: "https://images.unsplash.com/photo-1585674364415-1e8c8d7de44b?w=1920&q=80",
    description: {
      es: "Rumania fascina con la Transilvania de Dracula, castillos goticos entre montanas, pueblos sajones medievales y el delta del Danubio. Desde el Castillo de Bran hasta los monasterios pintados de Bucovina, descubre los Carpatos y su misterio.",
      en: "Romania fascinates with Dracula's Transylvania, Gothic castles among mountains, medieval Saxon villages, and the Danube Delta. From Bran Castle to Bucovina's painted monasteries, discover the Carpathians and their mystery."
    },
    highlights: {
      es: ["Castillo de Bran", "Transilvania", "Sighisoara medieval", "Bucovina monasterios", "Bucarest"],
      en: ["Bran Castle", "Transylvania", "Medieval Sighisoara", "Bucovina monasteries", "Bucharest"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80",
      "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80",
      "https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=800&q=80"
    ],
    packages: [
      { id: "romania-1", name: { es: "Transilvania Misteriosa", en: "Mysterious Transylvania" }, duration: { es: "8 dias", en: "8 days" }, price: "1,699", taxes: "320", includes: { es: ["Vuelos", "Hoteles 4*", "Transporte privado", "Desayunos"], en: ["Flights", "4* Hotels", "Private transport", "Breakfasts"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Bucarest", en: "Bucharest" }, description: { es: "Llegada a la capital rumana.", en: "Arrival in the Romanian capital." }, activities: { es: ["Traslado hotel", "Palacio Parlamento", "Casco antiguo"], en: ["Hotel transfer", "Parliament Palace", "Old Town"] } },
      { day: 2, title: { es: "Bucarest Historica", en: "Historic Bucharest" }, description: { es: "El pequeno Paris del Este.", en: "The Little Paris of the East." }, activities: { es: ["Ateneo Romano", "Museo Pueblo", "Lipscani"], en: ["Romanian Atheneum", "Village Museum", "Lipscani"] } },
      { day: 3, title: { es: "Sinaia", en: "Sinaia" }, description: { es: "La Perla de los Carpatos.", en: "The Pearl of the Carpathians." }, activities: { es: ["Castillo Peles", "Monasterio Sinaia", "Paisajes Carpatos"], en: ["Peles Castle", "Sinaia Monastery", "Carpathian landscapes"] } },
      { day: 4, title: { es: "Castillo de Bran", en: "Bran Castle" }, description: { es: "El legendario castillo de Dracula.", en: "The legendary Dracula castle." }, activities: { es: ["Castillo Bran", "Brasov", "Fortaleza Rasnov"], en: ["Bran Castle", "Brasov", "Rasnov Fortress"] } },
      { day: 5, title: { es: "Brasov", en: "Brasov" }, description: { es: "Ciudad medieval sajona en Transilvania.", en: "Saxon medieval city in Transylvania." }, activities: { es: ["Iglesia Negra", "Plaza Sfatului", "Tampa Montana"], en: ["Black Church", "Sfatului Square", "Tampa Mountain"] } },
      { day: 6, title: { es: "Sighisoara", en: "Sighisoara" }, description: { es: "Ciudad natal de Vlad Tepes.", en: "Birthplace of Vlad the Impaler." }, activities: { es: ["Ciudadela medieval", "Casa Dracula", "Torre Reloj"], en: ["Medieval citadel", "Dracula's House", "Clock Tower"] } },
      { day: 7, title: { es: "Sibiu", en: "Sibiu" }, description: { es: "Capital cultural de Transilvania.", en: "Cultural capital of Transylvania." }, activities: { es: ["Plaza Grande", "Museo Brukenthal", "Puente Mentiras"], en: ["Great Square", "Brukenthal Museum", "Bridge of Lies"] } },
      { day: 8, title: { es: "Regreso", en: "Return" }, description: { es: "Regreso a Bucarest y vuelo.", en: "Return to Bucharest and flight." }, activities: { es: ["Ruta panoramica", "Traslado aeropuerto", "Vuelo regreso"], en: ["Scenic route", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "El Castillo de Bran es de Dracula?", en: "Is Bran Castle Dracula's castle?" }, answer: { es: "Historicamente, Vlad Tepes no vivio alli. Pero la leyenda lo asocia al lugar por su arquitectura gotica.", en: "Historically, Vlad Tepes didn't live there. But legend associates it due to its Gothic architecture." } },
      { question: { es: "Es seguro viajar por Rumania?", en: "Is it safe to travel in Romania?" }, answer: { es: "Si, Rumania es un pais seguro con baja criminalidad. Las carreteras de montana requieren precaucion.", en: "Yes, Romania is a safe country with low crime. Mountain roads require caution." } }
    ],
    bestTimeToVisit: { es: "Mayo a Septiembre", en: "May to September" },
    currency: "RON",
    language: { es: "Rumano", en: "Romanian" },
    visaInfo: { es: "Espacio Schengen - verificar requisitos", en: "Schengen Area - check requirements" }
  },
  {
    slug: "sweden",
    name: { es: "Suecia", en: "Sweden" },
    heroImage: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1920&q=80",
    description: {
      es: "Suecia combina la sofisticacion de Estocolmo, extendida sobre 14 islas, con la naturaleza salvaje de Laponia. Diseno escandinavo, el hotel de hielo, auroras boreales y la herencia vikinga crean experiencias unicas en el reino nordico.",
      en: "Sweden combines Stockholm's sophistication, spread across 14 islands, with Lapland's wild nature. Scandinavian design, the ice hotel, Northern Lights, and Viking heritage create unique experiences in the Nordic kingdom."
    },
    highlights: {
      es: ["Estocolmo 14 islas", "Gamla Stan", "Museo Vasa", "Ice Hotel Laponia", "Archipelago"],
      en: ["Stockholm 14 islands", "Gamla Stan", "Vasa Museum", "Lapland Ice Hotel", "Archipelago"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1508189860359-777d945909ef?w=800&q=80",
      "https://images.unsplash.com/photo-1499002238440-d264b672be47?w=800&q=80",
      "https://images.unsplash.com/photo-1524230659092-07f99a75c013?w=800&q=80"
    ],
    packages: [
      { id: "sweden-1", name: { es: "Suecia Esencial", en: "Essential Sweden" }, duration: { es: "7 dias", en: "7 days" }, price: "2,599", taxes: "420", includes: { es: ["Vuelos", "Hoteles 4*", "Desayunos", "Stockholm Pass"], en: ["Flights", "4* Hotels", "Breakfasts", "Stockholm Pass"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Estocolmo", en: "Stockholm" }, description: { es: "Llegada a la Venecia del Norte.", en: "Arrival in the Venice of the North." }, activities: { es: ["Traslado hotel", "Gamla Stan", "Fika sueco"], en: ["Hotel transfer", "Gamla Stan", "Swedish fika"] } },
      { day: 2, title: { es: "Estocolmo Historica", en: "Historic Stockholm" }, description: { es: "Los iconos de la capital sueca.", en: "The Swedish capital's icons." }, activities: { es: ["Palacio Real", "Museo Nobel", "Catedral Storkyrkan"], en: ["Royal Palace", "Nobel Museum", "Storkyrkan Cathedral"] } },
      { day: 3, title: { es: "Museo Vasa", en: "Vasa Museum" }, description: { es: "El barco del siglo XVII mejor conservado.", en: "The best-preserved 17th-century ship." }, activities: { es: ["Museo Vasa", "Skansen", "Museo ABBA"], en: ["Vasa Museum", "Skansen", "ABBA Museum"] } },
      { day: 4, title: { es: "Archipielago", en: "Archipelago" }, description: { es: "Crucero por las 30,000 islas.", en: "Cruise through 30,000 islands." }, activities: { es: ["Crucero archipielago", "Isla Vaxholm", "Picnic sueco"], en: ["Archipelago cruise", "Vaxholm Island", "Swedish picnic"] } },
      { day: 5, title: { es: "Uppsala", en: "Uppsala" }, description: { es: "Ciudad universitaria con historia vikinga.", en: "University city with Viking history." }, activities: { es: ["Catedral Uppsala", "Universidad antigua", "Museo Gustavianum"], en: ["Uppsala Cathedral", "Ancient university", "Gustavianum Museum"] } },
      { day: 6, title: { es: "Sigtuna", en: "Sigtuna" }, description: { es: "La ciudad mas antigua de Suecia.", en: "Sweden's oldest city." }, activities: { es: ["Ruinas vikingas", "Runas piedras", "Pueblito encantador"], en: ["Viking ruins", "Rune stones", "Charming village"] } },
      { day: 7, title: { es: "Regreso", en: "Return" }, description: { es: "Ultimo paseo y vuelo de regreso.", en: "Last stroll and return flight." }, activities: { es: ["Compras diseno", "Traslado aeropuerto", "Vuelo regreso"], en: ["Design shopping", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Es muy cara Suecia?", en: "Is Sweden very expensive?" }, answer: { es: "Si, es uno de los paises mas caros de Europa. El Stockholm Pass ayuda a ahorrar.", en: "Yes, it's one of Europe's most expensive countries. The Stockholm Pass helps save money." } },
      { question: { es: "Que es fika?", en: "What is fika?" }, answer: { es: "Una tradicion sueca de tomar cafe con dulces y socializar. Es parte esencial de la cultura.", en: "A Swedish tradition of having coffee with sweets and socializing. It's an essential part of the culture." } }
    ],
    bestTimeToVisit: { es: "Mayo a Septiembre", en: "May to September" },
    currency: "SEK",
    language: { es: "Sueco", en: "Swedish" },
    visaInfo: { es: "Espacio Schengen - verificar requisitos", en: "Schengen Area - check requirements" }
  },
  {
    slug: "baltic-states",
    name: { es: "Estados Balticos", en: "Baltic States" },
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80",
    description: {
      es: "Los Estados Balticos - Estonia, Letonia y Lituania - sorprenden con ciudades medievales como Tallin, Riga y Vilna, todas patrimonio UNESCO. Castillos, bosques infinitos, la herencia hanseática y la cultura unica del Baltico esperan.",
      en: "The Baltic States - Estonia, Latvia, and Lithuania - surprise with medieval cities like Tallinn, Riga, and Vilnius, all UNESCO heritage. Castles, endless forests, Hanseatic heritage, and unique Baltic culture await."
    },
    highlights: {
      es: ["Tallin medieval", "Art Nouveau Riga", "Vilna barroca", "Colina Cruces", "Trakai castillo"],
      en: ["Medieval Tallinn", "Art Nouveau Riga", "Baroque Vilnius", "Hill of Crosses", "Trakai Castle"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1558618047-f4b511d8e9a4?w=800&q=80",
      "https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&q=80",
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&q=80"
    ],
    packages: [
      { id: "baltic-states-1", name: { es: "Capitales Balticas", en: "Baltic Capitals" }, duration: { es: "9 dias", en: "9 days" }, price: "1,999", taxes: "380", includes: { es: ["Vuelos", "Hoteles 4*", "Transporte entre paises", "Desayunos"], en: ["Flights", "4* Hotels", "Inter-country transport", "Breakfasts"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Vilna", en: "Vilnius" }, description: { es: "Llegada a la capital lituana.", en: "Arrival in the Lithuanian capital." }, activities: { es: ["Traslado hotel", "Catedral Vilna", "Ciudad Vieja"], en: ["Hotel transfer", "Vilnius Cathedral", "Old Town"] } },
      { day: 2, title: { es: "Vilna Barroca", en: "Baroque Vilnius" }, description: { es: "El barroco mejor conservado de Europa.", en: "Europe's best-preserved Baroque." }, activities: { es: ["Puerta Aurora", "Republica Uzupis", "Torre Gediminas"], en: ["Gate of Dawn", "Uzupis Republic", "Gediminas Tower"] } },
      { day: 3, title: { es: "Trakai", en: "Trakai" }, description: { es: "El castillo del lago, icono de Lituania.", en: "The lake castle, Lithuania's icon." }, activities: { es: ["Castillo Trakai", "Lagos Galve", "Cocina karaim"], en: ["Trakai Castle", "Galve Lakes", "Karaim cuisine"] } },
      { day: 4, title: { es: "Colina de las Cruces", en: "Hill of Crosses" }, description: { es: "Lugar de peregrinacion unico en el mundo.", en: "Unique pilgrimage site in the world." }, activities: { es: ["Colina Cruces", "Ruta a Riga", "Palacio Rundale"], en: ["Hill of Crosses", "Route to Riga", "Rundale Palace"] } },
      { day: 5, title: { es: "Riga", en: "Riga" }, description: { es: "La capital Art Nouveau de Europa.", en: "Europe's Art Nouveau capital." }, activities: { es: ["Ciudad Vieja Riga", "Barrio Art Nouveau", "Mercado Central"], en: ["Riga Old Town", "Art Nouveau District", "Central Market"] } },
      { day: 6, title: { es: "Riga Cultural", en: "Cultural Riga" }, description: { es: "Museos y arquitectura letona.", en: "Latvian museums and architecture." }, activities: { es: ["Casa Blackheads", "Catedral Riga", "Opera Nacional"], en: ["House of Blackheads", "Riga Cathedral", "National Opera"] } },
      { day: 7, title: { es: "Ruta a Tallin", en: "Route to Tallinn" }, description: { es: "Viaje por la costa baltica.", en: "Journey along the Baltic coast." }, activities: { es: ["Parnu playa", "Ruta costera", "Llegada Tallin"], en: ["Parnu beach", "Coastal route", "Tallinn arrival"] } },
      { day: 8, title: { es: "Tallin Medieval", en: "Medieval Tallinn" }, description: { es: "La ciudad medieval mejor conservada de Europa.", en: "Europe's best-preserved medieval city." }, activities: { es: ["Toompea", "Plaza Ayuntamiento", "Murallas ciudad"], en: ["Toompea", "Town Hall Square", "City walls"] } },
      { day: 9, title: { es: "Regreso", en: "Return" }, description: { es: "Vuelo de regreso desde Tallin.", en: "Return flight from Tallinn." }, activities: { es: ["Tiempo libre", "Traslado aeropuerto", "Vuelo regreso"], en: ["Free time", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Se puede recorrer los 3 paises facilmente?", en: "Can you tour all 3 countries easily?" }, answer: { es: "Si, hay excelentes conexiones de autobus y las distancias son cortas. Vilna-Riga 4h, Riga-Tallin 4h.", en: "Yes, there are excellent bus connections and distances are short. Vilnius-Riga 4h, Riga-Tallinn 4h." } },
      { question: { es: "Cual es la mejor epoca para visitar?", en: "When is the best time to visit?" }, answer: { es: "Mayo a septiembre. Los inviernos son muy frios pero los mercados navidenos son encantadores.", en: "May to September. Winters are very cold but Christmas markets are charming." } }
    ],
    bestTimeToVisit: { es: "Mayo a Septiembre", en: "May to September" },
    currency: "EUR",
    language: { es: "Lituano/Leton/Estonio", en: "Lithuanian/Latvian/Estonian" },
    visaInfo: { es: "Espacio Schengen - verificar requisitos", en: "Schengen Area - check requirements" }
  },
  {
    slug: "cyprus",
    name: { es: "Chipre", en: "Cyprus" },
    heroImage: "https://images.unsplash.com/photo-1586768337645-81c3e6c6eb04?w=1920&q=80",
    description: {
      es: "Chipre, la isla de Afrodita, combina playas mediterraneas cristalinas, ruinas grecorromanas, montanas Troodos con monasterios bizantinos y pueblos tradicionales. La tercera isla mas grande del Mediterraneo ofrece historia de 10,000 anos y hospitalidad chipriota.",
      en: "Cyprus, the island of Aphrodite, combines crystal Mediterranean beaches, Greco-Roman ruins, Troodos mountains with Byzantine monasteries, and traditional villages. The third-largest Mediterranean island offers 10,000 years of history and Cypriot hospitality."
    },
    highlights: {
      es: ["Playas Ayia Napa", "Ruinas Pafos", "Montanas Troodos", "Nicosia dividida", "Roca Afrodita"],
      en: ["Ayia Napa beaches", "Paphos ruins", "Troodos Mountains", "Divided Nicosia", "Aphrodite's Rock"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1605217613332-4c9e8a02f3b6?w=800&q=80",
      "https://images.unsplash.com/photo-1558459654-c430be5b0def?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
    ],
    packages: [
      { id: "cyprus-1", name: { es: "Chipre Esencial", en: "Essential Cyprus" }, duration: { es: "7 dias", en: "7 days" }, price: "1,899", taxes: "360", includes: { es: ["Vuelos", "Hoteles 4*", "Coche alquiler", "Desayunos"], en: ["Flights", "4* Hotels", "Rental car", "Breakfasts"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Larnaca", en: "Larnaca" }, description: { es: "Llegada a Chipre.", en: "Arrival in Cyprus." }, activities: { es: ["Traslado hotel", "Paseo maritimo", "Iglesia San Lazaro"], en: ["Hotel transfer", "Seafront promenade", "St. Lazarus Church"] } },
      { day: 2, title: { es: "Pafos", en: "Paphos" }, description: { es: "Patrimonio UNESCO y mitologia.", en: "UNESCO heritage and mythology." }, activities: { es: ["Mosaicos romanos", "Tumbas Reyes", "Puerto pesquero"], en: ["Roman mosaics", "Tombs of the Kings", "Fishing harbor"] } },
      { day: 3, title: { es: "Roca Afrodita", en: "Aphrodite's Rock" }, description: { es: "Donde nacio la diosa del amor.", en: "Where the goddess of love was born." }, activities: { es: ["Petra tou Romiou", "Banos Afrodita", "Akamas peninsula"], en: ["Petra tou Romiou", "Aphrodite's Baths", "Akamas Peninsula"] } },
      { day: 4, title: { es: "Montanas Troodos", en: "Troodos Mountains" }, description: { es: "Monasterios bizantinos y pueblos tradicionales.", en: "Byzantine monasteries and traditional villages." }, activities: { es: ["Monasterio Kykkos", "Pueblos vinedos", "Monte Olimpo"], en: ["Kykkos Monastery", "Wine villages", "Mount Olympus"] } },
      { day: 5, title: { es: "Nicosia", en: "Nicosia" }, description: { es: "La ultima capital dividida del mundo.", en: "The world's last divided capital." }, activities: { es: ["Murallas venecianas", "Ledra Street", "Norte Nicosia"], en: ["Venetian walls", "Ledra Street", "North Nicosia"] } },
      { day: 6, title: { es: "Ayia Napa", en: "Ayia Napa" }, description: { es: "Las mejores playas del Mediterraneo.", en: "The best Mediterranean beaches." }, activities: { es: ["Playa Nissi", "Cuevas marinas", "Cabo Greco"], en: ["Nissi Beach", "Sea caves", "Cape Greco"] } },
      { day: 7, title: { es: "Regreso", en: "Return" }, description: { es: "Vuelo de regreso.", en: "Return flight." }, activities: { es: ["Tiempo libre", "Traslado aeropuerto", "Vuelo regreso"], en: ["Free time", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Se puede cruzar al norte de Chipre?", en: "Can you cross to northern Cyprus?" }, answer: { es: "Si, se puede cruzar en Nicosia con pasaporte. Es territorio de la Republica Turca del Norte.", en: "Yes, you can cross in Nicosia with a passport. It's Turkish Republic of Northern Cyprus territory." } },
      { question: { es: "Cual es el mejor momento para visitar?", en: "When is the best time to visit?" }, answer: { es: "Abril-mayo y septiembre-octubre para clima ideal. Verano es muy caluroso.", en: "April-May and September-October for ideal weather. Summer is very hot." } }
    ],
    bestTimeToVisit: { es: "Abril a Octubre", en: "April to October" },
    currency: "EUR",
    language: { es: "Griego/Turco", en: "Greek/Turkish" },
    visaInfo: { es: "Union Europea - verificar requisitos", en: "European Union - check requirements" }
  },
  {
    slug: "scotland",
    name: { es: "Escocia", en: "Scotland" },
    heroImage: "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?w=1920&q=80",
    description: {
      es: "Escocia cautiva con las Highlands salvajes, castillos legendarios, lochs misteriosos como el Ness, Edimburgo medieval y la tradicion del whisky. Gaitas, tartanes y paisajes dramaticos crean una experiencia unica en el norte de Gran Bretana.",
      en: "Scotland captivates with wild Highlands, legendary castles, mysterious lochs like Ness, medieval Edinburgh, and whisky tradition. Bagpipes, tartans, and dramatic landscapes create a unique experience in northern Britain."
    },
    highlights: {
      es: ["Edimburgo medieval", "Highlands escocesas", "Lago Ness", "Castillos legendarios", "Destilerias whisky"],
      en: ["Medieval Edinburgh", "Scottish Highlands", "Loch Ness", "Legendary castles", "Whisky distilleries"]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800&q=80",
      "https://images.unsplash.com/photo-1562008564-6c7a6f89b7ff?w=800&q=80",
      "https://images.unsplash.com/photo-1591622180684-9f9e8e6a0e3a?w=800&q=80"
    ],
    packages: [
      { id: "scotland-1", name: { es: "Escocia Magica", en: "Magical Scotland" }, duration: { es: "8 dias", en: "8 days" }, price: "2,399", taxes: "400", includes: { es: ["Vuelos", "Hoteles 4*", "Transporte privado", "Desayuno escoces"], en: ["Flights", "4* Hotels", "Private transport", "Scottish breakfast"] } }
    ],
    itinerary: [
      { day: 1, title: { es: "Edimburgo", en: "Edinburgh" }, description: { es: "Llegada a la capital escocesa.", en: "Arrival in the Scottish capital." }, activities: { es: ["Traslado hotel", "Royal Mile", "Pub tradicional"], en: ["Hotel transfer", "Royal Mile", "Traditional pub"] } },
      { day: 2, title: { es: "Edimburgo Historica", en: "Historic Edinburgh" }, description: { es: "El castillo y la Ciudad Vieja.", en: "The castle and Old Town." }, activities: { es: ["Castillo Edimburgo", "Holyrood Palace", "Arthur's Seat"], en: ["Edinburgh Castle", "Holyrood Palace", "Arthur's Seat"] } },
      { day: 3, title: { es: "Stirling y Trossachs", en: "Stirling and Trossachs" }, description: { es: "Historia de William Wallace y naturaleza.", en: "William Wallace history and nature." }, activities: { es: ["Castillo Stirling", "Monumento Wallace", "Loch Lomond"], en: ["Stirling Castle", "Wallace Monument", "Loch Lomond"] } },
      { day: 4, title: { es: "Highlands", en: "Highlands" }, description: { es: "Los paisajes mas dramaticos de Escocia.", en: "Scotland's most dramatic landscapes." }, activities: { es: ["Glencoe", "Fort William", "Ben Nevis"], en: ["Glencoe", "Fort William", "Ben Nevis"] } },
      { day: 5, title: { es: "Lago Ness", en: "Loch Ness" }, description: { es: "El lago mas misterioso del mundo.", en: "The world's most mysterious lake." }, activities: { es: ["Castillo Urquhart", "Crucero Loch Ness", "Inverness"], en: ["Urquhart Castle", "Loch Ness cruise", "Inverness"] } },
      { day: 6, title: { es: "Whisky Trail", en: "Whisky Trail" }, description: { es: "La ruta del whisky escoces.", en: "The Scottish whisky trail." }, activities: { es: ["Destileria Glenfiddich", "Speyside", "Cata whisky"], en: ["Glenfiddich Distillery", "Speyside", "Whisky tasting"] } },
      { day: 7, title: { es: "St Andrews", en: "St Andrews" }, description: { es: "La cuna del golf y universidad historica.", en: "The birthplace of golf and historic university." }, activities: { es: ["Old Course", "Ruinas catedral", "Universidad"], en: ["Old Course", "Cathedral ruins", "University"] } },
      { day: 8, title: { es: "Regreso", en: "Return" }, description: { es: "Vuelo de regreso desde Edimburgo.", en: "Return flight from Edinburgh." }, activities: { es: ["Tiempo libre", "Traslado aeropuerto", "Vuelo regreso"], en: ["Free time", "Airport transfer", "Return flight"] } }
    ],
    faqs: [
      { question: { es: "Existe el monstruo del Lago Ness?", en: "Does the Loch Ness Monster exist?" }, answer: { es: "El misterio continua! Nunca se ha comprobado, pero el lago tiene profundidades de 230 metros.", en: "The mystery continues! Never proven, but the lake has depths of 230 meters." } },
      { question: { es: "Se necesita visa diferente a Inglaterra?", en: "Is a different visa needed than England?" }, answer: { es: "No, Escocia es parte del Reino Unido. Los mismos requisitos de visa aplican.", en: "No, Scotland is part of the UK. The same visa requirements apply." } }
    ],
    bestTimeToVisit: { es: "Mayo a Septiembre", en: "May to September" },
    currency: "GBP",
    language: { es: "Ingles/Gaelico escoces", en: "English/Scottish Gaelic" },
    visaInfo: { es: "Mismos requisitos que Reino Unido", en: "Same requirements as UK" }
  }
];

export function getDestinationBySlug(slug: string): DestinationData | undefined {
  return DESTINATIONS_DATA.find(d => d.slug.toLowerCase() === slug.toLowerCase());
}
