import { useMemo, useState } from 'react'
import BarList from './BarList'
import Journeys from './Journeys'
import TrafficChart from './TrafficChart'
import { DEVICES, buildTraffic, countries, trafficSources, type Device, type Range } from './data'

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
    <div role="group" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-full bg-tint p-1">
      {options.map((o) => (
        <button
          key={String(o.value)}
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${value === o.value ? 'bg-ink text-on-ink' : 'text-muted hover:text-ink'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Kpi({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-soft">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-4xl font-light tracking-tight tabular-nums">{value}</p>
      {note && <p className="mt-1 text-xs text-muted">{note}</p>}
    </div>
  )
}

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0)

export default function PortfolioMetaDashboard() {
  const [range, setRange] = useState<Range>(30)
  const [device, setDevice] = useState<Device>('All devices')

  const traffic = useMemo(() => buildTraffic(range, device), [range, device])
  const visitors = sum(traffic.map((t) => t.visitors))
  const viewers = sum(traffic.map((t) => t.dashboardViewers))
  const sources = useMemo(() => trafficSources(visitors, device), [visitors, device])
  const geo = useMemo(() => countries(visitors), [visitors])

  // Compare the second half of the period with the first half
  const half = Math.floor(traffic.length / 2)
  const earlier = sum(traffic.slice(0, half).map((t) => t.visitors))
  const later = sum(traffic.slice(half).map((t) => t.visitors))
  const change = ((later - earlier) / (earlier || 1)) * 100
  const mobile = device === 'Mobile'

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Dashboard 03 · Mock data</p>
          <h1 className="mt-1 text-5xl font-light tracking-tight">Portfolio Meta-Analytics</h1>
          <p className="mt-2 max-w-xl text-muted">
            Analytics on this very site: who visits, where they come from, and how they move through it.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <Pills label="Device" options={DEVICES.map((d) => ({ value: d, label: d }))} value={device} onChange={setDevice} />
          <Pills
            label="Date range"
            options={([7, 30, 90] as Range[]).map((d) => ({ value: d, label: `${d}d` }))}
            value={range}
            onChange={setRange}
          />
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Visitors" value={visitors.toLocaleString()} note={`${change >= 0 ? '+' : ''}${change.toFixed(0)}% vs. first half of period`} />
        <Kpi label="Page views" value={Math.round(visitors * (mobile ? 2.1 : 2.9)).toLocaleString()} note={`${(mobile ? 2.1 : 2.9).toFixed(1)} pages per visit`} />
        <Kpi label="Avg. time on site" value={mobile ? '1:12' : '2:41'} note="minutes : seconds" />
        <Kpi label="Opened a dashboard" value={`${((viewers / visitors) * 100).toFixed(0)}%`} note={`${viewers.toLocaleString()} visitors`} />
      </div>

      <div className="rounded-3xl bg-card p-6 shadow-soft">
        <h2 className="mb-4 text-xl font-medium">Daily traffic</h2>
        <TrafficChart data={traffic} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h2 className="mb-5 text-xl font-medium">Where visitors come from</h2>
          <BarList rows={sources} />
        </div>
        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h2 className="mb-5 text-xl font-medium">Visitors by country</h2>
          <BarList rows={geo} />
        </div>
      </div>

      <div className="rounded-3xl bg-card p-6 shadow-soft">
        <h2 className="mb-1 text-xl font-medium">User journeys</h2>
        <p className="mb-5 text-sm text-muted">Click a landing page to see where those visitors go next.</p>
        <Journeys sessions={visitors} />
      </div>
    </section>
  )
}
