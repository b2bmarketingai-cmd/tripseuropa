#!/usr/bin/env python3
"""
Local SEO Audit - Cross-reference sitemap URLs against actual routes and blog data.
Since the SPA returns 200 for all routes, we check if content actually exists.
"""

import requests
import xml.etree.ElementTree as ET
import csv
import re
import json
from urllib.parse import urlparse, unquote

DOMAIN = "https://tripseuropa.com"
TIMEOUT = 15
CSV_OUTPUT = "reporte_404_tripseuropa.csv"

SITEMAPS = [
    f"{DOMAIN}/sitemaps/sitemap-co-dominicana-es.xml",
    f"{DOMAIN}/sitemaps/sitemap-co-costarica-es.xml",
    f"{DOMAIN}/sitemaps/sitemap-co-peru-es.xml",
    f"{DOMAIN}/sitemaps/sitemap-destinos-europa-es.xml",
    f"{DOMAIN}/sitemaps/sitemap-co-caribe-es.xml",
    f"{DOMAIN}/sitemaps/sitemap-co-panama-es.xml",
    f"{DOMAIN}/sitemaps/sitemap-co-argentina-en.xml",
    f"{DOMAIN}/sitemaps/sitemap-co-brasil-en.xml",
    f"{DOMAIN}/sitemaps/sitemap-co-colombia-en.xml",
    f"{DOMAIN}/sitemaps/sitemap-co-argentina-es.xml",
    f"{DOMAIN}/sitemaps/sitemap-co-colombia-es.xml",
    f"{DOMAIN}/sitemaps/sitemap-general.xml",
    f"{DOMAIN}/sitemaps/sitemap-co-mexico-es.xml",
    f"{DOMAIN}/sitemaps/sitemap-experiencias.xml",
    f"{DOMAIN}/sitemaps/sitemap-legales.xml",
    f"{DOMAIN}/sitemaps/sitemap-ofertas.xml",
    f"{DOMAIN}/sitemaps/sitemap-noticias.xml",
    f"{DOMAIN}/sitemaps/sitemap-blog-pt.xml",
    f"{DOMAIN}/sitemaps/sitemap-co-mexico-en.xml",
    f"{DOMAIN}/sitemaps/sitemap-blog-en.xml",
    f"{DOMAIN}/sitemaps/sitemap-imagenes.xml",
    f"{DOMAIN}/sitemaps/sitemap-paquetes.xml",
    f"{DOMAIN}/sitemaps/sitemap-co-brasil-pt.xml",
    f"{DOMAIN}/sitemaps/sitemap-destinos-europa-en.xml",
    f"{DOMAIN}/sitemaps/sitemap-destinos-europa-pt.xml",
    f"{DOMAIN}/sitemaps/sitemap-blog-es.xml",
    f"{DOMAIN}/sitemap.xml",
    f"{DOMAIN}/sitemap-index.xml",
    f"{DOMAIN}/sitemap-es.xml",
    f"{DOMAIN}/sitemap-en.xml",
    f"{DOMAIN}/sitemap-pt-br.xml",
    f"{DOMAIN}/sitemap-es-co.xml",
    f"{DOMAIN}/sitemap-es-mx.xml",
    f"{DOMAIN}/sitemap-es-ar.xml",
]

def parse_sitemap(url):
    urls = []
    try:
        resp = requests.get(url, timeout=TIMEOUT)
        if resp.status_code != 200:
            return urls
        root = ET.fromstring(resp.content)
        ns = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        for loc in root.findall('.//ns:loc', ns):
            if loc.text and not loc.text.strip().endswith('.xml'):
                urls.append(loc.text.strip())
    except Exception as e:
        print(f"  Error parsing {url}: {e}")
    return urls

def load_routes_from_app():
    """Extract all static routes from App.tsx."""
    routes = set()
    with open('client/src/App.tsx', 'r') as f:
        content = f.read()
    
    for match in re.findall(r'path="([^"]+)"', content):
        if ':' not in match:
            routes.add(match)
    return routes

def load_blog_slugs():
    """Extract all blog slugs from blogData.ts and BlogPostsSimple.tsx."""
    slugs = set()
    
    for filepath in ['client/src/lib/blogData.ts', 'client/src/lib/blogDataExpanded.ts', 'client/src/pages/BlogPostsSimple.tsx']:
        try:
            with open(filepath, 'r') as f:
                content = f.read()
            for match in re.findall(r'(?:id|slug):\s*"([^"]+)"', content):
                slugs.add(match)
            for match in re.findall(r'(?:es|en|pt):\s*"([^"]+)"', content):
                if '/' not in match and len(match) > 5 and not match.startswith('http'):
                    slugs.add(match)
        except FileNotFoundError:
            pass
    
    return slugs

def load_destination_slugs():
    """Extract destination slugs from the codebase."""
    slugs = set()
    try:
        with open('client/src/lib/destinations.ts', 'r') as f:
            content = f.read()
        for match in re.findall(r'slug:\s*"([^"]+)"', content):
            slugs.add(match)
        for match in re.findall(r'slugEs:\s*"([^"]+)"', content):
            slugs.add(match)
    except FileNotFoundError:
        pass
    return slugs

def load_package_slugs():
    """Extract package slugs."""
    slugs = set()
    try:
        with open('client/src/pages/PackagePage.tsx', 'r') as f:
            content = f.read()
        for match in re.findall(r'"([^"]+)":\s*\{', content):
            if len(match) > 3:
                slugs.add(match)
    except FileNotFoundError:
        pass
    return slugs

def load_offer_slugs():
    """Extract offer slugs."""
    slugs = set()
    for filepath in ['client/src/pages/OfferPage.tsx', 'client/src/pages/OffersLanding.tsx']:
        try:
            with open(filepath, 'r') as f:
                content = f.read()
            for match in re.findall(r'(?:id|slug):\s*"([^"]+)"', content):
                slugs.add(match)
        except FileNotFoundError:
            pass
    return slugs

def load_experience_slugs():
    """Extract experience slugs."""
    slugs = set()
    try:
        with open('client/src/pages/ExperiencePage.tsx', 'r') as f:
            content = f.read()
        for match in re.findall(r'"([^"]+)":\s*\{', content):
            if len(match) > 3:
                slugs.add(match)
    except FileNotFoundError:
        pass
    return slugs

def check_url_has_content(path, static_routes, blog_slugs, dest_slugs, pkg_slugs, offer_slugs, exp_slugs):
    """Check if a URL path actually resolves to content."""
    
    clean_path = path.rstrip('/')
    if not clean_path:
        clean_path = '/'
    
    lang_prefixes = ['/en', '/pt-br', '/es-co', '/es-mx', '/es-ar', '/es-pe', '/es-pa', '/es-cr', '/es-do', '/en-ar', '/en-mx', '/en-co']
    
    base_path = clean_path
    for prefix in sorted(lang_prefixes, key=len, reverse=True):
        if clean_path.startswith(prefix + '/') or clean_path == prefix:
            base_path = clean_path[len(prefix):] or '/'
            break
    
    if base_path in static_routes or clean_path in static_routes:
        return True
    
    if base_path == '/' or base_path == '':
        return True
    
    blog_match = re.match(r'/blog/post/(.+)', base_path)
    if blog_match:
        slug = unquote(blog_match.group(1))
        return slug in blog_slugs
    
    if base_path == '/blog' or base_path == '/blog/':
        return True
    
    dest_match = re.match(r'/(?:destinos|destinations)/(.+)', base_path)
    if dest_match:
        slug = dest_match.group(1)
        return slug in dest_slugs
    
    if base_path in ['/destinos', '/destinations']:
        return True
    
    pkg_match = re.match(r'/(?:paquetes|packages)/(.+)', base_path)
    if pkg_match:
        slug = pkg_match.group(1)
        return slug in pkg_slugs
    
    if base_path in ['/paquetes', '/packages']:
        return True
    
    offer_match = re.match(r'/(?:ofertas|deals)/(.+)', base_path)
    if offer_match:
        slug = offer_match.group(1)
        return slug in offer_slugs
    
    exp_match = re.match(r'/(?:experiencias|experiences)/(.+)', base_path)
    if exp_match:
        slug = exp_match.group(1)
        return slug in exp_slugs
    
    simple_pages = [
        '/contacto', '/contact', '/nosotros', '/about', '/privacidad', '/privacy',
        '/testimonios', '/testimonials', '/desde-colombia', '/desde-mexico', '/desde-brasil',
        '/desde-argentina', '/desde-peru', '/desde-costa-rica', '/desde-venezuela',
        '/desde-panama', '/desde-chile', '/desde-ecuador', '/desde-caribe', '/desde-republica-dominicana',
        '/vacaciones-europa', '/foro', '/forum', '/ofertas-ultima-hora', '/vuelos', '/flights',
        '/hoteles', '/hotels', '/pago', '/payment', '/asesor-viaje', '/travel-advisor',
        '/estilos-de-viaje', '/travel-styles', '/ofertas', '/deals', '/faq',
        '/estilos-de-viagem', '/perfil', '/profile',
    ]
    if base_path in simple_pages:
        return True
    
    return False

def main():
    print("=" * 60)
    print("LOCAL SEO AUDIT: Cross-reference sitemaps vs actual content")
    print("=" * 60)
    
    print("\n[1/5] Loading routes and content slugs from codebase...")
    static_routes = load_routes_from_app()
    blog_slugs = load_blog_slugs()
    dest_slugs = load_destination_slugs()
    pkg_slugs = load_package_slugs()
    offer_slugs = load_offer_slugs()
    exp_slugs = load_experience_slugs()
    
    print(f"  Static routes: {len(static_routes)}")
    print(f"  Blog slugs: {len(blog_slugs)}")
    print(f"  Destination slugs: {len(dest_slugs)}")
    print(f"  Package slugs: {len(pkg_slugs)}")
    print(f"  Offer slugs: {len(offer_slugs)}")
    print(f"  Experience slugs: {len(exp_slugs)}")
    
    print("\n[2/5] Downloading and parsing sitemaps...")
    all_urls = set()
    for sm in SITEMAPS:
        urls = parse_sitemap(sm)
        all_urls.update(urls)
        if urls:
            print(f"  {sm.split('/')[-1]}: {len(urls)} URLs")
    
    print(f"\n  Total unique URLs: {len(all_urls)}")
    
    print("\n[3/5] Cross-referencing URLs against content...")
    missing = []
    found = 0
    
    for url in sorted(all_urls):
        parsed = urlparse(url)
        path = parsed.path
        
        has_content = check_url_has_content(path, static_routes, blog_slugs, dest_slugs, pkg_slugs, offer_slugs, exp_slugs)
        
        if has_content:
            found += 1
        else:
            missing.append(url)
    
    print(f"\n  URLs with matching content: {found}")
    print(f"  URLs WITHOUT matching content (potential 404): {len(missing)}")
    
    print("\n[4/5] Analyzing missing URLs...")
    report_rows = []
    for url in missing:
        parsed = urlparse(url)
        path = parsed.path
        
        suggestion = DOMAIN + "/"
        action = "corregir_en_sitemap"
        
        if '/blog/post/' in path:
            slug = path.split('/blog/post/')[-1]
            decoded = unquote(slug)
            cleaned = decoded.replace('ñ', 'n').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
            if cleaned in blog_slugs:
                suggestion = f"{DOMAIN}/blog/post/{cleaned}"
                action = "redireccion_301"
            else:
                suggestion = f"{DOMAIN}/blog"
                action = "corregir_en_sitemap"
        elif '/destinos/' in path or '/destinations/' in path:
            suggestion = f"{DOMAIN}/destinos"
            action = "redireccion_301"
        elif '/paquetes/' in path or '/packages/' in path:
            suggestion = f"{DOMAIN}/paquetes"
            action = "redireccion_301"
        elif '/ofertas/' in path or '/deals/' in path:
            suggestion = f"{DOMAIN}/ofertas"
            action = "redireccion_301"
        elif '/experiencias/' in path or '/experiences/' in path:
            suggestion = f"{DOMAIN}/experiencias"
            action = "redireccion_301"
        elif '/desde-' in path:
            action = "crear_pagina_nueva"
        
        report_rows.append({
            "url_original_404": url,
            "path": path,
            "url_sugerida": suggestion,
            "accion": action,
        })
        print(f"  MISSING: {path}")
        print(f"           -> {suggestion} ({action})")
    
    print(f"\n[5/5] Exporting CSV to {CSV_OUTPUT}...")
    with open(CSV_OUTPUT, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=["url_original_404", "path", "url_sugerida", "accion"])
        writer.writeheader()
        writer.writerows(report_rows)
    
    print("\n" + "=" * 60)
    print("RESUMEN")
    print("=" * 60)
    print(f"Total URLs en sitemaps:          {len(all_urls)}")
    print(f"URLs con contenido valido:       {found}")
    print(f"URLs sin contenido (404):        {len(missing)}")
    print(f"Redirecciones 301 sugeridas:     {sum(1 for r in report_rows if r['accion'] == 'redireccion_301')}")
    print(f"Paginas nuevas sugeridas:        {sum(1 for r in report_rows if r['accion'] == 'crear_pagina_nueva')}")
    print(f"Correcciones en sitemap:         {sum(1 for r in report_rows if r['accion'] == 'corregir_en_sitemap')}")
    print(f"\nReporte: {CSV_OUTPUT}")

if __name__ == "__main__":
    main()
