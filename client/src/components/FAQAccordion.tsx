import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { FAQ_CATEGORIES } from "@/lib/faqData";

export function FAQAccordion() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { language } = useI18n();

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const lang = (language?.split('-')[0] || "es") as "es" | "en" | "pt";

  const content = {
    es: {
      badge: "Preguntas Frecuentes",
      title: "Resolvemos Tus Dudas",
      subtitle: "Encuentra respuestas a las preguntas más comunes sobre nuestros servicios de viaje",
      allCategories: "Todas las Preguntas",
    },
    en: {
      badge: "FAQ",
      title: "We Answer Your Questions",
      subtitle: "Find answers to the most common questions about our travel services",
      allCategories: "All Questions",
    },
    pt: {
      badge: "Perguntas Frequentes",
      title: "Resolvemos Suas Dúvidas",
      subtitle: "Encontre respostas para as perguntas mais comuns sobre nossos serviços de viagem",
      allCategories: "Todas as Perguntas",
    },
  };

  const c = content[lang] || content.es;

  const totalQuestions = FAQ_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0);

  const filteredCategories = activeCategory === "all"
    ? FAQ_CATEGORIES
    : FAQ_CATEGORIES.filter(cat => cat.key === activeCategory);

  return (
    <section className="py-24 bg-gray-50" data-testid="section-faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" data-testid="badge-faq">
            {c.badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-accent mb-4" data-testid="text-faq-title">
            {c.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-faq-subtitle">
            {c.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto" data-testid="faq-category-tabs">
          <button
            onClick={() => { setActiveCategory("all"); setOpenItems([]); }}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border",
              activeCategory === "all"
                ? "bg-accent text-white border-accent shadow-md"
                : "bg-white text-gray-700 border-gray-200 hover:border-accent/50 hover:text-accent"
            )}
            data-testid="btn-faq-all"
          >
            <span>⭐</span>
            <span>{c.allCategories}</span>
            <span className={cn(
              "ml-1 text-xs px-1.5 py-0.5 rounded-full",
              activeCategory === "all" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
            )}>({totalQuestions})</span>
          </button>
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setOpenItems([]); }}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border",
                activeCategory === cat.key
                  ? "bg-accent text-white border-accent shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:border-accent/50 hover:text-accent"
              )}
              data-testid={`btn-faq-${cat.key}`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label[lang]}</span>
              <span className={cn(
                "ml-1 text-xs px-1.5 py-0.5 rounded-full",
                activeCategory === cat.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              )}>({cat.items.length})</span>
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {filteredCategories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-6">
              <h3 className="text-2xl font-bold text-primary border-b pb-2 flex items-center gap-2">
                <span>{cat.icon}</span>
                {cat.label[lang]}
              </h3>
              <div className="space-y-4">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      aria-expanded={openItems.includes(item.id)}
                      data-testid={`btn-faq-item-${item.id}`}
                    >
                      <span className="font-semibold text-primary pr-8">
                        {item.question[lang]}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300",
                          openItems.includes(item.id) && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300",
                        openItems.includes(item.id) ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                          {item.answer[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
