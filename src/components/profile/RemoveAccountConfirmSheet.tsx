'use client'

import { useEffect, useState } from 'react'
import ConfirmSheet from '@/components/ui/ConfirmSheet'

interface RemoveAccountConfirmSheetProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function RemoveAccountConfirmSheet({ open, onClose, onConfirm }: RemoveAccountConfirmSheetProps) {
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (!open) setConfirmed(false)
  }, [open])

  return (
    <ConfirmSheet
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Remove account?"
      description="This permanently deletes your account, characters, stories, and chat history. You can't undo this."
      confirmLabel="Remove account"
      destructive
      confirmGate={{
        label: "I'm sure I want to permanently remove my account",
        checked: confirmed,
        onChange: setConfirmed,
      }}
    />
  )
}
