import DashboardCard from '../components/ui/DashboardCard'
import SectionHeading from '../components/ui/SectionHeading'
import { dashboards } from '../content/dashboards'
import { usePageTitle } from '../lib/usePageTitle'

export default function Dashboards() {
  usePageTitle('Dashboards')

  return (
    <div>
      <SectionHeading eyebrow="Dashboards" title="Interactive work samples">
        Each dashboard answers a real kind of business question. Click through, filter and hover. All data is simulated.
      </SectionHeading>
      <div className="grid gap-4 md:grid-cols-3">
        {dashboards.map((d) => (
          <DashboardCard key={d.slug} d={d} />
        ))}
      </div>
    </div>
  )
}
