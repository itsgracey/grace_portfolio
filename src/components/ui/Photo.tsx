import { site } from '../../content/site'

// Portrait with the offset block behind it (like the template).
// The default image file is set in src/content/site.ts → `photo`; pass `src` / `alt` to use a different one.
export default function Photo({ className = '', src = site.photo, alt = `Portrait of ${site.name}` }: { className?: string; src?: string; alt?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-sm ${className}`}>
      <div className="absolute -right-4 -bottom-4 size-full rounded-2xl bg-ink/10" aria-hidden="true" />
      <img src={src} alt={alt} className="relative aspect-square w-full rounded-2xl bg-line object-cover" />
    </div>
  )
}
