'use client'

type ResultVariant = 'success' | 'failure'

const VARIANTS: ResultVariant[] = ['success', 'failure']
const LABELS: Record<ResultVariant, string> = {
  success: 'Success',
  failure: 'Failure',
}

interface ResultVariantToggleProps {
  variant: ResultVariant
  onChange: (variant: ResultVariant) => void
}

export default function ResultVariantToggle({ variant, onChange }: ResultVariantToggleProps) {
  return (
    <div
      className="fixed bottom-m right-m z-[90] flex flex-col gap-xxs bg-secondary-surface backdrop-blur-popup rounded-card p-s shadow-big border border-white-10"
      style={{ animation: 'fade-in 0.15s ease-out' }}
    >
      <span className="text-xxs font-semibold text-text-dim uppercase tracking-[0.8px] mb-xxs">
        Result · <span className="text-text-xxsmall normal-case">R toggle · Shift+R flip</span>
      </span>
      {VARIANTS.map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`text-left px-s py-xxs rounded-button text-xs cursor-pointer border-none transition-colors ${
            variant === v
              ? 'bg-accent text-text-title font-medium'
              : 'bg-transparent text-text-small hover:bg-white-10'
          }`}
        >
          {LABELS[v]}
        </button>
      ))}
    </div>
  )
}
