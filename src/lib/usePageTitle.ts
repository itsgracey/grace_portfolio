import { useEffect } from 'react'
import { site } from '../content/site'

// Sets the browser-tab title for a page, e.g. "Experience · Grace Yuen".
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${site.name}` : `${site.name} · ${site.role}`
  }, [title])
}
