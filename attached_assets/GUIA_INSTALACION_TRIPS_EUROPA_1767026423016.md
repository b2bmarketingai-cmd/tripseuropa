# 🚀 TRIPS EUROPA - GUÍA COMPLETA DE INSTALACIÓN Y PERSONALIZACIÓN

## 📌 CONTENIDO DEL PROYECTO

Tu web completa incluye:

✅ **Header profesional** estilo Exoticca
✅ **Carrusel de ofertas** con autoplay
✅ **Sistema de login** (Viajero & Agente de Viajes)
✅ **Menú responsive** (Desktop & Mobile)
✅ **Hero section** con buscador integrado
✅ **Footer completo** con enlaces y redes sociales
✅ **Diseño 100% responsive** (móvil, tablet, desktop)
✅ **Zero dependencias externas** (HTML5 + CSS + Vanilla JS)

---

## 🛠️ INSTALACIÓN RÁPIDA

### Opción 1: Replit (Recomendado para desarrollo)

1. Crea un nuevo proyecto en [replit.com](https://replit.com)
2. Selecciona: **HTML, CSS, JS**
3. Pega el contenido de `trips_europa_completo.html` en `index.html`
4. ¡Listo! Click en "Run"

### Opción 2: Tu Servidor

```bash
# Descarga el archivo
wget https://[tu-url]/trips_europa_completo.html

# O directamente copia en tu carpeta public_html
# Servidor Apache: /var/www/html/
# Servidor Nginx: /var/www/html/
# cPanel: public_html/

# Accede en navegador
https://tudominio.com/trips_europa_completo.html
```

### Opción 3: GitHub Pages (Gratis)

```bash
git clone https://github.com/tuusuario/tripseuropa.git
cd tripseuropa
# Pega el HTML en index.html
git add .
git commit -m "Initial commit"
git push origin main
```

---

## 🎨 PERSONALIZACIÓN

### 1. Cambiar Logo

**Ubicación:** Línea ~500 en el HTML

```html
<!-- ACTUAL -->
<img src="https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/e89222d9..." alt="Trips Europa">

<!-- CAMBIAR POR -->
<img src="/ruta/a/tu/logo.png" alt="Trips Europa">
```

**Dónde hospedar tu logo:**
- **Gratis:** Imgur, ImgBB, Cloudinary (plan gratuito)
- **Profesional:** AWS S3, Cloudflare, tu servidor

### 2. Cambiar Colores

**Variables CSS (líneas ~50-70):**

```css
:root {
    --primary-dark: #1a3a52;      /* Azul oscuro - CAMBIAR */
    --primary-gold: #d4a574;      /* Dorado - CAMBIAR */
    --header-bg: #2d3436;         /* Fondo barra - CAMBIAR */
}
```

**Colores sugeridos por marca:**
- Azul Trips: `#003399` o `#1a3a52`
- Dorado: `#d4a574` o `#ffd700`
- Gris oscuro: `#2d3436` o `#3a3a3a`

### 3. Cambiar Teléfono

**Ubicación:** Líneas ~500, ~850, ~1200 (busca "+34 919 01 15 89")

```html
<!-- CAMBIAR TODOS A TU NÚMERO -->
+34 919 01 15 89 → +XX XXX XXXXXXX

<!-- Dentro de <a href="tel:+34919011589"> también -->
```

### 4. Cambiar Textos Principales

**Hero Title (línea ~1100):**

```html
<h1 class="te-hero-title">
    El Ofertón <span class="te-gold">Europa</span>
</h1>
```

**Cambia:** "El Ofertón" → tu oferta actual
**Dorado:** "Europa" siempre en dorado (clase `.te-gold`)

### 5. Cambiar Imágenes de Fondo (Carrusel)

**Ubicación:** Líneas ~1110-1115

```html
<!-- Slide 1 -->
<div class="te-carousel-slide active" 
     style="background-image: url('https://...banner1.jpg');"></div>

<!-- Slide 2 -->
<div class="te-carousel-slide" 
     style="background-image: linear-gradient(135deg, #1a3a52 0%, #d4a574 100%);"></div>

<!-- Slide 3 -->
<div class="te-carousel-slide" 
     style="background-image: linear-gradient(135deg, #2d3436 0%, #6c5ce7 100%);"></div>
```

**URLs para imágenes:**
- Unsplash: `https://unsplash.com/` (fotos viajes gratis)
- Pexels: `https://www.pexels.com/` (gratis)
- Tu servidor: `/images/carousel-1.jpg`

### 6. Cambiar Destinos (Dropdowns)

**Ubicación:** Línea ~500 (Destinos) y ~530 (Estilo Viaje)

```html
<!-- Desktop Destinos -->
<div class="te-nav-item">
    Destinos
    <div class="te-dropdown">
        <a href="#" class="te-dropdown-item">🌍 África</a>
        <a href="#" class="te-dropdown-item">🌎 América</a>
        <!-- AGREGAR MÁS AQUÍ -->
    </div>
</div>

<!-- Mobile Destinos (Menú hamburguesa) -->
<div class="te-nav-mobile-submenu">
    <div class="te-nav-mobile-submenu-item">🌍 África</div>
    <!-- AGREGAR MÁS AQUÍ -->
</div>
```

### 7. Cambiar Opciones de Buscador

**Ubicación:** Línea ~1125

```html
<!-- Ciudad de Origen -->
<div class="te-search-field">
    <label>Ciudad de Origen</label>
    <select>
        <option value="">Selecciona un lugar</option>
        <option value="bogota">Bogotá, Colombia</option>
        <option value="mexico">Ciudad de México, México</option>
        <!-- AGREGAR CIUDADES -->
    </select>
</div>

<!-- Destino -->
<div class="te-search-field">
    <label>Destino</label>
    <select>
        <option value="">Selecciona destino</option>
        <option value="paris">París, Francia</option>
        <!-- AGREGAR DESTINOS -->
    </select>
</div>
```

---

## 🔗 INTEGRACIÓN CON BACKEND

### 1. Form Login

**Ubicación:** Línea ~1220-1240

Actualmente valida solo con HTML5. Para conectar con backend:

```javascript
// Línea ~1450: Función handleLogin

function handleLogin(event) {
    event.preventDefault();
    
    // OBTENER DATOS DEL FORMULARIO
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    // ENVIAR A TU SERVIDOR
    fetch('https://tu-api.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('token', data.token);
            closeModal();
            window.location.href = '/dashboard';
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
```

### 2. Buscador

**Ubicación:** Línea ~1135

```javascript
// Agregar onclick al botón buscar:

<button type="button" class="te-search-btn" onclick="handleSearch()">
    🔍 Buscar
</button>

// Luego crear función:

function handleSearch() {
    const origin = document.querySelector('.te-search-field select:nth-of-type(1)').value;
    const destination = document.querySelector('.te-search-field select:nth-of-type(2)').value;
    const date = document.querySelector('input[type="date"]').value;
    
    // Redirigir a búsqueda o cargar resultados
    window.location.href = `/search?from=${origin}&to=${destination}&date=${date}`;
}
```

### 3. Enlaces del Footer

**Ubicación:** Línea ~1290 en adelante

Reemplaza `javascript:void(0);` con URLs reales:

```html
<!-- ANTES -->
<a href="javascript:void(0);" class="te-footer-link">Blog de Viajes</a>

<!-- DESPUÉS -->
<a href="/blog" class="te-footer-link">Blog de Viajes</a>
<a href="/sobre-nosotros" class="te-footer-link">Sobre Nosotros</a>
<a href="/terminos" class="te-footer-link">Términos y Condiciones</a>
```

---

## 📱 TESTING RESPONSIVE

### Desktop (1024px+)
- ✅ Header completo con navegación horizontal
- ✅ Logo visible
- ✅ Teléfono visible
- ✅ Dropdowns funcionales
- ✅ Hero a pantalla completa

### Tablet (768px - 1023px)
- ✅ Menú hamburguesa activado
- ✅ Buscador en 2 filas
- ✅ Logo responsivo

### Mobile (< 768px)
- ✅ Menú hamburguesa (3 líneas)
- ✅ Logo centrado y pequeño
- ✅ Buscador en columna
- ✅ Teléfono en menú móvil
- ✅ Modales fullscreen

**Test en navegador:**
```
Presiona F12 → Ctrl+Shift+M (o Cmd+Shift+M en Mac)
Prueba en: 375px, 768px, 1024px
```

---

## 🎯 ESTRUCTURA DE CARPETAS (Para servidor profesional)

```
/var/www/html/tripseuropa.com/
├── index.html                 ← Tu archivo principal
├── /images/
│   ├── logo.png
│   ├── carousel-1.jpg
│   ├── carousel-2.jpg
│   └── carousel-3.jpg
├── /css/
│   └── (opcional, separar estilos)
├── /js/
│   └── (opcional, separar scripts)
├── /pages/
│   ├── blog.html
│   ├── about.html
│   ├── contact.html
│   └── privacy.html
└── .htaccess               ← Para Apache (redireccionamientos)
```

**Crear estructura:**

```bash
cd /var/www/html
mkdir -p tripseuropa.com/{images,css,js,pages}
cp trips_europa_completo.html tripseuropa.com/index.html
# Subir imágenes a /images
```

---

## 🚀 OPTIMIZACIÓN SEO

Agrega al `<head>` (línea ~5):

```html
<meta name="description" content="Viajes a Europa desde Colombia, México, Brasil y toda Latinoamérica. Paquetes all-inclusive, visas Schengen y asesoría de expertos.">
<meta name="keywords" content="viajes europa, paquetes viaje, tours brasil colombia mexico">
<meta name="author" content="Trips Europa">
<meta property="og:title" content="Trips Europa - Viajes Inolvidables">
<meta property="og:description" content="Descubre Europa con nuestros paquetes de viaje premium">
<meta property="og:image" content="https://tu-sitio.com/images/og-image.jpg">
<meta property="og:url" content="https://tu-sitio.com">
<link rel="canonical" href="https://tu-sitio.com">
```

---

## ⚡ RENDIMIENTO

### Optimizar Imágenes

```bash
# Usar TinyPNG.com o:
imagemagick convert carousel-1.jpg -quality 80 carousel-1-compressed.jpg
```

### Minificar CSS/JS (Opcional)

```bash
# Usar: https://www.minifycode.com
# Reemplace estilos inline con versión minificada
```

### Cache del Servidor

Agrega a `.htaccess`:

```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType text/html "access plus 1 day"
</IfModule>
```

---

## 🐛 TROUBLESHOOTING

### Logo no se carga
```
✓ Verificar URL de imagen
✓ Permitir CORS si viene de otro servidor
✓ Usar https:// en lugar de http://
```

### Dropdown no funciona en mobile
```
✓ JavaScript está ejecutándose (F12 → Console)
✓ No hay conflictos de CSS
✓ Probar en navegador incógnito
```

### Carrusel no avanza
```
✓ Verificar setInterval (línea ~1470)
✓ Comprobar que existen las slides
✓ Ver si CSS de opacity está correcto
```

### Login no envía datos
```
✓ Verificar que handleLogin() existe
✓ Comprobar inputs tienen atributos name/id
✓ Ver console (F12) para errores JavaScript
```

---

## 📚 REFERENCIAS ÚTILES

- **Colores:** https://coolors.co/
- **Tipografía:** https://fonts.google.com/
- **Imágenes:** https://unsplash.com/, https://pexels.com/
- **Iconos:** https://emoji.gg/
- **Testing:** https://www.responsivedesignchecker.com/
- **SEO:** https://www.seomoz.org/
- **Performance:** https://gtmetrix.com/

---

## 📞 SOPORTE

Para errores específicos:

1. **Abre la consola:** F12 → Console
2. **Busca mensajes de error** (rojo)
3. **Valida HTML:** https://validator.w3.org/
4. **Valida CSS:** https://jigsaw.w3.org/css-validator/

---

## ✅ CHECKLIST PRE-LANZAMIENTO

- [ ] Logo cambiado
- [ ] Teléfono actualizado
- [ ] Colores personalizados
- [ ] Imágenes de carrusel subidas
- [ ] Destinos y opciones de búsqueda correctos
- [ ] Enlaces del footer funcionan
- [ ] Funciona en móvil (prueba en teléfono)
- [ ] SSL (HTTPS) configurado
- [ ] Analytics (Google Analytics) agregado
- [ ] Formularios conectados al backend
- [ ] Optimización SEO completada
- [ ] Backup realizado

---

**Creado:** Diciembre 2025
**Versión:** 1.0
**Soporte:** Compatible con todos los navegadores modernos

¡Listo para lanzar! 🚀