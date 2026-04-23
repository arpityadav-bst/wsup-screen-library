'use client'

import CreditPackRow from '@/components/ui/CreditPackRow'
import Button from '@/components/ui/Button'
import PackModeToggle, { type PackMode } from '@/components/ui/PackModeToggle'

export const MONTHLY_BONUS_MULTIPLIER = 1.1

export interface CreditPack {
  id: string
  name: string
  credits: number
  rate: string
  price: string
  priceAmount: string
  featured?: boolean
  oneTimeOnly?: boolean
}

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^\d.]/g, ''))
}

export function applyMonthlyBonus(pack: CreditPack) {
  const credits = Math.round(pack.credits * MONTHLY_BONUS_MULTIPLIER)
  const priceNum = parsePrice(pack.price)
  const rate = `₹1 = ${(credits / priceNum).toFixed(2)} Credits`
  return { credits, rate }
}

interface PackagesStepProps {
  packs: CreditPack[]
  mode: PackMode
  onModeChange: (mode: PackMode) => void
  selectedPackId: string | null
  onSelectPack: (pack: CreditPack) => void
  onOneTimeBuy: (pack: CreditPack) => void
  onMonthlyContinue: () => void
  header: React.ReactNode
}

export default function BuyCreditsPackagesStep({
  packs,
  mode,
  onModeChange,
  selectedPackId,
  onSelectPack,
  onOneTimeBuy,
  onMonthlyContinue,
  header,
}: PackagesStepProps) {
  const isMonthly = mode === 'monthly'
  const visiblePacks = isMonthly ? packs.filter(p => !p.oneTimeOnly) : packs

  return (
    <>
      {header}
      <PackModeToggle mode={mode} onChange={onModeChange} />
      <div className="flex-1 flex flex-col gap-s px-l pt-l pb-l">
        <div className="flex flex-col gap-xs">
          {visiblePacks.map((pack) => {
            const display = isMonthly ? applyMonthlyBonus(pack) : { credits: pack.credits, rate: pack.rate }
            return (
              <CreditPackRow
                key={pack.id}
                name={pack.name}
                credits={display.credits}
                originalCredits={isMonthly ? pack.credits : undefined}
                rate={display.rate}
                price={isMonthly ? `${pack.price}/mo` : pack.price}
                featured={pack.featured}
                selectable={isMonthly}
                selected={isMonthly && selectedPackId === pack.id}
                onSelect={() => (isMonthly ? onSelectPack(pack) : onOneTimeBuy(pack))}
              />
            )
          })}
        </div>

        {isMonthly && (
          <div className="mt-auto pt-s flex flex-col gap-xs">
            <Button
              fullWidth
              disabled={!selectedPackId}
              onClick={onMonthlyContinue}
              className="gap-xxs"
            >
              <span>Continue on Patreon</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            <p className="text-xs text-text-xsmall text-center">Billed monthly · Cancel anytime</p>
          </div>
        )}
      </div>
    </>
  )
}
