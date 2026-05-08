interface CodeBlockProps {
  language?: string
  children: string
}

/**
 * Code snippet block used in the technical manual.
 * Plain (no syntax highlighting) for bundle simplicity.
 */
export default function CodeBlock({ language, children }: CodeBlockProps) {
  return (
    <pre className="manual-code" aria-label={language ? `Código en ${language}` : 'Código'}>
      {language && <span className="manual-code-lang" aria-hidden="true">{language}</span>}
      <code>{children}</code>
    </pre>
  )
}
