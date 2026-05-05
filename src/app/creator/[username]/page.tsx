'use client'

import { useState, useRef } from 'react'
import { notFound } from 'next/navigation'
import useVerticalScrollbar from '@/hooks/useVerticalScrollbar'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import BottomNav from '@/components/shared/BottomNav'
import RankBanner from '@/components/profile/RankBanner'
import ProfileHero from '@/components/profile/ProfileHero'
import StatsRow from '@/components/profile/StatsRow'
import BadgesWidget from '@/components/profile/BadgesWidget'
import ProfileTabBar from '@/components/profile/ProfileTabBar'
import ContentGrid from '@/components/profile/ContentGrid'
import BioSheet from '@/components/profile/BioSheet'
import BadgesSheet from '@/components/profile/BadgesSheet'
import PublicMenuSheet from '@/components/profile/PublicMenuSheet'
import BlockConfirmSheet from '@/components/profile/BlockConfirmSheet'
import EmptyState from '@/components/ui/EmptyState'
import ProfileRightSidebar from '@/components/profile/ProfileRightSidebar'
import {
  HONEYBADGER_PROFILE, HONEYBADGER_CHARACTERS, HONEYBADGER_STORIES,
  HONEYBADGER_FOLLOWERS, HONEYBADGER_FOLLOWING,
  BADGES,
} from '@/lib/mockData'

// ── Creator lookup (mock — single creator for now) ──────────────────────────
const CREATORS = {
  honeybadger: {
    profile: HONEYBADGER_PROFILE,
    characters: HONEYBADGER_CHARACTERS,
    stories: HONEYBADGER_STORIES,
    followers: HONEYBADGER_FOLLOWERS,
    following: HONEYBADGER_FOLLOWING,
    badges: BADGES.slice(0, 6),
    persona: { name: '', description: '', img: '' }, // unused on public
  },
} as const

export default function CreatorPage({ params }: { params: { username: string } }) {
  const slug = params.username.toLowerCase()
  const creator = CREATORS[slug as keyof typeof CREATORS]
  if (!creator) notFound()

  const { profile, characters, stories, followers, following, badges } = creator
  const followersCount = profile.stats.find(s => s.label === 'Followers')?.value ?? '0'
  const followingCount = profile.stats.find(s => s.label === 'Following')?.value ?? '0'

  const [activeTab, setActiveTab] = useState('Characters')
  const [menuOpen, setMenuOpen] = useState(false)
  const dotsBtnRef = useRef<HTMLButtonElement>(null)
  const [bioOpen, setBioOpen] = useState(false)
  const [badgesSheetOpen, setBadgesSheetOpen] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockConfirmOpen, setBlockConfirmOpen] = useState(false)
  const { scrollRef, thumbProps } = useVerticalScrollbar()

  // Followers/Following counts stay visible in StatsRow as credibility signals,
  // but the drilldown to the social list is owner-only — no SocialView mount on public.
  const noOpDrilldown = () => {}

  const handleReport = () => {
    // Dev-handoff stub: real flow would open a report dialog/sheet
    setMenuOpen(false)
  }

  const handleBlock = () => setBlockConfirmOpen(true)
  const handleBlockConfirm = () => {
    setIsBlocked(true)
    setIsFollowing(false) // blocking implicitly unfollows
    setBlockConfirmOpen(false)
  }
  const handleUnblock = () => setIsBlocked(false)

  const tabs = [
    { label: 'Characters', count: characters.length },
    { label: 'Stories', count: stories.length },
  ]

  return (
    <div className="min-h-screen bg-page-bg">
      <Header />
      <div className="hidden md:block"><Sidebar /></div>

      <main className="md:ml-[365px] pt-[60px] md:pt-0 md:mt-[60px] min-h-screen md:min-h-0 md:h-[calc(100vh-60px)] md:flex md:overflow-hidden">

        {/* Center content */}
        <div className="flex-1 min-w-0 md:border-r md:border-white-10 md:h-full md:flex md:flex-col">

          {/* Mobile: rank banner + hero */}
          <div className="md:hidden">
            <RankBanner position={profile.rank.position} label={profile.rank.label} />
            <ProfileHero
              name={profile.name}
              avatar={profile.avatar}
              creatorBadge={profile.creatorBadge}
              bio={profile.bio}
              onReadMore={() => setBioOpen(true)}
              onMenuOpen={() => setMenuOpen(true)}
              viewMode="public"
              isFollowing={isFollowing}
              onFollowToggle={() => setIsFollowing(v => !v)}
              isBlocked={isBlocked}
              onUnblock={handleUnblock}
            />
            <StatsRow
              stats={profile.stats}
              onFollowersOpen={noOpDrilldown}
              onFollowingOpen={noOpDrilldown}
              viewMode="public"
            />
            <BadgesWidget
              badges={badges}
              onSeeAll={() => setBadgesSheetOpen(true)}
              onBadgeClick={() => setBadgesSheetOpen(true)}
            />
          </div>

          {/* Desktop: profile header — share + 3-dot only (no edit on a public profile) */}
          <div className="hidden md:flex items-center h-3xxxl px-xs shrink-0 bg-page-bg">
            <button className="p-icon-btn rounded-full hover:bg-white-10 transition-colors text-white-90 shrink-0 border-none bg-transparent cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 16.8333 13.5" fill="none">
                <path d="M6.97727 0.5L0.5 6.75M0.5 6.75L6.97727 13M0.5 6.75H16.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="ml-xs text-base font-semibold text-text-title">{profile.name}</span>
            <div className="flex-1" />
            <div className="relative">
              <button
                ref={dotsBtnRef}
                onClick={() => setMenuOpen(true)}
                className="p-icon-btn rounded-full hover:bg-white-10 transition-colors text-white-90 border-none bg-transparent cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable area */}
          <div className="flex-1 min-h-0 relative">
            <div className="scroll-thumb-vertical hidden md:block" {...thumbProps} />
            <div ref={scrollRef} className="h-full md:overflow-y-auto scroll-hide">
              {isBlocked ? (
                /* Blocked state — replaces tabs + grid with a single empty-state banner.
                   Hero (avatar/name/bio/Unblock CTA) and Stats stay visible above. */
                <EmptyState
                  variant="blocked"
                  message={`You blocked ${profile.name}. Their characters and stories are hidden. Unblock to see them again.`}
                />
              ) : (
                <>
                  <ProfileTabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
                  {/* Public profile: simple grid for both tabs — no lifecycle filter, no needs-attention, no removed */}
                  <ContentGrid
                    activeTab={activeTab}
                    characters={characters}
                    stories={stories}
                    viewMode="public"
                  />
                </>
              )}
            </div>
          </div>

          {/* Footer — mobile only */}
          <div className="pb-[80px] md:hidden">
            <p className="text-center text-sm text-text-xsmall mt-xs">
              Connect with us at{' '}
              <a href="mailto:support@wsup.ai" className="text-brand-blue no-underline">support@wsup.ai</a>
            </p>
            <p className="text-center text-xs text-text-xxsmall mt-xxs">
              © 2026 now.gg. All rights reserved.
            </p>
          </div>
        </div>

        {/* Desktop: right sidebar */}
        <ProfileRightSidebar
          name={profile.name}
          handle={profile.handle}
          avatar={profile.avatar}
          creatorBadge={profile.creatorBadge}
          bio={profile.bio}
          stats={profile.stats}
          badges={badges}
          persona={creator.persona}
          rank={profile.rank}
          onBadgesSeeAll={() => setBadgesSheetOpen(true)}
          onReadMore={() => setBioOpen(true)}
          onMenuOpen={() => setMenuOpen(true)}
          socialOpen={false}
          socialTab="Followers"
          onSocialClose={noOpDrilldown}
          onFollowersOpen={noOpDrilldown}
          onFollowingOpen={noOpDrilldown}
          followers={followers}
          following={following}
          followersCount={followersCount}
          followingCount={followingCount}
          viewMode="public"
          isFollowing={isFollowing}
          onFollowToggle={() => setIsFollowing(v => !v)}
          isBlocked={isBlocked}
          onUnblock={handleUnblock}
        />
      </main>

      {/* Sheets */}
      <PublicMenuSheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorRef={dotsBtnRef}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
        onReport={handleReport}
        isBlocked={isBlocked}
      />
      <BlockConfirmSheet
        open={blockConfirmOpen}
        onClose={() => setBlockConfirmOpen(false)}
        onConfirm={handleBlockConfirm}
        creatorName={profile.name}
      />
      <BioSheet open={bioOpen} onClose={() => setBioOpen(false)} name={profile.name} bio={profile.bio} />
      <BadgesSheet open={badgesSheetOpen} onClose={() => setBadgesSheetOpen(false)} badges={badges} />

      <BottomNav />
    </div>
  )
}
