import { useState } from 'react'
import type { FunnelStage } from './data'

// Clickable acquisition funnel: click a stage to see its drop-off.
export default function Funnel({ stages }: { stages: FunnelStage[] }) {
  const [open, setOpen] = useState(1)
  const s = stages[open]
  const prev = stages[open - 1]

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <ul className="space-y-2">
        {stages.map((st, i) => (
          <li key={st.stage}>
            <button
              onClick={() => setOpen(i)}
              aria-pressed={open === i}
              className={`group flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors ${open === i ? 'bg-tint' : 'hover:bg-tint/60'}`}
            >
              <span className={`w-28 shrink-0 text-sm text-ink ${open === i ? 'font-semibold' : ''}`}>{st.stage}</span>
              <span className="h-7 flex-1">
                <span
                  className={`block h-full rounded-r-lg transition-colors ${open === i ? 'bg-accent' : 'bg-ink/70 group-hover:bg-ink'}`}
                  style={{ width: `${Math.max(st.overallPct, 2)}%` }}
                />
              </span>
              <span className="w-20 shrink-0 text-right text-sm tabular-nums text-ink">{st.count.toLocaleString()}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="rounded-2xl bg-tint p-5" aria-live="polite">
        <p className="text-sm text-muted">{s.stage}</p>
        <p className="mt-1 text-4xl font-light tabular-nums text-ink">{s.overallPct.toFixed(s.overallPct < 1 ? 2 : 1)}%</p>
        <p className="text-xs text-muted">of all visitors</p>
        {prev ? (
          <p className="mt-4 text-sm">
            <span className="font-medium text-ink">{s.stepPct.toFixed(0)}%</span> of {prev.stage.toLowerCase()} reach this stage,
            so <span className="font-medium text-ink">{(prev.count - s.count).toLocaleString()}</span> drop off before it.
          </p>
        ) : (
          <p className="mt-4 text-sm">Everyone who landed on the site in this period.</p>
        )}
      </div>
    </div>
  )
}
