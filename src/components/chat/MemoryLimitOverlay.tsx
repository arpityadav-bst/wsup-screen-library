import MemoryLimitPopup from './MemoryLimitPopup'

interface MemoryLimitOverlayProps {
  open: boolean
  characterName: string
  characterImage: string
  onDismiss: () => void
}

// Full-viewport overlay — backdrop covers Header + Sidebar + chat area, popup centers on screen
// (S31 — was previously chat-column-anchored at bottom-[88px]; designer asked to match the
// convention used by ModelPickerSheet / ChatStyleSheet / StreakClaimPopup). MemoryLimitPopup
// keeps its own popup chrome + DP overhang, so we DON'T wrap it in CenterPopup — that would
// clip the 48px DP overhang via CenterPopup's overflow-hidden.
export default function MemoryLimitOverlay({ open, characterName, characterImage, onDismiss }: MemoryLimitOverlayProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center px-m" style={{ zIndex: 70 }}>
      <div onClick={onDismiss} className="absolute inset-0 bg-black-55" style={{ animation: 'fade-in 0.2s ease-out' }} aria-hidden />
      <div className="relative pt-12" style={{ animation: 'slide-up 0.24s cubic-bezier(0.32,0.72,0,1)' }}>
        <MemoryLimitPopup
          characterName={characterName}
          characterImage={characterImage}
          onDismiss={onDismiss}
        />
      </div>
    </div>
  )
}
