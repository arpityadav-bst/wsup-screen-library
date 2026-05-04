import AvatarRing from '@/components/ui/AvatarRing'
import Button from '@/components/ui/Button'

interface ProfileHeroProps {
  name: string
  avatar: string
  creatorBadge: string
  bio: string
  onReadMore: () => void
  onMenuOpen: () => void
  viewMode?: 'self' | 'public'
  isFollowing?: boolean
  onFollowToggle?: () => void
  /** Public mode only — when true, the primary CTA swaps Follow → Unblock (single-tap, no confirm) */
  isBlocked?: boolean
  onUnblock?: () => void
}

export default function ProfileHero({
  name, avatar, creatorBadge, bio, onReadMore, onMenuOpen,
  viewMode = 'self', isFollowing = false, onFollowToggle,
  isBlocked = false, onUnblock,
}: ProfileHeroProps) {
  const isSelf = viewMode === 'self'
  return (
    <div className="flex flex-col items-center w-full relative">
      {/* Action buttons — top right (mobile only).
          Self: edit + share + 3-dot. Public: share + 3-dot only. */}
      <div className="absolute top-s right-s flex items-center gap-xxs">
        {isSelf && (
          <button className="w-xxxl h-xxxl rounded-button flex items-center justify-center text-text-dim">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <button className="w-xxxl h-xxxl rounded-button flex items-center justify-center text-text-dim">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
            <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
            <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        {/* 3-dot menu — mobile only (desktop has it in center header) */}
        <button onClick={onMenuOpen} className="w-xxxl h-xxxl rounded-button flex items-center justify-center text-text-dim md:hidden">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="1.5" fill="currentColor" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div className="px-m mt-l w-full flex flex-col items-start text-left">
        {/* Avatar */}
        <div className="mb-xs">
          <AvatarRing src={avatar} alt={name} size={80} />
        </div>

        {/* Name + badge */}
        <div className="flex items-center gap-xxs mb-xxs flex-wrap">
          <h1 className="font-semibold text-xl text-text-title leading-tight">{name}</h1>
          <div className="inline-flex items-center gap-xxs px-xs py-xxxs rounded-pill text-xxs font-semibold text-status-warning bg-status-warning/[0.12] border border-status-warning/30"
          >
            {creatorBadge}
          </div>
        </div>

        {/* Bio with clamp */}
        <div className="text-sm text-text-body leading-relaxed relative">
          <div className="line-clamp-3">{bio}</div>
          <div className="absolute bottom-0 right-0 pl-[48px] bio-fade">
            <button onClick={onReadMore} className="text-sm text-text-body underline cursor-pointer bg-transparent border-none">
              Read more
            </button>
          </div>
        </div>

        {/* Public-mode primary CTA — Block state overrides Follow state.
            Blocked: single-tap Unblock (no confirm — block had its confirm; unblocking is the un-friction action).
            Following: secondary-styled button. Default: primary Follow. */}
        {!isSelf && (
          <div className="mt-m w-full">
            {isBlocked ? (
              <Button variant="secondary" size="m" fullWidth onClick={onUnblock}>
                Unblock
              </Button>
            ) : (
              <Button
                variant={isFollowing ? 'secondary' : 'primary'}
                size="m"
                fullWidth
                onClick={onFollowToggle}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
