'use client'

import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import Button from '@/components/ui/Button'
import WindDownOtherApps from '@/components/shared/WindDownOtherApps'

interface WindDownPopupProps {
  open: boolean
  /** Called when the user clicks "Okay, I understand". This is the ONLY way to
   *  dismiss the popup — scrim click and Escape key are intentionally blocked. */
  onAcknowledge: () => void
  onReadMore: () => void
}

// Wind-down popup — renders on BOTH viewports (mobile BottomSheet + desktop
// CenterPopup parallel mount per S34 responsive-popup pattern). Scoped to
// /explore by the orchestrator; shows on every page load there (no localStorage
// persistence — dismissal is in-memory only and resets on navigation away).
//
// **No close X, no scrim-dismiss, no Esc-dismiss.** The only exit is the primary
// CTA so the user must consciously acknowledge the message every visit —
// minimizes "I didn't see this" support queries during wind-down.
export default function WindDownPopup({ open, onAcknowledge, onReadMore }: WindDownPopupProps) {
  const body = (
    <div className="relative flex flex-col items-center text-center px-l pt-l pb-l">
      {/* Hero alert — sibling-inheritance from StatusResultIcon's circular-chrome anatomy
          (15% bg + 30% border at status color, glyph in status color). Wind-down's status
          is warning, not success/failure, so a hand-rolled instance here. If a third
          warning-status hero shows up, extract a shared primitive. */}
      <div className="size-[64px] rounded-full flex items-center justify-center bg-status-warning/[0.15] border border-status-warning/[0.30] mb-m">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-status-warning" aria-hidden>
          <path d="M12 2L2 21h20L12 2z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M12 10v4M12 17.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <h2 className="text-xl font-semibold text-text-title mb-s">wsup is winding down</h2>

      {/* Body — Phase 1 timeline statement. whitespace-nowrap on "read-only" prevents the
          hyphenated term from breaking across lines (typographic integrity for compound words). */}
      <p className="text-sm text-text-body leading-relaxed mb-xs max-w-[320px] text-balance">
        You have until <span className="text-text-subtitle">May 29</span> before chats go{' '}
        <span className="whitespace-nowrap">read-only</span>, and until{' '}
        <span className="text-text-subtitle">June 19</span> before full shutdown.
      </p>

      {/* Read-more link sits right under the body (tight grouping with the info copy),
          then the primary CTA below it. Designer call: link belongs in the info group,
          not in the action group. No close X, no scrim dismiss. */}
      <button
        type="button"
        onClick={onReadMore}
        className="link text-sm bg-transparent border-none cursor-pointer self-center mb-l"
      >
        Read the full update
      </button>

      <Button variant="primary" fullWidth onClick={onAcknowledge}>Okay, I understand</Button>

      {/* Other apps to try section — extracted at Gate 3 (2 consumers).
          text-left override needed because the popup body is items-center. */}
      <WindDownOtherApps className="mt-l text-left" />
    </div>
  )

  // onClose intentionally no-op so BottomSheet/CenterPopup scrim + Esc handlers don't dismiss.
  // The "Okay, I understand" CTA is the only valid exit path.
  const noop = () => {}

  return (
    <>
      <BottomSheet open={open} onClose={noop} zIndex={80}>
        {body}
      </BottomSheet>
      <CenterPopup open={open} onClose={noop} zIndex={80} maxWidth="440px">
        {body}
      </CenterPopup>
    </>
  )
}
