'use client'

import { Section, SubLabel, StateLabel } from '../../helpers'
import MemoryLimitPopup from '@/components/chat/MemoryLimitPopup'

const CHARACTER_AVATAR = '/chars/avatars/char5.jpg'

export default function MemoryLimitPopupSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Memory Limit Popup" title="Memory Limit Popup" onVisible={onSectionVisible}>
      <div className="w-full max-w-[760px] flex flex-col gap-l">

        <div>
          <SubLabel>Default — anchored above ChatBar, character DP overlapping top edge</SubLabel>
          <div className="p-m pt-12 bg-page-bg rounded-card">
            <MemoryLimitPopup
              characterName="Billie"
              characterImage={CHARACTER_AVATAR}
            />
          </div>
          <StateLabel>
            Alternative to MemoryLimitMoment. Anchored above ChatBar (not a fullscreen modal). Dark base surface (bg-profile-sheet-bg) with subtle WSUP gradient overlay drifting at the diagonal corners. Character DP overlaps the top edge in B&W; exclamation burst SVG sits as a badge at the top-right of the DP. Close X is at the top-right of the popup itself.
          </StateLabel>
        </div>

        <div className="mt-s p-s bg-white-05 rounded-card border border-white-10 text-xs text-text-body leading-relaxed max-w-[600px]">
          <p className="font-semibold text-text-title mb-xxs">Anatomy</p>
          <ul className="list-disc pl-l space-y-xxs">
            <li><strong>Position</strong> — anchored above ChatBar (not a fullscreen modal). Same horizontal padding as ChatBar (<code className="text-accent-light">px-m md:px-2xxxl</code>). Centered in chat column with <code className="text-accent-light">max-w-[420px] mx-auto</code>.</li>
            <li><strong>Surface</strong> — <code className="text-accent-light">bg-profile-sheet-bg</code> solid (matches WSUP popup convention from BottomSheet, CenterPopup, Popover). No internal animation, no gradient overlay — just the standard dark popup surface. The visual interest comes from the chat scrim behind, the DP overhang, and the exclamation badge.</li>
            <li><strong>Backdrop overlay (in chat/page.tsx)</strong> — full chat-area dim using <code className="text-accent-light">bg-black-60</code> token, <code className="text-accent-light">absolute inset-0</code> at the chat UI wrapper level. Modal-style backdrop matching the pattern used by other WSUP popups (BottomSheet, CenterPopup). Z-index 20; popup is z-30. <code className="text-accent-light">pointer-events-none</code> so chat behind stays interactable through it.</li>
            <li><strong>Character DP</strong> — 96px circle, B&W via <code className="text-accent-light">grayscale</code>, ringed in white-20, positioned <code className="text-accent-light">-top-[48px]</code> so half overlaps above the popup edge. Outer wrapper is <strong>not</strong> overflow-hidden so the DP can poke out cleanly.</li>
            <li><strong>Exclamation burst</strong> — 44px badge positioned at the top-right corner of the DP circle (<code className="text-accent-light">absolute -top-[8px] -right-[8px]</code>) with drop-shadow. Marks the alert visually without needing alarm-toned copy.</li>
            <li><strong>Close X</strong> — top-right corner of the popup itself (matches all other WSUP popovers/menus). Dismisses the entire popup.</li>
            <li><strong>Title (character voice, italic + attribution)</strong> — &ldquo;I can&apos;t remember everything anymore — my memory just got too full.&rdquo; — Billie. Italic = dialogue, not UI copy.</li>
            <li><strong>Model context card</strong> — sleek inset (<code className="text-accent-light">rounded-card bg-white-10</code>) explaining which LLM the user is on and that it forgets context easily. Educates the user on the <em>why</em>.</li>
            <li><strong>Body</strong> — app benefit explained: &ldquo;The app remembers 10× more, so your whole story stays with her.&rdquo; Benefit-shaped, not feature-shaped.</li>
            <li><strong>Full-width primary CTA</strong> — Button size m fullWidth: &ldquo;Continue to chat in app.&rdquo;</li>
            <li><strong>Subtle divider</strong> — <code className="text-accent-light">border-t border-white-10</code>, edge-to-edge via <code className="text-accent-light">-mx-l</code>.</li>
            <li><strong>Switch-model link</strong> — &ldquo;Or switch to a better model&rdquo; using <code className="text-accent-light">.link</code> utility. Inline reference link style (no arrow) matching profile/explore convention.</li>
          </ul>
          <p className="mt-s font-semibold text-text-title">Animation</p>
          <p>Popup card slides up + fades in once on mount (<code className="text-accent-light">slide-up-fade 0.4s ease-out</code>). No continuous internal animation — the popup itself is static, matching all other WSUP popups (BottomSheet, CenterPopup, ConfirmSheet). Calm, non-distracting.</p>
          <p className="mt-s font-semibold text-text-title">When to use this vs MemoryLimitMoment</p>
          <p>MemoryLimitMoment is the lower-interrupt default — it lives in the chat scroll as part of Billie&apos;s next response. Use this popup variant when (a) the moment needs more weight (e.g., paid users hitting the limit, or rare context where install conversion matters more than chat continuity), or (b) you want to surface model-specific context (Llama 3 vs other models) which the inline moment doesn&apos;t have room for.</p>
          <p className="mt-s font-semibold text-text-title">Dev toggle</p>
          <p>Cycle to <code className="text-accent-light">Memory full (popup)</code> via the R panel on <code className="text-accent-light">/chat</code>.</p>
        </div>

      </div>
    </Section>
  )
}
