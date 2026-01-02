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
import logoUrl from "@assets/erasebg-transformed_(2)_1767029138652.png";
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
    { name: "Europa", href: "/destinations", items: ["Francia", "Italia", "España", "Alemania", "Portugal", "Grecia", "Paises Bajos", "Suiza", "Croacia", "Reino Unido"] },
  ],
  en: [
    { name: "Europe", href: "/destinations", items: ["France", "Italy", "Spain", "Germany", "Portugal", "Greece", "Netherlands", "Switzerland", "Croatia", "United Kingdom"] },
  ]
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
  ]
};

const OFFERS_MENU = {
  es: [
    { name: "Ofertas de Invierno", href: "/packages?offer=invierno" },
    { name: "Ofertas de Ultima Hora", href: "/packages?offer=ultimahora" },
    { name: "Paquetes Destacados", href: "/packages?offer=destacados" },
    { name: "Programa TripsEuropa GO", href: "/rewards" },
  ],
  en: [
    { name: "Winter Deals", href: "/packages?offer=winter" },
    { name: "Last Minute Deals", href: "/packages?offer=lastminute" },
    { name: "Featured Packages", href: "/packages?offer=featured" },
    { name: "TripsEuropa GO Program", href: "/rewards" },
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

  const currentLang = language as "es" | "en";

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
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
                    {language === "es" ? "Destinos" : "Destinations"}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-white p-2">
                  {DESTINATIONS_MENU[currentLang][0].items.map((item, idx) => (
                    <DropdownMenuItem key={idx} asChild className="cursor-pointer">
                      <Link href={`/destinations/${item.toLowerCase()}`} className="w-full">
                        {item}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu open={activeDropdown === "estilo"} onOpenChange={(open) => setActiveDropdown(open ? "estilo" : null)}>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="text-sm font-medium text-gray-700 hover:text-primary flex items-center gap-1 transition-colors"
                    data-testid="button-menu-estilo"
                  >
                    {language === "es" ? "Estilo de viaje" : "Travel Style"}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-white p-2">
                  {TRAVEL_STYLE_MENU[currentLang].map((item, idx) => (
                    <DropdownMenuItem key={idx} asChild className="cursor-pointer">
                      <Link href={item.href} className="w-full">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu open={activeDropdown === "ofertas"} onOpenChange={(open) => setActiveDropdown(open ? "ofertas" : null)}>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="text-sm font-medium text-gray-700 hover:text-primary flex items-center gap-1 transition-colors"
                    data-testid="button-menu-ofertas"
                  >
                    {language === "es" ? "Ofertas" : "Deals"}
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
              />
            </Link>

            <div className="hidden lg:flex items-center gap-4">
              <a 
                href="tel:+573001234567" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary text-sm transition-colors"
                data-testid="link-phone-reservar"
              >
                <span className="text-gray-500">{language === "es" ? "Reservar:" : "Book:"}</span>
                <span className="font-semibold text-primary">+57 300 123 4567</span>
              </a>

              <div className="w-px h-6 bg-gray-200" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="text-sm font-medium text-gray-700 hover:text-primary flex items-center gap-1 transition-colors"
                    data-testid="button-menu-ayuda"
                  >
                    {language === "es" ? "Ayuda" : "Help"}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-white p-2">
                  <DropdownMenuItem className="cursor-pointer gap-3">
                    <MessageCircle className="w-5 h-5" />
                    <span>{language === "es" ? "Asistencia por chat" : "Chat Support"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer gap-3">
                    <Link href="/faq" className="flex items-center gap-3 w-full">
                      <HelpCircle className="w-5 h-5" />
                      <span>{language === "es" ? "Centro de Ayuda y FAQs" : "Help Center & FAQs"}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer gap-3">
                    <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full">
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
                    <span>Espanol</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setLanguage("en")} 
                    className={cn("cursor-pointer gap-2", language === "en" && "bg-accent/10")}
                    data-testid="button-lang-en"
                  >
                    <span className="text-lg">🇬🇧</span>
                    <span>English</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button 
                onClick={() => setAccountModalOpen(true)}
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                data-testid="button-account-open"
              >
                <User className="w-5 h-5 text-primary" />
              </button>
            </div>

            <div className="flex lg:hidden items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition-colors">
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
                </DropdownMenuContent>
              </DropdownMenu>

              <button 
                onClick={() => setAccountModalOpen(true)}
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <User className="w-4 h-4 text-primary" />
              </button>

              <button 
                className="text-gray-700 p-1"
                onClick={() => setIsOpen(!isOpen)}
                data-testid="button-mobile-menu"
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
                href="tel:+573001234567" 
                className="flex items-center gap-2 text-gray-700 py-2"
              >
                <Phone className="w-5 h-5 text-accent" />
                <span>{language === "es" ? "Reservar:" : "Book:"} +57 300 123 4567</span>
              </a>

              <div className="h-px bg-gray-100" />

              <details className="group">
                <summary className="flex items-center justify-between py-2 text-gray-800 cursor-pointer list-none">
                  <span className="font-medium">{language === "es" ? "Destinos" : "Destinations"}</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pl-4 py-2 space-y-2">
                  {DESTINATIONS_MENU[currentLang][0].items.map((item, idx) => (
                    <Link 
                      key={idx}
                      href={`/destinations/${item.toLowerCase()}`}
                      className="block py-1 text-gray-600 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between py-2 text-gray-800 cursor-pointer list-none">
                  <span className="font-medium">{language === "es" ? "Estilo de viaje" : "Travel Style"}</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pl-4 py-2 space-y-2">
                  {TRAVEL_STYLE_MENU[currentLang].map((item, idx) => (
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

              <details className="group">
                <summary className="flex items-center justify-between py-2 text-gray-800 cursor-pointer list-none">
                  <span className="font-medium">{language === "es" ? "Ofertas" : "Deals"}</span>
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
                    {language === "es" ? "Ayuda" : "Help"}
                  </span>
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pl-4 py-2 space-y-2">
                  <button className="flex items-center gap-2 py-1 text-gray-600 hover:text-primary w-full text-left">
                    <MessageCircle className="w-4 h-4" />
                    {language === "es" ? "Asistencia por chat" : "Chat Support"}
                  </button>
                  <Link href="/faq" className="flex items-center gap-2 py-1 text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>
                    <HelpCircle className="w-4 h-4" />
                    {language === "es" ? "Centro de Ayuda" : "Help Center"}
                  </Link>
                  <a href="https://wa.me/573001234567" className="flex items-center gap-2 py-1 text-gray-600 hover:text-primary">
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
              {language === "es" ? "Mi cuenta" : "My Account"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {language === "es" ? "Inicia sesion o crea una cuenta" : "Login or create an account"}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="viajero" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted p-1">
              <TabsTrigger value="viajero" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                {language === "es" ? "Viajero" : "Traveler"}
              </TabsTrigger>
              <TabsTrigger value="agente" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                {language === "es" ? "Agente de viajes" : "Travel Agent"}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="viajero" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email-viajero">Email</Label>
                <Input id="email-viajero" type="email" placeholder="tu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-viajero">{language === "es" ? "Contrasena" : "Password"}</Label>
                <Input id="password-viajero" type="password" />
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white"
                onClick={() => window.location.href = "/api/login"}
              >
                {language === "es" ? "Iniciar sesion" : "Login"}
              </Button>
              <div className="text-center">
                <button className="text-sm text-muted-foreground hover:underline">
                  {language === "es" ? "Olvidaste tu contrasena?" : "Forgot password?"}
                </button>
              </div>
              <div className="text-center pt-2 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  {language === "es" ? "No tienes cuenta?" : "Don't have an account?"}
                </p>
                <Button variant="outline" className="w-full">
                  {language === "es" ? "Crear una cuenta" : "Create account"}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="agente" className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground text-center">
                {language === "es" 
                  ? "Ofrece a tus clientes paquetes de viaje inolvidables a precios competitivos." 
                  : "Offer your clients unforgettable travel packages at competitive prices."}
              </p>
              <div className="space-y-2">
                <Label htmlFor="email-agente">Email</Label>
                <Input id="email-agente" type="email" placeholder="agente@agencia.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-agente">{language === "es" ? "Contrasena" : "Password"}</Label>
                <Input id="password-agente" type="password" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                {language === "es" ? "Iniciar sesion" : "Login"}
              </Button>
              <div className="text-center pt-2 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  {language === "es" ? "Eres agente de viajes?" : "Are you a travel agent?"}
                </p>
                <Link href="/agentes/registro">
                  <Button variant="outline" className="w-full" onClick={() => setAccountModalOpen(false)}>
                    {language === "es" ? "Registrarse" : "Register"}
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
