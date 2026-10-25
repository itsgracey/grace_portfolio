import { Area, AreaChart, CartesianGrid, Line, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { EngagementPoint } from './data'

export default function EngagementChart({ data }: { data: EngagementPoint[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <p className="mb-2 text-sm text-muted">DAU vs. MAU</p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
            <CartesianGrid stroke="#e4e2db" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#77756f' }} tickLine={false} axisLine={false} minTickGap={32} />
            <YAxis tick={{ fontSize: 11, fill: '#77756f' }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e4e2db', fontSize: 12 }} />
            <Area type="monotone" dataKey="mau" name="MAU" stroke="#8e86c4" fill="#8e86c4" fillOpacity={0.15} strokeWidth={2} />
            <Area type="monotone" dataKey="dau" name="DAU" stroke="#c8553d" fill="#c8553d" fillOpacity={0.2} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted">Stickiness (DAU / MAU, %)</p>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
            <CartesianGrid stroke="#e4e2db" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#77756f' }} tickLine={false} axisLine={false} minTickGap={32} />
            <YAxis tick={{ fontSize: 11, fill: '#77756f' }} tickLine={false} axisLine={false} unit="%" domain={['auto', 'auto']} />
            <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: 12, border: '1px solid #e4e2db', fontSize: 12 }} />
            <Line type="monotone" dataKey="ratio" name="DAU/MAU" stroke="#141414" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
