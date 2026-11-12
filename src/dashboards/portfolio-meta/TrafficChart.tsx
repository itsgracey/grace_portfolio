import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useChartColors, useTheme } from '../../theme/ThemeProvider'
import type { TrafficPoint } from './data'

// Validated categorical slots 1 and 2 (blue, orange), stepped for each mode.
const COLORS = { light: { visitors: '#2a78d6', viewers: '#eb6834' }, dark: { visitors: '#3987e5', viewers: '#d95926' } }

export default function TrafficChart({ data }: { data: TrafficPoint[] }) {
  const c = useChartColors()
  const { theme } = useTheme()
  const col = COLORS[theme]
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
        <CartesianGrid stroke={c.grid} vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: c.axis }} tickLine={false} axisLine={false} minTickGap={32} />
        <YAxis tick={{ fontSize: 11, fill: c.axis }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: `1px solid ${c.grid}`, background: c.card, color: c.ink, fontSize: 12 }}
          itemStyle={{ color: c.ink }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: c.axis }} />
        <Area type="monotone" dataKey="visitors" name="Visitors" stroke={col.visitors} fill={col.visitors} fillOpacity={0.14} strokeWidth={2} />
        <Area type="monotone" dataKey="dashboardViewers" name="Opened a dashboard" stroke={col.viewers} fill={col.viewers} fillOpacity={0.14} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
