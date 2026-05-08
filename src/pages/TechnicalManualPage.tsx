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
        subtitle: 'Spring Cloud microservicios + Flutter + Gemini',
        mascot: 'happy_hi_tailer.png',
        slug: 'arquitectura',
        content: (
          <>
            <p className="manual-dropcap">
              Taily se compone de tres piezas: cliente <strong>Flutter</strong>,
              backend de <strong>microservicios Spring Cloud</strong>, y modelos
              de IA de <strong>Google Gemini</strong>. Toda comunicación
              cliente–servidor pasa por un <strong>API Gateway</strong>{' '}
              reactivo con autenticación JWT.
            </p>

            <h3 className="manual-h3">Diagrama</h3>
            <CodeBlock language="diagrama">{`┌──────────────┐                ┌────────────────┐
│  App Móvil   │ ── HTTPS ─────▶│   API Gateway  │ :8060
│   (Flutter)  │ ◀───────────── │ (WebFlux + JWT)│
└──────────────┘                └────────┬───────┘
                                         │ Eureka
       ┌─────────┬───────────────┬───────┴─────┬─────────────┐
       ▼         ▼               ▼             ▼             ▼
  user-svc  tale-svc       text-svc      image-svc     audio-svc
                │          (Gemini)      (Gemini)    (TTS+Firebase)
                ├── topic-svc, validation-svc, mail-svc, assistant-svc
                ▼
          MongoDB (1 DB lógica por servicio)

  Soporte: config-server :8888 (Cloud Config) · service-registry :8761 (Eureka)`}</CodeBlock>

            <h3 className="manual-h3">Servicios</h3>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead><tr><th>Servicio</th><th>Responsabilidad</th></tr></thead>
                <tbody>
                  <tr><td><code>service-registry</code></td><td>Eureka (discovery)</td></tr>
                  <tr><td><code>config-server</code></td><td>Spring Cloud Config</td></tr>
                  <tr><td><code>api-gateway</code></td><td>Routing + JWT + caché Caffeine</td></tr>
                  <tr><td><code>user-service</code></td><td>Auth, biblioteca, favoritos, temas</td></tr>
                  <tr><td><code>tale-service</code></td><td>Cuentos, comentarios, reportes, recomendación</td></tr>
                  <tr><td><code>text-service</code></td><td>Texto con Gemini</td></tr>
                  <tr><td><code>image-service</code></td><td>Imágenes con Gemini</td></tr>
                  <tr><td><code>audio-service</code></td><td>TTS + subida a Firebase Storage</td></tr>
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
                  <tr><td>Resiliencia</td><td>Resilience4j (circuit breaker, retry)</td></tr>
                  <tr><td>Caché</td><td>Caffeine</td></tr>
                  <tr><td>IA</td><td><code>com.google.genai:google-genai</code> (Gemini)</td></tr>
                  <tr><td>Storage</td><td>Firebase Storage (audio, imágenes)</td></tr>
                  <tr><td>Despliegue backend</td><td>Docker Compose</td></tr>
                  <tr><td>App móvil</td><td>Flutter · Dart 3.9+ · Riverpod · GoRouter · Dio</td></tr>
                  <tr><td>Landing</td><td>React 19 · Vite 6 · Tailwind v4 · GitHub Pages</td></tr>
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
              <code>8060</code>. El gateway valida el JWT (excepto en endpoints
              de auth públicos) y enruta vía Eureka.
            </p>

            <h3 className="manual-h3">Públicos (sin JWT)</h3>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead><tr><th>Método</th><th>Ruta</th></tr></thead>
                <tbody>
                  <tr><td>POST</td><td><code>/api/v1/user/auth/register</code></td></tr>
                  <tr><td>POST</td><td><code>/api/v1/user/auth/login</code></td></tr>
                  <tr><td>POST</td><td><code>/api/v1/user/auth/google-login</code></td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="manual-h3">Usuario (autenticados)</h3>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead><tr><th>Método</th><th>Ruta</th></tr></thead>
                <tbody>
                  <tr><td>GET</td><td><code>/api/v1/user/auth/validate-id</code></td></tr>
                  <tr><td>GET / POST / DELETE</td><td><code>/api/v1/user/library</code></td></tr>
                  <tr><td>GET / POST</td><td><code>/api/v1/user/topics</code></td></tr>
                  <tr><td>POST / DELETE</td><td><code>/api/v1/user/favorites</code></td></tr>
                  <tr><td>GET</td><td><code>/api/v1/user/username?idUser=...</code></td></tr>
                </tbody>
              </table>
            </div>

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
                  <tr><td>GET</td><td><code>/api/v1/tale/search</code></td><td>Búsqueda por query/topics</td></tr>
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

            <h3 className="manual-h3">User (DB <code>users</code>)</h3>
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

            <h3 className="manual-h3">Tale (DB <code>tales</code>)</h3>
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
              Los pesos del <code>@TextIndexed</code> permiten que la búsqueda
              libre privilegie título &gt; tema principal &gt; temas
              adicionales.
            </p>

            <h3 className="manual-h3">Otras entidades</h3>
            <ul className="manual-list">
              <li><code>Comment</code>, <code>Report</code>, <code>TaleScore</code> — en <code>tale-service</code></li>
              <li><code>Text</code>, <code>Image</code>, <code>Audio</code> — uno por cada microservicio de assets, con su propia DB</li>
            </ul>

            <ManualCallout variant="tip" label="Por qué no embeber escenas">
              <p>
                Las escenas viven en colecciones aparte para que el listado de
                cuentos sea ligero (sin texto completo) y el caché del gateway
                eficiente. Solo al abrir un cuento se hidratan las escenas.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'IV',
        title: 'Generación con IA',
        subtitle: 'Pipeline orquestado por tale-service',
        mascot: 'waiting_tailer.png',
        slug: 'generacion',
        content: (
          <>
            <p className="manual-dropcap">
              <code>tale-service</code> orquesta llamadas a{' '}
              <code>validation-service</code>, <code>text-service</code>,{' '}
              <code>image-service</code> y <code>audio-service</code>. Todos
              corren Gemini bajo el capó.
            </p>

            <h3 className="manual-h3">Flujo</h3>
            <ol className="manual-list">
              <li>Cliente envía <code>POST /api/v1/tale</code>.</li>
              <li>Gateway valida JWT y enruta a <code>tale-service</code>.</li>
              <li><code>validation-service</code> verifica que el prompt sea apto. Si no → 400.</li>
              <li><code>text-service</code> genera el texto con Gemini y crea entradas <code>Text</code>.</li>
              <li>Por cada escena (paralelizado vía AsyncConfig):
                <ul className="manual-list-nested">
                  <li><code>image-service</code> → imagen con Gemini</li>
                  <li><code>audio-service</code> → dos audios (M/F) con TTS, sube a Firebase Storage</li>
                </ul>
              </li>
              <li><code>tale-service</code> persiste el <code>Tale</code> con las URLs y devuelve <code>TaleDTO</code>.</li>
            </ol>

            <h3 className="manual-h3">Llamadas entre servicios</h3>
            <p>
              Cada servicio usa <code>WebClient</code> configurado en{' '}
              <code>WebClientConfig</code>. Métodos tipados en{' '}
              <code>client/</code>:
            </p>
            <CodeBlock language="java">{`// tale-service/.../client/TextClient.java
public List<Text> generateScenes(String token, PromptModel prompt) {
  return webClient.post()
      .uri("/api/v1/text")
      .header(AUTHORIZATION, "Bearer " + token)
      .bodyValue(prompt)
      .retrieve()
      .bodyToFlux(Text.class)
      .collectList()
      .block();
}`}</CodeBlock>

            <h3 className="manual-h3">Etapas pedagógicas</h3>
            <p>
              El campo <code>stage</code> del <code>PromptModel</code> ajusta
              el system prompt enviado a Gemini según el referente del MEN
              Colombia:
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

            <ManualCallout variant="info" label="Voz dual y diccionario">
              <p>
                Audio se genera dos veces (M/F) para alternancia en runtime.
                Gemini extrae palabras "complejas" para la edad y devuelve
                definiciones infantiles → <code>dictionary: Map&lt;palabra, def&gt;</code>.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'V',
        title: 'Recomendación con Jaccard',
        subtitle: 'Top-K cuentos por similitud de temas',
        mascot: 'approve_tailer.png',
        slug: 'recomendaciones',
        content: (
          <>
            <p className="manual-dropcap">
              <code>RecommenderService</code> en <code>tale-service</code> usa
              el índice de Jaccard entre temas del usuario y temas del cuento.
              Cada conjunto se representa como <code>BitSet</code> indexado por{' '}
              <code>TopicIndexer</code>.
            </p>

            <h3 className="manual-h3">Algoritmo</h3>
            <CodeBlock language="java">{`public List<TaleDTO> recommendByJaccard(String tokenUser, int k) {
  if (topicIndexer.size() == 0) {
    for (TopicDTO topic : topicClient.findAll())
      topicIndexer.idFor(topic.id());
  }

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

            <h3 className="manual-h3">Por qué BitSet + min-heap</h3>
            <ul className="manual-list">
              <li><strong>BitSet:</strong> Jaccard se calcula con dos AND/OR de bits y dos <code>cardinality()</code>.</li>
              <li><strong>Min-heap:</strong> Top-K en O(n log k) en vez de ordenar todos los cuentos.</li>
              <li><strong>Filtros:</strong> excluye cuentos del propio usuario y scores ≤ 0.</li>
            </ul>

            <ManualCallout variant="tip" label="Roadmap">
              <p>
                A futuro: collaborative filtering con volumen, embeddings de
                textos para similitud semántica, time decay para privilegiar
                cuentos recientes.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'VI',
        title: 'Autenticación y seguridad',
        subtitle: 'JWT HMAC256 + doble hashing de password',
        mascot: 'full_body_tailer.png',
        slug: 'auth',
        content: (
          <>
            <p className="manual-dropcap">
              Tres pilares: <strong>SHA-256 cliente + BCrypt servidor</strong>{' '}
              en contraseñas, <strong>JWT con HMAC256</strong>, y un{' '}
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
              Librería <code>com.auth0:java-jwt 4.5.0</code>. Secret e issuer
              vienen del config-server (<code>config.jwt.secret</code>,{' '}
              <code>config.jwt.issuer</code>).
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
              Cliente usa <code>google_sign_in ^7.2</code>. Envía el ID Token
              al backend, que lo valida con Google y emite JWT propio. Si el
              usuario no existe se crea con <code>authProvider: GOOGLE</code>.
            </p>

            <ManualCallout variant="important" label="Rotación de secret">
              <p>
                HMAC256 usa una sola key compartida via Spring Cloud Config.
                Para rotar, cambia el valor en el config-server y reinicia
                los servicios. Para múltiples emisores, considerar migrar a
                RS256.
              </p>
            </ManualCallout>
          </>
        ),
      },
      {
        number: 'VII',
        title: 'Cliente Flutter y landing',
        subtitle: 'Clean Architecture + React 19',
        mascot: 'happy_tailer.png',
        slug: 'cliente',
        content: (
          <>
            <p className="manual-dropcap">
              La app móvil sigue Clean Architecture con folders por feature.
              La landing es una SPA estática en GitHub Pages.
            </p>

            <h3 className="manual-h3">App móvil — estructura</h3>
            <CodeBlock language="text">{`lib/
├── config/                 # GoRouter, tema Material 3, env
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

            <h3 className="manual-h3">Patrones de la app</h3>
            <ul className="manual-list">
              <li><strong>Estado:</strong> Riverpod con <code>NotifierProvider</code>; forms con <code>AutoDisposeNotifier</code>.</li>
              <li><strong>Routing:</strong> GoRouter con guards observando <code>authStatusProvider</code> e <code>isCreatingTaleProvider</code>.</li>
              <li><strong>Errores:</strong> <code>Either&lt;Failure, T&gt;</code> de dartz. <strong>No try-catch.</strong></li>
              <li><strong>Datos:</strong> UI → Provider → Repository → DataSource → Dio (Bearer interceptor).</li>
              <li><strong>Mapping:</strong> <code>Model</code> (JSON) y <code>Entity</code> (dominio) separados.</li>
              <li><strong>Tokens:</strong> en <code>shared_preferences</code>.</li>
              <li><strong>Tema:</strong> Material 3 + Gabarito/Space Mono via <code>google_fonts</code>. Provider de accesibilidad: dark mode + escala de fuente 0.8x–1.4x.</li>
            </ul>

            <h3 className="manual-h3">Landing (este sitio)</h3>
            <ul className="manual-list">
              <li>React 19 + Vite 6 + TypeScript + Tailwind v4 (CSS-first)</li>
              <li>HashRouter (GitHub Pages no soporta rewrite a <code>index.html</code>)</li>
              <li>Lazy loading: cada manual y la política son chunks aparte</li>
              <li>Print CSS para PDF: portada + márgenes mm + page breaks por capítulo</li>
              <li>Hidden routes: <code>/manual-tecnico</code> con <code>noindex</code> + Disallow en <code>robots.txt</code></li>
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
        number: 'VIII',
        title: 'Setup, deploy y contribución',
        subtitle: 'Cómo correr, desplegar y contribuir',
        mascot: 'ok_tailer.png',
        slug: 'ops',
        content: (
          <>
            <p className="manual-dropcap">
              Backend con Docker Compose, app con Flutter, landing con npm.
              CI/CD automatiza el deploy de la landing y manual para apps.
            </p>

            <h3 className="manual-h3">Repos</h3>
            <div className="manual-table-wrapper">
              <table className="manual-table">
                <thead><tr><th>Componente</th><th>URL</th></tr></thead>
                <tbody>
                  <tr><td>Backend</td><td><code>github.com/anfeespi/taily-backend</code></td></tr>
                  <tr><td>App móvil</td><td><code>github.com/DiegoF1311/taily-frontend</code></td></tr>
                  <tr><td>Landing</td><td><code>github.com/anfeespi/taily-landing</code></td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="manual-h3">Setup local</h3>
            <CodeBlock language="bash">{`# Backend
git clone https://github.com/anfeespi/taily-backend.git
cd taily-backend && docker-compose up --build
# Eureka:  localhost:8761  ·  Gateway:  localhost:8060

# App
git clone https://github.com/DiegoF1311/taily-frontend.git
cd taily-frontend
echo "BASE_API_URL=http://localhost:8060" > .env
flutter pub get && flutter run

# Landing
git clone https://github.com/anfeespi/taily-landing.git
cd taily-landing && npm install && npm run dev`}</CodeBlock>

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

            <h3 className="manual-h3">Deploy de la landing</h3>
            <p>
              GitHub Actions construye y publica en cada push a{' '}
              <code>main</code>. El dominio <code>taily.com.co</code> apunta a
              GitHub Pages con 4 registros A + CNAME <code>www</code> →{' '}
              <code>anfeespi.github.io</code>.
            </p>

            <h3 className="manual-h3">Convenciones</h3>
            <ul className="manual-list">
              <li><strong>Branches:</strong> <code>feat/...</code>, <code>fix/...</code>, <code>docs/...</code> desde <code>main</code>.</li>
              <li><strong>Commits:</strong> Conventional Commits (<code>feat:</code>, <code>fix:</code>, <code>refactor:</code>, etc.).</li>
              <li><strong>PR:</strong> 1 aprobación mínimo, merge squash.</li>
              <li><strong>Backend:</strong> <code>./mvnw spotless:check</code> + Javadoc en español.</li>
              <li><strong>App:</strong> <code>flutter analyze</code> + <code>flutter format .</code>; errores con <code>Either</code>.</li>
              <li><strong>Landing:</strong> ESLint + Prettier vía <code>npm run lint</code>.</li>
              <li>Tests obligatorios para nueva lógica de negocio.</li>
            </ul>

            <h3 className="manual-h3">Checklist de PR</h3>
            <ul className="manual-list">
              <li>¿Resuelve el issue descrito?</li>
              <li>¿Mantiene la separación de capas?</li>
              <li>¿Hay PII en logs nuevos? (no loggear emails, tokens, contraseñas)</li>
              <li>¿Endpoints nuevos del gateway están en <code>permitAll</code> si deben ser públicos?</li>
              <li>¿Tests proporcionales al riesgo?</li>
            </ul>

            <ManualCallout variant="farewell" label="Gracias por contribuir">
              <p>
                Cada línea termina en manos de un niño y su familia
                compartiendo un cuento. El cuidado con el que escribimos el
                código se traduce en la calidad de esa experiencia.
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
