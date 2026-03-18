import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/layout/Layout'
import LandingPage from './pages/LandingPage'

const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/politica-de-privacidad"
          element={
            <Suspense fallback={<div className="min-h-screen pt-24 text-center text-secondary">Cargando...</div>}>
              <PrivacyPolicyPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
