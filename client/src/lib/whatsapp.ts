export const WHATSAPP_NUMBER = "34611105448";

export const openWhatsAppQuote = (context: { es: string; en: string; pt: string }, language: string) => {
  const localizedContext = context[language as keyof typeof context] || context.es;
  const messages = {
    es: `Hola! Estoy interesado en ${localizedContext}. Me gustaria recibir mas informacion.`,
    en: `Hello! I'm interested in ${localizedContext}. I would like more information.`,
    pt: `Ola! Estou interessado em ${localizedContext}. Gostaria de receber mais informacoes.`
  };
  const message = messages[language as keyof typeof messages] || messages.es;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
};

export const openWhatsAppCustomQuote = (language: string) => {
  const messages = {
    es: "Hola! Me gustaria solicitar una cotizacion personalizada para un viaje a Europa. Mis preferencias son:",
    en: "Hello! I would like to request a custom quote for a trip to Europe. My preferences are:",
    pt: "Ola! Gostaria de solicitar um orcamento personalizado para uma viagem a Europa. Minhas preferencias sao:"
  };
  const message = messages[language as keyof typeof messages] || messages.es;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
};

export const openWhatsAppWithMessage = (messageKey: { es: string; en: string; pt: string }, language: string) => {
  const message = messageKey[language as keyof typeof messageKey] || messageKey.es;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
};
