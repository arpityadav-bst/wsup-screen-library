'use client'

import CoinIcon from '@/components/ui/CoinIcon'
import DailyCheckInCard from '@/components/ui/DailyCheckInCard'
import InfoIcon from '@/components/ui/InfoIcon'

export interface StreakTier {
  label: string
  value: number
  active?: boolean
}

interface StreakBlockProps {
  currentDay: number
  /** Day-pill tier preview. Omit (or pass empty) to hide the pill grid. */
  tiers?: StreakTier[]
  tomorrowReward: number
  dailyCheckInLabel?: string
  dailyCheckInEarn: number
  dailyCheckInClaimable?: boolean
  onClaimDailyCheckIn?: () => void
}

export default function StreakBlock({
  currentDay,
  tiers,
  tomorrowReward,
  dailyCheckInLabel,
  dailyCheckInEarn,
  dailyCheckInClaimable = true,
  onClaimDailyCheckIn,
}: StreakBlockProps) {
  const showTiers = tiers && tiers.length > 0
  return (
    <div className="rounded-card bg-white-05 border border-white-10 p-m">
      {/* Header strip */}
      <div className="flex items-center justify-between pb-s mb-s border-b border-white-10">
        <div className="flex items-center gap-xs">
          <span className="label-xs text-text-title">Streak</span>
          <span className="w-px h-s bg-white-20" aria-hidden />
          <span className="text-[10px] font-semibold tracking-[0.8px] uppercase text-credit-gold">Day {currentDay}</span>
          <span className="w-px h-s bg-white-20" aria-hidden />
          <span className="label-xs">Check-in reward</span>
        </div>
        <InfoIcon className="text-white-40 hover:text-white-60 transition-colors cursor-pointer shrink-0" />
      </div>

      {/* Daily check-in card */}
      <div className="mb-s">
        <DailyCheckInCard
          label={dailyCheckInLabel}
          earnValue={dailyCheckInEarn}
          claimable={dailyCheckInClaimable}
          onClaim={onClaimDailyCheckIn}
        />
      </div>

      {/* Day pills — optional preview of tier progression */}
      {showTiers && (
        <div className="grid grid-cols-4 gap-xs mb-s">
          {tiers!.map((tier) => (
            <div
              key={tier.label}
              className={`flex flex-col items-center gap-xxs py-xs rounded-button ${
                tier.active ? 'bg-credit-gold/[0.15] border border-credit-gold' : 'bg-white-05 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-xxxs">
                <CoinIcon size={12} />
                <span className="text-xs text-text-body tabular-nums">{tier.value}</span>
              </div>
              <span className="text-xs text-text-xsmall">{tier.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footnote */}
      <div className="flex items-center justify-between gap-xs text-xs">
        <span className="text-text-small whitespace-nowrap">
          Tomorrow · Get <span className="text-credit-gold font-semibold">+{tomorrowReward}</span>
        </span>
        <span className="text-text-dim whitespace-nowrap">Miss a day? Streak resets.</span>
      </div>
    </div>
  )
}
