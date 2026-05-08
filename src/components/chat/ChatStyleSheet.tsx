'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import CloseButton from '@/components/ui/CloseButton'
import Button from '@/components/ui/Button'
import ChevronIcon from '@/components/ui/ChevronIcon'
import { ModelRow } from './ModelPickerInternals'
import { MODELS, type ModelId } from '@/lib/models'

interface ChatStyleSheetProps {
  open: boolean
  onClose: () => void
  onCommit: (id: ModelId) => void
}

function PickerHeader({ onClose, onBack }: { onClose: () => void; onBack?: () => void }) {
  return (
    <div className="flex items-center justify-between px-l py-m shrink-0">
      <div className="flex items-center gap-xs">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="-ml-icon-btn p-icon-btn rounded-full hover:bg-white-10 transition-colors text-white-80 cursor-pointer border-none bg-transparent"
          >
            <ChevronIcon direction="left" size={20} />
          </button>
        )}
        <p className="font-semibold text-base text-text-title">Select chat model</p>
      </div>
      <CloseButton onClose={onClose} />
    </div>
  )
}

function OtherModelsDisclosure({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between gap-m px-m py-m rounded-card text-left transition-colors w-full bg-white-05 border border-white-10 hover:bg-white-10 text-text-title"
    >
      <span className="text-base font-medium">Other models</span>
      <ChevronIcon direction="right" size={20} />
    </button>
  )
}

// Continue CTA — label + arrow flip to "Continue in app →" when the selected model is appOnly
// (e.g. Llama 3, Mistral Nemo). Otherwise plain "Continue chat" with no trailing icon.
function ContinueButton({ disabled, isAppOnly, onClick }: { disabled: boolean; isAppOnly: boolean; onClick: () => void }) {
  return (
    <Button onClick={onClick} fullWidth disabled={disabled} className="gap-xxs">
      <span>{isAppOnly ? 'Continue in app' : 'Continue chat'}</span>
      {isAppOnly && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </Button>
  )
}

// QR-code app-handoff step — shown when user picks an appOnly model and taps "Continue in app".
// Same QR placeholder + glass pill Back button as BuyCreditsScanSteps.ScanQRStep (Cancel dropped —
// header × already handles dismissal). Inline (single-use step inside this sheet).
function AppHandoffStep({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex-1 flex flex-col gap-l items-center px-l pb-l">
      <p className="text-sm text-text-body text-center">Scan the QR code to get the wsup app and chat with free models!</p>
      <div className="bg-white rounded-button p-l flex items-center justify-center size-[232px]">
        <Image src="/qr-placeholder.png" alt="QR code" width={148} height={148} className="object-contain" />
      </div>
      <button onClick={onBack} className="w-full mt-auto px-m py-xs rounded-pill text-sm font-medium text-white-80 bg-white-10 border border-white-10 backdrop-blur-[32px] cursor-pointer hover:opacity-90 transition-opacity">Back</button>
    </div>
  )
}

type Step = 'primary' | 'other' | 'app-handoff'

function PickerBody({ step, draft, onPick, onShowOther, onBack, onContinue, onClose }: {
  step: Step
  draft: ModelId | null
  onPick: (id: ModelId) => void
  onShowOther: () => void
  onBack: () => void
  onContinue: () => void
  onClose: () => void
}) {
  const primaryModels = MODELS.filter((m) => m.tier === 'primary')
  const otherModels = MODELS.filter((m) => m.tier === 'other')
  const ctaDisabled = draft === null
  const isAppOnly = !!MODELS.find((m) => m.id === draft)?.appOnly

  if (step === 'app-handoff') {
    return (
      <>
        <PickerHeader onClose={onClose} onBack={onBack} />
        <AppHandoffStep onBack={onBack} />
      </>
    )
  }

  return (
    <>
      <PickerHeader onClose={onClose} onBack={step === 'other' ? onBack : undefined} />
      {step === 'primary' ? (
        <div className="flex flex-col gap-s px-l pb-l">
          {primaryModels.map((m) => (
            <ModelRow key={m.id} model={m} selected={m.id === draft} onSelect={() => onPick(m.id)} showSignal={false} showPersonality={false} />
          ))}
          <OtherModelsDisclosure onClick={onShowOther} />
          <ContinueButton disabled={ctaDisabled} isAppOnly={isAppOnly} onClick={onContinue} />
        </div>
      ) : (
        <div className="flex flex-col gap-s px-l pb-l">
          <div className="flex flex-col gap-xxs">
            <p className="text-sm font-semibold text-text-title">Other models</p>
            <p className="text-xs text-text-small leading-snug">
              Less-popular alternatives. Pick one of these if the primary models don&apos;t fit your story.{' '}
              <a className="link" href="#">Learn more</a>
            </p>
          </div>
          {otherModels.map((m) => (
            <ModelRow key={m.id} model={m} selected={m.id === draft} onSelect={() => onPick(m.id)} showSignal={false} showPersonality={false} />
          ))}
          <ContinueButton disabled={ctaDisabled} isAppOnly={isAppOnly} onClick={onContinue} />
        </div>
      )}
    </>
  )
}

export default function ChatStyleSheet({ open, onClose, onCommit }: ChatStyleSheetProps) {
  const [step, setStep] = useState<Step>('primary')
  const [draft, setDraft] = useState<ModelId | null>(null)

  // Reset to a fresh new-chat picker on every open (no pre-selection — user must tap to enable CTA).
  useEffect(() => {
    if (open) {
      setDraft(null)
      setStep('primary')
    }
  }, [open])

  // Continue button: appOnly model → swap to QR app-handoff step (don't commit, don't close).
  // Web-tier model → commit and close.
  const handleContinue = () => {
    if (draft === null) return
    const model = MODELS.find((m) => m.id === draft)
    if (model?.appOnly) {
      setStep('app-handoff')
    } else {
      onCommit(draft)
      onClose()
    }
  }

  // Back from any step routes to the source: app-handoff → wherever the appOnly model lives;
  // other → primary; primary → no back (handled by step === 'other' check in PickerHeader).
  const handleBack = () => {
    if (step === 'app-handoff') {
      const draftTier = draft ? MODELS.find((m) => m.id === draft)?.tier : null
      setStep(draftTier === 'other' ? 'other' : 'primary')
    } else {
      setStep('primary')
    }
  }

  const bodyProps = {
    step,
    draft,
    onPick: setDraft,
    onShowOther: () => setStep('other'),
    onBack: handleBack,
    onContinue: handleContinue,
    onClose,
  }

  return (
    <>
      <BottomSheet open={open} onClose={onClose} zIndex={70}>
        <div className="overflow-y-auto scroll-hide flex flex-col">
          <PickerBody {...bodyProps} />
        </div>
      </BottomSheet>
      <CenterPopup open={open} onClose={onClose} maxWidth="420px" zIndex={70}>
        <div className="flex flex-col">
          <PickerBody {...bodyProps} />
        </div>
      </CenterPopup>
    </>
  )
}
