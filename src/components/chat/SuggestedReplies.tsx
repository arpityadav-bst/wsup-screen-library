'use client'

import { useState, useRef, useEffect } from 'react'
import type { Suggestion } from '@/lib/chatSuggestions'

interface SuggestedRepliesProps {
  suggestions: Suggestion[]
  onPick: (text: string) => void
  onDisable: () => void
}

const BulbIcon = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/icons/icon-bulb.svg" alt="" width={16} height={16} />
)

// 14px — bulb-off is the secondary control, intentionally a touch smaller than ×
const BulbOffIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5" />
    <path d="M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M2 2l20 20" />
  </svg>
)

// 16px close — same SVG path as <CloseButton> primitive (per taste rule "Close/dismiss icons must use the standard pattern everywhere"); only the size adapts to this compact-panel context
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

  const handleClose = () => {
    setExpanded(false)
    setConfirmingDisable(false)
    if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current)
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
    <div className="absolute bottom-full left-0 right-0 px-m md:px-2xxxl pb-xs" style={{ animation: 'fade-in 0.2s ease-out' }}>
      <div className="backdrop-blur-popup bg-black-60 border border-white-10 rounded-card shadow-popup overflow-hidden">
        {/* Header — both buttons hand-rolled with explicit w-10 h-10 hit area + smaller svgs.
            CloseButton primitive can't be used here because its size scales hit-area with svg-size;
            we need decoupled sizing: 40×40 hit area (tappable parity with the rest of WSUP) + smaller
            visual icons (16px ×, 14px bulb-off) for the compact-panel context. Same SVG paths,
            same hover anatomy, just sized for this surface. */}
        <div className="flex items-center justify-between px-m h-12 border-b border-white-10">
          <span className="text-sm font-medium text-text-title">Suggestions</span>
          <div className="flex items-center gap-xxs">
            {confirmingDisable ? (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleDisableTap}
                aria-label="Confirm turn off auto-suggestions"
                className="h-9 px-s flex items-center bg-white-10 border border-white-20 rounded-pill text-xs text-white whitespace-nowrap hover:bg-white-20 transition-colors"
              >
                Turn off?
              </button>
            ) : (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleDisableTap}
                aria-label="Turn off auto-suggestions"
                className="w-10 h-10 rounded-full hover:bg-white-10 transition-colors text-white-90 inline-flex items-center justify-center shrink-0"
              >
                <BulbOffIcon />
              </button>
            )}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClose}
              aria-label="Close suggestions"
              className="w-10 h-10 rounded-full hover:bg-white-10 transition-colors text-white-90 inline-flex items-center justify-center shrink-0 -mr-icon-btn"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Suggestion rows — full width buttons, italic action + spoken text inline */}
        <div className="flex flex-col">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onPick(s.text)}
              className="text-left px-m py-s hover:bg-white-10 transition-colors border-b border-white-05 last:border-0"
            >
              <span className="text-sm italic text-white-50 leading-snug">{s.action}</span>
              <span className="text-sm text-white leading-snug"> {s.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
