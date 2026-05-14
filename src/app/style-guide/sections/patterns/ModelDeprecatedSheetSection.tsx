'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import CloseButton from '@/components/ui/CloseButton'
import Button from '@/components/ui/Button'
import { getModel } from '@/lib/models'

function AnnouncementIcon() {
  return (
    <div className="w-[64px] h-[64px] rounded-full bg-white-10 border border-white-10 flex items-center justify-center text-text-title">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        style={{ transformOrigin: '50% 15%', animation: 'bell-ring 5s ease-in-out infinite' }}
      >
        <path d="M18 8a6 6 0 1 0-12 0v4l-1.5 3h15L18 12V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M9.5 17.5a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export default function ModelDeprecatedSheetSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const deprecated = getModel('llama-3')
  const replacement = getModel('qwen-plus-character')

  return (
    <Section id="Model Deprecated Sheet" title="Model Deprecated Sheet" onVisible={onSectionVisible}>
      <div className="min-w-[440px] flex-1">
        <SubLabel>Mobile-only (app context). Triggered on /chat when the user&apos;s previously-selected model has been retired from the catalog. Minimal anatomy — announcement icon, title, body, primary CTA, link CTA. The full model picker is one tap away via the link. Desktop = N/A (popup uses BottomSheet primitive, which is <code className="text-accent-light">md:hidden</code>).</SubLabel>

        {/* Inline flat-render mockup — matches the BottomSheet's content layout so the style guide
            can show the popup without mounting an actual BottomSheet (which would be hidden on
            desktop). The bg + chrome match BottomSheet's surface defaults. */}
        <div className="bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden" style={{ maxWidth: '414px' }}>
          {/* Drag handle (BottomSheet renders this; included in mockup for parity) */}
          <div className="flex justify-center pt-s pb-0 shrink-0">
            <div className="w-[36px] h-[4px] rounded-pill bg-white-30" />
          </div>

          <div className="relative flex flex-col items-center px-l pt-l pb-l gap-m">
            <CloseButton onClose={() => {}} className="absolute top-s right-s" />
            <AnnouncementIcon />

            <div className="flex flex-col items-center gap-xs">
              <h2 className="text-xl font-semibold text-text-title text-center text-balance">
                Keep chatting with credits
              </h2>
              <p className="text-sm text-text-body text-center text-balance">
                {deprecated.name} has retired. {replacement.name}{' '}
                <span className="whitespace-nowrap">takes over</span>
                {' '}— same characters, 1 credit per reply.
              </p>
            </div>

            <div className="flex flex-col gap-s w-full pt-s">
              <Button variant="primary" fullWidth onClick={() => {}}>
                Continue
              </Button>
              <button onClick={() => {}} className="link text-sm text-center self-center">
                Pick a different model
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy + reuse map</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Container — BottomSheet primitive (mobile-only). Desktop = no render (md:hidden).', 'Reuse: same primitive as CreditServicePopup / ModelPickerSheet / ChatStyleSheet. NO CenterPopup pair — this popup is mobile-only by design (Flutter app context). Web /chat fires it via dev panel for preview; desktop sees nothing when state is active.'],
            ['Announcement icon — 64×64 rounded-full surface (bg-white-10 + border-white-10) with bell glyph centered (28×28), subtle ring animation', 'Inline SVG, no asset file — keeps the popup self-contained. Bell glyph chosen over megaphone / sparkle / info-circle: bells are the universal mobile-UI shorthand for "we have something to tell you." Glyph stroke uses currentColor → text-text-title for white. 28×28 inside 64×64 = ~44% fill ratio, matches the visual weight of CreditServicePopup\'s hex icon at smaller scale. **Animation:** damped oscillation rotates the bell ~14° on the first swing, decays to 0 over ~1.4s; cycle repeats every 5s (~2.6s of stillness between rings). Pivot at `transform-origin: 50% 15%` (top of bell-cap) so the swing looks like a real bell. Keyframes: `bell-ring` in globals.css.'],
            ['Title — text-xl font-semibold text-text-title, centered, text-balance', '"Keep chatting with credits" is action-first per codified taste rule — names the user verb, not the blocked state ("Llama 3 free chat ended" would be the blocked-state version, NOT what we ship). `text-balance` distributes wrap evenly across lines.'],
            ['Body — text-sm text-text-body, centered, text-balance, "takes over" wrapped in whitespace-nowrap', 'Single paragraph carrying the model retirement + cost: "Llama 3 has retired. Qwen Plus Character takes over — same characters, 1 credit per reply." "Retired" is softer than "removed" (which sounds punitive) and more accurate than "no longer free" (Llama 3 isn\'t becoming paid — it\'s being removed entirely; Qwen is the only option now). The "same characters" reassurance directly answers the user\'s actual fear (am I losing my story progress?). Cost expressed as plain-English not as a chip. The verb-particle "takes over" is wrapped in `<span className="whitespace-nowrap">` so text-balance doesn\'t split it.'],
            ['Primary CTA — <Button variant="primary" fullWidth>Continue', 'Just acknowledges + closes. The popup is INFORMING, not asking the user to decide. No verb required from the user; the system has already done the migration.'],
            ['Secondary text-link — "Pick a different model" → opens ModelPickerSheet', 'Uses .link utility class. Escape hatch for users who want to compare or switch. Closes this popup + opens the full picker (handled by onPickModel prop in page.tsx).'],
            ['Close — absolute top-s right-s, CloseButton primitive', 'Same idiom as CreditServicePopup. Equivalent to Continue semantically (both just dismiss); production may track which path the user took.'],
            ['Reusable for future free-model deprecations', 'Component accepts deprecatedModelId + replacementModelId props. Defaults wire the Llama 3 → Qwen migration; if Mistral Nemo (also appOnly + free) is deprecated next, same component with different props.'],
            ['Trigger (real) — fires when user opens /chat AND last-used-model.cost === null AND model is flagged deprecated AND isLoggedIn', 'One-shot per deprecation event; dismissable. Production logic checks against a deprecation flag on the Model record (not yet in the demo model catalog — flag would be added when a model is actually deprecated).'],
            ['Trigger (dev preview) — chat dev panel state "Llama 3 deprecated (mobile only)" (R toggle / Shift+R cycle)', 'Designer + Flutter dev can preview the popup directly without needing to be a real legacy user. "(mobile only)" suffix in the state label makes it explicit that the popup won\'t appear on the desktop dev view. Sits in the State section alongside Memory full / Model selection / Out of credits popup.'],
            ['Z-index — sheet at 70 (matches CreditServicePopup / ModelPickerSheet / StreakClaimPopup)', 'Mutually exclusive with other state-popups (chat state machine is single-active).'],
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
