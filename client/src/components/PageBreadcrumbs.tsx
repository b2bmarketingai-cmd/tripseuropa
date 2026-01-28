import { Link } from "wouter";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbEntry[];
}

export default function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className="container mx-auto px-4 py-3">
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <BreadcrumbItem key={idx}>
                {idx > 0 && <BreadcrumbSeparator />}
                {isLast || !item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}

export function getHomeLabel(lang: string): string {
  if (lang === "en") return "Home";
  if (lang === "pt") return "Inicio";
  return "Inicio";
}

export function getHomePath(lang: string): string {
  if (lang === "en") return "/en";
  if (lang === "pt") return "/pt-br";
  return "/";
}
