import { ArrowUpRight, ChartColumn } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { DashboardInfo } from '../../content/dashboards'

// One card in the portfolio gallery. Ready dashboards show a live preview
// and link to their page; unfinished ones show "Coming soon".
export default function DashboardCard({ d }: { d: DashboardInfo }) {
  const thumb = d.preview ? (
    <>
      <img src={`/previews/${d.preview}-light.jpg`} alt={`${d.name} dashboard preview`} className="size-full object-cover object-top dark:hidden" loading="lazy" />
      <img src={`/previews/${d.preview}-dark.jpg`} alt="" className="hidden size-full object-cover object-top dark:block" loading="lazy" />
    </>
  ) : (
    <div className="grid size-full place-items-center bg-linear-to-br from-accent/25 via-tint to-ink/10">
      <ChartColumn size={40} className="text-accent/70" />
    </div>
  )

  const body = (
    <>
      <div className="aspect-16/10 overflow-hidden border-b border-line bg-tint">{thumb}</div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between text-sm text-muted">
          <span>Dashboard {d.number}</span>
          {d.ready ? (
            <ArrowUpRight size={18} className="text-accent" />
          ) : (
            <span className="rounded-full border border-line px-2.5 py-0.5 text-xs">Coming soon</span>
          )}
        </div>
        <h3 className="mt-3 text-xl">{d.name}</h3>
        <p className="mt-2 text-sm">{d.description}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {d.tags.map((t) => (
            <span key={t} className="rounded-full bg-tint px-2.5 py-1 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  )

  const cls = 'group flex flex-col overflow-hidden rounded-xl bg-card shadow-soft transition-transform'
  return d.ready ? (
    <Link to={`/portfolio/${d.slug}`} className={`${cls} hover:-translate-y-1`}>
      {body}
    </Link>
  ) : (
    <div className={`${cls} opacity-75`}>{body}</div>
  )
}
