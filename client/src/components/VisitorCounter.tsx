import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(5234);
  const { language } = useI18n();

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        const newCount = prev + change;
        return Math.max(5000, Math.min(6000, newCount));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="inline-flex items-center gap-2 text-white/60 text-sm"
      data-testid="visitor-counter"
    >
      <Eye className="w-4 h-4 text-accent" />
      <span className="font-medium text-accent" data-testid="text-visitor-count">
        {visitorCount.toLocaleString()}
      </span>
      <span>
        {language === "es" ? "visitantes hoy" : language === "pt" ? "visitantes hoje" : "visitors today"}
      </span>
    </div>
  );
}
