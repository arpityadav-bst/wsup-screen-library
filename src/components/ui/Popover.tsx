'use client'

import { useEffect, useRef } from 'react'

interface PopoverProps {
  open: boolean
  onClose: () => void
  anchorRef?: React.RefObject<HTMLElement | null>
  /** 'light' — white-10 bg, for use over dark backgrounds (default).
   *  'dark' — black-70 bg, for use over images or light areas. */
  variant?: 'light' | 'dark'
  children: React.ReactNode
}

/**
 * Desktop popover — compact floating card anchored near a trigger.
 * Two variants: 'light' (over dark bg) and 'dark' (over images).
 */
export default function Popover({ open, onClose, anchorRef, variant = 'light', children }: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    if (window.matchMedia('(max-width: 767px)').matches) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    // Only register on desktop — mobile uses BottomSheet instead
    if (window.matchMedia('(max-width: 767px)').matches) return
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    setTimeout(() => document.addEventListener('mousedown', handler), 0)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  if (!open) return null

  const bg = variant === 'dark'
    ? 'bg-profile-sheet-bg border-white-10'
    : 'bg-profile-sheet-bg border-white-10'

  return (
    <div
      ref={popoverRef}
      className={`absolute right-0 top-full mt-xs ${bg} border rounded-card shadow-popup p-xs z-50 min-w-[180px]`}
      style={{ animation: 'fade-in 0.15s ease-out' }}
    >
      {children}
    </div>
  )
}
