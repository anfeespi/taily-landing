interface PhoneMockupProps {
  src: string
  alt: string
  className?: string
  landscape?: boolean
}

export default function PhoneMockup({ src, alt, className = '', landscape = false }: PhoneMockupProps) {
  const basePath = import.meta.env.BASE_URL

  return (
    <div className={`phone-mockup ${landscape ? 'phone-mockup-landscape' : ''} ${className}`}>
      <div className="phone-notch" />
      <img
        src={`${basePath}${src}`}
        alt={alt}
        className="phone-screen"
        loading="lazy"
        draggable={false}
      />
    </div>
  )
}
