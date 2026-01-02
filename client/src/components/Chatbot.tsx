import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Plane, Hotel, Map, Heart, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatbot } from "@/hooks/use-chatbot";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const QUICK_ACTIONS = [
  {
    icon: Plane,
    label: { es: "Vuelos a Europa", en: "Flights to Europe" },
    message: { es: "Quiero información sobre vuelos a Europa desde Colombia", en: "I want information about flights to Europe from Colombia" }
  },
  {
    icon: Hotel,
    label: { es: "Hoteles de Lujo", en: "Luxury Hotels" },
    message: { es: "Recomiéndame los mejores hoteles de lujo en París", en: "Recommend the best luxury hotels in Paris" }
  },
  {
    icon: Map,
    label: { es: "Destinos Populares", en: "Popular Destinations" },
    message: { es: "¿Cuáles son los destinos más populares de Europa?", en: "What are the most popular destinations in Europe?" }
  },
  {
    icon: Heart,
    label: { es: "Luna de Miel", en: "Honeymoon" },
    message: { es: "Busco destinos románticos para luna de miel en Europa", en: "I'm looking for romantic honeymoon destinations in Europe" }
  },
  {
    icon: Users,
    label: { es: "Viaje en Familia", en: "Family Trip" },
    message: { es: "¿Qué destinos europeos recomiendas para viajar con niños?", en: "What European destinations do you recommend for traveling with children?" }
  },
  {
    icon: Calendar,
    label: { es: "Visa Schengen", en: "Schengen Visa" },
    message: { es: "¿Qué necesito saber sobre la visa Schengen para colombianos?", en: "What do I need to know about the Schengen visa for Colombians?" }
  }
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useI18n();
  
  const { messages, sendMessage, isStreaming } = useChatbot();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-white font-bold font-display">Europa - Asistente de Viaje</h3>
            <p className="text-accent text-xs">
              {language === "es" ? "Tu concierge personal" : "Your personal concierge"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-background">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="text-center text-muted-foreground mt-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bot className="w-8 h-8 text-accent" />
                </div>
                <p className="text-sm font-medium mb-1">
                  {language === "es" ? "¡Hola! Soy Europa" : "Hi! I'm Europa"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === "es" 
                    ? "Tu asistente de viaje personalizado. ¿En qué puedo ayudarte hoy?" 
                    : "Your personalized travel assistant. How can I help you today?"}
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

        {/* Input */}
        <div className="p-3 bg-white dark:bg-card border-t border-gray-100 dark:border-card-border">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === "es" ? "Escribe tu mensaje..." : "Type your message..."}
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
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            {language === "es" 
              ? "Potenciado por IA para recomendaciones personalizadas" 
              : "AI-powered for personalized recommendations"}
          </p>
        </div>
      </div>
    </>
  );
}
