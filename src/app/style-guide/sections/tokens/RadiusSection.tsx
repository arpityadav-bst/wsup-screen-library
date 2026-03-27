'use client'

import { Section, Tag } from '../../helpers'

export default function RadiusSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Radius" title="Border Radius" onVisible={onSectionVisible}>
      <div className="flex flex-wrap gap-8 items-end">
        {[
          ['button', '8px'],
          ['card',   '12px'],
          ['popup',  '24px'],
          ['pill',   '9999px'],
        ].map(([name, val]) => (
          <div id={`token-radius-${name}`} key={name} className="flex flex-col items-center gap-3">
            <div
              className="w-20 h-20 bg-white-10 border border-white-20 flex items-center justify-center"
              style={{ borderRadius: val }}
            />
            <Tag>{name}</Tag>
            <span className="text-text-xsmall text-xxs">{val}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}
