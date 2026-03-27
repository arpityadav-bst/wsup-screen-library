export default function TrendArrow({ trend, className = '' }: { trend: number; className?: string }) {
  if (trend === 0) return null
  const up = trend > 0
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`block shrink-0 ${className}`}>
      {up ? (
        <path d="M5 8.5V1.5M2 4.5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M5 1.5v7M2 5.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}
