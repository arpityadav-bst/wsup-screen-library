'use client'

import { Section, SubLabel, Tag, TokenCell } from '../../helpers'

export default function CategoryTabsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Category Tabs" title="Category Tabs" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>States</SubLabel>
        <div className="flex items-center gap-xs flex-wrap">
          <button className="shrink-0 px-m py-xs rounded-pill text-sm font-medium border border-secondary text-secondary bg-transparent whitespace-nowrap">
            Recommended
          </button>
          <button className="shrink-0 px-m py-xs rounded-pill text-sm font-medium border border-white-20 text-text-body bg-transparent whitespace-nowrap">
            Anime
          </button>
          <button className="shrink-0 px-m py-xs rounded-pill text-sm font-medium border border-white-30 text-text-body bg-white-05 whitespace-nowrap">
            Hover
          </button>
        </div>
        <div className="flex gap-3 mt-3">
          <Tag>Active: border-secondary / text-secondary</Tag>
          <Tag>Inactive: border-white-20 / text-text-body</Tag>
          <Tag>Hover: border-white-30 / bg-white-05</Tag>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['px-m py-xs / rounded-pill', 'Secondary outline S size'],
            ['text-sm font-medium', 'Label typography'],
            ['border-secondary / text-secondary', 'Active state — #82a1ff'],
            ['border-white-20 / text-text-body', 'Inactive state'],
            ['hover:bg-white-05 / hover:border-white-30', 'Hover state'],
            ['tabs-scroll (.tabs-scroll class)', 'Wrapper: overflow-x auto, scrollbar hidden'],
            ['w-max inner flex div', 'Inner row expands beyond container width'],
            ['drag-to-scroll (mousedown/move/up)', 'Drag-to-scroll via JS handlers'],
            ['hasDragged ref', 'Prevents tab click after drag'],
            ['custom JS scrollbar div', 'opacity-0 → opacity-100 on hover, 3px tall'],
            ['pb-[11px] -mb-[11px]', 'Pre-allocated scrollbar space — no layout shift'],
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
