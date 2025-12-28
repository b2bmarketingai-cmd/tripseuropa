import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    { name: "Destinations", href: "/destinations" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled || isOpen ? "bg-primary/95 backdrop-blur-md shadow-md border-white/10" : "bg-transparent text-white"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/logo.png" 
              alt="Trips Europa Logo" 
              className="h-12 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide hover:text-accent transition-colors relative py-1",
                  isActive(link.href) ? "text-accent after:w-full" : "text-white/80 after:w-0"
                )}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ease-out"></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link href="/app/bookings">
                  <Button variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10">
                    <ShoppingBag className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/app/profile">
                  <Button variant="outline" className="border-accent/50 text-accent hover:bg-accent hover:text-primary gap-2">
                    <User className="w-4 h-4" />
                    <span>My Account</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <Button 
                onClick={() => window.location.href = "/api/login"}
                className="bg-accent text-primary hover:bg-accent/90 font-semibold px-6 shadow-lg shadow-accent/20"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
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
                key={link.name} 
                href={link.href}
                className="text-lg font-medium text-white/90 hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2"></div>
            {isAuthenticated ? (
              <div className="flex flex-col gap-4">
                 <Link href="/app/bookings" onClick={() => setIsOpen(false)}>
                  <span className="text-lg font-medium text-white/90 hover:text-accent">My Bookings</span>
                </Link>
                <Link href="/app/profile" onClick={() => setIsOpen(false)}>
                  <span className="text-lg font-medium text-white/90 hover:text-accent">Profile</span>
                </Link>
                <Button 
                  onClick={() => logout()}
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => window.location.href = "/api/login"}
                className="w-full bg-accent text-primary font-bold"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
