import { useRouter } from 'next/navigation'
import BottomSheet from '@/components/ui/BottomSheet'

interface CharacterMenuSheetProps {
  open: boolean
  onClose: () => void
  character: string | null
}

/** Popover content for desktop character 3-dot menu */
export function CharacterMenuPopoverItems({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const stopLink = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation() }
  return (
    <div className="flex flex-col gap-xxs" onClick={stopLink}>
      <button onClick={() => { onClose(); router.push('/edit-character') }} className="w-full px-m py-xs text-sm font-semibold text-text-title bg-transparent border-none cursor-pointer text-center rounded-button hover:bg-white-10 transition-colors">Edit</button>
      <button onClick={onClose} className="w-full px-m py-xs text-sm font-semibold text-text-title bg-transparent border-none cursor-pointer text-center rounded-button hover:bg-white-10 transition-colors">Share</button>
      <button onClick={onClose} className="w-full px-m py-xs text-sm font-semibold text-status-alert bg-transparent border-none cursor-pointer text-center rounded-button hover:bg-white-10 transition-colors">Delete</button>
    </div>
  )
}

/** Popover content for dormant/needs-attention character 3-dot menu */
export function DormantMenuPopoverItems({ stateType, onClose }: { stateType: string; onClose: () => void }) {
  const showShare = stateType === 'inactive'
  const showSupport = stateType === 'removed'
  const btnBase = "w-full px-m py-xs text-sm font-semibold bg-transparent border-none cursor-pointer text-center rounded-button hover:bg-white-10 transition-colors"
  return (
    <div className="flex flex-col gap-xxs" onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
      {showShare && <button onClick={onClose} className={`${btnBase} text-text-title`}>Share</button>}
      {showSupport && <button onClick={onClose} className={`${btnBase} text-forms-focus-border`}>Contact Support</button>}
      <button onClick={onClose} className={`${btnBase} text-status-alert`}>Delete</button>
    </div>
  )
}

function SheetItem({ icon, label, destructive, onClick }: { icon: React.ReactNode; label: string; destructive?: boolean; onClick: () => void }) {
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

/** Bottom sheet for needs-attention character menu — actions vary by state */
export function DormantCharacterMenuSheet({ open, onClose, character, stateType }: CharacterMenuSheetProps & { stateType: string }) {
  const showShare = stateType === 'inactive'
  const showSupport = stateType === 'removed'
  const shareIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8"/><circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
  const deleteIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 6V4h6v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  const supportIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
  return (
    <BottomSheet open={open} onClose={onClose} maxHeight="50%">
      <div className="py-xs pb-m">
        <p className="px-m py-xs label-xs">Character</p>
        <div className="h-px bg-white-05 my-xxs" />
        {showShare && (
          <>
            <SheetItem onClick={onClose} icon={shareIcon} label="Share character" />
            <div className="h-px bg-white-05 my-xxs" />
          </>
        )}
        {showSupport && (
          <>
            <SheetItem onClick={onClose} icon={supportIcon} label="Contact Support" />
            <div className="h-px bg-white-05 my-xxs" />
          </>
        )}
        <SheetItem onClick={onClose} destructive icon={deleteIcon} label="Delete character" />
        <div className="h-px bg-white-05 my-xxs" />
        <button onClick={onClose} className="w-full py-s text-base font-medium text-text-xsmall text-center bg-transparent border-none cursor-pointer">
          Cancel
        </button>
      </div>
    </BottomSheet>
  )
}

export default function CharacterMenuSheet({ open, onClose, character }: CharacterMenuSheetProps) {
  const router = useRouter()
  return (
    <BottomSheet open={open} onClose={onClose} maxHeight="50%">
      <div className="py-xs pb-m">
        <p className="px-m py-xs label-xs">Character</p>
        <div className="h-px bg-white-05 my-xxs" />
        <SheetItem
          onClick={() => { onClose(); router.push('/edit-character') }}
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          label="Edit character"
        />
        <div className="h-px bg-white-05 my-xxs" />
        <SheetItem
          onClick={onClose}
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8"/><circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}
          label="Share character"
        />
        <div className="h-px bg-white-05 my-xxs" />
        <SheetItem
          onClick={onClose}
          destructive
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 6V4h6v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          label="Delete character"
        />
        <div className="h-px bg-white-05 my-xxs" />
        <button onClick={onClose} className="w-full py-s text-base font-medium text-text-xsmall text-center bg-transparent border-none cursor-pointer">
          Cancel
        </button>
      </div>
    </BottomSheet>
  )
}
