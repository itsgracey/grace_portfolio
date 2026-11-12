// The portfolio gallery. `ready: false` shows a "Coming soon" card.
// `preview` is the thumbnail image (light + dark versions in public/previews).

export interface DashboardInfo {
  slug: string // used in the URL: /portfolio/<slug>
  number: string
  name: string
  description: string
  tags: string[]
  ready: boolean
  preview?: string // e.g. 'product-analytics' → /previews/product-analytics-light.jpg
}

export const dashboards: DashboardInfo[] = [
  {
    slug: 'marketing-growth',
    number: '01',
    name: 'Marketing & Growth',
    description: 'Channel mix, CAC vs. LTV and a clickable acquisition funnel.',
    tags: ['Acquisition', 'LTV : CAC', 'Funnel'],
    ready: false,
  },
  {
    slug: 'product-analytics',
    number: '02',
    name: 'Product Analytics',
    description: 'Weekly signup cohorts, retention decay and DAU/MAU stickiness by segment.',
    tags: ['Retention', 'Cohorts', 'Engagement'],
    ready: true,
    preview: 'product-analytics',
  },
  {
    slug: 'portfolio-meta',
    number: '03',
    name: 'Portfolio Meta-Analytics',
    description: 'Analytics on this very site: traffic, where visitors come from and how they move through it.',
    tags: ['Traffic', 'Geo', 'User journeys'],
    ready: false,
  },
]
