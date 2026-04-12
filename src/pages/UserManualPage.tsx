import { useState, useLayoutEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PhoneMockup from '../components/ui/PhoneMockup'
import ManualCallout from '../components/ui/ManualCallout'

interface Chapter {
  number: string
  title: string
  subtitle: string
  mascot: string
  slug: string
  content: React.ReactNode
}

const basePath = import.meta.env.BASE_URL
const img = (path: string) => `${basePath}assets/images/${path}`

export default function UserManualPage() {
  const [chapterIndex, setChapterIndex] = useState(0)
  const [isTocOpen, setIsTocOpen] = useState(false)
  const [isPdfHelpOpen, setIsPdfHelpOpen] = useState(false)

  // useLayoutEffect runs synchronously before paint to avoid the
  // scroll-down flash when navigating to /manual from a scrolled page.
  useLayoutEffect(() => {
    // Temporarily disable smooth scroll (set globally in CSS) so the
    // jump to top is instant rather than animated.
    const html = document.documentElement
    const prevBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    // Restore on next frame so chapter navigation can still smooth-scroll
    requestAnimationFrame(() => {
      html.style.scrollBehavior = prevBehavior
    })
  }, [chapterIndex])

  // Close the drawer on chapter change (mobile/tablet)
  const goToChapter = (idx: number) => {
    setChapterIndex(idx)
    setIsTocOpen(false)
  }

  const chapters: Chapter[] = useMemo(
    () => [
      {
        number: 'I',
        title: 'Bienvenido a Taily',
        subtitle: 'La app que crea cuentos mágicos para tu pequeño',
        mascot: 'happy_hi_tailer.png',
        slug: 'bienvenida',
        content: (
          <>
            <p className="manual-dropcap">
              Taily es una aplicación móvil pensada para que padres, madres,
              docentes y cuidadores compartan momentos mágicos de lectura con
              niños de <strong>2 a 6 años</strong>. Nuestra mision es simple:
              despertar el amor por la lectura desde los primeros años de vida.
            </p>

            <p>
              Con Taily, cada cuento es único. Una inteligencia artificial crea
              automaticamente la historia, las ilustraciónes y la narración en
              audio a partir de los temas y personajes que tú elijas. No hay
              dos cuentos iguales, porque cada uno se escribe pensando en el
              niño que lo va a leer.
            </p>

            <h3 className="manual-h3">Qué vas a encontrar</h3>
            <ul className="manual-list">
              <li>
                <strong>Cuentos personalizados:</strong> elige el tema, los
                personajes y el estilo de las ilustraciónes.
              </li>
              <li>
                <strong>Narracion en audio:</strong> cada escena tiene voz
                profesional para acompañar la lectura.
              </li>
              <li>
                <strong>Adaptado por edad:</strong> tres etapas de desarrollo
                diferentes, basadas en los referentes del Ministerio de
                Educacion Nacional.
              </li>
              <li>
                <strong>T.A.I.L.E.R, tu asistente:</strong> un león amigable
                que te guía paso a paso.
              </li>
              <li>
                <strong>Comunidad:</strong> descubre cuentos creados por otros
                usuarios alrededor del mundo.
              </li>
            </ul>

            <ManualCallout variant="info" label="Disponible en">
              <p>
                Android (Play Store) y iOS (App Store / TestFlight). El idioma
                actual es <strong>español</strong>.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'II',
        title: 'Crear tu cuenta',
        subtitle: 'El primer paso para comenzar tu aventura',
        mascot: 'hi_tailer.png',
        slug: 'cuenta',
        content: (
          <>
            <p className="manual-dropcap">
              Para empezar a usar Taily necesitas una cuenta. El proceso es
              rápido y solo te tomará un minuto. Tienes dos opciónes para
              registrarte: con correo electrónico o con tu cuenta de Google.
            </p>

            <div className="manual-screen-row">
              <PhoneMockup src="assets/images/screen-login.png" alt="Pantalla de inicio de sesion" />
              <div className="manual-screen-text">
                <h3 className="manual-h3">Pantalla de bienvenida</h3>
                <p>
                  Al abrir Taily por primera vez verás el logo y a T.A.I.L.E.R
                  esperándote. La pantalla de inicio de sesion te muestra:
                </p>
                <ul className="manual-list">
                  <li>Campo para tu <strong>nombre de usuario</strong></li>
                  <li>Campo para tu <strong>contraseña</strong></li>
                  <li>Boton <strong>Iniciar Sesión</strong></li>
                  <li>Boton <strong>Iniciar Sesión con Google</strong></li>
                  <li>Enlace <em>"Regístrate aquí"</em> para crear una cuenta nueva</li>
                </ul>
              </div>
            </div>

            <h3 className="manual-h3">Registro con correo electrónico</h3>
            <p>
              Si no tienes cuenta, toca <em>"Regístrate aquí"</em>. Te pediremos
              tu correo, un nombre de usuario, una contraseña y tu fecha de
              nacimiento. Tu contraseña se cifra de forma segura antes de
              guardarse, así que tus datos siempre están protegidos.
            </p>

            <h3 className="manual-h3">Registro con Google</h3>
            <p>
              Si prefieres no crear una contraseña nueva, simplemente toca
              <strong> Iniciar Sesión con Google</strong>, elige tu cuenta y
              listo. En segundos estarás dentro de Taily.
            </p>

            <ManualCallout variant="tip">
              <p>
                Hay una sola cuenta por persona. El adulto controla la app y
                puede activar el <em>modo solo lectura</em> cuando se la
                entregue al niño para que no salga del cuento que está leyendo.
              </p>
            </ManualCallout>

            <h3 className="manual-h3">Tus temas favoritos</h3>
            <p>
              Después del registro, T.A.I.L.E.R te dará la bienvenida con un
              mensaje y te pedirá elegir tus temas de interés. Estos temas se
              usan para recomendarte cuentos hechos por otros usuarios. Puedes
              omitir este paso y configurarlo después.
            </p>
          </>
        ),
      },
      {
        number: 'III',
        title: 'Conoce la app',
        subtitle: 'Tu guía rápida para navegar Taily',
        mascot: 'thoughtful_tailer.png',
        slug: 'navegación',
        content: (
          <>
            <p className="manual-dropcap">
              Taily está diseñada para ser intuitiva. Toda la navegación
              principal se hace desde una barra inferior con cuatro secciónes,
              y desde la barra superior puedes acceder rápidamente a tu perfil
              y a la configuración.
            </p>

            <h3 className="manual-h3">Barra de navegación inferior</h3>
            <div className="manual-nav-grid">
              <div className="manual-nav-item">
                <div className="manual-nav-label">Home</div>
                <p>Pantalla principal con tu saludo personalizado y los cuentos recomendados especialmente para ti.</p>
              </div>
              <div className="manual-nav-item">
                <div className="manual-nav-label">Explorar</div>
                <p>Descubre cuentos publicados por otros usuarios. Encuentra inspiración infinita.</p>
              </div>
              <div className="manual-nav-item">
                <div className="manual-nav-label">Biblioteca</div>
                <p>Todos los cuentos que has creado, organizados y listos para leer cuántas veces quieras.</p>
              </div>
              <div className="manual-nav-item">
                <div className="manual-nav-label">Menu</div>
                <p>Acceso a configuración, T.A.I.L.E.R, soporte y otras opciónes de la app.</p>
              </div>
            </div>

            <h3 className="manual-h3">Barra superior</h3>
            <p>
              En la parte superior de la app encontrarás dos íconos siempre
              disponibles:
            </p>
            <ul className="manual-list">
              <li>
                <strong>Rueda de configuración:</strong> acceso directo a los
                ajustes de tema, fuente y voz de narración.
              </li>
              <li>
                <strong>Perfil:</strong> tu cuenta, tus temas de interés y
                opciónes de sesion.
              </li>
            </ul>
          </>
        ),
      },
      {
        number: 'IV',
        title: 'Tu pantalla principal',
        subtitle: 'Lo primero que verás cada vez que abras Taily',
        mascot: 'happy_tailer.png',
        slug: 'home',
        content: (
          <>
            <p className="manual-dropcap">
              La pantalla Home es tu punto de partida. Cada vez que abras
              Taily encontrarás un saludo personalizado y una selección de
              cuentos pensados especialmente para ti, basados en los temas que
              más te interesan.
            </p>

            <div className="manual-screen-row">
              <PhoneMockup src="assets/images/screen-home.jpeg" alt="Pantalla Home con cuentos recomendados" />
              <div className="manual-screen-text">
                <h3 className="manual-h3">Qué verás en Home</h3>
                <ul className="manual-list">
                  <li>
                    <strong>Saludo personalizado:</strong> "¡Buenas tardes,
                    [tu nombre]! ¿Listo para una nueva aventura?"
                  </li>
                  <li>
                    <strong>Cuentos Recomendados:</strong> un carrusel
                    horizontal con cuentos seleccionados segun tus interéses.
                  </li>
                  <li>
                    <strong>Tarjetas de cuento:</strong> cada una muestra
                    portada, título, autor y temas asociados.
                  </li>
                </ul>
                <p>
                  Toca cualquier tarjeta para abrir el cuento al instante en
                  el visualizador.
                </p>
              </div>
            </div>

            <ManualCallout variant="info" label="Cómo funcionan las recomendaciones">
              <p>
                Taily analiza los temas que te gustan y los compara con los
                temas de los cuentos disponibles. Mientras más uses la app,
                más afinadas serán tus recomendaciones.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'V',
        title: 'Crea tu primer cuento',
        subtitle: 'Da vida a una historia única en pocos pasos',
        mascot: 'ok_tailer.png',
        slug: 'crear',
        content: (
          <>
            <p className="manual-dropcap">
              Crear un cuento en Taily es como escribir un deseo. Tu eliges el
              tema, los personajes y el estilo, y la inteligencia artificial
              hace el resto: texto, ilustraciónes y narración en audio. En
              menos de un minuto tendras una historia única para compartir.
            </p>

            <div className="manual-screen-row reverse">
              <PhoneMockup src="assets/images/screen-create-form.jpeg" alt="Formulario de creación de cuento" />
              <div className="manual-screen-text">
                <h3 className="manual-h3">El formulario</h3>
                <p>
                  La pantalla <em>"¿Cómo quieres que sea tu nueva historia?"</em>{' '}
                  contiene los campos que necesitas llenar. Algunos son
                  obligatorios y otros opciónales.
                </p>
              </div>
            </div>

            <h3 className="manual-h3">Campos obligatorios</h3>
            <ul className="manual-list">
              <li>
                <strong>Tema Principal:</strong> el tema central del cuento.
                Por ejemplo: Amistad, Aventuras, Magia, Animales, Familia,
                Naturaleza, Escuela, Sueños, Diversion, Valores, Solidaridad y muchos mas.
              </li>
              <li>
                <strong>Etapa de desarrollo:</strong> elige la edad del niño
                (2-3, 3-5 o 4-6 años) para que Taily adapte el vocabulario.
              </li>
              <li>
                <strong>Extension:</strong>
                <ul className="manual-list-nested">
                  <li><em>Corto</em> (1-3 escenas): para 2-3 años</li>
                  <li><em>Medio</em> (4-6 escenas): para 3-5 años</li>
                  <li><em>Largo</em> (7+ escenas): para 4-6 años</li>
                </ul>
              </li>
              <li>
                <strong>Estilo de Imagenes:</strong> el estilo visual de las
                ilustraciónes (animado, acuarela, 3D, anime y mas).
              </li>
            </ul>

            <h3 className="manual-h3">Campos opciónales</h3>
            <ul className="manual-list">
              <li>
                <strong>Descripcion del Contexto:</strong> un texto libre para
                indicar donde sucede la historia. Ejemplo: <em>"En un bosque mágico"</em>.
              </li>
              <li>
                <strong>Descripcion de Personajes:</strong> nombres y rasgos
                de los personajes. Ejemplo: <em>"Leo, un niño curioso de 4 años"</em>.
              </li>
              <li>
                <strong>Temas Adicionales:</strong> chips para enriquecer la
                historia con temas secundarios como Naturaleza, Bosque,
                Oceano, Montaña, Desierto, Selva, Espacio exterior y muchos mas.
              </li>
            </ul>

            <h3 className="manual-h3">Crear el cuento</h3>
            <p>
              Cuando termines de llenar el formulario, toca el boton
              <strong> Crear Cuento</strong>. Veras una pantalla con T.A.I.L.E.R
              animado y consejos de lectura mientras se genera tu historia.
              Esto puede tardar unos segundos: la IA está escribiendo el texto,
              dibujando las ilustraciónes y grabando el audio para ti.
            </p>

            <ManualCallout variant="success" label="Lo que recibes">
              <p>
                Un cuento completo con texto narrativo, una ilustración por
                escena, y narración en audio. Puedes elegir voz masculina o
                femenina en la configuración.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'VI',
        title: 'Lee y disfruta',
        subtitle: 'El visualizador de cuentos',
        mascot: 'very_happy_tailer.png',
        slug: 'leer',
        content: (
          <>
            <p className="manual-dropcap">
              Cuando abres un cuento, Taily entra en modo lectura. La imagen
              de la escena ocupa toda la pantalla, el texto aparece debajo y
              puedes navegar entre escenas con flechas o deslizando el dedo.
              Es una experiencia inmersiva pensada para acompañar al niño.
            </p>

            <div className="manual-phone-landscape-wrapper">
              <PhoneMockup
                src="assets/images/screen-story-viewer.jpeg"
                alt="Visualizador de cuento en modo horizontal"
                landscape
              />
              <p className="manual-phone-caption">Visualizador de cuento en modo horizontal</p>
            </div>

            <h3 className="manual-h3">Diseño de la pantalla</h3>
            <ul className="manual-list">
              <li><strong>Imagen a pantalla completa:</strong> ilustración de la escena actual</li>
              <li><strong>Texto narrativo:</strong> superpuesto en la parte inferior, legible sobre la imagen</li>
              <li><strong>Barra de progreso:</strong> en la parte superior, te indica en qué escena vas</li>
              <li><strong>Flechas de navegación:</strong> a izquierda y derecha para pasar entre escenas</li>
            </ul>

            <h3 className="manual-h3">Barra de herramientas</h3>
            <p>En la parte superior del visualizador encontrarás varios íconos:</p>
            <div className="manual-icon-grid">
              <div className="manual-icon-item">
                <div className="manual-icon-name">Volver</div>
                <p>Regresa a la pantalla anterior. Se desactiva en modo solo lectura.</p>
              </div>
              <div className="manual-icon-item">
                <div className="manual-icon-name">Modo solo lectura</div>
                <p>Bloquea la navegación para que el niño solo pueda ver el cuento actual.</p>
              </div>
              <div className="manual-icon-item">
                <div className="manual-icon-name">Pantalla completa</div>
                <p>Expande la visualización ocultando los controles del sistema.</p>
              </div>
              <div className="manual-icon-item">
                <div className="manual-icon-name">Audio</div>
                <p>Activa o pausa la narración en voz del cuento.</p>
              </div>
            </div>

            <h3 className="manual-h3">Modo solo lectura</h3>
            <p>
              Cuando le entregas el dispositivo a tu niño, activa el{' '}
              <strong>modo solo lectura</strong> tocando el ícono del candado.
              Esto bloquea la salida del visualizador para que el pequeño solo
              pueda ver el cuento actual sin acceder a otras secciónes de la
              app. Para desactivarlo, toca nuevamente el candado.
            </p>

            <ManualCallout variant="info" label="El diccionario mágico">
              <p>
                Algunas palabras del cuento estan marcadas y se pueden tocar
                para ver su definición en un pequeño popup. Una manera divertida
                de aprender vocabulario nuevo mientras se lee.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'VII',
        title: 'Tu biblioteca personal',
        subtitle: 'Todos tus cuentos en un solo lugar',
        mascot: 'approve_tailer.png',
        slug: 'biblioteca',
        content: (
          <>
            <p className="manual-dropcap">
              La <strong>Biblioteca</strong> es donde viven todos los cuentos
              que has creado. Aquí puedes buscarlos por título, filtrarlos por
              tema, marcarlos como favoritos y compartirlos en PDF. Tu
              colección personal va creciendo cada vez que creas un nuevo
              cuento.
            </p>

            <div className="manual-screen-row">
              <PhoneMockup src="assets/images/screen-library-search.jpeg" alt="Biblioteca con buscador y filtros" />
              <div className="manual-screen-text">
                <h3 className="manual-h3">Vista de cuadricula</h3>
                <p>
                  Tus cuentos se muestran en tarjetas con la portada y el
                  título. Cada tarjeta tiene dos íconos:
                </p>
                <ul className="manual-list">
                  <li>
                    <strong>Estrella:</strong> marca o desmarca el cuento como
                    favorito. Los favoritos aparecen con estrella dorada.
                  </li>
                  <li>
                    <strong>Tres puntos (menu):</strong> abre las opciónes del
                    cuento.
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="manual-h3">Buscar y filtrar</h3>
            <ul className="manual-list">
              <li>
                <strong>Campo de búsqueda:</strong> escribe el título del
                cuento que buscas.
              </li>
              <li>
                <strong>Chips de tema:</strong> selecciona uno o varios temas
                para filtrar tu biblioteca. Los cuentos que coincidan con al
                menos uno se mostraran.
              </li>
            </ul>

            <h3 className="manual-h3">Opciones del cuento</h3>
            <p>
              Al tocar el menu de tres puntos en una tarjeta, verás estas
              opciónes:
            </p>
            <ul className="manual-list">
              <li>
                <strong>Reportar cuento:</strong> si encuentras contenido que
                no cumple los lineamientos de la plataforma, puedes reportarlo
                seleccionando una categoría y agregando un comentario opciónal.
              </li>
              <li>
                <strong>Compartir cuento:</strong> exporta el cuento como un
                archivo PDF con portada, ilustraciónes y texto narrativo.
                Incluye marca de agua <em>"Creado en Taily"</em>. Puedes
                compartirlo por WhatsApp, correo o cualquier otra app.
              </li>
            </ul>
          </>
        ),
      },
      {
        number: 'VIII',
        title: 'Descubre cuentos',
        subtitle: 'Explora la comunidad de Taily',
        mascot: 'full_body_tailer.png',
        slug: 'explorar',
        content: (
          <>
            <p className="manual-dropcap">
              La sección <strong>Explorar</strong> es tu ventana a la comunidad
              de Taily. Aquí puedes descubrir cuentos creados por otros
              usuarios alrededor del mundo. Cada vez que entras encontrarás
              nuevas historias inspiradoras.
            </p>

            <div className="manual-screen-row reverse">
              <PhoneMockup src="assets/images/screen-explore.png" alt="Pantalla de explorar cuentos" />
              <div className="manual-screen-text">
                <h3 className="manual-h3">Qué vas a encontrar</h3>
                <p>
                  Cada cuento se presenta con su portada, título, nombre del
                  autor y los temas asociados. Toca cualquier cuento para
                  abrirlo en el visualizador y leerlo de inmediato.
                </p>
                <p>
                  Las recomendaciones se basan en los temas de tu interés,
                  así que mientras más configures tus preferencias, más
                  relevantes serán los cuentos que veas.
                </p>
              </div>
            </div>

            <ManualCallout variant="tip" label="Inspiración infinita">
              <p>
                Si no sabes qué tipo de cuento crear, navega por Explorar para
                encontrar ideas. Cada historia es única y puede inspirarte a
                crear la tuya propia.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'IX',
        title: 'T.A.I.L.E.R, tu asistente',
        subtitle: 'Un león inteligente que te acompaña',
        mascot: 'tailer.png',
        slug: 'tailer',
        content: (
          <>
            <p className="manual-dropcap">
              T.A.I.L.E.R es el corazón de Taily. Es un león 3D amigable que
              actua como tu asistente personal dentro de la app. Cuando tengas
              dudas, no sepas como crear un cuento, o necesites consejos sobre
              lectura, T.A.I.L.E.R está ahí para ayudarte.
            </p>

            <div className="manual-screen-row">
              <PhoneMockup src="assets/images/screen-tailer-welcome.jpeg" alt="Pantalla de bienvenida de T.A.I.L.E.R" />
              <PhoneMockup src="assets/images/screen-tailer-chat.jpeg" alt="Chat con T.A.I.L.E.R" />
            </div>

            <h3 className="manual-h3">Como hablar con T.A.I.L.E.R</h3>
            <p>
              Accede al asistente desde el menu principal. Veras una pantalla
              con la imagen de T.A.I.L.E.R y un campo de texto para escribir
              tus preguntas. Es como chatear con un amigo que sabe todo
              sobre Taily.
            </p>

            <h3 className="manual-h3">Qué puedes preguntarle</h3>
            <ul className="manual-list">
              <li>
                <strong>Sobre la creación de cuentos:</strong> qué parámetros
                usar, cómo describir personajes, qué extensión elegir según
                la edad del niño.
              </li>
              <li>
                <strong>Sobre la configuración:</strong> como cambiar la voz
                de narración, ajustar el tema o el tamano de fuente.
              </li>
              <li>
                <strong>Sobre la biblioteca:</strong> como organizar, buscar
                o compartir tus cuentos.
              </li>
              <li>
                <strong>Dudas generales:</strong> cualquier cosa relacionada
                con el uso de Taily.
              </li>
            </ul>

            <ManualCallout variant="important">
              <p>
                T.A.I.L.E.R solo responde sobre temas relacionados con Taily.
                No es un chatbot de propósito general, pero sabe absolutamente
                todo sobre la app.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'X',
        title: 'Personaliza Taily',
        subtitle: 'Ajusta la app a tu gusto',
        mascot: 'waiting_tailer.png',
        slug: 'configuración',
        content: (
          <>
            <p className="manual-dropcap">
              Cada niño y cada familia es diferente. Por eso Taily te permite
              ajustar varios aspectos de la experiencia: el tema visual, el
              tamaño de la fuente y la voz que narra los cuentos. Todos los
              cambios se guardan automaticamente en tu dispositivo.
            </p>

            <div className="manual-screen-row reverse">
              <PhoneMockup src="assets/images/screen-config.jpeg" alt="Pantalla de configuración" />
              <div className="manual-screen-text">
                <h3 className="manual-h3">Como acceder</h3>
                <p>
                  Abre el menu lateral o toca el ícono de la rueda de
                  configuración en la barra superior. Veras la sección{' '}
                  <strong>Configuracion - Personaliza tu experiencia</strong>.
                </p>
              </div>
            </div>

            <h3 className="manual-h3">Opciones disponibles</h3>
            <div className="manual-config-table">
              <div className="manual-config-row">
                <div className="manual-config-name">Tema de la aplicación</div>
                <div className="manual-config-values">Modo claro / Modo oscuro</div>
              </div>
              <div className="manual-config-row">
                <div className="manual-config-name">Tamano de fuente</div>
                <div className="manual-config-values">Pequeno / Normal / Grande / Muy grande</div>
              </div>
              <div className="manual-config-row">
                <div className="manual-config-name">Voz de narración</div>
                <div className="manual-config-values">Masculina / Femenina</div>
              </div>
            </div>

            <h3 className="manual-h3">Tus temas de interés</h3>
            <p>
              Desde el perfil de usuario puedes actualizar en cualquier
              momento los temas que más te interesan. Esto afecta directamente
              las recomendaciones que ves en Home y en Explorar. Mientras mas
              específico seas, más relevantes serán los cuentos sugeridos.
            </p>

            <ManualCallout variant="success" label="Tus ajustes se quedan">
              <p>
                Todas las configuraciónes se guardan localmente y persisten al
                cerrar la app. No tienes que volver a configurarlas cada vez
                que abras Taily.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'XI',
        title: 'Las edades del aprendizaje',
        subtitle: 'Como Taily acompaña el desarrollo del niño',
        mascot: 'tailer.png',
        slug: 'edades',
        content: (
          <>
            <p className="manual-dropcap">
              Taily no es solo un generador de cuentos. Es una herramienta
              pedagógica que adapta cada historia a la etapa de desarrollo del
              niño, basada en los referentes del{' '}
              <strong>Ministerio de Educacion Nacional de Colombia</strong>.
              Cuando eliges la extensión, automaticamente ajustamos el
              vocabulario y la complejidad.
            </p>

            <div className="manual-stages">
              <div className="manual-stage">
                <div className="manual-stage-header">
                  <span className="manual-stage-age">2-3 años</span>
                  <h3 className="manual-stage-title">Hablar y explorar</h3>
                </div>
                <p>
                  <strong>Extension sugerida:</strong> Corto (1-3 escenas)
                </p>
                <p>
                  Oraciones cortas y simples, vocabulario claro y repetitivo.
                  Las imágenes muestran elementos familiares y la narrativa
                  sigue una sola linea para no abrumar al niño. Es la etapa de
                  los primeros descubrimientos.
                </p>
              </div>

              <div className="manual-stage">
                <div className="manual-stage-header">
                  <span className="manual-stage-age">3-5 años</span>
                  <h3 className="manual-stage-title">Preguntar y representar el mundo</h3>
                </div>
                <p>
                  <strong>Extension sugerida:</strong> Medio (4-6 escenas)
                </p>
                <p>
                  Escenarios más detallados, relaciones causa-efecto simples,
                  personajes que exploran. El vocabulario se amplia y el niño
                  empieza a relacionar los eventos del cuento con su propia
                  experiencia.
                </p>
              </div>

              <div className="manual-stage">
                <div className="manual-stage-header">
                  <span className="manual-stage-age">4-6 años</span>
                  <h3 className="manual-stage-title">Compartir y crear con otros</h3>
                </div>
                <p>
                  <strong>Extension sugerida:</strong> Largo (7+ escenas)
                </p>
                <p>
                  Tramas con varios personajes, conflictos cotidiaños sencillos,
                  resolucion por dialogo y cooperacion. Los cuentos transmiten
                  valores de empatia, amistad y respeto. Mayor complejidad
                  narrativa para una mente que empieza a razonar.
                </p>
              </div>
            </div>

            <ManualCallout variant="info" label="Crecer con Taily">
              <p>
                A medida que tu niño crece, puedes ir aumentando la extensión
                y complejidad de los cuentos. Asi la app lo acompaña durante
                varios años de su desarrollo lector.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'XII',
        title: 'Soporte y contacto',
        subtitle: 'Estamos aquí para ayudarte',
        mascot: 'happy_tailer.png',
        slug: 'soporte',
        content: (
          <>
            <p className="manual-dropcap">
              Si en algun momento necesitas ayuda, tienes varias formas de
              obtenerla. T.A.I.L.E.R esta dentro de la app para responder
              preguntas frecuentes, pero también puedes escribirnos
              directamente al equipo de Taily.
            </p>

            <h3 className="manual-h3">Resumen de uso rápido</h3>
            <ol className="manual-list">
              <li>Descarga la app desde Play Store o App Store.</li>
              <li>Regístrate con correo o con tu cuenta de Google.</li>
              <li>Selecciona tus temas de interés (puedes omitirlo).</li>
              <li>Crea tu primer cuento desde el boton de creación.</li>
              <li>Lee el cuento en el visualizador, activa el audio y el modo solo lectura si vas a entregarle el dispositivo al niño.</li>
              <li>Organiza tu biblioteca: marca favoritos, busca y filtra.</li>
              <li>Descubre nuevos cuentos en la sección Explorar.</li>
              <li>Comparte tus historias exportandolas como PDF.</li>
              <li>Pide ayuda a T.A.I.L.E.R cuando lo necesites.</li>
              <li>Personaliza la experiencia desde Configuracion.</li>
            </ol>

            <h3 className="manual-h3">Contacto directo</h3>
            <p>
              Si T.A.I.L.E.R no puede resolver tu duda o quieres reportar un
              problema, escribenos a:
            </p>
            <p className="manual-contact">
              <a href="mailto:taily.dev.mail@gmail.com">taily.dev.mail@gmail.com</a>
            </p>

            <h3 className="manual-h3">Politica de privacidad</h3>
            <p>
              Taily se preocupa profundamente por la privacidad de los niños
              y cumple con la Ley 1581 de 2012 (Colombia), el Codigo de la
              Infancia y la Adolescencia, y normativas internacionales como
              COPPA. Puedes consultar nuestra politica completa en{' '}
              <Link to="/politica-de-privacidad" className="manual-link">
                Politica de Privacidad
              </Link>.
            </p>

            <ManualCallout variant="farewell" label="Gracias por elegir Taily">
              <p>
                Esperamos que esta app te ayude a compartir muchos momentos
                mágicos de lectura con tus pequeños. Cada cuento es una
                oportunidad de conexion, aprendizaje y diversión.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                — El equipo de Taily
              </p>
            </ManualCallout>
          </>
        ),
      },
    ],
    []
  )

  const totalChapters = chapters.length

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="manual-page">
      {/* Header (hidden on print) */}
      <div className="manual-header no-print">
        <div className="manual-header-inner">
          <Link to="/" className="manual-back">
            <span aria-hidden="true">&larr;</span> Volver al inicio
          </Link>
          <div className="manual-header-actions">
            <button
              type="button"
              onClick={() => setIsTocOpen(true)}
              className="manual-toc-toggle"
              aria-label="Abrir indice del manual"
              aria-expanded={isTocOpen}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <circle cx="4" cy="6" r="1" fill="currentColor" />
                <circle cx="4" cy="12" r="1" fill="currentColor" />
                <circle cx="4" cy="18" r="1" fill="currentColor" />
              </svg>
              <span>Indice</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPdfHelpOpen(true)}
              className="manual-print-btn"
              aria-label="Descargar manual en PDF"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Descargar PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cover (only first time / print) */}
      <div className="manual-cover only-print">
        <img src={img('manual-banner.png')} alt="" className="manual-cover-banner" />
        <h1 className="manual-cover-title">Manual de Usuario</h1>
        <p className="manual-cover-subtitle">Taily — Cuentos infantiles con IA</p>
        <p className="manual-cover-edition">Edicion 2026</p>
      </div>

      {/* Backdrop for mobile/tablet drawer */}
      <div
        className={`manual-toc-backdrop no-print ${isTocOpen ? 'is-open' : ''}`}
        onClick={() => setIsTocOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar TOC — drawer on mobile/tablet, fixed on desktop */}
      <aside
        className={`manual-toc no-print ${isTocOpen ? 'is-open' : ''}`}
        aria-label="Indice del manual"
      >
        <div className="manual-toc-inner">
          <div className="manual-toc-header">
            <img src={img('taily-logo.jpeg')} alt="Taily" className="manual-toc-logo" />
            <div>
              <div className="manual-toc-title">Manual</div>
              <div className="manual-toc-subtitle">de Usuario</div>
            </div>
            <button
              type="button"
              onClick={() => setIsTocOpen(false)}
              className="manual-toc-close"
              aria-label="Cerrar indice"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <ol className="manual-toc-list">
            {chapters.map((chapter, idx) => (
              <li key={chapter.slug}>
                <button
                  type="button"
                  onClick={() => goToChapter(idx)}
                  className={`manual-toc-link ${idx === chapterIndex ? 'active' : ''}`}
                >
                  <span className="manual-toc-num">{chapter.number}</span>
                  <span className="manual-toc-text">{chapter.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      {/* Chapters (only current visible on screen, all visible on print) */}
      <main className="manual-content">
        {chapters.map((chapter, idx) => (
          <article
            key={chapter.slug}
            className={`manual-chapter ${idx === chapterIndex ? 'manual-chapter-current' : 'manual-chapter-hidden'}`}
            id={`capítulo-${chapter.slug}`}
          >
            {/* Chapter header */}
            <header className="manual-chapter-header">
              <div className="manual-chapter-number">Capítulo {chapter.number}</div>
              <h1 className="manual-chapter-title">{chapter.title}</h1>
              <p className="manual-chapter-subtitle">{chapter.subtitle}</p>
              <div className="manual-chapter-divider">
                <span></span>
                <img src={img(chapter.mascot)} alt="" className="manual-chapter-mascot" />
                <span></span>
              </div>
            </header>

            {/* Chapter body */}
            <div className="manual-chapter-body">{chapter.content}</div>

            {/* Chapter footer with prev/next (hidden on print) */}
            <footer className="manual-chapter-footer no-print">
              <button
                type="button"
                onClick={() => setChapterIndex(Math.max(0, idx - 1))}
                disabled={idx === 0}
                className="manual-nav-btn manual-nav-prev"
              >
                <span aria-hidden="true">&larr;</span>
                <span>
                  <small>Anterior</small>
                  <strong>{idx > 0 ? chapters[idx - 1].title : 'Inicio'}</strong>
                </span>
              </button>
              <div className="manual-page-num">
                {idx + 1} / {totalChapters}
              </div>
              <button
                type="button"
                onClick={() => setChapterIndex(Math.min(totalChapters - 1, idx + 1))}
                disabled={idx === totalChapters - 1}
                className="manual-nav-btn manual-nav-next"
              >
                <span>
                  <small>Siguiente</small>
                  <strong>{idx < totalChapters - 1 ? chapters[idx + 1].title : 'Fin'}</strong>
                </span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </footer>
          </article>
        ))}
      </main>

      {/* PDF download help modal */}
      {isPdfHelpOpen && (
        <div className="manual-modal-backdrop no-print" onClick={() => setIsPdfHelpOpen(false)}>
          <div
            className="manual-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pdf-help-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="manual-modal-close"
              onClick={() => setIsPdfHelpOpen(false)}
              aria-label="Cerrar"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="manual-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>

            <h2 id="pdf-help-title" className="manual-modal-title">Descargar el manual en PDF</h2>
            <p className="manual-modal-subtitle">
              Vamos a abrir el diálogo de impresión de tu navegador. Ahí podrás guardar el manual completo como PDF.
            </p>

            <ol className="manual-modal-steps">
              <li>
                <span className="manual-modal-step-num">1</span>
                <div>
                  <strong>Toca el botón "Imprimir" o "Descargar"</strong>
                  <p>Se abrirá la ventana de impresión de tu navegador.</p>
                </div>
              </li>
              <li>
                <span className="manual-modal-step-num">2</span>
                <div>
                  <strong>Elige "Guardar como PDF"</strong>
                  <p>En el campo "Destino" o "Impresora", selecciona la opción "Guardar como PDF" o "Microsoft Print to PDF".</p>
                </div>
              </li>
              <li>
                <span className="manual-modal-step-num">3</span>
                <div>
                  <strong>Verifica la configuración</strong>
                  <p>
                    <strong>Tamaño:</strong> A4 &middot;{' '}
                    <strong>Márgenes:</strong> Ninguno &middot;{' '}
                    <strong>Gráficos de fondo:</strong> Activado
                  </p>
                </div>
              </li>
              <li>
                <span className="manual-modal-step-num">4</span>
                <div>
                  <strong>Guarda el archivo</strong>
                  <p>Toca "Guardar" y elige dónde almacenarlo en tu dispositivo.</p>
                </div>
              </li>
            </ol>

            <div className="manual-modal-actions">
              <button
                type="button"
                className="manual-modal-btn-secondary"
                onClick={() => setIsPdfHelpOpen(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="manual-modal-btn-primary"
                onClick={() => {
                  setIsPdfHelpOpen(false)
                  setTimeout(handlePrint, 200)
                }}
              >
                Abrir diálogo de impresión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
