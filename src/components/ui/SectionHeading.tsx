import type { ReactNode } from 'react'

// Centered serif heading with a short navy rule, used on every section.
export default function SectionHeading({ title, children, align = 'center' }: { title: string; children?: ReactNode; align?: 'center' | 'left' }) {
  const a = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <div className={`mb-12 max-w-2xl ${a}`}>
      <h2 className="text-3xl tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="mt-3 text-muted">{children}</p>}
      <div className={`mt-5 h-0.5 w-16 bg-ink/35 ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  )
}
