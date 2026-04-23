'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import CreditHero from '@/components/shared/CreditHero'
import InfoIcon from '@/components/ui/InfoIcon'
import Badge from '@/components/ui/Badge'
import ChevronIcon from '@/components/ui/ChevronIcon'

interface CreditSidebarProps {
  open: boolean
  onClose: () => void
}

const CREDITS_TOTAL = 350
const CREDITS_REWARDED = 150
const CREDITS_PURCHASED = 200

const STREAK_DAYS = [
  { label: 'Day 1', value: 5 },
  { label: 'Day 2', value: 10, active: true },
  { label: 'Day 3-6', value: 15 },
  { label: 'Day 7+', value: 20 },
]

const CREATOR_ACTIVITY = [
  { name: 'Shadow', chatters: 24, earned: 4, image: '/chars/char1.webp' },
  { name: 'Shadow', chatters: 12, earned: 2, image: '/chars/char2.webp' },
  { name: 'Luna', chatters: 3, earned: null, image: '/chars/char3.webp' },
]

function CoinIcon({ size = 16 }: { size?: number }) {
  return (
    <Image src="/credit.png" alt="" width={size} height={size} className="object-contain shrink-0" />
  )
}

function SectionTitle({ children, info }: { children: React.ReactNode; info?: boolean }) {
  return (
    <div className="flex items-center justify-between pb-s mb-s border-b border-white-10">
      <span className="label-xs text-text-title">{children}</span>
      {info && <InfoIcon className="text-white-40 hover:text-white-60 transition-colors cursor-pointer shrink-0" />}
    </div>
  )
}

function RewardRow({ label, earnValue, claimable = true }: { label: string; earnValue: number; claimable?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-s py-xs">
      <div className="flex flex-col gap-xxxs">
        <span className="text-sm text-text-body">{label}</span>
        <div className="flex items-center gap-xxs text-xs text-text-xsmall">
          <span>Earn</span>
          <CoinIcon size={12} />
          <span className="tabular-nums">{earnValue}</span>
        </div>
      </div>
      <Button variant={claimable ? 'primary' : 'secondary'} size="m" className="shrink-0 !px-xxl">
        Claim
      </Button>
    </div>
  )
}

export default function CreditSidebar({ open, onClose }: CreditSidebarProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black-70"
        style={{ animation: 'fade-in 0.2s ease-out' }}
      />

      {/* Panel */}
      <aside
        className="absolute right-0 top-0 bottom-0 w-full md:max-w-[400px] bg-page-bg md:border-l md:border-white-10 flex flex-col shadow-big"
        style={{ animation: 'slide-in-right 0.28s cubic-bezier(0.32,0.72,0,1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-l h-[52px] border-b border-white-10 shrink-0">
          <p className="font-semibold text-base text-text-title">Credits</p>
          <button
            onClick={onClose}
            className="p-icon-btn rounded-full hover:bg-white-10 transition-colors text-white-90 border-none bg-transparent cursor-pointer"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto scroll-hide px-l py-m flex flex-col gap-m">
          {/* Hero — total + split + transaction history */}
          <CreditHero total={CREDITS_TOTAL} rewarded={CREDITS_REWARDED} purchased={CREDITS_PURCHASED} />

          {/* Buy Credits promo */}
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
            {/* Bags — money sack + coin jar, overflows top-right per Figma */}
            <img
              src="/credit-bags.png"
              alt=""
              className="absolute -right-[18px] -top-[8px] w-[170px] h-auto object-contain pointer-events-none select-none z-0"
            />

            <div className="relative z-10 flex flex-col gap-s max-w-[65%]">
              <span className="label-xs">+ Add more credits</span>
              <Button size="s" className="gap-xxs w-[180px] h-[40px]" onClick={() => window.dispatchEvent(new CustomEvent('wsup:open-buy-credits'))}>
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

          {/* Streak */}
          <div className="rounded-card bg-white-05 border border-white-10 p-m">
            {/* Streak header — single line: title + status, divider below */}
            <div className="flex items-center justify-between pb-s mb-s border-b border-white-10">
              <div className="flex items-center gap-xs">
                <span className="label-xs text-text-title">Streak</span>
                <span className="w-px h-s bg-white-20" aria-hidden />
                <span className="text-[10px] font-semibold tracking-[0.8px] uppercase text-credit-gold">Day 2</span>
                <span className="w-px h-s bg-white-20" aria-hidden />
                <span className="label-xs">Check-in reward</span>
              </div>
              <InfoIcon className="text-white-40 hover:text-white-60 transition-colors cursor-pointer shrink-0" />
            </div>

            {/* Daily check-in — same inner template as Daily / One-Time Rewards (no semibold), wrapped in inset card */}
            <div className="flex items-center justify-between gap-s bg-white-05 rounded-button p-s mb-s">
              <div className="flex flex-col gap-xxxs">
                <span className="text-sm text-text-body">Daily check-in</span>
                <div className="flex items-center gap-xxs text-xs text-text-xsmall">
                  <span>Earn</span>
                  <CoinIcon size={12} />
                  <span className="tabular-nums">10</span>
                </div>
              </div>
              <Button variant="primary" size="m" className="!px-xxl">Claim</Button>
            </div>

            {/* Day pills */}
            <div className="grid grid-cols-4 gap-xs mb-s">
              {STREAK_DAYS.map((day) => (
                <div
                  key={day.label}
                  className={`flex flex-col items-center gap-xxs py-xs rounded-button ${
                    day.active ? 'bg-credit-gold/[0.15] border border-credit-gold' : 'bg-white-05 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-xxxs">
                    <CoinIcon size={12} />
                    <span className="text-xs text-text-body tabular-nums">{day.value}</span>
                  </div>
                  <span className="text-xs text-text-xsmall">{day.label}</span>
                </div>
              ))}
            </div>

            {/* Footnote — single-line, left / right edges */}
            <div className="flex items-center justify-between gap-xs text-xs">
              <span className="text-text-small whitespace-nowrap">
                Tomorrow · Get <span className="text-credit-gold font-semibold">+15</span>
              </span>
              <span className="text-text-dim whitespace-nowrap">Miss a day? Streak resets.</span>
            </div>
          </div>

          {/* Daily Rewards */}
          <div className="rounded-card bg-white-05 border border-white-10 p-m">
            <SectionTitle>Daily Rewards</SectionTitle>
            <RewardRow label="Chat with a character" earnValue={10} />
          </div>

          {/* Creator Rewards */}
          <div className="rounded-card bg-white-05 border border-white-10 p-m">
            <SectionTitle info>Creator rewards</SectionTitle>

            <div className="grid grid-cols-2 divide-x divide-white-10 mb-s">
              <div className="flex flex-col gap-xxs pr-s">
                <span className="label-xs">Yesterday&rsquo;s payout</span>
                <div className="flex items-center gap-xxs">
                  <CoinIcon size={14} />
                  <span className="text-sm font-semibold text-white tabular-nums">12</span>
                </div>
                <Badge variant="success">Deposited</Badge>
              </div>
              <div className="flex flex-col gap-xxs pl-s">
                <span className="label-xs">Lifetime Earnings</span>
                <div className="flex items-center gap-xxs">
                  <CoinIcon size={14} />
                  <span className="text-sm font-semibold text-white tabular-nums">143</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-white-10 my-s" />

            <p className="label-xs mb-xs">Yesterday&rsquo;s activity</p>
            <div className="flex flex-col gap-xs mb-s">
              {CREATOR_ACTIVITY.map((row, i) => (
                <div key={i} className="flex items-center gap-s">
                  <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-white-05 shrink-0 relative">
                    <Image src={row.image} alt={row.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col gap-xxxs min-w-0">
                    <span className="text-sm text-text-body truncate">{row.name}</span>
                    <span className="text-xs text-text-xsmall">{row.chatters} unique chatters</span>
                  </div>
                  <div className="flex items-center gap-xxs shrink-0">
                    <CoinIcon size={12} />
                    <span className="text-sm font-semibold text-white tabular-nums">{row.earned ?? '-'}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="link text-xs bg-transparent border-none cursor-pointer inline-flex items-center gap-xxs">
              How creator rewards work
              <ChevronIcon direction="right" size={12} />
            </button>
          </div>

          {/* One-Time Rewards */}
          <div className="rounded-card bg-white-05 border border-white-10 p-m mb-l">
            <SectionTitle>One-Time Rewards</SectionTitle>
            <div className="flex flex-col divide-y divide-white-05">
              <RewardRow label="Sign-up on wsup" earnValue={10} />
              <RewardRow label="Create a character" earnValue={10} />
            </div>
          </div>
        </div>
      </aside>
    </div>
    </>
  )
}
