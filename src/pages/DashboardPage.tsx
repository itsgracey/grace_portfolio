import { ArrowLeft } from 'lucide-react'
import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Section } from '../components/ui/Container'
import { dashboards } from '../content/dashboards'
import { usePageTitle } from '../lib/usePageTitle'
import NotFound from './NotFound'

// Each dashboard is loaded only when someone opens it ("lazy"), so the
// homepage stays fast. Add new dashboards here once they're built.
const COMPONENTS: Record<string, LazyExoticComponent<ComponentType>> = {
  'marketing-growth': lazy(() => import('../dashboards/marketing-growth/MarketingGrowthDashboard')),
  'product-analytics': lazy(() => import('../dashboards/product-analytics/ProductAnalyticsDashboard')),
}

export default function DashboardPage() {
  const { slug = '' } = useParams()
  const info = dashboards.find((d) => d.slug === slug)
  usePageTitle(info?.name)

  const Dashboard = COMPONENTS[slug]
  if (!info || !Dashboard) return <NotFound />

  return (
    <Section tint className="min-h-[70vh] !pt-8">
      <Link to="/portfolio" className="mb-8 inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
        <ArrowLeft size={14} /> All dashboards
      </Link>
      <Dashboard />
    </Section>
  )
}
