'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import CloseButton from '@/components/ui/CloseButton'

interface MemoryLimitPopupProps {
  characterName: string
  characterImage: string
  title?: string
  body?: string
  ctaLabel?: string
  secondaryLabel?: string
  onInstall?: () => void
  onSwitchModel?: () => void
  onDismiss?: () => void
}

const DEFAULT_CTA = 'Open in app'
const DEFAULT_SECONDARY = 'switch model instead'

const buildTitle = (name: string) => `${name}'s memory is full.`

const buildBody = () => `The app remembers 3× more of your story.`

function openInstall() {
  window.dispatchEvent(new CustomEvent('wsup:open-install-prompt'))
}

function openSwitchModel() {
  window.dispatchEvent(new CustomEvent('wsup:open-model-picker'))
}

export default function MemoryLimitPopup({
  characterName,
  characterImage,
  title,
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
  const resolvedTitle = title ?? buildTitle(characterName)
  const resolvedBody = body ?? buildBody()

  return (
    <div
      className="relative w-full max-w-popup-narrow mx-auto"
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

        {/* Content — top padding clears the DP overhang (96px DP, 48px overhang) + 16px breathing space */}
        {/* Spacing rhythm: tight WITHIN groups (narration / action), wider BETWEEN them (the read→act pivot) */}
        <div className="relative pt-4xl px-l pb-l flex flex-col gap-xl text-center">

          {/* Narration group — title + body read as one unit */}
          <div className="flex flex-col gap-xs">
            {/* Title — system-voice, descriptive */}
            <p className="text-base text-text-title font-medium leading-snug">
              {resolvedTitle}
            </p>
            {/* Body — app benefit */}
            <p className="text-sm text-white-90 leading-relaxed">{resolvedBody}</p>
          </div>

          {/* Action group — primary CTA + alternate link */}
          <div className="flex flex-col gap-s">
            {/* Primary CTA — full width */}
            <Button size="m" fullWidth onClick={handleInstall}>
              {ctaLabel}
            </Button>
            {/* Switch-model link — centered, smaller weight */}
            {secondaryLabel && (
              <button
                type="button"
                onClick={handleSwitchModel}
                className="link text-sm cursor-pointer bg-transparent border-none p-0 self-center"
              >
                {secondaryLabel}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
