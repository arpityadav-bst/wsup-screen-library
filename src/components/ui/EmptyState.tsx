type EmptyVariant = 'default' | 'no-active' | 'all-good' | 'no-removed' | 'create' | 'blocked'

const EMOJI: Record<EmptyVariant, string> = {
  'no-active': '😴',
  'all-good': '✨',
  'no-removed': '🛡️',
  'create': '🎭',
  'blocked': '🚫',
  'default': '📭',
}

interface EmptyStateProps {
  message: string
  variant?: EmptyVariant
  children?: React.ReactNode
}

export default function EmptyState({ message, variant = 'default', children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-4xl px-l gap-s text-center">
      <span className="text-[32px]">{EMOJI[variant]}</span>
      <p className="text-sm text-text-dim max-w-[420px]">{message}</p>
      {children}
    </div>
  )
}
