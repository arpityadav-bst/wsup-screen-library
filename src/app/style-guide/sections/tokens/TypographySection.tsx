'use client'

import { Section, SubLabel, Tag, TokenCell } from '../../helpers'

export default function TypographySection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Typography" title="Typography" onVisible={onSectionVisible}>

      <div>
        <SubLabel>Font — Rubik</SubLabel>
        <div className="flex items-end gap-8 flex-wrap">
          {[
            ['300', 'Light'],
            ['400', 'Regular'],
            ['500', 'Medium'],
            ['600', 'Semi Bold'],
            ['700', 'Bold'],
          ].map(([w, label]) => (
            <div key={w} className="flex flex-col gap-2">
              <span style={{ fontWeight: w }} className="text-white text-4xl leading-none">Aa</span>
              <span className="text-text-small text-xs">{label}</span>
              <Tag>{w}</Tag>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Text Size Scale</SubLabel>
        <div className="flex flex-col gap-3 bg-white-05 border border-white-10 rounded-card p-5">
          {[
            ['text-xxs',  '10px', 'The quick brown fox jumps over the lazy dog'],
            ['text-xs',   '12px', 'The quick brown fox jumps over the lazy dog'],
            ['text-sm',   '14px', 'The quick brown fox jumps over the lazy dog'],
            ['text-base', '16px', 'The quick brown fox jumps over the lazy dog'],
            ['text-lg',   '18px', 'The quick brown fox jumps over the lazy dog'],
            ['text-xl',   '20px', 'The quick brown fox jumps over the lazy dog'],
            ['text-2xl',  '24px', 'The quick brown fox jumps'],
            ['text-3xl',  '30px', 'The quick brown fox'],
            ['text-4xl',  '36px', 'The quick brown fox'],
            ['text-5xl',  '48px', 'Quick brown fox'],
          ].map(([cls, px, sample]) => (
            <div key={cls} className="flex items-center gap-4">
              <span className={`text-white ${cls}`} style={{ minWidth: 340 }}>{sample}</span>
              <Tag>{cls}</Tag>
              <span className="text-text-xsmall text-xxs">{px}</span>
            </div>
          ))}
        </div>
        <div className="mt-s flex flex-col gap-xs text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m max-w-md">
          {[
            ['text-xxs (10px)', 'Custom token — labels, copyright, tags, badges'],
            ['text-xs (12px)', 'Tailwind default — nav items, metadata, secondary text'],
            ['text-sm (14px)', 'Tailwind default — primary body, buttons, inputs'],
            ['text-base (16px)', 'Tailwind default — FAQ, about section, footer headings'],
            ['text-lg–xl (18–20px)', 'Section headings, landing page subheadings'],
            ['text-2xl–5xl (24–48px)', 'Page titles, hero text, landing pages'],
          ].map(([token, usage]) => (
            <div key={token} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={token} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[55%]">{usage}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Text Color Tokens</SubLabel>
        <div className="flex flex-col gap-3 bg-white-05 border border-white-10 rounded-card p-5">
          {[
            ['#ffffff',     'text-title',    'The quick brown fox'],
            ['#ffffffcc',   'text-subtitle', 'The quick brown fox'],
            ['#ffffffb2',   'text-body',     'The quick brown fox'],
            ['#ffffff99',   'text-small',    'The quick brown fox'],
            ['#ffffff80',   'text-xsmall',   'The quick brown fox'],
            ['#ffffff66',   'text-dim',      'The quick brown fox'],
            ['#ffffff4d',   'text-xxsmall',  'The quick brown fox'],
          ].map(([color, cls, sample]) => (
            <div key={cls} className="flex items-center gap-4">
              <span className="text-base" style={{ color, minWidth: 220 }}>{sample}</span>
              <Tag>{cls}</Tag>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Utility Classes</SubLabel>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 bg-white-05 border border-white-10 rounded-card px-5 py-4">
            <span className="label-xs">Section Header Label</span>
            <Tag>label-xs</Tag>
            <span className="text-text-xsmall text-xs">10px · medium · text-small · tracked · uppercase</span>
          </div>
        </div>
      </div>

    </Section>
  )
}
