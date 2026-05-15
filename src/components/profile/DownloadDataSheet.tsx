'use client'

import { useEffect, useState } from 'react'
import Checkbox from '@/components/ui/Checkbox'
import Button from '@/components/ui/Button'
import CloseButton from '@/components/ui/CloseButton'
import StatusResultIcon from '@/components/ui/StatusResultIcon'
import VariantSwitcherPills from '@/components/ui/VariantSwitcherPills'

interface DownloadDataSheetProps {
  open: boolean
  onClose: () => void
}

type Step = 'select' | 'downloading' | 'result'
type ResultVariant = 'success' | 'failure'

const DOWNLOAD_DURATION_MS = 1500 // demo — production waits on real fetch

// Mock metadata for the selection rows. Production reads counts/sizes from the user's account.
// Order encodes top-to-bottom natural flow: profile (Characters) → conversation transcripts (Chats)
// → conversation media light (Images) → conversation media heavy (Videos).
const META = {
  characters: { count: 24, size: '120 KB' },
  chats: { count: 87, size: '4.2 MB' },
  images: { count: 156, size: '38 MB' },
  videos: { count: 12, size: '480 MB' },
}

// ─────────────────────────────────────────────────────────────────────────────
// Step body components (local — single-file fits the 3-step state machine)
// ─────────────────────────────────────────────────────────────────────────────

interface SelectStepProps {
  pickCharacters: boolean
  pickChats: boolean
  pickImages: boolean
  pickVideos: boolean
  setPickCharacters: (v: boolean) => void
  setPickChats: (v: boolean) => void
  setPickImages: (v: boolean) => void
  setPickVideos: (v: boolean) => void
  onDownload: () => void
}

function SelectStep({ pickCharacters, pickChats, pickImages, pickVideos, setPickCharacters, setPickChats, setPickImages, setPickVideos, onDownload }: SelectStepProps) {
  const canDownload = pickCharacters || pickChats || pickImages || pickVideos
  return (
    <>
      <div className="flex flex-col gap-xs">
        <span className="eyebrow-label">Account data</span>
        <h2 className="text-xl font-semibold text-text-title">Download your data</h2>
        <p className="text-sm text-text-body">Pick what you want to include. You&apos;ll get a copy you can keep.</p>
      </div>

      <div className="flex flex-col gap-xs pt-s">
        <Row checked={pickCharacters} onToggle={setPickCharacters} label="Characters" sub="Your liked characters & creators" count={META.characters.count} size={META.characters.size} />
        <Row checked={pickChats} onToggle={setPickChats} label="Chats" sub="All your conversations" count={META.chats.count} size={META.chats.size} />
        <Row checked={pickImages} onToggle={setPickImages} label="Images" sub="Photos shared in your chats" count={META.images.count} size={META.images.size} />
        <Row checked={pickVideos} onToggle={setPickVideos} label="Videos" sub="Videos shared in your chats" count={META.videos.count} size={META.videos.size} />
      </div>

      <Button variant="primary" fullWidth disabled={!canDownload} onClick={onDownload} className="mt-s">
        Download
      </Button>
    </>
  )
}

// Selection row — full-row tap-target (label area toggles the checkbox), with right-aligned metadata chip.
function Row({ checked, onToggle, label, sub, count, size }: { checked: boolean; onToggle: (v: boolean) => void; label: string; sub: string; count: number; size: string }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(!checked)}
      className={`w-full flex items-start gap-s p-m rounded-card border text-left transition-colors ${checked ? 'border-accent bg-accent/[0.06]' : 'border-white-10 bg-white-05 hover:bg-white-10'}`}
    >
      <span className="pt-[2px]">
        <Checkbox checked={checked} onChange={onToggle} aria-label={label} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-s">
          <span className="text-base font-medium text-text-title">{label}</span>
          <span className="text-xxs text-text-xsmall shrink-0">{count} · {size}</span>
        </div>
        <p className="text-xs text-text-body mt-xxs">{sub}</p>
      </div>
    </button>
  )
}

function DownloadingStep() {
  return (
    <div className="flex flex-col items-center text-center gap-m py-l">
      <svg className="animate-spin size-[48px] text-accent" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" />
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col gap-xxs">
        <h2 className="text-xl font-semibold text-text-title">Preparing your download…</h2>
        <p className="text-sm text-text-body">This usually takes a few seconds.</p>
      </div>
    </div>
  )
}

function ResultStep({ variant, onClose, onRetry }: { variant: ResultVariant; onClose: () => void; onRetry: () => void }) {
  const isSuccess = variant === 'success'
  return (
    <div className="flex flex-col items-center text-center gap-m">
      <StatusResultIcon variant={variant} />
      <div className="flex flex-col gap-xxs">
        <h2 className="text-xl font-semibold text-text-title">{isSuccess ? 'Download complete' : 'Couldn’t download'}</h2>
        <p className="text-sm text-text-body max-w-[280px] text-balance">
          {isSuccess ? 'Saved to your downloads folder.' : 'Something went wrong. Check your connection.'}
        </p>
      </div>
      <Button variant="primary" fullWidth onClick={isSuccess ? onClose : onRetry} className="mt-s">
        {isSuccess ? 'Done' : 'Try again'}
      </Button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main sheet — custom scrim wrapper (mobile bottom + desktop centered) so the
// variant pill can sit OUTSIDE the popup chrome. BottomSheet/CenterPopup
// primitives' overflow-hidden would clip an above-card pill, hence the custom
// wrapper. Sibling-inheritance from LoginSheet (same reason for going custom).
// ─────────────────────────────────────────────────────────────────────────────

export default function DownloadDataSheet({ open, onClose }: DownloadDataSheetProps) {
  const [step, setStep] = useState<Step>('select')
  const [resultVariant, setResultVariant] = useState<ResultVariant>('success')
  const [pickCharacters, setPickCharacters] = useState(false)
  const [pickChats, setPickChats] = useState(false)
  const [pickImages, setPickImages] = useState(false)
  const [pickVideos, setPickVideos] = useState(false)

  // Reset state on each open so the sheet always starts at select with unticked checkboxes.
  useEffect(() => {
    if (open) {
      setStep('select')
      setResultVariant('success')
      setPickCharacters(false)
      setPickChats(false)
      setPickImages(false)
      setPickVideos(false)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Demo: auto-advance from downloading to result. Production hooks the real fetch promise.
  useEffect(() => {
    if (step !== 'downloading') return
    const t = window.setTimeout(() => setStep('result'), DOWNLOAD_DURATION_MS)
    return () => window.clearTimeout(t)
  }, [step])

  if (!open) return null

  const startDownload = () => setStep('downloading')
  const retry = () => setStep('downloading')

  // Variant pill — only the result step has variants worth toggling for the designer
  const variantPill = step === 'result' ? (
    <VariantSwitcherPills
      current={resultVariant}
      variants={[{ id: 'success', label: 'Success' }, { id: 'failure', label: 'Failure' }]}
      onChange={(id) => setResultVariant(id as ResultVariant)}
      className="absolute right-0"
      style={{ bottom: 'calc(100% + 10px)' }}
    />
  ) : null

  const body = (
    <div className="flex flex-col gap-m p-l">
      {step === 'select' && (
        <SelectStep
          pickCharacters={pickCharacters}
          pickChats={pickChats}
          pickImages={pickImages}
          pickVideos={pickVideos}
          setPickCharacters={setPickCharacters}
          setPickChats={setPickChats}
          setPickImages={setPickImages}
          setPickVideos={setPickVideos}
          onDownload={startDownload}
        />
      )}
      {step === 'downloading' && <DownloadingStep />}
      {step === 'result' && <ResultStep variant={resultVariant} onClose={onClose} onRetry={retry} />}
    </div>
  )

  return (
    <>
      {/* Mobile — bottom sheet */}
      <div className="fixed inset-0 md:hidden flex flex-col" style={{ zIndex: 80 }}>
        <div onClick={onClose} className="absolute inset-0 bg-black-70" style={{ animation: 'fade-in 0.2s ease-out' }} aria-hidden />
        <div className="relative mt-auto">
          {variantPill}
          <div
            className="relative bg-profile-sheet-bg rounded-tl-popup rounded-tr-popup border-t border-white-10 shadow-big"
            style={{ animation: 'slide-up 0.28s cubic-bezier(0.32,0.72,0,1)' }}
          >
            <div className="flex justify-center pt-s pb-0 shrink-0">
              <div className="w-[36px] h-[4px] rounded-pill bg-white-30" />
            </div>
            <CloseButton onClose={onClose} className="absolute top-s right-s" />
            {body}
          </div>
        </div>
      </div>

      {/* Desktop — centered popup */}
      <div className="fixed inset-0 hidden md:flex items-center justify-center" style={{ zIndex: 80 }}>
        <div onClick={onClose} className="absolute inset-0 bg-black-70" style={{ animation: 'fade-in 0.2s ease-out' }} aria-hidden />
        <div className="relative w-full max-w-[420px]">
          {variantPill}
          <div
            className="relative bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden"
            style={{ animation: 'slide-up 0.24s cubic-bezier(0.32,0.72,0,1)' }}
          >
            <CloseButton onClose={onClose} className="absolute top-s right-s" />
            {body}
          </div>
        </div>
      </div>
    </>
  )
}
