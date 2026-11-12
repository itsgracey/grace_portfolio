import type { ReactNode } from 'react'

// Keeps content a comfortable width and centered.
export default function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 ${className}`}>{children}</div>
}

// A full-width horizontal band. `tint` gives the soft pink background.
export function Section({ children, tint = false, id, className = '' }: { children: ReactNode; tint?: boolean; id?: string; className?: string }) {
  return (
    <section id={id} className={`py-16 sm:py-20 ${tint ? 'bg-tint' : ''} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
