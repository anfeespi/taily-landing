import { useEffect, useRef, useState } from 'react'

interface MermaidProps {
  chart: string
  caption?: string
}

/**
 * Renders a Mermaid diagram. The mermaid library is dynamically
 * imported the first time this component is mounted, so it stays
 * out of any chunk that doesn't actually use diagrams.
 *
 * Falls back to a plain code block on render error so the manual
 * still has the diagram source available.
 */
export default function Mermaid({ chart, caption }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const { default: mermaid } = await import('mermaid')

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'base',
          fontFamily: '"Gabarito", sans-serif',
          themeVariables: {
            // Warm storybook palette matching Taily theme
            primaryColor: '#ffddb1',
            primaryTextColor: '#7f560f',
            primaryBorderColor: '#7f560f',
            lineColor: '#817567',
            secondaryColor: '#fadebc',
            secondaryBorderColor: '#a08355',
            secondaryTextColor: '#5a3f10',
            tertiaryColor: '#d3eabc',
            tertiaryBorderColor: '#516440',
            tertiaryTextColor: '#3a4a2c',
            background: '#fffefb',
            mainBkg: '#ffddb1',
            edgeLabelBackground: '#fff8f4',
            clusterBkg: '#fff5e6',
            clusterBorder: 'rgba(127, 86, 15, 0.3)',
            // Sequence diagram
            actorBkg: '#ffddb1',
            actorBorder: '#7f560f',
            actorTextColor: '#7f560f',
            actorLineColor: '#817567',
            signalColor: '#6f5b40',
            signalTextColor: '#201b13',
            labelBoxBkgColor: '#fadebc',
            labelBoxBorderColor: '#7f560f',
            labelTextColor: '#7f560f',
            loopTextColor: '#7f560f',
            noteBorderColor: '#516440',
            noteBkgColor: '#d3eabc',
            noteTextColor: '#3a4a2c',
            activationBorderColor: '#7f560f',
            activationBkgColor: '#ffddb1',
          },
        })

        const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`
        const { svg } = await mermaid.render(id, chart)

        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg
          setIsReady(true)
        }
      } catch (e) {
        if (!cancelled) {
          // eslint-disable-next-line no-console
          console.error('Mermaid render error:', e)
          setError(e instanceof Error ? e.message : 'Error rendering diagram')
        }
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [chart])

  if (error) {
    return (
      <pre className="manual-code">
        <span className="manual-code-lang" aria-hidden="true">diagrama</span>
        <code>{chart}</code>
      </pre>
    )
  }

  return (
    <figure className="manual-mermaid">
      <div
        ref={ref}
        className={`manual-mermaid-svg ${isReady ? 'is-ready' : ''}`}
        aria-label={caption || 'Diagrama'}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
