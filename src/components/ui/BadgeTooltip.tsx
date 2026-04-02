'use client'

import { useEffect, useRef } from 'react'

interface BadgeTooltipProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function BadgeTooltip({ open, onClose, children }: BadgeTooltipProps) {
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
      className="absolute left-0 top-full mt-xxs w-[200px] p-s bg-profile-sheet-bg border border-white-10 rounded-card shadow-popup z-50"
      style={{ animation: 'fade-in 0.15s ease-out' }}
    >
      {children}
    </div>
  )
}
