'use client'

import DevStateToggle, { DevStateOption } from '@/components/ui/DevStateToggle'

export type DemoFlow = 'default' | 'onboarding'

interface ExploreDevPanelProps {
  open: boolean
  isLoggedIn: boolean
  setIsLoggedIn: (v: boolean) => void
  demoFlow: DemoFlow
  setDemoFlow: (flow: DemoFlow) => void
}

const AUTH_OPTIONS: { label: string; value: boolean }[] = [
  { label: 'Logged in', value: true },
  { label: 'Not logged in', value: false },
]

const FLOW_OPTIONS: { label: string; value: DemoFlow }[] = [
  { label: 'Default', value: 'default' },
  { label: 'Onboarding', value: 'onboarding' },
]

// Two-axis dev panel for /explore — Auth (top) + Demo flow (bottom).
// Mirrors ChatDevPanel's pattern: each axis renders its own section header, options are radio-shaped.
// "Onboarding" launches the onboarding overlay; "Default" returns to the plain explore page.
export default function ExploreDevPanel({ open, isLoggedIn, setIsLoggedIn, demoFlow, setDemoFlow }: ExploreDevPanelProps) {
  return (
    <DevStateToggle open={open} title="Auth" hint="R toggle · Shift+R flip">
      {AUTH_OPTIONS.map(({ label, value }) => (
        <DevStateOption key={label} active={isLoggedIn === value} onClick={() => setIsLoggedIn(value)}>
          {label}
        </DevStateOption>
      ))}
      <div className="h-px bg-white-10 my-xxs" aria-hidden />
      <span className="text-xxs font-semibold text-text-dim uppercase tracking-[0.8px] mb-xxs">Demo flow</span>
      {FLOW_OPTIONS.map(({ label, value }) => (
        <DevStateOption key={value} active={demoFlow === value} onClick={() => setDemoFlow(value)}>
          {label}
        </DevStateOption>
      ))}
    </DevStateToggle>
  )
}
