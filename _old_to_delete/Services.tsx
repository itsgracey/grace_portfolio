import { Check } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import { services } from '../content/services'
import { usePageTitle } from '../lib/usePageTitle'

export default function Services() {
  usePageTitle('Services')

  return (
    <div>
      <SectionHeading eyebrow="Services" title="How I can help">
        Consulting engagements for teams that want clearer answers from their data.
      </SectionHeading>

      <div className="grid gap-4 md:grid-cols-3">
        {services.map((s, i) => (
          <div key={s.name} className="flex flex-col rounded-3xl bg-card p-6 sm:p-8">
            <p className="text-sm text-muted tabular-nums">0{i + 1}</p>
            <h3 className="mt-8 text-2xl font-light tracking-tight">{s.name}</h3>
            <p className="mt-2 text-sm text-muted">{s.description}</p>
            <ul className="mt-6 space-y-2 border-t border-line pt-5">
              {s.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-sm">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
