import { useState } from "react";
import { useFlightSearch } from "@/hooks/use-flights";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { Calendar as CalendarIcon, MapPin, Plane, Search, Hotel, Compass, Ship } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function FlightSearch() {
  const { t, language } = useI18n();
  const [activeTab, setActiveTab] = useState<"flights" | "hotels" | "packages" | "cruises">("flights");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState("2");
  
  const { mutate: searchFlights, isPending, data: offers } = useFlightSearch();
  const { toast } = useToast();

  const dateLocale = language === "es" ? es : enUS;

  const handleSearch = () => {
    if (!origin || !destination || !date) {
      toast({
        title: t("search.missingInfo"),
        description: t("search.fillAllFields"),
        variant: "destructive",
      });
      return;
    }

    searchFlights({
      origin,
      destination,
      date: date.toISOString(),
      passengers: parseInt(passengers),
      class: "economy",
    });
  };

  const tabs = [
    { id: "flights" as const, icon: Plane, label: t("search.flights") },
    { id: "hotels" as const, icon: Hotel, label: t("search.hotels") },
    { id: "packages" as const, icon: Compass, label: t("search.packages") },
    { id: "cruises" as const, icon: Ship, label: t("search.cruises") },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto relative z-20 px-4" data-testid="flight-search-container">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in border border-gray-100">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-100 pb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-md" 
                  : "text-gray-500 hover:bg-gray-100"
              )}
              data-testid={`tab-search-${tab.id}`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Origin */}
          <div className="md:col-span-3 relative">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block pl-1">{t("search.origin")}</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
              <Input 
                placeholder={t("search.originPlaceholder")} 
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-accent focus:ring-accent/20 rounded-xl"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                data-testid="input-search-origin"
              />
            </div>
          </div>

          {/* Destination */}
          <div className="md:col-span-3">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block pl-1">{t("search.destination")}</label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
              <Input 
                placeholder={t("search.destinationPlaceholder")}
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-accent focus:ring-accent/20 rounded-xl"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                data-testid="input-search-destination"
              />
            </div>
          </div>

          {/* Date */}
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block pl-1">{t("search.departure")}</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-gray-50 border-gray-200 rounded-xl hover:bg-gray-100",
                    !date && "text-muted-foreground"
                  )}
                  data-testid="button-search-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-accent" />
                  {date ? format(date, "dd MMM", { locale: dateLocale }) : <span>{t("search.date")}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="rounded-md border shadow-lg"
                  disabled={(d) => d < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return Date */}
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block pl-1">{t("search.return")}</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-gray-50 border-gray-200 rounded-xl hover:bg-gray-100",
                    !returnDate && "text-muted-foreground"
                  )}
                  data-testid="button-search-return-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-accent" />
                  {returnDate ? format(returnDate, "dd MMM", { locale: dateLocale }) : <span>{t("search.date")}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  initialFocus
                  className="rounded-md border shadow-lg"
                  disabled={(d) => d < (date || new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button */}
          <div className="md:col-span-2 flex items-end">
            <Button 
              className="w-full h-12 bg-accent hover:bg-accent/90 text-primary font-bold rounded-xl shadow-lg shadow-accent/20 text-base"
              onClick={handleSearch}
              disabled={isPending}
              data-testid="button-search-submit"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  {t("search.searching")}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  {t("search.search")}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-2 justify-center text-sm">
          <span className="text-muted-foreground">{t("search.popular")}</span>
          <button onClick={() => { setOrigin(t("search.city.bogota")); setDestination(t("search.city.paris")); }} className="text-accent hover:underline" data-testid="button-quick-bogota-paris">{t("search.route.bogotaParis")}</button>
          <span className="text-gray-300">|</span>
          <button onClick={() => { setOrigin(t("search.city.bogota")); setDestination(t("search.city.madrid")); }} className="text-accent hover:underline" data-testid="button-quick-bogota-madrid">{t("search.route.bogotaMadrid")}</button>
          <span className="text-gray-300">|</span>
          <button onClick={() => { setOrigin(t("search.city.bogota")); setDestination(t("search.city.roma")); }} className="text-accent hover:underline" data-testid="button-quick-bogota-roma">{t("search.route.bogotaRoma")}</button>
          <span className="text-gray-300">|</span>
          <button onClick={() => { setOrigin(t("search.city.medellin")); setDestination(t("search.city.barcelona")); }} className="text-accent hover:underline" data-testid="button-quick-medellin-barcelona">{t("search.route.medellinBarcelona")}</button>
        </div>

        {/* Results Area */}
        {offers && offers.length > 0 && (
          <div className="mt-8 animate-in slide-in-from-top-4 fade-in duration-500">
            <h3 className="text-xl font-display font-bold text-primary mb-4" data-testid="text-search-results">{t("search.results")}</h3>
            <div className="space-y-4">
              {offers.map((offer: any) => (
                <div key={offer.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group" data-testid={`card-flight-${offer.id}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Plane className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">{offer.airline}</div>
                      <div className="text-gray-500 text-sm">{t("search.flightNumber")} {offer.flightNumber} - {offer.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="font-bold text-lg">{offer.departure}</div>
                      <div className="text-gray-400 text-xs">{t("search.departureTime")}</div>
                    </div>
                    <div className="w-16 h-px bg-gray-200 relative">
                      <Plane className="w-4 h-4 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{offer.arrival}</div>
                      <div className="text-gray-400 text-xs">{t("search.arrivalTime")}</div>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">USD ${offer.price}</div>
                      <div className="text-xs text-muted-foreground">{t("search.perPerson")}</div>
                    </div>
                    <Button className="bg-accent text-primary font-bold hover:bg-accent/90" data-testid={`button-select-flight-${offer.id}`}>{t("search.select")}</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
