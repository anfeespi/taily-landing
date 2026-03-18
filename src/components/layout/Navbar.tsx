import { useState, useEffect } from 'react'
import { useScrollTo } from '../../hooks/useScrollTo'

const navLinks = [
  { label: 'Inicio', section: 'hero' },
  { label: 'Funciones', section: 'funciones' },
  { label: 'Como Funciona', section: 'como-funciona' },
  { label: 'FAQ', section: 'preguntas' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const scrollTo = useScrollTo()
  const basePath = import.meta.env.BASE_URL

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (section: string) => {
    scrollTo(section)
    setIsMobileOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
          >
            <img
              src={`${basePath}assets/images/tailer.png`}
              alt="Taily"
              className="w-8 h-8"
            />
            <span className="font-display font-bold text-xl text-primary">
              Taily
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => handleNavClick(link.section)}
                className="text-secondary hover:text-primary transition-colors text-sm font-medium cursor-pointer bg-transparent border-none"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('descargar')}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer border-none"
            >
              Descargar
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-primary cursor-pointer bg-transparent border-none"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <div className="bg-surface/95 backdrop-blur-md border-t border-primary-container/30 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.section}
              onClick={() => handleNavClick(link.section)}
              className="block w-full text-left px-4 py-3 text-secondary hover:text-primary hover:bg-primary-container/20 rounded-lg transition-colors text-sm font-medium cursor-pointer bg-transparent border-none"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('descargar')}
            className="block w-full text-center px-4 py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer border-none"
          >
            Descargar
          </button>
        </div>
      </div>
    </nav>
  )
}
