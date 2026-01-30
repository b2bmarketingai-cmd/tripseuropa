import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { useLocation } from "wouter";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountryOption {
  code: string;
  flag: string;
  name: string;
  lang: "es" | "en" | "pt";
  region: string;
}

const COUNTRY_OPTIONS: CountryOption[] = [
  // América Latina - Español
  { code: "CO", flag: "🇨🇴", name: "Colombia", lang: "es", region: "latam" },
  { code: "MX", flag: "🇲🇽", name: "México", lang: "es", region: "latam" },
  { code: "AR", flag: "🇦🇷", name: "Argentina", lang: "es", region: "latam" },
  { code: "CL", flag: "🇨🇱", name: "Chile", lang: "es", region: "latam" },
  { code: "PE", flag: "🇵🇪", name: "Perú", lang: "es", region: "latam" },
  { code: "VE", flag: "🇻🇪", name: "Venezuela", lang: "es", region: "latam" },
  { code: "EC", flag: "🇪🇨", name: "Ecuador", lang: "es", region: "latam" },
  { code: "PA", flag: "🇵🇦", name: "Panamá", lang: "es", region: "latam" },
  { code: "CR", flag: "🇨🇷", name: "Costa Rica", lang: "es", region: "latam" },
  { code: "DO", flag: "🇩🇴", name: "Rep. Dominicana", lang: "es", region: "latam" },

  // Brasil/Portugal - Português
  { code: "BR", flag: "🇧🇷", name: "Brasil", lang: "pt", region: "br-pt" },
  { code: "PT", flag: "🇵🇹", name: "Portugal", lang: "pt", region: "br-pt" },

  // English
  { code: "US", flag: "🇺🇸", name: "United States", lang: "en", region: "english" },
  { code: "GB", flag: "🇬🇧", name: "United Kingdom", lang: "en", region: "english" },
  { code: "CA", flag: "🇨🇦", name: "Canada", lang: "en", region: "english" },

  // Europa - Español
  { code: "ES", flag: "🇪🇸", name: "España", lang: "es", region: "europa" },
];

export function CountryLanguageSwitcher() {
  const { language, setLanguage } = useI18n();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(() => {
    // Try to load from localStorage first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedCountry');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // If parsing fails, fallback to default
        }
      }
    }
    // Default fallback
    return COUNTRY_OPTIONS.find(c => c.lang === language) || COUNTRY_OPTIONS[0];
  });

  const handleCountrySelect = (country: CountryOption) => {
    setSelectedCountry(country);
    setLanguage(country.lang);

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCountry', JSON.stringify(country));
    }

    setIsOpen(false);

    // Navigate to localized URL
    const currentPath = location;
    const pathWithoutLang = currentPath.replace(/^\/(es|en|pt|pt-br)/, '');
    const langPrefix = country.lang === "pt" ? "/pt-br" : `/${country.lang}`;
    window.location.href = `${langPrefix}${pathWithoutLang}`;
  };

  const groupedCountries = {
    latam: COUNTRY_OPTIONS.filter(c => c.region === "latam"),
    brPt: COUNTRY_OPTIONS.filter(c => c.region === "br-pt"),
    english: COUNTRY_OPTIONS.filter(c => c.region === "english"),
    europa: COUNTRY_OPTIONS.filter(c => c.region === "europa"),
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.country-language-switcher')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="country-language-switcher relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Select country and language"
      >
        <span className="text-2xl">{selectedCountry.flag}</span>
        <span className="text-sm font-medium hidden md:inline">{selectedCountry.code}</span>
        <ChevronDown className={cn(
          "w-4 h-4 text-gray-400 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-[60] max-h-[500px] overflow-y-auto">
          {/* América Latina */}
          <div className="p-3 border-b border-gray-100">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">
              América Latina
            </h4>
            <div className="space-y-1">
              {groupedCountries.latam.map(country => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors text-left",
                    selectedCountry.code === country.code && 'bg-blue-100 font-medium'
                  )}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <span className="text-sm">{country.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brasil / Portugal */}
          <div className="p-3 border-b border-gray-100">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">
              Brasil / Portugal
            </h4>
            <div className="space-y-1">
              {groupedCountries.brPt.map(country => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors text-left",
                    selectedCountry.code === country.code && 'bg-blue-100 font-medium'
                  )}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <span className="text-sm">{country.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* English */}
          <div className="p-3 border-b border-gray-100">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">
              English
            </h4>
            <div className="space-y-1">
              {groupedCountries.english.map(country => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors text-left",
                    selectedCountry.code === country.code && 'bg-blue-100 font-medium'
                  )}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <span className="text-sm">{country.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Europa */}
          <div className="p-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">
              Europa
            </h4>
            <div className="space-y-1">
              {groupedCountries.europa.map(country => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors text-left",
                    selectedCountry.code === country.code && 'bg-blue-100 font-medium'
                  )}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <span className="text-sm">{country.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
