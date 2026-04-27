'use client'

import Button from './Button'
import CoinIcon from './CoinIcon'

interface RewardRowProps {
  label: string
  earnValue: number
  claimable?: boolean
  claimLabel?: string
  onClaim?: () => void
}

export default function RewardRow({
  label,
  earnValue,
  claimable = true,
  claimLabel,
  onClaim,
}: RewardRowProps) {
  const buttonLabel = claimLabel ?? (claimable ? 'Claim' : 'Claimed')
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
      <Button
        variant={claimable ? 'primary' : 'secondary'}
        size="m"
        className="shrink-0 !px-xxl"
        onClick={onClaim}
        disabled={!claimable}
      >
        {buttonLabel}
      </Button>
    </div>
  )
}
