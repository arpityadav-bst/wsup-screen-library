'use client'

import { Section, SubLabel, StateLabel, TokenCell } from '../../helpers'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'

// Static mockups of the wind-down surfaces — the real components mount globally
// and would render outside the style-guide preview frame; here we re-implement
// the chrome inline so the designer can see both popups side by side.

// Body content swaps by phase — Phase 1 (now → May 24) shows the timeline statement,
// Phase 2 (May 25 → Jun 18) shows the read-only + email-for-data-export message.
function PhasedBody({ phase }: { phase: 1 | 2 }) {
  if (phase === 2) {
    return (
      <p className="text-sm text-text-body leading-relaxed mb-xs max-w-[320px] text-balance">
        Your chats and characters stay readable until{' '}
        <span className="text-text-subtitle whitespace-nowrap">Jun 19</span>, when wsup closes.
        Download what you want to keep by emailing{' '}
        <span className="link whitespace-nowrap">support@wsup.ai</span>.
      </p>
    )
  }
  return (
    <p className="text-sm text-text-body leading-relaxed mb-xs max-w-[320px] text-balance">
      Chat with your characters until{' '}
      <span className="text-text-subtitle whitespace-nowrap">Sun May 24</span>. After that your
      chats stay readable until{' '}
      <span className="text-text-subtitle whitespace-nowrap">Jun 19</span>, when wsup closes.
    </p>
  )
}

function PopupMockup({ phase = 1 }: { phase?: 1 | 2 }) {
  return (
    <div className="w-[414px] bg-profile-sheet-bg rounded-tl-popup rounded-tr-popup border border-white-10 shadow-big">
      <div className="flex justify-center pt-s pb-0">
        <div className="w-[36px] h-[4px] rounded-pill bg-white-30" />
      </div>
      <div className="relative flex flex-col items-center text-center px-l pt-l pb-l">
        {/* No close X — the "Okay, I understand" CTA is the only dismissal path */}
        <div className="size-[64px] rounded-full flex items-center justify-center bg-status-warning/[0.15] border border-status-warning/[0.30] mb-m">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-status-warning" aria-hidden>
            <path d="M12 2L2 21h20L12 2z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M12 10v4M12 17.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-text-title mb-s">wsup is winding down</h2>
        <PhasedBody phase={phase} />
        <span className="link text-sm self-center mb-l">Read the full update</span>
        <span className="bg-accent text-white text-sm font-medium rounded-pill px-xl py-s text-center shadow-button w-full block">Okay, I understand</span>
        <div className="flex flex-col w-full mt-l text-left">
          <div className="flex items-center gap-s w-full mb-s">
            <div className="flex-1 border-t border-white-10" />
            <span className="label-xs shrink-0">Other apps to try</span>
            <div className="flex-1 border-t border-white-10" />
          </div>
          <div className="flex flex-row gap-xs w-full">
            <div className="flex-1 min-w-0"><AppLinkButtonMock logo="🟣" name="Polybuzz" /></div>
            <div className="flex-1 min-w-0"><AppLinkButtonMock logo="🟠" name="Talkie" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TimelineRowMock({ badge, title, body }: { badge: string; title: string; body: string }) {
  return (
    <div className="relative pl-l">
      <div className="absolute left-0 top-[6px] size-[10px] rounded-pill bg-status-warning ring-4 ring-status-warning/[0.15]" />
      <div className="flex flex-col gap-xxs">
        <span className="eyebrow-label text-status-warning">{badge}</span>
        <p className="text-sm font-medium text-text-title">{title}</p>
        <p className="text-sm text-text-body leading-relaxed">{body}</p>
      </div>
    </div>
  )
}

function AppLinkButtonMock({ logo, name }: { logo: string; name: string }) {
  return (
    <div className="flex items-center gap-s px-m py-s rounded-card border border-white-10 bg-white-05 w-full text-left">
      <div className="size-[32px] rounded-button shrink-0 bg-white-10 flex items-center justify-center text-text-xsmall text-xxs">{logo}</div>
      <span className="flex-1 text-sm font-medium text-text-title">{name}</span>
      <ExternalLinkIcon size={14} className="text-text-small shrink-0" />
    </div>
  )
}

function DetailsPopupMockup() {
  return (
    <div className="w-full max-w-[520px] bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden flex flex-col">
      {/* Sticky header — mirrors the primitive's `title` prop output: text-base
          font-semibold title + CloseButton + hairline divider. */}
      <div className="flex items-center justify-between px-l py-s border-b border-white-10 shrink-0">
        <p className="font-semibold text-base text-text-title">wsup is winding down</p>
        <div className="size-[28px] rounded-full flex items-center justify-center text-text-small">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex flex-col gap-l px-l pt-l pb-l">
        <p className="text-sm text-text-body leading-relaxed">
          The cost of staying compliant got too high. Both in engineering effort and in real money,
          the load grew faster than we could absorb. Every month brought new content rules and new
          regulatory work that ate into the time and budget we needed to keep building wsup. We
          couldn&apos;t keep running to stand still.
        </p>

        <div className="flex flex-col gap-m relative">
          <span className="label-xs text-text-dim">What happens and when</span>
          <div className="flex flex-col gap-l relative">
            <div className="absolute left-[4px] top-[14px] bottom-[14px] w-px bg-white-10" />
            <TimelineRowMock badge="Now → Sun May 24" title="Open for chat" body="Paid model tiers turn off today. Everyone reverts to the free model, so no one is paying for messages while we wind down. Chats, character creation, everything you're used to stays on." />
            <TimelineRowMock badge="Mon May 25 → Thu Jun 18" title="Read-only · goodbye window" body="Your characters and chat history stay here to revisit and download. New messages and new characters are off. Almost four weeks on purpose, time to come back, re-read what mattered, and pull your data." />
            <TimelineRowMock badge="From Fri Jun 19" title="Landing page mode" body="wsup.ai points you to other AI apps worth your time. The app stays installable for a while longer so you can request refunds and download your data." />
          </div>
        </div>

        <div className="flex flex-col gap-m">
          <div className="flex flex-col gap-xs">
            <span className="label-xs text-text-dim">Refunds</span>
            <p className="text-sm text-text-body leading-relaxed">
              Bought credits and didn&apos;t use them all? Email{' '}
              <span className="link">support@wsup.ai</span> from your account address and we&apos;ll
              refund the unused balance.
            </p>
          </div>
          <div className="flex flex-col gap-xs">
            <span className="label-xs text-text-dim">Your data</span>
            <p className="text-sm text-text-body leading-relaxed">
              Want to take your characters and chat history with you? Email{' '}
              <span className="link">support@wsup.ai</span> from your account address and we&apos;ll
              send you a download.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-xs w-full">
          <span className="label-xs text-text-dim">Other apps to try</span>
          <div className="flex flex-row gap-xs w-full">
            <div className="flex-1 min-w-0"><AppLinkButtonMock logo="🟣" name="Polybuzz" /></div>
            <div className="flex-1 min-w-0"><AppLinkButtonMock logo="🟠" name="Talkie" /></div>
          </div>
        </div>

        <p className="text-sm text-text-body leading-relaxed">
          Thank you for trusting us with something as personal as the conversations you had here. That&apos;s not a small thing and we won&apos;t pretend otherwise.
        </p>
      </div>
    </div>
  )
}

export default function WindDownNoticeSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Wind-Down Notice" title="Wind-Down Notice" onVisible={onSectionVisible}>
      <div className="w-full">
        <SubLabel>Global wind-down announcement for the wsup shutdown timeline. Mounts in <code className="text-accent-light">app/layout.tsx</code> via <code className="text-accent-light">WindDownNotice</code> so it rides above every page. Two surfaces: first-exposure popup (both viewports, EVERY load on <code className="text-accent-light">/explore</code> — no localStorage; dismissal is in-memory only) + details popup (both viewports, scrollable info content reachable via &ldquo;Read the full update&rdquo;). No persistent reminder chrome (top strip removed S35 close). Popup body is phase-aware — Phase 1 (now → May 24) shows the timeline statement; Phase 2 (May 25 onwards) swaps to the read-only + data-export-via-email message.</SubLabel>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>First-exposure popup — Phase 1 (now → Sun May 24) body</SubLabel>
        <PopupMockup phase={1} />
        <StateLabel>Scoped to <code className="text-accent-light">/explore</code> via <code className="text-accent-light">usePathname()</code>; shows EVERY time the user lands on /explore (no localStorage persistence). Dismissal is in-memory only — resets when user leaves /explore. NO close X, NO scrim-dismiss, NO Esc-dismiss — the &ldquo;Okay, I understand&rdquo; CTA is the only exit. CTAs stacked (primary on top, tertiary link below). Other apps section uses a <strong>flanked-label divider</strong> (<code className="text-accent-light">flanked</code> prop on <code className="text-accent-light">WindDownOtherApps</code>) — clean visual separation from the centered hero above; no peer section labels on this surface so the flanked chrome doesn&apos;t conflict. Polybuzz + Talkie side-by-side (flex-1 each).</StateLabel>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>First-exposure popup — Phase 2 (Mon May 25 → Thu Jun 18) body swap</SubLabel>
        <PopupMockup phase={2} />
        <StateLabel>Same popup chrome; only the body paragraph swaps. <code className="text-accent-light">WindDownNotice</code> computes <code className="text-accent-light">phase</code> from <code className="text-accent-light">Date.now()</code> against the codified boundaries and passes it as a prop to <code className="text-accent-light">WindDownPopup</code>. Phase 2 body drops the timeline framing (chat is no longer open) and surfaces the email-for-data-export action inline (<code className="text-accent-light">support@wsup.ai</code> as a mailto link). All compound units wrapped in <code className="text-accent-light">whitespace-nowrap</code> — &ldquo;Jun 19&rdquo; (date) and &ldquo;support@wsup.ai&rdquo; (email).</StateLabel>
      </div>

      <div className="min-w-[540px] flex-1">
        <SubLabel>Details popup — both viewports (BottomSheet + CenterPopup parallel mount)</SubLabel>
        <DetailsPopupMockup />
        <StateLabel>Triggered by &ldquo;Read the full update&rdquo; from the first-exposure popup. <strong>Sibling-inheritance from BioSheet</strong> — title (&ldquo;wsup is winding down&rdquo;) passed as the <code className="text-accent-light">title</code> prop to BOTH primitives so sticky header chrome (title + CloseButton + hairline divider) comes from the primitive. Scrollable body inside the popup card. Cost-of-compliance reasoning + 3-phase timeline (Open for chat / Read-only goodbye window / Landing page mode) + two action blocks (Refunds + Your data, both funneling to <code className="text-accent-light">support@wsup.ai</code>) + &ldquo;Other apps to try&rdquo; (Polybuzz + Talkie) + personal closing note at the bottom. NO action CTAs — both flows funnel to one email to minimize one-tap query volume + give us a single inbox to triage.</StateLabel>
      </div>

      <div className="min-w-[540px] flex-1">
        <SubLabel>Anatomy + reuse map</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['First-exposure popup — parallel mount BottomSheet + CenterPopup', 'Sibling-inheritance from BuyCreditsSheet / StreakClaimPopup / WatchAdSheet (S34 codified responsive-popup pattern). Same body component rendered into both viewport primitives. CenterPopup maxWidth="440px" sized to match the centered hero column.'],
            ['Hero alert — 64px circular chrome', 'bg-status-warning/[0.15] + border-status-warning/[0.30] + 28px warning glyph in text-status-warning. Sibling-inheritance from StatusResultIcon (72px result-step icon, sized down to 64px for announcement context).'],
            ['First-exposure popup — single dismissal path', 'No close X; BottomSheet + CenterPopup scrim-click and Esc are no-op (onClose={() => {}} passed to both primitives). The "Okay, I understand" primary CTA is the ONLY exit — forces conscious acknowledgment, reduces "I didn\'t see this" support volume.'],
            ['WindDownOtherApps shared section — Gate 3 extracted at 2 consumers', 'src/components/shared/WindDownOtherApps.tsx. Encapsulates the "Other apps to try" section. Two label variants via the `flanked` prop: (a) `flanked=true` renders `─── OTHER APPS TO TRY ───` (used by WindDownPopup first-exposure where this is the only section label on the surface); (b) `flanked=false` (default) renders a plain `label-xs` section heading (used by WindDownDetailsPopup where peer section labels exist). Polybuzz/Talkie URLs co-located here as single source of truth — adding a 3rd app or swapping URLs only touches this file. Optional `className` prop for parent-context overrides.'],
            ['AppLinkButton primitive — Gate 3 + dedicated ComponentsTab section', 'src/components/shared/AppLinkButton.tsx. Clickable anchor (target="_blank" rel="noopener noreferrer") with 32px logo + name flex-1 + ExternalLinkIcon (size=14) in a 3-column row. bg-white-05 border-white-10, hover bg-white-10 border-white-20. Consumed by WindDownOtherApps (which is consumed by both popups). Has its own ComponentsTab section "App Link Button" with full anatomy. Replaced an earlier AppCard (48px logo, no link semantic) at S35 since button-style reads more like an off-ramp.'],
            ['Peer section labels — flanked vs plain + brightness recede in plain-prose contexts', 'WindDownDetailsPopup peer section labels ("What happens and when", "Refunds", "Your data", "Other apps to try") all use `label-xs text-text-dim` — 40% brightness (recedes against the 70% body for a clean 30% opacity gap). Reason: the body content below each label is plain prose (no structural list/row/card weight) so the label must recede for clear label-vs-body contrast. **LOCAL override only** — the global `.label-xs` default stays at 60% for all other consumers (Sidebar, Coachmark, BadgesWidget, ActivePersonaCard, ChatRightSidebar, BuyCreditsPromoCard, CreditServicePopup) where neighbors have their own visual weight that makes 60% read fine. WindDownPopup has only ONE section label (Other apps to try) so it uses the flanked `─── LABEL ───` divider AT DEFAULT 60% — the dividers carry the separation work, recede would over-emphasize. Timeline row badges share `text-text-dim` (40%) via `eyebrow-label` with tighter 0.4px tracking (different role — eyebrow above a per-row title — same recede direction). **Codified rules:** (1) flanked divider applies ONLY when it\'s the only section label on the surface; (2) when plain section labels sit above plain-prose body, recede to `text-text-dim` for the 30% opacity gap. WindDownOtherApps threads the override via `labelClassName`.'],
            ['Side-by-side AppLinkButton pairing — flex-1 min-w-0 wrappers', 'Two AppLinkButtons in a flex-row with gap-xs; each wrapped in a flex-1 min-w-0 div so they share the row width evenly. min-w-0 is load-bearing — without it the 32px shrink-0 logo forces overflow at narrow widths. Codified in taste.md as "Side-by-side off-ramp options when both are co-equal alternatives."'],
            ['CTA order in popup — link tight under body, primary below', 'Designer call (S35 late iteration): "Read the full update" tertiary link sits directly under the body paragraph (mb-xs from body, mb-l before primary) — link belongs in the info group, not in the action group. Primary "Okay, I understand" CTA sits below the link, then the Other apps section after a wider gap.'],
            ['Date highlights — text-text-subtitle, no font-weight bump', 'Inline date highlights (Sun May 24, Jun 19) use text-text-subtitle (80% white) without font-medium. Single-shade lift over body (70% white) reads as subtle anchor, not bold pop. Earlier iteration used text-text-title font-medium — designer flagged as too prominent.'],
            ['Details popup — Refunds + Your data action blocks (single support@wsup.ai)', 'Two info blocks sit between the timeline and the apps section. Each has a label-xs section label ("Refunds" / "Your data") + body paragraph with an inline mailto link. Both funnel to a single support@wsup.ai address — one inbox to triage, one address for the user to remember. No card chrome (subtle text-only blocks); no dot/ring marker (distinguishes them from phase milestones in the timeline above). Label-xs (not eyebrow-label) because the label IS the heading; no separate title sits under it — same role as "What happens and when" / "Other apps to try" peer labels.'],
            ['Details popup — sticky header via primitive `title` prop (BioSheet pattern)', 'Sibling-inheritance from BioSheet (profile read-more popup). Title passed as `title="wsup is winding down"` to BOTH BottomSheet + CenterPopup; the primitive renders the sticky header (text-base font-semibold title + CloseButton + bottom hairline `border-b border-white-10`). Body is `flex-1 min-h-0 overflow-y-auto scroll-hide` so it scrolls inside the popup card with the header pinned. BottomSheet uses `maxHeight="88%" fillHeight` so the popup gets a defined height for the body to scroll within; CenterPopup uses its built-in `maxHeight: 80vh`. NO custom CloseButton / NO custom header chrome — everything comes from the primitive. Lesson: when building a long-content popup, grep sibling popups FIRST for the `title` prop usage.'],
            ['Color exemption — bg-status-warning saturated chrome on hero icon', 'Product-state announcement (wind-down) is exempt from the codified "Warnings are informative, not alarming, never a fully saturated surface" rule (taste.md S35 scope amendment). The amendment scopes that rule to user-state warnings; product-state announcements where the user cannot change the state are permitted to use saturated alarm color.'],
            ['Multi-word compound units wrap as a single unit — whitespace-nowrap', 'Multi-word parse-units (hyphenated terms, dates, email addresses, short proper-noun phrases) wrap as a single unit. Fragmenting them across lines breaks the reader\'s parse same as hyphenated compounds. In wind-down popups: `<span className="whitespace-nowrap">` applied to "Sun May 24" + "Jun 19" (date compounds), "support@wsup.ai" (email address, Phase 2 popup body), "re-read" (hyphenated term, details popup timeline). Broadened from the S35 hyphenated-compound rule after the S36 designer-caught wrap miss where "Sun May 24" broke at the space.'],
            ['Popup display — /explore-scoped every-load, in-memory dismissal', 'WindDownNotice uses usePathname() to gate popup display: shows ONLY on /explore, EVERY time the page loads (no localStorage persistence). Dismissal is component state only — resets when user navigates away from /explore (useEffect on pathname). Designer call: the wind-down message is critical enough to re-surface on every entry. The "Okay, I understand" CTA enforces acknowledgment per-visit, not per-device.'],
            ['DownloadDataSheet global mount', 'WindDownNotice hosts a global DownloadDataSheet mount that opens on any wsup:open-download-data window event. Currently consumed by profile MenuSheet entry; reserved for any future "Download data" CTA that needs to open it from a non-profile page.'],
            ['Phase scaffolding — popup body swaps automatically at Phase 2', 'WindDownNotice computes the current phase from Date.now() against the codified boundaries (Phase 2 start: May 25 2026, Phase 3 start: Jun 19 2026) and passes phase=1|2|3 to WindDownPopup. Phase 1 body: chat-is-open timeline statement. Phase 2 body: read-only + email-for-data-export message. Phase 3: TBD (component-level swap likely, not just copy). Phase computation lives in the orchestrator so future surfaces (read-only chat gating, send-button disable) can read the same prop.'],
            ['LowCreditsBanner + StreakClaimPopup removed from /explore', 'Acquisition surfaces ("Add credits", "Claim your free credits") contradict wind-down messaging — hidden for the wind-down phase. Component files + style guide sections retained for reference. Per the codified wind-down-phase acquisition-surface-hide rule.'],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={cls} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[55%]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
