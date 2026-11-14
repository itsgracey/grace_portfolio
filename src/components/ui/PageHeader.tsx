// Title banner at the top of About / Portfolio / Contact.
export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="bg-tint py-14 text-center sm:py-20">
      <h1 className="text-4xl tracking-tight sm:text-5xl">{title}</h1>
      <div className="mx-auto mt-5 h-0.5 w-16 bg-ink/35" />
    </div>
  )
}
