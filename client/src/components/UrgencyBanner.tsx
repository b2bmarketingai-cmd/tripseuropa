import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { Clock, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function UrgencyBanner() {
  const { language } = useI18n();
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    endDate.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const content = {
    es: {
      flash: "Oferta Flash",
      message: "Ultima llamada: viaja a Europa a precios especiales 2025",
      remaining: "Quedan",
      days: "dias",
      hours: "hrs",
      minutes: "min",
      seconds: "seg",
      cta: "Ver Ofertas",
    },
    en: {
      flash: "Flash Sale",
      message: "Last call: travel to Europe at special 2025 prices",
      remaining: "Remaining",
      days: "days",
      hours: "hrs",
      minutes: "min",
      seconds: "sec",
      cta: "View Offers",
    },
    pt: {
      flash: "Oferta Relampago",
      message: "Ultima chamada: viaje para a Europa a precos especiais 2025",
      remaining: "Restam",
      days: "dias",
      hours: "hrs",
      minutes: "min",
      seconds: "seg",
      cta: "Ver Ofertas",
    },
  };

  const c = content[language as keyof typeof content] || content.es;

  if (!isVisible) return null;

  return (
    <div 
      className="bg-gradient-to-r from-accent via-accent/90 to-accent text-primary py-1.5 md:py-2 px-2 md:px-4 sticky top-0 z-[60]"
      data-testid="urgency-banner"
    >
      <div className="container mx-auto flex items-center justify-center gap-2 md:gap-3 text-xs md:text-base">
        {/* Mobile: Simplified view */}
        <div className="flex md:hidden items-center gap-1.5 flex-1 justify-center">
          <Clock className="w-3 h-3 flex-shrink-0" />
          <span className="font-medium text-xs">{c.remaining}:</span>
          <div className="flex items-center gap-1 font-bold text-xs">
            <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
              {timeLeft.days} {c.days}
            </span>
            <span className="text-primary/80">:</span>
            <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
              {timeLeft.hours} {c.hours}
            </span>
            <span className="text-primary/80">:</span>
            <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
              {timeLeft.minutes} {c.minutes}
            </span>
          </div>
          <a href="https://api.whatsapp.com/send?phone=34611105448&text=Hola,%20quiero%20información%20sobre%20las%20ofertas" target="_blank" rel="noopener noreferrer">
            <Button 
              size="sm" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs h-6 px-2"
              data-testid="button-urgency-cta-mobile"
            >
              {c.cta}
            </Button>
          </a>
        </div>

        {/* Desktop: Full view */}
        <div className="hidden md:flex items-center gap-2">
          <Zap className="w-4 h-4 animate-pulse" />
          <span className="font-bold uppercase tracking-wide">{c.flash}</span>
        </div>
        
        <span className="hidden md:inline text-primary/80">|</span>
        
        <span className="hidden md:inline text-center font-medium">{c.message}</span>
        
        <span className="hidden md:inline text-primary/80">|</span>
        
        <div className="hidden md:flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span className="font-medium">{c.remaining}:</span>
          <div className="flex items-center gap-1 font-mono font-bold">
            <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-sm">
              {timeLeft.days}{c.days}
            </span>
            <span>:</span>
            <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-sm">
              {String(timeLeft.hours).padStart(2, '0')}{c.hours}
            </span>
            <span>:</span>
            <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-sm">
              {String(timeLeft.minutes).padStart(2, '0')}{c.minutes}
            </span>
          </div>
        </div>
        
        <a href="https://api.whatsapp.com/send?phone=34611105448&text=Hola,%20quiero%20información%20sobre%20las%20ofertas" target="_blank" rel="noopener noreferrer" className="hidden md:block">
          <Button 
            size="sm" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
            data-testid="button-urgency-cta"
          >
            {c.cta}
          </Button>
        </a>
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-primary/20 rounded transition-colors"
          aria-label="Close banner"
          data-testid="button-urgency-close"
        >
          <X className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>
    </div>
  );
}
