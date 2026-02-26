import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: object;
}

export function useSEO({
  title,
  description,
  canonical,
  ogImage,
  structuredData,
}: SEOProps = {}) {
  const location = useLocation();
  const baseUrl = 'https://tripseuropa.com';
  
  useEffect(() => {
    // Set document title
    if (title) {
      document.title = `${title} | Trips Europa`;
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Set canonical URL
    const canonicalUrl = canonical || `${baseUrl}${location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Set Open Graph tags
    if (title) {
      updateMetaTag('property', 'og:title', title);
    }
    if (description) {
      updateMetaTag('property', 'og:description', description);
    }
    if (ogImage) {
      updateMetaTag('property', 'og:image', ogImage);
    }
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:type', 'website');

    // Set Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    if (title) {
      updateMetaTag('name', 'twitter:title', title);
    }
    if (description) {
      updateMetaTag('name', 'twitter:description', description);
    }
    if (ogImage) {
      updateMetaTag('name', 'twitter:image', ogImage);
    }

    // Add structured data (Schema.org)
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, canonical, location.pathname, ogImage, structuredData]);
}

function updateMetaTag(attr: string, attrValue: string, content: string) {
  let metaTag = document.querySelector(`meta[${attr}="${attrValue}"]`);
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attr, attrValue);
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute('content', content);
}

// Helper to create Organization schema
export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Trips Europa',
    url: 'https://tripseuropa.com',
    logo: 'https://tripseuropa.com/logo.png',
    description: 'Agencia de viajes premium especializada en paquetes turísticos a Europa desde Latinoamérica',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+34-611-105-448',
      contactType: 'customer service',
      areaServed: ['ES', 'MX', 'CO', 'AR', 'CL'],
      availableLanguage: ['es', 'en', 'pt'],
    },
    sameAs: [
      'https://facebook.com/tripseuropa',
      'https://instagram.com/tripseuropa',
      'https://twitter.com/tripseuropa',
    ],
  };
}
