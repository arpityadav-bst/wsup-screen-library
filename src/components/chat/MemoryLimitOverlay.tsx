import MemoryLimitPopup from './MemoryLimitPopup'

interface MemoryLimitOverlayProps {
  open: boolean
  characterName: string
  characterImage: string
  onDismiss: () => void
}

// Backdrop + anchored MemoryLimitPopup mount — extracted from chat/page.tsx (S30) to keep page.tsx under 300 lines.
export default function MemoryLimitOverlay({ open, characterName, characterImage, onDismiss }: MemoryLimitOverlayProps) {
  if (!open) return null
  return (
    <>
      <div className="absolute inset-0 bg-black-60 pointer-events-none z-20" aria-hidden />
      <div className="absolute bottom-[88px] left-0 right-0 px-m md:px-2xxxl pt-12 z-30 pointer-events-none">
        <div className="pointer-events-auto">
          <MemoryLimitPopup
            characterName={characterName}
            characterImage={characterImage}
            onDismiss={onDismiss}
          />
        </div>
      </div>
    </>
  )
}
