import { useQuery } from "@tanstack/react-query";

interface GeoIpResponse {
  country_code?: string;
  country?: string;
}

const DEFAULT_COUNTRY = "CO";
const CACHE_KEY = "trips-europa-country";
const CACHE_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

interface CachedCountry {
  code: string;
  timestamp: number;
}

function getCachedCountry(): string | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const data: CachedCountry = JSON.parse(cached);
      if (Date.now() - data.timestamp < CACHE_TTL) {
        return data.code;
      }
    }
  } catch {
  }
  return null;
}

function setCachedCountry(code: string): void {
  try {
    const data: CachedCountry = { code, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
  }
}

async function detectCountryFromIP(): Promise<string> {
  const cached = getCachedCountry();
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(3000),
    });
    
    if (!response.ok) {
      return DEFAULT_COUNTRY;
    }
    
    const data: GeoIpResponse = await response.json();
    
    if (data.country_code && typeof data.country_code === "string") {
      const code = data.country_code.toUpperCase();
      setCachedCountry(code);
      return code;
    }
    
    return DEFAULT_COUNTRY;
  } catch {
    return DEFAULT_COUNTRY;
  }
}

export function useDetectedCountry() {
  return useQuery({
    queryKey: ["detected-country"],
    queryFn: detectCountryFromIP,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
