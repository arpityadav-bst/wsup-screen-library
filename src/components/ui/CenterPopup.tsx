'use client'

import { useEffect } from 'react'
import CloseButton from './CloseButton'

interface CenterPopupProps {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  maxWidth?: string
  zIndex?: number
  surfaceClassName?: string
  surfaceStyle?: React.CSSProperties
  children: React.ReactNode
}

export default function CenterPopup({ open, onClose, title, subtitle, maxWidth = '420px', zIndex = 50, surfaceClassName, surfaceStyle, children }: CenterPopupProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 hidden md:flex items-center justify-center" style={{ zIndex }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black-55"
        style={{ animation: 'fade-in 0.2s ease-out' }}
      />
      {/* Card */}
      <div
        className={`relative rounded-popup border border-white-10 shadow-popup flex flex-col overflow-hidden w-full ${surfaceClassName ?? 'bg-profile-sheet-bg'}`}
        style={{ maxWidth, maxHeight: '80vh', animation: 'slide-up 0.24s cubic-bezier(0.32,0.72,0,1)', ...surfaceStyle }}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-l py-s border-b border-white-10 shrink-0">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base text-text-title">{title}</p>
              {subtitle && <p className="text-xs text-text-dim mt-xxs">{subtitle}</p>}
            </div>
            <CloseButton onClose={onClose} />
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto scroll-hide">{children}</div>
      </div>
    </div>
  )
}
