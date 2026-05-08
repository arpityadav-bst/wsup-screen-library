'use client'

import { Section, SubLabel, StateLabel } from '../../helpers'
import MemoryLimitPopup from '@/components/chat/MemoryLimitPopup'

const CHARACTER_AVATAR = '/chars/avatars/char5.jpg'

export default function MemoryLimitPopupSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Memory Limit Popup" title="Memory Limit Popup" onVisible={onSectionVisible}>
      <div className="w-full max-w-[760px] flex flex-col gap-l">

        <div>
          <SubLabel>Default — viewport-centered overlay, character DP overlapping top edge</SubLabel>
          <div className="p-m pt-12 bg-page-bg rounded-card">
            <MemoryLimitPopup
              characterName="Billie"
              characterImage={CHARACTER_AVATAR}
            />
          </div>
          <StateLabel>
            Viewport-centered overlay with full-page backdrop (matches ModelPickerSheet / ChatStyleSheet / StreakClaimPopup convention). Dark base surface (bg-profile-sheet-bg). Character DP overlaps the top edge in B&W; exclamation burst SVG sits as a badge at the top-right of the DP. Close X is at the top-right of the popup itself.
          </StateLabel>
        </div>

        <div className="mt-s p-s bg-white-05 rounded-card border border-white-10 text-xs text-text-body leading-relaxed max-w-[600px]">
          <p className="font-semibold text-text-title mb-xxs">Anatomy</p>
          <ul className="list-disc pl-l space-y-xxs">
            <li><strong>Position</strong> — viewport-centered overlay (S31 — was previously chat-column-anchored at <code className="text-accent-light">bottom-[88px]</code>). MemoryLimitOverlay renders <code className="text-accent-light">fixed inset-0 flex items-center justify-center px-m</code>; popup centers within. Width capped via the popup's own <code className="text-accent-light">max-w-popup-narrow mx-auto</code>.</li>
            <li><strong>Surface</strong> — <code className="text-accent-light">bg-profile-sheet-bg</code> solid (matches WSUP popup convention from BottomSheet, CenterPopup, Popover). No internal animation, no gradient overlay — just the standard dark popup surface. The visual interest comes from the page scrim behind, the DP overhang, and the exclamation badge.</li>
            <li><strong>Backdrop overlay (in MemoryLimitOverlay)</strong> — full-viewport scrim <code className="text-accent-light">bg-black-55</code>, <code className="text-accent-light">absolute inset-0</code> inside the fixed wrapper. Click-to-dismiss. <code className="text-accent-light">zIndex 70</code> matches ModelPickerSheet / ChatStyleSheet / StreakClaimPopup. <strong>Mount location matters:</strong> overlay is mounted at the page-level (sibling of <code className="text-accent-light">&lt;main&gt;</code>) — NOT inside the chat column wrapper which has <code className="text-accent-light">relative z-10</code> creating a stacking context that would scope z-70 locally and trap the backdrop under Header (z-50) + Sidebar (z-40). We DON'T wrap MemoryLimitPopup in CenterPopup because CenterPopup's <code className="text-accent-light">overflow-hidden</code> would clip the 48px DP overhang — custom centered scrim preserves the overhang.</li>
            <li><strong>Character DP</strong> — 96px circle, B&W via <code className="text-accent-light">grayscale</code>, ringed in white-20, positioned <code className="text-accent-light">-top-[48px]</code> so half overlaps above the popup edge. Outer wrapper is <strong>not</strong> overflow-hidden so the DP can poke out cleanly.</li>
            <li><strong>Exclamation burst</strong> — 44px badge positioned at the top-right corner of the DP circle (<code className="text-accent-light">absolute -top-[8px] -right-[8px]</code>) with drop-shadow. Marks the alert visually without needing alarm-toned copy.</li>
            <li><strong>Close X</strong> — top-right corner of the popup itself (matches all other WSUP popovers/menus). Dismisses the entire popup.</li>
            <li><strong>Spacing rhythm</strong> — content is split into two semantic groups with hierarchical gaps. <strong>Narration group</strong> (title + body) uses inner <code className="text-accent-light">gap-xs</code> (8px). <strong>Action group</strong> (CTA + alternate link) uses inner <code className="text-accent-light">gap-s</code> (12px). Outer <code className="text-accent-light">gap-xl</code> (24px) between the groups marks the read→act pivot. Equal flat gaps would have flattened the semantic hierarchy — the eye would treat title/body/CTA as three equal stops.</li>
            <li><strong>Title (system voice, descriptive)</strong> — &ldquo;{`{characterName}`}&apos;s memory is full.&rdquo; Plain text-base, font-medium, no italic, no attribution. The popup interrupts the flow — system narration is honest about that interruption rather than masking it as dialogue.</li>
            <li><strong>Body</strong> — app benefit, condensed: &ldquo;The app remembers 3× more of your story.&rdquo; Benefit-shaped (&quot;your story&quot; = your narrative is preserved), feature-quantified (&quot;3× more&quot;), one line. Sits in the same group as the title.</li>
            <li><strong>Full-width primary CTA</strong> — Button size m fullWidth: &ldquo;Open in app.&rdquo;</li>
            <li><strong>Switch-model link</strong> — &ldquo;switch model instead&rdquo; using <code className="text-accent-light">.link</code> utility. Centered, sits in the same action group as the CTA (no divider — the popup has only 4 stacked elements; semantic grouping does the visual work that a divider used to). No &quot;Or&quot; prefix — &quot;instead&quot; already does the contrast work.</li>
          </ul>
          <p className="mt-s font-semibold text-text-title">Animation</p>
          <p>Popup card slides up + fades in once on mount (<code className="text-accent-light">slide-up-fade 0.4s ease-out</code>). No continuous internal animation — the popup itself is static, matching all other WSUP popups (BottomSheet, CenterPopup, ConfirmSheet). Calm, non-distracting.</p>
          <p className="mt-s font-semibold text-text-title">Dev toggle</p>
          <p>Cycle to <code className="text-accent-light">Memory full</code> via the R panel on <code className="text-accent-light">/chat</code> (S31 — auto-fire-after-2s removed; popup is now strictly dev-toggler-driven).</p>
        </div>

      </div>
    </Section>
  )
}
