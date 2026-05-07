// Shared visual primitives for ModelPickerSheet — extracted at S30 close from inline duplicates
// across the production component (chat/ModelPickerSheet.tsx) and the style guide section
// (style-guide/sections/patterns/ModelPickerSheetSection.tsx). Same Gate 3 split as ChatStyleAvatars.

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
