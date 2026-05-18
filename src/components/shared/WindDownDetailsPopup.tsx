'use client'

import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import CloseButton from '@/components/ui/CloseButton'
import AppLinkButton from '@/components/shared/AppLinkButton'

// External-app URLs — confirmed by designer S35
const POLYBUZZ_URL = 'https://now.gg/apps/cloud-whale-interactive-technology-llc/10386/polybuzz.html'
const TALKIE_URL = 'https://now.gg/apps/subsup123/5772/talkie-creative-ai-community.html'

interface WindDownDetailsPopupProps {
  open: boolean
  onClose: () => void
}

// Long-form info popup with the full wind-down context. Triggered from
// "Read the full update" on the top strip and the first-exposure popup.
// Structured as info design (title + reasoning + 3-phase timeline + refunds/data
// email contact + alternative-apps section). Parallel mount (BottomSheet +
// CenterPopup) per the S34 responsive-popup pattern; scrollable body with email
// contact copy at the bottom (no action CTAs — refund + download requests funnel
// to email to minimize one-tap query volume during wind-down).

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

        {/* Other apps to try — same flanked-label divider + side-by-side button layout
            as WindDownPopup for cross-surface consistency. */}
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-s w-full mb-s">
            <div className="flex-1 border-t border-white-10" />
            <span className="label-xs shrink-0">Other apps to try</span>
            <div className="flex-1 border-t border-white-10" />
          </div>
          <div className="flex flex-row gap-xs w-full">
            <div className="flex-1 min-w-0">
              <AppLinkButton href={POLYBUZZ_URL} logo="/external/polybuzz.png" name="Polybuzz" />
            </div>
            <div className="flex-1 min-w-0">
              <AppLinkButton href={TALKIE_URL} logo="/external/talkie.png" name="Talkie" />
            </div>
          </div>
        </div>

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
