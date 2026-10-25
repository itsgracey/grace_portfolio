import { useMemo, useState } from 'react'
import CohortHeatmap from './CohortHeatmap'
import EngagementChart from './EngagementChart'
import { SEGMENTS, buildCohorts, buildEngagement, type Segment } from './data'

// Reusable pill-style toggle group (matches the black pill buttons in the design)
function Pills<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  label: string
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex gap-1 rounded-full bg-paper p-1">
      {options.map((o) => (
        <button
          key={String(o.value)}
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            value === o.value ? 'bg-ink text-white' : 'text-muted hover:text-ink'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Kpi({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl bg-card p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-4xl font-light tracking-tight tabular-nums">{value}</p>
      {note && <p className="mt-1 text-xs text-muted">{note}</p>}
    </div>
  )
}

const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / (xs.length || 1)

export default function ProductAnalyticsDashboard() {
  // ---- State: everything on the page is derived from these 4 values ----
  const [segment, setSegment] = useState<Segment>('All users')
  const [mode, setMode] = useState<'percent' | 'users'>('percent')
  const [days, setDays] = useState<30 | 60 | 90>(60)

  const cohorts = useMemo(() => buildCohorts(segment), [segment])
  const engagement = useMemo(() => buildEngagement(segment, days), [segment, days])

  // ---- Derived KPIs ----
  const wk = (n: number) => avg(cohorts.flatMap((c) => (c.retention[n] == null ? [] : [c.retention[n] as number])))
  const latest = engagement[engagement.length - 1]
  const first = engagement[0]

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Dashboard 02 · Mock data</p>
          <h1 className="mt-1 text-5xl font-light tracking-tight">Product Analytics by Grace</h1>
          <p className="mt-2 max-w-xl text-muted">
            Weekly signup by cohort, retention decay, and DAU/MAU stickiness by customer segment.
          </p>
        </div>
        <Pills
          label="Segment"
          options={SEGMENTS.map((s) => ({ value: s, label: s }))}
          value={segment}
          onChange={setSegment}
        />
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Week 1 retention" value={`${wk(1).toFixed(0)}%`} note="avg across cohorts" />
        <Kpi label="Week 4 retention" value={`${wk(4).toFixed(0)}%`} note="avg across cohorts" />
        <Kpi label="DAU / MAU" value={`${latest.ratio}%`} note={`${(latest.ratio - first.ratio).toFixed(1)} pts vs ${days} days ago`} />
        <Kpi label="Monthly active users" value={latest.mau.toLocaleString()} note={`${latest.dau.toLocaleString()} daily active`} />
      </div>

      <div className="rounded-3xl bg-card p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-medium">Retention cohorts</h2>
          <Pills
            label="Heatmap values"
            options={[
              { value: 'percent', label: '% retained' },
              { value: 'users', label: 'Users' },
            ]}
            value={mode}
            onChange={setMode}
          />
        </div>
        <CohortHeatmap rows={cohorts} mode={mode} />
      </div>

      <div className="rounded-3xl bg-card p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-medium">Engagement</h2>
          <Pills
            label="Date range"
            options={[30, 60, 90].map((d) => ({ value: d as 30 | 60 | 90, label: `${d}d` }))}
            value={days}
            onChange={setDays}
          />
        </div>
        <EngagementChart data={engagement} />
      </div>
    </section>
  )
}
