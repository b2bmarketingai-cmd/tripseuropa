import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { SEOHead, generateCountryHreflangUrls } from "@/components/SEOHead";
import { OptimizedLeadForm } from "@/components/OptimizedLeadForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Shield, Clock, Users, Star, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface CountryConfig {
  code: string;
  name: string;
  language: string;
  currency: string;
  currencySymbol: string;
  capitalCity: string;
  priority: string;
}

const countryContent: Record<string, {
  heroTitle: string;
  heroSubtitle: string;
  features: string[];
  testimonial: { name: string; text: string; city: string };
  urgencyText: string;
  socialProof: string;
  packages: { name: string; price: number; days: number }[];
}> = {
  CO: {
    heroTitle: "Viaja a Europa desde Colombia",
    heroSubtitle: "Paquetes exclusivos con vuelos directos desde Bogotá. Financiación en pesos colombianos.",
    features: [
      "Vuelos directos BOG-MAD con Avianca e Iberia",
      "Precios en COP con financiación hasta 36 cuotas",
      "Asesoría ETIAS incluida sin costo",
      "Soporte 24/7 en horario colombiano",
    ],
    testimonial: {
      name: "María González",
      text: "Excelente servicio. Mi viaje a París fue inolvidable. Todo perfectamente organizado.",
      city: "Bogotá",
    },
    urgencyText: "Solo 2 cupos disponibles este mes",
    socialProof: "45 colombianos reservaron esta semana",
    packages: [
      { name: "París Romántico", price: 2850, days: 7 },
      { name: "España Completa", price: 3200, days: 10 },
      { name: "Italia Clásica", price: 3500, days: 12 },
    ],
  },
  MX: {
    heroTitle: "Viaja a Europa desde México",
    heroSubtitle: "Los mejores paquetes con vuelos desde CDMX. Paga en pesos mexicanos.",
    features: [
      "Vuelos directos MEX-MAD con Iberia y Aeroméxico",
      "Precios en MXN con meses sin intereses",
      "Asesoría de visa Schengen incluida",
      "Soporte en horario de Ciudad de México",
    ],
    testimonial: {
      name: "Carlos Hernández",
      text: "Increíble experiencia. El equipo me ayudó con todos los trámites de visa.",
      city: "Ciudad de México",
    },
    urgencyText: "Últimas 3 ofertas para mexicanos",
    socialProof: "67 mexicanos viajaron el mes pasado",
    packages: [
      { name: "Madrid y Barcelona", price: 2650, days: 8 },
      { name: "Europa Express", price: 3100, days: 10 },
      { name: "Mediterráneo", price: 3800, days: 14 },
    ],
  },
  BR: {
    heroTitle: "Viaje para a Europa do Brasil",
    heroSubtitle: "Pacotes exclusivos com voos diretos de São Paulo. Pagamento em reais.",
    features: [
      "Voos diretos GRU-LIS e GRU-MAD",
      "Preços em R$ com parcelamento",
      "Assessoria de visto incluída",
      "Suporte 24/7 em português",
    ],
    testimonial: {
      name: "Ana Silva",
      text: "Experiência maravilhosa. A equipe cuidou de todos os detalhes.",
      city: "São Paulo",
    },
    urgencyText: "Apenas 2 vagas restantes",
    socialProof: "89 brasileiros viajaram este mês",
    packages: [
      { name: "Paris Romântica", price: 2900, days: 7 },
      { name: "Portugal Completo", price: 2500, days: 8 },
      { name: "Europa dos Sonhos", price: 4200, days: 15 },
    ],
  },
  AR: {
    heroTitle: "Viajá a Europa desde Argentina",
    heroSubtitle: "Paquetes con vuelos desde Buenos Aires. Precios en dólares con cuotas.",
    features: [
      "Vuelos desde Ezeiza a las principales ciudades",
      "Precios en USD con opciones de pago",
      "Asesoría completa de documentación",
      "Soporte en horario argentino",
    ],
    testimonial: {
      name: "Martín López",
      text: "Impecable. El viaje superó todas mis expectativas.",
      city: "Buenos Aires",
    },
    urgencyText: "Últimos 2 cupos desde Argentina",
    socialProof: "32 argentinos reservaron ayer",
    packages: [
      { name: "España Clásica", price: 2700, days: 8 },
      { name: "Italia Romántica", price: 3000, days: 10 },
      { name: "Europa Imperial", price: 3800, days: 12 },
    ],
  },
  PE: {
    heroTitle: "Viaja a Europa desde Perú",
    heroSubtitle: "Paquetes exclusivos con conexiones desde Lima.",
    features: [
      "Conexiones óptimas desde Jorge Chávez",
      "Precios competitivos en USD",
      "Asesoría de visa incluida",
      "Soporte 24/7 en español",
    ],
    testimonial: {
      name: "Rosa Castillo",
      text: "Servicio de primera. Todo salió perfecto.",
      city: "Lima",
    },
    urgencyText: "Solo 3 paquetes disponibles",
    socialProof: "28 peruanos viajaron a Europa",
    packages: [
      { name: "París Express", price: 2600, days: 6 },
      { name: "España y Portugal", price: 3100, days: 10 },
      { name: "Gran Tour Europa", price: 4000, days: 14 },
    ],
  },
  PA: {
    heroTitle: "Viaja a Europa desde Panamá",
    heroSubtitle: "Aprovecha el Hub de las Américas para llegar a Europa.",
    features: [
      "Conexiones excelentes desde Tocumen",
      "Precios en USD",
      "Sin necesidad de visa para panameños",
      "Soporte personalizado",
    ],
    testimonial: {
      name: "Luis Rodríguez",
      text: "Excelente atención. Volveré a viajar con ellos.",
      city: "Ciudad de Panamá",
    },
    urgencyText: "Últimas ofertas para Panamá",
    socialProof: "15 panameños reservaron",
    packages: [
      { name: "Madrid Directo", price: 2400, days: 7 },
      { name: "Europa Esencial", price: 2900, days: 9 },
      { name: "Grandes Capitales", price: 3600, days: 12 },
    ],
  },
  CR: {
    heroTitle: "Viaja a Europa desde Costa Rica",
    heroSubtitle: "Paquetes desde San José a las mejores ciudades europeas.",
    features: [
      "Vuelos con conexión desde Juan Santamaría",
      "Precios en USD",
      "Sin visa para ticos",
      "Atención personalizada",
    ],
    testimonial: {
      name: "Patricia Vargas",
      text: "Pura vida! El viaje fue espectacular.",
      city: "San José",
    },
    urgencyText: "Solo 2 cupos desde Costa Rica",
    socialProof: "12 costarricenses viajaron",
    packages: [
      { name: "España Sol", price: 2500, days: 7 },
      { name: "Italia Bella", price: 2800, days: 9 },
      { name: "Europa Completa", price: 3500, days: 12 },
    ],
  },
  DO: {
    heroTitle: "Viaja a Europa desde República Dominicana",
    heroSubtitle: "Paquetes con vuelos desde Santo Domingo y Punta Cana.",
    features: [
      "Vuelos desde SDQ y PUJ",
      "Precios en USD con facilidades de pago",
      "Asesoría de documentos",
      "Soporte bilingüe",
    ],
    testimonial: {
      name: "Carmen Santos",
      text: "Increíble experiencia. Todo perfecto de principio a fin.",
      city: "Santo Domingo",
    },
    urgencyText: "Últimas 3 ofertas desde RD",
    socialProof: "18 dominicanos reservaron",
    packages: [
      { name: "Madrid Cultural", price: 2450, days: 7 },
      { name: "Roma Eterna", price: 2700, days: 8 },
      { name: "Tour Mediterráneo", price: 3400, days: 11 },
    ],
  },
  CB: {
    heroTitle: "Viaja a Europa desde el Caribe",
    heroSubtitle: "Paquetes especiales para viajeros caribeños.",
    features: [
      "Conexiones desde principales islas",
      "Precios competitivos en USD",
      "Flexibilidad en fechas",
      "Asistencia 24/7",
    ],
    testimonial: {
      name: "José Martínez",
      text: "Excelente servicio para toda la región.",
      city: "Caribe",
    },
    urgencyText: "Ofertas limitadas para el Caribe",
    socialProof: "25 viajeros del Caribe reservaron",
    packages: [
      { name: "Europa Esencial", price: 2600, days: 8 },
      { name: "Grandes Ciudades", price: 3000, days: 10 },
      { name: "Tour Premium", price: 3800, days: 14 },
    ],
  },
};

export default function CountryLanding() {
  const params = useParams();
  const countryCode = (params.country || "CO").toUpperCase();
  const { t, language } = useI18n();

  const { data: countryConfig } = useQuery<CountryConfig>({
    queryKey: ["/api/seo/countries", countryCode],
    enabled: !!countryCode,
  });

  const content = countryContent[countryCode] || countryContent.CO;
  const config = countryConfig || {
    code: countryCode,
    name: countryCode === "BR" ? "Brasil" : "Colombia",
    currency: countryCode === "BR" ? "BRL" : "USD",
    currencySymbol: countryCode === "BR" ? "R$" : "$",
    capitalCity: countryCode === "BR" ? "São Paulo" : "Bogotá",
  };

  const hreflangUrls = generateCountryHreflangUrls(`/desde/${countryCode.toLowerCase()}`, language);

  return (
    <>
      <SEOHead
        title={`${content.heroTitle} | Trips Europa`}
        description={content.heroSubtitle}
        keywords={`viajes europa ${config.name}, paquetes europa ${config.name}, vuelos europa ${config.capitalCity}`}
        url={`https://tripseuropa.co/desde/${countryCode.toLowerCase()}`}
        alternateUrls={hreflangUrls}
      />

      <div className="min-h-screen">
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4" data-testid="badge-country">
                  <MapPin className="w-3 h-3 mr-1" />
                  Desde {config.name}
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-hero-title">
                  {content.heroTitle}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
                  {content.heroSubtitle}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <Badge variant="secondary">
                    <Clock className="w-3 h-3 mr-1" />
                    {content.urgencyText}
                  </Badge>
                  <Badge variant="outline">
                    <Users className="w-3 h-3 mr-1" />
                    {content.socialProof}
                  </Badge>
                </div>

                <ul className="space-y-3 mb-8">
                  {content.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <OptimizedLeadForm 
                  countryCode={countryCode}
                  variant="urgent"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Paquetes Populares desde {config.name}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {content.packages.map((pkg, idx) => (
                <Card key={idx} className="hover-elevate">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      {idx === 0 && (
                        <Badge variant="default">Popular</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-bold">
                        {config.currencySymbol}{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">USD</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1">
                        <Plane className="w-4 h-4" />
                        Vuelos incluidos
                      </span>
                      <span className="flex items-center gap-1">
                        <Hotel className="w-4 h-4" />
                        {pkg.days} noches
                      </span>
                    </div>
                    
                    <Button className="w-full" data-testid={`button-package-${idx}`}>
                      Cotizar ahora
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg mb-4 italic">
                      "{content.testimonial.text}"
                    </p>
                    <p className="font-semibold">{content.testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {content.testimonial.city}, {config.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para tu viaje a Europa?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contacta con nuestros asesores especializados en viajes desde {config.name}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" data-testid="button-contact-whatsapp">
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground" data-testid="button-contact-call">
                Llamar ahora
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
