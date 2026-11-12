import type { Slice } from './data'

// Ranked horizontal bars. One series, so one color; the label names each bar.
export default function BarList({ rows }: { rows: Slice[] }) {
  const total = rows.reduce((a, r) => a + r.visitors, 0)
  const max = Math.max(...rows.map((r) => r.visitors))
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.name} className="group">
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-ink">{r.name}</span>
            <span className="tabular-nums text-muted">
              {r.visitors.toLocaleString()} <span className="text-xs">({((r.visitors / total) * 100).toFixed(0)}%)</span>
            </span>
          </div>
          <div className="h-2.5">
            <div
              className="h-full rounded-r-md bg-[#2a78d6] transition-opacity group-hover:opacity-80 dark:bg-[#3987e5]"
              style={{ width: `${(r.visitors / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
