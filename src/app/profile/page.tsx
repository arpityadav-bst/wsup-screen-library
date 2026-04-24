'use client'

import { useState, useEffect } from 'react'
import useVerticalScrollbar from '@/hooks/useVerticalScrollbar'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import BottomNav from '@/components/shared/BottomNav'
import RankBanner from '@/components/profile/RankBanner'
import ProfileHero from '@/components/profile/ProfileHero'
import StatsRow from '@/components/profile/StatsRow'
import ActivePersonaCard from '@/components/profile/ActivePersonaCard'
import BadgesWidget from '@/components/profile/BadgesWidget'
import ProfileTabBar from '@/components/profile/ProfileTabBar'
import ContentGrid from '@/components/profile/ContentGrid'
import MyCharactersDashboard from '@/components/profile/MyCharactersDashboard'
import CharacterStatesSheet from '@/components/profile/CharacterStatesSheet'
import BioSheet from '@/components/profile/BioSheet'
import BadgesSheet from '@/components/profile/BadgesSheet'
import MenuSheet, { MenuPopoverItems } from '@/components/profile/MenuSheet'
import Popover from '@/components/ui/Popover'
import CharacterMenuSheet, { DormantCharacterMenuSheet } from '@/components/profile/CharacterMenuSheet'
import LogoutConfirmSheet from '@/components/profile/LogoutConfirmSheet'
import DevStateToggle, { DevStateOption } from '@/components/ui/DevStateToggle'
import SocialView from '@/components/profile/SocialView'
import MyCardsView from '@/components/profile/MyCardsView'
import ProfileRightSidebar from '@/components/profile/ProfileRightSidebar'
import {
  PROFILE, PERSONA, BADGES, CHARACTERS, STORIES,
  FOLLOWERS, FOLLOWING, MY_CARDS,
  NEEDS_ATTENTION_CHARACTERS,
} from '@/lib/mockData'

// ── Page Component ───────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Characters')
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [bioOpen, setBioOpen] = useState(false)
  const [badgesSheetOpen, setBadgesSheetOpen] = useState(false)
  const [socialOpen, setSocialOpen] = useState(false)
  const [socialTab, setSocialTab] = useState('Followers')
  const [myCardsOpen, setMyCardsOpen] = useState(false)
  const [charMenuOpen, setCharMenuOpen] = useState(false)
  const [charMenuChar, setCharMenuChar] = useState<string | null>(null)
  const [statesSheetOpen, setStatesSheetOpen] = useState(false)
  const [dormantMenuOpen, setDormantMenuOpen] = useState(false)
  const [dormantMenuChar, setDormantMenuChar] = useState<string | null>(null)
  const [dormantMenuType, setDormantMenuType] = useState('inactive')
  const { scrollRef, thumbProps } = useVerticalScrollbar()

  // Data state toggle — R to show/hide, Shift+R to cycle
  const DATA_MODES = ['full', 'active-only', 'dormant-only', 'removed-only', 'empty'] as const
  type DataMode = typeof DATA_MODES[number]
  const DATA_LABELS: Record<DataMode, string> = {
    'full': 'Full Data',
    'active-only': 'Active Only',
    'dormant-only': 'Dormant Only',
    'removed-only': 'Removed Only',
    'empty': 'Zero Characters',
  }
  const [dataMode, setDataMode] = useState<DataMode>('full')
  const [showDataToggle, setShowDataToggle] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'r' || e.key === 'R') {
        if (e.shiftKey) {
          setDataMode(prev => {
            const i = DATA_MODES.indexOf(prev)
            return DATA_MODES[(i + 1) % DATA_MODES.length]
          })
        } else {
          setShowDataToggle(prev => !prev)
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const activeCharsData = dataMode === 'empty' || dataMode === 'dormant-only' || dataMode === 'removed-only' ? [] : CHARACTERS
  const needsAttentionData = dataMode === 'empty' || dataMode === 'active-only'
    ? []
    : dataMode === 'removed-only'
      ? NEEDS_ATTENTION_CHARACTERS.filter(c => c.stateType === 'removed')
      : dataMode === 'dormant-only'
        ? NEEDS_ATTENTION_CHARACTERS.filter(c => c.stateType !== 'removed')
        : NEEDS_ATTENTION_CHARACTERS

  const tabs = [
    { label: 'Characters', count: CHARACTERS.length + NEEDS_ATTENTION_CHARACTERS.length },
    { label: 'Stories', count: STORIES.length },
  ]

  return (
    <div className="min-h-screen bg-page-bg">
      <Header />
      <div className="hidden md:block"><Sidebar /></div>

      {/* Main content area */}
      <main className="md:ml-[365px] pt-[60px] md:pt-0 md:mt-[60px] min-h-screen md:min-h-0 md:h-[calc(100vh-60px)] md:flex md:overflow-hidden">

        {/* Center content */}
        <div className="flex-1 min-w-0 md:border-r md:border-white-10 md:h-full md:flex md:flex-col">

          {/* Mobile: rank banner + hero */}
          <div className="md:hidden">
            <RankBanner position={PROFILE.rank.position} label={PROFILE.rank.label} />
            <ProfileHero
              name={PROFILE.name}
              avatar={PROFILE.avatar}
              creatorBadge={PROFILE.creatorBadge}
              bio={PROFILE.bio}
              onReadMore={() => setBioOpen(true)}
              onMenuOpen={() => setMenuOpen(true)}
            />
            <StatsRow
              stats={PROFILE.stats}
              onFollowersOpen={() => { setSocialTab('Followers'); setSocialOpen(true) }}
              onFollowingOpen={() => { setSocialTab('Following'); setSocialOpen(true) }}
            />
            <ActivePersonaCard {...PERSONA} />
            <BadgesWidget
              badges={BADGES}
              onSeeAll={() => setBadgesSheetOpen(true)}
              onBadgeClick={() => setBadgesSheetOpen(true)}
            />
          </div>

          {/* Desktop: profile header */}
          <div className="hidden md:flex items-center h-3xxxl px-xs shrink-0 bg-page-bg">
            <button className="p-icon-btn rounded-full hover:bg-white-10 transition-colors text-white-90 shrink-0 border-none bg-transparent cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 16.8333 13.5" fill="none">
                <path d="M6.97727 0.5L0.5 6.75M0.5 6.75L6.97727 13M0.5 6.75H16.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="ml-xs text-base font-semibold text-text-title">Profile</span>
            <div className="flex-1" />
            <div className="relative">
              <button
                onClick={() => setMenuOpen(true)}
                className="p-icon-btn rounded-full hover:bg-white-10 transition-colors text-white-90 border-none bg-transparent cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>
              <Popover open={menuOpen} onClose={() => setMenuOpen(false)}>
                <MenuPopoverItems
                  onClose={() => setMenuOpen(false)}
                  onMyCards={() => setMyCardsOpen(true)}
                  onLogout={() => { setMenuOpen(false); setLogoutOpen(true) }}
                />
              </Popover>
            </div>
          </div>

          {/* Scrollable area */}
          <div className="flex-1 min-h-0 relative">
            <div className="scroll-thumb-vertical hidden md:block" {...thumbProps} />
            <div ref={scrollRef} className="h-full md:overflow-y-auto scroll-hide">
              <ProfileTabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
              {activeTab === 'Characters' ? (
                <MyCharactersDashboard
                  activeChars={activeCharsData}
                  needsAttentionChars={needsAttentionData}
                  onCharMenu={(name) => { setCharMenuChar(name); setCharMenuOpen(true) }}
                  onDormantMenu={(name, stateType) => { setDormantMenuChar(name); setDormantMenuType(stateType); setDormantMenuOpen(true) }}
                  onStatesInfo={() => setStatesSheetOpen(true)}
                />
              ) : (
                <ContentGrid
                  activeTab={activeTab}
                  characters={CHARACTERS}
                  stories={STORIES}
                  onCharMenu={(name) => { setCharMenuChar(name); setCharMenuOpen(true) }}
                />
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
          name={PROFILE.name}
          handle={PROFILE.handle}
          avatar={PROFILE.avatar}
          creatorBadge={PROFILE.creatorBadge}
          bio={PROFILE.bio}
          stats={PROFILE.stats}
          badges={BADGES}
          persona={PERSONA}
          rank={PROFILE.rank}
          onBadgesSeeAll={() => setBadgesSheetOpen(true)}
          onReadMore={() => setBioOpen(true)}
          onMenuOpen={() => setMenuOpen(true)}
          socialOpen={socialOpen}
          socialTab={socialTab}
          onSocialClose={() => setSocialOpen(false)}
          onFollowersOpen={() => { setSocialTab('Followers'); setSocialOpen(true) }}
          onFollowingOpen={() => { setSocialTab('Following'); setSocialOpen(true) }}
          followers={FOLLOWERS}
          following={FOLLOWING}
          followersCount="3.2k"
          followingCount="284"
        />
      </main>

      {/* Full-screen overlay views — mobile only */}
      <div className="md:hidden">
        <SocialView
          open={socialOpen}
          initialTab={socialTab}
          onClose={() => setSocialOpen(false)}
          followers={FOLLOWERS}
          following={FOLLOWING}
          followersCount="3.2k"
          followingCount="284"
        />
      </div>
      <MyCardsView open={myCardsOpen} onClose={() => setMyCardsOpen(false)} cards={MY_CARDS} />

      {/* Sheets */}
      <MenuSheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onMyCards={() => setMyCardsOpen(true)}
        onLogout={() => { setMenuOpen(false); setLogoutOpen(true) }}
      />
      <LogoutConfirmSheet open={logoutOpen} onClose={() => setLogoutOpen(false)} onConfirm={() => setLogoutOpen(false)} />
      <BioSheet open={bioOpen} onClose={() => setBioOpen(false)} name={PROFILE.name} bio={PROFILE.bio} />
      <BadgesSheet open={badgesSheetOpen} onClose={() => setBadgesSheetOpen(false)} badges={BADGES} />
      <CharacterMenuSheet open={charMenuOpen} onClose={() => setCharMenuOpen(false)} character={charMenuChar} />
      <DormantCharacterMenuSheet open={dormantMenuOpen} onClose={() => setDormantMenuOpen(false)} character={dormantMenuChar} stateType={dormantMenuType} />
      <CharacterStatesSheet open={statesSheetOpen} onClose={() => setStatesSheetOpen(false)} />

      <BottomNav />

      <DevStateToggle open={showDataToggle} title="Data" hint="R toggle · Shift+R cycle">
        {DATA_MODES.map((mode) => (
          <DevStateOption key={mode} active={dataMode === mode} onClick={() => setDataMode(mode)}>
            {DATA_LABELS[mode]}
          </DevStateOption>
        ))}
      </DevStateToggle>
    </div>
  )
}
