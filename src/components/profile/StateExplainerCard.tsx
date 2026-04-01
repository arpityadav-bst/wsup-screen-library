interface ChecklistItem {
  text: string
  allowed: boolean
}

export interface StateCardData {
  title: string
  pillLabel: string
  accentColor: string
  dotColor: string
  pillBg: string
  pillText: string
  description: string
  checklist: ChecklistItem[]
  nextBox?: { label: string; text: string }
  cta?: { label: string; color: string }
  cardBg: string
}

export default function StateExplainerCard({ data }: { data: StateCardData }) {
  return (
    <div className="flex rounded-card overflow-hidden mb-m" style={{ background: data.cardBg }}>
      {/* Left accent bar */}
      <div className="w-[3px] shrink-0" style={{ backgroundColor: data.accentColor }} />

      {/* Body */}
      <div className="flex-1 p-m">
        {/* Header row */}
        <div className="flex items-center gap-xs mb-s">
          <span className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: data.dotColor }} />
          <span className="text-base font-semibold text-text-title shrink-0">{data.title}</span>
          <span
            className="inline-flex items-center gap-xxs px-xs py-xxxs rounded-pill text-xxs font-medium ml-auto shrink-0"
            style={{ backgroundColor: data.pillBg, color: data.pillText }}
          >
            {data.pillLabel}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-text-body leading-relaxed mb-s">{data.description}</p>

        {/* Checklist */}
        <div className="flex flex-col gap-xxs mb-s">
          {data.checklist.map((item, i) => (
            <div key={i} className="flex items-center gap-xs text-xs text-text-small leading-snug">
              <span className="w-[12px] h-[12px] shrink-0 flex items-center justify-center">
                {item.allowed ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6.5L4.5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* What happens next */}
        {data.nextBox && (
          <div className="bg-white-05 rounded-button p-s mb-s">
            <p className="label-xs mb-xxs">{data.nextBox.label}</p>
            <p className="text-xs text-text-small leading-relaxed">{data.nextBox.text}</p>
          </div>
        )}

        {/* CTA link */}
        {data.cta && (
          <span className="text-xs font-medium cursor-pointer" style={{ color: data.cta.color }}>
            {data.cta.label}
          </span>
        )}
      </div>
    </div>
  )
}
