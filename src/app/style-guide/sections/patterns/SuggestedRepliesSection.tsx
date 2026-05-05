'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import SuggestedReplies from '@/components/chat/SuggestedReplies'

const SAMPLE = ["Same here.", "What's making you restless?", "I'm here now."]

export default function SuggestedRepliesSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Suggested Replies" title="Suggested Replies" onVisible={onSectionVisible}>
      <div className="min-w-[440px] flex-1">
        <SubLabel>Collapsed pill — bulb directly in pill (pl-xs/pr-xs/gap-xxs), chevron at end signals "tap to expand" (matches model picker)</SubLabel>
        <div className="rounded-card overflow-hidden border border-white-10 bg-page-bg pt-xl pb-l">
          <SuggestedReplies suggestions={SAMPLE} onPick={() => {}} onDisable={() => {}} />
        </div>

        <div className="mt-l">
          <SubLabel>Expanded — × moves to the LEFT (replaces the pill in same position), chips middle, bulb-off right</SubLabel>
        </div>
        <div className="rounded-card overflow-hidden border border-white-10 bg-page-bg pt-xl pb-l">
          <div className="px-m">
            <div className="flex items-center gap-xs">
              <span className="shrink-0 w-8 h-8 rounded-pill backdrop-blur-popup bg-black-60 border border-white-10 text-white-90 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </span>
              {SAMPLE.map((s, i) => (
                <span key={i} className="shrink-0 h-8 px-s flex items-center backdrop-blur-popup bg-black-60 border border-white-10 rounded-pill text-xs text-white-90 whitespace-nowrap">{s}</span>
              ))}
              <span className="shrink-0 w-8 h-8 rounded-pill backdrop-blur-popup bg-black-60 border border-white-10 text-white-90 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5" />
                  <path d="M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M2 2l20 20" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Trigger: 4s of user idleness after AI reply lands', 'Cancelled by user typing or sending'],
            ['Pill (collapsed): bulb direct in pill, pl-xs/pr-xs/gap-xxs (8/8/4)', 'Bulb has uniform 8px breathing on left/top/bottom (matches (32-16)/2). gap-xxs (4px) keeps bulb-to-text tight per designer feedback. Chevron suffixed for "tap-to-expand" affordance — matches model picker pattern'],
            ['Chevron: 4×8 SVG, strokeOpacity 0.5', 'Same anatomy as the model picker pill in ChatBar. Subtle right-pointing arrow signals expandability without shouting'],
            ['Expanded: × on LEFT (same position as collapsed pill), chips middle, bulb-off RIGHT', 'Toggling element stays at the same X position across states. Click pill → × in same spot → click × → pill returns. Seamless.'],
            ['Misclick guard: × and bulb-off are now separated by all suggestion chips', 'No longer adjacent — neither can be hit by accident'],
            ['Bulb-off icon: SINGLE integrated SVG (Lucide-style lightbulb-off)', 'Strikethrough is part of the icon\'s path geometry, NOT a manual overlay. Looks designed, not hacked'],
            ['Disable confirm: 2-step. First tap morphs icon → "Turn off?" pill (h-8 px-s, bg-white-10). Second tap confirms. 3s auto-revert', 'Prevents accidental disable from a curiosity-tap'],
            ['Tap chip → fills ChatBar input + auto-collapse', 'New idle cycle starts after next AI reply'],
            ['Toggle off → toast: "Auto-suggestions off. Turn back on from the chat menu (⋮)."', 'Toast points to the re-enable affordance'],
            ['Outer: px-m md:px-2xxxl pb-xs', 'Mirrors ChatBar padding tokens — sibling alignment'],
            ['Row container: overflow-x-auto, scrollbar hidden', 'Mobile horizontal scroll if chips overflow viewport width'],
            ['onMouseDown preventDefault on all buttons', 'Prevents focus blur from collapsing the chatbar mid-click (layout-shift fix)'],
            ['ChatBar containerRef shared with this surface', 'ChatBar outside-click ignores clicks landing here — first-click-misses bug fix'],
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
