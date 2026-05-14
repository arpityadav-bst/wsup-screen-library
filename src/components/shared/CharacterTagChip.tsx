'use client'

interface CharacterTagChipProps {
  children: React.ReactNode
  className?: string
}

// Tag chip used on every character-preview surface (CharacterCard on /explore, DeckCard in onboarding,
// ChatRightSidebar in /chat). Single source of chrome so the same character reads the same on every surface.
// className passthrough supports per-surface responsive caps (e.g., CharacterCard hides the 4th+ tags on mobile).
export default function CharacterTagChip({ children, className = '' }: CharacterTagChipProps) {
  return (
    <span className={`text-xxs font-normal px-xs py-[3px] rounded-pill bg-white-10 backdrop-blur-bg text-white-80 border border-white-10${className ? ` ${className}` : ''}`}>
      {children}
    </span>
  )
}
