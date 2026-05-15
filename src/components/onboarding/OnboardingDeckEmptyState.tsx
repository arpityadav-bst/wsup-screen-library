'use client'

import Button from '@/components/ui/Button'

interface OnboardingDeckEmptyStateProps {
  // Two distinct intents:
  //   onShowMore     — load the NEXT batch of cards (production: paginate the catalog)
  //   onGoToExplore  — exit the onboarding overlay into /explore (same destination as the header Skip pill)
  // In this demo onShowMore wires to deck-reset; production splits it into next-batch fetch.
  onShowMore: () => void
  onGoToExplore: () => void
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

// Renders when the user has swiped through the entire onboarding deck without liking anyone.
// Primary  = "Show me more"    — fresh batch; the most-likely next intent for users who skipped every card.
// Secondary = "Go to Explore"  — exit to the full /explore catalog (same destination as the header Skip pill).
// The codified "exit-affordance uniqueness" rule applies to ACTIVE decision surfaces; at the end-state moment,
// surfacing exit as a primary in-flow CTA is correct — the user has finished the decision surface and exit IS
// the natural forward action. The header Skip pill remains as the universal escape during the active deck.
export default function OnboardingDeckEmptyState({ onShowMore, onGoToExplore }: OnboardingDeckEmptyStateProps) {
  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-l px-l">
      <DeckIllustration />

      <div className="flex flex-col gap-xs items-center text-center">
        <h2 className="text-2xl font-semibold text-text-title leading-tight">That&apos;s the deck.</h2>
        <p className="text-sm text-text-body leading-snug text-balance">Want another look, or should we show you more?</p>
      </div>

      <div className="flex flex-col gap-s w-full max-w-[280px]">
        <Button variant="primary" fullWidth onClick={onShowMore}>Show me more</Button>
        <Button variant="secondary" fullWidth onClick={onGoToExplore}>Go to Explore</Button>
      </div>
    </div>
  )
}
