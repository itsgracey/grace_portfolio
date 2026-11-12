import { Area, AreaChart, CartesianGrid, Line, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useChartColors } from '../../theme/ThemeProvider'
import type { EngagementPoint } from './data'

export default function EngagementChart({ data }: { data: EngagementPoint[] }) {
  const c = useChartColors() // light or dark palette
  const tooltipStyle = { borderRadius: 12, border: `1px solid ${c.grid}`, background: c.card, color: c.ink, fontSize: 12 }
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <p className="mb-2 text-sm text-muted">DAU vs. MAU</p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
            <CartesianGrid stroke={c.grid} vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: c.axis }} tickLine={false} axisLine={false} minTickGap={32} />
            <YAxis tick={{ fontSize: 11, fill: c.axis }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="mau" name="MAU" stroke={c.lilac} fill={c.lilac} fillOpacity={0.15} strokeWidth={2} />
            <Area type="monotone" dataKey="dau" name="DAU" stroke={c.accent} fill={c.accent} fillOpacity={0.2} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted">Stickiness (DAU / MAU, %)</p>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
            <CartesianGrid stroke={c.grid} vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: c.axis }} tickLine={false} axisLine={false} minTickGap={32} />
            <YAxis tick={{ fontSize: 11, fill: c.axis }} tickLine={false} axisLine={false} unit="%" domain={['auto', 'auto']} />
            <Tooltip formatter={(v) => `${v}%`} contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="ratio" name="DAU/MAU" stroke={c.ink} strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
