'use client'

import { Section, SubLabel, PreviewBox, StateLabel, TokenCell } from '../../helpers'

export default function WidgetsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Widgets" title="Widgets" onVisible={onSectionVisible}>

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
