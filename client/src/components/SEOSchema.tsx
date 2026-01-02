export function TravelAgencySchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Trips Europa",
    "alternateName": "Trips Europa - Viajes a Europa desde Latinoamerica",
    "description": "Agencia de viajes premium especializada en paquetes turisticos a Europa desde Colombia, Brasil, Mexico, Panama, Argentina y toda Latinoamerica. Vuelos, hoteles 4-5 estrellas, tours guiados en espanol y asistencia visa Schengen.",
    "url": "https://tripseuropa.com",
    "logo": "https://tripseuropa.com/logo.png",
    "image": "https://tripseuropa.com/og-image.jpg",
    "telephone": "+34-611-105-448",
    "email": "info@tripseuropa.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CO",
      "addressLocality": "Bogota"
    },
    "areaServed": [
      { "@type": "Country", "name": "Colombia" },
      { "@type": "Country", "name": "Brazil" },
      { "@type": "Country", "name": "Mexico" },
      { "@type": "Country", "name": "Panama" },
      { "@type": "Country", "name": "Argentina" },
      { "@type": "Country", "name": "Peru" },
      { "@type": "Country", "name": "Chile" },
      { "@type": "Country", "name": "Venezuela" },
      { "@type": "Country", "name": "Ecuador" },
      { "@type": "Country", "name": "Costa Rica" }
    ],
    "serviceType": [
      "Travel Agency",
      "Tour Operator",
      "Flight Booking",
      "Hotel Booking",
      "Travel Insurance",
      "Visa Assistance",
      "Luxury Travel",
      "Group Tours",
      "Honeymoon Packages"
    ],
    "priceRange": "$$$",
    "currenciesAccepted": "USD, COP, BRL, MXN, EUR",
    "paymentAccepted": "Credit Card, Bank Transfer, Cryptocurrency",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/tripseuropa",
      "https://www.instagram.com/tripseuropa",
      "https://www.youtube.com/tripseuropa",
      "https://www.linkedin.com/company/tripseuropa"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2847",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Paquetes de Viaje a Europa",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "TouristTrip",
            "name": "Europa Express",
            "description": "Paquete express de 8 dias por las principales ciudades europeas",
            "touristType": "Budget Traveler"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "TouristTrip",
            "name": "Europa Clasica",
            "description": "Tour clasico de 12-15 dias por Europa con todo incluido",
            "touristType": "Leisure Traveler"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "TouristTrip",
            "name": "Europa Lujo VIP",
            "description": "Experiencia de lujo con hoteles 5 estrellas y servicios exclusivos",
            "touristType": "Luxury Traveler"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "TouristTrip",
            "name": "Luna de Miel Europa",
            "description": "Paquetes romanticos para parejas recien casadas",
            "touristType": "Honeymoon Traveler"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Trips Europa",
    "url": "https://tripseuropa.com",
    "description": "Agencia de viajes especializada en paquetes turisticos a Europa desde Latinoamerica",
    "inLanguage": ["es", "en", "pt"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://tripseuropa.com/packages?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface PackageSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  duration: string;
  destinations: string[];
  rating: number;
  reviewCount: number;
}

export function PackageSchema({ 
  name, 
  description, 
  image, 
  price, 
  currency, 
  duration, 
  destinations,
  rating,
  reviewCount 
}: PackageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Organization",
      "name": "Trips Europa"
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency,
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "seller": {
        "@type": "Organization",
        "name": "Trips Europa"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Duration",
        "value": duration
      },
      {
        "@type": "PropertyValue",
        "name": "Destinations",
        "value": destinations.join(", ")
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogPostSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}

export function BlogPostSchema({ 
  title, 
  description, 
  image, 
  datePublished, 
  dateModified,
  author,
  url 
}: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Trips Europa",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tripseuropa.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  questions: { question: string; answer: string }[];
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema({ country, city }: { country: string; city: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Trips Europa - ${city}`,
    "@id": `https://tripseuropa.com/desde-${country.toLowerCase()}`,
    "url": `https://tripseuropa.com/desde-${country.toLowerCase()}`,
    "telephone": "+34-611-105-448",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressCountry": country
    },
    "geo": {
      "@type": "GeoCoordinates"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "areaServed": {
      "@type": "Country",
      "name": country
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
