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
        title: 'Arquitectura y stack',
        subtitle: 'Spring Cloud + Flutter + Gemini',
        mascot: 'happy_hi_tailer.png',
        slug: 'arquitectura',
        content: (
          <>
            <p className="manual-dropcap">
              Taily es un cliente <strong>Flutter</strong> contra un backend
              de <strong>microservicios Spring Cloud</strong> que delega la
              generación de contenido a <strong>Google Gemini</strong>. Toda
              comunicación pasa por un <strong>API Gateway</strong> reactivo
              con autenticación JWT.
            </p>

            <h3 className="manual-h3">Servicios</h3>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead><tr><th>Servicio</th><th>Responsabilidad</th></tr></thead>
                <tbody>
                  <tr><td><code>service-registry</code></td><td>Eureka discovery (<code>:8761</code>)</td></tr>
                  <tr><td><code>config-server</code></td><td>Spring Cloud Config (<code>:8888</code>)</td></tr>
                  <tr><td><code>api-gateway</code></td><td>Routing + JWT + caché Caffeine (<code>:8060</code>)</td></tr>
                  <tr><td><code>user-service</code></td><td>Auth, biblioteca, favoritos, temas</td></tr>
                  <tr><td><code>tale-service</code></td><td>Cuentos, reportes, comentarios, recomendación</td></tr>
                  <tr><td><code>text-service</code></td><td>Texto con Gemini</td></tr>
                  <tr><td><code>image-service</code></td><td>Imágenes con Gemini</td></tr>
                  <tr><td><code>audio-service</code></td><td>TTS Gemini → Firebase Storage</td></tr>
                  <tr><td><code>topic-service</code></td><td>Catálogo de temas</td></tr>
                  <tr><td><code>validation-service</code></td><td>Filtros de contenido</td></tr>
                  <tr><td><code>mail-service</code></td><td>Notificaciones</td></tr>
                  <tr><td><code>assistant-service</code></td><td>Chatbot T.A.I.L.E.R</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="manual-h3">Stack</h3>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead><tr><th>Capa</th><th>Tecnología</th></tr></thead>
                <tbody>
                  <tr><td>Backend</td><td>Java 17 · Spring Boot 3.5.5 · Spring Cloud 2025.0.0</td></tr>
                  <tr><td>Persistencia</td><td>MongoDB 6 · Spring Data MongoDB</td></tr>
                  <tr><td>JWT</td><td><code>com.auth0:java-jwt 4.5.0</code> (HMAC256)</td></tr>
                  <tr><td>Resiliencia</td><td>Resilience4j</td></tr>
                  <tr><td>Caché</td><td>Caffeine</td></tr>
                  <tr><td>IA</td><td><code>com.google.genai:google-genai</code> (Gemini)</td></tr>
                  <tr><td>Storage</td><td>Firebase Storage</td></tr>
                  <tr><td>App móvil</td><td>Flutter · Dart 3.9+ · Riverpod · GoRouter · Dio</td></tr>
                  <tr><td>Despliegue</td><td>Docker Compose</td></tr>
                </tbody>
              </table>
            </div>

            <ManualCallout variant="info" label="Por qué microservicios">
              <p>
                Generar un cuento (texto + imagen + audio) puede tardar 30-60 s.
                Aislar cada capacidad permite escalarlas y aplicar circuit
                breakers independientes por proveedor de IA.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'II',
        title: 'API Gateway y endpoints',
        subtitle: 'Contratos REST reales bajo /api/v1',
        mascot: 'hi_tailer.png',
        slug: 'api',
        content: (
          <>
            <p className="manual-dropcap">
              Todo el tráfico entra por <code>api-gateway</code> en el puerto{' '}
              <code>8060</code>. El gateway valida el JWT (excepto en auth
              público) y enruta vía Eureka.
            </p>

            <h3 className="manual-h3">Públicos (sin JWT)</h3>
            <CodeBlock language="text">{`POST /api/v1/user/auth/register
POST /api/v1/user/auth/login
POST /api/v1/user/auth/google-login`}</CodeBlock>

            <h3 className="manual-h3">Usuario</h3>
            <CodeBlock language="text">{`GET             /api/v1/user/auth/validate-id
GET POST DELETE /api/v1/user/library
GET POST        /api/v1/user/topics
POST DELETE     /api/v1/user/favorites
GET             /api/v1/user/username?idUser=...`}</CodeBlock>

            <h3 className="manual-h3">Cuentos</h3>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead><tr><th>Método</th><th>Ruta</th><th>Función</th></tr></thead>
                <tbody>
                  <tr><td>POST</td><td><code>/api/v1/tale</code></td><td>Crear cuento</td></tr>
                  <tr><td>GET</td><td><code>/api/v1/tale/&#123;id&#125;?narration=male|female</code></td><td>Obtener cuento</td></tr>
                  <tr><td>GET</td><td><code>/api/v1/tale/by-user</code></td><td>Cuentos del usuario (size=20)</td></tr>
                  <tr><td>GET</td><td><code>/api/v1/tale</code></td><td>Feed completo paginado</td></tr>
                  <tr><td>GET</td><td><code>/api/v1/tale/recommend</code></td><td>Top-10 Jaccard</td></tr>
                  <tr><td>GET</td><td><code>/api/v1/tale/search</code></td><td>Búsqueda en feed</td></tr>
                  <tr><td>GET</td><td><code>/api/v1/tale/by-user/search</code></td><td>Búsqueda en biblioteca</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="manual-h3">Crear cuento</h3>
            <CodeBlock language="http">{`POST /api/v1/tale
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "prompt": "...",
  "mainTopic": "amistad",
  "additionalTopics": ["bosque", "magia"],
  "stage": "3-5",
  "narrationVoice": "female"
}`}</CodeBlock>
            <CodeBlock language="json">{`{
  "id": "65f...",
  "title": "El Bosque de los Susurros",
  "scenes": ["sc1...", "sc2..."],
  "images": ["https://.../scene1.png", ...],
  "audios": ["https://.../scene1-female.mp3", ...],
  "maleAudios": ["https://.../scene1-male.mp3", ...],
  "dictionary": { "susurro": "sonido bajito, como hablar en secreto" }
}`}</CodeBlock>

            <ManualCallout variant="important" label="Validación">
              <p>
                Si el prompt no pasa <code>validation-service</code>, el
                endpoint responde 400 con <code>ContentNotValidatedException</code>.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'III',
        title: 'Modelo de datos',
        subtitle: 'Entidades MongoDB reales',
        mascot: 'thoughtful_tailer.png',
        slug: 'datos',
        content: (
          <>
            <p className="manual-dropcap">
              Cada microservicio persiste en su propia DB lógica del mismo
              cluster Mongo. Los IDs son <code>ObjectId</code> serializados
              como <code>String</code>.
            </p>

            <h3 className="manual-h3">User</h3>
            <CodeBlock language="java">{`@Document(collection = "users")
public class User implements UserDetails {
  @Id private String id;
  @Indexed(unique = true) private String email;
  @Indexed(unique = true) private String username;
  private String password;            // BCrypt(SHA-256(plain))
  private LocalDate birthDate;
  private Boolean enabled;
  private Boolean locked;
  private Roles role;                 // BASIC_USER | ADMIN
  private AuthProvider authProvider;  // TAILY | GOOGLE
  private Set<String> library;
  private Set<String> favorites;
  private Set<String> topics;
}`}</CodeBlock>

            <h3 className="manual-h3">Tale</h3>
            <CodeBlock language="java">{`@Document(collection = "tale")
public class Tale {
  @Id private String id;
  private final String prompt;
  @TextIndexed(weight = 3) private final String title;
  private final String idUser;
  private final LocalDateTime creationDate;
  @TextIndexed(weight = 2) private final String mainTopic;
  @TextIndexed(weight = 1) private final String[] additionalTopics;
  private final String[] scenes;       // ids en text-service
  private final String[] images;       // URLs Firebase
  private final String[] audios;       // voz femenina
  private final String[] maleAudios;   // voz masculina
  private final Map<String, String> dictionary;
  private Set<String> comments;
}`}</CodeBlock>

            <p>
              Los pesos del <code>@TextIndexed</code> hacen que la búsqueda
              libre privilegie título &gt; tema principal &gt; temas
              adicionales. Otras entidades:{' '}
              <code>Comment</code>, <code>Report</code>, <code>TaleScore</code>,
              {' '}y <code>Text</code>/<code>Image</code>/<code>Audio</code>{' '}
              en sus servicios respectivos.
            </p>

            <ManualCallout variant="tip" label="Por qué no embeber escenas">
              <p>
                Las escenas viven en colecciones aparte para que el listado de
                cuentos sea ligero (sin texto completo) y el caché del gateway
                eficiente. Solo al abrir un cuento se hidratan.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'IV',
        title: 'Generación y recomendación',
        subtitle: 'Pipeline IA + algoritmo Jaccard',
        mascot: 'waiting_tailer.png',
        slug: 'generacion',
        content: (
          <>
            <p className="manual-dropcap">
              <code>tale-service</code> orquesta la generación llamando a
              cuatro microservicios (todos con Gemini), y expone un
              recomendador con índice de Jaccard sobre los temas del usuario.
            </p>

            <h3 className="manual-h3">Pipeline de creación</h3>
            <ol className="manual-list">
              <li>Cliente envía <code>POST /api/v1/tale</code> con prompt + JWT.</li>
              <li>Gateway valida JWT y enruta a <code>tale-service</code>.</li>
              <li><code>validation-service</code> verifica el prompt. Si no → <code>400 ContentNotValidated</code>.</li>
              <li><code>text-service</code> genera el texto con Gemini.</li>
              <li>Por cada escena (paralelizado vía AsyncConfig):
                <ul className="manual-list-nested">
                  <li><code>image-service</code> → imagen con Gemini → Firebase</li>
                  <li><code>audio-service</code> → dos audios M/F con TTS de Gemini → Firebase</li>
                </ul>
              </li>
              <li><code>tale-service</code> persiste el <code>Tale</code> y devuelve <code>TaleDTO</code>.</li>
            </ol>

            <p>
              Las llamadas entre servicios usan <code>WebClient</code>{' '}
              configurado en <code>WebClientConfig</code>, con clientes
              tipados en <code>client/</code> y reintentos vía Resilience4j.
            </p>

            <h3 className="manual-h3">Etapas pedagógicas</h3>
            <p>
              El campo <code>stage</code> ajusta el system prompt de Gemini:
            </p>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead><tr><th>Etapa</th><th>Edad</th><th>Características</th></tr></thead>
                <tbody>
                  <tr><td>Hablar y explorar</td><td>2-3</td><td>Oraciones simples, vocabulario repetitivo</td></tr>
                  <tr><td>Preguntar y representar</td><td>3-5</td><td>Causa-efecto, vocabulario más amplio</td></tr>
                  <tr><td>Compartir y crear</td><td>4-6</td><td>Tramas con varios personajes, valores de empatía</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="manual-h3">Recomendador (Jaccard)</h3>
            <p>
              El conjunto de temas se representa como <code>BitSet</code>{' '}
              indexado por <code>TopicIndexer</code>; Top-K via min-heap en{' '}
              O(n log k):
            </p>
            <CodeBlock language="java">{`public List<TaleDTO> recommendByJaccard(String tokenUser, int k) {
  if (topicIndexer.size() == 0)
    for (TopicDTO t : topicClient.findAll()) topicIndexer.idFor(t.id());

  PriorityQueue<TaleScore> pq = new PriorityQueue<>(
      Comparator.comparingDouble(TaleScore::getScore));
  UserDTO u = userClient.validateId(tokenUser);
  BitSet user = calculateBitsetByUser(userClient.getTopics(tokenUser));

  for (Tale t : taleRepository.findAll()) {
    if (t.getIdUser().equals(u.id())) continue; // no propios
    double score = SimilarityUtils.jaccardIndex(user, calculateBitsetByTale(t));
    if (score <= 0) continue;
    if (pq.size() < k) pq.offer(new TaleScore(t, score));
    else if (score > pq.peek().getScore()) {
      pq.poll();
      pq.offer(new TaleScore(t, score));
    }
  }
  // ordena descendente y mapea a DTO
  return ...;
}`}</CodeBlock>

            <ManualCallout variant="info" label="Voz dual y diccionario">
              <p>
                Audio se genera dos veces (M/F) para alternar en runtime sin
                regenerar. Gemini extrae palabras "complejas" para la edad y
                devuelve definiciones infantiles → <code>dictionary</code>{' '}
                del cuento.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'V',
        title: 'Autenticación y seguridad',
        subtitle: 'JWT HMAC256 + doble hashing de password',
        mascot: 'full_body_tailer.png',
        slug: 'auth',
        content: (
          <>
            <p className="manual-dropcap">
              Tres pilares: <strong>SHA-256 cliente + BCrypt servidor</strong>{' '}
              en contraseñas, <strong>JWT con HMAC256</strong> via{' '}
              <code>com.auth0:java-jwt</code>, y un{' '}
              <strong>filtro reactivo</strong> en el gateway.
            </p>

            <h3 className="manual-h3">Doble hashing</h3>
            <CodeBlock language="dart">{`// frontend — login_form_provider.dart
final bytes = utf8.encode(passwordPlano);
final hashedPassword = sha256.convert(bytes);
// se envía hashedPassword.toString() al backend`}</CodeBlock>
            <CodeBlock language="java">{`// backend/user-service — SecurityConfiguration.java
@Bean
public PasswordEncoder passwordEncoder() {
  return new BCryptPasswordEncoder();
}
// Al registrar:
String encoded = passwordEncoder.encode(dto.password()); // BCrypt(SHA-256(plain))`}</CodeBlock>

            <h3 className="manual-h3">JWT HMAC256</h3>
            <p>
              Secret e issuer vienen del config-server (<code>config.jwt.secret</code>,{' '}
              <code>config.jwt.issuer</code>):
            </p>
            <CodeBlock language="java">{`// api-gateway/.../service/JWTService.java
public String getSubject(String token) {
  if (token == null) throw new TokenNullException("Token is null");
  try {
    Algorithm algorithm = Algorithm.HMAC256(secret);
    return JWT.require(algorithm)
        .withIssuer(issuer)
        .build()
        .verify(token)
        .getSubject();
  } catch (JWTVerificationException e) {
    throw new InvalidTokenException("Token is invalid");
  }
}`}</CodeBlock>

            <h3 className="manual-h3">Endpoints públicos del gateway</h3>
            <CodeBlock language="java">{`exchanges
  .pathMatchers(POST, "/api/v1/user/auth/login").permitAll()
  .pathMatchers(POST, "/api/v1/user/auth/register").permitAll()
  .pathMatchers(POST, "/api/v1/user/auth/google-login").permitAll()
  .pathMatchers("/error").permitAll()
  .anyExchange().authenticated()`}</CodeBlock>

            <h3 className="manual-h3">Google OAuth</h3>
            <p>
              Cliente usa <code>google_sign_in ^7.2</code> y envía el ID Token
              al backend. El backend lo valida con Google y emite JWT propio.
              Si el usuario no existe se crea con <code>authProvider: GOOGLE</code>.
            </p>

            <ManualCallout variant="important" label="Rotación de secret">
              <p>
                HMAC256 usa una sola key compartida via Spring Cloud Config.
                Para rotar, cambia el valor en el config-server y reinicia
                los servicios.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'VI',
        title: 'Cliente Flutter',
        subtitle: 'Clean Architecture con feature folders',
        mascot: 'happy_tailer.png',
        slug: 'cliente',
        content: (
          <>
            <p className="manual-dropcap">
              La app sigue <strong>Clean Architecture</strong> con organización{' '}
              <strong>por feature</strong>. Cada feature tiene sus capas{' '}
              <code>domain</code>, <code>infrastructure</code> y{' '}
              <code>presentation</code>.
            </p>

            <h3 className="manual-h3">Estructura</h3>
            <CodeBlock language="text">{`lib/
├── config/                 # GoRouter, Material 3 theme, env
├── features/
│   ├── auth/
│   │   ├── domain/         # Contratos, entidades
│   │   ├── infrastructure/ # Datasources, repos, models, mappers
│   │   └── presentation/   # Providers Riverpod, screens, widgets
│   ├── home/
│   ├── tale_creation/
│   ├── tale_viewer/
│   └── user/
└── shared/                 # Cross-feature`}</CodeBlock>

            <h3 className="manual-h3">Patrones</h3>
            <ul className="manual-list">
              <li><strong>Estado:</strong> Riverpod con <code>NotifierProvider</code>; forms con <code>AutoDisposeNotifier</code>.</li>
              <li><strong>Routing:</strong> GoRouter con guards observando <code>authStatusProvider</code> e <code>isCreatingTaleProvider</code>.</li>
              <li><strong>Errores:</strong> <code>Either&lt;Failure, T&gt;</code> de dartz. <strong>No try-catch.</strong></li>
              <li><strong>Datos:</strong> UI → Provider → Repository → DataSource → Dio (Bearer interceptor).</li>
              <li><strong>Mapping:</strong> <code>Model</code> (JSON) y <code>Entity</code> (dominio) separados.</li>
              <li><strong>Tokens:</strong> en <code>shared_preferences</code>.</li>
              <li><strong>Tema:</strong> Material 3 + Gabarito/Space Mono via <code>google_fonts</code>. Provider de accesibilidad: dark mode + escala de fuente 0.8x–1.4x.</li>
            </ul>

            <ManualCallout variant="tip" label="Either de dartz">
              <p>
                Cada operación de IO es total: <code>Left(failure)</code> o{' '}
                <code>Right(data)</code>. Esto fuerza a la UI a manejar ambos
                casos y elimina excepciones no controladas.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'VII',
        title: 'Setup y deploy',
        subtitle: 'Cómo correr y desplegar el sistema',
        mascot: 'ok_tailer.png',
        slug: 'ops',
        content: (
          <>
            <p className="manual-dropcap">
              Backend con Docker Compose y app Flutter localmente. Para
              producción, el backend va en contenedores y la app pasa por
              TestFlight (iOS) y Play Console (Android).
            </p>

            <h3 className="manual-h3">Setup local</h3>
            <CodeBlock language="bash">{`# Backend
cd taily-backend && docker-compose up --build
# Eureka:  localhost:8761  ·  Gateway:  localhost:8060

# App Flutter
cd taily-frontend
echo "BASE_API_URL=http://localhost:8060" > .env
flutter pub get && flutter run`}</CodeBlock>

            <h3 className="manual-h3">.env del backend</h3>
            <CodeBlock language="bash">{`EUREKA_USER=...
EUREKA_PASSWORD=...
MONGO_URI=mongodb://mongo:27017
CONFIG_JWT_SECRET=...
CONFIG_JWT_ISSUER=taily-backend
GEMINI_API_KEY=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_ADMIN_KEY=...   # JSON service account`}</CodeBlock>

            <h3 className="manual-h3">Comandos útiles</h3>
            <CodeBlock language="bash">{`# Backend — un solo servicio
cd taily-backend/user-service && ./mvnw spring-boot:run

# Tests
./mvnw test
flutter test

# Lint / format
./mvnw spotless:check
flutter analyze

# Limpiar
docker-compose down -v
flutter clean && flutter pub get`}</CodeBlock>

            <ManualCallout variant="important" label="Secrets">
              <p>
                Nunca commitear archivos <code>.env</code> ni service account
                JSONs. Cada repo los excluye en su <code>.gitignore</code>;
                verifica con <code>git status</code> antes de hacer push si
                los acabas de crear.
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

      <div className="manual-cover only-print">
        <img src={img('manual-banner.png')} alt="" className="manual-cover-banner" />
        <h1 className="manual-cover-title">Manual Técnico</h1>
        <p className="manual-cover-subtitle">Taily — Documentación interna para desarrolladores</p>
        <p className="manual-cover-edition">Edición 2026 · Confidencial</p>
      </div>

      <div
        className={`manual-toc-backdrop no-print ${isTocOpen ? 'is-open' : ''}`}
        onClick={() => setIsTocOpen(false)}
        aria-hidden="true"
      />

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
