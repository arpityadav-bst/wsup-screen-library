'use client'

import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import BottomSheet from '@/components/ui/BottomSheet'

interface ConfirmSheetProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
}

/** Mobile: bottom sheet confirmation */
function MobileConfirm({ open, onClose, onConfirm, title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', destructive }: ConfirmSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} maxHeight="40%">
      <div className="px-xl py-l text-center">
        <p className="font-semibold text-lg text-text-title mb-xxs">{title}</p>
        <p className="text-sm text-text-xsmall leading-relaxed">{description}</p>
      </div>
      <div className="flex flex-col gap-xs px-l pb-l">
        <Button variant={destructive ? 'primary' : 'primary'} size="m" fullWidth onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button variant="secondary" size="m" fullWidth onClick={onClose}>
          {cancelLabel}
        </Button>
      </div>
    </BottomSheet>
  )
}

/** Desktop: centered confirmation dialog */
function DesktopConfirm({ open, onClose, onConfirm, title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel' }: ConfirmSheetProps) {
  useEffect(() => {
    if (!open) return
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 hidden md:flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black-55" style={{ animation: 'fade-in 0.2s ease-out' }} />
      <div
        className="relative bg-profile-sheet-bg border border-white-10 rounded-popup shadow-popup w-full max-w-[400px] overflow-hidden"
        style={{ animation: 'slide-up 0.24s cubic-bezier(0.32,0.72,0,1)' }}
      >
        <div className="flex items-start justify-between pt-m px-xl">
          <p className="font-semibold text-base text-text-title">{title}</p>
          <button
            onClick={onClose}
            className="p-icon-btn -mr-icon-btn -mt-xxs rounded-full hover:bg-white-10 transition-colors text-white-90 border-none bg-transparent cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="px-xl pt-xs pb-xl">
          <p className="text-sm text-text-body leading-normal">{description}</p>
        </div>
        <div className="flex items-center justify-end gap-xs px-m pb-m">
          <Button variant="secondary" size="m" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button size="m" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmSheet(props: ConfirmSheetProps) {
  return (
    <>
      <MobileConfirm {...props} />
      <DesktopConfirm {...props} />
    </>
  )
}
