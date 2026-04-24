'use client'

import type { ReactNode } from 'react'

interface DevStateToggleProps {
  open: boolean
  title: string
  hint: string
  zIndex?: number
  children: ReactNode
}

/** Floating bottom-right dev-only state switcher. R shows/hides, handler lives on the consuming page. zIndex raises when rendered over another overlay (e.g. 90 over a z-80 sheet). */
export default function DevStateToggle({ open, title, hint, zIndex = 70, children }: DevStateToggleProps) {
  if (!open) return null
  return (
    <div
      className="fixed bottom-m right-m flex flex-col gap-xxs bg-secondary-surface backdrop-blur-popup rounded-card p-s shadow-big border border-white-10"
      style={{ zIndex, animation: 'fade-in 0.15s ease-out' }}
    >
      <span className="text-xxs font-semibold text-text-dim uppercase tracking-[0.8px] mb-xxs">
        {title} · <span className="text-text-xxsmall normal-case">{hint}</span>
      </span>
      {children}
    </div>
  )
}

interface DevStateOptionProps {
  active: boolean
  onClick: () => void
  children: ReactNode
}

/** Consistent option button for use inside DevStateToggle. */
export function DevStateOption({ active, onClick, children }: DevStateOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left px-s py-xxs rounded-button text-xs cursor-pointer border-none transition-colors ${
        active
          ? 'bg-accent text-text-title font-medium'
          : 'bg-transparent text-text-small hover:bg-white-10'
      }`}
    >
      {children}
    </button>
  )
}
