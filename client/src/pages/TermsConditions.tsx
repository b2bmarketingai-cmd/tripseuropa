import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/support";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/SEOSchemas";

export default function TermsConditions() {
  const lastUpdated = "26 de enero de 2026";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Terminos y Condiciones de Uso"
        description="Lee nuestros terminos y condiciones de servicio para la reserva de paquetes turisticos a Europa. Politicas de pago, cancelacion y modificaciones."
        keywords="terminos condiciones trips europa, politicas pago, cancelacion viajes"
        url="https://tripseuropa.com/terminos-condiciones"
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://tripseuropa.com" },
          { name: "Terminos y Condiciones", url: "https://tripseuropa.com/terminos-condiciones" }
        ]}
      />
      <Header />
      
      <main className="flex-1 py-16" data-testid="section-terms">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-display font-bold text-accent mb-6" data-testid="text-terms-title">
            Terminos y Condiciones de Servicio
          </h1>
          
          <p className="text-muted-foreground mb-8" data-testid="text-last-updated">
            Ultima actualizacion: {lastUpdated}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-display text-accent mb-4">1. Introduccion y Aceptacion de Terminos</h2>
              <p>
                Bienvenido a Trips Europa. Al acceder y utilizar nuestro sitio web tripseuropa.co y tripseuropa.com, 
                usted acepta cumplir y estar sujeto a estos terminos y condiciones de servicio. Si no esta de acuerdo 
                con alguna parte de estos terminos, le solicitamos que no utilice nuestros servicios. Estos terminos 
                aplican a todos los visitantes, usuarios y clientes que accedan o utilicen el servicio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-accent mb-4">2. Definiciones y Terminologia</h2>
              <p>
                A efectos de estos terminos: "Trips Europa", "nosotros", "nuestro" se refiere a la agencia de viajes 
                operadora del sitio web. "Usuario", "usted", "cliente" se refiere a cualquier persona que acceda o 
                utilice nuestros servicios. "Servicios" incluye reservas de vuelos, hoteles, paquetes turisticos, 
                asistencia de visa y cualquier otro servicio ofrecido a traves de nuestra plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-accent mb-4">3. Servicios Ofrecidos</h2>
              <p>
                Trips Europa es una agencia de viajes especializada en paquetes turisticos a Europa para viajeros 
                latinoamericanos. Nuestros servicios incluyen: reservacion de vuelos internacionales, reservacion de 
                hoteles y alojamiento, paquetes turisticos todo incluido, asistencia para tramite de visa Schengen, 
                seguros de viaje, tours guiados en espanol, y servicios de concierge personalizado. Actuamos como 
                intermediarios entre los proveedores de servicios turisticos y nuestros clientes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-accent mb-4">4. Proceso de Reserva y Confirmacion</h2>
              <p>
                Las reservas se realizan a traves de nuestro sitio web o mediante comunicacion directa con nuestros 
                asesores. Una vez recibida su solicitud, le enviaremos una cotizacion detallada. La reserva se 
                considera confirmada unicamente despues de recibir el pago del deposito correspondiente y la 
                confirmacion por escrito de nuestra parte. Los tiempos de respuesta habituales son de 24 a 48 horas 
                habiles. Las disponibilidades estan sujetas a confirmacion al momento del pago, por lo que los 
                precios cotizados pueden variar hasta la confirmacion final.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-accent mb-4">5. Precios y Formas de Pago</h2>
              <p>
                Todos los precios se expresan en dolares estadounidenses (USD) a menos que se indique lo contrario. 
                Los precios incluyen los servicios especificados en cada paquete y estan sujetos a disponibilidad. 
                Aceptamos pagos mediante tarjeta de credito, transferencia bancaria y otros metodos especificados. 
                El pago completo debe realizarse segun el calendario acordado, generalmente 45 dias antes de la 
                fecha de viaje para paquetes internacionales. Ofrecemos planes de pago en cuotas sujetos a 
                aprobacion crediticia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-accent mb-4">6. Politica de Cancelacion y Reembolsos</h2>
              <p>
                Las cancelaciones deben notificarse por escrito. Las politicas de reembolso varian segun el tiempo 
                de anticipacion: cancelaciones con mas de 60 dias de anticipacion: reembolso del 90% del total 
                pagado. Entre 30 y 60 dias: reembolso del 50%. Entre 15 y 30 dias: reembolso del 25%. Menos de 15 
                dias: sin reembolso. Algunos servicios como vuelos pueden tener politicas de cancelacion especiales 
                establecidas por las aerolineas. Los reembolsos se procesan en un plazo de 30 dias habiles. Los 
                gastos administrativos no son reembolsables.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-accent mb-4">7. Modificaciones de Reserva</h2>
              <p>
                Las solicitudes de modificacion estan sujetas a disponibilidad y pueden generar cargos adicionales. 
                Los cambios de fecha, destino o servicios deben solicitarse con al menos 30 dias de anticipacion. 
                Nos reservamos el derecho de aplicar tarifas de modificacion segun las politicas de los proveedores. 
                Cambios de nombre o transferencia de reservas estan sujetos a las regulaciones de las aerolineas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-accent mb-4">8. Responsabilidades del Cliente</h2>
              <p>
                El cliente es responsable de proporcionar informacion veraz y completa para la reserva. Debe 
                verificar que sus documentos de viaje (pasaporte, visas) esten vigentes y cumplan con los 
                requisitos del destino. Es responsabilidad del cliente cumplir con los horarios de vuelos y 
                servicios programados. Recomendamos contratar un seguro de viaje integral para cubrir imprevistos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-accent mb-4">9. Responsabilidades de Trips Europa</h2>
              <p>
                Trips Europa se compromete a proporcionar servicios de calidad y asistencia profesional en la 
                planificacion de su viaje. Actuamos como intermediarios y no somos responsables directos por 
                incumplimientos de terceros proveedores como aerolineas, hoteles u operadores turisticos. Nos 
                comprometemos a gestionar reclamaciones ante proveedores en nombre del cliente. Proporcionamos 
                asistencia 24/7 durante su viaje para emergencias. No somos responsables por eventos fuera de 
                nuestro control como condiciones climaticas, conflictos, pandemias o decisiones gubernamentales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-accent mb-4">10. Fuerza Mayor</h2>
              <p>
                Trips Europa no sera responsable por incumplimientos causados por eventos de fuerza mayor, 
                incluyendo pero no limitado a: desastres naturales, pandemias, guerras, conflictos civiles, 
                actos terroristas, huelgas, restricciones gubernamentales o cualquier otro evento imprevisto 
                fuera de nuestro control razonable. En tales casos, trabajaremos para ofrecer alternativas o 
                creditos para viajes futuros segun las circunstancias.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-accent mb-4">11. Proteccion de Datos Personales</h2>
              <p>
                Sus datos personales son tratados conforme a nuestra Politica de Privacidad y las leyes de 
                proteccion de datos aplicables. Recopilamos unicamente la informacion necesaria para proporcionar 
                nuestros servicios. No compartimos sus datos con terceros excepto cuando sea necesario para 
                completar su reserva (aerolineas, hoteles, etc.). Implementamos medidas de seguridad para proteger 
                su informacion. Tiene derecho a acceder, rectificar y eliminar sus datos personales contactandonos 
                directamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-accent mb-4">12. Propiedad Intelectual</h2>
              <p>
                Todo el contenido de nuestro sitio web, incluyendo textos, imagenes, logotipos, graficos y software 
                es propiedad de Trips Europa o de nuestros licenciantes y esta protegido por leyes de propiedad 
                intelectual. Queda prohibida la reproduccion, distribucion o uso comercial del contenido sin 
                autorizacion expresa por escrito. El uso del sitio no otorga licencia sobre nuestra propiedad 
                intelectual.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-accent mb-4">13. Jurisdiccion y Ley Aplicable</h2>
              <p>
                Estos terminos se rigen por las leyes de Espana. Cualquier disputa sera sometida a los tribunales 
                competentes de Madrid, Espana, renunciando las partes a cualquier otro fuero que pudiera 
                corresponderles. Para usuarios de Colombia, Mexico, Brasil, Argentina, Peru, Panama, Costa Rica y 
                Republica Dominicana, aplicaran adicionalmente las normativas locales de proteccion al consumidor 
                que no puedan ser excluidas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-accent mb-4">14. Contacto</h2>
              <p>
                Para consultas sobre estos terminos o nuestros servicios, puede contactarnos a traves de: 
                Email: info@tripseuropa.com | Telefono: +34-611-105-448 | WhatsApp: +34-611-105-448 | 
                Horario de atencion: Lunes a Viernes de 9:00 a 18:00 (hora de Espana).
              </p>
            </section>
          </div>
        </div>
      </main>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
