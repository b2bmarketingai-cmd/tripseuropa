import { useEffect, useRef } from "react";
import SchemaMarkup from "./SchemaMarkup";

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

const BASE_URL = "https://tripseuropa.com";

export const countryHreflangs = [
  { code: "BR", hreflang: "pt-BR", urlPrefix: "" },
  { code: "MX", hreflang: "es-MX", urlPrefix: "" },
  { code: "CO", hreflang: "es-CO", urlPrefix: "" },
  { code: "AR", hreflang: "es-AR", urlPrefix: "" },
  { code: "PE", hreflang: "es-PE", urlPrefix: "" },
  { code: "PA", hreflang: "es-PA", urlPrefix: "" },
  { code: "CR", hreflang: "es-CR", urlPrefix: "" },
  { code: "DO", hreflang: "es-DO", urlPrefix: "" },
  { code: "CB", hreflang: "es", urlPrefix: "" },
];

export function generateHreflangUrls(
  path: string,
): { hreflang: string; href: string }[] {
  const basePath = path || "";
  const enPath =
    path === "/" ? "" : path === "/destinos" ? "/destinations" : basePath;
  const urls: { hreflang: string; href: string }[] = [
    { hreflang: "x-default", href: `${BASE_URL}${basePath || "/"}` },
    { hreflang: "es", href: `${BASE_URL}${basePath || "/"}` },
    { hreflang: "en", href: `${BASE_URL}/en${enPath}` },
  ];

  countryHreflangs.forEach((country) => {
    if (country.code === "CB") {
      urls.push({
        hreflang: country.hreflang,
        href: `${BASE_URL}${country.urlPrefix}${basePath === "/" ? "" : basePath}`,
      });
    } else {
      urls.push({
        hreflang: country.hreflang,
        href: `${BASE_URL}${country.urlPrefix}${basePath === "/" ? "" : basePath}`,
      });
    }
  });

  return urls;
}

export function generateCountryHreflangUrls(
  path: string,
): { hreflang: string; href: string }[] {
  const basePath = path || "/";
  const urls: { hreflang: string; href: string }[] = [
    { hreflang: "x-default", href: `${BASE_URL}${basePath}` },
  ];

  countryHreflangs.forEach((country) => {
    urls.push({
      hreflang: country.hreflang,
      href: `${BASE_URL}${country.urlPrefix}${basePath}`,
    });
  });

  urls.push({ hreflang: "en", href: `${BASE_URL}/en${basePath}` });

  return urls;
}

export interface LocalizedSEO {
  title: string;
  description: string;
  keywords?: string;
}

export const homePageSEO: Record<string, LocalizedSEO> = {
  es: {
    title: "Viajes a Europa desde Latinoamérica - Paquetes Todo Incluido",
    description:
      "Trips Europa: Agencia de viajes premium especializada en paquetes turísticos a Europa desde Colombia, México, Brasil, Panamá y Argentina. Vuelos, hoteles 5 estrellas, tours en español y asistencia visa Schengen. Desde $1,200 USD.",
    keywords:
      "viajes a europa, paquetes europa, viaje europa desde colombia, europa desde mexico, tours europa español, visa schengen, luna de miel europa",
  },
  "es-MX": {
    title: "Viajes a Europa desde México - Trips Europa",
    description:
      "Paquetes turísticos a Europa para mexicanos. Vuelos, hoteles y tours personalizados. Reserva ahora con las mejores ofertas.",
    keywords:
      "viajes europa desde mexico, paquetes europa mexico, tours europa mexicanos",
  },
  "es-CO": {
    title: "Viajes a Europa desde Colombia - Trips Europa",
    description:
      "Paquetes turísticos a Europa para viajeros colombianos. Organiza tu viaje con expertos. Mejores precios garantizados.",
    keywords:
      "viajes europa desde colombia, paquetes europa colombia, visa schengen colombianos",
  },
  "es-AR": {
    title: "Viajes a Europa desde Argentina - Trips Europa",
    description:
      "Paquetes turísticos a Europa para argentinos. Vuelos desde Buenos Aires, tours en español y ciudadanía italiana/española.",
    keywords:
      "viajes europa desde argentina, paquetes europa argentina, ciudadania italiana argentina",
  },
  "es-PE": {
    title: "Viajes a Europa desde Perú - Trips Europa",
    description:
      "Paquetes turísticos a Europa para peruanos. Vuelos desde Lima, hoteles de lujo y experiencias únicas.",
    keywords:
      "viajes europa desde peru, paquetes europa peru, tours europa peruanos",
  },
  "pt-BR": {
    title: "Viagens para Europa - Trips Europa Brasil",
    description:
      "Pacotes turísticos para a Europa. Passagens aéreas, hotéis e passeios personalizados. Reserve online com as melhores ofertas.",
    keywords: "viagem europa brasil, pacotes europa brasil, passagens europa",
  },
  en: {
    title: "European Travel Packages - Trips Europa",
    description:
      "Premium travel agency specializing in European tour packages. Flights, 5-star hotels, Spanish-speaking guides, and Schengen visa assistance. From $1,200 USD.",
    keywords:
      "europe travel packages, european tours, flights to europe, luxury europe travel",
  },
};

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
      contentAttr: string,
    ) => {
      let el = document.querySelector(selector) as HTMLElement;
      const wasCreated = !el;

      if (!el) {
        el = document.createElement(tag);
        Object.entries(attrs).forEach(([key, value]) =>
          el.setAttribute(key, value),
        );
        document.head.appendChild(el);
      }

      const previousValue = wasCreated ? null : el.getAttribute(contentAttr);
      Object.entries(attrs).forEach(([key, value]) =>
        el.setAttribute(key, value),
      );

      savedStates.current.push({
        element: el,
        previousValue,
        wasCreated,
        attrName: contentAttr,
      });
    };

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      updateOrCreate(
        "meta",
        { [attr]: name, content },
        `meta[${attr}="${name}"]`,
        "content",
      );
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

    updateOrCreate(
      "link",
      { rel: "canonical", href: url },
      'link[rel="canonical"]',
      "href",
    );

    alternateUrls.forEach(({ hreflang, href }) => {
      updateOrCreate(
        "link",
        { rel: "alternate", hreflang, href },
        `link[rel="alternate"][hreflang="${hreflang}"]`,
        "href",
      );
    });

    return () => {
      document.title = previousTitle.current;
      savedStates.current.forEach(
        ({ element, previousValue, wasCreated, attrName }) => {
          if (wasCreated) {
            element.remove();
          } else if (previousValue !== null) {
            element.setAttribute(attrName, previousValue);
          }
        },
      );
      savedStates.current = [];
    };
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    locale,
    publishedTime,
    modifiedTime,
    author,
    noIndex,
    alternateUrls,
  ]);

  return <SchemaMarkup type="travelagency" />;
}

export function HomePageSEO() {
  const hreflangUrls = generateHreflangUrls("");
  return (
    <SEOHead
      title="Viajes a Europa desde Latinoamérica - Paquetes Todo Incluido"
      description="Trips Europa: Agencia de viajes premium especializada en paquetes turísticos a Europa desde Colombia, México, Brasil, Panamá y Argentina. Vuelos, hoteles 5 estrellas, tours en español y asistencia visa Schengen. Desde $1,200 USD."
      keywords="viajes a europa, paquetes europa, viaje europa desde colombia, europa desde mexico, tours europa español, visa schengen, luna de miel europa, vuelos europa latinoamérica"
      url="https://tripseuropa.com"
      alternateUrls={hreflangUrls}
    />
  );
}

export function PackagesPageSEO() {
  const hreflangUrls = generateHreflangUrls("/packages");
  return (
    <SEOHead
      title="Paquetes de Viaje a Europa - Tours Todo Incluido desde $1,200"
      description="Descubre nuestros paquetes de viaje a Europa: París romántico, circuito imperial, islas griegas, y más. Vuelos, hoteles 4-5 estrellas, tours guiados en español. Pagos en cuotas disponibles."
      keywords="paquetes viaje europa, tours europa, circuito europeo, luna de miel paris, islas griegas paquete, europa todo incluido"
      url="https://tripseuropa.com/packages"
      alternateUrls={hreflangUrls}
    />
  );
}

export function BlogPageSEO() {
  const hreflangUrls = generateHreflangUrls("/blog");
  return (
    <SEOHead
      title="Blog de Viajes - Guías, Consejos y Tips para Europa"
      description="Guías completas para tu viaje a Europa: cómo tramitar visa Schengen, presupuestos reales, itinerarios por ciudad, consejos de viajeros latinoamericanos."
      keywords="blog viajes europa, guía visa schengen, presupuesto europa, itinerario paris, consejos viaje europa"
      url="https://tripseuropa.com/blog"
      alternateUrls={hreflangUrls}
    />
  );
}

export function ColombiaPageSEO() {
  const hreflangUrls = generateCountryHreflangUrls("/desde-colombia");
  return (
    <SEOHead
      title="Viajes a Europa desde Colombia - Paquetes con Visa Schengen"
      description="Viaja a Europa desde Colombia con Trips Europa. Asistencia completa visa Schengen, vuelos desde Bogotá y Medellín, paquetes desde $4,299,000 COP. Tours en español garantizados."
      keywords="viajes europa desde colombia, visa schengen colombianos, paquetes europa colombia, vuelos bogotá europa"
      url="https://tripseuropa.com/desde-colombia"
      locale="es_CO"
      alternateUrls={hreflangUrls}
    />
  );
}

export function MexicoPageSEO() {
  const hreflangUrls = generateCountryHreflangUrls("/desde-mexico");
  return (
    <SEOHead
      title="Viajes a Europa desde México - Paquetes sin Visa hasta 12 MSI"
      description="Viaja a Europa desde México SIN VISA. Paquetes turísticos desde $22,999 MXN con vuelos desde CDMX. Pagos hasta 12 meses sin intereses. Tours en español."
      keywords="viajes europa desde méxico, mexicanos europa sin visa, paquetes europa méxico, vuelos cdmx europa"
      url="https://tripseuropa.com/desde-mexico"
      locale="es_MX"
      alternateUrls={hreflangUrls}
    />
  );
}

export function BrazilPageSEO() {
  const hreflangUrls = generateCountryHreflangUrls("/desde-brasil");
  return (
    <SEOHead
      title="Viagens para Europa do Brasil - Pacotes sem Visto"
      description="Viaje para Europa do Brasil SEM VISTO. Pacotes turísticos desde R$5,999. Voos diretos de São Paulo e Rio. Guias em português. Até 10x sem juros."
      keywords="viagem europa brasil, brasileiros europa sem visto, pacotes europa brasil, voos são paulo europa"
      url="https://tripseuropa.com/desde-brasil"
      locale="pt_BR"
      alternateUrls={hreflangUrls}
    />
  );
}

export function PanamaPageSEO() {
  const hreflangUrls = generateCountryHreflangUrls("/desde-panama");
  return (
    <SEOHead
      title="Viajes a Europa desde Panamá - Hub Aéreo Copa Airlines"
      description="Viaja a Europa desde Panamá con las mejores conexiones de Copa Airlines. Paquetes desde $1,199 USD. Sin visa para panameños. Tours VIP en español."
      keywords="viajes europa desde panamá, panameños europa, paquetes europa panamá, vuelos copa airlines europa"
      url="https://tripseuropa.com/desde-panama"
      locale="es_PA"
      alternateUrls={hreflangUrls}
    />
  );
}

export function ArgentinaPageSEO() {
  const hreflangUrls = generateCountryHreflangUrls("/desde-argentina");
  return (
    <SEOHead
      title="Viajes a Europa desde Argentina - Tours Ciudadanía y Turismo"
      description="Viaja a Europa desde Argentina SIN VISA. Paquetes desde $1,399 USD. Tours de ciudadanía italiana y española. Vuelos desde Buenos Aires. 12 cuotas sin interés."
      keywords="viajes europa desde argentina, argentinos europa sin visa, tour ciudadanía italia, paquetes europa argentina"
      url="https://tripseuropa.com/desde-argentina"
      locale="es_AR"
      alternateUrls={hreflangUrls}
    />
  );
}

export function PeruPageSEO() {
  const hreflangUrls = generateCountryHreflangUrls("/desde-peru");
  return (
    <SEOHead
      title="Viajes a Europa desde Perú - Paquetes Todo Incluido"
      description="Viaja a Europa desde Perú con Trips Europa. Paquetes turísticos desde Lima, vuelos directos, hoteles 4-5 estrellas y tours guiados en español."
      keywords="viajes europa desde perú, peruanos europa, paquetes europa perú, vuelos lima europa"
      url="https://tripseuropa.com/desde-peru"
      locale="es_PE"
      alternateUrls={hreflangUrls}
    />
  );
}

export function CostaRicaPageSEO() {
  const hreflangUrls = generateCountryHreflangUrls("/desde-costa-rica");
  return (
    <SEOHead
      title="Viajes a Europa desde Costa Rica - Paquetes Todo Incluido"
      description="Viaja a Europa desde Costa Rica SIN VISA. Paquetes turísticos desde San José, vuelos directos, hoteles de lujo y experiencias únicas. Tours en español."
      keywords="viajes europa desde costa rica, costarricenses europa, paquetes europa costa rica, vuelos san josé europa"
      url="https://tripseuropa.com/desde-costa-rica"
      locale="es_CR"
      alternateUrls={hreflangUrls}
    />
  );
}

export function DestinationsPageSEO() {
  const hreflangUrls = generateHreflangUrls("/destinos");
  return (
    <SEOHead
      title="Destinos Europa - Ciudades y Países para Visitar"
      description="Explora los mejores destinos de Europa: París, Roma, Barcelona, Londres, Ámsterdam y más. Guías completas, paquetes turísticos y consejos de viaje."
      keywords="destinos europa, ciudades europa, viajes europa, turismo europa, países europeos"
      url="https://tripseuropa.com/destinos"
      alternateUrls={hreflangUrls}
    />
  );
}

export function ContactPageSEO() {
  const hreflangUrls = generateHreflangUrls("/contact");
  return (
    <SEOHead
      title="Contacto - Cotiza tu Viaje a Europa"
      description="Contáctanos para cotizar tu viaje a Europa. Respuesta en 24 horas. Asesoría personalizada, pagos flexibles y tours en español."
      keywords="contacto trips europa, cotizar viaje europa, agencia viajes europa"
      url="https://tripseuropa.com/contact"
      alternateUrls={hreflangUrls}
    />
  );
}

export function TestimonialsPageSEO() {
  const hreflangUrls = generateHreflangUrls("/testimonios");
  return (
    <SEOHead
      title="Testimonios - Viajeros Satisfechos"
      description="Lee las experiencias de viajeros latinoamericanos que viajaron a Europa con Trips Europa. Historias reales, fotos y recomendaciones."
      keywords="testimonios trips europa, opiniones viajes europa, experiencias viajeros europa"
      url="https://tripseuropa.com/testimonios"
      alternateUrls={hreflangUrls}
    />
  );
}
