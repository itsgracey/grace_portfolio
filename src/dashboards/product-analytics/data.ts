// Mock data for the Product Analytics dashboard.
// Everything is generated from a seeded random function so the numbers are
// identical on every reload. Later, replace these functions with a fetch().

export type Segment = 'All users' | 'Free' | 'Pro' | 'Enterprise'
export const SEGMENTS: Segment[] = ['All users', 'Free', 'Pro', 'Enterprise']

export interface CohortRow {
  cohort: string // e.g. "Aug 03"
  size: number // users who signed up that week
  retention: (number | null)[] // % retained at week 0..11 (null = not yet observed)
}

export interface EngagementPoint {
  date: string
  dau: number
  mau: number
  ratio: number // DAU / MAU as a percentage
}

// Small deterministic random number generator (mulberry32)
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

// Higher = stickier. Enterprise retains best, Free worst.
const STICKINESS: Record<Segment, { decay: number; floor: number; size: number }> = {
  'All users': { decay: 0.55, floor: 0.18, size: 1000 },
  Free: { decay: 0.7, floor: 0.08, size: 650 },
  Pro: { decay: 0.45, floor: 0.27, size: 280 },
  Enterprise: { decay: 0.3, floor: 0.45, size: 70 },
}

const WEEKS = 12

export function buildCohorts(segment: Segment): CohortRow[] {
  const { decay, floor, size } = STICKINESS[segment]
  const rand = rng(42 + SEGMENTS.indexOf(segment))
  const start = new Date('2026-08-03T12:00:00')

  return Array.from({ length: WEEKS }, (_, i) => {
    const d = new Date(start)
    d.setDate(d.getDate() + i * 7)
    const label = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
    const observedWeeks = WEEKS - i // newer cohorts have fewer weeks of history
    const cohortSize = Math.round(size * (0.85 + rand() * 0.35))
    const retention = Array.from({ length: WEEKS }, (_, w) => {
      if (w >= observedWeeks) return null
      if (w === 0) return 100
      const base = floor + (1 - floor) * Math.exp(-w * decay)
      return Math.max(0, Math.min(100, Math.round(base * 100 * (0.94 + rand() * 0.12))))
    })
    return { cohort: label, size: cohortSize, retention }
  })
}

export function buildEngagement(segment: Segment, days: number): EngagementPoint[] {
  const { floor, size } = STICKINESS[segment]
  const rand = rng(7 + SEGMENTS.indexOf(segment))
  const mauBase = size * 22
  const out: EngagementPoint[] = []
  const end = new Date('2026-10-25T12:00:00')
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end)
    d.setDate(d.getDate() - i)
    const weekend = [0, 6].includes(d.getDay())
    const trend = 1 + ((days - i) / days) * 0.12
    const mau = Math.round(mauBase * trend * (0.98 + rand() * 0.04))
    const stick = (0.14 + floor * 0.35) * (weekend ? 0.8 : 1.05) * (0.95 + rand() * 0.1)
    const dau = Math.round(mau * stick)
    out.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dau,
      mau,
      ratio: Math.round((dau / mau) * 1000) / 10,
    })
  }
  return out
}
