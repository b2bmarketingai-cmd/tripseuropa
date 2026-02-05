import type { Request, Response } from 'express';

/**
 * Dynamic Sitemap Generator for SEO
 * Generates sitemap.xml with all public pages for better indexing
 */

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Static pages
const staticPages: SitemapUrl[] = [
  { loc: 'https://tripseuropa.com/', changefreq: 'daily', priority: 1.0 },
  { loc: 'https://tripseuropa.com/packages', changefreq: 'weekly', priority: 0.9 },
  { loc: 'https://tripseuropa.com/destinations', changefreq: 'weekly', priority: 0.9 },
  { loc: 'https://tripseuropa.com/blog', changefreq: 'daily', priority: 0.8 },
  { loc: 'https://tripseuropa.com/about', changefreq: 'monthly', priority: 0.7 },
  { loc: 'https://tripseuropa.com/contact', changefreq: 'monthly', priority: 0.7 },
  { loc: 'https://tripseuropa.com/last-minute', changefreq: 'daily', priority: 0.8 },
  { loc: 'https://tripseuropa.com/testimonials', changefreq: 'weekly', priority: 0.6 },
];

// Destination pages
const destinations = [
  'italia', 'espana', 'francia', 'grecia', 'portugal', 'alemania',
  'suiza', 'reino-unido', 'paises-bajos', 'belgica', 'austria',
  'republica-checa', 'turquia', 'croacia', 'polonia', 'hungria'
];

// Package pages
const packages = [
  'capitales-europeas', 'europa-10-dias', 'mediterranean-delight',
  'alpine-adventure', 'iberian-explorer', 'greek-islands',
  'northern-lights', 'eastern-europe', 'best-of-europe'
];

// Blog posts (sample - in production, fetch from database)
const blogPosts = [
  'mejor-epoca-visitar-europa',
  'documentos-necesarios-viajar-europa',
  'presupuesto-viaje-europa',
  'visa-schengen-guia-completa',
  'mejores-destinos-europa',
  'consejos-primera-vez-europa'
];

// Country landing pages
const countries = [
  'colombia', 'mexico', 'brasil', 'argentina', 'peru', 'panama',
  'costa-rica', 'chile', 'ecuador', 'venezuela'
];

function generateSitemapXml(): string {
  const today = new Date().toISOString().split('T')[0];

  let urls: SitemapUrl[] = [...staticPages];

  // Add destination pages
  destinations.forEach(dest => {
    urls.push({
      loc: `https://tripseuropa.com/destination/${dest}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  // Add package pages
  packages.forEach(pkg => {
    urls.push({
      loc: `https://tripseuropa.com/package/${pkg}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  // Add blog posts
  blogPosts.forEach(post => {
    urls.push({
      loc: `https://tripseuropa.com/blog/post/${post}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6
    });
  });

  // Add country landing pages
  countries.forEach(country => {
    urls.push({
      loc: `https://tripseuropa.com/${country}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7
    });
  });

  // Generate XML
  const urlEntries = urls.map(url => {
    let entry = `  <url>\n    <loc>${url.loc}</loc>`;
    if (url.lastmod) entry += `\n    <lastmod>${url.lastmod}</lastmod>`;
    if (url.changefreq) entry += `\n    <changefreq>${url.changefreq}</changefreq>`;
    if (url.priority !== undefined) entry += `\n    <priority>${url.priority}</priority>`;
    entry += `\n  </url>`;
    return entry;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export function serveSitemap(req: Request, res: Response): void {
  try {
    const sitemap = generateSitemapXml();
    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}
