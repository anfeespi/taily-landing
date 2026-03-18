import { Link } from 'react-router-dom'
import { useScrollTo } from '../../hooks/useScrollTo'

export default function Footer() {
  const scrollTo = useScrollTo()

  return (
    <footer className="bg-inverse-surface text-inverse-on-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display font-bold text-xl mb-2">Taily</h3>
            <p className="text-inverse-on-surface/70 text-sm">
              Una app para dar vida a cuentos infantiles
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-sm mb-3">Enlaces</h4>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', section: 'hero' },
                { label: 'Funciones', section: 'funciones' },
                { label: 'FAQ', section: 'preguntas' },
              ].map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => scrollTo(link.section)}
                    className="text-inverse-on-surface/70 hover:text-inverse-on-surface text-sm transition-colors cursor-pointer bg-transparent border-none p-0"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/politica-de-privacidad"
                  className="text-inverse-on-surface/70 hover:text-inverse-on-surface text-sm transition-colors no-underline"
                >
                  Politica de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm mb-3">Contacto</h4>
            <a
              href="mailto:taily.dev.mail@gmail.com"
              className="text-inverse-on-surface/70 hover:text-inverse-on-surface text-sm transition-colors no-underline"
            >
              taily.dev.mail@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-inverse-on-surface/20 text-center text-inverse-on-surface/50 text-xs">
          &copy; 2026 Taily. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
