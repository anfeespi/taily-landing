import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 sm:mb-8 no-underline font-medium text-sm focus:outline-none focus-visible:underline"
        >
          <span aria-hidden="true">&larr;</span> Volver al inicio
        </Link>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 sm:mb-8">
          Política de Privacidad
        </h1>

        <div className="max-w-none space-y-6 text-secondary leading-relaxed text-sm sm:text-base">
          <p className="text-xs sm:text-sm text-outline">
            Última actualización: abril 2026
          </p>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">1. Introducción</h2>
            <p>
              Bienvenido a Taily (&quot;nosotros&quot;, &quot;nuestro&quot; o &quot;la aplicación&quot;). Nos comprometemos
              a proteger la privacidad de nuestros usuarios, especialmente la de los niños.
              Esta política de privacidad describe cómo recopilamos, usamos y protegemos la
              información cuando utilizas nuestra aplicación móvil Taily.
            </p>
            <p className="mt-3">
              Esta política se rige por la legislación colombiana vigente en materia de
              protección de datos personales, incluyendo la <strong>Ley 1581 de 2012</strong> (Ley
              de Protección de Datos Personales), el <strong>Decreto 1377 de 2013</strong> (reglamentario
              de la Ley 1581), la <strong>Ley 1098 de 2006</strong> (Código de la Infancia y la
              Adolescencia) y la <strong>Ley 1266 de 2008</strong> (Habeas Data). Asimismo,
              cumplimos con la Ley de Protección de la Privacidad Infantil en Línea (COPPA)
              de Estados Unidos y regulaciones internacionales aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">2. Responsable del tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos personales recopilados a través
              de Taily es:
            </p>
            <ul className="list-none pl-0 space-y-1 mt-3">
              <li><strong>Nombre:</strong> Taily</li>
              <li><strong>Domicilio:</strong> Colombia</li>
              <li><strong>Correo electrónico:</strong>{' '}
                <a href="mailto:taily.dev.mail@gmail.com" className="text-primary hover:underline">
                  taily.dev.mail@gmail.com
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">3. Información que recopilamos</h2>
            <p>
              De conformidad con la Ley 1581 de 2012, informamos que Taily puede recopilar
              los siguientes tipos de datos personales:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3">
              <li>
                <strong>Información de la cuenta:</strong> dirección de correo electrónico
                y nombre de usuario proporcionados durante el registro.
              </li>
              <li>
                <strong>Datos de uso:</strong> información sobre cómo interactúas con la
                aplicación, incluyendo cuentos creados, preferencias de tema y estilos
                seleccionados.
              </li>
              <li>
                <strong>Información del dispositivo:</strong> tipo de dispositivo, sistema
                operativo y datos técnicos necesarios para el funcionamiento de la app.
              </li>
            </ul>
            <p className="mt-3">
              No recopilamos datos sensibles según lo definido en el artículo 5 de la
              Ley 1581 de 2012.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">4. Finalidad del tratamiento</h2>
            <p>
              En cumplimiento del artículo 12 de la Ley 1581 de 2012, los datos personales
              serán utilizados para las siguientes finalidades:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3">
              <li>Generar cuentos personalizados adaptados a las preferencias del usuario.</li>
              <li>Mejorar y optimizar la experiencia de la aplicación.</li>
              <li>Proporcionar soporte técnico y responder consultas.</li>
              <li>Garantizar la seguridad y el correcto funcionamiento del servicio.</li>
              <li>Enviar comunicaciones relacionadas con el servicio (actualizaciones, novedades).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">5. Autorización y consentimiento</h2>
            <p>
              De acuerdo con el artículo 9 de la Ley 1581 de 2012, la recopilación y el
              tratamiento de datos personales requiere la autorización previa, expresa e
              informada del titular. Al registrarte y utilizar Taily, otorgas tu
              consentimiento para el tratamiento de tus datos conforme a esta política.
            </p>
            <p className="mt-3">
              En el caso de menores de edad, de conformidad con el artículo 7 de la Ley
              1581 de 2012 y la Ley 1098 de 2006, se requiere la autorización del
              representante legal (padre, madre o tutor). El tratamiento de datos de
              menores responderá al interés superior de los niños, niñas y adolescentes,
              y garantizará el respeto de sus derechos fundamentales.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">6. Privacidad de los niños</h2>
            <p>
              Taily está diseñada para ser utilizada por familias con niños. Nos tomamos muy
              en serio la privacidad infantil y cumplimos con la Ley 1098 de 2006 (Código
              de la Infancia y la Adolescencia), la Ley 1581 de 2012 y la COPPA:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3">
              <li>No recopilamos intencionalmente datos personales de niños sin la autorización previa de los padres o representantes legales.</li>
              <li>Los padres o tutores pueden revisar, modificar o solicitar la supresión de la información de sus hijos contactándonos directamente.</li>
              <li>No mostramos publicidad dirigida a niños.</li>
              <li>Todo el contenido generado es filtrado para garantizar su adecuación para el público infantil.</li>
              <li>El tratamiento de datos de menores se realiza atendiendo al interés superior del niño, conforme al artículo 8 de la Ley 1098 de 2006.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">7. Almacenamiento y seguridad</h2>
            <p>
              Implementamos medidas de seguridad técnicas, humanas y administrativas conforme
              al artículo 17 de la Ley 1581 de 2012, para proteger los datos personales contra
              acceso no autorizado, pérdida, alteración o uso indebido. Los datos se almacenan
              en servidores seguros y se utilizan protocolos de cifrado para la transmisión
              de datos sensibles.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">8. Servicios de terceros</h2>
            <p>
              Taily utiliza servicios de terceros para funcionalidades específicas, incluyendo:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3">
              <li>Servicios de inteligencia artificial para la generación de contenido.</li>
              <li>Servicios de almacenamiento en la nube para guardar datos de la aplicación.</li>
              <li>Servicios de autenticación para la gestión de cuentas de usuario.</li>
            </ul>
            <p className="mt-3">
              Estos terceros actúan como encargados del tratamiento y están obligados
              contractualmente a cumplir con las disposiciones de la Ley 1581 de 2012.
              Cada servicio cuenta con sus propias políticas de privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">9. Transferencia internacional de datos</h2>
            <p>
              Los datos personales podrán ser transferidos a servidores ubicados fuera de
              Colombia para el funcionamiento de la aplicación. En estos casos, se garantizará
              que los países destinatarios cuenten con niveles adecuados de protección de datos,
              conforme a lo establecido en el artículo 26 de la Ley 1581 de 2012 y las
              directrices de la Superintendencia de Industria y Comercio (SIC).
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">10. Derechos del titular (Derechos ARCO)</h2>
            <p>
              De conformidad con el artículo 8 de la Ley 1581 de 2012 y el artículo 14
              del Decreto 1377 de 2013, como titular de datos personales tienes derecho a:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3">
              <li><strong>Acceso:</strong> conocer, actualizar y rectificar tus datos personales.</li>
              <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos, incompletos o desactualizados.</li>
              <li><strong>Cancelación (Supresión):</strong> solicitar la eliminación de tus datos cuando no sean necesarios para la finalidad para la cual fueron recopilados.</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos por motivos legítimos.</li>
              <li><strong>Revocatoria:</strong> revocar la autorización otorgada para el tratamiento de datos personales.</li>
              <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley de protección de datos.</li>
            </ul>
            <p className="mt-3">
              Para ejercer estos derechos, puedes contactarnos a través del correo
              electrónico indicado en la sección de contacto. Las solicitudes serán
              atendidas en un plazo máximo de diez (10) días hábiles, conforme a lo
              establecido en la ley.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">11. Vigencia y cambios en esta política</h2>
            <p>
              Esta política de privacidad entra en vigencia a partir de la fecha de su
              publicación y permanecerá vigente mientras Taily continúe operando. Podemos
              actualizar esta política periódicamente. Te notificaremos sobre cualquier
              cambio significativo a través de la aplicación o por correo electrónico.
              Te recomendamos revisar esta política regularmente.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">12. Autoridad de protección de datos</h2>
            <p>
              La autoridad encargada de vigilar el cumplimiento de la normativa de protección
              de datos en Colombia es la <strong>Superintendencia de Industria y Comercio (SIC)</strong>.
              Si consideras que tus derechos han sido vulnerados, puedes presentar una queja ante:
            </p>
            <ul className="list-none pl-0 space-y-1 mt-3">
              <li><strong>Superintendencia de Industria y Comercio</strong></li>
              <li>Carrera 13 No. 27-00, Bogotá D.C., Colombia</li>
              <li>Línea gratuita nacional: 01 8000 910 165</li>
              <li>
                Sitio web:{' '}
                <a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  www.sic.gov.co
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">13. Contacto</h2>
            <p>
              Si tienes preguntas, inquietudes o deseas ejercer tus derechos respecto al
              tratamiento de tus datos personales, puedes contactarnos en:
            </p>
            <p className="mt-3">
              <strong>Email:</strong>{' '}
              <a
                href="mailto:taily.dev.mail@gmail.com"
                className="text-primary hover:underline focus:outline-none focus-visible:underline"
              >
                taily.dev.mail@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
