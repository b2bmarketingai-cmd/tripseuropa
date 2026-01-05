import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string | null;
  originCountry?: string | null;
  serviceInterest?: string | null;
  message?: string | null;
}

const RECIPIENT_EMAILS = [
  'info@tripseuropa.com',
  'info.tripseuropa@gmail.com',
  'agente@tripseuropa.com'
];

export async function sendContactFormEmail(data: ContactFormData): Promise<boolean> {
  try {
    const { client, fromEmail } = await getUncachableResendClient();

    const serviceMap: Record<string, string> = {
      'vuelos': 'Vuelos',
      'paquetes': 'Paquetes de Viaje',
      'hoteles': 'Hoteles',
      'luna-miel': 'Luna de Miel',
      'grupos': 'Viajes en Grupo',
      'corporativo': 'Viajes Corporativos',
      'otro': 'Otro'
    };

    const countryMap: Record<string, string> = {
      'colombia': 'Colombia',
      'mexico': 'México',
      'argentina': 'Argentina',
      'brasil': 'Brasil',
      'peru': 'Perú',
      'chile': 'Chile',
      'ecuador': 'Ecuador',
      'panama': 'Panamá',
      'costa-rica': 'Costa Rica',
      'venezuela': 'Venezuela',
      'otro': 'Otro país'
    };

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0f172a; padding: 20px; text-align: center;">
          <h1 style="color: #d4af37; margin: 0;">Trips Europa</h1>
          <p style="color: white; margin: 5px 0 0;">Nueva Solicitud de Cotización</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            Datos del Cliente
          </h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #666;">Nombre:</td>
              <td style="padding: 10px 0; color: #0f172a;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #666;">Email:</td>
              <td style="padding: 10px 0; color: #0f172a;">
                <a href="mailto:${data.email}" style="color: #d4af37;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #666;">Teléfono:</td>
              <td style="padding: 10px 0; color: #0f172a;">${data.phone || 'No proporcionado'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #666;">País de Origen:</td>
              <td style="padding: 10px 0; color: #0f172a;">${data.originCountry ? (countryMap[data.originCountry] || data.originCountry) : 'No especificado'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #666;">Servicio de Interés:</td>
              <td style="padding: 10px 0; color: #0f172a;">${serviceMap[data.serviceInterest || ''] || data.serviceInterest || 'No especificado'}</td>
            </tr>
          </table>
          
          <h3 style="color: #0f172a; margin-top: 20px;">Mensaje:</h3>
          <div style="background: white; padding: 15px; border-left: 4px solid #d4af37; border-radius: 4px;">
            <p style="margin: 0; color: #333; white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
        
        <div style="background: #0f172a; padding: 15px; text-align: center;">
          <p style="color: #888; margin: 0; font-size: 12px;">
            Este mensaje fue enviado desde el formulario de contacto de tripseuropa.com
          </p>
        </div>
      </div>
    `;

    const result = await client.emails.send({
      from: fromEmail || 'Trips Europa <noreply@tripseuropa.com>',
      to: RECIPIENT_EMAILS,
      subject: `Nueva Solicitud - ${data.name} desde ${data.originCountry ? (countryMap[data.originCountry] || data.originCountry) : 'No especificado'}`,
      html: htmlContent,
      replyTo: data.email
    });

    console.log('Email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export interface SofiaConversationData {
  timestamp: string;
  userCountry: string | null;
  userName: string | null;
  userEmail: string | null;
  userPhone: string | null;
  mainTopic: string | null;
  durationMinutes: number;
  finalStatus: string;
  recommendedPackage: string | null;
  transcription: string;
  satisfaction: number | null;
  conversationId: number | null;
}

export async function sendSofiaConversationEmail(data: SofiaConversationData): Promise<boolean> {
  try {
    const { client, fromEmail } = await getUncachableResendClient();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 30px; text-align: center;">
          <h1 style="color: #d4af37; margin: 0; font-size: 24px;">Sofia Assistant</h1>
          <p style="color: white; margin: 5px 0 0;">Conversacion Registrada - Trips Europa</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <div style="background: white; padding: 20px; border-left: 4px solid #32b8c6; border-radius: 4px; margin-bottom: 20px;">
            <h3 style="color: #0f172a; margin: 0 0 15px 0;">Datos de Tiempo</h3>
            <table style="width: 100%;">
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Fecha/Hora:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${data.timestamp}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Duracion:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${data.durationMinutes} minutos</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>ID Conversacion:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${data.conversationId || 'N/A'}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; padding: 20px; border-left: 4px solid #d4af37; border-radius: 4px; margin-bottom: 20px;">
            <h3 style="color: #0f172a; margin: 0 0 15px 0;">Informacion del Usuario</h3>
            <table style="width: 100%;">
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Pais:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${data.userCountry || 'No identificado'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Nombre:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${data.userName || 'Anonimo'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${data.userEmail ? `<a href="mailto:${data.userEmail}" style="color: #d4af37;">${data.userEmail}</a>` : 'No proporcionado'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Telefono:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${data.userPhone || 'No proporcionado'}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; padding: 20px; border-left: 4px solid #22c55e; border-radius: 4px; margin-bottom: 20px;">
            <h3 style="color: #0f172a; margin: 0 0 15px 0;">Consulta</h3>
            <table style="width: 100%;">
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Tema Principal:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${data.mainTopic || 'General'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Paquete Recomendado:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${data.recommendedPackage || 'Ninguno'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Estado Final:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${data.finalStatus}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Satisfaccion:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${data.satisfaction ? data.satisfaction + '/5' : 'N/A'}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; padding: 20px; border-radius: 4px;">
            <h3 style="color: #0f172a; margin: 0 0 15px 0;">Transcripcion Completa</h3>
            <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word; font-size: 13px; line-height: 1.5; max-height: 400px; overflow-y: auto;">${data.transcription}</pre>
          </div>
        </div>
        
        <div style="background: #0f172a; padding: 15px; text-align: center;">
          <p style="color: #888; margin: 0; font-size: 12px;">
            Este email fue generado automaticamente por Sofia Assistant | Trips Europa
          </p>
        </div>
      </div>
    `;

    const result = await client.emails.send({
      from: fromEmail || 'Sofia Assistant <sofia@tripseuropa.com>',
      to: RECIPIENT_EMAILS,
      subject: `[SOFIA] Conversacion - ${data.userCountry || 'No identificado'} - ${data.mainTopic || 'General'}`,
      html: htmlContent
    });

    console.log('Sofia conversation email sent:', result);
    return true;
  } catch (error) {
    console.error('Error sending Sofia conversation email:', error);
    return false;
  }
}

export async function sendNewsletterNotificationEmail(subscriberEmail: string): Promise<boolean> {
  try {
    const { client, fromEmail } = await getUncachableResendClient();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0f172a; padding: 20px; text-align: center;">
          <h1 style="color: #d4af37; margin: 0;">Trips Europa</h1>
          <p style="color: white; margin: 5px 0 0;">Nueva Suscripcion al Newsletter</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            Nuevo Suscriptor
          </h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #666; font-size: 14px;">Email del suscriptor:</p>
            <p style="margin: 5px 0 0; color: #0f172a; font-size: 18px; font-weight: bold;">
              <a href="mailto:${subscriberEmail}" style="color: #d4af37;">${subscriberEmail}</a>
            </p>
          </div>
          
          <p style="color: #666; margin-top: 20px; font-size: 14px;">
            Este usuario se ha suscrito al newsletter de Trips Europa y desea recibir ofertas exclusivas y promociones.
          </p>
        </div>
        
        <div style="background: #0f172a; padding: 15px; text-align: center;">
          <p style="color: #888; margin: 0; font-size: 12px;">
            Notificacion automatica de tripseuropa.com
          </p>
        </div>
      </div>
    `;

    const result = await client.emails.send({
      from: fromEmail || 'Trips Europa <noreply@tripseuropa.com>',
      to: ['info@tripseuropa.com', 'agente@tripseuropa.com'],
      subject: `Nueva Suscripcion Newsletter - ${subscriberEmail}`,
      html: htmlContent
    });

    console.log('Newsletter notification email sent:', result);
    return true;
  } catch (error) {
    console.error('Error sending newsletter notification email:', error);
    return false;
  }
}
