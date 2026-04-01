import Image from 'next/image'
import CreditButton from '@/components/ui/CreditButton'

export interface DormantCharacter {
  name: string
  img: string
  stateType: 'inactive' | 'moderation'
  reason?: string
  chats: string
  daysUntilRemoval: number
}

interface DormantCharacterCardProps extends DormantCharacter {
  onBadgeClick?: () => void
}

export default function DormantCharacterCard({
  name,
  img,
  stateType,
  reason,
  chats,
  daysUntilRemoval,
  onBadgeClick,
}: DormantCharacterCardProps) {
  const isModeration = stateType === 'moderation'

  return (
    <div className="flex flex-col rounded-card bg-white-05 border border-white-10 cursor-pointer relative overflow-hidden">
      {/* Image — 4:5 compact aspect */}
      <div className="relative" style={{ paddingBottom: '125%' }}>
        <Image src={img} alt={name} fill className="object-cover object-top" />
        {/* Top scrim */}
        <div className="absolute top-0 left-0 right-0 h-xxxl pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.30) 60%, transparent 100%)' }}
        />
        {/* State badge — top left, tappable */}
        {isModeration ? (
          <button
            onClick={(e) => { e.stopPropagation(); onBadgeClick?.() }}
            className="absolute top-[6px] left-[6px] inline-flex items-center gap-xxs px-xs py-xxxs rounded-pill backdrop-blur-bg text-xxs font-medium bg-status-warning/[0.20] text-status-warning border border-status-warning/[0.30] cursor-pointer hover:bg-status-warning/[0.30] transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Policy Review
          </button>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); onBadgeClick?.() }}
            className="absolute top-[6px] left-[6px] inline-flex items-center gap-xxs px-xs py-xxxs rounded-pill backdrop-blur-bg text-xxs font-medium bg-black-50 text-white-60 border border-white-10 cursor-pointer hover:bg-black-40 transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            Inactive
          </button>
        )}
      </div>

      {/* Bottom strip — uniform p-s (12px) on all sides */}
      <div className="p-s border-t border-white-05 flex flex-col gap-xs">
        <p className="font-semibold text-xs text-text-title truncate">{name}</p>

        {/* Meta row */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-xxs text-text-xsmall text-xs">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {chats}
          </span>
          <span className="text-xs font-medium text-status-warning">{daysUntilRemoval}d left</span>
        </div>

        {/* Revive CTA */}
        <CreditButton label="Revive" credits={20} size="xs" variant="secondary" fullWidth />
      </div>
    </div>
  )
}
