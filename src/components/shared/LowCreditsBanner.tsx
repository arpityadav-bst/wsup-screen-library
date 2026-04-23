'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

interface LowCreditsBannerProps {
  credits: number
  estimatedReplies: number
  onAddCredits?: () => void
}

function openBuyCredits() {
  window.dispatchEvent(new CustomEvent('wsup:open-buy-credits'))
}

export default function LowCreditsBanner({ credits, estimatedReplies, onAddCredits }: LowCreditsBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const handleAddCredits = onAddCredits ?? openBuyCredits

  return (
    <div className="flex items-center gap-s px-s py-xs rounded-card border border-status-alert/[0.30] bg-status-alert/[0.10]">
      <div className="relative flex items-center justify-center size-m shrink-0">
        <span className="absolute size-[8px] rounded-full bg-status-alert animate-ping opacity-60" />
        <span className="size-[8px] rounded-full bg-status-alert" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-baseline md:gap-xxs text-xs leading-tight">
        <span className="font-semibold text-text-title whitespace-nowrap">{credits} credits left</span>
        <span className="hidden md:inline text-text-small">·</span>
        <span className="text-text-small whitespace-nowrap">about {estimatedReplies} replies</span>
      </div>
      <Button size="xs" className="h-[28px] px-m shrink-0" onClick={handleAddCredits}>
        Add credits
      </Button>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="p-icon-btn rounded-full hover:bg-white-10 transition-colors text-white-50 hover:text-white-80 border-none bg-transparent cursor-pointer shrink-0"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
