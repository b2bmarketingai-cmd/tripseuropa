# 🔥 GUÍA CRÍTICA: REPARAR RENDIMIENTO MÓVIL TRIPSEUROPA.COM
## De 26/100 → 80+/100 en 7 días

**Estado Actual**: Móvil 26/100 (Crítico) | FCP: 6.0s | Speed Index: 6.8s | Carga: 7,698 KiB
**Objetivo**: Móvil 80+/100 | FCP: <2.5s | Speed Index: <3.5s | Carga: <3,500 KiB

---

## ⚠️ PROBLEMAS CRÍTICOS EN ORDEN DE IMPACTO

### 1️⃣ IMÁGENES GIGANTES (Mayor impacto: -3,665 KiB | 47.6% carga total)

**Culpables Identificados:**
```
1. Logo "Trips Europa": 1,404.8 KiB (PNG, 2752x1536px)
   Uso real: 228x127px en móvil
   Ahorro potencial: 1,394.7 KiB (99.3%)

2. Sofia avatar: 1,228.8 KiB (PNG, 1024x1024px)
   Uso real: 105x105px en móvil
   Ahorro potencial: 1,215.4 KiB (98.9%)

3. Unsplash carousels: 2,338.7 KiB (5 imágenes, q=80, w=1920)
   Viewport móvil: 390px ancho
   Ahorro potencial: 1,038.8 KiB (44.4%)
```

**Soluciones INMEDIATAS:**

### A) Logo - Reducir de 1,404 KiB a 30 KiB

```bash
# PASO 1: Redimensionar archivo original
# De: 2752x1536px a 420x90px
# Usar ImageMagick o online converter
convert erasebg-transformed_2.png -resize 420x90 logo-420.png

# PASO 2: Convertir a formato moderno
npx imagemin logo-420.png --out-dir=assets --plugin=webp
# Resultado esperado: ~15-20 KiB

# PASO 3: Crear versiones múltiples para responsive
# Móvil (280px): logo-280.webp (~12 KiB)
# Tablet (360px): logo-360.webp (~15 KiB)
# Desktop (420px): logo-420.webp (~18 KiB)
```

**Cambiar en src/components/Logo.tsx:**
```tsx
export function Logo() {
  return (
    <picture>
      {/* AVIF para navegadores modernos */}
      <source 
        srcSet="
          /assets/logo-280.avif 280w,
          /assets/logo-360.avif 360w,
          /assets/logo-420.avif 420w
        "
        type="image/avif"
      />
      
      {/* WebP como fallback */}
      <source 
        srcSet="
          /assets/logo-280.webp 280w,
          /assets/logo-360.webp 360w,
          /assets/logo-420.webp 420w
        "
        type="image/webp"
      />
      
      {/* PNG como último fallback */}
      <img 
        src="/assets/logo-420.png"
        alt="Trips Europa"
        className="w-auto object-contain max-w-[280px] md:max-w-[360px] lg:max-w-[420px]"
        loading="eager"
        width="420"
        height="90"
      />
    </picture>
  );
}
```

**Resultado esperado**: 1,404 KiB → 18 KiB ✓

---

### B) Sofia Avatar - Reducir de 1,228 KiB a 25 KiB

```bash
# Redimensionar a tamaño real
convert sofia.png -resize 128x128 sofia-128.png

# Convertir a WebP
npx imagemin sofia-128.png --out-dir=assets --plugin=webp
# Resultado esperado: ~20-25 KiB
```

**Cambiar en src/components/TeamCard.tsx:**
```tsx
<picture>
  <source srcSet="/assets/sofia-128.avif" type="image/avif" />
  <source srcSet="/assets/sofia-128.webp" type="image/webp" />
  <img
    src="/assets/sofia-128.png"
    alt="Sofia"
    className="w-16 h-16 rounded-full object-cover border-2 border-accent mx-auto mb-3"
    loading="lazy"
    width="128"
    height="128"
  />
</picture>
```

**Resultado esperado**: 1,228 KiB → 25 KiB ✓

---

### C) Unsplash Carousels - Reducir de 2,338 KiB a 1,300 KiB

**Problema**: Todas usan w=1920 pero móvil es 390px ancho

```javascript
// Crear helper optimizado para Unsplash
// src/utils/imageOptimization.ts

export const getOptimizedImageUrl = (
  unsplashId: string,
  width: number,
  quality: number = 75
): string => {
  return `https://images.unsplash.com/photo-${unsplashId}?q=${quality}&w=${width}&auto=format&fit=crop`;
};

export const getResponsiveImageSrcSet = (
  unsplashId: string,
  baseQuality: number = 75
): { srcset: string; sizes: string } => {
  return {
    srcset: `
      ${getOptimizedImageUrl(unsplashId, 390, baseQuality)} 390w,
      ${getOptimizedImageUrl(unsplashId, 600, baseQuality)} 600w,
      ${getOptimizedImageUrl(unsplashId, 1024, baseQuality)} 1024w,
      ${getOptimizedImageUrl(unsplashId, 1920, baseQuality)} 1920w
    `,
    sizes: "(max-width: 640px) 390px, (max-width: 1024px) 600px, 1024px"
  };
};
```

**Cambiar todas las imágenes Unsplash:**
```tsx
import { getResponsiveImageSrcSet } from '@/utils/imageOptimization';

function CarouselCard({ unsplashId, title }) {
  const imageSrcSet = getResponsiveImageSrcSet(unsplashId, 60); // Q=60 es suficiente
  
  return (
    <img
      srcSet={imageSrcSet.srcset}
      sizes={imageSrcSet.sizes}
      src={`https://images.unsplash.com/photo-${unsplashId}?q=60&w=390&auto=format&fit=crop`}
      alt={title}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  );
}
```

**Resultado esperado**: 2,338 KiB → 1,300 KiB ✓

---

## 2️⃣ REFLOWS FORZADOS (Ahorro: 196ms | Critical Blocking Time)

**Ubicación del problema:**
- `/assets/index-BV8QGvJB.js:2:10700` → 99ms reflow
- `/assets/index-BV8QGvJB.js:149:156276` → 97ms reflow

**Probable causa**: Medición de alturas en carousels o animaciones

**Solución INMEDIATA:**

```javascript
// ❌ MAL (Causando reflow)
function handleCarouselScroll() {
  const container = document.querySelector('.carousel-container');
  const height = container.offsetHeight; // REFLOW #1
  const width = container.offsetWidth;   // REFLOW #2
  
  container.style.marginTop = height + 'px'; // REFLOW #3
}

// ✓ BIEN (Sin reflows innecesarios)
function handleCarouselScroll() {
  // Leer todas las propiedades primero (batch reads)
  const container = document.querySelector('.carousel-container');
  const rect = container.getBoundingClientRect(); // Una única lectura
  const { height, width } = rect;
  
  // Luego hacer todas las escrituras (batch writes)
  requestAnimationFrame(() => {
    container.style.marginTop = height + 'px';
  });
}

// O mejor: Usar Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // No medir dimensiones aquí
    }
  });
});

observer.observe(document.querySelector('.carousel-container'));
```

**Auditar estos archivos:**
```bash
# Buscar problemas de reflow
grep -r "offsetHeight\|offsetWidth\|getBoundingClientRect" src/
grep -r "element.style" src/
```

---

## 3️⃣ SOLICITUDES BLOQUEANTES (Ahorro: 20ms)

**Problema:**
- CSS bloqueante: 19.7 KiB (140ms en escritorio)
- Google Fonts bloqueante: 1.7 KiB

**Solución en index.html:**

```html
<!-- ANTES: Bloqueante -->
<link rel="stylesheet" href="/assets/index-CvgwrDbf.css">
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">

<!-- DESPUÉS: Optimizado -->
<!-- Preconnect a orígenes críticos -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload fuentes críticas -->
<link rel="preload" as="font" type="font/woff2"
  href="https://fonts.gstatic.com/s/playfairdisplay/v40/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgEM86xQ.woff2"
  crossorigin>

<!-- CSS inline crítico (above the fold) -->
<style>
  /* Estilos mínimos para cargar rapidez */
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; }
  header { background: #fff; }
  .hero { min-height: 100vh; }
  /* ... máximo 2 KiB */
</style>

<!-- CSS deferred (no bloqueante) -->
<link rel="stylesheet" href="/assets/index-CvgwrDbf.css" 
  media="print" onload="this.media='all'">
<noscript>
  <link rel="stylesheet" href="/assets/index-CvgwrDbf.css">
</noscript>

<!-- Google Fonts async -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&display=swap" 
  rel="stylesheet" media="print" onload="this.media='all'">
<noscript>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=...">
</noscript>
```

---

## 4️⃣ JAVASCRIPT NO UTILIZADO (Ahorro: -232 KiB en escritorio, estimar -150 KiB móvil)

**Actual**: 707.8 KiB en un solo archivo

**Solución: Code Splitting en vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'ES2020',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor libraries (react, react-dom)
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          
          // UI components
          if (id.includes('src/components/UI/')) {
            return 'ui-components';
          }
          
          // Pages (lazy load)
          if (id.includes('src/pages/')) {
            return 'pages';
          }
          
          // Utils
          if (id.includes('src/utils/')) {
            return 'utils';
          }
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2
      },
      mangle: true
    }
  }
})
```

**Lazy Load Pages:**
```tsx
// src/main.tsx
import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('./pages/Home'))
const BookingPage = lazy(() => import('./pages/Booking'))
const BlogPage = lazy(() => import('./pages/Blog'))

export function Routes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {/* Route definitions */}
    </Suspense>
  )
}
```

---

## 5️⃣ PLAN DE EJECUCIÓN - 7 DÍAS

### 📅 DÍA 1: Imágenes (Máximo impacto)

```bash
# 1. Redimensionar logo
convert assets/erasebg-transformed_2_*.png -resize 420x90 assets/logo-420.png

# 2. Convertir a WebP
npm install -D imagemin imagemin-webp imagemin-avif
npx imagemin assets/logo-420.png --out-dir=assets --plugin=webp

# 3. Actualizar componente Logo.tsx
# (Ver código arriba)

# 4. Redimensionar Sofia
convert assets/sofia.png -resize 128x128 assets/sofia-128.png
npx imagemin assets/sofia-128.png --out-dir=assets --plugin=webp

# 5. Actualizar componente TeamCard.tsx
# (Ver código arriba)

# 6. Crear helper Unsplash
# Copiar getOptimizedImageUrl a src/utils/imageOptimization.ts

# Test local
npm run build
npm run preview
# Verificar que las imágenes carguen y sean <30 KiB
```

**Resultado esperado DÍA 1:**
- Bundle: 7,698 KiB → 4,800 KiB
- FCP: 6.0s → 4.5s
- Puntuación móvil: 26 → 45

---

### 📅 DÍA 2-3: HTML y Solicitudes Bloqueantes

```bash
# 1. Actualizar index.html
# (Copiar sección HTML de arriba)

# 2. Crear CSS crítico
# src/styles/critical.css (máximo 2 KiB)

# 3. Auditar carousels para reflows
grep -r "offsetHeight\|offsetWidth" src/ > reflow-audit.txt

# 4. Ejecutar build
npm run build

# 5. Medir
npm run preview
# Chrome DevTools: Performance tab
```

**Resultado esperado DÍA 3:**
- FCP: 4.5s → 2.8s
- Puntuación móvil: 45 → 60

---

### 📅 DÍA 4-5: Code Splitting

```bash
# 1. Actualizar vite.config.ts
# (Copiar config de arriba)

# 2. Implementar lazy loading de rutas

# 3. Build y analizar
npm run build
npm install -g rollup-plugin-visualizer
npm run build -- --visualizer

# 4. Verificar bundle analysis
# Abrir stats.html para ver chunks
```

**Resultado esperado DÍA 5:**
- Bundle JS: 707.8 KiB → 450 KiB
- Puntuación móvil: 60 → 72

---

### 📅 DÍA 6-7: Testing y Optimizaciones Finales

```bash
# 1. Lighthouse audit local
npm run preview
# Abrir en Chrome: chrome://lighthouse

# 2. Actualizar Unsplash URLs en todos los carousels
# Buscar: w=1920&q=80
# Reemplazar: w=390&q=60 (móvil)

# 3. Auditar console errors
# Resolver 401 y 429 errors

# 4. Test final
npm run build
# Esperar caché de PageSpeed (7 días) o usar incógnito
```

---

## 🚀 COMANDOS RÁPIDOS

```bash
# Instalar dependencias necesarias
npm install -D imagemin imagemin-webp imagemin-avif vite-plugin-compression

# Procesar imágenes masivamente
npx imagemin assets/*.png --out-dir=assets --plugin=webp
npx imagemin assets/*.png --out-dir=assets --plugin=avif

# Analizar bundle
npm run build && npx rollup-plugin-visualizer

# Test performance local
npm run preview
# Luego: http://localhost:4173

# Limpiar cache
rm -rf dist node_modules/.vite
npm run build
```

---

## 📊 MÉTRICAS FINALES ESPERADAS

| Métrica | Actual | Día 1 | Día 3 | Día 5 | Día 7 |
|---------|--------|-------|-------|-------|-------|
| **FCP** | 6.0s | 4.5s | 2.8s | 2.2s | 1.8s |
| **Speed Index** | 6.8s | 5.2s | 3.5s | 2.8s | 2.3s |
| **Bundle JS** | 708 KiB | 708 KiB | 650 KiB | 450 KiB | 420 KiB |
| **Total Carga** | 7,698 KiB | 4,800 KiB | 4,100 KiB | 3,600 KiB | 3,300 KiB |
| **Puntuación Móvil** | 26 | 45 | 60 | 72 | 82 |

---

## ⚠️ ERRORES A EVITAR

```javascript
// ❌ NO HACER
// 1. Usar imágenes sin optimizar
<img src="original-2752x1536.png" /> // 1,404 KiB

// 2. Solicitudes bloqueantes
<link rel="stylesheet" href="..."> // En <head>

// 3. Medir DOM constantemente
function animate() {
  const h = element.offsetHeight; // Cada frame = reflow
}

// 4. Cargar todo en JS principal
// index-BV8QGvJB.js (707 KiB completo)

// ✓ SÍ HACER
// 1. Imágenes optimizadas y responsive
<picture>
  <source srcSet="optimized.webp" type="image/webp">
  <img src="fallback.png">
</picture>

// 2. CSS deferred
<link rel="stylesheet" href="..." media="print" onload="this.media='all'">

// 3. Usar requestAnimationFrame
function animate() {
  const h = element.offsetHeight; // Una sola lectura
  requestAnimationFrame(() => {
    element.style.top = h + 'px'; // Escritura deferred
  });
}

// 4. Code splitting
const Page = lazy(() => import('./Page'))
```

---

## 📞 SOPORTE RÁPIDO

**Si FCP sigue siendo lento después de Día 1:**
- Verificar que imágenes sean <30 KiB cada una
- Revisar Network tab en Chrome DevTools
- Buscar solicitudes que tarden >1s

**Si Speed Index no mejora:**
- Buscar reflows en carousels (DevTools → Performance)
- Implementar lazy loading más agresivamente
- Reducir cantidad de elementos renderizados inicialmente

**Si Puntuación no sube de 75:**
- Implementar Service Worker para cacheo
- Comprimir con Brotli
- Usar CDN (Vercel, Netlify automático)

---

**Tiempo estimado**: 20-30 horas de trabajo
**Resultado esperado**: 26 → 82+ en mobile
**ROI**: Mejor UX = Más conversiones en viajes

¡Éxito! 🎉
