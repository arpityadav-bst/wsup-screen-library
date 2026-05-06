'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import SuggestedReplies from '@/components/chat/SuggestedReplies'
import type { Suggestion } from '@/lib/chatSuggestions'

const SAMPLE: Suggestion[] = [
  { action: 'I exhale slowly, shoulders dropping as I meet your eyes', text: 'Same here.' },
  { action: 'I pull my knees up, leaning forward like I really want to know', text: "What's making you restless?" },
  { action: 'I reach across and squeeze your hand once, gentle but sure', text: "I'm here now." },
]

export default function SuggestedRepliesSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Suggested Replies" title="Suggested Replies" onVisible={onSectionVisible}>
      <div className="min-w-[440px] flex-1">
        <SubLabel>Collapsed pill — in-flow above ChatBar (pushes content up; small surfaces shouldn&apos;t overlay)</SubLabel>
        <div className="rounded-card overflow-hidden border border-white-10 bg-page-bg pt-xl pb-l">
          <SuggestedReplies suggestions={SAMPLE} onPick={() => {}} onDisable={() => {}} />
        </div>

        <div className="mt-l">
          <SubLabel>Expanded — labeled glass panel: header (label + bulb-off + ×), then 3 stacked rows with italic action narration + spoken text. Panel overlays content above (large enough to read as a popup)</SubLabel>
        </div>
        <div className="rounded-card overflow-hidden border border-white-10 bg-page-bg pt-xl pb-l">
          <div className="px-m pb-xs">
            <div className="backdrop-blur-popup bg-black-60 border border-white-10 rounded-card shadow-popup overflow-hidden">
              <div className="flex items-center justify-between px-m h-12 border-b border-white-10">
                <span className="text-sm font-medium text-text-title">Suggestions</span>
                <div className="flex items-center gap-xxs">
                  <span className="w-10 h-10 rounded-full text-white-90 inline-flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5" />
                      <path d="M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5" />
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                      <path d="M2 2l20 20" />
                    </svg>
                  </span>
                  <span className="w-10 h-10 rounded-full text-white-90 inline-flex items-center justify-center -mr-icon-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                {SAMPLE.map((s, i) => (
                  <div key={i} className="text-left px-m py-s border-b border-white-05 last:border-0">
                    <span className="text-sm italic text-white-50 leading-snug">{s.action}</span>
                    <span className="text-sm text-white leading-snug"> {s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Trigger: 4s of user idleness after AI reply lands', 'Cancelled by user typing or sending'],
            ['Pill (collapsed): in-flow above ChatBar — pushes ChatMessages up by ~36px', 'Small surfaces shouldn\'t overlay content; a 32px sliver covering a chat bubble reads as broken UI. Overlays are for popup-sized surfaces only'],
            ['Expanded: labeled vertical panel — absolute overlay above ChatBar (bottom-full of inputAreaRef)', 'Panel covers part of recent message stream rather than pushing content. ChatBar position never moves. Surface character changes from sliver-pill to labeled-overlay → close (×) follows the new surface convention (top-right of header), not the codified leftmost-toggle position. Scope clause logged in taste.md'],
            ['Header: px-m h-12 border-b white-10', 'Symmetric horizontal padding; rightmost button gets -mr-icon-btn negative margin (matches CenterPopup precedent) so the close glyph optically aligns with the panel right edge. h-12 (48px) gives 4px breathing around 40×40 buttons'],
            ['Header label: "Suggestions" — text-sm font-medium text-text-title', 'Compact-panel context — title doesn\'t need full sheet/popup weight (text-base font-semibold) because the panel itself is slimmer than a full sheet'],
            ['Close button: 40×40 hit area, 16px svg (compact-panel size), rounded-full hover:bg-white-10 text-white-90, -mr-icon-btn for optical edge alignment', 'Same SVG path as <CloseButton> primitive (per taste rule "Close icons must use the standard pattern everywhere") — only the size adapts to context. Hand-rolled here because primitive\'s padding-driven sizing can\'t decouple hit-area from svg-size; this surface needs 40×40 hit area + a smaller svg inside'],
            ['Bulb-off button: 40×40 hit area, 14px svg (slightly smaller than × — secondary control)', 'Same hover anatomy as close. Hierarchy via size: × is the surface\'s primary control (16px); bulb-off is the secondary disable affordance (14px). Both buttons share 40×40 hit area for tappable parity'],
            ['Two intents = two affordances: × is transient close (back to pill); bulb-off is permanent disable', '2-step confirm on bulb-off: first tap morphs icon → "Turn off?" pill (h-9 px-s, bg-white-10 border-white-20). Second tap commits onDisable. 3s auto-revert if no second tap'],
            ['Suggestion row: text-left px-m py-s, hover:bg-white-10', 'Italic action narration (text-white-50 italic, leading-snug — matches AI bubble emotion convention) + spoken text (text-white) inline on a single span. Wraps naturally on narrow widths'],
            ['Row separator: border-b white-05', 'Lighter than header border to read as quiet row division, not visible blocks'],
            ['Surface tint: bg-black-60 + backdrop-blur-popup, border-white-10, rounded-card, shadow-popup', 'Matches DormancyBanner / Toast / chat-bound glass surface convention. Readable over character-image bg'],
            ['Tap row → fills ChatBar input + auto-collapse pill+panel + clear', 'Spoken text is sent to ChatBar; action narration is scene-setting only, not literal user input'],
            ['Toggle off → toast: "Auto-suggestions off. Turn back on from the chat menu."', 'Toast points to the re-enable affordance'],
            ['Outer wrapper: pill = px-m md:px-2xxxl pb-xs (in flow); panel = absolute bottom-full px-m md:px-2xxxl pb-xs', 'Mirrors ChatBar padding tokens for sibling alignment'],
            ['Suggestion shape: { action: string; text: string }', 'Mirrors production output. Mock data lives in lib/chatSuggestions.ts'],
            ['ChatBar containerRef shared with this surface', 'ChatBar outside-click ignores clicks landing here — first-click-misses bug fix. Works for absolute panel because contains() checks DOM tree, not visual layout'],
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
