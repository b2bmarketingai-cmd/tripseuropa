import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Plane, Globe, Clock, CheckCircle, Shield, Calendar, 
  DollarSign, Users, ArrowRight, MapPin, Luggage, Star
} from "lucide-react";
import { FloatingContactButtons, SupportFAQSection, SupportContactSection, type FAQItem } from "@/components/support";
import { openWhatsAppQuote } from "@/lib/whatsapp";

const FLIGHT_FAQS: FAQItem[] = [
  {
    question: { es: "Que aerolineas operan vuelos desde Latinoamerica a Europa?", en: "Which airlines operate flights from Latin America to Europe?", pt: "Quais companhias aereas operam voos da America Latina para a Europa?" },
    answer: { es: "Las principales aerolineas incluyen Iberia, Air Europa, Lufthansa, Air France, KLM, British Airways, TAP Portugal, y Avianca. Tambien hay opciones con conexiones como Turkish Airlines, Emirates y Qatar Airways.", en: "Major airlines include Iberia, Air Europa, Lufthansa, Air France, KLM, British Airways, TAP Portugal, and Avianca. There are also connection options like Turkish Airlines, Emirates, and Qatar Airways.", pt: "As principais companhias aereas incluem Iberia, Air Europa, Lufthansa, Air France, KLM, British Airways, TAP Portugal e Avianca. Tambem ha opcoes com conexoes como Turkish Airlines, Emirates e Qatar Airways." }
  },
  {
    question: { es: "Cual es la duracion promedio de un vuelo a Europa?", en: "What is the average flight duration to Europe?", pt: "Qual e a duracao media de um voo para a Europa?" },
    answer: { es: "Los vuelos directos desde ciudades como Bogota, Ciudad de Mexico o Sao Paulo a Madrid o Paris duran entre 9-11 horas. Con escalas, el tiempo puede ser de 14-20 horas dependiendo de la conexion.", en: "Direct flights from cities like Bogota, Mexico City, or Sao Paulo to Madrid or Paris take 9-11 hours. With layovers, travel time can be 14-20 hours depending on the connection.", pt: "Voos diretos de cidades como Bogota, Cidade do Mexico ou Sao Paulo para Madri ou Paris duram entre 9-11 horas. Com escalas, o tempo pode ser de 14-20 horas dependendo da conexao." }
  },
  {
    question: { es: "Cuando es mas barato volar a Europa?", en: "When is it cheapest to fly to Europe?", pt: "Quando e mais barato voar para a Europa?" },
    answer: { es: "Los meses mas economicos suelen ser enero-marzo y octubre-noviembre. Evita Semana Santa, verano europeo (junio-agosto) y Navidad. Reservar con 2-3 meses de anticipacion ofrece mejores precios.", en: "The cheapest months are usually January-March and October-November. Avoid Easter, European summer (June-August), and Christmas. Booking 2-3 months in advance offers better prices.", pt: "Os meses mais economicos costumam ser janeiro-marco e outubro-novembro. Evite a Semana Santa, verao europeu (junho-agosto) e Natal. Reservar com 2-3 meses de antecedencia oferece melhores precos." }
  },
  {
    question: { es: "Cuanto equipaje puedo llevar en vuelos a Europa?", en: "How much luggage can I take on flights to Europe?", pt: "Quanta bagagem posso levar em voos para a Europa?" },
    answer: { es: "Generalmente incluyen 1 maleta de mano (8-10kg) y 1 maleta documentada (23kg). Las tarifas premium pueden incluir 2 maletas. Siempre verifica con la aerolinea especifica.", en: "Generally includes 1 carry-on bag (8-10kg) and 1 checked bag (23kg). Premium fares may include 2 bags. Always verify with the specific airline.", pt: "Geralmente incluem 1 mala de mao (8-10kg) e 1 mala despachada (23kg). As tarifas premium podem incluir 2 malas. Sempre verifique com a companhia aerea especifica." }
  },
  {
    question: { es: "Puedo reservar solo el vuelo sin paquete completo?", en: "Can I book just the flight without a full package?", pt: "Posso reservar apenas o voo sem pacote completo?" },
    answer: { es: "Si, ofrecemos reservas de vuelos individuales. Sin embargo, nuestros paquetes que incluyen vuelo + hotel suelen ofrecer mejor valor y conveniencia.", en: "Yes, we offer individual flight bookings. However, our packages that include flight + hotel usually offer better value and convenience.", pt: "Sim, oferecemos reservas de voos individuais. No entanto, nossos pacotes que incluem voo + hotel geralmente oferecem melhor valor e conveniencia." }
  },
  {
    question: { es: "Que sucede si mi vuelo se cancela o retrasa?", en: "What happens if my flight is cancelled or delayed?", pt: "O que acontece se meu voo for cancelado ou atrasado?" },
    answer: { es: "Te asistimos con reprogramaciones y reclamaciones. Los vuelos en la UE tienen proteccion bajo el Reglamento EC 261/2004 que puede incluir compensaciones de hasta 600 EUR.", en: "We assist with rebookings and claims. EU flights are protected under EC Regulation 261/2004 which can include compensation of up to 600 EUR.", pt: "Ajudamos com remarcacoes e reclamacoes. Os voos na UE tem protecao sob o Regulamento EC 261/2004 que pode incluir compensacoes de ate 600 EUR." }
  }
];

const POPULAR_ROUTES = [
  { from: "Bogota", to: "Madrid", duration: "10h", price: "desde $850", direct: true },
  { from: "Ciudad de Mexico", to: "Paris", duration: "11h 30m", price: "desde $920", direct: true },
  { from: "Buenos Aires", to: "Roma", duration: "13h", price: "desde $1,100", direct: true },
  { from: "Lima", to: "Barcelona", duration: "12h", price: "desde $980", direct: false },
  { from: "Sao Paulo", to: "Lisboa", duration: "9h 30m", price: "desde $780", direct: true },
  { from: "Panama", to: "Amsterdam", duration: "11h", price: "desde $890", direct: false },
];

const AIRLINES = [
  { name: "Iberia", alliance: "Oneworld", hub: "Madrid" },
  { name: "Air Europa", alliance: "SkyTeam", hub: "Madrid" },
  { name: "Lufthansa", alliance: "Star Alliance", hub: "Frankfurt" },
  { name: "Air France", alliance: "SkyTeam", hub: "Paris" },
  { name: "KLM", alliance: "SkyTeam", hub: "Amsterdam" },
  { name: "British Airways", alliance: "Oneworld", hub: "Londres" },
];

export default function Flights() {
  const { language } = useI18n();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <section className="relative py-24 md:py-32 bg-primary overflow-hidden" data-testid="section-flights-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=60&w=1600&auto=format&fit=crop" 
            alt="Airplane wing view over clouds" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/95"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="w-6 h-6 text-accent" />
            <Badge className="bg-accent/20 text-accent border-accent/30" data-testid="badge-flights">
              {language === "es" ? "Vuelos Internacionales" : language === "pt" ? "Voos Internacionais" : "International Flights"}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6" data-testid="text-flights-title">
            <span className="text-accent">{language === "es" ? "Vuelos a Europa" : language === "pt" ? "Voos para Europa" : "Flights to Europe"}</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8" data-testid="text-flights-subtitle">
            {language === "es" 
              ? "Las mejores tarifas en vuelos desde Latinoamerica a todos los destinos europeos. Directos y con conexiones convenientes." 
              : language === "pt"
              ? "As melhores tarifas em voos da America Latina para todos os destinos europeus. Diretos e com conexoes convenientes."
              : "The best fares on flights from Latin America to all European destinations. Direct and with convenient connections."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "50+ destinos europeos" : language === "pt" ? "50+ destinos europeus" : "50+ European destinations"}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Mejores precios garantizados" : language === "pt" ? "Melhores precos garantidos" : "Best prices guaranteed"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>{language === "es" ? "Flexibilidad en cambios" : language === "pt" ? "Flexibilidade em mudancas" : "Flexible changes"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-flights-routes">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Rutas Populares" : language === "pt" ? "Rotas Populares" : "Popular Routes"}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" 
                ? "Las conexiones mas solicitadas por nuestros viajeros latinoamericanos." 
                : language === "pt"
                ? "As conexoes mais solicitadas pelos nossos viajantes latino-americanos."
                : "The most requested connections by our Latin American travelers."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_ROUTES.map((route, idx) => (
              <Card key={idx} data-testid={`card-route-${idx}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-bold">{route.from}</p>
                        <p className="text-xs text-muted-foreground">{language === "es" ? "Origen" : language === "pt" ? "Origem" : "Origin"}</p>
                      </div>
                    </div>
                    <Plane className="w-5 h-5 text-muted-foreground rotate-90" />
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold">{route.to}</p>
                        <p className="text-xs text-muted-foreground">{language === "es" ? "Destino" : language === "pt" ? "Destino" : "Destination"}</p>
                      </div>
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm border-t pt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{route.duration}</span>
                    </div>
                    {route.direct && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        {language === "es" ? "Directo" : language === "pt" ? "Direto" : "Direct"}
                      </Badge>
                    )}
                    <span className="font-bold text-accent">{route.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" data-testid="section-flights-benefits">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Por Que Reservar Con Nosotros" : language === "pt" ? "Por Que Reservar Conosco" : "Why Book With Us"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{language === "es" ? "Mejor Precio" : language === "pt" ? "Melhor Preco" : "Best Price"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" ? "Tarifas negociadas directamente con aerolineas." : language === "pt" ? "Tarifas negociadas diretamente com companhias aereas." : "Fares negotiated directly with airlines."}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{language === "es" ? "Flexibilidad" : language === "pt" ? "Flexibilidade" : "Flexibility"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" ? "Cambios y cancelaciones con condiciones flexibles." : language === "pt" ? "Alteracoes e cancelamentos com condicoes flexiveis." : "Changes and cancellations with flexible conditions."}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Luggage className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{language === "es" ? "Equipaje Incluido" : language === "pt" ? "Bagagem Incluida" : "Luggage Included"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" ? "Maleta documentada incluida en la mayoria de tarifas." : language === "pt" ? "Mala despachada incluida na maioria das tarifas." : "Checked bag included in most fares."}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{language === "es" ? "Soporte 24/7" : language === "pt" ? "Suporte 24/7" : "24/7 Support"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" ? "Asistencia en español durante todo tu viaje." : language === "pt" ? "Assistencia em portugues durante toda a sua viagem." : "Spanish-language assistance throughout your trip."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-flights-airlines">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="text-accent">{language === "es" ? "Aerolineas Asociadas" : language === "pt" ? "Companhias Aereas Parceiras" : "Partner Airlines"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {AIRLINES.map((airline, idx) => (
              <Card key={idx} className="text-center" data-testid={`card-airline-${idx}`}>
                <CardContent className="pt-4 pb-4">
                  <Star className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <h3 className="font-bold text-sm">{airline.name}</h3>
                  <p className="text-xs text-muted-foreground">{airline.alliance}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary" data-testid="section-flights-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-accent mb-4">
            {language === "es" ? "Encuentra Tu Vuelo Ideal" : language === "pt" ? "Encontre Seu Voo Ideal" : "Find Your Ideal Flight"}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {language === "es" 
              ? "Nuestros asesores te ayudan a encontrar las mejores opciones de vuelo para tu viaje." 
              : language === "pt"
              ? "Nossos consultores ajudam voce a encontrar as melhores opcoes de voo para sua viagem."
              : "Our advisors help you find the best flight options for your trip."}
          </p>
          <Button 
            size="lg" 
            className="bg-accent text-primary hover:bg-accent/90 gap-2" 
            data-testid="button-flights-contact"
            onClick={() => openWhatsAppQuote({ es: "vuelos a Europa", en: "flights to Europe", pt: "voos para Europa" }, language)}
          >
            <ArrowRight className="w-5 h-5" />
            {language === "es" ? "Cotizar Vuelo" : language === "pt" ? "Orcamento Voo" : "Quote Flight"}
          </Button>
        </div>
      </section>

      <SupportFAQSection faqs={FLIGHT_FAQS} />
      <SupportContactSection />
      <FloatingContactButtons />

      <Footer />
    </div>
  );
}
