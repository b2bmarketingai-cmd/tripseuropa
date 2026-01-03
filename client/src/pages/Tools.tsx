import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [result, setResult] = useState<{ amount: number; perDay: number; countryName: string } | null>(null);

  const schengenRates: Record<string, number> = {
    france: 120,
    italy: 110,
    spain: 120,
    germany: 100,
    portugal: 85,
    greece: 80,
    netherlands: 105,
    switzerland: 150,
    croatia: 75,
    uk: 130,
    albania: 60,
    austria: 110,
    belgium: 100,
    czechia: 75,
    denmark: 120,
    finland: 115,
    hungary: 70,
    iceland: 140,
    ireland: 120,
    norway: 130,
    poland: 70,
    romania: 65,
    sweden: 120,
    baltics: 75,
    cyprus: 85,
    scotland: 130,
    default: 100,
  };

  const countryNames: Record<string, { es: string; en: string; pt: string }> = {
    france: { es: "Francia", en: "France", pt: "Franca" },
    italy: { es: "Italia", en: "Italy", pt: "Italia" },
    spain: { es: "España", en: "Spain", pt: "Espanha" },
    germany: { es: "Alemania", en: "Germany", pt: "Alemanha" },
    portugal: { es: "Portugal", en: "Portugal", pt: "Portugal" },
    greece: { es: "Grecia", en: "Greece", pt: "Grecia" },
    netherlands: { es: "Paises Bajos", en: "Netherlands", pt: "Paises Baixos" },
    switzerland: { es: "Suiza", en: "Switzerland", pt: "Suica" },
    croatia: { es: "Croacia", en: "Croatia", pt: "Croacia" },
    uk: { es: "Reino Unido", en: "United Kingdom", pt: "Reino Unido" },
    albania: { es: "Albania", en: "Albania", pt: "Albania" },
    austria: { es: "Austria", en: "Austria", pt: "Austria" },
    belgium: { es: "Belgica", en: "Belgium", pt: "Belgica" },
    czechia: { es: "Republica Checa", en: "Czech Republic", pt: "Republica Tcheca" },
    denmark: { es: "Dinamarca", en: "Denmark", pt: "Dinamarca" },
    finland: { es: "Finlandia", en: "Finland", pt: "Finlandia" },
    hungary: { es: "Hungria", en: "Hungary", pt: "Hungria" },
    iceland: { es: "Islandia", en: "Iceland", pt: "Islandia" },
    ireland: { es: "Irlanda", en: "Ireland", pt: "Irlanda" },
    norway: { es: "Noruega", en: "Norway", pt: "Noruega" },
    poland: { es: "Polonia", en: "Poland", pt: "Polonia" },
    romania: { es: "Rumania", en: "Romania", pt: "Romenia" },
    sweden: { es: "Suecia", en: "Sweden", pt: "Suecia" },
    baltics: { es: "Estados Balticos", en: "Baltic States", pt: "Estados Balticos" },
    cyprus: { es: "Chipre", en: "Cyprus", pt: "Chipre" },
    scotland: { es: "Escocia", en: "Scotland", pt: "Escocia" },
  };

  const getCountryLabel = (key: string) => {
    const names = countryNames[key];
    if (!names) return key;
    return language === "es" ? names.es : language === "pt" ? names.pt : names.en;
  };

  const calculate = () => {
    const numDays = parseInt(days) || 0;
    if (numDays <= 0 || !country) return;
    
    const perDay = schengenRates[country] || schengenRates.default;
    const amount = perDay * numDays;
    const countryName = getCountryLabel(country);
    setResult({ amount, perDay, countryName });
  };

  const handleWhatsAppContact = () => {
    if (!result) return;
    const message = language === "es" 
      ? `Hola! Acabo de calcular la solvencia economica para mi viaje a ${result.countryName}. Necesito ${result.amount.toLocaleString()} EUR para ${days} dias. Me gustaria recibir mas informacion sobre como planificar mi viaje.`
      : language === "pt"
      ? `Ola! Acabei de calcular a solvencia economica para minha viagem a ${result.countryName}. Preciso de ${result.amount.toLocaleString()} EUR para ${days} dias. Gostaria de receber mais informacoes sobre como planejar minha viagem.`
      : `Hello! I just calculated the economic solvency for my trip to ${result.countryName}. I need ${result.amount.toLocaleString()} EUR for ${days} days. I would like to receive more information about planning my trip.`;
    window.open(`https://wa.me/34611105448?text=${encodeURIComponent(message)}`, "_blank");
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
                <SelectItem value="france">{getCountryLabel("france")}</SelectItem>
                <SelectItem value="italy">{getCountryLabel("italy")}</SelectItem>
                <SelectItem value="spain">{getCountryLabel("spain")}</SelectItem>
                <SelectItem value="germany">{getCountryLabel("germany")}</SelectItem>
                <SelectItem value="portugal">{getCountryLabel("portugal")}</SelectItem>
                <SelectItem value="greece">{getCountryLabel("greece")}</SelectItem>
                <SelectItem value="netherlands">{getCountryLabel("netherlands")}</SelectItem>
                <SelectItem value="switzerland">{getCountryLabel("switzerland")}</SelectItem>
                <SelectItem value="croatia">{getCountryLabel("croatia")}</SelectItem>
                <SelectItem value="uk">{getCountryLabel("uk")}</SelectItem>
                <SelectItem value="albania">{getCountryLabel("albania")}</SelectItem>
                <SelectItem value="austria">{getCountryLabel("austria")}</SelectItem>
                <SelectItem value="belgium">{getCountryLabel("belgium")}</SelectItem>
                <SelectItem value="czechia">{getCountryLabel("czechia")}</SelectItem>
                <SelectItem value="denmark">{getCountryLabel("denmark")}</SelectItem>
                <SelectItem value="finland">{getCountryLabel("finland")}</SelectItem>
                <SelectItem value="hungary">{getCountryLabel("hungary")}</SelectItem>
                <SelectItem value="iceland">{getCountryLabel("iceland")}</SelectItem>
                <SelectItem value="ireland">{getCountryLabel("ireland")}</SelectItem>
                <SelectItem value="norway">{getCountryLabel("norway")}</SelectItem>
                <SelectItem value="poland">{getCountryLabel("poland")}</SelectItem>
                <SelectItem value="romania">{getCountryLabel("romania")}</SelectItem>
                <SelectItem value="sweden">{getCountryLabel("sweden")}</SelectItem>
                <SelectItem value="baltics">{getCountryLabel("baltics")}</SelectItem>
                <SelectItem value="cyprus">{getCountryLabel("cyprus")}</SelectItem>
                <SelectItem value="scotland">{getCountryLabel("scotland")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={calculate} className="w-full bg-accent text-primary font-bold" data-testid="button-solvency-calculate">
          {t("tools.calculate")}
        </Button>

        {result && (
          <div className="bg-accent/10 rounded-lg p-6 text-center space-y-4" data-testid="result-solvency">
            <p className="text-sm text-muted-foreground mb-2">{t("tools.solvency.required")}</p>
            <p className="text-4xl font-bold text-primary font-display">{result.amount.toLocaleString()} EUR</p>
            <p className="text-sm text-muted-foreground mt-2">
              ({result.perDay} EUR x {days} {t("tools.solvency.daysLabel")})
            </p>
            <p className="text-xs text-muted-foreground mt-4 max-w-md mx-auto">
              {t("tools.solvency.note")}
            </p>
            <Button 
              onClick={handleWhatsAppContact} 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold mt-4"
              data-testid="button-solvency-whatsapp"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {language === "es" ? "Contactar por WhatsApp" : language === "pt" ? "Contatar pelo WhatsApp" : "Contact via WhatsApp"}
            </Button>
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
  const [result, setResult] = useState<{ flight: number; hotel: number; daily: number; total: number; destName: string } | null>(null);

  const baseFlights: Record<string, number> = {
    default: 950,
  };

  const dailyCosts: Record<string, number> = {
    paris: 200,
    rome: 170,
    madrid: 150,
    barcelona: 160,
    lisbon: 130,
    athens: 120,
    amsterdam: 180,
    zurich: 280,
    geneva: 260,
    zagreb: 100,
    london: 220,
    edinburgh: 180,
    tirana: 80,
    vienna: 160,
    brussels: 150,
    prague: 110,
    copenhagen: 200,
    helsinki: 180,
    budapest: 95,
    reykjavik: 250,
    dublin: 180,
    oslo: 220,
    warsaw: 100,
    bucharest: 90,
    stockholm: 190,
    riga: 100,
    nicosia: 120,
    default: 150,
  };

  const destNames: Record<string, { es: string; en: string; pt: string }> = {
    paris: { es: "Paris, Francia", en: "Paris, France", pt: "Paris, Franca" },
    rome: { es: "Roma, Italia", en: "Rome, Italy", pt: "Roma, Italia" },
    madrid: { es: "Madrid, Espana", en: "Madrid, Spain", pt: "Madrid, Espanha" },
    barcelona: { es: "Barcelona, Espana", en: "Barcelona, Spain", pt: "Barcelona, Espanha" },
    lisbon: { es: "Lisboa, Portugal", en: "Lisbon, Portugal", pt: "Lisboa, Portugal" },
    athens: { es: "Atenas, Grecia", en: "Athens, Greece", pt: "Atenas, Grecia" },
    amsterdam: { es: "Amsterdam, Paises Bajos", en: "Amsterdam, Netherlands", pt: "Amsterdam, Paises Baixos" },
    zurich: { es: "Zurich, Suiza", en: "Zurich, Switzerland", pt: "Zurique, Suica" },
    geneva: { es: "Ginebra, Suiza", en: "Geneva, Switzerland", pt: "Genebra, Suica" },
    zagreb: { es: "Zagreb, Croacia", en: "Zagreb, Croatia", pt: "Zagreb, Croacia" },
    london: { es: "Londres, Reino Unido", en: "London, United Kingdom", pt: "Londres, Reino Unido" },
    edinburgh: { es: "Edimburgo, Escocia", en: "Edinburgh, Scotland", pt: "Edimburgo, Escocia" },
    tirana: { es: "Tirana, Albania", en: "Tirana, Albania", pt: "Tirana, Albania" },
    vienna: { es: "Viena, Austria", en: "Vienna, Austria", pt: "Viena, Austria" },
    brussels: { es: "Bruselas, Belgica", en: "Brussels, Belgium", pt: "Bruxelas, Belgica" },
    prague: { es: "Praga, Republica Checa", en: "Prague, Czech Republic", pt: "Praga, Republica Tcheca" },
    copenhagen: { es: "Copenhague, Dinamarca", en: "Copenhagen, Denmark", pt: "Copenhague, Dinamarca" },
    helsinki: { es: "Helsinki, Finlandia", en: "Helsinki, Finland", pt: "Helsinquia, Finlandia" },
    budapest: { es: "Budapest, Hungria", en: "Budapest, Hungary", pt: "Budapeste, Hungria" },
    reykjavik: { es: "Reykjavik, Islandia", en: "Reykjavik, Iceland", pt: "Reykjavik, Islandia" },
    dublin: { es: "Dublin, Irlanda", en: "Dublin, Ireland", pt: "Dublin, Irlanda" },
    oslo: { es: "Oslo, Noruega", en: "Oslo, Norway", pt: "Oslo, Noruega" },
    warsaw: { es: "Varsovia, Polonia", en: "Warsaw, Poland", pt: "Varsovia, Polonia" },
    bucharest: { es: "Bucarest, Rumania", en: "Bucharest, Romania", pt: "Bucareste, Romenia" },
    stockholm: { es: "Estocolmo, Suecia", en: "Stockholm, Sweden", pt: "Estocolmo, Suecia" },
    riga: { es: "Riga, Estados Balticos", en: "Riga, Baltic States", pt: "Riga, Estados Balticos" },
    nicosia: { es: "Nicosia, Chipre", en: "Nicosia, Cyprus", pt: "Nicosia, Chipre" },
  };

  const getDestLabel = (key: string) => {
    const names = destNames[key];
    if (!names) return key;
    return language === "es" ? names.es : language === "pt" ? names.pt : names.en;
  };

  const calculate = () => {
    const numDays = parseInt(days) || 0;
    const numTravelers = parseInt(travelers) || 1;
    if (numDays <= 0 || !origin || !destination) return;

    const flightPerPerson = baseFlights.default;
    const dailyCost = dailyCosts[destination] || dailyCosts.default;
    
    const flightTotal = flightPerPerson * numTravelers;
    const hotelTotal = (dailyCost * 0.6) * numDays * Math.ceil(numTravelers / 2);
    const dailyTotal = (dailyCost * 0.4) * numDays * numTravelers;
    const total = flightTotal + hotelTotal + dailyTotal;
    const destName = getDestLabel(destination);

    setResult({ flight: flightTotal, hotel: hotelTotal, daily: dailyTotal, total, destName });
  };

  const handleWhatsAppContact = () => {
    if (!result) return;
    const message = language === "es" 
      ? `Hola! Estoy interesado en un viaje a ${result.destName}. Somos ${travelers} viajero(s) por ${days} dias. Presupuesto estimado: $${result.total.toLocaleString()} USD. Me gustaria recibir una cotizacion personalizada.`
      : language === "pt"
      ? `Ola! Estou interessado em uma viagem para ${result.destName}. Somos ${travelers} viajante(s) por ${days} dias. Orcamento estimado: $${result.total.toLocaleString()} USD. Gostaria de receber um orcamento personalizado.`
      : `Hello! I'm interested in a trip to ${result.destName}. We are ${travelers} traveler(s) for ${days} days. Estimated budget: $${result.total.toLocaleString()} USD. I would like to receive a personalized quote.`;
    window.open(`https://wa.me/34611105448?text=${encodeURIComponent(message)}`, "_blank");
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
                <SelectLabel>Colombia</SelectLabel>
                <SelectItem value="bogota">Bogota, Colombia</SelectItem>
                <SelectItem value="medellin">Medellin, Colombia</SelectItem>
                <SelectItem value="cartagena">Cartagena, Colombia</SelectItem>
                <SelectItem value="cali">Cali, Colombia</SelectItem>
                <SelectItem value="barranquilla">Barranquilla, Colombia</SelectItem>
                <SelectSeparator />
                <SelectLabel>Mexico</SelectLabel>
                <SelectItem value="mexico">Ciudad de Mexico, Mexico</SelectItem>
                <SelectItem value="guadalajara">Guadalajara, Mexico</SelectItem>
                <SelectItem value="monterrey">Monterrey, Mexico</SelectItem>
                <SelectItem value="cancun">Cancun, Mexico</SelectItem>
                <SelectSeparator />
                <SelectLabel>Brasil</SelectLabel>
                <SelectItem value="sao_paulo">Sao Paulo, Brasil</SelectItem>
                <SelectItem value="rio_janeiro">Rio de Janeiro, Brasil</SelectItem>
                <SelectItem value="brasilia">Brasilia, Brasil</SelectItem>
                <SelectSeparator />
                <SelectLabel>Argentina</SelectLabel>
                <SelectItem value="buenos_aires">Buenos Aires, Argentina</SelectItem>
                <SelectItem value="cordoba_ar">Cordoba, Argentina</SelectItem>
                <SelectSeparator />
                <SelectLabel>Peru</SelectLabel>
                <SelectItem value="lima">Lima, Peru</SelectItem>
                <SelectItem value="cusco">Cusco, Peru</SelectItem>
                <SelectSeparator />
                <SelectLabel>Panama</SelectLabel>
                <SelectItem value="panama_city">Ciudad de Panama, Panama</SelectItem>
                <SelectSeparator />
                <SelectLabel>Costa Rica</SelectLabel>
                <SelectItem value="san_jose">San Jose, Costa Rica</SelectItem>
                <SelectSeparator />
                <SelectLabel>Rep. Dominicana</SelectLabel>
                <SelectItem value="santo_domingo">Santo Domingo, Rep. Dominicana</SelectItem>
                <SelectItem value="punta_cana">Punta Cana, Rep. Dominicana</SelectItem>
                <SelectSeparator />
                <SelectLabel>Caribe</SelectLabel>
                <SelectItem value="san_juan">San Juan, Puerto Rico</SelectItem>
                <SelectItem value="la_habana">La Habana, Cuba</SelectItem>
                <SelectItem value="kingston">Kingston, Jamaica</SelectItem>
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
                <SelectItem value="paris">{getDestLabel("paris")}</SelectItem>
                <SelectItem value="rome">{getDestLabel("rome")}</SelectItem>
                <SelectItem value="madrid">{getDestLabel("madrid")}</SelectItem>
                <SelectItem value="barcelona">{getDestLabel("barcelona")}</SelectItem>
                <SelectItem value="lisbon">{getDestLabel("lisbon")}</SelectItem>
                <SelectItem value="athens">{getDestLabel("athens")}</SelectItem>
                <SelectItem value="amsterdam">{getDestLabel("amsterdam")}</SelectItem>
                <SelectItem value="zurich">{getDestLabel("zurich")}</SelectItem>
                <SelectItem value="geneva">{getDestLabel("geneva")}</SelectItem>
                <SelectItem value="zagreb">{getDestLabel("zagreb")}</SelectItem>
                <SelectItem value="london">{getDestLabel("london")}</SelectItem>
                <SelectItem value="edinburgh">{getDestLabel("edinburgh")}</SelectItem>
                <SelectItem value="tirana">{getDestLabel("tirana")}</SelectItem>
                <SelectItem value="vienna">{getDestLabel("vienna")}</SelectItem>
                <SelectItem value="brussels">{getDestLabel("brussels")}</SelectItem>
                <SelectItem value="prague">{getDestLabel("prague")}</SelectItem>
                <SelectItem value="copenhagen">{getDestLabel("copenhagen")}</SelectItem>
                <SelectItem value="helsinki">{getDestLabel("helsinki")}</SelectItem>
                <SelectItem value="budapest">{getDestLabel("budapest")}</SelectItem>
                <SelectItem value="reykjavik">{getDestLabel("reykjavik")}</SelectItem>
                <SelectItem value="dublin">{getDestLabel("dublin")}</SelectItem>
                <SelectItem value="oslo">{getDestLabel("oslo")}</SelectItem>
                <SelectItem value="warsaw">{getDestLabel("warsaw")}</SelectItem>
                <SelectItem value="bucharest">{getDestLabel("bucharest")}</SelectItem>
                <SelectItem value="stockholm">{getDestLabel("stockholm")}</SelectItem>
                <SelectItem value="riga">{getDestLabel("riga")}</SelectItem>
                <SelectItem value="nicosia">{getDestLabel("nicosia")}</SelectItem>
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
            <Button 
              onClick={handleWhatsAppContact} 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold mt-4"
              data-testid="button-calc-whatsapp"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {language === "es" ? "Solicitar Cotizacion por WhatsApp" : language === "pt" ? "Solicitar Orcamento pelo WhatsApp" : "Request Quote via WhatsApp"}
            </Button>
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
                <SelectItem value="mexico">{language === "es" ? "Mexicana" : language === "pt" ? "Mexicana" : "Mexican"}</SelectItem>
                <SelectItem value="brasil">{language === "es" ? "Brasilena" : language === "pt" ? "Brasileira" : "Brazilian"}</SelectItem>
                <SelectItem value="argentina">{language === "es" ? "Argentina" : language === "pt" ? "Argentina" : "Argentine"}</SelectItem>
                <SelectItem value="peru">{language === "es" ? "Peruana" : language === "pt" ? "Peruana" : "Peruvian"}</SelectItem>
                <SelectItem value="panama">{language === "es" ? "Panamena" : language === "pt" ? "Panamenha" : "Panamanian"}</SelectItem>
                <SelectItem value="costarica">{language === "es" ? "Costarricense" : language === "pt" ? "Costarriquenha" : "Costa Rican"}</SelectItem>
                <SelectItem value="dominicana">{language === "es" ? "Dominicana" : language === "pt" ? "Dominicana" : "Dominican"}</SelectItem>
                <SelectItem value="caribe">{language === "es" ? "Caribena" : language === "pt" ? "Caribenha" : "Caribbean"}</SelectItem>
                <SelectItem value="venezuela">{language === "es" ? "Venezolana" : language === "pt" ? "Venezuelana" : "Venezuelan"}</SelectItem>
                <SelectItem value="chile">{language === "es" ? "Chilena" : language === "pt" ? "Chilena" : "Chilean"}</SelectItem>
                <SelectItem value="ecuador">{language === "es" ? "Ecuatoriana" : language === "pt" ? "Equatoriana" : "Ecuadorian"}</SelectItem>
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
                <SelectItem value="france">{language === "es" ? "Francia (Schengen)" : language === "pt" ? "Franca (Schengen)" : "France (Schengen)"}</SelectItem>
                <SelectItem value="italy">{language === "es" ? "Italia (Schengen)" : language === "pt" ? "Italia (Schengen)" : "Italy (Schengen)"}</SelectItem>
                <SelectItem value="spain">{language === "es" ? "España (Schengen)" : language === "pt" ? "Espanha (Schengen)" : "Spain (Schengen)"}</SelectItem>
                <SelectItem value="germany">{language === "es" ? "Alemania (Schengen)" : language === "pt" ? "Alemanha (Schengen)" : "Germany (Schengen)"}</SelectItem>
                <SelectItem value="portugal">{language === "es" ? "Portugal (Schengen)" : language === "pt" ? "Portugal (Schengen)" : "Portugal (Schengen)"}</SelectItem>
                <SelectItem value="greece">{language === "es" ? "Grecia (Schengen)" : language === "pt" ? "Grecia (Schengen)" : "Greece (Schengen)"}</SelectItem>
                <SelectItem value="netherlands">{language === "es" ? "Paises Bajos (Schengen)" : language === "pt" ? "Paises Baixos (Schengen)" : "Netherlands (Schengen)"}</SelectItem>
                <SelectItem value="switzerland">{language === "es" ? "Suiza (Schengen)" : language === "pt" ? "Suica (Schengen)" : "Switzerland (Schengen)"}</SelectItem>
                <SelectItem value="croatia">{language === "es" ? "Croacia (Schengen)" : language === "pt" ? "Croacia (Schengen)" : "Croatia (Schengen)"}</SelectItem>
                <SelectItem value="uk">{language === "es" ? "Reino Unido" : language === "pt" ? "Reino Unido" : "United Kingdom"}</SelectItem>
                <SelectItem value="albania">{language === "es" ? "Albania" : language === "pt" ? "Albania" : "Albania"}</SelectItem>
                <SelectItem value="austria">{language === "es" ? "Austria (Schengen)" : language === "pt" ? "Austria (Schengen)" : "Austria (Schengen)"}</SelectItem>
                <SelectItem value="belgium">{language === "es" ? "Belgica (Schengen)" : language === "pt" ? "Belgica (Schengen)" : "Belgium (Schengen)"}</SelectItem>
                <SelectItem value="czechia">{language === "es" ? "Republica Checa (Schengen)" : language === "pt" ? "Republica Tcheca (Schengen)" : "Czech Republic (Schengen)"}</SelectItem>
                <SelectItem value="denmark">{language === "es" ? "Dinamarca (Schengen)" : language === "pt" ? "Dinamarca (Schengen)" : "Denmark (Schengen)"}</SelectItem>
                <SelectItem value="finland">{language === "es" ? "Finlandia (Schengen)" : language === "pt" ? "Finlandia (Schengen)" : "Finland (Schengen)"}</SelectItem>
                <SelectItem value="hungary">{language === "es" ? "Hungria (Schengen)" : language === "pt" ? "Hungria (Schengen)" : "Hungary (Schengen)"}</SelectItem>
                <SelectItem value="iceland">{language === "es" ? "Islandia (Schengen)" : language === "pt" ? "Islandia (Schengen)" : "Iceland (Schengen)"}</SelectItem>
                <SelectItem value="ireland">{language === "es" ? "Irlanda" : language === "pt" ? "Irlanda" : "Ireland"}</SelectItem>
                <SelectItem value="norway">{language === "es" ? "Noruega (Schengen)" : language === "pt" ? "Noruega (Schengen)" : "Norway (Schengen)"}</SelectItem>
                <SelectItem value="poland">{language === "es" ? "Polonia (Schengen)" : language === "pt" ? "Polonia (Schengen)" : "Poland (Schengen)"}</SelectItem>
                <SelectItem value="romania">{language === "es" ? "Rumania" : language === "pt" ? "Romenia" : "Romania"}</SelectItem>
                <SelectItem value="sweden">{language === "es" ? "Suecia (Schengen)" : language === "pt" ? "Suecia (Schengen)" : "Sweden (Schengen)"}</SelectItem>
                <SelectItem value="baltics">{language === "es" ? "Estados Balticos (Schengen)" : language === "pt" ? "Estados Balticos (Schengen)" : "Baltic States (Schengen)"}</SelectItem>
                <SelectItem value="cyprus">{language === "es" ? "Chipre" : language === "pt" ? "Chipre" : "Cyprus"}</SelectItem>
                <SelectItem value="scotland">{language === "es" ? "Escocia" : language === "pt" ? "Escocia" : "Scotland"}</SelectItem>
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
