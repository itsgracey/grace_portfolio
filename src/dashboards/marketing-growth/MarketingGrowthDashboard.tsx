import { useMemo, useState } from 'react'
import CacLtvBars from './CacLtvBars'
import ChannelMixChart from './ChannelMixChart'
import Funnel from './Funnel'
import { CHANNELS, channelStats, funnel, monthsFor, type Channel, type Range } from './data'

type Selection = Channel | 'All channels'
const SELECTIONS: Selection[] = ['All channels', ...CHANNELS]

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

export default function MarketingGrowthDashboard() {
  // Everything on the page is derived from these two values (plus the funnel click)
  const [selected, setSelected] = useState<Selection>('All channels')
  const [range, setRange] = useState<Range>(6)

  const rows = useMemo(() => monthsFor(range), [range])
  const stats = useMemo(() => channelStats(range), [range])
  const stages = useMemo(() => funnel(range, selected), [range, selected])

  const scope = selected === 'All channels' ? stats : stats.filter((s) => s.channel === selected)
  const spend = sum(scope.map((s) => s.spend))
  const customers = sum(scope.map((s) => s.customers))
  const cac = spend / (customers || 1)
  const ltv = sum(scope.map((s) => s.ltv * s.customers)) / (customers || 1)

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Dashboard 01 · Mock data</p>
          <h1 className="mt-1 text-5xl font-light tracking-tight">Marketing & Growth by Grace</h1>
          <p className="mt-2 max-w-xl text-muted">
            Where spend goes, what each channel's customers cost versus what they're worth, and where visitors drop out of the funnel.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <Pills label="Channel" options={SELECTIONS.map((s) => ({ value: s, label: s }))} value={selected} onChange={setSelected} />
          <Pills
            label="Date range"
            options={([3, 6, 12] as Range[]).map((m) => ({ value: m, label: `${m}M` }))}
            value={range}
            onChange={setRange}
          />
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Marketing spend" value={`$${Math.round(spend / 1000).toLocaleString()}k`} note={`last ${range} months`} />
        <Kpi label="New customers" value={customers.toLocaleString()} />
        <Kpi label="Blended CAC" value={`$${Math.round(cac).toLocaleString()}`} note="spend per new customer" />
        <Kpi label="LTV : CAC" value={`${(ltv / cac).toFixed(1)}x`} note="3x or higher is healthy" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h2 className="mb-4 text-xl font-medium">Spend by channel</h2>
          <ChannelMixChart rows={rows} highlight={selected} />
        </div>
        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h2 className="mb-1 text-xl font-medium">CAC vs. LTV</h2>
          <p className="mb-5 text-sm text-muted">Click a channel to filter the whole page.</p>
          <CacLtvBars stats={stats} selected={selected} onSelect={setSelected} />
        </div>
      </div>

      <div className="rounded-3xl bg-card p-6 shadow-soft">
        <h2 className="mb-1 text-xl font-medium">Acquisition funnel</h2>
        <p className="mb-5 text-sm text-muted">{selected}. Click a stage for its drop-off.</p>
        <Funnel stages={stages} />
      </div>
    </section>
  )
}
