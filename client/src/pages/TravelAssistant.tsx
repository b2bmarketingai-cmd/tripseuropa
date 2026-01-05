import { useState, useRef, useEffect } from "react";
import { Send, Bot, Plane, Hotel, Map, Heart, Users, Calendar, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useChatbot } from "@/hooks/use-chatbot";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { SEOHead } from "@/components/SEOHead";

const QUICK_ACTIONS = [
  {
    icon: Plane,
    label: { es: "Vuelos a Europa", en: "Flights to Europe", pt: "Voos para Europa" },
    message: { es: "Quiero información sobre vuelos a Europa desde Colombia", en: "I want information about flights to Europe from Colombia", pt: "Quero informacoes sobre voos para Europa desde o Brasil" },
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  },
  {
    icon: Hotel,
    label: { es: "Hoteles de Lujo", en: "Luxury Hotels", pt: "Hoteis de Luxo" },
    message: { es: "Recomiéndame los mejores hoteles de lujo en París", en: "Recommend the best luxury hotels in Paris", pt: "Recomende os melhores hoteis de luxo em Paris" },
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
  },
  {
    icon: Map,
    label: { es: "Destinos Populares", en: "Popular Destinations", pt: "Destinos Populares" },
    message: { es: "¿Cuáles son los destinos más populares de Europa para visitar?", en: "What are the most popular destinations in Europe to visit?", pt: "Quais são os destinos mais populares da Europa para visitar?" },
    color: "bg-green-500/10 text-green-600 dark:text-green-400"
  },
  {
    icon: Heart,
    label: { es: "Luna de Miel", en: "Honeymoon", pt: "Lua de Mel" },
    message: { es: "Busco destinos románticos para luna de miel en Europa", en: "I'm looking for romantic honeymoon destinations in Europe", pt: "Procuro destinos romanticos para lua de mel na Europa" },
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400"
  },
  {
    icon: Users,
    label: { es: "Viaje en Familia", en: "Family Trip", pt: "Viagem em Familia" },
    message: { es: "¿Qué destinos europeos recomiendas para viajar con niños?", en: "What European destinations do you recommend for traveling with children?", pt: "Quais destinos europeus voce recomenda para viajar com criancas?" },
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
  },
  {
    icon: Calendar,
    label: { es: "Visa Schengen", en: "Schengen Visa", pt: "Visto Schengen" },
    message: { es: "¿Qué necesito saber sobre la visa Schengen para colombianos?", en: "What do I need to know about the Schengen visa for Colombians?", pt: "O que preciso saber sobre o visto Schengen para brasileiros?" },
    color: "bg-teal-500/10 text-teal-600 dark:text-teal-400"
  }
];

const SUGGESTED_PROMPTS = [
  { es: "¿Cuál es la mejor época para visitar Italia?", en: "What's the best time to visit Italy?", pt: "Qual e a melhor epoca para visitar a Italia?" },
  { es: "Recomiéndame un itinerario de 10 días por España", en: "Recommend a 10-day itinerary for Spain", pt: "Recomende um roteiro de 10 dias pela Espanha" },
  { es: "¿Qué ciudades europeas tienen la mejor gastronomía?", en: "Which European cities have the best gastronomy?", pt: "Quais cidades europeias tem a melhor gastronomia?" },
  { es: "Quiero planear un viaje a los Alpes suizos", en: "I want to plan a trip to the Swiss Alps", pt: "Quero planejar uma viagem aos Alpes suicos" }
];

export default function TravelAssistant() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead 
        title={language === "es" ? "Asistente de Viaje IA | Trips Europa" : language === "pt" ? "Assistente de Viagem IA | Trips Europa" : "AI Travel Assistant | Trips Europa"}
        description={language === "es" 
          ? "Obtén recomendaciones personalizadas de viaje a Europa con nuestro asistente de inteligencia artificial."
          : language === "pt"
          ? "Obtenha recomendações personalizadas de viagem para Europa com nosso assistente de inteligência artificial."
          : "Get personalized European travel recommendations with our AI-powered assistant."}
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4 gap-2">
              <ArrowLeft className="w-4 h-4" />
              {language === "es" ? "Volver al inicio" : language === "pt" ? "Voltar ao início" : "Back to home"}
            </Button>
          </Link>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-accent" data-testid="text-assistant-title">
                Europa
              </h1>
              <p className="text-muted-foreground">
                {language === "es" ? "Tu Asistente de Viaje con IA" : language === "pt" ? "Seu Assistente de Viagem com IA" : "Your AI Travel Assistant"}
              </p>
            </div>
          </div>
          
          <Badge className="bg-accent/10 text-accent border-accent/30 gap-1">
            <Sparkles className="w-3 h-3" />
            {language === "es" ? "Potenciado por Inteligencia Artificial" : language === "pt" ? "Potencializado por Inteligência Artificial" : "Powered by Artificial Intelligence"}
          </Badge>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Chat Area */}
          <Card className="mb-6" data-testid="container-chat-area">
            <CardContent className="p-0">
              {/* Messages */}
              <div 
                className="h-[400px] md:h-[500px] overflow-y-auto p-6 space-y-4 bg-muted/30"
                data-testid="container-messages"
              >
                {messages.length === 0 ? (
                  <div className="space-y-6">
                    {/* Welcome Message */}
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bot className="w-10 h-10 text-accent" />
                      </div>
                      <h2 className="text-xl font-display font-bold mb-2">
                        {language === "es" ? "¡Hola! Soy Europa" : language === "pt" ? "Olá! Sou Europa" : "Hi! I'm Europa"}
                      </h2>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        {language === "es" 
                          ? "Tu asistente de viaje personalizado. Puedo ayudarte a planificar tu viaje perfecto a Europa, recomendarte destinos, hoteles y experiencias únicas." 
                          : language === "pt"
                          ? "Seu assistente de viagem personalizado. Posso ajudá-lo a planejar sua viagem perfeita para Europa, recomendar destinos, hotéis e experiências únicas."
                          : "Your personalized travel assistant. I can help you plan your perfect trip to Europe, recommend destinations, hotels, and unique experiences."}
                      </p>
                    </div>
                    
                    {/* Quick Actions */}
                    <div>
                      <p className="text-sm text-muted-foreground text-center mb-4">
                        {language === "es" ? "Comienza con una de estas opciones:" : language === "pt" ? "Comece com uma destas opções:" : "Start with one of these options:"}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {QUICK_ACTIONS.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickAction(action.message[language])}
                            className={cn(
                              "flex items-center gap-3 p-4 bg-card rounded-xl border border-card-border text-left hover:border-accent hover:shadow-md transition-all",
                              isStreaming && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={isStreaming}
                            data-testid={`button-quick-action-${idx}`}
                          >
                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", action.color)}>
                              <action.icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium">{action.label[language]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={cn(
                          "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed animate-in slide-in-from-bottom-2 duration-300",
                          msg.role === "user" 
                            ? "bg-primary text-white ml-auto rounded-tr-none" 
                            : "bg-card border border-card-border text-foreground mr-auto rounded-tl-none shadow-sm"
                        )}
                        data-testid={`message-${msg.role}-${idx}`}
                      >
                        {msg.role === "assistant" && (
                          <div className="flex items-center gap-2 mb-2 text-accent">
                            <Bot className="w-4 h-4" />
                            <span className="text-xs font-medium">Europa</span>
                          </div>
                        )}
                        <div className="whitespace-pre-wrap">
                          {msg.content || (
                            <div className="flex gap-1 h-5 items-center px-1">
                              <span className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                              <span className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                              <span className="w-2 h-2 bg-accent rounded-full animate-bounce"></span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-card-border bg-card">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={language === "es" 
                      ? "Pregúntame sobre destinos, hoteles, vuelos..." 
                      : language === "pt"
                      ? "Pergunte sobre destinos, hoteis, voos..."
                      : "Ask me about destinations, hotels, flights..."}
                    className="flex-1"
                    disabled={isStreaming}
                    data-testid="input-assistant-message"
                  />
                  <Button 
                    type="submit" 
                    className="bg-accent text-primary gap-2"
                    disabled={!input.trim() || isStreaming}
                    data-testid="button-assistant-send"
                  >
                    <Send className="w-4 h-4" />
                    {language === "es" ? "Enviar" : language === "pt" ? "Enviar" : "Send"}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Prompts */}
          {messages.length > 0 && (
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-3">
                {language === "es" ? "Sugerencias:" : language === "pt" ? "Sugestões:" : "Suggestions:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(prompt[language])}
                    disabled={isStreaming}
                    className="text-xs"
                    data-testid={`button-suggestion-${idx}`}
                  >
                    {prompt[language]}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Sparkles className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-medium mb-1">
                  {language === "es" ? "Recomendaciones Personalizadas" : language === "pt" ? "Recomendações Personalizadas" : "Personalized Recommendations"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {language === "es" 
                    ? "Obtén sugerencias adaptadas a tus preferencias" 
                    : language === "pt"
                    ? "Obtenha sugestões adaptadas às suas preferências"
                    : "Get suggestions tailored to your preferences"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Map className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-medium mb-1">
                  {language === "es" ? "Experto en Europa" : language === "pt" ? "Especialista em Europa" : "Europe Expert"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {language === "es" 
                    ? "Conocimiento profundo de destinos europeos" 
                    : language === "pt"
                    ? "Conhecimento profundo de destinos europeus"
                    : "Deep knowledge of European destinations"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-medium mb-1">
                  {language === "es" ? "Servicio Premium" : language === "pt" ? "Serviço Premium" : "Premium Service"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {language === "es" 
                    ? "Nuestros asesores pueden completar tu reserva" 
                    : language === "pt"
                    ? "Nossos consultores podem completar sua reserva"
                    : "Our advisors can complete your booking"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
