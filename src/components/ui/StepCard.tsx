import type { Step } from '../../data/steps'

interface StepCardProps {
  step: Step
  index: number
}

export default function StepCard({ step, index }: StepCardProps) {
  const basePath = import.meta.env.BASE_URL

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <div className="w-10 h-10 rounded-full bg-primary text-white font-display font-bold flex items-center justify-center text-sm absolute -top-2 -right-2 z-10">
          {index + 1}
        </div>
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-tertiary-container/40 flex items-center justify-center p-3">
          <img
            src={`${basePath}${step.image.slice(1)}`}
            alt={step.title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <h3 className="font-display text-base font-bold text-primary mb-1">
        {step.title}
      </h3>
      <p className="text-secondary text-sm leading-relaxed max-w-[200px]">
        {step.description}
      </p>
    </div>
  )
}
