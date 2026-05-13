'use client'

import { useEffect, useRef, useState } from 'react'
import OnboardingHeader from './OnboardingHeader'
import DeckCardSwiper, { type DeckCardSwiperHandle } from './DeckCardSwiper'
import DeckProgressBars from './DeckProgressBars'
import DeckActionButtons from './DeckActionButtons'
import OnboardingDeckEmptyState from './OnboardingDeckEmptyState'
import { ONBOARDING_DECK } from '@/lib/onboardingDeck'

interface OnboardingDeckStepProps {
  index: number
  onSkipCard: () => void
  onLikeCard: () => void
  onSkipFlow: () => void
  onRestartDeck: () => void
}

const STACK_DEPTH = 3                              // top + 2 peek cards behind
// Slot 0 = top (no offset/scale); slots 1+ are peeks. Tuned so the deck looks like a stack without overpowering the top.
const SLOT_TRANSFORMS = ['translateY(0) scale(1)', 'translateY(10px) scale(0.95)', 'translateY(20px) scale(0.90)']
const SLOT_OPACITIES  = [1, 0.7, 0.45]

// Stage 2 — deck swiper with proper deck behavior:
//   - Up to 3 cards stacked at once (top + 2 peeks). User always sees there's more behind.
//   - When the top card commits (button / kbd / drag-past-threshold), peek cards animate UP to their next slot
//     positions IN PARALLEL with the top's fly-off — one coordinated "deck advanced" motion, not a respawn.
//   - After the fly-off animation completes, the parent advances `index`; React reconciliation keeps the
//     previously-slot-1 card mounted (same key = character.id) — it just promotes from peek to top with
//     interactive enabled.
export default function OnboardingDeckStep({ index, onSkipCard, onLikeCard, onSkipFlow, onRestartDeck }: OnboardingDeckStepProps) {
  const swiperRef = useRef<DeckCardSwiperHandle>(null)
  const [swipingOut, setSwipingOut] = useState(false)

  // When index advances, the slot positions reset — the previously-slot-1 card was already at effSlot=0
  // (because swipingOut moved it there), and now it actually IS slot=0, so its style stays put.
  useEffect(() => { setSwipingOut(false) }, [index])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowLeft') { e.preventDefault(); swiperRef.current?.swipe('left') }
      else if (e.key === 'ArrowRight') { e.preventDefault(); swiperRef.current?.swipe('right') }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const visible = ONBOARDING_DECK.slice(index, index + STACK_DEPTH)

  // End-of-deck — user skipped every card. Show empty state with two paths forward (no third CTA — Skip pill
  // at top-right already serves the /explore exit). In this demo both CTAs reset the deck index; production
  // will split them: "Show me more" → next batch from the catalog, "See them again" → replay current batch.
  if (visible.length === 0) {
    return (
      <div className="flex flex-col h-full p-l gap-m">
        <OnboardingHeader onSkip={onSkipFlow} />
        <OnboardingDeckEmptyState onShowMore={onRestartDeck} onSeeAgain={onRestartDeck} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full p-l gap-m">
      <OnboardingHeader onSkip={onSkipFlow} />

      <div className="flex flex-col gap-xxs shrink-0">
        <h2 className="text-2xl font-semibold text-text-title leading-tight">Pick your first chat</h2>
        <p className="text-xs text-text-body">Swipe right to start chatting · left to skip</p>
      </div>

      <DeckProgressBars total={ONBOARDING_DECK.length} currentIndex={index} />

      <div className="flex-1 min-h-0 flex items-center justify-center">
        {/* Sizing container — aspect-locked so the stack reads as one card-shaped surface */}
        <div className="relative h-full max-w-full aspect-[9/16]">
          {visible.map((char, slot) => {
            // While the top card is mid-commit (swipingOut), peek cards visually advance one slot — they
            // shift toward the viewer in parallel with the top's fly-off. After the commit completes and
            // `index` updates, the parent's useEffect resets swipingOut and the new render lines up.
            const effSlot = swipingOut && slot >= 1 ? slot - 1 : slot
            const isTop = slot === 0
            return (
              <div
                key={char.id}
                className="absolute inset-0 transition-all duration-300 ease-out"
                style={{
                  transform: SLOT_TRANSFORMS[effSlot],
                  opacity: SLOT_OPACITIES[effSlot],
                  zIndex: STACK_DEPTH - slot,
                  pointerEvents: isTop ? 'auto' : 'none',
                }}
              >
                <DeckCardSwiper
                  ref={isTop ? swiperRef : undefined}
                  character={char}
                  interactive={isTop}
                  onSkip={onSkipCard}
                  onLike={onLikeCard}
                  onCommitStart={isTop ? () => setSwipingOut(true) : undefined}
                />
              </div>
            )
          })}
        </div>
      </div>

      <DeckActionButtons
        onSkip={() => swiperRef.current?.swipe('left')}
        onLike={() => swiperRef.current?.swipe('right')}
      />
    </div>
  )
}
