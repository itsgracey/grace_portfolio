import { Quote } from 'lucide-react'
import { testimonials } from '../../content/site'
import { Section } from './Container'
import SectionHeading from './SectionHeading'

// "What People Say" cards. Renders nothing until testimonials are added
// in src/content/site.ts.
export default function Testimonials({ tint = false }: { tint?: boolean }) {
  if (testimonials.length === 0) return null
  return (
    <Section tint={tint}>
      <SectionHeading title="What People Say">Kind words from colleagues and clients.</SectionHeading>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="flex flex-col rounded-xl bg-card p-8 text-center shadow-soft">
            <Quote size={22} className="mx-auto text-accent" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed">{t.quote}</blockquote>
            <div className="mx-auto my-5 h-0.5 w-8 bg-accent" />
            <figcaption>
              <p className="text-sm font-semibold text-ink">{t.name}</p>
              <p className="text-xs text-muted">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
