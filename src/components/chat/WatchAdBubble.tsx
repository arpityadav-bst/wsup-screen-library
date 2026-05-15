'use client'

import Button from '@/components/ui/Button'

interface WatchAdBubbleProps {
  open: boolean
  onWatchAd: () => void
}

// AI-chat-bubble variant of the WatchAdGate. Mounts INLINE in the input-area slot (where
// SuggestedReplies sits), pushing the chat stream up. Renders on BOTH mobile and desktop — the
// surface inherits the chat column's responsive width from its parent. Wrapper padding mirrors
// ChatMessages' container (`px-m md:px-4xl`) so the bubble's left edge aligns with the regular
// AI bubbles above it, not the chat column edge.
//
// Chrome inheritance from ChatMessages.AIBubble: `bg-chat-ai-bubble`, asymmetric border radii
// (`rounded-tl-2xl rounded-tr-2xl rounded-br-2xl` — flat bottom-left for the speech tail), and
// `max-w-chat-bubble` (290px token, same as the regular AI bubble). NO AVATAR — WSUP's
// ChatMessages.AIBubble does not render a per-message avatar (the character is set at the
// chat-screen level via ChatHeader). System-voice signal: the "QUICK AD BREAK" eyebrow label
// inside the bubble + the embedded Watch ad button. Codified taste rule (S23 — character voice
// vs system voice) is satisfied by the eyebrow label without breaking the chat-bubble convention.
export default function WatchAdBubble({ open, onWatchAd }: WatchAdBubbleProps) {
  if (!open) return null

  return (
    <div className="px-m md:px-4xl pt-s pb-s" style={{ animation: 'fade-in 0.25s ease-out' }}>
      <div className="max-w-chat-bubble">
        <div className="bg-chat-ai-bubble px-m py-s rounded-tl-2xl rounded-tr-2xl rounded-br-2xl flex flex-col gap-xs">
          <span className="eyebrow-label">Quick ad break</span>
          <p className="text-sm text-text-title leading-snug">
            Watch a short ad and your message sends right after.
          </p>
          <Button variant="primary" size="s" onClick={onWatchAd} className="self-start mt-xxs">
            Watch ad
          </Button>
        </div>
      </div>
    </div>
  )
}
