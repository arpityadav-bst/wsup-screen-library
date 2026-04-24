'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'
import Button from '@/components/ui/Button'
import CreditsSummaryPill from '@/components/ui/CreditsSummaryPill'
import type { CreditPack } from '@/components/ui/BuyCreditsPackagesStep'

interface ScanStepProps {
  pack: CreditPack
  onBack: () => void
  onClose: () => void
  onComplete: () => void
  header: ReactNode
}

export function ScanQRStep({ pack, onBack, onClose, onComplete, header }: ScanStepProps) {
  return (
    <>
      {header}
      <div className="flex-1 flex flex-col gap-l items-center px-l pb-l">
        <CreditsSummaryPill credits={pack.credits} price={pack.priceAmount} />
        <p className="text-sm text-text-body text-center">Scan the QR code to get the wsup app and continue buying credits!</p>
        <button
          onClick={onComplete}
          aria-label="Simulate successful scan"
          title="Demo: click to simulate successful payment"
          className="bg-white rounded-button p-l flex items-center justify-center size-[232px] border-none cursor-pointer hover:opacity-90 transition-opacity"
        >
          <Image src="/qr-placeholder.png" alt="QR code" width={148} height={148} className="object-contain" />
        </button>
        <div className="flex gap-l w-full mt-auto">
          <button
            onClick={onBack}
            className="flex-1 px-m py-xs rounded-pill text-sm font-medium text-white-80 bg-white-10 border border-white-10 backdrop-blur-[32px] cursor-pointer hover:opacity-90 transition-opacity"
          >
            Back
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-m py-xs rounded-pill text-sm font-medium text-white-80 bg-white-10 border border-white-10 backdrop-blur-[32px] cursor-pointer hover:opacity-90 transition-opacity"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export function FinishInAppStep({ pack, onClose: _onClose, onComplete, header }: ScanStepProps) {
  return (
    <>
      {header}
      <div className="flex-1 flex flex-col px-l pb-l">
        <div className="flex-1 flex flex-col items-center justify-center gap-m rounded-card border border-white-10 p-l">
          <div className="size-[96px] rounded-[20px] overflow-hidden shrink-0 relative shadow-normal">
            <Image src="/app-icon.png" alt="wsup" fill className="object-cover" />
          </div>
          <div className="flex flex-col items-center gap-xxs">
            <span className="text-lg font-semibold text-text-title">wsup app</span>
            <span className="text-sm text-text-body">{pack.credits} credits · {pack.priceAmount}</span>
          </div>
        </div>
        <div className="mt-m flex flex-col gap-s">
          <Button fullWidth className="gap-xxs" onClick={onComplete}>
            <span>Open wsup app</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          <Button variant="secondary" fullWidth>Don&apos;t have it? Get the app</Button>
        </div>
      </div>
    </>
  )
}
