'use client'

import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import CloseButton from '@/components/ui/CloseButton'
import Button from '@/components/ui/Button'

interface WatchAdSheetProps {
  open: boolean
  onClose: () => void
  // Fires when user taps "Watch ad" — production wires the ad SDK; demo just closes the popup
  // and the parent flow sends the held draft.
  onWatchAd: () => void
}

// Play-triangle icon — inline SVG with the same 64×64 white-10 surface family as the
// announcement bell. Subtle scale + opacity pulse communicates "alive, tap me" without the
// urgency of the bell's ring. Keyframes: `play-pulse` in globals.css.
function PlayIcon() {
  return (
    <div className="w-[64px] h-[64px] rounded-full bg-white-10 border border-white-10 flex items-center justify-center text-text-title">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        style={{ animation: 'play-pulse 2s ease-in-out infinite' }}
      >
        <path d="M8 5.5l11 6.5-11 6.5V5.5z" />
      </svg>
    </div>
  )
}

// Shared body — same anatomy renders inside the BottomSheet (mobile) and CenterPopup (desktop).
// Keeps the two wrappers structurally identical so a designer reviewing one variant gets the
// same answers about the other.
function WatchAdBody({ onClose, onWatchAd }: { onClose: () => void; onWatchAd: () => void }) {
  return (
    <div className="relative flex flex-col items-center px-l pt-l pb-l gap-m">
      <CloseButton onClose={onClose} className="absolute top-s right-s" />
      <PlayIcon />

      <div className="flex flex-col items-center gap-xs">
        <h2 className="text-xl font-semibold text-text-title text-center text-balance">
          Watch an ad to keep chatting
        </h2>
        <p className="text-sm text-text-body text-center text-balance">
          Quick ad break before your next message. Same character, no progress lost.
        </p>
      </div>

      <div className="flex flex-col gap-s w-full pt-s">
        <Button variant="primary" fullWidth onClick={onWatchAd}>
          Watch ad
        </Button>
      </div>
    </div>
  )
}

// BottomSheet variant (mobile) + CenterPopup variant (desktop) of the WatchAdGate. Hard send-gate
// that fires on Nth send when the 'ad-sheet' flow is active. Sibling-surface inheritance with
// BuyCreditsSheet's mobile+desktop pattern (BottomSheet + CenterPopup mounted in parallel; each
// hides itself on the wrong viewport via its primitive's CSS). Action-first headline per codified
// taste rule. Same z-index (70) on both variants.
export default function WatchAdSheet({ open, onClose, onWatchAd }: WatchAdSheetProps) {
  return (
    <>
      <BottomSheet open={open} onClose={onClose} zIndex={70}>
        <WatchAdBody onClose={onClose} onWatchAd={onWatchAd} />
      </BottomSheet>
      <CenterPopup open={open} onClose={onClose} maxWidth="420px" zIndex={70}>
        <WatchAdBody onClose={onClose} onWatchAd={onWatchAd} />
      </CenterPopup>
    </>
  )
}
