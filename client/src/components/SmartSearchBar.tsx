import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Calendar, Users, DollarSign, X, ChevronDown, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { DESTINATIONS_DATA } from "@/lib/destinationsData";
import { useLocation } from "wouter";

interface SearchFilters {
  destination: string;
  budget: string;
  duration: string;
  month: string;
}

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
    { value: "short", label: "1-5 días", icon: "corto" },
    { value: "week", label: "6-8 días", icon: "semana" },
    { value: "extended", label: "9-12 días", icon: "extendido" },
    { value: "long", label: "13+ días", icon: "largo" },
  ],
  en: [
    { value: "short", label: "1-5 days", icon: "short" },
    { value: "week", label: "6-8 days", icon: "week" },
    { value: "extended", label: "9-12 days", icon: "extended" },
    { value: "long", label: "13+ days", icon: "long" },
  ],
  pt: [
    { value: "short", label: "1-5 dias", icon: "curto" },
    { value: "week", label: "6-8 dias", icon: "semana" },
    { value: "extended", label: "9-12 dias", icon: "estendido" },
    { value: "long", label: "13+ dias", icon: "longo" },
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
    budget: "",
    duration: "",
    month: "",
  });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [destinationSearch, setDestinationSearch] = useState("");
  const [, setLocation] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useI18n();

  const destinations = DESTINATIONS_DATA.map(d => ({
    slug: d.slug,
    name: language === "es" ? d.name.es : language === "pt" ? (d.name.pt || d.name.en) : d.name.en,
  }));

  const filteredDestinations = destinations.filter(d =>
    d.name.toLowerCase().includes(destinationSearch.toLowerCase())
  );

  const budgetOptions = BUDGET_OPTIONS[language] || BUDGET_OPTIONS.es;
  const durationOptions = DURATION_OPTIONS[language] || DURATION_OPTIONS.es;
  const monthOptions = MONTH_OPTIONS[language] || MONTH_OPTIONS.es;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.destination) params.set("destination", filters.destination);
    if (filters.budget) params.set("budget", filters.budget);
    if (filters.duration) params.set("duration", filters.duration);
    if (filters.month) params.set("month", filters.month);
    
    if (filters.destination) {
      setLocation(`/destinations/${filters.destination}`);
    } else {
      setLocation(`/destinations?${params.toString()}`);
    }
  };

  const clearFilters = () => {
    setFilters({ destination: "", budget: "", duration: "", month: "" });
    setDestinationSearch("");
  };

  const hasFilters = Object.values(filters).some(v => v);

  const getSelectedLabel = (key: keyof SearchFilters) => {
    if (!filters[key]) return null;
    
    switch (key) {
      case "destination":
        return destinations.find(d => d.slug === filters.destination)?.name;
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

  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full",
        isHero && "bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl p-2 md:p-3"
      )}
      data-testid="smart-search-bar"
    >
      <div className={cn(
        "flex flex-col md:flex-row gap-2",
        !isHero && "bg-background border rounded-lg p-2"
      )}>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          <Input
            type="text"
            value={destinationSearch || getSelectedLabel("destination") || ""}
            onChange={(e) => {
              setDestinationSearch(e.target.value);
              setActiveDropdown("destination");
              if (!e.target.value) setFilters(f => ({ ...f, destination: "" }));
            }}
            onFocus={() => setActiveDropdown("destination")}
            placeholder={language === "es" ? "¿A dónde quieres ir?" : language === "pt" ? "Para onde você quer ir?" : "Where do you want to go?"}
            className="pl-10 pr-4 h-12 border-0 bg-gray-50 dark:bg-muted focus:ring-2 focus:ring-accent"
            data-testid="input-search-destination"
          />
          {activeDropdown === "destination" && filteredDestinations.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-card border rounded-lg shadow-xl max-h-64 overflow-y-auto">
              {filteredDestinations.map((dest) => (
                <button
                  key={dest.slug}
                  type="button"
                  onClick={() => {
                    setFilters(f => ({ ...f, destination: dest.slug }));
                    setDestinationSearch(dest.name);
                    setActiveDropdown(null);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-accent/10 flex items-center gap-3"
                  data-testid={`option-destination-${dest.slug}`}
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{dest.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "budget" ? null : "budget")}
            className={cn(
              "flex items-center justify-between gap-2 px-4 h-12 rounded-lg border-0 bg-gray-50 dark:bg-muted w-full md:w-40",
              filters.budget && "text-primary font-medium"
            )}
            data-testid="button-filter-budget"
          >
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-sm truncate">
                {getSelectedLabel("budget") || (language === "es" ? "Presupuesto" : language === "pt" ? "Orçamento" : "Budget")}
              </span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>
          {activeDropdown === "budget" && (
            <div className="absolute z-50 w-56 mt-1 bg-white dark:bg-card border rounded-lg shadow-xl right-0">
              {budgetOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setFilters(f => ({ ...f, budget: opt.value }));
                    setActiveDropdown(null);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-accent/10 flex flex-col"
                  data-testid={`option-budget-${opt.value}`}
                >
                  <span className="font-medium">{opt.label}</span>
                  <span className="text-xs text-muted-foreground">{opt.range}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "duration" ? null : "duration")}
            className={cn(
              "flex items-center justify-between gap-2 px-4 h-12 rounded-lg border-0 bg-gray-50 dark:bg-muted w-full md:w-36",
              filters.duration && "text-primary font-medium"
            )}
            data-testid="button-filter-duration"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm truncate">
                {getSelectedLabel("duration") || (language === "es" ? "Duración" : language === "pt" ? "Duração" : "Duration")}
              </span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>
          {activeDropdown === "duration" && (
            <div className="absolute z-50 w-48 mt-1 bg-white dark:bg-card border rounded-lg shadow-xl right-0">
              {durationOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setFilters(f => ({ ...f, duration: opt.value }));
                    setActiveDropdown(null);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-accent/10"
                  data-testid={`option-duration-${opt.value}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "month" ? null : "month")}
            className={cn(
              "flex items-center justify-between gap-2 px-4 h-12 rounded-lg border-0 bg-gray-50 dark:bg-muted w-full md:w-36",
              filters.month && "text-primary font-medium"
            )}
            data-testid="button-filter-month"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm truncate">
                {getSelectedLabel("month") || (language === "es" ? "Mes" : language === "pt" ? "Mês" : "Month")}
              </span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>
          {activeDropdown === "month" && (
            <div className="absolute z-50 w-48 mt-1 bg-white dark:bg-card border rounded-lg shadow-xl right-0 max-h-64 overflow-y-auto">
              {monthOptions.map((month, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setFilters(f => ({ ...f, month }));
                    setActiveDropdown(null);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-accent/10 text-sm"
                  data-testid={`option-month-${idx}`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {hasFilters && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearFilters}
              className="h-12 w-12 shrink-0"
              data-testid="button-clear-search"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
          <Button
            type="button"
            onClick={handleSearch}
            className="h-12 px-6 bg-accent text-primary font-bold flex-1 md:flex-none gap-2"
            data-testid="button-search"
          >
            <Search className="w-5 h-5" />
            <span className="hidden md:inline">{language === "es" ? "Buscar" : language === "pt" ? "Buscar" : "Search"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
