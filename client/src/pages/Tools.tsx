import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { FloatingContactButtons } from "@/components/support";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/lib/i18n";
import { Calculator, Plane, MapPin, FileCheck, Euro, Calendar, Users, ArrowRight, CheckCircle } from "lucide-react";

export default function Tools() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEOHead title="Herramientas de Viaje" description="Herramientas utiles para planificar tu viaje a Europa: calculadora de presupuesto, clima, monedas y mas." />
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
    window.open(`https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(message)}`, "_blank");
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
    madrid: { es: "Madrid, España", en: "Madrid, Spain", pt: "Madrid, Espanha" },
    barcelona: { es: "Barcelona, España", en: "Barcelona, Spain", pt: "Barcelona, Espanha" },
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
    window.open(`https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(message)}`, "_blank");
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
  const [result, setResult] = useState<{ required: boolean; type: string; info: string; documents: string[]; processingTime: string; cost: string } | null>(null);

  const schengenCountries = ["france", "italy", "spain", "germany", "portugal", "greece", "netherlands", "switzerland", "croatia", "austria", "belgium", "czechia", "denmark", "finland", "hungary", "iceland", "norway", "poland", "sweden", "baltics"];
  const ukCountries = ["uk", "scotland"];
  
  const visaFreeSchengen = ["mexico", "brasil", "argentina", "peru", "panama", "costarica", "chile"];
  const visaRequiredSchengen = ["colombia", "dominicana", "caribe", "venezuela", "ecuador"];
  
  const visaFreeUK = ["mexico", "brasil", "argentina", "chile", "costarica", "panama"];
  const visaRequiredUK = ["colombia", "peru", "dominicana", "caribe", "venezuela", "ecuador"];

  const getVisaInfo = (nat: string, dest: string) => {
    const isSchengen = schengenCountries.includes(dest);
    const isUK = ukCountries.includes(dest);
    const isIreland = dest === "ireland";
    const isAlbania = dest === "albania";
    const isCyprus = dest === "cyprus";
    const isRomania = dest === "romania";

    if (isSchengen) {
      if (visaFreeSchengen.includes(nat)) {
        return {
          required: false,
          type: language === "es" ? "Exento de Visa Schengen" : language === "pt" ? "Isento de Visto Schengen" : "Schengen Visa Exempt",
          info: language === "es" 
            ? "No necesitas visa para el Espacio Schengen. Puedes permanecer hasta 90 dias en un periodo de 180 dias para turismo o negocios."
            : language === "pt"
            ? "Voce nao precisa de visto para o Espaco Schengen. Pode permanecer ate 90 dias em um periodo de 180 dias para turismo ou negocios."
            : "You don't need a visa for the Schengen Area. You can stay up to 90 days within a 180-day period for tourism or business.",
          documents: language === "es" 
            ? ["Pasaporte vigente (minimo 6 meses)", "Reserva de hotel o carta de invitacion", "Boleto de avion de ida y vuelta", "Seguro de viaje (minimo 30,000 EUR)", "Comprobante de solvencia economica (65 EUR/dia)", "Itinerario de viaje"]
            : language === "pt"
            ? ["Passaporte valido (minimo 6 meses)", "Reserva de hotel ou carta convite", "Passagem aerea ida e volta", "Seguro viagem (minimo 30.000 EUR)", "Comprovante de solvencia economica (65 EUR/dia)", "Itinerario de viagem"]
            : ["Valid passport (minimum 6 months)", "Hotel reservation or invitation letter", "Round-trip flight ticket", "Travel insurance (minimum 30,000 EUR)", "Proof of financial solvency (65 EUR/day)", "Travel itinerary"],
          processingTime: language === "es" ? "N/A - Sin visa" : language === "pt" ? "N/A - Sem visto" : "N/A - No visa needed",
          cost: language === "es" ? "Gratis" : language === "pt" ? "Gratis" : "Free"
        };
      } else {
        return {
          required: true,
          type: language === "es" ? "Visa Schengen (Tipo C)" : language === "pt" ? "Visto Schengen (Tipo C)" : "Schengen Visa (Type C)",
          info: language === "es"
            ? "Necesitas solicitar una Visa Schengen de corta duracion (Tipo C) en el consulado del pais principal de destino. Permite estancia de hasta 90 dias en 180 dias."
            : language === "pt"
            ? "Voce precisa solicitar um Visto Schengen de curta duracao (Tipo C) no consulado do pais principal de destino. Permite estadia de ate 90 dias em 180 dias."
            : "You need to apply for a Short-stay Schengen Visa (Type C) at the consulate of the main destination country. Allows stay of up to 90 days in 180 days.",
          documents: language === "es"
            ? ["Formulario de solicitud de visa completado", "Pasaporte vigente (minimo 6 meses, 2 paginas en blanco)", "2 fotos tamano pasaporte recientes", "Seguro de viaje (cobertura minima 30,000 EUR)", "Comprobante de alojamiento", "Boleto de avion reservado (ida y vuelta)", "Comprobante de solvencia economica (extractos bancarios 3 meses)", "Carta de empleo o constancia de ingresos", "Itinerario detallado del viaje", "Pago de tasa consular (80 EUR aproximadamente)"]
            : language === "pt"
            ? ["Formulario de solicitacao de visto preenchido", "Passaporte valido (minimo 6 meses, 2 paginas em branco)", "2 fotos tamanho passaporte recentes", "Seguro viagem (cobertura minima 30.000 EUR)", "Comprovante de hospedagem", "Passagem aerea reservada (ida e volta)", "Comprovante de solvencia economica (extratos bancarios 3 meses)", "Carta de emprego ou comprovante de renda", "Roteiro detalhado da viagem", "Pagamento da taxa consular (80 EUR aproximadamente)"]
            : ["Completed visa application form", "Valid passport (minimum 6 months, 2 blank pages)", "2 recent passport-size photos", "Travel insurance (minimum coverage 30,000 EUR)", "Proof of accommodation", "Reserved flight ticket (round-trip)", "Proof of financial solvency (3-month bank statements)", "Employment letter or income proof", "Detailed travel itinerary", "Consular fee payment (approximately 80 EUR)"],
          processingTime: language === "es" ? "15-30 dias habiles" : language === "pt" ? "15-30 dias uteis" : "15-30 business days",
          cost: "80 EUR"
        };
      }
    }

    if (isUK) {
      if (visaFreeUK.includes(nat)) {
        return {
          required: false,
          type: language === "es" ? "Exento de Visa Reino Unido" : language === "pt" ? "Isento de Visto Reino Unido" : "UK Visa Exempt",
          info: language === "es"
            ? "No necesitas visa para Reino Unido. Puedes permanecer hasta 6 meses como visitante para turismo, negocios o visita familiar."
            : language === "pt"
            ? "Voce nao precisa de visto para o Reino Unido. Pode permanecer ate 6 meses como visitante para turismo, negocios ou visita familiar."
            : "You don't need a visa for the UK. You can stay up to 6 months as a visitor for tourism, business, or family visits.",
          documents: language === "es"
            ? ["Pasaporte vigente", "Comprobante de alojamiento", "Boleto de avion de regreso", "Comprobante de fondos suficientes", "Itinerario de viaje"]
            : language === "pt"
            ? ["Passaporte valido", "Comprovante de hospedagem", "Passagem aerea de retorno", "Comprovante de fundos suficientes", "Itinerario de viagem"]
            : ["Valid passport", "Proof of accommodation", "Return flight ticket", "Proof of sufficient funds", "Travel itinerary"],
          processingTime: language === "es" ? "N/A - Sin visa" : language === "pt" ? "N/A - Sem visto" : "N/A - No visa needed",
          cost: language === "es" ? "Gratis" : language === "pt" ? "Gratis" : "Free"
        };
      } else {
        return {
          required: true,
          type: language === "es" ? "Visa de Visitante Estandar UK" : language === "pt" ? "Visto de Visitante Padrao UK" : "UK Standard Visitor Visa",
          info: language === "es"
            ? "Necesitas solicitar una Visa de Visitante Estandar del Reino Unido. Permite estancias de hasta 6 meses para turismo, negocios o tratamiento medico."
            : language === "pt"
            ? "Voce precisa solicitar um Visto de Visitante Padrao do Reino Unido. Permite estadias de ate 6 meses para turismo, negocios ou tratamento medico."
            : "You need to apply for a UK Standard Visitor Visa. Allows stays of up to 6 months for tourism, business, or medical treatment.",
          documents: language === "es"
            ? ["Formulario de solicitud en linea completado", "Pasaporte vigente", "Foto digital reciente", "Comprobante de empleo o estudios", "Extractos bancarios (6 meses)", "Comprobante de alojamiento en UK", "Itinerario de viaje detallado", "Boletos de avion reservados", "Carta de invitacion (si aplica)", "Pago de tasa de visa"]
            : language === "pt"
            ? ["Formulario de solicitacao online preenchido", "Passaporte valido", "Foto digital recente", "Comprovante de emprego ou estudos", "Extratos bancarios (6 meses)", "Comprovante de hospedagem no UK", "Itinerario de viagem detalhado", "Passagens aereas reservadas", "Carta convite (se aplicavel)", "Pagamento da taxa de visto"]
            : ["Completed online application form", "Valid passport", "Recent digital photo", "Proof of employment or studies", "Bank statements (6 months)", "Proof of accommodation in UK", "Detailed travel itinerary", "Reserved flight tickets", "Invitation letter (if applicable)", "Visa fee payment"],
          processingTime: language === "es" ? "3-6 semanas" : language === "pt" ? "3-6 semanas" : "3-6 weeks",
          cost: "115 GBP"
        };
      }
    }

    if (isIreland) {
      const needsVisa = ["colombia", "dominicana", "caribe", "venezuela", "ecuador"].includes(nat);
      if (needsVisa) {
        return {
          required: true,
          type: language === "es" ? "Visa de Visitante Irlanda" : language === "pt" ? "Visto de Visitante Irlanda" : "Ireland Visitor Visa",
          info: language === "es"
            ? "Necesitas solicitar una visa de visitante para Irlanda. Irlanda no es parte del Espacio Schengen pero es parte de la UE."
            : language === "pt"
            ? "Voce precisa solicitar um visto de visitante para a Irlanda. A Irlanda nao faz parte do Espaco Schengen mas faz parte da UE."
            : "You need to apply for an Ireland visitor visa. Ireland is not part of the Schengen Area but is part of the EU.",
          documents: language === "es"
            ? ["Formulario de solicitud completado", "Pasaporte vigente", "2 fotos tamano pasaporte", "Comprobante de alojamiento", "Seguro de viaje", "Comprobante de fondos", "Boleto de avion ida y vuelta"]
            : language === "pt"
            ? ["Formulario de solicitacao preenchido", "Passaporte valido", "2 fotos tamanho passaporte", "Comprovante de hospedagem", "Seguro viagem", "Comprovante de fundos", "Passagem aerea ida e volta"]
            : ["Completed application form", "Valid passport", "2 passport-size photos", "Proof of accommodation", "Travel insurance", "Proof of funds", "Round-trip flight ticket"],
          processingTime: language === "es" ? "8 semanas" : language === "pt" ? "8 semanas" : "8 weeks",
          cost: "60 EUR"
        };
      } else {
        return {
          required: false,
          type: language === "es" ? "Exento de Visa Irlanda" : language === "pt" ? "Isento de Visto Irlanda" : "Ireland Visa Exempt",
          info: language === "es"
            ? "No necesitas visa para Irlanda. Puedes permanecer hasta 90 dias para turismo."
            : language === "pt"
            ? "Voce nao precisa de visto para a Irlanda. Pode permanecer ate 90 dias para turismo."
            : "You don't need a visa for Ireland. You can stay up to 90 days for tourism.",
          documents: language === "es"
            ? ["Pasaporte vigente", "Comprobante de alojamiento", "Boleto de regreso", "Comprobante de fondos"]
            : language === "pt"
            ? ["Passaporte valido", "Comprovante de hospedagem", "Passagem de retorno", "Comprovante de fundos"]
            : ["Valid passport", "Proof of accommodation", "Return ticket", "Proof of funds"],
          processingTime: language === "es" ? "N/A" : language === "pt" ? "N/A" : "N/A",
          cost: language === "es" ? "Gratis" : language === "pt" ? "Gratis" : "Free"
        };
      }
    }

    if (isAlbania || isCyprus || isRomania) {
      const countryName = dest === "albania" ? (language === "es" ? "Albania" : language === "pt" ? "Albania" : "Albania") 
        : dest === "cyprus" ? (language === "es" ? "Chipre" : language === "pt" ? "Chipre" : "Cyprus")
        : (language === "es" ? "Rumania" : language === "pt" ? "Romenia" : "Romania");
      
      return {
        required: false,
        type: language === "es" ? `Sin visa para ${countryName}` : language === "pt" ? `Sem visto para ${countryName}` : `No visa for ${countryName}`,
        info: language === "es"
          ? `La mayoria de nacionalidades latinoamericanas no requieren visa para ${countryName} para estancias cortas de turismo (hasta 90 dias).`
          : language === "pt"
          ? `A maioria das nacionalidades latino-americanas nao requer visto para ${countryName} para estadias curtas de turismo (ate 90 dias).`
          : `Most Latin American nationalities don't require a visa for ${countryName} for short tourism stays (up to 90 days).`,
        documents: language === "es"
          ? ["Pasaporte vigente", "Comprobante de alojamiento", "Boleto de regreso", "Comprobante de fondos"]
          : language === "pt"
          ? ["Passaporte valido", "Comprovante de hospedagem", "Passagem de retorno", "Comprovante de fundos"]
          : ["Valid passport", "Proof of accommodation", "Return ticket", "Proof of funds"],
        processingTime: language === "es" ? "N/A" : language === "pt" ? "N/A" : "N/A",
        cost: language === "es" ? "Gratis" : language === "pt" ? "Gratis" : "Free"
      };
    }

    return {
      required: true,
      type: language === "es" ? "Verificar Requisitos" : language === "pt" ? "Verificar Requisitos" : "Verify Requirements",
      info: language === "es"
        ? "Recomendamos verificar los requisitos especificos con el consulado del pais de destino."
        : language === "pt"
        ? "Recomendamos verificar os requisitos especificos com o consulado do pais de destino."
        : "We recommend verifying specific requirements with the destination country's consulate.",
      documents: [],
      processingTime: language === "es" ? "Variable" : language === "pt" ? "Variavel" : "Variable",
      cost: language === "es" ? "Variable" : language === "pt" ? "Variavel" : "Variable"
    };
  };

  const check = () => {
    if (!nationality || !destination) return;
    const visaInfo = getVisaInfo(nationality, destination);
    setResult(visaInfo);
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
          <div className={`rounded-lg p-6 ${result.required ? "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800" : "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"}`} data-testid="result-visa">
            <div className="flex items-center gap-3 mb-3">
              <Badge className={result.required ? "bg-amber-500" : "bg-green-500"}>
                {result.required ? t("tools.visa.required") : t("tools.visa.notRequired")}
              </Badge>
              <span className="font-bold text-primary">{result.type}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{result.info}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-background/50 rounded-md p-3">
                <p className="text-xs text-muted-foreground mb-1">{language === "es" ? "Tiempo de Tramite" : language === "pt" ? "Tempo de Processamento" : "Processing Time"}</p>
                <p className="font-bold text-sm">{result.processingTime}</p>
              </div>
              <div className="bg-background/50 rounded-md p-3">
                <p className="text-xs text-muted-foreground mb-1">{language === "es" ? "Costo Aproximado" : language === "pt" ? "Custo Aproximado" : "Approximate Cost"}</p>
                <p className="font-bold text-sm">{result.cost}</p>
              </div>
            </div>

            {result.documents.length > 0 && (
              <div className="mb-4">
                <p className="font-bold text-sm mb-2">{language === "es" ? "Documentos Requeridos:" : language === "pt" ? "Documentos Necessarios:" : "Required Documents:"}</p>
                <ul className="space-y-1">
                  {result.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button 
              variant="outline" 
              className="mt-2 gap-2" 
              data-testid="button-visa-help"
              onClick={() => {
                const message = language === "es" 
                  ? `Hola! Necesito ayuda con los requisitos de visa para viajar a Europa. Mi nacionalidad es ${nationality} y quiero ir a ${destination}.`
                  : language === "pt"
                  ? `Ola! Preciso de ajuda com os requisitos de visto para viajar a Europa. Minha nacionalidade e ${nationality} e quero ir a ${destination}.`
                  : `Hello! I need help with visa requirements for traveling to Europe. My nationality is ${nationality} and I want to go to ${destination}.`;
                window.open(`https://api.whatsapp.com/send?phone=34611105448&text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              {language === "es" ? "Solicitar Asesoria por WhatsApp" : language === "pt" ? "Solicitar Assessoria pelo WhatsApp" : "Request Advice via WhatsApp"} <ArrowRight className="w-4 h-4" />
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
