import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function useScrollTo() {
  const navigate = useNavigate()
  const location = useLocation()

  const scrollTo = useCallback(
    (sectionId: string) => {
      const scroll = () => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }

      if (location.pathname !== '/') {
        navigate('/')
        requestAnimationFrame(() => {
          requestAnimationFrame(scroll)
        })
      } else {
        scroll()
      }
    },
    [navigate, location.pathname]
  )

  return scrollTo
}
