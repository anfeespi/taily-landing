import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useLayoutEffect } from 'react'
import Layout from './components/layout/Layout'
import LandingPage from './pages/LandingPage'

const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const UserManualPage = lazy(() => import('./pages/UserManualPage'))

const fallback = (
  <div className="min-h-screen pt-24 text-center text-secondary">Cargando...</div>
)

/**
 * Scrolls window to top whenever the route changes.
 * Uses useLayoutEffect + temporary disable of CSS smooth scroll
 * so the jump is instant and never visually flashes the previous
 * scroll position.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    requestAnimationFrame(() => {
      html.style.scrollBehavior = prev
    })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/politica-de-privacidad"
            element={
              <Suspense fallback={fallback}>
                <PrivacyPolicyPage />
              </Suspense>
            }
          />
          <Route
            path="/manual"
            element={
              <Suspense fallback={fallback}>
                <UserManualPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  )
}
