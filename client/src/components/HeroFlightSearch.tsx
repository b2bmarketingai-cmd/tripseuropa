import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { Calendar as CalendarIcon, Plane, ArrowRight, Users, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const AIRPORTS = [
  { code: "BOG", city: "Bogota", country: "Colombia" },
  { code: "MDE", city: "Medellin", country: "Colombia" },
  { code: "CLO", city: "Cali", country: "Colombia" },
  { code: "CTG", city: "Cartagena", country: "Colombia" },
  { code: "MEX", city: "Ciudad de Mexico", country: "Mexico" },
  { code: "GDL", city: "Guadalajara", country: "Mexico" },
  { code: "CUN", city: "Cancun", country: "Mexico" },
  { code: "EZE", city: "Buenos Aires", country: "Argentina" },
  { code: "LIM", city: "Lima", country: "Peru" },
  { code: "GRU", city: "Sao Paulo", country: "Brasil" },
  { code: "PTY", city: "Panama", country: "Panama" },
  { code: "SJO", city: "San Jose", country: "Costa Rica" },
  { code: "MAD", city: "Madrid", country: "España" },
  { code: "BCN", city: "Barcelona", country: "España" },
  { code: "CDG", city: "Paris", country: "Francia" },
  { code: "FCO", city: "Roma", country: "Italia" },
  { code: "LHR", city: "Londres", country: "Reino Unido" },
  { code: "AMS", city: "Amsterdam", country: "Paises Bajos" },
  { code: "FRA", city: "Frankfurt", country: "Alemania" },
  { code: "LIS", city: "Lisboa", country: "Portugal" },
];

export function HeroFlightSearch() {
  const { language } = useI18n();
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
  const { toast } = useToast();

  const dateLocale = language === "es" ? es : enUS;

  const filteredOrigins = AIRPORTS.filter(
    (a) =>
      a.city.toLowerCase().includes(originSearch.toLowerCase()) ||
      a.code.toLowerCase().includes(originSearch.toLowerCase()) ||
      a.country.toLowerCase().includes(originSearch.toLowerCase())
  );

  const filteredDests = AIRPORTS.filter(
    (a) =>
      a.city.toLowerCase().includes(destSearch.toLowerCase()) ||
      a.code.toLowerCase().includes(destSearch.toLowerCase()) ||
      a.country.toLowerCase().includes(destSearch.toLowerCase())
  );

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      toast({
        title: language === "es" ? "Informacion incompleta" : "Missing information",
        description: language === "es" ? "Por favor completa origen, destino y fecha" : "Please fill in origin, destination and date",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: language === "es" ? "Buscando vuelos..." : "Searching flights...",
      description: language === "es" 
        ? `${origin} a ${destination} - ${passengers} pasajero(s)` 
        : `${origin} to ${destination} - ${passengers} passenger(s)`,
    });
  };

  const content = {
    es: {
      title: "Agencia de Viajes Trips Europa",
      subtitle: "Estas planeando tu proximo viaje a Europa? Quieres encontrar el mejor precio y la mejor experiencia? Usa nuestro buscador, porque en Trips Europa tenemos lo que necesitas.",
      roundtrip: "Ida y Vuelta",
      oneway: "Solo Ida",
      origin: "Origen",
      destination: "Destino",
      selectFirst: "Seleccione primero ORIGEN",
      departure: "Salida",
      return: "Vuelta",
      passengers: "Pasajeros",
      search: "Buscar",
    },
    en: {
      title: "Trips Europa Travel Agency",
      subtitle: "Planning your next trip to Europe? Looking for the best price and experience? Use our search engine, because at Trips Europa we have what you need.",
      roundtrip: "Round Trip",
      oneway: "One Way",
      origin: "Origin",
      destination: "Destination",
      selectFirst: "Select ORIGIN first",
      departure: "Departure",
      return: "Return",
      passengers: "Passengers",
      search: "Search",
    },
  };

  const c = content[language as "es" | "en"];

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

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
          <div className="flex border-b">
            <button
              onClick={() => setTripType("roundtrip")}
              className={cn(
                "px-6 py-3 text-sm font-medium transition-colors",
                tripType === "roundtrip"
                  ? "text-accent border-b-2 border-accent bg-accent/5"
                  : "text-muted-foreground hover:text-foreground"
              )}
              data-testid="tab-roundtrip"
            >
              {c.roundtrip}
            </button>
            <button
              onClick={() => setTripType("oneway")}
              className={cn(
                "px-6 py-3 text-sm font-medium transition-colors",
                tripType === "oneway"
                  ? "text-accent border-b-2 border-accent bg-accent/5"
                  : "text-muted-foreground hover:text-foreground"
              )}
              data-testid="tab-oneway"
            >
              {c.oneway}
            </button>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
              <div className="md:col-span-3 relative">
                <label className="text-xs text-muted-foreground mb-1 block">{c.origin}</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary rotate-[-45deg]" />
                  <input
                    type="text"
                    placeholder={c.origin}
                    value={originSearch}
                    onChange={(e) => {
                      setOriginSearch(e.target.value);
                      setShowOriginDropdown(true);
                    }}
                    onFocus={() => setShowOriginDropdown(true)}
                    onBlur={() => setTimeout(() => setShowOriginDropdown(false), 200)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                    data-testid="input-origin"
                  />
                  {showOriginDropdown && filteredOrigins.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {filteredOrigins.slice(0, 6).map((airport) => (
                        <button
                          key={airport.code}
                          onClick={() => {
                            setOrigin(`${airport.city} (${airport.code})`);
                            setOriginSearch(`${airport.city} (${airport.code})`);
                            setShowOriginDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-accent/10 text-sm flex justify-between items-center"
                        >
                          <span className="font-medium">{airport.city}</span>
                          <span className="text-muted-foreground text-xs">{airport.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-3 relative">
                <label className="text-xs text-muted-foreground mb-1 block">{c.destination}</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary rotate-45" />
                  <input
                    type="text"
                    placeholder={origin ? c.destination : c.selectFirst}
                    value={destSearch}
                    onChange={(e) => {
                      setDestSearch(e.target.value);
                      setShowDestDropdown(true);
                    }}
                    onFocus={() => setShowDestDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDestDropdown(false), 200)}
                    disabled={!origin}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm",
                      !origin && "opacity-60 cursor-not-allowed"
                    )}
                    data-testid="input-destination"
                  />
                  {showDestDropdown && filteredDests.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {filteredDests.slice(0, 6).map((airport) => (
                        <button
                          key={airport.code}
                          onClick={() => {
                            setDestination(`${airport.city} (${airport.code})`);
                            setDestSearch(`${airport.city} (${airport.code})`);
                            setShowDestDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-accent/10 text-sm flex justify-between items-center"
                        >
                          <span className="font-medium">{airport.city}</span>
                          <span className="text-muted-foreground text-xs">{airport.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-muted-foreground mb-1 block">{c.departure}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-50 border-gray-200 h-[46px]",
                        !departureDate && "text-muted-foreground"
                      )}
                      data-testid="button-departure-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {departureDate ? format(departureDate, "d MMM yyyy", { locale: dateLocale }) : <span>{c.departure}</span>}
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

              <div className="md:col-span-2">
                <label className="text-xs text-muted-foreground mb-1 block">{c.return}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={tripType === "oneway"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-50 border-gray-200 h-[46px]",
                        !returnDate && "text-muted-foreground",
                        tripType === "oneway" && "opacity-50 cursor-not-allowed"
                      )}
                      data-testid="button-return-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {returnDate && tripType === "roundtrip" 
                        ? format(returnDate, "d MMM yyyy", { locale: dateLocale }) 
                        : <span>{c.return}</span>}
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

              <div className="md:col-span-1">
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
                    <div className="flex items-center justify-between">
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

              <div className="md:col-span-1 flex items-end">
                <Button
                  onClick={handleSearch}
                  className="w-full h-[46px] bg-accent hover:bg-accent/90 text-primary"
                  data-testid="button-search-flights"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
