'use client'

import { Section, SubLabel, StateLabel, TokenCell } from '../../helpers'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'

// Static mockups of the wind-down surfaces — the real components mount globally
// and would render outside the style-guide preview frame; here we re-implement
// the chrome inline so the designer can see both popups side by side.

function PopupMockup() {
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
        <p className="text-sm text-text-body leading-relaxed mb-xs max-w-[320px] text-balance">
          You have until <span className="text-text-subtitle">May 29</span> before chats go{' '}
          <span className="whitespace-nowrap">read-only</span>, and until{' '}
          <span className="text-text-subtitle">June 19</span> before full shutdown.
        </p>
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
    <div className="w-full max-w-[520px] bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden">
      <div className="flex flex-col gap-l px-l pt-l pb-l">
        <div className="flex flex-col gap-xs">
          <h2 className="text-xl font-semibold text-text-title">wsup is winding down</h2>
          <p className="text-sm text-text-body leading-relaxed pt-xxs">
            The regulatory load on this space grew faster than we could absorb. Every month brought
            new compliance requirements, new content rules, new legal red lines — and we
            couldn&apos;t keep building the product while running to stand still on the legal side.
          </p>
        </div>

        <div className="flex flex-col gap-m relative">
          <span className="label-xs">What happens and when</span>
          <div className="flex flex-col gap-l relative">
            <div className="absolute left-[4px] top-[14px] bottom-[14px] w-px bg-white-10" />
            <TimelineRowMock badge="Now → Fri May 29" title="Fully open" body="Paid model tiers turn off today — everyone on the free model. Chats and character creation stay on." />
            <TimelineRowMock badge="Fri May 29 → Fri Jun 19" title="Read-only · goodbye window" body="Revisit and download. New messages and characters are off. Three weeks on purpose." />
            <TimelineRowMock badge="After Jun 19" title="Landing page mode" body="wsup.ai points elsewhere. App stays installable for refund and export." />
          </div>
        </div>

        <div className="flex flex-col w-full">
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

        <p className="text-sm text-text-body leading-relaxed">
          Thank you for trusting us with something as personal as the conversations you had here. That&apos;s not a small thing and we won&apos;t pretend otherwise.
        </p>

        <div className="flex flex-col gap-xs pt-xs">
          <p className="text-sm text-text-body leading-relaxed">
            For refund inquiries, write to <span className="link">refund@wsup.ai</span>.
          </p>
          <p className="text-sm text-text-body leading-relaxed">
            To download your data, write to <span className="link">data@wsup.ai</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function WindDownNoticeSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Wind-Down Notice" title="Wind-Down Notice" onVisible={onSectionVisible}>
      <div className="w-full">
        <SubLabel>Global wind-down announcement for the wsup shutdown timeline. Mounts in <code className="text-accent-light">app/layout.tsx</code> via <code className="text-accent-light">WindDownNotice</code> so it rides above every page. Two surfaces: first-exposure popup (both viewports, once per device ever — localStorage permanent) + details popup (both viewports, scrollable info content reachable via &ldquo;Read the full update&rdquo;). No persistent reminder chrome (top strip removed S35 close — single-exposure model).</SubLabel>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>First-exposure popup — both viewports (BottomSheet + CenterPopup parallel mount)</SubLabel>
        <PopupMockup />
        <StateLabel>Scoped to <code className="text-accent-light">/explore</code> via <code className="text-accent-light">usePathname()</code>; shows EVERY time the user lands on /explore (no localStorage persistence). Dismissal is in-memory only — resets when user leaves /explore. NO close X, NO scrim-dismiss, NO Esc-dismiss — the &ldquo;Okay, I understand&rdquo; CTA is the only exit. CTAs stacked (primary on top, tertiary link below). Other apps section uses a flanked-label divider (label centered between two horizontal lines) with Polybuzz + Talkie side-by-side (flex-1 each).</StateLabel>
      </div>

      <div className="min-w-[540px] flex-1">
        <SubLabel>Details popup — both viewports (BottomSheet + CenterPopup parallel mount)</SubLabel>
        <DetailsPopupMockup />
        <StateLabel>Triggered by &ldquo;Read the full update&rdquo; from the first-exposure popup. Title + exaggerated reasoning + 3-phase timeline + &ldquo;Other apps to try&rdquo; (Polybuzz + Talkie) + personal note + email contact (refund@wsup.ai + data@wsup.ai placeholders, flowing naturally after content — not sticky). NO action CTAs — refund + download requests funnel to email to minimize one-tap query volume.</StateLabel>
      </div>

      <div className="min-w-[540px] flex-1">
        <SubLabel>Anatomy + reuse map</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['First-exposure popup — parallel mount BottomSheet + CenterPopup', 'Sibling-inheritance from BuyCreditsSheet / StreakClaimPopup / WatchAdSheet (S34 codified responsive-popup pattern). Same body component rendered into both viewport primitives. CenterPopup maxWidth="440px" sized to match the centered hero column.'],
            ['Hero alert — 64px circular chrome', 'bg-status-warning/[0.15] + border-status-warning/[0.30] + 28px warning glyph in text-status-warning. Sibling-inheritance from StatusResultIcon (72px result-step icon, sized down to 64px for announcement context).'],
            ['First-exposure popup — single dismissal path', 'No close X; BottomSheet + CenterPopup scrim-click and Esc are no-op (onClose={() => {}} passed to both primitives). The "Okay, I understand" primary CTA is the ONLY exit — forces conscious acknowledgment, reduces "I didn\'t see this" support volume.'],
            ['WindDownOtherApps shared section — Gate 3 extracted at 2 consumers', 'src/components/shared/WindDownOtherApps.tsx. Encapsulates the entire "Other apps to try" section (flanked-label divider + side-by-side AppLinkButtons + Polybuzz/Talkie URLs). Both popups import it; URLs co-located here as single source of truth — adding a 3rd app or swapping URLs only touches this file. Accepts an optional className prop for parent-context wrapper overrides (e.g. mt-l text-left on the centered popup).'],
            ['AppLinkButton primitive — Gate 3 + dedicated ComponentsTab section', 'src/components/shared/AppLinkButton.tsx. Clickable anchor (target="_blank" rel="noopener noreferrer") with 32px logo + name flex-1 + ExternalLinkIcon (size=14) in a 3-column row. bg-white-05 border-white-10, hover bg-white-10 border-white-20. Consumed by WindDownOtherApps (which is consumed by both popups). Has its own ComponentsTab section "App Link Button" with full anatomy. Replaced an earlier AppCard (48px logo, no link semantic) at S35 since button-style reads more like an off-ramp.'],
            ['Flanked-label divider — section header inside divider line', 'Inside WindDownOtherApps: flex items-center gap-s with two flex-1 border-t border-white-10 children flanking a shrink-0 label-xs middle. Visual idiom `─── LABEL ───` — communicates "this label IS the divider\'s purpose, the section it introduces owns the divider too." Codified in taste.md as a transferable rule. Currently 1 instance (inside extracted section); if another section needs this treatment, extract as FlankedSectionLabel.'],
            ['Side-by-side AppLinkButton pairing — flex-1 min-w-0 wrappers', 'Two AppLinkButtons in a flex-row with gap-xs; each wrapped in a flex-1 min-w-0 div so they share the row width evenly. min-w-0 is load-bearing — without it the 32px shrink-0 logo forces overflow at narrow widths. Codified in taste.md as "Side-by-side off-ramp options when both are co-equal alternatives."'],
            ['CTA order in popup — link tight under body, primary below', 'Designer call (S35 late iteration): "Read the full update" tertiary link sits directly under the body paragraph (mb-xs from body, mb-l before primary) — link belongs in the info group, not in the action group. Primary "Okay, I understand" CTA sits below the link, then the Other apps section after a wider gap.'],
            ['Date highlights — text-text-subtitle, no font-weight bump', 'May 29 + June 19 inline highlights use text-text-subtitle (80% white) without font-medium. Single-shade lift over body (70% white) reads as subtle anchor, not bold pop. Earlier iteration used text-text-title font-medium — designer flagged as too prominent.'],
            ['Details popup — no CTAs, email contact flows naturally', 'Refund + Download request paths funnel to email (refund@wsup.ai / data@wsup.ai placeholders) instead of in-app action buttons. Email lines sit at the end of the body content (NOT sticky, no border-top) — read as part of the message close. Designer call: "this is now not sticky but after the content."'],
            ['Details popup — parallel mount BottomSheet + CenterPopup', 'Same responsive-popup pattern as the first-exposure popup. CenterPopup maxWidth="520px" because the long-form content benefits from extra width on desktop.'],
            ['Color exemption — bg-status-warning saturated chrome on hero icon', 'Product-state announcement (wind-down) is exempt from the codified "Warnings are informative, not alarming, never a fully saturated surface" rule (taste.md S35 scope amendment). The amendment scopes that rule to user-state warnings; product-state announcements where the user cannot change the state are permitted to use saturated alarm color.'],
            ['Compound terms wrap as unit — whitespace-nowrap on "read-only"', 'Hyphenated compound words read as a single concept and shouldn\'t fragment across lines (S35 taste rule). wrap("read-only") in <span className="whitespace-nowrap"> at every occurrence (popup body + details popup timeline).'],
            ['Popup display — /explore-scoped every-load, in-memory dismissal', 'WindDownNotice uses usePathname() to gate popup display: shows ONLY on /explore, EVERY time the page loads (no localStorage persistence). Dismissal is component state only — resets when user navigates away from /explore (useEffect on pathname). Designer call: the wind-down message is critical enough to re-surface on every entry. The "Okay, I understand" CTA enforces acknowledgment per-visit, not per-device.'],
            ['DownloadDataSheet global mount', 'WindDownNotice hosts a global DownloadDataSheet mount that opens on any wsup:open-download-data window event. Currently consumed by profile MenuSheet entry; reserved for any future "Download data" CTA that needs to open it from a non-profile page.'],
            ['Phase scaffolding — Phase 1 only this session', 'Phase 1 (May 22-28) ships with current copy. Phase 2 (May 29 onwards, read-only) and Phase 3 (post-Jun 19, landing-page mode) will be data swaps on a future WIND_DOWN_PHASE config — not new components.'],
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
