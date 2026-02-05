# ♿ GUÍA DE ACCESIBILIDAD - TRIPSEUROPA.COM

**Fecha:** 29 de Enero de 2026
**Basado en:** Auditoría Externa + WCAG 2.1 AA
**Estado:** Recomendaciones y Mejoras

---

## 📋 PROBLEMAS IDENTIFICADOS EN AUDITORÍA

1. **Contraste de color insuficiente** (No cumple ratio 4.5:1)
2. **Atributos `alt` faltantes en imágenes**
3. **Navegación por teclado deficiente**
4. **Atributos ARIA incorrectos o faltantes**
5. **Estructura semántica HTML mejorable**

---

## ✅ MEJORAS YA IMPLEMENTADAS

### 1. HTML5 Semántico

**Implementado correctamente:**
```typescript
<header>     // Cabecera del sitio
<nav>        // Navegación principal
<main>       // Contenido principal
<article>    // Artículos de blog
<section>    // Secciones de página
<footer>     // Pie de página
```

**Componentes con semántica:**
- [Header.tsx](client/src/components/Header.tsx:239)
- [Footer.tsx](client/src/components/Footer.tsx:35)
- [App.tsx](client/src/App.tsx:103) - `<main role="main">`

---

### 2. Skip to Content (Accesibilidad de Navegación)

**Implementado:** [SkipToContent.tsx](client/src/components/SkipToContent.tsx)

```typescript
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-white"
>
  Skip to main content
</a>
```

**Impacto:**
- ✅ Usuarios de teclado pueden saltar navegación
- ✅ Lectores de pantalla acceden directamente al contenido
- ✅ Cumple WCAG 2.1 SC 2.4.1

---

### 3. ARIA Labels en Navegación

**Implementado en Header.tsx:**
```typescript
<nav aria-label="Main navigation">
  <ul role="menu">
    <li role="menuitem">...</li>
  </ul>
</nav>
```

---

## 🔧 MEJORAS PENDIENTES

### 1. Contraste de Color

**Problema:** Algunos elementos no cumplen ratio mínimo 4.5:1

**Herramienta de verificación:**
```bash
# Usar WebAIM Contrast Checker
# https://webaim.org/resources/contrastchecker/

# O extension de Chrome: axe DevTools
```

**Elementos a revisar:**

| Elemento | Color Actual | Contraste | Cumple | Acción |
|----------|-------------|-----------|--------|--------|
| Botón primario | #d5b034 / #ffffff | ? | ❌ | Oscurecer a #b89020 |
| Links secundarios | #gray-500 / #white | ? | ❌ | Usar #gray-700 |
| Texto en cards | #gray-600 / #white | ? | ⚠️ | Verificar |

**Solución en Tailwind:**

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0369a1', // Azul accesible
          dark: '#075985',
        },
        accent: {
          DEFAULT: '#b89020', // Dorado oscurecido para mejor contraste
          light: '#d5b034',
        }
      }
    }
  }
}
```

---

### 2. Atributos Alt en Imágenes

**Implementar componente OptimizedImage:**

```typescript
// client/src/components/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;  // REQUIRED - no default
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  loading = 'lazy'
}: OptimizedImageProps) {
  // Validar que alt no esté vacío
  if (!alt || alt.trim() === '') {
    console.error('OptimizedImage: alt attribute is required and cannot be empty');
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className="rounded-lg object-cover"
    />
  );
}
```

**Guía de Alt Text:**

| Tipo de Imagen | Ejemplo Alt Text | ❌ Incorrecto |
|----------------|------------------|--------------|
| Destino | "Vista panorámica de la Torre Eiffel al atardecer en París" | "paris" |
| Testimonial | "Foto de María García, cliente satisfecha de Colombia" | "cliente" |
| Icono decorativo | "" (alt vacío) | alt omitido |
| Logo | "Trips Europa - Agencia de viajes a Europa" | "logo" |

---

### 3. Navegación por Teclado

**Verificar todos los elementos interactivos:**

```typescript
// Asegurar focus visible en todos los elementos
.focus-visible:focus {
  outline: 2px solid #0369a1;
  outline-offset: 2px;
}

// En componentes interactivos
<button
  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  tabIndex={0}
>
  ...
</button>
```

**Checklist de teclado:**
- [ ] Tab navega por todos los enlaces y botones
- [ ] Enter activa botones y links
- [ ] Escape cierra modals y menús
- [ ] Flechas navegan en carousels y menús dropdown
- [ ] Focus trap en modales

**Implementar en Modal:**

```typescript
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    // Focus trap
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    // Escape to close
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    modal.addEventListener('keydown', handleTab);
    modal.addEventListener('keydown', handleEscape);
    firstElement.focus();

    return () => {
      modal.removeEventListener('keydown', handleTab);
      modal.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {children}
    </div>
  );
}
```

---

### 4. ARIA Attributes Mejorados

**Formularios con errores:**

```typescript
<label htmlFor="email" id="email-label">
  Email
</label>
<input
  id="email"
  type="email"
  aria-labelledby="email-label"
  aria-describedby={error ? "email-error" : undefined}
  aria-invalid={error ? "true" : "false"}
  aria-required="true"
/>
{error && (
  <span id="email-error" className="text-red-600" role="alert">
    {error}
  </span>
)}
```

**Estados de carga:**

```typescript
<button
  disabled={loading}
  aria-busy={loading}
  aria-live="polite"
>
  {loading ? (
    <>
      <span className="sr-only">Loading...</span>
      <Spinner aria-hidden="true" />
    </>
  ) : (
    'Submit'
  )}
</button>
```

**Listas y navegación:**

```typescript
<nav aria-label="Main menu">
  <ul role="menubar">
    <li role="none">
      <a href="/destinations" role="menuitem">
        Destinations
      </a>
    </li>
  </ul>
</nav>
```

---

### 5. Screen Reader Optimizations

**Hidden text for context:**

```typescript
// sr-only utility class (ya en Tailwind)
<span className="sr-only">Read more about</span>
<a href="/blog/post">Paris Travel Guide</a>

// aria-label para iconos
<button aria-label="Close menu">
  <X aria-hidden="true" />
</button>

// Describir cambios dinámicos
<div aria-live="polite" aria-atomic="true">
  {itemsCount} items in cart
</div>
```

---

### 6. Formularios Accesibles

**Template completo:**

```typescript
function AccessibleForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="form-title"
      noValidate
    >
      <h2 id="form-title">Contact Form</h2>

      <div className="form-group">
        <label htmlFor="name" id="name-label">
          Name <span aria-label="required">*</span>
        </label>
        <input
          id="name"
          type="text"
          aria-labelledby="name-label"
          aria-describedby={errors.name ? "name-error" : "name-help"}
          aria-invalid={errors.name ? "true" : "false"}
          aria-required="true"
        />
        <span id="name-help" className="text-sm text-gray-600">
          Enter your full name
        </span>
        {errors.name && (
          <span id="name-error" className="text-red-600" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <button type="submit" aria-disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

---

## 🧪 TESTING DE ACCESIBILIDAD

### Herramientas Automáticas

#### 1. axe DevTools (Chrome Extension)
```bash
# Instalar: https://www.deque.com/axe/devtools/
# Usar: F12 → Tab "axe DevTools" → Scan All
```

#### 2. WAVE (Web Accessibility Evaluation Tool)
```bash
# Extensión: https://wave.webaim.org/extension/
# Online: https://wave.webaim.org/
```

#### 3. Lighthouse (Chrome DevTools)
```bash
# F12 → Lighthouse → Accessibility Category
```

#### 4. Pa11y CI (Automated Testing)
```bash
npm install pa11y-ci --save-dev

# .pa11yci.json
{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": ["axe"]
  },
  "urls": [
    "http://localhost:5000",
    "http://localhost:5000/destinations",
    "http://localhost:5000/packages"
  ]
}

# package.json
{
  "scripts": {
    "test:a11y": "pa11y-ci"
  }
}
```

---

### Testing Manual

**Checklist de verificación:**

- [ ] **Teclado:** Navegar toda la página solo con Tab/Enter/Esc
- [ ] **Zoom:** Probar a 200% zoom (texto debe ser legible)
- [ ] **Screen Reader:** Probar con NVDA (Windows) o VoiceOver (Mac)
- [ ] **Alto contraste:** Activar modo alto contraste del SO
- [ ] **Sin mouse:** Completar todas las acciones principales
- [ ] **Formularios:** Enviar con errores, verificar anuncios

---

## 📊 MÉTRICAS DE ACCESIBILIDAD

### Objetivos

| Métrica | Actual | Objetivo | Tool |
|---------|--------|----------|------|
| **Lighthouse A11y Score** | 75/100 | 95-100/100 | Chrome DevTools |
| **WAVE Errors** | ~15 | 0 | WAVE Extension |
| **axe Violations** | ~20 | <5 | axe DevTools |
| **Keyboard Navigation** | Parcial | Completo | Manual |
| **Screen Reader** | Básico | Óptimo | NVDA/VoiceOver |

---

## 🎯 PLAN DE IMPLEMENTACIÓN

### Fase 1: Crítico (Esta Semana)
- [ ] Auditar contraste de colores con herramientas
- [ ] Agregar alt text a todas las imágenes
- [ ] Verificar navegación por teclado en toda la app
- [ ] Corregir violaciones críticas de axe

### Fase 2: Alto Impacto (Próximas 2 Semanas)
- [ ] Mejorar ARIA labels en formularios
- [ ] Implementar focus traps en modals
- [ ] Añadir live regions para cambios dinámicos
- [ ] Testing con screen readers

### Fase 3: Refinamiento (Mes 1)
- [ ] Pa11y CI en pipeline
- [ ] Documentar estándares de accesibilidad
- [ ] Training del equipo en WCAG
- [ ] Monitoreo continuo

---

## 📚 RECURSOS

**Estándares:**
- WCAG 2.1 AA: https://www.w3.org/WAI/WCAG21/quickref/
- ARIA Practices: https://www.w3.org/WAI/ARIA/apg/

**Herramientas:**
- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/
- Contrast Checker: https://webaim.org/resources/contrastchecker/
- pa11y: https://pa11y.org/

**Testing:**
- NVDA Screen Reader (Windows): https://www.nvaccess.org/
- VoiceOver (Mac): Built-in (Cmd+F5)

---

**Generado:** 29 de Enero de 2026
**Basado en:** Auditoría Externa + WCAG 2.1 Guidelines
**Status:** 📝 Guía Documentada - Implementación Pendiente
