'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import TokensTab from './sections/TokensTab'
import ComponentsTab from './sections/ComponentsTab'
import PatternsTab from './sections/PatternsTab'
import IconsTab from './sections/IconsTab'

const TABS = ['Tokens', 'Components', 'Patterns', 'Icons'] as const
type Tab = typeof TABS[number]

const NAV: Record<Tab, string[]> = {
  Tokens:     ['Colors', 'Typography', 'Spacing', 'Radius', 'Shadows', 'Blur', 'Utilities'],
  Components: ['Buttons', 'Forms', 'Tags & Cards', 'Coachmark', 'Character Card', 'Widgets', 'Category Tabs', 'Bottom Nav'],
  Patterns:   ['Header', 'Sidebar', 'Explore Description', 'FAQ Accordion', 'What is wsup.ai', 'Footer', 'Mobile Footer', 'Chat Header', 'Chat Messages', 'Chat Bar', 'Chat Right Sidebar'],
  Icons:      ['Size Scale', 'Navigation', 'Actions', 'Social', 'Status & Utility', 'Nav (Sidebar & BottomNav)', 'Chat Bar & Messages', 'Image Assets', 'Color Rules'],
}

const TAB_DEFAULTS: Record<Tab, string> = {
  Tokens: 'Colors',
  Components: 'Buttons',
  Patterns: 'Header',
  Icons: 'Size Scale',
}

export default function StyleGuide() {
  const [activeTab, setActiveTab] = useState<Tab>('Tokens')
  const [active, setActive] = useState('Colors')
  const [mounted, setMounted] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const onSectionVisible = useCallback((id: string) => setActive(id), [])
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="h-screen bg-page-bg" />

  const switchTab = (tab: Tab) => {
    setActiveTab(tab)
    setActive(TAB_DEFAULTS[tab])
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="h-screen bg-page-bg font-sans flex overflow-hidden">

      {/* ── Sticky sidebar nav ─────────────────────────────── */}
      <aside className="h-full w-[200px] shrink-0 border-r border-white-10 flex flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        {/* Tab switcher */}
        <div className="shrink-0 pt-8 px-s pb-s border-b border-white-10">
          <p className="label-xs mb-s px-xxs">Style Guide</p>
          <div className="flex flex-col gap-xxs">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className={`text-left text-xs px-xs py-xxs rounded-button transition-colors font-medium ${
                  activeTab === tab
                    ? 'bg-accent text-white'
                    : 'text-text-small hover:bg-white-05 hover:text-text-body'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Section nav */}
        <div className="flex-1 pt-s px-s flex flex-col gap-xxs">
          {NAV[activeTab].map(item => (
            <button
              key={item}
              onClick={() => {
                setActive(item)
                document.getElementById(item)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className={`text-left text-sm px-xs py-xxs rounded-pill transition-colors ${
                active === item
                  ? 'bg-white-10 text-text-title font-medium'
                  : 'text-text-small hover:bg-white-05 hover:text-text-body font-normal'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="shrink-0 pb-8 px-s">
          <p className="text-text-xxsmall text-xxs px-xxs leading-relaxed">
            wsup.ai<br />Design tokens
          </p>
        </div>
      </aside>

      {/* ── Main content ───────────────────────────────────── */}
      <main ref={mainRef} className="flex-1 overflow-y-auto px-12 py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        {/* Hero */}
        <div className="mb-14">
          <h1 className="text-white text-3xl font-semibold mb-2">
            wsup.ai{' '}
            <span style={{
              background: 'linear-gradient(90deg, var(--color-gradient-purple), var(--color-gradient-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Style Guide
            </span>
          </h1>
          <p className="text-text-body text-sm">Living reference for all design tokens and utility classes. Updated every session.</p>
        </div>

        {activeTab === 'Tokens'     && <TokensTab     onSectionVisible={onSectionVisible} />}
        {activeTab === 'Components' && <ComponentsTab  onSectionVisible={onSectionVisible} />}
        {activeTab === 'Patterns'   && <PatternsTab    onSectionVisible={onSectionVisible} />}
        {activeTab === 'Icons'      && <IconsTab       onSectionVisible={onSectionVisible} />}

      </main>
    </div>
  )
}
