# 🚀 GUÍA COMPLETA: Desplegar Trips Europa en Replit

## 📋 Contenido
1. Setup inicial en Replit
2. Estructura de archivos
3. Variables de entorno
4. Endpoints de integración
5. Checklist de lanzamiento

---

## 1️⃣ SETUP INICIAL EN REPLIT

### A) Crear nuevo proyecto
```bash
# En replit.com, selecciona:
- Language: Node.js
- Name: tripseuropa-web
- Privacy: Public (o Private si es confidencial)
```

### B) Instalar dependencias necesarias
```bash
npm install express cors dotenv stripe
npm install -g http-server  # Para servir archivos estáticos
```

### C) Estructura de carpetas recomendada
```
tripseuropa-web/
├── public/
│   ├── index.html              # HTML MEJORADO
│   ├── css/
│   │   └── styles.css          # (opcional si separas CSS)
│   └── js/
│       └── main.js             # (opcional si separas JS)
├── server.js                   # Servidor Express
├── .env                        # Variables de entorno
├── package.json                
└── README.md
```

---

## 2️⃣ ARCHIVOS NECESARIOS

### archivo: server.js
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ================== RUTAS PRINCIPALES ==================

// Home (sirve index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// ================== API: BÚSQUEDA DE VUELOS (MOCK) ==================
app.post('/api/flights/search', (req, res) => {
  const { origin, destination, departure_date } = req.body;
  
  // AQUÍ irá integración con Amadeus GDS o similar
  // Por ahora, retornamos datos simulados
  
  const mockFlights = [
    {
      id: 'FL001',
      airline: 'Iberia',
      departure: '08:00',
      arrival: '22:15',
      duration: '10h 15m',
      price: 850,
      cabin: 'Economy',
      stops: 'Non-stop'
    },
    {
      id: 'FL002',
      airline: 'Avianca',
      departure: '14:30',
      arrival: '04:45+1',
      duration: '11h 15m',
      price: 720,
      cabin: 'Economy',
      stops: '1 escala'
    }
  ];
  
  res.json({
    success: true,
    route: `${origin} → ${destination}`,
    date: departure_date,
    flights: mockFlights
  });
});

// ================== API: CONTACTO (FORM) ==================
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // TODO: Conectar con Supabase
  /*
  const { data, error } = await supabase
    .from('contact_leads')
    .insert([{ name, email, message }]);
  */
  
  console.log(`📨 Nuevo lead: ${name} (${email})`);
  
  res.json({
    success: true,
    message: 'Gracias por tu consulta. Te contactaremos pronto.'
  });
});

// ================== API: NEWSLETTER ==================
app.post('/api/newsletter/subscribe', (req, res) => {
  const { email } = req.body;
  
  // TODO: Conectar con Mailchimp o SendGrid
  console.log(`📧 Suscriptor: ${email}`);
  
  res.json({
    success: true,
    message: 'Suscripción confirmada.'
  });
});

// ================== STRIPE WEBHOOK (OPCIONAL) ==================
app.post('/api/webhook/stripe', express.raw({type: 'application/json'}), (req, res) => {
  // Procesar pagos desde Stripe
  // Documentación: https://stripe.com/docs/webhooks
  res.json({ received: true });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`🌍 Accede a: https://${process.env.REPLIT_SLUG}.replit.dev`);
});
```

### archivo: .env (Variables de entorno)
```bash
# Puerto
PORT=3000

# Stripe (obtén en: https://dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Supabase (obtén en: https://app.supabase.com)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...

# Scalapay API (obtén en: https://scalapay.com/developers)
SCALAPAY_SECRET=sca_...

# Amadeus GDS (obtén en: https://developers.amadeus.com)
AMADEUS_API_KEY=your_key_here
AMADEUS_API_SECRET=your_secret_here

# Mailchimp (opcional, para newsletter)
MAILCHIMP_API_KEY=...
MAILCHIMP_LIST_ID=...

# SendGrid (para emails)
SENDGRID_API_KEY=SG....

# Node environment
NODE_ENV=production
```

### archivo: package.json (dependencias)
```json
{
  "name": "tripseuropa-web",
  "version": "1.0.0",
  "description": "Agencia de viajes premium Colombia → Europa",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "stripe": "^11.9.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

---

## 3️⃣ INTEGRACIÓN DE PAGOS (STRIPE)

### Paso 1: HTML con Stripe (agregar a index.html)
```html
<!-- En <head> -->
<script src="https://js.stripe.com/v3/"></script>

<!-- En checkout form -->
<form id="payment-form">
  <div id="card-element"></div>
  <button type="submit">Pagar con Tarjeta</button>
</form>

<script>
  const stripe = Stripe('{{ STRIPE_PUBLISHABLE_KEY }}');
  const elements = stripe.elements();
  const cardElement = elements.create('card');
  cardElement.mount('#card-element');
  
  document.getElementById('payment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const {token} = await stripe.createToken(cardElement);
    
    fetch('/api/payment', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ token: token.id, amount: 245000 })
    }).then(res => res.json()).then(data => {
      if(data.success) alert('✅ Pago realizado');
    });
  });
</script>
```

---

## 4️⃣ INTEGRACIÓN SUPABASE (BASE DE DATOS)

### Cliente JavaScript en index.html
```javascript
// Importar Supabase (agregar en <head>)
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
  const SUPABASE_URL = 'https://your-project.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGc...';
  
  const { createClient } = window.supabase;
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  // Guardar usuario tras login
  async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email, password
    });
    if(data.user) console.log('✅ Usuario autenticado:', data.user);
  }
  
  // Guardar reservación
  async function saveReservation(flightData) {
    const { data, error } = await supabase
      .from('reservations')
      .insert([{ user_id: '...', flight_id: flightData.id, status: 'pending' }]);
    
    if(error) console.error('Error:', error);
    else console.log('✅ Reservación guardada');
  }
</script>
```

---

## 5️⃣ INTEGRACIÓN SCALAPAY (BNPL - CUOTAS)

### Implementación en checkout
```javascript
function initScalapay() {
  // Cargar Scalapay SDK
  const script = document.createElement('script');
  script.src = 'https://checkout.scalapay.com/scalapay.js';
  document.head.appendChild(script);
  
  script.onload = () => {
    Scalapay.init({
      merchantId: 'your-merchant-id',
      publicKey: 'your-public-key'
    });
    
    // Mostrar widget de cuotas
    Scalapay.showPaymentPlans({
      amount: 2450,
      currency: 'USD',
      onSuccess: (token) => {
        console.log('Scalapay token:', token);
        // Procesar pago con cuotas
      }
    });
  };
}
```

---

## 6️⃣ DEPLOY EN REPLIT

### Opción 1: Automática (Replit Run)
```
1. Click en "Run" (arriba)
2. Replit deploya automáticamente
3. Tu URL: https://[proyecto-name].replit.dev
```

### Opción 2: Desde consola
```bash
npm start
# Debería mostrar: ✅ Servidor ejecutándose en http://localhost:3000
```

### Paso final: Conectar dominio
```
1. Ve a "Tools" → "Deployments"
2. Click "Deploy to Replit"
3. Obtén tu URL pública
4. (Opcional) Apunta tu dominio DNS a la URL de Replit
```

---

## 7️⃣ TESTING & TROUBLESHOOTING

### Test búsqueda de vuelos
```bash
curl -X POST http://localhost:3000/api/flights/search \
  -H "Content-Type: application/json" \
  -d '{"origin":"BOG","destination":"MAD","departure_date":"2025-03-15"}'
```

### Test formulario de contacto
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@mail.com","message":"Interesado en europa"}'
```

### Errores comunes
| Error | Solución |
|-------|----------|
| PORT already in use | Cambia PORT en .env |
| Cannot find module | Ejecuta `npm install` |
| CORS error | Verifica CORS middleware en server.js |
| Stripe undefined | Carga script en <head> |

---

## 8️⃣ PRÓXIMOS PASOS (ROADMAP)

### Fase 1 (Semana 1-2): MVP
- ✅ HTML responsive
- ✅ Buscador funcional
- ✅ Chatbot interactivo
- ✅ Integración Stripe

### Fase 2 (Semana 3-4): Core
- ⬜ Sistema de reservaciones (Supabase)
- ⬜ Autenticación de usuarios
- ⬜ Programa de lealtad (puntos)
- ⬜ BNPL con Scalapay

### Fase 3 (Semana 5-8): Premium
- ⬜ Blog SEO optimizado
- ⬜ API Amadeus para vuelos reales
- ⬜ Dashboard VIP
- ⬜ App móvil (React Native)

---

## 📞 CONTACTOS CLAVE

| Servicio | Enlace | Notas |
|----------|--------|-------|
| Stripe | https://dashboard.stripe.com | Pagos con tarjeta |
| Supabase | https://app.supabase.com | Base de datos + Auth |
| Scalapay | https://merchants.scalapay.com | BNPL Europa/Latam |
| Amadeus | https://developers.amadeus.com | GDS para vuelos reales |
| Replit | https://replit.com | Deploy gratis |

---

**Created:** Enero 2025  
**Version:** 1.0  
**Last updated:** 2025-12-28