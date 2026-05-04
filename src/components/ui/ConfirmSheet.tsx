'use client'

import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import BottomSheet from '@/components/ui/BottomSheet'
import CloseButton from '@/components/ui/CloseButton'
import Checkbox from '@/components/ui/Checkbox'

interface ConfirmGate {
  label: React.ReactNode
  checked: boolean
  onChange: (next: boolean) => void
}

interface ConfirmSheetProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  confirmGate?: ConfirmGate
}

function ConfirmGateRow({ gate }: { gate: ConfirmGate }) {
  return (
    <div className="flex items-center gap-xs">
      <Checkbox checked={gate.checked} onChange={gate.onChange} aria-label="Confirm action" />
      <span
        onClick={() => gate.onChange(!gate.checked)}
        className="text-xs text-text-body select-none cursor-pointer"
      >
        {gate.label}
      </span>
    </div>
  )
}

/** Mobile: bottom sheet confirmation */
function MobileConfirm({ open, onClose, onConfirm, title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', destructive, confirmGate }: ConfirmSheetProps) {
  const confirmDisabled = !!confirmGate && !confirmGate.checked
  return (
    <BottomSheet open={open} onClose={onClose} maxHeight="40%">
      <div className="px-xl py-l text-center">
        <p className="font-semibold text-lg text-text-title mb-xxs">{title}</p>
        <p className="text-sm text-text-xsmall leading-relaxed">{description}</p>
      </div>
      {confirmGate && (
        <div className="px-l pb-m">
          <ConfirmGateRow gate={confirmGate} />
        </div>
      )}
      <div className="flex flex-col gap-xs px-l pb-l">
        <Button variant={destructive ? 'primary' : 'primary'} size="m" fullWidth onClick={onConfirm} disabled={confirmDisabled}>
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
function DesktopConfirm({ open, onClose, onConfirm, title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', confirmGate }: ConfirmSheetProps) {
  const confirmDisabled = !!confirmGate && !confirmGate.checked
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
          <CloseButton onClose={onClose} className="-mr-icon-btn -mt-xxs" />
        </div>
        <div className={`px-xl pt-xs ${confirmGate ? 'pb-l' : 'pb-xl'}`}>
          <p className="text-sm text-text-body leading-normal">{description}</p>
        </div>
        {confirmGate && (
          <div className="px-xl pb-l">
            <ConfirmGateRow gate={confirmGate} />
          </div>
        )}
        <div className="flex items-center justify-end gap-xs px-m pb-m">
          <Button variant="secondary" size="m" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button size="m" onClick={onConfirm} disabled={confirmDisabled}>
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
