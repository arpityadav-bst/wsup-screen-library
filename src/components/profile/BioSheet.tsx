import BottomSheet from '@/components/ui/BottomSheet'

interface BioSheetProps {
  open: boolean
  onClose: () => void
  name: string
  bio: string
}

export default function BioSheet({ open, onClose, name, bio }: BioSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} title={name} maxHeight="78%" fillHeight>
      <div className="flex-1 min-h-0 overflow-y-auto p-l pb-[calc(80px+env(safe-area-inset-bottom,0px))]" style={{ scrollbarWidth: 'none' }}>
        <p className="text-sm text-text-subtitle leading-[1.75] whitespace-pre-line">{bio}</p>
      </div>
    </BottomSheet>
  )
}
