'use client'

import { useState } from 'react'
import InfoIcon from '@/components/ui/InfoIcon'
import CloseButton from '@/components/ui/CloseButton'

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
    icon: <InfoIcon size={16} className="text-white-40 shrink-0" />,
  },
  moderation: {
    bg: 'bg-white-05',
    border: 'border-white-10',
    text: 'This character isn\'t currently listed publicly. You can keep chatting.',
    mobileText: 'Not listed — chat available',
    textColor: 'text-white-60',
    icon: <InfoIcon size={16} className="text-white-50 shrink-0" />,
  },
  removed: {
    bg: 'bg-white-05',
    border: 'border-white-10',
    text: 'This character is no longer on the platform. Your chat history is here for you to read.',
    mobileText: 'Removed — read-only',
    textColor: 'text-white-50',
    icon: <InfoIcon size={16} className="text-white-50 shrink-0" />,
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
            {showReviveLink && <a href="/edit-character" className="ml-xs link">Revive</a>}
          </p>
          <CloseButton
            onClose={() => setDismissed(true)}
            size={16}
            className="p-xxxs text-white-40 hover:text-white-90 hover:bg-transparent"
          />
        </div>
      </div>

      {/* Desktop — full banner */}
      <div className={`hidden md:flex items-center gap-s px-m py-s shrink-0 border-b ${config.bg} ${config.border}`}>
        <div className="flex items-center shrink-0">
          {config.icon}
        </div>
        <p className={`text-xs font-normal leading-snug flex-1 ${config.textColor}`}>
          {config.text}
          {showReviveLink && <a href="/edit-character" className="ml-xs link">Revive</a>}
        </p>
        <CloseButton
          onClose={() => setDismissed(true)}
          size={16}
          className="p-xxs"
        />
      </div>
    </>
  )
}
