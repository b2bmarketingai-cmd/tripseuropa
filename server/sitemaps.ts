import { Express, Request, Response } from 'express';

const DOMAIN = 'https://tripseuropa.co';

interface CountryConfig {
  code: string;
  hreflang: string;
  urlPrefix: string;
  currency: string;
  language: string;
  priority: number;
  name: string;
  destinations: number;
}

export const countryConfigs: CountryConfig[] = [
  { code: 'BR', hreflang: 'pt-BR', urlPrefix: '/pt-br', currency: 'BRL', language: 'pt', priority: 1.0, name: 'Brasil', destinations: 45 },
  { code: 'MX', hreflang: 'es-MX', urlPrefix: '/es-mx', currency: 'MXN', language: 'es', priority: 0.95, name: 'México', destinations: 40 },
  { code: 'CO', hreflang: 'es-CO', urlPrefix: '/es-co', currency: 'COP', language: 'es', priority: 0.90, name: 'Colombia', destinations: 35 },
  { code: 'AR', hreflang: 'es-AR', urlPrefix: '/es-ar', currency: 'ARS', language: 'es', priority: 0.90, name: 'Argentina', destinations: 35 },
  { code: 'PE', hreflang: 'es-PE', urlPrefix: '/es-pe', currency: 'PEN', language: 'es', priority: 0.85, name: 'Perú', destinations: 30 },
  { code: 'PA', hreflang: 'es-PA', urlPrefix: '/es-pa', currency: 'USD', language: 'es', priority: 0.85, name: 'Panamá', destinations: 25 },
  { code: 'CR', hreflang: 'es-CR', urlPrefix: '/es-cr', currency: 'CRC', language: 'es', priority: 0.85, name: 'Costa Rica', destinations: 25 },
  { code: 'DO', hreflang: 'es-DO', urlPrefix: '/es-do', currency: 'DOP', language: 'es', priority: 0.85, name: 'República Dominicana', destinations: 25 },
  { code: 'CB', hreflang: 'es', urlPrefix: '/es/caribe', currency: 'USD', language: 'es', priority: 0.85, name: 'Caribe', destinations: 20 },
];

const europeanDestinations = [
  { slug: 'paris', name: 'París', country: 'Francia', namePt: 'Paris' },
  { slug: 'madrid', name: 'Madrid', country: 'España', namePt: 'Madri' },
  { slug: 'barcelona', name: 'Barcelona', country: 'España', namePt: 'Barcelona' },
  { slug: 'roma', name: 'Roma', country: 'Italia', namePt: 'Roma' },
  { slug: 'venecia', name: 'Venecia', country: 'Italia', namePt: 'Veneza' },
  { slug: 'amsterdam', name: 'Ámsterdam', country: 'Países Bajos', namePt: 'Amsterdã' },
  { slug: 'berlin', name: 'Berlín', country: 'Alemania', namePt: 'Berlim' },
  { slug: 'viena', name: 'Viena', country: 'Austria', namePt: 'Viena' },
  { slug: 'praga', name: 'Praga', country: 'República Checa', namePt: 'Praga' },
  { slug: 'londres', name: 'Londres', country: 'Reino Unido', namePt: 'Londres' },
  { slug: 'lisboa', name: 'Lisboa', country: 'Portugal', namePt: 'Lisboa' },
  { slug: 'atenas', name: 'Atenas', country: 'Grecia', namePt: 'Atenas' },
  { slug: 'florencia', name: 'Florencia', country: 'Italia', namePt: 'Florença' },
  { slug: 'dublin', name: 'Dublín', country: 'Irlanda', namePt: 'Dublin' },
  { slug: 'budapest', name: 'Budapest', country: 'Hungría', namePt: 'Budapeste' },
  { slug: 'munich', name: 'Múnich', country: 'Alemania', namePt: 'Munique' },
  { slug: 'zurich', name: 'Zúrich', country: 'Suiza', namePt: 'Zurique' },
  { slug: 'bruselas', name: 'Bruselas', country: 'Bélgica', namePt: 'Bruxelas' },
  { slug: 'santorini', name: 'Santorini', country: 'Grecia', namePt: 'Santorini' },
  { slug: 'milan', name: 'Milán', country: 'Italia', namePt: 'Milão' },
  { slug: 'estocolmo', name: 'Estocolmo', country: 'Suecia', namePt: 'Estocolmo' },
  { slug: 'copenhague', name: 'Copenhague', country: 'Dinamarca', namePt: 'Copenhague' },
  { slug: 'oslo', name: 'Oslo', country: 'Noruega', namePt: 'Oslo' },
  { slug: 'varsovia', name: 'Varsovia', country: 'Polonia', namePt: 'Varsóvia' },
  { slug: 'edimburgo', name: 'Edimburgo', country: 'Reino Unido', namePt: 'Edimburgo' },
  { slug: 'sevilla', name: 'Sevilla', country: 'España', namePt: 'Sevilha' },
  { slug: 'niza', name: 'Niza', country: 'Francia', namePt: 'Nice' },
  { slug: 'costa-amalfitana', name: 'Costa Amalfitana', country: 'Italia', namePt: 'Costa Amalfitana' },
  { slug: 'cinque-terre', name: 'Cinque Terre', country: 'Italia', namePt: 'Cinque Terre' },
  { slug: 'ibiza', name: 'Ibiza', country: 'España', namePt: 'Ibiza' },
];

const blogPosts = [
  { slug: 'guia-viaje-paris-2026', title: 'Guía Completa: Viaje a París en 2026' },
  { slug: 'mejores-destinos-europa-presupuesto', title: 'Mejores Destinos de Europa con Bajo Presupuesto' },
  { slug: 'documentacion-viaje-europa', title: 'Documentación para Viajar a Europa' },
  { slug: 'europa-en-15-dias', title: 'Europa en 15 Días: Itinerario Perfecto' },
  { slug: 'vuelos-baratos-europa', title: 'Cómo Encontrar Vuelos Baratos a Europa' },
  { slug: 'alojamiento-europa', title: 'Mejores Opciones de Alojamiento en Europa' },
  { slug: 'ciudades-romanticas-europa', title: 'Las 10 Ciudades Más Románticas de Europa' },
  { slug: 'gastronomia-europea', title: 'Guía Gastronómica de Europa' },
  { slug: 'visado-schengen', title: 'Todo sobre el Visado Schengen' },
  { slug: 'seguro-viaje-europa', title: 'Seguro de Viaje para Europa: Guía Completa' },
];

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function generateHreflangLinks(path: string): string {
  const links: string[] = [];
  
  countryConfigs.forEach(config => {
    const localPath = path === "/" ? "" : path;
    links.push(`    <xhtml:link rel="alternate" hreflang="${config.hreflang}" href="${DOMAIN}${config.urlPrefix}${localPath}" />`);
  });
  
  const enPath = path === "/" ? "" : (path.startsWith("/destinos") ? path.replace("/destinos", "/destinations") : path);
  links.push(`    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}/en${enPath}" />`);
  links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}${path}" />`);
  
  return links.join('\n');
}

export function generateSitemapIndex(): string {
  const today = getToday();
  
  const sitemaps = [
    'sitemap-general.xml',
    ...countryConfigs.map(c => `sitemap-destinos-${c.name.toLowerCase().replace(/\s+/g, '-').replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u')}.xml`),
    'sitemap-blog.xml',
    'sitemap-imagenes.xml',
    'sitemap-videos.xml',
    'sitemap-noticias.xml',
    'sitemap-legales.xml',
  ];
  
  const sitemapEntries = sitemaps.map(sitemap => `  <sitemap>
    <loc>${DOMAIN}/sitemaps/${sitemap}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

export function generateGeneralSitemap(): string {
  const today = getToday();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${generateHreflangLinks('/')}
  </url>

  <url>
    <loc>${DOMAIN}/destinos</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
${generateHreflangLinks('/destinos')}
  </url>

  <url>
    <loc>${DOMAIN}/packages</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${DOMAIN}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${DOMAIN}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/vuelos</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/hoteles</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/paquetes</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/tours</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/seguros</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${DOMAIN}/travel-advisor</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>

  <url>
    <loc>${DOMAIN}/rewards</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${DOMAIN}/testimonials</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

</urlset>`;
}

export function generateCountrySitemap(countryCode: string): string {
  const config = countryConfigs.find(c => c.code === countryCode);
  if (!config) return '';

  const today = getToday();
  const isPtBr = config.language === 'pt';
  
  let urls = '';
  
  urls += `
  <url>
    <loc>${DOMAIN}${config.urlPrefix}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${config.priority}</priority>
${generateHreflangLinks('/')}
  </url>`;

  europeanDestinations.forEach(dest => {
    const destName = isPtBr ? dest.namePt : dest.name;
    urls += `
  <url>
    <loc>${DOMAIN}${config.urlPrefix}/destinos/${dest.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${(config.priority - 0.05).toFixed(2)}</priority>
${generateHreflangLinks(`/destinos/${dest.slug}`)}
    <image:image>
      <image:loc>${DOMAIN}/images/${dest.slug}-principal.jpg</image:loc>
      <image:title>${destName} - Viajes desde ${config.name}</image:title>
    </image:image>
  </url>`;
  });

  const packages = [
    { slug: 'europa-7-dias', name: 'Europa 7 Días' },
    { slug: 'europa-15-dias', name: 'Europa 15 Días' },
    { slug: 'europa-21-dias', name: 'Europa 21 Días' },
    { slug: 'luna-de-miel', name: 'Luna de Miel Europa' },
    { slug: 'familia-europa', name: 'Viaje en Familia a Europa' },
  ];

  packages.forEach(pkg => {
    const pkgPath = isPtBr ? 'pacotes' : 'paquetes';
    urls += `
  <url>
    <loc>${DOMAIN}${config.urlPrefix}/${pkgPath}/${pkg.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
}

export function generateBlogSitemap(): string {
  const today = getToday();

  let urls = '';
  
  blogPosts.forEach(post => {
    urls += `
  <url>
    <loc>${DOMAIN}/blog/post/${post.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
    <news:news>
      <news:publication>
        <news:name>Trips Europa Blog</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${today}</news:publication_date>
      <news:title>${post.title}</news:title>
    </news:news>
  </url>`;
  });

  const countryBlogs = ['colombia', 'mexico', 'brasil', 'argentina', 'peru', 'panama', 'costa-rica', 'dominicana', 'caribe'];
  countryBlogs.forEach(country => {
    urls += `
  <url>
    <loc>${DOMAIN}/blog/${country}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;
}

export function generateImagesSitemap(): string {
  let urls = '';

  europeanDestinations.forEach(dest => {
    urls += `
  <url>
    <loc>${DOMAIN}/destinos/${dest.slug}</loc>
    <image:image>
      <image:loc>${DOMAIN}/images/${dest.slug}-principal.jpg</image:loc>
      <image:title>${dest.name} - Destino turístico en ${dest.country}</image:title>
      <image:caption>Vista panorámica de ${dest.name}</image:caption>
    </image:image>
    <image:image>
      <image:loc>${DOMAIN}/images/${dest.slug}-atraccion-1.jpg</image:loc>
      <image:title>Atracción principal en ${dest.name}</image:title>
    </image:image>
    <image:image>
      <image:loc>${DOMAIN}/images/${dest.slug}-gastronomia.jpg</image:loc>
      <image:title>Gastronomía típica de ${dest.name}</image:title>
    </image:image>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
}

export function generateVideosSitemap(): string {
  const today = getToday();
  
  const videos = [
    { dest: 'paris', title: 'Tour Virtual de París - 360°', duration: 720 },
    { dest: 'barcelona', title: 'Sagrada Familia Barcelona - Documental 4K', duration: 1200 },
    { dest: 'roma', title: 'Roma Antigua - Paseo Virtual por el Coliseo', duration: 900 },
    { dest: 'amsterdam', title: 'Canales de Ámsterdam - Tour en Bote', duration: 600 },
    { dest: 'venecia', title: 'Venecia - La Ciudad del Agua', duration: 840 },
  ];

  let urls = '';
  videos.forEach(video => {
    urls += `
  <url>
    <loc>${DOMAIN}/destinos/${video.dest}</loc>
    <video:video>
      <video:thumbnail_loc>${DOMAIN}/videos/${video.dest}-thumbnail.jpg</video:thumbnail_loc>
      <video:title>${video.title}</video:title>
      <video:description>Recorrido inmersivo por ${video.dest} con los principales atractivos turísticos.</video:description>
      <video:content_loc>${DOMAIN}/videos/${video.dest}-tour.mp4</video:content_loc>
      <video:duration>${video.duration}</video:duration>
      <video:upload_date>${today}</video:upload_date>
      <video:tag>Europa</video:tag>
      <video:tag>Viaje</video:tag>
      <video:tag>Turismo</video:tag>
      <video:category>Travel</video:category>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>`;
}

export function generateNewsSitemap(): string {
  const today = getToday();
  const recentPosts = blogPosts.slice(0, 5);

  let urls = '';
  recentPosts.forEach(post => {
    urls += `
  <url>
    <loc>${DOMAIN}/blog/post/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Trips Europa</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${today}</news:publication_date>
      <news:title>${post.title}</news:title>
    </news:news>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;
}

export function generateLegalSitemap(): string {
  const today = getToday();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>${DOMAIN}/policies</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <url>
    <loc>${DOMAIN}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <url>
    <loc>${DOMAIN}/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

</urlset>`;
}

export function registerSitemapRoutes(app: Express): void {
  app.get('/sitemaps/sitemap_index.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateSitemapIndex());
  });

  app.get('/sitemaps/sitemap-general.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateGeneralSitemap());
  });

  const countryRouteMap: { [key: string]: string } = {
    'brasil': 'BR',
    'mexico': 'MX',
    'colombia': 'CO',
    'argentina': 'AR',
    'peru': 'PE',
    'panama': 'PA',
    'costa-rica': 'CR',
    'republica-dominicana': 'DO',
    'caribe': 'CB',
  };

  Object.entries(countryRouteMap).forEach(([urlName, code]) => {
    app.get(`/sitemaps/sitemap-destinos-${urlName}.xml`, (_req: Request, res: Response) => {
      res.set('Content-Type', 'application/xml');
      res.send(generateCountrySitemap(code));
    });
  });

  app.get('/sitemaps/sitemap-blog.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateBlogSitemap());
  });

  app.get('/sitemaps/sitemap-imagenes.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateImagesSitemap());
  });

  app.get('/sitemaps/sitemap-videos.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateVideosSitemap());
  });

  app.get('/sitemaps/sitemap-noticias.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateNewsSitemap());
  });

  app.get('/sitemaps/sitemap-legales.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateLegalSitemap());
  });

  app.get('/robots.txt', (_req: Request, res: Response) => {
    res.set('Content-Type', 'text/plain');
    res.send(`# Robots.txt for tripseuropa.co
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${DOMAIN}/sitemaps/sitemap_index.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-general.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-destinos-brasil.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-destinos-mexico.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-destinos-colombia.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-destinos-argentina.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-destinos-peru.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-destinos-panama.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-destinos-costa-rica.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-destinos-republica-dominicana.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-destinos-caribe.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-blog.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-imagenes.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-videos.xml

# Disallow private areas
Disallow: /api/
Disallow: /dashboard/
`);
  });

  app.get('/api/seo/countries', (_req: Request, res: Response) => {
    res.json(countryConfigs);
  });
}
