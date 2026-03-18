import StoreButton from '../ui/StoreButton'

export default function Hero() {
  const basePath = import.meta.env.BASE_URL

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden paper-texture"
    >
      {/* Warm radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-container)_0%,_var(--color-surface)_50%,_var(--color-secondary-container)_100%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              Una app para dar vida a cuentos infantiles
            </h1>
            <p className="text-lg sm:text-xl text-secondary mb-8 max-w-lg mx-auto lg:mx-0 font-body leading-relaxed">
              Crea cuentos personalizados con inteligencia artificial. Historias
              unicas con texto, ilustraciones y narracion de audio para cada
              nino.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <StoreButton store="apple" />
              <StoreButton store="google" />
            </div>
          </div>

          {/* Mascot */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={`${basePath}assets/images/happy_hi_tailer.png`}
              alt="Tailer mascot"
              className="w-64 sm:w-80 lg:w-96 animate-float drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Decorative wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
            fill="var(--color-surface)"
          />
        </svg>
      </div>
    </section>
  )
}
