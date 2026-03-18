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
          Politica de Privacidad
        </h1>

        <div className="max-w-none space-y-6 text-secondary leading-relaxed text-sm sm:text-base">
          <p className="text-xs sm:text-sm text-outline">
            Ultima actualizacion: marzo 2026
          </p>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">1. Introduccion</h2>
            <p>
              Bienvenido a Taily ("nosotros", "nuestro" o "la aplicacion"). Nos comprometemos
              a proteger la privacidad de nuestros usuarios, especialmente la de los ninos.
              Esta politica de privacidad describe como recopilamos, usamos y protegemos la
              informacion cuando utilizas nuestra aplicacion movil Taily.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">2. Informacion que recopilamos</h2>
            <p>Taily puede recopilar los siguientes tipos de informacion:</p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3">
              <li>
                <strong>Informacion de la cuenta:</strong> Direccion de correo electronico
                y nombre de usuario proporcionados durante el registro.
              </li>
              <li>
                <strong>Datos de uso:</strong> Informacion sobre como interactuas con la
                aplicacion, incluyendo cuentos creados, preferencias de tema y estilos
                seleccionados.
              </li>
              <li>
                <strong>Informacion del dispositivo:</strong> Tipo de dispositivo, sistema
                operativo y datos tecnicos necesarios para el funcionamiento de la app.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">3. Uso de la informacion</h2>
            <p>Utilizamos la informacion recopilada para:</p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3">
              <li>Generar cuentos personalizados adaptados a las preferencias del usuario.</li>
              <li>Mejorar y optimizar la experiencia de la aplicacion.</li>
              <li>Proporcionar soporte tecnico y responder consultas.</li>
              <li>Garantizar la seguridad y el correcto funcionamiento del servicio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">4. Privacidad de los ninos</h2>
            <p>
              Taily esta disenada para ser utilizada por familias con ninos. Nos tomamos muy
              en serio la privacidad infantil y cumplimos con la Ley de Proteccion de la
              Privacidad Infantil en Linea (COPPA) y regulaciones similares:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3">
              <li>No recopilamos intencionalmente informacion personal de ninos menores de 13 anos sin el consentimiento de los padres.</li>
              <li>Los padres o tutores pueden revisar, modificar o eliminar la informacion de sus hijos contactandonos directamente.</li>
              <li>No mostramos publicidad dirigida a ninos.</li>
              <li>Todo el contenido generado es filtrado para garantizar su adecuacion para el publico infantil.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">5. Almacenamiento y seguridad</h2>
            <p>
              Implementamos medidas de seguridad tecnicas y organizativas para proteger la
              informacion de nuestros usuarios. Los datos se almacenan en servidores seguros
              y se utilizan protocolos de cifrado para la transmision de datos sensibles.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">6. Servicios de terceros</h2>
            <p>
              Taily utiliza servicios de terceros para funcionalidades especificas, incluyendo:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3">
              <li>Servicios de inteligencia artificial para la generacion de contenido.</li>
              <li>Servicios de almacenamiento en la nube para guardar datos de la aplicacion.</li>
              <li>Servicios de autenticacion para la gestion de cuentas de usuario.</li>
            </ul>
            <p className="mt-3">
              Estos servicios tienen sus propias politicas de privacidad y tratamiento de datos.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">7. Derechos del usuario</h2>
            <p>Como usuario de Taily, tienes derecho a:</p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3">
              <li>Acceder a la informacion personal que tenemos sobre ti.</li>
              <li>Solicitar la correccion de datos inexactos.</li>
              <li>Solicitar la eliminacion de tu cuenta y datos asociados.</li>
              <li>Retirar tu consentimiento para el procesamiento de datos en cualquier momento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">8. Cambios en esta politica</h2>
            <p>
              Podemos actualizar esta politica de privacidad periodicamente. Te notificaremos
              sobre cualquier cambio significativo a traves de la aplicacion o por correo
              electronico. Te recomendamos revisar esta politica regularmente.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mt-6 sm:mt-8 mb-3">9. Contacto</h2>
            <p>
              Si tienes preguntas o inquietudes sobre esta politica de privacidad o sobre
              como manejamos tus datos, puedes contactarnos en:
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
