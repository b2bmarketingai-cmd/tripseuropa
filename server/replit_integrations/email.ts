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
