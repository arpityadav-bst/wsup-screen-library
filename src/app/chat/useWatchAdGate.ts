'use client'

import { useState } from 'react'
import { MAX_SENDS_BEFORE_AD_DEMO, type ChatDemoState } from './chat-config'

interface UseWatchAdGateArgs {
  setChatState: (state: ChatDemoState) => void
  // The gate only fires when this is true. Caller wires this to `flowMode === 'ad-bubble' ||
  // flowMode === 'ad-sheet'` so the gate is only active when one of the ad flows is selected.
  gateActive: boolean
}

// Ad-gate state machine — tracks free sends since the last ad-watch, holds the user's draft
// when the gate fires, and resumes the send after the dummy ad is dismissed. Two-stage close:
// (1) `startWatchAd` launches the DummyAd fullscreen takeover; (2) `completeWatchAd` runs when
// the user dismisses the ad, resetting the counter + releasing the held draft.
export function useWatchAdGate({ setChatState, gateActive }: UseWatchAdGateArgs) {
  const [sentSinceLastAd, setSentSinceLastAd] = useState(0)
  const [heldDraft, setHeldDraft] = useState<string | null>(null)
  const [dummyAdOpen, setDummyAdOpen] = useState(false)

  // Called from handleSend BEFORE the actual send. Returns true if the gate fired (caller
  // should NOT proceed with the send); false means proceed normally. When gateActive is false,
  // always returns false — gate is disabled entirely.
  const gateOnSend = (text: string): boolean => {
    if (!gateActive) return false
    if (sentSinceLastAd >= MAX_SENDS_BEFORE_AD_DEMO) {
      setHeldDraft(text)
      setChatState('watch-ad-popup')
      return true
    }
    return false
  }

  // Called by doActualSend after a successful send — increments the counter.
  const recordSend = () => setSentSinceLastAd((n) => n + 1)

  // Called when the user taps "Watch ad" inside the sheet/bubble. Closes the popup behind (so
  // the chat is in 'active' state) and opens the dummy-ad fullscreen takeover.
  const startWatchAd = () => {
    setChatState('active')
    setDummyAdOpen(true)
  }

  // Called when the user dismisses the dummy ad (tap-anywhere-to-close). Closes the ad surface,
  // resets the counter, and sends the held draft. The message landing in the chat is its own
  // confirmation — no toast.
  const completeWatchAd = (sendDraft: (text: string) => void) => {
    setDummyAdOpen(false)
    setSentSinceLastAd(0)
    if (heldDraft !== null) {
      sendDraft(heldDraft)
      setHeldDraft(null)
    }
  }

  // Reset to clean state — used when designer switches Flow in the dev panel, so a fresh ad-flow
  // demo doesn't inherit counter/draft/ad state from a previous session.
  const reset = () => {
    setSentSinceLastAd(0)
    setHeldDraft(null)
    setDummyAdOpen(false)
  }

  return { gateOnSend, recordSend, startWatchAd, completeWatchAd, dummyAdOpen, reset }
}
