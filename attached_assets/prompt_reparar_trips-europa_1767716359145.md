# PROMPT COMPLETO PARA REPARAR TRIPSEUROPA.COM - PageSpeed Insights

## ANÁLISIS ACTUAL Y ESTADO CRÍTICO

### Puntuaciones Actuales (Enero 2026)
- **Móvil**: 26/100 (Crítico)
- **Escritorio**: 71/100 (Requiere mejora)

### Métricas Críticas de Rendimiento

#### Móvil (4G Lento - Moto G Power)
- **FCP (First Contentful Paint)**: 6.0s ❌ (Objetivo: <1.8s)
- **LCP (Largest Contentful Paint)**: Error NO_LCP ❌
- **TBT (Total Blocking Time)**: Error NO_LCP ❌
- **CLS (Cumulative Layout Shift)**: 0 ✓
- **Speed Index**: 6.8s ❌ (Objetivo: <3.4s)
- **Tamaño total de carga**: 7,698 KiB (CRÍTICO)

#### Escritorio (Conexión personalizada)
- **FCP**: 1.2s ✓
- **LCP**: 5.5s ❌ (Objetivo: <2.5s)
- **TBT**: 100ms ⚠️ (Límite: <200ms)
- **CLS**: 0 ✓
- **Speed Index**: 1.6s ✓
- **Tamaño total de carga**: 8,254 KiB (CRÍTICO)

---

## PROBLEMAS IDENTIFICADOS Y SOLUCIONES

### 1. OPTIMIZACIÓN DE IMÁGENES (Mayor impacto: -3,665 KiB móvil / -3,784 KiB escritorio)

#### Problema Crítico
- Logo "Trips Europa": 1,404 KiB PNG (debería ser <50 KiB)
- Sofia avatar: 1,228 KiB PNG (debería ser <100 KiB)
- Imágenes Unsplash: 2,338 KiB combinadas sin optimización
- Uso de formato PNG en lugar de WebP/AVIF

#### Soluciones Implementar

```bash
# 1. Convertir logo a WebP/AVIF
npx imagemin assets/erasebg-transformed_2.png --out-dir=assets --plugin=webp
npx imagemin assets/erasebg-transformed_2.png --out-dir=assets --plugin=avif

# 2. Redimensionar según uso
- Logo: Cambiar de 2752x1536px a 420x90px (actual uso)
- Sofia: Cambiar de 1024x1024px a 64x64px (actual uso en móvil)

# 3. Implementar HTML responsivo con srcset
<picture>
  <source srcset="/assets/logo.avif" type="image/avif">
  <source srcset="/assets/logo.webp" type="image/webp">
  <img src="/assets/logo.png" alt="Trips Europa" loading="eager" width="420" height="90">
</picture>

# 4. Optimizar imágenes Unsplash con parámetros URL
# Agregar: &q=60 (reduce calidad a 60% aceptable) y w=optimal según viewport
```

#### Archivos a Modificar
- `src/components/Logo.tsx` - Implementar picture element y srcset
- `src/components/TeamCard.tsx` - Sofia image optimization
- `src/pages/Home.tsx` - Todas las imágenes de viajes

---

### 2. ELIMINAR SOLICITUDES QUE BLOQUEAN RENDERIZADO (Ahorro: 40ms escritorio)

#### Problema
- CSS bloqueante: `/assets/index-CvgwrDbf.css` (19.7 KiB, 140ms)
- Google Fonts bloqueante: (1.7 KiB, 120ms)

#### Solución

```html
<!-- En <head> -->
<!-- Preload crítico -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="font" href="https://fonts.gstatic.com/s/roboto/v29/..." crossorigin>

<!-- CSS inline crítico (Above the fold) -->
<style>
  /* Estilos mínimos para hero section y nav */
  body { margin: 0; font-family: Roboto; }
  .nav { ... }
</style>

<!-- CSS deferred -->
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- Google Fonts async -->
<link href="https://fonts.googleapis.com/css2?family=...&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
```

#### Archivos a Modificar
- `index.html` - Agregar preconnect y preload
- `vite.config.ts` - Configurar inline de CSS crítico
- `src/main.css` - Dividir en crítico y no-crítico

---

### 3. REDUCIR TAMAÑO JAVASCRIPT (Ahorro: 232 KiB escritorio)

#### Problema
- `index-BV8QGvJB.js`: 707.8 KiB (Too large, no source maps)
- 232 KiB código no utilizado en carga inicial

#### Soluciones

```javascript
// 1. Code Splitting por rutas
// vite.config.ts
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'router': ['./src/pages/'],
          'ui': ['./src/components/UI/'],
          'utils': ['./src/utils/']
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
}

// 2. Lazy load no-critical pages
const BookingPage = lazy(() => import('./pages/Booking'));
const BlogPage = lazy(() => import('./pages/Blog'));

// 3. Tree-shaking - Eliminar imports no usados
// Auditar: utils, components, libraries

// 4. Minificar agresivamente
// vite.config.ts
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true
    }
  }
}
```

#### Archivos a Modificar
- `vite.config.ts` - Configurar code splitting
- `src/main.tsx` - Implementar lazy loading
- `src/components/` - Auditar imports innecesarios

---

### 4. REDUCIR TAMAÑO CSS (Ahorro: 15 KiB escritorio)

#### Problema
- `index-CvgwrDbf.css`: 19.1 KiB con reglas no utilizadas (14.7 KiB sin usar)
- Posible CSS duplicado de Tailwind

#### Solución

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        require('postcss-import'),
        require('tailwindcss/nesting'),
        require('tailwindcss'),
        require('autoprefixer'),
        require('cssnano')({
          preset: ['default', {
            discardComments: { removeAll: true },
            normalizeUniqueSelectors: true
          }]
        })
      ]
    }
  }
})

// tailwind.config.ts - Purge unused styles
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    // Safelist dynamic classes only if necessary
  ],
  theme: {
    // Optimizar paleta de colores usados
  },
  corePlugins: {
    // Deshabilitar utilidades no usadas
    preflight: true,
  }
}
```

---

### 5. CORREGIR REFLOWS FORZADOS (Ahorro: 99-123 ms)

#### Problema
- `index-BV8QGvJB.js:2:10700` - 99ms reflow
- `index-BV8QGvJB.js:149:156276` - 97ms reflow
- JavaScript lee propiedades geométricas provocando reflows en cascada

#### Solución

```javascript
// Identificar y corregir:
// ❌ MAL
function measureAndUpdate() {
  let height = element.offsetHeight; // REFLOW
  element.style.marginTop = height + 'px'; // REFLOW
}

// ✓ BIEN
function measureAndUpdate() {
  let height = element.offsetHeight;
  requestAnimationFrame(() => {
    element.style.marginTop = height + 'px';
  });
}

// Usar Intersection Observer para lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Trigger lazy load sin medir DOM
    }
  });
});

// Agrupar lecturas y escrituras
// Usar libraries como: dom-read-write-batch, fastdom
```

#### Auditar Archivos
- `src/components/Carousel.tsx` - Likely culprit
- `src/hooks/useScroll.ts` - Si existe
- `src/utils/animations.ts`

---

### 6. RESOLVER ERRORES DE CARGA (401 y 429)

#### Problema
- Error 401: `...auth/user:1:0` - Solicitud no autorizada
- Error 429: `ipapi.co/json/` - Rate limited (demasiadas solicitudes)

#### Solución

```javascript
// 1. Eliminar o cachear auth/user
// Si es para datos de usuario, cachear 1 hora
const getCachedUser = async () => {
  const cached = localStorage.getItem('user_cache');
  const cacheTime = localStorage.getItem('user_cache_time');
  
  if (cached && Date.now() - parseInt(cacheTime) < 3600000) {
    return JSON.parse(cached);
  }
  
  try {
    const res = await fetch('/api/auth/user');
    if (res.status === 401) {
      // Handle error gracefully
      return null;
    }
  } catch (e) {
    // Use cached or default
  }
}

// 2. Reemplazar ipapi.co (rate limited)
// Opción A: Usar GeoIP nativo del servidor
// Opción B: Usar MaxMind o similar con presupuesto
// Opción C: Eliminar si no es crítico

// No cargar automáticamente, solo si es necesario
if (needsGeoLocation) {
  // Lazy load después de interaction
}
```

#### Archivos a Auditar
- `src/api/` - Encontrar llamadas a auth/user
- `src/utils/geo.ts` - Eliminar o refactorizar ipapi.co
- `src/main.tsx` - Remover llamadas automáticas

---

### 7. MEJORAR LCP (Largest Contentful Paint) - ESCRITORIO: 5.5s → 2.5s

#### Problema
- LCP Element: Imagen "Gran Tour de Europa" de Unsplash (2.5s)
- Desglose: 950ms delay de carga + 370ms render delay
- Fetchpriority no aplicada

#### Solución

```html
<!-- Aplicar fetchpriority=high al LCP element -->
<img 
  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1920&auto=format&fit=crop" 
  alt="Gran Tour de Europa" 
  loading="eager"
  fetchpriority="high"
  width="1920"
  height="1002"
  class="w-full h-full object-cover"
/>

<!-- Alternative: Preload LCP image -->
<link rel="preload" as="image" href="[LCP_IMAGE_URL]" imagesrcset="...">

<!-- Critical: Usar Unsplash con parámetros optimizados -->
<!-- Cambiar: w=1920 → w=1342 (actual viewport width) -->
<!-- Agregar: &q=60 para mejor ratio calidad/tamaño -->
```

#### Optimizar Unsplash URLs
```javascript
// Crear helper para URLs optimizadas
const getOptimizedUnsplashUrl = (imageId, width = 1920, quality = 75) => {
  return `https://images.unsplash.com/photo-${imageId}?q=${quality}&w=${width}&auto=format&fit=crop`;
};

// Uso en carousels
<img src={getOptimizedUnsplashUrl('1502602898657-3e91760cbb34', 1342, 60)} />
```

#### Archivos a Modificar
- `src/components/HeroSection.tsx` - Agregar fetchpriority
- `src/components/CarouselCard.tsx` - Optimizar URLs Unsplash
- `src/utils/imageHelpers.ts` - Crear funciones auxiliares

---

### 8. AGREGAR SOURCE MAPS PARA DEBUGGING

#### Problema
- No hay mapas de origen para JavaScript
- Dificulta debugging en producción

#### Solución

```javascript
// vite.config.ts
export default {
  build: {
    sourcemap: 'hidden', // En producción, no exponer publicamente
    // O usar: sourcemap: true (exponer para debugging)
  }
}

// Luego descargar/respaldar localmente:
// Tener acceso privado en servidor de staging
```

---

### 9. IMPLEMENTAR POLÍTICAS DE SEGURIDAD

#### Problemas Críticos Detectados
- No hay CSP (Content Security Policy)
- No hay HSTS implementado
- No hay COOP (Cross-Origin-Opener-Policy)
- No hay X-Frame-Options

#### Solución (en servidor/vercel.json/nginx)

```javascript
// vercel.json o headers configuration
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://images.unsplash.com https://api.ipapi.co; frame-ancestors 'none'"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

### 10. PROBLEMAS DE ACCESIBILIDAD (Puntuación: 85/100)

#### Errores Detectados

1. **Botones sin nombres accesibles**: 15+ botones
   ```html
   <!-- ❌ MAL -->
   <button class="w-8 h-8 rounded-full">◀</button>
   
   <!-- ✓ BIEN -->
   <button aria-label="Anterior" class="w-8 h-8 rounded-full">◀</button>
   ```

2. **Contraste insuficiente**: Elemento "text-accent"
   ```css
   /* Aumentar contraste -->
   .text-accent {
     color: #0066cc; /* Cambiar si es < 4.5:1 ratio */
   }
   ```

3. **Puntos de referencia faltantes**
   ```html
   <main role="main">
     <!-- Contenido principal -->
   </main>
   ```

4. **Orden de encabezados incorrecto**
   - Footer h4 debería ser h2
   ```html
   <!-- ❌ MAL -->
   <footer>
     <h4>DESTINOS POPULARES</h4>
   </footer>
   
   <!-- ✓ BIEN -->
   <footer>
     <h2 class="text-sm">DESTINOS POPULARES</h2>
   </footer>
   ```

#### Archivos a Auditar
- `src/components/Navigation.tsx`
- `src/components/Carousel.tsx`
- `src/components/Footer.tsx`
- Agregar aria-labels a todos los buttons sin texto

---

## PLAN DE IMPLEMENTACIÓN - ORDEN DE PRIORIDAD

### FASE 1: CRÍTICO (Semana 1)
1. ✅ Optimizar imágenes PNG → WebP/AVIF (-3,700 KiB)
2. ✅ Implementar lazy loading de imágenes
3. ✅ Aplicar fetchpriority high al LCP image
4. ✅ Resolver errores 401/429

**Resultado esperado**: Móvil 26→45, Escritorio 71→82

### FASE 2: IMPORTANTE (Semana 2)
5. ✅ Code splitting JavaScript (-232 KiB)
6. ✅ Eliminar CSS no utilizado (-15 KiB)
7. ✅ Preconectar a orígenes críticos
8. ✅ Corregir reflows forzados

**Resultado esperado**: Móvil 45→65, Escritorio 82→90

### FASE 3: MEJORAS (Semana 3)
9. ✅ Implementar CSP y HSTS
10. ✅ Corregir accesibilidad (botones, contraste, orden)
11. ✅ Implementar source maps
12. ✅ Cacheo agresivo (Service Worker)

**Resultado esperado**: Móvil 65→85+, Escritorio 90→95+

---

## COMANDOS DE VALIDACIÓN

```bash
# Después de cada cambio:
npm run build

# Analizar bundle size
npm install -g webpack-bundle-analyzer
npm run build && webpack-bundle-analyzer dist/stats.json

# Test local performance
npm run preview
# Visitar: http://localhost:4173

# Re-correr PageSpeed
# Esperar 7 días para caché de Lighthouse (o usar incógnito)
# https://pagespeed.web.dev/analysis/https-tripseuropa-com/kgnz7w7ofa
```

---

## CONFIGURACIÓN RECOMENDADA FINAL

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'brotliCompress',
      threshold: 1024,
      ext: '.br'
    })
  ],
  build: {
    target: 'ES2020',
    minify: 'terser',
    sourcemap: 'hidden',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['./src/components/UI/']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=3600'
    }
  }
})
```

---

## MÉTRICAS OBJETIVO FINAL

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| **Puntuación Móvil** | 26 | 80+ |
| **Puntuación Escritorio** | 71 | 92+ |
| **FCP Móvil** | 6.0s | <3.0s |
| **LCP Escritorio** | 5.5s | <2.5s |
| **Tamaño Bundle** | 707.8 KiB | <400 KiB |
| **Total Carga** | 7,698 KiB | <4,000 KiB |

---

## NOTAS IMPORTANTES

1. **Imágenes Unsplash**: Todas están usando width=1920, pero viewport real es 1340px. Ahorrar ~30% reduciendo width parámetro.

2. **DOM Size**: 1,680 elementos totales es aceptable. Posible optimización: virtualización de listas largas en carousels.

3. **Rate Limiting ipapi.co**: Si se mantiene, implementar cacheo localStorage de 1 hora mínimo.

4. **React Hydration**: Si usa SSR, asegurar que no hay diferencias entre servidor y cliente que causen re-renders innecesarios.

5. **Monitoreo Continuo**: Usar Web Vitals API para monitorear en producción:
   ```javascript
   import { getCLS, getFID, getLCP } from 'web-vitals';
   getCLS(console.log);
   getFID(console.log);
   getLCP(console.log);
   ```

---

**Documento generado**: Enero 6, 2026
**Herramienta**: PageSpeed Insights Analysis
**Objetivo**: Pasar de 26→80+ (móvil) y 71→92+ (escritorio)
