'use client'

export interface VariantSwitcherProps {
  current: string
  variants: { id: string; label: string }[]
  onChange: (id: string) => void
}

// "VARIANT 1 / 2 / …" pill — designer-facing toggle for surfaces that ship multiple variants
// (LoginSheet's standard vs promo, DownloadDataSheet's result success vs failure, etc.).
// Positioned by the consumer (typically `absolute` above the popup chrome — see LoginSheet's
// `bottom: calc(100% + 10px)` placement, also used by DownloadDataSheet for top-right anchor).
// Glass-style pill (bg-black-55 + backdrop-blur-bg) reads cleanly over any background.
//
// Shared primitive (Gate 3 — 2+ consumers: LoginSheet + DownloadDataSheet at S34).
export default function VariantSwitcherPills({
  current,
  variants,
  onChange,
  className = '',
  style,
}: VariantSwitcherProps & { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`flex items-center gap-xxs px-xxs py-xxxs rounded-pill bg-black-55 backdrop-blur-bg border border-white-10 ${className}`}
      style={style}
    >
      <span className="text-xxs uppercase tracking-[0.4px] text-white-40 px-xxs">Variant</span>
      {variants.map(v => (
        <button
          key={v.id}
          type="button"
          onClick={() => onChange(v.id)}
          className={`text-xs leading-none px-xs py-xxs rounded-pill border-none cursor-pointer transition-colors ${
            current === v.id
              ? 'bg-white text-black font-medium'
              : 'bg-transparent text-white-60 hover:text-white-90 hover:bg-white-10'
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  )
}
