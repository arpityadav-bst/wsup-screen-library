'use client'

import { useEffect } from 'react'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  maxHeight?: string
  fillHeight?: boolean
  children: React.ReactNode
}

export default function BottomSheet({ open, onClose, title, subtitle, maxHeight = '82%', fillHeight = false, children }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black-55"
        style={{ animation: 'fade-in 0.2s ease-out' }}
      />
      {/* Sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-profile-sheet-bg rounded-t-popup border-t border-white-10 flex flex-col overflow-hidden shadow-big"
        style={{ maxHeight, height: fillHeight ? maxHeight : undefined, animation: 'slide-up 0.28s cubic-bezier(0.32,0.72,0,1)' }}
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
            <button
              onClick={onClose}
              className="p-icon-btn rounded-full hover:bg-white-10 transition-colors text-white-90 border-none bg-transparent cursor-pointer shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  )
}
