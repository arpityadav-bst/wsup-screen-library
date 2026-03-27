import AvatarRing from '@/components/ui/AvatarRing'
import SectionAction from '@/components/ui/SectionAction'
import type { Badge } from './BadgesWidget'

interface ProfileRightSidebarProps {
  name: string
  handle: string
  avatar: string
  creatorBadge: string
  bio: string
  stats: { label: string; value: string }[]
  badges: Badge[]
  persona: { name: string; description: string }
  onBadgesSeeAll: () => void
}

export default function ProfileRightSidebar({
  name, handle, avatar, creatorBadge, bio, stats, badges, persona, onBadgesSeeAll
}: ProfileRightSidebarProps) {
  return (
    <div className="hidden md:block w-[340px] shrink-0 border-l border-white-10 overflow-y-auto" style={{ height: 'calc(100vh - 60px)', scrollbarWidth: 'none' }}>
      <div className="flex flex-col items-start gap-m px-l py-l">

        {/* Avatar + Name + Badge */}
        <AvatarRing src={avatar} alt={name} size={80} />
        <div>
          <div className="flex items-center gap-xs flex-wrap">
            <h2 className="font-semibold text-xl text-text-title">{name}</h2>
            <div className="inline-flex items-center gap-xxs px-xs py-xxxs rounded-pill text-xxs font-semibold text-status-warning bg-status-warning/[0.12] border border-status-warning/30">
              {creatorBadge}
            </div>
          </div>
          <p className="text-sm text-text-dim mt-xxs">{handle}</p>
        </div>

        {/* Bio */}
        <p className="text-sm text-text-body leading-relaxed line-clamp-4">{bio}</p>

        {/* Stats — 2x2 grid */}
        <div className="grid grid-cols-2 gap-xs w-full">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-xs rounded-card bg-white-05 border border-white-10">
              <span className="font-semibold text-lg text-text-title">{s.value}</span>
              <span className="text-xs text-text-xsmall">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Actions — S size Secondary/Outlined buttons */}
        <div className="flex gap-xs w-full">
          <button className="flex-1 py-xs rounded-pill border border-white-20 bg-transparent text-sm font-semibold text-text-body cursor-pointer hover:bg-white-05 transition-colors">
            Edit Profile
          </button>
          <button className="flex-1 py-xs rounded-pill border border-white-20 bg-transparent text-sm font-semibold text-text-body cursor-pointer hover:bg-white-05 transition-colors">
            Share
          </button>
        </div>

        {/* Active Persona */}
        <div className="w-full rounded-card bg-white-05 border border-white-10 p-s">
          <span className="label-xs">Active Persona</span>
          <p className="font-semibold text-sm text-text-title mt-xxs">{persona.name}</p>
          <p className="text-xs text-text-body mt-xxs line-clamp-2">{persona.description}</p>
        </div>

        {/* Badges */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-xs">
            <p className="label-xs">Badges · {badges.length}</p>
            <SectionAction onClick={onBadgesSeeAll}>See all</SectionAction>
          </div>
          <div className="grid grid-cols-3 gap-xs">
            {badges.slice(0, 6).map((b) => (
              <div key={b.label} className="flex flex-col items-center py-xs rounded-card bg-white-05 border border-white-10 cursor-pointer">
                <div className="flex items-center justify-center w-xxl h-xxl rounded-full text-base mb-xxs"
                  style={{ background: `${b.color}15`, border: `1.5px solid ${b.color}35` }}
                >
                  {b.emoji}
                </div>
                <span className="text-xxs text-text-xsmall text-center leading-tight w-full px-xxs">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="w-full pt-m border-t border-white-10">
          <p className="text-sm text-text-xsmall">
            Connect with us at{' '}
            <a href="mailto:support@wsup.ai" className="text-brand-blue no-underline">support@wsup.ai</a>
          </p>
          <p className="text-xs text-text-xxsmall mt-xxs">© 2026 now.gg. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
