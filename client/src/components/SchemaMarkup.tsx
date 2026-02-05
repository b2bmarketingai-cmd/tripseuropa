import { useI18n } from "@/lib/i18n";

interface SchemaMarkupProps {
  type?: 'organization' | 'travelagency' | 'product' | 'breadcrumb';
  data?: any;
}

/**
 * SchemaMarkup component for SEO
 * Adds JSON-LD structured data for better search engine understanding
 * Supports Organization, TravelAgency, Product, and Breadcrumb schemas
 */
export default function SchemaMarkup({ type = 'organization', data }: SchemaMarkupProps) {
  const { language } = useI18n();

  // Base URL for the website
  const baseUrl = 'https://tripseuropa.com';

  // Organization schema (always present)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Trips Europa",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo-optimized.webp`,
      "width": 420,
      "height": 90
    },
    "description": language === 'pt'
      ? "Agência de viagens especializada em pacotes turísticos para a Europa desde a América Latina"
      : language === 'en'
      ? "Travel agency specialized in European tour packages from Latin America"
      : "Agencia de viajes especializada en paquetes turísticos a Europa desde Latinoamérica",
    "sameAs": [
      "https://www.facebook.com/tripseuropa",
      "https://www.instagram.com/tripseuropa",
      "https://twitter.com/tripseuropa",
      "https://www.linkedin.com/company/tripseuropa"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+57-1-234-5678",
        "contactType": "customer service",
        "areaServed": ["CO", "MX", "AR", "PE", "PA", "CR", "BR"],
        "availableLanguage": ["Spanish", "English", "Portuguese"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CO",
      "addressLocality": "Bogotá",
      "addressRegion": "Cundinamarca"
    }
  };

  // Travel Agency schema
  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${baseUrl}/#travelagency`,
    "name": "Trips Europa",
    "image": `${baseUrl}/logo-optimized.webp`,
    "url": baseUrl,
    "telephone": "+57-1-234-5678",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 4.7110,
      "longitude": -74.0721
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 4.7110,
        "longitude": -74.0721
      },
      "geoRadius": "10000000"
    }
  };

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Trips Europa",
    "description": language === 'pt'
      ? "Descubra a Europa com Trips Europa - Pacotes turísticos personalizados, ofertas exclusivas e experiências inesquecíveis nos melhores destinos europeus."
      : language === 'en'
      ? "Discover Europe with Trips Europa - Customized tour packages, exclusive offers and unforgettable experiences in the best European destinations."
      : "Descubre Europa con Trips Europa - Paquetes turísticos personalizados, ofertas exclusivas y experiencias inolvidables en los mejores destinos europeos.",
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["es", "en", "pt"]
  };

  // Product schema (for package pages)
  const getProductSchema = () => {
    if (!data) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": data.name,
      "description": data.description,
      "image": data.image,
      "brand": {
        "@type": "Brand",
        "name": "Trips Europa"
      },
      "offers": {
        "@type": "Offer",
        "url": `${baseUrl}${data.url}`,
        "priceCurrency": "USD",
        "price": data.price,
        "availability": "https://schema.org/InStock",
        "seller": {
          "@id": `${baseUrl}/#organization`
        }
      },
      "aggregateRating": data.rating ? {
        "@type": "AggregateRating",
        "ratingValue": data.rating.value,
        "reviewCount": data.rating.count
      } : undefined
    };
  };

  // Breadcrumb schema
  const getBreadcrumbSchema = () => {
    if (!data || !data.breadcrumb) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": data.breadcrumb.map((item: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `${baseUrl}${item.url}`
      }))
    };
  };

  // Select schema based on type
  let schema;
  switch (type) {
    case 'organization':
      schema = [organizationSchema, websiteSchema];
      break;
    case 'travelagency':
      schema = [organizationSchema, travelAgencySchema, websiteSchema];
      break;
    case 'product':
      schema = [organizationSchema, websiteSchema, getProductSchema()].filter(Boolean);
      break;
    case 'breadcrumb':
      schema = [organizationSchema, websiteSchema, getBreadcrumbSchema()].filter(Boolean);
      break;
    default:
      schema = [organizationSchema, websiteSchema];
  }

  return (
    <>
      {Array.isArray(schema) ? (
        schema.map((s, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))
      ) : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
}
