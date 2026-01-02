export interface ItineraryDay {
  day: number;
  title: { es: string; en: string };
  description: { es: string; en: string };
  activities: { es: string[]; en: string[] };
}

export interface CategorizedItinerary {
  id: string;
  name: { es: string; en: string };
  description: { es: string; en: string };
  days: ItineraryDay[];
}

export interface ItinerariesByCategory {
  bySeason: CategorizedItinerary[];
  byInterest: CategorizedItinerary[];
  byGroup: CategorizedItinerary[];
}

export interface DestinationPackage {
  id: string;
  name: { es: string; en: string };
  duration: { es: string; en: string };
  price: string;
  taxes: string;
  includes: { es: string[]; en: string[] };
}

export interface DestinationFAQ {
  question: { es: string; en: string };
  answer: { es: string; en: string };
}

export interface DestinationData {
  slug: string;
  name: { es: string; en: string };
  heroImage: string;
  galleryImages: string[];
  description: { es: string; en: string };
  highlights: { es: string[]; en: string[] };
  packages: DestinationPackage[];
  itinerary: ItineraryDay[];
  categorizedItineraries?: ItinerariesByCategory;
  faqs: DestinationFAQ[];
  bestTimeToVisit: { es: string; en: string };
  currency: string;
  language: { es: string; en: string };
  visaInfo: { es: string; en: string };
}

export const DESTINATIONS_DATA: DestinationData[] = [
  {
    slug: "francia",
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
    slug: "italia",
    name: { es: "Italia", en: "Italy" },
    heroImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534445867742-43195f401b6c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529154036614-a60975f5c36f?q=80&w=800&auto=format&fit=crop"
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
    slug: "españa",
    name: { es: "Espana", en: "Spain" },
    heroImage: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558370781-d6196949e317?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop"
    ],
    description: {
      es: "Espana es un pais vibrante que combina historia, cultura, gastronomia y vida nocturna como ningun otro. Desde la arquitectura de Gaudi en Barcelona hasta el flamenco apasionado de Sevilla, pasando por los museos de Madrid y las playas de la Costa del Sol, Espana ofrece experiencias inolvidables. Disfruta de tapas, sangria, y la calidez de su gente en uno de los destinos favoritos de los viajeros latinoamericanos.",
      en: "Spain is a vibrant country that combines history, culture, gastronomy, and nightlife like no other. From Gaudi's architecture in Barcelona to the passionate flamenco of Seville, through Madrid's museums and Costa del Sol beaches, Spain offers unforgettable experiences. Enjoy tapas, sangria, and the warmth of its people in one of Latin American travelers' favorite destinations."
    },
    highlights: {
      es: ["Sagrada Familia en Barcelona", "Alhambra de Granada", "Museo del Prado en Madrid", "Flamenco en Sevilla", "Playas de la Costa Brava", "San Sebastian y su gastronomia"],
      en: ["Sagrada Familia in Barcelona", "Alhambra of Granada", "Prado Museum in Madrid", "Flamenco in Seville", "Costa Brava beaches", "San Sebastian gastronomy"]
    },
    packages: [
      {
        id: "espana-clasica",
        name: { es: "Espana Clasica", en: "Classic Spain" },
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
        description: { es: "Bienvenida en Madrid, la vibrante capital de Espana.", en: "Welcome to Madrid, Spain's vibrant capital." },
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
        answer: { es: "Los ciudadanos de la mayoria de paises latinoamericanos pueden ingresar a Espana sin visa por hasta 90 dias para turismo.", en: "Citizens of most Latin American countries can enter Spain without a visa for up to 90 days for tourism." }
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
        answer: { es: "Espana es famosa por sus tapas, paella, jamon iberico, y vinos. Cada region tiene sus especialidades.", en: "Spain is famous for tapas, paella, Iberian ham, and wines. Each region has its specialties." }
      }
    ],
    bestTimeToVisit: { es: "Marzo a Junio y Septiembre a Noviembre", en: "March to June and September to November" },
    currency: "EUR",
    language: { es: "Espanol", en: "Spanish" },
    visaInfo: { es: "No requiere visa para estancias hasta 90 dias", en: "No visa required for stays up to 90 days" }
  },
  {
    slug: "alemania",
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
    slug: "grecia",
    name: { es: "Grecia", en: "Greece" },
    heroImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559070101-e5a2a18da88e?q=80&w=800&auto=format&fit=crop"
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
    slug: "paises bajos",
    name: { es: "Paises Bajos", en: "Netherlands" },
    heroImage: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584003564911-a7dee2f083e5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558551649-e44c8f992010?q=80&w=800&auto=format&fit=crop"
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
    slug: "suiza",
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
    slug: "croacia",
    name: { es: "Croacia", en: "Croatia" },
    heroImage: "https://images.unsplash.com/photo-1555990793-da11153b2473?q=80&w=1920&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1565711561500-49678a10a63f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592156328757-50c0453e46f5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558697698-0d54a56c6b89?q=80&w=800&auto=format&fit=crop"
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
    slug: "reino unido",
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
  }
];

export function getDestinationBySlug(slug: string): DestinationData | undefined {
  return DESTINATIONS_DATA.find(d => d.slug.toLowerCase() === slug.toLowerCase());
}
