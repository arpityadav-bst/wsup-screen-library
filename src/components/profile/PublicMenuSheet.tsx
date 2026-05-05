'use client'

import MenuPopover from '@/components/ui/MenuPopover'

interface PublicMenuSheetProps {
  open: boolean
  onClose: () => void
  onBlock: () => void
  onUnblock: () => void
  onReport: () => void
  /** Toggles the first menu row between "Block" and "Unblock". */
  isBlocked: boolean
  anchorRef?: React.RefObject<HTMLElement | null>
}

/** 3-dot menu on a public creator profile.
 *  Order: Block (personal-control) → Report (institutional escalation). Both destructive-toned.
 *  Labels are bare verbs — the menu lives on the creator's profile so the target is already specified by parent context. */
export default function PublicMenuSheet({ open, onClose, onBlock, onUnblock, onReport, isBlocked, anchorRef }: PublicMenuSheetProps) {
  const blockLabel = isBlocked ? 'Unblock' : 'Block'
  return (
    <MenuPopover
      open={open}
      onClose={onClose}
      anchorRef={anchorRef}
      title="Profile"
      items={[
        { label: blockLabel, destructive: true, onClick: isBlocked ? onUnblock : onBlock },
        { label: 'Report', destructive: true, onClick: onReport },
      ]}
    />
  )
}
