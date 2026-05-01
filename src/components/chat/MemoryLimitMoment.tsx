'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

interface MemoryLimitMomentProps {
  characterName: string
  emotion?: string
  speech?: string
  acceptedEmotion?: string
  acceptedSpeech?: string
  systemText?: string
  ctaLabel?: string
  dismissLabel?: string
  initialStage?: 'prompt' | 'accepted'
  onInstall?: () => void
  onDismiss?: () => void
}

const DEFAULT_EMOTION = 'She pauses, eyes unfocused for a moment.'
const DEFAULT_SPEECH = 'Wait... what were we just talking about?'
const DEFAULT_ACCEPTED_EMOTION = 'She nods slowly, brain visibly buffering.'
const DEFAULT_ACCEPTED_SPEECH =
  "Got it — sticking with what I've got. Heads up: I'll probably ask what we were just talking about. A lot."
const DEFAULT_CTA = 'Continue to chat in app'
const DEFAULT_DISMISS = 'Maybe later'

const buildSystemText = (name: string) =>
  `${name}'s memory just hit its limit. The app remembers 10× more, so your whole story stays with her.`

function openInstall() {
  window.dispatchEvent(new CustomEvent('wsup:open-install-prompt'))
}

export default function MemoryLimitMoment({
  characterName,
  emotion = DEFAULT_EMOTION,
  speech = DEFAULT_SPEECH,
  acceptedEmotion = DEFAULT_ACCEPTED_EMOTION,
  acceptedSpeech = DEFAULT_ACCEPTED_SPEECH,
  systemText,
  ctaLabel = DEFAULT_CTA,
  dismissLabel = DEFAULT_DISMISS,
  initialStage = 'prompt',
  onInstall,
  onDismiss,
}: MemoryLimitMomentProps) {
  const [stage, setStage] = useState<'prompt' | 'accepted'>(initialStage)

  const handleDismiss = () => {
    setStage('accepted')
    onDismiss?.()
  }
  const handleInstall = onInstall ?? openInstall
  const sys = systemText ?? buildSystemText(characterName)

  // Stage 2 — Billie accepts the user's decision, in-character + slightly self-aware
  if (stage === 'accepted') {
    return (
      <div
        key="accepted"
        className="bg-chat-ai-bubble rounded-tl-2xl rounded-tr-2xl rounded-br-2xl max-w-[306px]"
        style={{ animation: 'slide-up-fade 0.35s ease-out' }}
      >
        <div className="px-s pt-xs pb-s">
          <p className="text-sm italic text-white-50 leading-snug mb-xxs">{acceptedEmotion}</p>
          <p className="text-sm text-white leading-normal whitespace-pre-wrap">{acceptedSpeech}</p>
        </div>
      </div>
    )
  }

  // Stage 1 — initial prompt
  return (
    <div
      key="prompt"
      className="bg-chat-ai-bubble rounded-tl-2xl rounded-tr-2xl rounded-br-2xl max-w-[306px]"
      style={{ animation: 'slide-up-fade 0.4s ease-out' }}
    >
      {/* Character voice — italic emotion + speech */}
      <div className="px-s pt-xs pb-s">
        <p className="text-sm italic text-white-50 leading-snug mb-xxs">{emotion}</p>
        <p className="text-sm text-white leading-normal whitespace-pre-wrap">{speech}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-white-10 mx-s" />

      {/* System explanation + primary CTA + maybe-later */}
      <div className="px-s pt-s pb-s flex flex-col gap-s">
        <p className="text-sm text-text-small leading-relaxed">{sys}</p>
        <Button size="m" fullWidth onClick={handleInstall}>
          {ctaLabel}
        </Button>
        {dismissLabel && (
          <button
            type="button"
            onClick={handleDismiss}
            className="link text-sm cursor-pointer bg-transparent border-none p-0 self-center"
          >
            {dismissLabel}
          </button>
        )}
      </div>
    </div>
  )
}
