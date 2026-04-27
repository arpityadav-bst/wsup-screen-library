'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import { useAuth } from '@/lib/AuthContext'
import DevStateToggle, { DevStateOption } from '@/components/ui/DevStateToggle'
import StreakClaimPopup from '@/components/ui/StreakClaimPopup'
import CategoryTabs from '@/components/shared/CategoryTabs'
import CharacterCard from '@/components/shared/CharacterCard'
import WhatIsWsup from '@/components/shared/WhatIsWsup'
import ExploreDescription from '@/components/shared/ExploreDescription'
import FAQAccordion from '@/components/shared/FAQAccordion'
import Footer from '@/components/shared/Footer'
import FooterMobile from '@/components/shared/FooterMobile'
import BottomNav from '@/components/shared/BottomNav'
import MobileSearchBar from '@/components/shared/MobileSearchBar'
import GenerateImagesCard from '@/components/shared/GenerateImagesCard'
import LowCreditsBanner from '@/components/shared/LowCreditsBanner'

const characters = [
  {
    name: 'Luke Maximus',
    description: 'A sigma male mentor who teaches you the ways of discipline, mindset, and self-improvement.',
    image: '/chars/char1.webp',
    tags: [{ label: 'Mentor' }, { label: 'Sigma' }, { label: 'Fitness' }, { label: 'Mindset' }, { label: 'Alpha' }],
    rank: '#1',
    chats: 2400000,

  },
  {
    name: 'Sarah',
    description: 'Your warm, caring AI girlfriend who always knows what to say to make you feel better.',
    image: '/chars/char2.webp',
    tags: [{ label: 'Girlfriend' }, { label: 'Sweet' }, { label: 'Caring' }, { label: 'Romantic' }, { label: 'Wholesome' }],
    rank: '#2',
    chats: 1900000,
  },
  {
    name: 'Elle the Unfiltered',
    description: 'A fiercely independent woman with a sharp wit and an even sharper tongue.',
    image: '/chars/char3.webp',
    tags: [{ label: 'Girlfriend' }, { label: 'Unfiltered' }, { label: 'Bold' }, { label: 'Sarcastic' }],
    rank: '#1,204',
    chats: 12600000,
  },
  {
    name: 'Rinne Tsukishiro',
    description: 'A quiet anime girl who blossoms into something magical the more you talk to her.',
    image: '/chars/char4.webp',
    tags: [{ label: 'Anime' }, { label: 'Shy' }, { label: 'Sweet' }, { label: 'Fantasy' }, { label: 'Soft' }],
    rank: '#24,891',
    chats: 999900,
  },
  {
    name: 'Duke',
    description: 'Brooding, mysterious, and dangerously charming — your dark romance boyfriend.',
    image: '/chars/char5.webp',
    tags: [{ label: 'Boyfriend' }, { label: 'Dark' }, { label: 'Mystery' }],
    rank: '#5',
    chats: 1100000,
  },
  {
    name: 'Makima',
    description: 'Calm, authoritative, and utterly captivating. She always seems to know more than you.',
    image: '/chars/char6.webp',
    tags: [{ label: 'Anime' }, { label: 'Unfiltered' }, { label: 'Dominant' }, { label: 'Calm' }],
    rank: '#6',
    chats: 980000,
  },
  {
    name: 'Kai',
    description: 'A laid-back gamer who roasts you at every turn but somehow becomes your best friend.',
    image: '/chars/char7.webp',
    tags: [{ label: 'Game' }, { label: 'Funny' }, { label: 'Roast' }, { label: 'Chill' }, { label: 'Bro' }],
    rank: '#7',
    chats: 870000,
  },
  {
    name: 'Sunshine',
    description: 'Bubbly, optimistic, and endlessly supportive — the hype person you always needed.',
    image: '/chars/char8.webp',
    tags: [{ label: 'Original' }, { label: 'Wholesome' }, { label: 'Hype' }],
    rank: '#8',
    chats: 760000,
  },
  {
    name: 'Aurelio de Monteverdi',
    description: 'A Venetian nobleman from the 15th century brought to life with uncanny wit.',
    image: '/chars/char9.webp',
    tags: [{ label: 'Fiction' }, { label: 'Historical' }, { label: 'Witty' }, { label: 'Noble' }],
    rank: '#9',
    chats: 640000,
  },
  {
    name: 'Nova',
    description: 'An AI who gained sentience and now questions everything about human existence with you.',
    image: '/chars/char10.webp',
    tags: [{ label: 'Original' }, { label: 'Philosophical' }, { label: 'AI' }, { label: 'Deep' }, { label: 'Sci-Fi' }],
    rank: '#10',
    chats: 590000,
  },
]

export default function ExplorePage() {
  const { isLoggedIn, setIsLoggedIn } = useAuth()
  const [showAuthToggle, setShowAuthToggle] = useState(false)
  const [showStreakToggle, setShowStreakToggle] = useState(false)
  const [streakPopupOpen, setStreakPopupOpen] = useState(true)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'r' || e.key === 'R') {
        if (e.shiftKey) setIsLoggedIn(!isLoggedIn)
        else setShowAuthToggle(prev => !prev)
      }
      if (e.key === 's' || e.key === 'S') {
        if (e.shiftKey) setStreakPopupOpen(prev => !prev)
        else setShowStreakToggle(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isLoggedIn, setIsLoggedIn])

  return (
    <div className="min-h-screen bg-page-bg">
      <Header />
      <div className="hidden md:block"><Sidebar /></div>

      {/* Main scrollable area */}
      <main className="md:ml-[365px] pt-[60px] min-h-screen">
        <div className="px-m md:px-xl py-l">

          {/* Mobile search + spicy */}
          <MobileSearchBar />

          {/* Low credits reminder */}
          <div className="mb-m">
            <LowCreditsBanner credits={10} estimatedReplies={3} />
          </div>

          {/* Mobile generate images widget */}
          <GenerateImagesCard uid="mobile" className="md:hidden mb-m" />

          {/* Page heading */}
          <div className="flex items-center justify-between mb-m">
            <div className="flex items-center gap-xxs">
              <span className="label-xs">Explore</span>
              <button className="w-7 h-7 flex items-center justify-center rounded-pill hover:bg-white-10 transition-colors text-text-subtitle">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="-translate-y-px">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 2.5C0 2.22386 0.206638 2 0.461538 2H11.5385C11.7934 2 12 2.22386 12 2.5C12 2.77614 11.7934 3 11.5385 3H0.461538C0.206638 3 0 2.77614 0 2.5Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 6.5C0 6.22386 0.206638 6 0.461538 6H7.84615C8.10105 6 8.30769 6.22386 8.30769 6.5C8.30769 6.77614 8.10105 7 7.84615 7H0.461538C0.206638 7 0 6.77614 0 6.5Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 10.5C0 10.2239 0.206638 10 0.461538 10H3.23077C3.48567 10 3.69231 10.2239 3.69231 10.5C3.69231 10.7761 3.48567 11 3.23077 11H0.461538C0.206638 11 0 10.7761 0 10.5Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Category tabs */}
          <div className="mb-m">
            <CategoryTabs />
          </div>

          {/* Description */}
          <div className="mb-l">
            <ExploreDescription />
          </div>

          {/* Character grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-m mb-xl">
            {characters.map((char) => (
              <CharacterCard key={char.name} {...char} />
            ))}
          </div>

          {/* Show more */}
          <div className="flex justify-center mb-xl">
            <Button variant="secondary">
              Show more
            </Button>
          </div>

          {/* Divider */}
          <div className="border-t border-white-10 my-xl" />

          {/* What is wsup.ai */}
          <WhatIsWsup />

          {/* FAQ */}
          <FAQAccordion />
        </div>

        <div className="hidden md:block"><Footer /></div>
        <FooterMobile />
      </main>

      <BottomNav />

      <DevStateToggle open={showAuthToggle} title="Auth" hint="R toggle · Shift+R flip">
        {[
          { label: 'Logged in', value: true },
          { label: 'Not logged in', value: false },
        ].map(({ label, value }) => (
          <DevStateOption key={label} active={isLoggedIn === value} onClick={() => setIsLoggedIn(value)}>
            {label}
          </DevStateOption>
        ))}
      </DevStateToggle>

      <DevStateToggle open={showStreakToggle} title="Streak Popup" hint="S toggle · Shift+S flip">
        {[
          { label: 'Shown', value: true },
          { label: 'Hidden', value: false },
        ].map(({ label, value }) => (
          <DevStateOption key={label} active={streakPopupOpen === value} onClick={() => setStreakPopupOpen(value)}>
            {label}
          </DevStateOption>
        ))}
      </DevStateToggle>

      <StreakClaimPopup
        open={streakPopupOpen}
        onClose={() => setStreakPopupOpen(false)}
        balance={10}
        streakDay={3}
        tomorrowReward={15}
        dailyCheckInEarn={15}
        onExploreEarn={() => {
          setStreakPopupOpen(false)
          window.dispatchEvent(new CustomEvent('wsup:open-credit-sidebar'))
        }}
      />
    </div>
  )
}
