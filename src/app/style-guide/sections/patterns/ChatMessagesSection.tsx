'use client'

import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'

export default function ChatMessagesSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Chat Messages" title="Chat Messages" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Bubbles</SubLabel>
        <PreviewBox>
          <div className="flex flex-col gap-[16px] w-full max-w-[400px]">
            {/* User bubble */}
            <div className="flex justify-end w-full">
              <div className="bg-chat-user-bubble px-[12px] py-[10px] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl max-w-[360px]">
                <p className="text-sm text-white leading-normal">Namaskar Sara ji</p>
                <p className="text-sm italic text-white-50 leading-snug mt-[2px]">laugh softly with gentle smile</p>
              </div>
            </div>
            {/* AI bubble */}
            <div className="flex items-start gap-[4px]">
              <div className="flex flex-col max-w-[290px] min-w-[64px]">
                <div className="bg-chat-ai-bubble px-[12px] pt-[8px] pb-[14px] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                  <p className="text-sm italic text-white-50 leading-snug mb-s">She blinks, smiles and says,</p>
                  <p className="text-sm text-white leading-normal">I am Sarah! You can call me Sara.</p>
                </div>
                <div className="flex items-center pt-[4px]">
                  <div className="flex items-center gap-[4px]">
                    <div className="backdrop-blur-[32px] bg-black-70 flex items-center gap-[4px] h-[32px] pl-[8px] pr-[6px] rounded-[24px] shrink-0">
                      <div className="flex items-center gap-[2px]">
                        {[3, 7, 10, 8, 5, 8, 10, 7, 3].map((h, i) => <div key={i} className="w-[1.5px] bg-white-70 rounded-full" style={{ height: `${h}px` }} />)}
                      </div>
                      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shrink-0 ml-[2px]">
                        <svg width="6" height="7" viewBox="0 0 6 7" fill="none"><path d="M1.5 1l3.5 2.5L1.5 6V1Z" fill="#171717" /></svg>
                      </div>
                    </div>
                    <button className="p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10 transition-colors"><div className="w-4 h-4 rounded-sm bg-white-10" /></button>
                    <button className="p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10 transition-colors"><div className="w-4 h-4 rounded-sm bg-white-10" /></button>
                  </div>
                  <div className="flex-1" />
                  <div className="flex items-center gap-[4px]">
                    {/* Generate image — warm gradient placeholder */}
                    <button className="p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10 transition-colors shrink-0">
                      <div className="w-4 h-4 rounded-sm" style={{ background: 'var(--icon-gradient-warm)' }} />
                    </button>
                    <button className="p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10 transition-colors">
                      <div className="w-4 h-4 rounded-sm bg-white-10" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-center justify-center gap-[4px] shrink-0">
                <button className="w-[32px] h-[32px] flex items-center justify-center backdrop-blur-[32px] bg-black-70 rounded-full hover:bg-white-10 transition-colors">
                  <div className="w-4 h-4 rounded-sm bg-white-10" />
                </button>
                <span className="text-xxs font-semibold text-white tracking-[0.8px]">0/3</span>
              </div>
            </div>
            {/* Typing indicator */}
            <div className="bg-chat-ai-bubble flex items-center gap-[4px] px-[12px] py-[8px] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl self-start">
              <p className="text-sm text-white-50">Sarah is typing</p>
              <div className="flex items-center gap-[3px] ml-[2px]">
                {[0, 1, 2].map(i => <div key={i} className="w-[4px] h-[4px] bg-white-50 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }} />)}
              </div>
            </div>
          </div>
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['flex-1 overflow-y-auto flex flex-col gap-[16px]', 'Scroll container'],
            ['<div className="flex-1" /> before first message', 'Bottom-alignment spacer — compresses as messages grow'],
            ['bg-chat-user-bubble / rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl', 'User bubble — bottom-right corner open'],
            ['bg-chat-ai-bubble / rounded-tl-2xl rounded-tr-2xl rounded-br-2xl', 'AI bubble — bottom-left corner open'],
            ['text-sm italic text-white-50 leading-snug', 'Emotion/action text (both user and AI)'],
            ['max-w-[290px] min-w-[64px] flex flex-col (bubble+actions wrapper)', 'Left column — constrains to bubble width'],
            ['flex items-start gap-[4px] (outer AI row)', 'Bubble left column + regenerate right column, top-aligned'],
            ['self-stretch flex flex-col items-center justify-center (regenerate)', 'Regenerate stretches full bubble height, icon vertically centered'],
            ['flex-1 spacer in action row', 'Splits left group (audio/like/dislike) from right group (generate/dots)'],
            ['p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10', 'Action buttons — use bg-black-70 token'],
            ['p-[8px] rounded-full backdrop-blur-[32px] bg-black-70 border border-white-10 hover:bg-white-10 (GenerateImageBtn)', 'GenerateImage — same pattern as other action buttons; gradient-border wrapper removed'],
            ['backgroundImage: var(--icon-gradient-warm) (icon mask)', 'GenerateImage icon — warm gradient fill via mask, distinguishes from plain-white action icons'],
            ['text-sm text-white-50 (typing name)', 'NOT italic — same dim color as emotion text but roman weight'],
            ['animate-bounce / animationDelay i*0.15s / animationDuration 0.9s', 'Staggered typing dots'],
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
