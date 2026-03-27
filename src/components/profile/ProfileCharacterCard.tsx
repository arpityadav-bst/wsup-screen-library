import TrendArrow from '@/components/ui/TrendArrow'

const TAG_CONFIG: Record<string, { label: string; border: string; glow: string }> = {
  'chat-leader':   { label: '💬 Chat Leader',  border: 'rgba(0,131,255,0.50)',   glow: '0 0 8px rgba(0,131,255,0.40), 0 0 16px rgba(0,131,255,0.20)' },
  'fan-fave':      { label: '❤️ Fan Fave',      border: 'rgba(236,72,153,0.50)',  glow: '0 0 8px rgba(236,72,153,0.40), 0 0 16px rgba(236,72,153,0.20)' },
  'creators-pick': { label: '⭐ Featured',      border: 'rgba(244,218,92,0.50)',  glow: '0 0 8px rgba(244,218,92,0.40), 0 0 16px rgba(244,218,92,0.20)' },
  'trending':      { label: '📈 Trending',      border: 'rgba(74,222,128,0.50)',  glow: '0 0 8px rgba(74,222,128,0.40), 0 0 16px rgba(74,222,128,0.20)' },
}

interface ProfileCharacterCardProps {
  name: string
  chats: string
  img: string
  rank: number
  trend: number
  tag?: string
  onMenu?: () => void
}

export default function ProfileCharacterCard({ name, chats, img, rank, trend, tag, onMenu }: ProfileCharacterCardProps) {
  const tagInfo = tag ? TAG_CONFIG[tag] : null

  return (
    <div className="flex flex-col rounded-card overflow-hidden bg-white-05 border border-white-10 cursor-pointer relative">
      {/* Image */}
      <div className="relative" style={{ paddingBottom: '142.22%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={name} className="absolute inset-0 w-full h-full object-cover object-top" />
        {/* Top scrim */}
        <div className="absolute top-0 left-0 right-0 h-[40px] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.30) 60%, transparent 100%)' }}
        />
        {/* Tag badge */}
        {tagInfo && (
          <div
            className="absolute top-[6px] left-[6px] flex items-center px-xs py-xxxs rounded-pill backdrop-blur-bg"
            style={{ background: 'rgba(0,0,0,0.45)', border: `1px solid ${tagInfo.border}`, boxShadow: tagInfo.glow }}
          >
            <span className="text-xxs text-text-title tracking-[0.8px]">{tagInfo.label}</span>
          </div>
        )}
        {/* 3-dot menu */}
        <button
          onClick={(e) => { e.stopPropagation(); onMenu?.() }}
          className="absolute top-xs right-xxs w-l h-l flex items-center justify-center text-text-title bg-transparent border-none cursor-pointer p-0"
          style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>

      {/* Bottom strip */}
      <div className="py-xs px-s border-t border-white-05">
        <p className="font-semibold text-xs text-text-title truncate">{name}</p>
        <div className="flex items-center justify-between mt-xxs">
          <div className="flex items-center gap-xxs text-text-xsmall">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs">{chats}</span>
          </div>
          <div className="flex items-center gap-xxs">
            <span className="text-xs text-text-xsmall">#{rank}</span>
            <TrendArrow trend={trend} className={trend > 0 ? 'text-status-success' : 'text-status-alert'} />
          </div>
        </div>
      </div>
    </div>
  )
}
