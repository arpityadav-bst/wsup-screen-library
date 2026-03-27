'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'

export default function FooterSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Footer" title="Footer" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Columns</SubLabel>
        <div className="flex gap-xl text-sm">
          {[
            { heading: 'CATEGORIES', links: ['Recommended', 'Anime', 'Romantic', 'AI Games'] },
            { heading: 'COMPANY', links: ['About us', 'App Download'] },
            { heading: 'SUPPORT', links: ['AI Companion', 'Blog'] },
          ].map(col => (
            <div key={col.heading}>
              <p className="text-text-dim text-xxs font-semibold tracking-widest uppercase mb-m">{col.heading}</p>
              <ul className="flex flex-col gap-s">
                {col.links.map(l => (
                  <li key={l} className="text-text-body text-sm">{l}</li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-text-dim text-xxs font-semibold tracking-widest uppercase mb-m">FOLLOW US</p>
            <ul className="flex flex-col gap-s">
              {['Discord', 'Instagram', 'Reddit'].map(s => (
                <li key={s} className="text-text-body text-sm">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Copyright row</SubLabel>
        <div className="flex items-center justify-between border-t border-white-10 pt-m max-w-[600px]">
          <p className="text-text-xxsmall text-xs">© 2026 wsup.ai. All rights reserved.</p>
          <span className="text-text-xxsmall text-xs underline cursor-pointer">Your Privacy Choices</span>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Structure</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['bg-footer-bg', 'Footer bg token — #111111, darker than page-bg'],
            ['border-t border-white-10', 'Top divider'],
            ['text-text-dim text-xxs tracking-widest uppercase', 'Column headings (CATEGORIES, COMPANY…)'],
            ['text-text-body text-sm hover:text-text-title', 'Link items'],
            ['text-text-dim text-xxs tracking-widest uppercase', 'POLICIES label'],
            ['text-text-dim text-xs hover:text-text-small', 'Policy links'],
            ['text-text-xxsmall text-xs', 'Copyright — © 2026 wsup.ai'],
            ['text-text-xxsmall text-xs underline + group-hover:text-white-50', 'Your Privacy Choices (with privacy-choices.png image)'],
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
