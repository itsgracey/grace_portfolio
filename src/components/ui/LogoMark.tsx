import { useId } from 'react'

// Simple round sky-blue logo mark with diagonal stripes (original artwork).
export default function LogoMark({ className = 'size-10' }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7cc0e6" />
          <stop offset="1" stopColor="#328cc1" />
        </linearGradient>
        <clipPath id={`c${id}`}>
          <circle cx="24" cy="24" r="22" />
        </clipPath>
      </defs>
      <circle cx="24" cy="24" r="22" fill={`url(#g${id})`} />
      <g clipPath={`url(#c${id})`} stroke="#fff" strokeOpacity="0.4" strokeWidth="1">
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1={-10 + i * 5} y1="52" x2={20 + i * 5} y2="-4" />
        ))}
      </g>
    </svg>
  )
}
