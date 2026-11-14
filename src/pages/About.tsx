import { Award } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ButtonLink from '../components/ui/ButtonLink'
import { Section } from '../components/ui/Container'
import PageHeader from '../components/ui/PageHeader'
import Photo from '../components/ui/Photo'
import SectionHeading from '../components/ui/SectionHeading'
import Testimonials from '../components/ui/Testimonials'
import { education, experience, skills } from '../content/resume'
import { about, site } from '../content/site'
import { usePageTitle } from '../lib/usePageTitle'

export default function About() {
  usePageTitle('About')
  const { hash } = useLocation()

  // Support links like /about#experience
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView()
  }, [hash])

  return (
    <>
      <PageHeader title="About Me" />

      <Section>
        <div className="grid items-center gap-14 md:grid-cols-[1fr_1.4fr]">
          <Photo />
          <div>
            <h2 className="text-3xl tracking-tight">Analytics, built around decisions</h2>
            <div className="mt-4 mb-6 h-0.5 w-12 bg-ink/35" />
            <p className="mb-4 text-lg text-ink">{site.intro}</p>
            <div className="space-y-4">
              {about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-7 text-sm">Let’s talk.</p>
            <a href={`mailto:${site.email}`} className="font-serif text-xl font-semibold text-ink underline decoration-accent-strong underline-offset-4 hover:text-accent-strong">
              {site.email}
            </a>
          </div>
        </div>
      </Section>

      <Section tint>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl tracking-tight">Tools & strengths</h2>
            <div className="mt-4 mb-6 h-0.5 w-12 bg-ink/35" />
            <p>From SQL and Tableau to experimentation and executive storytelling — the toolkit I use to take a question from raw data to a decision.</p>
            <div className="mt-7">
              <ButtonLink to="/contact">Work with me</ButtonLink>
            </div>
          </div>
          <div className="flex flex-wrap content-start gap-2">
            {skills.map((s) => (
              <span key={s} className="rounded-full bg-card px-4 py-2 text-sm text-ink shadow-soft">
                {s}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section id="experience">
        <SectionHeading title="Work Experience">From hands-on analytics and optimization to leading enterprise analytics.</SectionHeading>
        <ol className="space-y-6">
          {experience.map((j) => (
            <li key={j.company} className="grid gap-6 rounded-xl bg-card p-6 shadow-soft sm:p-8 md:grid-cols-[260px_1fr]">
              <div>
                <h3 className="text-2xl">{j.company}</h3>
                <p className="mt-1 text-sm text-muted">{j.about}</p>
                <ul className="mt-5 space-y-3 border-l-2 border-accent/40 pl-4">
                  {j.roles.map((r, i) => (
                    <li key={r.title}>
                      <p className={`text-sm ${i === 0 ? 'font-semibold text-ink' : ''}`}>{r.title}</p>
                      <p className="text-xs text-muted tabular-nums">
                        {r.start} – {r.end}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
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
                      <span key={r} className="inline-flex items-center gap-1.5 rounded-full bg-tint px-3 py-1 text-xs text-muted">
                        <Award size={12} className="text-accent" /> {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <p className="mb-3 text-sm font-semibold text-ink">Education & certifications</p>
          <ul className="space-y-1 text-sm">
            {education.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Testimonials tint />
    </>
  )
}
