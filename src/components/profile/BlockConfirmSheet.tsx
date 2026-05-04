'use client'

import ConfirmSheet from '@/components/ui/ConfirmSheet'

interface BlockConfirmSheetProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  /** Used in title + description for clarity ("Block Honeybadger?"). */
  creatorName: string
}

export default function BlockConfirmSheet({ open, onClose, onConfirm, creatorName }: BlockConfirmSheetProps) {
  return (
    <ConfirmSheet
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={`Block ${creatorName}?`}
      description={`They won't be able to find your profile or interact with you. Their characters and stories will be hidden from your feed and search. You can unblock them anytime.`}
      confirmLabel="Block"
      destructive
    />
  )
}
