import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/lib/i18n";
import { Calculator, Plane, MapPin, FileCheck, Euro, Calendar, Users, ArrowRight } from "lucide-react";

export default function Tools() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-tools">{t("tools.badge")}</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4" data-testid="text-tools-title">
              {t("tools.title")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-tools-subtitle">
              {t("tools.subtitle")}
            </p>
          </div>

          <Tabs defaultValue="solvency" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="solvency" className="gap-2" data-testid="tab-solvency">
                <Euro className="w-4 h-4" />
                <span className="hidden sm:inline">{t("tools.solvency.tab")}</span>
              </TabsTrigger>
              <TabsTrigger value="calculator" className="gap-2" data-testid="tab-calculator">
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">{t("tools.calculator.tab")}</span>
              </TabsTrigger>
              <TabsTrigger value="visa" className="gap-2" data-testid="tab-visa">
                <FileCheck className="w-4 h-4" />
                <span className="hidden sm:inline">{t("tools.visa.tab")}</span>
              </TabsTrigger>
              <TabsTrigger value="tracker" className="gap-2" data-testid="tab-tracker">
                <Plane className="w-4 h-4" />
                <span className="hidden sm:inline">{t("tools.tracker.tab")}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="solvency">
              <SolvencyCalculator />
            </TabsContent>

            <TabsContent value="calculator">
              <TripCalculator />
            </TabsContent>

            <TabsContent value="visa">
              <VisaChecker />
            </TabsContent>

            <TabsContent value="tracker">
              <FlightTracker />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}

function SolvencyCalculator() {
  const { t, language } = useI18n();
  const [days, setDays] = useState("");
  const [country, setCountry] = useState("");
  const [result, setResult] = useState<{ amount: number; perDay: number } | null>(null);

  const schengenRates: Record<string, number> = {
    spain: 120,
    france: 120,
    italy: 110,
    germany: 100,
    netherlands: 105,
    portugal: 85,
    default: 100,
  };

  const calculate = () => {
    const numDays = parseInt(days) || 0;
    if (numDays <= 0) return;
    
    const perDay = schengenRates[country] || schengenRates.default;
    const amount = perDay * numDays;
    setResult({ amount, perDay });
  };

  return (
    <Card data-testid="card-solvency">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <Euro className="w-6 h-6 text-accent" />
          {t("tools.solvency.title")}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{t("tools.solvency.desc")}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t("tools.solvency.days")}</Label>
            <Input
              type="number"
              min="1"
              max="90"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="15"
              data-testid="input-solvency-days"
            />
          </div>
          <div className="space-y-2">
            <Label>{t("tools.solvency.country")}</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger data-testid="select-solvency-country">
                <SelectValue placeholder={t("tools.solvency.selectCountry")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spain">{language === "es" ? "España" : language === "pt" ? "Espanha" : "Spain"}</SelectItem>
                <SelectItem value="france">{language === "es" ? "Francia" : language === "pt" ? "Franca" : "France"}</SelectItem>
                <SelectItem value="italy">{language === "es" ? "Italia" : language === "pt" ? "Italia" : "Italy"}</SelectItem>
                <SelectItem value="germany">{language === "es" ? "Alemania" : language === "pt" ? "Alemanha" : "Germany"}</SelectItem>
                <SelectItem value="netherlands">{language === "es" ? "Países Bajos" : language === "pt" ? "Paises Baixos" : "Netherlands"}</SelectItem>
                <SelectItem value="portugal">Portugal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={calculate} className="w-full bg-accent text-primary font-bold" data-testid="button-solvency-calculate">
          {t("tools.calculate")}
        </Button>

        {result && (
          <div className="bg-accent/10 rounded-lg p-6 text-center" data-testid="result-solvency">
            <p className="text-sm text-muted-foreground mb-2">{t("tools.solvency.required")}</p>
            <p className="text-4xl font-bold text-primary font-display">{result.amount.toLocaleString()} EUR</p>
            <p className="text-sm text-muted-foreground mt-2">
              ({result.perDay} EUR x {days} {t("tools.solvency.daysLabel")})
            </p>
            <p className="text-xs text-muted-foreground mt-4 max-w-md mx-auto">
              {t("tools.solvency.note")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TripCalculator() {
  const { t, language } = useI18n();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState("1");
  const [days, setDays] = useState("");
  const [result, setResult] = useState<{ flight: number; hotel: number; daily: number; total: number } | null>(null);

  const baseFlights: Record<string, number> = {
    "bogota-madrid": 850,
    "bogota-paris": 950,
    "bogota-rome": 1050,
    "bogota-barcelona": 900,
    "medellin-madrid": 900,
    "caracas-madrid": 750,
    "caracas-paris": 850,
    default: 950,
  };

  const dailyCosts: Record<string, number> = {
    madrid: 150,
    paris: 200,
    rome: 170,
    barcelona: 160,
    amsterdam: 180,
    london: 220,
    default: 170,
  };

  const calculate = () => {
    const numDays = parseInt(days) || 0;
    const numTravelers = parseInt(travelers) || 1;
    if (numDays <= 0 || !origin || !destination) return;

    const flightKey = `${origin}-${destination}`;
    const flightPerPerson = baseFlights[flightKey] || baseFlights.default;
    const dailyCost = dailyCosts[destination] || dailyCosts.default;
    
    const flightTotal = flightPerPerson * numTravelers;
    const hotelTotal = (dailyCost * 0.6) * numDays * Math.ceil(numTravelers / 2);
    const dailyTotal = (dailyCost * 0.4) * numDays * numTravelers;
    const total = flightTotal + hotelTotal + dailyTotal;

    setResult({ flight: flightTotal, hotel: hotelTotal, daily: dailyTotal, total });
  };

  return (
    <Card data-testid="card-calculator">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <Calculator className="w-6 h-6 text-accent" />
          {t("tools.calculator.title")}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{t("tools.calculator.desc")}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t("tools.calculator.origin")}</Label>
            <Select value={origin} onValueChange={setOrigin}>
              <SelectTrigger data-testid="select-calc-origin">
                <SelectValue placeholder={t("tools.calculator.selectOrigin")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bogota">Bogota, Colombia</SelectItem>
                <SelectItem value="medellin">Medellin, Colombia</SelectItem>
                <SelectItem value="cartagena">Cartagena, Colombia</SelectItem>
                <SelectItem value="cali">Cali, Colombia</SelectItem>
                <SelectItem value="caracas">Caracas, Venezuela</SelectItem>
                <SelectItem value="maracaibo">Maracaibo, Venezuela</SelectItem>
                <SelectItem value="valencia">Valencia, Venezuela</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("tools.calculator.destination")}</Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger data-testid="select-calc-destination">
                <SelectValue placeholder={t("tools.calculator.selectDest")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="madrid">Madrid, {language === "es" ? "España" : language === "pt" ? "Espanha" : "Spain"}</SelectItem>
                <SelectItem value="paris">{language === "es" ? "París, Francia" : language === "pt" ? "Paris, Franca" : "Paris, France"}</SelectItem>
                <SelectItem value="barcelona">Barcelona, {language === "es" ? "España" : language === "pt" ? "Espanha" : "Spain"}</SelectItem>
                <SelectItem value="rome">{language === "es" ? "Roma, Italia" : language === "pt" ? "Roma, Italia" : "Rome, Italy"}</SelectItem>
                <SelectItem value="amsterdam">{language === "es" ? "Ámsterdam, Países Bajos" : language === "pt" ? "Amsterda, Paises Baixos" : "Amsterdam, Netherlands"}</SelectItem>
                <SelectItem value="london">{language === "es" ? "Londres, Reino Unido" : language === "pt" ? "Londres, Reino Unido" : "London, UK"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("tools.calculator.travelers")}</Label>
            <Select value={travelers} onValueChange={setTravelers}>
              <SelectTrigger data-testid="select-calc-travelers">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <SelectItem key={n} value={n.toString()}>{n} {n === 1 ? t("tools.calculator.traveler") : t("tools.calculator.travelersLabel")}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("tools.calculator.days")}</Label>
            <Input
              type="number"
              min="1"
              max="90"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="7"
              data-testid="input-calc-days"
            />
          </div>
        </div>
        
        <Button onClick={calculate} className="w-full bg-accent text-primary font-bold" data-testid="button-calc-calculate">
          {t("tools.calculate")}
        </Button>

        {result && (
          <div className="bg-accent/10 rounded-lg p-6 space-y-4" data-testid="result-calculator">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">{t("tools.calculator.flights")}</p>
                <p className="text-xl font-bold text-primary">${result.flight.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("tools.calculator.hotels")}</p>
                <p className="text-xl font-bold text-primary">${result.hotel.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("tools.calculator.expenses")}</p>
                <p className="text-xl font-bold text-primary">${result.daily.toLocaleString()}</p>
              </div>
            </div>
            <div className="border-t pt-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">{t("tools.calculator.estimated")}</p>
              <p className="text-4xl font-bold text-primary font-display">${result.total.toLocaleString()} USD</p>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {t("tools.calculator.note")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function VisaChecker() {
  const { t, language } = useI18n();
  const [nationality, setNationality] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState<{ required: boolean; type: string; info: string } | null>(null);

  const visaRequirements: Record<string, Record<string, { required: boolean; type: string; info: string }>> = {
    colombia: {
      schengen: { required: true, type: "Schengen", info: language === "es" ? "Visa Schengen requerida. Permite estancia de hasta 90 días en 180 días." : language === "pt" ? "Visto Schengen obrigatorio. Permite estadia de ate 90 dias em 180 dias." : "Schengen visa required. Allows stay of up to 90 days in 180 days." },
      uk: { required: true, type: "UK Standard Visitor", info: language === "es" ? "Visa de visitante estándar requerida para Reino Unido." : language === "pt" ? "Visto de visitante padrao obrigatorio para Reino Unido." : "Standard visitor visa required for UK." },
    },
    venezuela: {
      schengen: { required: true, type: "Schengen", info: language === "es" ? "Visa Schengen requerida. Permite estancia de hasta 90 días en 180 días." : language === "pt" ? "Visto Schengen obrigatorio. Permite estadia de ate 90 dias em 180 dias." : "Schengen visa required. Allows stay of up to 90 days in 180 days." },
      uk: { required: true, type: "UK Standard Visitor", info: language === "es" ? "Visa de visitante estándar requerida para Reino Unido." : language === "pt" ? "Visto de visitante padrao obrigatorio para Reino Unido." : "Standard visitor visa required for UK." },
    },
  };

  const check = () => {
    if (!nationality || !destination) return;
    
    const destKey = destination === "london" ? "uk" : "schengen";
    const req = visaRequirements[nationality]?.[destKey];
    
    if (req) {
      setResult(req);
    }
  };

  return (
    <Card data-testid="card-visa">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <FileCheck className="w-6 h-6 text-accent" />
          {t("tools.visa.title")}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{t("tools.visa.desc")}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t("tools.visa.nationality")}</Label>
            <Select value={nationality} onValueChange={setNationality}>
              <SelectTrigger data-testid="select-visa-nationality">
                <SelectValue placeholder={t("tools.visa.selectNationality")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="colombia">{language === "es" ? "Colombiana" : language === "pt" ? "Colombiana" : "Colombian"}</SelectItem>
                <SelectItem value="venezuela">{language === "es" ? "Venezolana" : language === "pt" ? "Venezuelana" : "Venezuelan"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("tools.visa.destination")}</Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger data-testid="select-visa-destination">
                <SelectValue placeholder={t("tools.visa.selectDest")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spain">{language === "es" ? "España (Schengen)" : language === "pt" ? "Espanha (Schengen)" : "Spain (Schengen)"}</SelectItem>
                <SelectItem value="france">{language === "es" ? "Francia (Schengen)" : language === "pt" ? "Franca (Schengen)" : "France (Schengen)"}</SelectItem>
                <SelectItem value="italy">{language === "es" ? "Italia (Schengen)" : language === "pt" ? "Italia (Schengen)" : "Italy (Schengen)"}</SelectItem>
                <SelectItem value="germany">{language === "es" ? "Alemania (Schengen)" : language === "pt" ? "Alemanha (Schengen)" : "Germany (Schengen)"}</SelectItem>
                <SelectItem value="london">{language === "es" ? "Reino Unido" : language === "pt" ? "Reino Unido" : "United Kingdom"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={check} className="w-full bg-accent text-primary font-bold" data-testid="button-visa-check">
          {t("tools.visa.check")}
        </Button>

        {result && (
          <div className={`rounded-lg p-6 ${result.required ? "bg-amber-50 border border-amber-200" : "bg-green-50 border border-green-200"}`} data-testid="result-visa">
            <div className="flex items-center gap-3 mb-3">
              <Badge className={result.required ? "bg-amber-500" : "bg-green-500"}>
                {result.required ? t("tools.visa.required") : t("tools.visa.notRequired")}
              </Badge>
              <span className="font-bold text-primary">{result.type}</span>
            </div>
            <p className="text-sm text-muted-foreground">{result.info}</p>
            <Button variant="outline" className="mt-4 gap-2" data-testid="button-visa-help">
              {t("tools.visa.getHelp")} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function FlightTracker() {
  const { t } = useI18n();
  const [flightNumber, setFlightNumber] = useState("");

  return (
    <Card data-testid="card-tracker">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <Plane className="w-6 h-6 text-accent" />
          {t("tools.tracker.title")}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{t("tools.tracker.desc")}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>{t("tools.tracker.flightNumber")}</Label>
          <Input
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
            placeholder="AV 123"
            data-testid="input-tracker-flight"
          />
        </div>
        
        <Button className="w-full bg-accent text-primary font-bold" data-testid="button-tracker-search">
          {t("tools.tracker.track")}
        </Button>

        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">{t("tools.tracker.enterFlight")}</p>
        </div>
      </CardContent>
    </Card>
  );
}
