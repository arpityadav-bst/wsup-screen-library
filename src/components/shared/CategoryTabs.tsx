'use client'
import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/cn'

const tabs = [
  'Recommended', 'Anime', 'Italian brainrot', 'Girlfriend', 'Boyfriend',
  'Original', 'Game', 'Fiction', 'User Generated', 'Romantic', 'Fantasy',
  'Sci-Fi', 'Horror', 'Comedy', 'Historical', 'Action', 'Mystery',
  'Wholesome', 'NSFW', 'Mentor', 'Villain',
]

export default function CategoryTabs() {
  const [active, setActive] = useState('Recommended')
  const [dragging, setDragging] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [thumbStyle, setThumbStyle] = useState({ left: 0, width: 0 })

  const scrollRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const hasDragged = useRef(false)

  const updateThumb = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const ratio = el.clientWidth / el.scrollWidth
    const left = (el.scrollLeft / el.scrollWidth) * el.clientWidth
    setThumbStyle({ left, width: el.clientWidth * ratio })
  }, [])

  const onScroll = () => updateThumb()

  const onMouseEnter = () => { setHovered(true); updateThumb() }
  const onMouseLeave = () => { setHovered(false); setDragging(false) }

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    hasDragged.current = false
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0)
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = x - startX.current
    if (Math.abs(walk) > 3) hasDragged.current = true
    scrollRef.current.scrollLeft = scrollLeft.current - walk
    updateThumb()
  }

  const onMouseUp = () => setDragging(false)

  return (
    <div className="relative pt-xs pb-[11px] -mt-xs -mb-[11px]">
      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className={cn(
          'tabs-scroll select-none',
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
        onScroll={onScroll}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <div className="flex items-center gap-xs w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { if (!hasDragged.current) setActive(tab) }}
              className={cn(
                'px-m py-xs rounded-pill text-sm font-medium transition-colors whitespace-nowrap',
                active === tab
                  ? 'border border-secondary text-secondary bg-transparent'
                  : 'border border-white-20 text-text-body bg-transparent hover:bg-white-05 hover:border-white-30'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Custom scrollbar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]">
        <div
          className={cn(
            'absolute h-full rounded-full bg-white-20 transition-opacity duration-300',
            hovered ? 'opacity-100' : 'opacity-0'
          )}
          style={{ left: thumbStyle.left, width: thumbStyle.width }}
        />
      </div>
    </div>
  )
}
