'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SearchBar from '@/components/shared/SearchBar'
import SpicyToggle from '@/components/shared/SpicyToggle'
import CreditSidebar from '@/components/shared/CreditSidebar'
import BuyCreditsSheet from '@/components/ui/BuyCreditsSheet'

export default function Header() {
  const [spicy, setSpicy] = useState(false)
  const [creditsOpen, setCreditsOpen] = useState(false)
  const [buyOpen, setBuyOpen] = useState(false)

  useEffect(() => {
    const openSidebar = () => setCreditsOpen(true)
    const openBuy = () => setBuyOpen(true)
    window.addEventListener('wsup:open-credit-sidebar', openSidebar)
    window.addEventListener('wsup:open-buy-credits', openBuy)
    return () => {
      window.removeEventListener('wsup:open-credit-sidebar', openSidebar)
      window.removeEventListener('wsup:open-buy-credits', openBuy)
    }
  }, [])

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-page-bg border-b border-white-10 flex items-center px-m gap-m">
      {/* Logo */}
      <div className="shrink-0 w-auto md:w-[220px] pl-xs">
        <Image src="/logo.png" alt="wsup.ai" width={104} height={24} className="object-contain" />
      </div>

      {/* Search — desktop only, absolutely centered */}
      <SearchBar className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[384px]" />

      {/* Right actions */}
      <div className="flex items-center gap-s ml-auto shrink-0 relative z-10">
        {/* SPICY toggle */}
        <SpicyToggle spicy={spicy} onToggle={() => setSpicy(s => !s)} className="hidden md:flex" />

        {/* Divider */}
        <div className="hidden md:block w-px h-5 bg-white-10" />

        {/* Notification bell */}
        <button className="relative w-8 h-8 flex items-center justify-center border border-header-icon-border rounded-full hover:bg-header-icon-hover-bg transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-accent-light)">
            <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-status-alert rounded-full text-xxs font-bold text-white flex items-center justify-center ring-2 ring-page-bg">7</span>
        </button>

        {/* Trophy */}
        <button className="w-8 h-8 flex items-center justify-center border border-header-icon-border rounded-full hover:bg-header-icon-hover-bg transition-colors">
          <Image src="/trophy.png" alt="Leaderboard" width={25} height={25} className="object-contain" />
        </button>

        {/* User avatar */}
        <Link href="/profile" className="hidden md:flex w-8 h-8 items-center justify-center border border-header-icon-border rounded-full hover:bg-header-icon-hover-bg transition-colors">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ borderRadius: '50%', overflow: 'hidden' }}>
            <circle cx="16" cy="16" r="16" fill="transparent"/>
            <circle cx="16" cy="12" r="5.5" fill="var(--avatar-fill)"/>
            <ellipse cx="16" cy="30" rx="11.5" ry="8" fill="rgba(255,255,255,0.1)"/>
          </svg>
        </Link>

        {/* Credits */}
        <button onClick={() => setCreditsOpen(true)} className="relative flex items-center hover:opacity-90 transition-opacity" style={{ height: '32px' }}>
          {/* Pill background */}
          <div className="flex items-center rounded-full h-[28px]"
            style={{
              background: 'var(--credit-bg)',
              border: '1.5px solid transparent',
              backgroundImage: 'linear-gradient(var(--credit-bg), var(--credit-bg)), linear-gradient(135deg, var(--credit-gold), var(--credit-orange))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              paddingLeft: '26px',
              paddingRight: '12px',
            }}>
            <span className="text-white font-bold text-sm tabular-nums whitespace-nowrap" style={{ lineHeight: '28px' }}>
              10
            </span>
          </div>
          {/* Credit icon overlapping left */}
          <Image
            src="/credit.png"
            alt="Credits"
            width={28}
            height={28}
            className="absolute left-0 object-contain drop-shadow-md"
            style={{ top: '50%', transform: 'translateY(-50%) translateX(-20%)' }}
          />
        </button>
      </div>
    </header>
    <CreditSidebar open={creditsOpen} onClose={() => setCreditsOpen(false)} />
    <BuyCreditsSheet open={buyOpen} onClose={() => setBuyOpen(false)} />
    </>
  )
}
