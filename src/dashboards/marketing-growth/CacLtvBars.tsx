import { useTheme } from '../../theme/ThemeProvider'
import { SERIES } from './colors'
import type { Channel, ChannelStats } from './data'

// Two thin bars per channel: what it costs to win a customer (CAC) vs. what
// that customer is worth (LTV). Same dollar axis, so no dual-axis problem.
export default function CacLtvBars({
  stats,
  selected,
  onSelect,
}: {
  stats: ChannelStats[]
  selected: Channel | 'All channels'
  onSelect: (c: Channel | 'All channels') => void
}) {
  const { theme } = useTheme()
  const colors = SERIES[theme]
  const max = Math.max(...stats.map((s) => Math.max(s.cac, s.ltv)))

  return (
    <ul className="space-y-5">
      {stats.map((s) => {
        const active = selected === 'All channels' || selected === s.channel
        return (
          <li key={s.channel} className={`transition-opacity ${active ? '' : 'opacity-40'}`}>
            <button
              onClick={() => onSelect(selected === s.channel ? 'All channels' : s.channel)}
              aria-pressed={selected === s.channel}
              className="block w-full text-left"
            >
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-ink">
                  <span className="size-2.5 rounded-full" style={{ background: colors[s.channel] }} />
                  {s.channel}
                </span>
                <span className="text-muted tabular-nums">LTV : CAC {s.ratio}x</span>
              </div>
              {(
                [
                  ['CAC', s.cac, 'var(--color-muted)'],
                  ['LTV', s.ltv, colors[s.channel]],
                ] as const
              ).map(([label, value, fill]) => (
                <div key={label} className="mt-1 flex items-center gap-3 text-xs">
                  <span className="w-8 text-muted">{label}</span>
                  <div className="h-2.5 flex-1">
                    <div className="h-full rounded-r-md" style={{ width: `${(value / max) * 100}%`, background: fill }} />
                  </div>
                  <span className="w-14 text-right tabular-nums text-ink">${value.toLocaleString()}</span>
                </div>
              ))}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
