'use client'

import { Section, SubLabel, PreviewBox, StateLabel, TokenCell } from '../../helpers'
import Button from '@/components/ui/Button'
import ChevronIcon from '@/components/ui/ChevronIcon'

export default function WidgetsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Widgets" title="Widgets" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Buy Credits Promo</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Promo card shown inside <code className="text-accent-light">CreditSidebar</code>. Dark card with orange/yellow radial gradients + detailed bag illustration (<code className="text-accent-light">/credit-bags.png</code>) overflowing top-right. Primary Button at 180×40.</p>
        <div className="flex flex-col gap-3">
          <PreviewBox>
            <div
              className="relative rounded-card overflow-hidden p-m border border-white-20 flex flex-col gap-m min-h-[104px] w-[320px]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 100% 100%, rgba(238,115,0,0.4) 0%, rgba(238,115,0,0) 70%),
                  radial-gradient(circle at 0% 0%, rgba(255,209,83,0.2) 0%, rgba(255,209,83,0) 60%),
                  linear-gradient(#171717, #171717)
                `,
              }}
            >
              <img
                src="/credit-bags.png"
                alt=""
                className="absolute -right-[18px] -top-[8px] w-[170px] h-auto object-contain pointer-events-none select-none z-0"
              />
              <div className="relative z-10 flex flex-col gap-s max-w-[65%]">
                <span className="text-[10px] font-medium tracking-[0.5px] uppercase text-white-50">+ Add more credits</span>
                <Button size="s" className="gap-xxs w-[180px] h-[40px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2 4h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                    <circle cx="17" cy="20" r="1.5" fill="currentColor" />
                  </svg>
                  <span>Buy Credits</span>
                  <ChevronIcon direction="right" size={14} className="shrink-0" />
                </Button>
              </div>
            </div>
          </PreviewBox>
          <StateLabel>Default</StateLabel>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Generate Images</SubLabel>
        <div className="flex flex-col gap-3">
          <PreviewBox>
            <div className="relative flex items-center gap-2 bg-white-05 border border-white-10 rounded-card px-3 h-[52px] overflow-hidden w-[280px]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <defs>
                  <linearGradient id="gi" x1="4" y1="0" x2="15" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFCA85"/><stop offset="0.5" stopColor="#FFAF75"/><stop offset="1" stopColor="#FF7A38"/>
                  </linearGradient>
                </defs>
                <rect x="1" y="1" width="14" height="14" rx="3" stroke="url(#gi)" strokeWidth="1.5"/>
                <circle cx="5.5" cy="5.5" r="1.5" fill="url(#gi)"/>
                <path d="M1 11l4-4 3 3 2-2 5 5" stroke="url(#gi)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white-70 font-medium text-sm z-10 relative">Generate Images</span>
              <svg className="absolute right-3 z-10" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <defs>
                  <linearGradient id="ag" x1="4" y1="10" x2="16" y2="10" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFCA85"/><stop offset="0.5" stopColor="#FFAF75"/><stop offset="1" stopColor="#FF7A38"/>
                  </linearGradient>
                </defs>
                <path d="M4 10h12M12 6l4 4-4 4" stroke="url(#ag)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </PreviewBox>
          <StateLabel>Default</StateLabel>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['h-[52px] bg-white-05 border border-white-10 rounded-card', 'Card surface — widgets use rounded-card not rounded-pill'],
            ['<Link> not <div>', 'Must be keyboard-focusable'],
            ['text-sm font-medium text-white-70', 'Label — NOT font-semibold or text-text-title'],
            ['rounded-card (not rounded-pill)', 'Shape — it is a widget, not a button'],
            ['absolute char image — plain <img> not <Image>', 'Avoids Next.js optimizer sharpening small PNGs'],
            ['arrow: orange gradient SVG, absolute right-3', 'Arrow matches icon gradient #FFCA85→#FF7A38'],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={cls} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
            </div>
          ))}
        </div>
      </div>

    </Section>
  )
}
