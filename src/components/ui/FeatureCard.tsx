import type { Feature } from '../../data/features'
import {
  SparkleIcon,
  AudioIcon,
  PaletteIcon,
  BotIcon,
  ChildIcon,
  BookIcon,
} from './Icons'

const iconMap = {
  sparkle: SparkleIcon,
  audio: AudioIcon,
  palette: PaletteIcon,
  bot: BotIcon,
  child: ChildIcon,
  book: BookIcon,
}

interface FeatureCardProps {
  feature: Feature
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = iconMap[feature.iconName]

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-primary-container/50 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:border-primary-container transition-all duration-300 hover:-translate-y-1">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-container/40 flex items-center justify-center mb-3 sm:mb-4">
        <Icon />
      </div>
      <h3 className="font-display text-base sm:text-lg font-bold text-primary mb-2">
        {feature.title}
      </h3>
      <p className="text-secondary text-xs sm:text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  )
}
