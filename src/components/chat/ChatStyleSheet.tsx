'use client'

import { useState, useEffect } from 'react'
import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import CloseButton from '@/components/ui/CloseButton'
import Button from '@/components/ui/Button'
import ChevronIcon from '@/components/ui/ChevronIcon'
import { ChatStyleAvatar } from './ChatStyleAvatars'
import { MODELS, getModel, type Model, type ModelId } from '@/lib/models'

interface ChatStyleSheetProps {
  open: boolean
  onClose: () => void
  selectedModelId: ModelId
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
        <p className="font-semibold text-base text-text-title">Chat style</p>
      </div>
      <CloseButton onClose={onClose} />
    </div>
  )
}

function ChatStyleRow({ model, selected, onClick }: { model: Model; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center gap-m px-m py-s rounded-card text-left transition-colors w-full
                  ${selected
                    ? 'ring-2 ring-accent bg-accent/10'
                    : 'bg-white-05 border border-white-10 hover:bg-white-10'}`}
    >
      <ChatStyleAvatar personality={model.personality} />
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold text-text-title leading-tight">{model.name}</p>
        <p className="text-xs text-text-small leading-tight mt-xxxs">{model.tagline}</p>
      </div>
    </button>
  )
}

function LegacyDisclosure({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between gap-m px-m py-m rounded-card text-left transition-colors w-full bg-white-05 border border-white-10 hover:bg-white-10 text-text-title"
    >
      <span className="text-base font-medium">Legacy models</span>
      <ChevronIcon direction="right" size={20} />
    </button>
  )
}

type Step = 'current' | 'legacy'

function PickerBody({ step, draft, onPick, onShowLegacy, onBack, onCommit, onClose }: {
  step: Step
  draft: ModelId
  onPick: (id: ModelId) => void
  onShowLegacy: () => void
  onBack: () => void
  onCommit: () => void
  onClose: () => void
}) {
  const currentModels = MODELS.filter((m) => m.tier === 'current')
  const legacyModels = MODELS.filter((m) => m.tier === 'legacy')

  return (
    <>
      <PickerHeader onClose={onClose} onBack={step === 'legacy' ? onBack : undefined} />
      {step === 'current' ? (
        <div className="flex flex-col gap-s px-l pb-l">
          {currentModels.map((m) => (
            <ChatStyleRow key={m.id} model={m} selected={m.id === draft} onClick={() => onPick(m.id)} />
          ))}
          <LegacyDisclosure onClick={onShowLegacy} />
          <Button onClick={onCommit} fullWidth>Continue chat</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-s px-l pb-l">
          <div className="flex flex-col gap-xxs">
            <p className="text-sm font-semibold text-text-title">Legacy models</p>
            <p className="text-xs text-text-small leading-snug">
              Enjoy these classics while we roll out the next generation for you.{' '}
              <a className="link" href="#">Learn more</a>
            </p>
          </div>
          {legacyModels.map((m) => (
            <ChatStyleRow key={m.id} model={m} selected={m.id === draft} onClick={() => onPick(m.id)} />
          ))}
          <Button onClick={onCommit} fullWidth>Continue chat</Button>
        </div>
      )}
    </>
  )
}

export default function ChatStyleSheet({ open, onClose, selectedModelId, onCommit }: ChatStyleSheetProps) {
  const [step, setStep] = useState<Step>('current')
  const [draft, setDraft] = useState<ModelId>(selectedModelId)

  // Sync draft + initial step with the actual selected model on each open.
  useEffect(() => {
    if (open) {
      setDraft(selectedModelId)
      setStep(getModel(selectedModelId).tier)
    }
  }, [open, selectedModelId])

  const handleCommit = () => {
    if (draft !== selectedModelId) onCommit(draft)
    onClose()
  }

  const bodyProps = {
    step,
    draft,
    onPick: setDraft,
    onShowLegacy: () => setStep('legacy'),
    onBack: () => setStep('current'),
    onCommit: handleCommit,
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
