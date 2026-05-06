'use client'

import MenuPopover from '@/components/ui/MenuPopover'

interface MenuSheetProps {
  open: boolean
  onClose: () => void
  onMyCards: () => void
  onBlockedCreators: () => void
  onLogout: () => void
  onRemoveAccount: () => void
  anchorRef?: React.RefObject<HTMLElement | null>
}

/** Order encodes a management → destructive cluster:
 *  My cards + Blocked creators are non-destructive management entries (lead into list/management surfaces);
 *  Log out + Remove account are destructive (text-status-alert), separated visually by color and clustered at the bottom.
 *  New management items insert above the destructive cluster, never inside it. */
export default function MenuSheet({ open, onClose, onMyCards, onBlockedCreators, onLogout, onRemoveAccount, anchorRef }: MenuSheetProps) {
  return (
    <MenuPopover
      open={open}
      onClose={onClose}
      anchorRef={anchorRef}
      title="Account"
      items={[
        { label: 'My cards', onClick: onMyCards },
        { label: 'Blocked creators', onClick: onBlockedCreators },
        { label: 'Log out', destructive: true, onClick: onLogout },
        { label: 'Remove account', destructive: true, onClick: onRemoveAccount },
      ]}
    />
  )
}
