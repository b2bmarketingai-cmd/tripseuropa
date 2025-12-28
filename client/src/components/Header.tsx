import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ShoppingBag, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import logoUrl from "@assets/logo_oficial_tripseuropa.com_1766951188994.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  const navLinks = [
    { name: t("nav.destinations"), href: "/destinations" },
    { name: t("nav.packages"), href: "/packages" },
    { name: t("nav.tools"), href: "/tools" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled || isOpen ? "bg-primary/95 backdrop-blur-md shadow-md border-white/10" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
            <img 
              src={logoUrl} 
              alt="Trips Europa - Agencia de Viajes Premium a Europa" 
              className="h-12 md:h-14 w-auto object-contain drop-shadow-lg" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide hover:text-accent transition-colors relative py-1",
                  isActive(link.href) ? "text-accent" : "text-white/80"
                )}
                data-testid={`link-nav-${link.href.replace("/", "")}`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:text-accent hover:bg-white/10 gap-1" data-testid="button-language-toggle">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-semibold">{language.toUpperCase()}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem 
                  onClick={() => setLanguage("es")} 
                  className={cn("gap-2 cursor-pointer", language === "es" && "bg-accent/10")} 
                  data-testid="button-lang-es"
                >
                  <span className="w-5 h-4 rounded-sm overflow-hidden flex items-center justify-center bg-red-600">
                    <span className="text-yellow-400 text-xs font-bold">ES</span>
                  </span>
                  <span>Español</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage("en")} 
                  className={cn("gap-2 cursor-pointer", language === "en" && "bg-accent/10")} 
                  data-testid="button-lang-en"
                >
                  <span className="w-5 h-4 rounded-sm overflow-hidden flex items-center justify-center bg-blue-800">
                    <span className="text-white text-xs font-bold">EN</span>
                  </span>
                  <span>English</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link href="/app/bookings">
                  <Button variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10" data-testid="button-bookings">
                    <ShoppingBag className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/app/profile">
                  <Button variant="outline" className="border-accent/50 text-accent hover:bg-accent hover:text-primary gap-2" data-testid="button-profile">
                    <User className="w-4 h-4" />
                    <span>{t("nav.myAccount")}</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <Button 
                onClick={() => window.location.href = "/api/login"}
                className="bg-accent text-primary hover:bg-accent/90 font-semibold px-6 shadow-lg shadow-accent/20"
                data-testid="button-signin"
              >
                {t("nav.signin")}
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-white/10 absolute w-full left-0 animate-in slide-in-from-top-5 duration-300">
          <div className="container px-4 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-lg font-medium text-white/90 hover:text-accent"
                onClick={() => setIsOpen(false)}
                data-testid={`link-mobile-nav-${link.href.replace("/", "")}`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Language in mobile */}
            <div className="flex gap-4 py-2">
              <button 
                onClick={() => setLanguage("es")}
                className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded",
                  language === "es" ? "bg-accent/20 text-accent" : "text-white/60"
                )}
                data-testid="button-mobile-lang-es"
              >
                <span className="w-5 h-4 rounded-sm bg-red-600 flex items-center justify-center">
                  <span className="text-yellow-400 text-xs font-bold">ES</span>
                </span>
                Español
              </button>
              <button 
                onClick={() => setLanguage("en")}
                className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded",
                  language === "en" ? "bg-accent/20 text-accent" : "text-white/60"
                )}
                data-testid="button-mobile-lang-en"
              >
                <span className="w-5 h-4 rounded-sm bg-blue-800 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">EN</span>
                </span>
                English
              </button>
            </div>

            <div className="h-px bg-white/10 my-2"></div>
            {isAuthenticated ? (
              <div className="flex flex-col gap-4">
                <Link href="/app/bookings" onClick={() => setIsOpen(false)} data-testid="link-mobile-bookings">
                  <span className="text-lg font-medium text-white/90 hover:text-accent">
                    {t("nav.myBookings")}
                  </span>
                </Link>
                <Link href="/app/profile" onClick={() => setIsOpen(false)} data-testid="link-mobile-profile">
                  <span className="text-lg font-medium text-white/90 hover:text-accent">
                    {t("nav.profile")}
                  </span>
                </Link>
                <Button 
                  onClick={() => logout()}
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  data-testid="button-mobile-signout"
                >
                  {t("nav.signout")}
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => window.location.href = "/api/login"}
                className="w-full bg-accent text-primary font-bold"
                data-testid="button-mobile-signin"
              >
                {t("nav.signin")}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
