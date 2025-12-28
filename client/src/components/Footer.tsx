import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary font-bold font-display">
                T
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">
                Trips<span className="text-accent">Europa</span>
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-xs">
              Curating exceptional European travel experiences for the discerning explorer. Luxury tailored to your dreams.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Discover</h4>
            <ul className="space-y-4">
              <li><Link href="/destinations" className="text-white/60 hover:text-accent transition-colors">Destinations</Link></li>
              <li><Link href="/services" className="text-white/60 hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="/blog" className="text-white/60 hover:text-accent transition-colors">Travel Blog</Link></li>
              <li><Link href="/about" className="text-white/60 hover:text-accent transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>Via del Corso 123<br/>00186 Roma, Italy</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+39 06 1234 5678</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>concierge@tripseuropa.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Newsletter</h4>
            <p className="text-white/60 mb-4">Subscribe for exclusive offers and travel inspiration.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
              />
              <button className="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:bg-accent/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">© 2025 TripsEuropa. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
