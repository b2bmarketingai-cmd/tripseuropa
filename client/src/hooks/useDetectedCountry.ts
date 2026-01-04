import { useQuery } from "@tanstack/react-query";

interface GeoIpResponse {
  country_code?: string;
  country?: string;
}

const DEFAULT_COUNTRY = "CO";

async function detectCountryFromIP(): Promise<string> {
  try {
    const response = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(5000),
    });
    
    if (!response.ok) {
      throw new Error("Failed to detect location");
    }
    
    const data: GeoIpResponse = await response.json();
    
    if (data.country_code && typeof data.country_code === "string") {
      return data.country_code.toUpperCase();
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
