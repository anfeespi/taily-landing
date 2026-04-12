import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'
import StepCard from '../ui/StepCard'
import { steps } from '../../data/steps'

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 sm:py-20 md:py-28 bg-secondary-container/20 paper-texture">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Cómo funciona"
          subtitle="En solo 4 pasos, crea un cuento único para tu pequeño."
        />

        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-[72px] left-[12%] right-[12%] h-0.5 bg-primary-container" aria-hidden="true" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 stagger-children">
            {steps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Manual CTA */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center text-center">
          <p className="text-secondary text-sm sm:text-base mb-4 max-w-md">
            ¿Quieres conocer todas las funciones a fondo? Lee la guía completa paso a paso.
          </p>
          <Link
            to="/manual"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm sm:text-base no-underline hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Ver manual completo
          </Link>
        </div>
      </div>
    </section>
  )
}
