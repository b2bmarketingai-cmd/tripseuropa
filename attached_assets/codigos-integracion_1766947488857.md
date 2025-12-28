# 💻 CÓDIGOS DE INTEGRACIÓN - Copy & Paste Ready

Todos estos fragmentos están listos para implementar. Solo reemplaza las variables de entorno.

---

## 1️⃣ INTEGRACIÓN STRIPE (Pago con Tarjeta)

### A) Agregar a HTML (en <head>)
```html
<script src="https://js.stripe.com/v3/"></script>
```

### B) Elemento de pago en HTML (en <body>)
```html
<form id="payment-form">
  <div id="card-element"></div>
  <button type="submit">Pagar USD $2,450</button>
  <div id="card-errors" role="alert"></div>
</form>
```

### C) JavaScript para procesar pago
```javascript
// Configuración (reemplaza con tu clave pública)
const STRIPE_PUBLIC_KEY = 'pk_test_...';
const stripe = Stripe(STRIPE_PUBLIC_KEY);
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

// Manejo de errores en tiempo real
cardElement.addEventListener('change', (event) => {
  const displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Procesar pago
document.getElementById('payment-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const { token } = await stripe.createToken(cardElement);
  
  if (token) {
    // Enviar token al servidor
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: token.id,
        amount: 245000, // en centavos
        currency: 'USD',
        description: 'Paquete Bogotá-Madrid'
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert('✅ Pago procesado. Tu reserva está confirmada.');
    } else {
      alert('❌ Error: ' + result.error);
    }
  }
});
```

### D) Endpoint Node.js (en server.js)
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/payment', async (req, res) => {
  try {
    const { token, amount, currency, description } = req.body;
    
    const charge = await stripe.charges.create({
      amount: amount,
      currency: currency.toLowerCase(),
      source: token,
      description: description
    });
    
    // Guardar en Supabase
    // TODO: await supabase.from('pagos').insert([...])
    
    res.json({ success: true, charge_id: charge.id });
  } catch (error) {
    console.error('Stripe error:', error);
    res.json({ success: false, error: error.message });
  }
});
```

---

## 2️⃣ INTEGRACIÓN SCALAPAY (BNPL - Cuotas)

### A) Agregar SDK a HTML
```html
<script src="https://checkout.scalapay.com/scalapay.js"></script>
```

### B) Widget de cuotas en HTML
```html
<div id="scalapay-container"></div>
<button id="scalapay-btn">Pagar en cuotas con Scalapay</button>
```

### C) JavaScript para activar Scalapay
```javascript
const SCALAPAY_MERCHANT_ID = 'your-merchant-id';
const SCALAPAY_PUBLIC_KEY = 'your-public-key';

document.getElementById('scalapay-btn').addEventListener('click', () => {
  Scalapay.init({
    merchantId: SCALAPAY_MERCHANT_ID,
    publicKey: SCALAPAY_PUBLIC_KEY
  });
  
  // Mostrar opciones de cuotas
  Scalapay.showPaymentPlans({
    amount: 2450, // en USD
    currency: 'USD',
    items: [
      {
        id: 'paquete-001',
        name: 'Paquete Bogotá-Madrid',
        description: '5 noches + vuelos',
        quantity: 1,
        unitPrice: 2450
      }
    ],
    onSuccess: (token) => {
      console.log('Scalapay success:', token);
      // Enviar token al servidor
      fetch('/api/scalapay-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token.id })
      }).then(res => res.json())
        .then(data => {
          if (data.success) {
            alert('✅ Cuotas confirmadas. Tu pago se procesará en 3/6/12 meses.');
          }
        });
    },
    onError: (error) => {
      alert('❌ Error en Scalapay: ' + error.message);
    }
  });
});
```

---

## 3️⃣ INTEGRACIÓN SUPABASE (Auth + Base de Datos)

### A) Agregar SDK a HTML
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

### B) Inicializar Supabase en JavaScript
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGc...';

const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Verificar si usuario está autenticado
async function checkAuth() {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    console.log('✅ Usuario autenticado:', user.email);
  } else {
    console.log('❌ Usuario no autenticado');
  }
}

checkAuth();
```

### C) Registro de nuevo usuario
```javascript
async function registerUser(email, password, name, phone) {
  try {
    // 1. Crear usuario en Auth
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });
    
    if (error) throw error;
    
    // 2. Guardar perfil en tabla usuarios
    const { error: profileError } = await supabase
      .from('usuarios')
      .insert([{
        id: data.user.id,
        email: email,
        nombre: name,
        telefono: phone,
        pais: 'Colombia'
      }]);
    
    if (profileError) throw profileError;
    
    console.log('✅ Usuario registrado');
    return data.user;
  } catch (error) {
    console.error('Error en registro:', error.message);
  }
}
```

### D) Login de usuario
```javascript
async function loginUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
    
    if (error) throw error;
    
    console.log('✅ Login exitoso. Bienvenido', data.user.email);
    return data.user;
  } catch (error) {
    console.error('❌ Error en login:', error.message);
  }
}
```

### E) Guardar reservación
```javascript
async function saveReservation(userId, flightId, hotelId, totalPrice) {
  try {
    const { data, error } = await supabase
      .from('reservaciones')
      .insert([{
        usuario_id: userId,
        tipo: 'paquete',
        detalles: {
          flight_id: flightId,
          hotel_id: hotelId,
          fecha_creacion: new Date().toISOString()
        },
        estado: 'pendiente',
        total_monto: totalPrice
      }])
      .select();
    
    if (error) throw error;
    
    console.log('✅ Reservación guardada:', data[0].id);
    return data[0];
  } catch (error) {
    console.error('Error al guardar:', error.message);
  }
}
```

### F) Obtener historial de reservaciones del usuario
```javascript
async function getUserReservations(userId) {
  try {
    const { data, error } = await supabase
      .from('reservaciones')
      .select('*')
      .eq('usuario_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    console.log('Tus reservaciones:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

---

## 4️⃣ FORMULARIO DE CONTACTO CON VALIDACIÓN

### A) HTML del formulario
```html
<form id="contactForm">
  <input type="text" name="nombre" placeholder="Tu nombre" required>
  <input type="email" name="email" placeholder="Tu email" required>
  <input type="tel" name="telefono" placeholder="Tu teléfono" required>
  <select name="servicio" required>
    <option value="">Selecciona un servicio</option>
    <option value="vuelos">Vuelos</option>
    <option value="hoteles">Hoteles</option>
    <option value="paquetes">Paquetes</option>
    <option value="otros">Otros</option>
  </select>
  <textarea name="mensaje" placeholder="Tu mensaje" rows="5" required></textarea>
  <button type="submit">Enviar Consulta</button>
  <div id="form-message"></div>
</form>
```

### B) JavaScript con validación y envío
```javascript
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    nombre: document.querySelector('input[name="nombre"]').value,
    email: document.querySelector('input[name="email"]').value,
    telefono: document.querySelector('input[name="telefono"]').value,
    servicio: document.querySelector('select[name="servicio"]').value,
    mensaje: document.querySelector('textarea[name="mensaje"]').value
  };
  
  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('❌ Email inválido');
    return;
  }
  
  // Validar teléfono
  if (formData.telefono.length < 10) {
    alert('❌ Teléfono inválido');
    return;
  }
  
  // Enviar al servidor
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      document.getElementById('form-message').innerHTML = 
        '✅ ' + result.message;
      document.getElementById('contactForm').reset();
      
      // Si usas Supabase, también guardar en DB
      if (typeof supabase !== 'undefined') {
        await supabase.from('contact_leads').insert([formData]);
      }
    }
  } catch (error) {
    alert('❌ Error al enviar: ' + error.message);
  }
});
```

### C) Endpoint Node.js
```javascript
app.post('/api/contact', async (req, res) => {
  const { nombre, email, telefono, servicio, mensaje } = req.body;
  
  // Validar en servidor también
  if (!nombre || !email || !telefono || !servicio) {
    return res.json({ success: false, error: 'Campos incompletos' });
  }
  
  try {
    // Guardar en Supabase
    const { data, error } = await supabase
      .from('contact_leads')
      .insert([{
        nombre, email, telefono, servicio, mensaje
      }]);
    
    if (error) throw error;
    
    // TODO: Enviar email de confirmación con SendGrid
    // await sendConfirmationEmail(email, nombre);
    
    console.log('📨 Nuevo lead:', email);
    res.json({
      success: true,
      message: 'Gracias por tu consulta. Te contactaremos en 24 horas.'
    });
  } catch (error) {
    console.error('Error:', error);
    res.json({ success: false, error: error.message });
  }
});
```

---

## 5️⃣ CHATBOT INTELIGENTE

### A) HTML del widget
```html
<button class="chat-btn" id="chatBtn" onclick="toggleChat()">
  <i class="fas fa-comments"></i>
</button>

<div class="chat-window" id="chatWindow">
  <div class="chat-header">
    <h3>Concierge VIP</h3>
    <button onclick="toggleChat()">✕</button>
  </div>
  <div class="chat-body" id="chatBody"></div>
  <div class="chat-footer">
    <input type="text" id="chatInput" placeholder="Escribe tu mensaje...">
    <button onclick="sendMessage()">▶</button>
  </div>
</div>
```

### B) JavaScript del chatbot
```javascript
// Estado del chat
let chatHistory = [];

function toggleChat() {
  document.getElementById('chatWindow').classList.toggle('active');
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Agregar mensaje del usuario
  addMessage(message, 'user');
  input.value = '';
  
  // Generar respuesta del bot
  setTimeout(() => {
    const response = generateBotResponse(message);
    addMessage(response, 'bot');
  }, 600);
}

function addMessage(text, sender) {
  const chatBody = document.getElementById('chatBody');
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender === 'bot' ? 'msg-bot' : 'msg-user'}`;
  msgDiv.textContent = text;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
  
  // Guardar en historial
  chatHistory.push({ sender, text, timestamp: new Date() });
}

function generateBotResponse(userMessage) {
  const lower = userMessage.toLowerCase();
  
  const responses = {
    // Vuelos
    vuelo: [
      '✈️ Tenemos excelentes conexiones desde Bogotá a Madrid (USD $850), París (USD $920) y Barcelona (USD $780). ¿Qué fecha te interesa?',
      '✈️ Nuestro vuelo más popular es el BOG→MAD en Iberia Business Class. ¿Deseas ver fechas disponibles?'
    ],
    
    // Hoteles
    hotel: [
      '🏨 Recomendamos: Ritz Madrid (5 estrellas), Crillon París (lujo absoluto) o Villa d\'Este Roma. ¿Cuántas noches?',
      '🏨 Para hoteles boutique, el Mandarin Oriental Barcelona es espectacular. ¿Cuál es tu presupuesto?'
    ],
    
    // Precios
    precio: [
      '💰 Nuestro paquete más popular: Vuelo + 4 noches + Tours = desde USD $2,450',
      '💰 Oferta Flash: BOG→MAD USD $3,200 → ahora USD $2,450'
    ],
    
    // Contacto
    contacto: [
      '☎️ Puedes llamarnos al +57 300 123 4567 o escribir a reservas@tripseuropa.com',
      '☎️ Nuestro equipo de concierge está disponible 24/7. ¿Necesitas que te contacte un agente?'
    ],
    
    // Default
    default: '¿Podrías ser más específico? Te puedo ayudar con: ✈️ Vuelos, 🏨 Hoteles, 💰 Precios, ☎️ Contacto'
  };
  
  // Buscar coincidencias
  for (const [key, answers] of Object.entries(responses)) {
    if (lower.includes(key) && key !== 'default') {
      return answers[Math.floor(Math.random() * answers.length)];
    }
  }
  
  return responses.default;
}

// Mensaje inicial
window.addEventListener('DOMContentLoaded', () => {
  addMessage('¡Hola! 👋 Soy tu asistente VIP de Trips Europa. Puedo ayudarte con vuelos, hoteles, paquetes y más. ¿En qué te ayudo?', 'bot');
});

// Enter para enviar
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});
```

---

## 6️⃣ SUSCRIPCIÓN A NEWSLETTER

### A) HTML
```html
<form id="newsletter-form">
  <input type="email" placeholder="Tu email" required>
  <button type="submit">Suscribirse</button>
</form>
```

### B) JavaScript
```javascript
document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  
  try {
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    const result = await response.json();
    alert(result.success ? '✅ ' + result.message : '❌ ' + result.error);
    
    if (result.success) {
      e.target.reset();
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
```

### C) Endpoint Node.js
```javascript
app.post('/api/newsletter/subscribe', async (req, res) => {
  const { email } = req.body;
  
  // TODO: Integrar con Mailchimp o SendGrid
  // await mailchimp.lists.batchListMembers(...)
  
  console.log('📧 Suscriptor:', email);
  res.json({
    success: true,
    message: 'Suscripción confirmada. Recibirás ofertas exclusivas.'
  });
});
```

---

## ✅ Checklist de Integración

- [ ] Stripe configurado (claves en .env)
- [ ] Scalapay configurado (merchant ID)
- [ ] Supabase BD creada (tablas esquema)
- [ ] Formulario de contacto validado
- [ ] Chatbot responde 5+ palabras clave
- [ ] Validación de email/teléfono
- [ ] .env con todas las variables
- [ ] CORS configurado en server.js
- [ ] Todas las APIs testeadas con curl
- [ ] HTML/CSS/JS minificados (opcional)

---

**Última actualización:** 2025-12-28  
**Versión:** 1.0  
**Estado:** Listo para implementar ✅