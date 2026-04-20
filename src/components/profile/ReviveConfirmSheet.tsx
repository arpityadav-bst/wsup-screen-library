'use client'

import Image from 'next/image'
import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import Button from '@/components/ui/Button'
import CreditFeeAccordion from '@/components/ui/CreditFeeAccordion'
import type { CharacterStateType } from './DormantCharacterCard'

interface ReviveConfirmSheetProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  characterName?: string
  characterImg?: string
  stateType?: CharacterStateType
  reason?: string
  credits?: number
  userBalance?: number
}

const STATE_BADGE: Partial<Record<CharacterStateType, { label: string; className: string }>> = {
  inactive: { label: 'Inactive', className: 'bg-white-10 text-white-60' },
  moderation: { label: 'Policy Review', className: 'bg-status-warning/[0.20] text-status-warning' },
  rejected: { label: 'Rejected', className: 'bg-status-alert/[0.15] text-status-alert' },
}

function ReviveContent({
  onClose, onConfirm, characterName, characterImg, stateType, reason, credits, userBalance,
}: Omit<ReviveConfirmSheetProps, 'open'>) {
  const cost = credits ?? 20
  const balance = userBalance ?? 120
  const hasEnough = balance >= cost
  const badge = stateType ? STATE_BADGE[stateType] : undefined

  return (
    <div className="flex flex-col gap-m px-xl py-l">
      {/* Character info */}
      {(characterName || characterImg) && (
        <div className="flex items-center gap-s">
          {characterImg && (
            <Image src={characterImg} alt={characterName ?? ''} width={64} height={64} className="rounded-card object-cover" />
          )}
          <div className="flex flex-col gap-xxs min-w-0">
            {characterName && <p className="font-semibold text-sm text-text-title truncate">{characterName}</p>}
            {badge && (
              <span className={`inline-flex items-center self-start px-xs py-xxxs rounded-pill text-xxs font-medium ${badge.className}`}>
                {badge.label}
              </span>
            )}
            {reason && <p className="text-xs text-white-60">{reason}</p>}
          </div>
        </div>
      )}

      {/* Revival fee */}
      <div className="flex items-center justify-between p-s rounded-card bg-white-05 border border-white-10">
        <span className="text-xs text-text-small">Revival fee</span>
        <span className="inline-flex items-center gap-xxs text-xs font-medium text-text-subtitle">
          <Image src="/credit.png" alt="credits" width={14} height={14} className="object-contain" />
          {cost}
        </span>
      </div>

      {/* Explanation */}
      <p className="text-xs text-text-small leading-relaxed">
        Your character will go through a content review. If it passes, it will be published and visible to everyone again. The {cost}-credit fee covers content review and is non-refundable.
      </p>

      <CreditFeeAccordion />

      {/* Actions */}
      <div className="flex flex-col gap-xs">
        {hasEnough ? (
          <Button variant="primary" size="m" fullWidth onClick={onConfirm}>
            Continue to Edit
          </Button>
        ) : (
          <>
            <Button variant="primary" size="m" fullWidth onClick={onClose}>
              Get Credits
            </Button>
            <Button variant="secondary" size="m" fullWidth disabled>
              Continue to Edit
            </Button>
          </>
        )}
        {hasEnough && (
          <Button variant="secondary" size="m" fullWidth onClick={onClose}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  )
}

export default function ReviveConfirmSheet(props: ReviveConfirmSheetProps) {
  const { open, onClose, ...rest } = props

  return (
    <>
      {/* Mobile */}
      <BottomSheet open={open} onClose={onClose} title="Revive character" fillHeight={false}>
        <ReviveContent onClose={onClose} {...rest} />
      </BottomSheet>
      {/* Desktop */}
      <CenterPopup open={open} onClose={onClose} title="Revive character" maxWidth="440px">
        <ReviveContent onClose={onClose} {...rest} />
      </CenterPopup>
    </>
  )
}
