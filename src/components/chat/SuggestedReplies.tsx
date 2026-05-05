'use client'

import { useState, useRef, useEffect } from 'react'

interface SuggestedRepliesProps {
  suggestions: string[]
  onPick: (text: string) => void
  onDisable: () => void
}

const BulbIcon = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/icons/icon-bulb.svg" alt="" width={16} height={16} />
)

const BulbOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5" />
    <path d="M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M2 2l20 20" />
  </svg>
)

const CloseSmallIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default function SuggestedReplies({ suggestions, onPick, onDisable }: SuggestedRepliesProps) {
  const [expanded, setExpanded] = useState(false)
  const [confirmingDisable, setConfirmingDisable] = useState(false)
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current) }, [])

  const handleDisableTap = () => {
    if (confirmingDisable) {
      setConfirmingDisable(false)
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current)
      onDisable()
      return
    }
    setConfirmingDisable(true)
    if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current)
    confirmTimerRef.current = setTimeout(() => setConfirmingDisable(false), 3000)
  }

  if (!expanded) {
    return (
      <div className="px-m md:px-2xxxl pb-xs" style={{ animation: 'fade-in 0.25s ease-out' }}>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setExpanded(true)}
          className="flex items-center gap-[6px] h-8 pl-xs pr-xs backdrop-blur-popup bg-black-60 border border-white-10 rounded-pill shadow-popup hover:bg-black-40 transition-colors"
        >
          <BulbIcon />
          <span className="text-xs text-white-90 whitespace-nowrap">Get suggested replies</span>
          <svg width="4" height="8" viewBox="0 0 4 8" fill="none" className="shrink-0" aria-hidden>
            <path d="M0.5 0.5L3.5 4L0.5 7.5" stroke="white" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="px-m md:px-2xxxl pb-xs" style={{ animation: 'fade-in 0.2s ease-out' }}>
      <div className="flex items-center gap-xs overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Close — leftmost, occupies the same position the pill did. Click here = collapse back to pill */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => { setExpanded(false); setConfirmingDisable(false) }}
          aria-label="Close suggestions"
          className="shrink-0 w-8 h-8 rounded-pill backdrop-blur-popup bg-black-60 border border-white-10 text-white-90 hover:bg-white-10 transition-colors flex items-center justify-center"
        >
          <CloseSmallIcon />
        </button>

        {/* Suggestion chips */}
        {suggestions.map((s, i) => (
          <button
            key={i}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onPick(s)}
            className="shrink-0 h-8 px-s flex items-center backdrop-blur-popup bg-black-60 border border-white-10 rounded-pill text-xs text-white-90 whitespace-nowrap hover:bg-white-10 transition-colors"
          >
            {s}
          </button>
        ))}

        {/* Disable feature — rightmost, 2-step confirm */}
        {confirmingDisable ? (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleDisableTap}
            aria-label="Confirm turn off auto-suggestions"
            className="shrink-0 h-8 px-s flex items-center backdrop-blur-popup bg-white-10 border border-white-20 rounded-pill text-xs text-white whitespace-nowrap hover:bg-white-20 transition-colors"
          >
            Turn off?
          </button>
        ) : (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleDisableTap}
            aria-label="Turn off auto-suggestions"
            className="shrink-0 w-8 h-8 rounded-pill backdrop-blur-popup bg-black-60 border border-white-10 text-white-90 hover:bg-white-10 transition-colors flex items-center justify-center"
          >
            <BulbOffIcon />
          </button>
        )}
      </div>
    </div>
  )
}
