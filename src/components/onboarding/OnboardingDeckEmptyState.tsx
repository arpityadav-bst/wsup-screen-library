'use client'

import Button from '@/components/ui/Button'

interface OnboardingDeckEmptyStateProps {
  // Two distinct intents, surfaced as two props for dev handoff clarity:
  //   onShowMore — load the NEXT batch of cards (production: paginate the catalog)
  //   onSeeAgain — replay the SAME batch the user just went through (regret-a-skip path)
  // In this demo both wire to the same reset-index action since we re-cycle the 9-card deck.
  onShowMore: () => void
  onSeeAgain: () => void
}

// Two stacked cards — visual metaphor for "the deck." Back card offset up-and-right, front card in foreground.
// Outline-only stroke (no fill) keeps the emphasis on the surrounding copy. Both rounded-card-style corner radii.
function DeckIllustration() {
  return (
    <svg width="80" height="88" viewBox="0 0 80 88" fill="none" aria-hidden className="text-text-small">
      {/* Back card */}
      <rect x="32" y="6" width="40" height="60" rx="7" stroke="currentColor" strokeWidth="1.6" />
      {/* Front card */}
      <rect x="8" y="22" width="40" height="60" rx="7" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

// Renders when the user has swiped through the entire onboarding deck without liking anyone (every card skipped).
// Primary = "Show me more" — the user's skips signal "these didn't match"; the most-likely next intent is a fresh batch.
// Secondary = "See them again" — the regret-a-skip path; descriptive copy chosen over the colloquial "Run it back"
// because onboarding is exactly when new users have zero context to parse slang.
// "Open Explore" intentionally omitted — the Skip pill at top-right already serves that escape; duplicating it
// here would violate the codified taste rule about not duplicating exit affordances at the same trigger semantic.
export default function OnboardingDeckEmptyState({ onShowMore, onSeeAgain }: OnboardingDeckEmptyStateProps) {
  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-l px-l">
      <DeckIllustration />

      <div className="flex flex-col gap-xs items-center text-center">
        <h2 className="text-2xl font-semibold text-text-title leading-tight">That&apos;s the deck.</h2>
        <p className="text-sm text-text-body leading-snug text-balance">Want another look, or should we show you more?</p>
      </div>

      <div className="flex flex-col gap-s w-full max-w-[280px]">
        <Button variant="primary" fullWidth onClick={onShowMore}>Show me more</Button>
        <Button variant="secondary" fullWidth onClick={onSeeAgain}>See them again</Button>
      </div>
    </div>
  )
}
