'use client'

import Image from 'next/image'
import Checkbox from '@/components/ui/Checkbox'

interface CreditPackRowProps {
  name: string
  credits: number
  originalCredits?: number
  rate: string
  price: string
  featured?: boolean
  selectable?: boolean
  selected?: boolean
  onSelect?: () => void
}

function SelectablePrice({ price }: { price: string }) {
  const slashIndex = price.indexOf('/')
  const main = slashIndex >= 0 ? price.slice(0, slashIndex) : price
  const suffix = slashIndex >= 0 ? price.slice(slashIndex) : null
  return (
    <div className="flex flex-col items-end gap-xxxs">
      <span className="text-base font-semibold text-text-title tabular-nums leading-none">{main}</span>
      {suffix && <span className="text-xxs text-text-xsmall tabular-nums leading-none">{suffix}</span>}
    </div>
  )
}

function CreditsDisplay({ credits, originalCredits }: { credits: number; originalCredits?: number }) {
  const showOriginal = typeof originalCredits === 'number' && originalCredits !== credits
  return (
    <div className="flex items-baseline gap-xxs">
      <Image src="/credit.png" alt="" width={24} height={24} className="object-contain shrink-0 self-center" />
      <span className="text-2xl font-semibold text-text-title tabular-nums leading-none">{credits}</span>
      {showOriginal && (
        <span className="text-sm text-text-xsmall tabular-nums leading-none line-through">{originalCredits}</span>
      )}
    </div>
  )
}

export default function CreditPackRow({ name, credits, originalCredits, rate, price, featured, selectable, selected, onSelect }: CreditPackRowProps) {
  const cardBg = featured
    ? {
        backgroundImage: `
          radial-gradient(circle at 100% 100%, rgba(255,42,234,0.4) 0%, rgba(255,42,234,0) 70%),
          radial-gradient(circle at 0% 0%, rgba(42,170,255,0.6) 0%, rgba(42,170,255,0) 70%),
          linear-gradient(108deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 97%)
        `,
      }
    : undefined

  const cardBase = 'flex flex-col px-s pt-xxs pb-s rounded-card w-full transition-colors'
  const cardShell = featured ? 'shadow-popup' : 'border border-white-05'
  const selectedRing = selected ? 'ring-2 ring-accent' : ''

  const body = selectable ? (
    <>
      <div className="flex items-center justify-between gap-xs py-xxs w-full">
        <p className="label-xs text-text-label truncate">{name}</p>
        <Checkbox checked={!!selected} variant="success" aria-label={`Select ${name}`} />
      </div>
      <div className="flex items-end justify-between gap-s w-full">
        <div className="flex flex-col gap-xxs min-w-0">
          <CreditsDisplay credits={credits} originalCredits={originalCredits} />
          <span className="text-xs text-text-xsmall">{rate}</span>
        </div>
        <SelectablePrice price={price} />
      </div>
    </>
  ) : (
    <>
      <div className="flex items-center gap-xs py-xxs w-full">
        <p className="label-xs text-text-label">{name}</p>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-xxs">
          <CreditsDisplay credits={credits} />
          <span className="text-xs text-text-body">{rate}</span>
        </div>
        <button
          type="button"
          onClick={onSelect}
          className={`px-m py-xs rounded-pill text-sm font-medium transition-opacity cursor-pointer border hover:opacity-90 ${
            featured
              ? 'border-credit-premium-border text-black-80'
              : 'bg-white-10 border-white-10 text-white-80 backdrop-blur-[32px]'
          }`}
          style={
            featured
              ? {
                  backgroundImage: 'linear-gradient(164deg, #f4da5c 14%, #e48949 54%, #c65720 97%)',
                  boxShadow: '0 6px 6px rgba(0,0,0,0.2)',
                }
              : undefined
          }
        >
          Buy for {price}
        </button>
      </div>
    </>
  )

  if (selectable) {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={`${cardBase} ${cardShell} ${selectedRing} cursor-pointer text-left bg-transparent hover:bg-white-05`}
        style={cardBg}
      >
        {body}
      </button>
    )
  }

  return (
    <div className={`${cardBase} ${cardShell}`} style={cardBg}>
      {body}
    </div>
  )
}
