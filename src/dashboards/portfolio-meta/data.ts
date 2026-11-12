// Mock data for the Portfolio Meta-Analytics dashboard (analytics on this site).
// Seeded random numbers, so every reload shows identical figures.
// Later, replace these functions with real analytics (e.g. a fetch() to your
// analytics provider) and keep the return shapes the same.

export type Range = 7 | 30 | 90
export type Device = 'All devices' | 'Desktop' | 'Mobile'
export const DEVICES: Device[] = ['All devices', 'Desktop', 'Mobile']

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

const DEVICE_SHARE: Record<Device, number> = { 'All devices': 1, Desktop: 0.62, Mobile: 0.38 }
// Mobile visitors are less likely to open a dashboard.
const DASH_RATE: Record<Device, number> = { 'All devices': 0.34, Desktop: 0.46, Mobile: 0.16 }

export interface TrafficPoint {
  date: string
  visitors: number
  dashboardViewers: number
}

export function buildTraffic(range: Range, device: Device): TrafficPoint[] {
  const rand = rng(11 + DEVICES.indexOf(device))
  const end = new Date('2026-11-12T12:00:00')
  const out: TrafficPoint[] = []
  for (let i = range - 1; i >= 0; i--) {
    const d = new Date(end)
    d.setDate(d.getDate() - i)
    const weekday = ![0, 6].includes(d.getDay())
    const trend = 1 + ((90 - i) / 90) * 0.5 // traffic has grown over the last 90 days
    const spike = i === 12 ? 2.1 : i === 40 ? 1.6 : 1 // e.g. a LinkedIn post that did well
    const visitors = Math.round(95 * DEVICE_SHARE[device] * trend * spike * (weekday ? 1.15 : 0.7) * (0.88 + rand() * 0.24))
    out.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      visitors,
      dashboardViewers: Math.round(visitors * DASH_RATE[device] * (0.9 + rand() * 0.2)),
    })
  }
  return out
}

export interface Slice {
  name: string
  visitors: number
}

function split(total: number, shares: [string, number][]): Slice[] {
  const sum = shares.reduce((a, [, s]) => a + s, 0)
  return shares.map(([name, s]) => ({ name, visitors: Math.round((total * s) / sum) })).sort((a, b) => Number(a.name.startsWith('Other')) - Number(b.name.startsWith('Other')) || b.visitors - a.visitors) // "Other" always last
}

// Mobile traffic skews toward LinkedIn (people tap links in the app).
export function trafficSources(total: number, device: Device): Slice[] {
  const m = device === 'Mobile'
  return split(total, [
    ['LinkedIn', m ? 46 : 30],
    ['Google search', m ? 14 : 24],
    ['Direct', 20],
    ['GitHub', m ? 4 : 11],
    ['Other referrals', 12],
  ])
}

export function countries(total: number): Slice[] {
  return split(total, [
    ['United States', 52],
    ['United Kingdom', 9],
    ['Canada', 8],
    ['Germany', 6],
    ['India', 6],
    ['Other', 19],
  ])
}

export const PAGES = ['Home', 'About', 'Portfolio', 'Marketing dashboard', 'Product dashboard', 'Contact'] as const
export type Page = (typeof PAGES)[number]
export type Next = Page | 'Left the site'

// Where visitors land first (share of sessions), and where they go next.
const ENTRY_SHARE: Record<Page, number> = {
  Home: 46,
  About: 14,
  Portfolio: 18,
  'Marketing dashboard': 9,
  'Product dashboard': 11,
  Contact: 2,
}
const NEXT: Record<Page, [Next, number][]> = {
  Home: [['Portfolio', 34], ['About', 22], ['Contact', 6], ['Left the site', 38]],
  About: [['Portfolio', 31], ['Contact', 14], ['Home', 8], ['Left the site', 47]],
  Portfolio: [['Product dashboard', 30], ['Marketing dashboard', 24], ['About', 8], ['Left the site', 38]],
  'Marketing dashboard': [['Portfolio', 28], ['Product dashboard', 14], ['Contact', 9], ['Left the site', 49]],
  'Product dashboard': [['Portfolio', 27], ['Marketing dashboard', 15], ['Contact', 8], ['Left the site', 50]],
  Contact: [['Home', 10], ['About', 12], ['Left the site', 78]],
}

export interface EntryRow {
  page: Page
  sessions: number
}
export interface NextRow {
  to: Next
  sessions: number
  pct: number
}

export function entryPages(total: number): EntryRow[] {
  const sum = Object.values(ENTRY_SHARE).reduce((a, b) => a + b, 0)
  return PAGES.map((page) => ({ page, sessions: Math.round((total * ENTRY_SHARE[page]) / sum) })).sort((a, b) => b.sessions - a.sessions)
}

export function nextSteps(page: Page, sessions: number): NextRow[] {
  const sum = NEXT[page].reduce((a, [, s]) => a + s, 0)
  return NEXT[page]
    .map(([to, s]) => ({ to, sessions: Math.round((sessions * s) / sum), pct: (s / sum) * 100 }))
    .sort((a, b) => b.sessions - a.sessions)
}
