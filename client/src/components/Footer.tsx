import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, Youtube } from "lucide-react";
import { SiWhatsapp, SiTiktok } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Trips Europa" 
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 leading-relaxed max-w-xs">
              Expertos en viajes a Europa desde Colombia. Paquetes exclusivos, vuelos, hoteles y experiencias únicas diseñadas para ti.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com/tripseuropa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" data-testid="link-social-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/tripseuropa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" data-testid="link-social-instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" data-testid="link-social-whatsapp">
                <SiWhatsapp className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@tripseuropa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" data-testid="link-social-youtube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com/@tripseuropa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" data-testid="link-social-tiktok">
                <SiTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Destinos Populares */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Destinos Populares</h4>
            <ul className="space-y-3">
              <li><Link href="/destinations/paris" className="text-white/60 hover:text-accent transition-colors">París, Francia</Link></li>
              <li><Link href="/destinations/roma" className="text-white/60 hover:text-accent transition-colors">Roma, Italia</Link></li>
              <li><Link href="/destinations/barcelona" className="text-white/60 hover:text-accent transition-colors">Barcelona, España</Link></li>
              <li><Link href="/destinations/amsterdam" className="text-white/60 hover:text-accent transition-colors">Ámsterdam, Holanda</Link></li>
              <li><Link href="/destinations/santorini" className="text-white/60 hover:text-accent transition-colors">Santorini, Grecia</Link></li>
              <li><Link href="/destinations/london" className="text-white/60 hover:text-accent transition-colors">Londres, Inglaterra</Link></li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Nuestros Servicios</h4>
            <ul className="space-y-3">
              <li><Link href="/services/vuelos" className="text-white/60 hover:text-accent transition-colors">Vuelos a Europa</Link></li>
              <li><Link href="/services/paquetes" className="text-white/60 hover:text-accent transition-colors">Paquetes Todo Incluido</Link></li>
              <li><Link href="/services/hoteles" className="text-white/60 hover:text-accent transition-colors">Hoteles de Lujo</Link></li>
              <li><Link href="/services/luna-miel" className="text-white/60 hover:text-accent transition-colors">Lunas de Miel</Link></li>
              <li><Link href="/services/cruceros" className="text-white/60 hover:text-accent transition-colors">Cruceros Europeos</Link></li>
              <li><Link href="/services/visa" className="text-white/60 hover:text-accent transition-colors">Asesoría de Visa</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Contáctanos</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white/80">Bogotá:</span><br/>
                  Cra 7 #71-21, Of. 501
                </div>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white/80">Madrid:</span><br/>
                  Gran Vía 42, 3º
                </div>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <span>+57 601 123 4567</span><br/>
                  <span>+34 91 123 4567</span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>info@tripseuropa.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications & Trust */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/40 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-xs font-bold">IATA</span>
              Agencia Acreditada IATA
            </span>
            <span className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-xs font-bold">SSL</span>
              Pagos 100% Seguros
            </span>
            <span className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-xs font-bold">24/7</span>
              Soporte en Español
            </span>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">© 2025 TripsEuropa.com - Todos los derechos reservados.</p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Términos y Condiciones</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Política de Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
