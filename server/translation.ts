import OpenAI from "openai";

const openRouterClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

interface TranslationRequest {
  text: string;
  sourceLanguage: "es" | "en" | "pt";
  targetLanguage: "es" | "en" | "pt" | "pt-BR";
  context?: string;
}

interface LocalizationConfig {
  currency: string;
  currencySymbol: string;
  timeFormat: "12h" | "24h";
  dateFormat: string;
  culturalContext: string;
}

const localizationConfigs: Record<string, LocalizationConfig> = {
  "es": {
    currency: "EUR",
    currencySymbol: "€",
    timeFormat: "24h",
    dateFormat: "DD/MM/YYYY",
    culturalContext: "España - uso de vosotros, español peninsular"
  },
  "es-CO": {
    currency: "COP",
    currencySymbol: "$",
    timeFormat: "12h",
    dateFormat: "DD/MM/YYYY",
    culturalContext: "Colombia - uso de usted formal, español latinoamericano"
  },
  "es-MX": {
    currency: "MXN",
    currencySymbol: "$",
    timeFormat: "12h",
    dateFormat: "DD/MM/YYYY",
    culturalContext: "México - uso de usted, español mexicano"
  },
  "es-AR": {
    currency: "ARS",
    currencySymbol: "$",
    timeFormat: "24h",
    dateFormat: "DD/MM/YYYY",
    culturalContext: "Argentina - uso de vos, español rioplatense"
  },
  "en": {
    currency: "USD",
    currencySymbol: "$",
    timeFormat: "12h",
    dateFormat: "MM/DD/YYYY",
    culturalContext: "English - American English, formal business tone"
  },
  "pt": {
    currency: "EUR",
    currencySymbol: "€",
    timeFormat: "24h",
    dateFormat: "DD/MM/YYYY",
    culturalContext: "Portugal - português europeu, uso de tu/você formal"
  },
  "pt-BR": {
    currency: "BRL",
    currencySymbol: "R$",
    timeFormat: "12h",
    dateFormat: "DD/MM/YYYY",
    culturalContext: "Brasil - português brasileiro, uso de você, tom informal"
  }
};

export async function translateText(request: TranslationRequest): Promise<string> {
  const config = localizationConfigs[request.targetLanguage] || localizationConfigs["en"];
  
  const systemPrompt = `You are a professional translator specializing in travel and tourism content. 
Your task is to translate and LOCALIZE content, not just translate literally.

CRITICAL RULES:
1. PRESERVE all Spanish accents correctly: á, é, í, ó, ú, ñ, ü
2. ADAPT cultural references for the target audience
3. Use the appropriate formality level for the target culture
4. Adapt currency references to: ${config.currency} (${config.currencySymbol})
5. Use ${config.timeFormat} time format
6. Cultural context: ${config.culturalContext}

For Portuguese translations:
- Portugal (pt): Use "tu" and European Portuguese vocabulary (e.g., "reserva teu voo")
- Brazil (pt-BR): Use "você" and Brazilian Portuguese vocabulary (e.g., "reserve seu voo")

For Spanish translations:
- Ensure all accents are correct: España (not Espana), París (not Paris), información (not informacion)
- Common words that MUST have accents: también, después, aquí, allí, más, día, país, etc.

Return ONLY the translated text, no explanations.`;

  try {
    const response = await openRouterClient.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: `Translate the following ${request.sourceLanguage} text to ${request.targetLanguage}:\n\n${request.text}${request.context ? `\n\nContext: ${request.context}` : ''}` 
        }
      ],
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content?.trim() || request.text;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}

export async function translateBatch(
  texts: Record<string, string>,
  sourceLanguage: "es" | "en" | "pt",
  targetLanguage: "es" | "en" | "pt" | "pt-BR"
): Promise<Record<string, string>> {
  const config = localizationConfigs[targetLanguage] || localizationConfigs["en"];
  
  const textEntries = Object.entries(texts);
  const textBlock = textEntries.map(([key, value]) => `[${key}]: ${value}`).join("\n");
  
  const systemPrompt = `You are a professional translator for a premium travel agency website.
Translate all the following key-value pairs from ${sourceLanguage} to ${targetLanguage}.

LOCALIZATION REQUIREMENTS:
- Currency: ${config.currency} (${config.currencySymbol})
- Time format: ${config.timeFormat}
- Date format: ${config.dateFormat}
- Cultural context: ${config.culturalContext}

CRITICAL RULES:
1. PRESERVE the [key]: format exactly
2. For Spanish: ALL accents must be correct (á, é, í, ó, ú, ñ)
3. Adapt formality and cultural references
4. Keep the same tone (professional, luxurious travel)
5. For Portuguese Brazil vs Portugal, use appropriate vocabulary

Return the translations in the same [key]: value format.`;

  try {
    const response = await openRouterClient.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: textBlock }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    });

    const resultText = response.choices[0]?.message?.content || "";
    const result: Record<string, string> = {};
    
    const lines = resultText.split("\n");
    for (const line of lines) {
      const match = line.match(/^\[([^\]]+)\]:\s*(.+)$/);
      if (match) {
        result[match[1]] = match[2].trim();
      }
    }
    
    return result;
  } catch (error) {
    console.error("Batch translation error:", error);
    throw error;
  }
}

export async function auditSpanishContent(text: string): Promise<{
  corrected: string;
  issues: Array<{ original: string; corrected: string; type: string }>;
}> {
  const systemPrompt = `You are a Spanish language expert auditing content for a travel website.

Check and correct:
1. Missing accents on words that require them (á, é, í, ó, ú, ñ, ü)
2. Common spelling mistakes in Spanish
3. Incorrect use of haber/a ver, hay/ahí/ay
4. Country and city names must have correct accents (España, París, Múnich, etc.)

Return a JSON object with:
- "corrected": the corrected text
- "issues": array of {original, corrected, type} for each fix made

If no issues found, return the original text with empty issues array.`;

  try {
    const response = await openRouterClient.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Audit this Spanish text:\n\n${text}` }
      ],
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0]?.message?.content || "{}");
    return {
      corrected: result.corrected || text,
      issues: result.issues || []
    };
  } catch (error) {
    console.error("Audit error:", error);
    return { corrected: text, issues: [] };
  }
}

export { localizationConfigs };
