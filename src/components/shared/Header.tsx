'use client'
import Image from 'next/image'
import { useState } from 'react'
import SearchBar from '@/components/shared/SearchBar'
import SpicyToggle from '@/components/shared/SpicyToggle'

export default function Header() {
  const [spicy, setSpicy] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-page-bg border-b border-white-10 flex items-center px-m gap-m">
      {/* Logo */}
      <div className="shrink-0 w-auto md:w-[220px] pl-xs">
        <Image src="/logo.png" alt="wsup.ai" width={104} height={24} className="object-contain" />
      </div>

      {/* Search — desktop only, absolutely centered */}
      <SearchBar className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[384px]" />

      {/* Right actions */}
      <div className="flex items-center gap-s ml-auto shrink-0 relative z-10">
        {/* Blogs */}
        <button className="hidden md:flex items-center gap-xs border border-header-icon-border rounded-pill px-m h-[34px] text-white-50 text-sm hover:bg-header-icon-hover-bg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 32 32" viewBox="0 0 32 32" width="18" height="18" fill="rgba(255,255,255,0.5)">
            <path d="M26,2.21H12.61c-2.702,0-4.9,2.198-4.9,4.9V17.6H6c-2.702,0-4.9,2.198-4.9,4.9v3.09c0,2.314,1.88,4.196,4.196,4.2c0.001,0,0.002,0.001,0.003,0.001h21.4c2.315,0,4.2-1.884,4.2-4.2V7.11C30.9,4.408,28.702,2.21,26,2.21z M2.9,25.59V22.5c0-1.709,1.391-3.1,3.1-3.1h1.71v6.171c0,0.006-0.003,0.011-0.003,0.017c0,1.325-1.078,2.403-2.407,2.403C3.977,27.99,2.9,26.914,2.9,25.59z M29.1,25.59c0,1.324-1.076,2.4-2.399,2.4H8.753c0.478-0.681,0.757-1.569,0.757-2.4V7.11c0-1.709,1.391-3.1,3.1-3.1H26c1.709,0,3.1,1.391,3.1,3.1V25.59z"/>
            <path d="M24.916 10.475H13.694c-.497 0-.9.403-.9.9s.403.9.9.9h11.222c.497 0 .9-.403.9-.9S25.413 10.475 24.916 10.475zM24.916 15.1H13.694c-.497 0-.9.403-.9.9s.403.9.9.9h11.222c.497 0 .9-.403.9-.9S25.413 15.1 24.916 15.1zM19.305 19.725h-5.611c-.497 0-.9.403-.9.9s.403.9.9.9h5.611c.497 0 .9-.403.9-.9S19.802 19.725 19.305 19.725z"/>
          </svg>
          Blogs
        </button>

        {/* Divider */}
        <div className="hidden md:block w-px h-5 bg-white-10" />

        {/* SPICY toggle */}
        <SpicyToggle spicy={spicy} onToggle={() => setSpicy(s => !s)} className="hidden md:flex" />

        {/* Divider */}
        <div className="hidden md:block w-px h-5 bg-white-10" />

        {/* Notification bell */}
        <button className="relative w-8 h-8 flex items-center justify-center border border-header-icon-border rounded-full hover:bg-header-icon-hover-bg transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-accent-light)">
            <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-status-alert rounded-full text-[11px] font-bold text-white flex items-center justify-center ring-2 ring-page-bg">7</span>
        </button>

        {/* Trophy */}
        <button className="w-8 h-8 flex items-center justify-center border border-header-icon-border rounded-full hover:bg-header-icon-hover-bg transition-colors">
          <Image src="/trophy.png" alt="Leaderboard" width={25} height={25} className="object-contain" />
        </button>

        {/* User avatar */}
        <button className="hidden md:flex w-8 h-8 items-center justify-center border border-header-icon-border rounded-full hover:bg-header-icon-hover-bg transition-colors">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ borderRadius: '50%', overflow: 'hidden' }}>
            <circle cx="16" cy="16" r="16" fill="transparent"/>
            <circle cx="16" cy="12" r="5.5" fill="var(--avatar-fill)"/>
            <ellipse cx="16" cy="30" rx="11.5" ry="8" fill="rgba(255,255,255,0.1)"/>
          </svg>
        </button>

        {/* Credits */}
        <button className="relative flex items-center hover:opacity-90 transition-opacity" style={{ height: '32px' }}>
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
  )
}
