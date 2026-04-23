'use client'

import Button from '@/components/ui/Button'

export type ResultVariant = 'success' | 'failure'

interface CreditPack {
  credits: number
}

interface ResultStepProps {
  pack: CreditPack
  variant: ResultVariant
  currentBalance: number
  onClose: () => void
  onRetry: () => void
  header: React.ReactNode
}

export default function BuyCreditsResultStep({ pack, variant, currentBalance, onClose, onRetry, header }: ResultStepProps) {
  const isSuccess = variant === 'success'
  return (
    <>
      {header}
      <div className="flex-1 flex flex-col items-center px-l pb-l text-center">
        <div className="flex-1 flex flex-col items-center justify-center gap-m">
          <div className={`size-[72px] rounded-full flex items-center justify-center ${isSuccess ? 'bg-status-success/[0.15] border border-status-success/[0.30]' : 'bg-status-alert/[0.15] border border-status-alert/[0.30]'}`}>
            {isSuccess ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-status-success">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-status-alert">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <h2 className="text-xl font-semibold text-text-title">
            {isSuccess ? 'Credits added' : 'Payment failed'}
          </h2>
          {isSuccess ? (
            <div className="inline-flex items-center px-m py-xs rounded-pill bg-status-success/[0.15] border border-status-success/[0.30]">
              <span className="text-sm font-semibold text-status-success">+{pack.credits} credits · {pack.credits + currentBalance} total</span>
            </div>
          ) : (
            <p className="text-sm text-text-body max-w-[280px]">Your card wasn&apos;t charged. Try again or contact support.</p>
          )}
        </div>
        <div className="flex flex-col gap-s items-center w-full">
          <Button fullWidth className="gap-xxs" onClick={isSuccess ? onClose : onRetry}>
            <span>{isSuccess ? 'Back to chat' : 'Try again'}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          {isSuccess ? (
            <p className="text-xs text-text-small">Receipt emailed to you@example.com</p>
          ) : (
            <a className="link text-xs">Contact support</a>
          )}
        </div>
      </div>
    </>
  )
}
