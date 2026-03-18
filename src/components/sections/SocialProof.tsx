export default function SocialProof() {
  const basePath = import.meta.env.BASE_URL

  const stats = [
    { value: '7', label: 'Estilos de ilustracion' },
    { value: '3', label: 'Rangos de edad' },
    { value: '🔊', label: 'Audio en cada escena' },
    { value: '🔒', label: 'IA segura para ninos' },
  ]

  return (
    <section id="confianza" className="py-16 sm:py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
          {/* Stats grid */}
          <div className="w-full lg:flex-1 grid grid-cols-2 gap-3 sm:gap-4 stagger-children">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/60 border border-primary-container/50 rounded-2xl p-5 sm:p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-secondary text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mascot */}
          <div className="flex justify-center lg:w-auto shrink-0">
            <img
              src={`${basePath}assets/images/approve_tailer.png`}
              alt="Tailer aprueba"
              className="w-36 sm:w-48 md:w-56 drop-shadow-lg animate-float"
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
