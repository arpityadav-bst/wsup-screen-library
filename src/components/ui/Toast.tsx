'use client'

import { useEffect } from 'react'

interface ToastProps {
  open: boolean
  message: string
  onClose: () => void
  durationMs?: number
}

export default function Toast({ open, message, onClose, durationMs = 4000 }: ToastProps) {
  useEffect(() => {
    if (!open) return
    const t = setTimeout(onClose, durationMs)
    return () => clearTimeout(t)
  }, [open, onClose, durationMs])

  if (!open) return null

  return (
    <>
      {/* Mobile-only top gradient scrim — darkens the top area for toast readability over the character image bg */}
      <div
        className="md:hidden fixed left-0 right-0 top-0 z-[79] pointer-events-none"
        style={{
          height: 220,
          background: 'linear-gradient(to bottom, var(--black-80) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
          animation: 'fade-in 0.2s ease-out',
        }}
        aria-hidden
      />

      {/* Toast — top on both mobile and desktop */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-[80] pointer-events-none top-[80px]"
        role="status"
        aria-live="polite"
      >
        <div
          className="pointer-events-auto backdrop-blur-popup bg-black-60 border border-white-10 rounded-card shadow-popup px-m py-s w-[calc(100vw-32px)] md:w-auto md:max-w-[520px]"
          style={{ animation: 'fade-in 0.2s ease-out' }}
        >
          <p className="text-sm text-white-90 leading-snug md:whitespace-nowrap">{message}</p>
        </div>
      </div>
    </>
  )
}
