'use client'

import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'

export default function ChatHeaderSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Chat Header" title="Chat Header" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Preview</SubLabel>
        <PreviewBox className="p-0 overflow-hidden">
          <div className="h-[56px] border-b border-white-10 flex items-center px-xs bg-page-bg">
            {/* Back */}
            <button className="p-icon-btn rounded-full hover:bg-white-10 transition-colors shrink-0">
              <svg width="20" height="20" viewBox="0 0 16.8333 13.5" fill="none">
                <path d="M6.97727 0.5L0.5 6.75M0.5 6.75L6.97727 13M0.5 6.75H16.3333" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Avatar */}
            <div className="relative shrink-0 mr-m">
              <div className="w-10 h-10 rounded-full ring-1 ring-white-10 bg-white-10 overflow-hidden" />
              <button className="absolute -bottom-1 -right-2 w-[22px] h-[22px] bg-accent border-2 border-page-bg rounded-full flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2v6M2 5h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
            </div>
            {/* Name */}
            <div className="flex flex-col gap-xxxs flex-1 min-w-0">
              <span className="text-text-title font-medium text-sm leading-tight">Billie Eilish</span>
              <div className="flex items-center gap-xxs">
                <span className="text-xs text-text-body leading-tight">by</span>
                <span className="text-xs text-white underline leading-tight">Honeybadger</span>
                <svg width="5" height="8" viewBox="0 0 5 8" fill="none"><path d="M1 1l3 3-3 3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            {/* Actions */}
            <div className="flex items-center shrink-0">
              {/* Call — warm gradient placeholder */}
              <button className="p-icon-btn rounded-full hover:bg-white-10 transition-colors">
                <div className="w-5 h-5 rounded-sm" style={{ background: 'var(--icon-gradient-warm)' }} />
              </button>
              {/* Gallery */}
              <button className="p-icon-btn rounded-full hover:bg-white-10 transition-colors">
                <div className="w-5 h-5 rounded-sm bg-white-10" />
              </button>
              {/* Game — dot badge */}
              <button className="relative p-icon-btn rounded-full hover:bg-white-10 transition-colors">
                <div className="w-[22px] h-[22px] rounded-sm bg-white-10" />
                <span className="absolute top-[6px] right-[6px] w-[8px] h-[8px] rounded-full bg-status-alert animate-pulse" />
              </button>
              {/* Dots */}
              <button className="p-icon-btn rounded-full hover:bg-white-10 transition-colors">
                <div className="w-5 h-5 rounded-sm bg-white-10" />
              </button>
            </div>
          </div>
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['h-[56px] border-b border-white-10 flex items-center px-xs shrink-0', 'Header bar'],
            ['p-icon-btn rounded-full hover:bg-white-10', 'Back button — hit area'],
            ['w-10 h-10 rounded-full ring-1 ring-white-10 / mr-m', 'Avatar circle + right margin'],
            ['-bottom-1 -right-2 w-[22px] h-[22px] bg-accent border-2 border-page-bg rounded-full', '+ group badge — border-page-bg cutout trick'],
            ['text-text-title font-medium text-sm', 'Character name'],
            ['text-xs text-white underline', 'Creator link'],
            ['CSS mask + var(--icon-gradient-warm)', 'Call icon — warm gradient via backgroundImage'],
            ['CSS mask + var(--white-90)', 'Gallery icon — 90% white'],
            ['relative isolate (game button wrapper)', 'Stacking context — coachmark renders inside'],
            ['bg-status-alert animate-pulse (notification dot)', 'New-feature badge on game icon'],
            ['bg-gradient-to-b from-black to-transparent (mobile)', 'Mobile header gradient — fades into character bg'],
            ['3-dot button → opens ChatHeaderMenu (MenuPopover)', 'Items: Memories / Cards / Clear Chat / Switch LLMs / Auto-suggestions toggle / Add Member / Report. See "Chat Header Menu" pattern.'],
            ['Coachmark suppressed in chat demo (useState(false))', 'Coachmark component preserved (see Components → Coachmark) and dismiss handler intact. Initial state set to false so the demo doesn\'t re-introduce a feature presumed already learned. Production wires to localStorage per the comment in ChatHeader.tsx'],
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
