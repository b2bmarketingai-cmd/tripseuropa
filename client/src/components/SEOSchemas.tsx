interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
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

interface TouristAttraction {
  name: string;
  description?: string;
}

export function TouristDestinationSchema({ 
  name, 
  description, 
  url, 
  image,
  attractions = []
}: { 
  name: string; 
  description: string; 
  url: string; 
  image: string;
  attractions?: TouristAttraction[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": name,
    "description": description,
    "url": url,
    "image": image,
    "touristType": "Turismo cultural, familiar, romantico",
    ...(attractions.length > 0 && {
      "includesAttraction": attractions.map(attr => ({
        "@type": "TouristAttraction",
        "name": attr.name,
        ...(attr.description && { "description": attr.description })
      }))
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Trips Europa",
    "description": "Agencia de viajes especializada en paquetes turisticos a Europa desde Latinoamerica",
    "url": "https://tripseuropa.co",
    "logo": "https://tripseuropa.co/favicon.png",
    "image": "https://tripseuropa.co/og-image.jpg",
    "telephone": "+34-611-105-448",
    "email": "info@tripseuropa.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Gran Via 45",
      "addressLocality": "Madrid",
      "addressCountry": "ES"
    },
    "sameAs": [
      "https://facebook.com/tripseuropa",
      "https://instagram.com/tripseuropa",
      "https://youtube.com/@tripseuropa",
      "https://tiktok.com/@tripseuropa"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "28547",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  if (!faqs || faqs.length === 0) return null;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
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

export function ProductSchema({
  name,
  description,
  image,
  url,
  price,
  currency = "USD"
}: {
  name: string;
  description: string;
  image: string;
  url: string;
  price: number;
  currency?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": "Trips Europa"
    },
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": currency,
      "price": price.toString(),
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Trips Europa"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
