import Image from 'next/image'

export interface RemovedCharacter {
  name: string
  img: string
  reason: string
  chats?: string
}

interface RemovedCharacterCardProps extends RemovedCharacter {}

export default function RemovedCharacterCard({
  name,
  img,
  reason,
  chats,
}: RemovedCharacterCardProps) {
  return (
    <div className="flex flex-col rounded-card bg-white-05 border border-white-10 relative overflow-hidden opacity-70">
      {/* Image — grayscale, 4:5 compact aspect */}
      <div className="relative grayscale" style={{ paddingBottom: '125%' }}>
        <Image src={img} alt={name} fill className="object-cover object-top opacity-50" />
        {/* Top scrim */}
        <div className="absolute top-0 left-0 right-0 h-xxxl pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.30) 60%, transparent 100%)' }}
        />
        {/* Removed badge — top left */}
        <div className="absolute top-[6px] left-[6px] inline-flex items-center px-xs py-xxxs rounded-pill backdrop-blur-bg text-xxs font-medium bg-status-alert/[0.25] text-status-alert border border-status-alert/[0.30]">
          Removed
        </div>
      </div>

      {/* Bottom strip */}
      <div className="p-s border-t border-white-05 flex flex-col gap-xs">
        <p className="font-semibold text-xs text-text-title truncate">{name}</p>

        {chats && (
          <span className="inline-flex items-center gap-xxs text-text-xsmall text-xs">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {chats}
          </span>
        )}

      </div>
    </div>
  )
}
