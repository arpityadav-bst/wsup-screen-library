import BottomSheet from '@/components/ui/BottomSheet'

interface LogoutConfirmSheetProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function LogoutConfirmSheet({ open, onClose, onConfirm }: LogoutConfirmSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} maxHeight="30%">
      <div className="px-xl py-l text-center">
        <p className="font-semibold text-lg text-text-title mb-xxs">Log out?</p>
        <p className="text-sm text-text-xsmall leading-relaxed">You can always log back in at any time.</p>
      </div>
      <div className="h-px bg-white-05" />
      <button onClick={onConfirm} className="w-full py-m text-base font-semibold text-status-alert text-center bg-transparent border-none cursor-pointer">
        Log out
      </button>
      <div className="h-px bg-white-05" />
      <button onClick={onClose} className="w-full py-m pb-[calc(80px+env(safe-area-inset-bottom,0px))] text-base font-medium text-text-subtitle text-center bg-transparent border-none cursor-pointer">
        Cancel
      </button>
    </BottomSheet>
  )
}
