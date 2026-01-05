import OpenAI from "openai";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

function getOpenRouterClient(): OpenAI | null {
  if (!OPENROUTER_API_KEY) {
    console.warn("[ContentGenerator] OpenRouter API key not configured");
    return null;
  }
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: OPENROUTER_API_KEY,
  });
}

interface ContentGenerationRequest {
  type: "blog" | "landing" | "package" | "destination" | "meta";
  language: "es" | "en" | "pt-BR";
  topic: string;
  country?: string;
  keywords?: string[];
}

interface GeneratedContent {
  title: string;
  metaDescription: string;
  content: string;
  headings?: string[];
  keywords?: string[];
}

const languagePrompts: Record<string, string> = {
  "es": "Escribe en español latinoamericano profesional, usando 'usted' formal. Incluye acentos correctos.",
  "en": "Write in professional American English with a warm, inviting tone.",
  "pt-BR": "Escreva em português brasileiro, usando 'você'. Tom profissional mas acolhedor. Inclua acentos e cedilhas corretos.",
};

const countryContexts: Record<string, string> = {
  "CO": "Colombia - viajeros colombianos, precios en COP o USD, referencias a Bogotá, Medellín, Cali",
  "MX": "México - viajeros mexicanos, precios en MXN o USD, referencias a CDMX, Guadalajara, Monterrey",
  "BR": "Brasil - viajantes brasileiros, preços em BRL, referências a São Paulo, Rio de Janeiro, Brasília",
  "AR": "Argentina - viajeros argentinos, precios en ARS o USD, referencias a Buenos Aires, Córdoba",
  "PE": "Perú - viajeros peruanos, precios en PEN o USD, referencias a Lima, Cusco",
  "PA": "Panamá - viajeros panameños, precios en USD, referencias a Ciudad de Panamá",
  "CR": "Costa Rica - viajeros costarricenses, precios en CRC o USD, referencias a San José",
  "DO": "República Dominicana - viajeros dominicanos, precios en DOP o USD, referencias a Santo Domingo",
  "CB": "Caribe - viajeros caribeños, precios en USD, referencias a múltiples islas",
};

export async function generateSEOContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
  const client = getOpenRouterClient();
  const langPrompt = languagePrompts[request.language] || languagePrompts["es"];
  const countryContext = request.country ? countryContexts[request.country] || "" : "";

  const systemPrompt = `Eres un experto en SEO y marketing de contenidos para una agencia de viajes premium especializada en Europa.
${langPrompt}

REGLAS CRÍTICAS:
1. Genera contenido 100% original y optimizado para SEO
2. Incluye las palabras clave de forma natural
3. Usa headings H2 y H3 estructurados
4. El meta description debe tener entre 150-160 caracteres
5. El título debe tener entre 50-60 caracteres
6. Incluye CTAs persuasivos como "Solicitar Orçamento" (PT-BR) o "Cotizar Viaje" (ES)
${countryContext ? `7. Contexto del país objetivo: ${countryContext}` : ""}

Responde SIEMPRE en formato JSON válido con esta estructura:
{
  "title": "Título SEO optimizado",
  "metaDescription": "Meta descripción de 150-160 caracteres",
  "content": "Contenido completo en HTML con headings h2/h3",
  "headings": ["H2 1", "H2 2", "H3 1"],
  "keywords": ["keyword1", "keyword2"]
}`;

  const typePrompts: Record<string, string> = {
    blog: `Genera un artículo de blog de 800-1000 palabras sobre: ${request.topic}
    Incluye: introducción, 3-4 secciones con H2, conclusión con CTA`,
    
    landing: `Genera contenido para una landing page sobre: ${request.topic}
    Incluye: headline hero, propuesta de valor, beneficios, testimonials placeholder, CTA final`,
    
    package: `Genera descripción de paquete turístico: ${request.topic}
    Incluye: descripción atractiva, itinerario resumido, qué incluye, precio sugerido, CTA`,
    
    destination: `Genera contenido para página de destino: ${request.topic}
    Incluye: descripción del destino, mejores épocas, atracciones principales, consejos, CTA`,
    
    meta: `Genera solo título SEO y meta description para: ${request.topic}`,
  };

  const userPrompt = `${typePrompts[request.type] || typePrompts.blog}

Palabras clave a incluir: ${request.keywords?.join(", ") || "viajes europa, paquetes turísticos, vacaciones"}

Idioma: ${request.language}`;

  if (!client) {
    return getFallbackContent(request);
  }

  try {
    const response = await client.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || "";
    
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as GeneratedContent;
      }
    } catch (parseError) {
      console.error("[ContentGenerator] JSON parse error:", parseError);
    }
    
    return getFallbackContent(request);
  } catch (error) {
    console.error("[ContentGenerator] API error:", error);
    return getFallbackContent(request);
  }
}

function getFallbackContent(request: ContentGenerationRequest): GeneratedContent {
  const fallbacks: Record<string, Record<string, GeneratedContent>> = {
    "pt-BR": {
      default: {
        title: `${request.topic} - Viagens para Europa | Trips Europa`,
        metaDescription: `Descubra ${request.topic} com os melhores pacotes de viagem para Europa. Solicite seu orçamento grátis hoje!`,
        content: `<h2>Descubra ${request.topic}</h2>
<p>A Trips Europa oferece as melhores experiências de viagem para a Europa. Com mais de 15 anos de experiência, somos especialistas em criar roteiros personalizados para viajantes brasileiros.</p>
<h3>Por que escolher a Trips Europa?</h3>
<ul>
<li>Atendimento em português 24/7</li>
<li>Pacotes personalizados</li>
<li>Melhores preços garantidos</li>
<li>Suporte durante toda a viagem</li>
</ul>
<h3>Solicite seu Orçamento</h3>
<p>Entre em contato conosco e receba uma proposta personalizada em até 24 horas.</p>`,
        headings: ["Descubra " + request.topic, "Por que escolher a Trips Europa?", "Solicite seu Orçamento"],
        keywords: ["viagens europa", "pacotes europa", "turismo europa", request.topic.toLowerCase()],
      },
    },
    "es": {
      default: {
        title: `${request.topic} - Viajes a Europa | Trips Europa`,
        metaDescription: `Descubre ${request.topic} con los mejores paquetes de viaje a Europa. Solicita tu cotización gratis hoy.`,
        content: `<h2>Descubre ${request.topic}</h2>
<p>Trips Europa ofrece las mejores experiencias de viaje a Europa. Con más de 15 años de experiencia, somos especialistas en crear itinerarios personalizados.</p>
<h3>¿Por qué elegir Trips Europa?</h3>
<ul>
<li>Atención en español 24/7</li>
<li>Paquetes personalizados</li>
<li>Mejores precios garantizados</li>
<li>Soporte durante todo el viaje</li>
</ul>
<h3>Cotiza tu Viaje</h3>
<p>Contáctanos y recibe una propuesta personalizada en menos de 24 horas.</p>`,
        headings: ["Descubre " + request.topic, "¿Por qué elegir Trips Europa?", "Cotiza tu Viaje"],
        keywords: ["viajes europa", "paquetes europa", "turismo europa", request.topic.toLowerCase()],
      },
    },
    "en": {
      default: {
        title: `${request.topic} - Travel to Europe | Trips Europa`,
        metaDescription: `Discover ${request.topic} with the best travel packages to Europe. Request your free quote today!`,
        content: `<h2>Discover ${request.topic}</h2>
<p>Trips Europa offers the best travel experiences to Europe. With over 15 years of experience, we specialize in creating personalized itineraries.</p>
<h3>Why Choose Trips Europa?</h3>
<ul>
<li>24/7 English Support</li>
<li>Personalized packages</li>
<li>Best prices guaranteed</li>
<li>Support throughout your trip</li>
</ul>
<h3>Get Your Quote</h3>
<p>Contact us and receive a personalized proposal within 24 hours.</p>`,
        headings: ["Discover " + request.topic, "Why Choose Trips Europa?", "Get Your Quote"],
        keywords: ["europe travel", "europe packages", "europe tourism", request.topic.toLowerCase()],
      },
    },
  };

  return fallbacks[request.language]?.default || fallbacks["es"].default;
}

export async function translateContent(
  content: string,
  sourceLanguage: "es" | "en" | "pt",
  targetLanguage: "es" | "en" | "pt-BR"
): Promise<string> {
  const client = getOpenRouterClient();

  if (!client) {
    return content;
  }

  const systemPrompt = `You are a professional translator specializing in travel and tourism content.
Translate the following content from ${sourceLanguage} to ${targetLanguage}.
${languagePrompts[targetLanguage] || ""}
Maintain the same formatting, HTML tags, and structure.
Return ONLY the translated content, no explanations.`;

  try {
    const response = await client.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: content },
      ],
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content?.trim() || content;
  } catch (error) {
    console.error("[ContentGenerator] Translation error:", error);
    return content;
  }
}

export async function generateSchemaMarkup(
  type: "TravelAgency" | "Product" | "FAQPage",
  data: Record<string, any>,
  language: "es" | "en" | "pt-BR"
): Promise<object> {
  const baseSchema = {
    "@context": "https://schema.org",
    "@language": language,
  };

  switch (type) {
    case "TravelAgency":
      return {
        ...baseSchema,
        "@type": "TravelAgency",
        name: "Trips Europa",
        description: language === "pt-BR" 
          ? "Agência de viagens especializada em pacotes turísticos para a Europa"
          : language === "en"
          ? "Travel agency specialized in tour packages to Europe"
          : "Agencia de viajes especializada en paquetes turísticos a Europa",
        url: `https://tripseuropa.co/${language === "pt-BR" ? "pt-br" : language}`,
        telephone: data.phone || "+57 601 234 5678",
        email: data.email || "contato@tripseuropa.co",
        address: data.address || {
          "@type": "PostalAddress",
          addressCountry: data.country || "CO",
        },
        areaServed: ["Brasil", "Colombia", "México", "Argentina", "Perú", "Panamá", "Costa Rica", "República Dominicana"],
        availableLanguage: ["es", "en", "pt-BR"],
      };

    case "Product":
      return {
        ...baseSchema,
        "@type": "Product",
        name: data.name,
        description: data.description,
        image: data.image,
        offers: {
          "@type": "Offer",
          url: data.url,
          priceCurrency: data.currency || "USD",
          price: data.price,
          availability: "https://schema.org/InStock",
        },
      };

    case "FAQPage":
      return {
        ...baseSchema,
        "@type": "FAQPage",
        mainEntity: (data.faqs || []).map((faq: { question: string; answer: string }) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };

    default:
      return baseSchema;
  }
}
