'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import Button from '@/components/ui/Button'
import CloseButton from '@/components/ui/CloseButton'
import ChevronIcon from '@/components/ui/ChevronIcon'
import { ChatStyleAvatar } from '@/components/chat/ChatStyleAvatars'
import { MODELS, type Model } from '@/lib/models'

function MockRow({ model, selected }: { model: Model; selected: boolean }) {
  return (
    <div className={`flex items-center gap-m px-m py-s rounded-card w-full ${selected ? 'ring-2 ring-accent bg-accent/10' : 'bg-white-05 border border-white-10'}`}>
      <ChatStyleAvatar personality={model.personality} />
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold text-text-title leading-tight">{model.name}</p>
        <p className="text-xs text-text-small leading-tight mt-xxxs">{model.tagline}</p>
      </div>
    </div>
  )
}

export default function ChatStyleSheetSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const currentModels = MODELS.filter((m) => m.tier === 'current')
  const legacyModels = MODELS.filter((m) => m.tier === 'legacy')

  return (
    <Section id="Chat Style Sheet" title="Chat Style Sheet" onVisible={onSectionVisible}>
      <div className="min-w-[440px] flex-1">
        <SubLabel>Two-step model picker — &quot;dumbed-down for general users&quot; counterpart to ModelPickerSheet. Triggered on starting a new chat (mocked via R-key dev state &quot;Model selection&quot;)</SubLabel>

        <div className="flex flex-col gap-l">
          <div>
            <p className="text-xs text-text-small mb-xs">Step 1 — Current models + Legacy disclosure + Continue chat CTA</p>
            <div className="bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden max-w-popup-narrow">
              <div className="flex items-center justify-between px-l py-m">
                <p className="font-semibold text-base text-text-title">Chat style</p>
                <CloseButton onClose={() => {}} />
              </div>
              <div className="flex flex-col gap-s px-l pb-l">
                {currentModels.map((m) => <MockRow key={m.id} model={m} selected={m.id === 'claude-opus-4-6'} />)}
                <div className="flex items-center justify-between gap-m px-m py-m rounded-card bg-white-05 border border-white-10 text-text-title">
                  <span className="text-base font-medium">Legacy models</span>
                  <ChevronIcon direction="right" size={20} />
                </div>
                <Button fullWidth>Continue chat</Button>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-text-small mb-xs">Step 2 — Legacy models + description + Back/Continue buttons</p>
            <div className="bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden max-w-popup-narrow">
              <div className="flex items-center justify-between px-l py-m">
                <div className="flex items-center gap-xs">
                  <button aria-label="Back" className="-ml-icon-btn p-icon-btn rounded-full text-white-80 border-none bg-transparent">
                    <ChevronIcon direction="left" size={20} />
                  </button>
                  <p className="font-semibold text-base text-text-title">Chat style</p>
                </div>
                <CloseButton onClose={() => {}} />
              </div>
              <div className="flex flex-col gap-s px-l pb-l">
                <div className="flex flex-col gap-xxs">
                  <p className="text-sm font-semibold text-text-title">Legacy models</p>
                  <p className="text-xs text-text-small leading-snug">
                    Enjoy these classics while we roll out the next generation for you.{' '}
                    <a className="link" href="#">Learn more</a>
                  </p>
                </div>
                {legacyModels.map((m) => <MockRow key={m.id} model={m} selected={m.id === 'mistral-nemo'} />)}
                <Button fullWidth>Continue chat</Button>
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
            ['Header — "Chat style" title + × on the right; px-l py-m', 'Custom header inside content (StepHeader-style precedent from BuyCreditsSheet); × calls onClose (cancel without commit), NOT onCommit (which would apply draft selection)'],
            ['Two-step flow — useState<\'current\' | \'legacy\'>; on open, initial step matches the currently-selected model\'s tier', 'Modeled on BuyCreditsSheet\'s multi-step pattern (\'packages\' / \'payment\' / \'scan\' / \'result\'). Single sheet, internal step state, no router'],
            ['Step 1 (current) — 3 model rows + Legacy disclosure + Continue chat CTA', '3 current-tier models (MiniMax M2 Her, DeepSeek V4 Pro, Claude Opus 4.6) drawn from MODELS.filter(m => m.tier === \'current\'). Legacy disclosure is a row-shaped button with right chevron. CTA = primary Button fullWidth, label "Continue chat" (consistent across both steps — single-action commit)'],
            ['Step 2 (legacy) — header gets ← back arrow + heading + description-with-link + 4 model rows + Continue chat full-width CTA', '4 legacy-tier models (Llama 3, Mistral Nemo, Qwen Plus, DeepSeek V3). Description copy mirrors c.ai: "Enjoy these classics while we roll out the next generation for you. Learn more →." Header back arrow matches BuyCreditsSheet\'s codified multi-step pattern (StepHeader); bottom Back button removed to avoid duplicate-affordance redundancy. Single full-width primary CTA at bottom'],
            ['ChatStyleRow — local helper, NOT exported. Avatar (40px circle) + name (text-base font-semibold) + tagline (text-xs text-text-small) on right column', 'Distinct anatomy from ModelPickerSheet\'s ModelRow (which uses 3 inline chips). This row is the "general users" version: avatar + 2 lines of text, no per-model latency/cost detail. Two row variants for two audiences'],
            ['Avatar — 40px circle, bg-white-10, personality-mapped icon inside (one of 7)', 'Initially mapped by complexity tier (bolt/atom/sparkle), but that produced duplicates within a tier (DeepSeek V4 Pro and Claude Opus 4.6 both got SparkleIcon). Switched to personality-based mapping in S30 — each of the 7 personalities (Classic/Weaver/Strategist/Storyteller/Luminary/Architect/Visionary) gets a distinct glyph: bolt / interlocked rings / crosshair / book / 5-point star / isometric cube / eye. Icon set lives in chat/ChatStyleAvatars.tsx (shared by sheet + style guide). Still keeps WSUP visual cohesion (single shared icon set, geometric line-art style) — just sized at the personality granularity rather than tier granularity'],
            ['Selected state — ring-2 ring-accent + bg-accent/10', 'Same selection chrome as ModelPickerSheet (codified WSUP convention). Ring lives outside the box; matches CreditPackRow precedent'],
            ['Selection commit semantics — draft selection inside sheet; commits ONLY on Start/Continue tap, NOT on row tap', 'Different from ModelPickerSheet (which commits on row tap + closes immediately). The "starting a new chat" intent justifies the explicit CTA — also gives Back button a meaningful undo affordance on the legacy step'],
            ['Tier + tagline data — added to lib/models.ts Model interface', 'tier: \'current\' | \'legacy\' filters models for step 1 vs step 2. tagline: short c.ai-style descriptor (≤6 words ideal) shown in row\'s second line. Distinct from description (longer, used in ModelPickerSheet rows)'],
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
