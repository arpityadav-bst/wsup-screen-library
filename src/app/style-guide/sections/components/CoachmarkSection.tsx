'use client'

import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'

export default function CoachmarkSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Coachmark" title="Coachmark" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Preview</SubLabel>
        <PreviewBox>
          <div className="relative w-[220px] bg-coachmark-bg border border-accent rounded-card shadow-button">
            {/* Caret */}
            <div className="absolute -top-[10px] right-[17px]" style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid var(--accent)' }} />
            <div className="absolute -top-[8px] right-[18px]" style={{ width: 0, height: 0, borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderBottom: '9px solid var(--coachmark-bg)' }} />

            <div className="p-s">
              {/* Label + dismiss */}
              <div className="flex items-center justify-between mb-xs">
                <span className="label-xs text-white">New Feature</span>
                <button className="p-xs flex items-center justify-center rounded-pill hover:bg-white-10 transition-colors shrink-0" aria-label="Dismiss">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2l8 8M10 2L2 10" stroke="var(--popup-close-icon)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Feature row button */}
              <button className="flex items-center gap-xs mb-xs bg-white-10 rounded-button pr-xs overflow-hidden hover:bg-white-20 transition-colors w-full">
                <div className="px-xs flex items-center justify-center shrink-0 bg-accent self-stretch" style={{ borderRadius: 'var(--radius-button) 0 0 var(--radius-button)' }}>
                  <svg width="18" height="18" viewBox="0 0 512 512" fill="white"><path d="M350.18 221.99c-.24 0-.48 0-.72 0-15.49.4-27.73 13.3-27.33 28.84.41 15.23 12.88 27.32 28.02 27.32.26 0 .52 0 .78-.01 15.5-.4 27.73-13.3 27.34-28.8-.39-15.26-12.9-27.35-28.08-27.35zM396.91 147.2c-.25 0-.5 0-.75 0-15.5.42-27.73 13.3-27.34 28.83.41 15.23 12.9 27.32 28.03 27.32.26 0 .53 0 .8-.01 15.49-.39 27.74-13.3 27.34-28.79-.41-15.26-12.89-27.35-28.08-27.35z"/><path d="M511.97,363.87c-1.2-66.8-9.09-134.35-22.03-202.53-10.54-47.37-48.46-89.56-109.05-92.65-1.56-.06-3.08-.1-4.56-.1-40.44,0-50.39,23.26-98.08,23.26-.47,0-.94,0-1.42,0-6.91-.04-13.82-.06-20.73-.06s-13.93,.02-20.9,.06c-.48,0-.95,0-1.42,0-47.69,0-57.68-23.25-98.08-23.25-1.48,0-3,.03-4.56,.1-60.6,3.09-99.7,45.17-109.09,92.65C9.09,229.53,1.2,297.06,0,363.86c-.29,46.51,45.63,77.45,75.93,79.57,1.23,.09,2.45,.14,3.67,.14,56.81,0,102.1-98.93,136.79-98.94,13.23,.08,26.47,.12,39.7,.12s26.35-.04,39.52-.12c34.69,0,79.96,98.95,136.8,98.95,1.22,0,2.44-.05,3.67-.14,30.29-2.12,77.4-33.27,75.89-79.57Z"/><path d="M190.01,193.68h-28.34v-28.34c0-10.49-8.51-19-19-19s-19,8.51-19,19v28.34h-28.34c-10.49,0-19,8.51-19,19s8.51,19,19,19h28.34v28.34c0,10.49,8.51,19,19,19s19-8.51,19-19v-28.34h28.34c10.49,0,19-8.51,19-19s-8.51-19-19-19Z"/></svg>
                </div>
                <p className="text-xs font-medium text-text-title leading-tight py-xs">Play Games</p>
              </button>

              {/* Description */}
              <p className="text-sm text-white-50">A whole new way to connect with character!</p>
            </div>
          </div>
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['w-[220px] bg-coachmark-bg border border-accent rounded-card shadow-button z-50', 'Container — coachmark-bg (#1e1d2e) + accent border + accent shadow'],
            ['absolute top-full right-0 mt-xs', 'Position — anchored below parent game button'],
            ['CSS border triangle (10px) — accent outer, coachmark-bg inner', 'Caret — two zero-size divs, not rotated'],
            ['p-s', 'Inner padding — spacing token s (12px)'],
            ['label-xs text-white', '"New Feature" label'],
            ['p-xs rounded-pill hover:bg-white-10', 'Close button — unified hitbox with sidebar close'],
            ['12×12 stroke var(--popup-close-icon) strokeWidth 1.5', 'Close icon — X mark'],
            ['bg-white-10 rounded-button pr-xs overflow-hidden hover:bg-white-20 w-full', 'Feature row button container'],
            ['px-xs bg-accent self-stretch borderRadius: var(--radius-button) 0 0 var(--radius-button)', 'Icon bg — flush left/top/bottom, partial radius via CSS var'],
            ['text-xs font-medium text-text-title py-xs', 'Feature row label — "Play Games"'],
            ['mb-xs (between label→row, row→description)', 'Vertical spacing between sections'],
            ['text-sm text-white-50', 'Description text'],
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
