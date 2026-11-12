import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { site } from '../../content/site'
import LogoMark from '../ui/LogoMark'
import ThemeToggle from '../ui/ThemeToggle'

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false) // mobile menu

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm transition-colors ${isActive ? 'font-semibold text-accent' : 'text-ink hover:text-accent'}`

  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)} aria-label={`${site.name} — home`}>
          <LogoMark className="size-10" />
          <span className="hidden font-serif text-lg font-semibold text-ink sm:inline">{site.name}</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-4 md:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkCls}>
              {n.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/contact" className="hidden rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:opacity-85 sm:inline-flex">
            Hire Me
          </Link>
          <button
            className="grid size-10 place-items-center rounded-md border border-line text-ink md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col border-t border-line bg-paper px-5 py-2 md:hidden">
          {[...NAV, { to: '/contact', label: 'Hire Me' }].map((n) => (
            <NavLink key={n.label} to={n.to} end={n.to === '/'} className={linkCls} onClick={() => setOpen(false)}>
              {n.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
