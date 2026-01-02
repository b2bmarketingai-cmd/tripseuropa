import { useState } from "react";
import { Phone, Copy, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function FloatingContactButtons() {
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);
  const phoneNumber = "+34 611 105 448";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber.replace(/\s/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
      
      <div className="relative">
        {showPhone && (
          <div className="absolute right-16 bottom-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 flex items-center gap-2 min-w-max border border-gray-200 dark:border-gray-700">
            <a 
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="font-bold text-primary hover:text-accent transition-colors"
            >
              {phoneNumber}
            </a>
            <button
              onClick={copyToClipboard}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Copiar número"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
        )}
        
        <button 
          onClick={() => setShowPhone(!showPhone)}
          className="w-14 h-14 bg-accent hover:bg-accent/90 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          data-testid="button-phone-float"
          aria-label="Llamar"
        >
          <Phone className="w-6 h-6 text-primary" />
        </button>
      </div>
    </div>
  );
}
