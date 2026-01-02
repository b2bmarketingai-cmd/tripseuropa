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
  // Latin America - Colombia
  { code: "BOG", city: "Bogota", country: "Colombia" },
  { code: "MDE", city: "Medellin", country: "Colombia" },
  { code: "CLO", city: "Cali", country: "Colombia" },
  { code: "CTG", city: "Cartagena", country: "Colombia" },
  { code: "BAQ", city: "Barranquilla", country: "Colombia" },
  // Latin America - Mexico
  { code: "MEX", city: "Ciudad de Mexico", country: "Mexico" },
  { code: "GDL", city: "Guadalajara", country: "Mexico" },
  { code: "CUN", city: "Cancun", country: "Mexico" },
  { code: "MTY", city: "Monterrey", country: "Mexico" },
  { code: "TIJ", city: "Tijuana", country: "Mexico" },
  // Latin America - Argentina
  { code: "EZE", city: "Buenos Aires", country: "Argentina" },
  { code: "COR", city: "Cordoba", country: "Argentina" },
  { code: "MDZ", city: "Mendoza", country: "Argentina" },
  // Latin America - Peru
  { code: "LIM", city: "Lima", country: "Peru" },
  { code: "CUZ", city: "Cusco", country: "Peru" },
  // Latin America - Brasil
  { code: "GRU", city: "Sao Paulo", country: "Brasil" },
  { code: "GIG", city: "Rio de Janeiro", country: "Brasil" },
  { code: "BSB", city: "Brasilia", country: "Brasil" },
  // Latin America - Others
  { code: "PTY", city: "Panama", country: "Panama" },
  { code: "SJO", city: "San Jose", country: "Costa Rica" },
  { code: "SDQ", city: "Santo Domingo", country: "Republica Dominicana" },
  { code: "PUJ", city: "Punta Cana", country: "Republica Dominicana" },
  { code: "HAV", city: "La Habana", country: "Cuba" },
  { code: "SCL", city: "Santiago", country: "Chile" },
  { code: "UIO", city: "Quito", country: "Ecuador" },
  { code: "GYE", city: "Guayaquil", country: "Ecuador" },
  { code: "CCS", city: "Caracas", country: "Venezuela" },
  { code: "MVD", city: "Montevideo", country: "Uruguay" },
  { code: "LPB", city: "La Paz", country: "Bolivia" },
  { code: "ASU", city: "Asuncion", country: "Paraguay" },
  // Europe - España
  { code: "MAD", city: "Madrid", country: "España" },
  { code: "BCN", city: "Barcelona", country: "España" },
  { code: "VLC", city: "Valencia", country: "España" },
  { code: "AGP", city: "Malaga", country: "España" },
  { code: "SVQ", city: "Sevilla", country: "España" },
  // Europe - Others
  { code: "CDG", city: "Paris", country: "Francia" },
  { code: "FCO", city: "Roma", country: "Italia" },
  { code: "MXP", city: "Milan", country: "Italia" },
  { code: "LHR", city: "Londres", country: "Reino Unido" },
  { code: "AMS", city: "Amsterdam", country: "Paises Bajos" },
  { code: "FRA", city: "Frankfurt", country: "Alemania" },
  { code: "MUC", city: "Munich", country: "Alemania" },
  { code: "LIS", city: "Lisboa", country: "Portugal" },
  { code: "OPO", city: "Oporto", country: "Portugal" },
  { code: "ATH", city: "Atenas", country: "Grecia" },
  { code: "PRG", city: "Praga", country: "Republica Checa" },
  { code: "VIE", city: "Viena", country: "Austria" },
  { code: "ZRH", city: "Zurich", country: "Suiza" },
  { code: "BRU", city: "Bruselas", country: "Belgica" },
  { code: "CPH", city: "Copenhague", country: "Dinamarca" },
  { code: "DUB", city: "Dublin", country: "Irlanda" },
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
                          <div>
                            <span className="font-medium">{airport.city}</span>
                            <span className="text-muted-foreground text-xs ml-2">{airport.country}</span>
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
                          <div>
                            <span className="font-medium">{airport.city}</span>
                            <span className="text-muted-foreground text-xs ml-2">{airport.country}</span>
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
                          <div>
                            <span className="font-medium">{airport.city}</span>
                            <span className="text-muted-foreground text-xs ml-2">{airport.country}</span>
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
                          <div>
                            <span className="font-medium">{airport.city}</span>
                            <span className="text-muted-foreground text-xs ml-2">{airport.country}</span>
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
