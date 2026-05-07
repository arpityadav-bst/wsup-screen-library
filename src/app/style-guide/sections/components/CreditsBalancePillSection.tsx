'use client'

import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'
import CreditsBalancePill from '@/components/ui/CreditsBalancePill'

export default function CreditsBalancePillSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Credits Balance Pill" title="Credits Balance Pill" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Default — &quot;Balance&quot; label (StreakClaimPopup usage)</SubLabel>
        <PreviewBox>
          <CreditsBalancePill label="Balance" value={10} />
        </PreviewBox>

        <div className="mt-l">
          <SubLabel>&quot;Credits&quot; label variant (ModelPickerSheet usage)</SubLabel>
        </div>
        <PreviewBox>
          <CreditsBalancePill label="Credits" value={498} />
        </PreviewBox>

        <div className="mt-l">
          <SubLabel>Larger value</SubLabel>
        </div>
        <PreviewBox>
          <CreditsBalancePill label="Balance" value={12480} />
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['API: <CreditsBalancePill label value />', 'Two-prop primitive — caller decides the label text ("Balance", "Credits", anything else). Value renders with tabular-nums for clean digit alignment'],
            ['Surface: bg-white-10 rounded-pill px-xs py-xxxs shrink-0', 'Compact pill — sits in popup/sheet headers next to titles. Subtle bg, no border. Pill radius (9999px) reads as a tight badge, distinct from button-rounded chrome'],
            ['Layout: flex items-center gap-xs · [label] [coin-12 + value]', 'Two visual groups separated by gap-xs (4px): the label text, then the coin+value cluster. Inside the cluster, gap-xxxs (2px) keeps coin and number tight'],
            ['Label: text-xs text-text-small', '12px font, dimmed text color — subordinate to the value'],
            ['Coin: <CoinIcon size={12} />', 'Reuses CoinIcon primitive. Small (12px) so the pill stays tight'],
            ['Value: text-xs text-text-title tabular-nums', '12px, full text-title color (100% white). tabular-nums prevents value-width jitter as the number changes'],
            ['Distinct from CreditsSummaryPill', 'CreditsSummaryPill pairs credits + price for purchase-flow surfaces (BuyCreditsSheet PaymentStep). CreditsBalancePill is display-only "X credits" for header pills (StreakClaimPopup, ModelPickerSheet header). Two primitives because two roles'],
            ['Codified S30: extracted from StreakClaimPopup\'s private BalancePill function once a second consumer (ModelPickerSheet header) appeared', 'Was inline composition + private function in StreakClaimPopup; promoted to ui/ primitive when the second use landed. Per Gate 3 *componentize at 2*'],
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
