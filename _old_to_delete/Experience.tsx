import { Award } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import { education, experience, skills } from '../content/resume'
import { usePageTitle } from '../lib/usePageTitle'

export default function Experience() {
  usePageTitle('Experience')

  return (
    <div>
      <SectionHeading eyebrow="Experience" title="15+ years in analytics">
        From hands-on analytics and optimization to leading enterprise analytics.
      </SectionHeading>

      <ol className="space-y-4">
        {experience.map((j) => (
          <li key={j.company} className="grid gap-6 rounded-3xl bg-card p-6 sm:p-8 md:grid-cols-[260px_1fr]">
            {/* Left: company + roles (promotions stack newest first) */}
            <div>
              <p className="text-2xl font-light tracking-tight">{j.company}</p>
              <p className="mt-1 text-sm text-muted">{j.about}</p>
              <ul className="mt-5 space-y-3 border-l border-line pl-4">
                {j.roles.map((r, i) => (
                  <li key={r.title}>
                    <p className={`text-sm ${i === 0 ? 'font-medium' : ''}`}>{r.title}</p>
                    <p className="text-xs text-muted tabular-nums">
                      {r.start} – {r.end}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: highlights + recognition */}
            <div>
              <ul className="space-y-2.5">
                {j.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
              {j.recognition && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {j.recognition.map((r) => (
                    <span key={r} className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 text-xs text-muted">
                      <Award size={12} className="text-accent" /> {r}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm text-muted">Tools & strengths</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span key={s} className="rounded-full bg-card px-3 py-1.5 text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm text-muted">Education & certifications</p>
          <ul className="space-y-2 text-sm">
            {education.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
