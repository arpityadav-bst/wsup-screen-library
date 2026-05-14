'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import CloseButton from '@/components/ui/CloseButton'
import BuyCreditsPromoCard from '@/components/shared/BuyCreditsPromoCard'

export default function CreditServicePopupSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Credit Service Popup" title="Credit Service Popup" onVisible={onSectionVisible}>
      <div className="min-w-[440px] flex-1">
        <SubLabel>Out-of-credits gate (chat). Triggered when a logged-in user exhausts their paid-msg quota; offers two top-up paths — claim daily rewards or buy credits.</SubLabel>

        <div className="bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden" style={{ maxWidth: '414px' }}>
          {/* Header */}
          <div className="relative flex flex-col items-center px-l pt-l pb-l gap-xs">
            <CloseButton onClose={() => {}} className="absolute top-s right-s" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/icon-credit-hexagon.png" alt="" width={82} height={82} className="select-none" />
            <p className="text-xl font-semibold text-text-title text-center">2 more credits required</p>
          </div>
          {/* Actions */}
          <div className="flex flex-col gap-s px-l pt-l pb-l border-t border-white-10">
            <p className="label-xs text-text-small text-center">Top up your balance to continue</p>
            <BuyCreditsPromoCard onBuy={() => {}} />
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy + reuse map</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Container — BottomSheet (mobile) + CenterPopup (desktop) paired pattern, maxWidth 414px', 'Reuse: same primitives as ChatStyleSheet / StreakClaimPopup / BuyCreditsSheet. Single PopupContent renders identical content into both sheets'],
            ['Header — hexagonal gold sparkle icon (82×82) + title + absolute close', 'Icon: <code>/icons/icon-credit-hexagon.png</code> (Figma export, sourced from node 28790:83955). Title: text-xl font-semibold text-text-title — credits-required count is a prop (default 2). Close: WSUP CloseButton primitive at absolute top-s right-s'],
            ['Divider — border-top white-10 separates header from actions', 'Single hairline separator; Figma calls this an inner stroke on the Actions frame'],
            ['Actions section — label + buy promo card, gap-s, padding-l', 'Label: "Top up your balance to continue" using <code>label-xs</code> (uppercase tracking). Single action container — claim-daily-rewards row was hidden in S31 follow-up (designer call: only the buy path remains; claim-daily is reachable via dev toggler / streak claim popup directly)'],
            ['Buy credits promo — <BuyCreditsPromoCard /> shared with CreditSidebar', 'Gate 3 extraction at S31 — promo card was inline-defined in CreditSidebar; second consumer (this popup) triggered the share. Card has its own gradient bg + credit-bags illustration + "+ Add more credits" + Buy Credits CTA. Designer asked to reuse the existing container rather than build a new "Add credits / Buy credits in App" row from scratch'],
            ['onBuyCredits callback — closes service popup, opens BuyCreditsSheet (separate buyCreditsOpen state in page.tsx)', 'BuyCreditsSheet is mounted at page-level alongside other overlays. Both popups share the BuyCreditsPromoCard\'s "buy credits" affordance'],
            ['Trigger (real) — useSendGate fires when isLoggedIn && paidMsgsUsed ≥ PAID_MSG_LIMIT (3 in demo)', 'Replaces the previous direct-to-BuyCreditsSheet path. Demo-compressed: 3 sends after sign-in trip the gate. Production would track real credit balance vs per-msg cost'],
            ['Trigger (dev preview) — chat dev panel state "Credit service" (R toggle / Shift+R cycle)', 'Designer can preview the popup directly without sending 3 messages. Sits in the State section alongside Memory full / Model selection / Claim free credits'],
            ['Z-index — sheets at 70 (matches ChatStyleSheet / StreakClaimPopup / ModelDeprecatedSheet)', 'Above SafetyBanner overlay (20), above MemoryLimitOverlay (also 70 — they\'re mutually exclusive states, never both open)'],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={cls} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
