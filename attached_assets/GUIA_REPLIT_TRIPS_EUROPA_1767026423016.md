# 🚀 TRIPS EUROPA EN REPLIT - GUÍA PASO A PASO

## ¿QUÉ ES REPLIT?

Replit es una plataforma **online** donde puedes:
✅ Escribir, ejecutar y depurar código
✅ Colaborar en tiempo real
✅ Hospedar webs gratis (con URL pública)
✅ Integrar Git y GitHub
✅ Acceder desde cualquier navegador

Perfecto para desarrollo ágil de **Trips Europa**.

---

## PASO 1: CREAR PROYECTO EN REPLIT

1. Abre **https://replit.com**
2. Haz clic en **+ Create** (esquina superior derecha)
3. Selecciona **"HTML, CSS, JS"**
4. Dale un nombre: **"TripsEuropa"**
5. Haz clic en **"Create Repl"**

> Te abrirá un editor con 3 archivos:
> - index.html
> - style.css
> - script.js

---

## PASO 2: ELIMINAR ARCHIVOS DE EJEMPLO

Por defecto Replit crea 3 archivos. **Elimina su contenido**:

1. Haz clic en el icono de **papelera** al lado de `style.css`
2. Haz clic en el icono de **papelera** al lado de `script.js`
3. Deberás quedar solo con `index.html`

---

## PASO 3: COPIAR TODO EL HTML

1. Copia TODO el contenido del archivo `trips_europa_completo.html`
2. Pégalo en `index.html` en Replit
3. Presiona **Ctrl+S** (o Cmd+S en Mac) para guardar

---

## PASO 4: PROBAR EN NAVEGADOR

1. Haz clic en **"Run"** (botón verde en la parte superior)
2. Se abrirá una vista previa en la parte derecha
3. Prueba:
   - Haz clic en **"Entrar"** (botón login)
   - Abre el menú hamburgesa (mobile)
   - Navega por los dropdowns
   - Prueba el carrusel

---

## PASO 5: OBTENER URL PÚBLICA

Tu proyecto está **vivo en internet**:

1. En la parte superior derecha, busca un botón **"Share"** o un icono de **link**
2. Haz clic y copia la URL pública
3. Ejemplo: `https://TripsEuropa.tuusuario.repl.co`
4. **¡Puedes compartirla en cualquier lado!**

---

## PASO 6: PERSONALIZAR EN REPLIT

### Cambiar Logo

1. Busca esta línea en `index.html`:
```html
<img src="https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/..." alt="Trips Europa">
```

2. Reemplaza por tu logo URL:
```html
<img src="https://imgur.com/tulogo.jpg" alt="Trips Europa">
```

### Cambiar Teléfono

1. Presiona **Ctrl+F** (buscar)
2. Escribe: `+34 919 01 15 89`
3. Reemplaza TODAS las instancias por tu número

### Cambiar Colores

1. Encuentra esta sección (líneas ~50-70):
```css
:root {
    --primary-dark: #1a3a52;
    --primary-gold: #d4a574;
    --header-bg: #2d3436;
}
```

2. Cambia los códigos hexadecimales:
```css
:root {
    --primary-dark: #003399;    ← Tu azul
    --primary-gold: #ffd700;    ← Tu dorado
    --header-bg: #2d3436;       ← Mantener o cambiar
}
```

3. Presiona **Ctrl+S** para guardar
4. El sitio se actualiza automáticamente

---

## PASO 7: CONECTAR GITHUB (Opcional)

Si quieres sincronizar con GitHub:

1. En Replit, haz clic en **"Version Control"** (en la izquierda)
2. Haz clic en **"Connect to GitHub"**
3. Autoriza Replit
4. Crea un nuevo repositorio o selecciona uno existente
5. Cada cambio se sincroniza automáticamente

---

## PASO 8: CONECTAR A TU DOMINIO

### Opción A: Mantener URL de Replit
```
https://TripsEuropa.tuusuario.repl.co
```
✅ Gratis
✅ Automático
❌ URL poco profesional

### Opción B: Usar tu dominio (Recomendado)

1. Compra un dominio en:
   - GoDaddy
   - Namecheap
   - Google Domains
   - Ejemplo: tripseuropa.com

2. En tu registrador, ve a **DNS Settings**

3. Crea estos registros:
```
Type: CNAME
Name: @ (o www)
Value: TripsEuropa.tuusuario.repl.co
TTL: 3600
```

4. En Replit, ve a **Settings** → **Domains**

5. Agrega tu dominio personalizado

6. Espera 5-10 minutos a que se propague

**Resultado:** `https://tripseuropa.com` apunta a tu Replit

---

## PASO 9: AGREGAR BACKEND (API)

Si necesitas conectar formularios a una base de datos:

### Opción A: Usar Firebase (Gratis)

1. Ve a **https://firebase.google.com**
2. Crea un proyecto
3. Activa Firestore Database
4. En tu HTML, agrega:

```html
<!-- Al final del <head> -->
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
</script>
```

5. Modifica `handleLogin()`:

```javascript
function handleLogin(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    const password = event.target.querySelector('input[type="password"]').value;
    
    // Guardar en Firestore
    db.collection("users").add({
        email: email,
        timestamp: new Date(),
        userType: "viajero" // o "agente"
    }).then(() => {
        alert("✅ Registrado exitosamente");
        closeModal();
    }).catch((error) => {
        alert("Error: " + error.message);
    });
}
```

### Opción B: Usar un formulario simple (Formspree)

1. Ve a **https://formspree.io**
2. Registrate
3. Crea un formulario
4. En tu HTML, reemplaza el `<form>`:

```html
<form action="https://formspree.io/f/TU_ID" method="POST">
    <input type="email" name="email" required>
    <input type="password" name="password" required>
    <button type="submit">Enviar</button>
</form>
```

---

## PASO 10: AGREGAR ANALYTICS

Para rastrear visitantes:

### Google Analytics

1. Ve a **https://analytics.google.com**
2. Crea una propiedad web
3. Copia el código de seguimiento
4. Pégalo en tu `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## PASO 11: MONITOREO Y DEBUGGING

### Ver Errores

1. Presiona **F12** en tu navegador
2. Ve a la pestaña **"Console"**
3. Busca mensajes de error (rojo)
4. Copia el error y búscalo en Google

### Probar Responsivo

1. En el navegador, presiona **Ctrl+Shift+M** (o Cmd+Shift+M)
2. Prueba en diferentes tamaños:
   - 375px (iPhone SE)
   - 768px (iPad)
   - 1024px (Laptop)
   - 1440px (Desktop)

### Ver cambios en tiempo real

En Replit, cada vez que presiones **Ctrl+S**, la vista previa se actualiza automáticamente. ¡Sin necesidad de refrescar!

---

## PASO 12: COMPARTIR PROYECTO

### Con otros desarrolladores

1. Haz clic en **"Invite"** (parte superior)
2. Comparte la URL o copia el código de invitación
3. Puedes colaborar en **tiempo real** (como Google Docs)

### Con clientes

1. Haz clic en **"Share"**
2. Copia el enlace público
3. Envía: `https://TripsEuropa.tuusuario.repl.co`
4. El cliente verá tu web actualizada en tiempo real

---

## CHECKLIST RÁPIDO

- [ ] Crear proyecto en Replit
- [ ] Copiar HTML completo
- [ ] Cambiar logo
- [ ] Cambiar teléfono
- [ ] Personalizar colores
- [ ] Probar en Desktop
- [ ] Probar en Mobile
- [ ] Obtener URL pública
- [ ] Conectar dominio (opcional)
- [ ] Agregar analytics
- [ ] Compartir con equipo
- [ ] Hacer backup en GitHub

---

## PROBLEMAS COMUNES EN REPLIT

### "Mi sitio se ve blanco"
```
✓ Presiona Ctrl+Shift+R para limpiar caché
✓ Abre la consola (F12) para ver errores
✓ Verifica que el HTML está completo
```

### "El logo no se carga"
```
✓ Verifica que la URL sea https://
✓ Abre la imagen en otra pestaña para confirmar
✓ Usa Imgur o ImgBB en lugar de dropbox
```

### "El teléfono no funciona"
```
✓ Verifica formato: tel:+34919011589 (sin espacios)
✓ En mobile, solo el <a href="tel:"> funciona
✓ Prueba en teléfono real
```

### "El carrusel no avanza"
```
✓ Abre consola (F12) y busca errores
✓ Verifica que existen las 3 slides
✓ Recarga la página (Ctrl+Shift+R)
```

### "El menú mobile no abre"
```
✓ Presiona F12 y ve a "Console"
✓ Busca errores JavaScript (rojo)
✓ Verifica que JavaScript está habilitado
```

---

## PRÓXIMOS PASOS

Una vez que tengas tu web en Replit:

1. **Agregar más páginas:**
   - /blog
   - /sobre-nosotros
   - /contacto
   - /privacy

2. **Conectar base de datos:**
   - Firebase
   - MongoDB
   - PostgreSQL

3. **Monetización:**
   - Programa afiliados
   - Comisiones de agentes
   - Anuncios

4. **Marketing:**
   - SEO
   - Google Ads
   - Social media
   - Email marketing

---

## RECURSOS ÚTILES EN REPLIT

- **Editor**: Alt+Tab entre archivos
- **Buscar**: Ctrl+F
- **Terminal**: Haz clic en la pestaña inferior
- **Git**: Git → Commit & Push
- **Secrets**: Guarda contraseñas (no en el código)

---

## SOPORTE

Si tienes problemas:

1. Ve a **https://docs.replit.com**
2. Busca tu pregunta
3. O abre un **"Repl Talk"** en la comunidad

---

**¡Listo! Tu web de Trips Europa está en vivo en minutos!** 🚀

---

*Última actualización: Diciembre 2025*
*Compatible con: Chrome, Firefox, Safari, Edge*