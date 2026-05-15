'use client'

import { useEffect, useRef, useState } from 'react'
import OnboardingHeader from './OnboardingHeader'
import DeckCardSwiper, { type DeckCardSwiperHandle } from './DeckCardSwiper'
import DeckProgressBars from './DeckProgressBars'
import DeckActionButtons from './DeckActionButtons'
import OnboardingDeckEmptyState from './OnboardingDeckEmptyState'
import { ONBOARDING_DECK, type OnboardingCharacter } from '@/lib/onboardingDeck'

interface OnboardingDeckStepProps {
  index: number
  canRewind: boolean
  onSkipCard: () => void
  onLikeCard: () => void
  onRewindCard: () => void
  onSkipFlow: () => void
  onRestartDeck: () => void
}

const STACK_DEPTH = 3                              // top + 2 peek cards behind
const REWIND_ANIM_MS = 320                         // mirrors DeckCardSwiper.ANIM_MS so forward+backward feel symmetric
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
//   - REWIND (added S34): symmetric mirror of the forward commit. The previously-passed card flies IN from
//     off-screen-left (mirror of the pass fly-off path), while existing cards shift one slot back. After the
//     animation, parent decrements `index`. Rewind button only renders once `canRewind` is true (deckIndex > 0).
export default function OnboardingDeckStep({ index, canRewind, onSkipCard, onLikeCard, onRewindCard, onSkipFlow, onRestartDeck }: OnboardingDeckStepProps) {
  const swiperRef = useRef<DeckCardSwiperHandle>(null)
  const [swipingOut, setSwipingOut] = useState(false)
  const [swipingIn, setSwipingIn] = useState<OnboardingCharacter | null>(null)

  // When index advances or rewinds, slot positions reset to their new resting positions. Animation flags clear.
  useEffect(() => { setSwipingOut(false); setSwipingIn(null) }, [index])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowLeft') { e.preventDefault(); swiperRef.current?.swipe('left') }
      else if (e.key === 'ArrowRight') { e.preventDefault(); swiperRef.current?.swipe('right') }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleRewind = () => {
    if (swipingOut || swipingIn || !canRewind) return
    const prev = ONBOARDING_DECK[index - 1]
    if (!prev) return
    setSwipingIn(prev)
    window.setTimeout(() => onRewindCard(), REWIND_ANIM_MS)
  }

  const visible = ONBOARDING_DECK.slice(index, index + STACK_DEPTH)

  // End-of-deck — user swiped through everything. Two paths forward: load next batch ("Show me more") or
  // exit to /explore ("Go to Explore"). The latter is the same destination as the header Skip pill — at the
  // end-state moment, exit IS the natural next action, so surfacing it as a primary in-flow CTA is correct
  // (the codified exit-affordance-uniqueness rule scopes to active-decision surfaces, not end-states).
  if (visible.length === 0) {
    return (
      <div className="flex flex-col h-full p-l gap-m">
        <OnboardingHeader onSkip={onSkipFlow} />
        <OnboardingDeckEmptyState onShowMore={onRestartDeck} onGoToExplore={onSkipFlow} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full p-l gap-m">
      <OnboardingHeader onSkip={onSkipFlow} />

      <div className="flex flex-col gap-xxs shrink-0">
        <h2 className="text-2xl font-semibold text-text-title leading-tight">Pick your first chat</h2>
        <p className="text-xs text-text-body">Swipe right to chat · left to pass</p>
      </div>

      <DeckProgressBars total={ONBOARDING_DECK.length} currentIndex={index} />

      <div className="flex-1 min-h-0 flex items-center justify-center">
        {/* Sizing container — aspect-locked so the stack reads as one card-shaped surface */}
        <div className="relative h-full max-w-full aspect-[9/16]">
          {visible.map((char, slot) => {
            // Slot animation logic — three modes:
            //   swipingOut: peek cards advance toward viewer (slot 1→0, slot 2→1) parallel to top's fly-off.
            //   swipingIn:  visible cards retreat (slot 0→1, slot 1→2, slot 2 fades out) parallel to the
            //               rewinding card's fly-in.
            //   neither:    cards sit at their resting slots.
            const effSlot = swipingIn
              ? slot + 1
              : (swipingOut && slot >= 1 ? slot - 1 : slot)
            const inStack = effSlot < STACK_DEPTH
            const isTop = slot === 0 && !swipingIn
            return (
              <div
                key={char.id}
                className="absolute inset-0 transition-all duration-300 ease-out"
                style={{
                  transform: inStack ? SLOT_TRANSFORMS[effSlot] : SLOT_TRANSFORMS[STACK_DEPTH - 1],
                  opacity: inStack ? SLOT_OPACITIES[effSlot] : 0,
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

          {/* Rewinding card overlay — mounts only during a rewind. Sits above the entire stack and uses a
              one-shot CSS keyframe to fly in from off-screen-left into the slot-0 resting pose. After the
              animation, parent decrements `index` and React reconciliation moves this character into the
              normal stack (same key = character.id → no remount blink). */}
          {swipingIn && (
            <div
              key={`rewinding-${swipingIn.id}`}
              className="absolute inset-0"
              style={{
                zIndex: STACK_DEPTH + 1,
                animation: `deck-rewind-in ${REWIND_ANIM_MS}ms ease-out forwards`,
              }}
            >
              <DeckCardSwiper character={swipingIn} interactive={false} />
            </div>
          )}
        </div>
      </div>

      <DeckActionButtons
        onSkip={() => swiperRef.current?.swipe('left')}
        onLike={() => swiperRef.current?.swipe('right')}
        onRewind={handleRewind}
        canRewind={canRewind}
      />
    </div>
  )
}
