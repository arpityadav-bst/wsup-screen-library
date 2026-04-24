'use client'

import { useEffect } from 'react'
import CloseButton from './CloseButton'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  maxHeight?: string
  fillHeight?: boolean
  zIndex?: number
  surfaceClassName?: string
  surfaceStyle?: React.CSSProperties
  children: React.ReactNode
}

export default function BottomSheet({ open, onClose, title, subtitle, maxHeight = '82%', fillHeight = false, zIndex = 60, surfaceClassName, surfaceStyle, children }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 md:hidden" style={{ zIndex }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black-55"
        style={{ animation: 'fade-in 0.2s ease-out' }}
      />
      {/* Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 rounded-t-popup border-t border-white-10 flex flex-col overflow-hidden shadow-big ${surfaceClassName ?? 'bg-profile-sheet-bg'}`}
        style={{ maxHeight, height: fillHeight ? maxHeight : undefined, animation: 'slide-up 0.28s cubic-bezier(0.32,0.72,0,1)', ...surfaceStyle }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-s pb-0 shrink-0">
          <div className="w-[36px] h-[4px] rounded-pill bg-white-30" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-l py-s border-b border-white-10 shrink-0">
            <div>
              <p className="font-semibold text-base text-text-title">{title}</p>
              {subtitle && <p className="text-xs text-text-dim mt-xxs">{subtitle}</p>}
            </div>
            <CloseButton onClose={onClose} />
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  )
}
