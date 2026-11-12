import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Theme = 'light' | 'dark'

// Chart libraries (Recharts) need real color values, not CSS variables,
// so the same palette as index.css is repeated here for charts.
export const CHART_COLORS = {
  light: { grid: '#e8ebf1', axis: '#6b7385', ink: '#0e2a5c', card: '#ffffff', accent: '#ee5a52', lilac: '#8e86c4', sage: '#8a9a82', heatLow: [255, 244, 243], heatHigh: [238, 90, 82] },
  dark: { grid: '#23324f', axis: '#8f9cb5', ink: '#e8edf7', card: '#14223c', accent: '#ff6f66', lilac: '#a49de0', sage: '#a3b29b', heatLow: [26, 38, 62], heatHigh: [238, 90, 82] },
} as const

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'light', toggle: () => {} })

// First visit: follow the visitor's system setting. After that: remember their choice.
function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* storage blocked — fall through */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
export const useChartColors = () => CHART_COLORS[useTheme().theme]
