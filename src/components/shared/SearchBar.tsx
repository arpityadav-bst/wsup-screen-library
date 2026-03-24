'use client'
import { useState, useEffect, useRef } from 'react'

const PHRASES = [
  { prefix: 'Search a ', keyword: 'character' },
  { prefix: 'Search a ', keyword: 'creator' },
  { prefix: 'Search a ', keyword: 'tag' },
  { prefix: 'Search any ', keyword: 'keyword' },
]

const TYPE_SPEED = 60
const DELETE_SPEED = 35
const PAUSE_AFTER_TYPE = 2000

function useTypewriter() {
  const [displayed, setDisplayed] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const charIdx = useRef(0)
  const isDeleting = useRef(false)
  const currentPhraseIdx = useRef(0)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    function tick() {
      const phrase = PHRASES[currentPhraseIdx.current]
      const full = phrase.prefix + phrase.keyword

      if (!isDeleting.current) {
        charIdx.current += 1
        setDisplayed(full.slice(0, charIdx.current))

        if (charIdx.current === full.length) {
          isDeleting.current = true
          timer = setTimeout(tick, PAUSE_AFTER_TYPE)
        } else {
          timer = setTimeout(tick, TYPE_SPEED)
        }
      } else {
        charIdx.current -= 1
        setDisplayed(full.slice(0, charIdx.current))

        if (charIdx.current === 0) {
          isDeleting.current = false
          currentPhraseIdx.current = (currentPhraseIdx.current + 1) % PHRASES.length
          setPhraseIdx(currentPhraseIdx.current)
          timer = setTimeout(tick, 300)
        } else {
          timer = setTimeout(tick, DELETE_SPEED)
        }
      }
    }

    timer = setTimeout(tick, TYPE_SPEED)
    return () => clearTimeout(timer)
  }, [])

  return { displayed, phraseIdx }
}

interface SearchBarProps {
  className?: string
  height?: string
}

export default function SearchBar({ className = '', height = 'h-[40px]' }: SearchBarProps) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const { displayed, phraseIdx } = useTypewriter()

  const showAnimated = !focused && value === ''
  const prefix = PHRASES[phraseIdx].prefix
  const prefixPart = displayed.slice(0, Math.min(displayed.length, prefix.length))
  const keywordPart = displayed.length > prefix.length ? displayed.slice(prefix.length) : ''

  return (
    <div className={className}>
      <div className={`flex items-center gap-xs bg-white-05 border border-white-10 rounded-full px-m ${height} relative`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <circle cx="7" cy="7" r="5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <path d="M11 11L14 14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {showAnimated && (
          <span className="absolute left-[40px] text-sm pointer-events-none select-none flex items-center">
            <span className="text-text-dim" style={{ whiteSpace: 'pre' }}>{prefixPart}</span>
            {keywordPart && (
              <span style={{
                background: 'linear-gradient(90deg, var(--color-gradient-purple) 0%, var(--color-gradient-blue) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {keywordPart}
              </span>
            )}
            <span className="text-white-30 animate-pulse">|</span>
          </span>
        )}

        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? 'Type any keyword' : ''}
          className="bg-transparent text-text-body text-sm outline-none w-full placeholder:text-text-dim"
          suppressHydrationWarning
        />
      </div>
    </div>
  )
}
