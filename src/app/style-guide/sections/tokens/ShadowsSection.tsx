'use client'

import { Section, Tag } from '../../helpers'

export default function ShadowsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Shadows" title="Shadows" onVisible={onSectionVisible}>
      <div className="flex flex-wrap gap-10 items-end">
        {[
          ['small',  '0 1px 4px rgba(0,0,0,0.3)'],
          ['normal', '0 4px 12px rgba(0,0,0,0.4)'],
          ['big',    '0 8px 32px rgba(0,0,0,0.6)'],
          ['button', '0 2px 8px rgba(74,62,198,0.4)'],
          ['dark',   '0 4px 16px rgba(0,0,0,0.8)'],
        ].map(([name, val]) => (
          <div id={`token-shadow-${name}`} key={name} className="flex flex-col items-center gap-3">
            <div
              className="w-20 h-20 bg-white-10 rounded-card"
              style={{ boxShadow: val }}
            />
            <Tag>{name}</Tag>
          </div>
        ))}
      </div>
    </Section>
  )
}
