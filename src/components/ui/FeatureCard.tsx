import type { Feature } from '../../data/features'

interface FeatureCardProps {
  feature: Feature
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="group bg-white/60 backdrop-blur-sm border border-primary-container/50 rounded-2xl p-6 hover:shadow-lg hover:border-primary-container transition-all duration-300 hover:-translate-y-1">
      <div className="text-4xl mb-4">{feature.icon}</div>
      <h3 className="font-display text-lg font-bold text-primary mb-2">
        {feature.title}
      </h3>
      <p className="text-secondary text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  )
}
