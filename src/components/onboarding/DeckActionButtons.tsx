'use client'

interface DeckActionButtonsProps {
  onSkip: () => void
  onLike: () => void
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

// Wider action buttons (was 56×56 round). Each button takes flex-1 and pairs an icon with a label
// ("Pass" / "Like") — the label-with-icon shape reads as deliberate primary actions, where the round-icon
// version read as utility/toolbar. Border + transparent bg per status color (alert / success) keeps the
// outline-only chrome family (no fill arms race with the card behind).
export default function DeckActionButtons({ onSkip, onLike }: DeckActionButtonsProps) {
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
