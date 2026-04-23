'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import CreditsSummaryPill from '@/components/ui/CreditsSummaryPill'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import ChevronIcon from '@/components/ui/ChevronIcon'
import ResultVariantToggle from '@/components/ui/ResultVariantToggle'
import BuyCreditsResultStep, { type ResultVariant, type ResultMode } from '@/components/ui/BuyCreditsResultStep'
import BuyCreditsPackagesStep, { type CreditPack, applyMonthlyBonus } from '@/components/ui/BuyCreditsPackagesStep'
import type { PackMode } from '@/components/ui/PackModeToggle'

interface BuyCreditsSheetProps {
  open: boolean
  onClose: () => void
}

const PACKS: CreditPack[] = [
  { id: 'handful', name: 'Handful of Credits', credits: 350, rate: '₹1 = 1.67 Credits', price: '₹210.00', priceAmount: '₹ 210', oneTimeOnly: true },
  { id: 'stack', name: 'Stack of Credits', credits: 1000, rate: '₹1 = 1.92 Credits', price: '₹520.00', priceAmount: '₹ 520', featured: true },
  { id: 'bag', name: 'Bag of Credits', credits: 1800, rate: '₹1 = 1.71 Credits', price: '₹1050.00', priceAmount: '₹ 1050' },
  { id: 'chest', name: 'Chest of Credits', credits: 4000, rate: '₹1 = 1.86 Credits', price: '₹2150.00', priceAmount: '₹ 2150' },
]

type Step = 'packages' | 'payment' | 'scan' | 'result'

const CURRENT_BALANCE = 10 // mock existing balance; production: from user state
const DEFAULT_MODE: PackMode = 'monthly'
const DEFAULT_SELECTED_ID = 'stack'

const SURFACE_CLASS = 'bg-profile-sheet-bg bg-surface-premium' // solid base + gradient overlay — see Overlays > Surface styles

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

interface FlowBodyProps {
  step: Step
  pack: CreditPack | null
  mode: PackMode
  setMode: (m: PackMode) => void
  selectedId: string | null
  setSelected: (id: string) => void
  setStep: (s: Step) => void
  setPack: (p: CreditPack) => void
  onClose: () => void
  scanVariant: 'qr' | 'app'
  resultVariant: ResultVariant
  resultMode: ResultMode
}

function FlowBody({ step, pack, mode, setMode, selectedId, setSelected, setStep, setPack, onClose, scanVariant, resultVariant, resultMode }: FlowBodyProps) {
  if (step === 'packages') {
    return (
      <BuyCreditsPackagesStep
        packs={PACKS}
        mode={mode}
        onModeChange={setMode}
        selectedPackId={selectedId}
        onSelectPack={(p) => { setSelected(p.id); setPack(p) }}
        onOneTimeBuy={(p) => { setPack(p); setStep('payment') }}
        onMonthlyContinue={() => {
          const selected = PACKS.find(p => p.id === selectedId)
          if (selected) {
            const { credits } = applyMonthlyBonus(selected)
            setPack({ ...selected, credits })
            setStep('result')
          }
        }}
        header={<StepHeader title="Buy credits" onClose={onClose} />}
      />
    )
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
    return (
      <BuyCreditsResultStep
        pack={pack}
        variant={resultVariant}
        mode={resultMode}
        currentBalance={CURRENT_BALANCE}
        onClose={onClose}
        onRetry={() => setStep('packages')}
        header={<StepHeader title="" onClose={onClose} />}
      />
    )
  }
  return null
}

export default function BuyCreditsSheet({ open, onClose }: BuyCreditsSheetProps) {
  const [step, setStep] = useState<Step>('packages')
  const [pack, setPack] = useState<CreditPack | null>(null)
  const [mode, setMode] = useState<PackMode>(DEFAULT_MODE)
  const [selectedId, setSelectedId] = useState<string | null>(DEFAULT_SELECTED_ID)
  const [resultVariant, setResultVariant] = useState<ResultVariant>('success') // production: set by payment callback
  const [showToggle, setShowToggle] = useState(false)

  const resultMode: ResultMode = mode === 'monthly' ? 'subscription' : 'one-time'

  useEffect(() => {
    if (!open) {
      setStep('packages')
      setPack(null)
      setMode(DEFAULT_MODE)
      setSelectedId(DEFAULT_SELECTED_ID)
      setShowToggle(false)
    }
  }, [open])

  useEffect(() => {
    if (!open || step !== 'result') return
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'r' || e.key === 'R') {
        if (e.shiftKey) {
          setResultVariant(prev => prev === 'success' ? 'failure' : 'success')
        } else {
          setShowToggle(prev => !prev)
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, step])

  const bodyProps = {
    step, pack, mode, setMode, selectedId, setSelected: setSelectedId,
    setStep, setPack, onClose, resultVariant, resultMode,
  }

  return (
    <>
      <BottomSheet open={open} onClose={onClose} zIndex={80} surfaceClassName={SURFACE_CLASS}>
        <div className="overflow-y-auto scroll-hide flex flex-col min-h-[497px]">
          <FlowBody {...bodyProps} scanVariant="app" />
        </div>
      </BottomSheet>

      <CenterPopup open={open} onClose={onClose} maxWidth="382px" zIndex={80} surfaceClassName={SURFACE_CLASS}>
        <div className="flex flex-col min-h-[497px]">
          <FlowBody {...bodyProps} scanVariant="qr" />
        </div>
      </CenterPopup>

      {open && step === 'result' && showToggle && (
        <ResultVariantToggle variant={resultVariant} onChange={setResultVariant} />
      )}
    </>
  )
}
