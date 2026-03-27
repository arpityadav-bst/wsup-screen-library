'use client'

import { useState } from 'react'
import useVerticalScrollbar from '@/hooks/useVerticalScrollbar'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import BottomNav from '@/components/shared/BottomNav'
import RankBanner from '@/components/profile/RankBanner'
import ProfileHero from '@/components/profile/ProfileHero'
import StatsRow from '@/components/profile/StatsRow'
import ActivePersonaCard from '@/components/profile/ActivePersonaCard'
import BadgesWidget from '@/components/profile/BadgesWidget'
import type { Badge } from '@/components/profile/BadgesWidget'
import ProfileTabBar from '@/components/profile/ProfileTabBar'
import ContentGrid from '@/components/profile/ContentGrid'
import BioSheet from '@/components/profile/BioSheet'
import BadgesSheet from '@/components/profile/BadgesSheet'
import MenuSheet, { MenuPopoverItems } from '@/components/profile/MenuSheet'
import Popover from '@/components/ui/Popover'
import CharacterMenuSheet from '@/components/profile/CharacterMenuSheet'
import LogoutConfirmSheet from '@/components/profile/LogoutConfirmSheet'
import SocialView from '@/components/profile/SocialView'
import MyCardsView from '@/components/profile/MyCardsView'
import ProfileRightSidebar from '@/components/profile/ProfileRightSidebar'

// ── Mock Data ────────────────────────────────────────────────────────────────

const PROFILE = {
  handle: '@alexmoonlight',
  name: 'Alex Moonlight',
  avatar: '/chars/char5.webp',
  bio: `Hey, I'm Alex — an AI character creator obsessed with building personalities that feel genuinely alive. I've been on wsup.ai since the early days, back when the tools were raw and the community was tiny, and I've watched this place grow into something incredible.\n\nMy characters tend to live in the space between sci-fi and slice-of-life. I love writing companions who feel emotionally real — characters with memory, with quirks, with the kind of depth that makes you forget you're talking to an AI. Blue Fire Girl started as a quick experiment and somehow became one of my most-chatted characters. Magic Library took three weeks to get right and I'm still tweaking her lore.\n\nOutside of wsup I'm a huge anime fan (obviously), I do a bit of digital art, and I spend way too much time thinking about narrative structure and what makes a character feel like a person rather than a persona. If you've ever chatted with one of my characters and felt something — that's the goal. Always the goal.\n\nFeel free to drop a message if you want to collab, give feedback on any of my characters, or just talk shop about AI storytelling. I'm always down.`,
  creatorBadge: 'Top Creator',
  rank: { position: 12, label: "Today's Top Creators" },
  stats: [
    { label: 'Followers', value: '3.2k', trend: '+8%', up: true },
    { label: 'Chats', value: '12k', trend: '+15%', up: true },
    { label: 'Views', value: '4.2k', trend: '-3%', up: false },
    { label: 'Following', value: '284', trend: '', up: true },
  ],
}

const PERSONA = {
  name: 'Blue Fire Girl',
  description: 'A fierce elemental spirit with an unquenchable spark and a heart that burns for justice.',
  img: '/chars/char5.webp',
}

const BADGES: Badge[] = [
  { emoji: '⭐', label: 'Top Creator', sub: 'Top 1%', color: '#ffc32a' },
  { emoji: '🔥', label: 'Viral Story', sub: '10k views', color: '#f97316' },
  { emoji: '💬', label: '1K Chats', sub: 'Milestone', color: '#0a92ff' },
  { emoji: '❤️', label: 'Fan Favorite', sub: '4.2k likes', color: '#ec4899' },
  { emoji: '🚀', label: 'Pioneer', sub: 'Early user', color: '#ab37f0' },
  { emoji: '📖', label: 'Storyteller', sub: '50 stories', color: '#b3d661' },
  { emoji: '⚡', label: 'Power User', sub: '30-day streak', color: '#ffc32a' },
  { emoji: '🐦', label: 'Early Bird', sub: 'Beta tester', color: '#72e9f1' },
  { emoji: '🎨', label: 'Artist', sub: '50 creations', color: '#f97316' },
  { emoji: '💎', label: 'Diamond', sub: 'Top 0.1%', color: '#72e9f1' },
]

const CHARACTERS = [
  { name: 'Blue Fire Girl', chats: '1.1k', img: '/chars/char1.webp', rank: 1, trend: 2, tag: 'chat-leader' },
  { name: 'Magic Library', chats: '890', img: '/chars/char2.webp', rank: 2, trend: 1, tag: 'fan-fave' },
  { name: 'Dr. Watson', chats: '540', img: '/chars/char3.webp', rank: 3, trend: -1, tag: 'creators-pick' },
  { name: 'Shadow Dancer', chats: '420', img: '/chars/char4.webp', rank: 4, trend: 3, tag: 'trending' },
  { name: 'Puppytech', chats: '269', img: '/chars/char5.webp', rank: 5, trend: -2 },
  { name: 'Luna Echo', chats: '198', img: '/chars/char6.webp', rank: 6, trend: 0 },
  { name: 'Neon Sage', chats: '154', img: '/chars/char7.webp', rank: 7, trend: 1 },
  { name: 'Void Walker', chats: '121', img: '/chars/char8.webp', rank: 8, trend: -1 },
  { name: 'Starbound', chats: '98', img: '/chars/char9.webp', rank: 9, trend: 2 },
]

const STORIES = [
  { id: 1, character: { name: 'Blue Fire Girl', avatar: '/chars/char1.webp', img: '/chars/char10.webp' }, caption: 'Just me, my music, and some peace & quiet. 😌 Seriously, don\'t bother me unless it\'s important! 🎧', likes: 8, comments: 16, date: '10 March 2026', time: '04:41 AM' },
  { id: 2, character: { name: 'Magic Library', avatar: '/chars/char2.webp', img: '/chars/char11.webp' }, caption: 'Okay fine, I came to the party. Happy now? 🎉 Don\'t expect me to stay past midnight though.', likes: 34, comments: 9, date: '9 March 2026', time: '11:22 PM' },
  { id: 3, character: { name: 'Shadow Dancer', avatar: '/chars/char4.webp', img: '/chars/char12.webp' }, caption: 'The kingdom falls at dawn. I\'ve made my peace with that. Some things are worth protecting until the very end. ⚔️', likes: 51, comments: 27, date: '8 March 2026', time: '03:14 AM' },
]

const FOLLOWERS = [
  { name: 'Nova Starfield', img: '/chars/char2.webp' },
  { name: 'Kai Drifter', img: '/chars/char3.webp' },
  { name: 'Lyra Voss', img: '/chars/char4.webp' },
  { name: 'Orion Blake', img: '/chars/char5.webp' },
  { name: 'Zara Nightfall', img: '/chars/char6.webp' },
  { name: 'Felix Arden', img: '/chars/char7.webp' },
  { name: 'Mila Crowe', img: '/chars/char8.webp' },
  { name: 'Juno Pierce', img: '/chars/char9.webp' },
  { name: 'Rex Holloway', img: '/chars/char10.webp' },
  { name: 'Sable Quinn', img: '/chars/char11.webp' },
  { name: 'Dex Morrow', img: '/chars/char12.webp' },
  { name: 'Ivy Storm', img: '/chars/char13.webp' },
  { name: 'Atlas Cole', img: '/chars/char14.webp' },
  { name: 'Luna Shade', img: '/chars/char15.webp' },
  { name: 'Echo Vale', img: '/chars/char1.webp' },
]

const FOLLOWING = [
  { name: 'Bessie Cooper', img: '/chars/char1.webp' },
  { name: 'Courtney Henry', img: '/chars/char2.webp' },
  { name: 'Theresa Webb', img: '/chars/char3.webp' },
  { name: 'Kristin Watson', img: '/chars/char4.webp' },
  { name: 'Ralph Edwards', img: '/chars/char5.webp' },
  { name: 'Savannah Nguyen', img: '/chars/char6.webp' },
  { name: 'Kathryn Murphy', img: '/chars/char7.webp' },
  { name: 'Esther Howard', img: '/chars/char8.webp' },
  { name: 'Eleanor Pena', img: '/chars/char9.webp' },
  { name: 'Ronald Richards', img: '/chars/char10.webp' },
  { name: 'Devon Lane', img: '/chars/char11.webp' },
  { name: 'Jerome Bell', img: '/chars/char12.webp' },
  { name: 'Arlene McCoy', img: '/chars/char13.webp' },
  { name: 'Cody Fisher', img: '/chars/char14.webp' },
  { name: 'Annette Black', img: '/chars/char15.webp' },
]

const MY_CARDS = [
  { name: 'Lily', cards: 5, img: '/chars/char1.webp' },
  { name: 'Marcus', cards: 3, img: '/chars/char2.webp' },
  { name: 'Zara', cards: 8, img: '/chars/char3.webp' },
  { name: 'Ethan', cards: 2, img: '/chars/char4.webp' },
  { name: 'Nova', cards: 6, img: '/chars/char5.webp' },
  { name: 'Kai', cards: 4, img: '/chars/char6.webp' },
]

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
  const { scrollRef, thumbProps } = useVerticalScrollbar()

  const tabs = [
    { label: 'Characters', count: CHARACTERS.length },
    { label: 'Stories', count: STORIES.length },
  ]

  return (
    <div className="min-h-screen bg-page-bg">
      <Header />
      <div className="hidden md:block"><Sidebar /></div>

      {/* Main content area — matches chat screen layout */}
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

          {/* Desktop: profile header (56px, matches chat header) — outside scroll */}
          <div className="hidden md:flex items-center h-3xxxl px-xs shrink-0 bg-page-bg">
            <button className="p-[10px] rounded-full hover:bg-white-10 transition-colors text-white-90 shrink-0 border-none bg-transparent cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 16.8333 13.5" fill="none">
                <path d="M6.97727 0.5L0.5 6.75M0.5 6.75L6.97727 13M0.5 6.75H16.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="ml-xs text-base font-semibold text-text-title">Profile</span>
            <div className="flex-1" />
            <div className="relative">
              <button
                onClick={() => setMenuOpen(true)}
                className="p-[10px] rounded-full hover:bg-white-10 transition-colors text-white-90 border-none bg-transparent cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>
              {/* Desktop popover menu */}
              <Popover open={menuOpen} onClose={() => setMenuOpen(false)}>
                <MenuPopoverItems
                  onClose={() => setMenuOpen(false)}
                  onMyCards={() => setMyCardsOpen(true)}
                  onLogout={() => { setMenuOpen(false); setLogoutOpen(true) }}
                />
              </Popover>
            </div>
          </div>

          {/* Scrollable area below header */}
          <div className="flex-1 min-h-0 relative">
            <div className="scroll-thumb-vertical hidden md:block" {...thumbProps} />
            <div ref={scrollRef} className="h-full md:overflow-y-auto scroll-hide">
              <ProfileTabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
              <ContentGrid
                activeTab={activeTab}
                characters={CHARACTERS}
                stories={STORIES}
                onCharMenu={(name) => { setCharMenuChar(name); setCharMenuOpen(true) }}
              />
            </div>
          </div>

          {/* Footer text — mobile only */}
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
          onBadgeClick={() => setBadgesSheetOpen(true)}
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

      {/* MenuSheet: BottomSheet handles mobile/desktop internally */}
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

      {/* Bottom nav (mobile) */}
      <BottomNav />
    </div>
  )
}
