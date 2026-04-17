'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'

export default function HeaderSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Header" title="Header" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Preview</SubLabel>
        <div className="bg-page-bg border border-white-10 rounded-card overflow-hidden">
          <div className="flex items-center px-m gap-m h-[60px] border-b border-white-10 relative">
            {/* Logo */}
            <div className="shrink-0 w-[180px] pl-xs">
              <img src="/logo.png" alt="wsup.ai" width={104} height={24} className="object-contain" />
            </div>
            {/* Search */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[320px]">
              <div className="flex items-center gap-xs bg-white-05 border border-white-10 rounded-full px-m h-[40px]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <circle cx="7" cy="7" r="5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                  <path d="M11 11L14 14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="text-text-dim text-sm">Search a <span style={{ background: 'linear-gradient(90deg, var(--color-gradient-purple), var(--color-gradient-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>character</span></span>
              </div>
            </div>
            {/* Right */}
            <div className="flex items-center gap-s ml-auto shrink-0 relative z-10">
              <button className="w-8 h-8 flex items-center justify-center border border-header-icon-border rounded-full">
                <div className="w-[18px] h-[18px] rounded-sm bg-white-10" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['h-[60px] / fixed top-0 z-50', 'Height + position'],
            ['bg-page-bg border-b border-white-10', 'Background + bottom border'],
            ['w-[384px] absolute left-1/2 -translate-x-1/2', 'Search bar: truly centered on full header width'],
            ['bg-white-05 border border-white-10 rounded-full px-m h-[40px]', 'Search field'],
            ['text-text-dim', 'Animated placeholder prefix color'],
            ['gradient-purple → gradient-blue', 'Animated keyword gradient'],
            ['border-header-icon-border / hover:bg-header-icon-hover-bg', 'All icon button tokens'],
            ['w-8 h-8 rounded-full', 'Icon buttons: bell, trophy, avatar'],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={cls} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Micro-components</SubLabel>
        <div className="flex flex-col gap-m">

          {/* Credits pill */}
          <div>
            <p className="text-text-xsmall text-xxs uppercase tracking-[0.8px] mb-xs">Credits Pill</p>
            <div className="flex items-center gap-m mb-xs">
              <button className="relative flex items-center hover:opacity-90 transition-opacity" style={{ height: '32px' }}>
                <div className="flex items-center rounded-full h-[28px]"
                  style={{
                    background: 'var(--credit-bg)',
                    border: '1.5px solid transparent',
                    backgroundImage: 'linear-gradient(var(--credit-bg), var(--credit-bg)), linear-gradient(135deg, var(--credit-gold), var(--credit-orange))',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    paddingLeft: '26px',
                    paddingRight: '12px',
                  }}>
                  <span className="text-white font-bold text-sm tabular-nums" style={{ lineHeight: '28px' }}>10</span>
                </div>
                <div className="absolute left-0 w-7 h-7 rounded-full bg-secondary-surface flex items-center justify-center"
                  style={{ top: '50%', transform: 'translateY(-50%) translateX(-20%)' }}>
                  <div className="w-4 h-4 rounded-full bg-white-20" />
                </div>
              </button>
            </div>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['credit-bg', 'Pill fill (#2b1f0e)'],
                ['credit-gold → credit-orange', '135° gradient border'],
                ['h-[28px] rounded-full', 'Pill shape'],
                ['pl-[26px] pr-[12px]', 'Left pad for icon overlap'],
                ['icon: absolute left-0, translateX(-20%)', 'Credit icon overlaps pill left edge'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SPICY toggle */}
          <div>
            <p className="text-text-xsmall text-xxs uppercase tracking-[0.8px] mb-xs">SPICY Toggle</p>
            <div className="flex items-center gap-m mb-xs">
              {/* off */}
              <div className="flex flex-col items-center gap-xxxs">
                <span className="text-xxs font-medium tracking-widest text-white-50">SPICY</span>
                <div className="w-[36px] h-[14px] border border-white-50 rounded-full relative">
                  <div className="absolute top-[2px] left-[2px] w-[8px] h-[8px] rounded-full bg-white-50"/>
                </div>
              </div>
              {/* on */}
              <div className="flex flex-col items-center gap-xxxs">
                <span className="text-xxs font-medium tracking-widest text-status-alert">SPICY</span>
                <div className="w-[36px] h-[14px] border border-status-alert bg-status-alert rounded-full relative">
                  <div className="absolute top-[2px] right-[2px] w-[8px] h-[8px] rounded-full bg-white"/>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['w-[36px] h-[14px] rounded-full', 'Track size'],
                ['off: border-white-50 bg-transparent', 'Off state track'],
                ['on: bg-status-alert border-status-alert', 'On state track'],
                ['w-[8px] h-[8px] rounded-full top-[2px]', 'Thumb size + vertical center'],
                ['off: left-[2px] bg-white-50 · on: right-[2px] bg-white', 'Thumb position + color by state'],
                ['text-xxs tracking-widest uppercase', 'Label style'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notification badge */}
          <div>
            <p className="text-text-xsmall text-xxs uppercase tracking-[0.8px] mb-xs">Notification Badge</p>
            <div className="flex items-center gap-m mb-xs">
              <div className="relative w-8 h-8 flex items-center justify-center border border-header-icon-border rounded-full">
                <div className="w-[18px] h-[18px] rounded-sm bg-accent-light" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-status-alert rounded-full text-xs font-bold text-white flex items-center justify-center ring-2 ring-page-bg">7</span>
              </div>
            </div>
            <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
              {[
                ['absolute -top-1 -right-1', 'Dot position: top-right corner'],
                ['w-4 h-4 rounded-full bg-status-alert', 'Dot size + color'],
                ['text-xs font-bold text-white', 'Count text'],
                ['ring-2 ring-page-bg', 'Separation ring matches page bg'],
              ].map(([cls, label]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
                  <TokenCell value={cls} />
                  <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </Section>
  )
}
