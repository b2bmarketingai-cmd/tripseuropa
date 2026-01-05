import { useState, useRef, useEffect } from "react";
import { MapPin, Calendar, DollarSign, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SiWhatsapp } from "react-icons/si";

interface SearchFilters {
  destination: string;
  destinationLabel: string;
  budget: string;
  duration: string;
  month: string;
}

const SIMPLE_DESTINATIONS = {
  es: [
    { value: "paris", label: "París, Francia" },
    { value: "roma", label: "Roma, Italia" },
    { value: "barcelona", label: "Barcelona, España" },
    { value: "londres", label: "Londres, Reino Unido" },
    { value: "amsterdam", label: "Ámsterdam, Países Bajos" },
    { value: "berlin", label: "Berlín, Alemania" },
    { value: "praga", label: "Praga, República Checa" },
    { value: "viena", label: "Viena, Austria" },
    { value: "estambul", label: "Estambul, Turquía" },
    { value: "atenas", label: "Atenas, Grecia" },
    { value: "lisboa", label: "Lisboa, Portugal" },
    { value: "venecia", label: "Venecia, Italia" },
  ],
  en: [
    { value: "paris", label: "Paris, France" },
    { value: "roma", label: "Rome, Italy" },
    { value: "barcelona", label: "Barcelona, Spain" },
    { value: "londres", label: "London, United Kingdom" },
    { value: "amsterdam", label: "Amsterdam, Netherlands" },
    { value: "berlin", label: "Berlin, Germany" },
    { value: "praga", label: "Prague, Czech Republic" },
    { value: "viena", label: "Vienna, Austria" },
    { value: "estambul", label: "Istanbul, Turkey" },
    { value: "atenas", label: "Athens, Greece" },
    { value: "lisboa", label: "Lisbon, Portugal" },
    { value: "venecia", label: "Venice, Italy" },
  ],
  pt: [
    { value: "paris", label: "Paris, França" },
    { value: "roma", label: "Roma, Itália" },
    { value: "barcelona", label: "Barcelona, Espanha" },
    { value: "londres", label: "Londres, Reino Unido" },
    { value: "amsterdam", label: "Amsterdã, Países Baixos" },
    { value: "berlin", label: "Berlim, Alemanha" },
    { value: "praga", label: "Praga, República Tcheca" },
    { value: "viena", label: "Viena, Áustria" },
    { value: "estambul", label: "Istambul, Turquia" },
    { value: "atenas", label: "Atenas, Grécia" },
    { value: "lisboa", label: "Lisboa, Portugal" },
    { value: "venecia", label: "Veneza, Itália" },
  ],
};

const BUDGET_OPTIONS = {
  es: [
    { value: "economy", label: "Económico", range: "Menos de $2,000" },
    { value: "standard", label: "Estándar", range: "$2,000 - $3,000" },
    { value: "premium", label: "Premium", range: "$3,000 - $5,000" },
    { value: "luxury", label: "Lujo", range: "Más de $5,000" },
  ],
  en: [
    { value: "economy", label: "Economy", range: "Under $2,000" },
    { value: "standard", label: "Standard", range: "$2,000 - $3,000" },
    { value: "premium", label: "Premium", range: "$3,000 - $5,000" },
    { value: "luxury", label: "Luxury", range: "Over $5,000" },
  ],
  pt: [
    { value: "economy", label: "Econômico", range: "Menos de $2.000" },
    { value: "standard", label: "Padrão", range: "$2.000 - $3.000" },
    { value: "premium", label: "Premium", range: "$3.000 - $5.000" },
    { value: "luxury", label: "Luxo", range: "Mais de $5.000" },
  ],
};

const DURATION_OPTIONS = {
  es: [
    { value: "short", label: "1-5 días" },
    { value: "week", label: "6-8 días" },
    { value: "extended", label: "9-12 días" },
    { value: "long", label: "13+ días" },
  ],
  en: [
    { value: "short", label: "1-5 days" },
    { value: "week", label: "6-8 days" },
    { value: "extended", label: "9-12 days" },
    { value: "long", label: "13+ days" },
  ],
  pt: [
    { value: "short", label: "1-5 dias" },
    { value: "week", label: "6-8 dias" },
    { value: "extended", label: "9-12 dias" },
    { value: "long", label: "13+ dias" },
  ],
};

const MONTH_OPTIONS = {
  es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  pt: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
};

export function SmartSearchBar({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const [filters, setFilters] = useState<SearchFilters>({
    destination: "",
    destinationLabel: "",
    budget: "",
    duration: "",
    month: "",
  });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [destSearch, setDestSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useI18n();

  const destinations = SIMPLE_DESTINATIONS[language] || SIMPLE_DESTINATIONS.es;
  const budgetOptions = BUDGET_OPTIONS[language] || BUDGET_OPTIONS.es;
  const durationOptions = DURATION_OPTIONS[language] || DURATION_OPTIONS.es;
  const monthOptions = MONTH_OPTIONS[language] || MONTH_OPTIONS.es;
  
  const filteredDestinations = destinations.filter(d => 
    d.label.toLowerCase().includes(destSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmitToWhatsApp = () => {
    const destLabel = filters.destinationLabel || destinations.find(d => d.value === filters.destination)?.label || "";
    const budgetLabel = budgetOptions.find(b => b.value === filters.budget)?.label || "";
    const budgetRange = budgetOptions.find(b => b.value === filters.budget)?.range || "";
    const durationLabel = durationOptions.find(d => d.value === filters.duration)?.label || "";
    
    const lines = [];
    lines.push(language === "es" ? "¡Hola! Me interesa un viaje a Europa:" : language === "pt" ? "Olá! Tenho interesse em uma viagem para a Europa:" : "Hello! I'm interested in a trip to Europe:");
    
    if (destLabel) lines.push(`${language === "es" ? "Destino" : language === "pt" ? "Destino" : "Destination"}: ${destLabel}`);
    if (budgetLabel) lines.push(`${language === "es" ? "Presupuesto" : language === "pt" ? "Orçamento" : "Budget"}: ${budgetLabel} (${budgetRange})`);
    if (durationLabel) lines.push(`${language === "es" ? "Duración" : language === "pt" ? "Duração" : "Duration"}: ${durationLabel}`);
    if (filters.month) lines.push(`${language === "es" ? "Mes de viaje" : language === "pt" ? "Mês de viagem" : "Travel month"}: ${filters.month}`);
    
    const message = lines.join("\n");
    window.open(`https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(message)}`, "_blank");
  };

  const getSelectedLabel = (key: keyof SearchFilters) => {
    if (!filters[key]) return null;
    
    switch (key) {
      case "destination":
        return destinations.find(d => d.value === filters.destination)?.label;
      case "budget":
        return budgetOptions.find(o => o.value === filters.budget)?.label;
      case "duration":
        return durationOptions.find(o => o.value === filters.duration)?.label;
      case "month":
        return filters.month;
      default:
        return null;
    }
  };

  const isHero = variant === "hero";
  const hasAnySelection = filters.destination || filters.destinationLabel || filters.budget || filters.duration || filters.month;

  const ctaText = language === "es" ? "Solicitar Cotización" : language === "pt" ? "Solicitar Cotação" : "Request Quote";

  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full",
        isHero && "bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-6"
      )}
      data-testid="smart-search-bar"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg md:text-xl font-display font-bold text-foreground">
          {language === "es" ? "Planifica tu viaje ideal" : language === "pt" ? "Planeje sua viagem ideal" : "Plan your ideal trip"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {language === "es" ? "Cuéntanos qué buscas y te ayudamos" : language === "pt" ? "Conte-nos o que você procura e nós ajudamos" : "Tell us what you're looking for and we'll help"}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <div className="relative">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            {language === "es" ? "Destino de Interés" : language === "pt" ? "Destino de Interesse" : "Destination of Interest"}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
            <Input
              type="text"
              value={destSearch}
              onChange={(e) => {
                setDestSearch(e.target.value);
                setFilters(f => ({ ...f, destination: "", destinationLabel: e.target.value }));
                if (e.target.value) {
                  setActiveDropdown("destination");
                }
              }}
              onFocus={() => setActiveDropdown("destination")}
              placeholder={language === "es" ? "Escribe o selecciona..." : language === "pt" ? "Digite ou selecione..." : "Type or select..."}
              className="pl-9 pr-8 h-11 border bg-background"
              data-testid="input-filter-destination"
            />
            <ChevronDown 
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer"
              onClick={() => setActiveDropdown(activeDropdown === "destination" ? null : "destination")}
            />
          </div>
          {activeDropdown === "destination" && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-card border rounded-lg shadow-xl max-h-56 overflow-y-auto">
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((dest) => (
                  <button
                    key={dest.value}
                    type="button"
                    onClick={() => {
                      setFilters(f => ({ ...f, destination: dest.value, destinationLabel: dest.label }));
                      setDestSearch(dest.label);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3 py-2.5 text-left hover:bg-accent/10 flex items-center gap-2 text-sm"
                    data-testid={`option-destination-${dest.value}`}
                  >
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{dest.label}</span>
                  </button>
                ))
              ) : destSearch ? (
                <div className="px-3 py-2.5 text-sm text-muted-foreground">
                  {language === "es" ? `Buscaremos "${destSearch}" para ti` : language === "pt" ? `Procuraremos "${destSearch}" para você` : `We'll search "${destSearch}" for you`}
                </div>
              ) : (
                destinations.map((dest) => (
                  <button
                    key={dest.value}
                    type="button"
                    onClick={() => {
                      setFilters(f => ({ ...f, destination: dest.value, destinationLabel: dest.label }));
                      setDestSearch(dest.label);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3 py-2.5 text-left hover:bg-accent/10 flex items-center gap-2 text-sm"
                    data-testid={`option-destination-${dest.value}`}
                  >
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{dest.label}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            {language === "es" ? "Presupuesto" : language === "pt" ? "Orçamento" : "Budget"}
          </label>
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "budget" ? null : "budget")}
            className={cn(
              "flex items-center justify-between gap-2 px-3 h-11 rounded-lg border bg-background w-full text-left",
              filters.budget ? "border-accent text-foreground" : "border-border text-muted-foreground"
            )}
            data-testid="button-filter-budget"
          >
            <div className="flex items-center gap-2 min-w-0">
              <DollarSign className="w-4 h-4 text-accent shrink-0" />
              <span className="text-sm truncate">
                {getSelectedLabel("budget") || (language === "es" ? "Seleccionar" : language === "pt" ? "Selecionar" : "Select")}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 shrink-0" />
          </button>
          {activeDropdown === "budget" && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-card border rounded-lg shadow-xl">
              {budgetOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setFilters(f => ({ ...f, budget: opt.value }));
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-2.5 text-left hover:bg-accent/10 flex flex-col"
                  data-testid={`option-budget-${opt.value}`}
                >
                  <span className="font-medium text-sm">{opt.label}</span>
                  <span className="text-xs text-muted-foreground">{opt.range}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            {language === "es" ? "Duración" : language === "pt" ? "Duração" : "Duration"}
          </label>
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "duration" ? null : "duration")}
            className={cn(
              "flex items-center justify-between gap-2 px-3 h-11 rounded-lg border bg-background w-full text-left",
              filters.duration ? "border-accent text-foreground" : "border-border text-muted-foreground"
            )}
            data-testid="button-filter-duration"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Calendar className="w-4 h-4 text-accent shrink-0" />
              <span className="text-sm truncate">
                {getSelectedLabel("duration") || (language === "es" ? "Seleccionar" : language === "pt" ? "Selecionar" : "Select")}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 shrink-0" />
          </button>
          {activeDropdown === "duration" && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-card border rounded-lg shadow-xl">
              {durationOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setFilters(f => ({ ...f, duration: opt.value }));
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-2.5 text-left hover:bg-accent/10 text-sm"
                  data-testid={`option-duration-${opt.value}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            {language === "es" ? "Mes de viaje" : language === "pt" ? "Mês de viagem" : "Travel month"}
          </label>
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "month" ? null : "month")}
            className={cn(
              "flex items-center justify-between gap-2 px-3 h-11 rounded-lg border bg-background w-full text-left",
              filters.month ? "border-accent text-foreground" : "border-border text-muted-foreground"
            )}
            data-testid="button-filter-month"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Calendar className="w-4 h-4 text-accent shrink-0" />
              <span className="text-sm truncate">
                {getSelectedLabel("month") || (language === "es" ? "Seleccionar" : language === "pt" ? "Selecionar" : "Select")}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 shrink-0" />
          </button>
          {activeDropdown === "month" && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-card border rounded-lg shadow-xl max-h-56 overflow-y-auto">
              {monthOptions.map((month, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setFilters(f => ({ ...f, month }));
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-accent/10 text-sm"
                  data-testid={`option-month-${idx}`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button
        type="button"
        onClick={handleSubmitToWhatsApp}
        disabled={!hasAnySelection}
        className="w-full h-12 bg-[#22c55e] hover:bg-green-700 text-[#ffffff] font-bold text-base gap-2"
        data-testid="button-search-whatsapp"
      >
        <SiWhatsapp className="w-5 h-5" />
        {ctaText}
        <ArrowRight className="w-4 h-4" />
      </Button>

      <p className="text-xs text-center text-muted-foreground mt-2">
        {language === "es" ? "Te responderemos en menos de 2 horas" : language === "pt" ? "Responderemos em menos de 2 horas" : "We'll respond in less than 2 hours"}
      </p>
    </div>
  );
}
