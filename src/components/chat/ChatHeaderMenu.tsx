'use client'

import MenuPopover from '@/components/ui/MenuPopover'

interface ChatHeaderMenuProps {
  open: boolean
  onClose: () => void
  anchorRef?: React.RefObject<HTMLElement | null>
  suggestionsEnabled: boolean
  onToggleSuggestions: () => void
  onSwitchLLMs: () => void
}

export default function ChatHeaderMenu({ open, onClose, anchorRef, suggestionsEnabled, onToggleSuggestions, onSwitchLLMs }: ChatHeaderMenuProps) {
  const toggleLabel = suggestionsEnabled ? 'Turn off auto-suggestions' : 'Turn on auto-suggestions'
  return (
    <MenuPopover
      open={open}
      onClose={onClose}
      anchorRef={anchorRef}
      title="Chat"
      items={[
        { label: 'Memories', onClick: () => {} },
        { label: 'Cards', onClick: () => {} },
        { label: 'Clear Chat', onClick: () => {} },
        { label: 'Switch LLMs', onClick: onSwitchLLMs },
        { label: toggleLabel, onClick: onToggleSuggestions },
        { label: 'Add Member', onClick: () => {} },
        { label: 'Report', destructive: true, onClick: () => {} },
      ]}
    />
  )
}
