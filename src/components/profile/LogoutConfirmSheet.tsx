'use client'

import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import BottomSheet from '@/components/ui/BottomSheet'

interface LogoutConfirmSheetProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

/** Mobile: bottom sheet confirmation */
function MobileLogout({ open, onClose, onConfirm }: LogoutConfirmSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} maxHeight="30%">
      <div className="px-xl py-l text-center">
        <p className="font-semibold text-lg text-text-title mb-xxs">Log out?</p>
        <p className="text-sm text-text-xsmall leading-relaxed">You can always log back in at any time.</p>
      </div>
      <div className="h-px bg-white-05" />
      <button onClick={onConfirm} className="w-full py-m text-base font-semibold text-status-alert text-center bg-transparent border-none cursor-pointer">
        Log out
      </button>
      <div className="h-px bg-white-05" />
      <button onClick={onClose} className="w-full py-m pb-m text-base font-medium text-text-subtitle text-center bg-transparent border-none cursor-pointer">
        Cancel
      </button>
    </BottomSheet>
  )
}

/** Desktop: centered confirmation dialog */
function DesktopLogout({ open, onClose, onConfirm }: LogoutConfirmSheetProps) {
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
          <p className="font-semibold text-base text-text-title">Log out?</p>
          <button
            onClick={onClose}
            className="p-[10px] -mr-[10px] -mt-xxs rounded-full hover:bg-white-10 transition-colors text-white-90 border-none bg-transparent cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-xl pt-xs pb-xl">
          <p className="text-sm text-text-body leading-normal">You can always log back in at any time.</p>
        </div>
        <div className="flex items-center justify-end gap-xs px-m pb-m">
          <Button variant="secondary" size="s" onClick={onClose}>
            Cancel
          </Button>
          <Button size="s" onClick={onConfirm}>
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function LogoutConfirmSheet(props: LogoutConfirmSheetProps) {
  return (
    <>
      <MobileLogout {...props} />
      <DesktopLogout {...props} />
    </>
  )
}
