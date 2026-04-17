'use client'

import { useState } from 'react'

export default function CreditFeeAccordion() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-xxs bg-transparent border-none cursor-pointer p-0 text-text-dim hover:text-text-small transition-colors"
      >
        <span className="text-xs">Why does this cost credits?</span>
        <svg
          className="w-s h-s transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <p className="mt-xs text-xs leading-relaxed text-text-small">
          Every revival goes through a content review to keep the platform safe for everyone. The 20-credit fee helps us maintain fast, high-quality reviews so your character can get back online quickly. Credits are deducted only when you submit your edits.
        </p>
      )}
    </div>
  )
}
