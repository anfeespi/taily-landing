import StoreButton from '../ui/StoreButton'

export default function DownloadCTA() {
  const basePath = import.meta.env.BASE_URL

  return (
    <section id="descargar" className="py-16 sm:py-20 md:py-28 relative overflow-hidden paper-texture">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-container via-secondary-container to-tertiary-container" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-center">
          <div className="sm:col-span-1 lg:col-span-3 sm:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
              Comienza a crear cuentos magicos
            </h2>
            <p className="text-secondary text-base sm:text-lg mb-6 sm:mb-8">
              Descarga Taily y crea historias personalizadas que tu hijo amara.
              Disponible pronto en App Store y Google Play.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
              <StoreButton store="apple" />
              <StoreButton store="google" />
            </div>
          </div>

          <div className="sm:col-span-1 lg:col-span-2 flex justify-center">
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
