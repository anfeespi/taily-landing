import SectionHeading from '../ui/SectionHeading'
import FeatureCard from '../ui/FeatureCard'
import { features } from '../../data/features'

export default function Features() {
  return (
    <section id="funciones" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Todo lo que Taily ofrece"
          subtitle="Herramientas disenadas para crear experiencias de lectura magicas para los mas pequenos."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
