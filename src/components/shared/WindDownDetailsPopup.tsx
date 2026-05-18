'use client'

import type { ReactNode } from 'react'
import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import WindDownOtherApps from '@/components/shared/WindDownOtherApps'

interface WindDownDetailsPopupProps {
  open: boolean
  onClose: () => void
}

// Long-form info popup with the full wind-down context. Triggered from
// "Read the full update" on the first-exposure popup (the only entry point —
// the top strip was removed at S35 close, leaving the popup as the sole
// wind-down chrome on /explore). Structured as info design (cost-of-compliance
// reasoning + 3-phase timeline + refund + data action blocks +
// alternative-apps section + personal closing note). Parallel mount
// (BottomSheet + CenterPopup) per the S34 responsive-popup pattern.
//
// **Sibling-inheritance from BioSheet** (profile read-more popup) — the title
// ("wsup is winding down") is passed as the `title` prop to BOTH primitives so
// the sticky header chrome (title + CloseButton + hairline divider) comes from
// the primitive, identical to BioSheet. The body is a scrollable region inside
// the popup card. Refund + data requests funnel to a single support@wsup.ai
// address to minimize one-tap query volume.

interface TimelineRowProps {
  badge: string
  title: string
  body: ReactNode
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

// Single contact address — all wind-down requests funnel here.
const SUPPORT_EMAIL = 'support@wsup.ai'

interface ActionBlockProps {
  label: string
  children: ReactNode
}

// Action block — section label + body paragraph with mailto link. Uses
// `label-xs text-text-dim` (40%, recedes against 70% body) because this popup's
// section bodies are plain prose with no structural weight to carry the contrast.
// Local override only — the global `.label-xs` default stays at 60% for all other
// consumers (Sidebar, Coachmark, BadgesWidget, etc.) where neighbors with their
// own visual weight (cards, list rows, numerical values) make 60% read fine.
// Label-xs (NOT eyebrow-label) because the label IS the section heading; no
// separate title sits below it. Timeline row badges above use `eyebrow-label`
// also at 40% (different role — eyebrow above per-row title).
function ActionBlock({ label, children }: ActionBlockProps) {
  return (
    <div className="flex flex-col gap-xs">
      <span className="label-xs text-text-dim">{label}</span>
      <p className="text-sm text-text-body leading-relaxed">{children}</p>
    </div>
  )
}

export default function WindDownDetailsPopup({ open, onClose }: WindDownDetailsPopupProps) {
  const supportLink = (
    <a href={`mailto:${SUPPORT_EMAIL}`} className="link">{SUPPORT_EMAIL}</a>
  )

  const body = (
    <div className="flex-1 min-h-0 overflow-y-auto scroll-hide px-l pt-l pb-l">
      <div className="flex flex-col gap-l">
        {/* Opening reasoning */}
        <p className="text-sm text-text-body leading-relaxed">
          The cost of staying compliant got too high. Both in engineering effort and in real money,
          the load grew faster than we could absorb. Every month brought new content rules and new
          regulatory work that ate into the time and budget we needed to keep building wsup. We
          couldn&apos;t keep running to stand still.
        </p>

        {/* Timeline */}
        <div className="flex flex-col gap-m relative">
          <span className="label-xs text-text-dim">What happens and when</span>
          <div className="flex flex-col gap-l relative">
            <div className="absolute left-[4px] top-[14px] bottom-[14px] w-px bg-white-10" />
            <TimelineRow
              badge="Now → Sun May 24"
              title="Open for chat"
              body="Paid model tiers turn off today. Everyone reverts to the free model, so no one is paying for messages while we wind down. Chats, character creation, everything you're used to stays on."
            />
            <TimelineRow
              badge="Mon May 25 → Thu Jun 18"
              title="Read-only · goodbye window"
              body={
                <>
                  Your characters and chat history stay here to revisit and download. New messages and
                  new characters are off. Almost four weeks on purpose, time to come back,{' '}
                  <span className="whitespace-nowrap">re-read</span> what mattered, and pull your data.
                </>
              }
            />
            <TimelineRow
              badge="From Fri Jun 19"
              title="Landing page mode"
              body="wsup.ai points you to other AI apps worth your time. The app stays installable for a while longer so you can request refunds and download your data."
            />
          </div>
        </div>

        {/* Action blocks — REFUNDS + YOUR DATA. Funnel both flows to a single support@wsup.ai
            so user has one address to remember and we have one inbox to triage. */}
        <div className="flex flex-col gap-m">
          <ActionBlock label="Refunds">
            Bought credits and didn&apos;t use them all? Email {supportLink} from your account
            address and we&apos;ll refund the unused balance.
          </ActionBlock>
          <ActionBlock label="Your data">
            Want to take your characters and chat history with you? Email {supportLink} from your
            account address and we&apos;ll send you a download.
          </ActionBlock>
        </div>

        {/* Other apps to try section — shared with WindDownPopup via Gate 3 extraction.
            Same chrome, same URLs, same anatomy. Label receded to 40% (text-text-dim)
            to match the other peer section labels in this popup; the plain-prose body
            above + cards below need a clear 30% opacity gap for label-vs-body separation. */}
        <WindDownOtherApps labelClassName="text-text-dim" />

        {/* Personal closing note — sits below the apps section as the final word. */}
        <p className="text-sm text-text-body leading-relaxed">
          Thank you for trusting us with something as personal as the conversations you had here.
          That&apos;s not a small thing and we won&apos;t pretend otherwise.
        </p>
      </div>
    </div>
  )

  return (
    <>
      <BottomSheet
        open={open}
        onClose={onClose}
        title="wsup is winding down"
        maxHeight="88%"
        fillHeight
        zIndex={80}
      >
        {body}
      </BottomSheet>

      <CenterPopup
        open={open}
        onClose={onClose}
        title="wsup is winding down"
        maxWidth="520px"
        zIndex={80}
      >
        {body}
      </CenterPopup>
    </>
  )
}
