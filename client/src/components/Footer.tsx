import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { Facebook, Instagram, MapPin, Mail, Phone, Youtube, Plane, Map, Wrench, BookOpen, MessageCircle, Shield, ExternalLink, Lock, Building2, Bot, Sparkles } from "lucide-react";
import { SiWhatsapp, SiTiktok, SiVisa, SiMastercard, SiBinance, SiPaypal } from "react-icons/si";
import { VisitorCounter } from "@/components/VisitorCounter";
import { Button } from "@/components/ui/button";

export function Footer() {
  const { t, language } = useI18n();
  
  const mainNav = [
    { name: language === "es" ? "Destinos" : "Destinations", href: "/destinations", icon: Map },
    { name: language === "es" ? "Paquetes" : "Packages", href: "/packages", icon: Plane },
    { name: language === "es" ? "Herramientas" : "Tools", href: "/tools", icon: Wrench },
    { name: language === "es" ? "Blog" : "Blog", href: "/blog", icon: BookOpen },
    { name: language === "es" ? "Contacto" : "Contact", href: "/contact", icon: MessageCircle },
    { name: language === "es" ? "Asistente IA" : "AI Assistant", href: "/travel-assistant", icon: Bot },
  ];

  const destinations = [
    { nameKey: "footer.dest.paris", href: "/destinations/paris" },
    { nameKey: "footer.dest.madrid", href: "/destinations/madrid" },
    { nameKey: "footer.dest.barcelona", href: "/destinations/barcelona" },
    { nameKey: "footer.dest.rome", href: "/destinations/roma" },
    { nameKey: "footer.dest.london", href: "/destinations/london" },
    { nameKey: "footer.dest.amsterdam", href: "/destinations/amsterdam" },
  ];

  const services = [
    { nameKey: "footer.service.flights", href: "/services/vuelos" },
    { nameKey: "footer.service.hotels", href: "/services/hoteles" },
    { nameKey: "footer.service.packages", href: "/services/paquetes" },
    { nameKey: "footer.service.tours", href: "/services/tours" },
    { nameKey: "footer.service.insurance", href: "/services/seguros" },
    { nameKey: "footer.service.esim", href: "/services/esim" },
  ];

  const company = [
    { nameKey: "footer.aboutUs", href: "/about" },
    { nameKey: "footer.testimonials", href: "/testimonios" },
    { nameKey: "footer.policies", href: "/policies" },
    { nameKey: "footer.privacy", href: "/privacy" },
  ];

  const countries = [
    { name: "Colombia", href: "/blog/colombia", code: "CO" },
    { name: "Mexico", href: "/blog/mexico", code: "MX" },
    { name: "Brasil", href: "/blog/brasil", code: "BR" },
    { name: "Argentina", href: "/blog/argentina", code: "AR" },
    { name: "Peru", href: "/blog/peru", code: "PE" },
    { name: "Panama", href: "/blog/panama", code: "PA" },
    { name: "Costa Rica", href: "/blog/costa-rica", code: "CR" },
  ];

  return (
    <footer className="bg-primary text-white pt-12 pb-8" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 pb-8 border-b border-white/10">
          {mainNav.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              className="flex items-center gap-2 text-[#d5b034] hover:text-[#f0d060] hover:drop-shadow-[0_0_8px_rgba(213,176,52,0.6)] transition-all duration-300 text-sm md:text-base font-medium"
              data-testid={`link-footer-nav-${index}`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 mb-12">
          
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-white/60" data-testid="text-footer-destinations-heading">
              {t("footer.destinations")}
            </h4>
            <ul className="space-y-2">
              {destinations.map((dest, index) => (
                <li key={index}>
                  <Link href={dest.href} className="text-white/60 hover:text-accent transition-colors text-sm" data-testid={`link-footer-dest-${index}`}>
                    {t(dest.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-white/60" data-testid="text-footer-services-heading">
              {t("footer.services")}
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href={service.href} className="text-white/60 hover:text-accent transition-colors text-sm" data-testid={`link-footer-service-${index}`}>
                    {t(service.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-white/60" data-testid="text-footer-company-heading">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2">
              {company.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-white/60 hover:text-accent transition-colors text-sm" data-testid={`link-footer-company-${index}`}>
                    {t(item.nameKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/travel-assistant" className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors text-sm" data-testid="link-footer-ai-assistant">
                  <Bot className="w-3 h-3 text-accent" />
                  {language === "es" ? "Asistente Virtual IA" : "AI Travel Assistant"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-white/60">
              {language === "es" ? "Viaja desde" : "Travel from"}
            </h4>
            <ul className="space-y-2">
              {countries.map((country, index) => (
                <li key={index}>
                  <Link href={country.href} className="text-white/60 hover:text-accent transition-colors text-sm flex items-center gap-2">
                    <span className="text-xs bg-white/10 px-1 rounded font-mono">{country.code}</span>
                    {country.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <a 
                href="https://www.megatravel.com.mx/info/requisitos-tramite-de-visas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#d4af37] hover:text-[#f0d060] transition-colors font-medium"
                data-testid="link-visa-requirements"
              >
                <Shield className="w-4 h-4" />
                {language === "es" ? "Requisitos de Visa" : "Visa Requirements"}
                <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-xs text-white/40 mt-2">
                {language === "es" 
                  ? "Canada, China, Dubai, Egipto, EE.UU., India, Sudafrica, Tailandia, Turquia y mas"
                  : "Canada, China, Dubai, Egypt, USA, India, South Africa, Thailand, Turkey and more"}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-white/60" data-testid="text-footer-contact-heading">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-white/60">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Bogota, Colombia</span>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+573001234567" className="hover:text-accent">+57 300 123 4567</a>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:info@tripseuropa.com" className="hover:text-accent">info@tripseuropa.com</a>
              </li>
            </ul>

            <div className="flex gap-2 mt-4">
              <a href="https://facebook.com/tripseuropa" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/tripseuropa" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" aria-label="WhatsApp">
                <SiWhatsapp className="w-4 h-4" />
              </a>
              <a href="https://youtube.com/@tripseuropa" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://tiktok.com/@tripseuropa" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" aria-label="TikTok">
                <SiTiktok className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mb-6">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-8">
            <div className="flex flex-col items-center gap-1" title="SSL 256 bits">
              <div className="w-16 h-10 rounded bg-white/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-white/70" />
              </div>
              <span className="text-[9px] text-white/50 text-center leading-tight">
                SSL 256 bits
              </span>
            </div>
            
            <div title="Visa">
              <div className="w-16 h-10 rounded bg-white flex items-center justify-center">
                <SiVisa className="w-12 h-8 text-[#1A1F71]" />
              </div>
            </div>
            
            <div title="Mastercard">
              <div className="w-16 h-10 rounded bg-white flex items-center justify-center">
                <SiMastercard className="w-10 h-8 text-[#EB001B]" />
              </div>
            </div>
            
            <div title="PayPal">
              <div className="w-16 h-10 rounded bg-[#003087] flex items-center justify-center">
                <SiPaypal className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div title="Binance Pay">
              <div className="w-16 h-10 rounded bg-[#F0B90B] flex items-center justify-center">
                <SiBinance className="w-6 h-6 text-[#1E2329]" />
              </div>
            </div>
            
            <div title="Scalapay">
              <div className="w-16 h-10 rounded bg-[#FFE8E8] flex items-center justify-center">
                <span className="text-[#1A1A1A] text-xs font-bold flex items-center">
                  <span className="text-[#1A1A1A]">&#9829;</span>
                </span>
              </div>
            </div>
            
            <div title="Bank Transfer">
              <div className="w-16 h-10 rounded bg-white/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white/70" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
            <span className="text-[11px] text-white/50">{language === "es" ? "Divisas aceptadas:" : "Accepted currencies:"}</span>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 rounded bg-white/10 text-[11px] text-white/70 font-medium">EUR</span>
              <span className="px-2 py-1 rounded bg-white/10 text-[11px] text-white/70 font-medium">USD</span>
              <span className="px-2 py-1 rounded bg-white/10 text-[11px] text-white/70 font-medium">COP</span>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
              <div className="flex items-center gap-2" title="Confianza Online">
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white/70" />
                </div>
                <span className="text-sm text-white/60 font-medium tracking-wide">CONFIANZA ONLINE</span>
              </div>
              
              <div className="text-center text-white/50 text-sm">
                <p>Trips Europa es Agencia de Viajes</p>
              </div>
              
              <div className="flex items-center gap-2" title="IATA Member">
                <div className="px-4 py-2 border border-white/30 rounded flex items-center justify-center">
                  <span className="text-xl font-bold text-white/80 tracking-wider" style={{ fontFamily: "serif" }}>IATA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-white/40 text-xs" data-testid="text-footer-copyright">
              2025 TripsEuropa.com - {t("footer.rights")}
            </p>
            <VisitorCounter />
          </div>
          <div className="flex gap-4 text-xs text-white/40 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-white transition-colors">{t("footer.privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
