import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type VariantType = "A" | "B" | "C";

interface Experiment {
  id: string;
  name: string;
  variants: {
    [key in VariantType]?: {
      config: Record<string, any>;
      weight: number;
    };
  };
  isActive: boolean;
}

interface ABTestingContextType {
  getVariant: (experimentId: string) => VariantType;
  getConfig: <T>(experimentId: string, defaultConfig: T) => T;
  trackImpression: (experimentId: string) => void;
  trackConversion: (experimentId: string) => void;
}

const experiments: Record<string, Experiment> = {
  "cta-urgency": {
    id: "cta-urgency",
    name: "CTA Urgency Test",
    variants: {
      A: {
        config: {
          text: "Cotizar mi viaje",
          showUrgency: false,
          urgencyText: "",
        },
        weight: 33,
      },
      B: {
        config: {
          text: "Cotizar ahora - Últimas ofertas",
          showUrgency: true,
          urgencyText: "Solo 2 cupos disponibles",
        },
        weight: 33,
      },
      C: {
        config: {
          text: "Habla con un experto gratis",
          showUrgency: true,
          urgencyText: "45 viajeros reservaron hoy",
        },
        weight: 34,
      },
    },
    isActive: true,
  },
  "form-steps": {
    id: "form-steps",
    name: "Form Steps Test",
    variants: {
      A: {
        config: {
          steps: 1,
          fields: ["name", "email", "phone", "destination", "dates"],
        },
        weight: 50,
      },
      B: {
        config: {
          steps: 2,
          fields: ["name", "email", "phone"],
        },
        weight: 50,
      },
    },
    isActive: true,
  },
  "hero-headline": {
    id: "hero-headline",
    name: "Hero Headline Test",
    variants: {
      A: {
        config: {
          headline: "Vive Europa Como Nunca Antes",
          subheadline: "Experiencias exclusivas diseñadas para ti",
        },
        weight: 50,
      },
      B: {
        config: {
          headline: "Tu Viaje a Europa Empieza Aquí",
          subheadline: "15,000+ viajeros felices desde Latinoamérica",
        },
        weight: 50,
      },
    },
    isActive: true,
  },
  "pricing-display": {
    id: "pricing-display",
    name: "Pricing Display Test",
    variants: {
      A: {
        config: {
          showFrom: true,
          format: "desde $X",
          showSavings: false,
        },
        weight: 50,
      },
      B: {
        config: {
          showFrom: true,
          format: "$X total",
          showSavings: true,
          savingsText: "Ahorra $500",
        },
        weight: 50,
      },
    },
    isActive: true,
  },
};

function getStoredVariant(experimentId: string): VariantType | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(`ab_${experimentId}`);
  return stored as VariantType | null;
}

function storeVariant(experimentId: string, variant: VariantType): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`ab_${experimentId}`, variant);
}

function selectVariant(experiment: Experiment): VariantType {
  const random = Math.random() * 100;
  let cumulative = 0;
  
  for (const [variant, config] of Object.entries(experiment.variants)) {
    cumulative += config?.weight || 0;
    if (random <= cumulative) {
      return variant as VariantType;
    }
  }
  
  return "A";
}

const ABTestingContext = createContext<ABTestingContextType | undefined>(undefined);

export function ABTestingProvider({ children }: { children: ReactNode }) {
  const [userVariants, setUserVariants] = useState<Record<string, VariantType>>({});

  useEffect(() => {
    const variants: Record<string, VariantType> = {};
    
    for (const [id, experiment] of Object.entries(experiments)) {
      if (!experiment.isActive) continue;
      
      let variant = getStoredVariant(id);
      if (!variant) {
        variant = selectVariant(experiment);
        storeVariant(id, variant);
      }
      variants[id] = variant;
    }
    
    setUserVariants(variants);
  }, []);

  const getVariant = (experimentId: string): VariantType => {
    return userVariants[experimentId] || "A";
  };

  const getConfig = <T,>(experimentId: string, defaultConfig: T): T => {
    const experiment = experiments[experimentId];
    if (!experiment || !experiment.isActive) return defaultConfig;
    
    const variant = getVariant(experimentId);
    const variantConfig = experiment.variants[variant]?.config;
    
    return variantConfig ? { ...defaultConfig, ...variantConfig } : defaultConfig;
  };

  const trackImpression = (experimentId: string): void => {
    const variant = getVariant(experimentId);
    
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "experiment_impression", {
        experiment_id: experimentId,
        variant: variant,
      });
    }

  };

  const trackConversion = (experimentId: string): void => {
    const variant = getVariant(experimentId);

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "experiment_conversion", {
        experiment_id: experimentId,
        variant: variant,
      });
    }
  };

  return (
    <ABTestingContext.Provider value={{ getVariant, getConfig, trackImpression, trackConversion }}>
      {children}
    </ABTestingContext.Provider>
  );
}

export function useABTesting() {
  const context = useContext(ABTestingContext);
  if (!context) {
    throw new Error("useABTesting must be used within ABTestingProvider");
  }
  return context;
}

export function useExperiment<T>(experimentId: string, defaultConfig: T) {
  const { getConfig, getVariant, trackImpression, trackConversion } = useABTesting();
  
  useEffect(() => {
    trackImpression(experimentId);
  }, [experimentId]);
  
  return {
    config: getConfig(experimentId, defaultConfig),
    variant: getVariant(experimentId),
    trackConversion: () => trackConversion(experimentId),
  };
}
