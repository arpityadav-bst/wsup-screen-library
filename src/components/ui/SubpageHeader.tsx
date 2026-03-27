interface SubpageHeaderProps {
  backLabel: string
  onBack: () => void
  right?: React.ReactNode
  border?: boolean
}

export default function SubpageHeader({ backLabel, onBack, right, border = true }: SubpageHeaderProps) {
  return (
    <div className={`flex items-center justify-between px-m py-s shrink-0 ${border ? 'border-b border-white-10' : ''}`}>
      <button onClick={onBack} className="flex items-center gap-xs bg-transparent border-none cursor-pointer py-xxs text-text-title">
        <svg width="24" height="20" viewBox="0 0 28 24" fill="none">
          <path d="M27 12H1M1 12l9 9M1 12l9-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-lg font-medium text-text-title">{backLabel}</span>
      </button>
      {right && <div className="flex items-baseline gap-xxs">{right}</div>}
    </div>
  )
}
