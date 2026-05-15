'use client'

import { useState } from 'react'
import { Section, SubLabel, TokenCell } from '../../helpers'
import VariantSwitcherPills from '@/components/ui/VariantSwitcherPills'

export default function VariantSwitcherPillsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const [current, setCurrent] = useState('1')

  return (
    <Section id="Variant Switcher Pills" title="Variant Switcher Pills" onVisible={onSectionVisible}>
      <div className="w-full">
        <SubLabel>Designer-facing toggle for surfaces that ship multiple variants (LoginSheet&apos;s standard vs promo, DownloadDataSheet&apos;s result success/failure, etc.). Glass-style pill (bg-black-55 + backdrop-blur) reads cleanly over any background. Positioned by the consumer — typically <code className="text-accent-light">absolute</code> above the popup chrome via <code className="text-accent-light">{'bottom: calc(100% + 10px)'}</code>. NOT a production user-facing surface — should only render when an <code className="text-accent-light">onVariantChange</code> handler is passed (i.e., when active variant comparison is happening).</SubLabel>

        <div className="bg-page-bg rounded-card border border-white-10 p-l flex items-center justify-center" style={{ minHeight: '100px' }}>
          <VariantSwitcherPills
            current={current}
            variants={[
              { id: '1', label: '1' },
              { id: '2', label: '2' },
            ]}
            onChange={setCurrent}
          />
        </div>
      </div>

      <div className="w-full">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Container — rounded-pill bg-black-55 + backdrop-blur-bg + border-white-10', 'Glass chrome reads cleanly over any background. Compact padding (px-xxs py-xxxs).'],
            ['"VARIANT" label — text-xxs uppercase tracking-[0.4px] text-white-40', 'Eyebrow text setting context for the buttons. Always-on, fixed left.'],
            ['Variant buttons — text-xs leading-none px-xs py-xxs rounded-pill', 'Selected state: bg-white + text-black + font-medium. Unselected: bg-transparent + text-white-60 + hover:bg-white-10. Each variant pre-defined { id, label } pair.'],
            ['Position — consumer-provided className + style props', 'Typical: `absolute right-0` on a relative parent + `bottom: calc(100% + 10px)` to float above the surface. See LoginSheet&apos;s desktop+mobile placement for the canonical pattern.'],
            ['Render gate — only when `onChange` handler is provided', 'Production renders surfaces with a single variant (no pill); designer-facing previews wire `onChange` to activate the toggle. Pill never ships to end users.'],
            ['Current consumers', 'LoginSheet (variantSwitcher prop, used by StreakClaimPopup &rarr; LoginSheet on /explore for daily-claim variant comparison). Available for any future surface that ships multiple variants.'],
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
