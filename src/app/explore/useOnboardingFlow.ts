'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ONBOARDING_DECK, clearOnboarding, recordLike } from '@/lib/onboardingDeck'
import type { OnboardingStage } from '@/components/onboarding/OnboardingOverlay'

export interface OnboardingFlowState {
  open: boolean
  stage: OnboardingStage
  deckIndex: number
  canRewind: boolean
  start: () => void
  closeFlow: () => void
  continueFromPreferences: (prefs: { identity: string; age: string; interest: string }) => void
  skipCard: () => void
  likeCard: () => void
  rewindCard: () => void
  restartDeck: () => void
}

// Owns the onboarding-overlay state machine for /explore.
// Two stages: 'preferences' → 'deck'. Deck advances index past length → empty-state branch in OnboardingDeckStep
// renders (with "Show me more" + "See them again" CTAs that both call restartDeck in this demo).
// On Like: records the liked id in localStorage (so /chat can render that character via useChatCharacter)
// and routes to /chat. On Skip-flow: clears state + closes overlay back to /explore.
// Deck position is React state only — not persisted; re-entering "Onboarding" via the dev panel starts fresh.
export function useOnboardingFlow(): OnboardingFlowState {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState<OnboardingStage>('preferences')
  const [deckIndex, setDeckIndex] = useState(0)

  const start = () => {
    clearOnboarding()
    setDeckIndex(0)
    setStage('preferences')
    setOpen(true)
  }

  const closeFlow = () => {
    setOpen(false)
    clearOnboarding()
    setDeckIndex(0)
    setStage('preferences')
  }

  const continueFromPreferences = (_prefs: { identity: string; age: string; interest: string }) => {
    // Preferences are demo-only — we don't filter the deck by them. Just advance to the deck stage.
    setStage('deck')
  }

  const skipCard = () => {
    // No auto-close at end of deck — `index >= deck.length` triggers the empty-state in OnboardingDeckStep,
    // which offers "Show me more" + "Go to Explore". The empty state replaces "user dropped off into the void."
    setDeckIndex(deckIndex + 1)
  }

  const rewindCard = () => {
    if (deckIndex > 0) setDeckIndex(deckIndex - 1)
  }

  const restartDeck = () => {
    setDeckIndex(0)
  }

  const likeCard = () => {
    const character = ONBOARDING_DECK[deckIndex]
    if (!character) return
    recordLike(character)
    setOpen(false)
    router.push('/chat')
  }

  return { open, stage, deckIndex, canRewind: deckIndex > 0, start, closeFlow, continueFromPreferences, skipCard, likeCard, rewindCard, restartDeck }
}
