import { useState, useRef, useEffect } from "react";
import { Send, Plane, Hotel, Map, Heart, Users, Calendar, Sparkles, ArrowLeft } from "lucide-react";
import sofiaAvatar from "@assets/generated_images/professional_european_travel_advisor_sofia.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

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
    label: { es: "Paquetes a Europa", en: "Europe Packages", pt: "Pacotes para Europa" },
    message: { es: "Hola Sofia, quiero conocer los paquetes turísticos disponibles para viajar a Europa", en: "Hi Sofia, I want to know about available travel packages to Europe", pt: "Olá Sofia, quero conhecer os pacotes turísticos disponíveis para viajar à Europa" },
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  },
  {
    icon: Map,
    label: { es: "Destinos Populares", en: "Popular Destinations", pt: "Destinos Populares" },
    message: { es: "¿Cuáles son los destinos más populares de Europa? Me interesan París, Barcelona y Roma", en: "What are the most popular destinations in Europe? I'm interested in Paris, Barcelona and Rome", pt: "Quais são os destinos mais populares da Europa? Tenho interesse em Paris, Barcelona e Roma" },
    color: "bg-green-500/10 text-green-600 dark:text-green-400"
  },
  {
    icon: Heart,
    label: { es: "Luna de Miel", en: "Honeymoon", pt: "Lua de Mel" },
    message: { es: "Busco destinos románticos para luna de miel en Europa. ¿Qué me recomiendas?", en: "I'm looking for romantic honeymoon destinations in Europe. What do you recommend?", pt: "Procuro destinos românticos para lua de mel na Europa. O que você recomenda?" },
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400"
  },
  {
    icon: Users,
    label: { es: "Viaje en Familia", en: "Family Trip", pt: "Viagem em Família" },
    message: { es: "¿Qué destinos europeos recomiendas para viajar con niños? Somos una familia de 4", en: "What European destinations do you recommend for traveling with children? We are a family of 4", pt: "Quais destinos europeus você recomenda para viajar com crianças? Somos uma família de 4" },
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
  },
  {
    icon: Calendar,
    label: { es: "Documentación", en: "Documentation", pt: "Documentação" },
    message: { es: "¿Qué documentos necesito para viajar a Europa? ¿Necesito visa Schengen?", en: "What documents do I need to travel to Europe? Do I need a Schengen visa?", pt: "Quais documentos preciso para viajar à Europa? Preciso de visto Schengen?" },
    color: "bg-teal-500/10 text-teal-600 dark:text-teal-400"
  },
  {
    icon: Hotel,
    label: { es: "Cotización", en: "Quote", pt: "Cotação" },
    message: { es: "Quiero una cotización personalizada para un viaje a Europa de 10 días", en: "I want a personalized quote for a 10-day trip to Europe", pt: "Quero uma cotação personalizada para uma viagem à Europa de 10 dias" },
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
  }
];

const SUGGESTED_PROMPTS = [
  { es: "¿Cuál es la mejor época para visitar Italia?", en: "What's the best time to visit Italy?", pt: "Qual é a melhor época para visitar a Itália?" },
  { es: "¿Cuánto cuesta un viaje de 10 días a Europa?", en: "How much does a 10-day trip to Europe cost?", pt: "Quanto custa uma viagem de 10 dias à Europa?" },
  { es: "¿Qué incluyen los paquetes turísticos?", en: "What do the travel packages include?", pt: "O que os pacotes turísticos incluem?" },
  { es: "Quiero hablar con un asesor de viajes", en: "I want to speak with a travel advisor", pt: "Quero falar com um consultor de viagens" }
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
        title={language === "es" ? "Sofia - Asesora de Viajes IA | Trips Europa" : language === "pt" ? "Sofia - Consultora de Viagens IA | Trips Europa" : "Sofia - AI Travel Advisor | Trips Europa"}
        description={language === "es" 
          ? "Chatea con Sofia, nuestra asesora de viajes con inteligencia artificial. Obtén recomendaciones personalizadas de paquetes turísticos a Europa."
          : language === "pt"
          ? "Converse com Sofia, nossa consultora de viagens com inteligência artificial. Obtenha recomendações personalizadas de pacotes turísticos para Europa."
          : "Chat with Sofia, our AI-powered travel advisor. Get personalized recommendations for European travel packages."}
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
            <img 
              src={sofiaAvatar} 
              alt="Sofia - Travel Advisor"
              className="w-16 h-16 rounded-full object-cover border-2 border-accent"
            />
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-accent" data-testid="text-assistant-title">
                Sofia
              </h1>
              <p className="text-muted-foreground">
                {language === "es" ? "Tu Asesora de Viajes a Europa" : language === "pt" ? "Sua Consultora de Viagens para Europa" : "Your European Travel Advisor"}
              </p>
            </div>
          </div>
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
                      <img 
                        src={sofiaAvatar} 
                        alt="Sofia - Travel Advisor"
                        className="w-20 h-20 rounded-full object-cover border-2 border-accent mx-auto mb-4"
                      />
                      <h2 className="text-xl font-display font-bold mb-2">
                        {language === "es" ? "¡Hola! Soy Sofia" : language === "pt" ? "Olá! Sou a Sofia" : "Hi! I'm Sofia"}
                      </h2>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        {language === "es" 
                          ? "Tu asesora de viajes especializada en Europa. Puedo ayudarte a planificar tu viaje perfecto, recomendarte paquetes turísticos, destinos y experiencias únicas para viajeros latinoamericanos." 
                          : language === "pt"
                          ? "Sua consultora de viagens especializada em Europa. Posso ajudá-lo a planejar sua viagem perfeita, recomendar pacotes turísticos, destinos e experiências únicas para viajantes latino-americanos."
                          : "Your specialized European travel advisor. I can help you plan your perfect trip, recommend travel packages, destinations, and unique experiences for Latin American travelers."}
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
                            <img src={sofiaAvatar} alt="Sofia" className="w-5 h-5 rounded-full object-cover" />
                            <span className="text-xs font-medium">Sofia</span>
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
                  {language === "es" ? "Paquetes Personalizados" : language === "pt" ? "Pacotes Personalizados" : "Personalized Packages"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {language === "es" 
                    ? "Obtén cotizaciones adaptadas a tu presupuesto" 
                    : language === "pt"
                    ? "Obtenha cotações adaptadas ao seu orçamento"
                    : "Get quotes tailored to your budget"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Map className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-medium mb-1">
                  {language === "es" ? "Especialistas en Europa" : language === "pt" ? "Especialistas em Europa" : "Europe Specialists"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {language === "es" 
                    ? "Experiencia en viajes desde Latinoamérica" 
                    : language === "pt"
                    ? "Experiência em viagens desde a América Latina"
                    : "Experience in trips from Latin America"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-medium mb-1">
                  {language === "es" ? "Atención 24/7" : language === "pt" ? "Atendimento 24/7" : "24/7 Support"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {language === "es" 
                    ? "Conecta con un asesor humano cuando lo necesites" 
                    : language === "pt"
                    ? "Conecte-se com um consultor humano quando precisar"
                    : "Connect with a human advisor when you need"}
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
