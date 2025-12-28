import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { Facebook, Instagram, MapPin, Mail, Phone, Youtube } from "lucide-react";
import { SiWhatsapp, SiTiktok, SiVisa, SiMastercard } from "react-icons/si";

export function Footer() {
  const { t } = useI18n();
  
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
    { nameKey: "footer.blog", href: "/blog" },
    { nameKey: "footer.testimonials", href: "/testimonios" },
    { nameKey: "footer.careers", href: "/careers" },
    { nameKey: "footer.terms", href: "/terms" },
    { nameKey: "footer.privacy", href: "/privacy" },
  ];

  return (
    <footer className="bg-primary text-white pt-20 pb-10" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center" data-testid="link-footer-logo">
              <img 
                src="/logo.png" 
                alt="Trips Europa" 
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 leading-relaxed max-w-xs" data-testid="text-footer-description">
              {t("footer.description")}
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com/tripseuropa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" data-testid="link-social-facebook" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/tripseuropa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" data-testid="link-social-instagram" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" data-testid="link-social-whatsapp" aria-label="WhatsApp">
                <SiWhatsapp className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@tripseuropa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" data-testid="link-social-youtube" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com/@tripseuropa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" data-testid="link-social-tiktok" aria-label="TikTok">
                <SiTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Destinos */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display" data-testid="text-footer-destinations-heading">{t("footer.destinations")}</h4>
            <ul className="space-y-3">
              {destinations.map((dest, index) => (
                <li key={index}>
                  <Link href={dest.href} className="text-white/60 hover:text-accent transition-colors text-sm" data-testid={`link-footer-dest-${index}`}>
                    {t(dest.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display" data-testid="text-footer-services-heading">{t("footer.services")}</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href={service.href} className="text-white/60 hover:text-accent transition-colors text-sm" data-testid={`link-footer-service-${index}`}>
                    {t(service.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display" data-testid="text-footer-company-heading">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-white/60 hover:text-accent transition-colors text-sm" data-testid={`link-footer-company-${index}`}>
                    {t(item.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display" data-testid="text-footer-contact-heading">{t("footer.contact")}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2 text-white/60">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Bogotá, Colombia</span>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>info@tripseuropa.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Trust */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Certifications */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-white/40 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-xs font-bold">IATA</span>
                {t("footer.iata")}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-xs font-bold">SSL</span>
                {t("footer.ssl")}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-xs font-bold">24/7</span>
                {t("footer.support")}
              </span>
            </div>
            
            {/* Payment Methods */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <span className="text-white/40 text-xs" data-testid="text-payment-currencies">{t("footer.paymentMethods")} - {t("footer.currencies")}</span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 rounded bg-white/10 flex items-center justify-center" title="Visa" data-testid="badge-payment-visa">
                  <SiVisa className="w-8 h-5 text-white/80" />
                </div>
                <div className="w-12 h-8 rounded bg-white/10 flex items-center justify-center" title="Mastercard" data-testid="badge-payment-mastercard">
                  <SiMastercard className="w-8 h-5 text-white/80" />
                </div>
                <div className="w-12 h-8 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/80" title="Scalapay" data-testid="badge-payment-scalapay">
                  SCALA
                </div>
                <div className="w-12 h-8 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold text-accent" title="Binance Pay" data-testid="badge-payment-binance">
                  BINANCE
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm" data-testid="text-footer-copyright">© 2025 TripsEuropa.com - {t("footer.rights")}</p>
          <div className="flex gap-6 text-sm text-white/40 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-white transition-colors" data-testid="link-footer-privacy">{t("footer.privacy")}</Link>
            <Link href="/terms" className="hover:text-white transition-colors" data-testid="link-footer-terms">{t("footer.terms")}</Link>
            <Link href="/cookies" className="hover:text-white transition-colors" data-testid="link-footer-cookies">{t("footer.cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
