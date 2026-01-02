import { Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function FloatingContactButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50" data-testid="floating-contact-buttons">
      <a 
        href="https://wa.me/34611105448" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        data-testid="button-whatsapp-float"
        aria-label="WhatsApp"
      >
        <SiWhatsapp className="w-7 h-7 text-white" />
      </a>
      <a 
        href="tel:+34611105448"
        className="w-14 h-14 bg-accent hover:bg-accent/90 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        data-testid="button-phone-float"
        aria-label="Llamar"
      >
        <Phone className="w-6 h-6 text-primary" />
      </a>
    </div>
  );
}
