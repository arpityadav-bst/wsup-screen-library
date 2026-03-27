'use client'

import { Section, SubLabel, PreviewBox, StateLabel } from '../../helpers'

export default function FormsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Forms" title="Forms" onVisible={onSectionVisible}>

      <div>
        <SubLabel>Text Input</SubLabel>
        <div className="flex flex-col gap-2 max-w-sm">
          <PreviewBox>
            <input
              readOnly
              suppressHydrationWarning
              placeholder="Type something..."
              className="w-full bg-forms-bg border border-forms-border rounded-card px-m py-s text-sm text-text-title placeholder:text-forms-text outline-none"
            />
          </PreviewBox>
          <StateLabel>Default</StateLabel>
        </div>
      </div>

      <div>
        <SubLabel>Textarea</SubLabel>
        <div className="flex flex-col gap-2 max-w-sm">
          <PreviewBox>
            <textarea
              readOnly
              suppressHydrationWarning
              placeholder="Type something..."
              rows={3}
              className="w-full bg-forms-bg border border-forms-border rounded-card px-m py-s text-sm text-text-title placeholder:text-forms-text outline-none resize-none"
            />
          </PreviewBox>
          <StateLabel>Default</StateLabel>
        </div>
      </div>

      <div>
        <SubLabel>Token Reference</SubLabel>
        <div className="flex flex-wrap gap-3">
          {[
            ['bg-forms-bg',           '#ffffff0d', 'Default bg'],
            ['border-forms-border',   '#ffffff1a', 'Default border'],
            ['border-forms-focus-border', '#82a1ff', 'Focus border'],
            ['border-forms-error-border', '#de5a48', 'Error border'],
            ['bg-forms-active-bg',    '#222132',   'Active bg'],
            ['bg-forms-disabled-bg',  '#888888',   'Disabled bg'],
          ].map(([token, hex, label]) => (
            <div key={token} className="flex flex-col gap-1">
              <div className="w-10 h-8 rounded-button border border-white-10" style={{ background: hex }} />
              <span className="text-xxs font-mono text-text-xsmall max-w-[80px] leading-tight">{token}</span>
              <span className="text-xxs text-text-xxsmall">{label}</span>
            </div>
          ))}
        </div>
      </div>

    </Section>
  )
}
