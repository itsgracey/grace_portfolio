import { ArrowRight, ChartLine, Compass, Mail, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import ButtonLink from '../components/ui/ButtonLink'
import { Section } from '../components/ui/Container'
import DashboardCard from '../components/ui/DashboardCard'
import Photo from '../components/ui/Photo'
import SectionHeading from '../components/ui/SectionHeading'
import Testimonials from '../components/ui/Testimonials'
import { LinkedinIcon } from '../components/ui/icons'
import { dashboards } from '../content/dashboards'
import { experience } from '../content/resume'
import { about, site } from '../content/site'
import { services } from '../content/services'
import { usePageTitle } from '../lib/usePageTitle'

const SERVICE_ICONS = [Compass, ChartLine, Users]

export default function Home() {
  usePageTitle()

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="bg-tint">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-[1.2fr_1fr] md:py-20">
          <div>
            <p className="text-sm font-semibold tracking-wide text-accent-strong uppercase">{site.role}</p>
            <h1 className="mt-3 text-5xl leading-tight tracking-tight sm:text-6xl">
              Hi, I’m
              <br />
              {site.name}
            </h1>
            <p className="mt-5 max-w-lg text-lg">{site.tagline}</p>
            <p className="mt-3 max-w-lg text-sm text-muted">{site.focus}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink to="/portfolio">View dashboards</ButtonLink>
              <ButtonLink to="/about" variant="outline">
                About me
              </ButtonLink>
              <div className="ml-2 flex gap-2 text-ink">
                <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full hover:text-accent-strong">
                  <LinkedinIcon />
                </a>
                <a href={`mailto:${site.email}`} aria-label="Email" className="grid size-10 place-items-center rounded-full hover:text-accent-strong">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
          <Photo />
        </div>
      </section>

      {/* ---------- About ---------- */}
      <Section>
        <SectionHeading title="About Me">{site.intro}</SectionHeading>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-2xl">Turning data into decisions</h3>
            <div className="mt-3 mb-5 h-0.5 w-12 bg-ink/35" />
            <div className="space-y-4">
              {about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-7">
              <ButtonLink to="/contact">Contact me</ButtonLink>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              ['15+', 'years in analytics'],
              ['290', 'developers supported by the Visualization Center of Excellence'],
              ['3,402', 'users served by the Tableau cloud migration'],
              ['35', 'executive and operational dashboards built at BitTorrent'],
            ].map(([n, label]) => (
              <li key={label} className="rounded-xl bg-card p-6 shadow-soft">
                <p className="font-serif text-4xl font-semibold text-ink">{n}</p>
                <p className="mt-2 text-sm">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------- Services ---------- */}
      <Section tint id="services">
        <SectionHeading title="What I Offer">Consulting engagements for teams that want clearer answers from their data.</SectionHeading>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length]
            return (
              <div key={s.name} className="flex flex-col rounded-xl bg-card p-8 text-center shadow-soft">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-accent/12 text-accent">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-xl">{s.name}</h3>
                <p className="mt-3 flex-1 text-sm">{s.description}</p>
                <ul className="mt-5 space-y-1.5 text-sm text-muted">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <Link to="/contact" aria-label={`Ask about ${s.name}`} className="mx-auto mt-6 grid size-9 place-items-center rounded-full border border-line text-ink hover:border-accent hover:text-accent-strong-strong">
                  <ArrowRight size={16} />
                </Link>
              </div>
            )
          })}
        </div>
      </Section>

      {/* ---------- Experience ---------- */}
      <Section>
        <SectionHeading title="Work Experience">Where I’ve built analytics.</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2">
          {experience.map((j) => (
            <div key={j.company} className="rounded-xl bg-card p-6 shadow-soft">
              <h3 className="text-xl">{j.company}</h3>
              <p className="mt-1 text-sm font-semibold text-accent-strong">{j.roles[0].title}</p>
              <p className="text-xs text-muted tabular-nums">
                {j.roles[j.roles.length - 1].start} – {j.roles[0].end}
              </p>
              <p className="mt-3 text-sm">{j.about}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <ButtonLink to="/about#experience" variant="outline">
            Full experience
          </ButtonLink>
        </div>
      </Section>

      {/* ---------- Portfolio ---------- */}
      <Section tint>
        <SectionHeading title="My Portfolio">Interactive dashboards you can click through. Data is simulated.</SectionHeading>
        <div className="grid gap-6 md:grid-cols-3">
          {dashboards.map((d) => (
            <DashboardCard key={d.slug} d={d} />
          ))}
        </div>
      </Section>

      <Testimonials />
    </>
  )
}
