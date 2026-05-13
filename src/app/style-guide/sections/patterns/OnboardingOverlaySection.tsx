'use client'

import { Section, SubLabel, StateLabel } from '../../helpers'
import OnboardingHeader from '@/components/onboarding/OnboardingHeader'
import OnboardingPreferencesStep from '@/components/onboarding/OnboardingPreferencesStep'
import OnboardingDeckStep from '@/components/onboarding/OnboardingDeckStep'
import OnboardingDeckEmptyState from '@/components/onboarding/OnboardingDeckEmptyState'
import { ONBOARDING_DECK } from '@/lib/onboardingDeck'

// Two preview shells — Stage 1 is content-driven (no fixed height) so the popup matches its native auto-sizing;
// Stage 2 + end-state use a fixed tall shell to match the deck stage's `min(880px, 94vh)` runtime height.
const DECK_SHELL = 'w-full max-w-popup-medium h-[880px] bg-page-bg rounded-popup border border-white-10 overflow-hidden flex flex-col'
const PREFS_SHELL = 'w-full max-w-popup-medium bg-page-bg rounded-popup border border-white-10 overflow-hidden flex flex-col'

export default function OnboardingOverlaySection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Onboarding Overlay" title="Onboarding Overlay" onVisible={onSectionVisible}>
      <div className="w-full flex flex-col gap-xl">

        <div>
          <SubLabel>Stage 1 — Preferences (content-driven height)</SubLabel>
          <div className={PREFS_SHELL}>
            <OnboardingPreferencesStep onContinue={() => {}} onSkip={() => {}} />
          </div>
        </div>

        <div>
          <SubLabel>Stage 2 — Deck (card 1, top pick)</SubLabel>
          <div className={DECK_SHELL}>
            <OnboardingDeckStep index={0} onSkipCard={() => {}} onLikeCard={() => {}} onSkipFlow={() => {}} onRestartDeck={() => {}} />
          </div>
        </div>

        <div>
          <SubLabel>Stage 2 — Deck (card 3, regular)</SubLabel>
          <div className={DECK_SHELL}>
            <OnboardingDeckStep index={2} onSkipCard={() => {}} onLikeCard={() => {}} onSkipFlow={() => {}} onRestartDeck={() => {}} />
          </div>
        </div>

        <div>
          <SubLabel>Stage 2 — Deck end (all cards swiped)</SubLabel>
          <div className={DECK_SHELL}>
            <OnboardingDeckStep index={ONBOARDING_DECK.length} onSkipCard={() => {}} onLikeCard={() => {}} onSkipFlow={() => {}} onRestartDeck={() => {}} />
          </div>
        </div>

        <div>
          <SubLabel>End-state — Show me more / See them again</SubLabel>
          <div className="w-full max-w-popup-medium h-[480px] bg-page-bg rounded-popup border border-white-10 flex flex-col p-l">
            <OnboardingDeckEmptyState onShowMore={() => {}} onSeeAgain={() => {}} />
          </div>
        </div>

        <div>
          <SubLabel>Shared header (logo + Skip pill)</SubLabel>
          <div className="rounded-card border border-white-10 p-l max-w-popup-medium">
            <OnboardingHeader onSkip={() => {}} />
          </div>
        </div>

        <div className="flex flex-col gap-xs max-w-[720px]">
          <StateLabel>Anatomy</StateLabel>
          <div className="rounded-card border border-white-10 p-m text-xs leading-relaxed text-text-body">
            <ul className="list-disc list-inside space-y-xxs">
              <li><span className="text-text-title font-medium">Wrapper</span> — Mobile: <code className="text-accent-light">fixed inset-0 bg-page-bg</code> (full-viewport takeover). Desktop: centered ~480px popup over <code className="text-accent-light">bg-black-55</code> scrim. <em>Height is stage-aware</em>: preferences = <code className="text-accent-light">auto</code> (content-driven), deck = <code className="text-accent-light">min(880px, 94vh)</code> (card stack needs vertical room). <em>Not</em> CenterPopup — custom scrim avoids overflow-hidden clipping.</li>
              <li><span className="text-text-title font-medium">Header</span> — codified <code className="text-accent-light">/logo.png</code> (104×24 composite — same asset shared/Header uses) on left, &ldquo;× Skip&rdquo; pill (secondary chrome) on right. Shared between Stage 1 + Stage 2 + end-state. Skip is the universal escape to /explore — no duplicate exit CTA on the end-state.</li>
              <li><span className="text-text-title font-medium">Stage 1 (Preferences)</span> — Three wrap-pill pickers in order: &ldquo;I am&rdquo; → &ldquo;Your age&rdquo; → &ldquo;I&apos;m interested in.&rdquo; Identity-first matches dating-app convention. Continue CTA pinned to bottom, disabled until all three pickers have a value.</li>
              <li><span className="text-text-title font-medium">Stage 2 (Deck)</span> — Title + helper line; DeckProgressBars (segmented, one per card); deck stack of up to 3 cards (top + 2 peeks behind); DeckActionButtons (wider <code className="text-accent-light">× Pass</code> / <code className="text-accent-light">♥ Like</code> pills, flex-1 each).</li>
              <li><span className="text-text-title font-medium">DeckCard</span> — Explore CharacterCard-style: <code className="text-accent-light">aspect-[9/16]</code> image fills the surface, content overlays the bottom with gradient scrim. Per-category gradient + glyph badge (Mafia / Romance / Teacher / Anime / Mentor / Bold / Friend / Sci-Fi). Sized off parent height (<code className="text-accent-light">h-full</code>) — fully responsive to viewport.</li>
              <li><span className="text-text-title font-medium">Deck stack</span> — Up to 3 cards rendered absolute-positioned. Slots: 0 = top (no transform), 1 = peek (translateY 10px, scale 0.95, opacity 0.7), 2 = back peek (translateY 20px, scale 0.90, opacity 0.45). On swipe, peek cards animate UP one slot in parallel with the top card&apos;s fly-off — coordinated &ldquo;deck advanced&rdquo; motion.</li>
              <li><span className="text-text-title font-medium">Opening bubble</span> — Mirrors AI bubble chrome from /chat (<code className="text-accent-light">bg-chat-ai-bubble</code> + asymmetric radii). Avatar bottom-aligns to bubble&apos;s tail corner. Renders only on the active card. <em>Reveal sequence</em>: card visible → 1s pause → bubble pops in with typing dots → 1.4s typing → typewriter reveals the message character-by-character (~25ms per char).</li>
              <li><span className="text-text-title font-medium">Swipe</span> — Three convergent trigger paths fire the same commit pipeline: action buttons, ← / → keyboard arrows, drag-past-80px-threshold. During drag, full-card colored tint overlay fades in proportional to distance (red on left, green on right) — like the explore card&apos;s purple hover-tint, swiped into directionality. On commit, card flies off (translateX ±600, rotate ±30°, opacity → 0) over 320ms.</li>
              <li><span className="text-text-title font-medium">End-state</span> — Renders when <code className="text-accent-light">index &gt;= deck.length</code> (every card skipped without a like). Stacked-cards illustration + heading + two CTAs: <code className="text-accent-light">Show me more</code> (primary — load next batch in production) and <code className="text-accent-light">See them again</code> (secondary — replay current batch). No third CTA — Skip pill already serves the /explore exit.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-xs max-w-[720px]">
          <StateLabel>State persistence</StateLabel>
          <div className="rounded-card border border-white-10 p-m text-xs leading-relaxed text-text-body">
            <ul className="list-disc list-inside space-y-xxs">
              <li><code className="text-accent-light">wsup_onboarding_liked_id</code> — most recent liked character; <code className="text-accent-light">useChatCharacter()</code> reads this to override default Billie in /chat. Cleared on Skip-flow and on re-entry to the onboarding overlay.</li>
              <li>Deck position is React state only — re-entering &ldquo;Onboarding&rdquo; via the dev panel starts at preferences again. End-state CTAs reset the index to 0 (same demo behavior; production splits them: next batch vs replay current batch).</li>
            </ul>
          </div>
        </div>

      </div>
    </Section>
  )
}
