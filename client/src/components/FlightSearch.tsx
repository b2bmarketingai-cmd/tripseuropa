import { useState } from "react";
import { useFlightSearch } from "@/hooks/use-flights";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Users, Plane, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function FlightSearch() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();
  const [passengers, setPassengers] = useState("1");
  const [cabinClass, setCabinClass] = useState("economy");
  
  const { mutate: searchFlights, isPending, data: offers } = useFlightSearch();
  const { toast } = useToast();

  const handleSearch = () => {
    if (!origin || !destination || !date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to search for flights.",
        variant: "destructive",
      });
      return;
    }

    searchFlights({
      origin,
      destination,
      date: date.toISOString(),
      passengers: parseInt(passengers),
      class: cabinClass as any,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto -mt-24 relative z-20 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in">
        <div className="flex gap-6 mb-6 border-b border-gray-100 pb-4">
          <button className="flex items-center gap-2 text-primary font-bold border-b-2 border-accent pb-4 -mb-4.5 px-2">
            <Plane className="w-5 h-5 text-accent" />
            Flights
          </button>
          <button className="flex items-center gap-2 text-gray-400 font-medium hover:text-primary transition-colors pb-4 px-2">
            <MapPin className="w-5 h-5" />
            Hotels
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Origin */}
          <div className="md:col-span-3 relative">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block pl-1">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                placeholder="Origin City" 
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-accent focus:ring-accent/20 rounded-xl"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
          </div>

          {/* Destination */}
          <div className="md:col-span-3">
             <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block pl-1">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                placeholder="Destination City" 
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-accent focus:ring-accent/20 rounded-xl"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          {/* Date */}
          <div className="md:col-span-3">
             <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block pl-1">Departure</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-gray-50 border-gray-200 rounded-xl hover:bg-gray-100",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-accent" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="rounded-md border shadow-lg"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button */}
          <div className="md:col-span-3 flex items-end">
            <Button 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 text-lg"
              onClick={handleSearch}
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Searching...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Flights
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Results Area (Simplified for demo) */}
        {offers && offers.length > 0 && (
          <div className="mt-8 animate-in slide-in-from-top-4 fade-in duration-500">
            <h3 className="text-xl font-display font-bold text-primary mb-4">Available Flights</h3>
            <div className="space-y-4">
              {offers.map((offer: any) => (
                <div key={offer.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Plane className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">{offer.airline}</div>
                      <div className="text-gray-500 text-sm">{offer.departure} - {offer.arrival}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${offer.price}</div>
                    <Button size="sm" className="bg-accent text-primary font-bold hover:bg-accent/90">Select</Button>
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
