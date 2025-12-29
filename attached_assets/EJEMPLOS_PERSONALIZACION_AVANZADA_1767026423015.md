# 🎯 EJEMPLOS DE PERSONALIZACIÓN AVANZADA - TRIPS EUROPA

Aquí tienes **snippets listos para copiar y pegar** para ampliar la funcionalidad de tu web.

---

## 1️⃣ AGREGAR NUEVOS DESTINOS AL MENÚ

### Ejemplo: Agregar más destinos en Dropdowns

**Ubicación en HTML:** Busca `<div class="te-nav-item">` y `Destinos`

```html
<!-- ACTUAL (5 destinos) -->
<div class="te-nav-item">
    Destinos
    <div class="te-dropdown">
        <a href="#" class="te-dropdown-item">🌍 África</a>
        <a href="#" class="te-dropdown-item">🌎 América</a>
        <a href="#" class="te-dropdown-item">🏯 Asia</a>
        <a href="#" class="te-dropdown-item">🗼 Europa</a>
        <a href="#" class="te-dropdown-item">🏝️ Oceanía</a>
    </div>
</div>

<!-- MEJORADO (con destinos específicos) -->
<div class="te-nav-item">
    Destinos
    <div class="te-dropdown">
        <a href="/destino/paris" class="te-dropdown-item">🇫🇷 París, Francia</a>
        <a href="/destino/roma" class="te-dropdown-item">🇮🇹 Roma, Italia</a>
        <a href="/destino/madrid" class="te-dropdown-item">🇪🇸 Madrid, España</a>
        <a href="/destino/amsterdam" class="te-dropdown-item">🇳🇱 Ámsterdam, Países Bajos</a>
        <a href="/destino/berlin" class="te-dropdown-item">🇩🇪 Berlín, Alemania</a>
        <a href="/destino/viena" class="te-dropdown-item">🇦🇹 Viena, Austria</a>
        <a href="/destino/praga" class="te-dropdown-item">🇨🇿 Praga, República Checa</a>
        <a href="/destino/florencia" class="te-dropdown-item">🇮🇹 Florencia, Italia</a>
    </div>
</div>
```

---

## 2️⃣ AGREGAR MÚLTIPLES OFERTAS AL CARRUSEL

### Expandir Ofertas (Más de 3 slides)

```html
<!-- Dentro de <section class="te-hero"> -->
<!-- AGREGAR NUEVOS SLIDES DESPUÉS DEL TERCERO -->

<div class="te-carousel-slide" 
     style="background-image: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);"></div>

<div class="te-carousel-slide" 
     style="background-image: linear-gradient(135deg, #3498db 0%, #2980b9 100%);"></div>

<div class="te-carousel-slide" 
     style="background-image: linear-gradient(135deg, #27ae60 0%, #229954 100%);"></div>

<!-- ACTUALIZAR DOTS -->
<div class="te-carousel-dots">
    <div class="te-carousel-dot active" onclick="goToSlide(0)"></div>
    <div class="te-carousel-dot" onclick="goToSlide(1)"></div>
    <div class="te-carousel-dot" onclick="goToSlide(2)"></div>
    <div class="te-carousel-dot" onclick="goToSlide(3)"></div>
    <div class="te-carousel-dot" onclick="goToSlide(4)"></div>
    <div class="te-carousel-dot" onclick="goToSlide(5)"></div>
</div>
```

---

## 3️⃣ CREAR BOTÓN FLOTANTE WHATSAPP

### Agregar Chat WhatsApp en esquina

```html
<!-- Agregar antes de </body> -->

<style>
    .whatsapp-float {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: #25d366;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        cursor: pointer;
        text-decoration: none;
        z-index: 999;
        animation: pulse 2s infinite;
        transition: all 150ms ease;
    }

    .whatsapp-float:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
    }

    .whatsapp-float font-size {
        font-size: 2rem;
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    @media (max-width: 767px) {
        .whatsapp-float {
            bottom: 20px;
            right: 20px;
            width: 55px;
            height: 55px;
        }
    }
</style>

<a href="https://wa.me/34919011589?text=Hola%20Trips%20Europa%2C%20me%20interesa%20saber%20sobre%20viajes" 
   class="whatsapp-float" target="_blank" title="Chat WhatsApp">
    📱
</a>
```

---

## 4️⃣ AGREGAR SECCIÓN DE TESTIMONIOS

### Antes de `</main>` o después del hero

```html
<section style="padding: 4rem 1rem; background: #f9f9f9; margin: 4rem 0;">
    <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="text-align: center; color: #1a3a52; margin-bottom: 3rem; font-size: 2rem;">
            ¿Qué dicen nuestros viajeros?
        </h2>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            
            <!-- Testimonio 1 -->
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <div style="color: #ffc107; margin-bottom: 1rem;">⭐⭐⭐⭐⭐</div>
                <p style="color: #666; margin-bottom: 1rem; font-style: italic;">
                    "Increíble experiencia. El viaje a París fue perfecto, todo incluido como prometieron. ¡Recomendado!"
                </p>
                <strong style="color: #1a3a52;">María González</strong>
                <p style="color: #999; font-size: 0.9rem;">Colombia</p>
            </div>

            <!-- Testimonio 2 -->
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <div style="color: #ffc107; margin-bottom: 1rem;">⭐⭐⭐⭐⭐</div>
                <p style="color: #666; margin-bottom: 1rem; font-style: italic;">
                    "El mejor viaje en grupo que he hecho. Excelente servicio y atención personalizada."
                </p>
                <strong style="color: #1a3a52;">Carlos Méndez</strong>
                <p style="color: #999; font-size: 0.9rem;">México</p>
            </div>

            <!-- Testimonio 3 -->
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <div style="color: #ffc107; margin-bottom: 1rem;">⭐⭐⭐⭐⭐</div>
                <p style="color: #666; margin-bottom: 1rem; font-style: italic;">
                    "Vale totalmente la pena. Precios competitivos y experiencias inolvidables."
                </p>
                <strong style="color: #1a3a52;">Ana Silva</strong>
                <p style="color: #999; font-size: 0.9rem;">Brasil</p>
            </div>

        </div>
    </div>
</section>
```

---

## 5️⃣ AGREGAR FORMULARIO DE CONTACTO

### Simple y funcional

```html
<section style="padding: 4rem 1rem; background: linear-gradient(135deg, #1a3a52 0%, #d4a574 100%);">
    <div style="max-width: 600px; margin: 0 auto;">
        <h2 style="color: white; text-align: center; margin-bottom: 2rem;">
            Contáctanos para tu próximo viaje
        </h2>

        <form onsubmit="handleContactForm(event)" style="display: flex; flex-direction: column; gap: 1rem;">
            <input type="text" placeholder="Tu nombre" required 
                   style="padding: 0.75rem; border: none; border-radius: 8px; font-size: 1rem;">
            
            <input type="email" placeholder="Tu email" required 
                   style="padding: 0.75rem; border: none; border-radius: 8px; font-size: 1rem;">
            
            <input type="tel" placeholder="Tu teléfono" required 
                   style="padding: 0.75rem; border: none; border-radius: 8px; font-size: 1rem;">
            
            <textarea placeholder="Cuéntanos qué tipo de viaje quieres" rows="5" required
                      style="padding: 0.75rem; border: none; border-radius: 8px; font-size: 1rem; font-family: inherit; resize: none;"></textarea>
            
            <button type="submit" style="background: white; color: #1a3a52; border: none; padding: 0.9rem; 
                    border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 150ms ease;"
                    onmouseover="this.style.background='#d4a574'; this.style.color='white'"
                    onmouseout="this.style.background='white'; this.style.color='#1a3a52'">
                Enviar consulta
            </button>
        </form>
    </div>
</section>

<script>
function handleContactForm(event) {
    event.preventDefault();
    alert('✅ Gracias por tu consulta. Nos pondremos en contacto pronto.');
    event.target.reset();
}
</script>
```

---

## 6️⃣ AGREGAR CONTADOR DE VIAJEROS

### Estadísticas dinámicas

```html
<section style="padding: 3rem 1rem; background: #2d3436; color: white;">
    <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center;">
            
            <div>
                <h3 style="font-size: 2.5rem; color: #d4a574; margin-bottom: 0.5rem;">50,000+</h3>
                <p style="color: #bbb;">Viajeros Satisfechos</p>
            </div>

            <div>
                <h3 style="font-size: 2.5rem; color: #d4a574; margin-bottom: 0.5rem;">150+</h3>
                <p style="color: #bbb;">Destinos Europeos</p>
            </div>

            <div>
                <h3 style="font-size: 2.5rem; color: #d4a574; margin-bottom: 0.5rem;">15 años</h3>
                <p style="color: #bbb;">De Experiencia</p>
            </div>

            <div>
                <h3 style="font-size: 2.5rem; color: #d4a574; margin-bottom: 0.5rem;">24/7</h3>
                <p style="color: #bbb;">Soporte al Cliente</p>
            </div>

        </div>
    </div>
</section>
```

---

## 7️⃣ AGREGAR BANNER DE OFERTA ESPECIAL

### Top alert promocional

```html
<!-- Agregar DENTRO DE <header> (antes de cierre) -->

<div style="background: #d4a574; color: #1a3a52; padding: 1rem; text-align: center; 
            font-weight: 600; font-size: 0.95rem; display: flex; 
            justify-content: center; gap: 1rem; align-items: center;">
    ⏰ <span>ÚLTIMA LLAMADA: El Ofertón Europa termina en <strong>4 días</strong> - Reserva ahora</span>
    <button style="background: #1a3a52; color: #d4a574; border: none; 
                   padding: 0.5rem 1rem; border-radius: 50px; cursor: pointer; 
                   font-weight: 600; transition: all 150ms ease;"
            onclick="document.getElementById('modalOverlay').classList.add('active')"
            onmouseover="this.style.transform='scale(1.05)'"
            onmouseout="this.style.transform='scale(1)'">
        Ver oferta
    </button>
</div>
```

---

## 8️⃣ AGREGAR MAPA DE DESTINOS INTERACTIVO

### Mapa simple con clickables

```html
<section style="padding: 3rem 1rem; background: white;">
    <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="text-align: center; color: #1a3a52; margin-bottom: 2rem;">Nuestros Destinos Principales</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
            
            <!-- Francia -->
            <div style="background: linear-gradient(135deg, #87ceeb 0%, #4682b4 100%); 
                        padding: 2rem; border-radius: 12px; color: white; text-align: center; 
                        cursor: pointer; transition: all 150ms ease;"
                 onclick="alert('Francia - París, Lyon, Marsella')"
                 onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.2)'"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <h3>🇫🇷 Francia</h3>
                <p style="margin-top: 0.5rem; font-size: 0.9rem;">París • Lyon • Marsella</p>
            </div>

            <!-- Italia -->
            <div style="background: linear-gradient(135deg, #90ee90 0%, #228b22 100%); 
                        padding: 2rem; border-radius: 12px; color: white; text-align: center; 
                        cursor: pointer; transition: all 150ms ease;"
                 onclick="alert('Italia - Roma, Florencia, Venecia')"
                 onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.2)'"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <h3>🇮🇹 Italia</h3>
                <p style="margin-top: 0.5rem; font-size: 0.9rem;">Roma • Florencia • Venecia</p>
            </div>

            <!-- España -->
            <div style="background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%); 
                        padding: 2rem; border-radius: 12px; color: white; text-align: center; 
                        cursor: pointer; transition: all 150ms ease;"
                 onclick="alert('España - Madrid, Barcelona, Sevilla')"
                 onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.2)'"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <h3>🇪🇸 España</h3>
                <p style="margin-top: 0.5rem; font-size: 0.9rem;">Madrid • Barcelona • Sevilla</p>
            </div>

            <!-- Alemania -->
            <div style="background: linear-gradient(135deg, #dda0dd 0%, #8b008b 100%); 
                        padding: 2rem; border-radius: 12px; color: white; text-align: center; 
                        cursor: pointer; transition: all 150ms ease;"
                 onclick="alert('Alemania - Berlín, Munich, Hamburgo')"
                 onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.2)'"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <h3>🇩🇪 Alemania</h3>
                <p style="margin-top: 0.5rem; font-size: 0.9rem;">Berlín • Munich • Hamburgo</p>
            </div>

        </div>
    </div>
</section>
```

---

## 9️⃣ AGREGAR NEWSLETTER SUBSCRIPTION

### Forma simple

```html
<section style="padding: 3rem 1rem; background: linear-gradient(135deg, #1a3a52 0%, #2d4563 100%); color: white;">
    <div style="max-width: 600px; margin: 0 auto; text-align: center;">
        <h2 style="margin-bottom: 1rem;">Recibe ofertas exclusivas</h2>
        <p style="margin-bottom: 2rem; opacity: 0.9;">
            Suscríbete a nuestro newsletter y recibe descuentos especiales en viajes a Europa.
        </p>

        <form style="display: flex; gap: 0.5rem; flex-direction: column;">
            <input type="email" placeholder="Tu email" required 
                   style="padding: 0.9rem; border: none; border-radius: 8px; font-size: 1rem;">
            
            <button type="submit" style="background: #d4a574; color: #1a3a52; border: none; 
                    padding: 0.9rem; border-radius: 8px; font-weight: 600; cursor: pointer; 
                    transition: all 150ms ease;"
                    onclick="alert('✅ ¡Suscrito! Revisa tu email.')"
                    onmouseover="this.style.background='#f0e8d8'; this.style.transform='scale(1.02)'"
                    onmouseout="this.style.background='#d4a574'; this.style.transform='scale(1)'">
                Suscribirse
            </button>
        </form>

        <p style="margin-top: 1rem; font-size: 0.85rem; opacity: 0.7;">
            Protegemos tu privacidad. Sin spam, solo ofertas reales.
        </p>
    </div>
</section>
```

---

## 🔟 AGREGAR BREADCRUMBS (Migas de pan)

### Navegación por jerarquía

```html
<!-- Agregar antes del <main> -->

<nav style="background: #f5f5f5; padding: 1rem; margin-bottom: 2rem;">
    <div style="max-width: 1400px; margin: 0 auto; color: #666; font-size: 0.9rem;">
        <a href="/" style="color: #1a3a52; text-decoration: none;">Inicio</a>
        <span style="margin: 0 0.5rem;">/</span>
        <a href="/destinos" style="color: #1a3a52; text-decoration: none;">Destinos</a>
        <span style="margin: 0 0.5rem;">/</span>
        <span style="color: #999;">París, Francia</span>
    </div>
</nav>
```

---

## Todos listos para copiar y pegar 🎉

Cada snippet es **independiente** y puedes agregarlo donde prefieras en tu HTML. Solo copia, pega, ¡y personaliza!

---

*Actualizado: Diciembre 2025*