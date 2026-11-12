// Mock data for the Marketing & Growth dashboard.
// Seeded random numbers, so every reload shows identical figures.
// Later, replace these functions with a fetch() to a real source.

export type Channel = 'Paid Search' | 'Paid Social' | 'Organic' | 'Other'
export const CHANNELS: Channel[] = ['Paid Search', 'Paid Social', 'Organic', 'Other']
export type Range = 3 | 6 | 12

// Per-channel profile: monthly spend, cost per visitor, funnel conversion
// rates between stages, and revenue per customer (LTV).
const PROFILE: Record<Channel, { spend: number; cpv: number; rates: number[]; ltv: number }> = {
  'Paid Search': { spend: 42000, cpv: 1.9, rates: [0.052, 0.38, 0.31, 0.72], ltv: 1180 },
  'Paid Social': { spend: 31000, cpv: 1.15, rates: [0.034, 0.3, 0.24, 0.62], ltv: 760 },
  Organic: { spend: 20000, cpv: 1.8, rates: [0.046, 0.41, 0.36, 0.78], ltv: 1340 },
  Other: { spend: 6000, cpv: 0.9, rates: [0.03, 0.33, 0.28, 0.66], ltv: 640 },
}

export const STAGES = ['Visitors', 'Signups', 'Trials', 'Paid customers', 'Retained 90d'] as const

function rng(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export interface MonthRow {
  month: string
  spend: Record<Channel, number>
  customers: Record<Channel, number>
  visitors: Record<Channel, number>
}

const MONTHS = 12

// Twelve months ending Oct 2026; spend grows ~2% a month with noise.
const ALL: MonthRow[] = (() => {
  const rand = rng(2026)
  return Array.from({ length: MONTHS }, (_, i) => {
    const d = new Date(2025, 10 + i, 1)
    const row: MonthRow = {
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      spend: {} as MonthRow['spend'],
      customers: {} as MonthRow['customers'],
      visitors: {} as MonthRow['visitors'],
    }
    for (const ch of CHANNELS) {
      const p = PROFILE[ch]
      const spend = Math.round(p.spend * (1 + i * 0.02) * (0.93 + rand() * 0.14))
      const visitors = Math.round((spend / p.cpv) * (0.95 + rand() * 0.1))
      const [r1, r2, r3] = p.rates
      row.spend[ch] = spend
      row.visitors[ch] = visitors
      row.customers[ch] = Math.round(visitors * r1 * r2 * r3 * (0.94 + rand() * 0.12))
    }
    return row
  })
})()

export const monthsFor = (range: Range) => ALL.slice(-range)

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0)

export interface ChannelStats {
  channel: Channel
  spend: number
  customers: number
  cac: number
  ltv: number
  ratio: number
}

export function channelStats(range: Range): ChannelStats[] {
  const rows = monthsFor(range)
  return CHANNELS.map((channel) => {
    const spend = sum(rows.map((r) => r.spend[channel]))
    const customers = sum(rows.map((r) => r.customers[channel]))
    const cac = spend / (customers || 1)
    const ltv = PROFILE[channel].ltv
    return { channel, spend, customers, cac: Math.round(cac), ltv, ratio: Math.round((ltv / cac) * 10) / 10 }
  })
}

export interface FunnelStage {
  stage: (typeof STAGES)[number]
  count: number
  // % of the previous stage that made it here (100 for the first stage)
  stepPct: number
  // % of all visitors that made it here
  overallPct: number
}

export function funnel(range: Range, channel: Channel | 'All channels'): FunnelStage[] {
  const rows = monthsFor(range)
  const chans = channel === 'All channels' ? CHANNELS : [channel]
  const visitors = sum(chans.flatMap((c) => rows.map((r) => r.visitors[c])))
  // Weight each channel's stage rates by its visitors
  const counts = [visitors]
  for (let s = 0; s < 4; s++) {
    counts.push(
      sum(
        chans.map((c) => {
          const v = sum(rows.map((r) => r.visitors[c]))
          return v * PROFILE[c].rates.slice(0, s + 1).reduce((a, b) => a * b, 1)
        }),
      ),
    )
  }
  return counts.map((n, i) => ({
    stage: STAGES[i],
    count: Math.round(n),
    stepPct: i === 0 ? 100 : (n / counts[i - 1]) * 100,
    overallPct: (n / counts[0]) * 100,
  }))
}
