import { useState } from "react";
import { Phone, Copy, Check, PhoneCall } from "lucide-react";
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
        href="https://api.whatsapp.com/send?phone=34611105448&text=Hola,%20quiero%20información%20sobre%20viajes%20a%20Europa" 
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
          <div className="absolute right-16 bottom-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 flex items-center gap-3 min-w-max border border-gray-200 dark:border-gray-700">
            <span className="font-bold text-primary">
              {phoneNumber}
            </span>
            <a 
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="p-2 rounded-md bg-green-500 hover:bg-green-600 transition-colors flex items-center gap-1"
              aria-label="Llamar"
              data-testid="button-call-direct"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Llamar</span>
            </a>
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
              aria-label="Copiar numero"
              data-testid="button-copy-phone"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Copiar</span>
                </>
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
