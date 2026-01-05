import OpenAI from "openai";

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

function getPerplexityClient(): OpenAI | null {
  if (!PERPLEXITY_API_KEY) {
    console.warn("[Perplexity] API key not configured - using fallback data");
    return null;
  }
  return new OpenAI({
    baseURL: "https://api.perplexity.ai",
    apiKey: PERPLEXITY_API_KEY,
  });
}

export interface SEOKeywordResearch {
  country: string;
  keywords: {
    keyword: string;
    searchVolume: string;
    difficulty: string;
    intent: string;
  }[];
  recommendations: string[];
}

export interface SEOContentBrief {
  title: string;
  metaDescription: string;
  h1: string;
  headings: string[];
  keywords: string[];
  contentOutline: string[];
  faq: { question: string; answer: string }[];
}

export interface CountryConfig {
  code: string;
  name: string;
  language: string;
  currency: string;
  currencySymbol: string;
  timeFormat: "12h" | "24h";
  dateFormat: string;
  phoneFormat: string;
  capitalCity: string;
  searchVolume: string;
  priority: "high" | "medium" | "low";
}

export const countryConfigs: Record<string, CountryConfig> = {
  CO: {
    code: "CO",
    name: "Colombia",
    language: "es-CO",
    currency: "COP",
    currencySymbol: "$",
    timeFormat: "12h",
    dateFormat: "DD/MM/YYYY",
    phoneFormat: "+57",
    capitalCity: "Bogotá",
    searchVolume: "18M+",
    priority: "high",
  },
  MX: {
    code: "MX",
    name: "México",
    language: "es-MX",
    currency: "MXN",
    currencySymbol: "$",
    timeFormat: "12h",
    dateFormat: "DD/MM/YYYY",
    phoneFormat: "+52",
    capitalCity: "Ciudad de México",
    searchVolume: "25M+",
    priority: "high",
  },
  BR: {
    code: "BR",
    name: "Brasil",
    language: "pt-BR",
    currency: "BRL",
    currencySymbol: "R$",
    timeFormat: "12h",
    dateFormat: "DD/MM/YYYY",
    phoneFormat: "+55",
    capitalCity: "São Paulo",
    searchVolume: "80M+",
    priority: "high",
  },
  AR: {
    code: "AR",
    name: "Argentina",
    language: "es-AR",
    currency: "ARS",
    currencySymbol: "$",
    timeFormat: "24h",
    dateFormat: "DD/MM/YYYY",
    phoneFormat: "+54",
    capitalCity: "Buenos Aires",
    searchVolume: "15M+",
    priority: "medium",
  },
  PE: {
    code: "PE",
    name: "Perú",
    language: "es-PE",
    currency: "PEN",
    currencySymbol: "S/",
    timeFormat: "12h",
    dateFormat: "DD/MM/YYYY",
    phoneFormat: "+51",
    capitalCity: "Lima",
    searchVolume: "10M+",
    priority: "medium",
  },
  PA: {
    code: "PA",
    name: "Panamá",
    language: "es-PA",
    currency: "USD",
    currencySymbol: "$",
    timeFormat: "12h",
    dateFormat: "DD/MM/YYYY",
    phoneFormat: "+507",
    capitalCity: "Ciudad de Panamá",
    searchVolume: "2M+",
    priority: "low",
  },
  CR: {
    code: "CR",
    name: "Costa Rica",
    language: "es-CR",
    currency: "CRC",
    currencySymbol: "₡",
    timeFormat: "12h",
    dateFormat: "DD/MM/YYYY",
    phoneFormat: "+506",
    capitalCity: "San José",
    searchVolume: "3M+",
    priority: "low",
  },
  DO: {
    code: "DO",
    name: "República Dominicana",
    language: "es-DO",
    currency: "DOP",
    currencySymbol: "RD$",
    timeFormat: "12h",
    dateFormat: "DD/MM/YYYY",
    phoneFormat: "+1",
    capitalCity: "Santo Domingo",
    searchVolume: "5M+",
    priority: "medium",
  },
  CB: {
    code: "CB",
    name: "Caribe",
    language: "es",
    currency: "USD",
    currencySymbol: "$",
    timeFormat: "12h",
    dateFormat: "DD/MM/YYYY",
    phoneFormat: "+1",
    capitalCity: "Región Caribe",
    searchVolume: "8M+",
    priority: "medium",
  },
};

const seoKeywordsByCountry: Record<string, string[]> = {
  CO: [
    "viajes a europa desde colombia",
    "paquetes turisticos europa colombia",
    "agencia de viajes bogota europa",
    "tours a europa desde bogota",
    "vuelos baratos europa colombia",
  ],
  MX: [
    "viajes a europa desde mexico",
    "paquetes todo incluido europa",
    "agencia de viajes mexico europa",
    "tours europa desde cdmx",
    "vuelos baratos a europa mexico",
  ],
  BR: [
    "viagens para europa brasil",
    "pacotes turisticos europa",
    "agencia viagens europa sao paulo",
    "passagens baratas europa",
    "roteiros europa brasileiros",
  ],
  AR: [
    "viajes a europa desde argentina",
    "paquetes europa buenos aires",
    "agencia viajes europa argentina",
    "vuelos europa desde ezeiza",
    "tours europa argentinos",
  ],
  PE: [
    "viajes a europa desde peru",
    "paquetes turisticos europa lima",
    "agencia viajes europa peru",
    "vuelos lima europa",
    "tours europa peruanos",
  ],
  PA: [
    "viajes a europa desde panama",
    "paquetes europa panama",
    "agencia viajes europa panama city",
    "vuelos panama europa",
    "tours europa panamenos",
  ],
  CR: [
    "viajes a europa desde costa rica",
    "paquetes europa san jose",
    "agencia viajes europa costa rica",
    "vuelos costa rica europa",
    "tours europa costarricenses",
  ],
  DO: [
    "viajes a europa republica dominicana",
    "paquetes europa santo domingo",
    "agencia viajes europa dominicana",
    "vuelos dominicana europa",
    "tours europa dominicanos",
  ],
  CB: [
    "viajes europa desde caribe",
    "paquetes turisticos europa caribe",
    "agencia viajes caribe europa",
    "vuelos caribe europa",
    "tours europa caribenos",
  ],
};

export async function researchKeywords(countryCode: string): Promise<SEOKeywordResearch> {
  const country = countryConfigs[countryCode];
  if (!country) {
    throw new Error(`Country code ${countryCode} not found`);
  }

  const baseKeywords = seoKeywordsByCountry[countryCode] || [];
  const perplexityClient = getPerplexityClient();

  if (!perplexityClient) {
    return {
      country: country.name,
      keywords: baseKeywords.map(k => ({
        keyword: k,
        searchVolume: "1K-10K",
        difficulty: "media",
        intent: "transaccional",
      })),
      recommendations: [
        `Crear contenido localizado para ${country.name}`,
        `Optimizar meta descripciones con moneda ${country.currency}`,
        `Incluir referencias culturales de ${country.name}`,
      ],
    };
  }

  try {
    const response = await perplexityClient.chat.completions.create({
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        {
          role: "system",
          content: `Eres un experto en SEO para agencias de viajes en ${country.name}. Analiza palabras clave para posicionamiento en Google ${country.name}.`,
        },
        {
          role: "user",
          content: `Investiga las mejores palabras clave SEO para una agencia de viajes a Europa desde ${country.name}. 
          
Palabras base: ${baseKeywords.join(", ")}

Proporciona un análisis JSON con:
1. keywords: array de objetos con keyword, searchVolume (estimado), difficulty (baja/media/alta), intent (informacional/transaccional/navegacional)
2. recommendations: 3-5 recomendaciones estratégicas

Responde SOLO en JSON válido sin markdown.`,
        },
      ],
      max_tokens: 1500,
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content || "";
    
    try {
      const parsed = JSON.parse(content);
      return {
        country: country.name,
        keywords: parsed.keywords || baseKeywords.map(k => ({
          keyword: k,
          searchVolume: "1K-10K",
          difficulty: "media",
          intent: "transaccional",
        })),
        recommendations: parsed.recommendations || [
          `Crear contenido localizado para ${country.name}`,
          `Optimizar meta descripciones con moneda ${country.currency}`,
          `Incluir referencias culturales de ${country.name}`,
        ],
      };
    } catch {
      return {
        country: country.name,
        keywords: baseKeywords.map(k => ({
          keyword: k,
          searchVolume: "1K-10K",
          difficulty: "media",
          intent: "transaccional",
        })),
        recommendations: [
          `Crear contenido localizado para ${country.name}`,
          `Optimizar meta descripciones con moneda ${country.currency}`,
          `Incluir referencias culturales de ${country.name}`,
        ],
      };
    }
  } catch (error) {
    console.error("Perplexity API error:", error);
    return {
      country: country.name,
      keywords: baseKeywords.map(k => ({
        keyword: k,
        searchVolume: "1K-10K",
        difficulty: "media",
        intent: "transaccional",
      })),
      recommendations: [
        `Crear contenido localizado para ${country.name}`,
        `Optimizar meta descripciones con moneda ${country.currency}`,
        `Incluir referencias culturales de ${country.name}`,
      ],
    };
  }
}

export async function generateContentBrief(
  countryCode: string,
  topic: string
): Promise<SEOContentBrief> {
  const country = countryConfigs[countryCode];
  if (!country) {
    throw new Error(`Country code ${countryCode} not found`);
  }

  const perplexityClient = getPerplexityClient();

  if (!perplexityClient) {
    return {
      title: `${topic} - Viajes a Europa desde ${country.name}`,
      metaDescription: `Descubre ${topic} con los mejores paquetes de viaje a Europa desde ${country.name}. Precios en ${country.currency}.`,
      h1: `${topic} para Viajeros de ${country.name}`,
      headings: [
        `Por qué elegir ${topic}`,
        "Mejores destinos incluidos",
        `Precios y paquetes en ${country.currency}`,
        "Cómo reservar",
      ],
      keywords: seoKeywordsByCountry[countryCode] || [],
      contentOutline: [
        "Introducción al destino",
        "Itinerario detallado",
        "Precios y opciones",
        "Consejos de viaje",
        "FAQ",
      ],
      faq: [
        {
          question: `¿Cuánto cuesta viajar a Europa desde ${country.name}?`,
          answer: `Los paquetes desde ${country.name} comienzan en ${country.currencySymbol}2,500 USD aproximadamente.`,
        },
        {
          question: "¿Necesito visa para Europa?",
          answer: "Depende de tu nacionalidad. Te asesoramos con todos los requisitos.",
        },
        {
          question: "¿Qué incluyen los paquetes?",
          answer: "Vuelos, hoteles, traslados y asistencia 24/7 en español.",
        },
      ],
    };
  }

  try {
    const response = await perplexityClient.chat.completions.create({
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        {
          role: "system",
          content: `Eres un experto en SEO y contenido para ${country.language === "pt-BR" ? "brasileños" : "latinoamericanos de " + country.name}. Genera briefs de contenido optimizados para Google.`,
        },
        {
          role: "user",
          content: `Genera un brief de contenido SEO sobre "${topic}" para viajeros de ${country.name} que quieren ir a Europa.

Incluye:
- title: título SEO optimizado (máx 60 caracteres)
- metaDescription: meta descripción (máx 155 caracteres)
- h1: encabezado principal
- headings: array de H2/H3 sugeridos
- keywords: palabras clave a incluir
- contentOutline: esquema del contenido
- faq: 3-5 preguntas frecuentes con respuestas cortas

Usa ${country.language === "pt-BR" ? "português brasileiro" : "español de " + country.name} con expresiones locales.
Incluye referencias a ${country.currency} y contexto cultural.

Responde SOLO en JSON válido sin markdown.`,
        },
      ],
      max_tokens: 2000,
      temperature: 0.4,
    });

    const content = response.choices[0]?.message?.content || "";
    
    try {
      return JSON.parse(content);
    } catch {
      return {
        title: `${topic} - Viajes a Europa desde ${country.name}`,
        metaDescription: `Descubre ${topic} con los mejores paquetes de viaje a Europa desde ${country.name}. Precios en ${country.currency}.`,
        h1: `${topic} para Viajeros de ${country.name}`,
        headings: [
          `Por qué elegir ${topic}`,
          "Mejores destinos incluidos",
          `Precios y paquetes en ${country.currency}`,
          "Cómo reservar",
        ],
        keywords: seoKeywordsByCountry[countryCode] || [],
        contentOutline: [
          "Introducción al destino",
          "Itinerario detallado",
          "Precios y opciones",
          "Consejos de viaje",
          "FAQ",
        ],
        faq: [
          {
            question: `¿Cuánto cuesta viajar a Europa desde ${country.name}?`,
            answer: `Los paquetes desde ${country.name} comienzan en ${country.currencySymbol}2,500 USD aproximadamente.`,
          },
          {
            question: "¿Necesito visa para Europa?",
            answer: "Depende de tu nacionalidad. Te asesoramos con todos los requisitos.",
          },
          {
            question: "¿Qué incluyen los paquetes?",
            answer: "Vuelos, hoteles, traslados y asistencia 24/7 en español.",
          },
        ],
      };
    }
  } catch (error) {
    console.error("Perplexity content brief error:", error);
    return {
      title: `${topic} - Viajes a Europa desde ${country.name}`,
      metaDescription: `Descubre ${topic} con los mejores paquetes de viaje a Europa desde ${country.name}. Precios en ${country.currency}.`,
      h1: `${topic} para Viajeros de ${country.name}`,
      headings: [
        `Por qué elegir ${topic}`,
        "Mejores destinos incluidos",
        `Precios y paquetes en ${country.currency}`,
        "Cómo reservar",
      ],
      keywords: seoKeywordsByCountry[countryCode] || [],
      contentOutline: [
        "Introducción al destino",
        "Itinerario detallado",
        "Precios y opciones",
        "Consejos de viaje",
        "FAQ",
      ],
      faq: [
        {
          question: `¿Cuánto cuesta viajar a Europa desde ${country.name}?`,
          answer: `Los paquetes desde ${country.name} comienzan en ${country.currencySymbol}2,500 USD aproximadamente.`,
        },
        {
          question: "¿Necesito visa para Europa?",
          answer: "Depende de tu nacionalidad. Te asesoramos con todos los requisitos.",
        },
        {
          question: "¿Qué incluyen los paquetes?",
          answer: "Vuelos, hoteles, traslados y asistencia 24/7 en español.",
        },
      ],
    };
  }
}

export async function analyzeCompetitor(
  competitorUrl: string,
  countryCode: string
): Promise<{
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  keywords: string[];
}> {
  const country = countryConfigs[countryCode];
  const perplexityClient = getPerplexityClient();

  if (!perplexityClient) {
    return {
      strengths: ["Presencia establecida en el mercado"],
      weaknesses: ["Falta de localización regional"],
      opportunities: ["Contenido más personalizado por país"],
      keywords: seoKeywordsByCountry[countryCode] || [],
    };
  }

  try {
    const response = await perplexityClient.chat.completions.create({
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        {
          role: "user",
          content: `Analiza la estrategia SEO del competidor ${competitorUrl} para el mercado de viajes a Europa desde ${country?.name || countryCode}.

Proporciona:
- strengths: fortalezas SEO identificadas
- weaknesses: debilidades y oportunidades de mejora
- opportunities: oportunidades para superarlos
- keywords: palabras clave que están usando

Responde SOLO en JSON válido sin markdown.`,
        },
      ],
      max_tokens: 1500,
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content || "";
    
    try {
      return JSON.parse(content);
    } catch {
      return {
        strengths: ["Presencia establecida en el mercado"],
        weaknesses: ["Falta de localización regional"],
        opportunities: ["Contenido más personalizado por país"],
        keywords: seoKeywordsByCountry[countryCode] || [],
      };
    }
  } catch (error) {
    console.error("Perplexity competitor analysis error:", error);
    return {
      strengths: ["Presencia establecida en el mercado"],
      weaknesses: ["Falta de localización regional"],
      opportunities: ["Contenido más personalizado por país"],
      keywords: seoKeywordsByCountry[countryCode] || [],
    };
  }
}

export { countryConfigs as countries, seoKeywordsByCountry };
