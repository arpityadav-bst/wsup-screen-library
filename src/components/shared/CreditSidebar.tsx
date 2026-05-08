'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import CreditHero from '@/components/shared/CreditHero'
import StreakBlock from '@/components/shared/StreakBlock'
import InfoIcon from '@/components/ui/InfoIcon'
import Badge from '@/components/ui/Badge'
import ChevronIcon from '@/components/ui/ChevronIcon'
import CloseButton from '@/components/ui/CloseButton'
import CoinIcon from '@/components/ui/CoinIcon'
import RewardRow from '@/components/ui/RewardRow'
import BuyCreditsPromoCard from '@/components/shared/BuyCreditsPromoCard'

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

function SectionTitle({ children, info }: { children: React.ReactNode; info?: boolean }) {
  return (
    <div className="flex items-center justify-between pb-s mb-s border-b border-white-10">
      <span className="label-xs text-text-title">{children}</span>
      {info && <InfoIcon className="text-white-40 hover:text-white-60 transition-colors cursor-pointer shrink-0" />}
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
          <CloseButton onClose={onClose} />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto scroll-hide px-l py-m flex flex-col gap-m">
          {/* Hero — total + split + transaction history */}
          <CreditHero total={CREDITS_TOTAL} rewarded={CREDITS_REWARDED} purchased={CREDITS_PURCHASED} />

          {/* Buy Credits promo — extracted to BuyCreditsPromoCard (shared with CreditServicePopup) */}
          <BuyCreditsPromoCard />

          {/* Streak */}
          <StreakBlock
            currentDay={2}
            tiers={STREAK_DAYS}
            tomorrowReward={15}
            dailyCheckInEarn={10}
          />

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
