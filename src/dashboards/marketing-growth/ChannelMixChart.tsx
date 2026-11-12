import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useChartColors, useTheme } from '../../theme/ThemeProvider'
import { SERIES } from './colors'
import { CHANNELS, type Channel, type MonthRow } from './data'

const usd = (n: number) => `$${Math.round(n / 1000)}k`

export default function ChannelMixChart({ rows, highlight }: { rows: MonthRow[]; highlight: Channel | 'All channels' }) {
  const c = useChartColors()
  const { theme } = useTheme()
  const colors = SERIES[theme]
  const data = rows.map((r) => ({ month: r.month, ...r.spend }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ left: -4, right: 8, top: 8 }}>
        <CartesianGrid stroke={c.grid} vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: c.axis }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11, fill: c.axis }} tickLine={false} axisLine={false} tickFormatter={usd} />
        <Tooltip
          cursor={{ fill: c.grid, opacity: 0.4 }}
          formatter={(v) => `$${Number(v).toLocaleString()}`}
          contentStyle={{ borderRadius: 12, border: `1px solid ${c.grid}`, background: c.card, color: c.ink, fontSize: 12 }}
          itemStyle={{ color: c.ink }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: c.axis }} />
        {CHANNELS.map((ch, i) => (
          <Bar
            key={ch}
            dataKey={ch}
            stackId="spend"
            fill={colors[ch]}
            stroke={c.card} // 2px surface gap between stacked segments
            strokeWidth={2}
            fillOpacity={highlight === 'All channels' || highlight === ch ? 1 : 0.25}
            radius={i === CHANNELS.length - 1 ? [4, 4, 0, 0] : 0}
            maxBarSize={36}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
