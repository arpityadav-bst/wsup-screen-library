import type { Badge } from './BadgesWidget'

interface BadgeDetailPopupProps {
  badge: Badge | null
  onClose: () => void
}

export default function BadgeDetailPopup({ badge, onClose }: BadgeDetailPopupProps) {
  if (!badge) return null
  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-10 flex items-center justify-center bg-black-50"
      style={{ animation: 'fade-in 0.15s ease-out' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-profile-sheet-bg rounded-popup border border-white-10 p-xl w-[220px] flex flex-col items-center shadow-big"
        style={{ animation: 'slide-up 0.2s cubic-bezier(0.32,0.72,0,1)' }}
      >
        <div
          className="w-[56px] h-[56px] rounded-full flex items-center justify-center text-[28px] mb-s"
          style={{ background: `${badge.color}18`, border: `1.5px solid ${badge.color}50`, boxShadow: `0 0 18px ${badge.color}30` }}
        >
          {badge.emoji}
        </div>
        <p className="font-bold text-base text-text-title text-center mb-xxs">{badge.label}</p>
        <p className="text-xs text-text-dim text-center mb-m">{badge.sub}</p>
        <button
          onClick={onClose}
          className="w-full h-[36px] rounded-pill bg-white-05 border border-white-10 text-text-body text-sm font-medium cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  )
}
