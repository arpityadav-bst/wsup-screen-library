'use client'

import Button from '@/components/ui/Button'
import ChevronIcon from '@/components/ui/ChevronIcon'

interface BuyCreditsPromoCardProps {
  onBuy?: () => void
}

// Hero promo card for buying credits — gradient bg + credit-bags illustration + Buy Credits CTA.
// Shared by CreditSidebar (right-rail context) and CreditServicePopup (chat-credit-gate context).
// Default `onBuy` dispatches the global `wsup:open-buy-credits` event so existing Header listener
// can catch it; pass an explicit handler when the consumer wants local control.
export default function BuyCreditsPromoCard({ onBuy }: BuyCreditsPromoCardProps) {
  const handleBuy = onBuy ?? (() => window.dispatchEvent(new CustomEvent('wsup:open-buy-credits')))
  return (
    <div
      className="relative rounded-card overflow-hidden p-m border border-white-20 flex flex-col gap-m min-h-[104px]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 100% 100%, rgba(238,115,0,0.4) 0%, rgba(238,115,0,0) 70%),
          radial-gradient(circle at 0% 0%, rgba(255,209,83,0.2) 0%, rgba(255,209,83,0) 60%),
          linear-gradient(#171717, #171717)
        `,
      }}
    >
      <img
        src="/credit-bags.png"
        alt=""
        className="absolute -right-[18px] -top-[8px] w-[170px] h-auto object-contain pointer-events-none select-none z-0"
      />
      <div className="relative z-10 flex flex-col gap-s max-w-[65%]">
        <span className="label-xs">+ Add more credits</span>
        <Button size="s" className="gap-xxs w-[180px] h-[40px]" onClick={handleBuy}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2 4h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="20" r="1.5" fill="currentColor" />
            <circle cx="17" cy="20" r="1.5" fill="currentColor" />
          </svg>
          <span>Buy Credits</span>
          <ChevronIcon direction="right" size={14} className="shrink-0" />
        </Button>
      </div>
    </div>
  )
}
