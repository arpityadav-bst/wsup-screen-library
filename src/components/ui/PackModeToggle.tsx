'use client'

import Badge from '@/components/ui/Badge'
import { Tabs, Tab } from '@/components/ui/Tabs'

export type PackMode = 'one-time' | 'monthly'

interface PackModeToggleProps {
  mode: PackMode
  onChange: (mode: PackMode) => void
}

export default function PackModeToggle({ mode, onChange }: PackModeToggleProps) {
  return (
    <Tabs>
      <Tab active={mode === 'one-time'} onClick={() => onChange('one-time')}>
        One-time
      </Tab>
      <Tab active={mode === 'monthly'} onClick={() => onChange('monthly')}>
        Monthly
        <Badge variant="success" size="sm">+10% credits</Badge>
      </Tab>
    </Tabs>
  )
}
