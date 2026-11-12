import { site } from '../../content/site'

// Portrait with the coral offset block behind it (like the template).
// The image file is set in src/content/site.ts → `photo`.
export default function Photo({ className = '' }: { className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-sm ${className}`}>
      <div className="absolute -right-4 -bottom-4 size-full rounded-2xl bg-accent" aria-hidden="true" />
      <img src={site.photo} alt={`Portrait of ${site.name}`} className="relative aspect-4/5 w-full rounded-2xl bg-line object-cover" />
    </div>
  )
}
