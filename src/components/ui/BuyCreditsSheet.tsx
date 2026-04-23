'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import CreditPackRow from '@/components/ui/CreditPackRow'
import CreditsSummaryPill from '@/components/ui/CreditsSummaryPill'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import ChevronIcon from '@/components/ui/ChevronIcon'

interface BuyCreditsSheetProps {
  open: boolean
  onClose: () => void
}

interface CreditPack {
  id: string
  name: string
  credits: number
  rate: string
  price: string
  priceAmount: string
  featured?: boolean
}

const PACKS: CreditPack[] = [
  { id: 'handful', name: 'Handful of Credits', credits: 350, rate: '₹1 = 1.67 Credits', price: '₹210.00', priceAmount: '₹ 210' },
  { id: 'stack', name: 'Stack of Credits', credits: 1000, rate: '₹1 = 1.92 Credits', price: '₹520.00', priceAmount: '₹ 520', featured: true },
  { id: 'bag', name: 'Bag of Credits', credits: 1800, rate: '₹1 = 1.71 Credits', price: '₹1050.00', priceAmount: '₹ 1050' },
  { id: 'chest', name: 'Chest of Credits', credits: 4000, rate: '₹1 = 1.86 Credits', price: '₹2150.00', priceAmount: '₹ 2150' },
]

type Step = 'packages' | 'payment' | 'scan' | 'result'
type ResultVariant = 'success' | 'failure'

const CURRENT_BALANCE = 10 // mock existing balance; production: from user state

const BG_GRADIENTS = `
  radial-gradient(circle at 0% 60%, rgba(103,94,255,0.10) 0%, rgba(103,94,255,0) 60%),
  radial-gradient(circle at 100% 30%, rgba(255,89,236,0.10) 0%, rgba(255,89,236,0) 60%),
  radial-gradient(circle at 0% 0%, rgba(255,189,78,0.10) 0%, rgba(255,189,78,0) 60%)
`

function StepHeader({ title, onBack, onClose }: { title: string; onBack?: () => void; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between px-s py-s shrink-0">
      {onBack ? (
        <button
          onClick={onBack}
          aria-label="Back"
          className="p-icon-btn rounded-full hover:bg-white-10 transition-colors text-white-80 border-none bg-transparent cursor-pointer"
        >
          <ChevronIcon direction="left" size={20} />
        </button>
      ) : (
        <span className="w-[36px] shrink-0" aria-hidden />
      )}
      <p className="font-semibold text-base text-text-title">{title}</p>
      <button
        onClick={onClose}
        aria-label="Close"
        className="p-icon-btn rounded-full hover:bg-white-10 transition-colors text-white-80 border-none bg-transparent cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

function PackagesStep({ onSelect, onClose }: { onSelect: (pack: CreditPack) => void; onClose: () => void }) {
  return (
    <>
      <StepHeader title="Buy credits" onClose={onClose} />
      <div className="flex-1 flex flex-col gap-xs px-l pb-l">
        {PACKS.map((pack) => (
          <CreditPackRow
            key={pack.id}
            name={pack.name}
            credits={pack.credits}
            rate={pack.rate}
            price={pack.price}
            featured={pack.featured}
            onSelect={() => onSelect(pack)}
          />
        ))}
      </div>
    </>
  )
}

function PaymentStep({ pack, onBack, onClose, onContinue }: { pack: CreditPack; onBack: () => void; onClose: () => void; onContinue: () => void }) {
  const [tosAccepted, setTosAccepted] = useState(true)
  return (
    <>
      <StepHeader title="Payment method" onBack={onBack} onClose={onClose} />
      <div className="flex-1 flex flex-col gap-l px-l pb-l">
        <CreditsSummaryPill credits={pack.credits} price={pack.priceAmount} />

        <div className="flex flex-col gap-xs">
          <p className="label-xs text-white-80">Payment Method</p>
          <div className="flex items-center gap-xs border border-white-10 rounded-button pl-xs pr-m py-xs">
            <div className="size-[32px] rounded-button overflow-hidden shrink-0 relative">
              <Image src="/app-icon.png" alt="" fill className="object-cover" />
            </div>
            <p className="flex-1 text-sm text-text-body">Pay with wsup app</p>
            <Checkbox checked variant="success" aria-label="Payment method selected" />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center min-h-[48px]">
          <Image src="/ssl.png" alt="Secure Payment · SSL Encryption" width={180} height={32} className="object-contain opacity-60" />
        </div>

        <div className="flex flex-col gap-m items-center">
          <Button fullWidth disabled={!tosAccepted} onClick={onContinue}>Continue to pay in app</Button>
          <div className="flex items-center gap-xs">
            <Checkbox checked={tosAccepted} onChange={setTosAccepted} aria-label="Accept terms of use" />
            <span className="text-xs text-text-body">I have read and accepted the <a className="link">Terms of Use</a></span>
          </div>
        </div>
      </div>
    </>
  )
}

function ScanQRStep({ pack, onBack, onClose, onComplete }: { pack: CreditPack; onBack: () => void; onClose: () => void; onComplete: () => void }) {
  return (
    <>
      <StepHeader title="Scan to pay" onBack={onBack} onClose={onClose} />
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

function FinishInAppStep({ pack, onBack, onClose, onComplete }: { pack: CreditPack; onBack: () => void; onClose: () => void; onComplete: () => void }) {
  return (
    <>
      <StepHeader title="Finish in the app" onBack={onBack} onClose={onClose} />
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

function ResultStep({ pack, variant, onClose, onRetry }: { pack: CreditPack; variant: ResultVariant; onClose: () => void; onRetry: () => void }) {
  const isSuccess = variant === 'success'
  return (
    <>
      <StepHeader title="" onClose={onClose} />
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
              <span className="text-sm font-semibold text-status-success">+{pack.credits} credits · {pack.credits + CURRENT_BALANCE} total</span>
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

function FlowBody({ step, pack, setStep, setPack, onClose, scanVariant, resultVariant }: { step: Step; pack: CreditPack | null; setStep: (s: Step) => void; setPack: (p: CreditPack) => void; onClose: () => void; scanVariant: 'qr' | 'app'; resultVariant: ResultVariant }) {
  if (step === 'packages') {
    return <PackagesStep onSelect={(p) => { setPack(p); setStep('payment') }} onClose={onClose} />
  }
  if (step === 'payment' && pack) {
    return <PaymentStep pack={pack} onBack={() => setStep('packages')} onClose={onClose} onContinue={() => setStep('scan')} />
  }
  if (step === 'scan' && pack) {
    return scanVariant === 'qr'
      ? <ScanQRStep pack={pack} onBack={() => setStep('payment')} onClose={onClose} onComplete={() => setStep('result')} />
      : <FinishInAppStep pack={pack} onBack={() => setStep('payment')} onClose={onClose} onComplete={() => setStep('result')} />
  }
  if (step === 'result' && pack) {
    return <ResultStep pack={pack} variant={resultVariant} onClose={onClose} onRetry={() => setStep('packages')} />
  }
  return null
}

export default function BuyCreditsSheet({ open, onClose }: BuyCreditsSheetProps) {
  const [step, setStep] = useState<Step>('packages')
  const [pack, setPack] = useState<CreditPack | null>(null)
  const [resultVariant] = useState<ResultVariant>('success') // production: set by payment callback

  useEffect(() => {
    if (!open) {
      setStep('packages')
      setPack(null)
    }
  }, [open])

  const surfaceStyle = { backgroundImage: BG_GRADIENTS }
  return (
    <>
      <BottomSheet open={open} onClose={onClose} zIndex={80} surfaceStyle={surfaceStyle}>
        <div className="overflow-y-auto scroll-hide flex flex-col min-h-[497px]">
          <FlowBody step={step} pack={pack} setStep={setStep} setPack={setPack} onClose={onClose} scanVariant="app" resultVariant={resultVariant} />
        </div>
      </BottomSheet>

      <CenterPopup open={open} onClose={onClose} maxWidth="382px" zIndex={80} surfaceStyle={surfaceStyle}>
        <div className="flex flex-col min-h-[497px]">
          <FlowBody step={step} pack={pack} setStep={setStep} setPack={setPack} onClose={onClose} scanVariant="qr" resultVariant={resultVariant} />
        </div>
      </CenterPopup>
    </>
  )
}
