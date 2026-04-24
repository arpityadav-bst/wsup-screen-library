'use client'

import { useState, useRef, useEffect } from 'react'

export default function ChatBar() {
  const [isActive, setIsActive] = useState(false)
  const [value, setValue] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const hasValue = value.length > 0
  const expanded = isActive || hasValue

  useEffect(() => {
    if (!isActive) return
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsActive(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isActive])

  const keepInputFocus = (e: React.MouseEvent) => e.preventDefault()

  const bulbCircle = (
    <button
      type="button"
      onMouseDown={keepInputFocus}
      className="w-5 h-5 rounded-pill bg-white-10 flex items-center justify-center shrink-0 hover:bg-white-20 transition-colors"
      aria-label="Auto-suggestions"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/icon-bulb.svg" alt="" width={12} height={12} />
    </button>
  )

  const micButton = (
    <button
      type="button"
      onMouseDown={keepInputFocus}
      className="hover:opacity-80 transition-opacity"
      aria-label="Voice input"
    >
      <div
        style={{
          width: 20, height: 20,
          backgroundColor: 'white',
          maskImage: "url('/icons/icon-mic.svg')",
          maskSize: '20px 20px', maskRepeat: 'no-repeat', maskPosition: '0 0',
          WebkitMaskImage: "url('/icons/icon-mic.svg')",
          WebkitMaskSize: '20px 20px', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: '0 0',
        }}
      />
    </button>
  )

  const giftButton = (
    <button
      type="button"
      onMouseDown={keepInputFocus}
      className="hover:opacity-80 transition-opacity"
      aria-label="Send gift"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/icon-gift.svg" alt="" width={20} height={20} />
    </button>
  )

  const imageButton = (
    <button
      type="button"
      onMouseDown={keepInputFocus}
      className="hover:opacity-80 transition-opacity flex items-center justify-center w-5 h-5"
      aria-label="Attach image"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/icon-image.svg" alt="" width={16} height={16} />
    </button>
  )

  const sendButton = (
    <button
      type="button"
      onMouseDown={keepInputFocus}
      className="hover:opacity-80 transition-opacity flex items-center justify-center w-5 h-5"
      aria-label="Send message"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/icon-send.svg" alt="" width={20} height={20} />
    </button>
  )

  return (
    <div className="relative px-m md:px-2xxxl py-s shrink-0 md:bg-gradient-to-b md:from-transparent md:to-black-40">
      <div
        ref={wrapperRef}
        className={`bg-chat-ai-bubble rounded-[20px] p-icon-btn flex gap-s ${expanded ? 'items-start' : 'items-center'}`}
      >
        {/* Left column — input + (when expanded) model picker row */}
        <div className="flex flex-col gap-m flex-1 min-w-0">
          <div className="flex items-center gap-s w-full">
            {!expanded && bulbCircle}
            <button
              type="button"
              onMouseDown={keepInputFocus}
              onClick={() => inputRef.current?.focus()}
              className="shrink-0 hover:opacity-80 transition-opacity"
              aria-label="Assist"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/icon-sparkle.svg" alt="" width={20} height={20} />
            </button>
            <input
              ref={inputRef}
              type="text"
              placeholder="Message"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsActive(true)}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white-50 caret-white outline-none min-w-0"
            />
          </div>
          {expanded && (
            <div className="flex items-center gap-xxs">
              {bulbCircle}
              <button
                type="button"
                onMouseDown={keepInputFocus}
                className="backdrop-blur-popup bg-black-30 border border-white-10 rounded-pill px-xs py-[2px] flex items-center gap-xxs shadow-popup hover:bg-black-40 transition-colors"
                aria-label="Select model"
              >
                <span className="text-xs text-white-90 whitespace-nowrap">Claude 4.5 Opus</span>
                <svg width="4" height="8" viewBox="0 0 4 8" fill="none" className="shrink-0" aria-hidden>
                  <path d="M0.5 0.5L3.5 4L0.5 7.5" stroke="white" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Right column — media actions; reflows top/bottom when expanded; send replaces image while typing */}
        {expanded ? (
          <div className="flex flex-col justify-between items-end self-stretch gap-m shrink-0">
            <div className="flex items-center gap-m">
              {!hasValue && micButton}
              {giftButton}
            </div>
            {hasValue ? sendButton : imageButton}
          </div>
        ) : (
          <div className="flex items-center gap-m shrink-0">
            {imageButton}
            {micButton}
            {giftButton}
          </div>
        )}
      </div>
    </div>
  )
}
