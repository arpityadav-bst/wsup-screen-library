'use client'

import MenuPopover from '@/components/ui/MenuPopover'

interface MenuSheetProps {
  open: boolean
  onClose: () => void
  onMyCards: () => void
  onLogout: () => void
  onRemoveAccount: () => void
  anchorRef?: React.RefObject<HTMLElement | null>
}

export default function MenuSheet({ open, onClose, onMyCards, onLogout, onRemoveAccount, anchorRef }: MenuSheetProps) {
  return (
    <MenuPopover
      open={open}
      onClose={onClose}
      anchorRef={anchorRef}
      title="Account"
      items={[
        { label: 'My cards', onClick: onMyCards },
        { label: 'Log out', destructive: true, onClick: onLogout },
        { label: 'Remove account', destructive: true, onClick: onRemoveAccount },
      ]}
    />
  )
}
