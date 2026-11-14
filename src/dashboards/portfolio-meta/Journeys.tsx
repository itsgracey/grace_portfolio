import { useState } from 'react'
import { entryPages, nextSteps, type Page } from './data'

// Click a landing page to see where those visitors go next.
export default function Journeys({ sessions }: { sessions: number }) {
  const entries = entryPages(sessions)
  const [page, setPage] = useState<Page>('Home')
  const current = entries.find((e) => e.page === page) ?? entries[0]
  const next = nextSteps(current.page, current.sessions)
  const maxEntry = Math.max(...entries.map((e) => e.sessions))

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <p className="mb-2 text-sm text-muted">1. Where visitors land</p>
        <ul className="space-y-1">
          {entries.map((e) => (
            <li key={e.page}>
              <button
                onClick={() => setPage(e.page)}
                aria-pressed={page === e.page}
                className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors ${page === e.page ? 'bg-tint' : 'hover:bg-tint/60'}`}
              >
                <span className={`w-40 shrink-0 text-sm text-ink ${page === e.page ? 'font-semibold' : ''}`}>{e.page}</span>
                <span className="h-5 flex-1">
                  <span
                    className={`block h-full rounded-r-md ${page === e.page ? 'bg-accent' : 'bg-ink/70'}`}
                    style={{ width: `${(e.sessions / maxEntry) * 100}%` }}
                  />
                </span>
                <span className="w-14 shrink-0 text-right text-sm tabular-nums text-ink">{e.sessions.toLocaleString()}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div aria-live="polite">
        <p className="mb-2 text-sm text-muted">
          2. After <span className="font-medium text-ink">{current.page}</span>, visitors go to
        </p>
        <ul className="space-y-1">
          {next.map((n) => (
            <li key={n.to} className="flex items-center gap-3 p-2">
              <span className={`w-40 shrink-0 text-sm ${n.to === 'Left the site' ? 'text-muted' : 'text-ink'}`}>{n.to}</span>
              <span className="h-5 flex-1">
                <span
                  className={`block h-full rounded-r-md ${n.to === 'Left the site' ? 'bg-muted/40' : n.to === 'Contact' ? 'bg-accent' : 'bg-ink/70'}`}
                  style={{ width: `${n.pct}%` }}
                />
              </span>
              <span className="w-20 shrink-0 text-right text-sm tabular-nums text-ink">{n.pct.toFixed(0)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
