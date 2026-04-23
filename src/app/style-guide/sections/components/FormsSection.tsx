'use client'

import { useState } from 'react'
import { Section, SubLabel, PreviewBox, StateLabel } from '../../helpers'
import FormInput from '@/components/ui/FormInput'
import FormTextarea from '@/components/ui/FormTextarea'
import SelectionPillGroup from '@/components/ui/SelectionPillGroup'
import Checkbox from '@/components/ui/Checkbox'

export default function FormsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const [demoChecked, setDemoChecked] = useState(true)
  return (
    <Section id="Forms" title="Forms" onVisible={onSectionVisible}>

      <div>
        <SubLabel>FormInput Component</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Reusable input with label and helper text. Component: <code className="text-accent-light">{'<FormInput>'}</code> in <code className="text-accent-light">src/components/ui/FormInput.tsx</code></p>
        <div className="flex flex-col gap-4 max-w-sm">
          <PreviewBox>
            <FormInput label="Name" value="Cyberpunk DJ" required />
          </PreviewBox>
          <PreviewBox>
            <FormInput label="Character Age (18+)" value="18" required helperText="Minor characters (under 18 years old) are not allowed." />
          </PreviewBox>
        </div>
      </div>

      <div>
        <SubLabel>FormTextarea Component</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Textarea with label, AI generate link, and character counter. Component: <code className="text-accent-light">{'<FormTextarea>'}</code> in <code className="text-accent-light">src/components/ui/FormTextarea.tsx</code></p>
        <div className="flex flex-col gap-4 max-w-sm">
          <PreviewBox>
            <FormTextarea label="Bio" placeholder="Example: Tall and athletic..." required maxLength={2000} aiGenerate />
          </PreviewBox>
          <PreviewBox>
            <FormTextarea label="Tags (upto 5)" placeholder="Example: Athletic, Tall..." required maxLength={100} rows={3} aiGenerate />
          </PreviewBox>
        </div>
      </div>

      <div>
        <SubLabel>Checkbox Component</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">16×16 toggle. Component: <code className="text-accent-light">{'<Checkbox>'}</code> in <code className="text-accent-light">src/components/ui/Checkbox.tsx</code>. Variants: <code className="text-accent-light">primary</code> (accent purple — for T&C, general toggles) · <code className="text-accent-light">success</code> (green — for selected-item indicators like payment method).</p>
        <div className="flex gap-6 items-center">
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><Checkbox checked={demoChecked} onChange={setDemoChecked} /></PreviewBox>
            <StateLabel>Primary · interactive</StateLabel>
          </div>
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><Checkbox checked={false} onChange={() => {}} /></PreviewBox>
            <StateLabel>Primary · unchecked</StateLabel>
          </div>
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><Checkbox checked variant="success" /></PreviewBox>
            <StateLabel>Success · selected indicator</StateLabel>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>SelectionPillGroup Component</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Radio-style exclusive selection pills. Component: <code className="text-accent-light">{'<SelectionPillGroup>'}</code> in <code className="text-accent-light">src/components/ui/SelectionPillGroup.tsx</code></p>
        <div className="flex flex-col gap-4 max-w-sm">
          <PreviewBox>
            <SelectionPillGroup
              label="Gender"
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Others', value: 'others' },
              ]}
              value="male"
              required
            />
          </PreviewBox>
          <PreviewBox>
            <SelectionPillGroup
              label="Chat Filter"
              options={[
                { label: 'Filtered', value: 'filtered', description: 'Safe for all audiences' },
                { label: 'Unfiltered', value: 'unfiltered', description: 'Mature themes allowed' },
              ]}
              value="unfiltered"
              required
            />
          </PreviewBox>
        </div>
      </div>

      <div>
        <SubLabel>Raw Input (Base Pattern)</SubLabel>
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
        <SubLabel>Raw Textarea (Base Pattern)</SubLabel>
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
