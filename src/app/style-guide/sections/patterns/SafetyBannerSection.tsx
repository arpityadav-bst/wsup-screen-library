'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import SafetyBanner from '@/components/chat/SafetyBanner'
import type { SafetyVariant } from '@/lib/safetyVariants'

const VARIANTS: SafetyVariant[] = ['self-harm', 'medical', 'financial']
const VARIANT_LABEL: Record<SafetyVariant, string> = {
  'self-harm': 'Self-harm — heart-with-hands illustration, two action buttons (Browse + Call)',
  'medical': 'Medical — red-cross badge, single action button (Find a doctor)',
  'financial': 'Financial — gold-coin illustration, single action button (Find an advisor)',
}

export default function SafetyBannerSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Safety Banner" title="Safety Banner" onVisible={onSectionVisible}>
      <div className="min-w-[440px] flex-1">
        <SubLabel>Three variants — platform-intervention banners pinned to the top of the chat area, edge-to-edge, persist until user dismisses</SubLabel>
        <div className="flex flex-col gap-l">
          {VARIANTS.map((variant) => (
            <div key={variant}>
              <p className="text-xs text-text-small mb-xs">{VARIANT_LABEL[variant]}</p>
              <div className="rounded-card overflow-hidden border border-white-10">
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
            ['Position — Mobile: absolute overlay at top of chat viewport (covers header). Desktop: BELOW ChatHeader (in flex flow). Edge-to-edge, border-b only', 'Mobile uses absolute top-0 left-0 right-0 z-20 — banner overlays the chat column from the top edge, covering the ChatHeader visually. ChatHeader stays in flex flow underneath, no layout push. Desktop renders banner in flow below header — horizontal viewport gives both surfaces room. Mutually exclusive with DormancyBanner — safety wins'],
            ['Surface — Mobile: bg-profile-sheet-bg (#1a1a1a solid). Desktop: bg-white-05 (matches DormancyBanner desktop)', 'Mobile needs solid because banner is an absolute overlay over arbitrary chat content (character image, messages). Desktop matches DormancyBanner\'s `bg-white-05 border-b border-white-10` exactly so both top-of-chat banners read as the same elevated-dark surface family. Solid (not glass) signals "platform speaking" per the "solid vs glass speaker identifier" taste rule'],
            ['Layout — Mobile: 56px illustration + heading + × on row 1; full-width buttons row 2 (secondary nowrap, primary flex-1); source line full-width row 3', 'Stacked vertical because chat column is narrow on mobile. Heading wraps 2-3 lines. Buttons span full container width minus gaps. Source line lives at the bottom flush-left of the container'],
            ['Layout — Desktop: 48px illustration + (heading + source line stacked vertically) + buttons + × on a single row, items-center', 'Smaller illustration (48 vs mobile 56) so it visually matches the text-column height. Heading and source line share the same left edge — both live in the second flex column. items-center vertically centers the illustration / buttons / close against the text column. Different layout per viewport per the codified rule "Adapt pattern to the device\'s dominant axis"'],
            ['Source line position differs per viewport — mobile: full-width below buttons; desktop: stacked under heading inside the text column', 'Mobile keeps the figma layout (source as separate full-width footer). Desktop pulls the source line into the same column as the heading so they share left alignment, and the row reads as one compact unit instead of stacking 3 distinct rows'],
            ['Illustration size: 56 mobile / 48 desktop. Heading: text-sm text-text-title leading-snug. Close: CloseButton primitive with -mr-icon-btn (mobile also gets -mt-icon-btn for top-row alignment)', 'Smaller desktop illustration matches the heading + source stack vertical extent more closely. Top of illustration ≈ top of heading; bottom of illustration ≈ bottom of source line (approximate; varies with heading wrap). When heading is multi-line, the illustration sits centered against the taller stack via items-center'],
            ['Buttons: secondary (left, optional) + primary (right) — gap-s, left-aligned cluster, mt-m below heading', 'Per "related controls cluster" taste rule — controls sit immediately after the heading they act on. Self-harm has both buttons (browse vs call); medical/financial has primary only'],
            ['Buttons use Button primitive at variant=primary/secondary, size=m', 'Reuse — no hand-rolled button styling. Action delegates to navigate() helper which routes tel: links to window.location and external https: to window.open'],
            ['Footer: ⓘ InfoIcon size=12 + sourceText (text-xs text-text-xsmall) + inline "Learn more" link', 'Source attribution clarifies that real help comes from the third-party resource, not from wsup.ai. Learn more uses the .link utility class'],
            ['Trigger: keyword detection on user-sent message via lib/safetyDetect.ts', 'Severity hierarchy on collision: self-harm > medical > financial. Production would use an ML classifier; demo uses regex patterns for deterministic dev review'],
            ['Persistence: in-memory only — fresh per session, no localStorage', 'Safety alerts shouldn\'t be silenced across sessions. If the triggering content recurs after a reload, the banner re-shows. Different from feature-disable (suggestions), which is a user preference'],
            ['Dev controls: R-key state toggle cycles through Safety: Self-harm / Medical / Financial states', 'Hooked into the existing chatState dev cycle. Closing the banner from a dev state returns chatState to active'],
            ['Illustrations: designer-supplied brand SVGs in chat/SafetyIllustrations.tsx', 'Self-harm = heart-with-hands (1000×1000 viewBox, coral palette); medical = prescription pad (52×52 viewBox, blue paper + red Rx banner); financial = receipt with gold $ coin (512×512 viewBox, gray bill + amber coin). All render at 56×56 default; desktop banner uses 48×48. Iconography is the cohesion mechanism — heart-with-hands for compassion, prescription-pad for medical, bill-with-coin for financial. Each variant uses its category\'s native visual metaphor'],
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
