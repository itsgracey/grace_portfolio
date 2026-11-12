import { Mail } from 'lucide-react'
import { site } from '../../content/site'
import LogoMark from '../ui/LogoMark'
import { LinkedinIcon } from '../ui/icons'

// Navy footer: social icons, logo, email, copyright.
export default function Footer() {
  return (
    <footer className="bg-band text-on-band">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pt-14 pb-8 text-center md:grid-cols-3 md:text-left">
        <div className="flex justify-center gap-3 md:justify-start">
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full border border-on-band/30 hover:bg-on-band/10">
            <LinkedinIcon size={16} />
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email" className="grid size-10 place-items-center rounded-full border border-on-band/30 hover:bg-on-band/10">
            <Mail size={16} />
          </a>
        </div>
        <div className="flex justify-center">
          <LogoMark className="size-14" />
        </div>
        <a href={`mailto:${site.email}`} className="font-serif text-xl font-semibold hover:opacity-80 md:text-right">
          {site.email}
        </a>
      </div>
      <p className="px-5 pb-10 text-center text-sm opacity-70">
        Copyright © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  )
}
