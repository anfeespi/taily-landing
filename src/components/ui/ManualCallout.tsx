import type { ReactNode } from 'react'

type CalloutVariant = 'tip' | 'info' | 'important' | 'success' | 'farewell'

interface ManualCalloutProps {
  variant?: CalloutVariant
  label?: string
  children: ReactNode
}

const variantConfig: Record<CalloutVariant, { defaultLabel: string; icon: ReactNode }> = {
  tip: {
    defaultLabel: 'Tip',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7c.5.4.9.9 1 1.5l.1.8h5.8l.1-.8c.1-.6.5-1.1 1-1.5A7 7 0 0 0 12 2Z" />
      </svg>
    ),
  },
  info: {
    defaultLabel: 'Sabias que',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
  },
  important: {
    defaultLabel: 'Importante',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 9v4" />
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  success: {
    defaultLabel: 'Recuerda',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  farewell: {
    defaultLabel: 'Con carino',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
}

export default function ManualCallout({
  variant = 'tip',
  label,
  children,
}: ManualCalloutProps) {
  const config = variantConfig[variant]
  const displayLabel = label ?? config.defaultLabel

  return (
    <aside className={`callout callout-${variant}`}>
      <div className="callout-icon" aria-hidden="true">
        {config.icon}
      </div>
      <div className="callout-body">
        <div className="callout-label">{displayLabel}</div>
        <div className="callout-content">{children}</div>
      </div>
    </aside>
  )
}
