'use client'

import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'

export default function ChatBarSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Chat Bar" title="Chat Bar" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Inactive (default)</SubLabel>
        <PreviewBox className="p-0 overflow-hidden">
          <div className="bg-gradient-to-b from-transparent to-black-40 px-m py-s">
            <div className="bg-chat-ai-bubble rounded-[20px] p-icon-btn flex items-center gap-s">
              <div className="flex items-center gap-s flex-1 min-w-0">
                <button className="shrink-0 hover:opacity-80 transition-opacity">
                  <div className="w-5 h-5 rounded-sm bg-white-10" />
                </button>
                <span className="text-sm text-white-50">Message</span>
              </div>
              <div className="flex items-center gap-m shrink-0">
                <button className="hover:opacity-80 transition-opacity"><div className="w-4 h-4 rounded-sm bg-white-10" /></button>
                <button className="hover:opacity-80 transition-opacity"><div className="w-5 h-5 rounded-sm bg-white-10" /></button>
                <button className="hover:opacity-80 transition-opacity"><div className="w-5 h-5 rounded-sm bg-white-10" /></button>
              </div>
            </div>
          </div>
        </PreviewBox>

        <div className="mt-m">
          <SubLabel>Active (focused)</SubLabel>
        </div>
        <PreviewBox className="p-0 overflow-hidden">
          <div className="bg-gradient-to-b from-transparent to-black-40 px-m py-s">
            <div className="bg-chat-ai-bubble rounded-[20px] p-icon-btn flex items-start gap-s">
              <div className="flex flex-col gap-m flex-1 min-w-0">
                <div className="flex items-center gap-s w-full">
                  <button className="shrink-0 hover:opacity-80 transition-opacity"><div className="w-5 h-5 rounded-sm bg-white-10" /></button>
                  <span className="flex-1 text-sm text-white-50 relative">
                    <span className="inline-block w-[1px] h-[14px] bg-white align-middle -mr-[1px]" />
                    <span className="text-white-10">Message</span>
                  </span>
                </div>
                <div className="flex items-center gap-xxs">
                  <button className="backdrop-blur-popup bg-black-30 border border-white-10 rounded-pill px-xs py-[2px] flex items-center gap-xxs shadow-popup">
                    <span className="text-xs text-white-90 whitespace-nowrap">Claude 4.5 Opus</span>
                    <span className="text-xxs text-white-50">›</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end self-stretch gap-m shrink-0">
                <div className="flex items-center gap-m">
                  <button className="hover:opacity-80 transition-opacity"><div className="w-5 h-5 rounded-sm bg-white-10" /></button>
                  <button className="hover:opacity-80 transition-opacity"><div className="w-5 h-5 rounded-sm bg-white-10" /></button>
                </div>
                <button className="hover:opacity-80 transition-opacity flex items-center justify-center w-5 h-5"><div className="w-4 h-4 rounded-sm bg-white-10" /></button>
              </div>
            </div>
          </div>
        </PreviewBox>

        <div className="mt-m">
          <SubLabel>Typing (input has value)</SubLabel>
        </div>
        <PreviewBox className="p-0 overflow-hidden">
          <div className="bg-gradient-to-b from-transparent to-black-40 px-m py-s">
            <div className="bg-chat-ai-bubble rounded-[20px] p-icon-btn flex items-start gap-s">
              <div className="flex flex-col gap-m flex-1 min-w-0">
                <div className="flex items-center gap-s w-full">
                  <button className="shrink-0 hover:opacity-80 transition-opacity"><div className="w-5 h-5 rounded-sm bg-white-10" /></button>
                  <span className="flex-1 text-sm text-white">Hey, how&apos;s it going?</span>
                </div>
                <div className="flex items-center gap-xxs">
                  <button className="backdrop-blur-popup bg-black-30 border border-white-10 rounded-pill px-xs py-[2px] flex items-center gap-xxs shadow-popup">
                    <span className="text-xs text-white-90 whitespace-nowrap">Claude 4.5 Opus</span>
                    <span className="text-xxs text-white-50">›</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end self-stretch gap-m shrink-0">
                <div className="flex items-center gap-m">
                  {/* mic hidden */}
                  <button className="hover:opacity-80 transition-opacity"><div className="w-5 h-5 rounded-sm bg-white-10" /></button>
                </div>
                {/* image replaced by send */}
                <button className="hover:opacity-80 transition-opacity flex items-center justify-center w-5 h-5">
                  <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M14.1056 7.05279L0.939583 0.469791C0.563013 0.281507 0.136551 0.614479 0.227882 1.02547L1.5 6.75L7.5 7.5L1.5 8.25L0.227882 13.9745C0.136551 14.3855 0.563013 14.7185 0.939582 14.5302L14.1056 7.94721C14.4741 7.76295 14.4741 7.23705 14.1056 7.05279Z" fill="white"/></svg>
                </button>
              </div>
            </div>
          </div>
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['px-m md:px-2xxxl py-s', 'Outer padding — tighter on mobile, wider on desktop'],
            ['md:bg-gradient-to-b md:from-transparent md:to-black-40', 'Desktop scrim — fades messages into chatbar (desktop only)'],
            ['bg-chat-ai-bubble rounded-[20px] p-icon-btn', 'Inner bar surface — same token as AI bubble'],
            ['items-center (inactive) / items-start (active)', 'Wrapper alignment flips when expanded'],
            ['onFocus → setIsActive(true); click-outside collapses', 'State trigger — input focus expands; outside click collapses'],
            ['stays expanded while input has value', 'Typed text keeps the expanded layout after blur'],
            ['<img> icon-sparkle.svg 20×20', 'Sparkle icon — clickable, focuses input'],
            ['Bulb / auto-suggest icon REMOVED from ChatBar', 'Auto-suggest now lives in dedicated SuggestedReplies pill above ChatBar — duplicate entry points forbidden. See "Suggested Replies" pattern.'],
            ['flex-1 bg-transparent text-sm text-white placeholder:text-white-50 caret-white outline-none min-w-0', 'Input field'],
            ['backdrop-blur-popup bg-black-30 border border-white-10 rounded-pill px-xs py-[2px] shadow-popup', 'Model picker pill — active state only'],
            ['gap-m (right icons)', 'More spacing between media action icons than gap-s'],
            ['<img> icon-image.svg, CSS mask icon-mic.svg, <img> icon-gift.svg', 'Right icons — image + mic + gift'],
            ['right column: flex-col justify-between self-stretch (active)', 'Expanded right column — mic+gift top, image bottom'],
            ['value.length > 0 → hide mic, swap image for <img> icon-send.svg', 'Typing state — send replaces image in the bottom-right slot; gift stays'],
            ['onMouseDown preventDefault on action buttons', 'Prevents focus steal so input stays focused on click'],
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
