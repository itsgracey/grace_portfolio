import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// The coral button from the design. `variant="outline"` gives the bordered
// version. Works for internal pages (to="/contact") and outside links
// (href="https://..." or "mailto:...").
export default function ButtonLink({
  to,
  href,
  variant = 'solid',
  children,
}: {
  to?: string
  href?: string
  variant?: 'solid' | 'outline'
  children: ReactNode
}) {
  const base = 'inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-85'
  const styles = variant === 'solid' ? 'bg-accent text-white' : 'border border-ink/25 text-ink hover:border-ink'

  if (href) {
    return (
      <a href={href} className={`${base} ${styles}`} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link to={to ?? '/'} className={`${base} ${styles}`}>
      {children}
    </Link>
  )
}
