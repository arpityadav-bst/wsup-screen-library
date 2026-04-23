'use client'

import { useState } from 'react'
import { Section, SubLabel, PreviewBox, StateLabel } from '../../helpers'
import { Tabs, Tab } from '@/components/ui/Tabs'
import Badge from '@/components/ui/Badge'

function TokenRow({ token, desc }: { token: string; desc: string }) {
  return (
    <div className="flex items-baseline gap-xs">
      <code className="text-xxs text-accent-light font-mono shrink-0">{token}</code>
      <span className="text-xxs text-text-xsmall">{desc}</span>
    </div>
  )
}

export default function TabsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const [labelActive, setLabelActive] = useState<'one' | 'two'>('one')
  const [badgeActive, setBadgeActive] = useState<'one-time' | 'monthly'>('monthly')
  const [countActive, setCountActive] = useState<string>('Characters')

  const countTabs = [
    { label: 'Characters', count: 24 },
    { label: 'Stories', count: 3 },
    { label: 'Liked', count: 2400 },
  ]

  return (
    <Section id="Tabs" title="Tabs (underline)" onVisible={onSectionVisible}>
      <div className="min-w-[440px] flex-1">
        <SubLabel>Underline tabs — shared primitive</SubLabel>
        <div className="text-xs text-text-body mb-s leading-relaxed max-w-[520px]">
          Compound component <code className="text-accent-light">{'<Tabs>'}</code> + <code className="text-accent-light">{'<Tab>'}</code> from <code className="text-accent-light">src/components/ui/Tabs.tsx</code>. Active tab: font-semibold + text-text-title + accent underline under the content. Inactive: font-normal + text-text-dim. Underline matches the content width, not the full tab width. Used by ProfileTabBar and PackModeToggle.
        </div>

        <PreviewBox>
          <div className="w-[360px]">
            <Tabs>
              <Tab active={labelActive === 'one'} onClick={() => setLabelActive('one')}>One</Tab>
              <Tab active={labelActive === 'two'} onClick={() => setLabelActive('two')}>Two</Tab>
            </Tabs>
          </div>
        </PreviewBox>
        <StateLabel>Basic — two text-only tabs.</StateLabel>

        <div className="mt-m" />
        <PreviewBox>
          <div className="w-[360px]">
            <Tabs>
              <Tab active={badgeActive === 'one-time'} onClick={() => setBadgeActive('one-time')}>
                One-time
              </Tab>
              <Tab active={badgeActive === 'monthly'} onClick={() => setBadgeActive('monthly')}>
                Monthly
                <Badge variant="success" size="sm">+10% credits</Badge>
              </Tab>
            </Tabs>
          </div>
        </PreviewBox>
        <StateLabel>With a badge — PackModeToggle pattern. Underline widens to include the badge.</StateLabel>

        <div className="mt-m" />
        <PreviewBox>
          <div className="w-[360px]">
            <Tabs>
              {countTabs.map((t) => (
                <Tab key={t.label} active={countActive === t.label} onClick={() => setCountActive(t.label)}>
                  {t.label}
                  <span className="opacity-35">·</span>
                  <span className="tabular-nums">{t.count}</span>
                </Tab>
              ))}
            </Tabs>
          </div>
        </PreviewBox>
        <StateLabel>With counts — ProfileTabBar pattern. Underline matches label+count width, so "2400" gets a wider underline than "3".</StateLabel>

        <div className="mt-m flex flex-col gap-xxs">
          <TokenRow token="Tabs" desc="Outer container — flex w-full border-b border-white-10 (accepts className for sticky, bg overrides)" />
          <TokenRow token="Tab" desc="Single tab — active/onClick props, children = label + optional suffix (badge / count / dot)" />
          <TokenRow token="Active state" desc="font-semibold + text-text-title + accent underline (h-xxxs rounded-pill)" />
          <TokenRow token="Inactive state" desc="font-normal + text-text-dim (40%)" />
          <TokenRow token="Underline width" desc="Matches content via inline-flex inner span, absolute underline with left-0 right-0" />
          <TokenRow token="Padding" desc="Inside span: pt-xs pb-[10px]. Button has no vertical padding — keeps underline flush with border-b line" />
          <TokenRow token="Consumers" desc="ProfileTabBar (profile content tabs), PackModeToggle (buy-credits one-time/monthly)" />
        </div>
      </div>
    </Section>
  )
}
