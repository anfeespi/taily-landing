import StoreButton from '../ui/StoreButton'

export default function DownloadCTA() {
  const basePath = import.meta.env.BASE_URL

  return (
    <section id="descargar" className="py-16 sm:py-20 md:py-28 relative overflow-hidden paper-texture">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-container via-secondary-container to-tertiary-container" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-center text-center lg:text-left">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
              Comienza a crear cuentos magicos
            </h2>
            <p className="text-secondary text-base sm:text-lg mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0">
              Descarga Taily y crea historias personalizadas que tu hijo amara.
              Disponible pronto en App Store y Google Play.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center lg:items-start">
              <StoreButton store="apple" />
              <StoreButton store="google" />
            </div>
          </div>

          <div className="shrink-0 flex justify-center">
            <img
              src={`${basePath}assets/images/happy_tailer.png`}
              alt="Tailer feliz"
              className="w-32 sm:w-44 lg:w-56 drop-shadow-lg animate-float"
              loading="lazy"
              width={224}
              height={224}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
