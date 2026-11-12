import ButtonLink from '../ui/ButtonLink'

// The dark "Let's work together" block from the design, shown above the footer.
export default function CtaBand() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5">
      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-band p-8 text-on-band sm:p-12 md:flex-row md:items-end">
        <div>
          <p className="text-sm opacity-60">Hiring or need a hand with data?</p>
          <h2 className="mt-2 max-w-xl text-4xl font-light tracking-tight sm:text-5xl">Let’s work together.</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <ButtonLink to="/contact" onBand>
            Get in touch
          </ButtonLink>
          <ButtonLink to="/services" variant="outline" onBand>
            See services
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
