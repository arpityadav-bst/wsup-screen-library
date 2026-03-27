/**
 * Shared menu item for bottom sheets (mobile) and popovers (desktop).
 * Two modes: 'sheet' (full-width with icon) and 'popover' (compact text-only).
 */

interface MenuItemProps {
  icon?: React.ReactNode
  label: string
  destructive?: boolean
  onClick: () => void
  mode?: 'sheet' | 'popover'
}

export default function MenuItem({ icon, label, destructive, onClick, mode = 'sheet' }: MenuItemProps) {
  if (mode === 'popover') {
    return (
      <button
        onClick={onClick}
        className={`w-full px-m py-xs text-sm font-semibold bg-transparent border-none cursor-pointer text-center rounded-button hover:bg-white-10 transition-colors ${
          destructive ? 'text-status-alert' : 'text-text-title'
        }`}
      >
        {label}
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-s px-m py-s text-base font-medium cursor-pointer bg-transparent border-none text-left hover:bg-white-05 transition-colors ${
        destructive ? 'text-status-alert' : 'text-text-subtitle'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

export function MenuDivider() {
  return <div className="h-px bg-white-05 my-xxs" />
}

export function MenuCancel({ onClick }: { onClick: () => void }) {
  return (
    <>
      <MenuDivider />
      <button onClick={onClick} className="w-full py-s text-base font-medium text-text-xsmall text-center bg-transparent border-none cursor-pointer">
        Cancel
      </button>
    </>
  )
}
