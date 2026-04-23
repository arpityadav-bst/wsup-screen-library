'use client'

import Image from 'next/image'

interface CreditPackRowProps {
  name: string
  credits: number
  rate: string
  price: string
  featured?: boolean
  onSelect?: () => void
}

export default function CreditPackRow({ name, credits, rate, price, featured, onSelect }: CreditPackRowProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-s pt-xxs pb-s rounded-card w-full ${featured ? 'shadow-popup' : 'border border-white-05'}`}
      style={
        featured
          ? {
              backgroundImage: `
                radial-gradient(circle at 100% 100%, rgba(255,42,234,0.4) 0%, rgba(255,42,234,0) 70%),
                radial-gradient(circle at 0% 0%, rgba(42,170,255,0.6) 0%, rgba(42,170,255,0) 70%),
                linear-gradient(108deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 97%)
              `,
            }
          : undefined
      }
    >
      <div className="flex items-center py-xxs w-full">
        <p className="label-xs text-text-label">{name}</p>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-xxs">
          <div className="flex items-center gap-xxs">
            <Image src="/credit.png" alt="" width={24} height={24} className="object-contain shrink-0" />
            <span className="text-2xl font-semibold text-text-title tabular-nums leading-none">{credits}</span>
          </div>
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
    </div>
  )
}
