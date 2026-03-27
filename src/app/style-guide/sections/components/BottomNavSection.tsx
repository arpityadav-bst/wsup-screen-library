'use client'

import { Section, SubLabel, PreviewBox, StateLabel, TokenCell } from '../../helpers'

export default function BottomNavSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Bottom Nav" title="Bottom Nav" onVisible={onSectionVisible}>

      <div className="min-w-[360px] flex-1 max-w-[500px]">
        <SubLabel>Preview</SubLabel>
        <PreviewBox className="p-0 overflow-hidden">
          {/* Simulated bottom nav bar */}
          {(() => {
            const items = [
              { label: 'Stories', active: false },
              { label: 'Explore', active: true },
              { label: 'Create', active: false },
              { label: 'Chats', active: false },
              { label: 'Profile', active: false },
            ]
            const activeGrad = 'linear-gradient(90deg, rgba(114,233,241,0.1) 0%, rgba(113,146,229,0.1) 50%, rgba(98,87,215,0.1) 100%), linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%)'
            return (
              <nav className="bg-page-bg border-t border-white-10 flex items-center">
                {items.map(({ label, active }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-[6px] py-[12px] flex-1 min-w-0"
                    style={active ? { backgroundImage: activeGrad } : undefined}
                  >
                    <div className="w-5 h-5 rounded-sm bg-white-20" />
                    <span className={`text-xs font-normal leading-none ${active ? 'text-text-title' : 'text-white-50'}`}>
                      {label}
                    </span>
                  </div>
                ))}
              </nav>
            )
          })()}
        </PreviewBox>
        <div className="mt-s flex flex-col gap-xs">
          <StateLabel>Active item (Explore)</StateLabel>
          <StateLabel>Inactive items</StateLabel>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['fixed bottom-0 left-0 right-0 z-50 md:hidden', 'Positioning — mobile only, above everything'],
            ['bg-page-bg border-t border-white-10', 'Bar surface + top divider'],
            ['flex items-center', 'Bar layout — 5 items fill full width'],
            ['flex-1 min-w-0', 'Each item takes equal width'],
            ['flex flex-col items-center gap-[6px] py-[12px]', 'Item layout — icon + label, 12px vertical padding'],
            ['text-xs font-normal leading-none', 'Label typography'],
            ['text-text-title (active) / text-white-50 (inactive)', 'Label color states'],
            ['white (active) / rgba(255,255,255,0.5) (inactive)', 'Icon fill/bg color states'],
            ['backgroundImage: activeGradient (inline style)', 'Active bg — full column width gradient, no pill'],
            ['usePathname() for active state', 'Never hardcode active — derive from route'],
            ['paddingBottom: env(safe-area-inset-bottom, 8px)', 'iPhone notch safe area'],
            ['CSS mask (maskImage + backgroundColor)', 'Figma asset icons (Chat, Profile)'],
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
