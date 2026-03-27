'use client'

import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'

export default function ChatBarSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Chat Bar" title="Chat Bar" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Preview</SubLabel>
        <PreviewBox className="p-0 overflow-hidden">
          <div className="bg-gradient-to-b from-transparent to-black-40 px-[16px] py-[12px]">
            <div className="bg-chat-ai-bubble rounded-[20px] p-[10px] flex items-center gap-s">
              <div className="flex items-center gap-s flex-1 min-w-0">
                <button className="w-5 h-5 rounded-full bg-white-10 flex items-center justify-center shrink-0 hover:bg-white-20 transition-colors">
                  <div className="w-3 h-3 rounded-sm bg-white-20" />
                </button>
                <button className="shrink-0 hover:opacity-80 transition-opacity">
                  <div className="w-5 h-5 rounded-sm bg-white-10" />
                </button>
                <span className="text-sm text-white-50">Message</span>
              </div>
              <div className="flex items-center gap-[16px] shrink-0">
                <button className="hover:opacity-80 transition-opacity"><div className="w-4 h-4 rounded-sm bg-white-10" /></button>
                <button className="hover:opacity-80 transition-opacity"><div className="w-5 h-5 rounded-sm bg-white-10" /></button>
                <button className="hover:opacity-80 transition-opacity"><div className="w-5 h-5 rounded-sm bg-white-10" /></button>
              </div>
            </div>
          </div>
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['px-[16px] md:px-[48px] py-[12px]', 'Outer padding — tighter on mobile, wider on desktop'],
            ['md:bg-gradient-to-b md:from-transparent md:to-black-40', 'Desktop scrim — fades messages into chatbar (desktop only)'],
            ['bg-chat-ai-bubble rounded-[20px] p-[10px]', 'Inner bar surface — same token as AI bubble'],
            ['w-5 h-5 rounded-full bg-white-10 hover:bg-white-20 (bulb)', 'Auto-suggest bulb — tiny circle button'],
            ['<img> icon-sparkle.svg 20×20', 'Sparkle icon — uses <img> not inline SVG'],
            ['flex-1 bg-transparent text-sm text-white placeholder:text-white-50 outline-none min-w-0', 'Input field'],
            ['gap-[16px] (right icons)', 'More spacing between media action icons than gap-s'],
            ['<img> icon-image.svg, CSS mask icon-mic.svg, <img> icon-gift.svg', 'Right icons — image + mic + gift'],
            ['hover:opacity-80 transition-opacity', 'Right icon hover state'],
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
