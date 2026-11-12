import { Section } from '../components/ui/Container'
import DashboardCard from '../components/ui/DashboardCard'
import PageHeader from '../components/ui/PageHeader'
import SectionHeading from '../components/ui/SectionHeading'
import { dashboards } from '../content/dashboards'
import { usePageTitle } from '../lib/usePageTitle'

export default function Portfolio() {
  usePageTitle('Portfolio')

  return (
    <>
      <PageHeader title="Portfolio" />
      <Section>
        <SectionHeading title="Interactive Dashboards">
          Each dashboard answers a real kind of business question. Click through, filter and hover. All data is simulated.
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-3">
          {dashboards.map((d) => (
            <DashboardCard key={d.slug} d={d} />
          ))}
        </div>
      </Section>
    </>
  )
}
