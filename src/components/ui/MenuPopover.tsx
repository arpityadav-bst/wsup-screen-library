'use client'

import { useEffect, useRef, useState, Fragment } from 'react'
import BottomSheet from './BottomSheet'
import MenuItem from './MenuItem'

export interface MenuPopoverItem {
  label: string
  onClick: () => void
  destructive?: boolean
}

interface MenuPopoverProps {
  open: boolean
  onClose: () => void
  anchorRef?: React.RefObject<HTMLElement | null>
  /** Category label shown at the top of the mobile bottom sheet (e.g., "Account", "Chat"). Mobile only. */
  title?: string
  items: MenuPopoverItem[]
  /** Show a "Cancel" row at the bottom of the mobile bottom sheet. Default true. Mobile only. */
  showCancel?: boolean
}

/**
 * Shared menu surface for 3-dot menus across the app.
 *   - Mobile: BottomSheet — sheet-style rows (left-aligned, tap-friendly), optional title + dividers + Cancel
 *   - Desktop: anchored popover — popover-style rows (centered, compact), no title/dividers/Cancel
 * Both surfaces consume the same `items` array. Surface styling is a viewport concern, not a per-menu concern.
 */
export default function MenuPopover({ open, onClose, anchorRef, title, items, showCancel = true }: MenuPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<{ top: number; right: number } | null>(null)

  useEffect(() => {
    if (!open || !anchorRef?.current) return
    const update = () => {
      const el = anchorRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setCoords({
        top: r.bottom + 4,
        right: window.innerWidth - r.right,
      })
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [open, anchorRef])

  useEffect(() => {
    if (!open) return
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (isMobile) return
    const handler = (e: MouseEvent) => {
      if (popoverRef.current?.contains(e.target as Node)) return
      if (anchorRef?.current?.contains(e.target as Node)) return
      onClose()
    }
    setTimeout(() => document.addEventListener('mousedown', handler), 0)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose, anchorRef])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <>
      {/* Mobile — sheet-style: tap-friendly rows, title label, dividers between, Cancel at bottom */}
      <BottomSheet open={open} onClose={onClose}>
        <div className="py-xs pb-m">
          {title && (
            <>
              <p className="px-m py-xs label-xs">{title}</p>
              <div className="h-px bg-white-05 my-xxs" />
            </>
          )}
          {items.map((item, i) => (
            <Fragment key={i}>
              <MenuItem
                mode="sheet"
                label={item.label}
                destructive={item.destructive}
                onClick={() => { onClose(); item.onClick() }}
              />
              {i < items.length - 1 && <div className="h-px bg-white-05 my-xxs" />}
            </Fragment>
          ))}
          {showCancel && (
            <>
              <div className="h-px bg-white-05 my-xxs" />
              <button
                onClick={onClose}
                className="w-full py-s text-base font-medium text-text-xsmall text-center bg-transparent border-none cursor-pointer"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </BottomSheet>

      {/* Desktop — popover-style: compact centered rows */}
      {open && coords && (
        <div
          ref={popoverRef}
          className="hidden md:block fixed bg-profile-sheet-bg border border-white-10 rounded-card shadow-popup p-xs z-50 w-max"
          style={{ top: coords.top, right: coords.right, animation: 'fade-in 0.15s ease-out' }}
        >
          <div className="flex flex-col gap-xxs">
            {items.map((item, i) => (
              <MenuItem
                key={i}
                mode="popover"
                label={item.label}
                destructive={item.destructive}
                onClick={() => { onClose(); item.onClick() }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
