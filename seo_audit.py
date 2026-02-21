#!/usr/bin/env python3
"""
SEO Audit Script for tripseuropa.com
Scans all sitemaps, detects 404 URLs, suggests fixes, exports CSV report.
"""

import requests
import xml.etree.ElementTree as ET
import csv
import time
import sys
from urllib.parse import urlparse, unquote
from concurrent.futures import ThreadPoolExecutor, as_completed

# ============ CONFIGURATION ============
DOMAIN = "https://tripseuropa.com"
TIMEOUT = 15
SLEEP_BETWEEN_REQUESTS = 0.1
MAX_WORKERS = 10

SITEMAPS_IN_DIRECTORY = [
    "sitemap-co-dominicana-es.xml",
    "sitemap-co-costarica-es.xml",
    "sitemap-co-peru-es.xml",
    "sitemap-destinos-europa-es.xml",
    "sitemap-co-caribe-es.xml",
    "sitemap-co-panama-es.xml",
    "sitemap-co-argentina-en.xml",
    "sitemap-co-brasil-en.xml",
    "sitemap-co-colombia-en.xml",
    "sitemap-co-argentina-es.xml",
    "sitemap-co-colombia-es.xml",
    "sitemap-general.xml",
    "sitemap-co-mexico-es.xml",
    "sitemap-experiencias.xml",
    "sitemap-legales.xml",
    "sitemap-ofertas.xml",
    "sitemap-noticias.xml",
    "sitemap-blog-pt.xml",
    "sitemap-co-mexico-en.xml",
    "sitemap-blog-en.xml",
    "sitemap-imagenes.xml",
    "sitemap-paquetes.xml",
    "sitemap-co-brasil-pt.xml",
    "sitemap-destinos-europa-en.xml",
    "sitemap-destinos-europa-pt.xml",
    "sitemap-blog-es.xml",
]

SITEMAPS_IN_ROOT = [
    "sitemap.xml",
    "sitemap-index.xml",
    "sitemap-es.xml",
    "sitemap-en.xml",
    "sitemap-pt-br.xml",
    "sitemap-es-co.xml",
    "sitemap-es-mx.xml",
    "sitemap-es-ar.xml",
]

CSV_OUTPUT = "reporte_404_tripseuropa.csv"
# ========================================

def get_sitemap_urls():
    """Build list of all sitemap URLs."""
    urls = []
    for name in SITEMAPS_IN_DIRECTORY:
        urls.append(f"{DOMAIN}/sitemaps/{name}")
    for name in SITEMAPS_IN_ROOT:
        urls.append(f"{DOMAIN}/{name}")
    return urls

def parse_sitemap(sitemap_url):
    """Download and parse a sitemap XML, returning all <loc> URLs."""
    all_urls = []
    try:
        resp = requests.get(sitemap_url, timeout=TIMEOUT)
        if resp.status_code != 200:
            print(f"  WARNING: Sitemap {sitemap_url} returned {resp.status_code}")
            return all_urls
        
        root = ET.fromstring(resp.content)
        ns = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        
        for loc in root.findall('.//ns:loc', ns):
            url = loc.text.strip() if loc.text else None
            if url:
                all_urls.append(url)
        
        print(f"  Parsed {sitemap_url}: {len(all_urls)} URLs")
    except ET.ParseError as e:
        print(f"  ERROR parsing {sitemap_url}: {e}")
    except requests.RequestException as e:
        print(f"  ERROR fetching {sitemap_url}: {e}")
    
    return all_urls

def check_url(url):
    """Check a single URL and return (url, status_code)."""
    try:
        resp = requests.head(url, timeout=TIMEOUT, allow_redirects=True)
        return (url, resp.status_code)
    except requests.RequestException:
        try:
            resp = requests.get(url, timeout=TIMEOUT, allow_redirects=True, stream=True)
            return (url, resp.status_code)
        except requests.RequestException as e:
            return (url, f"ERROR: {e}")

def suggest_fix(url_404, all_valid_urls):
    """Suggest a fix for a 404 URL."""
    parsed = urlparse(url_404)
    path = parsed.path.rstrip('/')
    
    lang_prefixes = ['/en', '/pt-br', '/es-co', '/es-mx', '/es-ar', '/es-pe', '/es-pa', '/es-cr', '/es-do']
    
    base_path = path
    for prefix in lang_prefixes:
        if path.startswith(prefix):
            base_path = path[len(prefix):]
            break
    
    candidates = []
    
    for prefix in ['', '/en', '/pt-br', '/es-co', '/es-mx', '/es-ar']:
        candidate = f"{DOMAIN}{prefix}{base_path}"
        if candidate != url_404 and candidate in all_valid_urls:
            candidates.append(candidate)
    
    if base_path.startswith('/destinos/'):
        slug = base_path.split('/')[-1]
        alt = f"{DOMAIN}/destinations/{slug}"
        if alt in all_valid_urls:
            candidates.append(alt)
    
    if base_path.startswith('/destinations/'):
        slug = base_path.split('/')[-1]
        alt = f"{DOMAIN}/destinos/{slug}"
        if alt in all_valid_urls:
            candidates.append(alt)
    
    if base_path.startswith('/blog/post/'):
        slug = base_path.split('/')[-1]
        decoded = unquote(slug)
        if decoded != slug:
            cleaned = decoded.replace('ñ', 'n').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
            alt = f"{DOMAIN}/blog/post/{cleaned}"
            if alt in all_valid_urls:
                candidates.append(alt)
    
    if candidates:
        return candidates[0], "redireccion_301"
    
    if '/blog/' in path:
        return f"{DOMAIN}/blog", "redireccion_301"
    if '/destinos/' in path or '/destinations/' in path:
        return f"{DOMAIN}/destinos", "redireccion_301"
    if '/paquetes/' in path:
        return f"{DOMAIN}/paquetes", "redireccion_301"
    if '/desde-' in path:
        return f"{DOMAIN}/", "crear_pagina_nueva"
    
    return f"{DOMAIN}/", "corregir_en_sitemap"

def main():
    print("=" * 60)
    print("SEO AUDIT: tripseuropa.com")
    print("=" * 60)
    
    print("\n[1/4] Downloading and parsing sitemaps...")
    sitemap_urls = get_sitemap_urls()
    
    all_page_urls = set()
    sub_sitemaps = set()
    
    for sm_url in sitemap_urls:
        urls = parse_sitemap(sm_url)
        for u in urls:
            if u.endswith('.xml'):
                sub_sitemaps.add(u)
            else:
                all_page_urls.add(u)
    
    for sub_sm in sub_sitemaps:
        if sub_sm not in sitemap_urls:
            urls = parse_sitemap(sub_sm)
            for u in urls:
                if not u.endswith('.xml'):
                    all_page_urls.add(u)
    
    all_page_urls = list(all_page_urls)
    print(f"\nTotal unique URLs to check: {len(all_page_urls)}")
    
    print("\n[2/4] Checking all URLs for status codes...")
    results = []
    errors_404 = []
    other_errors = []
    
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_url = {executor.submit(check_url, url): url for url in all_page_urls}
        done_count = 0
        for future in as_completed(future_to_url):
            done_count += 1
            url, status = future.result()
            results.append((url, status))
            if status == 404:
                errors_404.append(url)
            elif isinstance(status, str) or (isinstance(status, int) and status >= 400):
                other_errors.append((url, status))
            if done_count % 50 == 0:
                print(f"  Checked {done_count}/{len(all_page_urls)} URLs...")
    
    print(f"\n  Total checked: {len(results)}")
    print(f"  404 errors: {len(errors_404)}")
    print(f"  Other errors: {len(other_errors)}")
    
    valid_urls = set(url for url, status in results if status == 200)
    
    print("\n[3/4] Generating fix suggestions...")
    report_rows = []
    for url_404 in sorted(errors_404):
        suggested_url, action = suggest_fix(url_404, valid_urls)
        report_rows.append({
            "url_original_404": url_404,
            "url_sugerida": suggested_url,
            "accion": action
        })
        print(f"  404: {url_404}")
        print(f"       -> {suggested_url} ({action})")
    
    print(f"\n[4/4] Exporting CSV report to {CSV_OUTPUT}...")
    with open(CSV_OUTPUT, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=["url_original_404", "url_sugerida", "accion"])
        writer.writeheader()
        writer.writerows(report_rows)
    
    print("\n" + "=" * 60)
    print("RESUMEN")
    print("=" * 60)
    print(f"Total URLs analizadas:           {len(results)}")
    print(f"Total URLs con 404:              {len(errors_404)}")
    print(f"Redirecciones 301 sugeridas:     {sum(1 for r in report_rows if r['accion'] == 'redireccion_301')}")
    print(f"Paginas nuevas sugeridas:        {sum(1 for r in report_rows if r['accion'] == 'crear_pagina_nueva')}")
    print(f"Correcciones en sitemap:         {sum(1 for r in report_rows if r['accion'] == 'corregir_en_sitemap')}")
    print(f"\nReporte exportado a: {CSV_OUTPUT}")
    
    if other_errors:
        print(f"\nOtros errores ({len(other_errors)}):")
        for url, status in sorted(other_errors):
            print(f"  {status}: {url}")

if __name__ == "__main__":
    main()
