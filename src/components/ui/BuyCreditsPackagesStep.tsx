'use client'

import CreditPackRow from '@/components/ui/CreditPackRow'

export interface CreditPack {
  id: string
  name: string
  credits: number
  rate: string
  price: string
  priceAmount: string
  featured?: boolean
}

interface PackagesStepProps {
  packs: CreditPack[]
  onOneTimeBuy: (pack: CreditPack) => void
  header: React.ReactNode
}

// One-time credit packs list. Monthly subscription mode was removed in S31; if it returns later,
// add a PackModeToggle back at the top and reintroduce the selectable+Continue-on-Patreon flow.
export default function BuyCreditsPackagesStep({
  packs,
  onOneTimeBuy,
  header,
}: PackagesStepProps) {
  return (
    <>
      {header}
      <div className="flex-1 flex flex-col gap-s px-l pt-l pb-l">
        <div className="flex flex-col gap-xs">
          {packs.map((pack) => (
            <CreditPackRow
              key={pack.id}
              name={pack.name}
              credits={pack.credits}
              rate={pack.rate}
              price={pack.price}
              featured={pack.featured}
              onSelect={() => onOneTimeBuy(pack)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
