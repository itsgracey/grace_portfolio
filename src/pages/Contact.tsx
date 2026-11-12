import { Mail } from 'lucide-react'
import ButtonLink from '../components/ui/ButtonLink'
import { Section } from '../components/ui/Container'
import PageHeader from '../components/ui/PageHeader'
import { LinkedinIcon } from '../components/ui/icons'
import { site } from '../content/site'
import { usePageTitle } from '../lib/usePageTitle'

export default function Contact() {
  usePageTitle('Contact')

  const cards = [
    { icon: <Mail size={26} />, title: site.email, note: 'Email me any time', href: `mailto:${site.email}` },
    { icon: <LinkedinIcon size={26} />, title: 'LinkedIn', note: 'Connect with me', href: site.linkedin },
  ]

  return (
    <>
      <PageHeader title="Contact" />
      <Section>
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {cards.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="rounded-xl bg-card p-8 text-center shadow-soft transition-transform hover:-translate-y-1"
            >
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-accent/12 text-accent">{c.icon}</div>
              <p className="mt-4 font-serif text-lg font-semibold break-all text-ink">{c.title}</p>
              <p className="mt-1 text-sm text-muted">{c.note}</p>
            </a>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-xl bg-tint p-8 text-center sm:p-12">
          <h2 className="text-3xl tracking-tight">Message Me</h2>
          <div className="mx-auto mt-4 mb-6 h-0.5 w-12 bg-accent" />
          <p>Whether you’re hiring for an analytics role or need help with a data question, I’d love to hear from you.</p>
          <div className="mt-7">
            <ButtonLink href={`mailto:${site.email}`}>Send an email</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
