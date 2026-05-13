'use client'

import Image from 'next/image'

interface OnboardingHeaderProps {
  onSkip: () => void
}

const CloseGlyph = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

// Shared top row for both onboarding stages: wsup.ai mark+wordmark on the left, "× Skip" pill on the right.
// Uses the codified `/logo.png` (104×24) asset directly — same as the production Header — so the wordmark sits at
// its designed proportional weight relative to the mark (smaller, secondary; the glyph leads). Re-composing as
// separate logo + text always over-weighted the wordmark.
export default function OnboardingHeader({ onSkip }: OnboardingHeaderProps) {
  return (
    <div className="flex items-center justify-between shrink-0">
      <Image src="/logo.png" alt="wsup.ai" width={104} height={24} className="object-contain" priority />
      <button
        onClick={onSkip}
        className="flex items-center gap-xs px-s py-xs rounded-pill border border-white-20 text-text-body text-xs font-medium hover:bg-white-05 hover:border-white-30 transition-colors"
      >
        <CloseGlyph />
        Skip
      </button>
    </div>
  )
}
