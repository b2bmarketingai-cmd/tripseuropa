import { useMutation, useQuery } from "@tanstack/react-query";
import { api, type FlightSearchInput } from "@shared/routes";

export function useFlightSearch() {
  return useMutation({
    mutationFn: async (data: FlightSearchInput) => {
      const res = await fetch(api.flights.search.path, {
        method: api.flights.search.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || 'Validation error');
        }
        throw new Error('Search failed');
      }
      
      return api.flights.search.responses[200].parse(await res.json());
    }
  });
}
