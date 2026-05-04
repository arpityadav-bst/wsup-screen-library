'use client'

import { useState } from 'react'
import Link from 'next/link'
import TrendArrow from '@/components/ui/TrendArrow'
import Popover from '@/components/ui/Popover'
import { CharacterMenuPopoverItems } from './CharacterMenuSheet'

const TAG_CONFIG: Record<string, { label: string; border: string; glow: string }> = {
  'chat-leader':   { label: '💬 Chat Leader',  border: 'rgba(0,131,255,0.50)',   glow: '0 0 8px rgba(0,131,255,0.40), 0 0 16px rgba(0,131,255,0.20)' },
  'fan-fave':      { label: '❤️ Fan Fave',      border: 'rgba(236,72,153,0.50)',  glow: '0 0 8px rgba(236,72,153,0.40), 0 0 16px rgba(236,72,153,0.20)' },
  'creators-pick': { label: '⭐ Featured',      border: 'rgba(244,218,92,0.50)',  glow: '0 0 8px rgba(244,218,92,0.40), 0 0 16px rgba(244,218,92,0.20)' },
  'trending':      { label: '📈 Trending',      border: 'rgba(74,222,128,0.50)',  glow: '0 0 8px rgba(74,222,128,0.40), 0 0 16px rgba(74,222,128,0.20)' },
}

interface ProfileCharacterCardProps {
  name: string
  chats: string
  img: string
  rank: number
  trend: number
  tag?: string
  approved?: boolean
  onMenu?: () => void
  /** Self shows owner-only signals: rank trend arrow + 3-dot management menu.
   *  Public hides both — rank delta is private feedback, menu is management-only. */
  viewMode?: 'self' | 'public'
}

export default function ProfileCharacterCard({ name, chats, img, rank, trend, tag, approved, onMenu, viewMode = 'self' }: ProfileCharacterCardProps) {
  const isSelf = viewMode === 'self'
  const tagInfo = tag ? TAG_CONFIG[tag] : null
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [showApproved, setShowApproved] = useState(!!approved)

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Mobile: trigger bottom sheet via parent
    if (window.innerWidth < 768) {
      onMenu?.()
    } else {
      // Desktop: open popover
      setPopoverOpen(true)
    }
  }

  return (
    <Link href="/chat" className="flex flex-col rounded-card bg-white-05 border border-white-10 cursor-pointer relative no-underline" style={{ overflow: popoverOpen ? 'visible' : 'hidden' }}>
      {/* Image */}
      <div className="relative" style={{ paddingBottom: '142.22%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={name} className="absolute inset-0 w-full h-full object-cover object-top" />
        {/* Top scrim */}
        <div className="absolute top-0 left-0 right-0 h-[40px] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.30) 60%, transparent 100%)' }}
        />
        {/* Approved badge — tap to dismiss, overrides tag */}
        {showApproved ? (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowApproved(false) }}
            className="absolute top-[6px] left-[6px] flex items-center gap-xxs px-xs py-xxxs rounded-pill backdrop-blur-bg bg-status-success/[0.15] border border-status-success/[0.30] cursor-pointer hover:bg-status-success/[0.25] transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-status-success">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-xxs font-medium text-status-success">Approved</span>
          </button>
        ) : tagInfo ? (
          <div
            className="absolute top-[6px] left-[6px] flex items-center px-xs py-xxxs rounded-pill backdrop-blur-bg"
            style={{ background: 'rgba(0,0,0,0.45)', border: `1px solid ${tagInfo.border}`, boxShadow: tagInfo.glow }}
          >
            <span className="text-xxs text-text-title tracking-[0.8px]">{tagInfo.label}</span>
          </div>
        ) : null}
        {/* 3-dot menu — owner-only (character management actions). Hidden on public profiles. */}
        {isSelf && (
          <div className="absolute top-xs right-xxs">
            <button
              onClick={handleMenuClick}
              className="w-l h-l flex items-center justify-center text-text-title bg-transparent border-none cursor-pointer p-0"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </button>
            {/* Desktop: popover */}
            <Popover open={popoverOpen} onClose={() => setPopoverOpen(false)} variant="dark">
              <CharacterMenuPopoverItems onClose={() => setPopoverOpen(false)} />
            </Popover>
          </div>
        )}
      </div>

      {/* Bottom strip */}
      <div className="py-xs px-s border-t border-white-05">
        <p className="font-semibold text-xs text-text-title truncate">{name}</p>
        <div className="flex items-center justify-between mt-xxs">
          <div className="flex items-center gap-xxs text-text-xsmall">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs">{chats}</span>
          </div>
          <div className="flex items-center gap-xxs">
            <span className="text-xs text-text-xsmall">#{rank}</span>
            {/* Rank trend — owner-only feedback signal, hidden on public */}
            {isSelf && (
              <TrendArrow trend={trend} className={trend > 0 ? 'text-status-success' : 'text-status-alert'} />
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
