'use client'

import { useRef, useState, useCallback, useEffect } from 'react'

/**
 * Custom horizontal scrollbar — 3px thin thumb, visible on hover.
 * Used for: category tabs, horizontal scroll rows.
 *
 * Usage:
 *   const { scrollRef, thumbProps, hovered, onMouseEnter, onMouseLeave, onScroll } = useHorizontalScrollbar()
 *   return (
 *     <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
 *       <div ref={scrollRef} onScroll={onScroll} className="scroll-hide overflow-x-auto">...</div>
 *       <div className="scroll-track-horizontal">
 *         <div className="scroll-thumb-horizontal" style={{ ...thumbProps.style, opacity: hovered ? 1 : 0 }} />
 *       </div>
 *     </div>
 *   )
 */
export default function useHorizontalScrollbar() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [thumbLeft, setThumbLeft] = useState(0)
  const [thumbWidth, setThumbWidth] = useState(0)

  const updateThumb = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const ratio = el.clientWidth / el.scrollWidth
    const left = (el.scrollLeft / el.scrollWidth) * el.clientWidth
    setThumbWidth(Math.max(ratio * el.clientWidth, 24))
    setThumbLeft(left)
  }, [])

  const onScroll = useCallback(() => {
    updateThumb()
  }, [updateThumb])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateThumb()
  }, [updateThumb])

  const onMouseEnter = useCallback(() => setHovered(true), [])
  const onMouseLeave = useCallback(() => setHovered(false), [])

  const thumbProps = {
    style: {
      left: thumbLeft,
      width: thumbWidth,
    },
  }

  return { scrollRef, thumbProps, hovered, onMouseEnter, onMouseLeave, onScroll }
}
