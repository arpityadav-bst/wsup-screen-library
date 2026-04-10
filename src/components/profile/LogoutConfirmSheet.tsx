'use client'

import ConfirmSheet from '@/components/ui/ConfirmSheet'

interface LogoutConfirmSheetProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function LogoutConfirmSheet({ open, onClose, onConfirm }: LogoutConfirmSheetProps) {
  return (
    <ConfirmSheet
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Log out?"
      description="You can always log back in at any time."
      confirmLabel="Log out"
    />
  )
}
