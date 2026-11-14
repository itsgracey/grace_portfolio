import ButtonLink from '../components/ui/ButtonLink'
import { Section } from '../components/ui/Container'
import { usePageTitle } from '../lib/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <Section className="text-center">
      <p className="text-sm font-semibold text-accent-strong">404</p>
      <h1 className="mt-2 text-5xl tracking-tight">This page doesn’t exist</h1>
      <div className="mt-8">
        <ButtonLink to="/">Back to home</ButtonLink>
      </div>
    </Section>
  )
}
