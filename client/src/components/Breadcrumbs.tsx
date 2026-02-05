import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumbs Component with Schema.org markup
 *
 * Benefits:
 * - Better UX and navigation
 * - Breadcrumb rich snippets in Google Search
 * - Improved internal linking structure
 * - Lower bounce rate
 * - Better crawlability
 *
 * SEO Best Practices:
 * - Semantic HTML with <nav> and <ol>
 * - Schema.org BreadcrumbList markup
 * - Microdata integration
 * - Proper heading hierarchy
 */
export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const { language } = useI18n();

  const homeLabel = {
    es: "Inicio",
    en: "Home",
    pt: "Início"
  }[language] || "Inicio";

  // Generate Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": homeLabel,
        "item": "https://tripseuropa.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://tripseuropa.com${item.href}`
      }))
    ]
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={`py-4 ${className}`}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <ol className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
          {/* Home */}
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-accent transition-colors"
              itemProp="item"
            >
              <Home className="w-4 h-4" />
              <span itemProp="name">{homeLabel}</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>

          {/* Breadcrumb Items */}
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const position = index + 2;

            return (
              <li
                key={item.href}
                className="flex items-center gap-2"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
                {isLast ? (
                  <span
                    className="font-medium text-foreground"
                    itemProp="name"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-accent transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}
                <meta itemProp="position" content={position.toString()} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/**
 * Generate breadcrumbs from current path
 */
export function generateBreadcrumbs(
  pathname: string,
  language: "es" | "en" | "pt"
): BreadcrumbItem[] {
  // Remove language prefix
  const cleanPath = pathname
    .replace(/^\/(es|en|pt-br|es-mx|es-co|es-ar|es-pe|es-pa|es-cr)/, "")
    .replace(/^\//, "");

  if (!cleanPath) return [];

  const segments = cleanPath.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Translations
  const translations: Record<string, Record<string, string>> = {
    destinations: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    destinos: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    packages: { es: "Paquetes", en: "Packages", pt: "Pacotes" },
    paquetes: { es: "Paquetes", en: "Packages", pt: "Pacotes" },
    blog: { es: "Blog", en: "Blog", pt: "Blog" },
    contact: { es: "Contacto", en: "Contact", pt: "Contato" },
    about: { es: "Nosotros", en: "About Us", pt: "Sobre Nós" },
  };

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label =
      translations[segment]?.[language] ||
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  return breadcrumbs;
}
