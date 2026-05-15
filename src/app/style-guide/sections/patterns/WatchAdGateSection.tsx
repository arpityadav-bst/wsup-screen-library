'use client'

import Image from 'next/image'
import { Section, SubLabel, TokenCell } from '../../helpers'
import CloseButton from '@/components/ui/CloseButton'
import Button from '@/components/ui/Button'

function PlayIcon() {
  return (
    <div className="w-[64px] h-[64px] rounded-full bg-white-10 border border-white-10 flex items-center justify-center text-text-title">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        style={{ animation: 'play-pulse 2s ease-in-out infinite' }}
      >
        <path d="M8 5.5l11 6.5-11 6.5V5.5z" />
      </svg>
    </div>
  )
}

export default function WatchAdGateSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Watch Ad Gate" title="Watch Ad Gate" onVisible={onSectionVisible}>
      <div className="w-full">
        <SubLabel>Mobile-only (app context). Hard send-gate that ships TWO distinct flows — each is its own dev-panel Flow option, each triggered by sending a message (not by selecting the flow). When &ldquo;Ad flow - Bottom sheet&rdquo; is active, the gate fires every Nth send as a BottomSheet modal. When &ldquo;Ad flow - AI chat bubble&rdquo; is active, the gate fires every Nth send as an inline AI-bubble in the chat stream. N batched at 9 / 16 / 24 / 32 per product config; demo uses 1 free send (2nd attempt fires — gate appears right after the 1st &ldquo;hi&rdquo;). The user&apos;s draft is held while the gate is up; tapping &ldquo;Watch ad&rdquo; releases the draft and sends. Desktop = N/A (both flows <code className="text-accent-light">md:hidden</code>).</SubLabel>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Ad flow - Bottom sheet (BottomSheet modal popup)</SubLabel>

        {/* v1 flat-render mockup */}
        <div className="bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden" style={{ maxWidth: '414px' }}>
          <div className="flex justify-center pt-s pb-0 shrink-0">
            <div className="w-[36px] h-[4px] rounded-pill bg-white-30" />
          </div>

          <div className="relative flex flex-col items-center px-l pt-l pb-l gap-m">
            <CloseButton onClose={() => {}} className="absolute top-s right-s" />
            <PlayIcon />

            <div className="flex flex-col items-center gap-xs">
              <h2 className="text-xl font-semibold text-text-title text-center text-balance">
                Watch an ad to keep chatting
              </h2>
              <p className="text-sm text-text-body text-center text-balance">
                Quick ad break before your next message. Same character, no progress lost.
              </p>
            </div>

            <div className="flex flex-col gap-s w-full pt-s">
              <Button variant="primary" fullWidth onClick={() => {}}>
                Watch ad
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Ad flow - AI chat bubble (inline above ChatBar)</SubLabel>

        {/* v2 flat-render mockup — mirrors the WatchAdBubble visual but as a static stand-in.
            No avatar (matches WSUP's AI-bubble convention). System-voice signal comes from the
            "QUICK AD BREAK" eyebrow label inside the bubble. */}
        <div className="bg-page-bg rounded-popup border border-white-10 p-l overflow-hidden" style={{ maxWidth: '414px' }}>
          <div className="max-w-[300px]">
            <div className="bg-chat-ai-bubble px-m py-s rounded-tl-2xl rounded-tr-2xl rounded-br-2xl flex flex-col gap-xs">
              <span className="eyebrow-label">Quick ad break</span>
              <p className="text-sm text-text-title leading-snug">
                Watch a short ad and your message sends right after.
              </p>
              <Button variant="primary" size="s" onClick={() => {}} className="self-start mt-xxs">
                Watch ad
              </Button>
            </div>
          </div>
          <p className="mt-m text-xxs text-text-xsmall italic">
            In production, this bubble renders INLINE in the input-area slot (where SuggestedReplies sits) — pushes the chat stream up instead of overlaying it. No avatar (matches WSUP AI-bubble convention); the eyebrow label distinguishes system voice from character voice.
          </p>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Post-tap: DummyAd fullscreen takeover (after tapping &ldquo;Watch ad&rdquo; on either flow)</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Placeholder mobile-ad surface — real Homescapes screenshot at <code className="text-accent-light">public/dummy-ad.png</code>, rendered fullscreen inside a single giant <code className="text-accent-light">{'<button>'}</code> so tap-anywhere closes. Production wires the real ad SDK (AppLovin / AdMob / Unity) and replaces this component wholesale.</p>
        <div
          className="bg-black rounded-card border border-white-10 overflow-hidden relative"
          style={{ width: '240px', aspectRatio: '9/19' }}
        >
          <Image
            src="/dummy-ad.png"
            alt="DummyAd Homescapes placeholder"
            fill
            className="object-contain"
            sizes="240px"
          />
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy + reuse map</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Entry component — <WatchAdGate /> dispatches to <WatchAdSheet /> or <WatchAdBubble /> based on `mode` prop', 'page.tsx mounts a single <WatchAdGate /> inside the input-area div (so the bubble can render inline above ChatBar). mode is derived from flowMode: `ad-bubble` → `bubble`, `ad-sheet` → `sheet`. No designer-facing pill — the choice is made at the Flow level.'],
            ['Two flows, two UIs — one Flow option per UI', 'Each ad UI ships as its OWN Flow option in the chat dev panel: "Ad flow - Bottom sheet" and "Ad flow - AI chat bubble." Mutually exclusive demo journeys. Both gate the SEND on the Nth message; the difference is purely the surface — sheet (modal) vs bubble (inline).'],
            ['Sheet anatomy — BottomSheet + centered 64×64 play icon + title + body + primary CTA', 'Sibling-surface inheritance with ModelDeprecatedSheet (same chrome family). NO secondary link — hard gate, one forward path.'],
            ['Bubble anatomy — inline bubble with eyebrow system-label + title + embedded "Watch ad" button. NO AVATAR.', 'Mirrors AI bubble chrome exactly (`bg-chat-ai-bubble`, asymmetric rounded corners — flat bottom-left tail). WSUP\'s ChatMessages.AIBubble does NOT render an avatar (character is set at chat-screen level via ChatHeader); the bubble inherits that convention. System-voice signal comes from the "QUICK AD BREAK" eyebrow label + the embedded Watch ad button. Per the codified taste rule from S23 (character voice vs system voice), the eyebrow label is sufficient differentiation without breaking the chat-bubble convention.'],
            ['Play icon — 64×64 rounded-full surface with play-triangle glyph, scale + opacity pulse', 'Inline SVG, no asset file — same icon-chrome family as ModelDeprecatedSheet\'s announcement bell. Path includes a small left-padding offset (`M8 5.5...`) so the optical center sits in the middle of the circle. **Animation:** scale 1 → 1.08 → 1 + opacity 0.9 → 1 → 0.9, 2s cycle, infinite. Communicates "alive, ready to tap" without the urgency of a ring/alarm. Keyframes: `play-pulse` in globals.css. Sheet only — bubble has no separate icon chrome.'],
            ['Title — text-xl font-semibold text-text-title, text-balance (sheet only)', '"Watch an ad to keep chatting" is action-first per codified taste rule — names the user verb (chat), not the blocked state. Parallel to ModelDeprecatedSheet\'s "Keep chatting with credits." Bubble version uses a shorter eyebrow label instead of a standalone title.'],
            ['Body — text-sm text-text-body, text-balance', 'Sheet: "Quick ad break before your next message. Same character, no progress lost." Bubble: "Watch a short ad and your message sends right after." Both address the same user fear (am I losing my draft / progress?) but bubble copy is shorter since the surface is more compact.'],
            ['Primary CTA — "Watch ad"', 'Sheet: <Button variant="primary" fullWidth>. Bubble: <Button variant="primary" size="s"> embedded inside the bubble. Single forward path — this is a HARD GATE.'],
            ['Send-flow state machine (useWatchAdGate hook)', '`sentSinceLastAd` increments on each successful send. `gateOnSend(text)` checks the counter — if at MAX_SENDS_BEFORE_AD_DEMO AND gateActive (one of the ad flows is selected), holds the draft + flips chatState to "watch-ad-popup" + returns true (caller aborts the actual send). `completeAd(sendFn)` resets counter and sends held draft — no toast (the message appearing in the chat IS the confirmation).'],
            ['Trigger — handleSend → adGate.gateOnSend(text) returns true → chatState becomes "watch-ad-popup"', 'Hot path: designer flips to an ad flow → counter resets → designer types "hi" + sends (goes through) → types another message + sends → gate fires → draft held → bubble or sheet renders (based on which ad flow) → designer taps Watch ad → DummyAd fullscreen takes over (placeholder mobile ad — tap anywhere to close) → DummyAd dismisses → counter resets + held draft sends (the message landing in the chat is its own confirmation; no toast).'],
            ['Z-index — sheet at 70 (matches CreditServicePopup / ModelDeprecatedSheet / ChatStyleSheet / StreakClaimPopup). Bubble at flow-level inside the chat column. DummyAd at z-80.', 'Sheet uses fixed-positioning at page level. Bubble renders INLINE in the input-area slot (where SuggestedReplies sits) — pushes the chat stream up instead of overlaying it. DummyAd renders at z-80 to cover the sheet/bubble behind, then dismisses cleanly via the parent\'s completeWatchAd flow.'],
            ['DummyAd — fullscreen placeholder ad (mobile-only) that takes over after "Watch ad" is tapped', 'Replaces the production rewarded-video ad SDK (AppLovin / AdMob / Unity Ads) in the demo. Renders a real ad screenshot (Homescapes "How to Loot?" at `public/dummy-ad.png`) as a fullscreen `<Image>` inside a single giant button — TAP ANYWHERE to close. No countdown, no separate close X — the entire surface IS the dismiss affordance, matching the common mobile-ad pattern where the ad surface itself is the click-through to the App Store. Production wires the real SDK and replaces DummyAd wholesale; the rewarded-callback path triggers the same `completeWatchAd` handler that DummyAd\'s `onComplete` does today.'],
            ['Trigger axis is the Flow, NOT the State', '"Watch ad" is NOT in the dev panel\'s State section. Selecting an ad flow ("Ad flow - Bottom sheet" or "Ad flow - AI chat bubble") in the Flow section resets the demo (same as new-user / returning), and the designer must TYPE A MESSAGE AND SEND to trigger the gate. The gate is dormant in non-ad flows.'],
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
