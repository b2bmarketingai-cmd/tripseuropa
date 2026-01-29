import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const homeLabels = {
  es: "Inicio",
  en: "Home",
  pt: "Início"
};

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const { language } = useI18n();
  const homeLabel = homeLabels[language as keyof typeof homeLabels] || homeLabels.es;
  const langPrefix = language === 'es' ? '' : `/${language === 'pt' ? 'pt-br' : language}`;

  const breadcrumbItems = [
    { label: homeLabel, href: langPrefix || "/" },
    ...items
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && { "item": `https://tripseuropa.com${item.href}` })
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav 
        aria-label="Breadcrumb" 
        className={`py-3 px-4 bg-gray-100 dark:bg-gray-800 ${className}`}
        data-testid="nav-breadcrumbs"
      >
        <ol 
          className="flex flex-wrap items-center gap-1 text-sm"
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isFirst = index === 0;

            return (
              <li 
                key={index}
                className="flex items-center gap-1"
                itemScope 
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
              >
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                )}
                {isLast ? (
                  <span 
                    className="text-foreground font-medium"
                    itemProp="name"
                    aria-current="page"
                    data-testid={`breadcrumb-current-${index}`}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href || "/"}
                    className="text-muted-foreground hover-elevate transition-colors flex items-center gap-1"
                    itemProp="item"
                    data-testid={`breadcrumb-link-${index}`}
                  >
                    {isFirst && <Home className="w-4 h-4" aria-hidden="true" />}
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export function generateBreadcrumbs(pathname: string, language: string): BreadcrumbItem[] {
  const langPrefix = language === 'es' ? '' : `/${language === 'pt' ? 'pt-br' : language}`;
  const pathWithoutLang = pathname.replace(/^\/(en|pt-br)/, '');
  const segments = pathWithoutLang.split('/').filter(Boolean);

  const breadcrumbLabels: Record<string, Record<string, string>> = {
    destinations: { es: "Destinos", en: "Destinations", pt: "Destinos" },
    packages: { es: "Paquetes", en: "Packages", pt: "Pacotes" },
    blog: { es: "Blog", en: "Blog", pt: "Blog" },
    about: { es: "Sobre Nosotros", en: "About Us", pt: "Sobre Nós" },
    contact: { es: "Contacto", en: "Contact", pt: "Contato" },
    offers: { es: "Ofertas", en: "Offers", pt: "Ofertas" },
    experiences: { es: "Experiencias", en: "Experiences", pt: "Experiências" }
  };

  const items: BreadcrumbItem[] = [];
  let currentPath = langPrefix;

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = breadcrumbLabels[segment]?.[language] || 
                  segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    
    const isLast = index === segments.length - 1;
    items.push({
      label,
      href: isLast ? undefined : currentPath
    });
  });

  return items;
}
