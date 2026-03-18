import StoreButton from '../ui/StoreButton'

export default function DownloadCTA() {
  const basePath = import.meta.env.BASE_URL

  return (
    <section id="descargar" className="py-20 sm:py-28 relative overflow-hidden paper-texture">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-container via-secondary-container to-tertiary-container" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3 md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Comienza a crear cuentos magicos
            </h2>
            <p className="text-secondary text-lg mb-8">
              Descarga Taily y crea historias personalizadas que tu hijo amara.
              Disponible pronto en App Store y Google Play.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <StoreButton store="apple" />
              <StoreButton store="google" />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <img
              src={`${basePath}assets/images/happy_tailer.png`}
              alt="Tailer feliz"
              className="w-44 sm:w-56 drop-shadow-lg animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
