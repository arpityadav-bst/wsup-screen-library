'use client'

import { useState } from 'react'
import { SubLabel, PreviewBox, StateLabel } from '../../helpers'
import CreditPackRow from '@/components/ui/CreditPackRow'
import PackModeToggle from '@/components/ui/PackModeToggle'
import Button from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'

function TokenRow({ token, desc }: { token: string; desc: string }) {
  return (
    <div className="flex items-baseline gap-xs">
      <code className="text-xxs text-accent-light font-mono shrink-0">{token}</code>
      <span className="text-xxs text-text-xsmall">{desc}</span>
    </div>
  )
}

const SHELL_BG = `
  radial-gradient(circle at 0% 60%, rgba(103,94,255,0.10) 0%, rgba(103,94,255,0) 60%),
  radial-gradient(circle at 100% 30%, rgba(255,89,236,0.10) 0%, rgba(255,89,236,0) 60%),
  radial-gradient(circle at 0% 0%, rgba(255,189,78,0.10) 0%, rgba(255,189,78,0) 60%)
`

function StepLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-text-small text-xxs uppercase tracking-[0.5px] mb-xxs mt-l">{children}</div>
}

function SummaryPill() {
  return (
    <div className="flex items-center justify-between w-full bg-white-10 rounded-button px-s py-xs">
      <span className="text-base font-semibold text-text-title">◆ 1000</span>
      <span className="text-base text-text-title">₹ 520</span>
    </div>
  )
}

function ShellHeader({ title, showBack }: { title: string; showBack?: boolean }) {
  return (
    <div className="flex items-center justify-between px-s py-s">
      {showBack ? <div className="size-[36px] flex items-center justify-center text-white-80">←</div> : <div className="size-[36px]" />}
      <p className="font-semibold text-base text-text-title">{title}</p>
      <div className="size-[36px] flex items-center justify-center text-white-80">✕</div>
    </div>
  )
}

function ResultPreview({ variant, mode }: { variant: 'success' | 'failure'; mode: 'one-time' | 'subscription' }) {
  const isSuccess = variant === 'success'
  const isSub = mode === 'subscription'
  const title = isSuccess ? (isSub ? 'Subscription active' : 'Credits added') : 'Payment failed'
  const successPill = isSub ? '+1100 credits/mo' : '+1000 credits · 1010 total'
  const failureCopy = isSub ? 'Your Patreon subscription wasn’t activated. Try again or contact support.' : 'Your card wasn’t charged. Try again or contact support.'
  return (
    <div className="w-[382px] bg-profile-sheet-bg border border-white-10 rounded-popup shadow-popup overflow-hidden" style={{ backgroundImage: SHELL_BG }}>
      <ShellHeader title="" />
      <div className="flex flex-col items-center px-l pb-l text-center min-h-[380px]">
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
          <h2 className="text-xl font-semibold text-text-title">{title}</h2>
          {isSuccess ? (
            <div className="inline-flex items-center px-m py-xs rounded-pill bg-status-success/[0.15] border border-status-success/[0.30]">
              <span className="text-sm font-semibold text-status-success">{successPill}</span>
            </div>
          ) : (
            <p className="text-sm text-text-body max-w-[280px]">{failureCopy}</p>
          )}
          {isSuccess && isSub && (
            <span className="link text-xs inline-flex items-center gap-xxxs">
              Manage subscription
              <ExternalLinkIcon size={12} className="shrink-0" />
            </span>
          )}
        </div>
        <div className="flex flex-col gap-s items-center w-full">
          <button className="w-full h-[40px] rounded-pill bg-accent text-sm font-medium text-white border-none flex items-center justify-center gap-xxs">
            {isSuccess ? 'Back to chat' : 'Try again'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          {isSuccess && !isSub && (
            <p className="text-xs text-text-small">Receipt emailed to you@example.com</p>
          )}
          {!isSuccess && (
            <span className="link text-xs">Contact support</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BuyCreditsSheetShowcase() {
  const [resultVariant, setResultVariant] = useState<'success' | 'failure'>('success')
  const [packMode, setPackMode] = useState<'one-time' | 'monthly'>('monthly')
  const [resultMode, setResultMode] = useState<'one-time' | 'subscription'>('subscription')
  return (
    <div className="min-w-[440px] flex-1">
      <SubLabel>BuyCreditsSheet — multi-step flow (responsive)</SubLabel>
      <div className="text-xs text-text-body mb-s leading-relaxed max-w-[520px]">
        Single sheet with an internal <code className="text-accent-light">step</code> state. <code className="text-accent-light">One-time</code> mode: <code className="text-accent-light">packages</code> → <code className="text-accent-light">payment</code> → <code className="text-accent-light">scan</code> → <code className="text-accent-light">result</code>. <code className="text-accent-light">Monthly</code> mode (Patreon): <code className="text-accent-light">packages</code> → <code className="text-accent-light">result</code> (Patreon handles its own payment). Monthly default, Stack of Credits pre-selected.
      </div>

      <div className="flex items-center gap-xs mb-xxs mt-l">
        <span className="text-text-small text-xxs uppercase tracking-[0.5px]">Step 1 — Packages</span>
        <div className="flex gap-xxs ml-s">
          <button
            onClick={() => setPackMode('monthly')}
            className={`px-s py-xxxs rounded-pill text-xxs font-medium border transition-colors ${packMode === 'monthly' ? 'bg-accent/[0.20] border-accent/[0.40] text-accent-light' : 'bg-transparent border-white-10 text-text-small'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPackMode('one-time')}
            className={`px-s py-xxxs rounded-pill text-xxs font-medium border transition-colors ${packMode === 'one-time' ? 'bg-accent/[0.20] border-accent/[0.40] text-accent-light' : 'bg-transparent border-white-10 text-text-small'}`}
          >
            One-time
          </button>
        </div>
      </div>
      <PreviewBox>
        <div className="w-[382px] bg-profile-sheet-bg border border-white-10 rounded-popup shadow-popup overflow-hidden" style={{ backgroundImage: SHELL_BG }}>
          <ShellHeader title="Buy credits" />
          <div className="flex flex-col gap-s px-l pb-l">
            <PackModeToggle mode={packMode} onChange={setPackMode} />
            <div className="flex flex-col gap-xs">
              <CreditPackRow
                name="Stack of Credits"
                credits={packMode === 'monthly' ? 1100 : 1000}
                originalCredits={packMode === 'monthly' ? 1000 : undefined}
                rate={packMode === 'monthly' ? '₹1 = 2.12 Credits' : '₹1 = 1.92 Credits'}
                price={packMode === 'monthly' ? '₹520.00/mo' : '₹520.00'}
                featured
                selectable={packMode === 'monthly'}
                selected={packMode === 'monthly'}
              />
              <CreditPackRow
                name="Bag of Credits"
                credits={packMode === 'monthly' ? 1980 : 1800}
                originalCredits={packMode === 'monthly' ? 1800 : undefined}
                rate={packMode === 'monthly' ? '₹1 = 1.89 Credits' : '₹1 = 1.71 Credits'}
                price={packMode === 'monthly' ? '₹1050.00/mo' : '₹1050.00'}
                selectable={packMode === 'monthly'}
              />
            </div>
            {packMode === 'monthly' && (
              <div className="pt-s">
                <Button fullWidth className="gap-xxs">
                  <span>Continue on Patreon</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </PreviewBox>
      <StateLabel>{packMode === 'monthly' ? '4 packs (2 shown). Monthly is default — Stack pre-selected. Continue on Patreon skips Payment + Scan, jumps to Result.' : '4 packs (2 shown). Tap a pack row to advance straight to Payment step.'}</StateLabel>

      <StepLabel>Step 2 — Payment method</StepLabel>
      <PreviewBox>
        <div className="w-[382px] bg-profile-sheet-bg border border-white-10 rounded-popup shadow-popup overflow-hidden">
          <ShellHeader title="Payment method" showBack />
          <div className="flex flex-col gap-l px-l pb-l">
            <SummaryPill />
            <div>
              <p className="label-xs text-white-80 mb-xs">Payment Method</p>
              <div className="flex items-center gap-xs border border-white-10 rounded-button pl-xs pr-m py-xs">
                <div className="size-[32px] rounded-button overflow-hidden shrink-0 relative bg-cover bg-center" style={{ backgroundImage: "url(/app-icon.png)" }} />
                <p className="flex-1 text-sm text-text-body">Pay with wsup app</p>
                <div className="size-[16px] rounded-[4px] bg-status-success" />
              </div>
            </div>
            <button className="w-full h-[40px] rounded-pill bg-accent text-sm font-medium text-white cursor-pointer border-none">Continue to pay in app</button>
            <label className="flex items-center gap-xs text-xs text-text-body">
              <span className="size-[16px] rounded-[4px] bg-accent" />
              I have read and accepted the <span className="link">Terms of Use</span>
            </label>
          </div>
        </div>
      </PreviewBox>
      <StateLabel>Confirms amount + payment method. &quot;Pay with wsup app&quot; is the only option currently.</StateLabel>

      <StepLabel>Step 3 — Desktop (Scan to pay)</StepLabel>
      <PreviewBox>
        <div className="w-[382px] bg-profile-sheet-bg border border-white-10 rounded-popup shadow-popup overflow-hidden">
          <ShellHeader title="Scan to pay" showBack />
          <div className="flex flex-col gap-l items-center px-l pb-l">
            <SummaryPill />
            <p className="text-sm text-text-body text-center">Scan the QR code to get the wsup app and continue buying credits!</p>
            <div className="bg-white rounded-button p-l flex items-center justify-center size-[180px]">
              <div className="size-[132px] bg-[repeating-conic-gradient(#000_0_25%,#fff_0_50%)] opacity-80" />
            </div>
            <div className="flex gap-l w-full">
              <button className="flex-1 px-m py-xs rounded-pill text-sm font-medium text-white-80 bg-white-10 border border-white-10">Back</button>
              <button className="flex-1 px-m py-xs rounded-pill text-sm font-medium text-white-80 bg-white-10 border border-white-10">Cancel</button>
            </div>
          </div>
        </div>
      </PreviewBox>
      <StateLabel>Desktop only — user is on desktop, needs QR to jump to their phone&apos;s app.</StateLabel>

      <StepLabel>Step 3 — Mobile (Finish in the app)</StepLabel>
      <PreviewBox>
        <div className="w-[382px] bg-profile-sheet-bg border border-white-10 rounded-popup shadow-popup overflow-hidden">
          <ShellHeader title="Finish in the app" showBack />
          <div className="flex flex-col px-l pb-l min-h-[380px]">
            <div className="flex-1 flex flex-col items-center justify-center gap-m rounded-card border border-white-10 p-l">
              <div className="size-[96px] rounded-[20px] bg-white shrink-0" />
              <div className="flex flex-col items-center gap-xxs">
                <span className="text-lg font-semibold text-text-title">wsup app</span>
                <span className="text-sm text-text-body">1000 credits · ₹ 520</span>
              </div>
            </div>
            <div className="mt-m flex flex-col gap-s">
              <button className="w-full h-[40px] rounded-pill bg-accent text-sm font-medium text-white border-none">Open wsup app →</button>
              <button className="w-full h-[40px] rounded-pill bg-transparent border border-white-20 text-sm font-medium text-text-body">Don&apos;t have it? Get the app</button>
            </div>
          </div>
        </div>
      </PreviewBox>
      <StateLabel>Mobile only — user is already on phone. Deep-link directly (no QR). Fallback to app store if not installed.</StateLabel>

      <div className="flex items-center gap-xs mb-xxs mt-l flex-wrap">
        <span className="text-text-small text-xxs uppercase tracking-[0.5px]">Step 4 — Result</span>
        <div className="flex gap-xxs ml-s">
          <button
            onClick={() => setResultMode('subscription')}
            className={`px-s py-xxxs rounded-pill text-xxs font-medium border transition-colors ${resultMode === 'subscription' ? 'bg-accent/[0.20] border-accent/[0.40] text-accent-light' : 'bg-transparent border-white-10 text-text-small'}`}
          >
            Subscription
          </button>
          <button
            onClick={() => setResultMode('one-time')}
            className={`px-s py-xxxs rounded-pill text-xxs font-medium border transition-colors ${resultMode === 'one-time' ? 'bg-accent/[0.20] border-accent/[0.40] text-accent-light' : 'bg-transparent border-white-10 text-text-small'}`}
          >
            One-time
          </button>
        </div>
        <div className="flex gap-xxs ml-s">
          <button
            onClick={() => setResultVariant('success')}
            className={`px-s py-xxxs rounded-pill text-xxs font-medium border transition-colors ${resultVariant === 'success' ? 'bg-status-success/[0.15] border-status-success/[0.30] text-status-success' : 'bg-transparent border-white-10 text-text-small'}`}
          >
            Success
          </button>
          <button
            onClick={() => setResultVariant('failure')}
            className={`px-s py-xxxs rounded-pill text-xxs font-medium border transition-colors ${resultVariant === 'failure' ? 'bg-status-alert/[0.15] border-status-alert/[0.30] text-status-alert' : 'bg-transparent border-white-10 text-text-small'}`}
          >
            Failure
          </button>
        </div>
      </div>
      <PreviewBox>
        <ResultPreview variant={resultVariant} mode={resultMode} />
      </PreviewBox>
      <StateLabel>Shown after payment. One-time copy: &quot;Credits added · +X · total Y&quot;. Subscription copy: &quot;Subscription active · +X credits/mo&quot;. Production: payment webhook sets variant; flow mode sets subscription vs one-time copy.</StateLabel>

      <div className="mt-m flex flex-col gap-xxs">
        <TokenRow token="BuyCreditsSheet" desc="src/components/ui/BuyCreditsSheet.tsx — orchestrator with step + mode state" />
        <TokenRow token="PackModeToggle" desc="src/components/ui/PackModeToggle.tsx — one-time / monthly pill toggle" />
        <TokenRow token="BuyCreditsPackagesStep" desc="src/components/ui/BuyCreditsPackagesStep.tsx — pack list with mode-aware interaction" />
        <TokenRow token="CreditPackRow" desc="src/components/ui/CreditPackRow.tsx — selectable variant for monthly, bonus badge prop" />
        <TokenRow token="BuyCreditsResultStep" desc="src/components/ui/BuyCreditsResultStep.tsx — success/failure + one-time/subscription copy" />
        <TokenRow token="CreditsSummaryPill" desc="src/components/ui/CreditsSummaryPill.tsx — shared by steps 2 & 3 (one-time only)" />
        <TokenRow token="Width" desc="382px desktop, full-width mobile. Single sheet, not 3 separate modals" />
        <TokenRow token="zIndex={80}" desc="Stacks above CreditSidebar (z-60)" />
        <TokenRow token="Featured pack" desc="Stack of Credits — golden gradient button, pink/blue radial bg. Pre-selected by default in monthly mode" />
        <TokenRow token="Monthly flow" desc="packages → result (Patreon handles auth + payment off-site). Skips payment + scan steps" />
        <TokenRow token="One-time flow" desc="packages → payment → scan (QR desktop / app mobile) → result" />
      </div>
    </div>
  )
}
