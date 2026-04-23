'use client'

import Image from 'next/image'

interface CreditsSummaryPillProps {
  credits: number
  price: string
}

export default function CreditsSummaryPill({ credits, price }: CreditsSummaryPillProps) {
  return (
    <div className="flex items-center justify-between w-full bg-white-10 rounded-button px-s py-xs">
      <div className="flex items-center gap-xs">
        <Image src="/credit.png" alt="" width={24} height={24} className="object-contain shrink-0" />
        <span className="text-base font-semibold text-text-title tabular-nums">{credits}</span>
      </div>
      <span className="text-base text-text-title">{price}</span>
    </div>
  )
}
