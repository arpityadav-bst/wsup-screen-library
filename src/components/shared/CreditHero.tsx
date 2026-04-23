'use client'

import Image from 'next/image'
import { useState } from 'react'
import ChevronIcon from '@/components/ui/ChevronIcon'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'

interface CreditHeroProps {
  total: number
  rewarded: number
  purchased: number
  onTransactionHistory?: () => void
  onManageSubscription?: () => void
}

function CoinIcon({ size = 16 }: { size?: number }) {
  return (
    <Image src="/credit.png" alt="" width={size} height={size} className="object-contain shrink-0" />
  )
}

export default function CreditHero({ total, rewarded, purchased, onTransactionHistory, onManageSubscription }: CreditHeroProps) {
  const pillStyle: React.CSSProperties = {
    border: '1.5px solid transparent',
    backgroundImage: 'linear-gradient(var(--credit-bg), var(--credit-bg)), linear-gradient(135deg, var(--credit-gold), var(--credit-orange))',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  }
  const [showBreakdown, setShowBreakdown] = useState(false)

  return (
    <div className="flex flex-col items-center pt-s">
      {/* Main pill with glow */}
      <div className="relative flex items-center justify-center">
        {/* Glow (blurred duplicate behind) */}
        <div
          className="absolute inset-0 flex items-center gap-xs px-m py-xs rounded-pill blur-[6px] opacity-80"
          style={pillStyle}
          aria-hidden
        >
          <CoinIcon size={24} />
          <span className="text-[32px] font-semibold text-white leading-none tabular-nums">{total}</span>
        </div>
        {/* Main pill */}
        <div
          className="relative flex items-center gap-xs px-m py-xs rounded-pill"
          style={pillStyle}
        >
          <CoinIcon size={24} />
          <span className="text-[32px] font-semibold text-white leading-none tabular-nums">{total}</span>
        </div>
      </div>

      {/* Total credits caption (toggle) */}
      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="mt-xs inline-flex items-center gap-xxxs text-xs text-text-small hover:text-text-body transition-colors bg-transparent border-none cursor-pointer"
      >
        Total credits
        <ChevronIcon direction="down" size={12} className={`transition-transform ${showBreakdown ? 'rotate-180' : ''}`} />
      </button>

      {showBreakdown && (
        <div className="flex items-center gap-[56px] mt-s">
          <div className="flex flex-col items-center gap-xxs">
            <div className="flex items-center gap-xxs px-s py-xxs rounded-pill bg-white-10">
              <CoinIcon size={16} />
              <span className="text-base text-white tabular-nums leading-none">{rewarded}</span>
            </div>
            <span className="text-sm text-text-small">Rewarded</span>
          </div>
          <div className="flex flex-col items-center gap-xxs">
            <div className="flex items-center gap-xxs px-s py-xxs rounded-pill bg-white-10">
              <CoinIcon size={16} />
              <span className="text-base text-white tabular-nums leading-none">{purchased}</span>
            </div>
            <span className="text-sm text-text-small">Purchased</span>
          </div>
        </div>
      )}

      {/* Account links */}
      <div className="flex items-center gap-m mt-m">
        <button
          onClick={onTransactionHistory}
          className="link text-xs inline-flex items-center gap-xxxs bg-transparent border-none cursor-pointer"
        >
          Transaction History
          <ChevronIcon direction="right" size={12} />
        </button>
        <button
          onClick={onManageSubscription}
          className="link text-xs inline-flex items-center gap-xxxs bg-transparent border-none cursor-pointer"
        >
          Manage subscription
          <ExternalLinkIcon size={12} className="shrink-0" />
        </button>
      </div>
    </div>
  )
}
