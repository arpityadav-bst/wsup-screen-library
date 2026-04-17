'use client'

import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'

export default function ChatRightSidebarSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Chat Right Sidebar" title="Chat Right Sidebar" onVisible={onSectionVisible}>

      <div className="min-w-[300px] max-w-[365px] flex-1">
        <SubLabel>Preview</SubLabel>
        <PreviewBox className="p-0 overflow-hidden">
          <div className="relative w-full flex flex-col justify-end overflow-hidden bg-white-05" style={{ aspectRatio: '9/14' }}>
            {/* Placeholder character image area */}
            <div className="absolute inset-0 bg-gradient-to-b from-white-05 from-[20%] to-page-bg to-[65%]" />
            {/* Decorative glows */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(123,76,255,0.10) 0%, transparent 55%), radial-gradient(ellipse at 100% 30%, rgba(255,89,236,0.10) 0%, transparent 55%)' }} />
            {/* Info overlay */}
            <div className="relative z-10 flex flex-col items-center gap-icon-btn px-xl pt-xl pb-xxxl">
              <h2 className="text-base font-medium text-white text-center">Character Name</h2>
              {/* Stats */}
              <div className="flex items-center gap-icon-btn">
                <div className="backdrop-blur-[32px] bg-black-70 flex items-center gap-xxxs pl-[6px] pr-xs py-xxs rounded-[20px]">
                  <div className="w-4 h-4 rounded-sm bg-white-10 shrink-0" />
                  <span className="text-xxs text-white-70 tracking-[0.8px]">3K Chats</span>
                </div>
                <div className="backdrop-blur-[32px] bg-black-70 flex items-center gap-xxxs pl-[6px] pr-xs py-xxs rounded-[20px]">
                  <div className="w-4 h-4 rounded-sm bg-white-10 shrink-0" />
                  <span className="text-xxs text-white-70 tracking-[0.8px]">#219 Rank</span>
                </div>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap items-center justify-center gap-xs">
                {['Neon', 'Music', 'Girl'].map(tag => (
                  <span key={tag} className="text-xxs font-normal px-xs py-[3px] rounded-pill bg-white-10 backdrop-blur-bg text-white-80 border border-white-10">{tag}</span>
                ))}
              </div>
              {/* Description */}
              <p className="text-sm text-white text-center leading-normal">Cyberpunk DJ who grew up in a musical family.</p>
              {/* CTA */}
              <button className="w-[140px] bg-accent hover:bg-accent-hover rounded-pill py-[10px] text-sm font-semibold text-white transition-colors">Chat</button>
              {/* Creator */}
              <div className="flex items-center gap-xxs">
                <span className="text-xs text-white">by</span>
                <span className="text-xs text-white underline">Creator</span>
                <svg width="5" height="8" viewBox="0 0 5 8" fill="none"><path d="M1 1l3 3-3 3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
          </div>
          {/* You May Also Like */}
          <div className="bg-page-bg">
            <p className="label-xs px-xl pt-xl pb-s">You May Also Like</p>
            <div className="grid grid-cols-2 gap-s px-xl pb-xl">
              {['Elle', 'Rinne', 'Makima', 'Sunshine'].map(name => (
                <div key={name} className="flex flex-col gap-xs cursor-pointer group">
                  <div className="relative rounded-card overflow-hidden w-full bg-white-10" style={{ aspectRatio: '9/16' }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-white-05 to-white-10" />
                  </div>
                  <div className="flex flex-col gap-xxs">
                    <p className="text-sm font-semibold text-text-title leading-tight">{name}</p>
                    <p className="text-xs text-text-body leading-snug line-clamp-2">A character description here...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['hidden xl:block w-[365px] shrink-0 h-full overflow-y-auto', 'Sidebar — xl breakpoint, matches left sidebar width'],
            ['style={{ aspectRatio: "9/16" }} relative flex flex-col justify-end overflow-hidden', 'Profile card — 9:16 portrait ratio'],
            ['bg-gradient-to-b from-transparent from-[44%] to-black-80 to-[72%]', 'Scrim — clears above 44%, full dark by 72% (bg-black-80 token)'],
            ['radial-gradient ellipse 10% opacity (purple/pink/warm)', 'Decorative glows — not structural, pure aesthetic'],
            ['backdrop-blur-[32px] bg-black-70 rounded-[20px] (stat pills)', 'Stats pill container — bg-black-70 token'],
            ['text-xxs text-white-70 tracking-[0.8px] whitespace-nowrap', 'Stat value + label text'],
            ['backdrop-blur-[32px] bg-white-10 border border-white-10 rounded-[24px] px-[10px] py-[2px] text-xxs', 'Tag pill'],
            ['w-[140px] bg-accent rounded-pill py-[10px] text-sm font-semibold', 'Chat CTA — fixed 140px width, centered'],
            ['grid grid-cols-2 gap-s px-xl pb-xl', '"You May Also Like" grid'],
            ['style={{ aspectRatio: "9/16" }} rounded-[12px] overflow-hidden', 'Related character card — 9:16 portrait'],
            ['group-hover:scale-[1.04] transition-transform duration-300', 'Subtle zoom on hover for related cards'],
            ['label-xs px-xl pt-xl pb-s', '"You May Also Like" section label'],
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
