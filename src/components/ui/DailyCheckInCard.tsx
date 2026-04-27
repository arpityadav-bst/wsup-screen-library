'use client'

import Button from './Button'
import CoinIcon from './CoinIcon'

interface DailyCheckInCardProps {
  label?: string
  earnValue: number
  claimable?: boolean
  onClaim?: () => void
  /** When provided, renders a small uppercase "DAY N" label at the top of the card. */
  dayBadge?: number
}

export default function DailyCheckInCard({
  label = 'Daily check-in',
  earnValue,
  claimable = true,
  onClaim,
  dayBadge,
}: DailyCheckInCardProps) {
  return (
    <div className="bg-white-05 rounded-button p-s flex flex-col gap-xs">
      {dayBadge !== undefined && (
        <span className="text-[10px] font-semibold tracking-[0.8px] uppercase text-credit-gold">
          Day {dayBadge}
        </span>
      )}
      <div className="flex items-center justify-between gap-s">
        <div className="flex flex-col gap-xxxs">
          <span className="text-sm text-text-body">{label}</span>
          <div className="flex items-center gap-xxs text-xs text-text-xsmall">
            <span>Earn</span>
            <CoinIcon size={12} />
            <span className="tabular-nums">{earnValue}</span>
          </div>
        </div>
        <Button
          variant={claimable ? 'primary' : 'secondary'}
          size="m"
          className="!px-xxl"
          onClick={onClaim}
          disabled={!claimable}
        >
          {claimable ? 'Claim' : 'Claimed'}
        </Button>
      </div>
    </div>
  )
}
