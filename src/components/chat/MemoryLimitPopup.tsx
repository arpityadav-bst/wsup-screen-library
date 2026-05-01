'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import CloseButton from '@/components/ui/CloseButton'

interface MemoryLimitPopupProps {
  characterName: string
  characterImage: string
  modelName?: string
  title?: string
  modelNote?: string
  body?: string
  ctaLabel?: string
  secondaryLabel?: string
  onInstall?: () => void
  onSwitchModel?: () => void
  onDismiss?: () => void
}

const DEFAULT_MODEL = 'Llama 3 (free)'
const DEFAULT_CTA = 'Continue to chat in app'
const DEFAULT_SECONDARY = 'switch to a better model'

const buildTitle = () =>
  `I can't remember everything anymore — my memory just got too full.`

const buildModelNote = (model: string) =>
  `You're chatting on ${model} right now — it forgets context after a few messages.`

const buildBody = (name: string) =>
  `The app remembers 10× more, so your whole story stays with ${name}.`

function openInstall() {
  window.dispatchEvent(new CustomEvent('wsup:open-install-prompt'))
}

function openSwitchModel() {
  window.dispatchEvent(new CustomEvent('wsup:open-model-picker'))
}

export default function MemoryLimitPopup({
  characterName,
  characterImage,
  modelName = DEFAULT_MODEL,
  title,
  modelNote,
  body,
  ctaLabel = DEFAULT_CTA,
  secondaryLabel = DEFAULT_SECONDARY,
  onInstall,
  onSwitchModel,
  onDismiss,
}: MemoryLimitPopupProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }
  const handleInstall = onInstall ?? openInstall
  const handleSwitchModel = onSwitchModel ?? openSwitchModel
  const resolvedTitle = title ?? buildTitle()
  const resolvedNote = modelNote ?? buildModelNote(modelName)
  const resolvedBody = body ?? buildBody(characterName)

  return (
    <div
      className="relative w-full max-w-[420px] mx-auto"
      style={{ animation: 'slide-up-fade 0.4s ease-out' }}
    >

      {/* Character DP + exclamation badge — outside the rounded clip so they can poke out */}
      <div className="absolute -top-[48px] left-1/2 -translate-x-1/2 z-10">
        <div className="relative w-[96px] h-[96px]">
          <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-white-20 shadow-popup">
            <Image
              src={characterImage}
              alt={characterName}
              width={96}
              height={96}
              className="object-cover w-full h-full grayscale"
            />
          </div>
          {/* Exclamation burst — top-right of the DP, badge-style */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/icon-exclamation-burst.svg"
            alt=""
            width={44}
            height={44}
            className="absolute -top-[8px] -right-[8px] drop-shadow-md"
          />
        </div>
      </div>

      {/* Popup card — solid WSUP popup surface (matches BottomSheet/CenterPopup convention) */}
      <div className="relative rounded-popup bg-profile-sheet-bg border border-white-10 overflow-hidden">

        {/* Close X — top-right corner of the popup */}
        <CloseButton
          onClose={handleDismiss}
          size={16}
          ariaLabel="Dismiss memory limit popup"
          className="absolute top-xs right-xs z-10 text-white-70 hover:text-white"
        />

        {/* Content — top padding accounts for the larger DP overlap (96px DP, 48px overhang) */}
        <div className="relative pt-6xl px-l pb-l flex flex-col gap-m">

          {/* Title — character voice, italic + inline attribution */}
          <p className="text-base text-text-title font-medium italic leading-snug">
            &ldquo;{resolvedTitle}&rdquo;
            <span className="not-italic text-xs text-white-70 font-normal ml-xxs whitespace-nowrap">— {characterName}</span>
          </p>

          {/* Inner sleek model-context card */}
          <div className="rounded-card bg-white-10 px-s py-xs">
            <p className="text-xs text-white-70 leading-relaxed">{resolvedNote}</p>
          </div>

          {/* Body — app benefit */}
          <p className="text-sm text-white-90 leading-relaxed">{resolvedBody}</p>

          {/* Primary CTA — full width */}
          <Button size="m" fullWidth onClick={handleInstall}>
            {ctaLabel}
          </Button>

          {/* Subtle divider — edge-to-edge */}
          <div className="border-t border-white-10 -mx-l" />

          {/* Switch-model link — centered */}
          {secondaryLabel && (
            <p className="text-sm text-white-70 leading-relaxed text-center">
              Or{' '}
              <button
                type="button"
                onClick={handleSwitchModel}
                className="link cursor-pointer bg-transparent border-none p-0"
              >
                {secondaryLabel}
              </button>
            </p>
          )}

        </div>
      </div>
    </div>
  )
}
