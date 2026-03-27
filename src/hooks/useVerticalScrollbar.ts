'use client'

import { useRef, useState, useCallback, useEffect } from 'react'

/**
 * Custom vertical scrollbar — 2px thin thumb, fades after 800ms idle.
 * Used for: sidebar recent chats, profile center area, right sidebars.
 *
 * Usage:
 *   const { scrollRef, thumbProps } = useVerticalScrollbar()
 *   return (
 *     <div className="relative">
 *       <div className="scroll-thumb-vertical" {...thumbProps} />
 *       <div ref={scrollRef} className="scroll-hide overflow-y-auto">...</div>
 *     </div>
 *   )
 */
export default function useVerticalScrollbar(fadeDelay = 800) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [thumbTop, setThumbTop] = useState(0)
  const [thumbHeight, setThumbHeight] = useState(0)
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateThumb = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const ratio = el.clientHeight / el.scrollHeight
    setThumbHeight(Math.max(ratio * el.clientHeight, 24))
    setThumbTop((el.scrollTop / el.scrollHeight) * el.clientHeight)
  }, [])

  const onScroll = useCallback(() => {
    updateThumb()
    setVisible(true)
    if (fadeTimer.current) clearTimeout(fadeTimer.current)
    fadeTimer.current = setTimeout(() => setVisible(false), fadeDelay)
  }, [updateThumb, fadeDelay])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateThumb()
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [onScroll, updateThumb])

  const thumbProps = {
    style: {
      top: thumbTop,
      height: thumbHeight,
      opacity: visible ? 1 : 0,
    },
  }

  return { scrollRef, thumbProps }
}
