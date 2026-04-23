type ChevronDirection = 'up' | 'down' | 'left' | 'right'

interface ChevronIconProps {
  direction?: ChevronDirection
  size?: number
  className?: string
}

const ROTATION: Record<ChevronDirection, string> = {
  down: '',
  up: 'rotate-180',
  left: 'rotate-90',
  right: '-rotate-90',
}

export default function ChevronIcon({ direction = 'down', size = 12, className = '' }: ChevronIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`${ROTATION[direction]} ${className}`}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
