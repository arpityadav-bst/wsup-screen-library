'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import StatusResultIcon from '@/components/ui/StatusResultIcon'

export default function StatusResultIconSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Status Result Icon" title="Status Result Icon" onVisible={onSectionVisible}>
      <div className="w-full">
        <SubLabel>72×72 circular status icon for the head of result steps. Used by BuyCreditsResultStep and DownloadDataSheet&apos;s ResultStep. Two variants: success (green ✓) and failure (red ✕). Extracted at S34 audit pass (Gate 3 — 3 consumers including the style guide mockup).</SubLabel>

        <div className="flex items-center gap-l p-l bg-page-bg rounded-card border border-white-10">
          <div className="flex flex-col items-center gap-xs">
            <StatusResultIcon variant="success" />
            <span className="text-xxs text-text-xsmall uppercase tracking-[0.4px]">Success</span>
          </div>
          <div className="flex flex-col items-center gap-xs">
            <StatusResultIcon variant="failure" />
            <span className="text-xxs text-text-xsmall uppercase tracking-[0.4px]">Failure</span>
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Container — size-[72px] rounded-full', '72×72 circle. Same size on both variants. Sits at the head of result steps to anchor the visual hierarchy (icon → title → body → CTA).'],
            ['Success chrome — bg-status-success/[0.15] + border border-status-success/[0.30]', '15% fill + 30% border at the status-success token. Strong enough to be recognizably positive without competing with the page background.'],
            ['Failure chrome — bg-status-alert/[0.15] + border border-status-alert/[0.30]', '15% fill + 30% border at the status-alert token. Same opacity ratios as success — the variant difference is purely the status color.'],
            ['Success glyph — 32×32 ✓ checkmark, text-status-success, strokeWidth 2.5', 'Slightly larger SVG (32) than failure (28) because the checkmark\'s mass is concentrated to one side; without the boost it reads visually lighter than the evenly-distributed X.'],
            ['Failure glyph — 28×28 ✕ cross, text-status-alert, strokeWidth 2.5', 'Same strokeWidth as success for visual weight parity; smaller box because the X distributes mass evenly across both axes and would feel heavier than the checkmark at matched size.'],
            ['Sibling-inheritance with BuyCreditsResultStep / DownloadDataSheet', 'Single primitive consumed by both. Anatomy below the icon (title, body, CTA) is per-step; only the icon itself is shared.'],
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
