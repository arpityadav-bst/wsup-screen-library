interface InfoIconProps {
  size?: number
  className?: string
}

export default function InfoIcon({ size = 14, className }: InfoIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="12" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
