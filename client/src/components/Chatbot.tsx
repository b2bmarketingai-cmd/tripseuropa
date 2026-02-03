import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Plane, Hotel, Map, Heart, Users, Calendar, Phone, MessageSquare } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import sofiaAvatar from "@assets/sofia-avatar-128.webp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatbot } from "@/hooks/use-chatbot";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const WHATSAPP_NUMBER = "34611105448";
const PHONE_NUMBER = "+34 611 105 448";

const FAQ_RESPONSES: Record<string, { es: string; en: string; pt: string }> = {
  "visa": {
    es: "Los ciudadanos de la mayoría de países latinoamericanos no necesitan visa para visitar el espacio Schengen (Europa) por hasta 90 días. Sin embargo, se requerirá ETIAS a partir de 2025. El costo será de 7 EUR y tendrá validez de 3 años.",
    en: "Citizens from most Latin American countries don't need a visa to visit the Schengen area (Europe) for up to 90 days. However, ETIAS will be required starting 2025. The cost will be 7 EUR and valid for 3 years.",
    pt: "Cidadãos da maioria dos países latino-americanos não precisam de visto para visitar o espaço Schengen (Europa) por até 90 dias. No entanto, o ETIAS será necessário a partir de 2025. O custo será de 7 EUR e terá validade de 3 anos."
  },
  "precio": {
    es: "Nuestros paquetes comienzan desde $1,899 USD por persona. El precio incluye vuelos, hoteles, desayunos y traslados. Ofrecemos opciones de financiamiento hasta 12 meses sin intereses.",
    en: "Our packages start from $1,899 USD per person. The price includes flights, hotels, breakfasts, and transfers. We offer financing options up to 12 months interest-free.",
    pt: "Nossos pacotes começam a partir de $1,899 USD por pessoa. O preço inclui voos, hotéis, cafés da manhã e traslados. Oferecemos opções de financiamento até 12 meses sem juros."
  },
  "documentos": {
    es: "Para viajar a Europa necesitas: pasaporte vigente (mínimo 6 meses), boleto de avión ida y vuelta, reserva de hotel, seguro de viaje y prueba de solvencia económica.",
    en: "To travel to Europe you need: valid passport (minimum 6 months), round-trip flight ticket, hotel reservation, travel insurance, and proof of economic solvency.",
    pt: "Para viajar à Europa você precisa: passaporte válido (mínimo 6 meses), passagem aérea de ida e volta, reserva de hotel, seguro de viagem e comprovante de solvência econômica."
  },
  "pago": {
    es: "Aceptamos tarjetas de crédito (Visa, Mastercard, Amex), transferencias bancarias, PayPal y pagos en efectivo. Ofrecemos planes de pago hasta 12 MSI con bancos seleccionados.",
    en: "We accept credit cards (Visa, Mastercard, Amex), bank transfers, PayPal, and cash payments. We offer payment plans up to 12 monthly payments interest-free with selected banks.",
    pt: "Aceitamos cartões de crédito (Visa, Mastercard, Amex), transferências bancárias, PayPal e pagamentos em dinheiro. Oferecemos planos de pagamento até 12 vezes sem juros com bancos selecionados."
  }
};

const QUICK_ACTIONS = [
  {
    icon: Plane,
    label: { es: "Paquetes a Europa", en: "Europe Packages", pt: "Pacotes para Europa" },
    message: { es: "Hola Sofia, quiero conocer los paquetes turísticos disponibles", en: "Hi Sofia, I want to know about available travel packages", pt: "Olá Sofia, quero conhecer os pacotes turísticos disponíveis" }
  },
  {
    icon: Map,
    label: { es: "Destinos Populares", en: "Popular Destinations", pt: "Destinos Populares" },
    message: { es: "¿Cuáles son los destinos más populares de Europa?", en: "What are the most popular destinations in Europe?", pt: "Quais são os destinos mais populares da Europa?" }
  },
  {
    icon: Heart,
    label: { es: "Luna de Miel", en: "Honeymoon", pt: "Lua de Mel" },
    message: { es: "Busco destinos románticos para luna de miel", en: "I'm looking for romantic honeymoon destinations", pt: "Procuro destinos românticos para lua de mel" }
  },
  {
    icon: Users,
    label: { es: "Viaje en Familia", en: "Family Trip", pt: "Viagem em Família" },
    message: { es: "¿Qué destinos recomiendas para viajar con niños?", en: "What destinations do you recommend for traveling with children?", pt: "Quais destinos você recomenda para viajar com crianças?" }
  },
  {
    icon: Calendar,
    label: { es: "Documentación", en: "Documentation", pt: "Documentação" },
    message: { es: "¿Qué documentos necesito para viajar a Europa?", en: "What documents do I need to travel to Europe?", pt: "Quais documentos preciso para viajar à Europa?" }
  },
  {
    icon: Hotel,
    label: { es: "Cotización", en: "Quote", pt: "Cotação" },
    message: { es: "Quiero una cotización personalizada para un viaje", en: "I want a personalized quote for a trip", pt: "Quero uma cotação personalizada para uma viagem" }
  }
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useI18n();
  
  const { messages, sendMessage, isStreaming } = useChatbot();

  const scrollToBottom = () => {
    // Use requestAnimationFrame to avoid forced reflow
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    
    const message = input;
    setInput("");
    await sendMessage(message);
  };

  const handleQuickAction = async (message: string) => {
    if (isStreaming) return;
    await sendMessage(message);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110",
          isOpen ? "bg-red-500 text-white rotate-90" : "bg-accent text-primary"
        )}
        data-testid="button-chatbot-toggle"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat con Sofia"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </button>

      {/* Chat Window */}
      <div 
        className={cn(
          "fixed bottom-24 right-6 w-80 md:w-96 bg-white dark:bg-card rounded-2xl shadow-2xl border border-gray-100 dark:border-card-border z-50 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10 pointer-events-none"
        )}
        style={{ height: "550px", maxHeight: "80vh" }}
        data-testid="container-chatbot"
      >
        {/* Header */}
        <div className="bg-primary p-4 flex items-center gap-3">
          <img 
            src={sofiaAvatar} 
            alt="Sofia" 
            className="w-10 h-10 rounded-full object-cover border-2 border-accent"
          />
          <div>
            <h3 className="text-white font-bold font-display">Sofia</h3>
            <p className="text-accent text-xs">
              {language === "es" ? "Tu Asesora de Viajes" : language === "pt" ? "Sua Consultora de Viagens" : "Your Travel Advisor"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-background">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="text-center text-muted-foreground mt-4">
                <img 
                  src={sofiaAvatar} 
                  alt="Sofia" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent mx-auto mb-3"
                />
                <p className="text-sm font-medium mb-1">
                  {language === "es" ? "¡Hola! Soy Sofia" : language === "pt" ? "Olá! Sou a Sofia" : "Hi! I'm Sofia"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === "es" 
                    ? "Tu asesora de viajes especializada en Europa. ¿En qué puedo ayudarte?" 
                    : language === "pt"
                    ? "Sua consultora de viagens especializada em Europa. Como posso ajudá-lo?"
                    : "Your specialized European travel advisor. How can I help you?"}
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {QUICK_ACTIONS.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(action.message[language])}
                    className="flex items-center gap-2 p-2.5 bg-white dark:bg-card rounded-lg border border-gray-200 dark:border-card-border text-left text-xs hover:border-accent hover:bg-accent/5 transition-colors"
                    data-testid={`button-quick-action-${idx}`}
                  >
                    <action.icon className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-foreground line-clamp-2">{action.label[language]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={cn(
                "max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed animate-in slide-in-from-bottom-2 duration-300",
                msg.role === "user" 
                  ? "bg-primary text-white ml-auto rounded-tr-none" 
                  : "bg-white dark:bg-card border border-gray-100 dark:border-card-border text-foreground mr-auto rounded-tl-none shadow-sm"
              )}
              data-testid={`message-${msg.role}-${idx}`}
            >
              {msg.content || (
                <div className="flex gap-1 h-5 items-center px-1">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Contact Actions */}
        <div className="p-2 bg-accent/5 border-t border-gray-100 dark:border-card-border">
          <div className="flex gap-2 justify-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 gap-1.5 bg-green-500 hover:bg-green-600 border-green-500 text-white"
              onClick={() => window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(language === "es" ? "Hola, quiero información sobre viajes a Europa" : language === "pt" ? "Olá, quero informações sobre viagens à Europa" : "Hello, I want information about trips to Europe")}`, "_blank")}
              data-testid="button-chatbot-whatsapp"
            >
              <SiWhatsapp className="w-4 h-4" />
              <span className="text-xs">WhatsApp</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 gap-1.5"
              onClick={() => window.open(`tel:${PHONE_NUMBER.replace(/\s/g, '')}`, "_self")}
              data-testid="button-chatbot-call"
            >
              <Phone className="w-4 h-4" />
              <span className="text-xs">{language === "es" ? "Llamar" : language === "pt" ? "Ligar" : "Call"}</span>
            </Button>
          </div>
        </div>

        {/* Input */}
        <div className="p-3 bg-white dark:bg-card border-t border-gray-100 dark:border-card-border">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === "es" ? "Escribe tu mensaje..." : language === "pt" ? "Digite sua mensagem..." : "Type your message..."}
              className="flex-1 bg-gray-50 dark:bg-background border-gray-200 dark:border-input focus:border-accent focus:ring-accent/20"
              disabled={isStreaming}
              data-testid="input-chatbot-message"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="bg-accent text-primary shrink-0"
              disabled={!input.trim() || isStreaming}
              data-testid="button-chatbot-send"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </Button>
          </form>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            {language === "es" 
              ? "Potenciado por IA para recomendaciones personalizadas" 
              : language === "pt"
              ? "Potencializado por IA para recomendações personalizadas"
              : "AI-powered for personalized recommendations"}
          </p>
        </div>
      </div>
    </>
  );
}
