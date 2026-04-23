interface ExternalLinkIconProps {
  size?: number
  className?: string
}

export default function ExternalLinkIcon({ size = 12, className = 'ml-1 shrink-0' }: ExternalLinkIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M5.25 3H10.5C10.78 3 11 3.22 11 3.5V8.75" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M3 11L10.5 3.5" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}
