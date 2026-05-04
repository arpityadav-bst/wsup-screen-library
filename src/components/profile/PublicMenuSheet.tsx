import BottomSheet from '@/components/ui/BottomSheet'

interface PublicMenuSheetProps {
  open: boolean
  onClose: () => void
  onBlock: () => void
  onUnblock: () => void
  onReport: () => void
  /** Toggles the first menu row between "Block" and "Unblock". */
  isBlocked: boolean
}

const BlockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const ReportIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M4 21V4a1 1 0 011-1h11l-2 4 2 4H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Popover content for desktop 3-dot menu on a public creator profile.
 *  Order: Block (personal-control) → Report (institutional escalation). Both destructive-toned.
 *  Labels are bare verbs — the menu lives on the creator's profile so the target is already specified by parent context. */
export function PublicMenuPopoverItems({
  onClose, onBlock, onUnblock, onReport, isBlocked,
}: Omit<PublicMenuSheetProps, 'open'>) {
  const blockLabel = isBlocked ? 'Unblock' : 'Block'
  const handleBlockToggle = () => { onClose(); isBlocked ? onUnblock() : onBlock() }
  return (
    <div className="flex flex-col gap-xxs">
      <button
        onClick={handleBlockToggle}
        className="w-full px-m py-xs text-sm font-semibold text-status-alert bg-transparent border-none cursor-pointer text-center rounded-button hover:bg-white-10 transition-colors"
      >
        {blockLabel}
      </button>
      <button
        onClick={() => { onClose(); onReport() }}
        className="w-full px-m py-xs text-sm font-semibold text-status-alert bg-transparent border-none cursor-pointer text-center rounded-button hover:bg-white-10 transition-colors"
      >
        Report
      </button>
    </div>
  )
}

export default function PublicMenuSheet({
  open, onClose, onBlock, onUnblock, onReport, isBlocked,
}: PublicMenuSheetProps) {
  const blockLabel = isBlocked ? 'Unblock' : 'Block'
  const handleBlockToggle = () => { onClose(); isBlocked ? onUnblock() : onBlock() }
  return (
    <BottomSheet open={open} onClose={onClose} maxHeight="40%">
      <div className="py-xs pb-m">
        <p className="px-m py-xs label-xs">Profile</p>
        <div className="h-px bg-white-05 my-xxs" />
        <button
          onClick={handleBlockToggle}
          className="w-full flex items-center gap-s px-m py-s text-base font-medium text-status-alert bg-transparent border-none cursor-pointer text-left hover:bg-white-05 transition-colors"
        >
          <BlockIcon />
          {blockLabel}
        </button>
        <div className="h-px bg-white-05 my-xxs" />
        <button
          onClick={() => { onClose(); onReport() }}
          className="w-full flex items-center gap-s px-m py-s text-base font-medium text-status-alert bg-transparent border-none cursor-pointer text-left hover:bg-white-05 transition-colors"
        >
          <ReportIcon />
          Report
        </button>
        <div className="h-px bg-white-05 my-xxs" />
        <button onClick={onClose} className="w-full py-s text-base font-medium text-text-xsmall text-center bg-transparent border-none cursor-pointer">
          Cancel
        </button>
      </div>
    </BottomSheet>
  )
}
