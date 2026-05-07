import CoinIcon from './CoinIcon'

interface CreditsBalancePillProps {
  label: string
  value: number
}

// Compact "label + coin + value" chip used wherever a credits balance is displayed
// inside a popup/sheet header (StreakClaimPopup, ModelPickerSheet, …).
// Distinct from CreditsSummaryPill (which pairs credits + price for purchase flows).
export default function CreditsBalancePill({ label, value }: CreditsBalancePillProps) {
  return (
    <div className="flex items-center gap-xs px-xs py-xxxs rounded-pill bg-white-10 shrink-0">
      <span className="text-xs text-text-small">{label}</span>
      <div className="flex items-center gap-xxxs">
        <CoinIcon size={12} />
        <span className="text-xs text-text-title tabular-nums">{value}</span>
      </div>
    </div>
  )
}
