import { useEffect, useRef, useCallback } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  locale?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
  alternateUrls?: { hreflang: string; href: string }[];
}

interface SavedState {
  element: HTMLElement;
  previousValue: string | null;
  wasCreated: boolean;
  attrName: string;
}

export function SEOHead({
  title,
  description,
  keywords,
  image = "https://tripseuropa.com/og-image.jpg",
  url = "https://tripseuropa.com",
  type = "website",
  locale = "es_CO",
  publishedTime,
  modifiedTime,
  author = "Trips Europa",
  noIndex = false,
  alternateUrls = [],
}: SEOHeadProps) {
  const savedStates = useRef<SavedState[]>([]);
  const previousTitle = useRef<string>("");

  useEffect(() => {
    previousTitle.current = document.title;
    document.title = `${title} | Trips Europa`;

    const updateOrCreate = (
      tag: string,
      attrs: Record<string, string>,
      selector: string,
      contentAttr: string
    ) => {
      let el = document.querySelector(selector) as HTMLElement;
      const wasCreated = !el;
      
      if (!el) {
        el = document.createElement(tag);
        Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
        document.head.appendChild(el);
      }
      
      const previousValue = wasCreated ? null : el.getAttribute(contentAttr);
      Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
      
      savedStates.current.push({ element: el, previousValue, wasCreated, attrName: contentAttr });
    };

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      updateOrCreate("meta", { [attr]: name, content }, `meta[${attr}="${name}"]`, "content");
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow");

    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", image, true);
    setMeta("og:url", url, true);
    setMeta("og:type", type, true);
    setMeta("og:locale", locale, true);
    setMeta("og:site_name", "Trips Europa", true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);

    if (type === "article" && publishedTime) {
      setMeta("article:published_time", publishedTime, true);
      if (modifiedTime) setMeta("article:modified_time", modifiedTime, true);
      if (author) setMeta("article:author", author, true);
    }

    updateOrCreate("link", { rel: "canonical", href: url }, 'link[rel="canonical"]', "href");

    alternateUrls.forEach(({ hreflang, href }) => {
      updateOrCreate("link", { rel: "alternate", hreflang, href }, `link[rel="alternate"][hreflang="${hreflang}"]`, "href");
    });

    return () => {
      document.title = previousTitle.current;
      savedStates.current.forEach(({ element, previousValue, wasCreated, attrName }) => {
        if (wasCreated) {
          element.remove();
        } else if (previousValue !== null) {
          element.setAttribute(attrName, previousValue);
        }
      });
      savedStates.current = [];
    };
  }, [title, description, keywords, image, url, type, locale, publishedTime, modifiedTime, author, noIndex, alternateUrls]);

  return null;
}

export function HomePageSEO() {
  return (
    <SEOHead
      title="Viajes a Europa desde Latinoamerica - Paquetes Todo Incluido"
      description="Trips Europa: Agencia de viajes premium especializada en paquetes turisticos a Europa desde Colombia, Mexico, Brasil, Panama y Argentina. Vuelos, hoteles 5 estrellas, tours en espanol y asistencia visa Schengen. Desde $1,200 USD."
      keywords="viajes a europa, paquetes europa, viaje europa desde colombia, europa desde mexico, tours europa espanol, visa schengen, luna de miel europa, vuelos europa latinoamerica"
      url="https://tripseuropa.com"
    />
  );
}

export function PackagesPageSEO() {
  return (
    <SEOHead
      title="Paquetes de Viaje a Europa - Tours Todo Incluido desde $1,200"
      description="Descubre nuestros paquetes de viaje a Europa: Paris romantico, circuito imperial, islas griegas, y mas. Vuelos, hoteles 4-5 estrellas, tours guiados en espanol. Pagos en cuotas disponibles."
      keywords="paquetes viaje europa, tours europa, circuito europeo, luna de miel paris, islas griegas paquete, europa todo incluido"
      url="https://tripseuropa.com/packages"
    />
  );
}

export function BlogPageSEO() {
  return (
    <SEOHead
      title="Blog de Viajes - Guias, Consejos y Tips para Europa"
      description="Guias completas para tu viaje a Europa: como tramitar visa Schengen, presupuestos reales, itinerarios por ciudad, consejos de viajeros latinoamericanos."
      keywords="blog viajes europa, guia visa schengen, presupuesto europa, itinerario paris, consejos viaje europa"
      url="https://tripseuropa.com/blog"
    />
  );
}

export function ColombiaPageSEO() {
  return (
    <SEOHead
      title="Viajes a Europa desde Colombia - Paquetes con Visa Schengen"
      description="Viaja a Europa desde Colombia con Trips Europa. Asistencia completa visa Schengen, vuelos desde Bogota y Medellin, paquetes desde $4,299,000 COP. Tours en espanol garantizados."
      keywords="viajes europa desde colombia, visa schengen colombianos, paquetes europa colombia, vuelos bogota europa"
      url="https://tripseuropa.com/desde-colombia"
      locale="es_CO"
    />
  );
}

export function MexicoPageSEO() {
  return (
    <SEOHead
      title="Viajes a Europa desde Mexico - Paquetes sin Visa hasta 12 MSI"
      description="Viaja a Europa desde Mexico SIN VISA. Paquetes turisticos desde $22,999 MXN con vuelos desde CDMX. Pagos hasta 12 meses sin intereses. Tours en espanol."
      keywords="viajes europa desde mexico, mexicanos europa sin visa, paquetes europa mexico, vuelos cdmx europa"
      url="https://tripseuropa.com/desde-mexico"
      locale="es_MX"
    />
  );
}

export function BrazilPageSEO() {
  return (
    <SEOHead
      title="Viagens para Europa do Brasil - Pacotes sem Visto"
      description="Viaje para Europa do Brasil SEM VISTO. Pacotes turisticos desde R$5,999. Voos diretos de Sao Paulo e Rio. Guias em portugues. Ate 10x sem juros."
      keywords="viagem europa brasil, brasileiros europa sem visto, pacotes europa brasil, voos sao paulo europa"
      url="https://tripseuropa.com/desde-brasil"
      locale="pt_BR"
    />
  );
}

export function PanamaPageSEO() {
  return (
    <SEOHead
      title="Viajes a Europa desde Panama - Hub Aereo Copa Airlines"
      description="Viaja a Europa desde Panama con las mejores conexiones de Copa Airlines. Paquetes desde $1,199 USD. Sin visa para panamenos. Tours VIP en espanol."
      keywords="viajes europa desde panama, panamenos europa, paquetes europa panama, vuelos copa airlines europa"
      url="https://tripseuropa.com/desde-panama"
      locale="es_PA"
    />
  );
}

export function ArgentinaPageSEO() {
  return (
    <SEOHead
      title="Viajes a Europa desde Argentina - Tours Ciudadania y Turismo"
      description="Viaja a Europa desde Argentina SIN VISA. Paquetes desde $1,399 USD. Tours de ciudadania italiana y espanola. Vuelos desde Buenos Aires. 12 cuotas sin interes."
      keywords="viajes europa desde argentina, argentinos europa sin visa, tour ciudadania italia, paquetes europa argentina"
      url="https://tripseuropa.com/desde-argentina"
      locale="es_AR"
    />
  );
}

export function PeruPageSEO() {
  return (
    <SEOHead
      title="Viajes a Europa desde Peru - Paquetes Todo Incluido"
      description="Viaja a Europa desde Peru con Trips Europa. Paquetes turisticos desde Lima, vuelos directos, hoteles 4-5 estrellas y tours guiados en espanol."
      keywords="viajes europa desde peru, peruanos europa, paquetes europa peru, vuelos lima europa"
      url="https://tripseuropa.com/desde-peru"
      locale="es_PE"
    />
  );
}

export function CostaRicaPageSEO() {
  return (
    <SEOHead
      title="Viajes a Europa desde Costa Rica - Paquetes Todo Incluido"
      description="Viaja a Europa desde Costa Rica SIN VISA. Paquetes turisticos desde San Jose, vuelos directos, hoteles de lujo y experiencias unicas. Tours en espanol."
      keywords="viajes europa desde costa rica, costarricenses europa, paquetes europa costa rica, vuelos san jose europa"
      url="https://tripseuropa.com/desde-costa-rica"
      locale="es_CR"
    />
  );
}
