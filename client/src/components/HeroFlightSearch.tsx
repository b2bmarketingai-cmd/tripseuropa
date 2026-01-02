import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es, enUS, ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, Plane, ArrowRight, ArrowLeft, Users, Minus, Plus, User, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ShareTrip } from "./ShareTrip";

const AIRPORTS = [
  // CO - Colombia
  { code: "BOG", city: "Bogota", country: "Colombia", countryCode: "CO" },
  { code: "MDE", city: "Medellin", country: "Colombia", countryCode: "CO" },
  { code: "CLO", city: "Cali", country: "Colombia", countryCode: "CO" },
  { code: "CTG", city: "Cartagena", country: "Colombia", countryCode: "CO" },
  { code: "BAQ", city: "Barranquilla", country: "Colombia", countryCode: "CO" },
  { code: "SMR", city: "Santa Marta", country: "Colombia", countryCode: "CO" },
  { code: "BGA", city: "Bucaramanga", country: "Colombia", countryCode: "CO" },
  { code: "PEI", city: "Pereira", country: "Colombia", countryCode: "CO" },
  { code: "ADZ", city: "San Andres", country: "Colombia", countryCode: "CO" },
  // MX - Mexico
  { code: "MEX", city: "Ciudad de Mexico", country: "Mexico", countryCode: "MX" },
  { code: "GDL", city: "Guadalajara", country: "Mexico", countryCode: "MX" },
  { code: "CUN", city: "Cancun", country: "Mexico", countryCode: "MX" },
  { code: "MTY", city: "Monterrey", country: "Mexico", countryCode: "MX" },
  { code: "TIJ", city: "Tijuana", country: "Mexico", countryCode: "MX" },
  { code: "PVR", city: "Puerto Vallarta", country: "Mexico", countryCode: "MX" },
  { code: "SJD", city: "San Jose del Cabo", country: "Mexico", countryCode: "MX" },
  { code: "MID", city: "Merida", country: "Mexico", countryCode: "MX" },
  // BR - Brasil
  { code: "GRU", city: "Sao Paulo (Guarulhos)", country: "Brasil", countryCode: "BR" },
  { code: "CGH", city: "Sao Paulo (Congonhas)", country: "Brasil", countryCode: "BR" },
  { code: "GIG", city: "Rio de Janeiro (Galeao)", country: "Brasil", countryCode: "BR" },
  { code: "SDU", city: "Rio de Janeiro (Santos Dumont)", country: "Brasil", countryCode: "BR" },
  { code: "BSB", city: "Brasilia", country: "Brasil", countryCode: "BR" },
  { code: "CNF", city: "Belo Horizonte", country: "Brasil", countryCode: "BR" },
  { code: "SSA", city: "Salvador", country: "Brasil", countryCode: "BR" },
  { code: "REC", city: "Recife", country: "Brasil", countryCode: "BR" },
  { code: "FOR", city: "Fortaleza", country: "Brasil", countryCode: "BR" },
  { code: "POA", city: "Porto Alegre", country: "Brasil", countryCode: "BR" },
  { code: "CWB", city: "Curitiba", country: "Brasil", countryCode: "BR" },
  { code: "FLN", city: "Florianopolis", country: "Brasil", countryCode: "BR" },
  // AR - Argentina
  { code: "EZE", city: "Buenos Aires (Ezeiza)", country: "Argentina", countryCode: "AR" },
  { code: "AEP", city: "Buenos Aires (Aeroparque)", country: "Argentina", countryCode: "AR" },
  { code: "COR", city: "Cordoba", country: "Argentina", countryCode: "AR" },
  { code: "MDZ", city: "Mendoza", country: "Argentina", countryCode: "AR" },
  { code: "ROS", city: "Rosario", country: "Argentina", countryCode: "AR" },
  { code: "BRC", city: "Bariloche", country: "Argentina", countryCode: "AR" },
  { code: "IGR", city: "Iguazu", country: "Argentina", countryCode: "AR" },
  { code: "SLA", city: "Salta", country: "Argentina", countryCode: "AR" },
  // PE - Peru
  { code: "LIM", city: "Lima", country: "Peru", countryCode: "PE" },
  { code: "CUZ", city: "Cusco", country: "Peru", countryCode: "PE" },
  { code: "AQP", city: "Arequipa", country: "Peru", countryCode: "PE" },
  { code: "TRU", city: "Trujillo", country: "Peru", countryCode: "PE" },
  { code: "PIU", city: "Piura", country: "Peru", countryCode: "PE" },
  // PA - Panama
  { code: "PTY", city: "Ciudad de Panama", country: "Panama", countryCode: "PA" },
  { code: "DAV", city: "David", country: "Panama", countryCode: "PA" },
  { code: "BOC", city: "Bocas del Toro", country: "Panama", countryCode: "PA" },
  // CR - Costa Rica
  { code: "SJO", city: "San Jose", country: "Costa Rica", countryCode: "CR" },
  { code: "LIR", city: "Liberia", country: "Costa Rica", countryCode: "CR" },
  // DO - Republica Dominicana
  { code: "SDQ", city: "Santo Domingo", country: "Rep. Dominicana", countryCode: "DO" },
  { code: "PUJ", city: "Punta Cana", country: "Rep. Dominicana", countryCode: "DO" },
  { code: "STI", city: "Santiago", country: "Rep. Dominicana", countryCode: "DO" },
  { code: "POP", city: "Puerto Plata", country: "Rep. Dominicana", countryCode: "DO" },
  // CB - Caribe
  { code: "HAV", city: "La Habana", country: "Cuba (Caribe)", countryCode: "CB" },
  { code: "VRA", city: "Varadero", country: "Cuba (Caribe)", countryCode: "CB" },
  { code: "MBJ", city: "Montego Bay", country: "Jamaica (Caribe)", countryCode: "CB" },
  { code: "KIN", city: "Kingston", country: "Jamaica (Caribe)", countryCode: "CB" },
  { code: "SXM", city: "Sint Maarten", country: "San Martin (Caribe)", countryCode: "CB" },
  { code: "AUA", city: "Aruba", country: "Aruba (Caribe)", countryCode: "CB" },
  { code: "CUR", city: "Curacao", country: "Curacao (Caribe)", countryCode: "CB" },
  { code: "NAS", city: "Nassau", country: "Bahamas (Caribe)", countryCode: "CB" },
  { code: "POS", city: "Puerto Espana", country: "Trinidad (Caribe)", countryCode: "CB" },
  { code: "BGI", city: "Bridgetown", country: "Barbados (Caribe)", countryCode: "CB" },
  // Others Latin America
  { code: "SCL", city: "Santiago", country: "Chile", countryCode: "CL" },
  { code: "UIO", city: "Quito", country: "Ecuador", countryCode: "EC" },
  { code: "GYE", city: "Guayaquil", country: "Ecuador", countryCode: "EC" },
  { code: "CCS", city: "Caracas", country: "Venezuela", countryCode: "VE" },
  { code: "MVD", city: "Montevideo", country: "Uruguay", countryCode: "UY" },
  { code: "LPB", city: "La Paz", country: "Bolivia", countryCode: "BO" },
  { code: "VVI", city: "Santa Cruz", country: "Bolivia", countryCode: "BO" },
  { code: "ASU", city: "Asuncion", country: "Paraguay", countryCode: "PY" },
  { code: "GUA", city: "Guatemala City", country: "Guatemala", countryCode: "GT" },
  { code: "SAL", city: "San Salvador", country: "El Salvador", countryCode: "SV" },
  { code: "TGU", city: "Tegucigalpa", country: "Honduras", countryCode: "HN" },
  { code: "MGA", city: "Managua", country: "Nicaragua", countryCode: "NI" },
  // Europe - España
  { code: "MAD", city: "Madrid", country: "Espana", countryCode: "ES" },
  { code: "BCN", city: "Barcelona", country: "Espana", countryCode: "ES" },
  { code: "VLC", city: "Valencia", country: "Espana", countryCode: "ES" },
  { code: "AGP", city: "Malaga", country: "Espana", countryCode: "ES" },
  { code: "SVQ", city: "Sevilla", country: "Espana", countryCode: "ES" },
  { code: "PMI", city: "Palma de Mallorca", country: "Espana", countryCode: "ES" },
  { code: "TFS", city: "Tenerife Sur", country: "Espana", countryCode: "ES" },
  { code: "LPA", city: "Gran Canaria", country: "Espana", countryCode: "ES" },
  { code: "BIO", city: "Bilbao", country: "Espana", countryCode: "ES" },
  { code: "ALC", city: "Alicante", country: "Espana", countryCode: "ES" },
  // Europe - Francia
  { code: "CDG", city: "Paris (Charles de Gaulle)", country: "Francia", countryCode: "FR" },
  { code: "ORY", city: "Paris (Orly)", country: "Francia", countryCode: "FR" },
  { code: "LYS", city: "Lyon", country: "Francia", countryCode: "FR" },
  { code: "MRS", city: "Marsella", country: "Francia", countryCode: "FR" },
  { code: "NCE", city: "Niza", country: "Francia", countryCode: "FR" },
  // Europe - Italia
  { code: "FCO", city: "Roma (Fiumicino)", country: "Italia", countryCode: "IT" },
  { code: "MXP", city: "Milan (Malpensa)", country: "Italia", countryCode: "IT" },
  { code: "VCE", city: "Venecia", country: "Italia", countryCode: "IT" },
  { code: "FLR", city: "Florencia", country: "Italia", countryCode: "IT" },
  { code: "NAP", city: "Napoles", country: "Italia", countryCode: "IT" },
  // Europe - Others
  { code: "LHR", city: "Londres (Heathrow)", country: "Reino Unido", countryCode: "GB" },
  { code: "LGW", city: "Londres (Gatwick)", country: "Reino Unido", countryCode: "GB" },
  { code: "MAN", city: "Manchester", country: "Reino Unido", countryCode: "GB" },
  { code: "AMS", city: "Amsterdam", country: "Paises Bajos", countryCode: "NL" },
  { code: "FRA", city: "Frankfurt", country: "Alemania", countryCode: "DE" },
  { code: "MUC", city: "Munich", country: "Alemania", countryCode: "DE" },
  { code: "BER", city: "Berlin", country: "Alemania", countryCode: "DE" },
  { code: "LIS", city: "Lisboa", country: "Portugal", countryCode: "PT" },
  { code: "OPO", city: "Oporto", country: "Portugal", countryCode: "PT" },
  { code: "ATH", city: "Atenas", country: "Grecia", countryCode: "GR" },
  { code: "SKG", city: "Tesalonica", country: "Grecia", countryCode: "GR" },
  { code: "JTR", city: "Santorini", country: "Grecia", countryCode: "GR" },
  { code: "PRG", city: "Praga", country: "Republica Checa", countryCode: "CZ" },
  { code: "VIE", city: "Viena", country: "Austria", countryCode: "AT" },
  { code: "ZRH", city: "Zurich", country: "Suiza", countryCode: "CH" },
  { code: "GVA", city: "Ginebra", country: "Suiza", countryCode: "CH" },
  { code: "BRU", city: "Bruselas", country: "Belgica", countryCode: "BE" },
  { code: "CPH", city: "Copenhague", country: "Dinamarca", countryCode: "DK" },
  { code: "DUB", city: "Dublin", country: "Irlanda", countryCode: "IE" },
  { code: "OSL", city: "Oslo", country: "Noruega", countryCode: "NO" },
  { code: "ARN", city: "Estocolmo", country: "Suecia", countryCode: "SE" },
  { code: "HEL", city: "Helsinki", country: "Finlandia", countryCode: "FI" },
  { code: "WAW", city: "Varsovia", country: "Polonia", countryCode: "PL" },
  { code: "BUD", city: "Budapest", country: "Hungria", countryCode: "HU" },
  { code: "ZAG", city: "Zagreb", country: "Croacia", countryCode: "HR" },
  { code: "IST", city: "Estambul", country: "Turquia", countryCode: "TR" },
  { code: "KEF", city: "Reikiavik", country: "Islandia", countryCode: "IS" },
];

export function HeroFlightSearch() {
  const { language } = useI18n();
  const [step, setStep] = useState<1 | 2>(1);
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [originSearch, setOriginSearch] = useState("");
  const [destSearch, setDestSearch] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  const dateLocale = language === "es" ? es : language === "pt" ? ptBR : enUS;

  const filteredOrigins = originSearch.length > 0 
    ? AIRPORTS.filter(
        (a) =>
          a.city.toLowerCase().includes(originSearch.toLowerCase()) ||
          a.code.toLowerCase().includes(originSearch.toLowerCase()) ||
          a.country.toLowerCase().includes(originSearch.toLowerCase())
      )
    : AIRPORTS;

  const filteredDests = destSearch.length > 0
    ? AIRPORTS.filter(
        (a) =>
          a.city.toLowerCase().includes(destSearch.toLowerCase()) ||
          a.code.toLowerCase().includes(destSearch.toLowerCase()) ||
          a.country.toLowerCase().includes(destSearch.toLowerCase())
      )
    : AIRPORTS;

  const handleNextStep = () => {
    if (step === 1) {
      const trimmedOrigin = origin.trim();
      const trimmedDest = destination.trim();
      setOrigin(trimmedOrigin);
      setDestination(trimmedDest);
      if (!trimmedOrigin || !trimmedDest || !departureDate) {
        const msgs = {
          es: { title: "Informacion incompleta", desc: "Por favor completa origen, destino y fecha de salida" },
          en: { title: "Missing information", desc: "Please fill in origin, destination and departure date" },
          pt: { title: "Informacao incompleta", desc: "Por favor preencha origem, destino e data de partida" }
        };
        const m = msgs[language as keyof typeof msgs] || msgs.es;
        toast({ title: m.title, description: m.desc, variant: "destructive" });
        return;
      }
      if (tripType === "roundtrip" && !returnDate) {
        const msgs = {
          es: { title: "Fecha de regreso requerida", desc: "Por favor selecciona la fecha de regreso" },
          en: { title: "Return date required", desc: "Please select a return date" },
          pt: { title: "Data de retorno obrigatoria", desc: "Por favor selecione a data de retorno" }
        };
        const m = msgs[language as keyof typeof msgs] || msgs.es;
        toast({ title: m.title, description: m.desc, variant: "destructive" });
        return;
      }
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!fullName.trim() || !phoneNumber.trim()) {
      const msgs = {
        es: { title: "Datos de contacto incompletos", desc: "Por favor ingresa tu nombre y telefono" },
        en: { title: "Contact info incomplete", desc: "Please enter your name and phone number" },
        pt: { title: "Dados de contato incompletos", desc: "Por favor insira seu nome e telefone" }
      };
      const m = msgs[language as keyof typeof msgs] || msgs.es;
      toast({ title: m.title, description: m.desc, variant: "destructive" });
      return;
    }

    const tripTypeText = tripType === "roundtrip" 
      ? (language === "es" ? "Ida y Vuelta" : language === "pt" ? "Ida e Volta" : "Round Trip")
      : (language === "es" ? "Solo Ida" : language === "pt" ? "Somente Ida" : "One Way");
    
    const departureDateStr = departureDate ? format(departureDate, "d MMM yyyy", { locale: dateLocale }) : "";
    const returnDateStr = returnDate && tripType === "roundtrip" 
      ? format(returnDate, "d MMM yyyy", { locale: dateLocale }) 
      : "";

    const message = language === "es"
      ? `Hola! Soy ${fullName} y estoy interesado en un vuelo:

*Nombre:* ${fullName}
*Telefono:* ${phoneNumber}
*Tipo de viaje:* ${tripTypeText}
*Origen:* ${origin}
*Destino:* ${destination}
*Fecha de salida:* ${departureDateStr}${returnDateStr ? `\n*Fecha de regreso:* ${returnDateStr}` : ""}
*Pasajeros:* ${passengers}

Me pueden ayudar con la cotizacion?`
      : language === "pt"
      ? `Ola! Sou ${fullName} e estou interessado em um voo:

*Nome:* ${fullName}
*Telefone:* ${phoneNumber}
*Tipo de viagem:* ${tripTypeText}
*Origem:* ${origin}
*Destino:* ${destination}
*Data de partida:* ${departureDateStr}${returnDateStr ? `\n*Data de retorno:* ${returnDateStr}` : ""}
*Passageiros:* ${passengers}

Podem me ajudar com o orcamento?`
      : `Hello! I'm ${fullName} and I'm interested in a flight:

*Name:* ${fullName}
*Phone:* ${phoneNumber}
*Trip type:* ${tripTypeText}
*Origin:* ${origin}
*Destination:* ${destination}
*Departure date:* ${departureDateStr}${returnDateStr ? `\n*Return date:* ${returnDateStr}` : ""}
*Passengers:* ${passengers}

Can you help me with a quote?`;

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: "cliente@busqueda.com",
          phone: phoneNumber,
          originCountry: origin,
          serviceInterest: `Vuelo: ${origin} → ${destination}`,
          message: `Tipo: ${tripTypeText}, Salida: ${departureDateStr}, Regreso: ${returnDateStr || "N/A"}, Pasajeros: ${passengers}`
        })
      });
    } catch {
      // Continue even if email fails
    }

    const whatsappUrl = `https://wa.me/34611105448?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const content = {
    es: {
      title: "Agencia de Viajes Trips Europa",
      subtitle: "Estas planeando tu proximo viaje a Europa? Quieres encontrar el mejor precio y la mejor experiencia? Usa nuestro buscador, porque en Trips Europa tenemos lo que necesitas.",
      roundtrip: "Ida y Vuelta",
      oneway: "Solo Ida",
      origin: "Origen",
      destination: "Destino",
      originPlaceholder: "Ciudad o pais de origen",
      destPlaceholder: "Ciudad o pais de destino",
      selectFirst: "Seleccione primero ORIGEN",
      departure: "Salida",
      return: "Vuelta",
      selectDate: "Seleccionar",
      passengers: "Pasajeros",
      next: "Siguiente",
      back: "Volver",
      fullName: "Nombre completo",
      phone: "Numero de telefono",
      step1Title: "Paso 1: Detalles del viaje",
      step2Title: "Paso 2: Datos de contacto",
      tripSummary: "Resumen de tu viaje",
      contactToWhatsapp: "Contactar por WhatsApp",
    },
    en: {
      title: "Trips Europa Travel Agency",
      subtitle: "Planning your next trip to Europe? Looking for the best price and experience? Use our search engine, because at Trips Europa we have what you need.",
      roundtrip: "Round Trip",
      oneway: "One Way",
      origin: "Origin",
      destination: "Destination",
      originPlaceholder: "City or country of origin",
      destPlaceholder: "City or country of destination",
      selectFirst: "Select ORIGIN first",
      departure: "Departure",
      return: "Return",
      selectDate: "Select",
      passengers: "Passengers",
      next: "Next",
      back: "Back",
      fullName: "Full name",
      phone: "Phone number",
      step1Title: "Step 1: Trip details",
      step2Title: "Step 2: Contact info",
      tripSummary: "Your trip summary",
      contactToWhatsapp: "Contact via WhatsApp",
    },
    pt: {
      title: "Agencia de Viagens Trips Europa",
      subtitle: "Esta planejando sua proxima viagem para a Europa? Quer encontrar o melhor preco e a melhor experiencia? Use nosso buscador, porque na Trips Europa temos o que voce precisa.",
      roundtrip: "Ida e Volta",
      oneway: "Somente Ida",
      origin: "Origem",
      destination: "Destino",
      originPlaceholder: "Cidade ou pais de origem",
      destPlaceholder: "Cidade ou pais de destino",
      selectFirst: "Selecione primeiro a ORIGEM",
      departure: "Partida",
      return: "Retorno",
      selectDate: "Selecionar",
      passengers: "Passageiros",
      next: "Proximo",
      back: "Voltar",
      fullName: "Nome completo",
      phone: "Numero de telefone",
      step1Title: "Passo 1: Detalhes da viagem",
      step2Title: "Passo 2: Dados de contato",
      tripSummary: "Resumo da sua viagem",
      contactToWhatsapp: "Contatar via WhatsApp",
    },
  };

  const c = content[language as keyof typeof content] || content.es;

  return (
    <div className="w-full bg-primary/95 backdrop-blur-sm py-8" data-testid="hero-flight-search">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-accent mb-2" data-testid="text-hero-title">
            {c.title}
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            {c.subtitle}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl max-w-6xl mx-auto">
          <div className="flex border-b justify-between items-center">
            <div className="flex">
              <button
                onClick={() => step === 1 && setTripType("roundtrip")}
                className={cn(
                  "px-6 py-3 text-sm font-medium transition-colors",
                  tripType === "roundtrip"
                    ? "text-accent border-b-2 border-accent bg-accent/5"
                    : "text-muted-foreground hover:text-foreground",
                  step === 2 && "opacity-50 cursor-not-allowed"
                )}
                data-testid="tab-roundtrip"
                disabled={step === 2}
              >
                {c.roundtrip}
              </button>
              <button
                onClick={() => step === 1 && setTripType("oneway")}
                className={cn(
                  "px-6 py-3 text-sm font-medium transition-colors",
                  tripType === "oneway"
                    ? "text-accent border-b-2 border-accent bg-accent/5"
                    : "text-muted-foreground hover:text-foreground",
                  step === 2 && "opacity-50 cursor-not-allowed"
                )}
                data-testid="tab-oneway"
                disabled={step === 2}
              >
                {c.oneway}
              </button>
            </div>
            <div className="px-4 flex gap-2">
              <span className={cn("w-3 h-3 rounded-full", step === 1 ? "bg-accent" : "bg-gray-300")} />
              <span className={cn("w-3 h-3 rounded-full", step === 2 ? "bg-accent" : "bg-gray-300")} />
            </div>
          </div>

          {step === 1 && (
          <div className="p-4 md:p-6">
            {/* Desktop: flex row layout */}
            <div className="hidden md:flex md:flex-row md:gap-3 md:items-end">
              {/* Origin */}
              <div className="flex-1 min-w-0 relative">
                <label className="text-xs text-muted-foreground mb-1 block">{c.origin}</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary rotate-[-45deg] z-10" />
                  <input
                    type="text"
                    placeholder={c.originPlaceholder}
                    value={originSearch}
                    onChange={(e) => {
                      setOriginSearch(e.target.value);
                      setOrigin(e.target.value);
                      setShowOriginDropdown(true);
                    }}
                    onFocus={() => setShowOriginDropdown(true)}
                    onBlur={() => {
                      setTimeout(() => setShowOriginDropdown(false), 200);
                      if (originSearch && !origin) setOrigin(originSearch);
                    }}
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                    data-testid="input-origin"
                  />
                  {showOriginDropdown && filteredOrigins.length > 0 && (
                    <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-64 overflow-y-auto">
                      {filteredOrigins.slice(0, 12).map((airport) => (
                        <button
                          key={airport.code}
                          type="button"
                          onClick={() => {
                            setOrigin(`${airport.city} (${airport.code})`);
                            setOriginSearch(`${airport.city} (${airport.code})`);
                            setShowOriginDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-accent/10 text-sm flex justify-between items-center border-b border-gray-50 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{airport.countryCode}</span>
                            <div>
                              <span className="font-medium">{airport.city}</span>
                              <span className="text-muted-foreground text-xs ml-1">{airport.country}</span>
                            </div>
                          </div>
                          <span className="text-primary font-bold text-xs bg-primary/10 px-2 py-1 rounded">{airport.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Destination */}
              <div className="flex-1 min-w-0 relative">
                <label className="text-xs text-muted-foreground mb-1 block">{c.destination}</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary rotate-45 z-10" />
                  <input
                    type="text"
                    placeholder={c.destPlaceholder}
                    value={destSearch}
                    onChange={(e) => {
                      setDestSearch(e.target.value);
                      setDestination(e.target.value);
                      setShowDestDropdown(true);
                    }}
                    onFocus={() => setShowDestDropdown(true)}
                    onBlur={() => {
                      setTimeout(() => setShowDestDropdown(false), 200);
                      if (destSearch && !destination) setDestination(destSearch);
                    }}
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                    data-testid="input-destination-desktop"
                  />
                  {showDestDropdown && filteredDests.length > 0 && (
                    <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-64 overflow-y-auto">
                      {filteredDests.slice(0, 12).map((airport) => (
                        <button
                          key={airport.code}
                          type="button"
                          onClick={() => {
                            setDestination(`${airport.city} (${airport.code})`);
                            setDestSearch(`${airport.city} (${airport.code})`);
                            setShowDestDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-accent/10 text-sm flex justify-between items-center border-b border-gray-50 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{airport.countryCode}</span>
                            <div>
                              <span className="font-medium">{airport.city}</span>
                              <span className="text-muted-foreground text-xs ml-1">{airport.country}</span>
                            </div>
                          </div>
                          <span className="text-primary font-bold text-xs bg-primary/10 px-2 py-1 rounded">{airport.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Departure Date */}
              <div className="w-36">
                <label className="text-xs text-muted-foreground mb-1 block">{c.departure}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-50 border-gray-200 h-[46px] text-sm",
                        !departureDate && "text-muted-foreground"
                      )}
                      data-testid="button-departure-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span className="truncate">{departureDate ? format(departureDate, "d MMM", { locale: dateLocale }) : c.selectDate}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={departureDate}
                      onSelect={setDepartureDate}
                      initialFocus
                      disabled={(d) => d < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Return Date */}
              <div className="w-36">
                <label className="text-xs text-muted-foreground mb-1 block">{c.return}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={tripType === "oneway"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-50 border-gray-200 h-[46px] text-sm",
                        !returnDate && "text-muted-foreground",
                        tripType === "oneway" && "opacity-50 cursor-not-allowed"
                      )}
                      data-testid="button-return-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span className="truncate">{returnDate && tripType === "roundtrip" 
                        ? format(returnDate, "d MMM", { locale: dateLocale }) 
                        : c.selectDate}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      disabled={(d) => d < (departureDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Passengers */}
              <div className="w-24">
                <label className="text-xs text-muted-foreground mb-1 block">{c.passengers}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-center bg-gray-50 border-gray-200 h-[46px] gap-2"
                      data-testid="button-passengers"
                    >
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-bold">{passengers}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-4 bg-white" align="end">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm">{c.passengers}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setPassengers(Math.max(1, passengers - 1))}
                          disabled={passengers <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center font-bold">{passengers}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setPassengers(Math.min(9, passengers + 1))}
                          disabled={passengers >= 9}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Next Button */}
              <div>
                <label className="text-xs text-transparent mb-1 block">.</label>
                <Button
                  onClick={handleNextStep}
                  className="h-[46px] px-6 bg-accent hover:bg-accent/90 text-primary font-semibold"
                  data-testid="button-next-step"
                >
                  {c.next}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Mobile: grid layout */}
            <div className="md:hidden grid grid-cols-2 gap-3">
              {/* Origin - full width */}
              <div className="col-span-2 relative">
                <label className="text-xs text-muted-foreground mb-1 block">{c.origin}</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary rotate-[-45deg] z-10" />
                  <input
                    type="text"
                    placeholder={c.originPlaceholder}
                    value={originSearch}
                    onChange={(e) => {
                      setOriginSearch(e.target.value);
                      setOrigin(e.target.value);
                      setShowOriginDropdown(true);
                    }}
                    onFocus={() => setShowOriginDropdown(true)}
                    onBlur={() => {
                      setTimeout(() => setShowOriginDropdown(false), 200);
                      if (originSearch && !origin) setOrigin(originSearch);
                    }}
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                    data-testid="input-origin-mobile"
                  />
                  {showOriginDropdown && filteredOrigins.length > 0 && (
                    <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-60 overflow-y-auto">
                      {filteredOrigins.slice(0, 10).map((airport) => (
                        <button
                          key={airport.code}
                          type="button"
                          onClick={() => {
                            setOrigin(`${airport.city} (${airport.code})`);
                            setOriginSearch(`${airport.city} (${airport.code})`);
                            setShowOriginDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-accent/10 text-sm flex justify-between items-center border-b border-gray-50 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{airport.countryCode}</span>
                            <div>
                              <span className="font-medium">{airport.city}</span>
                              <span className="text-muted-foreground text-xs ml-1">{airport.country}</span>
                            </div>
                          </div>
                          <span className="text-primary font-bold text-xs bg-primary/10 px-2 py-1 rounded">{airport.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Destination - full width */}
              <div className="col-span-2 relative">
                <label className="text-xs text-muted-foreground mb-1 block">{c.destination}</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary rotate-45 z-10" />
                  <input
                    type="text"
                    placeholder={c.destPlaceholder}
                    value={destSearch}
                    onChange={(e) => {
                      setDestSearch(e.target.value);
                      setDestination(e.target.value);
                      setShowDestDropdown(true);
                    }}
                    onFocus={() => setShowDestDropdown(true)}
                    onBlur={() => {
                      setTimeout(() => setShowDestDropdown(false), 200);
                      if (destSearch && !destination) setDestination(destSearch);
                    }}
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                    data-testid="input-destination"
                  />
                  {showDestDropdown && filteredDests.length > 0 && (
                    <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-60 overflow-y-auto">
                      {filteredDests.slice(0, 10).map((airport) => (
                        <button
                          key={airport.code}
                          type="button"
                          onClick={() => {
                            setDestination(`${airport.city} (${airport.code})`);
                            setDestSearch(`${airport.city} (${airport.code})`);
                            setShowDestDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-accent/10 text-sm flex justify-between items-center border-b border-gray-50 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{airport.countryCode}</span>
                            <div>
                              <span className="font-medium">{airport.city}</span>
                              <span className="text-muted-foreground text-xs ml-1">{airport.country}</span>
                            </div>
                          </div>
                          <span className="text-primary font-bold text-xs bg-primary/10 px-2 py-1 rounded">{airport.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Departure Date */}
              <div className="col-span-1">
                <label className="text-xs text-muted-foreground mb-1 block">{c.departure}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-50 border-gray-200 h-[46px] text-xs",
                        !departureDate && "text-muted-foreground"
                      )}
                      data-testid="button-departure-date-mobile"
                    >
                      <CalendarIcon className="mr-1 h-4 w-4 text-primary flex-shrink-0" />
                      <span className="truncate">{departureDate ? format(departureDate, "d MMM", { locale: dateLocale }) : c.selectDate}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={departureDate}
                      onSelect={setDepartureDate}
                      initialFocus
                      disabled={(d) => d < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Return Date */}
              <div className="col-span-1">
                <label className="text-xs text-muted-foreground mb-1 block">{c.return}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={tripType === "oneway"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-50 border-gray-200 h-[46px] text-xs",
                        !returnDate && "text-muted-foreground",
                        tripType === "oneway" && "opacity-50 cursor-not-allowed"
                      )}
                      data-testid="button-return-date-mobile"
                    >
                      <CalendarIcon className="mr-1 h-4 w-4 text-primary flex-shrink-0" />
                      <span className="truncate">{returnDate && tripType === "roundtrip" 
                        ? format(returnDate, "d MMM", { locale: dateLocale }) 
                        : c.selectDate}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      disabled={(d) => d < (departureDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Passengers */}
              <div className="col-span-1">
                <label className="text-xs text-muted-foreground mb-1 block">{c.passengers}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-center bg-gray-50 border-gray-200 h-[46px] gap-2"
                      data-testid="button-passengers-mobile"
                    >
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-bold">{passengers}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-4 bg-white" align="center">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm">{c.passengers}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setPassengers(Math.max(1, passengers - 1))}
                          disabled={passengers <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center font-bold">{passengers}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setPassengers(Math.min(9, passengers + 1))}
                          disabled={passengers >= 9}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Next Button */}
              <div className="col-span-1 flex items-end">
                <Button
                  onClick={handleNextStep}
                  className="w-full h-[46px] bg-accent hover:bg-accent/90 text-primary font-semibold"
                  data-testid="button-next-step-mobile"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          )}

          {step === 2 && (
          <div className="p-6">
            <div className="max-w-md mx-auto space-y-6">
              <div className="bg-accent/10 rounded-lg p-4 mb-4">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-sm text-primary mb-2">{c.tripSummary}</h4>
                  <ShareTrip
                    origin={origin}
                    destination={destination}
                    departureDate={departureDate ? format(departureDate, "d MMM yyyy", { locale: dateLocale }) : undefined}
                    returnDate={returnDate ? format(returnDate, "d MMM yyyy", { locale: dateLocale }) : undefined}
                    passengers={passengers}
                    tripType={tripType}
                    variant="icon"
                    className="h-8 w-8"
                  />
                </div>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p><strong>{c.origin}:</strong> {origin}</p>
                  <p><strong>{c.destination}:</strong> {destination}</p>
                  <p><strong>{c.departure}:</strong> {departureDate ? format(departureDate, "d MMM yyyy", { locale: dateLocale }) : ""}</p>
                  {tripType === "roundtrip" && returnDate && (
                    <p><strong>{c.return}:</strong> {format(returnDate, "d MMM yyyy", { locale: dateLocale })}</p>
                  )}
                  <p><strong>{c.passengers}:</strong> {passengers}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">{c.fullName}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <Input
                      type="text"
                      placeholder={c.fullName}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 h-[46px] bg-gray-50 border-gray-200"
                      data-testid="input-fullname"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">{c.phone}</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <Input
                      type="tel"
                      placeholder="+57 300 123 4567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-10 h-[46px] bg-gray-50 border-gray-200"
                      data-testid="input-phone"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 h-[46px]"
                  data-testid="button-back"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {c.back}
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 h-[46px] bg-green-600 hover:bg-green-700 text-white"
                  data-testid="button-whatsapp-submit"
                >
                  {c.contactToWhatsapp}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
