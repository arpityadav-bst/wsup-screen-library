'use client'

import { useState } from 'react'

export type BannerVariant = 'inactivity' | 'moderation' | 'removed'

interface DormancyBannerProps {
  variant: BannerVariant
  isCreator?: boolean
}

const BANNER_CONFIG: Record<BannerVariant, {
  bg: string
  border: string
  text: string
  mobileText: string
  textColor: string
  icon: React.ReactNode
}> = {
  inactivity: {
    bg: 'bg-white-05',
    border: 'border-white-10',
    text: 'This character isn\'t currently listed publicly. You can keep chatting.',
    mobileText: 'Not listed — chat available',
    textColor: 'text-white-50',
    icon: (
      <svg className="w-m h-m text-white-40 shrink-0" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  moderation: {
    bg: 'bg-white-05',
    border: 'border-white-10',
    text: 'This character isn\'t currently listed publicly. You can keep chatting.',
    mobileText: 'Not listed — chat available',
    textColor: 'text-white-60',
    icon: (
      <svg className="w-m h-m text-white-50 shrink-0" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  removed: {
    bg: 'bg-white-05',
    border: 'border-white-10',
    text: 'This character is no longer on the platform. Your chat history is here for you to read.',
    mobileText: 'Removed — read-only',
    textColor: 'text-white-50',
    icon: (
      <svg className="w-m h-m text-white-50 shrink-0" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
}

export default function DormancyBanner({ variant, isCreator }: DormancyBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  const config = BANNER_CONFIG[variant]
  const showReviveLink = isCreator && variant !== 'removed'

  if (dismissed) return null

  return (
    <>
      {/* Mobile — centered floating pill */}
      <div className="flex md:hidden justify-center shrink-0 px-m py-xs">
        <div className="flex items-center gap-xs px-s py-xs backdrop-blur-popup bg-black-60 rounded-pill border border-white-05">
          <div className="flex items-center shrink-0 [&_svg]:w-m [&_svg]:h-m">
            {config.icon}
          </div>
          <p className="text-xs font-medium leading-none text-white-60">
            {config.mobileText}
            {showReviveLink && <a href="/edit-character" className="ml-xs text-secondary no-underline hover:underline">Revive</a>}
          </p>
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 p-xxxs rounded-pill cursor-pointer bg-transparent border-none text-white-40 hover:text-white-90 transition-colors"
          >
            <svg className="w-m h-m" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop — full banner */}
      <div className={`hidden md:flex items-center gap-s px-m py-s shrink-0 border-b ${config.bg} ${config.border}`}>
        <div className="flex items-center shrink-0">
          {config.icon}
        </div>
        <p className={`text-xs font-normal leading-snug flex-1 ${config.textColor}`}>
          {config.text}
          {showReviveLink && <a href="/edit-character" className="ml-xs text-secondary no-underline hover:underline">Revive</a>}
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 p-xxs rounded-pill cursor-pointer bg-transparent border-none text-white-90 hover:bg-white-10 transition-colors"
        >
          <svg className="w-m h-m" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </>
  )
}
