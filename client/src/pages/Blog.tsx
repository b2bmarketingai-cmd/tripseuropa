import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogPageSEO } from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, TrendingUp, BookOpen, Plane, MapPin, CreditCard, Heart, Utensils, Globe, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import { BLOG_POSTS_DATA } from "@/lib/blogData";
import { BLOG_POSTS_SIMPLE } from "./BlogPostsSimple";
import { FloatingContactButtons } from "@/components/support";
import { useToast } from "@/hooks/use-toast";

const BLOG_CATEGORIES = [
  { id: "all", label: { es: "Todos", en: "All", pt: "Todos" }, icon: BookOpen },
  { id: "destinos", label: { es: "Destinos", en: "Destinations", pt: "Destinos" }, icon: MapPin },
  { id: "planificacion", label: { es: "Planificacion", en: "Planning", pt: "Planejamento" }, icon: Plane },
  { id: "lujo", label: { es: "Lujo", en: "Luxury", pt: "Luxo" }, icon: Heart },
  { id: "dinero", label: { es: "Dinero", en: "Money", pt: "Dinheiro" }, icon: CreditCard },
  { id: "consejos", label: { es: "Consejos", en: "Tips", pt: "Dicas" }, icon: TrendingUp },
  { id: "gastronomia", label: { es: "Gastronomia", en: "Gastronomy", pt: "Gastronomia" }, icon: Utensils },
];

const BLOG_POSTS = [
  {
    id: "circuito-balcanes",
    image: "https://images.unsplash.com/photo-1590412200988-a40c4e4cc53b?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Circuito Balcanes: Descubre 10 Naciones en un Solo Viaje", en: "Balkans Circuit: Discover 10 Nations in One Trip", pt: "Circuito Balcas: Descubra 10 Nacoes em Uma So Viagem" },
    excerpt: { es: "Bulgaria, Grecia, Macedonia, Albania, Montenegro, Croacia, Bosnia y Serbia. La ruta mas completa por los Balcanes europeos.", en: "Bulgaria, Greece, Macedonia, Albania, Montenegro, Croatia, Bosnia and Serbia. The most complete route through the European Balkans.", pt: "Bulgaria, Grecia, Macedonia, Albania, Montenegro, Croacia, Bosnia e Servia. A rota mais completa pelos Balcas europeus." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "29 Dic 2024",
    readTime: 14,
    featured: true,
    keywords: ["balcanes europa", "circuito balcanes", "croacia montenegro albania"],
  },
  {
    id: "colores-de-europa",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Colores de Europa: Tour por Francia, España e Italia", en: "Colors of Europe: Tour through France, Spain and Italy", pt: "Cores da Europa: Tour pela Franca, Espanha e Italia" },
    excerpt: { es: "Paris, Barcelona, Roma y mas. El circuito clasico que combina lo mejor de tres paises iconicos.", en: "Paris, Barcelona, Rome and more. The classic circuit combining the best of three iconic countries.", pt: "Paris, Barcelona, Roma e mais. O circuito classico que combina o melhor de tres paises iconicos." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "29 Dic 2024",
    readTime: 12,
    featured: true,
    keywords: ["tour europa clasico", "francia espana italia", "circuito europa"],
  },
  {
    id: "encanto-mediterraneo",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Encanto Mediterraneo: Italia, Francia y España Costera", en: "Mediterranean Charm: Coastal Italy, France and Spain", pt: "Encanto Mediterraneo: Italia, Franca e Espanha Costeira" },
    excerpt: { es: "Costa Amalfitana, Riviera Francesa, Costa Brava. Las costas mas hermosas del Mediterraneo en un viaje.", en: "Amalfi Coast, French Riviera, Costa Brava. The most beautiful Mediterranean coasts in one trip.", pt: "Costa Amalfitana, Riviera Francesa, Costa Brava. As costas mais bonitas do Mediterraneo em uma viagem." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "28 Dic 2024",
    readTime: 11,
    featured: true,
    keywords: ["mediterraneo europa", "costa amalfitana", "riviera francesa"],
  },
  {
    id: "ciudades-imperiales",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Ciudades Imperiales: Viena, Praga, Budapest y Estambul", en: "Imperial Cities: Vienna, Prague, Budapest and Istanbul", pt: "Cidades Imperiais: Viena, Praga, Budapeste e Istambul" },
    excerpt: { es: "El legado de los grandes imperios europeos. Palacios, catedrales, puentes y cultura en un circuito inolvidable.", en: "The legacy of great European empires. Palaces, cathedrals, bridges and culture in an unforgettable circuit.", pt: "O legado dos grandes imperios europeus. Palacios, catedrais, pontes e cultura em um circuito inesquecivel." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "28 Dic 2024",
    readTime: 13,
    featured: false,
    keywords: ["ciudades imperiales", "praga budapest viena", "europa central"],
  },
  {
    id: "turquia-capadocia",
    image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Turquia Magica: Estambul, Capadocia y la Ruta Otomana", en: "Magical Turkey: Istanbul, Cappadocia and the Ottoman Route", pt: "Turquia Magica: Istambul, Capadocia e a Rota Otomana" },
    excerpt: { es: "Globos aerostaticos, mezquitas, bazares y paisajes lunares. Turquia es el puente entre Europa y Asia.", en: "Hot air balloons, mosques, bazaars and lunar landscapes. Turkey is the bridge between Europe and Asia.", pt: "Baloes de ar quente, mesquitas, bazares e paisagens lunares. A Turquia e a ponte entre Europa e Asia." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "27 Dic 2024",
    readTime: 10,
    featured: false,
    keywords: ["turquia viaje", "capadocia globos", "estambul turismo"],
  },
  {
    id: "italia-vespa",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Italia en Vespa: Recorre la Toscana Como un Local", en: "Italy by Vespa: Explore Tuscany Like a Local", pt: "Italia de Vespa: Percorra a Toscana Como um Local" },
    excerpt: { es: "Florencia, Siena, Chianti y pueblos medievales. La forma mas autentica de vivir la Toscana italiana.", en: "Florence, Siena, Chianti and medieval towns. The most authentic way to experience Italian Tuscany.", pt: "Florenca, Siena, Chianti e vilas medievais. A forma mais autentica de viver a Toscana italiana." },
    category: "lujo",
    categoryLabel: { es: "Lujo", en: "Luxury", pt: "Luxo" },
    date: "27 Dic 2024",
    readTime: 9,
    featured: false,
    keywords: ["italia vespa", "toscana tour", "florencia siena"],
  },
  {
    id: "mercados-navidenos",
    image: "https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Mercados Navidenos en Europa: Viena, Praga, Estrasburgo", en: "Christmas Markets in Europe: Vienna, Prague, Strasbourg", pt: "Mercados de Natal na Europa: Viena, Praga, Estrasburgo" },
    excerpt: { es: "Vin chaud, artesanias, luces y magia invernal. Los mejores mercados navidenos europeos para visitar.", en: "Mulled wine, crafts, lights and winter magic. The best European Christmas markets to visit.", pt: "Vinho quente, artesanato, luzes e magia de inverno. Os melhores mercados de Natal europeus para visitar." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "26 Dic 2024",
    readTime: 8,
    featured: false,
    keywords: ["mercados navidenos europa", "navidad viena praga", "invierno europa"],
  },
  {
    id: "ruta-del-amor",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Ruta del Amor: Paris y Madrid para Parejas", en: "Route of Love: Paris and Madrid for Couples", pt: "Rota do Amor: Paris e Madri para Casais" },
    excerpt: { es: "La ciudad del amor y la capital espanola. Dos destinos romanticos perfectos para una escapada en pareja.", en: "The city of love and the Spanish capital. Two perfect romantic destinations for a couple's getaway.", pt: "A cidade do amor e a capital espanhola. Dois destinos romanticos perfeitos para uma escapada a dois." },
    category: "lujo",
    categoryLabel: { es: "Lujo", en: "Luxury", pt: "Luxo" },
    date: "26 Dic 2024",
    readTime: 7,
    featured: false,
    keywords: ["paris madrid pareja", "viaje romantico europa", "luna de miel"],
  },
  {
    id: "visa-schengen-colombia-2025",
    image: "https://images.unsplash.com/photo-1569254184391-fefaab4c4c22?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Guia Completa: Visa Schengen para Colombianos 2025", en: "Complete Guide: Schengen Visa for Colombians 2025", pt: "Guia Completo: Visto Schengen para Colombianos 2025" },
    excerpt: { es: "Requisitos actualizados, documentos necesarios, costo, tiempo de tramite y consejos para aprobar tu visa Schengen desde Colombia.", en: "Updated requirements, necessary documents, cost, processing time and tips to get your Schengen visa from Colombia approved.", pt: "Requisitos atualizados, documentos necessarios, custo, tempo de tramitacao e dicas para aprovar seu visto Schengen da Colombia." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning", pt: "Planejamento" },
    date: "25 Dic 2024",
    readTime: 12,
    featured: false,
    keywords: ["visa schengen colombia", "requisitos visa europa", "visa schengen 2025"],
  },
  {
    id: "paris-5-dias-guia",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Paris en 5 Dias: Itinerario Perfecto para Colombianos", en: "Paris in 5 Days: Perfect Itinerary for Colombians", pt: "Paris em 5 Dias: Roteiro Perfeito para Brasileiros" },
    excerpt: { es: "Torre Eiffel, Louvre, Versalles, Montmartre y mas. El itinerario dia a dia para aprovechar Paris al maximo.", en: "Eiffel Tower, Louvre, Versailles, Montmartre and more. The day by day itinerary to make the most of Paris.", pt: "Torre Eiffel, Louvre, Versalhes, Montmartre e mais. O roteiro dia a dia para aproveitar Paris ao maximo." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "26 Dic 2024",
    readTime: 10,
    featured: true,
    keywords: ["paris 5 dias", "itinerario paris", "que hacer en paris"],
  },
  {
    id: "presupuesto-viaje-europa-2025",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Cuanto Cuesta Viajar a Europa en 2025? Presupuesto Real", en: "How Much Does It Cost to Travel to Europe in 2025? Real Budget", pt: "Quanto Custa Viajar para Europa em 2025? Orcamento Real" },
    excerpt: { es: "Desglose completo: vuelos, hoteles, comida, transporte y actividades. Presupuesto para 7, 14 y 21 dias.", en: "Complete breakdown: flights, hotels, food, transport and activities. Budget for 7, 14 and 21 days.", pt: "Detalhamento completo: voos, hoteis, comida, transporte e atividades. Orcamento para 7, 14 e 21 dias." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money", pt: "Dinheiro" },
    date: "24 Dic 2024",
    readTime: 15,
    featured: true,
    keywords: ["presupuesto europa", "cuanto cuesta europa", "viaje europa precio"],
  },
  {
    id: "hoteles-lujo-paris",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop",
    title: { es: "10 Hoteles de Lujo Imperdibles en Paris 2025", en: "10 Must-Stay Luxury Hotels in Paris 2025", pt: "10 Hoteis de Luxo Imperdiveis em Paris 2025" },
    excerpt: { es: "Ritz, Four Seasons, Le Bristol y mas. Los hoteles mas exclusivos de Paris con vista a la Torre Eiffel.", en: "Ritz, Four Seasons, Le Bristol and more. The most exclusive Paris hotels with Eiffel Tower views.", pt: "Ritz, Four Seasons, Le Bristol e mais. Os hoteis mais exclusivos de Paris com vista para a Torre Eiffel." },
    category: "lujo",
    categoryLabel: { es: "Lujo", en: "Luxury", pt: "Luxo" },
    date: "22 Dic 2024",
    readTime: 8,
    featured: false,
    keywords: ["hoteles lujo paris", "mejores hoteles paris", "donde alojarse paris"],
  },
  {
    id: "madrid-vs-barcelona",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Madrid vs Barcelona: Cual Elegir para tu Primer Viaje?", en: "Madrid vs Barcelona: Which One to Choose for Your First Trip?", pt: "Madri vs Barcelona: Qual Escolher para sua Primeira Viagem?" },
    excerpt: { es: "Comparativa completa: clima, costo, atracciones, gastronomia y ambiente. Te ayudamos a decidir.", en: "Complete comparison: weather, cost, attractions, gastronomy and atmosphere. We help you decide.", pt: "Comparacao completa: clima, custo, atracoes, gastronomia e ambiente. Ajudamos voce a decidir." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "20 Dic 2024",
    readTime: 9,
    featured: false,
    keywords: ["madrid o barcelona", "españa primer viaje", "madrid barcelona diferencias"],
  },
  {
    id: "seguro-viaje-europa",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Seguro de Viaje para Europa: Cual Elegir y Por Que es Obligatorio", en: "Travel Insurance for Europe: Which to Choose and Why It's Mandatory", pt: "Seguro Viagem para Europa: Qual Escolher e Por Que e Obrigatorio" },
    excerpt: { es: "Requisitos Schengen, coberturas necesarias, mejores companias y como reclamar si lo necesitas.", en: "Schengen requirements, necessary coverage, best companies and how to claim if you need it.", pt: "Requisitos Schengen, coberturas necessarias, melhores empresas e como solicitar se precisar." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning", pt: "Planejamento" },
    date: "18 Dic 2024",
    readTime: 7,
    featured: false,
    keywords: ["seguro viaje europa", "seguro schengen", "seguro viaje obligatorio"],
  },
  {
    id: "roma-3-dias",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Roma en 3 Dias: Coliseo, Vaticano y Trastevere", en: "Rome in 3 Days: Colosseum, Vatican and Trastevere", pt: "Roma em 3 Dias: Coliseu, Vaticano e Trastevere" },
    excerpt: { es: "Itinerario optimizado para ver lo mejor de Roma. Evita filas, mejores horarios y tips locales.", en: "Optimized itinerary to see the best of Rome. Skip lines, best times and local tips.", pt: "Roteiro otimizado para ver o melhor de Roma. Evite filas, melhores horarios e dicas locais." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "16 Dic 2024",
    readTime: 8,
    featured: false,
    keywords: ["roma 3 dias", "que hacer en roma", "itinerario roma"],
  },
  {
    id: "vuelos-baratos-europa",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Como Conseguir Vuelos Baratos a Europa desde Colombia", en: "How to Get Cheap Flights to Europe from Colombia", pt: "Como Conseguir Voos Baratos para Europa do Brasil" },
    excerpt: { es: "Mejores epocas, aerolineas, buscadores y trucos para ahorrar hasta 40% en tus vuelos.", en: "Best times, airlines, search engines and tricks to save up to 40% on your flights.", pt: "Melhores epocas, companhias aereas, buscadores e truques para economizar ate 40% nos seus voos." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money", pt: "Dinheiro" },
    date: "14 Dic 2024",
    readTime: 10,
    featured: false,
    keywords: ["vuelos baratos europa", "pasajes europa", "vuelos colombia europa"],
  },
  {
    id: "restaurantes-michelin-paris",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Restaurantes Michelin en Paris: Guia para Latinoamericanos", en: "Michelin Restaurants in Paris: Guide for Latin Americans", pt: "Restaurantes Michelin em Paris: Guia para Latino-Americanos" },
    excerpt: { es: "Desde 2 hasta 3 estrellas. Reservas, dress code, precios y que esperar en una cena Michelin.", en: "From 2 to 3 stars. Reservations, dress code, prices and what to expect at a Michelin dinner.", pt: "De 2 a 3 estrelas. Reservas, codigo de vestimenta, precos e o que esperar em um jantar Michelin." },
    category: "gastronomia",
    categoryLabel: { es: "Gastronomia", en: "Gastronomy", pt: "Gastronomia" },
    date: "12 Dic 2024",
    readTime: 9,
    featured: false,
    keywords: ["restaurantes michelin paris", "cena lujo paris", "gastronomia paris"],
  },
  {
    id: "esim-europa-guia",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    title: { es: "eSIM en Europa: Internet Ilimitado sin Roaming", en: "eSIM in Europe: Unlimited Internet without Roaming", pt: "eSIM na Europa: Internet Ilimitada sem Roaming" },
    excerpt: { es: "Mejores opciones de eSIM, como activarla, precios y por que es mejor que el roaming tradicional.", en: "Best eSIM options, how to activate it, prices and why it's better than traditional roaming.", pt: "Melhores opcoes de eSIM, como ativar, precos e por que e melhor que o roaming tradicional." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips", pt: "Dicas" },
    date: "10 Dic 2024",
    readTime: 6,
    featured: false,
    keywords: ["esim europa", "internet europa", "roaming europa"],
  },
  {
    id: "amsterdam-tulipanes",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Amsterdam y los Tulipanes: Mejor Epoca para Visitar", en: "Amsterdam and the Tulips: Best Time to Visit", pt: "Amsterda e as Tulipas: Melhor Epoca para Visitar" },
    excerpt: { es: "Keukenhof, campos de tulipanes, canales y museos. Todo lo que necesitas para tu viaje.", en: "Keukenhof, tulip fields, canals and museums. Everything you need for your trip.", pt: "Keukenhof, campos de tulipas, canais e museus. Tudo o que voce precisa para sua viagem." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "8 Dic 2024",
    readTime: 7,
    featured: false,
    keywords: ["amsterdam tulipanes", "keukenhof", "cuando visitar amsterdam"],
  },
  {
    id: "luna-miel-europa",
    image: "https://images.unsplash.com/photo-1529543544599-93aeb66b7c96?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Luna de Miel en Europa: 5 Destinos Romanticos", en: "Honeymoon in Europe: 5 Romantic Destinations", pt: "Lua de Mel na Europa: 5 Destinos Romanticos" },
    excerpt: { es: "Paris, Santorini, Venecia, Costa Amalfitana y Suiza. Los destinos mas romanticos para parejas.", en: "Paris, Santorini, Venice, Amalfi Coast and Switzerland. The most romantic destinations for couples.", pt: "Paris, Santorini, Veneza, Costa Amalfitana e Suica. Os destinos mais romanticos para casais." },
    category: "lujo",
    categoryLabel: { es: "Lujo", en: "Luxury", pt: "Luxo" },
    date: "6 Dic 2024",
    readTime: 8,
    featured: false,
    keywords: ["luna de miel europa", "destinos romanticos", "viaje parejas europa"],
  },
  {
    id: "que-empacar-europa",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Que Empacar para Europa: Checklist Completo", en: "What to Pack for Europe: Complete Checklist", pt: "O Que Levar para Europa: Checklist Completo" },
    excerpt: { es: "Ropa, documentos, tecnologia y accesorios. Lista descargable para no olvidar nada.", en: "Clothes, documents, technology and accessories. Downloadable list so you don't forget anything.", pt: "Roupas, documentos, tecnologia e acessorios. Lista para download para nao esquecer nada." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips", pt: "Dicas" },
    date: "4 Dic 2024",
    readTime: 6,
    featured: false,
    keywords: ["que empacar europa", "maleta europa", "checklist viaje"],
  },
  {
    id: "vinos-toscana",
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Ruta del Vino en Toscana: Guia Definitiva", en: "Wine Route in Tuscany: Definitive Guide", pt: "Rota do Vinho na Toscana: Guia Definitivo" },
    excerpt: { es: "Chianti, Brunello, Montepulciano. Las mejores bodegas, tours y experiencias enologicas.", en: "Chianti, Brunello, Montepulciano. The best wineries, tours and wine experiences.", pt: "Chianti, Brunello, Montepulciano. As melhores vinicolas, tours e experiencias enologicas." },
    category: "gastronomia",
    categoryLabel: { es: "Gastronomia", en: "Gastronomy", pt: "Gastronomia" },
    date: "2 Dic 2024",
    readTime: 10,
    featured: false,
    keywords: ["vinos toscana", "ruta vino italia", "bodegas toscana"],
  },
  {
    id: "transporte-europa",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Transporte en Europa: Trenes, Buses y Low Cost", en: "Transport in Europe: Trains, Buses and Low Cost", pt: "Transporte na Europa: Trens, Onibus e Low Cost" },
    excerpt: { es: "Eurail Pass, Flixbus, Ryanair. Como moverte por Europa de forma economica y eficiente.", en: "Eurail Pass, Flixbus, Ryanair. How to get around Europe economically and efficiently.", pt: "Eurail Pass, Flixbus, Ryanair. Como se locomover pela Europa de forma economica e eficiente." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money", pt: "Dinheiro" },
    date: "30 Nov 2024",
    readTime: 11,
    featured: false,
    keywords: ["transporte europa", "eurail pass", "como moverse europa"],
  },
  {
    id: "visa-schengen-mexico-2025",
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Visa Schengen para Mexicanos 2025: Guia Actualizada", en: "Schengen Visa for Mexicans 2025: Updated Guide", pt: "Visto Schengen para Mexicanos 2025: Guia Atualizado" },
    excerpt: { es: "Buenas noticias: Mexico NO necesita visa Schengen. Requisitos de entrada, documentos y consejos.", en: "Good news: Mexico does NOT need Schengen visa. Entry requirements, documents and tips.", pt: "Boas noticias: Mexico NAO precisa de visto Schengen. Requisitos de entrada, documentos e dicas." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning", pt: "Planejamento" },
    date: "28 Nov 2024",
    readTime: 8,
    featured: false,
    keywords: ["visa schengen mexico", "mexicanos europa", "visa europa mexico"],
  },
  {
    id: "barcelona-4-dias",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Barcelona en 4 Dias: Gaudi, Playa y Tapas", en: "Barcelona in 4 Days: Gaudi, Beach and Tapas", pt: "Barcelona em 4 Dias: Gaudi, Praia e Tapas" },
    excerpt: { es: "Sagrada Familia, Park Guell, La Barceloneta y el Barrio Gotico. Itinerario perfecto.", en: "Sagrada Familia, Park Guell, La Barceloneta and Gothic Quarter. Perfect itinerary.", pt: "Sagrada Familia, Park Guell, La Barceloneta e Bairro Gotico. Roteiro perfeito." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "26 Nov 2024",
    readTime: 9,
    featured: false,
    keywords: ["barcelona 4 dias", "que ver barcelona", "itinerario barcelona"],
  },
  {
    id: "londres-sin-visa",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Londres sin Visa: Guia para Latinoamericanos", en: "London without Visa: Guide for Latin Americans", pt: "Londres sem Visto: Guia para Latino-Americanos" },
    excerpt: { es: "Requisitos de entrada al Reino Unido, documentos, ETA y consejos para evitar problemas en inmigracion.", en: "UK entry requirements, documents, ETA and tips to avoid immigration problems.", pt: "Requisitos de entrada no Reino Unido, documentos, ETA e dicas para evitar problemas na imigracao." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning", pt: "Planejamento" },
    date: "24 Nov 2024",
    readTime: 10,
    featured: false,
    keywords: ["londres sin visa", "uk visa latinoamerica", "entrar reino unido"],
  },
  {
    id: "praga-budapest-viena",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Praga, Budapest y Viena: Circuito Imperial 10 Dias", en: "Prague, Budapest and Vienna: Imperial Circuit 10 Days", pt: "Praga, Budapeste e Viena: Circuito Imperial 10 Dias" },
    excerpt: { es: "El circuito europeo mas popular. Itinerario, transporte, hoteles y presupuesto detallado.", en: "The most popular European circuit. Itinerary, transport, hotels and detailed budget.", pt: "O circuito europeu mais popular. Roteiro, transporte, hoteis e orcamento detalhado." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "22 Nov 2024",
    readTime: 12,
    featured: false,
    keywords: ["praga budapest viena", "circuito imperial", "europa del este"],
  },
  {
    id: "costa-amalfitana",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Costa Amalfitana: Positano, Amalfi y Ravello", en: "Amalfi Coast: Positano, Amalfi and Ravello", pt: "Costa Amalfitana: Positano, Amalfi e Ravello" },
    excerpt: { es: "El destino mas fotografiado de Italia. Como llegar, donde alojarse y que hacer.", en: "Italy's most photographed destination. How to get there, where to stay and what to do.", pt: "O destino mais fotografado da Italia. Como chegar, onde se hospedar e o que fazer." },
    category: "lujo",
    categoryLabel: { es: "Lujo", en: "Luxury", pt: "Luxo" },
    date: "20 Nov 2024",
    readTime: 9,
    featured: false,
    keywords: ["costa amalfitana", "positano", "amalfi italia"],
  },
  {
    id: "santorini-mikonos",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Santorini y Mykonos: Islas Griegas en 7 Dias", en: "Santorini and Mykonos: Greek Islands in 7 Days", pt: "Santorini e Mykonos: Ilhas Gregas em 7 Dias" },
    excerpt: { es: "Las islas mas famosas de Grecia. Ferries, atardeceres, playas y vida nocturna.", en: "Greece's most famous islands. Ferries, sunsets, beaches and nightlife.", pt: "As ilhas mais famosas da Grecia. Ferries, por do sol, praias e vida noturna." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "18 Nov 2024",
    readTime: 10,
    featured: false,
    keywords: ["santorini mykonos", "islas griegas", "grecia 7 dias"],
  },
  {
    id: "viaje-solo-europa",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Viajar Solo a Europa: Guia Completa 2025", en: "Traveling Solo to Europe: Complete Guide 2025", pt: "Viajar Sozinho para Europa: Guia Completo 2025" },
    excerpt: { es: "Destinos seguros, hostales, tours y consejos para viajeros solitarios latinoamericanos.", en: "Safe destinations, hostels, tours and tips for Latin American solo travelers.", pt: "Destinos seguros, hostels, tours e dicas para viajantes solitarios latino-americanos." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips", pt: "Dicas" },
    date: "16 Nov 2024",
    readTime: 11,
    featured: false,
    keywords: ["viajar solo europa", "viaje solitario", "europa solo"],
  },
  {
    id: "viaje-brasil-europa",
    image: "https://images.unsplash.com/photo-1518659526054-190340b32735?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Viagem para Europa do Brasil: Guia Completo", en: "Travel to Europe from Brazil: Complete Guide", pt: "Viagem para Europa do Brasil: Guia Completo" },
    excerpt: { es: "Brasileiros nao precisam de visto! Requisitos, documentos, voos e dicas para sua primeira viagem.", en: "Brazilians don't need a visa! Requirements, documents, flights and tips for your first trip.", pt: "Brasileiros nao precisam de visto! Requisitos, documentos, voos e dicas para sua primeira viagem." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning", pt: "Planejamento" },
    date: "14 Nov 2024",
    readTime: 10,
    featured: false,
    keywords: ["viagem europa brasil", "brasileiros europa", "voos brasil europa"],
  },
  {
    id: "suiza-7-dias",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Suiza en 7 Dias: Alpes, Lagos y Chocolate", en: "Switzerland in 7 Days: Alps, Lakes and Chocolate", pt: "Suica em 7 Dias: Alpes, Lagos e Chocolate" },
    excerpt: { es: "Zurich, Lucerna, Interlaken, Zermatt. El itinerario perfecto por los Alpes suizos.", en: "Zurich, Lucerne, Interlaken, Zermatt. The perfect itinerary through the Swiss Alps.", pt: "Zurique, Lucerna, Interlaken, Zermatt. O roteiro perfeito pelos Alpes suicos." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "12 Nov 2024",
    readTime: 10,
    featured: false,
    keywords: ["suiza 7 dias", "itinerario suiza", "alpes suizos"],
  },
  {
    id: "primera-vez-europa",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Primera Vez en Europa: 10 Errores que Debes Evitar", en: "First Time in Europe: 10 Mistakes to Avoid", pt: "Primeira Vez na Europa: 10 Erros que Voce Deve Evitar" },
    excerpt: { es: "No cometas estos errores clasicos de viajeros primerizos. Ahorra tiempo, dinero y frustraciones.", en: "Don't make these classic first-time traveler mistakes. Save time, money and frustrations.", pt: "Nao cometa esses erros classicos de viajantes de primeira viagem. Economize tempo, dinheiro e frustracoes." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips", pt: "Dicas" },
    date: "10 Nov 2024",
    readTime: 8,
    featured: false,
    keywords: ["primera vez europa", "errores viaje europa", "consejos viajeros"],
  },
  {
    id: "croissants-paris",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Mejores Croissants de Paris: Top 10 Boulangeries", en: "Best Croissants in Paris: Top 10 Boulangeries", pt: "Melhores Croissants de Paris: Top 10 Boulangeries" },
    excerpt: { es: "Donde encontrar los croissants mas deliciosos de Paris segun los parisinos.", en: "Where to find the most delicious croissants in Paris according to Parisians.", pt: "Onde encontrar os croissants mais deliciosos de Paris segundo os parisienses." },
    category: "gastronomia",
    categoryLabel: { es: "Gastronomia", en: "Gastronomy", pt: "Gastronomia" },
    date: "8 Nov 2024",
    readTime: 6,
    featured: false,
    keywords: ["croissants paris", "boulangeries paris", "desayuno paris"],
  },
  {
    id: "portugal-10-dias",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Portugal en 10 Dias: Lisboa, Porto, Algarve y Sintra", en: "Portugal in 10 Days: Lisbon, Porto, Algarve and Sintra", pt: "Portugal em 10 Dias: Lisboa, Porto, Algarve e Sintra" },
    excerpt: { es: "El pais mas accesible de Europa. Itinerario completo, precios y consejos.", en: "Europe's most accessible country. Complete itinerary, prices and tips.", pt: "O pais mais acessivel da Europa. Roteiro completo, precos e dicas." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "6 Nov 2024",
    readTime: 11,
    featured: false,
    keywords: ["portugal 10 dias", "itinerario portugal", "lisboa porto"],
  },
  {
    id: "compras-europa",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Shopping en Europa: Tax Free, Outlets y Mejores Zonas", en: "Shopping in Europe: Tax Free, Outlets and Best Areas", pt: "Compras na Europa: Tax Free, Outlets e Melhores Areas" },
    excerpt: { es: "Como aprovechar el Tax Free, los mejores outlets y zonas de compras por ciudad.", en: "How to take advantage of Tax Free, the best outlets and shopping areas by city.", pt: "Como aproveitar o Tax Free, os melhores outlets e areas de compras por cidade." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money", pt: "Dinheiro" },
    date: "4 Nov 2024",
    readTime: 9,
    featured: false,
    keywords: ["compras europa", "tax free europa", "outlets europa"],
  },
  {
    id: "cinque-terre-guia",
    image: "https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Cinque Terre: Las 5 Aldeas Coloridas de Italia", en: "Cinque Terre: Italy's 5 Colorful Villages", pt: "Cinque Terre: As 5 Vilas Coloridas da Italia" },
    excerpt: { es: "Riomaggiore, Manarola, Corniglia, Vernazza y Monterosso. Como visitarlas en un dia.", en: "Riomaggiore, Manarola, Corniglia, Vernazza and Monterosso. How to visit them in one day.", pt: "Riomaggiore, Manarola, Corniglia, Vernazza e Monterosso. Como visita-las em um dia." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "2 Nov 2024",
    readTime: 8,
    featured: false,
    keywords: ["cinque terre", "cinco tierras italia", "aldeas coloridas"],
  },
  {
    id: "documentos-viajar-europa",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Documentos para Viajar a Europa: Checklist Completo 2025", en: "Documents for Traveling to Europe: Complete Checklist 2025", pt: "Documentos para Viajar para Europa: Checklist Completo 2025" },
    excerpt: { es: "Pasaporte, visa, seguro, reservas de hotel. Todo lo que necesitas para pasar inmigracion sin problemas.", en: "Passport, visa, insurance, hotel reservations. Everything you need to pass immigration smoothly.", pt: "Passaporte, visto, seguro, reservas de hotel. Tudo que voce precisa para passar na imigracao sem problemas." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning", pt: "Planejamento" },
    date: "30 Oct 2024",
    readTime: 7,
    featured: false,
    keywords: ["documentos viajar europa", "requisitos viaje europa", "checklist europa"],
  },
  {
    id: "mejor-epoca-europa",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Mejor Epoca para Viajar a Europa por Destino", en: "Best Time to Travel to Europe by Destination", pt: "Melhor Epoca para Viajar para Europa por Destino" },
    excerpt: { es: "Cuando visitar cada pais segun el clima, precios y temporadas. Evita multitudes y ahorra dinero.", en: "When to visit each country based on weather, prices and seasons. Avoid crowds and save money.", pt: "Quando visitar cada pais conforme o clima, precos e temporadas. Evite multidoes e economize dinheiro." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips", pt: "Dicas" },
    date: "28 Oct 2024",
    readTime: 9,
    featured: false,
    keywords: ["mejor epoca europa", "cuando viajar europa", "temporada europa"],
  },
  {
    id: "wifi-europa-datos",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    title: { es: "WiFi y Datos Moviles en Europa: eSIM vs Roaming", en: "WiFi and Mobile Data in Europe: eSIM vs Roaming", pt: "WiFi e Dados Moveis na Europa: eSIM vs Roaming" },
    excerpt: { es: "Las mejores opciones para tener internet en Europa. eSIM, chips locales y como evitar cargos sorpresa.", en: "The best options for internet in Europe. eSIM, local chips and how to avoid surprise charges.", pt: "As melhores opcoes para ter internet na Europa. eSIM, chips locais e como evitar cobranças surpresa." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips", pt: "Dicas" },
    date: "26 Oct 2024",
    readTime: 6,
    featured: false,
    keywords: ["wifi europa", "datos moviles europa", "internet europa"],
  },
  {
    id: "moneda-europa-cambio",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Cambio de Moneda en Europa: Euros, Tarjetas y ATMs", en: "Currency Exchange in Europe: Euros, Cards and ATMs", pt: "Cambio de Moeda na Europa: Euros, Cartoes e Caixas Eletronicos" },
    excerpt: { es: "Donde cambiar dinero, que tarjetas usar y como evitar comisiones bancarias en Europa.", en: "Where to exchange money, which cards to use and how to avoid bank fees in Europe.", pt: "Onde trocar dinheiro, quais cartoes usar e como evitar taxas bancarias na Europa." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money", pt: "Dinheiro" },
    date: "24 Oct 2024",
    readTime: 7,
    featured: false,
    keywords: ["moneda europa", "cambio euro", "tarjetas europa ATM"],
  },
  {
    id: "hoteles-baratos-europa",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Hoteles Baratos en Europa: Trucos para Ahorrar", en: "Cheap Hotels in Europe: Tricks to Save", pt: "Hoteis Baratos na Europa: Truques para Economizar" },
    excerpt: { es: "Como encontrar alojamiento economico sin sacrificar calidad. Booking hacks y alternativas.", en: "How to find budget accommodation without sacrificing quality. Booking hacks and alternatives.", pt: "Como encontrar hospedagem economica sem sacrificar qualidade. Dicas de Booking e alternativas." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money", pt: "Dinheiro" },
    date: "22 Oct 2024",
    readTime: 8,
    featured: false,
    keywords: ["hoteles baratos europa", "alojamiento economico", "donde hospedarse"],
  },
  {
    id: "pasaporte-europa-requisitos",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Requisitos del Pasaporte para Viajar a Europa 2025", en: "Passport Requirements for Traveling to Europe 2025", pt: "Requisitos do Passaporte para Viajar para Europa 2025" },
    excerpt: { es: "Vigencia minima, paginas en blanco, renovacion y casos especiales para pasaportes latinoamericanos.", en: "Minimum validity, blank pages, renewal and special cases for Latin American passports.", pt: "Validade minima, paginas em branco, renovacao e casos especiais para passaportes latino-americanos." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning", pt: "Planejamento" },
    date: "20 Oct 2024",
    readTime: 6,
    featured: false,
    keywords: ["pasaporte europa", "requisitos pasaporte", "vigencia pasaporte"],
  },
  {
    id: "eurail-pass-guia",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Eurail Pass: Vale la Pena? Guia Completa 2025", en: "Eurail Pass: Is It Worth It? Complete Guide 2025", pt: "Eurail Pass: Vale a Pena? Guia Completo 2025" },
    excerpt: { es: "Tipos de pases, precios, como reservar asientos y en que casos conviene comprarlo.", en: "Types of passes, prices, how to reserve seats and when it's worth buying.", pt: "Tipos de passes, precos, como reservar assentos e quando vale a pena comprar." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money", pt: "Dinheiro" },
    date: "18 Oct 2024",
    readTime: 10,
    featured: false,
    keywords: ["eurail pass", "tren europa", "transporte europa"],
  },
  {
    id: "que-comer-europa",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Que Comer en Europa: Platos Tipicos por Pais", en: "What to Eat in Europe: Typical Dishes by Country", pt: "O Que Comer na Europa: Pratos Tipicos por Pais" },
    excerpt: { es: "Los platos imperdibles de cada pais europeo. Donde probarlos y cuanto cuestan.", en: "Must-try dishes from each European country. Where to try them and how much they cost.", pt: "Os pratos imperdiveis de cada pais europeu. Onde experimenta-los e quanto custam." },
    category: "gastronomia",
    categoryLabel: { es: "Gastronomia", en: "Gastronomy", pt: "Gastronomia" },
    date: "16 Oct 2024",
    readTime: 11,
    featured: false,
    keywords: ["que comer europa", "gastronomia europa", "platos tipicos"],
  },
  {
    id: "enchufes-europa-adaptadores",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Enchufes en Europa: Que Adaptador Necesitas", en: "Plugs in Europe: What Adapter Do You Need", pt: "Tomadas na Europa: Qual Adaptador Voce Precisa" },
    excerpt: { es: "Tipos de enchufes por pais, adaptadores universales y como cargar todos tus dispositivos.", en: "Plug types by country, universal adapters and how to charge all your devices.", pt: "Tipos de tomadas por pais, adaptadores universais e como carregar todos os seus dispositivos." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips", pt: "Dicas" },
    date: "14 Oct 2024",
    readTime: 5,
    featured: false,
    keywords: ["enchufes europa", "adaptador viaje", "voltaje europa"],
  },
  {
    id: "apps-viaje-europa",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop",
    title: { es: "10 Apps Imprescindibles para Viajar a Europa", en: "10 Essential Apps for Traveling to Europe", pt: "10 Apps Essenciais para Viajar para Europa" },
    excerpt: { es: "Google Maps offline, traductores, transporte, restaurantes y mas. Las apps que necesitas.", en: "Google Maps offline, translators, transport, restaurants and more. The apps you need.", pt: "Google Maps offline, tradutores, transporte, restaurantes e mais. Os apps que voce precisa." },
    category: "consejos",
    categoryLabel: { es: "Consejos", en: "Tips", pt: "Dicas" },
    date: "12 Oct 2024",
    readTime: 7,
    featured: false,
    keywords: ["apps viaje europa", "aplicaciones viajeros", "google maps offline"],
  },
  {
    id: "venecia-sin-perderse",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Venecia en 2 Dias: Como No Perderse en la Ciudad", en: "Venice in 2 Days: How Not to Get Lost in the City", pt: "Veneza em 2 Dias: Como Nao Se Perder na Cidade" },
    excerpt: { es: "Rutas a pie, gondolas, murano y burano. El itinerario perfecto sin perderte.", en: "Walking routes, gondolas, Murano and Burano. The perfect itinerary without getting lost.", pt: "Rotas a pe, gondolas, Murano e Burano. O roteiro perfeito sem se perder." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "10 Oct 2024",
    readTime: 8,
    featured: false,
    keywords: ["venecia 2 dias", "que ver venecia", "itinerario venecia"],
  },
  {
    id: "visa-schengen-brasil-2025",
    image: "https://images.unsplash.com/photo-1619546952812-520e98064a52?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Brasileiros na Europa: Guia Completo Sem Visto", en: "Brazilians in Europe: Complete Guide Without Visa", pt: "Brasileiros na Europa: Guia Completo Sem Visto" },
    excerpt: { es: "Brasileiros nao precisam de visto Schengen! Documentos, seguro e dicas para sua viagem.", en: "Brazilians don't need Schengen visa! Documents, insurance and tips for your trip.", pt: "Brasileiros nao precisam de visto Schengen! Documentos, seguro e dicas para sua viagem." },
    category: "planificacion",
    categoryLabel: { es: "Planificacion", en: "Planning", pt: "Planejamento" },
    date: "8 Oct 2024",
    readTime: 9,
    featured: false,
    keywords: ["brasileiros europa", "brasil schengen", "viajar europa brasil"],
  },
  {
    id: "viena-3-dias",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Viena en 3 Dias: Palacios, Musica y Cafes", en: "Vienna in 3 Days: Palaces, Music and Cafes", pt: "Viena em 3 Dias: Palacios, Musica e Cafes" },
    excerpt: { es: "Schonbrunn, Opera, Prater y los mejores cafes vieneses. Itinerario completo.", en: "Schonbrunn, Opera, Prater and the best Viennese cafes. Complete itinerary.", pt: "Schonbrunn, Opera, Prater e os melhores cafes vienenses. Roteiro completo." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "6 Oct 2024",
    readTime: 8,
    featured: false,
    keywords: ["viena 3 dias", "que hacer viena", "itinerario viena"],
  },
  {
    id: "florencia-arte-guia",
    image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Florencia para Amantes del Arte: Guia Completa", en: "Florence for Art Lovers: Complete Guide", pt: "Florenca para Amantes da Arte: Guia Completo" },
    excerpt: { es: "Uffizi, David de Miguel Angel, Duomo. Como ver las obras maestras sin filas.", en: "Uffizi, Michelangelo's David, Duomo. How to see the masterpieces without queues.", pt: "Uffizi, David de Michelangelo, Duomo. Como ver as obras-primas sem filas." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "4 Oct 2024",
    readTime: 9,
    featured: false,
    keywords: ["florencia arte", "uffizi", "museos florencia"],
  },
  {
    id: "berlin-muro-historia",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Berlin Historico: El Muro y la Guerra Fria", en: "Historic Berlin: The Wall and the Cold War", pt: "Berlim Historica: O Muro e a Guerra Fria" },
    excerpt: { es: "Checkpoint Charlie, East Side Gallery, memoriales. La historia que debes conocer.", en: "Checkpoint Charlie, East Side Gallery, memorials. The history you need to know.", pt: "Checkpoint Charlie, East Side Gallery, memoriais. A historia que voce precisa conhecer." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "2 Oct 2024",
    readTime: 10,
    featured: false,
    keywords: ["berlin muro", "historia berlin", "guerra fria berlin"],
  },
  {
    id: "escocia-highlands",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Escocia: Highlands, Castillos y Whisky en 7 Dias", en: "Scotland: Highlands, Castles and Whisky in 7 Days", pt: "Escocia: Highlands, Castelos e Whisky em 7 Dias" },
    excerpt: { es: "Edimburgo, Loch Ness, Isle of Skye. Ruta por las tierras altas escocesas.", en: "Edinburgh, Loch Ness, Isle of Skye. Route through the Scottish Highlands.", pt: "Edimburgo, Loch Ness, Ilha de Skye. Rota pelas terras altas escocesas." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "30 Sep 2024",
    readTime: 11,
    featured: false,
    keywords: ["escocia highlands", "castillos escocia", "whisky tour"],
  },
  {
    id: "croatia-costa-dalmatia",
    image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Croacia: Dubrovnik, Split y las Islas Dalmacias", en: "Croatia: Dubrovnik, Split and the Dalmatian Islands", pt: "Croacia: Dubrovnik, Split e as Ilhas da Dalmacia" },
    excerpt: { es: "El destino de moda en Europa. Playas, Game of Thrones y islas paradisiacas.", en: "Europe's trending destination. Beaches, Game of Thrones and paradise islands.", pt: "O destino da moda na Europa. Praias, Game of Thrones e ilhas paradisiacas." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "28 Sep 2024",
    readTime: 9,
    featured: false,
    keywords: ["croacia dubrovnik", "costa dalmatia", "islas croacia"],
  },
  {
    id: "noruega-fiordos",
    image: "https://images.unsplash.com/photo-1520681279154-51b3fb4ea0f7?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Fiordos Noruegos: Guia para Latinoamericanos", en: "Norwegian Fjords: Guide for Latin Americans", pt: "Fiordes Noruegueses: Guia para Latino-Americanos" },
    excerpt: { es: "Bergen, Flam, Geirangerfjord. Como ver los fiordos sin gastar una fortuna.", en: "Bergen, Flam, Geirangerfjord. How to see the fjords without spending a fortune.", pt: "Bergen, Flam, Geirangerfjord. Como ver os fiordes sem gastar uma fortuna." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "26 Sep 2024",
    readTime: 10,
    featured: false,
    keywords: ["fiordos noruegos", "noruega guia", "bergen flam"],
  },
  {
    id: "malta-playas-historia",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Malta: Playas, Historia y Cursos de Ingles", en: "Malta: Beaches, History and English Courses", pt: "Malta: Praias, Historia e Cursos de Ingles" },
    excerpt: { es: "La Valeta, Mdina, Blue Lagoon. El destino perfecto para combinar playa y cultura.", en: "Valletta, Mdina, Blue Lagoon. The perfect destination to combine beach and culture.", pt: "Valletta, Mdina, Blue Lagoon. O destino perfeito para combinar praia e cultura." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "24 Sep 2024",
    readTime: 8,
    featured: false,
    keywords: ["malta playas", "que hacer malta", "cursos ingles malta"],
  },
  {
    id: "viaje-familia-europa-ninos",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Viajar a Europa con Ninos: Guia Completa para Familias", en: "Traveling to Europe with Kids: Complete Family Guide", pt: "Viajar para Europa com Criancas: Guia Completo para Familias" },
    excerpt: { es: "Destinos family-friendly, tips para vuelos largos, parques de atracciones y actividades para todas las edades.", en: "Family-friendly destinations, tips for long flights, theme parks and activities for all ages.", pt: "Destinos family-friendly, dicas para voos longos, parques de diversoes e atividades para todas as idades." },
    category: "experiencias",
    categoryLabel: { es: "Experiencias", en: "Experiences", pt: "Experiencias" },
    date: "22 Sep 2024",
    readTime: 12,
    featured: false,
    keywords: ["viaje familia europa", "europa con ninos", "vacaciones familiares"],
  },
  {
    id: "amsterdam-4-dias",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Amsterdam en 4 Dias: Canales, Museos y Vida Nocturna", en: "Amsterdam in 4 Days: Canals, Museums and Nightlife", pt: "Amsterda em 4 Dias: Canais, Museus e Vida Noturna" },
    excerpt: { es: "Van Gogh, Anne Frank, coffee shops. Todo lo que debes ver en la capital holandesa.", en: "Van Gogh, Anne Frank, coffee shops. Everything you must see in the Dutch capital.", pt: "Van Gogh, Anne Frank, coffee shops. Tudo que voce deve ver na capital holandesa." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "20 Sep 2024",
    readTime: 9,
    featured: false,
    keywords: ["amsterdam 4 dias", "que ver amsterdam", "itinerario amsterdam"],
  },
  {
    id: "brujas-gante-dia",
    image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Brujas y Gante en un Dia desde Bruselas", en: "Bruges and Ghent in One Day from Brussels", pt: "Bruges e Ghent em um Dia a partir de Bruxelas" },
    excerpt: { es: "Las joyas medievales de Belgica. Como visitarlas en una excursion perfecta.", en: "Belgium's medieval gems. How to visit them in a perfect day trip.", pt: "As joias medievais da Belgica. Como visita-las em um passeio perfeito de um dia." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "18 Sep 2024",
    readTime: 7,
    featured: false,
    keywords: ["brujas gante", "excursion bruselas", "belgica medieval"],
  },
  {
    id: "londres-bajo-presupuesto",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Londres con Bajo Presupuesto: Guia para Ahorrar", en: "London on a Budget: Guide to Save Money", pt: "Londres com Baixo Orcamento: Guia para Economizar" },
    excerpt: { es: "Museos gratis, transporte economico, donde comer barato. Londres sin gastar una fortuna.", en: "Free museums, cheap transport, where to eat cheaply. London without spending a fortune.", pt: "Museus gratuitos, transporte economico, onde comer barato. Londres sem gastar uma fortuna." },
    category: "dinero",
    categoryLabel: { es: "Dinero", en: "Money", pt: "Dinheiro" },
    date: "16 Sep 2024",
    readTime: 10,
    featured: false,
    keywords: ["londres barato", "presupuesto londres", "ahorrar londres"],
  },
  {
    id: "toscana-5-dias-ruta",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Ruta por la Toscana en 5 Dias: Vino, Arte y Paisajes", en: "Tuscany Route in 5 Days: Wine, Art and Landscapes", pt: "Rota pela Toscana em 5 Dias: Vinho, Arte e Paisagens" },
    excerpt: { es: "Siena, San Gimignano, Chianti, Montepulciano. La ruta perfecta por la campiña italiana.", en: "Siena, San Gimignano, Chianti, Montepulciano. The perfect route through the Italian countryside.", pt: "Siena, San Gimignano, Chianti, Montepulciano. A rota perfeita pelo interior italiano." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "14 Sep 2024",
    readTime: 11,
    featured: false,
    keywords: ["toscana 5 dias", "ruta toscana", "vino toscana"],
  },
  {
    id: "munich-neuschwanstein",
    image: "https://images.unsplash.com/photo-1594394489098-74ac04c0fc2e?q=80&w=1200&auto=format&fit=crop",
    title: { es: "Munich y Neuschwanstein: Castillos de Cuento", en: "Munich and Neuschwanstein: Fairy Tale Castles", pt: "Munique e Neuschwanstein: Castelos de Conto de Fadas" },
    excerpt: { es: "El castillo que inspiro a Disney. Como visitarlo desde Munich en un dia.", en: "The castle that inspired Disney. How to visit it from Munich in one day.", pt: "O castelo que inspirou a Disney. Como visita-lo a partir de Munique em um dia." },
    category: "destinos",
    categoryLabel: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    date: "12 Sep 2024",
    readTime: 8,
    featured: false,
    keywords: ["neuschwanstein", "castillos alemania", "munich excursion"],
  },
];

export default function Blog() {
  const { language } = useI18n();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast({
        title: language === "es" ? "Email requerido" : language === "pt" ? "E-mail obrigatorio" : "Email required",
        variant: "destructive"
      });
      return;
    }
    
    setNewsletterLoading(true);
    try {
      await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail })
      });

      const whatsappMessage = `Nueva suscripcion al Newsletter Blog!\n\nEmail: ${newsletterEmail}`;
      window.open(`https://wa.me/34611105448?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
      
      toast({
        title: language === "es" ? "Suscripcion exitosa" : language === "pt" ? "Inscricao realizada" : "Subscription successful"
      });
      setNewsletterEmail("");
    } catch (error) {
      console.error("Newsletter error:", error);
    } finally {
      setNewsletterLoading(false);
    }
  };

  const allPosts = useMemo(() => {
    const blogDataIds = new Set(BLOG_POSTS_DATA.map(p => p.id));
    const simplePosts = BLOG_POSTS_SIMPLE.filter(p => !blogDataIds.has(p.id));
    return [...BLOG_POSTS_DATA, ...simplePosts];
  }, []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery, language]);

  const featuredPosts = allPosts.filter(p => p.featured);

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
            {language === "es" ? "Blog de Viajes" : language === "pt" ? "Blog de Viagens" : "Travel Blog"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-blog-title">
            {language === "es" ? "Guias y Consejos para tu Viaje a Europa" : language === "pt" ? "Guias e Dicas para sua Viagem a Europa" : "Guides and Tips for Your Trip to Europe"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto" data-testid="text-blog-subtitle">
            {language === "es" 
              ? "Visa Schengen, presupuestos, itinerarios y experiencias reales de viajeros latinoamericanos, Brazil y el Caribe" 
              : language === "pt"
              ? "Visto Schengen, orcamentos, roteiros e experiencias reais de viajantes latino-americanos, Brasil e Caribe"
              : "Schengen visa, budgets, itineraries and real experiences from Latin American travelers, Brazil and the Caribbean"}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b" data-testid="section-featured-posts">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent" />
            {language === "es" ? "Articulos Destacados" : language === "pt" ? "Artigos em Destaque" : "Featured Articles"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link href={`/blog/post/${'slug' in post ? post.slug : post.id}`} key={post.id}>
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" data-testid={`card-featured-${post.id}`}>
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-muted">
                    <img 
                      src={post.image} 
                      alt={post.title[language as "es" | "en" | "pt"] || post.title.es} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent text-primary">{post.categoryLabel[language as "es" | "en" | "pt"] || post.categoryLabel.es}</Badge>
                    <Badge className="absolute top-4 right-4 bg-primary text-white">
                      {language === "es" ? "Destacado" : language === "pt" ? "Destaque" : "Featured"}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <div className="text-sm text-muted-foreground mb-2">
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-lg font-display font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {post.title[language as "es" | "en" | "pt"] || post.title.es}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt[language as "es" | "en" | "pt"] || post.excerpt.es}</p>
                  </CardContent>
                </Card>
              </Link>
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
                  <div className="relative w-full md:w-1/3 h-48 md:h-56">
                    <img 
                      src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=600&auto=format&fit=crop" 
                      alt="Vacaciones para Europa" 
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/90 md:block hidden" />
                  </div>
                  <div className="flex-1 p-6 md:p-8 text-center md:text-left">
                    <Badge className="bg-accent text-primary mb-3">
                      {language === "es" ? "Seccion Especial" : language === "pt" ? "Secao Especial" : "Special Section"}
                    </Badge>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-accent mb-2">
                      {language === "es" ? "Vacaciones para Europa" : language === "pt" ? "Ferias na Europa" : "European Vacations"}
                    </h3>
                    <p className="text-white/80 mb-4 max-w-lg">
                      {language === "es" 
                        ? "Descubre paquetes, destinos, circuitos y todo lo que necesitas para planear tus vacaciones europeas perfectas." 
                        : language === "pt"
                        ? "Descubra pacotes, destinos, circuitos e tudo o que voce precisa para planejar suas ferias europeias perfeitas."
                        : "Discover packages, destinations, circuits and everything you need to plan your perfect European vacation."}
                    </p>
                    <Button className="bg-accent text-primary hover:bg-accent/90">
                      {language === "es" ? "Explorar Vacaciones" : language === "pt" ? "Explorar Ferias" : "Explore Vacations"} <ArrowRight className="w-4 h-4 ml-2" />
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
              {language === "es" ? "Guias por Pais" : language === "pt" ? "Guias por Pais" : "Country Guides"}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <Link href="/blog/colombia">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-colombia">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Colombia</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : language === "pt" ? "Guia Completo" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/mexico">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-mexico">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Mexico</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : language === "pt" ? "Guia Completo" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/brasil">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-brasil">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Brasil</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : language === "pt" ? "Guia Completo" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/argentina">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-argentina">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Argentina</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : language === "pt" ? "Guia Completo" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/peru">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-peru">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Peru</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : language === "pt" ? "Guia Completo" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/panama">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-panama">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Panama</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : language === "pt" ? "Guia Completo" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/costa-rica">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-costa-rica">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Costa Rica</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : language === "pt" ? "Guia Completo" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/dominicana">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-dominicana">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">R. Dominicana</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Completa" : language === "pt" ? "Guia Completo" : "Complete Guide"}</p>
              </Card>
            </Link>
            <Link href="/blog/caribe">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer text-center p-4" data-testid="link-blog-caribe">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-bold text-sm">Caribe</h3>
                <p className="text-accent text-xs font-medium">{language === "es" ? "Guia Regional" : language === "pt" ? "Guia Regional" : "Regional Guide"}</p>
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
                  placeholder={language === "es" ? "Buscar articulos..." : language === "pt" ? "Buscar artigos..." : "Search articles..."}
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
                  {cat.label[language as "es" | "en" | "pt"] || cat.label.es}
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
                {language === "es" ? "No hay articulos que coincidan con tu busqueda" : language === "pt" ? "Nao ha artigos que correspondam a sua busca" : "No articles match your search"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link href={`/blog/post/${'slug' in post && post.slug ? post.slug : post.id}`} key={post.id}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" data-testid={`card-blog-${post.id}`}>
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-muted">
                      <img 
                        src={post.image} 
                        alt={post.title[language as "es" | "en" | "pt"] || post.title.es} 
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <Badge className="absolute top-4 left-4 bg-accent text-primary">{post.categoryLabel[language as "es" | "en" | "pt"] || post.categoryLabel.es}</Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="text-sm text-muted-foreground mb-3">
                        <span data-testid={`text-date-${post.id}`}>{post.date}</span>
                      </div>
                      
                      <h3 className="text-lg font-display font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors" data-testid={`text-title-${post.id}`}>
                        {post.title[language as "es" | "en" | "pt"] || post.title.es}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-5 line-clamp-3" data-testid={`text-excerpt-${post.id}`}>{post.excerpt[language as "es" | "en" | "pt"] || post.excerpt.es}</p>
                      
                      <Button className="w-full gap-2" data-testid={`button-blog-${post.id}`}>
                        {language === "es" ? "Leer articulo" : language === "pt" ? "Ler artigo" : "Read article"}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-accent/10" data-testid="section-blog-topics">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-center mb-8">
            {language === "es" ? "Temas Populares" : language === "pt" ? "Temas Populares" : "Popular Topics"}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {(language === "pt" 
              ? ["Visto Schengen", "Paris", "Roma", "Barcelona", "Orcamento", "Lua de Mel", "Hoteis de Luxo", "Voos Baratos", "Gastronomia", "Roteiros", "Seguro Viagem", "eSIM Europa"]
              : language === "en"
              ? ["Schengen Visa", "Paris", "Rome", "Barcelona", "Budget", "Honeymoon", "Luxury Hotels", "Cheap Flights", "Gastronomy", "Itineraries", "Travel Insurance", "eSIM Europe"]
              : ["Visa Schengen", "Paris", "Roma", "Barcelona", "Presupuesto", "Luna de Miel", "Hoteles Lujo", "Vuelos Baratos", "Gastronomia", "Itinerarios", "Seguro Viaje", "eSIM Europa"]
            ).map((topic, idx) => (
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
            {language === "es" ? "Newsletter Exclusivo" : language === "pt" ? "Newsletter Exclusivo" : "Exclusive Newsletter"}
          </Badge>
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            {language === "es" ? "Recibe Guias y Ofertas Exclusivas" : language === "pt" ? "Receba Guias e Ofertas Exclusivas" : "Receive Guides and Exclusive Offers"}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {language === "es" 
              ? "Suscribete y recibe nuestra guia PDF gratuita: 'Top 10 Ciudades Imprescindibles de Europa' + descuento 10% en tu primer viaje" 
              : language === "pt"
              ? "Inscreva-se e receba nosso guia PDF gratuito: 'Top 10 Cidades Imperdiveis da Europa' + 10% de desconto na sua primeira viagem"
              : "Subscribe and receive our free PDF guide: 'Top 10 Must-See Cities in Europe' + 10% discount on your first trip"}
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={language === "es" ? "Tu correo electronico" : language === "pt" ? "Seu e-mail" : "Your email address"}
              className="flex-1 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-accent"
              data-testid="input-newsletter-email"
            />
            <Button type="submit" disabled={newsletterLoading} className="bg-accent text-primary hover:bg-accent/90" data-testid="button-newsletter-subscribe">
              {newsletterLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (language === "es" ? "Suscribirse" : language === "pt" ? "Inscrever-se" : "Subscribe")}
            </Button>
          </form>
          <p className="text-white/50 text-xs mt-4">
            {language === "es" ? "Sin spam. Puedes darte de baja cuando quieras." : language === "pt" ? "Sem spam. Voce pode cancelar a qualquer momento." : "No spam. You can unsubscribe anytime."}
          </p>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
