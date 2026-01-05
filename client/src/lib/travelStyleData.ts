export interface TravelStylePackage {
  id: string;
  name: { es: string; en: string };
  destination: string;
  duration: { es: string; en: string };
  price: number;
  image: string;
  highlights: { es: string[]; en: string[] };
}

export interface TravelStyleItinerary {
  day: number;
  title: { es: string; en: string };
  description: { es: string; en: string };
}

export interface TravelStyleFAQ {
  question: { es: string; en: string };
  answer: { es: string; en: string };
}

export interface TravelStyleData {
  slug: string;
  category: "season" | "interest" | "group";
  name: { es: string; en: string };
  heroImage: string;
  description: { es: string; en: string };
  highlights: { es: string[]; en: string[] };
  packages: TravelStylePackage[];
  sampleItinerary: TravelStyleItinerary[];
  faqs: TravelStyleFAQ[];
  bestFor: { es: string; en: string };
  idealDuration: { es: string; en: string };
}

export const TRAVEL_STYLE_DATA: TravelStyleData[] = [
  {
    slug: "fall",
    category: "season",
    name: { es: "Viajes de Otono", en: "Fall Trips" },
    heroImage: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Descubre Europa en su momento mas magico. El otono transforma el continente con colores dorados, festivales de la cosecha y temperaturas perfectas para explorar. Desde los vinedos de la Toscana hasta los castillos de Alemania, vive una experiencia unica.",
      en: "Discover Europe at its most magical moment. Fall transforms the continent with golden colors, harvest festivals, and perfect temperatures for exploration. From the vineyards of Tuscany to the castles of Germany, experience something unique."
    },
    highlights: {
      es: ["Festivales de vendimia en Francia e Italia", "Colores otonales en los Alpes", "Menos turistas y mejores precios", "Gastronomia de temporada"],
      en: ["Wine harvest festivals in France and Italy", "Autumn colors in the Alps", "Fewer tourists and better prices", "Seasonal gastronomy"]
    },
    packages: [
      { id: "fall-1", name: { es: "Vendimia en Borgona", en: "Burgundy Wine Harvest" }, destination: "France", duration: { es: "8 dias", en: "8 days" }, price: 2890, image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop", highlights: { es: ["Degustacion de vinos", "Recorrido por vinedos", "Gastronomia gourmet"], en: ["Wine tasting", "Vineyard tours", "Gourmet gastronomy"] } },
      { id: "fall-2", name: { es: "Otono en la Toscana", en: "Tuscan Autumn" }, destination: "Italy", duration: { es: "10 dias", en: "10 days" }, price: 3450, image: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?q=80&w=800&auto=format&fit=crop", highlights: { es: ["Colinas toscanas", "Trufa blanca", "Pueblos medievales"], en: ["Tuscan hills", "White truffle", "Medieval villages"] } },
      { id: "fall-3", name: { es: "Castillos de Baviera", en: "Bavarian Castles" }, destination: "Germany", duration: { es: "7 dias", en: "7 days" }, price: 2650, image: "https://images.unsplash.com/photo-1534313314376-a72289b6181e?q=80&w=800&auto=format&fit=crop", highlights: { es: ["Neuschwanstein", "Oktoberfest", "Bosques dorados"], en: ["Neuschwanstein", "Oktoberfest", "Golden forests"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada y bienvenida", en: "Arrival and welcome" }, description: { es: "Llegada al destino, traslado al hotel y cena de bienvenida con vinos de la region.", en: "Arrival at destination, transfer to hotel, and welcome dinner with regional wines." } },
      { day: 2, title: { es: "Exploracion de vinedos", en: "Vineyard exploration" }, description: { es: "Visita guiada a vinedos historicos con degustacion y almuerzo campestre.", en: "Guided visit to historic vineyards with tasting and countryside lunch." } },
      { day: 3, title: { es: "Pueblos con encanto", en: "Charming villages" }, description: { es: "Recorrido por pueblos medievales con mercados de productos locales de otono.", en: "Tour of medieval villages with markets featuring local autumn products." } },
      { day: 4, title: { es: "Experiencia gastronomica", en: "Gastronomic experience" }, description: { es: "Clase de cocina con productos de temporada y cena en restaurante con estrella.", en: "Cooking class with seasonal products and dinner at starred restaurant." } },
      { day: 5, title: { es: "Naturaleza y senderismo", en: "Nature and hiking" }, description: { es: "Caminata por bosques con colores otonales y picnic gourmet.", en: "Walk through forests with autumn colors and gourmet picnic." } }
    ],
    faqs: [
      { question: { es: "Cual es la mejor epoca del otono para viajar?", en: "What's the best time in fall to travel?" }, answer: { es: "Septiembre y octubre ofrecen el mejor clima y los colores mas vibrantes. Noviembre es ideal para festivales gastronomicos.", en: "September and October offer the best weather and most vibrant colors. November is ideal for gastronomic festivals." } },
      { question: { es: "Que ropa debo llevar?", en: "What clothing should I bring?" }, answer: { es: "Recomendamos capas: chaqueta ligera, sueter, y ropa comoda para caminar. Las temperaturas varian entre 10-20 grados.", en: "We recommend layers: light jacket, sweater, and comfortable walking clothes. Temperatures range from 10-20 degrees." } },
      { question: { es: "Los tours incluyen transporte?", en: "Do tours include transportation?" }, answer: { es: "Si, todos nuestros paquetes incluyen traslados aeropuerto-hotel y transporte durante las excursiones.", en: "Yes, all our packages include airport-hotel transfers and transportation during excursions." } }
    ],
    bestFor: { es: "Amantes del vino, gastronomia y fotografia", en: "Wine lovers, gastronomy and photography enthusiasts" },
    idealDuration: { es: "7-10 dias", en: "7-10 days" }
  },
  {
    slug: "summer",
    category: "season",
    name: { es: "Viajes de Verano", en: "Summer Trips" },
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "El verano europeo ofrece dias largos, playas cristalinas y festivales al aire libre. Desde la Costa Amalfitana hasta las islas griegas, disfruta del sol mediterraneo en su maximo esplendor.",
      en: "European summer offers long days, crystal-clear beaches, and outdoor festivals. From the Amalfi Coast to the Greek islands, enjoy the Mediterranean sun at its finest."
    },
    highlights: {
      es: ["Playas del Mediterraneo", "Festivales de musica", "Dias largos de sol", "Vida nocturna vibrante"],
      en: ["Mediterranean beaches", "Music festivals", "Long sunny days", "Vibrant nightlife"]
    },
    packages: [
      { id: "sum-1", name: { es: "Islas Griegas", en: "Greek Islands" }, destination: "Greece", duration: { es: "12 dias", en: "12 days" }, price: 3890, image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800", highlights: { es: ["Santorini", "Mykonos", "Creta"], en: ["Santorini", "Mykonos", "Crete"] } },
      { id: "sum-2", name: { es: "Costa Amalfitana", en: "Amalfi Coast" }, destination: "Italy", duration: { es: "9 dias", en: "9 days" }, price: 3250, image: "https://images.unsplash.com/photo-1534008757030-27299c4371b6?q=80&w=800", highlights: { es: ["Positano", "Capri", "Ravello"], en: ["Positano", "Capri", "Ravello"] } },
      { id: "sum-3", name: { es: "Riviera Francesa", en: "French Riviera" }, destination: "France", duration: { es: "8 dias", en: "8 days" }, price: 3450, image: "https://images.unsplash.com/photo-1488866022504-f2584929ca5f?q=80&w=800", highlights: { es: ["Nice", "Monaco", "Cannes"], en: ["Nice", "Monaco", "Cannes"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada al paraiso", en: "Arrival in paradise" }, description: { es: "Llegada y traslado al resort frente al mar. Coctel de bienvenida al atardecer.", en: "Arrival and transfer to beachfront resort. Welcome cocktail at sunset." } },
      { day: 2, title: { es: "Playas y relax", en: "Beaches and relaxation" }, description: { es: "Dia libre para disfrutar de las playas cristalinas y actividades acuaticas.", en: "Free day to enjoy crystal-clear beaches and water activities." } },
      { day: 3, title: { es: "Excursion en barco", en: "Boat excursion" }, description: { es: "Navegacion por la costa con paradas para nadar en calas secretas.", en: "Coastal sailing with stops for swimming in secret coves." } }
    ],
    faqs: [
      { question: { es: "Cual es la temperatura en verano?", en: "What's the temperature in summer?" }, answer: { es: "Las temperaturas oscilan entre 25-35 grados. Recomendamos proteccion solar y ropa ligera.", en: "Temperatures range from 25-35 degrees. We recommend sun protection and light clothing." } },
      { question: { es: "Hay mucha gente en verano?", en: "Is it crowded in summer?" }, answer: { es: "Es temporada alta, pero nuestros itinerarios incluyen acceso prioritario y horarios estrategicos.", en: "It's peak season, but our itineraries include priority access and strategic schedules." } }
    ],
    bestFor: { es: "Amantes de la playa, sol y vida social", en: "Beach lovers, sun and social life enthusiasts" },
    idealDuration: { es: "8-14 dias", en: "8-14 days" }
  },
  {
    slug: "spring",
    category: "season",
    name: { es: "Viajes de Primavera", en: "Spring Trips" },
    heroImage: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "La primavera despierta Europa con flores, jardines en flor y temperaturas ideales. Desde los tulipanes de Holanda hasta los cerezos de Paris, vive el renacer del continente.",
      en: "Spring awakens Europe with flowers, blooming gardens, and ideal temperatures. From Holland's tulips to Paris's cherry blossoms, experience the continent's rebirth."
    },
    highlights: {
      es: ["Campos de tulipanes", "Jardines en flor", "Clima perfecto", "Menos multitudes"],
      en: ["Tulip fields", "Blooming gardens", "Perfect weather", "Fewer crowds"]
    },
    packages: [
      { id: "spr-1", name: { es: "Tulipanes de Holanda", en: "Holland Tulips" }, destination: "Netherlands", duration: { es: "6 dias", en: "6 days" }, price: 2290, image: "https://images.unsplash.com/photo-1589994160839-163cd867cfe8?q=80&w=800", highlights: { es: ["Keukenhof", "Amsterdam", "Molinos"], en: ["Keukenhof", "Amsterdam", "Windmills"] } },
      { id: "spr-2", name: { es: "Paris en Flor", en: "Paris in Bloom" }, destination: "France", duration: { es: "7 dias", en: "7 days" }, price: 2650, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800", highlights: { es: ["Jardines de Monet", "Versalles", "Cerezos"], en: ["Monet's Gardens", "Versailles", "Cherry blossoms"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada primaveral", en: "Spring arrival" }, description: { es: "Llegada y paseo por parques florecidos de la ciudad.", en: "Arrival and stroll through the city's blooming parks." } },
      { day: 2, title: { es: "Jardines botanicos", en: "Botanical gardens" }, description: { es: "Visita a los jardines mas famosos en su momento de mayor esplendor.", en: "Visit to the most famous gardens at their peak splendor." } }
    ],
    faqs: [
      { question: { es: "Cuando es la mejor fecha para ver tulipanes?", en: "When is the best time to see tulips?" }, answer: { es: "Mediados de abril es el momento optimo para ver los campos de tulipanes en plena floracion.", en: "Mid-April is the optimal time to see tulip fields in full bloom." } }
    ],
    bestFor: { es: "Amantes de la naturaleza y fotografia", en: "Nature and photography lovers" },
    idealDuration: { es: "5-8 dias", en: "5-8 days" }
  },
  {
    slug: "easter",
    category: "season",
    name: { es: "Semana Santa en Europa", en: "Easter in Europe" },
    heroImage: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Vive la Semana Santa con tradiciones centenarias en Espana, Italia y mas. Procesiones, gastronomia especial y una atmosfera unica de espiritualidad y celebracion.",
      en: "Experience Easter with centuries-old traditions in Spain, Italy, and beyond. Processions, special gastronomy, and a unique atmosphere of spirituality and celebration."
    },
    highlights: {
      es: ["Procesiones tradicionales", "Gastronomia de Pascua", "Celebraciones religiosas", "Cultura local autentica"],
      en: ["Traditional processions", "Easter gastronomy", "Religious celebrations", "Authentic local culture"]
    },
    packages: [
      { id: "eas-1", name: { es: "Semana Santa Sevillana", en: "Seville Holy Week" }, destination: "Spain", duration: { es: "8 dias", en: "8 days" }, price: 2890, image: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=800", highlights: { es: ["Procesiones", "Flamenco", "Tapas"], en: ["Processions", "Flamenco", "Tapas"] } },
      { id: "eas-2", name: { es: "Roma Eterna", en: "Eternal Rome" }, destination: "Italy", duration: { es: "7 dias", en: "7 days" }, price: 2750, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800", highlights: { es: ["Vaticano", "Misa Papal", "Coliseo"], en: ["Vatican", "Papal Mass", "Colosseum"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada y ambientacion", en: "Arrival and setting" }, description: { es: "Llegada y primer contacto con las preparaciones de Semana Santa.", en: "Arrival and first contact with Holy Week preparations." } },
      { day: 2, title: { es: "Procesiones del Domingo de Ramos", en: "Palm Sunday processions" }, description: { es: "Asistencia a las procesiones inaugurales con guia local.", en: "Attendance at inaugural processions with local guide." } }
    ],
    faqs: [
      { question: { es: "Necesito reservar con anticipacion?", en: "Do I need to book in advance?" }, answer: { es: "Si, Semana Santa es muy popular. Recomendamos reservar con 3-4 meses de anticipacion.", en: "Yes, Easter is very popular. We recommend booking 3-4 months in advance." } }
    ],
    bestFor: { es: "Viajeros culturales y espirituales", en: "Cultural and spiritual travelers" },
    idealDuration: { es: "6-9 dias", en: "6-9 days" }
  },
  {
    slug: "winter",
    category: "season",
    name: { es: "Viajes de Invierno", en: "Winter Trips" },
    heroImage: "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "El invierno europeo ofrece esqui en los Alpes, auroras boreales en Escandinavia y ciudades magicas cubiertas de nieve. Una experiencia invernal inolvidable.",
      en: "European winter offers skiing in the Alps, northern lights in Scandinavia, and magical snow-covered cities. An unforgettable winter experience."
    },
    highlights: {
      es: ["Esqui en los Alpes", "Auroras boreales", "Ciudades nevadas", "Mercados navidenos"],
      en: ["Alpine skiing", "Northern lights", "Snowy cities", "Christmas markets"]
    },
    packages: [
      { id: "win-1", name: { es: "Esqui en Suiza", en: "Swiss Skiing" }, destination: "Switzerland", duration: { es: "8 dias", en: "8 days" }, price: 4290, image: "https://images.unsplash.com/photo-1520962922320-2038eebab146?q=80&w=800", highlights: { es: ["Zermatt", "Clases de esqui", "Spa alpino"], en: ["Zermatt", "Ski lessons", "Alpine spa"] } },
      { id: "win-2", name: { es: "Auroras en Laponia", en: "Lapland Auroras" }, destination: "Finland", duration: { es: "6 dias", en: "6 days" }, price: 3890, image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800", highlights: { es: ["Auroras boreales", "Huskies", "Iglus de cristal"], en: ["Northern lights", "Huskies", "Glass igloos"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada invernal", en: "Winter arrival" }, description: { es: "Llegada y acomodacion en chalet alpino con chimenea.", en: "Arrival and accommodation in alpine chalet with fireplace." } },
      { day: 2, title: { es: "Dia en las pistas", en: "Day on the slopes" }, description: { es: "Esqui o snowboard con instructor privado opcional.", en: "Skiing or snowboarding with optional private instructor." } }
    ],
    faqs: [
      { question: { es: "Que nivel de esqui necesito?", en: "What ski level do I need?" }, answer: { es: "Tenemos paquetes para todos los niveles, desde principiantes hasta expertos.", en: "We have packages for all levels, from beginners to experts." } }
    ],
    bestFor: { es: "Amantes del esqui y deportes de invierno", en: "Skiing and winter sports enthusiasts" },
    idealDuration: { es: "6-10 dias", en: "6-10 days" }
  },
  {
    slug: "christmas",
    category: "season",
    name: { es: "Navidad en Europa", en: "Christmas in Europe" },
    heroImage: "https://images.unsplash.com/photo-1512389142860-9c449e58a814?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Vive la magia navidena en los mercados mas encantadores de Europa. Desde Viena hasta Estrasburgo, descubre tradiciones, artesanias y sabores festivos.",
      en: "Experience the magic of Christmas in Europe's most charming markets. From Vienna to Strasbourg, discover traditions, crafts, and festive flavors."
    },
    highlights: {
      es: ["Mercados navidenos", "Luces festivas", "Gastronomia tipica", "Tradiciones locales"],
      en: ["Christmas markets", "Festive lights", "Traditional cuisine", "Local traditions"]
    },
    packages: [
      { id: "chr-1", name: { es: "Mercados de Alemania", en: "German Christmas Markets" }, destination: "Germany", duration: { es: "9 dias", en: "9 days" }, price: 2990, image: "/assets/stock_images/christmas_market_ger_17f23500.jpg", highlights: { es: ["Nuremberg", "Colonia", "Dresde"], en: ["Nuremberg", "Cologne", "Dresden"] } },
      { id: "chr-2", name: { es: "Navidad en Viena", en: "Vienna Christmas" }, destination: "Austria", duration: { es: "6 dias", en: "6 days" }, price: 2650, image: "/assets/stock_images/christmas_bar_europe_48a50965.jpg", highlights: { es: ["Opera", "Mercados", "Conciertos"], en: ["Opera", "Markets", "Concerts"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada navidena", en: "Christmas arrival" }, description: { es: "Llegada y paseo por los mercados navidenos iluminados.", en: "Arrival and stroll through illuminated Christmas markets." } }
    ],
    faqs: [
      { question: { es: "Cuando abren los mercados navidenos?", en: "When do Christmas markets open?" }, answer: { es: "La mayoria abre desde finales de noviembre hasta fin de ano.", en: "Most open from late November until year end." } }
    ],
    bestFor: { es: "Familias y amantes de la Navidad", en: "Families and Christmas enthusiasts" },
    idealDuration: { es: "5-10 dias", en: "5-10 days" }
  },
  {
    slug: "multi-country",
    category: "interest",
    name: { es: "Viajes Multi-Pais", en: "Multi-Country Trips" },
    heroImage: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Explora varios paises en un solo viaje. Nuestros itinerarios multi-destino te permiten descubrir la diversidad de Europa de manera eficiente y emocionante.",
      en: "Explore multiple countries in a single trip. Our multi-destination itineraries let you discover Europe's diversity efficiently and excitingly."
    },
    highlights: {
      es: ["Varios destinos", "Transporte optimizado", "Diversidad cultural", "Mejor valor"],
      en: ["Multiple destinations", "Optimized transport", "Cultural diversity", "Best value"]
    },
    packages: [
      { id: "mc-1", name: { es: "Gran Tour de Europa", en: "Grand European Tour" }, destination: "Multi-Country", duration: { es: "15 dias", en: "15 days" }, price: 4890, image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=800", highlights: { es: ["Paris", "Roma", "Barcelona", "Amsterdam"], en: ["Paris", "Rome", "Barcelona", "Amsterdam"] } },
      { id: "mc-2", name: { es: "Capitales Imperiales", en: "Imperial Capitals" }, destination: "Central Europe", duration: { es: "12 dias", en: "12 days" }, price: 3890, image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=800", highlights: { es: ["Viena", "Budapest", "Praga"], en: ["Vienna", "Budapest", "Prague"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Primera capital", en: "First capital" }, description: { es: "Llegada a la primera ciudad y tour de orientacion.", en: "Arrival at first city and orientation tour." } },
      { day: 2, title: { es: "Exploracion profunda", en: "Deep exploration" }, description: { es: "Dia completo para conocer los principales monumentos.", en: "Full day to discover main monuments." } },
      { day: 3, title: { es: "Traslado a segunda ciudad", en: "Transfer to second city" }, description: { es: "Viaje en tren de alta velocidad a la siguiente capital.", en: "High-speed train journey to next capital." } }
    ],
    faqs: [
      { question: { es: "Como nos movemos entre paises?", en: "How do we travel between countries?" }, answer: { es: "Usamos trenes de alta velocidad, vuelos cortos o buses de lujo segun la ruta optima.", en: "We use high-speed trains, short flights, or luxury buses depending on the optimal route." } }
    ],
    bestFor: { es: "Viajeros que quieren ver mucho en poco tiempo", en: "Travelers who want to see a lot in little time" },
    idealDuration: { es: "10-18 dias", en: "10-18 days" }
  },
  {
    slug: "beach",
    category: "interest",
    name: { es: "Viajes de Playa", en: "Beach Trips" },
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Las mejores playas de Europa te esperan. Desde las calas secretas del Mediterraneo hasta las costas dramaticas del Atlantico, encuentra tu paraiso costero.",
      en: "Europe's best beaches await you. From secret Mediterranean coves to dramatic Atlantic coasts, find your coastal paradise."
    },
    highlights: {
      es: ["Aguas cristalinas", "Resorts de lujo", "Deportes acuaticos", "Gastronomia marina"],
      en: ["Crystal waters", "Luxury resorts", "Water sports", "Seafood cuisine"]
    },
    packages: [
      { id: "bch-1", name: { es: "Islas Baleares", en: "Balearic Islands" }, destination: "Spain", duration: { es: "10 dias", en: "10 days" }, price: 3290, image: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=800", highlights: { es: ["Mallorca", "Ibiza", "Menorca"], en: ["Mallorca", "Ibiza", "Menorca"] } },
      { id: "bch-2", name: { es: "Costa Croata", en: "Croatian Coast" }, destination: "Croatia", duration: { es: "9 dias", en: "9 days" }, price: 2890, image: "https://images.unsplash.com/photo-1555990793-da11153b2473?q=80&w=800", highlights: { es: ["Dubrovnik", "Split", "Hvar"], en: ["Dubrovnik", "Split", "Hvar"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada al resort", en: "Resort arrival" }, description: { es: "Check-in en resort frente al mar y tarde de relax.", en: "Check-in at beachfront resort and relaxing afternoon." } }
    ],
    faqs: [
      { question: { es: "Las playas son privadas?", en: "Are the beaches private?" }, answer: { es: "Algunas playas son de acceso exclusivo del resort, otras son publicas con servicios VIP.", en: "Some beaches are resort-exclusive, others are public with VIP services." } }
    ],
    bestFor: { es: "Amantes del sol y el mar", en: "Sun and sea lovers" },
    idealDuration: { es: "7-12 dias", en: "7-12 days" }
  },
  {
    slug: "adventure",
    category: "interest",
    name: { es: "Viajes de Aventura", en: "Adventure Trips" },
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Adrenalina y naturaleza se unen en nuestras aventuras europeas. Desde senderismo en los Alpes hasta kayak en fiordos noruegos, supera tus limites.",
      en: "Adrenaline and nature unite in our European adventures. From Alpine hiking to kayaking in Norwegian fjords, push your limits."
    },
    highlights: {
      es: ["Senderismo", "Deportes extremos", "Naturaleza virgen", "Experiencias unicas"],
      en: ["Hiking", "Extreme sports", "Pristine nature", "Unique experiences"]
    },
    packages: [
      { id: "adv-1", name: { es: "Fiordos de Noruega", en: "Norwegian Fjords" }, destination: "Norway", duration: { es: "10 dias", en: "10 days" }, price: 4190, image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=800", highlights: { es: ["Kayak", "Senderismo", "Glaciares"], en: ["Kayaking", "Hiking", "Glaciers"] } },
      { id: "adv-2", name: { es: "Alpes Suizos", en: "Swiss Alps" }, destination: "Switzerland", duration: { es: "8 dias", en: "8 days" }, price: 3590, image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800", highlights: { es: ["Parapente", "Via ferrata", "Glaciares"], en: ["Paragliding", "Via ferrata", "Glaciers"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Briefing de aventura", en: "Adventure briefing" }, description: { es: "Reunion con guias, equipamiento y primera actividad de calentamiento.", en: "Meeting with guides, equipment and first warm-up activity." } }
    ],
    faqs: [
      { question: { es: "Necesito experiencia previa?", en: "Do I need prior experience?" }, answer: { es: "Tenemos niveles para principiantes y expertos. Siempre hay guias certificados.", en: "We have levels for beginners and experts. There are always certified guides." } }
    ],
    bestFor: { es: "Aventureros y amantes del aire libre", en: "Adventurers and outdoor enthusiasts" },
    idealDuration: { es: "7-12 dias", en: "7-12 days" }
  },
  {
    slug: "safari",
    category: "interest",
    name: { es: "Safari Europeo", en: "European Safari" },
    heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Descubre la vida salvaje de Europa. Desde los bisontes de Polonia hasta los osos de Escandinavia, vive encuentros unicos con la fauna europea.",
      en: "Discover Europe's wildlife. From Polish bison to Scandinavian bears, experience unique encounters with European fauna."
    },
    highlights: {
      es: ["Fauna salvaje", "Parques naturales", "Fotografia de naturaleza", "Guias expertos"],
      en: ["Wild fauna", "Natural parks", "Nature photography", "Expert guides"]
    },
    packages: [
      { id: "saf-1", name: { es: "Osos de Finlandia", en: "Finnish Bears" }, destination: "Finland", duration: { es: "6 dias", en: "6 days" }, price: 3290, image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=800", highlights: { es: ["Osos pardos", "Lobos", "Aguila real"], en: ["Brown bears", "Wolves", "Golden eagle"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Centro de observacion", en: "Observation center" }, description: { es: "Llegada al centro de fauna y preparacion para avistamientos.", en: "Arrival at wildlife center and preparation for sightings." } }
    ],
    faqs: [
      { question: { es: "Es seguro observar animales salvajes?", en: "Is it safe to observe wild animals?" }, answer: { es: "Si, siempre con guias expertos y desde escondites seguros.", en: "Yes, always with expert guides and from safe hides." } }
    ],
    bestFor: { es: "Amantes de la naturaleza y fotografia", en: "Nature and photography lovers" },
    idealDuration: { es: "5-8 dias", en: "5-8 days" }
  },
  {
    slug: "cruises",
    category: "interest",
    name: { es: "Cruceros por Europa", en: "European Cruises" },
    heroImage: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Navega por las aguas mas hermosas de Europa. Desde el Mediterraneo hasta los fiordos nordicos, descubre el continente desde una perspectiva unica.",
      en: "Sail through Europe's most beautiful waters. From the Mediterranean to Nordic fjords, discover the continent from a unique perspective."
    },
    highlights: {
      es: ["Multiples destinos", "Lujo a bordo", "Todo incluido", "Entretenimiento"],
      en: ["Multiple destinations", "Onboard luxury", "All-inclusive", "Entertainment"]
    },
    packages: [
      { id: "cru-1", name: { es: "Mediterraneo Clasico", en: "Classic Mediterranean" }, destination: "Multi-Country", duration: { es: "12 dias", en: "12 days" }, price: 4590, image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=800", highlights: { es: ["Barcelona", "Roma", "Atenas"], en: ["Barcelona", "Rome", "Athens"] } },
      { id: "cru-2", name: { es: "Fiordos Nordicos", en: "Nordic Fjords" }, destination: "Norway", duration: { es: "10 dias", en: "10 days" }, price: 5290, image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=800", highlights: { es: ["Bergen", "Geirangerfjord", "Tromso"], en: ["Bergen", "Geirangerfjord", "Tromso"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Embarque", en: "Embarkation" }, description: { es: "Embarque en el puerto y acomodacion en camarote de lujo.", en: "Embarkation at port and accommodation in luxury cabin." } }
    ],
    faqs: [
      { question: { es: "Que esta incluido en el crucero?", en: "What's included in the cruise?" }, answer: { es: "Alojamiento, comidas, entretenimiento a bordo y transporte entre puertos.", en: "Accommodation, meals, onboard entertainment, and transport between ports." } }
    ],
    bestFor: { es: "Quienes buscan comodidad y multiples destinos", en: "Those seeking comfort and multiple destinations" },
    idealDuration: { es: "7-14 dias", en: "7-14 days" }
  },
  {
    slug: "honeymoon",
    category: "interest",
    name: { es: "Luna de Miel", en: "Honeymoon" },
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Celebra tu amor en los destinos mas romanticos de Europa. Desde Venecia hasta la Costa Amalfitana, crea recuerdos inolvidables con tu pareja.",
      en: "Celebrate your love in Europe's most romantic destinations. From Venice to the Amalfi Coast, create unforgettable memories with your partner."
    },
    highlights: {
      es: ["Destinos romanticos", "Experiencias exclusivas", "Cenas privadas", "Spa y bienestar"],
      en: ["Romantic destinations", "Exclusive experiences", "Private dinners", "Spa and wellness"]
    },
    packages: [
      { id: "hon-1", name: { es: "Romance en Venecia", en: "Venetian Romance" }, destination: "Italy", duration: { es: "8 dias", en: "8 days" }, price: 4290, image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800", highlights: { es: ["Gondola privada", "Cena romantica", "Murano"], en: ["Private gondola", "Romantic dinner", "Murano"] } },
      { id: "hon-2", name: { es: "Paris Romantico", en: "Romantic Paris" }, destination: "France", duration: { es: "7 dias", en: "7 days" }, price: 3890, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800", highlights: { es: ["Torre Eiffel", "Crucero Sena", "Champagne"], en: ["Eiffel Tower", "Seine cruise", "Champagne"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada romantica", en: "Romantic arrival" }, description: { es: "Recepcion VIP y traslado a suite con decoracion especial.", en: "VIP reception and transfer to specially decorated suite." } }
    ],
    faqs: [
      { question: { es: "Pueden personalizar el viaje?", en: "Can you customize the trip?" }, answer: { es: "Absolutamente. Cada luna de miel se adapta a sus deseos especiales.", en: "Absolutely. Every honeymoon is adapted to your special wishes." } }
    ],
    bestFor: { es: "Parejas recien casadas", en: "Newlywed couples" },
    idealDuration: { es: "7-12 dias", en: "7-12 days" }
  },
  {
    slug: "nature",
    category: "interest",
    name: { es: "Viajes de Naturaleza", en: "Nature Trips" },
    heroImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Conecta con la naturaleza en los paisajes mas impresionantes de Europa. Bosques, lagos, montanas y costas virgenes te esperan.",
      en: "Connect with nature in Europe's most impressive landscapes. Forests, lakes, mountains, and pristine coasts await you."
    },
    highlights: {
      es: ["Parques nacionales", "Senderismo", "Fotografia", "Eco-turismo"],
      en: ["National parks", "Hiking", "Photography", "Eco-tourism"]
    },
    packages: [
      { id: "nat-1", name: { es: "Lagos de Plitvice", en: "Plitvice Lakes" }, destination: "Croatia", duration: { es: "7 dias", en: "7 days" }, price: 2490, image: "https://images.unsplash.com/photo-1555990793-da11153b2473?q=80&w=800", highlights: { es: ["Cascadas", "Lagos turquesa", "Bosques"], en: ["Waterfalls", "Turquoise lakes", "Forests"] } },
      { id: "nat-2", name: { es: "Escocia Salvaje", en: "Wild Scotland" }, destination: "Scotland", duration: { es: "9 dias", en: "9 days" }, price: 3190, image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=800", highlights: { es: ["Highlands", "Castillos", "Whisky"], en: ["Highlands", "Castles", "Whisky"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Inmersion natural", en: "Nature immersion" }, description: { es: "Llegada y primera caminata de exploracion por el parque.", en: "Arrival and first exploratory walk through the park." } }
    ],
    faqs: [
      { question: { es: "Que nivel fisico necesito?", en: "What fitness level do I need?" }, answer: { es: "Tenemos rutas para todos los niveles, desde paseos suaves hasta trekkings exigentes.", en: "We have routes for all levels, from gentle walks to demanding treks." } }
    ],
    bestFor: { es: "Amantes de la naturaleza y el aire libre", en: "Nature and outdoor lovers" },
    idealDuration: { es: "6-10 dias", en: "6-10 days" }
  },
  {
    slug: "culture",
    category: "interest",
    name: { es: "Viajes Culturales", en: "Cultural Trips" },
    heroImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Sumérgete en la rica historia y arte de Europa. Museos de clase mundial, monumentos historicos y tradiciones vivas te esperan.",
      en: "Immerse yourself in Europe's rich history and art. World-class museums, historic monuments, and living traditions await."
    },
    highlights: {
      es: ["Museos de arte", "Monumentos historicos", "Tradiciones locales", "Guias expertos"],
      en: ["Art museums", "Historic monuments", "Local traditions", "Expert guides"]
    },
    packages: [
      { id: "cul-1", name: { es: "Arte en Paris y Florencia", en: "Art in Paris and Florence" }, destination: "France/Italy", duration: { es: "12 dias", en: "12 days" }, price: 4190, image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800", highlights: { es: ["Louvre", "Uffizi", "Accademia"], en: ["Louvre", "Uffizi", "Accademia"] } },
      { id: "cul-2", name: { es: "Historia de Roma", en: "History of Rome" }, destination: "Italy", duration: { es: "8 dias", en: "8 days" }, price: 2990, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800", highlights: { es: ["Coliseo", "Vaticano", "Foro Romano"], en: ["Colosseum", "Vatican", "Roman Forum"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Introduccion cultural", en: "Cultural introduction" }, description: { es: "Llegada y charla introductoria sobre el contexto historico.", en: "Arrival and introductory talk about historical context." } }
    ],
    faqs: [
      { question: { es: "Las entradas a museos estan incluidas?", en: "Are museum tickets included?" }, answer: { es: "Si, todas las entradas y accesos prioritarios estan incluidos.", en: "Yes, all tickets and priority access are included." } }
    ],
    bestFor: { es: "Amantes del arte y la historia", en: "Art and history lovers" },
    idealDuration: { es: "7-14 dias", en: "7-14 days" }
  },
  {
    slug: "luxury",
    category: "interest",
    name: { es: "Viajes de Lujo", en: "Luxury Trips" },
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Experimenta Europa con el maximo refinamiento. Hoteles 5 estrellas, restaurantes con estrella Michelin y experiencias exclusivas.",
      en: "Experience Europe with maximum refinement. 5-star hotels, Michelin-starred restaurants, and exclusive experiences."
    },
    highlights: {
      es: ["Hoteles 5 estrellas", "Restaurantes Michelin", "Traslados privados", "Experiencias VIP"],
      en: ["5-star hotels", "Michelin restaurants", "Private transfers", "VIP experiences"]
    },
    packages: [
      { id: "lux-1", name: { es: "Lujo en la Riviera", en: "Riviera Luxury" }, destination: "France", duration: { es: "10 dias", en: "10 days" }, price: 8990, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800", highlights: { es: ["Monaco", "Cannes", "Saint-Tropez"], en: ["Monaco", "Cannes", "Saint-Tropez"] } },
      { id: "lux-2", name: { es: "Suiza Exclusiva", en: "Exclusive Switzerland" }, destination: "Switzerland", duration: { es: "8 dias", en: "8 days" }, price: 7590, image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800", highlights: { es: ["Gstaad", "St. Moritz", "Zermatt"], en: ["Gstaad", "St. Moritz", "Zermatt"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada VIP", en: "VIP arrival" }, description: { es: "Recepcion en jet privado y traslado en limusina al hotel palace.", en: "Private jet reception and limousine transfer to palace hotel." } }
    ],
    faqs: [
      { question: { es: "Que diferencia hay con otros paquetes?", en: "What's the difference from other packages?" }, answer: { es: "Todo es de la mas alta calidad: hoteles palace, chefs privados, acceso exclusivo.", en: "Everything is of the highest quality: palace hotels, private chefs, exclusive access." } }
    ],
    bestFor: { es: "Viajeros que buscan lo mejor de lo mejor", en: "Travelers seeking the best of the best" },
    idealDuration: { es: "7-14 dias", en: "7-14 days" }
  },
  {
    slug: "solo",
    category: "group",
    name: { es: "Viajeros Solos", en: "Solo Travelers" },
    heroImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Viaja solo pero nunca solitario. Unete a grupos de viajeros afines y descubre Europa mientras haces nuevos amigos de todo el mundo.",
      en: "Travel solo but never lonely. Join groups of like-minded travelers and discover Europe while making new friends from around the world."
    },
    highlights: {
      es: ["Grupos pequenos", "Actividades sociales", "Habitacion individual", "Flexibilidad"],
      en: ["Small groups", "Social activities", "Single room", "Flexibility"]
    },
    packages: [
      { id: "sol-1", name: { es: "Portugal para Solos", en: "Portugal for Solos" }, destination: "Portugal", duration: { es: "9 dias", en: "9 days" }, price: 2490, image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800", highlights: { es: ["Lisboa", "Sintra", "Oporto"], en: ["Lisbon", "Sintra", "Porto"] } },
      { id: "sol-2", name: { es: "Irlanda para Solos", en: "Ireland for Solos" }, destination: "Ireland", duration: { es: "8 dias", en: "8 days" }, price: 2690, image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=800", highlights: { es: ["Dublin", "Galway", "Acantilados"], en: ["Dublin", "Galway", "Cliffs"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Encuentro del grupo", en: "Group meeting" }, description: { es: "Llegada y cena de bienvenida para conocer a tus companeros de viaje.", en: "Arrival and welcome dinner to meet your travel companions." } }
    ],
    faqs: [
      { question: { es: "Hay suplemento por habitacion individual?", en: "Is there a single room supplement?" }, answer: { es: "Algunos paquetes lo incluyen, otros tienen opcion de compartir habitacion.", en: "Some packages include it, others have room-sharing options." } }
    ],
    bestFor: { es: "Viajeros independientes que buscan compania", en: "Independent travelers seeking company" },
    idealDuration: { es: "7-12 dias", en: "7-12 days" }
  },
  {
    slug: "family",
    category: "group",
    name: { es: "Viajes en Familia", en: "Family Trips" },
    heroImage: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Crea recuerdos familiares inolvidables en Europa. Actividades para todas las edades, alojamientos familiares y ritmos adaptados a los mas pequenos.",
      en: "Create unforgettable family memories in Europe. Activities for all ages, family accommodations, and rhythms adapted for little ones."
    },
    highlights: {
      es: ["Actividades para ninos", "Alojamientos familiares", "Ritmos adaptados", "Experiencias educativas"],
      en: ["Kids activities", "Family accommodations", "Adapted rhythms", "Educational experiences"]
    },
    packages: [
      { id: "fam-1", name: { es: "Disney y Paris", en: "Disney and Paris" }, destination: "France", duration: { es: "8 dias", en: "8 days" }, price: 3290, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800", highlights: { es: ["Disneyland", "Torre Eiffel", "Versalles"], en: ["Disneyland", "Eiffel Tower", "Versailles"] } },
      { id: "fam-2", name: { es: "Legoland y Copenhague", en: "Legoland and Copenhagen" }, destination: "Denmark", duration: { es: "7 dias", en: "7 days" }, price: 2890, image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=800", highlights: { es: ["Legoland", "Tivoli", "La Sirenita"], en: ["Legoland", "Tivoli", "Little Mermaid"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada familiar", en: "Family arrival" }, description: { es: "Llegada y check-in en hotel con habitaciones familiares.", en: "Arrival and check-in at hotel with family rooms." } }
    ],
    faqs: [
      { question: { es: "Hay descuentos para ninos?", en: "Are there discounts for children?" }, answer: { es: "Si, ninos menores de 12 anos tienen descuentos y menores de 3 viajan gratis.", en: "Yes, children under 12 have discounts and under 3 travel free." } }
    ],
    bestFor: { es: "Familias con ninos de todas las edades", en: "Families with children of all ages" },
    idealDuration: { es: "7-10 dias", en: "7-10 days" }
  },
  {
    slug: "couples",
    category: "group",
    name: { es: "Viajes en Pareja", en: "Couples Trips" },
    heroImage: "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Escapa con tu pareja a los destinos mas romanticos de Europa. Experiencias intimas, cenas a la luz de las velas y momentos inolvidables.",
      en: "Escape with your partner to Europe's most romantic destinations. Intimate experiences, candlelit dinners, and unforgettable moments."
    },
    highlights: {
      es: ["Experiencias romanticas", "Spa para parejas", "Cenas privadas", "Paseos romanticos"],
      en: ["Romantic experiences", "Couples spa", "Private dinners", "Romantic walks"]
    },
    packages: [
      { id: "cpl-1", name: { es: "Escapada a Santorini", en: "Santorini Getaway" }, destination: "Greece", duration: { es: "7 dias", en: "7 days" }, price: 3590, image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800", highlights: { es: ["Atardeceres", "Vinos", "Playas"], en: ["Sunsets", "Wines", "Beaches"] } },
      { id: "cpl-2", name: { es: "Amor en Praga", en: "Love in Prague" }, destination: "Czech Republic", duration: { es: "5 dias", en: "5 days" }, price: 1990, image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=800", highlights: { es: ["Puente Carlos", "Crucero Moldava", "Cerveza"], en: ["Charles Bridge", "Vltava cruise", "Beer"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Recepcion romantica", en: "Romantic reception" }, description: { es: "Llegada VIP con champagne y petalos de rosa en la habitacion.", en: "VIP arrival with champagne and rose petals in the room." } }
    ],
    faqs: [
      { question: { es: "Hay opciones de aniversario?", en: "Are there anniversary options?" }, answer: { es: "Si, ofrecemos paquetes especiales para aniversarios con extras romanticos.", en: "Yes, we offer special anniversary packages with romantic extras." } }
    ],
    bestFor: { es: "Parejas buscando momentos especiales", en: "Couples seeking special moments" },
    idealDuration: { es: "5-9 dias", en: "5-9 days" }
  },
  {
    slug: "senior",
    category: "group",
    name: { es: "Viajes para Seniors", en: "Senior Trips" },
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Viajes pensados para mayores de 55 anos. Ritmos relajados, comodidad premium y companeros de generacion para compartir experiencias.",
      en: "Trips designed for those over 55. Relaxed rhythms, premium comfort, and same-generation companions to share experiences."
    },
    highlights: {
      es: ["Ritmo relajado", "Hoteles comodos", "Guias especializados", "Grupos afines"],
      en: ["Relaxed pace", "Comfortable hotels", "Specialized guides", "Like-minded groups"]
    },
    packages: [
      { id: "sen-1", name: { es: "Crucero por el Rin", en: "Rhine River Cruise" }, destination: "Germany", duration: { es: "10 dias", en: "10 days" }, price: 3890, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800", highlights: { es: ["Castillos", "Vinedos", "Ciudades historicas"], en: ["Castles", "Vineyards", "Historic cities"] } },
      { id: "sen-2", name: { es: "Portugal Clasico", en: "Classic Portugal" }, destination: "Portugal", duration: { es: "12 dias", en: "12 days" }, price: 3290, image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800", highlights: { es: ["Lisboa", "Sintra", "Fado"], en: ["Lisbon", "Sintra", "Fado"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Bienvenida especial", en: "Special welcome" }, description: { es: "Llegada con asistencia completa y briefing del viaje.", en: "Arrival with full assistance and trip briefing." } }
    ],
    faqs: [
      { question: { es: "Los itinerarios son muy exigentes?", en: "Are itineraries very demanding?" }, answer: { es: "No, estan disenados con ritmos tranquilos y tiempos de descanso.", en: "No, they are designed with calm rhythms and rest times." } }
    ],
    bestFor: { es: "Mayores de 55 que buscan viajes comodos", en: "Over 55s seeking comfortable trips" },
    idealDuration: { es: "8-14 dias", en: "8-14 days" }
  },
  {
    slug: "friends-private",
    category: "group",
    name: { es: "Amigos y Tours Privados", en: "Friends & Private Tours" },
    heroImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1920&auto=format&fit=crop",
    description: {
      es: "Organiza tu viaje perfecto con tu grupo de amigos. Tours privados, itinerarios personalizados y experiencias exclusivas para tu grupo.",
      en: "Organize your perfect trip with your group of friends. Private tours, customized itineraries, and exclusive experiences for your group."
    },
    highlights: {
      es: ["Itinerarios personalizados", "Guia privado", "Flexibilidad total", "Experiencias a medida"],
      en: ["Customized itineraries", "Private guide", "Total flexibility", "Tailored experiences"]
    },
    packages: [
      { id: "fri-1", name: { es: "Ruta del Vino Privada", en: "Private Wine Route" }, destination: "France/Italy", duration: { es: "10 dias", en: "10 days" }, price: 4590, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800", highlights: { es: ["Borgona", "Toscana", "Catas privadas"], en: ["Burgundy", "Tuscany", "Private tastings"] } },
      { id: "fri-2", name: { es: "Tour Gastronomico", en: "Gastronomic Tour" }, destination: "Spain", duration: { es: "8 dias", en: "8 days" }, price: 3490, image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=800", highlights: { es: ["San Sebastian", "Barcelona", "Madrid"], en: ["San Sebastian", "Barcelona", "Madrid"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Reunion de planificacion", en: "Planning meeting" }, description: { es: "Reunion con tu grupo para ajustar los ultimos detalles del itinerario.", en: "Meeting with your group to adjust final itinerary details." } }
    ],
    faqs: [
      { question: { es: "Cual es el minimo de personas?", en: "What's the minimum number of people?" }, answer: { es: "Tours privados desde 4 personas. A mayor grupo, mejor precio por persona.", en: "Private tours from 4 people. The larger the group, the better price per person." } }
    ],
    bestFor: { es: "Grupos de amigos buscando exclusividad", en: "Friend groups seeking exclusivity" },
    idealDuration: { es: "7-14 dias", en: "7-14 days" }
  }
];

export function getTravelStyleBySlug(slug: string): TravelStyleData | undefined {
  return TRAVEL_STYLE_DATA.find(ts => ts.slug === slug);
}
