'use client'

interface DeckActionButtonsProps {
  onSkip: () => void
  onLike: () => void
  onRewind?: () => void
  canRewind?: boolean
}

const CrossGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden>
    <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
)

const HeartGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 21s-7-4.5-9.5-9C.8 8.7 2.5 4 6.5 4c2 0 3.5 1 4.5 2.5l1 1.5 1-1.5C14 5 15.5 4 17.5 4 21.5 4 23.2 8.7 21.5 12 19 16.5 12 21 12 21z" />
  </svg>
)

// Counter-clockwise rewind arrow (lucide rotate-ccw shape). Arc is centered at (12,12) radius 9 so the
// full circle sits inside the 0-24 viewBox; the arrowhead tail sits at top-left. Previous path used
// radius 9 from (3,8) which placed the top of the arc at y=-1 — got trimmed at the top of the viewBox.
const RewindGlyph = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Wider action buttons (was 56×56 round). Each button takes flex-1 and pairs an icon with a label
// ("Pass" / "Like") — the label-with-icon shape reads as deliberate primary actions, where the round-icon
// version read as utility/toolbar. Border + transparent bg per status color (alert / success) keeps the
// outline-only chrome family (no fill arms race with the card behind).
//
// Rewind is a tertiary "I changed my mind" affordance — only renders after at least one pass (canRewind
// becomes true once deckIndex > 0 and STAYS true through subsequent passes; not gated on swipingOut /
// swipingIn so the slot doesn't pop in/out mid-animation). Positioned BETWEEN Pass and Like (centered as
// the row's pivot). Smaller fixed-width icon-only circular button — intentionally NOT flex-1 so Pass/Like
// keep visual primacy. Neutral chrome (text-text-body / border-white-20) — no status color since rewind
// isn't success or alert; it's a reversal of intent. First appearance fades in via the codified `fade-in`
// utility so the layout shift from "no slot" → "slot exists" reads as intentional, not janky.
export default function DeckActionButtons({ onSkip, onLike, onRewind, canRewind }: DeckActionButtonsProps) {
  return (
    <div className="flex items-center gap-m">
      <button
        onClick={onSkip}
        aria-label="Pass on this character"
        className="flex-1 flex items-center justify-center gap-xs h-[52px] rounded-pill border-2 border-status-alert text-status-alert bg-status-alert/[0.08] hover:bg-status-alert/[0.18] text-base font-semibold transition-colors"
      >
        <CrossGlyph />
        Pass
      </button>
      {canRewind && onRewind && (
        <button
          onClick={onRewind}
          aria-label="Rewind — bring back the last passed character"
          className="shrink-0 flex items-center justify-center h-[52px] w-[52px] rounded-full border-2 border-white-20 text-text-body bg-white-05 hover:bg-white-10 hover:border-white-30 transition-colors"
          style={{ animation: 'fade-in 0.25s ease-out' }}
        >
          <RewindGlyph />
        </button>
      )}
      <button
        onClick={onLike}
        aria-label="Like and start chatting"
        className="flex-1 flex items-center justify-center gap-xs h-[52px] rounded-pill border-2 border-status-success text-status-success bg-status-success/[0.08] hover:bg-status-success/[0.18] text-base font-semibold transition-colors"
      >
        <HeartGlyph />
        Like
      </button>
    </div>
  )
}
