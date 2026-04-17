type EmptyVariant = 'default' | 'no-active' | 'all-good' | 'no-removed' | 'create'

const EMOJI: Record<EmptyVariant, string> = {
  'no-active': '😴',
  'all-good': '✨',
  'no-removed': '🛡️',
  'create': '🎭',
  'default': '📭',
}

interface EmptyStateProps {
  message: string
  variant?: EmptyVariant
  children?: React.ReactNode
}

export default function EmptyState({ message, variant = 'default', children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-4xl gap-s text-center">
      <span className="text-[32px]">{EMOJI[variant]}</span>
      <p className="text-sm text-text-dim">{message}</p>
      {children}
    </div>
  )
}
