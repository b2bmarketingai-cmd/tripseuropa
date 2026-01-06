import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, User, Phone, HelpCircle, ChevronDown, 
  MessageCircle, MessageSquare, Search, MapPin, Calendar
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import logoUrl from "@assets/logo-optimized.png";
import { SiWhatsapp } from "react-icons/si";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DESTINATIONS_MENU = {
  es: [
    { name: "Europa", href: "/destinations", items: [
      "Albania", "Alemania", "Austria", "Belgica", "Chipre", "Croacia", "Dinamarca", 
      "Escocia", "España", "Estados Balticos", "Finlandia", "Francia", "Grecia", 
      "Hungria", "Irlanda", "Islandia", "Italia", "Noruega", "Paises Bajos", 
      "Polonia", "Portugal", "Reino Unido", "Republica Checa", "Rumania", "Suecia", "Suiza"
    ] },
  ],
  en: [
    { name: "Europe", href: "/destinations", items: [
      "Albania", "Austria", "Baltic States", "Belgium", "Croatia", "Cyprus", "Czech Republic",
      "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland",
      "Italy", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Scotland", 
      "Spain", "Sweden", "Switzerland", "United Kingdom"
    ] },
  ],
  pt: [
    { name: "Europa", href: "/destinations", items: [
      "Albânia", "Alemanha", "Áustria", "Bélgica", "Chipre", "Croácia", "Dinamarca", 
      "Escócia", "Espanha", "Estados Bálticos", "Finlândia", "França", "Grécia", 
      "Hungria", "Irlanda", "Islândia", "Itália", "Noruega", "Países Baixos", 
      "Polônia", "Portugal", "Reino Unido", "República Tcheca", "Romênia", "Suécia", "Suíça"
    ] },
  ]
};

const TRAVEL_STYLE_CATEGORIES = {
  es: {
    bySeason: {
      title: "Por Temporada",
      items: [
        { name: "Otono", href: "/travel-style/fall" },
        { name: "Verano", href: "/travel-style/summer" },
        { name: "Primavera", href: "/travel-style/spring" },
        { name: "Semana Santa", href: "/travel-style/easter" },
        { name: "Invierno", href: "/travel-style/winter" },
        { name: "Navidad", href: "/travel-style/christmas" }
      ]
    },
    byInterest: {
      title: "Por Interes",
      items: [
        { name: "Multi-Pais", href: "/travel-style/multi-country" },
        { name: "Playa", href: "/travel-style/beach" },
        { name: "Aventura", href: "/travel-style/adventure" },
        { name: "Safari", href: "/travel-style/safari" },
        { name: "Cruceros", href: "/travel-style/cruises" },
        { name: "Luna de Miel", href: "/travel-style/honeymoon" },
        { name: "Naturaleza", href: "/travel-style/nature" },
        { name: "Cultural", href: "/travel-style/culture" },
        { name: "Lujo", href: "/travel-style/luxury" }
      ]
    },
    byGroup: {
      title: "Por Grupo",
      items: [
        { name: "Viajeros Solos", href: "/travel-style/solo" },
        { name: "Familia", href: "/travel-style/family" },
        { name: "Parejas", href: "/travel-style/couples" },
        { name: "Seniors", href: "/travel-style/senior" },
        { name: "Amigos y Tours Privados", href: "/travel-style/friends-private" }
      ]
    }
  },
  en: {
    bySeason: {
      title: "By Season",
      items: [
        { name: "Fall", href: "/travel-style/fall" },
        { name: "Summer", href: "/travel-style/summer" },
        { name: "Spring", href: "/travel-style/spring" },
        { name: "Easter", href: "/travel-style/easter" },
        { name: "Winter", href: "/travel-style/winter" },
        { name: "Christmas", href: "/travel-style/christmas" }
      ]
    },
    byInterest: {
      title: "By Interest",
      items: [
        { name: "Multi-Country", href: "/travel-style/multi-country" },
        { name: "Beach", href: "/travel-style/beach" },
        { name: "Adventure", href: "/travel-style/adventure" },
        { name: "Safari", href: "/travel-style/safari" },
        { name: "Cruise & Tour", href: "/travel-style/cruises" },
        { name: "Honeymoon", href: "/travel-style/honeymoon" },
        { name: "Nature", href: "/travel-style/nature" },
        { name: "Culture", href: "/travel-style/culture" },
        { name: "Luxury", href: "/travel-style/luxury" }
      ]
    },
    byGroup: {
      title: "By Group",
      items: [
        { name: "Solo Travellers", href: "/travel-style/solo" },
        { name: "Family", href: "/travel-style/family" },
        { name: "Couples", href: "/travel-style/couples" },
        { name: "Senior", href: "/travel-style/senior" },
        { name: "Friends & Private Tours", href: "/travel-style/friends-private" }
      ]
    }
  },
  pt: {
    bySeason: {
      title: "Por Temporada",
      items: [
        { name: "Outono", href: "/travel-style/fall" },
        { name: "Verão", href: "/travel-style/summer" },
        { name: "Primavera", href: "/travel-style/spring" },
        { name: "Páscoa", href: "/travel-style/easter" },
        { name: "Inverno", href: "/travel-style/winter" },
        { name: "Natal", href: "/travel-style/christmas" }
      ]
    },
    byInterest: {
      title: "Por Interesse",
      items: [
        { name: "Multi-País", href: "/travel-style/multi-country" },
        { name: "Praia", href: "/travel-style/beach" },
        { name: "Aventura", href: "/travel-style/adventure" },
        { name: "Safari", href: "/travel-style/safari" },
        { name: "Cruzeiros", href: "/travel-style/cruises" },
        { name: "Lua de Mel", href: "/travel-style/honeymoon" },
        { name: "Natureza", href: "/travel-style/nature" },
        { name: "Cultural", href: "/travel-style/culture" },
        { name: "Luxo", href: "/travel-style/luxury" }
      ]
    },
    byGroup: {
      title: "Por Grupo",
      items: [
        { name: "Viajantes Solo", href: "/travel-style/solo" },
        { name: "Família", href: "/travel-style/family" },
        { name: "Casais", href: "/travel-style/couples" },
        { name: "Seniors", href: "/travel-style/senior" },
        { name: "Amigos e Tours Privados", href: "/travel-style/friends-private" }
      ]
    }
  }
};

const TRAVEL_STYLE_MENU = {
  es: [
    { name: "Por Temporada", href: "/packages?filter=temporada" },
    { name: "Por Interes", href: "/packages?filter=interes" },
    { name: "Por Grupo", href: "/packages?filter=grupo" },
  ],
  en: [
    { name: "By Season", href: "/packages?filter=season" },
    { name: "By Interest", href: "/packages?filter=interest" },
    { name: "By Group", href: "/packages?filter=group" },
  ],
  pt: [
    { name: "Por Temporada", href: "/packages?filter=temporada" },
    { name: "Por Interesse", href: "/packages?filter=interesse" },
    { name: "Por Grupo", href: "/packages?filter=grupo" },
  ]
};

const OFFERS_MENU = {
  es: [
    { name: "Ofertas de Ultima Hora", href: "/ofertas-ultima-hora" },
    { name: "Ofertas de Invierno", href: "/packages?offer=invierno" },
    { name: "Paquetes Destacados", href: "/packages?offer=destacados" },
    { name: "Programa TripsEuropa GO", href: "/rewards" },
  ],
  en: [
    { name: "Last Minute Deals", href: "/last-minute-offers" },
    { name: "Winter Deals", href: "/packages?offer=winter" },
    { name: "Featured Packages", href: "/packages?offer=featured" },
    { name: "TripsEuropa GO Program", href: "/rewards" },
  ],
  pt: [
    { name: "Ofertas de Ultima Hora", href: "/ofertas-ultima-hora" },
    { name: "Ofertas de Inverno", href: "/packages?offer=inverno" },
    { name: "Pacotes em Destaque", href: "/packages?offer=destaque" },
    { name: "Programa TripsEuropa GO", href: "/rewards" },
  ]
};

const COUNTRY_FLAGS: Record<string, { flag: string; name: string; code: string }> = {
  es: { flag: "🇪🇸", name: "España", code: "ES" },
  en: { flag: "🇬🇧", name: "English", code: "EN" },
  pt: { flag: "🇧🇷", name: "Brasil", code: "PT" },
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { language, setLanguage, t } = useI18n();
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLang = language as "es" | "en" | "pt";

  const labels = {
    destinos: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    estiloViaje: { es: "Estilo de viaje", en: "Travel Style", pt: "Estilo de viagem" },
    ofertas: { es: "Ofertas", en: "Deals", pt: "Ofertas" },
    reservar: { es: "Reservar:", en: "Book:", pt: "Reservar:" },
    ayuda: { es: "Ayuda", en: "Help", pt: "Ajuda" },
    asistenciaChat: { es: "Asistencia por chat", en: "Chat Support", pt: "Suporte por chat" },
    centroAyuda: { es: "Centro de Ayuda y FAQs", en: "Help Center & FAQs", pt: "Central de Ajuda e FAQs" },
    centroAyudaMobile: { es: "Centro de Ayuda", en: "Help Center", pt: "Central de Ajuda" },
    miCuenta: { es: "Mi cuenta", en: "My Account", pt: "Minha conta" },
    iniciarSesion: { es: "Inicia sesión o crea una cuenta", en: "Login or create an account", pt: "Entre ou crie uma conta" },
    viajero: { es: "Viajero", en: "Traveler", pt: "Viajante" },
    agenteViajes: { es: "Agente de viajes", en: "Travel Agent", pt: "Agente de viagens" },
    contrasena: { es: "Contraseña", en: "Password", pt: "Senha" },
    entrar: { es: "Iniciar sesión", en: "Login", pt: "Entrar" },
    olvidaste: { es: "¿Olvidaste tu contraseña?", en: "Forgot password?", pt: "Esqueceu a senha?" },
    noTienesCuenta: { es: "¿No tienes cuenta?", en: "Don't have an account?", pt: "Não tem conta?" },
    crearCuenta: { es: "Crear una cuenta", en: "Create account", pt: "Criar conta" },
    eresAgente: { es: "¿Eres agente de viajes?", en: "Are you a travel agent?", pt: "É agente de viagens?" },
    registrarse: { es: "Registrarse", en: "Register", pt: "Registrar-se" },
    tripBySeason: { es: "Viaje Por Temporada", en: "Trip By Season", pt: "Viagem por Temporada" },
    tripByInterest: { es: "Viaje Por Interés", en: "Trip By Interest", pt: "Viagem por Interesse" },
    tripByGroup: { es: "Viaje Por Grupo", en: "Trip By Group", pt: "Viagem por Grupo" },
    agenteDesc: { es: "Ofrece a tus clientes paquetes de viaje inolvidables a precios competitivos.", en: "Offer your clients unforgettable travel packages at competitive prices.", pt: "Ofereça aos seus clientes pacotes de viagem inesquecíveis a preços competitivos." },
  };

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 w-full z-50 transition-all duration-300",
          scrolled || isOpen 
            ? "bg-white shadow-lg border-b border-gray-100" 
            : "bg-white/95 backdrop-blur-sm"
        )}
        data-testid="header-main"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[80px] md:h-[100px]">
            
            <div className="hidden lg:flex items-center gap-6">
              <DropdownMenu open={activeDropdown === "destinos"} onOpenChange={(open) => setActiveDropdown(open ? "destinos" : null)}>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="text-sm font-medium text-gray-700 hover:text-primary flex items-center gap-1 transition-colors"
                    data-testid="button-menu-destinos"
                  >
                    {labels.destinos[currentLang]}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 bg-white p-2 max-h-96 overflow-y-auto">
                  {DESTINATIONS_MENU[currentLang][0].items.map((item, idx) => {
                    const slugMap: Record<string, string> = {
                      "Albania": "albania", "Alemania": "germany", "Austria": "austria", "Belgica": "belgium",
                      "Chipre": "cyprus", "Croacia": "croatia", "Dinamarca": "denmark", "Escocia": "scotland",
                      "España": "spain", "Estados Balticos": "baltic-states", "Finlandia": "finland",
                      "Francia": "france", "Grecia": "greece", "Hungria": "hungary", "Irlanda": "ireland",
                      "Islandia": "iceland", "Italia": "italy", "Noruega": "norway", "Paises Bajos": "netherlands",
                      "Polonia": "poland", "Portugal": "portugal", "Reino Unido": "united-kingdom",
                      "Republica Checa": "czech-republic", "Rumania": "romania", "Suecia": "sweden", "Suiza": "switzerland",
                      "Baltic States": "baltic-states", "Belgium": "belgium", "Croatia": "croatia", "Cyprus": "cyprus",
                      "Czech Republic": "czech-republic", "Denmark": "denmark", "Finland": "finland", "France": "france",
                      "Germany": "germany", "Greece": "greece", "Hungary": "hungary", "Iceland": "iceland", "Ireland": "ireland",
                      "Italy": "italy", "Netherlands": "netherlands", "Norway": "norway", "Poland": "poland",
                      "Romania": "romania", "Scotland": "scotland", "Spain": "spain",
                      "Sweden": "sweden", "Switzerland": "switzerland", "United Kingdom": "united-kingdom",
                      "Alemanha": "germany", "Espanha": "spain", "França": "france", "Países Baixos": "netherlands",
                      "República Tcheca": "czech-republic", "Romênia": "romania", "Suíça": "switzerland",
                      "Albânia": "albania", "Áustria": "austria", "Bélgica": "belgium", "Croácia": "croatia",
                      "Escócia": "scotland", "Estados Bálticos": "baltic-states", "Finlândia": "finland",
                      "Grécia": "greece", "Islândia": "iceland", "Itália": "italy", "Polônia": "poland", "Suécia": "sweden"
                    };
                    return (
                      <DropdownMenuItem key={idx} asChild className="cursor-pointer">
                        <Link href={`/destinations/${slugMap[item] || item.toLowerCase().replace(/\s+/g, '-')}`} className="w-full">
                          {item}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu open={activeDropdown === "estilo"} onOpenChange={(open) => setActiveDropdown(open ? "estilo" : null)}>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="text-sm font-medium text-gray-700 hover:text-primary flex items-center gap-1 transition-colors"
                    data-testid="button-menu-estilo"
                  >
                    {labels.estiloViaje[currentLang]}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[600px] bg-white p-4" sideOffset={8}>
                  <Tabs defaultValue="season" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4 bg-muted">
                      <TabsTrigger value="season" className="text-xs data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md">
                        {TRAVEL_STYLE_CATEGORIES[currentLang].bySeason.title}
                      </TabsTrigger>
                      <TabsTrigger value="interest" className="text-xs data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md">
                        {TRAVEL_STYLE_CATEGORIES[currentLang].byInterest.title}
                      </TabsTrigger>
                      <TabsTrigger value="group" className="text-xs data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md">
                        {TRAVEL_STYLE_CATEGORIES[currentLang].byGroup.title}
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="season" className="mt-0">
                      <p className="text-sm font-medium text-muted-foreground mb-3">{labels.tripBySeason[currentLang]}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {TRAVEL_STYLE_CATEGORIES[currentLang].bySeason.items.map((item, idx) => (
                          <Link key={idx} href={item.href} className="text-sm text-foreground hover:text-accent py-1.5 transition-colors" onClick={() => setActiveDropdown(null)}>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="interest" className="mt-0">
                      <p className="text-sm font-medium text-muted-foreground mb-3">{labels.tripByInterest[currentLang]}</p>
                      <div className="grid grid-cols-3 gap-2">
                        {TRAVEL_STYLE_CATEGORIES[currentLang].byInterest.items.map((item, idx) => (
                          <Link key={idx} href={item.href} className="text-sm text-foreground hover:text-accent py-1.5 transition-colors" onClick={() => setActiveDropdown(null)}>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="group" className="mt-0">
                      <p className="text-sm font-medium text-muted-foreground mb-3">{labels.tripByGroup[currentLang]}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {TRAVEL_STYLE_CATEGORIES[currentLang].byGroup.items.map((item, idx) => (
                          <Link key={idx} href={item.href} className="text-sm text-foreground hover:text-accent py-1.5 transition-colors" onClick={() => setActiveDropdown(null)}>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu open={activeDropdown === "ofertas"} onOpenChange={(open) => setActiveDropdown(open ? "ofertas" : null)}>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="text-sm font-medium text-gray-700 hover:text-primary flex items-center gap-1 transition-colors"
                    data-testid="button-menu-ofertas"
                  >
                    {labels.ofertas[currentLang]}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 bg-white p-2">
                  {OFFERS_MENU[currentLang].map((item, idx) => (
                    <DropdownMenuItem key={idx} asChild className="cursor-pointer">
                      <Link href={item.href} className="w-full">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Link href="/" className="flex items-center justify-center absolute left-1/2 -translate-x-1/2" data-testid="link-home-logo">
              <img 
                src={logoUrl} 
                alt="Trips Europa" 
                className="w-auto object-contain max-w-[280px] md:max-w-[360px] lg:max-w-[420px]"
                style={{ height: 'clamp(60px, 6vw + 48px, 90px)' }}
                loading="eager"
                width="420"
                height="90"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-4">
              <a 
                href="tel:+34611105448" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary text-sm transition-colors"
                data-testid="link-phone-reservar"
              >
                <span className="text-gray-500">{labels.reservar[currentLang]}</span>
                <span className="font-semibold text-primary">+34 611 105 448</span>
              </a>

              <div className="w-px h-6 bg-gray-200" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="text-sm font-medium text-gray-700 hover:text-primary flex items-center gap-1 transition-colors"
                    data-testid="button-menu-ayuda"
                  >
                    {labels.ayuda[currentLang]}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-white p-2">
                  <DropdownMenuItem asChild className="cursor-pointer gap-3">
                    <Link href="/travel-assistant" className="flex items-center gap-3 w-full">
                      <MessageCircle className="w-5 h-5" />
                      <span>{labels.asistenciaChat[currentLang]}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer gap-3">
                    <Link href="/contact" className="flex items-center gap-3 w-full">
                      <HelpCircle className="w-5 h-5" />
                      <span>{labels.centroAyuda[currentLang]}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer gap-3">
                    <a href="https://api.whatsapp.com/send?phone=34611105448" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full">
                      <SiWhatsapp className="w-5 h-5 text-green-600" />
                      <span>WhatsApp</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer gap-3">
                    <a href="https://m.me/tripseuropa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <span>Facebook Messenger</span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    data-testid="button-language-selector"
                  >
                    <span className="w-6 h-4 rounded-sm overflow-hidden flex items-center justify-center text-lg">
                      {COUNTRY_FLAGS[language]?.flag || COUNTRY_FLAGS.es.flag}
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem 
                    onClick={() => setLanguage("es")} 
                    className={cn("cursor-pointer gap-2", language === "es" && "bg-accent/10")}
                    data-testid="button-lang-es"
                  >
                    <span className="text-lg">🇪🇸</span>
                    <span>Español</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setLanguage("en")} 
                    className={cn("cursor-pointer gap-2", language === "en" && "bg-accent/10")}
                    data-testid="button-lang-en"
                  >
                    <span className="text-lg">🇬🇧</span>
                    <span>English</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setLanguage("pt")} 
                    className={cn("cursor-pointer gap-2", language === "pt" && "bg-accent/10")}
                    data-testid="button-lang-pt"
                  >
                    <span className="text-lg">🇧🇷</span>
                    <span>Portugues</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button 
                onClick={() => setAccountModalOpen(true)}
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                data-testid="button-account-open"
                aria-label="Abrir cuenta de usuario"
              >
                <User className="w-5 h-5 text-primary" />
              </button>
            </div>

            <div className="flex lg:hidden items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    aria-label="Cambiar idioma"
                  >
                    <span className="text-lg">{COUNTRY_FLAGS[language]?.flag}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem onClick={() => setLanguage("es")} className="cursor-pointer gap-2">
                    <span className="text-lg">🇪🇸</span>
                    <span>ES</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer gap-2">
                    <span className="text-lg">🇬🇧</span>
                    <span>EN</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("pt")} className="cursor-pointer gap-2">
                    <span className="text-lg">🇧🇷</span>
                    <span>PT</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button 
                onClick={() => setAccountModalOpen(true)}
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                aria-label="Abrir cuenta de usuario"
              >
                <User className="w-4 h-4 text-primary" />
              </button>

              <button 
                className="text-gray-700 p-1"
                onClick={() => setIsOpen(!isOpen)}
                data-testid="button-mobile-menu"
                aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-2 duration-200 shadow-lg">
            <div className="container px-4 py-6 space-y-4">
              <a 
                href="tel:+34611105448" 
                className="flex items-center gap-2 text-gray-700 py-2"
              >
                <Phone className="w-5 h-5 text-accent" />
                <span>{labels.reservar[currentLang]} +34 611 105 448</span>
              </a>

              <div className="h-px bg-gray-100" />

              <details className="group">
                <summary className="flex items-center justify-between py-2 text-gray-800 cursor-pointer list-none">
                  <span className="font-medium">{labels.destinos[currentLang]}</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pl-4 py-2 space-y-2 max-h-64 overflow-y-auto">
                  {DESTINATIONS_MENU[currentLang][0].items.map((item, idx) => {
                    const slugMap: Record<string, string> = {
                      "Albania": "albania", "Alemania": "germany", "Austria": "austria", "Belgica": "belgium",
                      "Chipre": "cyprus", "Croacia": "croatia", "Dinamarca": "denmark", "Escocia": "scotland",
                      "España": "spain", "Estados Balticos": "baltic-states", "Finlandia": "finland",
                      "Francia": "france", "Grecia": "greece", "Hungria": "hungary", "Irlanda": "ireland",
                      "Islandia": "iceland", "Italia": "italy", "Noruega": "norway", "Paises Bajos": "netherlands",
                      "Polonia": "poland", "Portugal": "portugal", "Reino Unido": "united-kingdom",
                      "Republica Checa": "czech-republic", "Rumania": "romania", "Suecia": "sweden", "Suiza": "switzerland",
                      "Baltic States": "baltic-states", "Belgium": "belgium", "Croatia": "croatia", "Cyprus": "cyprus",
                      "Czech Republic": "czech-republic", "Denmark": "denmark", "Finland": "finland", "France": "france",
                      "Germany": "germany", "Greece": "greece", "Hungary": "hungary", "Iceland": "iceland", "Ireland": "ireland",
                      "Italy": "italy", "Netherlands": "netherlands", "Norway": "norway", "Poland": "poland",
                      "Romania": "romania", "Scotland": "scotland", "Spain": "spain",
                      "Sweden": "sweden", "Switzerland": "switzerland", "United Kingdom": "united-kingdom",
                      "Alemanha": "germany", "Espanha": "spain", "França": "france", "Países Baixos": "netherlands",
                      "República Tcheca": "czech-republic", "Romênia": "romania", "Suíça": "switzerland",
                      "Albânia": "albania", "Áustria": "austria", "Bélgica": "belgium", "Croácia": "croatia",
                      "Escócia": "scotland", "Estados Bálticos": "baltic-states", "Finlândia": "finland",
                      "Grécia": "greece", "Islândia": "iceland", "Itália": "italy", "Polônia": "poland", "Suécia": "sweden"
                    };
                    return (
                      <Link 
                        key={idx}
                        href={`/destinations/${slugMap[item] || item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block py-1 text-gray-600 hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between py-2 text-gray-800 cursor-pointer list-none">
                  <span className="font-medium">{labels.estiloViaje[currentLang]}</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pl-4 py-2 space-y-4">
                  <div>
                    <p className="font-medium text-gray-800 text-sm mb-2">{TRAVEL_STYLE_CATEGORIES[currentLang].bySeason.title}</p>
                    <div className="space-y-1">
                      {TRAVEL_STYLE_CATEGORIES[currentLang].bySeason.items.map((item, idx) => (
                        <Link key={idx} href={item.href} className="block py-1 text-gray-600 hover:text-primary text-sm" onClick={() => setIsOpen(false)}>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm mb-2">{TRAVEL_STYLE_CATEGORIES[currentLang].byInterest.title}</p>
                    <div className="space-y-1">
                      {TRAVEL_STYLE_CATEGORIES[currentLang].byInterest.items.map((item, idx) => (
                        <Link key={idx} href={item.href} className="block py-1 text-gray-600 hover:text-primary text-sm" onClick={() => setIsOpen(false)}>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm mb-2">{TRAVEL_STYLE_CATEGORIES[currentLang].byGroup.title}</p>
                    <div className="space-y-1">
                      {TRAVEL_STYLE_CATEGORIES[currentLang].byGroup.items.map((item, idx) => (
                        <Link key={idx} href={item.href} className="block py-1 text-gray-600 hover:text-primary text-sm" onClick={() => setIsOpen(false)}>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between py-2 text-gray-800 cursor-pointer list-none">
                  <span className="font-medium">{labels.ofertas[currentLang]}</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pl-4 py-2 space-y-2">
                  {OFFERS_MENU[currentLang].map((item, idx) => (
                    <Link 
                      key={idx}
                      href={item.href}
                      className="block py-1 text-gray-600 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </details>

              <div className="h-px bg-gray-100" />

              <details className="group">
                <summary className="flex items-center justify-between py-2 text-gray-800 cursor-pointer list-none">
                  <span className="font-medium flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    {labels.ayuda[currentLang]}
                  </span>
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pl-4 py-2 space-y-2">
                  <Link href="/travel-assistant" className="flex items-center gap-2 py-1 text-gray-600 hover:text-primary w-full text-left" onClick={() => setIsOpen(false)}>
                    <MessageCircle className="w-4 h-4" />
                    {labels.asistenciaChat[currentLang]}
                  </Link>
                  <Link href="/contact" className="flex items-center gap-2 py-1 text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>
                    <HelpCircle className="w-4 h-4" />
                    {labels.centroAyudaMobile[currentLang]}
                  </Link>
                  <a href="https://api.whatsapp.com/send?phone=34611105448" className="flex items-center gap-2 py-1 text-gray-600 hover:text-primary">
                    <SiWhatsapp className="w-4 h-4 text-green-500" />
                    WhatsApp
                  </a>
                </div>
              </details>
            </div>
          </div>
        )}
      </header>
      <Dialog open={accountModalOpen} onOpenChange={setAccountModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-display">
              {labels.miCuenta[currentLang]}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {labels.iniciarSesion[currentLang]}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="viajero" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted p-1">
              <TabsTrigger value="viajero" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                {labels.viajero[currentLang]}
              </TabsTrigger>
              <TabsTrigger value="agente" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                {labels.agenteViajes[currentLang]}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="viajero" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email-viajero">Email</Label>
                <Input id="email-viajero" type="email" placeholder="tu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-viajero">{labels.contrasena[currentLang]}</Label>
                <Input id="password-viajero" type="password" />
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white"
                onClick={() => window.location.href = "/api/login"}
              >
                {labels.entrar[currentLang]}
              </Button>
              <div className="text-center">
                <button className="text-sm text-muted-foreground hover:underline">
                  {labels.olvidaste[currentLang]}
                </button>
              </div>
              <div className="text-center pt-2 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  {labels.noTienesCuenta[currentLang]}
                </p>
                <Button variant="outline" className="w-full">
                  {labels.crearCuenta[currentLang]}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="agente" className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground text-center">
                {labels.agenteDesc[currentLang]}
              </p>
              <div className="space-y-2">
                <Label htmlFor="email-agente">Email</Label>
                <Input id="email-agente" type="email" placeholder="agente@agencia.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-agente">{labels.contrasena[currentLang]}</Label>
                <Input id="password-agente" type="password" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                {labels.entrar[currentLang]}
              </Button>
              <div className="text-center pt-2 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  {labels.eresAgente[currentLang]}
                </p>
                <Link href="/agentes/registro">
                  <Button variant="outline" className="w-full" onClick={() => setAccountModalOpen(false)}>
                    {labels.registrarse[currentLang]}
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
