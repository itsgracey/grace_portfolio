import { useState } from 'react'
import type { CohortRow } from './data'

interface Props {
  rows: CohortRow[]
  mode: 'percent' | 'users'
}

// Map a retention % to a background color: pale -> terracotta.
function cellColor(pct: number) {
  const t = Math.min(1, pct / 100)
  // mix between a warm off-white and the accent color
  const from = [247, 241, 235]
  const to = [200, 85, 61]
  const mix = from.map((f, i) => Math.round(f + (to[i] - f) * Math.pow(t, 0.8)))
  return `rgb(${mix.join(',')})`
}

export default function CohortHeatmap({ rows, mode }: Props) {
  const [hover, setHover] = useState<{ r: number; w: number } | null>(null)
  const weeks = rows[0]?.retention.length ?? 0

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-1 text-xs" aria-label="Retention cohort heatmap">
          <thead>
            <tr className="text-muted">
              <th className="px-2 text-left font-normal">Cohort</th>
              <th className="px-2 text-right font-normal">Users</th>
              {Array.from({ length: weeks }, (_, w) => (
                <th key={w} className={`min-w-11 font-normal ${hover?.w === w ? 'text-ink' : ''}`}>
                  W{w}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={row.cohort}>
                <td className={`px-2 py-1 font-medium ${hover?.r === r ? 'text-accent' : ''}`}>{row.cohort}</td>
                <td className="px-2 text-right text-muted tabular-nums">{row.size.toLocaleString()}</td>
                {row.retention.map((pct, w) =>
                  pct === null ? (
                    <td key={w} />
                  ) : (
                    <td
                      key={w}
                      onMouseEnter={() => setHover({ r, w })}
                      onMouseLeave={() => setHover(null)}
                      className={`h-9 cursor-default rounded-md text-center tabular-nums transition-transform hover:scale-105 ${
                        pct > 55 ? 'text-white' : 'text-ink'
                      } ${hover && hover.r !== r && hover.w !== w ? 'opacity-50' : ''}`}
                      style={{ backgroundColor: cellColor(pct) }}
                    >
                      {mode === 'percent' ? `${pct}%` : Math.round((row.size * pct) / 100).toLocaleString()}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 min-h-5 text-sm text-muted" aria-live="polite">
        {hover ? (
          <>
            <span className="text-ink">{rows[hover.r].cohort} cohort</span>: {rows[hover.r].retention[hover.w]}% (
            {Math.round((rows[hover.r].size * (rows[hover.r].retention[hover.w] ?? 0)) / 100).toLocaleString()} of{' '}
            {rows[hover.r].size.toLocaleString()}) were still active in week {hover.w}.
          </>
        ) : (
          'Hover a cell to see exact retention for that cohort and week.'
        )}
      </p>

      {/* Legend */}
      <div className="mt-2 flex items-center gap-2 text-xs text-muted">
        <span>0%</span>
        <div className="h-2 w-40 rounded-full" style={{ background: `linear-gradient(to right, ${cellColor(0)}, ${cellColor(100)})` }} />
        <span>100%</span>
      </div>
    </div>
  )
}
