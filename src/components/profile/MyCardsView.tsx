'use client'

import SubpageHeader from '@/components/ui/SubpageHeader'

interface Card {
  name: string
  cards: number
  img: string
}

interface MyCardsViewProps {
  open: boolean
  onClose: () => void
  cards: Card[]
}

export default function MyCardsView({ open, onClose, cards }: MyCardsViewProps) {
  if (!open) return null

  const totalCards = cards.reduce((sum, c) => sum + c.cards, 0)

  return (
    <div
      className="fixed inset-0 z-50 bg-page-bg flex flex-col"
      style={{ animation: 'slide-in-right 0.26s cubic-bezier(0.32,0.72,0,1) forwards' }}
    >
      <SubpageHeader
        backLabel="Profile"
        onBack={onClose}
        right={<>
          <span className="font-semibold text-sm text-text-title">My Cards</span>
          <span className="text-xs text-text-xxsmall">{totalCards} total</span>
        </>}
      />

      {/* Grid */}
      <div className="flex-1 min-h-0 overflow-y-auto px-m pt-m pb-[80px]" style={{ scrollbarWidth: 'none' }}>
        <div className="grid grid-cols-2 gap-s">
          {cards.map((c) => (
            <div key={c.name} className="flex flex-col rounded-card overflow-hidden bg-white-05 border border-white-10 cursor-pointer">
              <div className="relative" style={{ paddingBottom: '133%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                <div className="absolute bottom-0 left-0 right-0 h-[72px] pointer-events-none char-overlay" />
                <span className="absolute bottom-s left-s font-semibold text-sm text-text-title drop-shadow-sm">
                  {c.name}
                </span>
              </div>
              <div className="flex items-center gap-xs px-s py-xs border-t border-white-05 text-text-small">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-60">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-medium">{c.cards} Cards</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
