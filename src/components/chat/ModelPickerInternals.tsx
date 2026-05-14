// Shared visual primitives for model-picker rows — consumed by ChatStyleSheet (the unified
// model picker, triggered from both chat-start and the ChatBar LLM pill click).

import CoinIcon from '@/components/ui/CoinIcon'
import { formatCost, type Model } from '@/lib/models'

// 3 vertical pill bars at varying heights, uniformly colored per model latency tier.
// Bars are 2px wide with 2px gaps; rx=1 makes each a vertical pill. Tallest bar is reduced
// (h=8 in a 14-tall SVG) so the chip has visible top + bottom breathing room around the bars.
const SIGNAL_BARS = [
  { x: 0, h: 4 },
  { x: 4, h: 6 },
  { x: 8, h: 8 },
]

function getLatencyColor(complexity: number): string {
  if (complexity <= 2) return 'fill-status-success'
  if (complexity === 3) return 'fill-status-warning'
  return 'fill-status-alert'
}

export const SignalIcon = ({ complexity }: { complexity: 1 | 2 | 3 | 4 }) => {
  const cls = getLatencyColor(complexity)
  return (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden className="shrink-0">
      {SIGNAL_BARS.map((b, i) => (
        <rect key={i} x={b.x} y={12 - b.h} width="2" height={b.h} rx="1" className={cls} />
      ))}
    </svg>
  )
}

// Selected-state circular badge — distinct from Checkbox primitive (square 16px, togglable role);
// this is a "selected indicator" role at 28px circle. Path tuned for crisp render at the larger size.
export const CheckBadge = () => (
  <div className="w-7 h-7 rounded-full bg-status-success flex items-center justify-center shrink-0">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-black-90">
      <path d="M3.5 8 L6.5 11 L12.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

// Local row-chip style for the picker (NOT the global Badge primitive — Badge ships pill style
// for other consumers). Compact rectangle-with-slight-roundness, uniform height across all 3
// chips (signal / personality / cost). Lives in chat/ because its style is picker-specific.
export function Chip({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-xxxs bg-white-10 rounded-[4px] px-xxs py-[1px] text-xxs font-medium text-text-small whitespace-nowrap">
      {icon}
      {children}
    </span>
  )
}

// Gradient-styled chip — same shape as Chip, but uses WSUP's purple→blue brand gradient for both
// bg tint and text (matches the "Free models on the wsup mobile app" highlight banner palette).
// Reserved for promo-flavored signals like "Available only in app".
export function GradientChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center bg-gradient-to-r from-gradient-purple/10 to-gradient-blue/10 rounded-[4px] px-xxs py-[1px] text-xxs whitespace-nowrap">
      <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gradient-purple to-gradient-blue">
        {children}
      </span>
    </span>
  )
}

// Shared row anatomy: title + signal/personality/cost chips + description + optional CheckBadge.
// Used by ChatStyleSheet's multi-step picker (drafts selection, commits on Continue). `showSignal`
// / `showPersonality` default to true; ChatStyleSheet passes false to hide them on its lighter
// step — latency + personality are over-detail at choice-time for general users.
export function ModelRow({
  model,
  selected,
  onSelect,
  showSignal = true,
  showPersonality = true,
}: {
  model: Model
  selected: boolean
  onSelect: () => void
  showSignal?: boolean
  showPersonality?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex flex-col gap-xxs px-m py-s rounded-card text-left transition-colors w-full
                  ${selected
                    ? 'ring-2 ring-accent bg-accent/10'
                    : 'bg-white-05 border border-white-10 hover:bg-white-10'}`}
    >
      <div className="flex items-center gap-xs flex-wrap min-w-0 pr-9">
        <span className="text-sm font-semibold text-text-title leading-[16px]">{model.name}</span>
        {showSignal && <Chip><SignalIcon complexity={model.complexity} /></Chip>}
        {showPersonality && <Chip>{model.personality}</Chip>}
        <Chip icon={<CoinIcon size={10} />}>{formatCost(model.cost)}</Chip>
        {model.appOnly && <GradientChip>Available only in mobile app</GradientChip>}
      </div>
      <p className="text-xs text-text-body">{model.description}</p>
      {selected && (
        <div className="absolute top-1/2 -translate-y-1/2 right-m">
          <CheckBadge />
        </div>
      )}
    </button>
  )
}
