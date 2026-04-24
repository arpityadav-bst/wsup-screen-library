'use client'

interface CloseButtonProps {
  onClose: () => void
  size?: number
  className?: string
  ariaLabel?: string
}

export default function CloseButton({ onClose, size = 20, className = '', ariaLabel = 'Close' }: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label={ariaLabel}
      className={`p-icon-btn rounded-full hover:bg-white-10 transition-colors text-white-90 border-none bg-transparent cursor-pointer shrink-0 ${className}`}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  )
}
