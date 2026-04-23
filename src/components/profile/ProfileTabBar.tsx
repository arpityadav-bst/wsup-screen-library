'use client'

import { Tabs, Tab } from '@/components/ui/Tabs'

interface ProfileTabBarProps {
  tabs: { label: string; count: number }[]
  active: string
  onChange: (tab: string) => void
}

export default function ProfileTabBar({ tabs, active, onChange }: ProfileTabBarProps) {
  return (
    <Tabs className="mt-m md:mt-0 shrink-0 sticky top-0 z-[5] bg-page-bg">
      {tabs.map((tab) => (
        <Tab key={tab.label} active={tab.label === active} onClick={() => onChange(tab.label)}>
          {tab.label}
          <span className="opacity-35">·</span>
          <span className="tabular-nums">{tab.count}</span>
        </Tab>
      ))}
    </Tabs>
  )
}
