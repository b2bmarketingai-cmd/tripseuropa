declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export type EventName =
  | "page_view"
  | "lead_form_submit"
  | "lead_form_step1_complete"
  | "lead_form_step2_complete"
  | "experiment_impression"
  | "experiment_conversion"
  | "cta_click"
  | "package_view"
  | "destination_view"
  | "contact_whatsapp"
  | "flight_search"
  | "newsletter_signup";

interface EventParams {
  country?: string;
  variant?: string;
  experiment_id?: string;
  page_path?: string;
  page_title?: string;
  package_name?: string;
  destination?: string;
  price?: number;
  currency?: string;
  form_step?: number;
  [key: string]: any;
}

export function trackEvent(eventName: EventName, params?: EventParams): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

export function trackPageView(path: string, title: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title,
    });
  }
}

export function trackLeadFormSubmit(country: string, step: number): void {
  trackEvent("lead_form_submit", {
    country,
    form_step: step,
  });
}

export function trackCTAClick(ctaName: string, location: string, country?: string): void {
  trackEvent("cta_click", {
    cta_name: ctaName,
    location,
    country,
  });
}

export function trackPackageView(packageName: string, price: number, currency: string): void {
  trackEvent("package_view", {
    package_name: packageName,
    price,
    currency,
  });
}

export function trackDestinationView(destination: string, country?: string): void {
  trackEvent("destination_view", {
    destination,
    country,
  });
}

export function trackFlightSearch(origin: string, destination: string): void {
  trackEvent("flight_search", {
    origin,
    destination,
  });
}

export function trackWhatsAppContact(country: string): void {
  trackEvent("contact_whatsapp", {
    country,
  });
}

export function trackNewsletterSignup(country?: string): void {
  trackEvent("newsletter_signup", {
    country,
  });
}

export const KPIs = {
  ORGANIC_SESSIONS_TARGET: 1.5,
  CTR_TARGET: 0.35,
  CONVERSION_RATE_TARGET: 0.045,
  BOUNCE_RATE_TARGET: 0.45,
  PAGE_LOAD_TARGET: 3000,
};

export function initializeAnalytics(measurementId: string): void {
  if (typeof window === "undefined" || window.gtag) return;

  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
  });

}

export function useAnalytics() {
  return {
    trackEvent,
    trackPageView,
    trackLeadFormSubmit,
    trackCTAClick,
    trackPackageView,
    trackDestinationView,
    trackFlightSearch,
    trackWhatsAppContact,
    trackNewsletterSignup,
  };
}
