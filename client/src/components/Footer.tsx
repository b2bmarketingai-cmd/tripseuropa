import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { Facebook, Instagram, MapPin, Mail, Phone, Youtube, Plane, Map, Wrench, BookOpen, MessageCircle } from "lucide-react";
import { SiWhatsapp, SiTiktok, SiVisa, SiMastercard } from "react-icons/si";
import { VisitorCounter } from "@/components/VisitorCounter";

export function Footer() {
  const { t, language } = useI18n();
  
  const mainNav = [
    { name: language === "es" ? "Destinos" : "Destinations", href: "/destinations", icon: Map },
    { name: language === "es" ? "Paquetes" : "Packages", href: "/packages", icon: Plane },
    { name: language === "es" ? "Herramientas" : "Tools", href: "/tools", icon: Wrench },
    { name: language === "es" ? "Blog" : "Blog", href: "/blog", icon: BookOpen },
    { name: language === "es" ? "Contacto" : "Contact", href: "/contact", icon: MessageCircle },
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
    { name: "Colombia", href: "/desde-colombia", flag: "🇨🇴" },
    { name: "Mexico", href: "/desde-mexico", flag: "🇲🇽" },
    { name: "Brasil", href: "/desde-brasil", flag: "🇧🇷" },
    { name: "Panama", href: "/desde-panama", flag: "🇵🇦" },
    { name: "Argentina", href: "/desde-argentina", flag: "🇦🇷" },
    { name: "Peru", href: "/desde-peru", flag: "🇵🇪" },
    { name: "Costa Rica", href: "/desde-costa-rica", flag: "🇨🇷" },
  ];

  return (
    <footer className="bg-primary text-white pt-12 pb-8" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 pb-8 border-b border-white/10">
          {mainNav.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors text-sm md:text-base font-medium"
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
                    <span>{country.flag}</span>
                    {country.name}
                  </Link>
                </li>
              ))}
            </ul>
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

        <div className="border-t border-white/10 pt-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center items-center gap-4 text-white/40 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold">IATA</span>
                {t("footer.iata")}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold">SSL</span>
                {t("footer.ssl")}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold">24/7</span>
                {t("footer.support")}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-xs">{t("footer.paymentMethods")}:</span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-6 rounded bg-white/10 flex items-center justify-center" title="Visa">
                  <SiVisa className="w-6 h-4 text-white/80" />
                </div>
                <div className="w-10 h-6 rounded bg-white/10 flex items-center justify-center" title="Mastercard">
                  <SiMastercard className="w-6 h-4 text-white/80" />
                </div>
                <div className="w-10 h-6 rounded bg-white/10 flex items-center justify-center text-[8px] font-bold text-white/80" title="Scalapay">
                  SCALA
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
            <Link href="/terms" className="hover:text-white transition-colors">{t("footer.terms")}</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">{t("footer.cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
