'use client'

import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import CloseButton from '@/components/ui/CloseButton'
import WindDownOtherApps from '@/components/shared/WindDownOtherApps'

interface WindDownDetailsPopupProps {
  open: boolean
  onClose: () => void
}

// Long-form info popup with the full wind-down context. Triggered from
// "Read the full update" on the first-exposure popup (the only entry point —
// the top strip was removed at S35 close, leaving the popup as the sole
// wind-down chrome on /explore). Structured as info design (title + regulatory
// reasoning + 3-phase timeline + alternative-apps section + personal note +
// email contact at the bottom). Parallel mount (BottomSheet + CenterPopup) per
// the S34 responsive-popup pattern; scrollable body with email contact copy
// flowing naturally after content (not sticky) — no action CTAs since refund +
// download requests funnel to email to minimize one-tap query volume.

interface TimelineRowProps {
  badge: string
  title: string
  body: string
}

function TimelineRow({ badge, title, body }: TimelineRowProps) {
  return (
    <div className="relative pl-l">
      <div className="absolute left-0 top-[6px] size-[10px] rounded-pill bg-status-warning ring-4 ring-status-warning/[0.15]" />
      <div className="flex flex-col gap-xxs">
        <span className="eyebrow-label text-status-warning">{badge}</span>
        <p className="text-sm font-medium text-text-title">{title}</p>
        <p className="text-sm text-text-body leading-relaxed">{body}</p>
      </div>
    </div>
  )
}

// Contact emails — placeholders, swap to real addresses before launch
const REFUND_EMAIL = 'refund@wsup.ai'
const DATA_EMAIL = 'data@wsup.ai'

export default function WindDownDetailsPopup({ open, onClose }: WindDownDetailsPopupProps) {
  const body = (
    <div className="flex flex-col">
      <div className="flex flex-col gap-l px-l pt-l pb-m">
        {/* Header + reasoning */}
        <div className="flex flex-col gap-xs">
          <h2 className="text-xl font-semibold text-text-title">wsup is winding down</h2>
          <p className="text-sm text-text-body leading-relaxed pt-xxs">
            The regulatory load on this space grew faster than we could absorb. Every month brought
            new compliance requirements, new content rules, new legal red lines — and we
            couldn&apos;t keep building the product while running to stand still on the legal side.
          </p>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-m relative">
          <span className="label-xs">What happens and when</span>
          <div className="flex flex-col gap-l relative">
            <div className="absolute left-[4px] top-[14px] bottom-[14px] w-px bg-white-10" />
            <TimelineRow
              badge="Now → Fri May 29"
              title="Fully open"
              body="Paid model tiers turn off today — everyone reverts to the free model, so no one is paying for messages while we wind down. Chats, character creation, everything you're used to stays on."
            />
            <TimelineRow
              badge="Fri May 29 → Fri Jun 19"
              title="Read-only · goodbye window"
              body="Your characters and chat history stay here to revisit and download. New messages and new characters are off. Three weeks on purpose — time to come back, re-read what mattered, and pull your data."
            />
            <TimelineRow
              badge="After Jun 19"
              title="Landing page mode"
              body="wsup.ai points you to other AI apps worth your time. The app stays installable for a while longer for refund and export."
            />
          </div>
        </div>

        {/* Other apps to try section — shared with WindDownPopup via Gate 3 extraction.
            Same chrome, same URLs, same anatomy. */}
        <WindDownOtherApps />

        {/* Personal note */}
        <p className="text-sm text-text-body leading-relaxed">
          Thank you for trusting us with something as personal as the conversations you had here.
          That&apos;s not a small thing and we won&apos;t pretend otherwise.
        </p>

        {/* Email contact — replaces refund/download action CTAs. Funneling these
            requests to email reduces one-tap query volume during wind-down. Flows
            naturally after content (not sticky) so it reads as part of the message. */}
        <div className="flex flex-col gap-xs pt-xs">
          <p className="text-sm text-text-body leading-relaxed">
            For refund inquiries, write to{' '}
            <a href={`mailto:${REFUND_EMAIL}`} className="link">{REFUND_EMAIL}</a>.
          </p>
          <p className="text-sm text-text-body leading-relaxed">
            To download your data, write to{' '}
            <a href={`mailto:${DATA_EMAIL}`} className="link">{DATA_EMAIL}</a>.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <BottomSheet open={open} onClose={onClose} zIndex={80} maxHeight="88%">
        <div className="relative flex-1 overflow-y-auto scroll-hide">
          <CloseButton onClose={onClose} className="absolute top-s right-s z-10" />
          {body}
        </div>
      </BottomSheet>

      <CenterPopup open={open} onClose={onClose} zIndex={80} maxWidth="520px">
        <div className="relative">
          <CloseButton onClose={onClose} className="absolute top-s right-s z-10" />
          {body}
        </div>
      </CenterPopup>
    </>
  )
}
