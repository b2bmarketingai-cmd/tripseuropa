import { Express, Request, Response } from 'express';

const DOMAIN = 'https://tripseuropa.com';
const DOMAIN_SECONDARY = 'https://tripseuropa.co';

interface CountryConfig {
  code: string;
  hreflang: string;
  urlPrefix: string;
  currency: string;
  language: string;
  priority: number;
  name: string;
  nameEn: string;
  destinations: number;
  hasEnglish: boolean;
}

export const countryConfigs: CountryConfig[] = [
  { code: 'CO', hreflang: 'es-CO', urlPrefix: '/es-co', currency: 'COP', language: 'es', priority: 1.0, name: 'Colombia', nameEn: 'Colombia', destinations: 40, hasEnglish: true },
  { code: 'MX', hreflang: 'es-MX', urlPrefix: '/es-mx', currency: 'MXN', language: 'es', priority: 0.95, name: 'México', nameEn: 'Mexico', destinations: 40, hasEnglish: true },
  { code: 'BR', hreflang: 'pt-BR', urlPrefix: '/pt-br', currency: 'BRL', language: 'pt', priority: 0.95, name: 'Brasil', nameEn: 'Brazil', destinations: 50, hasEnglish: true },
  { code: 'AR', hreflang: 'es-AR', urlPrefix: '/es-ar', currency: 'ARS', language: 'es', priority: 0.90, name: 'Argentina', nameEn: 'Argentina', destinations: 40, hasEnglish: true },
  { code: 'PE', hreflang: 'es-PE', urlPrefix: '/es-pe', currency: 'PEN', language: 'es', priority: 0.85, name: 'Perú', nameEn: 'Peru', destinations: 30, hasEnglish: false },
  { code: 'PA', hreflang: 'es-PA', urlPrefix: '/es-pa', currency: 'USD', language: 'es', priority: 0.85, name: 'Panamá', nameEn: 'Panama', destinations: 25, hasEnglish: false },
  { code: 'CR', hreflang: 'es-CR', urlPrefix: '/es-cr', currency: 'CRC', language: 'es', priority: 0.85, name: 'Costa Rica', nameEn: 'Costa Rica', destinations: 25, hasEnglish: false },
  { code: 'DO', hreflang: 'es-DO', urlPrefix: '/es-do', currency: 'DOP', language: 'es', priority: 0.85, name: 'República Dominicana', nameEn: 'Dominican Republic', destinations: 25, hasEnglish: false },
  { code: 'CB', hreflang: 'es', urlPrefix: '/es/caribe', currency: 'USD', language: 'es', priority: 0.80, name: 'Caribe', nameEn: 'Caribbean', destinations: 20, hasEnglish: false },
];

const europeanDestinations = [
  { slug: 'france', slugEs: 'francia', name: 'Francia', nameEn: 'France', namePt: 'França', country: 'Europa' },
  { slug: 'italy', slugEs: 'italia', name: 'Italia', nameEn: 'Italy', namePt: 'Itália', country: 'Europa' },
  { slug: 'spain', slugEs: 'espana', name: 'España', nameEn: 'Spain', namePt: 'Espanha', country: 'Europa' },
  { slug: 'germany', slugEs: 'alemania', name: 'Alemania', nameEn: 'Germany', namePt: 'Alemanha', country: 'Europa' },
  { slug: 'portugal', slugEs: 'portugal', name: 'Portugal', nameEn: 'Portugal', namePt: 'Portugal', country: 'Europa' },
  { slug: 'greece', slugEs: 'grecia', name: 'Grecia', nameEn: 'Greece', namePt: 'Grécia', country: 'Europa' },
  { slug: 'netherlands', slugEs: 'paises-bajos', name: 'Países Bajos', nameEn: 'Netherlands', namePt: 'Países Baixos', country: 'Europa' },
  { slug: 'switzerland', slugEs: 'suiza', name: 'Suiza', nameEn: 'Switzerland', namePt: 'Suíça', country: 'Europa' },
  { slug: 'croatia', slugEs: 'croacia', name: 'Croacia', nameEn: 'Croatia', namePt: 'Croácia', country: 'Europa' },
  { slug: 'united-kingdom', slugEs: 'reino-unido', name: 'Reino Unido', nameEn: 'United Kingdom', namePt: 'Reino Unido', country: 'Europa' },
  { slug: 'albania', slugEs: 'albania', name: 'Albania', nameEn: 'Albania', namePt: 'Albânia', country: 'Europa' },
  { slug: 'austria', slugEs: 'austria', name: 'Austria', nameEn: 'Austria', namePt: 'Áustria', country: 'Europa' },
  { slug: 'belgium', slugEs: 'belgica', name: 'Bélgica', nameEn: 'Belgium', namePt: 'Bélgica', country: 'Europa' },
  { slug: 'czech-republic', slugEs: 'republica-checa', name: 'República Checa', nameEn: 'Czech Republic', namePt: 'República Tcheca', country: 'Europa' },
  { slug: 'denmark', slugEs: 'dinamarca', name: 'Dinamarca', nameEn: 'Denmark', namePt: 'Dinamarca', country: 'Europa' },
  { slug: 'finland', slugEs: 'finlandia', name: 'Finlandia', nameEn: 'Finland', namePt: 'Finlândia', country: 'Europa' },
  { slug: 'hungary', slugEs: 'hungria', name: 'Hungría', nameEn: 'Hungary', namePt: 'Hungria', country: 'Europa' },
  { slug: 'iceland', slugEs: 'islandia', name: 'Islandia', nameEn: 'Iceland', namePt: 'Islândia', country: 'Europa' },
  { slug: 'ireland', slugEs: 'irlanda', name: 'Irlanda', nameEn: 'Ireland', namePt: 'Irlanda', country: 'Europa' },
  { slug: 'norway', slugEs: 'noruega', name: 'Noruega', nameEn: 'Norway', namePt: 'Noruega', country: 'Europa' },
  { slug: 'poland', slugEs: 'polonia', name: 'Polonia', nameEn: 'Poland', namePt: 'Polônia', country: 'Europa' },
  { slug: 'romania', slugEs: 'rumania', name: 'Rumania', nameEn: 'Romania', namePt: 'Romênia', country: 'Europa' },
  { slug: 'sweden', slugEs: 'suecia', name: 'Suecia', nameEn: 'Sweden', namePt: 'Suécia', country: 'Europa' },
  { slug: 'baltics', slugEs: 'estados-balticos', name: 'Estados Bálticos', nameEn: 'Baltic States', namePt: 'Estados Bálticos', country: 'Europa' },
  { slug: 'cyprus', slugEs: 'chipre', name: 'Chipre', nameEn: 'Cyprus', namePt: 'Chipre', country: 'Europa' },
  { slug: 'scotland', slugEs: 'escocia', name: 'Escocia', nameEn: 'Scotland', namePt: 'Escócia', country: 'Europa' },
  { slug: 'malta', slugEs: 'malta', name: 'Malta', nameEn: 'Malta', namePt: 'Malta', country: 'Europa' },
];

const europeanCities = [
  { slug: 'paris', name: 'París', nameEn: 'Paris', namePt: 'Paris', country: 'Francia' },
  { slug: 'madrid', name: 'Madrid', nameEn: 'Madrid', namePt: 'Madri', country: 'España' },
  { slug: 'barcelona', name: 'Barcelona', nameEn: 'Barcelona', namePt: 'Barcelona', country: 'España' },
  { slug: 'roma', name: 'Roma', nameEn: 'Rome', namePt: 'Roma', country: 'Italia' },
  { slug: 'venecia', name: 'Venecia', nameEn: 'Venice', namePt: 'Veneza', country: 'Italia' },
  { slug: 'florencia', name: 'Florencia', nameEn: 'Florence', namePt: 'Florença', country: 'Italia' },
  { slug: 'milan', name: 'Milán', nameEn: 'Milan', namePt: 'Milão', country: 'Italia' },
  { slug: 'amsterdam', name: 'Ámsterdam', nameEn: 'Amsterdam', namePt: 'Amsterdã', country: 'Países Bajos' },
  { slug: 'berlin', name: 'Berlín', nameEn: 'Berlin', namePt: 'Berlim', country: 'Alemania' },
  { slug: 'munich', name: 'Múnich', nameEn: 'Munich', namePt: 'Munique', country: 'Alemania' },
  { slug: 'viena', name: 'Viena', nameEn: 'Vienna', namePt: 'Viena', country: 'Austria' },
  { slug: 'praga', name: 'Praga', nameEn: 'Prague', namePt: 'Praga', country: 'República Checa' },
  { slug: 'londres', name: 'Londres', nameEn: 'London', namePt: 'Londres', country: 'Reino Unido' },
  { slug: 'lisboa', name: 'Lisboa', nameEn: 'Lisbon', namePt: 'Lisboa', country: 'Portugal' },
  { slug: 'porto', name: 'Oporto', nameEn: 'Porto', namePt: 'Porto', country: 'Portugal' },
  { slug: 'atenas', name: 'Atenas', nameEn: 'Athens', namePt: 'Atenas', country: 'Grecia' },
  { slug: 'santorini', name: 'Santorini', nameEn: 'Santorini', namePt: 'Santorini', country: 'Grecia' },
  { slug: 'mykonos', name: 'Mykonos', nameEn: 'Mykonos', namePt: 'Mykonos', country: 'Grecia' },
  { slug: 'dublin', name: 'Dublín', nameEn: 'Dublin', namePt: 'Dublin', country: 'Irlanda' },
  { slug: 'budapest', name: 'Budapest', nameEn: 'Budapest', namePt: 'Budapeste', country: 'Hungría' },
  { slug: 'zurich', name: 'Zúrich', nameEn: 'Zurich', namePt: 'Zurique', country: 'Suiza' },
  { slug: 'bruselas', name: 'Bruselas', nameEn: 'Brussels', namePt: 'Bruxelas', country: 'Bélgica' },
  { slug: 'estocolmo', name: 'Estocolmo', nameEn: 'Stockholm', namePt: 'Estocolmo', country: 'Suecia' },
  { slug: 'copenhague', name: 'Copenhague', nameEn: 'Copenhagen', namePt: 'Copenhague', country: 'Dinamarca' },
  { slug: 'oslo', name: 'Oslo', nameEn: 'Oslo', namePt: 'Oslo', country: 'Noruega' },
  { slug: 'varsovia', name: 'Varsovia', nameEn: 'Warsaw', namePt: 'Varsóvia', country: 'Polonia' },
  { slug: 'edimburgo', name: 'Edimburgo', nameEn: 'Edinburgh', namePt: 'Edimburgo', country: 'Reino Unido' },
  { slug: 'sevilla', name: 'Sevilla', nameEn: 'Seville', namePt: 'Sevilha', country: 'España' },
  { slug: 'niza', name: 'Niza', nameEn: 'Nice', namePt: 'Nice', country: 'Francia' },
  { slug: 'costa-amalfitana', name: 'Costa Amalfitana', nameEn: 'Amalfi Coast', namePt: 'Costa Amalfitana', country: 'Italia' },
  { slug: 'cinque-terre', name: 'Cinque Terre', nameEn: 'Cinque Terre', namePt: 'Cinque Terre', country: 'Italia' },
  { slug: 'ibiza', name: 'Ibiza', nameEn: 'Ibiza', namePt: 'Ibiza', country: 'España' },
  { slug: 'helsinki', name: 'Helsinki', nameEn: 'Helsinki', namePt: 'Helsinque', country: 'Finlandia' },
  { slug: 'reykjavik', name: 'Reikiavik', nameEn: 'Reykjavik', namePt: 'Reykjavík', country: 'Islandia' },
  { slug: 'dubrovnik', name: 'Dubrovnik', nameEn: 'Dubrovnik', namePt: 'Dubrovnik', country: 'Croacia' },
  { slug: 'split', name: 'Split', nameEn: 'Split', namePt: 'Split', country: 'Croacia' },
];

const blogPosts = [
  { slug: 'guia-viaje-paris-2026', title: 'Guía Completa: Viaje a París en 2026', titleEn: 'Complete Guide: Trip to Paris in 2026', titlePt: 'Guia Completo: Viagem a Paris em 2026', category: 'destinos' },
  { slug: 'mejores-destinos-europa-presupuesto', title: 'Mejores Destinos de Europa con Bajo Presupuesto', titleEn: 'Best Budget Destinations in Europe', titlePt: 'Melhores Destinos da Europa com Baixo Orçamento', category: 'consejos' },
  { slug: 'documentacion-viaje-europa', title: 'Documentación para Viajar a Europa', titleEn: 'Documentation for Traveling to Europe', titlePt: 'Documentação para Viajar à Europa', category: 'documentos' },
  { slug: 'europa-en-15-dias', title: 'Europa en 15 Días: Itinerario Perfecto', titleEn: 'Europe in 15 Days: Perfect Itinerary', titlePt: 'Europa em 15 Dias: Roteiro Perfeito', category: 'itinerarios' },
  { slug: 'vuelos-baratos-europa', title: 'Cómo Encontrar Vuelos Baratos a Europa', titleEn: 'How to Find Cheap Flights to Europe', titlePt: 'Como Encontrar Voos Baratos para a Europa', category: 'vuelos' },
  { slug: 'alojamiento-europa', title: 'Mejores Opciones de Alojamiento en Europa', titleEn: 'Best Accommodation Options in Europe', titlePt: 'Melhores Opções de Hospedagem na Europa', category: 'hoteles' },
  { slug: 'ciudades-romanticas-europa', title: 'Las 10 Ciudades Más Románticas de Europa', titleEn: 'The 10 Most Romantic Cities in Europe', titlePt: 'As 10 Cidades Mais Românticas da Europa', category: 'romance' },
  { slug: 'gastronomia-europea', title: 'Guía Gastronómica de Europa', titleEn: 'Europe Gastronomic Guide', titlePt: 'Guia Gastronômico da Europa', category: 'gastronomia' },
  { slug: 'visado-schengen', title: 'Todo sobre el Visado Schengen', titleEn: 'Everything About Schengen Visa', titlePt: 'Tudo Sobre o Visto Schengen', category: 'documentos' },
  { slug: 'seguro-viaje-europa', title: 'Seguro de Viaje para Europa: Guía Completa', titleEn: 'Travel Insurance for Europe: Complete Guide', titlePt: 'Seguro de Viagem para a Europa: Guia Completo', category: 'seguros' },
  { slug: 'temporada-alta-baja-europa', title: 'Cuándo Viajar a Europa: Temporada Alta vs Baja', titleEn: 'When to Travel to Europe: High vs Low Season', titlePt: 'Quando Viajar à Europa: Alta vs Baixa Temporada', category: 'consejos' },
  { slug: 'viaje-familia-europa', title: 'Viajar en Familia a Europa: Consejos Prácticos', titleEn: 'Family Travel to Europe: Practical Tips', titlePt: 'Viagem em Família à Europa: Dicas Práticas', category: 'familia' },
  { slug: 'luna-miel-europa', title: 'Luna de Miel en Europa: Destinos Soñados', titleEn: 'Honeymoon in Europe: Dream Destinations', titlePt: 'Lua de Mel na Europa: Destinos dos Sonhos', category: 'romance' },
  { slug: 'etias-latinoamericanos', title: 'ETIAS para Latinoamericanos 2026', titleEn: 'ETIAS for Latin Americans 2026', titlePt: 'ETIAS para Latino-americanos 2026', category: 'documentos' },
  { slug: 'trenes-europa', title: 'Guía de Trenes en Europa: Eurail Pass', titleEn: 'Europe Train Guide: Eurail Pass', titlePt: 'Guia de Trens na Europa: Eurail Pass', category: 'transporte' },
];

const packages = [
  { slug: 'europa-7-dias', name: 'Europa 7 Días', nameEn: 'Europe 7 Days', namePt: 'Europa 7 Dias', priority: 0.90 },
  { slug: 'europa-10-dias', name: 'Europa 10 Días', nameEn: 'Europe 10 Days', namePt: 'Europa 10 Dias', priority: 0.90 },
  { slug: 'europa-15-dias', name: 'Europa 15 Días', nameEn: 'Europe 15 Days', namePt: 'Europa 15 Dias', priority: 0.90 },
  { slug: 'europa-21-dias', name: 'Europa 21 Días', nameEn: 'Europe 21 Days', namePt: 'Europa 21 Dias', priority: 0.85 },
  { slug: 'luna-de-miel', name: 'Luna de Miel Europa', nameEn: 'Europe Honeymoon', namePt: 'Lua de Mel Europa', priority: 0.85 },
  { slug: 'familia-europa', name: 'Viaje en Familia a Europa', nameEn: 'Family Trip to Europe', namePt: 'Viagem em Família à Europa', priority: 0.85 },
  { slug: 'europa-clasica', name: 'Europa Clásica', nameEn: 'Classic Europe', namePt: 'Europa Clássica', priority: 0.85 },
  { slug: 'europa-express', name: 'Europa Express', nameEn: 'Express Europe', namePt: 'Europa Express', priority: 0.80 },
  { slug: 'capitales-europeas', name: 'Capitales Europeas', nameEn: 'European Capitals', namePt: 'Capitais Europeias', priority: 0.85 },
  { slug: 'tour-mediterraeo', name: 'Tour Mediterráneo', nameEn: 'Mediterranean Tour', namePt: 'Tour Mediterrâneo', priority: 0.80 },
  { slug: 'norte-europa', name: 'Norte de Europa', nameEn: 'Northern Europe', namePt: 'Norte da Europa', priority: 0.75 },
  { slug: 'europa-oriental', name: 'Europa del Este', nameEn: 'Eastern Europe', namePt: 'Europa Oriental', priority: 0.75 },
];

const experiences = [
  { slug: 'verano-europa', name: 'Verano en Europa', nameEn: 'Summer in Europe', namePt: 'Verão na Europa' },
  { slug: 'invierno-europa', name: 'Invierno Europeo', nameEn: 'European Winter', namePt: 'Inverno Europeu' },
  { slug: 'primavera-europa', name: 'Primavera en Europa', nameEn: 'Spring in Europe', namePt: 'Primavera na Europa' },
  { slug: 'otono-europa', name: 'Otoño en Europa', nameEn: 'Autumn in Europe', namePt: 'Outono na Europa' },
  { slug: 'navidad-europa', name: 'Navidad en Europa', nameEn: 'Christmas in Europe', namePt: 'Natal na Europa' },
  { slug: 'año-nuevo-europa', name: 'Año Nuevo en Europa', nameEn: 'New Year in Europe', namePt: 'Ano Novo na Europa' },
  { slug: 'gastronomia-europa', name: 'Gastronomía Europea', nameEn: 'European Gastronomy', namePt: 'Gastronomia Europeia' },
  { slug: 'arte-cultura', name: 'Arte y Cultura', nameEn: 'Art and Culture', namePt: 'Arte e Cultura' },
  { slug: 'aventura-naturaleza', name: 'Aventura y Naturaleza', nameEn: 'Adventure and Nature', namePt: 'Aventura e Natureza' },
  { slug: 'ciudades-historicas', name: 'Ciudades Históricas', nameEn: 'Historical Cities', namePt: 'Cidades Históricas' },
];

const offers = [
  { slug: 'ofertas-ultima-hora', name: 'Ofertas de Última Hora', nameEn: 'Last Minute Offers', namePt: 'Ofertas de Última Hora' },
  { slug: 'black-friday', name: 'Black Friday Europa', nameEn: 'Black Friday Europe', namePt: 'Black Friday Europa' },
  { slug: 'cyber-monday', name: 'Cyber Monday Viajes', nameEn: 'Cyber Monday Travel', namePt: 'Cyber Monday Viagens' },
  { slug: 'ofertas-verano', name: 'Ofertas de Verano', nameEn: 'Summer Deals', namePt: 'Ofertas de Verão' },
  { slug: 'ofertas-invierno', name: 'Ofertas de Invierno', nameEn: 'Winter Deals', namePt: 'Ofertas de Inverno' },
  { slug: 'promociones-especiales', name: 'Promociones Especiales', nameEn: 'Special Promotions', namePt: 'Promoções Especiais' },
];

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateHreflangLinks(path: string, language: 'es' | 'en' | 'pt' = 'es'): string {
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
    'sitemap-co-colombia-es.xml',
    'sitemap-co-colombia-en.xml',
    'sitemap-co-mexico-es.xml',
    'sitemap-co-mexico-en.xml',
    'sitemap-co-brasil-pt.xml',
    'sitemap-co-brasil-en.xml',
    'sitemap-co-argentina-es.xml',
    'sitemap-co-argentina-en.xml',
    'sitemap-co-peru-es.xml',
    'sitemap-co-panama-es.xml',
    'sitemap-co-costarica-es.xml',
    'sitemap-co-dominicana-es.xml',
    'sitemap-co-caribe-es.xml',
    'sitemap-destinos-europa-es.xml',
    'sitemap-destinos-europa-en.xml',
    'sitemap-destinos-europa-pt.xml',
    'sitemap-blog-es.xml',
    'sitemap-blog-en.xml',
    'sitemap-blog-pt.xml',
    'sitemap-imagenes.xml',
    'sitemap-videos.xml',
    'sitemap-noticias.xml',
    'sitemap-paquetes.xml',
    'sitemap-ofertas.xml',
    'sitemap-legales.xml',
    'sitemap-experiencias.xml',
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
    <priority>0.95</priority>
${generateHreflangLinks('/destinos')}
  </url>

  <url>
    <loc>${DOMAIN}/destinations</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>

  <url>
    <loc>${DOMAIN}/packages</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>

  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>${DOMAIN}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>

  <url>
    <loc>${DOMAIN}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.60</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/vuelos</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/flights</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/hoteles</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/hotels</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/paquetes</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/packages</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/tours</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/seguros</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/insurance</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>

  <url>
    <loc>${DOMAIN}/services/esim</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>

  <url>
    <loc>${DOMAIN}/travel-advisor</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>

  <url>
    <loc>${DOMAIN}/travel-assistant</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>

  <url>
    <loc>${DOMAIN}/asistente</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>

  <url>
    <loc>${DOMAIN}/rewards</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>

  <url>
    <loc>${DOMAIN}/testimonios</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.60</priority>
  </url>

  <url>
    <loc>${DOMAIN}/requisitos-visa</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>

  <url>
    <loc>${DOMAIN}/visa-requirements</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>

  <url>
    <loc>${DOMAIN}/ofertas-ultima-hora</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>${DOMAIN}/last-minute-offers</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>${DOMAIN}/tools</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>

  <url>
    <loc>${DOMAIN}/vacaciones-europa</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

</urlset>`;
}

export function generateCountrySitemap(countryCode: string, language: 'es' | 'en' | 'pt' = 'es'): string {
  const config = countryConfigs.find(c => c.code === countryCode);
  if (!config) return '';

  const today = getToday();
  const isEnglish = language === 'en';
  const isPtBr = language === 'pt';
  
  let urls = '';
  
  const urlPrefix = isEnglish ? `/en-${countryCode.toLowerCase()}` : config.urlPrefix;
  const destPath = isEnglish ? 'destinations' : (isPtBr ? 'destinos' : 'destinos');
  const pkgPath = isEnglish ? 'packages' : (isPtBr ? 'pacotes' : 'paquetes');
  
  urls += `
  <url>
    <loc>${DOMAIN}${urlPrefix}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${config.priority}</priority>
${generateHreflangLinks('/', language)}
    <image:image>
      <image:loc>${DOMAIN}/images/${config.code.toLowerCase()}-hero.jpg</image:loc>
      <image:title>${isEnglish ? `Travel to Europe from ${config.nameEn}` : isPtBr ? `Viagens à Europa desde ${config.name}` : `Viajes a Europa desde ${config.name}`}</image:title>
    </image:image>
  </url>`;

  europeanDestinations.forEach(dest => {
    const destName = isEnglish ? dest.nameEn : (isPtBr ? dest.namePt : dest.name);
    const destSlug = isEnglish ? dest.slug : dest.slugEs;
    urls += `
  <url>
    <loc>${DOMAIN}${urlPrefix}/${destPath}/${destSlug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${(config.priority - 0.05).toFixed(2)}</priority>
${generateHreflangLinks(`/destinos/${dest.slugEs}`, language)}
    <image:image>
      <image:loc>${DOMAIN}/images/${dest.slug}-principal.jpg</image:loc>
      <image:title>${escapeXml(destName)} - ${isEnglish ? `Travel from ${config.nameEn}` : isPtBr ? `Viagens desde ${config.name}` : `Viajes desde ${config.name}`}</image:title>
    </image:image>
  </url>`;
  });

  packages.forEach(pkg => {
    const pkgName = isEnglish ? pkg.nameEn : (isPtBr ? pkg.namePt : pkg.name);
    urls += `
  <url>
    <loc>${DOMAIN}${urlPrefix}/${pkgPath}/${pkg.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${pkg.priority}</priority>
    <image:image>
      <image:loc>${DOMAIN}/images/packages/${pkg.slug}.jpg</image:loc>
      <image:title>${escapeXml(pkgName)} - ${config.name}</image:title>
    </image:image>
  </url>`;
  });

  experiences.forEach(exp => {
    const expName = isEnglish ? exp.nameEn : (isPtBr ? exp.namePt : exp.name);
    const expPath = isEnglish ? 'experiences' : (isPtBr ? 'experiencias' : 'experiencias');
    urls += `
  <url>
    <loc>${DOMAIN}${urlPrefix}/${expPath}/${exp.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
}

export function generateEuropeDestinationsSitemap(language: 'es' | 'en' | 'pt'): string {
  const today = getToday();
  const isEnglish = language === 'en';
  const isPtBr = language === 'pt';
  
  let urls = '';
  const destPath = isEnglish ? 'destinations' : 'destinos';

  europeanDestinations.forEach(dest => {
    const destName = isEnglish ? dest.nameEn : (isPtBr ? dest.namePt : dest.name);
    const destSlug = isEnglish ? dest.slug : dest.slugEs;
    
    urls += `
  <url>
    <loc>${DOMAIN}/${destPath}/${destSlug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
${generateHreflangLinks(`/destinos/${dest.slugEs}`, language)}
    <image:image>
      <image:loc>${DOMAIN}/images/${dest.slug}-principal.jpg</image:loc>
      <image:title>${escapeXml(destName)}</image:title>
    </image:image>
    <image:image>
      <image:loc>${DOMAIN}/images/${dest.slug}-atraccion.jpg</image:loc>
      <image:title>${isEnglish ? `Main attraction in ${destName}` : isPtBr ? `Atração principal em ${destName}` : `Atracción principal en ${destName}`}</image:title>
    </image:image>
  </url>`;
  });

  europeanCities.forEach(city => {
    const cityName = isEnglish ? city.nameEn : (isPtBr ? city.namePt : city.name);
    
    urls += `
  <url>
    <loc>${DOMAIN}/${destPath}/${city.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
    <image:image>
      <image:loc>${DOMAIN}/images/${city.slug}-principal.jpg</image:loc>
      <image:title>${escapeXml(cityName)} - ${city.country}</image:title>
    </image:image>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
}

export function generateBlogSitemap(language: 'es' | 'en' | 'pt'): string {
  const today = getToday();
  const isEnglish = language === 'en';
  const isPtBr = language === 'pt';

  let urls = '';
  
  blogPosts.forEach(post => {
    const postTitle = isEnglish ? post.titleEn : (isPtBr ? post.titlePt : post.title);
    const langPrefix = isEnglish ? '/en' : (isPtBr ? '/pt-br' : '');
    
    urls += `
  <url>
    <loc>${DOMAIN}${langPrefix}/blog/post/${post.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
    <news:news>
      <news:publication>
        <news:name>Trips Europa Blog</news:name>
        <news:language>${language}</news:language>
      </news:publication>
      <news:publication_date>${today}</news:publication_date>
      <news:title>${escapeXml(postTitle)}</news:title>
    </news:news>
  </url>`;
  });

  const countryBlogs = ['colombia', 'mexico', 'brasil', 'argentina', 'peru', 'panama', 'costa-rica', 'dominicana', 'caribe'];
  countryBlogs.forEach(country => {
    const langPrefix = isEnglish ? '/en' : (isPtBr ? '/pt-br' : '');
    urls += `
  <url>
    <loc>${DOMAIN}${langPrefix}/blog/${country}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
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
    <loc>${DOMAIN}/destinos/${dest.slugEs}</loc>
    <image:image>
      <image:loc>${DOMAIN}/images/${dest.slug}-principal.jpg</image:loc>
      <image:title>${escapeXml(dest.name)} - Destino turístico en Europa</image:title>
      <image:caption>Vista panorámica de ${escapeXml(dest.name)}</image:caption>
    </image:image>
    <image:image>
      <image:loc>${DOMAIN}/images/${dest.slug}-atraccion-1.jpg</image:loc>
      <image:title>Atracción principal en ${escapeXml(dest.name)}</image:title>
    </image:image>
    <image:image>
      <image:loc>${DOMAIN}/images/${dest.slug}-gastronomia.jpg</image:loc>
      <image:title>Gastronomía típica de ${escapeXml(dest.name)}</image:title>
    </image:image>
    <image:image>
      <image:loc>${DOMAIN}/images/${dest.slug}-paisaje.jpg</image:loc>
      <image:title>Paisaje de ${escapeXml(dest.name)}</image:title>
    </image:image>
  </url>`;
  });

  europeanCities.forEach(city => {
    urls += `
  <url>
    <loc>${DOMAIN}/destinos/${city.slug}</loc>
    <image:image>
      <image:loc>${DOMAIN}/images/${city.slug}-principal.jpg</image:loc>
      <image:title>${escapeXml(city.name)}, ${city.country}</image:title>
      <image:caption>Vista de ${escapeXml(city.name)}</image:caption>
    </image:image>
    <image:image>
      <image:loc>${DOMAIN}/images/${city.slug}-monumento.jpg</image:loc>
      <image:title>Monumento emblemático de ${escapeXml(city.name)}</image:title>
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
    { dest: 'paris', title: 'Tour Virtual de París - 360°', titleEn: 'Paris Virtual Tour - 360°', duration: 720 },
    { dest: 'barcelona', title: 'Sagrada Familia Barcelona - Documental 4K', titleEn: 'Sagrada Familia Barcelona - 4K Documentary', duration: 1200 },
    { dest: 'roma', title: 'Roma Antigua - Paseo Virtual por el Coliseo', titleEn: 'Ancient Rome - Virtual Walk through the Colosseum', duration: 900 },
    { dest: 'amsterdam', title: 'Canales de Ámsterdam - Tour en Bote', titleEn: 'Amsterdam Canals - Boat Tour', duration: 600 },
    { dest: 'venecia', title: 'Venecia - La Ciudad del Agua', titleEn: 'Venice - The City of Water', duration: 840 },
    { dest: 'londres', title: 'Londres - Tour por la Ciudad', titleEn: 'London - City Tour', duration: 780 },
    { dest: 'berlin', title: 'Berlín Moderno - Historia y Cultura', titleEn: 'Modern Berlin - History and Culture', duration: 960 },
    { dest: 'praga', title: 'Praga - La Ciudad de las Cien Torres', titleEn: 'Prague - The City of a Hundred Spires', duration: 720 },
    { dest: 'viena', title: 'Viena Imperial - Palacios y Música', titleEn: 'Imperial Vienna - Palaces and Music', duration: 840 },
    { dest: 'santorini', title: 'Santorini - Atardeceres de Ensueño', titleEn: 'Santorini - Dreamy Sunsets', duration: 600 },
  ];

  let urls = '';
  videos.forEach(video => {
    urls += `
  <url>
    <loc>${DOMAIN}/destinos/${video.dest}</loc>
    <video:video>
      <video:thumbnail_loc>${DOMAIN}/videos/${video.dest}-thumbnail.jpg</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>Recorrido inmersivo por ${video.dest} con los principales atractivos turísticos.</video:description>
      <video:content_loc>${DOMAIN}/videos/${video.dest}-tour.mp4</video:content_loc>
      <video:duration>${video.duration}</video:duration>
      <video:upload_date>${today}</video:upload_date>
      <video:tag>Europa</video:tag>
      <video:tag>Viaje</video:tag>
      <video:tag>Turismo</video:tag>
      <video:tag>${video.dest}</video:tag>
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
  const recentPosts = blogPosts.slice(0, 10);

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
      <news:title>${escapeXml(post.title)}</news:title>
    </news:news>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;
}

export function generatePackagesSitemap(): string {
  const today = getToday();
  let urls = '';

  packages.forEach(pkg => {
    urls += `
  <url>
    <loc>${DOMAIN}/paquetes/${pkg.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${pkg.priority}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${DOMAIN}/paquetes/${pkg.slug}" />
    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}/packages/${pkg.slug}" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${DOMAIN}/pt-br/pacotes/${pkg.slug}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/paquetes/${pkg.slug}" />
  </url>`;
    
    urls += `
  <url>
    <loc>${DOMAIN}/packages/${pkg.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${pkg.priority}</priority>
  </url>`;
  });

  countryConfigs.forEach(config => {
    packages.forEach(pkg => {
      const pkgPath = config.language === 'pt' ? 'pacotes' : 'paquetes';
      urls += `
  <url>
    <loc>${DOMAIN}${config.urlPrefix}/${pkgPath}/${pkg.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${(pkg.priority - 0.05).toFixed(2)}</priority>
  </url>`;
    });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}

export function generateOffersSitemap(): string {
  const today = getToday();
  let urls = '';

  offers.forEach(offer => {
    urls += `
  <url>
    <loc>${DOMAIN}/ofertas/${offer.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${DOMAIN}/ofertas/${offer.slug}" />
    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}/offers/${offer.slug}" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${DOMAIN}/pt-br/ofertas/${offer.slug}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/ofertas/${offer.slug}" />
  </url>`;
  });

  countryConfigs.forEach(config => {
    offers.forEach(offer => {
      urls += `
  <url>
    <loc>${DOMAIN}${config.urlPrefix}/ofertas/${offer.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.80</priority>
  </url>`;
    });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}

export function generateExperiencesSitemap(): string {
  const today = getToday();
  let urls = '';

  experiences.forEach(exp => {
    urls += `
  <url>
    <loc>${DOMAIN}/experiencias/${exp.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${DOMAIN}/experiencias/${exp.slug}" />
    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}/experiences/${exp.slug}" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${DOMAIN}/pt-br/experiencias/${exp.slug}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/experiencias/${exp.slug}" />
  </url>`;
  });

  const travelStyles = [
    'verano', 'invierno', 'primavera', 'otono',
    'romantico', 'familia', 'aventura', 'lujo', 'presupuesto',
    'parejas', 'solos', 'grupos', 'tercera-edad'
  ];

  travelStyles.forEach(style => {
    urls += `
  <url>
    <loc>${DOMAIN}/travel-style/${style}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
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
    <priority>0.30</priority>
  </url>

  <url>
    <loc>${DOMAIN}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.30</priority>
  </url>

  <url>
    <loc>${DOMAIN}/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.30</priority>
  </url>

  <url>
    <loc>${DOMAIN}/cookies</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.25</priority>
  </url>

  <url>
    <loc>${DOMAIN}/condiciones-venta</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.30</priority>
  </url>

  <url>
    <loc>${DOMAIN}/politica-cancelacion</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.35</priority>
  </url>

</urlset>`;
}

function generateRobotsTxt(): string {
  return `# Robots.txt for tripseuropa.com
# Generated automatically - Multinational SEO Strategy

User-agent: *
Allow: /

# SITEMAP INDEX PRINCIPAL
Sitemap: ${DOMAIN}/sitemaps/sitemap_index.xml

# SITEMAPS POR PAÍS - ESPAÑOL
Sitemap: ${DOMAIN}/sitemaps/sitemap-co-colombia-es.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-co-mexico-es.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-co-argentina-es.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-co-peru-es.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-co-panama-es.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-co-costarica-es.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-co-dominicana-es.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-co-caribe-es.xml

# SITEMAPS POR PAÍS - INGLÉS
Sitemap: ${DOMAIN}/sitemaps/sitemap-co-colombia-en.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-co-mexico-en.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-co-argentina-en.xml

# SITEMAPS POR PAÍS - PORTUGUÉS
Sitemap: ${DOMAIN}/sitemaps/sitemap-co-brasil-pt.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-co-brasil-en.xml

# SITEMAPS DE DESTINOS EUROPEOS
Sitemap: ${DOMAIN}/sitemaps/sitemap-destinos-europa-es.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-destinos-europa-en.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-destinos-europa-pt.xml

# SITEMAPS DE CONTENIDO
Sitemap: ${DOMAIN}/sitemaps/sitemap-blog-es.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-blog-en.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-blog-pt.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-imagenes.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-videos.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-noticias.xml

# SITEMAPS ESPECIALES
Sitemap: ${DOMAIN}/sitemaps/sitemap-paquetes.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-ofertas.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-legales.xml
Sitemap: ${DOMAIN}/sitemaps/sitemap-experiencias.xml

# Disallow private/admin areas
Disallow: /api/
Disallow: /dashboard/
Disallow: /admin/
Disallow: /app/

# Allow important API endpoints for SEO
Allow: /api/seo/
`;
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

  const countryRouteMap: { [key: string]: { code: string, lang: 'es' | 'en' | 'pt' } } = {
    'sitemap-co-colombia-es.xml': { code: 'CO', lang: 'es' },
    'sitemap-co-colombia-en.xml': { code: 'CO', lang: 'en' },
    'sitemap-co-mexico-es.xml': { code: 'MX', lang: 'es' },
    'sitemap-co-mexico-en.xml': { code: 'MX', lang: 'en' },
    'sitemap-co-brasil-pt.xml': { code: 'BR', lang: 'pt' },
    'sitemap-co-brasil-en.xml': { code: 'BR', lang: 'en' },
    'sitemap-co-argentina-es.xml': { code: 'AR', lang: 'es' },
    'sitemap-co-argentina-en.xml': { code: 'AR', lang: 'en' },
    'sitemap-co-peru-es.xml': { code: 'PE', lang: 'es' },
    'sitemap-co-panama-es.xml': { code: 'PA', lang: 'es' },
    'sitemap-co-costarica-es.xml': { code: 'CR', lang: 'es' },
    'sitemap-co-dominicana-es.xml': { code: 'DO', lang: 'es' },
    'sitemap-co-caribe-es.xml': { code: 'CB', lang: 'es' },
  };

  Object.entries(countryRouteMap).forEach(([fileName, { code, lang }]) => {
    app.get(`/sitemaps/${fileName}`, (_req: Request, res: Response) => {
      res.set('Content-Type', 'application/xml');
      res.send(generateCountrySitemap(code, lang));
    });
  });

  app.get('/sitemaps/sitemap-destinos-europa-es.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateEuropeDestinationsSitemap('es'));
  });

  app.get('/sitemaps/sitemap-destinos-europa-en.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateEuropeDestinationsSitemap('en'));
  });

  app.get('/sitemaps/sitemap-destinos-europa-pt.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateEuropeDestinationsSitemap('pt'));
  });

  app.get('/sitemaps/sitemap-blog-es.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateBlogSitemap('es'));
  });

  app.get('/sitemaps/sitemap-blog-en.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateBlogSitemap('en'));
  });

  app.get('/sitemaps/sitemap-blog-pt.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateBlogSitemap('pt'));
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

  app.get('/sitemaps/sitemap-paquetes.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generatePackagesSitemap());
  });

  app.get('/sitemaps/sitemap-ofertas.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateOffersSitemap());
  });

  app.get('/sitemaps/sitemap-legales.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateLegalSitemap());
  });

  app.get('/sitemaps/sitemap-experiencias.xml', (_req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateExperiencesSitemap());
  });

  app.get('/robots.txt', (_req: Request, res: Response) => {
    res.set('Content-Type', 'text/plain');
    res.send(generateRobotsTxt());
  });

  app.get('/api/seo/countries', (_req: Request, res: Response) => {
    res.json(countryConfigs);
  });

  app.get('/api/seo/sitemap-stats', (_req: Request, res: Response) => {
    const stats = {
      totalSitemaps: 27,
      countries: countryConfigs.length,
      europeanDestinations: europeanDestinations.length,
      europeanCities: europeanCities.length,
      blogPosts: blogPosts.length,
      packages: packages.length,
      experiences: experiences.length,
      offers: offers.length,
      estimatedUrls: 
        countryConfigs.length * (europeanDestinations.length + packages.length + experiences.length) +
        europeanDestinations.length * 3 +
        europeanCities.length * 3 +
        blogPosts.length * 3 +
        packages.length * (countryConfigs.length + 2) +
        offers.length * (countryConfigs.length + 1) +
        50,
      languages: ['es', 'en', 'pt'],
    };
    res.json(stats);
  });
}
