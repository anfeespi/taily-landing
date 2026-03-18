import { useState } from 'react'
import type { FAQItem as FAQItemType } from '../../data/faq'

interface FAQItemProps {
  item: FAQItemType
}

export default function FAQItem({ item }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-primary-container/50 rounded-xl overflow-hidden bg-white/40">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left hover:bg-primary-container/20 transition-colors cursor-pointer min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      >
        <span className="font-display text-sm md:text-base font-bold text-primary pr-4">
          {item.question}
        </span>
        <span
          className={`text-primary text-xl transition-transform duration-300 shrink-0 ${
            isOpen ? 'rotate-45' : ''
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 sm:px-6 pb-4 text-secondary text-sm leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}
