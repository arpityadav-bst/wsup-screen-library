import BottomSheet from '@/components/ui/BottomSheet'

interface MenuSheetProps {
  open: boolean
  onClose: () => void
  onMyCards: () => void
  onLogout: () => void
}

/** Popover content for desktop 3-dot menu */
export function MenuPopoverItems({ onClose, onMyCards, onLogout }: Omit<MenuSheetProps, 'open'>) {
  return (
    <div className="flex flex-col gap-xxs">
      <button onClick={() => { onClose(); onMyCards() }} className="w-full px-m py-xs text-sm font-semibold text-text-title bg-transparent border-none cursor-pointer text-center rounded-button hover:bg-white-10 transition-colors">
        My cards
      </button>
      <button onClick={() => { onClose(); onLogout() }} className="w-full px-m py-xs text-sm font-semibold text-status-alert bg-transparent border-none cursor-pointer text-center rounded-button hover:bg-white-10 transition-colors">
        Log out
      </button>
    </div>
  )
}

export default function MenuSheet({ open, onClose, onMyCards, onLogout }: MenuSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} maxHeight="40%">
      <div className="py-xs pb-m">
        <p className="px-m py-xs label-xs">Account</p>
        <div className="h-px bg-white-05 my-xxs" />
        <button
          onClick={() => { onClose(); onMyCards() }}
          className="w-full flex items-center gap-s px-m py-s text-base font-medium text-text-subtitle bg-transparent border-none cursor-pointer text-left hover:bg-white-05 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          My cards
        </button>
        <div className="h-px bg-white-05 my-xxs" />
        <button
          onClick={() => { onClose(); onLogout() }}
          className="w-full flex items-center gap-s px-m py-s text-base font-medium text-status-alert bg-transparent border-none cursor-pointer text-left hover:bg-white-05 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Log out
        </button>
        <div className="h-px bg-white-05 my-xxs" />
        <button onClick={onClose} className="w-full py-s text-base font-medium text-text-xsmall text-center bg-transparent border-none cursor-pointer">
          Cancel
        </button>
      </div>
    </BottomSheet>
  )
}
