export interface TravelStylePackage {
  id: string;
  name: { es: string; en: string; pt: string };
  destination: string;
  duration: { es: string; en: string; pt: string };
  price: number;
  image: string;
  highlights: { es: string[]; en: string[]; pt: string[] };
}

export interface TravelStyleItinerary {
  day: number;
  title: { es: string; en: string; pt: string };
  description: { es: string; en: string; pt: string };
}

export interface TravelStyleFAQ {
  question: { es: string; en: string; pt: string };
  answer: { es: string; en: string; pt: string };
}

export interface TravelStyleData {
  slug: string;
  category: "season" | "interest" | "group";
  name: { es: string; en: string; pt: string };
  heroImage: string;
  description: { es: string; en: string; pt: string };
  highlights: { es: string[]; en: string[]; pt: string[] };
  packages: TravelStylePackage[];
  sampleItinerary: TravelStyleItinerary[];
  faqs: TravelStyleFAQ[];
  bestFor: { es: string; en: string; pt: string };
  idealDuration: { es: string; en: string; pt: string };
}

export const TRAVEL_STYLE_DATA: TravelStyleData[] = [
  {
    slug: "fall",
    category: "season",
    name: { es: "Viajes de Otono", en: "Fall Trips", pt: "Viagens de Outono" },
    heroImage: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Descubre Europa en su momento mas magico. El otono transforma el continente con colores dorados, festivales de la cosecha y temperaturas perfectas para explorar. Desde los vinedos de la Toscana hasta los castillos de Alemania, vive una experiencia unica.",
      en: "Discover Europe at its most magical moment. Fall transforms the continent with golden colors, harvest festivals, and perfect temperatures for exploration. From the vineyards of Tuscany to the castles of Germany, experience something unique.",
      pt: "Descubra a Europa no seu momento mais mágico. O outono transforma o continente com cores douradas, festivais de vindima e temperaturas perfeitas para explorar. Desde os vinhedos da Toscana até os castelos da Alemanha, viva uma experiência única."
    },
    highlights: {
      es: ["Festivales de vendimia en Francia e Italia", "Colores otonales en los Alpes", "Menos turistas y mejores precios", "Gastronomia de temporada"],
      en: ["Wine harvest festivals in France and Italy", "Autumn colors in the Alps", "Fewer tourists and better prices", "Seasonal gastronomy"],
      pt: ["Festivais de vindima na França e Itália", "Cores outonais nos Alpes", "Menos turistas e melhores preços", "Gastronomia de temporada"]
    },
    packages: [
      { id: "fall-1", name: { es: "Vendimia en Borgona", en: "Burgundy Wine Harvest", pt: "Vindima na Borgonha" }, destination: "France", duration: { es: "8 dias", en: "8 days", pt: "8 dias" }, price: 2890, image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=60&w=800&auto=format&fit=crop", highlights: { es: ["Degustacion de vinos", "Recorrido por vinedos", "Gastronomia gourmet"], en: ["Wine tasting", "Vineyard tours", "Gourmet gastronomy"], pt: ["Degustação de vinhos", "Tour pelos vinhedos", "Gastronomia gourmet"] } },
      { id: "fall-2", name: { es: "Otono en la Toscana", en: "Tuscan Autumn", pt: "Outono na Toscana" }, destination: "Italy", duration: { es: "10 dias", en: "10 days", pt: "10 dias" }, price: 3450, image: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?q=60&w=800&auto=format&fit=crop", highlights: { es: ["Colinas toscanas", "Trufa blanca", "Pueblos medievales"], en: ["Tuscan hills", "White truffle", "Medieval villages"], pt: ["Colinas toscanas", "Trufa branca", "Vilas medievais"] } },
      { id: "fall-3", name: { es: "Castillos de Baviera", en: "Bavarian Castles", pt: "Castelos da Baviera" }, destination: "Germany", duration: { es: "7 dias", en: "7 days", pt: "7 dias" }, price: 2650, image: "https://images.unsplash.com/photo-1534313314376-a72289b6181e?q=60&w=800&auto=format&fit=crop", highlights: { es: ["Neuschwanstein", "Oktoberfest", "Bosques dorados"], en: ["Neuschwanstein", "Oktoberfest", "Golden forests"], pt: ["Neuschwanstein", "Oktoberfest", "Florestas douradas"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada y bienvenida", en: "Arrival and welcome", pt: "Chegada e boas-vindas" }, description: { es: "Llegada al destino, traslado al hotel y cena de bienvenida con vinos de la region.", en: "Arrival at destination, transfer to hotel, and welcome dinner with regional wines.", pt: "Chegada ao destino, traslado ao hotel e jantar de boas-vindas com vinhos da região." } },
      { day: 2, title: { es: "Exploracion de vinedos", en: "Vineyard exploration", pt: "Exploração de vinhedos" }, description: { es: "Visita guiada a vinedos historicos con degustacion y almuerzo campestre.", en: "Guided visit to historic vineyards with tasting and countryside lunch.", pt: "Visita guiada a vinhedos históricos com degustação e almoço campestre." } },
      { day: 3, title: { es: "Pueblos con encanto", en: "Charming villages", pt: "Vilas encantadoras" }, description: { es: "Recorrido por pueblos medievales con mercados de productos locales de otono.", en: "Tour of medieval villages with markets featuring local autumn products.", pt: "Tour por vilas medievais com mercados de produtos locais de outono." } },
      { day: 4, title: { es: "Experiencia gastronomica", en: "Gastronomic experience", pt: "Experiência gastronômica" }, description: { es: "Clase de cocina con productos de temporada y cena en restaurante con estrella.", en: "Cooking class with seasonal products and dinner at starred restaurant.", pt: "Aula de culinária com produtos da estação e jantar em restaurante estrelado." } },
      { day: 5, title: { es: "Naturaleza y senderismo", en: "Nature and hiking", pt: "Natureza e caminhadas" }, description: { es: "Caminata por bosques con colores otonales y picnic gourmet.", en: "Walk through forests with autumn colors and gourmet picnic.", pt: "Caminhada por florestas com cores outonais e piquenique gourmet." } }
    ],
    faqs: [
      { question: { es: "Cual es la mejor epoca del otono para viajar?", en: "What's the best time in fall to travel?", pt: "Qual é a melhor época do outono para viajar?" }, answer: { es: "Septiembre y octubre ofrecen el mejor clima y los colores mas vibrantes. Noviembre es ideal para festivales gastronomicos.", en: "September and October offer the best weather and most vibrant colors. November is ideal for gastronomic festivals.", pt: "Setembro e outubro oferecem o melhor clima e as cores mais vibrantes. Novembro é ideal para festivais gastronômicos." } },
      { question: { es: "Que ropa debo llevar?", en: "What clothing should I bring?", pt: "Que roupas devo levar?" }, answer: { es: "Recomendamos capas: chaqueta ligera, sueter, y ropa comoda para caminar. Las temperaturas varian entre 10-20 grados.", en: "We recommend layers: light jacket, sweater, and comfortable walking clothes. Temperatures range from 10-20 degrees.", pt: "Recomendamos camadas: jaqueta leve, suéter e roupas confortáveis para caminhar. As temperaturas variam entre 10-20 graus." } },
      { question: { es: "Los tours incluyen transporte?", en: "Do tours include transportation?", pt: "Os passeios incluem transporte?" }, answer: { es: "Si, todos nuestros paquetes incluyen traslados aeropuerto-hotel y transporte durante las excursiones.", en: "Yes, all our packages include airport-hotel transfers and transportation during excursions.", pt: "Sim, todos os nossos pacotes incluem traslados aeroporto-hotel e transporte durante as excursões." } }
    ],
    bestFor: { es: "Amantes del vino, gastronomia y fotografia", en: "Wine lovers, gastronomy and photography enthusiasts", pt: "Amantes de vinho, gastronomia e fotografia" },
    idealDuration: { es: "7-10 dias", en: "7-10 days", pt: "7-10 dias" }
  },
  {
    slug: "summer",
    category: "season",
    name: { es: "Viajes de Verano", en: "Summer Trips", pt: "Viagens de Verão" },
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "El verano europeo ofrece dias largos, playas cristalinas y festivales al aire libre. Desde la Costa Amalfitana hasta las islas griegas, disfruta del sol mediterraneo en su maximo esplendor.",
      en: "European summer offers long days, crystal-clear beaches, and outdoor festivals. From the Amalfi Coast to the Greek islands, enjoy the Mediterranean sun at its finest.",
      pt: "O verão europeu oferece dias longos, praias cristalinas e festivais ao ar livre. Desde a Costa Amalfitana até as ilhas gregas, desfrute do sol mediterrâneo em seu máximo esplendor."
    },
    highlights: {
      es: ["Playas del Mediterraneo", "Festivales de musica", "Dias largos de sol", "Vida nocturna vibrante"],
      en: ["Mediterranean beaches", "Music festivals", "Long sunny days", "Vibrant nightlife"],
      pt: ["Praias do Mediterrâneo", "Festivais de música", "Dias longos de sol", "Vida noturna vibrante"]
    },
    packages: [
      { id: "sum-1", name: { es: "Islas Griegas", en: "Greek Islands", pt: "Ilhas Gregas" }, destination: "Greece", duration: { es: "12 dias", en: "12 days", pt: "12 dias" }, price: 3890, image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=60&w=800", highlights: { es: ["Santorini", "Mykonos", "Creta"], en: ["Santorini", "Mykonos", "Crete"], pt: ["Santorini", "Mykonos", "Creta"] } },
      { id: "sum-2", name: { es: "Costa Amalfitana", en: "Amalfi Coast", pt: "Costa Amalfitana" }, destination: "Italy", duration: { es: "9 dias", en: "9 days", pt: "9 dias" }, price: 3250, image: "https://images.unsplash.com/photo-1534008757030-27299c4371b6?q=60&w=800", highlights: { es: ["Positano", "Capri", "Ravello"], en: ["Positano", "Capri", "Ravello"], pt: ["Positano", "Capri", "Ravello"] } },
      { id: "sum-3", name: { es: "Riviera Francesa", en: "French Riviera", pt: "Riviera Francesa" }, destination: "France", duration: { es: "8 dias", en: "8 days", pt: "8 dias" }, price: 3450, image: "https://images.unsplash.com/photo-1488866022504-f2584929ca5f?q=60&w=800", highlights: { es: ["Nice", "Monaco", "Cannes"], en: ["Nice", "Monaco", "Cannes"], pt: ["Nice", "Mônaco", "Cannes"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada al paraiso", en: "Arrival in paradise", pt: "Chegada ao paraíso" }, description: { es: "Llegada y traslado al resort frente al mar. Coctel de bienvenida al atardecer.", en: "Arrival and transfer to beachfront resort. Welcome cocktail at sunset.", pt: "Chegada e traslado ao resort à beira-mar. Coquetel de boas-vindas ao pôr do sol." } },
      { day: 2, title: { es: "Playas y relax", en: "Beaches and relaxation", pt: "Praias e relaxamento" }, description: { es: "Dia libre para disfrutar de las playas cristalinas y actividades acuaticas.", en: "Free day to enjoy crystal-clear beaches and water activities.", pt: "Dia livre para desfrutar das praias cristalinas e atividades aquáticas." } },
      { day: 3, title: { es: "Excursion en barco", en: "Boat excursion", pt: "Excursão de barco" }, description: { es: "Navegacion por la costa con paradas para nadar en calas secretas.", en: "Coastal sailing with stops for swimming in secret coves.", pt: "Navegação pela costa com paradas para nadar em enseadas secretas." } }
    ],
    faqs: [
      { question: { es: "Cual es la temperatura en verano?", en: "What's the temperature in summer?", pt: "Qual é a temperatura no verão?" }, answer: { es: "Las temperaturas oscilan entre 25-35 grados. Recomendamos proteccion solar y ropa ligera.", en: "Temperatures range from 25-35 degrees. We recommend sun protection and light clothing.", pt: "As temperaturas oscilam entre 25-35 graus. Recomendamos proteção solar e roupas leves." } },
      { question: { es: "Hay mucha gente en verano?", en: "Is it crowded in summer?", pt: "Há muita gente no verão?" }, answer: { es: "Es temporada alta, pero nuestros itinerarios incluyen acceso prioritario y horarios estrategicos.", en: "It's peak season, but our itineraries include priority access and strategic schedules.", pt: "É temporada alta, mas nossos roteiros incluem acesso prioritário e horários estratégicos." } }
    ],
    bestFor: { es: "Amantes de la playa, sol y vida social", en: "Beach lovers, sun and social life enthusiasts", pt: "Amantes de praia, sol e vida social" },
    idealDuration: { es: "8-14 dias", en: "8-14 days", pt: "8-14 dias" }
  },
  {
    slug: "spring",
    category: "season",
    name: { es: "Viajes de Primavera", en: "Spring Trips", pt: "Viagens de Primavera" },
    heroImage: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "La primavera despierta Europa con flores, jardines en flor y temperaturas ideales. Desde los tulipanes de Holanda hasta los cerezos de Paris, vive el renacer del continente.",
      en: "Spring awakens Europe with flowers, blooming gardens, and ideal temperatures. From Holland's tulips to Paris's cherry blossoms, experience the continent's rebirth.",
      pt: "A primavera desperta a Europa com flores, jardins floridos e temperaturas ideais. Desde as tulipas da Holanda até as cerejeiras de Paris, viva o renascimento do continente."
    },
    highlights: {
      es: ["Campos de tulipanes", "Jardines en flor", "Clima perfecto", "Menos multitudes"],
      en: ["Tulip fields", "Blooming gardens", "Perfect weather", "Fewer crowds"],
      pt: ["Campos de tulipas", "Jardins floridos", "Clima perfeito", "Menos multidões"]
    },
    packages: [
      { id: "spr-1", name: { es: "Tulipanes de Holanda", en: "Holland Tulips", pt: "Tulipas da Holanda" }, destination: "Netherlands", duration: { es: "6 dias", en: "6 days", pt: "6 dias" }, price: 2290, image: "https://images.unsplash.com/photo-1589994160839-163cd867cfe8?q=60&w=800", highlights: { es: ["Keukenhof", "Amsterdam", "Molinos"], en: ["Keukenhof", "Amsterdam", "Windmills"], pt: ["Keukenhof", "Amsterdã", "Moinhos"] } },
      { id: "spr-2", name: { es: "Paris en Flor", en: "Paris in Bloom", pt: "Paris em Flor" }, destination: "France", duration: { es: "7 dias", en: "7 days", pt: "7 dias" }, price: 2650, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=60&w=800", highlights: { es: ["Jardines de Monet", "Versalles", "Cerezos"], en: ["Monet's Gardens", "Versailles", "Cherry blossoms"], pt: ["Jardins de Monet", "Versalhes", "Cerejeiras"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada primaveral", en: "Spring arrival", pt: "Chegada primaveril" }, description: { es: "Llegada y paseo por parques florecidos de la ciudad.", en: "Arrival and stroll through the city's blooming parks.", pt: "Chegada e passeio por parques floridos da cidade." } },
      { day: 2, title: { es: "Jardines botanicos", en: "Botanical gardens", pt: "Jardins botânicos" }, description: { es: "Visita a los jardines mas famosos en su momento de mayor esplendor.", en: "Visit to the most famous gardens at their peak splendor.", pt: "Visita aos jardins mais famosos em seu momento de maior esplendor." } }
    ],
    faqs: [
      { question: { es: "Cuando es la mejor fecha para ver tulipanes?", en: "When is the best time to see tulips?", pt: "Quando é a melhor data para ver tulipas?" }, answer: { es: "Mediados de abril es el momento optimo para ver los campos de tulipanes en plena floracion.", en: "Mid-April is the optimal time to see tulip fields in full bloom.", pt: "Meados de abril é o momento ideal para ver os campos de tulipas em plena floração." } }
    ],
    bestFor: { es: "Amantes de la naturaleza y fotografia", en: "Nature and photography lovers", pt: "Amantes da natureza e fotografia" },
    idealDuration: { es: "5-8 dias", en: "5-8 days", pt: "5-8 dias" }
  },
  {
    slug: "easter",
    category: "season",
    name: { es: "Semana Santa en Europa", en: "Easter in Europe", pt: "Páscoa na Europa" },
    heroImage: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Vive la Semana Santa con tradiciones centenarias en Espana, Italia y mas. Procesiones, gastronomia especial y una atmosfera unica de espiritualidad y celebracion.",
      en: "Experience Easter with centuries-old traditions in Spain, Italy, and beyond. Processions, special gastronomy, and a unique atmosphere of spirituality and celebration.",
      pt: "Viva a Páscoa com tradições centenárias na Espanha, Itália e além. Procissões, gastronomia especial e uma atmosfera única de espiritualidade e celebração."
    },
    highlights: {
      es: ["Procesiones tradicionales", "Gastronomia de Pascua", "Celebraciones religiosas", "Cultura local autentica"],
      en: ["Traditional processions", "Easter gastronomy", "Religious celebrations", "Authentic local culture"],
      pt: ["Procissões tradicionais", "Gastronomia de Páscoa", "Celebrações religiosas", "Cultura local autêntica"]
    },
    packages: [
      { id: "eas-1", name: { es: "Semana Santa Sevillana", en: "Seville Holy Week", pt: "Semana Santa em Sevilha" }, destination: "Spain", duration: { es: "8 dias", en: "8 days", pt: "8 dias" }, price: 2890, image: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=60&w=800", highlights: { es: ["Procesiones", "Flamenco", "Tapas"], en: ["Processions", "Flamenco", "Tapas"], pt: ["Procissões", "Flamenco", "Tapas"] } },
      { id: "eas-2", name: { es: "Roma Eterna", en: "Eternal Rome", pt: "Roma Eterna" }, destination: "Italy", duration: { es: "7 dias", en: "7 days", pt: "7 dias" }, price: 2750, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=60&w=800", highlights: { es: ["Vaticano", "Misa Papal", "Coliseo"], en: ["Vatican", "Papal Mass", "Colosseum"], pt: ["Vaticano", "Missa Papal", "Coliseu"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada y ambientacion", en: "Arrival and setting", pt: "Chegada e ambientação" }, description: { es: "Llegada y primer contacto con las preparaciones de Semana Santa.", en: "Arrival and first contact with Holy Week preparations.", pt: "Chegada e primeiro contato com os preparativos da Semana Santa." } },
      { day: 2, title: { es: "Procesiones del Domingo de Ramos", en: "Palm Sunday processions", pt: "Procissões do Domingo de Ramos" }, description: { es: "Asistencia a las procesiones inaugurales con guia local.", en: "Attendance at inaugural processions with local guide.", pt: "Assistência às procissões inaugurais com guia local." } }
    ],
    faqs: [
      { question: { es: "Necesito reservar con anticipacion?", en: "Do I need to book in advance?", pt: "Preciso reservar com antecedência?" }, answer: { es: "Si, Semana Santa es muy popular. Recomendamos reservar con 3-4 meses de anticipacion.", en: "Yes, Easter is very popular. We recommend booking 3-4 months in advance.", pt: "Sim, a Páscoa é muito popular. Recomendamos reservar com 3-4 meses de antecedência." } }
    ],
    bestFor: { es: "Viajeros culturales y espirituales", en: "Cultural and spiritual travelers", pt: "Viajantes culturais e espirituais" },
    idealDuration: { es: "6-9 dias", en: "6-9 days", pt: "6-9 dias" }
  },
  {
    slug: "winter",
    category: "season",
    name: { es: "Viajes de Invierno", en: "Winter Trips", pt: "Viagens de Inverno" },
    heroImage: "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "El invierno europeo ofrece esqui en los Alpes, auroras boreales en Escandinavia y ciudades magicas cubiertas de nieve. Una experiencia invernal inolvidable.",
      en: "European winter offers skiing in the Alps, northern lights in Scandinavia, and magical snow-covered cities. An unforgettable winter experience.",
      pt: "O inverno europeu oferece esqui nos Alpes, auroras boreais na Escandinávia e cidades mágicas cobertas de neve. Uma experiência de inverno inesquecível."
    },
    highlights: {
      es: ["Esqui en los Alpes", "Auroras boreales", "Ciudades nevadas", "Mercados navidenos"],
      en: ["Alpine skiing", "Northern lights", "Snowy cities", "Christmas markets"],
      pt: ["Esqui nos Alpes", "Auroras boreais", "Cidades nevadas", "Mercados de Natal"]
    },
    packages: [
      { id: "win-1", name: { es: "Esqui en Suiza", en: "Swiss Skiing", pt: "Esqui na Suíça" }, destination: "Switzerland", duration: { es: "8 dias", en: "8 days", pt: "8 dias" }, price: 4290, image: "https://images.unsplash.com/photo-1520962922320-2038eebab146?q=60&w=800", highlights: { es: ["Zermatt", "Clases de esqui", "Spa alpino"], en: ["Zermatt", "Ski lessons", "Alpine spa"], pt: ["Zermatt", "Aulas de esqui", "Spa alpino"] } },
      { id: "win-2", name: { es: "Auroras en Laponia", en: "Lapland Auroras", pt: "Auroras na Lapônia" }, destination: "Finland", duration: { es: "6 dias", en: "6 days", pt: "6 dias" }, price: 3890, image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=60&w=800", highlights: { es: ["Auroras boreales", "Huskies", "Iglus de cristal"], en: ["Northern lights", "Huskies", "Glass igloos"], pt: ["Auroras boreais", "Huskies", "Iglus de vidro"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada invernal", en: "Winter arrival", pt: "Chegada invernal" }, description: { es: "Llegada y acomodacion en chalet alpino con chimenea.", en: "Arrival and accommodation in alpine chalet with fireplace.", pt: "Chegada e acomodação em chalé alpino com lareira." } },
      { day: 2, title: { es: "Dia en las pistas", en: "Day on the slopes", pt: "Dia nas pistas" }, description: { es: "Esqui o snowboard con instructor privado opcional.", en: "Skiing or snowboarding with optional private instructor.", pt: "Esqui ou snowboard com instrutor privado opcional." } }
    ],
    faqs: [
      { question: { es: "Que nivel de esqui necesito?", en: "What ski level do I need?", pt: "Que nível de esqui preciso?" }, answer: { es: "Tenemos paquetes para todos los niveles, desde principiantes hasta expertos.", en: "We have packages for all levels, from beginners to experts.", pt: "Temos pacotes para todos os níveis, desde iniciantes até especialistas." } }
    ],
    bestFor: { es: "Amantes del esqui y deportes de invierno", en: "Skiing and winter sports enthusiasts", pt: "Amantes de esqui e esportes de inverno" },
    idealDuration: { es: "6-10 dias", en: "6-10 days", pt: "6-10 dias" }
  },
  {
    slug: "christmas",
    category: "season",
    name: { es: "Navidad en Europa", en: "Christmas in Europe", pt: "Natal na Europa" },
    heroImage: "https://images.unsplash.com/photo-1512389142860-9c449e58a814?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Vive la magia navidena en los mercados mas encantadores de Europa. Desde Viena hasta Estrasburgo, descubre tradiciones, artesanias y sabores festivos.",
      en: "Experience the magic of Christmas in Europe's most charming markets. From Vienna to Strasbourg, discover traditions, crafts, and festive flavors.",
      pt: "Viva a magia do Natal nos mercados mais encantadores da Europa. Desde Viena até Estrasburgo, descubra tradições, artesanato e sabores festivos."
    },
    highlights: {
      es: ["Mercados navidenos", "Luces festivas", "Gastronomia tipica", "Tradiciones locales"],
      en: ["Christmas markets", "Festive lights", "Traditional cuisine", "Local traditions"],
      pt: ["Mercados de Natal", "Luzes festivas", "Gastronomia típica", "Tradições locais"]
    },
    packages: [
      { id: "chr-1", name: { es: "Mercados de Alemania", en: "German Christmas Markets", pt: "Mercados de Natal na Alemanha" }, destination: "Germany", duration: { es: "9 dias", en: "9 days", pt: "9 dias" }, price: 2990, image: "/assets/stock_images/christmas_market_ger_17f23500.jpg", highlights: { es: ["Nuremberg", "Colonia", "Dresde"], en: ["Nuremberg", "Cologne", "Dresden"], pt: ["Nuremberg", "Colônia", "Dresden"] } },
      { id: "chr-2", name: { es: "Navidad en Viena", en: "Vienna Christmas", pt: "Natal em Viena" }, destination: "Austria", duration: { es: "6 dias", en: "6 days", pt: "6 dias" }, price: 2650, image: "/assets/stock_images/christmas_bar_europe_48a50965.jpg", highlights: { es: ["Opera", "Mercados", "Conciertos"], en: ["Opera", "Markets", "Concerts"], pt: ["Ópera", "Mercados", "Concertos"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada navidena", en: "Christmas arrival", pt: "Chegada natalina" }, description: { es: "Llegada y paseo por los mercados navidenos iluminados.", en: "Arrival and stroll through illuminated Christmas markets.", pt: "Chegada e passeio pelos mercados de Natal iluminados." } }
    ],
    faqs: [
      { question: { es: "Cuando abren los mercados navidenos?", en: "When do Christmas markets open?", pt: "Quando abrem os mercados de Natal?" }, answer: { es: "La mayoria abre desde finales de noviembre hasta fin de ano.", en: "Most open from late November until year end.", pt: "A maioria abre desde o final de novembro até o final do ano." } }
    ],
    bestFor: { es: "Familias y amantes de la Navidad", en: "Families and Christmas enthusiasts", pt: "Famílias e amantes do Natal" },
    idealDuration: { es: "5-10 dias", en: "5-10 days", pt: "5-10 dias" }
  },
  {
    slug: "multi-country",
    category: "interest",
    name: { es: "Viajes Multi-Pais", en: "Multi-Country Trips", pt: "Viagens Multi-País" },
    heroImage: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Explora varios paises en un solo viaje. Nuestros itinerarios multi-destino te permiten descubrir la diversidad de Europa de manera eficiente y emocionante.",
      en: "Explore multiple countries in a single trip. Our multi-destination itineraries let you discover Europe's diversity efficiently and excitingly.",
      pt: "Explore vários países em uma única viagem. Nossos roteiros multi-destino permitem descobrir a diversidade da Europa de maneira eficiente e emocionante."
    },
    highlights: {
      es: ["Varios destinos", "Transporte optimizado", "Diversidad cultural", "Mejor valor"],
      en: ["Multiple destinations", "Optimized transport", "Cultural diversity", "Best value"],
      pt: ["Vários destinos", "Transporte otimizado", "Diversidade cultural", "Melhor custo-benefício"]
    },
    packages: [
      { id: "mc-1", name: { es: "Gran Tour de Europa", en: "Grand European Tour", pt: "Gran Tour pela Europa" }, destination: "Multi-Country", duration: { es: "15 dias", en: "15 days", pt: "15 dias" }, price: 4890, image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=60&w=800", highlights: { es: ["Paris", "Roma", "Barcelona", "Amsterdam"], en: ["Paris", "Rome", "Barcelona", "Amsterdam"], pt: ["Paris", "Roma", "Barcelona", "Amsterdã"] } },
      { id: "mc-2", name: { es: "Capitales Imperiales", en: "Imperial Capitals", pt: "Capitais Imperiais" }, destination: "Central Europe", duration: { es: "12 dias", en: "12 days", pt: "12 dias" }, price: 3890, image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=60&w=800", highlights: { es: ["Viena", "Budapest", "Praga"], en: ["Vienna", "Budapest", "Prague"], pt: ["Viena", "Budapeste", "Praga"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Primera capital", en: "First capital", pt: "Primeira capital" }, description: { es: "Llegada a la primera ciudad y tour de orientacion.", en: "Arrival at first city and orientation tour.", pt: "Chegada à primeira cidade e tour de orientação." } },
      { day: 2, title: { es: "Exploracion profunda", en: "Deep exploration", pt: "Exploração profunda" }, description: { es: "Dia completo para conocer los principales monumentos.", en: "Full day to discover main monuments.", pt: "Dia completo para conhecer os principais monumentos." } },
      { day: 3, title: { es: "Traslado a segunda ciudad", en: "Transfer to second city", pt: "Traslado à segunda cidade" }, description: { es: "Viaje en tren de alta velocidad a la siguiente capital.", en: "High-speed train journey to next capital.", pt: "Viagem de trem de alta velocidade à próxima capital." } }
    ],
    faqs: [
      { question: { es: "Como nos movemos entre paises?", en: "How do we travel between countries?", pt: "Como nos movemos entre países?" }, answer: { es: "Usamos trenes de alta velocidad, vuelos cortos o buses de lujo segun la ruta optima.", en: "We use high-speed trains, short flights, or luxury buses depending on the optimal route.", pt: "Usamos trens de alta velocidade, voos curtos ou ônibus de luxo dependendo da rota ideal." } }
    ],
    bestFor: { es: "Viajeros que quieren ver mucho en poco tiempo", en: "Travelers who want to see a lot in little time", pt: "Viajantes que querem ver muito em pouco tempo" },
    idealDuration: { es: "10-18 dias", en: "10-18 days", pt: "10-18 dias" }
  },
  {
    slug: "beach",
    category: "interest",
    name: { es: "Viajes de Playa", en: "Beach Trips", pt: "Viagens de Praia" },
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Las mejores playas de Europa te esperan. Desde las calas secretas del Mediterraneo hasta las costas dramaticas del Atlantico, encuentra tu paraiso costero.",
      en: "Europe's best beaches await you. From secret Mediterranean coves to dramatic Atlantic coasts, find your coastal paradise.",
      pt: "As melhores praias da Europa te esperam. Desde as enseadas secretas do Mediterrâneo até as costas dramáticas do Atlântico, encontre seu paraíso costeiro."
    },
    highlights: {
      es: ["Aguas cristalinas", "Resorts de lujo", "Deportes acuaticos", "Gastronomia marina"],
      en: ["Crystal waters", "Luxury resorts", "Water sports", "Seafood cuisine"],
      pt: ["Águas cristalinas", "Resorts de luxo", "Esportes aquáticos", "Gastronomia marinha"]
    },
    packages: [
      { id: "bch-1", name: { es: "Islas Baleares", en: "Balearic Islands", pt: "Ilhas Baleares" }, destination: "Spain", duration: { es: "10 dias", en: "10 days", pt: "10 dias" }, price: 3290, image: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=60&w=800", highlights: { es: ["Mallorca", "Ibiza", "Menorca"], en: ["Mallorca", "Ibiza", "Menorca"], pt: ["Mallorca", "Ibiza", "Menorca"] } },
      { id: "bch-2", name: { es: "Costa Croata", en: "Croatian Coast", pt: "Costa Croata" }, destination: "Croatia", duration: { es: "9 dias", en: "9 days", pt: "9 dias" }, price: 2890, image: "https://images.unsplash.com/photo-1555990793-da11153b2473?q=60&w=800", highlights: { es: ["Dubrovnik", "Split", "Hvar"], en: ["Dubrovnik", "Split", "Hvar"], pt: ["Dubrovnik", "Split", "Hvar"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada al resort", en: "Resort arrival", pt: "Chegada ao resort" }, description: { es: "Check-in en resort frente al mar y tarde de relax.", en: "Check-in at beachfront resort and relaxing afternoon.", pt: "Check-in no resort à beira-mar e tarde de relaxamento." } }
    ],
    faqs: [
      { question: { es: "Las playas son privadas?", en: "Are the beaches private?", pt: "As praias são privadas?" }, answer: { es: "Algunas playas son de acceso exclusivo del resort, otras son publicas con servicios VIP.", en: "Some beaches are resort-exclusive, others are public with VIP services.", pt: "Algumas praias são de acesso exclusivo do resort, outras são públicas com serviços VIP." } }
    ],
    bestFor: { es: "Amantes del sol y el mar", en: "Sun and sea lovers", pt: "Amantes do sol e do mar" },
    idealDuration: { es: "7-12 dias", en: "7-12 days", pt: "7-12 dias" }
  },
  {
    slug: "adventure",
    category: "interest",
    name: { es: "Viajes de Aventura", en: "Adventure Trips", pt: "Viagens de Aventura" },
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Adrenalina y naturaleza se unen en nuestras aventuras europeas. Desde senderismo en los Alpes hasta kayak en fiordos noruegos, supera tus limites.",
      en: "Adrenaline and nature unite in our European adventures. From Alpine hiking to kayaking in Norwegian fjords, push your limits.",
      pt: "Adrenalina e natureza se unem em nossas aventuras europeias. Desde caminhadas nos Alpes até caiaque em fiordes noruegueses, supere seus limites."
    },
    highlights: {
      es: ["Senderismo", "Deportes extremos", "Naturaleza virgen", "Experiencias unicas"],
      en: ["Hiking", "Extreme sports", "Pristine nature", "Unique experiences"],
      pt: ["Caminhadas", "Esportes extremos", "Natureza virgem", "Experiências únicas"]
    },
    packages: [
      { id: "adv-1", name: { es: "Fiordos de Noruega", en: "Norwegian Fjords", pt: "Fiordes da Noruega" }, destination: "Norway", duration: { es: "10 dias", en: "10 days", pt: "10 dias" }, price: 4190, image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=60&w=800", highlights: { es: ["Kayak", "Senderismo", "Glaciares"], en: ["Kayaking", "Hiking", "Glaciers"], pt: ["Caiaque", "Caminhadas", "Geleiras"] } },
      { id: "adv-2", name: { es: "Alpes Suizos", en: "Swiss Alps", pt: "Alpes Suíços" }, destination: "Switzerland", duration: { es: "8 dias", en: "8 days", pt: "8 dias" }, price: 3590, image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=60&w=800", highlights: { es: ["Parapente", "Via ferrata", "Glaciares"], en: ["Paragliding", "Via ferrata", "Glaciers"], pt: ["Parapente", "Via ferrata", "Geleiras"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Briefing de aventura", en: "Adventure briefing", pt: "Briefing de aventura" }, description: { es: "Reunion con guias, equipamiento y primera actividad de calentamiento.", en: "Meeting with guides, equipment and first warm-up activity.", pt: "Reunião com guias, equipamento e primeira atividade de aquecimento." } }
    ],
    faqs: [
      { question: { es: "Necesito experiencia previa?", en: "Do I need prior experience?", pt: "Preciso de experiência prévia?" }, answer: { es: "Tenemos niveles para principiantes y expertos. Siempre hay guias certificados.", en: "We have levels for beginners and experts. There are always certified guides.", pt: "Temos níveis para iniciantes e experientes. Sempre há guias certificados." } }
    ],
    bestFor: { es: "Aventureros y amantes del aire libre", en: "Adventurers and outdoor enthusiasts", pt: "Aventureiros e amantes do ar livre" },
    idealDuration: { es: "7-12 dias", en: "7-12 days", pt: "7-12 dias" }
  },
  {
    slug: "safari",
    category: "interest",
    name: { es: "Safari Europeo", en: "European Safari", pt: "Safari Europeu" },
    heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Descubre la vida salvaje de Europa. Desde los bisontes de Polonia hasta los osos de Escandinavia, vive encuentros unicos con la fauna europea.",
      en: "Discover Europe's wildlife. From Polish bison to Scandinavian bears, experience unique encounters with European fauna.",
      pt: "Descubra a vida selvagem da Europa. Desde os bisões da Polônia até os ursos da Escandinávia, viva encontros únicos com a fauna europeia."
    },
    highlights: {
      es: ["Fauna salvaje", "Parques naturales", "Fotografia de naturaleza", "Guias expertos"],
      en: ["Wild fauna", "Natural parks", "Nature photography", "Expert guides"],
      pt: ["Fauna selvagem", "Parques naturais", "Fotografia de natureza", "Guias especializados"]
    },
    packages: [
      { id: "saf-1", name: { es: "Osos de Finlandia", en: "Finnish Bears", pt: "Ursos da Finlândia" }, destination: "Finland", duration: { es: "6 dias", en: "6 days", pt: "6 dias" }, price: 3290, image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=60&w=800", highlights: { es: ["Osos pardos", "Lobos", "Aguila real"], en: ["Brown bears", "Wolves", "Golden eagle"], pt: ["Ursos pardos", "Lobos", "Águia-real"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Centro de observacion", en: "Observation center", pt: "Centro de observação" }, description: { es: "Llegada al centro de fauna y preparacion para avistamientos.", en: "Arrival at wildlife center and preparation for sightings.", pt: "Chegada ao centro de fauna e preparação para avistamentos." } }
    ],
    faqs: [
      { question: { es: "Es seguro observar animales salvajes?", en: "Is it safe to observe wild animals?", pt: "É seguro observar animais selvagens?" }, answer: { es: "Si, siempre con guias expertos y desde escondites seguros.", en: "Yes, always with expert guides and from safe hides.", pt: "Sim, sempre com guias especializados e de esconderijos seguros." } }
    ],
    bestFor: { es: "Amantes de la naturaleza y fotografia", en: "Nature and photography lovers", pt: "Amantes da natureza e fotografia" },
    idealDuration: { es: "5-8 dias", en: "5-8 days", pt: "5-8 dias" }
  },
  {
    slug: "cruises",
    category: "interest",
    name: { es: "Cruceros por Europa", en: "European Cruises", pt: "Cruzeiros pela Europa" },
    heroImage: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Navega por las aguas mas hermosas de Europa. Desde el Mediterraneo hasta los fiordos nordicos, descubre el continente desde una perspectiva unica.",
      en: "Sail through Europe's most beautiful waters. From the Mediterranean to Nordic fjords, discover the continent from a unique perspective.",
      pt: "Navegue pelas águas mais bonitas da Europa. Desde o Mediterrâneo até os fiordes nórdicos, descubra o continente de uma perspectiva única."
    },
    highlights: {
      es: ["Multiples destinos", "Lujo a bordo", "Todo incluido", "Entretenimiento"],
      en: ["Multiple destinations", "Onboard luxury", "All-inclusive", "Entertainment"],
      pt: ["Múltiplos destinos", "Luxo a bordo", "Tudo incluído", "Entretenimento"]
    },
    packages: [
      { id: "cru-1", name: { es: "Mediterraneo Clasico", en: "Classic Mediterranean", pt: "Mediterrâneo Clássico" }, destination: "Multi-Country", duration: { es: "12 dias", en: "12 days", pt: "12 dias" }, price: 4590, image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=60&w=800", highlights: { es: ["Barcelona", "Roma", "Atenas"], en: ["Barcelona", "Rome", "Athens"], pt: ["Barcelona", "Roma", "Atenas"] } },
      { id: "cru-2", name: { es: "Fiordos Nordicos", en: "Nordic Fjords", pt: "Fiordes Nórdicos" }, destination: "Norway", duration: { es: "10 dias", en: "10 days", pt: "10 dias" }, price: 5290, image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=60&w=800", highlights: { es: ["Bergen", "Geirangerfjord", "Tromso"], en: ["Bergen", "Geirangerfjord", "Tromso"], pt: ["Bergen", "Geirangerfjord", "Tromso"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Embarque", en: "Embarkation", pt: "Embarque" }, description: { es: "Embarque en el puerto y acomodacion en camarote de lujo.", en: "Embarkation at port and accommodation in luxury cabin.", pt: "Embarque no porto e acomodação em camarote de luxo." } }
    ],
    faqs: [
      { question: { es: "Que esta incluido en el crucero?", en: "What's included in the cruise?", pt: "O que está incluído no cruzeiro?" }, answer: { es: "Alojamiento, comidas, entretenimiento a bordo y transporte entre puertos.", en: "Accommodation, meals, onboard entertainment, and transport between ports.", pt: "Acomodação, refeições, entretenimento a bordo e transporte entre portos." } }
    ],
    bestFor: { es: "Quienes buscan comodidad y multiples destinos", en: "Those seeking comfort and multiple destinations", pt: "Quem busca conforto e múltiplos destinos" },
    idealDuration: { es: "7-14 dias", en: "7-14 days", pt: "7-14 dias" }
  },
  {
    slug: "honeymoon",
    category: "interest",
    name: { es: "Luna de Miel", en: "Honeymoon", pt: "Lua de Mel" },
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Celebra tu amor en los destinos mas romanticos de Europa. Desde Venecia hasta la Costa Amalfitana, crea recuerdos inolvidables con tu pareja.",
      en: "Celebrate your love in Europe's most romantic destinations. From Venice to the Amalfi Coast, create unforgettable memories with your partner.",
      pt: "Celebre seu amor nos destinos mais românticos da Europa. Desde Veneza até a Costa Amalfitana, crie memórias inesquecíveis com seu parceiro."
    },
    highlights: {
      es: ["Destinos romanticos", "Experiencias exclusivas", "Cenas privadas", "Spa y bienestar"],
      en: ["Romantic destinations", "Exclusive experiences", "Private dinners", "Spa and wellness"],
      pt: ["Destinos românticos", "Experiências exclusivas", "Jantares privados", "Spa e bem-estar"]
    },
    packages: [
      { id: "hon-1", name: { es: "Romance en Venecia", en: "Venetian Romance", pt: "Romance em Veneza" }, destination: "Italy", duration: { es: "8 dias", en: "8 days", pt: "8 dias" }, price: 4290, image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=60&w=800", highlights: { es: ["Gondola privada", "Cena romantica", "Murano"], en: ["Private gondola", "Romantic dinner", "Murano"], pt: ["Gôndola privada", "Jantar romântico", "Murano"] } },
      { id: "hon-2", name: { es: "Paris Romantico", en: "Romantic Paris", pt: "Paris Romântica" }, destination: "France", duration: { es: "7 dias", en: "7 days", pt: "7 dias" }, price: 3890, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=60&w=800", highlights: { es: ["Torre Eiffel", "Crucero Sena", "Champagne"], en: ["Eiffel Tower", "Seine cruise", "Champagne"], pt: ["Torre Eiffel", "Cruzeiro no Sena", "Champagne"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada romantica", en: "Romantic arrival", pt: "Chegada romântica" }, description: { es: "Recepcion VIP y traslado a suite con decoracion especial.", en: "VIP reception and transfer to specially decorated suite.", pt: "Recepção VIP e traslado à suíte com decoração especial." } }
    ],
    faqs: [
      { question: { es: "Pueden personalizar el viaje?", en: "Can you customize the trip?", pt: "Podem personalizar a viagem?" }, answer: { es: "Absolutamente. Cada luna de miel se adapta a sus deseos especiales.", en: "Absolutely. Every honeymoon is adapted to your special wishes.", pt: "Absolutamente. Cada lua de mel é adaptada aos seus desejos especiais." } }
    ],
    bestFor: { es: "Parejas recien casadas", en: "Newlywed couples", pt: "Casais recém-casados" },
    idealDuration: { es: "7-12 dias", en: "7-12 days", pt: "7-12 dias" }
  },
  {
    slug: "nature",
    category: "interest",
    name: { es: "Viajes de Naturaleza", en: "Nature Trips", pt: "Viagens de Natureza" },
    heroImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Conecta con la naturaleza en los paisajes mas impresionantes de Europa. Bosques, lagos, montanas y costas virgenes te esperan.",
      en: "Connect with nature in Europe's most impressive landscapes. Forests, lakes, mountains, and pristine coasts await you.",
      pt: "Conecte-se com a natureza nas paisagens mais impressionantes da Europa. Florestas, lagos, montanhas e costas virgens te esperam."
    },
    highlights: {
      es: ["Parques nacionales", "Senderismo", "Fotografia", "Eco-turismo"],
      en: ["National parks", "Hiking", "Photography", "Eco-tourism"],
      pt: ["Parques nacionais", "Caminhadas", "Fotografia", "Ecoturismo"]
    },
    packages: [
      { id: "nat-1", name: { es: "Lagos de Plitvice", en: "Plitvice Lakes", pt: "Lagos de Plitvice" }, destination: "Croatia", duration: { es: "7 dias", en: "7 days", pt: "7 dias" }, price: 2490, image: "https://images.unsplash.com/photo-1555990793-da11153b2473?q=60&w=800", highlights: { es: ["Cascadas", "Lagos turquesa", "Bosques"], en: ["Waterfalls", "Turquoise lakes", "Forests"], pt: ["Cascatas", "Lagos turquesa", "Florestas"] } },
      { id: "nat-2", name: { es: "Escocia Salvaje", en: "Wild Scotland", pt: "Escócia Selvagem" }, destination: "Scotland", duration: { es: "9 dias", en: "9 days", pt: "9 dias" }, price: 3190, image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=60&w=800", highlights: { es: ["Highlands", "Castillos", "Whisky"], en: ["Highlands", "Castles", "Whisky"], pt: ["Highlands", "Castelos", "Whisky"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Inmersion natural", en: "Nature immersion", pt: "Imersão natural" }, description: { es: "Llegada y primera caminata de exploracion por el parque.", en: "Arrival and first exploratory walk through the park.", pt: "Chegada e primeira caminhada de exploração pelo parque." } }
    ],
    faqs: [
      { question: { es: "Que nivel fisico necesito?", en: "What fitness level do I need?", pt: "Que nível físico preciso?" }, answer: { es: "Tenemos rutas para todos los niveles, desde paseos suaves hasta trekkings exigentes.", en: "We have routes for all levels, from gentle walks to demanding treks.", pt: "Temos rotas para todos os níveis, desde passeios leves até trekkings exigentes." } }
    ],
    bestFor: { es: "Amantes de la naturaleza y el aire libre", en: "Nature and outdoor lovers", pt: "Amantes da natureza e do ar livre" },
    idealDuration: { es: "6-10 dias", en: "6-10 days", pt: "6-10 dias" }
  },
  {
    slug: "culture",
    category: "interest",
    name: { es: "Viajes Culturales", en: "Cultural Trips", pt: "Viagens Culturais" },
    heroImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Sumérgete en la rica historia y arte de Europa. Museos de clase mundial, monumentos historicos y tradiciones vivas te esperan.",
      en: "Immerse yourself in Europe's rich history and art. World-class museums, historic monuments, and living traditions await.",
      pt: "Mergulhe na rica história e arte da Europa. Museus de classe mundial, monumentos históricos e tradições vivas te esperam."
    },
    highlights: {
      es: ["Museos de arte", "Monumentos historicos", "Tradiciones locales", "Guias expertos"],
      en: ["Art museums", "Historic monuments", "Local traditions", "Expert guides"],
      pt: ["Museus de arte", "Monumentos históricos", "Tradições locais", "Guias especializados"]
    },
    packages: [
      { id: "cul-1", name: { es: "Arte en Paris y Florencia", en: "Art in Paris and Florence", pt: "Arte em Paris e Florença" }, destination: "France/Italy", duration: { es: "12 dias", en: "12 days", pt: "12 dias" }, price: 4190, image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=60&w=800", highlights: { es: ["Louvre", "Uffizi", "Accademia"], en: ["Louvre", "Uffizi", "Accademia"], pt: ["Louvre", "Uffizi", "Accademia"] } },
      { id: "cul-2", name: { es: "Historia de Roma", en: "History of Rome", pt: "História de Roma" }, destination: "Italy", duration: { es: "8 dias", en: "8 days", pt: "8 dias" }, price: 2990, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=60&w=800", highlights: { es: ["Coliseo", "Vaticano", "Foro Romano"], en: ["Colosseum", "Vatican", "Roman Forum"], pt: ["Coliseu", "Vaticano", "Fórum Romano"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Introduccion cultural", en: "Cultural introduction", pt: "Introdução cultural" }, description: { es: "Llegada y charla introductoria sobre el contexto historico.", en: "Arrival and introductory talk about historical context.", pt: "Chegada e palestra introdutória sobre o contexto histórico." } }
    ],
    faqs: [
      { question: { es: "Las entradas a museos estan incluidas?", en: "Are museum tickets included?", pt: "Os ingressos de museus estão incluídos?" }, answer: { es: "Si, todas las entradas y accesos prioritarios estan incluidos.", en: "Yes, all tickets and priority access are included.", pt: "Sim, todos os ingressos e acessos prioritários estão incluídos." } }
    ],
    bestFor: { es: "Amantes del arte y la historia", en: "Art and history lovers", pt: "Amantes da arte e história" },
    idealDuration: { es: "7-14 dias", en: "7-14 days", pt: "7-14 dias" }
  },
  {
    slug: "luxury",
    category: "interest",
    name: { es: "Viajes de Lujo", en: "Luxury Trips", pt: "Viagens de Luxo" },
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Experimenta Europa con el maximo refinamiento. Hoteles 5 estrellas, restaurantes con estrella Michelin y experiencias exclusivas.",
      en: "Experience Europe with maximum refinement. 5-star hotels, Michelin-starred restaurants, and exclusive experiences.",
      pt: "Experimente a Europa com o máximo refinamento. Hotéis 5 estrelas, restaurantes com estrela Michelin e experiências exclusivas."
    },
    highlights: {
      es: ["Hoteles 5 estrellas", "Restaurantes Michelin", "Traslados privados", "Experiencias VIP"],
      en: ["5-star hotels", "Michelin restaurants", "Private transfers", "VIP experiences"],
      pt: ["Hotéis 5 estrelas", "Restaurantes Michelin", "Traslados privados", "Experiências VIP"]
    },
    packages: [
      { id: "lux-1", name: { es: "Lujo en la Riviera", en: "Riviera Luxury", pt: "Luxo na Riviera" }, destination: "France", duration: { es: "10 dias", en: "10 days", pt: "10 dias" }, price: 8990, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=60&w=800", highlights: { es: ["Monaco", "Cannes", "Saint-Tropez"], en: ["Monaco", "Cannes", "Saint-Tropez"], pt: ["Mônaco", "Cannes", "Saint-Tropez"] } },
      { id: "lux-2", name: { es: "Suiza Exclusiva", en: "Exclusive Switzerland", pt: "Suíça Exclusiva" }, destination: "Switzerland", duration: { es: "8 dias", en: "8 days", pt: "8 dias" }, price: 7590, image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=60&w=800", highlights: { es: ["Gstaad", "St. Moritz", "Zermatt"], en: ["Gstaad", "St. Moritz", "Zermatt"], pt: ["Gstaad", "St. Moritz", "Zermatt"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada VIP", en: "VIP arrival", pt: "Chegada VIP" }, description: { es: "Recepcion en jet privado y traslado en limusina al hotel palace.", en: "Private jet reception and limousine transfer to palace hotel.", pt: "Recepção em jato privado e traslado em limusine ao hotel palace." } }
    ],
    faqs: [
      { question: { es: "Que diferencia hay con otros paquetes?", en: "What's the difference from other packages?", pt: "Qual a diferença dos outros pacotes?" }, answer: { es: "Todo es de la mas alta calidad: hoteles palace, chefs privados, acceso exclusivo.", en: "Everything is of the highest quality: palace hotels, private chefs, exclusive access.", pt: "Tudo é da mais alta qualidade: hotéis palace, chefs privados, acesso exclusivo." } }
    ],
    bestFor: { es: "Viajeros que buscan lo mejor de lo mejor", en: "Travelers seeking the best of the best", pt: "Viajantes que buscam o melhor do melhor" },
    idealDuration: { es: "7-14 dias", en: "7-14 days", pt: "7-14 dias" }
  },
  {
    slug: "solo",
    category: "group",
    name: { es: "Viajeros Solos", en: "Solo Travelers", pt: "Viajantes Solo" },
    heroImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Viaja solo pero nunca solitario. Unete a grupos de viajeros afines y descubre Europa mientras haces nuevos amigos de todo el mundo.",
      en: "Travel solo but never lonely. Join groups of like-minded travelers and discover Europe while making new friends from around the world.",
      pt: "Viaje sozinho mas nunca solitário. Junte-se a grupos de viajantes afins e descubra a Europa enquanto faz novos amigos do mundo todo."
    },
    highlights: {
      es: ["Grupos pequenos", "Actividades sociales", "Habitacion individual", "Flexibilidad"],
      en: ["Small groups", "Social activities", "Single room", "Flexibility"],
      pt: ["Grupos pequenos", "Atividades sociais", "Quarto individual", "Flexibilidade"]
    },
    packages: [
      { id: "sol-1", name: { es: "Portugal para Solos", en: "Portugal for Solos", pt: "Portugal para Solos" }, destination: "Portugal", duration: { es: "9 dias", en: "9 days", pt: "9 dias" }, price: 2490, image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=60&w=800", highlights: { es: ["Lisboa", "Sintra", "Oporto"], en: ["Lisbon", "Sintra", "Porto"], pt: ["Lisboa", "Sintra", "Porto"] } },
      { id: "sol-2", name: { es: "Irlanda para Solos", en: "Ireland for Solos", pt: "Irlanda para Solos" }, destination: "Ireland", duration: { es: "8 dias", en: "8 days", pt: "8 dias" }, price: 2690, image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=60&w=800", highlights: { es: ["Dublin", "Galway", "Acantilados"], en: ["Dublin", "Galway", "Cliffs"], pt: ["Dublin", "Galway", "Penhascos"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Encuentro del grupo", en: "Group meeting", pt: "Encontro do grupo" }, description: { es: "Llegada y cena de bienvenida para conocer a tus companeros de viaje.", en: "Arrival and welcome dinner to meet your travel companions.", pt: "Chegada e jantar de boas-vindas para conhecer seus companheiros de viagem." } }
    ],
    faqs: [
      { question: { es: "Hay suplemento por habitacion individual?", en: "Is there a single room supplement?", pt: "Há taxa de quarto individual?" }, answer: { es: "Algunos paquetes lo incluyen, otros tienen opcion de compartir habitacion.", en: "Some packages include it, others have room-sharing options.", pt: "Alguns pacotes incluem, outros têm opção de compartilhar quarto." } }
    ],
    bestFor: { es: "Viajeros independientes que buscan compania", en: "Independent travelers seeking company", pt: "Viajantes independentes que buscam companhia" },
    idealDuration: { es: "7-12 dias", en: "7-12 days", pt: "7-12 dias" }
  },
  {
    slug: "family",
    category: "group",
    name: { es: "Viajes en Familia", en: "Family Trips", pt: "Viagens em Família" },
    heroImage: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Crea recuerdos familiares inolvidables en Europa. Actividades para todas las edades, alojamientos familiares y ritmos adaptados a los mas pequenos.",
      en: "Create unforgettable family memories in Europe. Activities for all ages, family accommodations, and rhythms adapted for little ones.",
      pt: "Crie memórias familiares inesquecíveis na Europa. Atividades para todas as idades, acomodações familiares e ritmos adaptados aos pequenos."
    },
    highlights: {
      es: ["Actividades para ninos", "Alojamientos familiares", "Ritmos adaptados", "Experiencias educativas"],
      en: ["Kids activities", "Family accommodations", "Adapted rhythms", "Educational experiences"],
      pt: ["Atividades para crianças", "Acomodações familiares", "Ritmos adaptados", "Experiências educativas"]
    },
    packages: [
      { id: "fam-1", name: { es: "Disney y Paris", en: "Disney and Paris", pt: "Disney e Paris" }, destination: "France", duration: { es: "8 dias", en: "8 days", pt: "8 dias" }, price: 3290, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=60&w=800", highlights: { es: ["Disneyland", "Torre Eiffel", "Versalles"], en: ["Disneyland", "Eiffel Tower", "Versailles"], pt: ["Disneyland", "Torre Eiffel", "Versalhes"] } },
      { id: "fam-2", name: { es: "Legoland y Copenhague", en: "Legoland and Copenhagen", pt: "Legoland e Copenhague" }, destination: "Denmark", duration: { es: "7 dias", en: "7 days", pt: "7 dias" }, price: 2890, image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=60&w=800", highlights: { es: ["Legoland", "Tivoli", "La Sirenita"], en: ["Legoland", "Tivoli", "Little Mermaid"], pt: ["Legoland", "Tivoli", "A Pequena Sereia"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Llegada familiar", en: "Family arrival", pt: "Chegada familiar" }, description: { es: "Llegada y check-in en hotel con habitaciones familiares.", en: "Arrival and check-in at hotel with family rooms.", pt: "Chegada e check-in em hotel com quartos familiares." } }
    ],
    faqs: [
      { question: { es: "Hay descuentos para ninos?", en: "Are there discounts for children?", pt: "Há descontos para crianças?" }, answer: { es: "Si, ninos menores de 12 anos tienen descuentos y menores de 3 viajan gratis.", en: "Yes, children under 12 have discounts and under 3 travel free.", pt: "Sim, crianças menores de 12 anos têm descontos e menores de 3 viajam grátis." } }
    ],
    bestFor: { es: "Familias con ninos de todas las edades", en: "Families with children of all ages", pt: "Famílias com crianças de todas as idades" },
    idealDuration: { es: "7-10 dias", en: "7-10 days", pt: "7-10 dias" }
  },
  {
    slug: "couples",
    category: "group",
    name: { es: "Viajes en Pareja", en: "Couples Trips", pt: "Viagens a Dois" },
    heroImage: "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Escapa con tu pareja a los destinos mas romanticos de Europa. Experiencias intimas, cenas a la luz de las velas y momentos inolvidables.",
      en: "Escape with your partner to Europe's most romantic destinations. Intimate experiences, candlelit dinners, and unforgettable moments.",
      pt: "Escape com seu parceiro aos destinos mais românticos da Europa. Experiências íntimas, jantares à luz de velas e momentos inesquecíveis."
    },
    highlights: {
      es: ["Experiencias romanticas", "Spa para parejas", "Cenas privadas", "Paseos romanticos"],
      en: ["Romantic experiences", "Couples spa", "Private dinners", "Romantic walks"],
      pt: ["Experiências românticas", "Spa para casais", "Jantares privados", "Passeios românticos"]
    },
    packages: [
      { id: "cpl-1", name: { es: "Escapada a Santorini", en: "Santorini Getaway", pt: "Escapada a Santorini" }, destination: "Greece", duration: { es: "7 dias", en: "7 days", pt: "7 dias" }, price: 3590, image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=60&w=800", highlights: { es: ["Atardeceres", "Vinos", "Playas"], en: ["Sunsets", "Wines", "Beaches"], pt: ["Pôr do sol", "Vinhos", "Praias"] } },
      { id: "cpl-2", name: { es: "Amor en Praga", en: "Love in Prague", pt: "Amor em Praga" }, destination: "Czech Republic", duration: { es: "5 dias", en: "5 days", pt: "5 dias" }, price: 1990, image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=60&w=800", highlights: { es: ["Puente Carlos", "Crucero Moldava", "Cerveza"], en: ["Charles Bridge", "Vltava cruise", "Beer"], pt: ["Ponte Carlos", "Cruzeiro no Vltava", "Cerveja"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Recepcion romantica", en: "Romantic reception", pt: "Recepção romântica" }, description: { es: "Llegada VIP con champagne y petalos de rosa en la habitacion.", en: "VIP arrival with champagne and rose petals in the room.", pt: "Chegada VIP com champagne e pétalas de rosa no quarto." } }
    ],
    faqs: [
      { question: { es: "Hay opciones de aniversario?", en: "Are there anniversary options?", pt: "Há opções para aniversário?" }, answer: { es: "Si, ofrecemos paquetes especiales para aniversarios con extras romanticos.", en: "Yes, we offer special anniversary packages with romantic extras.", pt: "Sim, oferecemos pacotes especiais para aniversários com extras românticos." } }
    ],
    bestFor: { es: "Parejas buscando momentos especiales", en: "Couples seeking special moments", pt: "Casais buscando momentos especiais" },
    idealDuration: { es: "5-9 dias", en: "5-9 days", pt: "5-9 dias" }
  },
  {
    slug: "senior",
    category: "group",
    name: { es: "Viajes para Seniors", en: "Senior Trips", pt: "Viagens para Seniores" },
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Viajes pensados para mayores de 55 anos. Ritmos relajados, comodidad premium y companeros de generacion para compartir experiencias.",
      en: "Trips designed for those over 55. Relaxed rhythms, premium comfort, and same-generation companions to share experiences.",
      pt: "Viagens pensadas para maiores de 55 anos. Ritmos relaxados, conforto premium e companheiros de geração para compartilhar experiências."
    },
    highlights: {
      es: ["Ritmo relajado", "Hoteles comodos", "Guias especializados", "Grupos afines"],
      en: ["Relaxed pace", "Comfortable hotels", "Specialized guides", "Like-minded groups"],
      pt: ["Ritmo relaxado", "Hotéis confortáveis", "Guias especializados", "Grupos afins"]
    },
    packages: [
      { id: "sen-1", name: { es: "Crucero por el Rin", en: "Rhine River Cruise", pt: "Cruzeiro pelo Reno" }, destination: "Germany", duration: { es: "10 dias", en: "10 days", pt: "10 dias" }, price: 3890, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=60&w=800", highlights: { es: ["Castillos", "Vinedos", "Ciudades historicas"], en: ["Castles", "Vineyards", "Historic cities"], pt: ["Castelos", "Vinhedos", "Cidades históricas"] } },
      { id: "sen-2", name: { es: "Portugal Clasico", en: "Classic Portugal", pt: "Portugal Clássico" }, destination: "Portugal", duration: { es: "12 dias", en: "12 days", pt: "12 dias" }, price: 3290, image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=60&w=800", highlights: { es: ["Lisboa", "Sintra", "Fado"], en: ["Lisbon", "Sintra", "Fado"], pt: ["Lisboa", "Sintra", "Fado"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Bienvenida especial", en: "Special welcome", pt: "Boas-vindas especiais" }, description: { es: "Llegada con asistencia completa y briefing del viaje.", en: "Arrival with full assistance and trip briefing.", pt: "Chegada com assistência completa e briefing da viagem." } }
    ],
    faqs: [
      { question: { es: "Los itinerarios son muy exigentes?", en: "Are itineraries very demanding?", pt: "Os roteiros são muito exigentes?" }, answer: { es: "No, estan disenados con ritmos tranquilos y tiempos de descanso.", en: "No, they are designed with calm rhythms and rest times.", pt: "Não, são desenhados com ritmos tranquilos e tempos de descanso." } }
    ],
    bestFor: { es: "Mayores de 55 que buscan viajes comodos", en: "Over 55s seeking comfortable trips", pt: "Maiores de 55 que buscam viagens confortáveis" },
    idealDuration: { es: "8-14 dias", en: "8-14 days", pt: "8-14 dias" }
  },
  {
    slug: "friends-private",
    category: "group",
    name: { es: "Amigos y Tours Privados", en: "Friends & Private Tours", pt: "Amigos e Tours Privados" },
    heroImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=60&w=1200&auto=format&fit=crop",
    description: {
      es: "Organiza tu viaje perfecto con tu grupo de amigos. Tours privados, itinerarios personalizados y experiencias exclusivas para tu grupo.",
      en: "Organize your perfect trip with your group of friends. Private tours, customized itineraries, and exclusive experiences for your group.",
      pt: "Organize sua viagem perfeita com seu grupo de amigos. Tours privados, roteiros personalizados e experiências exclusivas para seu grupo."
    },
    highlights: {
      es: ["Itinerarios personalizados", "Guia privado", "Flexibilidad total", "Experiencias a medida"],
      en: ["Customized itineraries", "Private guide", "Total flexibility", "Tailored experiences"],
      pt: ["Roteiros personalizados", "Guia privado", "Flexibilidade total", "Experiências sob medida"]
    },
    packages: [
      { id: "fri-1", name: { es: "Ruta del Vino Privada", en: "Private Wine Route", pt: "Rota do Vinho Privada" }, destination: "France/Italy", duration: { es: "10 dias", en: "10 days", pt: "10 dias" }, price: 4590, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=60&w=800", highlights: { es: ["Borgona", "Toscana", "Catas privadas"], en: ["Burgundy", "Tuscany", "Private tastings"], pt: ["Borgonha", "Toscana", "Degustações privadas"] } },
      { id: "fri-2", name: { es: "Tour Gastronomico", en: "Gastronomic Tour", pt: "Tour Gastronômico" }, destination: "Spain", duration: { es: "8 dias", en: "8 days", pt: "8 dias" }, price: 3490, image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=60&w=800", highlights: { es: ["San Sebastian", "Barcelona", "Madrid"], en: ["San Sebastian", "Barcelona", "Madrid"], pt: ["San Sebastián", "Barcelona", "Madrid"] } }
    ],
    sampleItinerary: [
      { day: 1, title: { es: "Reunion de planificacion", en: "Planning meeting", pt: "Reunião de planejamento" }, description: { es: "Reunion con tu grupo para ajustar los ultimos detalles del itinerario.", en: "Meeting with your group to adjust final itinerary details.", pt: "Reunião com seu grupo para ajustar os últimos detalhes do roteiro." } }
    ],
    faqs: [
      { question: { es: "Cual es el minimo de personas?", en: "What's the minimum number of people?", pt: "Qual é o mínimo de pessoas?" }, answer: { es: "Tours privados desde 4 personas. A mayor grupo, mejor precio por persona.", en: "Private tours from 4 people. The larger the group, the better price per person.", pt: "Tours privados a partir de 4 pessoas. Quanto maior o grupo, melhor o preço por pessoa." } }
    ],
    bestFor: { es: "Grupos de amigos buscando exclusividad", en: "Friend groups seeking exclusivity", pt: "Grupos de amigos buscando exclusividade" },
    idealDuration: { es: "7-14 dias", en: "7-14 days", pt: "7-14 dias" }
  }
];

const TRAVEL_STYLE_ALIASES: Record<string, string> = {
  "lujo": "luxury",
  "aventura": "adventure",
  "cultural": "culture",
  "romantico": "couples",
  "familiar": "family",
  "playa": "beach",
  "cruceros": "cruises",
  "luna-de-miel": "honeymoon",
  "naturaleza": "nature",
  "solo": "solo",
  "senior": "senior",
  "amigos": "friends-private",
  "verano": "summer",
  "invierno": "winter",
  "primavera": "spring",
  "otono": "fall",
  "navidad": "christmas",
  "pascua": "easter",
  "safari": "safari",
  "multi-pais": "multi-country",
};

export function getTravelStyleBySlug(slug: string): TravelStyleData | undefined {
  const resolved = TRAVEL_STYLE_ALIASES[slug] || slug;
  return TRAVEL_STYLE_DATA.find(ts => ts.slug === resolved);
}
