import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema, FAQSchema, LocalBusinessSchema } from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useRoute } from "wouter";
import { 
  Plane, MapPin, Star, Calendar, Clock, Users,
  CheckCircle, ArrowRight, Shield, Phone, Mail,
  Globe, CreditCard, FileText, Thermometer,
  ChevronRight, Building2, Info
} from "lucide-react";

interface CityData {
  city: string;
  cityCode: string;
  country: string;
  countryCode: string;
  airport: string;
  population: string;
  timezone: string;
  climate: string;
  directFlights: string[];
  visaRequired: boolean;
  locale: string;
  image: string;
}

interface DestinationRoute {
  destCity: string;
  destCountry: string;
  destCode: string;
  duration: string;
  connectionType: string;
  airlines: string[];
  badge?: string;
}

interface Package {
  id: string;
  title: string;
  description: string;
  itinerary: string;
  days: number;
  nights: number;
  includes: string[];
}

const CITIES_DATA: Record<string, CityData> = {
  bogota: {
    city: "Bogota",
    cityCode: "BOG",
    country: "Colombia",
    countryCode: "CO",
    airport: "Aeropuerto Internacional El Dorado",
    population: "8.2 millones",
    timezone: "GMT-5 (UTC-5)",
    climate: "Primavera eterna (12-20C)",
    directFlights: ["Madrid", "Paris"],
    visaRequired: true,
    locale: "es_CO",
    image: "https://images.unsplash.com/photo-1536819114556-1e10f967fb61?q=70&w=1200&auto=format&fit=crop"
  },
  medellin: {
    city: "Medellin",
    cityCode: "MDE",
    country: "Colombia",
    countryCode: "CO",
    airport: "Aeropuerto Internacional Jose Maria Cordova",
    population: "2.6 millones",
    timezone: "GMT-5 (UTC-5)",
    climate: "Primavera eterna (18-28C)",
    directFlights: [],
    visaRequired: true,
    locale: "es_CO",
    image: "https://images.unsplash.com/photo-1599413987118-4fabd3f0a04c?q=70&w=1200&auto=format&fit=crop"
  },
  cali: {
    city: "Cali",
    cityCode: "CLO",
    country: "Colombia",
    countryCode: "CO",
    airport: "Aeropuerto Internacional Alfonso Bonilla Aragon",
    population: "2.3 millones",
    timezone: "GMT-5 (UTC-5)",
    climate: "Calido (23-32C)",
    directFlights: [],
    visaRequired: true,
    locale: "es_CO",
    image: "https://images.unsplash.com/photo-1576697786917-e0c90e1fd82a?q=70&w=1200&auto=format&fit=crop"
  },
  cdmx: {
    city: "Ciudad de Mexico",
    cityCode: "MEX",
    country: "Mexico",
    countryCode: "MX",
    airport: "Aeropuerto Internacional Benito Juarez",
    population: "21.8 millones",
    timezone: "GMT-6 (UTC-6)",
    climate: "Templado (12-26C)",
    directFlights: ["Madrid", "Paris", "Lisboa"],
    visaRequired: false,
    locale: "es_MX",
    image: "https://images.unsplash.com/photo-1518659526054-190340b32735?q=70&w=1200&auto=format&fit=crop"
  },
  guadalajara: {
    city: "Guadalajara",
    cityCode: "GDL",
    country: "Mexico",
    countryCode: "MX",
    airport: "Aeropuerto Internacional Miguel Hidalgo",
    population: "5.2 millones",
    timezone: "GMT-6 (UTC-6)",
    climate: "Templado (15-30C)",
    directFlights: [],
    visaRequired: false,
    locale: "es_MX",
    image: "https://images.unsplash.com/photo-1589519160142-f70d4c91a5e8?q=70&w=1200&auto=format&fit=crop"
  },
  "sao-paulo": {
    city: "Sao Paulo",
    cityCode: "GRU",
    country: "Brasil",
    countryCode: "BR",
    airport: "Aeroporto Internacional de Guarulhos",
    population: "12.3 millones",
    timezone: "GMT-3 (UTC-3)",
    climate: "Subtropical (15-28C)",
    directFlights: ["Lisboa", "Paris", "Madrid"],
    visaRequired: false,
    locale: "pt_BR",
    image: "https://images.unsplash.com/photo-1543059080-f9b1272213d5?q=70&w=1200&auto=format&fit=crop"
  },
  "rio-de-janeiro": {
    city: "Rio de Janeiro",
    cityCode: "GIG",
    country: "Brasil",
    countryCode: "BR",
    airport: "Aeroporto Internacional do Galeao",
    population: "6.7 millones",
    timezone: "GMT-3 (UTC-3)",
    climate: "Tropical (22-30C)",
    directFlights: ["Lisboa"],
    visaRequired: false,
    locale: "pt_BR",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=70&w=1200&auto=format&fit=crop"
  },
  "buenos-aires": {
    city: "Buenos Aires",
    cityCode: "EZE",
    country: "Argentina",
    countryCode: "AR",
    airport: "Aeropuerto Internacional Ministro Pistarini (Ezeiza)",
    population: "15.4 millones",
    timezone: "GMT-3 (UTC-3)",
    climate: "Templado humedo (10-28C)",
    directFlights: ["Madrid", "Roma"],
    visaRequired: false,
    locale: "es_AR",
    image: "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?q=70&w=1200&auto=format&fit=crop"
  },
  lima: {
    city: "Lima",
    cityCode: "LIM",
    country: "Peru",
    countryCode: "PE",
    airport: "Aeropuerto Internacional Jorge Chavez",
    population: "10.5 millones",
    timezone: "GMT-5 (UTC-5)",
    climate: "Desertico (15-27C)",
    directFlights: ["Madrid"],
    visaRequired: true,
    locale: "es_PE",
    image: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?q=70&w=1200&auto=format&fit=crop"
  },
  panama: {
    city: "Panama City",
    cityCode: "PTY",
    country: "Panama",
    countryCode: "PA",
    airport: "Aeropuerto Internacional de Tocumen",
    population: "1.5 millones",
    timezone: "GMT-5 (UTC-5)",
    climate: "Tropical (24-32C)",
    directFlights: ["Madrid"],
    visaRequired: false,
    locale: "es_PA",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=70&w=1200&auto=format&fit=crop"
  },
  "san-jose": {
    city: "San Jose",
    cityCode: "SJO",
    country: "Costa Rica",
    countryCode: "CR",
    airport: "Aeropuerto Internacional Juan Santamaria",
    population: "1.4 millones",
    timezone: "GMT-6 (UTC-6)",
    climate: "Tropical (18-26C)",
    directFlights: [],
    visaRequired: false,
    locale: "es_CR",
    image: "https://images.unsplash.com/photo-1536708880921-03a9306ec47d?q=70&w=1200&auto=format&fit=crop"
  },
};

const DESTINATIONS_BY_CITY: Record<string, DestinationRoute[]> = {
  bogota: [
    { destCity: "Madrid", destCountry: "España", destCode: "MAD", duration: "9h 35m", connectionType: "Directo", airlines: ["Avianca", "LATAM", "Iberia"], badge: "Mas Popular" },
    { destCity: "Paris", destCountry: "Francia", destCode: "CDG", duration: "9h 50m", connectionType: "Directo", airlines: ["Air France", "LATAM", "Avianca"], badge: "Romantico" },
    { destCity: "Barcelona", destCountry: "España", destCode: "BCN", duration: "11-13h", connectionType: "Conexion", airlines: ["LATAM", "Iberia", "United"], badge: "Playa" },
    { destCity: "Roma", destCountry: "Italia", destCode: "FCO", duration: "12-14h", connectionType: "Conexion (MAD/LIS)", airlines: ["LATAM", "Alitalia"], badge: "Cultural" },
    { destCity: "Lisboa", destCountry: "Portugal", destCode: "LIS", duration: "10-12h", connectionType: "Conexion", airlines: ["TAP", "LATAM", "Iberia"], badge: "Economico" },
    { destCity: "Florencia", destCountry: "Italia", destCode: "FLR", duration: "12-15h", connectionType: "Conexion", airlines: ["LATAM", "Iberia"] },
    { destCity: "Amsterdam", destCountry: "Paises Bajos", destCode: "AMS", duration: "12-14h", connectionType: "Conexion", airlines: ["KLM", "LATAM"] },
    { destCity: "Londres", destCountry: "Reino Unido", destCode: "LHR", duration: "11-13h", connectionType: "Conexion", airlines: ["LATAM", "BA", "United"] },
  ],
  cdmx: [
    { destCity: "Madrid", destCountry: "España", destCode: "MAD", duration: "11h", connectionType: "Directo", airlines: ["Aeromexico", "Iberia"], badge: "Mas Popular" },
    { destCity: "Paris", destCountry: "Francia", destCode: "CDG", duration: "10.5h", connectionType: "Directo", airlines: ["Air France", "Aeromexico"], badge: "Romantico" },
    { destCity: "Barcelona", destCountry: "España", destCode: "BCN", duration: "11-13h", connectionType: "Conexion", airlines: ["LATAM", "Iberia"] },
    { destCity: "Roma", destCountry: "Italia", destCode: "FCO", duration: "12-15h", connectionType: "Conexion Miami/Madrid", airlines: ["LATAM", "Alitalia"] },
    { destCity: "Lisboa", destCountry: "Portugal", destCode: "LIS", duration: "10h", connectionType: "Directo", airlines: ["TAP", "LATAM"] },
    { destCity: "Londres", destCountry: "Reino Unido", destCode: "LHR", duration: "10-12h", connectionType: "Conexion", airlines: ["LATAM", "BA"] },
  ],
  "sao-paulo": [
    { destCity: "Lisboa", destCountry: "Portugal", destCode: "LIS", duration: "8-9h", connectionType: "Directo TAP", airlines: ["TAP", "LATAM"], badge: "Mas Popular" },
    { destCity: "Paris", destCountry: "Francia", destCode: "CDG", duration: "11-13h", connectionType: "Directo creciente", airlines: ["Air France", "TAP", "LATAM"] },
    { destCity: "Madrid", destCountry: "España", destCode: "MAD", duration: "9-11h", connectionType: "Conexion", airlines: ["TAP", "LATAM", "Iberia"] },
    { destCity: "Roma", destCountry: "Italia", destCode: "FCO", duration: "11-13h", connectionType: "Lisboa/Madrid", airlines: ["TAP", "LATAM", "Alitalia"] },
    { destCity: "Londres", destCountry: "Reino Unido", destCode: "LHR", duration: "10-11h", connectionType: "Directo TAP", airlines: ["TAP", "LATAM", "BA"] },
  ],
  "buenos-aires": [
    { destCity: "Madrid", destCountry: "España", destCode: "MAD", duration: "11-13h", connectionType: "Conexion Miami/Sao Paulo", airlines: ["LATAM", "Iberia", "Aerolineas"], badge: "Mas Popular" },
    { destCity: "Barcelona", destCountry: "España", destCode: "BCN", duration: "12-15h", connectionType: "Conexion", airlines: ["LATAM", "Iberia"] },
    { destCity: "Roma", destCountry: "Italia", destCode: "FCO", duration: "13-16h", connectionType: "Conexion", airlines: ["LATAM", "Alitalia"] },
    { destCity: "Paris", destCountry: "Francia", destCode: "CDG", duration: "12-15h", connectionType: "Conexion", airlines: ["LATAM", "Air France"] },
  ],
  lima: [
    { destCity: "Madrid", destCountry: "España", destCode: "MAD", duration: "11h 45m", connectionType: "Directo", airlines: ["LATAM", "Iberia"], badge: "Mas Popular" },
    { destCity: "Barcelona", destCountry: "España", destCode: "BCN", duration: "12-14h", connectionType: "Conexion Madrid", airlines: ["LATAM", "Iberia"] },
    { destCity: "Paris", destCountry: "Francia", destCode: "CDG", duration: "13-15h", connectionType: "Conexion", airlines: ["Air France", "LATAM"] },
    { destCity: "Roma", destCountry: "Italia", destCode: "FCO", duration: "14-16h", connectionType: "Conexion", airlines: ["LATAM", "Alitalia"] },
  ],
  panama: [
    { destCity: "Madrid", destCountry: "España", destCode: "MAD", duration: "9h 45m", connectionType: "Directo", airlines: ["Copa", "Iberia"], badge: "Mas Popular" },
    { destCity: "Paris", destCountry: "Francia", destCode: "CDG", duration: "11-13h", connectionType: "Conexion", airlines: ["Air France", "Copa"] },
    { destCity: "Barcelona", destCountry: "España", destCode: "BCN", duration: "11-13h", connectionType: "Conexion Madrid", airlines: ["Iberia", "Copa"] },
  ],
  medellin: [
    { destCity: "Madrid", destCountry: "España", destCode: "MAD", duration: "11-12h", connectionType: "Conexion BOG", airlines: ["Avianca", "LATAM"], badge: "Mas Popular" },
    { destCity: "Paris", destCountry: "Francia", destCode: "CDG", duration: "12-14h", connectionType: "Conexion BOG/MIA", airlines: ["Air France", "Avianca"] },
    { destCity: "Barcelona", destCountry: "España", destCode: "BCN", duration: "13-15h", connectionType: "Conexion", airlines: ["LATAM", "Iberia"] },
    { destCity: "Roma", destCountry: "Italia", destCode: "FCO", duration: "14-16h", connectionType: "Conexion", airlines: ["LATAM", "Alitalia"] },
    { destCity: "Lisboa", destCountry: "Portugal", destCode: "LIS", duration: "12-14h", connectionType: "Conexion", airlines: ["TAP", "LATAM"] },
  ],
  cali: [
    { destCity: "Madrid", destCountry: "España", destCode: "MAD", duration: "11-13h", connectionType: "Conexion BOG/MIA", airlines: ["Avianca", "LATAM"], badge: "Mas Popular" },
    { destCity: "Paris", destCountry: "Francia", destCode: "CDG", duration: "13-15h", connectionType: "Conexion BOG", airlines: ["Air France", "Avianca"] },
    { destCity: "Barcelona", destCountry: "España", destCode: "BCN", duration: "14-16h", connectionType: "Conexion", airlines: ["LATAM", "Iberia"] },
    { destCity: "Roma", destCountry: "Italia", destCode: "FCO", duration: "15-17h", connectionType: "Conexion", airlines: ["LATAM", "Alitalia"] },
  ],
  guadalajara: [
    { destCity: "Madrid", destCountry: "España", destCode: "MAD", duration: "12-14h", connectionType: "Conexion MEX", airlines: ["Aeromexico", "Iberia"], badge: "Mas Popular" },
    { destCity: "Paris", destCountry: "Francia", destCode: "CDG", duration: "12-14h", connectionType: "Conexion MEX", airlines: ["Air France", "Aeromexico"] },
    { destCity: "Barcelona", destCountry: "España", destCode: "BCN", duration: "13-15h", connectionType: "Conexion", airlines: ["LATAM", "Iberia"] },
    { destCity: "Lisboa", destCountry: "Portugal", destCode: "LIS", duration: "12-14h", connectionType: "Conexion MEX", airlines: ["TAP", "LATAM"] },
    { destCity: "Londres", destCountry: "Reino Unido", destCode: "LHR", duration: "12-14h", connectionType: "Conexion", airlines: ["LATAM", "BA"] },
  ],
  "rio-de-janeiro": [
    { destCity: "Lisboa", destCountry: "Portugal", destCode: "LIS", duration: "9-10h", connectionType: "Directo", airlines: ["TAP", "LATAM"], badge: "Mas Popular" },
    { destCity: "Paris", destCountry: "Francia", destCode: "CDG", duration: "11-13h", connectionType: "Conexion LIS", airlines: ["Air France", "TAP"] },
    { destCity: "Madrid", destCountry: "España", destCode: "MAD", duration: "10-12h", connectionType: "Conexion LIS", airlines: ["TAP", "LATAM", "Iberia"] },
    { destCity: "Roma", destCountry: "Italia", destCode: "FCO", duration: "12-14h", connectionType: "Conexion", airlines: ["TAP", "LATAM", "Alitalia"] },
    { destCity: "Londres", destCountry: "Reino Unido", destCode: "LHR", duration: "11-13h", connectionType: "Conexion", airlines: ["TAP", "LATAM", "BA"] },
  ],
  "san-jose": [
    { destCity: "Madrid", destCountry: "España", destCode: "MAD", duration: "12-14h", connectionType: "Conexion PTY/MIA", airlines: ["Copa", "Iberia"], badge: "Mas Popular" },
    { destCity: "Paris", destCountry: "Francia", destCode: "CDG", duration: "13-15h", connectionType: "Conexion", airlines: ["Air France", "Copa"] },
    { destCity: "Barcelona", destCountry: "España", destCode: "BCN", duration: "14-16h", connectionType: "Conexion PTY/MAD", airlines: ["Iberia", "Copa"] },
    { destCity: "Lisboa", destCountry: "Portugal", destCode: "LIS", duration: "13-15h", connectionType: "Conexion", airlines: ["TAP", "Copa"] },
  ],
};

const PACKAGES: Package[] = [
  {
    id: "europa-clasica",
    title: "Europa Clasica",
    description: "Visita los tres destinos mas iconicos de Europa en un solo viaje.",
    itinerary: "Madrid - Roma - Paris",
    days: 14,
    nights: 13,
    includes: ["Vuelos internacionales y domesticos", "Hoteles 4 estrellas", "Desayuno incluido", "Tours guiados", "Seguro completo"]
  },
  {
    id: "europa-romantica",
    title: "Europa Romantica",
    description: "Perfecto para parejas. Ciudades romanticas y momentos inolvidables.",
    itinerary: "Madrid - Barcelona - Paris - Amsterdam",
    days: 15,
    nights: 14,
    includes: ["Vuelos internacionales", "Hoteles 5 estrellas", "Desayuno incluido", "Cenas romanticas", "Tours privados", "Seguro completo"]
  },
  {
    id: "europa-aventura",
    title: "Europa Aventura",
    description: "Para los viajeros jovenes y aventureros. Vivencias al maximo.",
    itinerary: "Lisboa - Barcelona",
    days: 8,
    nights: 7,
    includes: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayuno incluido", "Actividades de aventura", "Tours guiados", "Seguro"]
  },
  {
    id: "europa-lujo",
    title: "Europa Lujo",
    description: "Experiencia premium. Hoteles 5 estrellas y servicios exclusivos.",
    itinerary: "Paris - Zurich - Milan - Florencia - Roma",
    days: 12,
    nights: 11,
    includes: ["Vuelos primera clase", "Hoteles 5 estrellas", "Pension completa", "Tours privados", "Degustaciones", "Seguro VIP"]
  },
];

const FAQ_ITEMS = [
  {
    question: "Necesito visa para viajar a Europa?",
    answer: "Depende de tu nacionalidad. Ciudadanos de Mexico, Argentina, Brasil, Panama y Costa Rica pueden viajar sin visa hasta 90 dias. Ciudadanos de Colombia y Peru requieren visa Schengen."
  },
  {
    question: "Hay vuelos directos disponibles?",
    answer: "Si, existen vuelos directos desde las principales ciudades hacia Madrid, Paris y Lisboa. Otros destinos requieren una conexion, tipicamente de 1-3 horas."
  },
  {
    question: "Cual es la mejor epoca para viajar?",
    answer: "Primavera (Abril-Junio) y Otono (Septiembre-Octubre) son las mejores epocas con clima perfecto y menos turistas. Verano es temporada alta con precios mas elevados."
  },
  {
    question: "Que incluyen los paquetes?",
    answer: "Nuestros paquetes incluyen vuelos internacionales ida y vuelta, hoteles 4-5 estrellas, desayuno diario, tours guiados, seguro de viaje y traslados aeropuerto-hotel."
  },
  {
    question: "Puedo personalizar mi paquete?",
    answer: "Absolutamente! Somos expertos en disenar viajes a la medida. Puedes cambiar fechas, agregar destinos, extender el viaje y agregar actividades especiales."
  },
  {
    question: "Cual es la politica de cancelacion?",
    answer: "Ofrecemos cancelacion flexible: mas de 60 dias antes reembolso 100%, 30-60 dias retencion 25%, 15-30 dias retencion 50%. El seguro incluido cubre cancelaciones por fuerza mayor."
  },
];

export default function CityOriginTemplate() {
  const { language } = useI18n();
  const [, params] = useRoute("/from/:country/:city");
  const citySlug = params?.city || "bogota";
  const countrySlug = params?.country || "colombia";
  
  const cityData = CITIES_DATA[citySlug] || CITIES_DATA["bogota"];
  const destinations = DESTINATIONS_BY_CITY[citySlug] || DESTINATIONS_BY_CITY["bogota"] || [];
  
  const content = {
    es: {
      breadcrumbHome: "Inicio",
      breadcrumbFrom: "Viaja Desde",
      hero: `Viajes a Europa desde ${cityData.city}`,
      heroSubtitle: `Paquetes Turisticos 2025`,
      lead: `Descubre los mejores paquetes turisticos a Europa desde ${cityData.city}. Con TripsEuropa, viajar es facil, seguro y asequible.`,
      stats: {
        population: "Habitantes",
        directFlight: "Vuelo directo a Madrid",
        destinations: "Destinos disponibles"
      },
      cta: "Cotiza tu Viaje Ahora",
      sections: {
        destinations: "Destinos Populares",
        destinationsDesc: `${cityData.city} es un importante hub de salida hacia Europa, con el ${cityData.airport} (${cityData.cityCode}) ofreciendo conexiones a multiples ciudades europeas.`,
        routes: "Rutas Mas Solicitadas",
        routesDesc: "Estas son las rutas con mayor demanda. Ofrecemos vuelos directos, mejores precios y todas las comodidades incluidas.",
        packages: "Paquetes Mas Populares",
        packagesDesc: "Estos son nuestros paquetes favoritos. Incluyen vuelos, hoteles, seguro y mas.",
        whyCity: `Por que Viajar desde ${cityData.city}?`,
        airlines: "Aerolineas Disponibles",
        practical: "Guia Practica: Informacion Importante",
        testimonials: "Testimonios de Viajeros",
        faq: "Preguntas Frecuentes",
        otherOrigins: `Otros Origenes en ${cityData.country}`,
        ctaFinal: "Listo para tu Aventura a Europa?"
      },
      table: {
        destination: "Destino",
        country: "Pais",
        iata: "Codigo IATA",
        duration: "Tiempo Vuelo",
        connection: "Tipo Conexion"
      },
      viewPackages: "Ver paquetes",
      days: "dias",
      nights: "noches",
      includes: "Incluye",
      viewDetails: "Ver detalles",
      documentation: "Documentacion Requerida",
      docItems: [
        "Pasaporte valido por al menos 6 meses",
        cityData.visaRequired ? "Visa Schengen requerida" : "Exencion de visa 90 dias (zona Schengen)",
        "Seguro de viaje (incluido en nuestros paquetes)",
        "Tarjeta de credito/debito internacional"
      ],
      bestTime: "Mejor Epoca para Viajar",
      seasons: [
        { name: "Primavera", months: "Abril - Junio", temp: "15-25C", rating: "EXCELENTE" },
        { name: "Verano", months: "Julio - Agosto", temp: "20-30C", rating: "BUENO (temporada alta)" },
        { name: "Otono", months: "Septiembre - Octubre", temp: "12-20C", rating: "EXCELENTE" },
        { name: "Invierno", months: "Noviembre - Marzo", temp: "5-15C", rating: "REGULAR" }
      ],
      currency: "Conversion de Monedas",
      currencyInfo: "Moneda local Europa: EUR (Euro)",
      contact: "Contactanos",
      phone: "Telefono",
      email: "Email",
      whatsapp: "WhatsApp",
      office: "Oficina Central"
    },
    en: {
      breadcrumbHome: "Home",
      breadcrumbFrom: "Travel From",
      hero: `Travel to Europe from ${cityData.city}`,
      heroSubtitle: `Travel Packages 2025`,
      lead: `Discover the best travel packages to Europe from ${cityData.city}. With TripsEuropa, traveling is easy, safe, and affordable.`,
      stats: {
        population: "Residents",
        directFlight: "Direct flight to Madrid",
        destinations: "Available destinations"
      },
      cta: "Get Your Quote Now",
      sections: {
        destinations: "Popular Destinations",
        destinationsDesc: `${cityData.city} is a major hub for Europe departures, with ${cityData.airport} (${cityData.cityCode}) offering connections to multiple European cities.`,
        routes: "Most Requested Routes",
        routesDesc: "These are the most popular routes. We offer direct flights, best prices, and all amenities included.",
        packages: "Most Popular Packages",
        packagesDesc: "These are our favorite packages. They include flights, hotels, insurance, and more.",
        whyCity: `Why Travel from ${cityData.city}?`,
        airlines: "Available Airlines",
        practical: "Practical Guide: Important Information",
        testimonials: "Traveler Testimonials",
        faq: "Frequently Asked Questions",
        otherOrigins: `Other Origins in ${cityData.country}`,
        ctaFinal: "Ready for Your European Adventure?"
      },
      table: {
        destination: "Destination",
        country: "Country",
        iata: "IATA Code",
        duration: "Flight Time",
        connection: "Connection Type"
      },
      viewPackages: "View packages",
      days: "days",
      nights: "nights",
      includes: "Includes",
      viewDetails: "View details",
      documentation: "Required Documentation",
      docItems: [
        "Valid passport for at least 6 months",
        cityData.visaRequired ? "Schengen visa required" : "Visa exemption 90 days (Schengen zone)",
        "Travel insurance (included in our packages)",
        "International credit/debit card"
      ],
      bestTime: "Best Time to Travel",
      seasons: [
        { name: "Spring", months: "April - June", temp: "15-25C", rating: "EXCELLENT" },
        { name: "Summer", months: "July - August", temp: "20-30C", rating: "GOOD (peak season)" },
        { name: "Fall", months: "September - October", temp: "12-20C", rating: "EXCELLENT" },
        { name: "Winter", months: "November - March", temp: "5-15C", rating: "FAIR" }
      ],
      currency: "Currency Exchange",
      currencyInfo: "Local currency Europe: EUR (Euro)",
      contact: "Contact Us",
      phone: "Phone",
      email: "Email",
      whatsapp: "WhatsApp",
      office: "Main Office"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEOHead
        title={`${t.hero} | Paquetes TripsEuropa`}
        description={`Paquetes turisticos a Europa desde ${cityData.city}. Vuelos incluidos, hoteles 4-5 estrellas, seguro completo. Consulta disponibilidad.`}
        keywords={`viajes Europa ${cityData.city}, paquetes ${cityData.city} Madrid, tour ${cityData.city} Paris, agencia viajes ${cityData.city}`}
        url={`https://tripseuropa.com/from/${countrySlug}/${citySlug}`}
        locale={cityData.locale}
        alternateUrls={[
          { hreflang: `es-${cityData.countryCode}`, href: `https://tripseuropa.com/from/${countrySlug}/${citySlug}` }
        ]}
      />
      <BreadcrumbSchema items={[
        { name: t.breadcrumbHome, url: "https://tripseuropa.com" },
        { name: t.breadcrumbFrom, url: "https://tripseuropa.com/from" },
        { name: cityData.country, url: `https://tripseuropa.com/from/${countrySlug}` },
        { name: cityData.city, url: `https://tripseuropa.com/from/${countrySlug}/${citySlug}` }
      ]} />
      <FAQSchema questions={FAQ_ITEMS.map(f => ({ question: f.question, answer: f.answer }))} />
      <LocalBusinessSchema country={cityData.country} city={cityData.city} />
      
      <Header />
      
      <nav className="container mx-auto px-4 py-4 text-sm" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
          <li><Link href="/" className="hover:text-accent">{t.breadcrumbHome}</Link></li>
          <ChevronRight className="w-4 h-4" />
          <li><Link href="/from" className="hover:text-accent">{t.breadcrumbFrom}</Link></li>
          <ChevronRight className="w-4 h-4" />
          <li><Link href={`/desde-${countrySlug}`} className="hover:text-accent">{cityData.country}</Link></li>
          <ChevronRight className="w-4 h-4" />
          <li className="font-medium text-foreground">{cityData.city}</li>
        </ol>
      </nav>

      <section className="relative py-24 md:py-32 bg-primary overflow-hidden" data-testid="section-city-hero">
        <div className="absolute inset-0 opacity-30">
          <img 
            src={cityData.image}
            alt={`Viajes a Europa desde ${cityData.city}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent mb-4" data-testid="text-city-h1">
              {t.hero} | {t.heroSubtitle}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl" data-testid="text-city-lead">
              {t.lead}
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
                <div className="text-2xl font-bold text-accent">{cityData.population}</div>
                <div className="text-white/70 text-sm">{t.stats.population}</div>
              </div>
              {cityData.directFlights.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
                  <div className="text-2xl font-bold text-accent">{destinations[0]?.duration || "9h+"}</div>
                  <div className="text-white/70 text-sm">{t.stats.directFlight}</div>
                </div>
              )}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
                <div className="text-2xl font-bold text-accent">{destinations.length}+</div>
                <div className="text-white/70 text-sm">{t.stats.destinations}</div>
              </div>
            </div>

            <a href="https://wa.me/34611105448" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-accent text-primary font-bold hover:bg-accent/90 text-lg px-8">
                {t.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-destinations">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-4">{t.sections.destinations}</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">{t.sections.destinationsDesc}</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" data-testid="table-destinations">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-3 text-left">{t.table.destination}</th>
                  <th className="px-4 py-3 text-left">{t.table.country}</th>
                  <th className="px-4 py-3 text-left">{t.table.iata}</th>
                  <th className="px-4 py-3 text-left">{t.table.duration}</th>
                  <th className="px-4 py-3 text-left">{t.table.connection}</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((dest, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-3 font-medium">{dest.destCity}</td>
                    <td className="px-4 py-3">{dest.destCountry}</td>
                    <td className="px-4 py-3 font-mono">{dest.destCode}</td>
                    <td className="px-4 py-3">{dest.duration}</td>
                    <td className="px-4 py-3">{dest.connectionType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-routes">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-4">{t.sections.routes}</h2>
          <p className="text-muted-foreground mb-8">{t.sections.routesDesc}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.slice(0, 6).map((dest, index) => (
              <Card key={index} className="relative overflow-visible">
                {dest.badge && (
                  <Badge className="absolute -top-2 right-4 bg-accent text-primary z-10">
                    {dest.badge}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>{cityData.city}</span>
                    <ArrowRight className="w-4 h-4 text-accent" />
                    <span>{dest.destCity}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Codigo Ruta:</span>
                      <span className="font-mono">{cityData.cityCode}-{dest.destCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duracion:</span>
                      <span>{dest.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conexion:</span>
                      <span>{dest.connectionType}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-muted-foreground text-xs">Aerolineas: </span>
                      <span className="text-xs">{dest.airlines.join(", ")}</span>
                    </div>
                  </div>
                  <Link href={`/routes/${cityData.cityCode.toLowerCase()}-${dest.destCode.toLowerCase()}`}>
                    <Button variant="outline" className="w-full mt-4">
                      {t.viewPackages} {cityData.city}-{dest.destCity}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-packages">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-4">{t.sections.packages}</h2>
          <p className="text-muted-foreground mb-8">{t.sections.packagesDesc}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.map((pkg) => (
              <Card key={pkg.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">{pkg.itinerary}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">{t.includes}:</p>
                    <ul className="space-y-1">
                      {pkg.includes.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href={`/packages/${pkg.id}`}>
                    <Button className="w-full">{t.viewDetails}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-practical">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-8">{t.sections.practical}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  {t.documentation}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.docItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  {t.bestTime}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {t.seasons.map((season, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div>
                        <span className="font-medium">{season.name}</span>
                        <span className="text-muted-foreground ml-2">({season.months})</span>
                      </div>
                      <Badge variant={season.rating.includes("EXCELENTE") || season.rating.includes("EXCELLENT") ? "default" : "secondary"} className="text-xs">
                        {season.rating}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-accent" />
                  {t.sections.whyCity}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span>{cityData.airport}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Globe className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span>{cityData.timezone}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Thermometer className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span>{cityData.climate}</span>
                  </li>
                  {cityData.directFlights.length > 0 && (
                    <li className="flex items-start gap-2">
                      <Plane className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Vuelos directos: {cityData.directFlights.join(", ")}</span>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-accent mb-8">{t.sections.faq}</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((faq, index) => (
              <details key={index} className="group border rounded-lg p-4" data-testid={`faq-item-${index}`}>
                <summary className="cursor-pointer font-medium flex items-center justify-between">
                  <span>{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-accent transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white" data-testid="section-cta-final">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-accent mb-6">{t.sections.ctaFinal}</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-accent" />
              <span>{t.phone}: +34 900 123 456</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-accent" />
              <span>{t.email}: info@tripseuropa.com</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/34611105448" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-accent text-primary font-bold hover:bg-accent/90">
                {t.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                {t.contact}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
