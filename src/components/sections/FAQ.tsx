import SectionHeading from '../ui/SectionHeading'
import FAQItem from '../ui/FAQItem'
import { faqItems } from '../../data/faq'

export default function FAQ() {
  return (
    <section id="preguntas" className="py-16 sm:py-20 md:py-28 bg-secondary-container/20 paper-texture">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Preguntas Frecuentes" />

        <div className="space-y-3 stagger-children">
          {faqItems.map((item) => (
            <FAQItem key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
