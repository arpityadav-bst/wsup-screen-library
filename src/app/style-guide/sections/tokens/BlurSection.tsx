'use client'

import { Section, Tag } from '../../helpers'

export default function BlurSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Blur" title="Backdrop Blur" onVisible={onSectionVisible}>
      <div className="flex flex-wrap gap-8">
        {[
          ['bg',    '12px',  'backdrop-blur-bg'],
          ['heavy', '120px', 'backdrop-blur-heavy'],
        ].map(([name, val, cls]) => (
          <div id={`token-blur-${name}`} key={name} className="flex flex-col gap-3">
            <div
              className="w-36 h-24 rounded-card border border-white-10 flex flex-col items-center justify-center gap-1"
              style={{ backdropFilter: `blur(${val})`, background: 'rgba(255,255,255,0.04)' }}
            >
              <span className="text-text-body text-xs">blur</span>
              <span className="text-white text-base font-medium">{val}</span>
            </div>
            <Tag>{cls}</Tag>
          </div>
        ))}
      </div>
    </Section>
  )
}
