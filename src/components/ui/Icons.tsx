const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'w-8 h-8 sm:w-9 sm:h-9 text-primary',
  'aria-hidden': true as const,
}

export function SparkleIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      <path d="M19 2L19.5 4L21.5 4.5L19.5 5L19 7L18.5 5L16.5 4.5L18.5 4L19 2Z" strokeWidth="1.5" />
    </svg>
  )
}

export function AudioIcon() {
  return (
    <svg {...iconProps}>
      <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor" opacity="0.15" stroke="none" />
      <path d="M11 5L6 9H2V15H6L11 19V5Z" />
      <path d="M15.54 8.46C16.48 9.4 17 10.67 17 12C17 13.33 16.48 14.6 15.54 15.54" />
      <path d="M18.07 5.93C19.53 7.39 20.36 9.37 20.36 11.43C20.36 13.5 19.53 15.48 18.07 16.93" />
    </svg>
  )
}

export function PaletteIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C12.83 22 13.5 21.33 13.5 20.5C13.5 20.12 13.37 19.78 13.14 19.51C12.92 19.24 12.8 18.91 12.8 18.5C12.8 17.67 13.47 17 14.3 17H16C19.31 17 22 14.31 22 11C22 6.03 17.52 2 12 2Z" fill="currentColor" opacity="0.1" stroke="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C12.83 22 13.5 21.33 13.5 20.5C13.5 20.12 13.37 19.78 13.14 19.51C12.92 19.24 12.8 18.91 12.8 18.5C12.8 17.67 13.47 17 14.3 17H16C19.31 17 22 14.31 22 11C22 6.03 17.52 2 12 2Z" />
      <circle cx="7.5" cy="11.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="18" cy="11.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function BotIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="8" width="18" height="12" rx="3" fill="currentColor" opacity="0.1" stroke="none" />
      <rect x="3" y="8" width="18" height="12" rx="3" />
      <circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 2V5" />
      <circle cx="12" cy="2" r="1" fill="currentColor" stroke="none" />
      <path d="M1 13H3" />
      <path d="M21 13H23" />
    </svg>
  )
}

export function ChildIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="7" r="4" fill="currentColor" opacity="0.1" stroke="none" />
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21C5.5 17.41 8.41 14.5 12 14.5C15.59 14.5 18.5 17.41 18.5 21" />
      <path d="M16 4L17 2" strokeWidth="1.5" />
      <path d="M18 5.5L20 5" strokeWidth="1.5" />
    </svg>
  )
}

export function BookIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 19.5C4 18.12 5.12 17 6.5 17H20" />
      <path d="M4 4.5C4 3.12 5.12 2 6.5 2H20V22H6.5C5.12 22 4 20.88 4 19.5V4.5Z" fill="currentColor" opacity="0.1" stroke="none" />
      <path d="M6.5 2H20V22H6.5C5.12 22 4 20.88 4 19.5V4.5C4 3.12 5.12 2 6.5 2Z" />
      <path d="M8 7H16" />
      <path d="M8 11H13" />
    </svg>
  )
}

export function ShieldIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="currentColor" opacity="0.1" stroke="none" />
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" />
      <path d="M9 12L11 14L15 10" />
    </svg>
  )
}
