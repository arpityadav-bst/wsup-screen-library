'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import CreditButton from '@/components/ui/CreditButton'
import Popover from '@/components/ui/Popover'
import BadgeTooltip from '@/components/ui/BadgeTooltip'
import { DormantMenuPopoverItems } from './CharacterMenuSheet'
import ReviveConfirmSheet from './ReviveConfirmSheet'

export type CharacterStateType = 'inactive' | 'moderation' | 'under-review' | 'rejected' | 'removed'

export interface DormantCharacter {
  name: string
  img: string
  stateType: CharacterStateType
  reason?: string
  chats: string
  lastChatDaysAgo?: number
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
  accentColor?: string
}> = {
  inactive: {
    label: 'Inactive',
    bg: 'bg-black-50', text: 'text-white-60', border: 'border-white-10',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    tooltip: 'This character hasn\'t had new conversations in 30 days. It\'s not shown in explore or search. Existing users can still chat.',
  },
  moderation: {
    label: 'Policy Review',
    bg: 'bg-status-warning/[0.20]', text: 'text-status-warning', border: 'border-status-warning/[0.30]',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
    tooltip: 'This character is being reviewed against our content policy. It\'s not shown in explore or search. Existing users can still chat.',
    accentColor: '#ffc32a', // status-warning
  },
  'under-review': {
    label: 'Under Review',
    bg: 'bg-forms-focus-border/[0.15]', text: 'text-forms-focus-border', border: 'border-forms-focus-border/[0.30]',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    tooltip: 'Your edits are being reviewed. This usually takes a few minutes. No action needed.',
    accentColor: '#82a1ff', // forms-focus-border
  },
  rejected: {
    label: 'Rejected',
    bg: 'bg-status-alert/[0.15]', text: 'text-status-alert', border: 'border-status-alert/[0.30]',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>,
    tooltip: 'This character did not meet our content policy. The reason is shown on the card. You can edit and re-submit through the revival flow if you choose.',
    accentColor: '#de5a48', // status-alert
  },
  removed: {
    label: 'Removed',
    bg: 'bg-status-alert/[0.25]', text: 'text-status-alert', border: 'border-status-alert/[0.30]',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>,
    tooltip: 'This character has been removed from the platform. Contact support with questions.',
    accentColor: '#de5a48', // status-alert
  },
}

export default function DormantCharacterCard({
  name, img, stateType, reason, chats, lastChatDaysAgo, onMenu,
}: DormantCharacterCardProps) {
  const router = useRouter()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [reviveOpen, setReviveOpen] = useState(false)
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
      <div className={`relative aspect-[4/5] ${isRemoved ? 'grayscale' : ''}`}>
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
          <BadgeTooltip open={tooltipOpen} onClose={() => setTooltipOpen(false)} accentColor={badge.accentColor}>
            {reason ? (
              <div className="flex flex-col gap-xs">
                <p className="text-xs text-text-body leading-relaxed">{reason}</p>
                <div className="h-px bg-white-05" />
                <p className="text-xxs text-text-xsmall leading-relaxed">{badge.tooltip}</p>
              </div>
            ) : (
              <p className="text-xs text-text-body leading-relaxed">{badge.tooltip}</p>
            )}
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
        <div className="flex items-center justify-between gap-xs">
          <p className="font-semibold text-xs text-text-title truncate min-w-0">{name}</p>
          <span className="inline-flex items-center gap-xxs text-text-xsmall text-xs shrink-0">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {chats}
          </span>
        </div>
        {lastChatDaysAgo != null && !isRemoved && (
          <p className="text-xs text-white-40">Last chatted {lastChatDaysAgo}d ago</p>
        )}

        {/* CTA — varies by state */}
        {!isRemoved && !isUnderReview && (
          <CreditButton label="Revive" credits={20} size="s" variant="secondary" fullWidth onClick={() => setReviveOpen(true)} />
        )}
        {isRemoved && (
          <div className="flex flex-col gap-xxs">
            <p className="text-xs text-white-50">No longer on the platform</p>
            <a href="mailto:support@wsup.ai" className="text-xs link">Contact support</a>
          </div>
        )}
      </div>
      <ReviveConfirmSheet
        open={reviveOpen}
        onClose={() => setReviveOpen(false)}
        onConfirm={() => { setReviveOpen(false); router.push('/edit-character') }}
        characterName={name}
        characterImg={img}
        stateType={stateType}
        reason={reason}
        credits={20}
      />
    </div>
  )
}
