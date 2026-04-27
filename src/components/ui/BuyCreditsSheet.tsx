'use client'

import Image from 'next/image'
import { useEffect, useState, type ReactNode } from 'react'
import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import CreditsSummaryPill from '@/components/ui/CreditsSummaryPill'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import ChevronIcon from '@/components/ui/ChevronIcon'
import CloseButton from '@/components/ui/CloseButton'
import ResultVariantToggle from '@/components/ui/ResultVariantToggle'
import LoginSheet from '@/components/ui/LoginSheet'
import { ScanQRStep, FinishInAppStep } from '@/components/ui/BuyCreditsScanSteps'
import BuyCreditsResultStep, { type ResultVariant, type ResultMode } from '@/components/ui/BuyCreditsResultStep'
import BuyCreditsPackagesStep, { type CreditPack, applyMonthlyBonus } from '@/components/ui/BuyCreditsPackagesStep'
import type { PackMode } from '@/components/ui/PackModeToggle'
import { useAuth } from '@/lib/AuthContext'

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

// Single gate copy across all 4 payment-progression CTAs (one-time, monthly, payment, scan)
const GATE_HEADLINE = <>Sign in to continue</>
const GATE_SUBTITLE = 'Keep your credits across every device.'
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
      <CloseButton onClose={onClose} className="text-white-80" />
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
  gateAction: (action: () => void, headline: ReactNode, subtitle: string) => void
}

function FlowBody({ step, pack, mode, setMode, selectedId, setSelected, setStep, setPack, onClose, scanVariant, resultVariant, resultMode, gateAction }: FlowBodyProps) {
  if (step === 'packages') {
    return (
      <BuyCreditsPackagesStep
        packs={PACKS}
        mode={mode}
        onModeChange={setMode}
        selectedPackId={selectedId}
        onSelectPack={(p) => { setSelected(p.id); setPack(p) }}
        onOneTimeBuy={(p) => gateAction(
          () => { setPack(p); setStep('payment') },
          GATE_HEADLINE,
          GATE_SUBTITLE,
        )}
        onMonthlyContinue={() => gateAction(
          () => {
            const selected = PACKS.find(p => p.id === selectedId)
            if (selected) {
              const { credits } = applyMonthlyBonus(selected)
              setPack({ ...selected, credits })
              setStep('result')
            }
          },
          GATE_HEADLINE,
          GATE_SUBTITLE,
        )}
        header={<StepHeader title="Buy credits" onClose={onClose} />}
      />
    )
  }
  if (step === 'payment' && pack) {
    return <PaymentStep pack={pack} onBack={() => setStep('packages')} onClose={onClose} onContinue={() => gateAction(
      () => setStep('scan'),
      GATE_HEADLINE,
      GATE_SUBTITLE,
    )} />
  }
  if (step === 'scan' && pack) {
    const gatedComplete = () => gateAction(
      () => setStep('result'),
      GATE_HEADLINE,
      GATE_SUBTITLE,
    )
    const StepComp = scanVariant === 'qr' ? ScanQRStep : FinishInAppStep
    const stepTitle = scanVariant === 'qr' ? 'Scan to pay' : 'Finish in the app'
    return <StepComp pack={pack} onBack={() => setStep('payment')} onClose={onClose} onComplete={gatedComplete} header={<StepHeader title={stepTitle} onBack={() => setStep('payment')} onClose={onClose} />} />
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

interface LoginGate {
  headline: ReactNode
  subtitle: string
  resume: () => void
}

export default function BuyCreditsSheet({ open, onClose }: BuyCreditsSheetProps) {
  const [step, setStep] = useState<Step>('packages')
  const [pack, setPack] = useState<CreditPack | null>(null)
  const [mode, setMode] = useState<PackMode>(DEFAULT_MODE)
  const [selectedId, setSelectedId] = useState<string | null>(DEFAULT_SELECTED_ID)
  const [resultVariant, setResultVariant] = useState<ResultVariant>('success') // production: set by payment callback
  const [showToggle, setShowToggle] = useState(false)
  const [loginGate, setLoginGate] = useState<LoginGate | null>(null)
  const { isLoggedIn, login } = useAuth()

  const resultMode: ResultMode = mode === 'monthly' ? 'subscription' : 'one-time'

  const gateAction = (action: () => void, headline: ReactNode, subtitle: string) => {
    if (isLoggedIn) action()
    else setLoginGate({ headline, subtitle, resume: action })
  }

  const handleSignIn = () => {
    const resume = loginGate?.resume
    login()
    setLoginGate(null)
    resume?.()
  }

  useEffect(() => {
    if (!open) {
      setStep('packages')
      setPack(null)
      setMode(DEFAULT_MODE)
      setSelectedId(DEFAULT_SELECTED_ID)
      setShowToggle(false)
      setLoginGate(null)
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
    setStep, setPack, onClose, resultVariant, resultMode, gateAction,
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

      <LoginSheet
        open={loginGate !== null}
        onClose={() => setLoginGate(null)}
        onSignIn={handleSignIn}
        headline={loginGate?.headline}
        subtitle={loginGate?.subtitle}
      />

      {open && step === 'result' && showToggle && (
        <ResultVariantToggle variant={resultVariant} onChange={setResultVariant} />
      )}
    </>
  )
}
