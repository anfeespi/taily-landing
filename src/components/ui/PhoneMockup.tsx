interface PhoneMockupProps {
  src: string
  alt: string
  className?: string
}

export default function PhoneMockup({ src, alt, className = '' }: PhoneMockupProps) {
  const basePath = import.meta.env.BASE_URL

  return (
    <div className={`phone-mockup ${className}`}>
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
