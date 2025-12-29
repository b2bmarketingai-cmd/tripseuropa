import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogPageSEO } from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, Search, TrendingUp, BookOpen, Plane, MapPin, CreditCard, Shield, Smartphone, Heart, Camera, Utensils, Globe } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";

const BLOG_CATEGORIES = [
  { id: "all", label: { es: "Todos", en: "All" }, icon: BookOpen },
  { id: "destinos", label: { es: "Destinos", en: "Destinations" }, icon: MapPin },
  { id: "planificacion", label: { es: "Planificacion", en: "Planning" }, icon: Plane },
  { id: "lujo", label: { es: "Lujo", en: "Luxury" }, icon: Heart },
  { id: "dinero", label: { es: "Dinero", en: "Money" }, icon: CreditCard },
  { id: "consejos", label: { es: "Consejos", en: "Tips" }, icon: TrendingUp },
  { id: "gastronomia", label: { es: "Gastronomia", en: "Gastronomy" }, icon: Utensils },
];

const BLOG_POSTS = [
  {
    id: "circuito-balcanes",
    image: "https://images.unsplash.com/photo-1555990538-1e6f13e0e101?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Circuito Balcanes: Descubre 10 Naciones en un Solo Viaje", en: "Balkans Circuit: Discover 10 Nations in One Trip" },
    excerpt: { es: "Bulgaria, Grecia, Macedonia, Albania, Montenegro, Croacia, Bosnia y Serbia. La ruta mas completa por los Balcanes europeos.", en: "Bulgaria, Greece, Macedonia, Albania, Montenegro, Croatia, Bosnia and Serbia. The most complete route through the European Balkans." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "29 Dic 2024",
    readTime: 14,
    featured: true,
    keywords: ["balcanes europa", "circuito balcanes", "croacia montenegro albania"],
  },
  {
    id: "colores-de-europa",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Colores de Europa: Tour por Francia, Espana e Italia", en: "Colors of Europe: Tour through France, Spain and Italy" },
    excerpt: { es: "Paris, Barcelona, Roma y mas. El circuito clasico que combina lo mejor de tres paises iconicos.", en: "Paris, Barcelona, Rome and more. The classic circuit combining the best of three iconic countries." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "29 Dic 2024",
    readTime: 12,
    featured: true,
    keywords: ["tour europa clasico", "francia espana italia", "circuito europa"],
  },
  {
    id: "encanto-mediterraneo",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Encanto Mediterraneo: Italia, Francia y Espana Costera", en: "Mediterranean Charm: Coastal Italy, France and Spain" },
    excerpt: { es: "Costa Amalfitana, Riviera Francesa, Costa Brava. Las costas mas hermosas del Mediterraneo en un viaje.", en: "Amalfi Coast, French Riviera, Costa Brava. The most beautiful Mediterranean coasts in one trip." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "28 Dic 2024",
    readTime: 11,
    featured: true,
    keywords: ["mediterraneo europa", "costa amalfitana", "riviera francesa"],
  },
  {
    id: "ciudades-imperiales",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Ciudades Imperiales: Viena, Praga, Budapest y Estambul", en: "Imperial Cities: Vienna, Prague, Budapest and Istanbul" },
    excerpt: { es: "El legado de los grandes imperios europeos. Palacios, catedrales, puentes y cultura en un circuito inolvidable.", en: "The legacy of great European empires. Palaces, cathedrals, bridges and culture in an unforgettable circuit." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "28 Dic 2024",
    readTime: 13,
    featured: false,
    keywords: ["ciudades imperiales", "praga budapest viena", "europa central"],
  },
  {
    id: "turquia-capadocia",
    image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Turquia Magica: Estambul, Capadocia y la Ruta Otomana", en: "Magical Turkey: Istanbul, Cappadocia and the Ottoman Route" },
    excerpt: { es: "Globos aerostaticos, mezquitas, bazares y paisajes lunares. Turquia es el puente entre Europa y Asia.", en: "Hot air balloons, mosques, bazaars and lunar landscapes. Turkey is the bridge between Europe and Asia." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "27 Dic 2024",
    readTime: 10,
    featured: false,
    keywords: ["turquia viaje", "capadocia globos", "estambul turismo"],
  },
  {
    id: "italia-vespa",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Italia en Vespa: Recorre la Toscana Como un Local", en: "Italy by Vespa: Explore Tuscany Like a Local" },
    excerpt: { es: "Florencia, Siena, Chianti y pueblos medievales. La forma mas autentica de vivir la Toscana italiana.", en: "Florence, Siena, Chianti and medieval towns. The most authentic way to experience Italian Tuscany." },
    category: "lujo",
    categoryLabel: { es: "Lujo", en: "Luxury" },
    date: "27 Dic 2024",
    readTime: 9,
    featured: false,
    keywords: ["italia vespa", "toscana tour", "florencia siena"],
  },
  {
    id: "mercados-navidenos",
    image: "https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Mercados Navidenos en Europa: Viena, Praga, Estrasburgo", en: "Christmas Markets in Europe: Vienna, Prague, Strasbourg" },
    excerpt: { es: "Vin chaud, artesanias, luces y magia invernal. Los mejores mercados navidenos europeos para visitar.", en: "Mulled wine, crafts, lights and winter magic. The best European Christmas markets to visit." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "26 Dic 2024",
    readTime: 8,
    featured: false,
    keywords: ["mercados navidenos europa", "navidad viena praga", "invierno europa"],
  },
  {
    id: "ruta-del-amor",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Ruta del Amor: Paris y Madrid para Parejas", en: "Route of Love: Paris and Madrid for Couples" },
    excerpt: { es: "La ciudad del amor y la capital espanola. Dos destinos romanticos perfectos para una escapada en pareja.", en: "The city of love and the Spanish capital. Two perfect romantic destinations for a couple's getaway." },
    category: "lujo",
    categoryLabel: { es: "Lujo", en: "Luxury" },
    date: "26 Dic 2024",
    readTime: 7,
    featured: false,
    keywords: ["paris madrid pareja", "viaje romantico europa", "luna de miel"],
  },
  {
    id: "visa-schengen-colombia-2025",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Guia Completa: Visa Schengen para Colombianos 2025", en: "Complete Guide: Schengen Visa for Colombians 2025" },
    excerpt: { es: "Requisitos actualizados, documentos necesarios, costo, tiempo de tramite y consejos para aprobar tu visa Schengen desde Colombia.", en: "Updated requirements, necessary documents, cost, processing time and tips to get your Schengen visa from Colombia approved." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning" },
    date: "25 Dic 2024",
    readTime: 12,
    featured: false,
    keywords: ["visa schengen colombia", "requisitos visa europa", "visa schengen 2025"],
  },
  {
    id: "paris-5-dias-guia",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Paris en 5 Dias: Itinerario Perfecto para Colombianos", en: "Paris in 5 Days: Perfect Itinerary for Colombians" },
    excerpt: { es: "Torre Eiffel, Louvre, Versalles, Montmartre y mas. El itinerario dia a dia para aprovechar Paris al maximo.", en: "Eiffel Tower, Louvre, Versailles, Montmartre and more. The day by day itinerary to make the most of Paris." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "26 Dic 2024",
    readTime: 10,
    featured: true,
    keywords: ["paris 5 dias", "itinerario paris", "que hacer en paris"],
  },
  {
    id: "presupuesto-viaje-europa-2025",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Cuanto Cuesta Viajar a Europa en 2025? Presupuesto Real", en: "How Much Does It Cost to Travel to Europe in 2025? Real Budget" },
    excerpt: { es: "Desglose completo: vuelos, hoteles, comida, transporte y actividades. Presupuesto para 7, 14 y 21 dias.", en: "Complete breakdown: flights, hotels, food, transport and activities. Budget for 7, 14 and 21 days." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money" },
    date: "24 Dic 2024",
    readTime: 15,
    featured: true,
    keywords: ["presupuesto europa", "cuanto cuesta europa", "viaje europa precio"],
  },
  {
    id: "hoteles-lujo-paris",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop",
    title: { es: "10 Hoteles de Lujo Imperdibles en Paris 2025", en: "10 Must-Stay Luxury Hotels in Paris 2025" },
    excerpt: { es: "Ritz, Four Seasons, Le Bristol y mas. Los hoteles mas exclusivos de Paris con vista a la Torre Eiffel.", en: "Ritz, Four Seasons, Le Bristol and more. The most exclusive Paris hotels with Eiffel Tower views." },
    category: "lujo",
    categoryLabel: { es: "Lujo", en: "Luxury" },
    date: "22 Dic 2024",
    readTime: 8,
    featured: false,
    keywords: ["hoteles lujo paris", "mejores hoteles paris", "donde alojarse paris"],
  },
  {
    id: "madrid-vs-barcelona",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Madrid vs Barcelona: Cual Elegir para tu Primer Viaje?", en: "Madrid vs Barcelona: Which One to Choose for Your First Trip?" },
    excerpt: { es: "Comparativa completa: clima, costo, atracciones, gastronomia y ambiente. Te ayudamos a decidir.", en: "Complete comparison: weather, cost, attractions, gastronomy and atmosphere. We help you decide." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "20 Dic 2024",
    readTime: 9,
    featured: false,
    keywords: ["madrid o barcelona", "españa primer viaje", "madrid barcelona diferencias"],
  },
  {
    id: "seguro-viaje-europa",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Seguro de Viaje para Europa: Cual Elegir y Por Que es Obligatorio", en: "Travel Insurance for Europe: Which to Choose and Why It's Mandatory" },
    excerpt: { es: "Requisitos Schengen, coberturas necesarias, mejores companias y como reclamar si lo necesitas.", en: "Schengen requirements, necessary coverage, best companies and how to claim if you need it." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning" },
    date: "18 Dic 2024",
    readTime: 7,
    featured: false,
    keywords: ["seguro viaje europa", "seguro schengen", "seguro viaje obligatorio"],
  },
  {
    id: "roma-3-dias",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Roma en 3 Dias: Coliseo, Vaticano y Trastevere", en: "Rome in 3 Days: Colosseum, Vatican and Trastevere" },
    excerpt: { es: "Itinerario optimizado para ver lo mejor de Roma. Evita filas, mejores horarios y tips locales.", en: "Optimized itinerary to see the best of Rome. Skip lines, best times and local tips." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "16 Dic 2024",
    readTime: 8,
    featured: false,
    keywords: ["roma 3 dias", "que hacer en roma", "itinerario roma"],
  },
  {
    id: "vuelos-baratos-europa",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Como Conseguir Vuelos Baratos a Europa desde Colombia", en: "How to Get Cheap Flights to Europe from Colombia" },
    excerpt: { es: "Mejores epocas, aerolineas, buscadores y trucos para ahorrar hasta 40% en tus vuelos.", en: "Best times, airlines, search engines and tricks to save up to 40% on your flights." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money" },
    date: "14 Dic 2024",
    readTime: 10,
    featured: false,
    keywords: ["vuelos baratos europa", "pasajes europa", "vuelos colombia europa"],
  },
  {
    id: "restaurantes-michelin-paris",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Restaurantes Michelin en Paris: Guia para Latinoamericanos", en: "Michelin Restaurants in Paris: Guide for Latin Americans" },
    excerpt: { es: "Desde 2 hasta 3 estrellas. Reservas, dress code, precios y que esperar en una cena Michelin.", en: "From 2 to 3 stars. Reservations, dress code, prices and what to expect at a Michelin dinner." },
    category: "gastronomia",
    categoryLabel: { es: "Gastronomia", en: "Gastronomy" },
    date: "12 Dic 2024",
    readTime: 9,
    featured: false,
    keywords: ["restaurantes michelin paris", "cena lujo paris", "gastronomia paris"],
  },
  {
    id: "esim-europa-guia",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    title: { es: "eSIM en Europa: Internet Ilimitado sin Roaming", en: "eSIM in Europe: Unlimited Internet without Roaming" },
    excerpt: { es: "Mejores opciones de eSIM, como activarla, precios y por que es mejor que el roaming tradicional.", en: "Best eSIM options, how to activate it, prices and why it's better than traditional roaming." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips" },
    date: "10 Dic 2024",
    readTime: 6,
    featured: false,
    keywords: ["esim europa", "internet europa", "roaming europa"],
  },
  {
    id: "amsterdam-tulipanes",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Amsterdam y los Tulipanes: Mejor Epoca para Visitar", en: "Amsterdam and the Tulips: Best Time to Visit" },
    excerpt: { es: "Keukenhof, campos de tulipanes, canales y museos. Todo lo que necesitas para tu viaje.", en: "Keukenhof, tulip fields, canals and museums. Everything you need for your trip." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "8 Dic 2024",
    readTime: 7,
    featured: false,
    keywords: ["amsterdam tulipanes", "keukenhof", "cuando visitar amsterdam"],
  },
  {
    id: "luna-miel-europa",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Luna de Miel en Europa: 5 Destinos Romanticos", en: "Honeymoon in Europe: 5 Romantic Destinations" },
    excerpt: { es: "Paris, Santorini, Venecia, Costa Amalfitana y Suiza. Los destinos mas romanticos para parejas.", en: "Paris, Santorini, Venice, Amalfi Coast and Switzerland. The most romantic destinations for couples." },
    category: "lujo",
    categoryLabel: { es: "Lujo", en: "Luxury" },
    date: "6 Dic 2024",
    readTime: 8,
    featured: false,
    keywords: ["luna de miel europa", "destinos romanticos", "viaje parejas europa"],
  },
  {
    id: "que-empacar-europa",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Que Empacar para Europa: Checklist Completo", en: "What to Pack for Europe: Complete Checklist" },
    excerpt: { es: "Ropa, documentos, tecnologia y accesorios. Lista descargable para no olvidar nada.", en: "Clothes, documents, technology and accessories. Downloadable list so you don't forget anything." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips" },
    date: "4 Dic 2024",
    readTime: 6,
    featured: false,
    keywords: ["que empacar europa", "maleta europa", "checklist viaje"],
  },
  {
    id: "vinos-toscana",
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Ruta del Vino en Toscana: Guia Definitiva", en: "Wine Route in Tuscany: Definitive Guide" },
    excerpt: { es: "Chianti, Brunello, Montepulciano. Las mejores bodegas, tours y experiencias enologicas.", en: "Chianti, Brunello, Montepulciano. The best wineries, tours and wine experiences." },
    category: "gastronomia",
    categoryLabel: { es: "Gastronomia", en: "Gastronomy" },
    date: "2 Dic 2024",
    readTime: 10,
    featured: false,
    keywords: ["vinos toscana", "ruta vino italia", "bodegas toscana"],
  },
  {
    id: "transporte-europa",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Transporte en Europa: Trenes, Buses y Low Cost", en: "Transport in Europe: Trains, Buses and Low Cost" },
    excerpt: { es: "Eurail Pass, Flixbus, Ryanair. Como moverte por Europa de forma economica y eficiente.", en: "Eurail Pass, Flixbus, Ryanair. How to get around Europe economically and efficiently." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money" },
    date: "30 Nov 2024",
    readTime: 11,
    featured: false,
    keywords: ["transporte europa", "eurail pass", "como moverse europa"],
  },
  {
    id: "visa-schengen-mexico-2025",
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Visa Schengen para Mexicanos 2025: Guia Actualizada", en: "Schengen Visa for Mexicans 2025: Updated Guide" },
    excerpt: { es: "Buenas noticias: Mexico NO necesita visa Schengen. Requisitos de entrada, documentos y consejos.", en: "Good news: Mexico does NOT need Schengen visa. Entry requirements, documents and tips." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning" },
    date: "28 Nov 2024",
    readTime: 8,
    featured: false,
    keywords: ["visa schengen mexico", "mexicanos europa", "visa europa mexico"],
  },
  {
    id: "barcelona-4-dias",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Barcelona en 4 Dias: Gaudi, Playa y Tapas", en: "Barcelona in 4 Days: Gaudi, Beach and Tapas" },
    excerpt: { es: "Sagrada Familia, Park Guell, La Barceloneta y el Barrio Gotico. Itinerario perfecto.", en: "Sagrada Familia, Park Guell, La Barceloneta and Gothic Quarter. Perfect itinerary." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "26 Nov 2024",
    readTime: 9,
    featured: false,
    keywords: ["barcelona 4 dias", "que ver barcelona", "itinerario barcelona"],
  },
  {
    id: "londres-sin-visa",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Londres sin Visa: Guia para Latinoamericanos", en: "London without Visa: Guide for Latin Americans" },
    excerpt: { es: "Requisitos de entrada al Reino Unido, documentos, ETA y consejos para evitar problemas en inmigracion.", en: "UK entry requirements, documents, ETA and tips to avoid immigration problems." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning" },
    date: "24 Nov 2024",
    readTime: 10,
    featured: false,
    keywords: ["londres sin visa", "uk visa latinoamerica", "entrar reino unido"],
  },
  {
    id: "praga-budapest-viena",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Praga, Budapest y Viena: Circuito Imperial 10 Dias", en: "Prague, Budapest and Vienna: Imperial Circuit 10 Days" },
    excerpt: { es: "El circuito europeo mas popular. Itinerario, transporte, hoteles y presupuesto detallado.", en: "The most popular European circuit. Itinerary, transport, hotels and detailed budget." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "22 Nov 2024",
    readTime: 12,
    featured: false,
    keywords: ["praga budapest viena", "circuito imperial", "europa del este"],
  },
  {
    id: "costa-amalfitana",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Costa Amalfitana: Positano, Amalfi y Ravello", en: "Amalfi Coast: Positano, Amalfi and Ravello" },
    excerpt: { es: "El destino mas fotografiado de Italia. Como llegar, donde alojarse y que hacer.", en: "Italy's most photographed destination. How to get there, where to stay and what to do." },
    category: "lujo",
    categoryLabel: { es: "Lujo", en: "Luxury" },
    date: "20 Nov 2024",
    readTime: 9,
    featured: false,
    keywords: ["costa amalfitana", "positano", "amalfi italia"],
  },
  {
    id: "santorini-mikonos",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Santorini y Mykonos: Islas Griegas en 7 Dias", en: "Santorini and Mykonos: Greek Islands in 7 Days" },
    excerpt: { es: "Las islas mas famosas de Grecia. Ferries, atardeceres, playas y vida nocturna.", en: "Greece's most famous islands. Ferries, sunsets, beaches and nightlife." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "18 Nov 2024",
    readTime: 10,
    featured: false,
    keywords: ["santorini mykonos", "islas griegas", "grecia 7 dias"],
  },
  {
    id: "viaje-solo-europa",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Viajar Solo a Europa: Guia Completa 2025", en: "Traveling Solo to Europe: Complete Guide 2025" },
    excerpt: { es: "Destinos seguros, hostales, tours y consejos para viajeros solitarios latinoamericanos.", en: "Safe destinations, hostels, tours and tips for Latin American solo travelers." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips" },
    date: "16 Nov 2024",
    readTime: 11,
    featured: false,
    keywords: ["viajar solo europa", "viaje solitario", "europa solo"],
  },
  {
    id: "viaje-brasil-europa",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Viagem para Europa do Brasil: Guia Completo", en: "Travel to Europe from Brazil: Complete Guide" },
    excerpt: { es: "Brasileiros nao precisam de visto! Requisitos, documentos, voos e dicas para sua primeira viagem.", en: "Brazilians don't need a visa! Requirements, documents, flights and tips for your first trip." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning" },
    date: "14 Nov 2024",
    readTime: 10,
    featured: false,
    keywords: ["viagem europa brasil", "brasileiros europa", "voos brasil europa"],
  },
  {
    id: "suiza-7-dias",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Suiza en 7 Dias: Alpes, Lagos y Chocolate", en: "Switzerland in 7 Days: Alps, Lakes and Chocolate" },
    excerpt: { es: "Zurich, Lucerna, Interlaken, Zermatt. El itinerario perfecto por los Alpes suizos.", en: "Zurich, Lucerne, Interlaken, Zermatt. The perfect itinerary through the Swiss Alps." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "12 Nov 2024",
    readTime: 10,
    featured: false,
    keywords: ["suiza 7 dias", "itinerario suiza", "alpes suizos"],
  },
  {
    id: "primera-vez-europa",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Primera Vez en Europa: 10 Errores que Debes Evitar", en: "First Time in Europe: 10 Mistakes to Avoid" },
    excerpt: { es: "No cometas estos errores clasicos de viajeros primerizos. Ahorra tiempo, dinero y frustraciones.", en: "Don't make these classic first-time traveler mistakes. Save time, money and frustrations." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips" },
    date: "10 Nov 2024",
    readTime: 8,
    featured: false,
    keywords: ["primera vez europa", "errores viaje europa", "consejos viajeros"],
  },
  {
    id: "croissants-paris",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Mejores Croissants de Paris: Top 10 Boulangeries", en: "Best Croissants in Paris: Top 10 Boulangeries" },
    excerpt: { es: "Donde encontrar los croissants mas deliciosos de Paris segun los parisinos.", en: "Where to find the most delicious croissants in Paris according to Parisians." },
    category: "gastronomia",
    categoryLabel: { es: "Gastronomia", en: "Gastronomy" },
    date: "8 Nov 2024",
    readTime: 6,
    featured: false,
    keywords: ["croissants paris", "boulangeries paris", "desayuno paris"],
  },
  {
    id: "portugal-10-dias",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Portugal en 10 Dias: Lisboa, Porto, Algarve y Sintra", en: "Portugal in 10 Days: Lisbon, Porto, Algarve and Sintra" },
    excerpt: { es: "El pais mas accesible de Europa. Itinerario completo, precios y consejos.", en: "Europe's most accessible country. Complete itinerary, prices and tips." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "6 Nov 2024",
    readTime: 11,
    featured: false,
    keywords: ["portugal 10 dias", "itinerario portugal", "lisboa porto"],
  },
  {
    id: "compras-europa",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Shopping en Europa: Tax Free, Outlets y Mejores Zonas", en: "Shopping in Europe: Tax Free, Outlets and Best Areas" },
    excerpt: { es: "Como aprovechar el Tax Free, los mejores outlets y zonas de compras por ciudad.", en: "How to take advantage of Tax Free, the best outlets and shopping areas by city." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money" },
    date: "4 Nov 2024",
    readTime: 9,
    featured: false,
    keywords: ["compras europa", "tax free europa", "outlets europa"],
  },
  {
    id: "cinque-terre-guia",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Cinque Terre: Las 5 Aldeas Coloridas de Italia", en: "Cinque Terre: Italy's 5 Colorful Villages" },
    excerpt: { es: "Riomaggiore, Manarola, Corniglia, Vernazza y Monterosso. Como visitarlas en un dia.", en: "Riomaggiore, Manarola, Corniglia, Vernazza and Monterosso. How to visit them in one day." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "2 Nov 2024",
    readTime: 8,
    featured: false,
    keywords: ["cinque terre", "cinco tierras italia", "aldeas coloridas"],
  },
  {
    id: "documentos-viajar-europa",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Documentos para Viajar a Europa: Checklist Completo 2025", en: "Documents for Traveling to Europe: Complete Checklist 2025" },
    excerpt: { es: "Pasaporte, visa, seguro, reservas de hotel. Todo lo que necesitas para pasar inmigracion sin problemas.", en: "Passport, visa, insurance, hotel reservations. Everything you need to pass immigration smoothly." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning" },
    date: "30 Oct 2024",
    readTime: 7,
    featured: false,
    keywords: ["documentos viajar europa", "requisitos viaje europa", "checklist europa"],
  },
  {
    id: "mejor-epoca-europa",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Mejor Epoca para Viajar a Europa por Destino", en: "Best Time to Travel to Europe by Destination" },
    excerpt: { es: "Cuando visitar cada pais segun el clima, precios y temporadas. Evita multitudes y ahorra dinero.", en: "When to visit each country based on weather, prices and seasons. Avoid crowds and save money." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips" },
    date: "28 Oct 2024",
    readTime: 9,
    featured: false,
    keywords: ["mejor epoca europa", "cuando viajar europa", "temporada europa"],
  },
  {
    id: "wifi-europa-datos",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    title: { es: "WiFi y Datos Moviles en Europa: eSIM vs Roaming", en: "WiFi and Mobile Data in Europe: eSIM vs Roaming" },
    excerpt: { es: "Las mejores opciones para tener internet en Europa. eSIM, chips locales y como evitar cargos sorpresa.", en: "The best options for internet in Europe. eSIM, local chips and how to avoid surprise charges." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips" },
    date: "26 Oct 2024",
    readTime: 6,
    featured: false,
    keywords: ["wifi europa", "datos moviles europa", "internet europa"],
  },
  {
    id: "moneda-europa-cambio",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Cambio de Moneda en Europa: Euros, Tarjetas y ATMs", en: "Currency Exchange in Europe: Euros, Cards and ATMs" },
    excerpt: { es: "Donde cambiar dinero, que tarjetas usar y como evitar comisiones bancarias en Europa.", en: "Where to exchange money, which cards to use and how to avoid bank fees in Europe." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money" },
    date: "24 Oct 2024",
    readTime: 7,
    featured: false,
    keywords: ["moneda europa", "cambio euro", "tarjetas europa ATM"],
  },
  {
    id: "hoteles-baratos-europa",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Hoteles Baratos en Europa: Trucos para Ahorrar", en: "Cheap Hotels in Europe: Tricks to Save" },
    excerpt: { es: "Como encontrar alojamiento economico sin sacrificar calidad. Booking hacks y alternativas.", en: "How to find budget accommodation without sacrificing quality. Booking hacks and alternatives." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money" },
    date: "22 Oct 2024",
    readTime: 8,
    featured: false,
    keywords: ["hoteles baratos europa", "alojamiento economico", "donde hospedarse"],
  },
  {
    id: "pasaporte-europa-requisitos",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Requisitos del Pasaporte para Viajar a Europa 2025", en: "Passport Requirements for Traveling to Europe 2025" },
    excerpt: { es: "Vigencia minima, paginas en blanco, renovacion y casos especiales para pasaportes latinoamericanos.", en: "Minimum validity, blank pages, renewal and special cases for Latin American passports." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning" },
    date: "20 Oct 2024",
    readTime: 6,
    featured: false,
    keywords: ["pasaporte europa", "requisitos pasaporte", "vigencia pasaporte"],
  },
  {
    id: "eurail-pass-guia",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Eurail Pass: Vale la Pena? Guia Completa 2025", en: "Eurail Pass: Is It Worth It? Complete Guide 2025" },
    excerpt: { es: "Tipos de pases, precios, como reservar asientos y en que casos conviene comprarlo.", en: "Types of passes, prices, how to reserve seats and when it's worth buying." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money" },
    date: "18 Oct 2024",
    readTime: 10,
    featured: false,
    keywords: ["eurail pass", "tren europa", "transporte europa"],
  },
  {
    id: "que-comer-europa",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Que Comer en Europa: Platos Tipicos por Pais", en: "What to Eat in Europe: Typical Dishes by Country" },
    excerpt: { es: "Los platos imperdibles de cada pais europeo. Donde probarlos y cuanto cuestan.", en: "Must-try dishes from each European country. Where to try them and how much they cost." },
    category: "gastronomia",
    categoryLabel: { es: "Gastronomia", en: "Gastronomy" },
    date: "16 Oct 2024",
    readTime: 11,
    featured: false,
    keywords: ["que comer europa", "gastronomia europa", "platos tipicos"],
  },
  {
    id: "enchufes-europa-adaptadores",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Enchufes en Europa: Que Adaptador Necesitas", en: "Plugs in Europe: What Adapter Do You Need" },
    excerpt: { es: "Tipos de enchufes por pais, adaptadores universales y como cargar todos tus dispositivos.", en: "Plug types by country, universal adapters and how to charge all your devices." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips" },
    date: "14 Oct 2024",
    readTime: 5,
    featured: false,
    keywords: ["enchufes europa", "adaptador viaje", "voltaje europa"],
  },
  {
    id: "apps-viaje-europa",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    title: { es: "10 Apps Imprescindibles para Viajar a Europa", en: "10 Essential Apps for Traveling to Europe" },
    excerpt: { es: "Google Maps offline, traductores, transporte, restaurantes y mas. Las apps que necesitas.", en: "Google Maps offline, translators, transport, restaurants and more. The apps you need." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips" },
    date: "12 Oct 2024",
    readTime: 7,
    featured: false,
    keywords: ["apps viaje europa", "aplicaciones viajeros", "google maps offline"],
  },
  {
    id: "venecia-sin-perderse",
    image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Venecia en 2 Dias: Como No Perderse en la Ciudad", en: "Venice in 2 Days: How Not to Get Lost in the City" },
    excerpt: { es: "Rutas a pie, gondolas, murano y burano. El itinerario perfecto sin perderte.", en: "Walking routes, gondolas, Murano and Burano. The perfect itinerary without getting lost." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "10 Oct 2024",
    readTime: 8,
    featured: false,
    keywords: ["venecia 2 dias", "que ver venecia", "itinerario venecia"],
  },
  {
    id: "visa-schengen-brasil-2025",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Brasileiros na Europa: Guia Completo Sem Visto", en: "Brazilians in Europe: Complete Guide Without Visa" },
    excerpt: { es: "Brasileiros nao precisam de visto Schengen! Documentos, seguro e dicas para sua viagem.", en: "Brazilians don't need Schengen visa! Documents, insurance and tips for your trip." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning" },
    date: "8 Oct 2024",
    readTime: 9,
    featured: false,
    keywords: ["brasileiros europa", "brasil schengen", "viajar europa brasil"],
  },
  {
    id: "viena-3-dias",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Viena en 3 Dias: Palacios, Musica y Cafes", en: "Vienna in 3 Days: Palaces, Music and Cafes" },
    excerpt: { es: "Schonbrunn, Opera, Prater y los mejores cafes vieneses. Itinerario completo.", en: "Schonbrunn, Opera, Prater and the best Viennese cafes. Complete itinerary." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "6 Oct 2024",
    readTime: 8,
    featured: false,
    keywords: ["viena 3 dias", "que hacer viena", "itinerario viena"],
  },
  {
    id: "florencia-arte-guia",
    image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Florencia para Amantes del Arte: Guia Completa", en: "Florence for Art Lovers: Complete Guide" },
    excerpt: { es: "Uffizi, David de Miguel Angel, Duomo. Como ver las obras maestras sin filas.", en: "Uffizi, Michelangelo's David, Duomo. How to see the masterpieces without queues." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "4 Oct 2024",
    readTime: 9,
    featured: false,
    keywords: ["florencia arte", "uffizi", "museos florencia"],
  },
  {
    id: "berlin-muro-historia",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Berlin Historico: El Muro y la Guerra Fria", en: "Historic Berlin: The Wall and the Cold War" },
    excerpt: { es: "Checkpoint Charlie, East Side Gallery, memoriales. La historia que debes conocer.", en: "Checkpoint Charlie, East Side Gallery, memorials. The history you need to know." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "2 Oct 2024",
    readTime: 10,
    featured: false,
    keywords: ["berlin muro", "historia berlin", "guerra fria berlin"],
  },
  {
    id: "escocia-highlands",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Escocia: Highlands, Castillos y Whisky en 7 Dias", en: "Scotland: Highlands, Castles and Whisky in 7 Days" },
    excerpt: { es: "Edimburgo, Loch Ness, Isle of Skye. Ruta por las tierras altas escocesas.", en: "Edinburgh, Loch Ness, Isle of Skye. Route through the Scottish Highlands." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "30 Sep 2024",
    readTime: 11,
    featured: false,
    keywords: ["escocia highlands", "castillos escocia", "whisky tour"],
  },
  {
    id: "croatia-costa-dalmatia",
    image: "https://images.unsplash.com/photo-1555990538-1e6f13e0e101?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Croacia: Dubrovnik, Split y las Islas Dalmacias", en: "Croatia: Dubrovnik, Split and the Dalmatian Islands" },
    excerpt: { es: "El destino de moda en Europa. Playas, Game of Thrones y islas paradisiacas.", en: "Europe's trending destination. Beaches, Game of Thrones and paradise islands." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "28 Sep 2024",
    readTime: 9,
    featured: false,
    keywords: ["croacia dubrovnik", "costa dalmatia", "islas croacia"],
  },
  {
    id: "noruega-fiordos",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Fiordos Noruegos: Guia para Latinoamericanos", en: "Norwegian Fjords: Guide for Latin Americans" },
    excerpt: { es: "Bergen, Flam, Geirangerfjord. Como ver los fiordos sin gastar una fortuna.", en: "Bergen, Flam, Geirangerfjord. How to see the fjords without spending a fortune." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "26 Sep 2024",
    readTime: 10,
    featured: false,
    keywords: ["fiordos noruegos", "noruega guia", "bergen flam"],
  },
  {
    id: "malta-playas-historia",
    image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Malta: Playas, Historia y Cursos de Ingles", en: "Malta: Beaches, History and English Courses" },
    excerpt: { es: "La Valeta, Mdina, Blue Lagoon. El destino perfecto para combinar playa y cultura.", en: "Valletta, Mdina, Blue Lagoon. The perfect destination to combine beach and culture." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "24 Sep 2024",
    readTime: 8,
    featured: false,
    keywords: ["malta playas", "que hacer malta", "cursos ingles malta"],
  },
  {
    id: "viaje-familia-europa-ninos",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Viajar a Europa con Ninos: Guia Completa para Familias", en: "Traveling to Europe with Kids: Complete Family Guide" },
    excerpt: { es: "Destinos family-friendly, tips para vuelos largos, parques de atracciones y actividades para todas las edades.", en: "Family-friendly destinations, tips for long flights, theme parks and activities for all ages." },
    category: "experiencias",
    categoryLabel: { es: "Experiencias", en: "Experiences" },
    date: "22 Sep 2024",
    readTime: 12,
    featured: false,
    keywords: ["viaje familia europa", "europa con ninos", "vacaciones familiares"],
  },
  {
    id: "amsterdam-4-dias",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Amsterdam en 4 Dias: Canales, Museos y Vida Nocturna", en: "Amsterdam in 4 Days: Canals, Museums and Nightlife" },
    excerpt: { es: "Van Gogh, Anne Frank, coffee shops. Todo lo que debes ver en la capital holandesa.", en: "Van Gogh, Anne Frank, coffee shops. Everything you must see in the Dutch capital." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "20 Sep 2024",
    readTime: 9,
    featured: false,
    keywords: ["amsterdam 4 dias", "que ver amsterdam", "itinerario amsterdam"],
  },
  {
    id: "brujas-gante-dia",
    image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Brujas y Gante en un Dia desde Bruselas", en: "Bruges and Ghent in One Day from Brussels" },
    excerpt: { es: "Las joyas medievales de Belgica. Como visitarlas en una excursion perfecta.", en: "Belgium's medieval gems. How to visit them in a perfect day trip." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "18 Sep 2024",
    readTime: 7,
    featured: false,
    keywords: ["brujas gante", "excursion bruselas", "belgica medieval"],
  },
  {
    id: "londres-bajo-presupuesto",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Londres con Bajo Presupuesto: Guia para Ahorrar", en: "London on a Budget: Guide to Save Money" },
    excerpt: { es: "Museos gratis, transporte economico, donde comer barato. Londres sin gastar una fortuna.", en: "Free museums, cheap transport, where to eat cheaply. London without spending a fortune." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money" },
    date: "16 Sep 2024",
    readTime: 10,
    featured: false,
    keywords: ["londres barato", "presupuesto londres", "ahorrar londres"],
  },
  {
    id: "toscana-5-dias-ruta",
    image: "https://images.unsplash.com/photo-1523528283115-9bf9b1699245?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Ruta por la Toscana en 5 Dias: Vino, Arte y Paisajes", en: "Tuscany Route in 5 Days: Wine, Art and Landscapes" },
    excerpt: { es: "Siena, San Gimignano, Chianti, Montepulciano. La ruta perfecta por la campiña italiana.", en: "Siena, San Gimignano, Chianti, Montepulciano. The perfect route through the Italian countryside." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "14 Sep 2024",
    readTime: 11,
    featured: false,
    keywords: ["toscana 5 dias", "ruta toscana", "vino toscana"],
  },
  {
    id: "munich-neuschwanstein",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Munich y Neuschwanstein: Castillos de Cuento", en: "Munich and Neuschwanstein: Fairy Tale Castles" },
    excerpt: { es: "El castillo que inspiro a Disney. Como visitarlo desde Munich en un dia.", en: "The castle that inspired Disney. How to visit it from Munich in one day." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations" },
    date: "12 Sep 2024",
    readTime: 8,
    featured: false,
    keywords: ["neuschwanstein", "castillos alemania", "munich excursion"],
  },
];

export default function Blog() {
  const { language } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, language]);

  const featuredPosts = BLOG_POSTS.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BlogPageSEO />
      <Header />
      
      <section className="relative py-32 bg-primary overflow-hidden" data-testid="section-blog-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=60&w=1200&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-blog">
            {language === "es" ? "Blog de Viajes" : "Travel Blog"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-blog-title">
            {language === "es" ? "Guias y Consejos para tu Viaje a Europa" : "Guides and Tips for Your Trip to Europe"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto" data-testid="text-blog-subtitle">
            {language === "es" 
              ? "Visa Schengen, presupuestos, itinerarios y experiencias reales de viajeros latinoamericanos" 
              : "Schengen visa, budgets, itineraries and real experiences from Latin American travelers"}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b" data-testid="section-featured-posts">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent" />
            {language === "es" ? "Articulos Destacados" : "Featured Articles"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-featured-${post.id}`}>
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img 
                    src={post.image} 
                    alt={post.title[language]} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <Badge className="absolute top-4 left-4 bg-accent text-primary">{post.categoryLabel[language]}</Badge>
                  <Badge className="absolute top-4 right-4 bg-primary text-white">
                    {language === "es" ? "Destacado" : "Featured"}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title[language]}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt[language]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-accent" data-testid="section-vacaciones-europa-banner">
        <div className="container mx-auto px-4">
          <Link href="/vacaciones-europa">
            <Card className="bg-primary/95 border-accent/30 hover:bg-primary transition-all cursor-pointer overflow-hidden" data-testid="link-vacaciones-europa">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                    <img 
                      src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=600&auto=format&fit=crop" 
                      alt="Vacaciones para Europa" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/90 md:block hidden" />
                  </div>
                  <div className="flex-1 p-6 md:p-8 text-center md:text-left">
                    <Badge className="bg-accent text-primary mb-3">
                      {language === "es" ? "Seccion Especial" : "Special Section"}
                    </Badge>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-accent mb-2">
                      {language === "es" ? "Vacaciones para Europa" : "European Vacations"}
                    </h3>
                    <p className="text-white/80 mb-4 max-w-lg">
                      {language === "es" 
                        ? "Descubre paquetes, destinos, circuitos y todo lo que necesitas para planear tus vacaciones europeas perfectas." 
                        : "Discover packages, destinations, circuits and everything you need to plan your perfect European vacation."}
                    </p>
                    <Button className="bg-accent text-primary hover:bg-accent/90">
                      {language === "es" ? "Explorar Vacaciones" : "Explore Vacations"} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-primary to-primary/90" data-testid="section-country-blogs">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-accent flex items-center gap-2">
              <Globe className="w-6 h-6" />
              {language === "es" ? "Guias por Pais" : "Country Guides"}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <Link href="/blog/colombia">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-colombia">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Colombia</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/mexico">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-mexico">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Mexico</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/brasil">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-brasil">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Brasil</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/argentina">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-argentina">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Argentina</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/peru">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-peru">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Peru</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/panama">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-panama">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Panama</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/costa-rica">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-costa-rica">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Costa Rica</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/dominicana">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-dominicana">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">R. Dominicana</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/caribe">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-caribe">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Caribe</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Regional" : "Regional Guide"}</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b" data-testid="section-blog-filters">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={language === "es" ? "Buscar articulos..." : "Search articles..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  data-testid="input-blog-search"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {BLOG_CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="whitespace-nowrap gap-1.5"
                  data-testid={`button-category-${cat.id}`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label[language]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-blog-grid">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {language === "es" ? "No hay articulos que coincidan con tu busqueda" : "No articles match your search"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-blog-${post.id}`}>
                  <div className="relative h-52 overflow-hidden bg-muted">
                    <img 
                      src={post.image} 
                      alt={post.title[language]} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent text-primary">{post.categoryLabel[language]}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span data-testid={`text-date-${post.id}`}>{post.date}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span data-testid={`text-readtime-${post.id}`}>{post.readTime} min</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-display font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors" data-testid={`text-title-${post.id}`}>
                      {post.title[language]}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-5 line-clamp-3" data-testid={`text-excerpt-${post.id}`}>{post.excerpt[language]}</p>
                    
                    <Button className="w-full gap-2" data-testid={`button-blog-${post.id}`}>
                      {language === "es" ? "Leer articulo" : "Read article"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-accent/10" data-testid="section-blog-topics">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-center mb-8">
            {language === "es" ? "Temas Populares" : "Popular Topics"}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Visa Schengen", "Paris", "Roma", "Barcelona", "Presupuesto", "Luna de Miel", "Hoteles Lujo", "Vuelos Baratos", "Gastronomia", "Itinerarios", "Seguro Viaje", "eSIM Europa"].map((topic, idx) => (
              <Badge key={idx} variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-accent hover:text-primary transition-colors" data-testid={`badge-topic-${idx}`}>
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-blog-newsletter">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
            {language === "es" ? "Newsletter Exclusivo" : "Exclusive Newsletter"}
          </Badge>
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            {language === "es" ? "Recibe Guias y Ofertas Exclusivas" : "Receive Guides and Exclusive Offers"}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {language === "es" 
              ? "Suscribete y recibe nuestra guia PDF gratuita: 'Top 10 Ciudades Imprescindibles de Europa' + descuento 10% en tu primer viaje" 
              : "Subscribe and receive our free PDF guide: 'Top 10 Must-See Cities in Europe' + 10% discount on your first trip"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder={language === "es" ? "Tu correo electronico" : "Your email address"}
              className="flex-1 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-accent"
              data-testid="input-newsletter-email"
            />
            <Button className="bg-accent text-primary hover:bg-accent/90" data-testid="button-newsletter-subscribe">
              {language === "es" ? "Suscribirse" : "Subscribe"}
            </Button>
          </div>
          <p className="text-white/50 text-xs mt-4">
            {language === "es" ? "Sin spam. Puedes darte de baja cuando quieras." : "No spam. You can unsubscribe anytime."}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
