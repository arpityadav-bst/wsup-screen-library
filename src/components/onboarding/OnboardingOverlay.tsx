'use client'

import { useEffect } from 'react'
import OnboardingPreferencesStep from './OnboardingPreferencesStep'
import OnboardingDeckStep from './OnboardingDeckStep'

export type OnboardingStage = 'preferences' | 'deck'

interface OnboardingOverlayProps {
  open: boolean
  stage: OnboardingStage
  deckIndex: number
  onContinueFromPreferences: (prefs: { identity: string; age: string; interest: string }) => void
  onSkipCard: () => void
  onLikeCard: () => void
  onSkipFlow: () => void
  onRestartDeck: () => void
}

// Onboarding overlay — full-viewport takeover on mobile, ~480px centered popup on desktop.
// Deliberately NOT using CenterPopup primitive: this surface behaves like a takeover (tall portrait, multi-step machine),
// not a typical popup (header + body + done). CenterPopup's overflow-hidden + 80vh cap would clip the deck stage.
// Custom scrim wrapper instead — matches the pattern from MemoryLimitOverlay (codified in S31 taste rule:
// "Self-chromed popups with overhanging or unusual layouts need a custom scrim wrapper, not CenterPopup").
export default function OnboardingOverlay({
  open,
  stage,
  deckIndex,
  onContinueFromPreferences,
  onSkipCard,
  onLikeCard,
  onSkipFlow,
  onRestartDeck,
}: OnboardingOverlayProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onSkipFlow() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onSkipFlow])

  if (!open) return null

  const body = stage === 'preferences'
    ? <OnboardingPreferencesStep onContinue={onContinueFromPreferences} onSkip={onSkipFlow} />
    : <OnboardingDeckStep index={deckIndex} onSkipCard={onSkipCard} onLikeCard={onLikeCard} onSkipFlow={onSkipFlow} onRestartDeck={onRestartDeck} />

  return (
    <>
      {/* Mobile — full-viewport takeover */}
      <div className="fixed inset-0 md:hidden bg-page-bg flex flex-col" style={{ zIndex: 80, animation: 'fade-in 0.2s ease-out' }}>
        {body}
      </div>

      {/* Desktop — centered popup (~480px) over scrim. Height is stage-aware:
          - preferences = auto (content-driven; only ~500px of pickers — fixed 880 wasted real estate)
          - deck = min(880px, 94vh) (deck card needs the room for image + overlay content) */}
      <div className="fixed inset-0 hidden md:flex items-center justify-center" style={{ zIndex: 80 }}>
        <div className="absolute inset-0 bg-black-55" style={{ animation: 'fade-in 0.2s ease-out' }} />
        <div
          className="relative w-full max-w-popup-medium bg-page-bg rounded-popup border border-white-10 shadow-popup overflow-hidden flex flex-col"
          style={{
            height: stage === 'deck' ? 'min(880px, 94vh)' : 'auto',
            maxHeight: '94vh',
            animation: 'slide-up 0.24s cubic-bezier(0.32,0.72,0,1)',
          }}
        >
          {body}
        </div>
      </div>
    </>
  )
}
