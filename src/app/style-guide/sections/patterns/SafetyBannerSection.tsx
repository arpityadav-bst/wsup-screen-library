'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import SafetyBanner from '@/components/chat/SafetyBanner'
import type { SafetyVariant } from '@/lib/safetyVariants'

const VARIANTS: SafetyVariant[] = ['self-harm', 'medical', 'financial']
const VARIANT_LABEL: Record<SafetyVariant, string> = {
  'self-harm': 'Self-harm — hands-with-heart illustration, two CTAs (Browse resources + Call now)',
  'medical': 'Medical — capsule + pill illustration, no CTAs (heading + source attribution only)',
  'financial': 'Financial — wallet + bills + coin illustration, no CTAs (heading + source attribution only)',
}

export default function SafetyBannerSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Safety Banner" title="Safety Banner" onVisible={onSectionVisible}>
      <div className="min-w-[440px] flex-1">
        <SubLabel>Three variants — platform-intervention surfaces. Mobile: full-bleed banner overlaid at top of chat. Desktop: centered floating card (PM directive — matches production wsup.ai)</SubLabel>
        <div className="flex flex-col gap-l">
          {VARIANTS.map((variant) => (
            <div key={variant}>
              <p className="text-xs text-text-small mb-xs">{VARIANT_LABEL[variant]}</p>
              <div className="bg-page-bg p-m flex justify-center rounded-card border border-white-10">
                <SafetyBanner variant={variant} onClose={() => {}} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Position — Mobile: absolute overlay at top of chat viewport (covers header), edge-to-edge, border-b only. Desktop: absolute centered floating card in chat column (rounded-card, max-w-[320px], no scrim). Mutually exclusive with DormancyBanner — safety wins', 'PM directive (S30): desktop uses the same vertical layout as mobile, wrapped as a centered card matching production wsup.ai. Parent mount is `hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-20` with `pointer-events-auto` on the inner banner so ChatBar + ChatHeader remain reachable. No backdrop scrim — chat content stays fully visible behind the card'],
            ['Surface — Always solid bg-profile-sheet-bg. Mobile: full-bleed, border-b border-white-10 only. Desktop: rounded-card + full border + max-w-[320px] + mx-auto + shadow-popup', 'Solid (not glass) signals "platform speaking" per the "solid vs glass speaker identifier" taste rule. Desktop card chrome matches MemoryLimitPopup\'s centered-popup convention (solid + border + rounded + shadow), with `rounded-card` (12px) instead of `rounded-popup` (24px) to match production\'s tighter radius'],
            ['Layout — Single vertical layout for both viewports: row 1 [illust + heading + ×] with items-center; row 2 [buttons] only renders if variant has actions (self-harm only); row 3 [source line] always renders', 'Stacked vertical regardless of viewport per the PM directive. Illustration vertically centers with the heading text via items-center on the row. Close button uses self-start to override center-alignment and stay pinned at the top-right corner. Medical and financial variants render without a buttons row — they\'re informational disclaimers, not action surfaces'],
            ['Illustration size: 56 (both viewports). Heading: text-[15px] font-medium text-text-title leading-snug. Close: CloseButton with self-start -mr-icon-btn -mt-icon-btn for top-right corner alignment', 'Heading at 16px medium gives the platform-intervention message enough visual weight to outrank chat content without crossing into alarming/loud territory. Illustration centers with heading; close button breaks out of center via self-start to maintain top-right anchor. Negative margins on close clear the optical edge while keeping symmetric parent padding'],
            ['Buttons: secondary (left, optional) + primary (right) — gap-s, left-aligned cluster, mt-m below heading', 'Per "related controls cluster" taste rule — controls sit immediately after the heading they act on. Self-harm has both buttons (browse vs call); medical/financial has primary only'],
            ['Buttons use Button primitive at variant=primary/secondary, size=m', 'Reuse — no hand-rolled button styling. Action delegates to navigate() helper which routes tel: links to window.location and external https: to window.open'],
            ['Footer: ⓘ InfoIcon size=12 + sourceText (text-xs text-text-xsmall) + inline "Learn more" link', 'Source attribution clarifies that real help comes from the third-party resource, not from wsup.ai. Learn more uses the .link utility class'],
            ['Trigger: keyword detection on user-sent message via lib/safetyDetect.ts', 'Severity hierarchy on collision: self-harm > medical > financial. Production would use an ML classifier; demo uses regex patterns for deterministic dev review'],
            ['Persistence: in-memory only — fresh per session, no localStorage', 'Safety alerts shouldn\'t be silenced across sessions. If the triggering content recurs after a reload, the banner re-shows. Different from feature-disable (suggestions), which is a user preference'],
            ['Dev controls: R-key state toggle cycles through Safety: Self-harm / Medical / Financial states', 'Hooked into the existing chatState dev cycle. Closing the banner from a dev state returns chatState to active'],
            ['Illustrations: designer-supplied brand SVGs in chat/SafetyIllustrations.tsx', 'Self-harm = give-love hands cradling a red heart (510×510 viewBox, gradient-rich coral/peach palette); medical = medicines (53×53 source viewBox, cropped to 47×41 to fill the 56px frame; pink/red capsule + white pill + sparkle); financial = wallet (500×500 source viewBox, cropped to 460×460; brown leather wallet + green bills + amber coin). All render at 56×56 on both viewports — viewBox tightening (not size-prop bumping) makes medical and financial visually fill the same frame as heart-hands. Iconography drives cohesion: hands-with-heart for compassion, capsule-and-pill for medical, wallet-and-coin for financial. Both gradient-rich SVGs use prefixed internal IDs (`shi-` for heart-hands, `fi-` for wallet); SafetyBanner mounts as a single DOM tree to avoid duplicate-ID collisions across viewport-conditional positioning'],
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
