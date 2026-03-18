import PhoneMockup from '../ui/PhoneMockup'
import SectionHeading from '../ui/SectionHeading'

const screens = [
  { src: 'assets/images/screen-home.jpeg', alt: 'Pantalla principal de Taily', label: 'Descubre cuentos' },
  { src: 'assets/images/screen-story-created.jpeg', alt: 'Cuento creado exitosamente', label: 'Crea historias' },
  { src: 'assets/images/screen-tailer-chat.jpeg', alt: 'Chat con T.A.I.L.E.R', label: 'Asistente IA' },
  { src: 'assets/images/screen-library-search.jpeg', alt: 'Biblioteca de cuentos', label: 'Tu biblioteca' },
  { src: 'assets/images/screen-tailer-welcome.jpeg', alt: 'T.A.I.L.E.R bienvenida', label: 'Conoce a T.A.I.L.E.R' },
]

export default function AppShowcase() {
  return (
    <section id="galeria" className="py-16 sm:py-20 md:py-28 overflow-hidden bg-secondary-container/20 paper-texture">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Explora la app"
          subtitle="Descubre todas las experiencias que Taily tiene para tu pequeno."
        />
      </div>

      {/* Desktop: staggered overlapping layout */}
      <div className="hidden md:block max-w-5xl mx-auto px-4">
        <div className="relative flex justify-center items-end gap-[-20px] py-8">
          {/* Left phone - tilted */}
          <div className="relative -rotate-6 translate-y-4 z-10 hover:z-30 hover:-rotate-2 hover:translate-y-0 transition-all duration-500 ease-out">
            <PhoneMockup src={screens[0].src} alt={screens[0].alt} />
            <p className="text-center mt-4 text-sm font-display font-bold text-primary">{screens[0].label}</p>
          </div>

          {/* Center phone - elevated */}
          <div className="relative z-20 -mx-6 hover:scale-105 transition-all duration-500 ease-out">
            <PhoneMockup src={screens[1].src} alt={screens[1].alt} />
            <p className="text-center mt-4 text-sm font-display font-bold text-primary">{screens[1].label}</p>
          </div>

          {/* Right phone - tilted other way */}
          <div className="relative rotate-6 translate-y-4 z-10 hover:z-30 hover:rotate-2 hover:translate-y-0 transition-all duration-500 ease-out">
            <PhoneMockup src={screens[2].src} alt={screens[2].alt} />
            <p className="text-center mt-4 text-sm font-display font-bold text-primary">{screens[2].label}</p>
          </div>
        </div>
      </div>

      {/* Mobile: horizontal scroll carousel */}
      <div className="md:hidden">
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 pb-6 -mx-2 scrollbar-hide">
          {screens.map((screen) => (
            <div key={screen.src} className="snap-center shrink-0 first:pl-2 last:pr-2">
              <PhoneMockup src={screen.src} alt={screen.alt} />
              <p className="text-center mt-3 text-xs font-display font-bold text-primary">{screen.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
