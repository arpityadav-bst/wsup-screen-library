'use client'

interface DeckProgressBarsProps {
  total: number
  currentIndex: number
}

// Segmented progress indicator for the deck — one segment per card.
// Cards already swiped through fill with `bg-accent`; remaining cards use `bg-white-10` (subtle, not dim — the row is meant
// to be readable as a progress signal, not invisible).
// Matches the "Spacing is hierarchy" taste rule by using a single shared `gap-xxs` between segments — they're peer units,
// no semantic grouping inside the row.
export default function DeckProgressBars({ total, currentIndex }: DeckProgressBarsProps) {
  return (
    <div className="flex items-center gap-xxs w-full" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={currentIndex}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-[3px] rounded-pill ${i < currentIndex + 1 ? 'bg-accent' : 'bg-white-10'}`}
        />
      ))}
    </div>
  )
}
