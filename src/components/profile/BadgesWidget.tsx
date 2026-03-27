'use client'

import { useRef } from 'react'
import SectionAction from '@/components/ui/SectionAction'

export interface Badge {
  emoji: string
  label: string
  sub: string
  color: string
}

interface BadgesWidgetProps {
  badges: Badge[]
  onSeeAll: () => void
  onBadgeClick: (badge: Badge) => void
}

export default function BadgesWidget({ badges, onSeeAll, onBadgeClick }: BadgesWidgetProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full mt-m relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-xs px-m">
        <p className="label-xs">
          Badges <span className="normal-case tracking-normal text-text-xxsmall font-normal text-xxs">· {badges.length}</span>
        </p>
        <SectionAction onClick={onSeeAll}>See all</SectionAction>
      </div>

      {/* Scroll row */}
      <div className="relative w-full">
        <div ref={rowRef} className="flex gap-s overflow-x-auto pl-m pr-xxxl pb-xxs" style={{ scrollbarWidth: 'none' }}>
          {badges.map((b) => (
            <div
              key={b.label}
              onClick={() => onBadgeClick(b)}
              className="flex flex-col items-center shrink-0 w-[96px] py-s px-s rounded-card bg-white-10 backdrop-blur-bg border border-white-10 cursor-pointer"
            >
              <div
                className="flex items-center justify-center w-xxxl h-xxxl rounded-full text-lg mb-xs shrink-0"
                style={{ background: `${b.color}15`, border: `1.5px solid ${b.color}35` }}
              >
                {b.emoji}
              </div>
              <span className="text-xs text-text-subtitle font-medium text-center leading-tight truncate w-full">{b.label}</span>
              <span className="text-xs text-text-xsmall text-center mt-xxs leading-tight whitespace-nowrap">{b.sub}</span>
            </div>
          ))}
        </div>
        {/* Right fade */}
        <div className="absolute top-0 right-0 bottom-xxs w-[48px] pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, var(--page-bg))' }}
        />
      </div>
    </div>
  )
}
