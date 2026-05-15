'use client'

import Button from '@/components/ui/Button'
import StatusResultIcon from '@/components/ui/StatusResultIcon'

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

// Result of a one-time credit purchase. Subscription/Patreon variant was removed in S31 (going
// forward with one-time only); add it back as a `mode` prop if monthly returns later.
export default function BuyCreditsResultStep({ pack, variant, currentBalance, onClose, onRetry, header }: ResultStepProps) {
  const isSuccess = variant === 'success'

  return (
    <>
      {header}
      <div className="flex-1 flex flex-col items-center px-l pb-l text-center">
        <div className="flex-1 flex flex-col items-center justify-center gap-m">
          <StatusResultIcon variant={variant} />
          <h2 className="text-xl font-semibold text-text-title">{isSuccess ? 'Credits added' : 'Payment failed'}</h2>
          {isSuccess ? (
            <div className="inline-flex items-center px-m py-xs rounded-pill bg-status-success/[0.15] border border-status-success/[0.30]">
              <span className="text-sm font-semibold text-status-success">+{pack.credits} credits · {pack.credits + currentBalance} total</span>
            </div>
          ) : (
            <p className="text-sm text-text-body max-w-[280px] text-balance">Your card wasn’t charged. Contact support for help.</p>
          )}
        </div>
        <div className="flex flex-col gap-s items-center w-full">
          <Button fullWidth className="gap-xxs" onClick={isSuccess ? onClose : onRetry}>
            <span>{isSuccess ? 'Back to chat' : 'Try again'}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          {isSuccess && (
            <p className="text-xs text-text-small">Receipt emailed to you@example.com</p>
          )}
          {!isSuccess && (
            <a className="link text-xs">Contact support</a>
          )}
        </div>
      </div>
    </>
  )
}
