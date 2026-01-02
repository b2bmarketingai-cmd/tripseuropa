import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, Globe, FileText, Clock, CheckCircle, AlertTriangle, 
  Plane, MapPin, ArrowRight, Calendar, DollarSign, Users,
  Info, ExternalLink
} from "lucide-react";
import { Link } from "wouter";
import { FloatingContactButtons, SupportFAQSection, SupportContactSection, type FAQItem } from "@/components/support";

const VISA_FAQS: FAQItem[] = [
  {
    question: { es: "Necesito visa para viajar a Europa desde Latinoamerica?", en: "Do I need a visa to travel to Europe from Latin America?" },
    answer: { es: "Depende de tu nacionalidad. Los ciudadanos de Colombia, Mexico, Argentina, Peru, Brasil, Chile y otros paises latinoamericanos pueden visitar el espacio Schengen (26 paises europeos) hasta 90 dias sin visa para turismo. Sin embargo, a partir de 2025 se requerira el permiso ETIAS.", en: "It depends on your nationality. Citizens of Colombia, Mexico, Argentina, Peru, Brazil, Chile, and other Latin American countries can visit the Schengen area (26 European countries) for up to 90 days without a visa for tourism. However, starting in 2025, the ETIAS permit will be required." }
  },
  {
    question: { es: "Que es el ETIAS y cuando entrara en vigor?", en: "What is ETIAS and when will it take effect?" },
    answer: { es: "ETIAS (Sistema Europeo de Informacion y Autorizacion de Viajes) es un permiso electronico obligatorio para viajeros de paises exentos de visa. Tendra un costo de 7 EUR, sera valido por 3 años y se tramita online. Se espera que entre en vigor en 2025.", en: "ETIAS (European Travel Information and Authorization System) is a mandatory electronic permit for travelers from visa-exempt countries. It will cost 7 EUR, be valid for 3 years, and is processed online. It is expected to take effect in 2025." }
  },
  {
    question: { es: "Que documentos necesito para viajar a Europa?", en: "What documents do I need to travel to Europe?" },
    answer: { es: "Necesitas: pasaporte vigente (minimo 6 meses), boleto de avion de ida y vuelta, reserva de hotel o carta de invitacion, seguro de viaje con cobertura minima de 30,000 EUR, comprobante de fondos suficientes y en algunos casos el ETIAS aprobado.", en: "You need: valid passport (minimum 6 months), round-trip flight ticket, hotel reservation or invitation letter, travel insurance with minimum coverage of 30,000 EUR, proof of sufficient funds, and in some cases an approved ETIAS." }
  },
  {
    question: { es: "Cuanto tiempo puedo permanecer en Europa sin visa?", en: "How long can I stay in Europe without a visa?" },
    answer: { es: "Puedes permanecer hasta 90 dias dentro de un periodo de 180 dias en el espacio Schengen. Este tiempo es acumulativo, es decir, si sales y vuelves a entrar, los dias se suman.", en: "You can stay up to 90 days within a 180-day period in the Schengen area. This time is cumulative, meaning if you leave and re-enter, the days add up." }
  },
  {
    question: { es: "Necesito visa para Reino Unido?", en: "Do I need a visa for the United Kingdom?" },
    answer: { es: "Reino Unido no forma parte del espacio Schengen. Los ciudadanos de Mexico, Colombia, Argentina, Chile, Peru y Brasil pueden visitar el Reino Unido hasta 6 meses sin visa para turismo. Otras nacionalidades pueden requerir visa.", en: "The UK is not part of the Schengen area. Citizens of Mexico, Colombia, Argentina, Chile, Peru, and Brazil can visit the UK for up to 6 months without a visa for tourism. Other nationalities may require a visa." }
  },
  {
    question: { es: "Que paises requieren visa para latinoamericanos?", en: "Which countries require visas for Latin Americans?" },
    answer: { es: "Algunos destinos populares que requieren visa incluyen: Estados Unidos, Canada, China, India, Australia, Rusia, y Sudafrica. Te ayudamos con la informacion y requisitos especificos para cada destino.", en: "Some popular destinations that require visas include: United States, Canada, China, India, Australia, Russia, and South Africa. We help you with specific information and requirements for each destination." }
  }
];

const VISA_FREE_COUNTRIES = [
  { name: "Espacio Schengen", countries: "26 paises", duration: "90 dias", flag: "EU" },
  { name: "Reino Unido", countries: "1 pais", duration: "6 meses", flag: "GB" },
  { name: "Turquia", countries: "1 pais", duration: "90 dias", flag: "TR" },
  { name: "Emiratos Arabes", countries: "Dubai, Abu Dhabi", duration: "180 dias", flag: "AE" },
  { name: "Egipto", countries: "1 pais", duration: "Visa on arrival", flag: "EG" },
  { name: "Tailandia", countries: "1 pais", duration: "60 dias", flag: "TH" },
];

const VISA_REQUIRED_COUNTRIES = [
  { 
    name: "Estados Unidos",
    flag: "US",
    process: { es: "Tramite personal en embajada", en: "Personal process at embassy" },
    cost: "USD $185",
    time: { es: "2-8 semanas", en: "2-8 weeks" },
    link: "https://mx.usembassy.gov/es/visas-es/"
  },
  { 
    name: "Canada",
    flag: "CA",
    process: { es: "eTA o Visa segun requisitos", en: "eTA or Visa depending on requirements" },
    cost: "CAD $7 - $185",
    time: { es: "1-4 semanas", en: "1-4 weeks" },
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html"
  },
  { 
    name: "China",
    flag: "CN",
    process: { es: "Online + Centro de Visados", en: "Online + Visa Center" },
    cost: "USD $47 - $140",
    time: { es: "5-10 dias habiles", en: "5-10 business days" },
    link: "https://bio.visaforchina.cn/"
  },
  { 
    name: "India",
    flag: "IN",
    process: { es: "e-Visa online", en: "e-Visa online" },
    cost: "USD $25 - $80",
    time: { es: "48-72 horas", en: "48-72 hours" },
    link: "https://indianvisaonline.gov.in/visa/tvoa.html"
  },
  { 
    name: "Sudafrica",
    flag: "ZA",
    process: { es: "Embajada obligatorio", en: "Embassy required" },
    cost: "Variable",
    time: { es: "4-6 semanas", en: "4-6 weeks" },
    link: null
  },
  { 
    name: "Australia",
    flag: "AU",
    process: { es: "eVisitor online", en: "eVisitor online" },
    cost: "AUD $20 - $145",
    time: { es: "1-4 semanas", en: "1-4 weeks" },
    link: "https://immi.homeaffairs.gov.au/"
  },
];

const SCHENGEN_COUNTRIES = [
  "Alemania", "Austria", "Belgica", "Republica Checa", "Dinamarca", "Eslovaquia",
  "Eslovenia", "España", "Estonia", "Finlandia", "Francia", "Grecia", 
  "Hungria", "Islandia", "Italia", "Letonia", "Liechtenstein", "Lituania",
  "Luxemburgo", "Malta", "Noruega", "Paises Bajos", "Polonia", "Portugal",
  "Suecia", "Suiza"
];

export default function VisaRequirements() {
  const { language } = useI18n();
  const lang = language as "es" | "en";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <section className="relative py-24 md:py-32 bg-primary overflow-hidden" data-testid="section-visa-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=60&w=1600&auto=format&fit=crop" 
            alt="Airplane wing view over clouds representing international travel" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/95"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-accent" />
            <Badge className="bg-accent/20 text-accent border-accent/30" data-testid="badge-visa">
              {language === "es" ? "Informacion de Viaje" : "Travel Information"}
            </Badge>
            <Globe className="w-6 h-6 text-accent" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-visa-title">
            <span className="text-accent">{language === "es" ? "Requisitos de Visa" : "Visa Requirements"}</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8" data-testid="text-visa-subtitle">
            {language === "es" 
              ? "Toda la informacion que necesitas sobre visas, permisos y documentacion para viajar desde Latinoamerica a Europa y el mundo." 
              : "All the information you need about visas, permits, and documentation to travel from Latin America to Europe and the world."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Guias actualizadas" : "Updated guides"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Tiempos de tramite" : "Processing times"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Requisitos claros" : "Clear requirements"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-visa-free">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Destinos Sin Visa Para Latinoamericanos" : "Visa-Free Destinations for Latin Americans"}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Estos destinos permiten la entrada sin visa para ciudadanos de la mayoria de paises latinoamericanos." 
                : "These destinations allow visa-free entry for citizens of most Latin American countries."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VISA_FREE_COUNTRIES.map((country, idx) => (
              <Card key={idx} className="overflow-visible" data-testid={`card-visa-free-${idx}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display font-bold text-lg">{country.name}</h3>
                      <p className="text-sm text-muted-foreground">{country.countries}</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {language === "es" ? "Sin Visa" : "Visa Free"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>{language === "es" ? "Estancia maxima:" : "Maximum stay:"} <strong>{country.duration}</strong></span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-schengen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
                {language === "es" ? "Espacio Schengen" : "Schengen Area"}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                <span className="text-accent">{language === "es" ? "26 Paises Europeos Con Una Sola Entrada" : "26 European Countries With One Entry"}</span>
              </h2>
              <p className="text-muted-foreground">
                {language === "es" 
                  ? "Los ciudadanos latinoamericanos pueden visitar estos 26 paises por hasta 90 dias sin visa." 
                  : "Latin American citizens can visit these 26 countries for up to 90 days without a visa."}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {SCHENGEN_COUNTRIES.map((country, idx) => (
                <Badge key={idx} variant="outline" className="py-1 px-3">
                  <MapPin className="w-3 h-3 mr-1" />
                  {country}
                </Badge>
              ))}
            </div>

            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2">
                      {language === "es" ? "ETIAS - Nuevo Requisito 2025" : "ETIAS - New Requirement 2025"}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {language === "es" 
                        ? "A partir de 2025, los viajeros de paises exentos de visa deberan obtener una autorizacion ETIAS antes de viajar al espacio Schengen. El tramite es online, cuesta 7 EUR y tiene validez de 3 años." 
                        : "Starting in 2025, travelers from visa-exempt countries will need to obtain an ETIAS authorization before traveling to the Schengen area. The process is online, costs 7 EUR, and is valid for 3 years."}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span>7 EUR</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span>{language === "es" ? "Validez 3 años" : "Valid 3 years"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-accent" />
                        <span>{language === "es" ? "Tramite online" : "Online process"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-visa-required">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Destinos Que Requieren Visa" : "Destinations That Require Visa"}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Estos paises requieren visa o permiso especial para ciudadanos latinoamericanos." 
                : "These countries require a visa or special permit for Latin American citizens."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VISA_REQUIRED_COUNTRIES.map((country, idx) => (
              <Card key={idx} data-testid={`card-visa-required-${idx}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display font-bold text-lg">{country.name}</h3>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                      <FileText className="w-3 h-3 mr-1" />
                      {language === "es" ? "Visa Requerida" : "Visa Required"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-accent mt-0.5" />
                      <span>{country.process[lang]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <span>{language === "es" ? "Costo:" : "Cost:"} <strong>{country.cost}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>{language === "es" ? "Tiempo:" : "Time:"} <strong>{country.time[lang]}</strong></span>
                    </div>
                  </div>

                  {country.link && (
                    <a 
                      href={country.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center gap-2 text-sm text-accent hover:underline"
                    >
                      {language === "es" ? "Mas informacion" : "More information"}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-documents">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                <span className="text-accent">{language === "es" ? "Documentos Esenciales Para Viajar" : "Essential Travel Documents"}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <FileText className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-display font-bold">{language === "es" ? "Pasaporte" : "Passport"}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      {language === "es" ? "Vigencia minima de 6 meses despues del viaje" : "Minimum 6 months validity after trip"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      {language === "es" ? "Al menos 2 paginas en blanco" : "At least 2 blank pages"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      {language === "es" ? "En buen estado, sin daños" : "In good condition, undamaged"}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Shield className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-display font-bold">{language === "es" ? "Seguro de Viaje" : "Travel Insurance"}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      {language === "es" ? "Cobertura minima EUR 30,000 para Schengen" : "Minimum EUR 30,000 coverage for Schengen"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      {language === "es" ? "Incluir gastos medicos y repatriacion" : "Include medical expenses and repatriation"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      {language === "es" ? "Valido para todos los dias del viaje" : "Valid for all days of the trip"}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Plane className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-display font-bold">{language === "es" ? "Boletos de Avion" : "Flight Tickets"}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      {language === "es" ? "Vuelo de ida y vuelta confirmado" : "Confirmed round-trip flight"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      {language === "es" ? "Itinerario impreso o digital" : "Printed or digital itinerary"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      {language === "es" ? "Reserva a nombre del viajero" : "Reservation in traveler's name"}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <DollarSign className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-display font-bold">{language === "es" ? "Solvencia Economica" : "Financial Solvency"}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      {language === "es" ? "Extractos bancarios recientes" : "Recent bank statements"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      {language === "es" ? "Tarjetas de credito internacionales" : "International credit cards"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      {language === "es" ? "Aprox. EUR 100/dia de estancia" : "Approx. EUR 100/day of stay"}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-visa-help">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-3xl font-display font-bold text-accent mb-4">
            {language === "es" ? "Te Ayudamos Con Tu Documentacion" : "We Help You With Your Documentation"}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {language === "es" 
              ? "Nuestros asesores de viaje te guian en todo el proceso de documentacion, visas y permisos necesarios para tu viaje." 
              : "Our travel advisors guide you through the entire process of documentation, visas, and permits needed for your trip."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 gap-2" data-testid="button-visa-contact">
                <ArrowRight className="w-5 h-5" />
                {language === "es" ? "Solicitar Asesoria" : "Request Advice"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SupportFAQSection faqs={VISA_FAQS} />
      <SupportContactSection />
      <FloatingContactButtons />

      <Footer />
    </div>
  );
}
