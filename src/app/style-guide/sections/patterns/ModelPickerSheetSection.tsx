'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import CoinIcon from '@/components/ui/CoinIcon'
import CloseButton from '@/components/ui/CloseButton'
import CreditsBalancePill from '@/components/ui/CreditsBalancePill'
import { SignalIcon, CheckBadge, Chip } from '@/components/chat/ModelPickerInternals'
import { MODELS, DEFAULT_MODEL_ID, formatCost, type Model } from '@/lib/models'

function MockRow({ model, selected }: { model: Model; selected: boolean }) {
  return (
    <div className={`relative flex flex-col gap-xxs px-m py-s rounded-card w-full ${selected ? 'ring-2 ring-accent bg-accent/10' : 'bg-white-05 border border-white-10'}`}>
      <div className="flex items-center gap-xs flex-wrap min-w-0 pr-9">
        <span className="text-sm font-semibold text-text-title leading-[16px]">{model.name}</span>
        <Chip><SignalIcon complexity={model.complexity} /></Chip>
        <Chip>{model.personality}</Chip>
        <Chip icon={<CoinIcon size={10} />}>{formatCost(model.cost)}</Chip>
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

export default function ModelPickerSheetSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Model Picker Sheet" title="Model Picker Sheet" onVisible={onSectionVisible}>
      <div className="min-w-[440px] flex-1">
        <SubLabel>Mobile: BottomSheet · Desktop: CenterPopup (paired pattern, identical content). Opens from the model pill in ChatBar OR &quot;Switch LLMs&quot; in chat header menu.</SubLabel>
        <div className="bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden">
          <div className="flex items-center justify-between px-l py-m">
            <p className="font-semibold text-base text-text-title">Chat LLMs</p>
            <div className="flex items-center gap-s">
              <CreditsBalancePill label="Credits" value={498} />
              <CloseButton onClose={() => {}} />
            </div>
          </div>
          <div className="flex flex-col gap-s px-l pb-l">
            {MODELS.map((m) => <MockRow key={m.id} model={m} selected={m.id === DEFAULT_MODEL_ID} />)}
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy + reuse map</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Container — BottomSheet (mobile) + CenterPopup (desktop) paired pattern', 'Reuse: same primitives as BuyCreditsSheet/LoginSheet. Both sheets receive the same `open` state and render identical content. BottomSheet is `md:hidden` internally, CenterPopup is `hidden md:flex` — pair handles the responsive switch automatically'],
            ['Surface — bg-profile-sheet-bg, rounded-popup (24px), border-white-10, shadow-popup', 'Codified centered-popup chrome family (matches MemoryLimitPopup, BuyCreditsSheet). No new tokens'],
            ['Header — "Chat LLMs" left, [credits pill + ×] right; px-l py-m', 'Custom header inside content (same pattern as BuyCreditsSheet StepHeader); not the BottomSheet/CenterPopup `title` prop because the right cluster is non-standard'],
            ['Credits pill (header) — <CreditsBalancePill label="Balance" value={...} />', 'Componentized in S30 — same primitive used by StreakClaimPopup (Daily check-in). Anatomy: bg-white-10 rounded-pill px-xs py-xxxs · label text-xs · CoinIcon size 12 · value text-xs tabular-nums. Distinct from CreditsSummaryPill which pairs credits + price for purchase flows'],
            ['Row — bg-white-05 + border border-white-10 (default) / ring-2 ring-accent + bg-accent/10 (selected)', 'Selected-row chrome reuses CreditPackRow precedent (`ring-2 ring-accent`). bg-accent/10 = 10% indigo (#4a3ec6/10) over the dark surface — subtle tint, not loud'],
            ['Row content — title (text-sm font-semibold leading-[18px]) · 3 Chips (latency / personality / cost) · description (text-xs text-text-body)', 'Title + 3 chips row uses `items-center` (NOT items-baseline) because the chips have heterogeneous content types (signal=SVG-only, personality=text-only, cost=icon+text), and inline-flex baseline behavior differs across content types — items-baseline would shift the text-only chip below the SVG-only chip. items-center aligns box centers, which works because all 3 chips have identical box heights. Title gets `leading-[18px]` to match chip box height exactly so center alignment is pixel-clean. flex-wrap handles narrow viewports for long names'],
            ['Chip — local helper inside ModelPickerSheet (NOT the global Badge primitive)', 'bg-white-10 + rounded-[4px] (compact slight-roundness, between sharp rectangle and rounded-button) + px-xxs py-xxxs (4×2 padding) + gap-xxxs (2px internal) + text-xxs font-medium text-text-small + whitespace-nowrap. Uniform height across all 3 chips because they share the same padding and content height. Wraps signal/personality/cost so all three look like a coherent set. Local-not-primitive because Badge\'s pill style is still the right call for other surfaces (CreditSidebar, PackModeToggle); extracting a "Chip" primitive would force a global decision about pill-vs-rectangle that\'s not warranted yet'],
            ['Latency range chip — <Chip><SignalIcon complexity={...} /></Chip>', 'SignalIcon colors uniformly per model latency tier: complexity ≤ 2 → all bars green (fast), complexity = 3 → all bars yellow (medium), complexity = 4 → all bars red (slow). Bars are 1px wide × 1px gap, varying heights (4/6/8 in a 14-tall viewBox) so the tallest bar leaves visible top + bottom breathing room inside the chip'],
            ['Personality chip — <Chip>{personality}</Chip>', 'Examples: Classic, Weaver, Strategist, Storyteller, Luminary, Architect, Visionary'],
            ['Cost chip — <Chip icon={<CoinIcon size={10} />}>{formatCost(cost)}</Chip>', 'Renders "Free" (cost=null) or "X / msg" via formatCost helper. Coin (size 10) precedes the value'],
            ['SignalIcon — 3 vertical pill bars at h=4/6/8 (small/medium/tall) in a 10×14 viewBox; 2px wide × 2px gap; rx=1 vertical-pill shape. All 3 bars uniformly colored per model: complexity 1-2 = fill-status-success (green), 3 = fill-status-warning (yellow), 4 = fill-status-alert (red). Bars bottom-aligned at y=12 (2px bottom padding), tallest bar tops at y=4 (4px top padding) — gives visible breathing room above + below the bars inside the chip', 'Iterated three times in S30: original 4-bar X-of-N meter → static 3-color spectrum (one pass) → per-model uniform coloring with reduced bar heights (current). The reduced max bar height fixed the chip-uniformity perception — when the SignalIcon\'s tallest bar filled the full SVG, the signal chip read as visually "stretched" compared to text chips where text glyphs sit inside line-height padding. Reducing tallest bar to ~57% of SVG height matches text chips\' fill ratio'],
            ['CheckBadge — 28px circle, bg-status-success, embedded checkmark glyph (14px stroke 1.75)', 'New element (inline, not extracted) — single-use selected-state indicator. Distinct from Checkbox primitive (square 16px) because the role is "selected badge" not "togglable input"'],
            ['Selection behavior — clicking a row calls onSelect(id) AND onClose() — sheet dismisses on selection', 'Single-tap commit pattern. No confirm step; selection is a model preference change, not a destructive action. Pairs with the in-place pill update in ChatBar (label re-renders to the new model name)'],
            ['Entry points — ChatBar model pill onClick + ChatHeaderMenu "Switch LLMs"', 'Two affordances per the *passive vs active entry* taste rule (S30): the in-context pill is the on-demand entry, the menu item is the menu-level entry. Both fire the same handler in chat/page.tsx'],
            ['Z-index — sheets at 70 (above SafetyBanner at 20, above MemoryLimitPopup\'s anchored mode at 30)', 'Picker is the highest-priority foreground UI when summoned — covers everything else'],
            ['Mock data — lib/models.ts MODELS array (7 entries)', 'Mirrors production wsup.ai lineup. Each model: id, name, personality, cost (null=Free | number=credits/msg), complexity (1-4 drives signal bars), description'],
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
