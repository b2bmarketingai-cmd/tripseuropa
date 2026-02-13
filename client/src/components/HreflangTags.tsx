import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

export function HreflangTags() {
  const [location] = useLocation();
  const baseUrl = "https://tripseuropa.com";
  const createdElements = useRef<HTMLLinkElement[]>([]);

  const basePath = location.replace(/^\/(es|en|pt|pt-br)/, '');

  useEffect(() => {
    createdElements.current.forEach(el => el.remove());
    createdElements.current = [];

    const hreflangs = [
      { hreflang: "es", href: `${baseUrl}/es${basePath}` },
      { hreflang: "en", href: `${baseUrl}/en${basePath}` },
      { hreflang: "pt-BR", href: `${baseUrl}/pt-br${basePath}` },
      { hreflang: "x-default", href: `${baseUrl}${basePath || '/'}` },
    ];

    hreflangs.forEach(({ hreflang, href }) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = href;
      document.head.appendChild(link);
      createdElements.current.push(link);
    });

    return () => {
      createdElements.current.forEach(el => el.remove());
      createdElements.current = [];
    };
  }, [location, basePath]);

  return null;
}
