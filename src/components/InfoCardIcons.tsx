/**
 * Inline SVG icons — qo'shimcha fayl yuklanmaydi, juda yengil.
 * Bir xil o'lcham va uslub (yengil yuklanish + chiroyli ko'rinish).
 */

const size = 40
const className = 'info-card-svg'

export function IconSelfSignup() {
  return (
    <span className={className} aria-hidden>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#f3f4f6" />
        <rect x="10" y="10" width="20" height="20" rx="8" fill="#374151" />
        <text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">W</text>
      </svg>
    </span>
  )
}

export function IconHourglass() {
  return (
    <span className={className} aria-hidden>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#f3f4f6" />
        <rect x="10" y="10" width="20" height="20" rx="8" fill="#374151" />
        <path d="M14 14h12l-6 7 6 7H14l6-7-6-7z" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="2.5" fill="#f59e0b" />
      </svg>
    </span>
  )
}

export function IconStore() {
  return (
    <span className={className} aria-hidden>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#f3f4f6" />
        <rect x="10" y="10" width="20" height="20" rx="8" fill="#374151" />
        <path d="M12 22l8-7 8 7v7H12v-7z" fill="#ef4444" />
        <path d="M12 23h16v6H12z" fill="#d6a066" />
        <rect x="17" y="25" width="6" height="4" rx="1" fill="#eab308" />
        <rect x="14" y="23" width="2.5" height="2.5" rx="0.5" fill="#4ade80" />
        <rect x="23" y="23" width="2.5" height="2.5" rx="0.5" fill="#4ade80" />
      </svg>
    </span>
  )
}
