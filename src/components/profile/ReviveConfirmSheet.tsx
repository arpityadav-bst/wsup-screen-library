'use client'

import ConfirmSheet from '@/components/ui/ConfirmSheet'

interface ReviveConfirmSheetProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  credits?: number
}

export default function ReviveConfirmSheet({ open, onClose, onConfirm, credits = 20 }: ReviveConfirmSheetProps) {
  return (
    <ConfirmSheet
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Revive character?"
      description={
        <>
          You&apos;ll need to edit and resubmit your character for review.
          Once submitted, <span className="text-text-subtitle font-medium">{credits} credits</span> will be used.
        </>
      }
      confirmLabel="Continue to edit"
    />
  )
}
