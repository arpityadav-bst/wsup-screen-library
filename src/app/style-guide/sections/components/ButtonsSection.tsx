'use client'

import { Section, SubLabel, PreviewBox, StateLabel } from '../../helpers'
import Button from '@/components/ui/Button'
import CreditButton from '@/components/ui/CreditButton'

export default function ButtonsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Buttons" title="Buttons" onVisible={onSectionVisible}>

      <div>
        <SubLabel>Button Component</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Reusable component: <code className="text-accent-light">{'<Button>'}</code> in <code className="text-accent-light">src/components/ui/Button.tsx</code>. All variants use <code className="text-accent-light">font-medium</code>. Same size = same weight.</p>
        <div className="flex flex-wrap gap-6 items-end">
          {(['xs', 's', 'm', 'l'] as const).map((size) => (
            <div key={`p-${size}`} className="flex flex-col items-start gap-2">
              <PreviewBox>
                <div className="flex items-center gap-xs">
                  <Button size={size}>Primary</Button>
                  <Button variant="secondary" size={size}>Secondary</Button>
                  <Button variant="dark" size={size}>Dark</Button>
                </div>
              </PreviewBox>
              <StateLabel>{size.toUpperCase()}</StateLabel>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Primary</SubLabel>
        <div className="flex flex-wrap gap-6 items-start">
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><button className="bg-accent text-white text-sm font-medium px-xl py-s rounded-pill shadow-button leading-none">Button</button></PreviewBox>
            <StateLabel>Default</StateLabel>
          </div>
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><button className="bg-accent-hover text-white text-sm font-medium px-xl py-s rounded-pill shadow-button leading-none">Button</button></PreviewBox>
            <StateLabel>Hover</StateLabel>
          </div>
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><button className="bg-accent text-white/40 text-sm font-medium px-xl py-s rounded-pill leading-none cursor-not-allowed opacity-40">Button</button></PreviewBox>
            <StateLabel>Disabled</StateLabel>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Dark</SubLabel>
        <div className="flex flex-wrap gap-6 items-start">
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><button className="bg-accent-dark text-white text-sm font-medium px-xl py-s rounded-pill leading-none">Button</button></PreviewBox>
            <StateLabel>Default</StateLabel>
          </div>
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><button className="bg-accent-dark-hover text-white text-sm font-medium px-xl py-s rounded-pill leading-none">Button</button></PreviewBox>
            <StateLabel>Hover</StateLabel>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Secondary / Outlined</SubLabel>
        <div className="flex flex-wrap gap-6 items-start">
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><button className="bg-transparent border border-white-20 text-text-body text-sm font-medium px-xl py-s rounded-pill leading-none">Button</button></PreviewBox>
            <StateLabel>Default</StateLabel>
          </div>
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><button className="bg-white-05 border border-white-30 text-text-subtitle text-sm font-medium px-xl py-s rounded-pill leading-none">Button</button></PreviewBox>
            <StateLabel>Hover</StateLabel>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Section Action</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Used alongside <code className="text-accent-light">label-xs</code> section headings. Always uppercase, secondary color. Component: <code className="text-accent-light">SectionAction</code> in <code className="text-accent-light">src/components/ui/</code>.</p>
        <div className="flex flex-wrap gap-6 items-start">
          <div className="flex flex-col items-start gap-2">
            <PreviewBox>
              <div className="flex items-center gap-xl">
                <span className="label-xs">Badges · 10</span>
                <button className="text-secondary text-xxs font-medium tracking-[0.8px] uppercase">See all</button>
              </div>
            </PreviewBox>
            <StateLabel>In context</StateLabel>
          </div>
          <div className="flex flex-col items-start gap-2">
            <PreviewBox>
              <button className="text-secondary text-xxs font-medium tracking-[0.8px] uppercase">View all</button>
            </PreviewBox>
            <StateLabel>Standalone</StateLabel>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Filled / Inverted</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Used for active/toggled states like &quot;Following&quot; in social lists. White background with accent text. Pair with Secondary/Outlined for the inactive state.</p>
        <div className="flex flex-wrap gap-6 items-start">
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><button className="bg-white-80 text-accent text-sm font-medium px-m py-xs rounded-pill leading-none">Following</button></PreviewBox>
            <StateLabel>Active / Filled</StateLabel>
          </div>
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><button className="bg-transparent border border-white-20 text-text-body text-sm font-medium px-m py-xs rounded-pill leading-none">Follow back</button></PreviewBox>
            <StateLabel>Inactive / Outlined</StateLabel>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Link</SubLabel>
        <div className="flex flex-wrap gap-6 items-start">
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><button className="text-secondary text-sm font-medium leading-none">Button</button></PreviewBox>
            <StateLabel>Default</StateLabel>
          </div>
          <div className="flex flex-col items-start gap-2">
            <PreviewBox><button className="text-secondary-hover text-sm font-medium underline leading-none">Button</button></PreviewBox>
            <StateLabel>Hover</StateLabel>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Feature Row — Exception (non-pill)</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Used in coachmarks / feature callouts. Icon bg flush left/top/bottom, text padded right. Exception to the pill-only button rule.</p>
        <div className="flex flex-wrap gap-6 items-start">
          <div className="flex flex-col items-start gap-2">
            <PreviewBox>
              <button className="flex items-center gap-xs bg-white-10 rounded-button pr-xs overflow-hidden transition-colors w-[160px]">
                <div className="px-xs py-xs flex items-center justify-center shrink-0 bg-accent self-stretch" style={{borderRadius: 'var(--radius-button) 0 0 var(--radius-button)'}}>
                  <div className="w-[18px] h-[18px] rounded-sm bg-white-20" />
                </div>
                <span className="text-sm font-medium text-text-title leading-tight py-xs">Feature Name</span>
              </button>
            </PreviewBox>
            <StateLabel>Default</StateLabel>
          </div>
          <div className="flex flex-col items-start gap-2">
            <PreviewBox>
              <button className="flex items-center gap-xs bg-white-20 rounded-button pr-xs overflow-hidden transition-colors w-[160px]">
                <div className="px-xs py-xs flex items-center justify-center shrink-0 bg-accent self-stretch" style={{borderRadius: 'var(--radius-button) 0 0 var(--radius-button)'}}>
                  <div className="w-[18px] h-[18px] rounded-sm bg-white-20" />
                </div>
                <span className="text-sm font-medium text-text-title leading-tight py-xs">Feature Name</span>
              </button>
            </PreviewBox>
            <StateLabel>Hover</StateLabel>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Sizes</SubLabel>
        <div className="flex flex-wrap gap-6 items-start">
          {([
            ['text-xs px-s py-xxs', 'XS'],
            ['text-sm px-m py-xs', 'S'],
            ['text-sm px-xl py-s', 'M (default)'],
            ['text-base px-xxl py-m', 'L'],
          ] as const).map(([cls, label]) => (
            <div key={label} className="flex flex-col items-start gap-2">
              <PreviewBox>
                <button className={`bg-accent text-white font-medium rounded-pill leading-none ${cls}`}>Button</button>
              </PreviewBox>
              <StateLabel>{label}</StateLabel>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Header Icon Button</SubLabel>
        <p className="text-text-xsmall text-xs mb-4 max-w-sm">Icon-only circular button for utility actions in the header (notification, trophy, avatar). Same semantic tokens as Header Pill CTA.</p>
        <div className="flex flex-wrap gap-6 items-start">
          <div className="flex flex-col items-start gap-2">
            <PreviewBox>
              <button className="w-8 h-8 flex items-center justify-center border border-header-icon-border rounded-full hover:bg-header-icon-hover-bg transition-colors">
                <div className="w-[18px] h-[18px] rounded-sm bg-accent-light" />
              </button>
            </PreviewBox>
            <StateLabel>Default</StateLabel>
          </div>
          <div className="flex flex-col items-start gap-2">
            <PreviewBox>
              <button className="w-8 h-8 flex items-center justify-center border border-header-icon-border rounded-full bg-header-icon-hover-bg transition-colors">
                <div className="w-[18px] h-[18px] rounded-sm bg-accent-light" />
              </button>
            </PreviewBox>
            <StateLabel>Hover</StateLabel>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Credit Button — Primary (Paid Action)</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">For the single key paid action on a screen. Component: <code className="text-accent-light">CreditButton</code> in <code className="text-accent-light">src/components/ui/</code>.</p>
        <div className="flex flex-wrap gap-6 items-end">
          {(['xs', 's', 'm', 'l'] as const).map((size) => (
            <div key={size} className="flex flex-col items-start gap-2">
              <PreviewBox>
                <CreditButton label="Revive" credits={20} size={size} />
              </PreviewBox>
              <StateLabel>{size.toUpperCase()}</StateLabel>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Credit Button — Secondary (Repeated Actions)</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">For repeated paid actions in lists/grids. Outlined style to reduce visual noise when shown multiple times.</p>
        <div className="flex flex-wrap gap-6 items-end">
          {(['xs', 's', 'm', 'l'] as const).map((size) => (
            <div key={size} className="flex flex-col items-start gap-2">
              <PreviewBox>
                <CreditButton label="Revive" credits={20} size={size} variant="secondary" />
              </PreviewBox>
              <StateLabel>{size.toUpperCase()}</StateLabel>
            </div>
          ))}
        </div>
      </div>

    </Section>
  )
}
