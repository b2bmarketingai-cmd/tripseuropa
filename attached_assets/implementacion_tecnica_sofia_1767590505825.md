# GUÍA DE IMPLEMENTACIÓN TÉCNICA - SOFIA ASSISTANT V2.0
## Sistema Automático de Almacenamiento y Distribución de Conversaciones

---

## PARTE 1: ARQUITECTURA DEL SISTEMA

### Flujo Completo de Registros

```
CONVERSACIÓN ACTIVA
    ↓
[Usuario Interactúa con Sofia]
    ↓
CONVERSACIÓN TERMINA
    ↓
TRIGGER 1: Guardar en Base de Datos ✅
    ↓
TRIGGER 2: Enviar Email (Admin, Info, Gmail) ✅
    ↓
TRIGGER 3: Notificar por WhatsApp ✅
    ↓
TRIGGER 4: Generar Reportes (cada 24h / semana) ✅
```

---

## PARTE 2: IMPLEMENTACIÓN POR PLATAFORMA

### 2A. SI USAS OPENAI / CHATGPT (ChatGPT Plus)

**Opción 1: Agregar a System Prompt**

```javascript
// En tu configuración de OpenAI API
const systemPrompt = `
[COPIAR TODA LA SECCIÓN 1-14 DEL PROMPT V2.0]

INSTRUCCIÓN ADICIONAL:
Al final de cada conversación, SIEMPRE envía este JSON 
a tu webhook de logging:

{
  "timestamp": "[fecha hora]",
  "usuario_pais": "[país]",
  "usuario_nombre": "[nombre]",
  "usuario_email": "[email]",
  "tema_principal": "[tema]",
  "duracion_minutos": [X],
  "estado_final": "[resuelto/escalado/pendiente]",
  "transcripcion": "[conversación completa]"
}

Endpoint: https://tuserver.com/api/sofia/conversaciones
Method: POST
`;
```

**Opción 2: Usar Function Calling de OpenAI**

```javascript
const functions = [
  {
    name: "registrar_conversacion",
    description: "Registra la conversación en la base de datos",
    parameters: {
      type: "object",
      properties: {
        timestamp: { type: "string" },
        usuario_pais: { type: "string" },
        tema: { type: "string" },
        transcripcion: { type: "string" },
        emails_destino: { 
          type: "array",
          items: { type: "string" }
        }
      }
    }
  }
];

// OpenAI llamará automáticamente esta función
```

---

### 2B. SI USAS CHATBOT BUILDER (Botpress, n8n, Zapier)

**Botpress (Recomendado)**

```javascript
// 1. Crear canal de almacenamiento
workflow.on('message.received', (event) => {
  // Guardar mensaje
  db.conversations.insert({
    id: event.sessionId,
    timestamp: new Date(),
    pais: event.userData.country,
    mensaje: event.payload.text,
    sender: 'usuario'
  });
});

// 2. Al finalizar conversación
workflow.on('conversation.end', async (event) => {
  const conversacion = await db.conversations.find(event.sessionId);
  
  // Enviar emails
  const emails = [
    'admin@tripseuropa.com',
    'info@tripseuropa.com', 
    'info.tripseuropa@gmail.com'
  ];
  
  for (let email of emails) {
    await sendEmail({
      to: email,
      subject: `[SOFIA] Conversación - ${conversacion.pais}`,
      body: generarHTMLEmail(conversacion)
    });
  }
  
  // Enviar WhatsApp
  await whatsapp.send({
    to: 'admin_whatsapp_number',
    message: generarMensajeWhatsApp(conversacion)
  });
});
```

**n8n (Automatización)**

Crear workflow:
```
1. Trigger: Cuando Sofia termina conversación
2. Node: Database - Guardar registros
3. Node: Gmail - Enviar a 3 correos
4. Node: Twilio/WhatsApp - Notificación admin
5. Node: Google Sheets - Mantener backup
6. Node: Schedule - Reportes automáticos (7am lunes)
```

**Zapier (Si tienes chatbot existente)**

```
1. Trigger: Conversación completada en [tu chatbot]
2. Filtro: Solo si estado = "finalizado"
3. Acción 1: Google Sheets - Registrar conversación
4. Acción 2: Gmail - Enviar a admin@tripseuropa.com
5. Acción 3: Gmail - Enviar a info@tripseuropa.com
6. Acción 4: Gmail - Enviar a info.tripseuropa@gmail.com
7. Acción 5: WhatsApp API - Notificar administrativo
```

---

### 2C. SI TIENES CHATBOT PERSONALIZADO (React, Node.js, etc.)

**Backend Node.js + Express**

```javascript
// conversaciones.controller.js
const express = require('express');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const router = express.Router();

// Configurar servicios
const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Endpoint para guardar conversación
router.post('/api/sofia/conversaciones', async (req, res) => {
  try {
    const {
      timestamp,
      usuario_pais,
      usuario_nombre,
      usuario_email,
      usuario_telefono,
      tema_principal,
      duracion_minutos,
      estado_final,
      paquete_recomendado,
      transcripcion,
      satisfaccion
    } = req.body;

    // 1. GUARDAR EN BASE DE DATOS
    const conversacion = await Conversacion.create({
      timestamp,
      usuario_pais,
      usuario_nombre,
      usuario_email,
      usuario_telefono,
      tema_principal,
      duracion_minutos,
      estado_final,
      paquete_recomendado,
      transcripcion,
      satisfaccion,
      createdAt: new Date()
    });

    // 2. GENERAR HTML DEL EMAIL
    const emailHTML = generarHTMLEmail(conversacion);

    // 3. ENVIAR A 3 CORREOS
    const emails = [
      'admin@tripseuropa.com',
      'info@tripseuropa.com',
      'info.tripseuropa@gmail.com'
    ];

    for (let email of emails) {
      await mailer.sendMail({
        from: 'sofia@tripseuropa.com',
        to: email,
        subject: `[SOFIA] Conversación Registrada - ${usuario_pais} - ${tema_principal}`,
        html: emailHTML
      });
    }

    // 4. ENVIAR NOTIFICACIÓN WHATSAPP
    const mensajeWhatsApp = generarMensajeWhatsApp(conversacion);
    await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
      to: `whatsapp:${process.env.ADMIN_WHATSAPP}`,
      body: mensajeWhatsApp
    });

    res.status(201).json({
      success: true,
      conversacion_id: conversacion.id,
      mensaje: 'Conversación registrada exitosamente'
    });

  } catch (error) {
    console.error('Error registrando conversación:', error);
    res.status(500).json({ error: error.message });
  }
});

// Función para generar HTML del email
function generarHTMLEmail(data) {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .header { background: #0f172a; color: white; padding: 20px; }
          .section { margin: 20px 0; padding: 15px; border-left: 4px solid #32b8c6; }
          .label { font-weight: bold; color: #0f172a; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>📊 SOFIA ASSISTANT - CONVERSACIÓN REGISTRADA</h2>
        </div>
        
        <div class="section">
          <p><span class="label">Fecha/Hora:</span> ${data.timestamp}</p>
          <p><span class="label">País:</span> ${data.usuario_pais}</p>
          <p><span class="label">Nombre:</span> ${data.usuario_nombre || 'Anónimo'}</p>
          <p><span class="label">Email:</span> ${data.usuario_email || 'No proporcionado'}</p>
          <p><span class="label">Teléfono:</span> ${data.usuario_telefono || 'No proporcionado'}</p>
          <p><span class="label">Duración:</span> ${data.duracion_minutos} minutos</p>
        </div>

        <div class="section">
          <h3>Tema de Consulta</h3>
          <p><span class="label">Tema Principal:</span> ${data.tema_principal}</p>
          <p><span class="label">Paquete Recomendado:</span> ${data.paquete_recomendado || 'Ninguno'}</p>
          <p><span class="label">Estado Final:</span> ${data.estado_final}</p>
          <p><span class="label">Satisfacción:</span> ${data.satisfaccion || 'N/A'}</p>
        </div>

        <div class="section">
          <h3>Transcripción Completa</h3>
          <pre>${data.transcripcion}</pre>
        </div>
      </body>
    </html>
  `;
}

function generarMensajeWhatsApp(data) {
  return `🤖 SOFIA | NUEVA CONVERSACIÓN\n\n👤 ${data.usuario_nombre || 'Usuario'}\n🌍 ${data.usuario_pais}\n📍 ${data.tema_principal}\n⏱️ ${data.duracion_minutos} min\n✅ ${data.estado_final}`;
}

module.exports = router;
```

**Frontend React - Capturar conversación**

```jsx
// SofiaChat.jsx
import { useState } from 'react';

export default function SofiaChat() {
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState({
    pais: null,
    nombre: null,
    email: null
  });

  const enviarConversacion = async () => {
    try {
      const response = await fetch('/api/sofia/conversaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          usuario_pais: userInfo.pais,
          usuario_nombre: userInfo.nombre,
          usuario_email: userInfo.email,
          tema_principal: messages[0]?.content || 'General',
          duracion_minutos: Math.round((Date.now() - startTime) / 60000),
          estado_final: 'completado',
          transcripcion: messages.map(m => `${m.sender}: ${m.content}`).join('\n'),
          satisfaccion: 5
        })
      });

      if (response.ok) {
        console.log('✅ Conversación registrada');
      }
    } catch (error) {
      console.error('❌ Error:', error);
    }
  };

  return (
    <div className="chat-container">
      {/* Renderizar messages */}
      <button onClick={enviarConversacion}>Finalizar Chat</button>
    </div>
  );
}
```

---

## PARTE 3: CONFIGURACIÓN DE VARIABLES DE ENTORNO

Crear archivo `.env`:

```env
# Email Configuration
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_app_password
EMAIL_FROM=sofia@tripseuropa.com

# Emails para enviar conversaciones
ADMIN_EMAIL=admin@tripseuropa.com
INFO_EMAIL=info@tripseuropa.com
BACKUP_EMAIL=info.tripseuropa@gmail.com

# WhatsApp Configuration (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxx
TWILIO_WHATSAPP_FROM=+1234567890
ADMIN_WHATSAPP=+57[número]

# Database Configuration
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/tripseuropa

# Server
PORT=3000
NODE_ENV=production
```

---

## PARTE 4: PLANTILLA DE EMAIL AUTOMÁTICO

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Arial', sans-serif; 
      background: #f5f5f5;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: white;
      padding: 30px;
      border-radius: 8px 8px 0 0;
    }
    .header h2 { margin: 0; font-size: 24px; }
    .section {
      padding: 20px;
      border-left: 4px solid #32b8c6;
      margin: 15px;
    }
    .label { font-weight: bold; color: #0f172a; }
    .highlight { background: #f0f9ff; padding: 10px; border-radius: 4px; }
    .footer {
      background: #f5f5f5;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🤖 SOFIA ASSISTANT - CONVERSACIÓN REGISTRADA</h2>
      <p>Sistema Automático de Registro | Trips Europa</p>
    </div>

    <div class="section">
      <h3>📊 DATOS DE TIEMPO</h3>
      <div class="highlight">
        <p><span class="label">Fecha:</span> {{fecha}}</p>
        <p><span class="label">Hora de Inicio:</span> {{hora_inicio}}</p>
        <p><span class="label">Duración:</span> {{duracion}} minutos</p>
      </div>
    </div>

    <div class="section">
      <h3>👤 INFORMACIÓN DEL USUARIO</h3>
      <p><span class="label">País:</span> {{pais}}</p>
      <p><span class="label">Nombre:</span> {{nombre}}</p>
      <p><span class="label">Email:</span> {{email}}</p>
      <p><span class="label">Teléfono:</span> {{telefono}}</p>
    </div>

    <div class="section">
      <h3>🎯 CONSULTA</h3>
      <p><span class="label">Tema Principal:</span> {{tema}}</p>
      <p><span class="label">Paquete Recomendado:</span> {{paquete}}</p>
      <p><span class="label">Estado Final:</span> {{estado}}</p>
    </div>

    <div class="section">
      <h3>📝 TRANSCRIPCIÓN</h3>
      <pre>{{transcripcion}}</pre>
    </div>

    <div class="footer">
      <p>Este email fue generado automáticamente por Sofia Assistant</p>
      <p>ID Conversación: {{conversation_id}}</p>
    </div>
  </div>
</body>
</html>
```

---

## PARTE 5: DASHBOARD ADMINISTRATIVO

Crear página web para ver conversaciones:

```html
<!-- admin-dashboard.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Sofia - Dashboard Administrativo</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial; background: #f5f5f5; }
    .dashboard {
      max-width: 1200px;
      margin: 20px auto;
      background: white;
      border-radius: 8px;
      padding: 20px;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    .stat-number { font-size: 32px; font-weight: bold; }
    .table-container {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background: #0f172a;
      color: white;
      font-weight: bold;
    }
    tr:hover { background: #f5f5f5; }
  </style>
</head>
<body>
  <div class="dashboard">
    <h1>📊 Sofia Assistant - Dashboard Administrativo</h1>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-number" id="total-conv">0</div>
        <p>Total Conversaciones</p>
      </div>
      <div class="stat-card">
        <div class="stat-number" id="hoy">0</div>
        <p>Hoy</p>
      </div>
      <div class="stat-card">
        <div class="stat-number" id="escaladas">0</div>
        <p>Escaladas a Agente</p>
      </div>
      <div class="stat-card">
        <div class="stat-number" id="satisfaccion">0</div>
        <p>Satisfacción Promedio</p>
      </div>
    </div>

    <div class="table-container">
      <table id="conversaciones-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>País</th>
            <th>Usuario</th>
            <th>Tema</th>
            <th>Duración</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody id="table-body">
          <!-- Se rellena con JavaScript -->
        </tbody>
      </table>
    </div>
  </div>

  <script>
    async function cargarConversaciones() {
      const response = await fetch('/api/sofia/conversaciones');
      const datos = await response.json();

      // Actualizar estadísticas
      document.getElementById('total-conv').textContent = datos.total;
      document.getElementById('hoy').textContent = datos.hoy;
      document.getElementById('escaladas').textContent = datos.escaladas;
      document.getElementById('satisfaccion').textContent = datos.satisfaccion_promedio.toFixed(1);

      // Llenar tabla
      const tbody = document.getElementById('table-body');
      datos.conversaciones.forEach(conv => {
        tbody.innerHTML += `
          <tr>
            <td>${conv.timestamp}</td>
            <td>${conv.usuario_pais}</td>
            <td>${conv.usuario_nombre}</td>
            <td>${conv.tema_principal}</td>
            <td>${conv.duracion_minutos} min</td>
            <td>${conv.estado_final}</td>
            <td><button onclick="verDetalles('${conv.id}')">Ver</button></td>
          </tr>
        `;
      });
    }

    cargarConversaciones();
    setInterval(cargarConversaciones, 30000); // Actualizar cada 30 segundos
  </script>
</body>
</html>
```

---

## PARTE 6: REPORTES AUTOMÁTICOS

```javascript
// reports.scheduler.js
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Ejecutar cada lunes a las 9:00 AM
cron.schedule('0 9 * * 1', async () => {
  console.log('📊 Generando reporte semanal...');

  const conversaciones = await Conversacion.find({
    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
  });

  const reporteHTML = `
    <h2>📊 Reporte Semanal - Sofia Assistant</h2>
    <p>Semana: ${new Date().toLocaleDateString()}</p>
    
    <h3>Estadísticas</h3>
    <ul>
      <li>Total conversaciones: ${conversaciones.length}</li>
      <li>Promedio duración: ${(conversaciones.reduce((a,b) => a + b.duracion_minutos, 0) / conversaciones.length).toFixed(1)} minutos</li>
      <li>Tasa de escalado: ${(conversaciones.filter(c => c.estado_final === 'escalado').length / conversaciones.length * 100).toFixed(1)}%</li>
    </ul>

    <h3>Por País</h3>
    ${Object.entries(conversaciones.reduce((acc, c) => {
      acc[c.usuario_pais] = (acc[c.usuario_pais] || 0) + 1;
      return acc;
    }, {})).map(([pais, count]) => `<p>${pais}: ${count}</p>`).join('')}
  `;

  // Enviar a admin
  await nodemailer.createTransport({...}).sendMail({
    to: 'admin@tripseuropa.com',
    subject: 'Reporte Semanal Sofia',
    html: reporteHTML
  });

  console.log('✅ Reporte enviado');
});
```

---

## RESUMEN DE IMPLEMENTACIÓN

✅ **Paso 1:** Copiar `prompt_sofia_v2.md` completo
✅ **Paso 2:** Integrar en tu plataforma (OpenAI, Botpress, n8n, etc.)
✅ **Paso 3:** Configurar variables de entorno
✅ **Paso 4:** Implementar endpoint de almacenamiento
✅ **Paso 5:** Enviar a correos automáticamente
✅ **Paso 6:** Notificar por WhatsApp
✅ **Paso 7:** Crear dashboard administrativo
✅ **Paso 8:** Configurar reportes automáticos
✅ **Paso 9:** Testear todo el flujo
✅ **Paso 10:** Lanzar en producción

**Tiempo de implementación:** 2-4 horas (máximo)
**Costo:** Gratuito si usas Gmail + Twilio trial
**ROI:** Seguimiento 100% de cada cliente desde primer contacto

¡Listo para implementar! 🚀
