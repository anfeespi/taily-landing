import SectionHeading from '../ui/SectionHeading'
import StepCard from '../ui/StepCard'
import { steps } from '../../data/steps'

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 sm:py-28 bg-secondary-container/20 paper-texture">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Como funciona"
          subtitle="En solo 4 pasos, crea un cuento unico para tu pequeno."
        />

        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-[72px] left-[12%] right-[12%] h-0.5 bg-primary-container" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 stagger-children">
            {steps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
