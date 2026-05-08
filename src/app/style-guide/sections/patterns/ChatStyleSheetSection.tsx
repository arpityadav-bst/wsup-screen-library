'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import Button from '@/components/ui/Button'
import CloseButton from '@/components/ui/CloseButton'
import ChevronIcon from '@/components/ui/ChevronIcon'
import CoinIcon from '@/components/ui/CoinIcon'
import { CheckBadge, Chip, GradientChip } from '@/components/chat/ModelPickerInternals'
import { MODELS, formatCost, type Model } from '@/lib/models'

function MockRow({ model, selected }: { model: Model; selected: boolean }) {
  return (
    <div className={`relative flex flex-col gap-xxs px-m py-s rounded-card w-full ${selected ? 'ring-2 ring-accent bg-accent/10' : 'bg-white-05 border border-white-10'}`}>
      <div className="flex items-center gap-xs flex-wrap min-w-0 pr-9">
        <span className="text-sm font-semibold text-text-title leading-[16px]">{model.name}</span>
        <Chip icon={<CoinIcon size={10} />}>{formatCost(model.cost)}</Chip>
        {model.appOnly && <GradientChip>Available only in mobile app</GradientChip>}
      </div>
      <p className="text-xs text-text-body">{model.description}</p>
      {selected && (
        <div className="absolute top-1/2 -translate-y-1/2 right-m">
          <CheckBadge />
        </div>
      )}
    </div>
  )
}

export default function ChatStyleSheetSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const primaryModels = MODELS.filter((m) => m.tier === 'primary')
  const otherModels = MODELS.filter((m) => m.tier === 'other')

  return (
    <Section id="Chat Style Sheet" title="Chat Style Sheet" onVisible={onSectionVisible}>
      <div className="min-w-[440px] flex-1">
        <SubLabel>Two-step new-chat model picker. Triggered on starting a new chat (mocked via R-key dev state &quot;Model selection&quot;). Same row anatomy as ModelPickerSheet — both surfaces share <code>ModelRow</code> from <code>ModelPickerInternals</code>.</SubLabel>

        <div className="flex flex-col gap-l">
          <div>
            <p className="text-xs text-text-small mb-xs">Step 1 — Primary models + Other disclosure + disabled Continue chat CTA (no row selected)</p>
            <div className="bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden max-w-popup-narrow">
              <div className="flex items-center justify-between px-l py-m">
                <p className="font-semibold text-base text-text-title">Select chat model</p>
                <CloseButton onClose={() => {}} />
              </div>
              <div className="flex flex-col gap-s px-l pb-l">
{primaryModels.map((m) => <MockRow key={m.id} model={m} selected={false} />)}
                <div className="flex items-center justify-between gap-m px-m py-m rounded-card bg-white-05 border border-white-10 text-text-title">
                  <span className="text-base font-medium">Other models</span>
                  <ChevronIcon direction="right" size={20} />
                </div>
                <Button fullWidth disabled>Continue chat</Button>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-text-small mb-xs">Step 1 — Llama 3 selected (appOnly) → CTA flips to &ldquo;Continue in app →&rdquo;</p>
            <div className="bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden max-w-popup-narrow">
              <div className="flex items-center justify-between px-l py-m">
                <p className="font-semibold text-base text-text-title">Select chat model</p>
                <CloseButton onClose={() => {}} />
              </div>
              <div className="flex flex-col gap-s px-l pb-l">
{primaryModels.map((m) => <MockRow key={m.id} model={m} selected={m.id === 'llama-3'} />)}
                <div className="flex items-center justify-between gap-m px-m py-m rounded-card bg-white-05 border border-white-10 text-text-title">
                  <span className="text-base font-medium">Other models</span>
                  <ChevronIcon direction="right" size={20} />
                </div>
                <Button fullWidth className="gap-xxs">
                  <span>Continue in app</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-text-small mb-xs">Step 1 — DeepSeek V3 selected → CTA enabled</p>
            <div className="bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden max-w-popup-narrow">
              <div className="flex items-center justify-between px-l py-m">
                <p className="font-semibold text-base text-text-title">Select chat model</p>
                <CloseButton onClose={() => {}} />
              </div>
              <div className="flex flex-col gap-s px-l pb-l">
{primaryModels.map((m) => <MockRow key={m.id} model={m} selected={m.id === 'deepseek-v3'} />)}
                <div className="flex items-center justify-between gap-m px-m py-m rounded-card bg-white-05 border border-white-10 text-text-title">
                  <span className="text-base font-medium">Other models</span>
                  <ChevronIcon direction="right" size={20} />
                </div>
                <Button fullWidth>Continue chat</Button>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-text-small mb-xs">Step app-handoff — QR code shown after &ldquo;Continue in app&rdquo; tap on an appOnly model</p>
            <div className="bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden max-w-popup-narrow">
              <div className="flex items-center justify-between px-l py-m">
                <div className="flex items-center gap-xs">
                  <button aria-label="Back" className="-ml-icon-btn p-icon-btn rounded-full text-white-80 border-none bg-transparent">
                    <ChevronIcon direction="left" size={20} />
                  </button>
                  <p className="font-semibold text-base text-text-title">Select chat model</p>
                </div>
                <CloseButton onClose={() => {}} />
              </div>
              <div className="flex flex-col gap-l items-center px-l pb-l">
                <p className="text-sm text-text-body text-center">Scan the QR code to get the wsup app and chat with free models!</p>
                <div className="bg-white rounded-button p-l flex items-center justify-center size-[232px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/qr-placeholder.png" alt="QR code" width={148} height={148} className="object-contain" />
                </div>
                <button className="w-full mt-auto px-m py-xs rounded-pill text-sm font-medium text-white-80 bg-white-10 border border-white-10 backdrop-blur-[32px]">Back</button>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-text-small mb-xs">Step 2 — Other models + description + disabled CTA (no row selected)</p>
            <div className="bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden max-w-popup-narrow">
              <div className="flex items-center justify-between px-l py-m">
                <div className="flex items-center gap-xs">
                  <button aria-label="Back" className="-ml-icon-btn p-icon-btn rounded-full text-white-80 border-none bg-transparent">
                    <ChevronIcon direction="left" size={20} />
                  </button>
                  <p className="font-semibold text-base text-text-title">Select chat model</p>
                </div>
                <CloseButton onClose={() => {}} />
              </div>
              <div className="flex flex-col gap-s px-l pb-l">
                <div className="flex flex-col gap-xxs">
                  <p className="text-sm font-semibold text-text-title">Other models</p>
                  <p className="text-xs text-text-small leading-snug">
                    Less-popular alternatives. Pick one of these if the primary models don&apos;t fit your story.{' '}
                    <a className="link" href="#">Learn more</a>
                  </p>
                </div>
                {otherModels.map((m) => <MockRow key={m.id} model={m} selected={false} />)}
                <Button fullWidth disabled>Continue chat</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy + reuse map</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Container — BottomSheet (mobile) + CenterPopup (desktop) paired pattern, maxWidth 420px', 'Reuse: same primitives as ModelPickerSheet / BuyCreditsSheet / LoginSheet. Single PickerBody renders identical content into both sheets'],
            ['Surface — bg-profile-sheet-bg, rounded-popup (24px), border-white-10, shadow-popup', 'Codified centered-popup chrome (matches ModelPickerSheet, MemoryLimitPopup). No new surface tokens'],
            ['Header — "Select chat model" title + × on the right; px-l py-m', 'Custom header inside content (StepHeader-style precedent from BuyCreditsSheet); × calls onClose (cancel without commit)'],
            ['Two-step flow — useState<\'primary\' | \'other\'>; on every open, step resets to \'primary\' and draft resets to null (fresh new-chat picker)', 'Modeled on BuyCreditsSheet\'s multi-step pattern. Single sheet, internal step state, no router. Reset-on-open semantics distinguish ChatStyleSheet from ModelPickerSheet (which always reflects the currently-committed model)'],
            ['Step 1 (primary) — 4 model rows + Other disclosure + Continue chat CTA', '4 primary-tier models (Llama 3, Qwen Plus Character, DeepSeek V3, Claude Opus 4.6) drawn from MODELS.filter(m => m.tier === \'primary\'). Cross-app promo is now data-driven via per-row appOnly chips (Llama 3 has GradientChip "Available only in mobile app") + dynamic "Continue in app →" CTA — the standalone "Free models on mobile app" banner was removed in S31 since the row-level signal made it redundant. Other disclosure is a row-shaped button with right chevron. CTA = primary Button fullWidth with disabled={draft === null} — disabled until user taps a row, enabled after'],
            ['Step 2 (other) — header gets ← back arrow + heading + description-with-link + other model rows + disabled-until-selection Continue chat CTA', '3 other-tier models (Mistral Nemo, MiniMax M2 Her, DeepSeek V4 Pro). Description copy: "Less-popular alternatives. Pick one of these if the primary models don\'t fit your story. Learn more →". Header back arrow matches BuyCreditsSheet StepHeader pattern. Same disabled-until-selection CTA semantics as step 1'],
            ['ModelRow — shared from chat/ModelPickerInternals.tsx; chip visibility flagged via showSignal / showPersonality props', 'Same component as ModelPickerSheet — ChatStyleSheet passes showSignal={false} showPersonality={false} so this surface renders title + cost chip + description + CheckBadge only (no latency, no alias). ModelPickerSheet uses defaults (all 3 chips). Component stays identical; the surface decides what metadata to surface for its choice context'],
            ['Available-only-in-app chip — auto-rendered by ModelRow when model.appOnly is true', 'GradientChip primitive (also exported from ModelPickerInternals): same shape as Chip but uses WSUP brand gradient (from-gradient-purple/10 to-gradient-blue/10 bg + matching text gradient via bg-clip-text text-transparent). S31 tagged Llama 3 with appOnly: true since it\'s mobile-app-tier. Both pickers (ChatStyleSheet + ModelPickerSheet) auto-render the chip — data-driven, not surface-specific'],
            ['Selected state — ring-2 ring-accent + bg-accent/10 + CheckBadge absolute top-1/2 right-m', 'Same selection chrome as ModelPickerSheet. CheckBadge = 28px green circle with checkmark, distinct from Checkbox primitive (square 16px togglable role)'],
            ['Selection commit semantics — draft selection inside sheet (initially null); commits ONLY on Continue chat tap, NOT on row tap', 'Different from ModelPickerSheet (which auto-commits on row tap + closes immediately). The "starting a new chat" intent justifies the explicit CTA. Initial null draft enforces the disabled-CTA-until-selection behavior'],
            ['CTA disabled state — Button \'opacity-40 cursor-not-allowed\' (codified Button primitive disabled style)', 'Disabled until user picks a row. Once draft is set, CTA enables. Stays enabled even if user changes their pick (still selected)'],
            ['CTA dynamic label — "Continue chat" / "Continue in app →"', 'Label flips to "Continue in app" + right-arrow SVG when the selected model has model.appOnly === true (Llama 3 / Mistral Nemo). Same arrow path as the BuyCreditsPackagesStep "Continue on Patreon" button (M5 12h14M13 6l6 6-6 6) — codified WSUP cross-app handoff visual. Plain "Continue chat" with no icon when the selection is web-tier'],
            ['Step app-handoff — QR code + single Back pill button', 'Triggered when user taps "Continue in app" on an appOnly model. Same QR placeholder + 232px white card + glass pill Back button as BuyCreditsScanSteps.ScanQRStep — kept inline in ChatStyleSheet (single-use step) rather than extracted, since the credit-flow ScanQRStep takes a CreditPack prop that doesn\'t apply here. Copy: "Scan the QR code to get the wsup app and chat with free models!" — parallel structure to the buy-credits variant. Cancel was dropped (header × already handles dismissal); Back returns to the source step (primary or other based on draft.tier)'],
            ['Models data — lib/models.ts, 7 entries with tier: \'primary\' | \'other\'', 'S31 curation: 4 primary (Llama 3, Qwen Plus Character, DeepSeek V3, Claude Opus 4.6) + 3 other (Mistral Nemo, MiniMax M2 Her, DeepSeek V4 Pro). Tier renamed from \'advanced\' (premium framing) to \'other\' (less-popular framing) when the curation flipped — Claude Opus moved to primary, leaving the bucket as the secondary fallback set'],
            ['Trigger (demo) — chat dev state cycle, label "Model selection" (R toggle / Shift+R cycle)', 'Production trigger would be onClick of a "Start new chat" button in chat header / nav. Demo gates on chatState === \'chat-style-popup\' from R-key cycle alongside Memory full / Safety variants'],
            ['Z-index — 70 (matches ModelPickerSheet)', 'Above SafetyBanner overlay (20), above MemoryLimitOverlay anchored mode (30)'],
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
