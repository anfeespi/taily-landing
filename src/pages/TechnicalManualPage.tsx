import { useState, useLayoutEffect, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ManualCallout from '../components/ui/ManualCallout'
import CodeBlock from '../components/ui/CodeBlock'

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

export default function TechnicalManualPage() {
  const [chapterIndex, setChapterIndex] = useState(0)
  const [isTocOpen, setIsTocOpen] = useState(false)
  const [isPdfHelpOpen, setIsPdfHelpOpen] = useState(false)

  // Hide from search engines: inject noindex/nofollow meta on mount
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow, noarchive'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = 'Manual Técnico — Taily (interno)'
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [])

  useLayoutEffect(() => {
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    requestAnimationFrame(() => {
      html.style.scrollBehavior = prev
    })
  }, [chapterIndex])

  const goToChapter = (idx: number) => {
    setChapterIndex(idx)
    setIsTocOpen(false)
  }

  const chapters: Chapter[] = useMemo(
    () => [
      {
        number: 'I',
        title: 'Visión arquitectónica',
        subtitle: 'Cómo encajan las piezas del sistema Taily',
        mascot: 'happy_hi_tailer.png',
        slug: 'arquitectura',
        content: (
          <>
            <p className="manual-dropcap">
              Taily es un sistema distribuido compuesto por tres capas
              colaborando: el <strong>cliente móvil</strong> (Flutter),
              un <strong>backend de servicios</strong> y los <strong>proveedores
              de IA externos</strong> que producen texto, imágenes y audio. Cada
              capa tiene responsabilidades bien delimitadas y se comunica con
              las otras a través de contratos HTTP/JSON con autenticación JWT.
            </p>

            <h3 className="manual-h3">Diagrama de alto nivel</h3>
            <CodeBlock language="diagrama">{`┌──────────────┐         ┌────────────────┐
│  App Móvil   │ ──────▶ │   API Gateway  │
│   (Flutter)  │ ◀────── │  (Auth + REST) │
└──────────────┘         └────────┬───────┘
                                  │
        ┌─────────────────────────┼──────────────────────────┐
        ▼                         ▼                          ▼
┌──────────────┐        ┌──────────────────┐        ┌────────────────┐
│ Auth Service │        │ Story Generation │        │ Library / User │
│  (Firebase)  │        │     Service      │        │    Service     │
└──────────────┘        └────────┬─────────┘        └────────────────┘
                                 │
        ┌────────────────────────┼─────────────────────────┐
        ▼                        ▼                         ▼
┌───────────────┐       ┌───────────────┐         ┌────────────────┐
│  LLM (texto)  │       │  Image Gen    │         │  TTS (audio)   │
└───────────────┘       └───────────────┘         └────────────────┘

         Persistencia: DB documental + Cloud Storage`}</CodeBlock>

            <h3 className="manual-h3">Decisiones arquitectónicas clave</h3>
            <ul className="manual-list">
              <li>
                <strong>Generación secuencial por escena.</strong> Cada escena
                espera a que la anterior termine. Esto preserva la coherencia
                narrativa y permite mostrar progreso al usuario sin
                complicaciones de ordenamiento.
              </li>
              <li>
                <strong>Caché de assets en Cloud Storage.</strong> Imágenes y
                audio quedan persistidos para evitar regenerar y reducir
                costos de API.
              </li>
              <li>
                <strong>Auth dual.</strong> Firebase para Google OAuth y un
                JWT propio para sesiones de la app. El servidor nunca ve
                contraseñas en texto plano (ver capítulo IX).
              </li>
              <li>
                <strong>Separación cliente / servidor de IA.</strong> El
                cliente nunca llama a las APIs de IA directamente; siempre
                pasa por el gateway para aplicar filtros y rate limiting.
              </li>
            </ul>

            <ManualCallout variant="info" label="Por qué microservicios">
              <p>
                La generación de un cuento (texto + imagen + audio) puede
                tardar 20-60 s. Aislarla en un servicio independiente permite
                escalarla por separado de los servicios de auth y biblioteca,
                que son baratos y de baja latencia.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'II',
        title: 'Stack tecnológico',
        subtitle: 'Qué corre en cada capa',
        mascot: 'thoughtful_tailer.png',
        slug: 'stack',
        content: (
          <>
            <p className="manual-dropcap">
              El stack se eligió priorizando <strong>velocidad de iteración</strong>{' '}
              y <strong>capacidad multiplataforma</strong>. Flutter cubre iOS y
              Android con un solo codebase, React+Vite mantiene la landing
              ligera y rápida, y el backend se apoya en servicios gestionados
              para reducir la carga operativa.
            </p>

            <h3 className="manual-h3">Aplicación móvil</h3>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead>
                  <tr><th>Capa</th><th>Herramienta</th></tr>
                </thead>
                <tbody>
                  <tr><td>Lenguaje / SDK</td><td>Dart 3.x · Flutter 3.x</td></tr>
                  <tr><td>State management</td><td>Riverpod / Provider</td></tr>
                  <tr><td>Navegación</td><td>GoRouter</td></tr>
                  <tr><td>HTTP</td><td>dio (interceptors para auth)</td></tr>
                  <tr><td>Audio</td><td>just_audio</td></tr>
                  <tr><td>Almacenamiento local</td><td>shared_preferences, hive</td></tr>
                  <tr><td>PDF export</td><td>pdf, printing</td></tr>
                  <tr><td>Auth</td><td>firebase_auth, google_sign_in</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="manual-h3">Landing page (este sitio)</h3>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead>
                  <tr><th>Capa</th><th>Herramienta</th></tr>
                </thead>
                <tbody>
                  <tr><td>Build / Bundler</td><td>Vite 6 + TypeScript 5</td></tr>
                  <tr><td>UI Framework</td><td>React 19</td></tr>
                  <tr><td>Estilos</td><td>Tailwind CSS v4 (CSS-first <code>@theme</code>)</td></tr>
                  <tr><td>Router</td><td>React Router 7 (HashRouter)</td></tr>
                  <tr><td>Tipografía</td><td>Space Mono + Gabarito (Google Fonts)</td></tr>
                  <tr><td>Hosting</td><td>GitHub Pages + dominio <code>taily.com.co</code></td></tr>
                  <tr><td>CI/CD</td><td>GitHub Actions (deploy en push a <code>main</code>)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="manual-h3">Backend</h3>
            <p>
              El backend ofrece un API REST con autenticación JWT. La pila
              concreta puede variar (Node/Express, Python/FastAPI, etc.); lo
              relevante es que cualquier implementación cumpla los contratos
              definidos en el capítulo V.
            </p>

            <h3 className="manual-h3">Servicios de IA</h3>
            <dl className="manual-defs">
              <dt>Texto narrativo</dt>
              <dd>LLM con capacidad de seguir instrucciones en español y generar texto adaptado a vocabulario por edad.</dd>
              <dt>Ilustraciones</dt>
              <dd>Modelo de generación de imágenes con consistencia de personajes entre escenas (ej. ControlNet, IP-Adapter o equivalente).</dd>
              <dt>Narración (TTS)</dt>
              <dd>Síntesis de voz neural con opción masculina y femenina, en español neutro.</dd>
              <dt>Asistente T.A.I.L.E.R</dt>
              <dd>Mismo LLM con un system prompt restringido al dominio Taily.</dd>
            </dl>

            <ManualCallout variant="important">
              <p>
                Los proveedores específicos de IA pueden cambiar. La capa de
                generación abstrae al proveedor detrás de una interfaz para
                que el cambio sea localizado en un solo módulo.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'III',
        title: 'Aplicación móvil (Flutter)',
        subtitle: 'Estructura, pantallas y patrones',
        mascot: 'happy_tailer.png',
        slug: 'app-movil',
        content: (
          <>
            <p className="manual-dropcap">
              La app sigue una arquitectura <strong>en capas</strong> inspirada
              en Clean Architecture, separando presentación, dominio y datos.
              El objetivo es que la lógica de negocio sea testeable de forma
              aislada y que cambiar de proveedor de backend no requiera tocar
              UI.
            </p>

            <h3 className="manual-h3">Estructura de directorios</h3>
            <CodeBlock language="text">{`lib/
├── main.dart
├── app/                    # Configuración global
│   ├── routes/             # GoRouter
│   ├── theme/              # Material 3 theme
│   └── locale/
├── core/                   # Utilidades transversales
│   ├── constants/
│   ├── network/            # dio + interceptors
│   ├── storage/            # shared_preferences, hive
│   └── utils/
├── data/                   # Implementación de fuentes
│   ├── models/             # DTOs JSON
│   ├── repositories/       # Repos concretos
│   └── datasources/        # remote, local
├── domain/                 # Lógica de negocio pura
│   ├── entities/
│   └── usecases/
├── presentation/
│   ├── pages/              # Una carpeta por flujo
│   ├── widgets/
│   └── providers/          # Riverpod / Provider
└── shared/                 # Widgets reutilizables`}</CodeBlock>

            <h3 className="manual-h3">Pantallas principales</h3>
            <ul className="manual-list">
              <li><strong>Auth</strong> — login / registro / OAuth Google</li>
              <li><strong>Onboarding</strong> — selección de temas de interés</li>
              <li><strong>Home</strong> — saludo + cuentos recomendados</li>
              <li><strong>Explorar</strong> — feed de cuentos de la comunidad</li>
              <li><strong>Biblioteca</strong> — cuentos propios con búsqueda y filtros</li>
              <li><strong>Crear cuento</strong> — formulario con tema, etapa, extensión, estilo</li>
              <li><strong>Loading</strong> — pantalla intermedia con consejos rotativos mientras se genera</li>
              <li><strong>Visualizador</strong> — escena a pantalla completa con audio</li>
              <li><strong>T.A.I.L.E.R chat</strong> — asistente conversacional</li>
              <li><strong>Configuración</strong> — tema, fuente, voz</li>
            </ul>

            <h3 className="manual-h3">Modo solo lectura</h3>
            <p>
              Cuando se activa, el visualizador entra en un modo donde:
            </p>
            <ul className="manual-list">
              <li>El botón de retroceso del sistema queda interceptado.</li>
              <li>Los gestos hacia otras pantallas se anulan.</li>
              <li>Solo se permite navegación entre escenas del cuento actual.</li>
            </ul>
            <p>
              En Android se aprovecha <code>WillPopScope</code> y, en iOS, una
              superposición que captura los gestos de borde. La intención es
              que el adulto pueda entregarle el dispositivo al niño con
              confianza.
            </p>

            <ManualCallout variant="tip" label="Consistencia de personajes">
              <p>
                Para que el mismo personaje se vea igual entre escenas, el
                cliente envía un <code>characterSeed</code> al backend; el
                pipeline de imagen reusa ese seed para mantener apariencia.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'IV',
        title: 'Landing page (React)',
        subtitle: 'El sitio que estás leyendo en este momento',
        mascot: 'ok_tailer.png',
        slug: 'landing',
        content: (
          <>
            <p className="manual-dropcap">
              La landing page (este sitio) es una SPA de React servida
              estáticamente desde GitHub Pages, en el dominio{' '}
              <code>taily.com.co</code>. Su responsabilidad es exclusivamente
              de marketing, marco legal e información: no consume APIs de
              backend.
            </p>

            <h3 className="manual-h3">Estructura</h3>
            <CodeBlock language="text">{`src/
├── App.tsx                 # Router + ScrollToTop
├── main.tsx                # Bootstrap React
├── index.css               # Tailwind v4 @theme + estilos custom
├── components/
│   ├── layout/             # Navbar, Footer, Layout
│   ├── sections/           # Hero, Features, HowItWorks, etc.
│   └── ui/                 # PhoneMockup, ManualCallout, Icons,
│                           #   StoreButton, FAQItem, CodeBlock...
├── pages/
│   ├── LandingPage.tsx
│   ├── PrivacyPolicyPage.tsx
│   ├── UserManualPage.tsx
│   └── TechnicalManualPage.tsx (este archivo)
├── data/                   # FAQ, features, steps
└── hooks/                  # useScrollTo`}</CodeBlock>

            <h3 className="manual-h3">Patrones clave</h3>
            <ul className="manual-list">
              <li>
                <strong>HashRouter</strong> en vez de BrowserRouter, porque
                GitHub Pages no soporta rewrite a <code>index.html</code>{' '}
                para rutas profundas. El hash (<code>/#/manual</code>) sí
                funciona sin configuración del servidor.
              </li>
              <li>
                <strong>Lazy loading de páginas</strong> con{' '}
                <code>React.lazy + Suspense</code>. Cada manual y la política
                de privacidad están en chunks separados.
              </li>
              <li>
                <strong>Tailwind v4 CSS-first</strong>. Tokens de color y
                tipografía declarados en <code>@theme</code> dentro de{' '}
                <code>index.css</code>. Sin <code>tailwind.config.js</code>.
              </li>
              <li>
                <strong>Print CSS</strong>. Los manuales tienen una capa{' '}
                <code>@media print</code> diseñada para A4, con portada,
                márgenes en mm y page breaks por capítulo.
              </li>
            </ul>

            <h3 className="manual-h3">Build y deploy</h3>
            <CodeBlock language="bash">{`# Local
npm install
npm run dev          # http://localhost:5173/

# Production
npm run build        # genera dist/
npm run preview      # sirve dist/ localmente

# Deploy automático
git push origin main # GitHub Actions construye y publica`}</CodeBlock>

            <ManualCallout variant="info" label="Vite base path">
              <p>
                Cuando el sitio vivía bajo <code>anfeespi.github.io/taily-landing/</code>,
                Vite necesitaba <code>base: '/taily-landing/'</code>. Con el
                dominio propio se cambió a <code>base: '/'</code>. Si se
                migra a un subpath en el futuro, hay que actualizar
                {' '}<code>vite.config.ts</code>.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'V',
        title: 'Backend y APIs',
        subtitle: 'Contratos REST entre cliente y servidor',
        mascot: 'hi_tailer.png',
        slug: 'backend',
        content: (
          <>
            <p className="manual-dropcap">
              El backend expone un API REST versionado bajo <code>/v1</code>.
              Todas las peticiones autenticadas llevan un{' '}
              <code>Authorization: Bearer &lt;jwt&gt;</code>. Las respuestas
              son JSON. Los errores siguen un formato estándar con{' '}
              <code>code</code>, <code>message</code> y opcional{' '}
              <code>details</code>.
            </p>

            <h3 className="manual-h3">Endpoints principales</h3>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead>
                  <tr><th>Método</th><th>Ruta</th><th>Descripción</th></tr>
                </thead>
                <tbody>
                  <tr><td>POST</td><td><code>/v1/auth/register</code></td><td>Registrar usuario con correo y contraseña</td></tr>
                  <tr><td>POST</td><td><code>/v1/auth/login</code></td><td>Iniciar sesión con credenciales</td></tr>
                  <tr><td>POST</td><td><code>/v1/auth/google</code></td><td>Intercambiar token de Firebase por JWT</td></tr>
                  <tr><td>POST</td><td><code>/v1/auth/refresh</code></td><td>Renovar access token</td></tr>
                  <tr><td>GET</td><td><code>/v1/user/me</code></td><td>Perfil del usuario actual</td></tr>
                  <tr><td>PATCH</td><td><code>/v1/user/preferences</code></td><td>Actualizar temas y configuración</td></tr>
                  <tr><td>DELETE</td><td><code>/v1/user/me</code></td><td>Eliminar cuenta (Ley 1581)</td></tr>
                  <tr><td>GET</td><td><code>/v1/stories/recommended</code></td><td>Cuentos recomendados (Jaccard)</td></tr>
                  <tr><td>GET</td><td><code>/v1/stories/explore</code></td><td>Feed público con paginación</td></tr>
                  <tr><td>POST</td><td><code>/v1/stories</code></td><td>Crear nuevo cuento (inicia pipeline)</td></tr>
                  <tr><td>GET</td><td><code>/v1/stories/:id</code></td><td>Obtener cuento completo</td></tr>
                  <tr><td>POST</td><td><code>/v1/stories/:id/report</code></td><td>Reportar contenido inapropiado</td></tr>
                  <tr><td>GET</td><td><code>/v1/stories/:id/pdf</code></td><td>Generar PDF del cuento</td></tr>
                  <tr><td>GET</td><td><code>/v1/library</code></td><td>Biblioteca propia con filtros</td></tr>
                  <tr><td>POST</td><td><code>/v1/library/:id/favorite</code></td><td>Marcar / desmarcar favorito</td></tr>
                  <tr><td>POST</td><td><code>/v1/tailer/chat</code></td><td>Mensaje al asistente T.A.I.L.E.R</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="manual-h3">Ejemplo: crear un cuento</h3>
            <CodeBlock language="http">{`POST /v1/stories HTTP/1.1
Host: api.taily.com.co
Authorization: Bearer eyJhbGciOi...
Content-Type: application/json

{
  "mainTheme": "amistad",
  "developmentStage": "3-5",
  "length": "medium",
  "imageStyle": "watercolor",
  "additionalThemes": ["bosque", "magia"],
  "context": "En un bosque mágico al amanecer",
  "characters": "Leo, un niño curioso de 4 años"
}`}</CodeBlock>

            <h3 className="manual-h3">Respuesta</h3>
            <CodeBlock language="json">{`{
  "storyId": "stry_8a3f2c",
  "status": "generating",
  "estimatedSeconds": 35,
  "scenesPlanned": 5
}`}</CodeBlock>

            <h3 className="manual-h3">Errores estándar</h3>
            <CodeBlock language="json">{`{
  "error": {
    "code": "INVALID_THEME",
    "message": "El tema 'sociedad' es demasiado abstracto para un cuento infantil.",
    "details": { "field": "mainTheme" }
  }
}`}</CodeBlock>

            <ManualCallout variant="important" label="Rate limiting">
              <p>
                La creación de cuentos consume tokens caros. Hay un límite por
                usuario (creaciones por hora) y un circuit breaker que corta
                tráfico si los proveedores de IA empiezan a fallar.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'VI',
        title: 'Modelo de datos',
        subtitle: 'Entidades y relaciones',
        mascot: 'thoughtful_tailer.png',
        slug: 'datos',
        content: (
          <>
            <p className="manual-dropcap">
              El modelo de datos se organiza en torno a tres entidades raíz:{' '}
              <strong>User</strong>, <strong>Story</strong> y{' '}
              <strong>Scene</strong>. La base es documental, lo que permite
              embebir las escenas dentro del cuento o tenerlas como colección
              separada según convenga al patrón de acceso.
            </p>

            <h3 className="manual-h3">Entidades</h3>
            <CodeBlock language="typescript">{`type User = {
  id: string
  email: string
  username: string
  birthDate: string          // ISO 8601
  createdAt: string
  preferences: {
    favoriteTopics: string[] // para Jaccard
    theme: 'light' | 'dark'
    fontSize: 'small' | 'normal' | 'large' | 'xlarge'
    voice: 'male' | 'female'
  }
  stats: {
    storiesCreated: number
    storiesFavorited: number
  }
}

type Story = {
  id: string
  authorId: string           // -> User.id
  title: string
  themes: string[]            // tags para recomendación
  developmentStage: '2-3' | '3-5' | '4-6'
  length: 'short' | 'medium' | 'long'
  imageStyle: string
  isPublic: boolean
  reportCount: number
  scenes: Scene[]            // o referencia
  createdAt: string
}

type Scene = {
  id: string
  storyId: string
  order: number              // 1..N
  text: string
  imageUrl: string
  audioUrl: string
  vocabulary: VocabularyWord[]
  characterSeed?: string     // consistencia visual
}

type VocabularyWord = {
  word: string
  definition: string
  ageAppropriate: boolean
}

type Report = {
  id: string
  storyId: string
  reporterId: string
  category: 'content' | 'safety' | 'quality' | 'other'
  comment?: string           // máx 500 chars
  status: 'pending' | 'reviewed' | 'dismissed'
  createdAt: string
}

type ChatMessage = {
  id: string
  userId: string
  role: 'user' | 'assistant'
  text: string
  createdAt: string
}`}</CodeBlock>

            <h3 className="manual-h3">Relaciones</h3>
            <ul className="manual-list">
              <li><code>User</code> 1:N <code>Story</code> (autor)</li>
              <li><code>User</code> N:M <code>Story</code> (favoritos, en colección aparte)</li>
              <li><code>Story</code> 1:N <code>Scene</code></li>
              <li><code>Story</code> 1:N <code>Report</code></li>
              <li><code>User</code> 1:N <code>ChatMessage</code></li>
            </ul>

            <h3 className="manual-h3">Índices</h3>
            <ul className="manual-list">
              <li><code>stories</code>: por <code>authorId</code> + <code>createdAt</code> desc (biblioteca)</li>
              <li><code>stories</code>: por <code>isPublic</code> + <code>themes</code> array (explorar)</li>
              <li><code>stories</code>: por <code>reportCount</code> desc (moderación)</li>
              <li><code>users</code>: por <code>email</code> único</li>
            </ul>

            <ManualCallout variant="tip" label="Borrado de cuenta">
              <p>
                Cuando se ejecuta <code>DELETE /v1/user/me</code> se eliminan
                el usuario, sus cuentos, escenas, audios y mensajes en una
                transacción. Cumple con el derecho de supresión de la Ley
                1581/2012.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'VII',
        title: 'Pipeline de generación con IA',
        subtitle: 'Cómo nace un cuento desde el botón "Crear"',
        mascot: 'waiting_tailer.png',
        slug: 'generacion',
        content: (
          <>
            <p className="manual-dropcap">
              La creación de un cuento es el flujo más complejo del sistema y
              donde se concentra la mayor parte del costo. La idea es generar{' '}
              <strong>secuencialmente</strong> texto, imagen y audio para cada
              escena, transmitiendo progreso al cliente en cada paso.
            </p>

            <h3 className="manual-h3">Flujo en pasos</h3>
            <ol className="manual-list">
              <li>El usuario envía el formulario (POST <code>/v1/stories</code>).</li>
              <li>El backend valida los parámetros y crea un registro <code>Story</code> con estado <code>generating</code>.</li>
              <li>
                <strong>Plan de cuento.</strong> El LLM recibe los parámetros y
                devuelve una sinopsis y la lista de escenas con su descripción
                visual y vocabulario nuevo.
              </li>
              <li>
                <strong>Para cada escena (secuencial):</strong>
                <ul className="manual-list-nested">
                  <li>LLM genera el texto narrativo definitivo.</li>
                  <li>Image API genera la ilustración usando el <code>characterSeed</code> compartido.</li>
                  <li>TTS genera el audio del texto.</li>
                  <li>Los assets se suben a Cloud Storage y la escena se persiste.</li>
                </ul>
              </li>
              <li>El cuento se marca <code>completed</code> y el cliente lo abre en el visualizador.</li>
            </ol>

            <h3 className="manual-h3">Prompt del LLM (esqueleto)</h3>
            <CodeBlock language="text">{`SYSTEM:
Eres un escritor de cuentos infantiles para niños de {edad} años,
en español. Adapta vocabulario y complejidad a la etapa MEN
"{etapa}". Sigue valores de respeto, amistad, honestidad.
Evita violencia, contenido sexual o perturbador.

USER:
Crea un cuento con:
- Tema principal: {temaPrincipal}
- Temas adicionales: {temasAdicionales}
- Personajes: {personajes}
- Contexto: {contexto}
- Estilo de imágenes: {estiloImagenes}
- Longitud: {numEscenas} escenas

Devuelve JSON con:
{
  "title": string,
  "scenes": [
    {
      "order": number,
      "text": string,             // 60-100 palabras
      "visualDescription": string, // para image gen
      "vocabulary": [{ "word": string, "definition": string }]
    }
  ]
}`}</CodeBlock>

            <h3 className="manual-h3">Filtros de seguridad</h3>
            <ul className="manual-list">
              <li>
                <strong>Pre-filter del input:</strong> lista de palabras
                bloqueadas y validación de tema (rechazar temas demasiado
                abstractos como "sociedad").
              </li>
              <li>
                <strong>Post-filter del output:</strong> el texto generado
                pasa por un clasificador de toxicidad antes de persistirse.
              </li>
              <li>
                <strong>Moderación humana:</strong> los reportes de usuarios
                escalan a un dashboard de moderación con cola priorizada.
              </li>
            </ul>

            <ManualCallout variant="info" label="Por qué secuencial y no paralelo">
              <p>
                Generar imágenes en paralelo aceleraría el proceso, pero se
                pierde la posibilidad de mostrar progreso por escena al
                usuario. Además, cada imagen depende del{' '}
                <code>characterSeed</code> del personaje generado por el LLM
                en el plan inicial; mantener el orden facilita el control de
                consistencia.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'VIII',
        title: 'Sistema de recomendaciones',
        subtitle: 'Encontrando cuentos que te gusten',
        mascot: 'approve_tailer.png',
        slug: 'recomendaciones',
        content: (
          <>
            <p className="manual-dropcap">
              La recomendación se basa en el <strong>índice de Jaccard</strong>{' '}
              entre los temas de interés del usuario y los temas asociados a
              cada cuento publicado. Es una solución simple, rápida y que
              funciona desde el primer login (no necesita historial).
            </p>

            <h3 className="manual-h3">Fórmula</h3>
            <CodeBlock language="math">{`         |T_user ∩ T_story|
score = ────────────────────────
         |T_user ∪ T_story|`}</CodeBlock>

            <p>
              Donde <code>T_user</code> son los temas marcados por el usuario
              (en onboarding o en su perfil) y <code>T_story</code> son los
              temas del cuento. El score va de 0 a 1.
            </p>

            <h3 className="manual-h3">Pseudo-código</h3>
            <CodeBlock language="python">{`def recommend(user, stories, k=10):
    user_topics = set(user.preferences.favorite_topics)
    if not user_topics:
        return random_sample(stories, k)  # cold start

    scored = []
    for story in stories:
        if not story.is_public:
            continue
        story_topics = set(story.themes)
        if not story_topics:
            continue
        intersection = len(user_topics & story_topics)
        union = len(user_topics | story_topics)
        score = intersection / union if union > 0 else 0
        if score > 0:
            scored.append((score, story))

    scored.sort(key=lambda x: x[0], reverse=True)
    return [story for _, story in scored[:k]]`}</CodeBlock>

            <h3 className="manual-h3">Edge cases</h3>
            <ul className="manual-list">
              <li>
                <strong>Cold start.</strong> Usuario sin temas → muestra una
                muestra aleatoria popular.
              </li>
              <li>
                <strong>Cuento sin temas.</strong> Se omite (no tiene cómo
                puntuar).
              </li>
              <li>
                <strong>Empate de score.</strong> Desempate por fecha
                descendente (más nuevos primero).
              </li>
              <li>
                <strong>Filtros de moderación.</strong> Los cuentos con{' '}
                <code>reportCount</code> sobre el umbral se excluyen.
              </li>
            </ul>

            <h3 className="manual-h3">Roadmap</h3>
            <ul className="manual-list">
              <li>Collaborative filtering con SVD una vez haya volumen.</li>
              <li>Embeddings de los textos de los cuentos para similitud semántica.</li>
              <li>Time decay: ponderar cuentos recientes.</li>
              <li>Bandits multi-armados para diversificar recomendaciones.</li>
            </ul>

            <ManualCallout variant="tip">
              <p>
                Jaccard se eligió por su <strong>interpretabilidad</strong>:
                cuando un usuario pregunta por qué le recomiendan algo, podemos
                mostrar literalmente "porque comparten 3 de 5 temas". Algoritmos
                más sofisticados llegarán cuando esa transparencia ya no sea
                crítica para la confianza.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'IX',
        title: 'Autenticación y seguridad',
        subtitle: 'Cómo protegemos credenciales y datos',
        mascot: 'full_body_tailer.png',
        slug: 'auth',
        content: (
          <>
            <p className="manual-dropcap">
              La seguridad del sistema se construye sobre tres pilares:{' '}
              <strong>doble cifrado de contraseñas</strong>,{' '}
              <strong>JWT con rotación</strong> y{' '}
              <strong>cumplimiento legal</strong> (Ley 1581/2012, Decreto
              1377/2013, COPPA).
            </p>

            <h3 className="manual-h3">Doble cifrado de contraseña</h3>
            <p>
              El cliente nunca envía la contraseña en texto plano. Antes de
              enviarla, se aplica SHA-256 con un salt fijo público. El
              servidor recibe el hash y le aplica bcrypt con su propio salt.
              Esto significa que un atacante con acceso al backend o a los
              logs nunca ve la contraseña original.
            </p>

            <CodeBlock language="dart">{`// Cliente (Flutter)
String hashClientSide(String password) {
  final bytes = utf8.encode(password + CLIENT_SALT);
  final digest = sha256.convert(bytes);
  return digest.toString();
}`}</CodeBlock>

            <CodeBlock language="javascript">{`// Servidor
const clientHash = req.body.password // ya viene hasheado
const finalHash = await bcrypt.hash(clientHash, 12)
await db.users.insertOne({ email, password: finalHash })`}</CodeBlock>

            <h3 className="manual-h3">OAuth con Google</h3>
            <p>
              El flujo se delega a Firebase Auth en el cliente. El backend
              recibe el ID token de Firebase y lo valida usando las claves
              públicas. Si es válido, emite un JWT propio con los claims de
              la app.
            </p>

            <h3 className="manual-h3">JWT</h3>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead>
                  <tr><th>Atributo</th><th>Valor</th></tr>
                </thead>
                <tbody>
                  <tr><td>Algoritmo</td><td>RS256 (asimétrico)</td></tr>
                  <tr><td>Access token</td><td>24 horas</td></tr>
                  <tr><td>Refresh token</td><td>30 días</td></tr>
                  <tr><td>Claims</td><td><code>sub</code> (userId), <code>role</code>, <code>iat</code>, <code>exp</code></td></tr>
                  <tr><td>Almacenamiento cliente</td><td>Keychain (iOS) / EncryptedSharedPreferences (Android)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="manual-h3">Privacidad de datos</h3>
            <ul className="manual-list">
              <li>Los datos sensibles van cifrados en reposo a nivel de base de datos.</li>
              <li>Los logs no contienen PII (no se loggean emails ni IPs sin hashear).</li>
              <li>El derecho al olvido se implementa con borrado en cascada.</li>
              <li>Las transferencias internacionales pasan solo a países con nivel adecuado de protección (art. 26 Ley 1581).</li>
            </ul>

            <ManualCallout variant="important">
              <p>
                Nunca, bajo ninguna circunstancia, se loggea una contraseña ni
                un token JWT completo. En logs aparece solo{' '}
                <code>jwt[0..8]</code> para correlación.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'X',
        title: 'Etapas pedagógicas (técnicamente)',
        subtitle: 'Cómo se traduce el desarrollo del niño en parámetros',
        mascot: 'very_happy_tailer.png',
        slug: 'pedagogia',
        content: (
          <>
            <p className="manual-dropcap">
              Las tres etapas pedagógicas del Ministerio de Educación Nacional
              de Colombia se traducen a un conjunto de parámetros concretos
              del LLM. Cada etapa define longitud, vocabulario y complejidad
              narrativa.
            </p>

            <h3 className="manual-h3">Mapeo de parámetros</h3>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead>
                  <tr>
                    <th>Etapa</th>
                    <th>Edad</th>
                    <th>Escenas</th>
                    <th>Palabras / escena</th>
                    <th>Vocab</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hablar y explorar</td>
                    <td>2-3 años</td>
                    <td>1-3</td>
                    <td>30-50</td>
                    <td>A1</td>
                  </tr>
                  <tr>
                    <td>Preguntar y representar</td>
                    <td>3-5 años</td>
                    <td>4-6</td>
                    <td>60-100</td>
                    <td>A2</td>
                  </tr>
                  <tr>
                    <td>Compartir y crear con otros</td>
                    <td>4-6 años</td>
                    <td>7+</td>
                    <td>100-150</td>
                    <td>B1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="manual-h3">Estructura del config</h3>
            <CodeBlock language="typescript">{`type StageConfig = {
  id: '2-3' | '3-5' | '4-6'
  menLabel: string
  scenes: { min: number; max: number }
  wordsPerScene: { min: number; max: number }
  vocabularyLevel: 'A1' | 'A2' | 'B1'
  narrativeStyle: 'one-thread' | 'cause-effect' | 'multi-character'
  themes: { allowed: string[]; encouraged: string[] }
}

export const STAGES: Record<StageConfig['id'], StageConfig> = {
  '2-3': {
    id: '2-3',
    menLabel: 'Hablar y explorar',
    scenes: { min: 1, max: 3 },
    wordsPerScene: { min: 30, max: 50 },
    vocabularyLevel: 'A1',
    narrativeStyle: 'one-thread',
    themes: {
      allowed: ['animales', 'familia', 'objetos cotidianos'],
      encouraged: ['repeticion', 'sonidos']
    }
  },
  // ... 3-5, 4-6
}`}</CodeBlock>

            <h3 className="manual-h3">Cómo afecta al prompt</h3>
            <p>
              El config de etapa se inyecta directamente en el prompt del LLM:
            </p>
            <CodeBlock language="text">{`Etapa MEN: {stage.menLabel}
Vocabulario máximo: {stage.vocabularyLevel}
Frases simples: {stage.narrativeStyle == 'one-thread' ? 'sí' : 'no'}
Generar exactamente {numScenes} escenas, cada una de
{stage.wordsPerScene.min} a {stage.wordsPerScene.max} palabras.
Evitar oraciones subordinadas si la etapa es A1.`}</CodeBlock>

            <ManualCallout variant="success" label="Validación">
              <p>
                Después de la generación, un validador comprueba que cada
                escena respete los rangos de palabras y vocabulario. Si no se
                cumplen, se reintenta con instrucciones más estrictas.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'XI',
        title: 'Deploy e infraestructura',
        subtitle: 'Cómo lleva el código al usuario',
        mascot: 'tailer.png',
        slug: 'deploy',
        content: (
          <>
            <p className="manual-dropcap">
              El proceso de deploy se diseñó para minimizar la fricción y
              eliminar el "se rompió en producción": cada push a{' '}
              <code>main</code> dispara una pipeline que valida, construye y
              publica.
            </p>

            <h3 className="manual-h3">Landing page</h3>
            <CodeBlock language="yaml">{`# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
      - uses: actions/deploy-pages@v4`}</CodeBlock>

            <h3 className="manual-h3">DNS de taily.com.co</h3>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead>
                  <tr><th>Tipo</th><th>Host</th><th>Valor</th></tr>
                </thead>
                <tbody>
                  <tr><td>A</td><td>@</td><td>185.199.108.153</td></tr>
                  <tr><td>A</td><td>@</td><td>185.199.109.153</td></tr>
                  <tr><td>A</td><td>@</td><td>185.199.110.153</td></tr>
                  <tr><td>A</td><td>@</td><td>185.199.111.153</td></tr>
                  <tr><td>CNAME</td><td>www</td><td>anfeespi.github.io</td></tr>
                </tbody>
              </table>
            </div>

            <p>
              El archivo <code>public/CNAME</code> contiene el dominio para
              que GitHub Pages lo configure en cada deploy. HTTPS lo emite
              GitHub automáticamente.
            </p>

            <h3 className="manual-h3">App móvil</h3>
            <ul className="manual-list">
              <li><strong>iOS:</strong> distribución vía TestFlight para beta, App Store para release. Build con <code>flutter build ipa</code>.</li>
              <li><strong>Android:</strong> distribución vía Play Console, AAB con <code>flutter build appbundle</code>.</li>
              <li>Versionado semántico: <code>vMAJOR.MINOR.PATCH</code> + build number.</li>
              <li>Tags <code>v*</code> en git disparan pipelines de release.</li>
            </ul>

            <h3 className="manual-h3">Backend</h3>
            <p>
              El backend se despliega en contenedores con autoescalado. Las
              variables sensibles (API keys de IA, secrets de Firebase, JWT
              private key) viven en un secret manager y nunca en el repo.
            </p>

            <ManualCallout variant="info" label="Rollback">
              <p>
                GitHub Pages mantiene el deploy anterior listo para revertir
                en un click. Para la app móvil, los rollbacks pasan por staged
                rollout en Play Store / phased release en App Store.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'XII',
        title: 'Setup local',
        subtitle: 'Cómo correr el proyecto en tu máquina',
        mascot: 'ok_tailer.png',
        slug: 'setup',
        content: (
          <>
            <p className="manual-dropcap">
              Levantar el proyecto localmente debería tomar menos de 10
              minutos. Esta sección cubre la landing y el frontend móvil. El
              backend tiene su propio README.
            </p>

            <h3 className="manual-h3">Prerrequisitos</h3>
            <ul className="manual-list">
              <li>Git</li>
              <li>Node.js 22+ y npm 10+ (landing)</li>
              <li>Flutter 3.x con Dart 3.x (app móvil)</li>
              <li>Xcode (para iOS) / Android Studio (para Android)</li>
              <li>Acceso a la organización de GitHub</li>
            </ul>

            <h3 className="manual-h3">Landing page</h3>
            <CodeBlock language="bash">{`git clone https://github.com/anfeespi/taily-landing.git
cd taily-landing
npm install
npm run dev
# Abre http://localhost:5173/`}</CodeBlock>

            <p>Para verificar el build de producción:</p>
            <CodeBlock language="bash">{`npm run build
npm run preview
# Abre http://localhost:4173/`}</CodeBlock>

            <h3 className="manual-h3">App Flutter</h3>
            <CodeBlock language="bash">{`git clone <repo-app>
cd taily-frontend
flutter pub get
flutter run                 # detecta el dispositivo conectado

# iOS específico
cd ios && pod install && cd ..
open ios/Runner.xcworkspace # firmar con tu Apple ID

# Android específico
flutter build apk --debug   # APK para pruebas`}</CodeBlock>

            <h3 className="manual-h3">Variables de entorno</h3>
            <p>
              Crea un archivo <code>.env</code> en la raíz de cada proyecto a
              partir de <code>.env.example</code>:
            </p>

            <CodeBlock language="bash">{`# Landing — no tiene env, solo VITE_BASE_URL si se subpath
VITE_BASE_URL=/

# App Flutter (lib/.env)
API_BASE_URL=https://api.taily.com.co/v1
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...

# Backend (no en este repo)
JWT_PRIVATE_KEY=...
JWT_PUBLIC_KEY=...
LLM_API_KEY=...
IMAGE_API_KEY=...
TTS_API_KEY=...
FIREBASE_ADMIN_KEY=...
DB_URI=...`}</CodeBlock>

            <ManualCallout variant="important">
              <p>
                Nunca commitear archivos <code>.env</code>. El{' '}
                <code>.gitignore</code> ya los excluye, pero verifica con{' '}
                <code>git status</code> antes de hacer push si los acabas de
                crear.
              </p>
            </ManualCallout>

            <h3 className="manual-h3">Atajos útiles</h3>
            <CodeBlock language="bash">{`# Corre tests
npm test                       # landing
flutter test                   # app

# Lint
npm run lint
flutter analyze

# Limpiar builds
rm -rf node_modules dist       # landing
flutter clean && flutter pub get`}</CodeBlock>
          </>
        ),
      },
      {
        number: 'XIII',
        title: 'Contribución y estándares',
        subtitle: 'Cómo escribir y revisar código en Taily',
        mascot: 'approve_tailer.png',
        slug: 'contribucion',
        content: (
          <>
            <p className="manual-dropcap">
              Las convenciones existen para que cualquier persona pueda leer
              el código de otra y entender el contexto sin pedir aclaraciones.
              Este capítulo documenta el flujo de trabajo y las reglas que
              seguimos.
            </p>

            <h3 className="manual-h3">Flujo de trabajo</h3>
            <ol className="manual-list">
              <li>Issue describiendo el cambio (bug, feat, chore, doc).</li>
              <li>Branch desde <code>main</code>: <code>feat/topic-recommendation-decay</code>.</li>
              <li>Commits pequeños siguiendo Conventional Commits.</li>
              <li>PR con descripción del problema y la solución.</li>
              <li>Code review obligatorio (mínimo 1 aprobación).</li>
              <li>Merge squash para mantener historia limpia.</li>
            </ol>

            <h3 className="manual-h3">Conventional Commits</h3>
            <CodeBlock language="text">{`feat: add Jaccard recommendation algorithm
fix: prevent crash when story has no themes
docs: add chapter X to technical manual
refactor: extract Story repository interface
test: cover edge cases in recommendation
chore: bump dependencies
perf: cache user topics in memory`}</CodeBlock>

            <h3 className="manual-h3">Estándares de código</h3>
            <ul className="manual-list">
              <li><strong>Landing (TS/React):</strong> ESLint + Prettier. <code>npm run lint</code> antes de commit.</li>
              <li><strong>App (Dart/Flutter):</strong> <code>flutter format .</code> y <code>flutter analyze</code> deben pasar.</li>
              <li><strong>Backend:</strong> ver README del repo correspondiente.</li>
              <li>Todos los commits requieren tests para lógica nueva.</li>
              <li>Imports ordenados: librerías externas, internas, relativas.</li>
              <li>Documentar funciones públicas con docstrings/JSDoc.</li>
            </ul>

            <h3 className="manual-h3">Convenciones de naming</h3>
            <ul className="manual-list">
              <li>
                <strong>Componentes React:</strong> PascalCase, archivo y
                export con el mismo nombre.
              </li>
              <li>
                <strong>Hooks:</strong> <code>useNombre</code>.
              </li>
              <li>
                <strong>Constantes:</strong> SCREAMING_SNAKE_CASE.
              </li>
              <li>
                <strong>Tipos / interfaces:</strong> PascalCase, sin prefijo{' '}
                <code>I</code>.
              </li>
              <li>
                <strong>Funciones de utilidades:</strong> camelCase.
              </li>
              <li>
                <strong>Archivos Dart:</strong> snake_case.
              </li>
            </ul>

            <h3 className="manual-h3">Revisión de PR</h3>
            <ul className="manual-list">
              <li>¿Resuelve el problema descrito en el issue?</li>
              <li>¿Tiene tests proporcionales al riesgo del cambio?</li>
              <li>¿Mantiene la separación de capas (UI / dominio / datos)?</li>
              <li>¿Introduce breaking changes en contratos? Si sí, ¿está documentado?</li>
              <li>¿Hay PII en logs nuevos?</li>
              <li>¿El bundle de la landing creció más de 10 KB? Investigar.</li>
            </ul>

            <ManualCallout variant="farewell" label="Gracias por contribuir">
              <p>
                Cada línea que se agrega a Taily termina en manos de un niño y
                su familia compartiendo un cuento. El cuidado con el que
                escribimos el código se traduce en la calidad de esa
                experiencia.
              </p>
              <p style={{ marginTop: '0.75rem' }}>— El equipo técnico de Taily</p>
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
              aria-label="Abrir índice del manual técnico"
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
              <span>Índice</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPdfHelpOpen(true)}
              className="manual-print-btn"
              aria-label="Descargar manual técnico en PDF"
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

      {/* Cover (only print) */}
      <div className="manual-cover only-print">
        <img src={img('manual-banner.png')} alt="" className="manual-cover-banner" />
        <h1 className="manual-cover-title">Manual Técnico</h1>
        <p className="manual-cover-subtitle">Taily — Documentación interna para desarrolladores</p>
        <p className="manual-cover-edition">Edición 2026 · Confidencial</p>
      </div>

      {/* Backdrop */}
      <div
        className={`manual-toc-backdrop no-print ${isTocOpen ? 'is-open' : ''}`}
        onClick={() => setIsTocOpen(false)}
        aria-hidden="true"
      />

      {/* TOC */}
      <aside
        className={`manual-toc no-print ${isTocOpen ? 'is-open' : ''}`}
        aria-label="Índice del manual técnico"
      >
        <div className="manual-toc-inner">
          <div className="manual-toc-header">
            <img src={img('taily-logo.jpeg')} alt="Taily" className="manual-toc-logo" />
            <div>
              <div className="manual-toc-title">Manual</div>
              <div className="manual-toc-subtitle">Técnico</div>
            </div>
            <button
              type="button"
              onClick={() => setIsTocOpen(false)}
              className="manual-toc-close"
              aria-label="Cerrar índice"
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

      {/* Chapters */}
      <main className="manual-content">
        {chapters.map((chapter, idx) => (
          <article
            key={chapter.slug}
            className={`manual-chapter ${idx === chapterIndex ? 'manual-chapter-current' : 'manual-chapter-hidden'}`}
            id={`capitulo-${chapter.slug}`}
          >
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

            <div className="manual-chapter-body">{chapter.content}</div>

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

      {/* PDF help modal */}
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

            <h2 id="pdf-help-title" className="manual-modal-title">Descargar el manual técnico en PDF</h2>
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
