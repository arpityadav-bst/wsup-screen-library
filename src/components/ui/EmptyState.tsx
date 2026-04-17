type EmptyVariant = 'default' | 'no-active' | 'all-good' | 'no-removed' | 'create'

const ILLUSTRATIONS: Record<EmptyVariant, React.ReactNode> = {
  // No active characters — sleeping character silhouette with moon
  'no-active': (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="28" r="14" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <circle cx="24" cy="22" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <path d="M36 8c-1.5 0-2.8.6-3.8 1.5A5.5 5.5 0 0038 14a5.5 5.5 0 00-5.8 4.5c1-.9 2.3-1.5 3.8-1.5a5 5 0 100-10z" fill="currentColor" opacity="0.2" />
      <circle cx="36" cy="6" r="1" fill="currentColor" opacity="0.15" />
      <circle cx="40" cy="10" r="0.6" fill="currentColor" opacity="0.1" />
    </svg>
  ),
  // Nothing needs attention — checkmark with sparkles
  'all-good': (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
      <path d="M17 24l5 5 9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <path d="M10 12l1.5 1M38 10l-1 1.5M40 32l-1.5.5M8 30l1.5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
      <circle cx="12" cy="8" r="1" fill="currentColor" opacity="0.12" />
      <circle cx="39" cy="7" r="0.7" fill="currentColor" opacity="0.1" />
      <circle cx="41" cy="35" r="0.7" fill="currentColor" opacity="0.1" />
    </svg>
  ),
  // No removed characters — shield with checkmark
  'no-removed': (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 6l14 6v10c0 10-6 17-14 20-8-3-14-10-14-20V12l14-6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" opacity="0.2" />
      <path d="M19 24l4 4 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
    </svg>
  ),
  // Create your first character — person silhouette with sparkle
  'create': (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="18" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <path d="M12 40c0-7 5-12 12-12s12 5 12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.2" />
      <path d="M36 10v6M33 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <circle cx="38" cy="8" r="0.8" fill="currentColor" opacity="0.15" />
      <circle cx="34" cy="6" r="0.5" fill="currentColor" opacity="0.1" />
    </svg>
  ),
  // Default fallback
  'default': (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.2" opacity="0.15" />
    </svg>
  ),
}

interface EmptyStateProps {
  message: string
  variant?: EmptyVariant
}

export default function EmptyState({ message, variant = 'default' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-4xl gap-s text-center">
      <div className="text-white-30">
        {ILLUSTRATIONS[variant]}
      </div>
      <p className="text-sm text-text-dim">{message}</p>
    </div>
  )
}
