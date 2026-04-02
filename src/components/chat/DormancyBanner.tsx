'use client'

import { useState } from 'react'

export type BannerVariant = 'inactivity' | 'moderation' | 'removed'

interface DormancyBannerProps {
  variant: BannerVariant
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
    text: 'This character is dormant due to inactivity. Chat is still available.',
    mobileText: 'Dormant — chat still available',
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
    bg: 'bg-status-warning/[0.08]',
    border: 'border-status-warning/[0.15]',
    text: 'This character is under review and no longer publicly listed. You can continue chatting.',
    mobileText: 'Under review — chat available',
    textColor: 'text-white-60',
    icon: (
      <svg className="w-m h-m text-status-warning shrink-0" viewBox="0 0 24 24">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="16" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  removed: {
    bg: 'bg-status-alert/[0.08]',
    border: 'border-status-alert/[0.15]',
    text: 'This character has been removed. Chat history is available as read-only.',
    mobileText: 'Removed — read-only',
    textColor: 'text-white-50',
    icon: (
      <svg className="w-m h-m text-status-alert shrink-0" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
}

export default function DormancyBanner({ variant }: DormancyBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  const config = BANNER_CONFIG[variant]

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
