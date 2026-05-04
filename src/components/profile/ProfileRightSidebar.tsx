import RankBanner from './RankBanner'
import ProfileHero from './ProfileHero'
import StatsRow from './StatsRow'
import ActivePersonaCard from './ActivePersonaCard'
import SocialView from './SocialView'
import type { Badge } from './BadgesWidget'

interface Person {
  name: string
  img: string
}

interface ProfileRightSidebarProps {
  name: string
  handle: string
  avatar: string
  creatorBadge: string
  bio: string
  stats: { label: string; value: string; trend: string; up: boolean }[]
  badges: Badge[]
  persona: { name: string; description: string; img: string }
  rank: { position: number; label: string }
  onBadgesSeeAll: () => void
  onReadMore: () => void
  onMenuOpen: () => void
  socialOpen: boolean
  socialTab: string
  onSocialClose: () => void
  onFollowersOpen: () => void
  onFollowingOpen: () => void
  followers: Person[]
  following: Person[]
  followersCount: string
  followingCount: string
  /** Self shows persona + trend deltas; public hides persona, hides deltas, surfaces a Follow CTA in the hero. */
  viewMode?: 'self' | 'public'
  isFollowing?: boolean
  onFollowToggle?: () => void
  isBlocked?: boolean
  onUnblock?: () => void
}

export default function ProfileRightSidebar({
  name, avatar, creatorBadge, bio, stats, persona, rank, badges,
  onReadMore, onMenuOpen,
  socialOpen, socialTab, onSocialClose, onFollowersOpen, onFollowingOpen,
  followers, following, followersCount, followingCount,
  viewMode = 'self', isFollowing = false, onFollowToggle,
  isBlocked = false, onUnblock,
}: ProfileRightSidebarProps) {
  const isSelf = viewMode === 'self'
  return (
    <div className="hidden md:block w-[365px] shrink-0 border-l border-white-10 overflow-y-auto relative h-full scroll-hide">

      {/* SocialView overlay inside sidebar */}
      {socialOpen && (
        <SocialView
          open={socialOpen}
          initialTab={socialTab}
          onClose={onSocialClose}
          followers={followers}
          following={following}
          followersCount={followersCount}
          followingCount={followingCount}
          mode="sidebar"
        />
      )}

      <RankBanner position={rank.position} label={rank.label} />

      {/* Reuse same ProfileHero from mobile */}
      <ProfileHero
        name={name}
        avatar={avatar}
        creatorBadge={creatorBadge}
        bio={bio}
        onReadMore={onReadMore}
        onMenuOpen={onMenuOpen}
        viewMode={viewMode}
        isFollowing={isFollowing}
        onFollowToggle={onFollowToggle}
        isBlocked={isBlocked}
        onUnblock={onUnblock}
      />

      {/* Reuse same StatsRow from mobile — public hides the trend deltas */}
      <StatsRow
        stats={stats}
        onFollowersOpen={onFollowersOpen}
        onFollowingOpen={onFollowingOpen}
        viewMode={viewMode}
      />

      {/* Active Persona — private to the creator, hidden on public profiles */}
      {isSelf && <ActivePersonaCard {...persona} />}

      {/* Badges — full grid, no horizontal scroll, no "see all" */}
      <div className="w-full mt-m px-m">
        <p className="label-xs mb-xs">
          Badges <span className="normal-case tracking-normal text-text-xxsmall font-normal text-xxs">· {badges.length}</span>
        </p>
        <div className="grid grid-cols-3 gap-xs">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center shrink-0 py-s px-s rounded-card bg-white-10 backdrop-blur-bg border border-white-10"
            >
              <div
                className="flex items-center justify-center w-xxxl h-xxxl rounded-full text-lg mb-xs shrink-0"
                style={{ background: `${b.color}15`, border: `1.5px solid ${b.color}35` }}
              >
                {b.emoji}
              </div>
              <span className="text-xs text-text-subtitle font-medium text-center leading-tight truncate w-full">{b.label}</span>
              <span className="text-xs text-text-xsmall text-center mt-xxs leading-tight whitespace-nowrap">{b.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-m pt-m pb-l">
        <p className="text-sm text-text-xsmall">
          Connect with us at{' '}
          <a href="mailto:support@wsup.ai" className="text-brand-blue no-underline">support@wsup.ai</a>
        </p>
        <p className="text-xs text-text-xxsmall mt-xxs">© 2026 now.gg. All rights reserved.</p>
      </div>
    </div>
  )
}
