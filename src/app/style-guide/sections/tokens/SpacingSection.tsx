'use client'

import { Section, SubLabel, Tag } from '../../helpers'

export default function SpacingSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Spacing" title="Spacing" onVisible={onSectionVisible}>
      <div>
        <SubLabel>Scale</SubLabel>
        <div className="flex flex-col gap-3">
          {[
            ['xxxs', '2px'],
            ['xxs',  '4px'],
            ['xs',   '8px'],
            ['s',    '12px'],
            ['m',    '16px'],
            ['l',    '20px'],
            ['xl',   '24px'],
            ['xxl',  '32px'],
            ['xxxl', '40px'],
          ].map(([name, val]) => (
            <div id={`token-spacing-${name}`} key={name} className="flex items-center gap-4">
              <div className="w-8 text-right">
                <Tag>{name}</Tag>
              </div>
              <div className="bg-accent-light rounded-sm shrink-0" style={{ width: val, height: '10px' }} />
              <span className="text-text-xsmall text-xs">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
