'use client'

import Button from '@/components/ui/Button'

interface WatchAdBubbleProps {
  open: boolean
  onWatchAd: () => void
}

// AI-chat-bubble variant of the WatchAdGate. Mounts INLINE in the input-area slot (where
// SuggestedReplies sits), pushing the chat stream up. Mobile-only. Triggered on Nth send when
// the 'ad-bubble' flow is active.
//
// Chrome inheritance from ChatMessages.AIBubble: `bg-chat-ai-bubble`, asymmetric border radii
// (`rounded-tl-2xl rounded-tr-2xl rounded-br-2xl` — flat bottom-left for the speech tail). NO
// AVATAR — WSUP's ChatMessages.AIBubble does not render a per-message avatar (the character is
// set at the chat-screen level via ChatHeader). System-voice signal: the "QUICK AD BREAK"
// eyebrow label inside the bubble + the embedded Watch ad button. Codified taste rule (S23 —
// character voice vs system voice) is satisfied by the eyebrow label without breaking the
// chat-bubble convention.
export default function WatchAdBubble({ open, onWatchAd }: WatchAdBubbleProps) {
  if (!open) return null

  return (
    <div className="md:hidden px-m pt-s pb-s" style={{ animation: 'fade-in 0.25s ease-out' }}>
      <div className="max-w-[300px]">
        <div className="bg-chat-ai-bubble px-m py-s rounded-tl-2xl rounded-tr-2xl rounded-br-2xl flex flex-col gap-xs">
          <span className="text-xxs uppercase tracking-[0.4px] text-text-dim font-medium">
            Quick ad break
          </span>
          <p className="text-sm text-text-title leading-snug">
            Watch a short ad to keep chatting — your message will send right after.
          </p>
          <Button variant="primary" size="s" onClick={onWatchAd} className="self-start mt-xxs">
            Watch ad
          </Button>
        </div>
      </div>
    </div>
  )
}
