interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-24 h-1 rounded-full bg-primary-container" />
    </div>
  )
}
