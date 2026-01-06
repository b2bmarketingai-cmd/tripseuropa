import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { SEOHead } from "@/components/SEOHead";
import { FAQSchema, BreadcrumbSchema } from "@/components/SEOSchema";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MapPin, Globe, Star, ChevronRight, Plane, 
  Mountain, Ship, Heart, Wine, Castle,
  ArrowRight, Quote, Sparkles, Loader2, Calendar,
  Users, CheckCircle, Phone, Mail
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { openWhatsAppQuote } from "@/lib/whatsapp";

const REGIONS = [
  { id: "all", label: "Todos", count: 110 },
  { id: "western-europe", label: "Europa Occidental", count: 59 },
  { id: "central-europe", label: "Europa Central", count: 18 },
  { id: "scandinavia", label: "Escandinavia y Balticos", count: 16 },
  { id: "balkans", label: "Los Balcanes", count: 14 },
  { id: "eastern-mediterranean", label: "Mediterraneo Oriental", count: 2 },
  { id: "eastern-europe", label: "Europa del Este", count: 1 },
];

const FEATURED_PACKAGES = [
  {
    id: "portugal-coastal",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=60&w=800&auto=format&fit=crop",
    title: "Ciudades Costeras y Tesoros Culturales",
    country: "Portugal",
    cities: ["Lisboa", "Sintra", "Porto", "Coimbra"],
    badge: "Flash Sale",
    badgeColor: "bg-red-500",
  },
  {
    id: "spain-complete",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=60&w=800&auto=format&fit=crop",
    title: "Madrid, Andalucia, Valencia y Barcelona",
    country: "España",
    cities: ["Madrid", "Sevilla", "Valencia", "Barcelona"],
    badge: "Best Seller",
    badgeColor: "bg-accent",
  },
  {
    id: "ireland-emerald",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=60&w=800&auto=format&fit=crop",
    title: "Esencia de la Isla Esmeralda",
    country: "Irlanda",
    cities: ["Dublin", "Galway", "Cork", "Killarney"],
    badge: "Top Pick",
    badgeColor: "bg-green-600",
  },
  {
    id: "italy-eternal",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=60&w=800&auto=format&fit=crop",
    title: "Ciudades Eternas de Italia",
    country: "Italia",
    cities: ["Roma", "Florencia", "Venecia", "Milan"],
    badge: "Best Seller",
    badgeColor: "bg-accent",
  },
  {
    id: "portugal-algarve",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=60&w=800&auto=format&fit=crop",
    title: "Tesoros Culturales y Escapada al Algarve",
    country: "Portugal",
    cities: ["Lisboa", "Porto", "Faro", "Lagos"],
    badge: null,
    badgeColor: "",
  },
  {
    id: "portugal-douro",
    image: "https://images.unsplash.com/photo-1558018333-bcb8c3600a7f?q=60&w=800&auto=format&fit=crop",
    title: "Ciudades Costeras y el Valle del Douro",
    country: "Portugal",
    cities: ["Porto", "Douro", "Braga", "Guimaraes"],
    badge: null,
    badgeColor: "",
  },
  {
    id: "italy-amalfi",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=60&w=800&auto=format&fit=crop",
    title: "Ischia, Costa Amalfitana y Pompeya",
    country: "Italia",
    cities: ["Napoles", "Positano", "Amalfi", "Pompeya"],
    badge: "Flash Sale",
    badgeColor: "bg-red-500",
  },
  {
    id: "ireland-celtic",
    image: "https://images.unsplash.com/photo-1564959130747-897c7e0fb6ab?q=60&w=800&auto=format&fit=crop",
    title: "Viaje Celta: Irlanda e Irlanda del Norte",
    country: "Irlanda",
    cities: ["Dublin", "Belfast", "Giants Causeway", "Cliffs of Moher"],
    badge: null,
    badgeColor: "",
  },
  {
    id: "italy-puglia",
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=60&w=800&auto=format&fit=crop",
    title: "Maravillas Costeras de Amalfi y Puglia",
    country: "Italia",
    cities: ["Napoles", "Amalfi", "Bari", "Lecce"],
    badge: "Best Seller",
    badgeColor: "bg-accent",
  },
  {
    id: "france-normandy",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=60&w=800&auto=format&fit=crop",
    title: "Joyas de Normandia y la Riviera Francesa",
    country: "Francia",
    cities: ["Paris", "Mont Saint-Michel", "Niza", "Cannes"],
    badge: null,
    badgeColor: "",
  },
  {
    id: "switzerland-alps",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=800&auto=format&fit=crop",
    title: "Alpes y Ciudades de Suiza",
    country: "Suiza",
    cities: ["Zurich", "Lucerna", "Interlaken", "Zermatt"],
    badge: "Top Pick",
    badgeColor: "bg-green-600",
  },
  {
    id: "baltics-guided",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?q=60&w=800&auto=format&fit=crop",
    title: "Viaje Guiado por los Balticos",
    country: "Balticos",
    cities: ["Vilna", "Riga", "Tallin", "Helsinki"],
    badge: null,
    badgeColor: "",
  },
];

const TRIP_CATEGORIES = [
  {
    id: "cultural",
    title: "Tesoros Culturales",
    description: "Explora museos de clase mundial, arquitectura histórica y el rico patrimonio artistico de Europa.",
    icon: Castle,
    destinations: ["Italia", "Francia", "España", "Grecia"],
  },
  {
    id: "mediterranean",
    title: "Mediterraneo y Ciudades Costeras",
    description: "Descubre playas pristinas, pueblos pesqueros encantadores y la vibrante vida costera.",
    icon: Ship,
    destinations: ["Portugal", "Croacia", "Grecia", "Italia"],
  },
  {
    id: "baltic",
    title: "Viajes Mágicos al Baltico",
    description: "Experimenta los paisajes nordicos, ciudades medievales y la aurora boreal.",
    icon: Sparkles,
    destinations: ["Finlandia", "Estonia", "Letonia", "Lituania"],
  },
  {
    id: "alps",
    title: "Los Encantadores Alpes",
    description: "Montanas majestuosas, lagos cristalinos y pueblos alpinos de cuento de hadas.",
    icon: Mountain,
    destinations: ["Suiza", "Austria", "Alemania", "Italia"],
  },
  {
    id: "romantic",
    title: "Escapadas Románticas",
    description: "Los destinos mas romanticos de Europa para parejas y lunas de miel.",
    icon: Heart,
    destinations: ["Paris", "Venecia", "Santorini", "Viena"],
  },
  {
    id: "gastronomy",
    title: "Tours Gastronomicos",
    description: "Saborea la cocina europea con tours de vino, clases de cocina y mercados locales.",
    icon: Wine,
    destinations: ["Toscana", "Burdeos", "San Sebastian", "Oporto"],
  },
];

const TOP_COUNTRIES = [
  {
    id: "portugal",
    name: "Portugal",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=60&w=600&auto=format&fit=crop",
    description: "Desde Lisboa hasta el Algarve, descubre historia, playas y la calidez portuguesa.",
    trips: 24,
  },
  {
    id: "greece",
    name: "Grecia",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=60&w=600&auto=format&fit=crop",
    description: "Islas paradisiacas, ruinas antiguas y la cuna de la civilizacion occidental.",
    trips: 18,
  },
  {
    id: "italy",
    name: "Italia",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=60&w=600&auto=format&fit=crop",
    description: "Arte, historia, gastronomía y paisajes que han inspirado al mundo por siglos.",
    trips: 32,
  },
  {
    id: "switzerland",
    name: "Suiza",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=600&auto=format&fit=crop",
    description: "Los Alpes majestuosos, lagos cristalinos y precision en cada detalle.",
    trips: 12,
  },
  {
    id: "ireland",
    name: "Irlanda",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=60&w=600&auto=format&fit=crop",
    description: "La isla esmeralda te espera con castillos, acantilados y pubs acogedores.",
    trips: 14,
  },
];

const FAQS = [
  {
    question: "Cual es la mejor época para visitar Europa?",
    answer: "Europa es hermosa todo el ano. La primavera (abril-junio) y el otono (septiembre-octubre) ofrecen clima agradable y menos multitudes. El verano es ideal para playas y festivales, mientras que el invierno es perfecto para mercados navidenos y esqui en los Alpes.",
  },
  {
    question: "Necesito visa para viajar a Europa desde Latinoamerica?",
    answer: "Depende de tu nacionalidad. Ciudadanos de Mexico, Argentina, Brasil, Chile y Colombia pueden visitar el espacio Schengen hasta 90 dias sin visa para turismo. Ciudadanos colombianos SI requieren visa Schengen. Siempre verifica los requisitos actuales antes de viajar.",
  },
  {
    question: "Que incluyen los paquetes de viaje?",
    answer: "Nuestros paquetes tipicamente incluyen vuelos internacionales, alojamiento en hoteles seleccionados, traslados entre ciudades, guias locales en espanol, y actividades culturales. Cada paquete detalla exactamente lo que esta incluido.",
  },
  {
    question: "Puedo personalizar mi itinerario?",
    answer: "Absolutamente. Ofrecemos paquetes predefinidos y tambien servicios de personalizacion. Contacta a nuestros asesores de viaje para crear el itinerario perfecto segun tus preferencias, presupuesto y tiempo disponible.",
  },
  {
    question: "Como funcionan los pagos y reservas?",
    answer: "Aceptamos pagos con tarjeta de credito, transferencia bancaria y financiamiento. Generalmente se requiere un deposito inicial para confirmar la reserva, con el saldo pagadero antes de la fecha de viaje. Ofrecemos planes de pago flexibles.",
  },
];

const PACKAGE_DETAILS: Record<string, {
  duration: string;
  groupSize: string;
  description: string;
  highlights: string[];
  itinerary: { day: string; title: string; description: string }[];
  includes: string[];
  price: string;
  faqs: { question: string; answer: string }[];
}> = {
  "portugal-coastal": {
    duration: "10 dias / 9 noches",
    groupSize: "2-16 personas",
    description: "Descubre la magia de Portugal en este viaje inolvidable. Desde las calles empedradas de Lisboa hasta los vinos del Douro, pasando por los palacios de Sintra y la vibrante ciudad de Porto. Portugal te espera con su hospitalidad única, gastronomía exquisita y paisajes que enamoran.",
    highlights: ["Torre de Belem y Monasterio de los Jeronimos", "Palacios de colores de Sintra", "Cata de vino de Oporto", "Librerias históricas de Coimbra", "Paseo en barco por el Douro"],
    itinerary: [
      { day: "Dia 1-2", title: "Lisboa", description: "Llegada a Lisboa. Visita al barrio de Alfama, Belem, y paseo en tranvia 28. Cena de bienvenida con fado." },
      { day: "Dia 3", title: "Sintra", description: "Excursion a Sintra: Palacio da Pena, Quinta da Regaleira, y Cabo da Roca." },
      { day: "Dia 4-5", title: "Coimbra", description: "Viaje a Coimbra. Universidad histórica, libreria Joanina, y ambiente estudiantil." },
      { day: "Dia 6-8", title: "Porto", description: "Exploracion de Porto: Ribeira, Livraria Lello, bodegas de vino. Crucero por el Douro." },
      { day: "Dia 9-10", title: "Regreso", description: "Tiempo libre para compras. Traslado al aeropuerto." }
    ],
    includes: ["Vuelos internacionales ida y vuelta", "Hoteles 4 estrellas con desayuno", "Traslados privados", "Guia en espanol", "Entradas a monumentos", "Cata de vinos", "Cena de bienvenida"],
    price: "Desde EUR 2,190",
    faqs: [
      { question: "Cual es la mejor época para visitar Portugal?", answer: "Primavera (abril-junio) y otono (septiembre-octubre) son ideales. Clima agradable y menos turistas que en verano." },
      { question: "Se incluye seguro de viaje?", answer: "El seguro basico esta incluido. Recomendamos contratar seguro adicional con cobertura medica ampliada." },
      { question: "Puedo extender mi estadia?", answer: "Si, podemos agregar noches adicionales en cualquier ciudad. Contactanos para cotizar." }
    ]
  },
  "spain-complete": {
    duration: "14 dias / 13 noches",
    groupSize: "2-20 personas",
    description: "España en su maxima expresion. Desde la elegancia de Madrid hasta la creatividad de Barcelona, pasando por el duende andaluz de Sevilla y la modernidad de Valencia. Arte, gastronomía, flamenco, playas y una cultura vibrante te esperan.",
    highlights: ["Museo del Prado y Palacio Real", "Alhambra de Granada", "Sagrada Familia", "Ciudad de las Artes y las Ciencias", "Show de flamenco auténtico"],
    itinerary: [
      { day: "Dia 1-3", title: "Madrid", description: "Capital de España. Prado, Reina Sofia, Retiro, tapas en La Latina. Excursion a Toledo." },
      { day: "Dia 4-6", title: "Andalucia", description: "Sevilla (Alcazar, Catedral), Cordoba (Mezquita), Granada (Alhambra). Flamenco en tablao." },
      { day: "Dia 7-9", title: "Valencia", description: "Ciudad de las Artes, playa de la Malvarrosa, paella auténtica, barrio del Carmen." },
      { day: "Dia 10-13", title: "Barcelona", description: "Gaudi (Sagrada Familia, Park Guell), Las Ramblas, Barrio Gotico, Montjuic." },
      { day: "Dia 14", title: "Regreso", description: "Tiempo libre. Traslado al aeropuerto de Barcelona." }
    ],
    includes: ["Vuelos internacionales", "Hoteles 4 estrellas", "Tren AVE entre ciudades", "Guia local en espanol", "Entradas principales", "Show de flamenco", "Clase de paella"],
    price: "Desde EUR 3,290",
    faqs: [
      { question: "El tren AVE esta incluido?", answer: "Si, todos los trenes de alta velocidad entre ciudades estan incluidos en el paquete." },
      { question: "Hay tiempo libre para explorar?", answer: "Absolutamente. Cada ciudad tiene tardes libres para que explores a tu ritmo." },
      { question: "Puedo agregar San Sebastian?", answer: "Si, podemos personalizar el itinerario. San Sebastian agrega 2-3 dias al viaje." }
    ]
  },
  "ireland-emerald": {
    duration: "9 dias / 8 noches",
    groupSize: "2-14 personas",
    description: "La isla esmeralda te espera con sus paisajes de ensueño, castillos milenarios, pubs acogedores y la hospitalidad irlandesa. Desde Dublin cosmopolita hasta los acantilados de Moher, Irlanda te robara el corazon.",
    highlights: ["Acantilados de Moher", "Ring of Kerry", "Destileria de whisky", "Castillo de Blarney", "Pubs tradicionales con musica en vivo"],
    itinerary: [
      { day: "Dia 1-2", title: "Dublin", description: "Temple Bar, Trinity College, Libro de Kells, Guinness Storehouse. Pub crawl." },
      { day: "Dia 3-4", title: "Galway", description: "Ciudad bohemia, Connemara, Acantilados de Moher." },
      { day: "Dia 5-6", title: "Ring of Kerry", description: "Ruta escenica, Killarney, lagos y montanas." },
      { day: "Dia 7-8", title: "Cork", description: "Castillo de Blarney, destileria Jameson, English Market." },
      { day: "Dia 9", title: "Regreso", description: "Vuelo de regreso desde Dublin o Cork." }
    ],
    includes: ["Vuelos ida y vuelta", "Hoteles con desayuno irlandes", "Coche de alquiler o minibus", "Guia", "Entradas", "Tour de whisky"],
    price: "Desde EUR 2,490",
    faqs: [
      { question: "El clima es muy lluvioso?", answer: "Irlanda tiene clima variable. Recomendamos capas y chaqueta impermeable. La lluvia es parte del encanto." },
      { question: "Necesito licencia internacional?", answer: "Si alquilas coche, si. Si vas en grupo con guia, no es necesario." },
      { question: "Se puede ver auroras boreales?", answer: "En invierno, ocasionalmente se ven desde la costa norte. No es garantizado." }
    ]
  },
  "italy-eternal": {
    duration: "12 dias / 11 noches",
    groupSize: "2-18 personas",
    description: "Italia eterna: donde el arte, la historia y la gastronomía se fusionan en una experiencia inolvidable. Roma imperial, Florencia renacentista, Venecia romántica y Milan elegante. La dolce vita te espera.",
    highlights: ["Coliseo y Vaticano", "Galeria Uffizi", "Paseo en gondola", "Duomo de Milan", "Cata de vinos en Toscana"],
    itinerary: [
      { day: "Dia 1-3", title: "Roma", description: "Coliseo, Foro, Vaticano, Fontana di Trevi, Trastevere." },
      { day: "Dia 4-6", title: "Florencia", description: "Uffizi, Duomo, Ponte Vecchio. Excursion a Toscana con cata de vinos." },
      { day: "Dia 7-9", title: "Venecia", description: "San Marco, Rialto, gondola, Murano y Burano." },
      { day: "Dia 10-11", title: "Milan", description: "Duomo, Ultima Cena, Galleria Vittorio Emanuele, compras." },
      { day: "Dia 12", title: "Regreso", description: "Traslado al aeropuerto de Milan." }
    ],
    includes: ["Vuelos internacionales", "Hoteles centricos", "Trenes de alta velocidad", "Guia en espanol", "Entradas sin fila", "Gondola", "Cata de vinos"],
    price: "Desde EUR 3,590",
    faqs: [
      { question: "Las entradas sin fila estan garantizadas?", answer: "Si, reservamos con anticipacion para evitar colas en Vaticano, Uffizi y principales atracciones." },
      { question: "Puedo agregar la Costa Amalfitana?", answer: "Absolutamente. Es una extension popular de 3-4 dias desde Roma." },
      { question: "Hay opciones vegetarianas?", answer: "Italia tiene excelentes opciones vegetarianas. Informanos y coordinamos con restaurantes." }
    ]
  },
  "portugal-algarve": {
    duration: "11 dias / 10 noches",
    groupSize: "2-14 personas",
    description: "Lo mejor de Portugal con extension al paradisiaco Algarve. Combina cultura, historia y playas espectaculares en un solo viaje. Desde Lisboa y Porto hasta las calas escondidas del sur.",
    highlights: ["Playas de Lagos y Albufeira", "Grutas de Benagil", "Cuevas marinas en kayak", "Fortaleza de Sagres", "Atardeceres en el Atlantico"],
    itinerary: [
      { day: "Dia 1-3", title: "Lisboa", description: "Capital portuguesa con sus barrios históricos y gastronomía." },
      { day: "Dia 4-5", title: "Porto", description: "Ciudad del vino, Ribeira, bodegas." },
      { day: "Dia 6-10", title: "Algarve", description: "Faro, Lagos, Albufeira, Benagil, Sagres. Playas y relajacion." },
      { day: "Dia 11", title: "Regreso", description: "Vuelo desde Faro." }
    ],
    includes: ["Vuelos", "Hoteles y resorts", "Traslados", "Excursion en barco a grutas", "Guia"],
    price: "Desde EUR 2,490",
    faqs: [
      { question: "Cuando es mejor para playas?", answer: "Junio a septiembre tiene el mejor clima. Julio-agosto mas lleno." },
      { question: "El hotel en Algarve tiene playa?", answer: "Ofrecemos hoteles frente al mar o a corta distancia caminando." },
      { question: "Hay actividades acuaticas?", answer: "Si, kayak, paddleboard, snorkel y paseos en barco disponibles." }
    ]
  },
  "portugal-douro": {
    duration: "8 dias / 7 noches",
    groupSize: "2-12 personas",
    description: "Un viaje enfocado en el norte de Portugal y el mágico Valle del Douro. Vinos, paisajes de terrazas y ciudades con siglos de historia. Ideal para amantes del vino y la naturaleza.",
    highlights: ["Crucero por el Rio Douro", "Quintas vinicolas", "Braga religiosa", "Guimaraes medieval", "Porto auténtico"],
    itinerary: [
      { day: "Dia 1-3", title: "Porto", description: "Exploracion profunda de Porto, bodegas, gastronomía." },
      { day: "Dia 4-5", title: "Valle del Douro", description: "Crucero, visita a quintas, catas de vino, paisajes." },
      { day: "Dia 6", title: "Braga", description: "Bom Jesus, catedral, tradicion religiosa." },
      { day: "Dia 7", title: "Guimaraes", description: "Cuna de Portugal, castillo, centro histórico." },
      { day: "Dia 8", title: "Regreso", description: "Vuelo desde Porto." }
    ],
    includes: ["Vuelos", "Hoteles con encanto", "Crucero Douro", "Catas", "Guia", "Comidas en quintas"],
    price: "Desde EUR 1,990",
    faqs: [
      { question: "Cuantas catas de vino incluye?", answer: "Minimo 4 catas en diferentes quintas y bodegas." },
      { question: "El crucero es de todo el dia?", answer: "El crucero principal es de 6-7 horas con almuerzo a bordo." },
      { question: "Hay opcion sin alcohol?", answer: "Si, podemos adaptar con jugos de uva y experiencias gastronomicas." }
    ]
  },
  "italy-amalfi": {
    duration: "9 dias / 8 noches",
    groupSize: "2-14 personas",
    description: "El sur de Italia en todo su esplendor. La isla de Ischia, la espectacular Costa Amalfitana y las ruinas de Pompeya. Limoncello, casas coloridas y el azul del Mediterraneo.",
    highlights: ["Positano y Amalfi", "Ravello con vistas infinitas", "Ruinas de Pompeya", "Termas de Ischia", "Capri opcional"],
    itinerary: [
      { day: "Dia 1-2", title: "Napoles", description: "Llegada, centro histórico, pizza napoletana original." },
      { day: "Dia 3-4", title: "Ischia", description: "Isla termal, jardines, playas, relajacion." },
      { day: "Dia 5-7", title: "Costa Amalfitana", description: "Positano, Amalfi, Ravello. Paseos, limoncellos, atardeceres." },
      { day: "Dia 8", title: "Pompeya", description: "Ruinas romanas con guia experto." },
      { day: "Dia 9", title: "Regreso", description: "Vuelo desde Napoles." }
    ],
    includes: ["Vuelos", "Hoteles con vista al mar", "Ferrys", "Guia", "Entradas Pompeya", "Cata limoncello"],
    price: "Desde EUR 2,790",
    faqs: [
      { question: "El transporte en la costa es complicado?", answer: "Nosotros coordinamos todo: ferrys, buses, traslados privados. Tu solo disfrutas." },
      { question: "Se puede agregar Capri?", answer: "Si, es una excursion de dia completo muy recomendada." },
      { question: "Los hoteles tienen piscina?", answer: "Varios de nuestros hoteles tienen piscina con vista al mar." }
    ]
  },
  "ireland-celtic": {
    duration: "10 dias / 9 noches",
    groupSize: "2-14 personas",
    description: "Irlanda completa: la Republica de Irlanda e Irlanda del Norte en un viaje que combina historia celta, paisajes dramáticos y ciudades vibrantes. La Calzada del Gigante te espera.",
    highlights: ["Calzada del Gigante", "Titanic Belfast", "Dark Hedges (Game of Thrones)", "Acantilados de Moher", "Dublin histórico"],
    itinerary: [
      { day: "Dia 1-2", title: "Dublin", description: "Exploracion de la capital irlandesa." },
      { day: "Dia 3-4", title: "Belfast", description: "Museo Titanic, murales, Queen's Quarter." },
      { day: "Dia 5", title: "Costa Norte", description: "Calzada del Gigante, Dark Hedges, Carrick-a-Rede." },
      { day: "Dia 6-7", title: "Galway", description: "Costa oeste, Connemara, islas Aran." },
      { day: "Dia 8-9", title: "Cliffs of Moher", description: "Acantilados, Burren, regreso a Dublin." },
      { day: "Dia 10", title: "Regreso", description: "Vuelo desde Dublin." }
    ],
    includes: ["Vuelos", "Hoteles", "Transporte terrestre", "Guia bilingue", "Entradas", "Cena tradicional"],
    price: "Desde EUR 2,690",
    faqs: [
      { question: "Necesito pasaporte para cruzar a Irlanda del Norte?", answer: "No hay control fronterizo, pero lleva pasaporte ya que tecnicamente es Reino Unido." },
      { question: "Hay locaciones de Game of Thrones?", answer: "Si, visitamos Dark Hedges y otros puntos de filmacion en Irlanda del Norte." },
      { question: "El clima es muy diferente al sur?", answer: "Similar, quizas un poco mas fresco en el norte. Siempre impredecible." }
    ]
  },
  "italy-puglia": {
    duration: "11 dias / 10 noches",
    groupSize: "2-14 personas",
    description: "El sur italiano menos explorado: Puglia con sus trulli únicos, playas cristalinas y gastronomía auténtica, combinado con la belleza de la Costa Amalfitana.",
    highlights: ["Trulli de Alberobello", "Matera (ciudad cueva)", "Lecce barroco", "Polignano a Mare", "Costa Amalfitana"],
    itinerary: [
      { day: "Dia 1-2", title: "Napoles/Amalfi", description: "Llegada, inicio en la Costa Amalfitana." },
      { day: "Dia 3-4", title: "Matera", description: "Sassi de Matera, ciudad cueva Patrimonio UNESCO." },
      { day: "Dia 5-7", title: "Puglia", description: "Alberobello, Ostuni, Lecce, Polignano a Mare." },
      { day: "Dia 8-9", title: "Bari", description: "Capital pugliese, casco antiguo, gastronomía." },
      { day: "Dia 10-11", title: "Regreso", description: "Tiempo libre, vuelo desde Bari." }
    ],
    includes: ["Vuelos", "Hoteles con encanto", "Coche alquiler o traslados", "Guia", "Experiencia gastronomica"],
    price: "Desde EUR 2,890",
    faqs: [
      { question: "Que son los trulli?", answer: "Casas conicas tradicionales de piedra, únicas en el mundo, Patrimonio UNESCO." },
      { question: "Es recomendable alquilar coche?", answer: "Si, Puglia se disfruta mejor con coche. Podemos incluirlo o ofrecer traslados privados." },
      { question: "La comida es diferente al norte de Italia?", answer: "Si, cocina mediterranea con aceite de oliva, burrata, orecchiette, mariscos frescos." }
    ]
  },
  "france-normandy": {
    duration: "12 dias / 11 noches",
    groupSize: "2-16 personas",
    description: "Francia de norte a sur: la elegancia parisina, la historia de Normandia, y el glamour de la Riviera Francesa. Arte, playas del Dia D, y atardeceres en la Costa Azul.",
    highlights: ["Torre Eiffel y Louvre", "Mont Saint-Michel", "Playas del Desembarco", "Niza y Cannes", "Mónaco"],
    itinerary: [
      { day: "Dia 1-4", title: "Paris", description: "Torre Eiffel, Louvre, Versalles, Montmartre, crucero Sena." },
      { day: "Dia 5-7", title: "Normandia", description: "Mont Saint-Michel, playas Dia D, Rouen, Honfleur." },
      { day: "Dia 8-11", title: "Riviera Francesa", description: "Niza, Cannes, Mónaco, Eze, Saint-Tropez." },
      { day: "Dia 12", title: "Regreso", description: "Vuelo desde Niza." }
    ],
    includes: ["Vuelos", "Hoteles 4 estrellas", "TGV Paris-Niza", "Guia", "Entradas principales", "Crucero por el Sena"],
    price: "Desde EUR 3,490",
    faqs: [
      { question: "El TGV esta incluido?", answer: "Si, el tren de alta velocidad Paris-Costa Azul esta incluido." },
      { question: "Hay tiempo para playas?", answer: "Si, en la Riviera Francesa hay tiempo libre para disfrutar las playas." },
      { question: "Monaco requiere ropa formal?", answer: "Para el casino si, pero para turismo normal no es necesario." }
    ]
  },
  "switzerland-alps": {
    duration: "8 dias / 7 noches",
    groupSize: "2-12 personas",
    description: "Suiza de postal: montanas majestuosas, lagos cristalinos, trenes panoramicos y chocolates. El pais mas bello de Europa en un viaje compacto pero completo.",
    highlights: ["Matterhorn en Zermatt", "Jungfraujoch (cima de Europa)", "Lago Lucerna", "Tren Glacier Express", "Chocolates y quesos"],
    itinerary: [
      { day: "Dia 1-2", title: "Zurich", description: "Llegada, casco antiguo, lago, excursion a cataratas del Rin." },
      { day: "Dia 3-4", title: "Lucerna", description: "Puente de la Capilla, Monte Pilatus o Rigi." },
      { day: "Dia 5-6", title: "Interlaken", description: "Lagos, Jungfraujoch, paisajes alpinos." },
      { day: "Dia 7", title: "Zermatt", description: "Vista al Matterhorn, pueblo alpino." },
      { day: "Dia 8", title: "Regreso", description: "Tren a Zurich, vuelo de regreso." }
    ],
    includes: ["Vuelos", "Hoteles", "Swiss Travel Pass", "Excursiones", "Guia", "Degustacion chocolate"],
    price: "Desde EUR 3,290",
    faqs: [
      { question: "El Swiss Travel Pass que incluye?", answer: "Trenes, buses, barcos ilimitados, mas descuentos en telecabinas y museos." },
      { question: "Hace frio en verano?", answer: "En las cimas si (0-10C). En valles es agradable (15-25C). Lleva capas." },
      { question: "Es muy caro Suiza?", answer: "Si, es de los paises mas caros. El paquete incluye lo esencial para controlar gastos." }
    ]
  },
  "baltics-guided": {
    duration: "10 dias / 9 noches",
    groupSize: "2-14 personas",
    description: "Los paises balticos: joyas escondidas de Europa. Vilna, Riga y Tallin son ciudades medievales con historia fascinante, gastronomía sorprendente y precios accesibles.",
    highlights: ["Casco antiguo de Tallin", "Art Nouveau en Riga", "Colina de las Cruces", "Helsinki de bonus", "Ciudades UNESCO"],
    itinerary: [
      { day: "Dia 1-3", title: "Vilna, Lituania", description: "Capital barroca, Trakai, Colina de las Cruces." },
      { day: "Dia 4-6", title: "Riga, Letonia", description: "Art Nouveau, mercado central, bosques cercanos." },
      { day: "Dia 7-9", title: "Tallin, Estonia", description: "Ciudad medieval perfecta, digital, moderna." },
      { day: "Dia 10", title: "Helsinki", description: "Ferry a Helsinki, dia de exploracion, vuelo de regreso." }
    ],
    includes: ["Vuelos", "Hoteles centricos", "Buses entre ciudades", "Ferry a Helsinki", "Guia", "Entradas"],
    price: "Desde EUR 2,190",
    faqs: [
      { question: "Se necesita visa para los balticos?", answer: "Son parte de Schengen. Mismas reglas que España o Francia." },
      { question: "Que moneda usan?", answer: "Los tres paises usan Euro. Muy conveniente." },
      { question: "Es seguro viajar alli?", answer: "Extremadamente seguro. Ciudades muy tranquilas y organizadas." }
    ]
  }
};

const TESTIMONIALS = [
  {
    name: "Maria Fernandez",
    location: "Bogota, Colombia",
    rating: 5,
    comment: "Nuestro viaje a Italia fue mágico. Todo estuvo perfectamente organizado, desde los vuelos hasta las visitas guiadas. Volveremos a viajar con Trips Europa.",
    date: "Noviembre 2024",
    trip: "Italia en 12 dias",
  },
  {
    name: "Carlos Rodriguez",
    location: "Ciudad de Mexico",
    rating: 5,
    comment: "El circuito por España supero todas nuestras expectativas. Los hoteles excelentes, los guias muy preparados y las experiencias inolvidables.",
    date: "Octubre 2024",
    trip: "España Completa",
  },
  {
    name: "Ana Paula Santos",
    location: "Sao Paulo, Brasil",
    rating: 5,
    comment: "Viajamos a Portugal y Francia. La atencion personalizada y la calidad del servicio fueron excepcionales. Recomendado 100%.",
    date: "Septiembre 2024",
    trip: "Portugal y Francia",
  },
];

export default function VacacionesEuropa() {
  const { t, language } = useI18n();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [showFullIntro, setShowFullIntro] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const { toast } = useToast();
  
  const currentPackage = selectedPackage ? FEATURED_PACKAGES.find(p => p.id === selectedPackage) : null;
  const currentDetails = selectedPackage ? PACKAGE_DETAILS[selectedPackage] : null;

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) {
      toast({ title: "Completa los campos requeridos", variant: "destructive" });
      return;
    }
    
    setIsContactSubmitting(true);
    try {
      const packageName = currentPackage?.title || "Paquete Europa";
      const whatsappMessage = `Nueva consulta de paquete!

*Paquete:* ${packageName}
*Nombre:* ${contactForm.name}
*Email:* ${contactForm.email}
*Telefono:* ${contactForm.phone || "No proporcionado"}
*Mensaje:* ${contactForm.message || "Solicita informacion"}

Desde: Tripseuropa.com`;
      
      window.open(`https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(whatsappMessage)}`, "_blank");
      
      toast({ title: "Consulta enviada", description: "Te contactaremos pronto" });
      setContactForm({ name: "", email: "", phone: "", message: "" });
      setSelectedPackage(null);
    } catch {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setIsContactSubmitting(false);
    }
  };

  const filteredPackages = selectedRegion === "all" 
    ? FEATURED_PACKAGES 
    : FEATURED_PACKAGES.slice(0, 6);
    
  const handleNewsletterSubmit = async () => {
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast({
        title: "Correo invalido",
        description: "Por favor ingresa un correo valido",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail })
      });
      
      if (response.ok) {
        const whatsappMessage = `Nueva suscripcion a newsletter!

*Email:* ${newsletterEmail}
*Pagina:* Vacaciones Europa`;
        window.open(`https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(whatsappMessage)}`, "_blank");
        
        toast({
          title: "Suscripcion exitosa",
          description: "Recibiras nuestras mejores ofertas"
        });
        setNewsletterEmail("");
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast({
        title: "Error",
        description: "Intenta nuevamente",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqsForSchema = FAQS.map(faq => ({ question: faq.question, answer: faq.answer }));

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Vacaciones en Europa - Paquetes de Viaje Todo Incluido"
        description="Descubre los mejores paquetes de vacaciones a Europa desde Latinoamerica. Portugal, España, Italia, Francia y mas. Tours guiados en espanol, hoteles seleccionados, experiencias únicas."
        keywords="vacaciones europa, paquetes europa, viaje europa todo incluido, tour europa espanol, europa desde latinoamerica"
        url="https://tripseuropa.com/vacaciones-europa"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://tripseuropa.com" },
        { name: "Vacaciones Europa", url: "https://tripseuropa.com/vacaciones-europa" }
      ]} />
      <FAQSchema questions={faqsForSchema} />
      <Header />
      
      <section 
        className="relative min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=60&w=1200&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-testid="hero-vacaciones-europa"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Badge className="bg-accent text-primary mb-4" data-testid="badge-hero">
            <Plane className="w-3 h-3 mr-1" />
            Vacaciones de Ensueño
          </Badge>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4" style={{ color: "#d4af37" }}>
            Vacaciones para Europa
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Descubre los destinos mas fascinantes del viejo continente con nuestros paquetes todo incluido diseñados para viajeros latinoamericanos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent text-primary hover:bg-accent/90" 
              data-testid="button-search-trip"
              onClick={() => openWhatsAppQuote({ es: "encontrar mi viaje perfecto a Europa", en: "finding my perfect trip to Europe", pt: "encontrar minha viagem perfeita para a Europa" }, language)}
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === "es" ? "Buscar Mi Viaje Perfecto" : language === "pt" ? "Encontrar Minha Viagem Perfeita" : "Find My Perfect Trip"}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10" 
              data-testid="button-contact-advisor"
              onClick={() => openWhatsAppQuote({ es: "hablar con un asesor de viajes", en: "speaking with a travel advisor", pt: "falar com um consultor de viagens" }, language)}
            >
              {language === "es" ? "Hablar con un Asesor" : language === "pt" ? "Falar com um Consultor" : "Talk to an Advisor"}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-playfair text-3xl font-bold text-center mb-6" style={{ color: "#d4af37" }}>
            Descubre Europa
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Europa es un mosaico de culturas, idiomas y paisajes que ha cautivado a viajeros durante siglos. 
              Desde las románticas calles de Paris hasta los canales de Venecia, desde las playas del Mediterraneo 
              hasta los fiordos noruegos, cada rincon del viejo continente ofrece experiencias únicas e inolvidables.
            </p>
            {showFullIntro && (
              <>
                <p>
                  La riqueza histórica de Europa es incomparable. Camina por las mismas calles donde caminaron emperadores romanos, 
                  admira catedrales goticas que tardaron siglos en construirse, y descubre castillos que cuentan historias de reyes y guerras. 
                  Ciudades como Roma, Atenas y Praga son museos vivientes donde el pasado y el presente se entrelazan armoniosamente.
                </p>
                <p>
                  La gastronomía europea es otra razon para visitar. Desde la pasta fresca en Italia hasta los churros con chocolate 
                  en España, desde los croissants parisinos hasta las salchichas alemanas, cada pais tiene su propia tradicion culinaria 
                  que refleja su cultura e historia. Los vinos franceses, portugueses e italianos son reconocidos mundialmente.
                </p>
                <p>
                  Para los viajeros latinoamericanos, Europa representa una conexion especial con nuestras raices. España y Portugal 
                  nos heredaron el idioma, la religion y muchas tradiciones. Italia ha influenciado nuestra cultura con su arte, musica 
                  y cocina. Visitar Europa es, en cierto modo, conocer de donde venimos.
                </p>
              </>
            )}
            <Button 
              variant="ghost" 
              className="text-accent"
              onClick={() => setShowFullIntro(!showFullIntro)}
              data-testid="button-read-more"
            >
              {showFullIntro ? "Leer menos" : "Leer mas..."} 
              <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${showFullIntro ? "rotate-90" : ""}`} />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {REGIONS.map((region) => (
              <Button
                key={region.id}
                variant={selectedRegion === region.id ? "default" : "outline"}
                className={selectedRegion === region.id ? "bg-accent text-primary" : ""}
                onClick={() => setSelectedRegion(region.id)}
                data-testid={`button-region-${region.id}`}
              >
                {region.label} ({region.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-playfair text-3xl font-bold" style={{ color: "#d4af37" }}>
              Paquetes Destacados
            </h2>
            <Link href="/packages">
              <Button variant="ghost" className="text-accent" data-testid="link-view-all-packages">
                Ver todos <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="group overflow-hidden hover-elevate" data-testid={`card-package-${pkg.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {pkg.badge && (
                    <Badge className={`absolute top-3 left-3 ${pkg.badgeColor} text-white`}>
                      {pkg.badge}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{pkg.country}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 line-clamp-2">{pkg.title}</h3>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {pkg.cities.slice(0, 3).map((city) => (
                      <Badge key={city} variant="secondary" className="text-xs">
                        {city}
                      </Badge>
                    ))}
                    {pkg.cities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{pkg.cities.length - 3}
                      </Badge>
                    )}
                  </div>
                  <Button 
                    className="w-full bg-primary text-white" 
                    data-testid={`button-view-${pkg.id}`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-center mb-4" style={{ color: "#d4af37" }}>
            Categorias de Viaje
          </h2>
          <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
            Encuentra el estilo de viaje perfecto para ti. Desde aventuras culturales hasta escapadas románticas.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRIP_CATEGORIES.map((category) => (
              <Card key={category.id} className="bg-white/10 border-white/20 hover-elevate" data-testid={`card-category-${category.id}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                    <category.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-xl text-white mb-2">{category.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.destinations.map((dest) => (
                      <Badge key={dest} variant="outline" className="border-accent/50 text-accent text-xs">
                        {dest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-center mb-4" style={{ color: "#d4af37" }}>
            Paises Mas Populares
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Los destinos favoritos de nuestros viajeros latinoamericanos
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {TOP_COUNTRIES.map((country) => (
              <Card key={country.id} className="group overflow-hidden hover-elevate" data-testid={`card-country-${country.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={country.image} 
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-playfair text-xl font-bold text-white mb-1">{country.name}</h3>
                    <p className="text-white/80 text-sm line-clamp-2 mb-2">{country.description}</p>
                    <Badge className="bg-accent text-primary text-xs">
                      {country.trips} viajes
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-center mb-4" style={{ color: "#d4af37" }}>
            Lo Que Dicen Nuestros Viajeros
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Miles de viajeros latinoamericanos han confiado en nosotros para sus vacaciones en Europa
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <Card key={idx} className="hover-elevate" data-testid={`card-testimonial-${idx}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-accent/30 mb-2" />
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">{testimonial.trip}</Badge>
                      <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/testimonios">
              <Button variant="outline" data-testid="link-all-testimonials">
                Ver Todas las Opiniones <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-playfair text-3xl font-bold text-center mb-8" style={{ color: "#d4af37" }}>
            Preguntas Frecuentes
          </h2>
          
          <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left font-medium" data-testid={`faq-trigger-${idx}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Tienes mas preguntas?</p>
            <Button 
              className="bg-accent text-primary" 
              data-testid="button-contact-us"
              onClick={() => openWhatsAppQuote({ es: "vacaciones a Europa", en: "vacation to Europe", pt: "ferias na Europa" }, language)}
            >
              {language === "es" ? "Contactanos" : language === "pt" ? "Contate-nos" : "Contact Us"} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-accent">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="font-playfair text-3xl font-bold text-primary mb-4">
            Recibe Ofertas Exclusivas
          </h2>
          <p className="text-primary/80 mb-8">
            Suscribete a nuestro newsletter y recibe las mejores ofertas de viajes a Europa, consejos de viaje y destinos imperdibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Tu correo electronico"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-primary"
              data-testid="input-newsletter-email"
            />
            <Button 
              className="bg-primary text-white hover:bg-primary/90" 
              data-testid="button-subscribe"
              onClick={handleNewsletterSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Suscribirme"}
            </Button>
          </div>
          <p className="text-primary/60 text-sm mt-4">
            Al suscribirte aceptas nuestra politica de privacidad. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-center mb-8" style={{ color: "#d4af37" }}>
            Explora por Pais
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "España", "Francia", "Italia", "Portugal", "Grecia", "Suiza", 
              "Austria", "Alemania", "Irlanda", "Reino Unido", "Croacia", 
              "Holanda", "Belgica", "Noruega", "Islandia", "Turquia"
            ].map((country) => (
              <Link key={country} href={`/destinations/${country.toLowerCase()}`}>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover-elevate px-4 py-2"
                  data-testid={`link-country-${country.toLowerCase()}`}
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  {country}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedPackage} onOpenChange={(open) => !open && setSelectedPackage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <ScrollArea className="max-h-[90vh]">
            {currentPackage && currentDetails && (
              <div className="p-6">
                <DialogHeader className="mb-6">
                  <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
                    <img 
                      src={currentPackage.image} 
                      alt={currentPackage.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="mb-2 bg-accent text-primary">{currentPackage.country}</Badge>
                      <DialogTitle className="text-2xl font-playfair text-white">{currentPackage.title}</DialogTitle>
                    </div>
                  </div>
                </DialogHeader>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{currentDetails.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-accent" />
                    <span>{currentDetails.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <span>{currentDetails.price}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{currentDetails.description}</p>

                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3" style={{ color: "#d4af37" }}>Destacados del Viaje</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentDetails.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3" style={{ color: "#d4af37" }}>Itinerario</h3>
                  <div className="space-y-3">
                    {currentDetails.itinerary.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-3 bg-muted/30 rounded-lg">
                        <div className="font-semibold text-accent whitespace-nowrap">{item.day}</div>
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3" style={{ color: "#d4af37" }}>El Paquete Incluye</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentDetails.includes.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3" style={{ color: "#d4af37" }}>Preguntas Frecuentes</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {currentDetails.faqs.map((faq, idx) => (
                      <AccordionItem key={idx} value={`faq-${idx}`}>
                        <AccordionTrigger className="text-left text-sm">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4" style={{ color: "#d4af37" }}>Solicita Informacion</h3>
                  <form onSubmit={handleContactFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Nombre *</label>
                        <input
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                          placeholder="Tu nombre"
                          data-testid="input-contact-name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email *</label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                          placeholder="tu@email.com"
                          data-testid="input-contact-email"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Telefono / WhatsApp</label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        placeholder="+57 300 123 4567"
                        data-testid="input-contact-phone"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Mensaje</label>
                      <textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md bg-background min-h-[80px]"
                        placeholder="Cuentanos sobre tu viaje ideal..."
                        data-testid="input-contact-message"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        type="submit" 
                        className="flex-1 bg-accent text-primary"
                        disabled={isContactSubmitting}
                        data-testid="button-submit-contact"
                      >
                        {isContactSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                        Enviar Consulta
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          const msg = `Hola! Me interesa el paquete "${currentPackage.title}" a ${currentPackage.country}. Quisiera mas informacion. Gracias!`;
                          window.open(`https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(msg)}`, "_blank");
                        }}
                        data-testid="button-whatsapp-package"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        WhatsApp Directo
                      </Button>
                    </div>
                  </form>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Todo lo puedes conseguir en Tripseuropa.com - Especialistas en viajes a Europa desde Latinoamerica
                  </p>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
