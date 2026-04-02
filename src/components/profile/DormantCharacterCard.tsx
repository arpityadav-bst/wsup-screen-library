'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import CreditButton from '@/components/ui/CreditButton'
import Popover from '@/components/ui/Popover'
import Button from '@/components/ui/Button'
import BadgeTooltip from '@/components/ui/BadgeTooltip'
import { DormantMenuPopoverItems } from './CharacterMenuSheet'

export type CharacterStateType = 'inactive' | 'moderation' | 'under-review' | 'rejected' | 'removed'

export interface DormantCharacter {
  name: string
  img: string
  stateType: CharacterStateType
  reason?: string
  chats: string
  daysUntilRemoval?: number
}

interface DormantCharacterCardProps extends DormantCharacter {
  onMenu?: () => void
}

const BADGE_CONFIG: Record<CharacterStateType, {
  label: string
  bg: string
  text: string
  border: string
  icon: React.ReactNode
  tooltip: string
}> = {
  inactive: {
    label: 'Inactive',
    bg: 'bg-black-50', text: 'text-white-60', border: 'border-white-10',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    tooltip: 'No new conversations in 30 days. Existing users can still chat. Revive to get back into distribution.',
  },
  moderation: {
    label: 'Policy Review',
    bg: 'bg-status-warning/[0.20]', text: 'text-status-warning', border: 'border-status-warning/[0.30]',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
    tooltip: 'This character was flagged for a content policy concern. Edit and resubmit to address the issue.',
  },
  'under-review': {
    label: 'Under Review',
    bg: 'bg-forms-focus-border/[0.15]', text: 'text-forms-focus-border', border: 'border-forms-focus-border/[0.30]',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    tooltip: 'Your edits are being reviewed. This typically takes 24–48 hours. No action needed.',
  },
  rejected: {
    label: 'Rejected',
    bg: 'bg-status-alert/[0.15]', text: 'text-status-alert', border: 'border-status-alert/[0.30]',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>,
    tooltip: 'Your submitted edits didn\'t pass review. Revise and resubmit through the edit character flow.',
  },
  removed: {
    label: 'Removed',
    bg: 'bg-status-alert/[0.25]', text: 'text-status-alert', border: 'border-status-alert/[0.30]',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>,
    tooltip: 'This character has been permanently removed. Contact support if you believe this was made in error.',
  },
}

export default function DormantCharacterCard({
  name, img, stateType, chats, daysUntilRemoval, onMenu,
}: DormantCharacterCardProps) {
  const router = useRouter()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const badge = BADGE_CONFIG[stateType]
  const isRemoved = stateType === 'removed'
  const isUnderReview = stateType === 'under-review'

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (window.innerWidth < 768) {
      onMenu?.()
    } else {
      setPopoverOpen(true)
    }
  }

  const hasOverlay = popoverOpen || tooltipOpen

  return (
    <div className={`flex flex-col rounded-card bg-white-05 border border-white-10 cursor-pointer relative ${isRemoved ? 'opacity-70' : ''}`} style={{ overflow: hasOverlay ? 'visible' : 'hidden' }}>
      {/* Image */}
      <div className={`relative pb-[142.22%] md:pb-[125%] ${isRemoved ? 'grayscale' : ''}`}>
        <Image src={img} alt={name} fill className={`object-cover object-top ${isRemoved ? 'opacity-50' : ''}`} />
        <div className="absolute top-0 left-0 right-0 h-xxxl pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.30) 60%, transparent 100%)' }}
        />
        {/* State badge + tooltip */}
        <div className="absolute top-[6px] left-[6px]">
          <button
            onClick={(e) => { e.stopPropagation(); setTooltipOpen(!tooltipOpen) }}
            className={`inline-flex items-center gap-xxs px-xs py-xxxs rounded-pill backdrop-blur-bg text-xxs font-medium ${badge.bg} ${badge.text} border ${badge.border} cursor-pointer transition-colors`}
          >
            {badge.icon}
            {badge.label}
          </button>
          <BadgeTooltip open={tooltipOpen} onClose={() => setTooltipOpen(false)}>
            <p className="text-xs text-text-body leading-relaxed">{badge.tooltip}</p>
          </BadgeTooltip>
        </div>
        {/* 3-dot menu */}
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
          <Popover open={popoverOpen} onClose={() => setPopoverOpen(false)} variant="dark">
            <DormantMenuPopoverItems stateType={stateType} onClose={() => setPopoverOpen(false)} />
          </Popover>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="p-s border-t border-white-05 flex flex-col gap-xs">
        <p className="font-semibold text-xs text-text-title truncate">{name}</p>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-xxs text-text-xsmall text-xs">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {chats}
          </span>
          {daysUntilRemoval && !isRemoved && !isUnderReview && (
            <span className="text-xs font-medium text-status-warning">{daysUntilRemoval}d left</span>
          )}
          {isRemoved && (
            <span className="text-xxs text-text-xxsmall underline cursor-pointer hover:text-text-xsmall transition-colors">
              Support
            </span>
          )}
        </div>

        {/* CTA — varies by state */}
        {!isRemoved && !isUnderReview && (
          <CreditButton label="Revive" credits={20} size="s" variant="secondary" fullWidth onClick={() => router.push('/edit-character')} />
        )}
        {isRemoved && (
          <Button variant="secondary" size="s" fullWidth>
            Support
          </Button>
        )}
      </div>
    </div>
  )
}
