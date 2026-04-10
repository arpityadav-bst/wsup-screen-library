'use client'

import { useEffect, useRef } from 'react'

interface BadgeTooltipProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  accentColor?: string
}

export default function BadgeTooltip({ open, onClose, children, accentColor }: BadgeTooltipProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    setTimeout(() => document.addEventListener('mousedown', handler), 0)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full mt-xxs w-[240px] bg-profile-sheet-bg border border-white-10 rounded-card shadow-popup z-50 overflow-hidden"
      style={{ animation: 'fade-in 0.15s ease-out' }}
    >
      {/* Accent top bar */}
      {accentColor && (
        <div className="h-[3px] w-full" style={{ background: accentColor }} />
      )}
      <div className="p-s">
        {children}
      </div>
    </div>
  )
}
