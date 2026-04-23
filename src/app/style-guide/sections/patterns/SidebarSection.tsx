'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'

export default function SidebarSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Sidebar" title="Sidebar" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Preview</SubLabel>
        <div className="bg-page-bg border border-white-10 rounded-card overflow-hidden w-[280px]">
          <div className="flex items-center justify-between px-xl py-s border-b border-white-10">
            <span className="label-xs">Recent Chats</span>
            <button className="text-secondary text-xxs font-medium tracking-[0.8px] flex items-center gap-xxs">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none" className="shrink-0 relative -top-[1px]">
                <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="leading-none">GROUP CHAT</span>
            </button>
          </div>
          {[
            { name: 'Sarah', preview: 'How about now?', time: '5m' },
            { name: 'Elle', preview: 'What about it?', time: '1h' },
            { name: 'Makima', preview: 'would you like to eat keema?', time: 'Yesterday' },
          ].map((chat, i) => (
            <div key={chat.name} className="relative group">
              <div className="flex items-center gap-s px-xl py-m hover:bg-white-05 cursor-pointer">
                <div className="w-9 h-9 rounded-pill bg-white-10 ring-1 ring-white-20 shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col gap-xxs">
                  <p className="text-white-70 text-sm font-medium leading-[1.45]">{chat.name}</p>
                  <div className="flex items-center gap-xxs text-xs font-normal leading-[1.3]">
                    <p className="text-text-dim truncate min-w-0">{chat.preview}</p>
                    <span className="text-text-dim shrink-0">· {chat.time}</span>
                  </div>
                </div>
              </div>
              {/* Close on hover */}
              <button aria-label="Remove chat" className="absolute top-s right-m opacity-0 group-hover:opacity-100 transition-opacity p-xs rounded-pill hover:bg-white-10">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2L2 10" stroke="var(--popup-close-icon)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {i < 2 && <div className="absolute bottom-0 left-xl right-xl border-t border-white-10" />}
            </div>
          ))}
          {/* Footer */}
          <div className="border-t border-white-10 px-xl py-s flex items-center justify-between gap-xs">
            <a href="#" className="text-xxs font-normal text-text-small underline">Blogs</a>
            <p className="text-xxs font-normal text-text-xxsmall whitespace-nowrap">© 2026 now.gg</p>
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['w-[365px] fixed top-[60px] left-0 bottom-0', 'Dimensions + position'],
            ['bg-page-bg border-r border-white-10', 'Surface + right border'],
            ['flex flex-col', 'Four zones: CTA → nav → recent chats → footer'],
            ['flex items-center gap-xs px-xl py-m text-xs font-normal', 'Nav item row'],
            ['active: gradient bg + text-text-title', 'Active nav state via usePathname()'],
            ['inactive: text-white-70 hover:bg-white-05', 'Inactive nav state'],
            ['label-xs', '"Recent Chats" section header'],
            ['flex items-center gap-s px-xl py-m', 'Chat row layout'],
            ['w-9 h-9 rounded-pill ring-1 ring-white-20', 'Avatar circle + ring'],
            ['text-white-70 text-sm font-medium', 'Chat name'],
            ['flex flex-col gap-xxs', 'Name + preview vertical gap'],
            ['text-text-dim text-xs truncate', 'Chat preview + time'],
            ['p-xs rounded-pill hover:bg-white-10 (close on hover)', 'Close button — unified with coachmark close'],
            ['px-xl py-s border-t border-white-10', 'Footer — Blogs link + copyright'],
            ['2px thumb — custom JS scrollbar', 'Native scrollbar hidden; JS thumb fades in on scroll'],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={cls} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Group Chat Participant Badge</SubLabel>
        <div className="flex items-center gap-m mb-xs">
          <div className="relative w-[52px] h-[52px]">
            <div className="w-[52px] h-[52px] rounded-full bg-white-10 ring-1 ring-white-20" />
            <div className="absolute -bottom-2 -right-2 bg-secondary-surface rounded-full w-[24px] h-[24px] flex items-center justify-center text-xs font-medium text-white-60 leading-none"
              style={{ boxShadow: '0 0 0 2px var(--page-bg)' }}>
              <span>+3</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['absolute -bottom-2 -right-2', 'Position: bottom-right of avatar'],
            ['w-[24px] h-[24px] rounded-full', 'Badge size'],
            ['bg-secondary-surface', 'Fill (#252535)'],
            ['text-xs font-medium text-white-60', 'Count text'],
            ['boxShadow: 0 0 0 2px var(--page-bg)', 'Separation ring via CSS var'],
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
