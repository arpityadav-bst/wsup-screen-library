'use client'

import WatchAdSheet from './WatchAdSheet'
import WatchAdBubble from './WatchAdBubble'

export type WatchAdMode = 'sheet' | 'bubble'

interface WatchAdGateProps {
  open: boolean
  onClose: () => void
  onWatchAd: () => void
  // Mode is driven by the active Flow ('ad-sheet' → 'sheet', 'ad-bubble' → 'bubble'). No designer-
  // facing toggle on the popup itself — the choice is made at the Flow level. Each flow is a
  // distinct demo journey for the dev to evaluate the corresponding UI treatment.
  mode: WatchAdMode
}

// Mobile-only hard send-gate. Fires every Nth message (N batched at 9 / 16 / 24 / 32 per
// product config; demo uses 2 free sends, so the 3rd attempt fires). Renders one of two
// surfaces based on `mode`:
//   - 'sheet'  — BottomSheet modal popup (WatchAdSheet)
//   - 'bubble' — inline AI-bubble-style surface above ChatBar (WatchAdBubble)
//
// Both gate the SEND (not the reply) — the user's draft is held in the parent (page.tsx);
// tapping "Watch ad" completes the gate, the held draft sends, counter resets.
export default function WatchAdGate({ open, onClose, onWatchAd, mode }: WatchAdGateProps) {
  if (mode === 'bubble') {
    return <WatchAdBubble open={open} onWatchAd={onWatchAd} />
  }
  return <WatchAdSheet open={open} onClose={onClose} onWatchAd={onWatchAd} />
}
