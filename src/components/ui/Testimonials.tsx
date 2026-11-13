import { useState } from 'react'
import { Quote } from 'lucide-react'
import { testimonials, type Testimonial } from '../../content/site'
import { Section } from './Container'
import SectionHeading from './SectionHeading'

function TestimonialCard({ t }: { t: Testimonial }) {
  const [open, setOpen] = useState(false)
  const expandable = !!t.full && t.full.length > 0

  return (
    <figure className="flex flex-col rounded-xl bg-card p-8 text-center shadow-soft">
      <Quote size={22} className="mx-auto text-accent" />
      <blockquote className="mt-4 flex-1 space-y-3 text-sm leading-relaxed">
        {open && t.full ? t.full.map((p, i) => <p key={i}>{p}</p>) : <p>{t.quote}</p>}
      </blockquote>
      {expandable && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-4 cursor-pointer text-xs font-semibold text-accent underline-offset-4 hover:underline"
        >
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
      <div className="mx-auto my-5 h-0.5 w-8 bg-accent" />
      <figcaption>
        <p className="text-sm font-semibold text-ink">{t.name}</p>
        <p className="text-xs text-muted">{t.role}</p>
      </figcaption>
    </figure>
  )
}

// "What People Say" cards. Renders nothing until testimonials are added
// in src/content/site.ts. Cards with a `full` field get a "Read more" toggle.
export default function Testimonials({ tint = false }: { tint?: boolean }) {
  if (testimonials.length === 0) return null
  return (
    <Section tint={tint}>
      <SectionHeading title="What People Say">Kind words from former managers and colleagues.</SectionHeading>
      <div className="grid items-start gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </div>
    </Section>
  )
}
