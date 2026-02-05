import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";

/**
 * HreflangTags Component
 *
 * Adds hreflang meta tags for international SEO.
 * Helps search engines understand which language versions exist for each page.
 *
 * @see https://developers.google.com/search/docs/specialty/international/localized-versions
 */
export function HreflangTags() {
  const [location] = useLocation();
  const baseUrl = "https://tripseuropa.com";

  // Remove language prefix from current path to get base path
  const basePath = location.replace(/^\/(es|en|pt|pt-br)/, '');

  return (
    <Helmet>
      {/* Spanish version */}
      <link
        rel="alternate"
        hreflang="es"
        href={`${baseUrl}/es${basePath}`}
      />

      {/* English version */}
      <link
        rel="alternate"
        hreflang="en"
        href={`${baseUrl}/en${basePath}`}
      />

      {/* Portuguese (Brazil) version */}
      <link
        rel="alternate"
        hreflang="pt-BR"
        href={`${baseUrl}/pt-br${basePath}`}
      />

      {/* Default fallback (x-default) */}
      <link
        rel="alternate"
        hreflang="x-default"
        href={`${baseUrl}${basePath || '/'}`}
      />
    </Helmet>
  );
}
