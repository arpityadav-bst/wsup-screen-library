'use client'

interface AppleSignInProps {
  onClick?: () => void
  label?: string
  className?: string
  fullWidth?: boolean
}

export default function AppleSignIn({ onClick, label = 'Sign in with Apple', className = '', fullWidth = true }: AppleSignInProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${fullWidth ? 'w-full' : ''} h-[40px] px-m rounded-pill bg-black flex items-center justify-center gap-xs border border-white-20 cursor-pointer hover:bg-page-bg transition-colors ${className}`}
    >
      <AppleGlyph />
      <span className="text-sm text-white">{label}</span>
    </button>
  )
}

function AppleGlyph() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" className="shrink-0" fill="currentColor" aria-hidden>
      <path d="M13.62 13.85c-.24.55-.52 1.06-.85 1.53-.45.64-.81 1.08-1.09 1.32-.43.4-.89.6-1.39.61-.36 0-.79-.1-1.29-.31-.5-.21-.97-.31-1.4-.31-.45 0-.93.1-1.45.31-.52.21-.94.32-1.26.33-.48.02-.95-.19-1.41-.62-.3-.27-.68-.72-1.13-1.36-.49-.69-.89-1.49-1.21-2.4C.78 11.95.6 10.99.6 10.07c0-1.06.23-1.97.69-2.74.36-.61.84-1.1 1.45-1.45.6-.36 1.25-.54 1.95-.55.39 0 .9.12 1.53.36.63.24 1.04.36 1.21.36.13 0 .58-.14 1.36-.42.74-.26 1.36-.37 1.86-.33 1.36.11 2.38.65 3.06 1.62-1.21.74-1.81 1.78-1.8 3.11.01 1.04.39 1.9 1.13 2.59.34.32.71.56 1.13.74-.09.26-.19.51-.29.75zM10.97 1.6c0 .79-.29 1.53-.86 2.21-.69.81-1.53 1.28-2.43 1.21a2.46 2.46 0 0 1-.02-.3c0-.76.33-1.57.92-2.23.29-.34.66-.62 1.12-.84.45-.22.88-.34 1.28-.36.01.1.02.21.02.31z" fill="#ffffff"/>
    </svg>
  )
}
