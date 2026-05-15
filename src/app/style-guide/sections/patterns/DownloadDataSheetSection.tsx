'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import CloseButton from '@/components/ui/CloseButton'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import StatusResultIcon from '@/components/ui/StatusResultIcon'
import VariantSwitcherPills from '@/components/ui/VariantSwitcherPills'

const SHELL = 'bg-profile-sheet-bg rounded-popup border border-white-10 shadow-popup overflow-hidden relative'

function SelectMockup() {
  return (
    <div className={SHELL} style={{ maxWidth: '420px' }}>
      <CloseButton onClose={() => {}} className="absolute top-s right-s" />
      <div className="flex flex-col gap-m p-l">
        <div className="flex flex-col gap-xs">
          <span className="eyebrow-label">Account data</span>
          <h2 className="text-xl font-semibold text-text-title">Download your data</h2>
          <p className="text-sm text-text-body">Pick what you want to include. You&apos;ll get a copy you can keep.</p>
        </div>
        <div className="flex flex-col gap-xs pt-s">
          {[
            { label: 'Characters', sub: 'Your liked characters & creators', meta: '24 · 120 KB', checked: true },
            { label: 'Chats', sub: 'All your conversations', meta: '87 · 4.2 MB', checked: false },
            { label: 'Images', sub: 'Photos shared in your chats', meta: '156 · 38 MB', checked: false },
            { label: 'Videos', sub: 'Videos shared in your chats', meta: '12 · 480 MB', checked: false },
          ].map((r) => (
            <div key={r.label} className={`w-full flex items-start gap-s p-m rounded-card border ${r.checked ? 'border-accent bg-accent/[0.06]' : 'border-white-10 bg-white-05'}`}>
              <span className="pt-[2px]"><Checkbox checked={r.checked} onChange={() => {}} aria-label={r.label} /></span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-s">
                  <span className="text-base font-medium text-text-title">{r.label}</span>
                  <span className="text-xxs text-text-xsmall shrink-0">{r.meta}</span>
                </div>
                <p className="text-xs text-text-body mt-xxs">{r.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="primary" fullWidth onClick={() => {}} className="mt-s">Download</Button>
      </div>
    </div>
  )
}

function DownloadingMockup() {
  return (
    <div className={SHELL} style={{ maxWidth: '420px' }}>
      <CloseButton onClose={() => {}} className="absolute top-s right-s" />
      <div className="flex flex-col items-center text-center gap-m py-l px-l">
        <svg className="animate-spin size-[48px] text-accent" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" />
          <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <div className="flex flex-col gap-xxs">
          <h2 className="text-xl font-semibold text-text-title">Preparing your download…</h2>
          <p className="text-sm text-text-body">This usually takes a few seconds.</p>
        </div>
      </div>
    </div>
  )
}

function ResultMockup({ variant }: { variant: 'success' | 'failure' }) {
  const isSuccess = variant === 'success'
  return (
    <div className="relative" style={{ maxWidth: '420px' }}>
      <VariantSwitcherPills
        current={variant}
        variants={[{ id: 'success', label: 'Success' }, { id: 'failure', label: 'Failure' }]}
        onChange={() => {}}
        className="absolute right-0"
        style={{ bottom: 'calc(100% + 10px)' }}
      />
      <div className={SHELL}>
        <CloseButton onClose={() => {}} className="absolute top-s right-s" />
        <div className="flex flex-col items-center text-center gap-m p-l">
          <StatusResultIcon variant={variant} />
          <div className="flex flex-col gap-xxs">
            <h2 className="text-xl font-semibold text-text-title">{isSuccess ? 'Download complete' : 'Couldn’t download'}</h2>
            <p className="text-sm text-text-body max-w-[280px] text-balance">
              {isSuccess ? 'Saved to your downloads folder.' : 'Something went wrong. Check your connection.'}
            </p>
          </div>
          <Button variant="primary" fullWidth onClick={() => {}} className="mt-s">{isSuccess ? 'Done' : 'Try again'}</Button>
        </div>
      </div>
    </div>
  )
}

export default function DownloadDataSheetSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Download Data Sheet" title="Download Data Sheet" onVisible={onSectionVisible}>
      <div className="w-full">
        <SubLabel>Mobile + desktop. Triggered from the profile account MenuSheet (&ldquo;Download my data&rdquo; entry, between Blocked creators and Log out). Three-step state machine: select → downloading → result (success | failure). Custom scrim wrapper (sibling-inheritance from LoginSheet) so the variant pill can sit OUTSIDE the popup chrome — BottomSheet/CenterPopup primitives&apos; overflow-hidden would clip an above-card pill.</SubLabel>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Step 1 — Select (Characters is checked, Chats unchecked)</SubLabel>
        <SelectMockup />
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Step 2 — Downloading (spinner + status copy)</SubLabel>
        <DownloadingMockup />
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Step 3 — Result (Success variant — pill above-right of popup)</SubLabel>
        <div className="pt-[40px]">
          <ResultMockup variant="success" />
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Step 3 — Result (Failure variant)</SubLabel>
        <div className="pt-[40px]">
          <ResultMockup variant="failure" />
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy + reuse map</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Container — custom scrim wrapper (NOT BottomSheet/CenterPopup primitives)', 'Sibling-inheritance from LoginSheet — both surfaces need the variant pill to sit OUTSIDE the popup chrome, but BottomSheet/CenterPopup have overflow-hidden on the card which clips above-card decorations. Custom wrapper preserves the scrim + animation conventions (bg-black-70 fade-in scrim, slide-up card animation, z-80) while leaving the pill slot intact.'],
            ['State machine — select → downloading → result', 'Each step replaces the body inside the same chrome (header + close button stay). Resets to "select" on every open so the user always starts fresh with unticked checkboxes.'],
            ['Step 1 — Select: eyebrow + title + body + four checkbox rows + primary CTA', 'Eyebrow "ACCOUNT DATA" sets category context (codified eyebrow-label pattern). All four checkboxes start unticked — forces the user to consciously pick (avoids "smash Download by accident → got everything you didn\'t want"). Download CTA disabled until at least one is checked. Row order encodes natural top-to-bottom flow: Characters (profile) → Chats (conversation transcripts) → Images (conversation media, light) → Videos (conversation media, heavy).'],
            ['Checkbox row — full-row tap target, checked rows get accent border + 6% accent fill', 'Whole row is the toggle (`<button>` wraps Checkbox + label + meta). Checked state has `border-accent bg-accent/[0.06]` per codified accent affordance pattern. Right-aligned `{count} · {size}` metadata chip uses text-xxs text-text-xsmall — quiet enough not to compete with the label.'],
            ['Step 2 — Downloading: animated spinner + title + sub-line', 'Spinner is an inline SVG with Tailwind\'s `animate-spin` utility (no new keyframe needed). Two paths: a faint full circle at 0.2 opacity + a quarter-arc at full opacity that rotates — classic spinner pattern. Sub-line "This usually takes a few seconds." reassures without specifying duration. Demo auto-advances after 1.5s; production hooks the real fetch promise.'],
            ['Step 3 — Result: 72px circular status icon + title + body + single primary CTA', 'Sibling-inheritance from BuyCreditsResultStep — same icon size, same status-success/status-alert chrome (`bg-status-X/[0.15]` + `border-status-X/[0.30]`), same action-first title pattern. Success: ✓ glyph + "Download complete" + "Done" CTA. Failure: ✕ glyph + "Couldn\'t download" + "Try again" CTA. NO secondary "Cancel" link on failure — the CloseButton at top-right already serves the exit path; a second exit affordance would violate the codified "Exit-affordance uniqueness" rule.'],
            ['Variant switcher pill — VariantSwitcherPills primitive, positioned absolute right-0 + bottom: calc(100% + 10px)', 'Positioned at top-right corner of the popup, OUTSIDE the chrome (sits ~10px above the top edge, right-aligned to the popup right edge). Only mounted during the result step — there are no variants worth toggling on select or downloading. Two options: Success / Failure. Codified rule "Dev controls live OUTSIDE the design surface, not inside it" — pill is dev infrastructure, not user-facing chrome.'],
            ['Trigger — profile MenuSheet "Download my data" entry', 'Mounted between "Blocked creators" (last management item) and "Log out" (first destructive item). Per the codified MenuSheet ordering rule: new management items insert above the destructive cluster, never inside it.'],
            ['Z-index — sheet at 80 (matches BuyCreditsSheet)', 'Sits above the profile page chrome (Header/Sidebar at z-40/50). The bg-black-70 scrim covers the full viewport.'],
            ['Mock metadata (demo only)', 'Hardcoded counts + size estimates (24 characters · 120 KB; 87 chats · 4.2 MB; 156 images · 38 MB; 12 videos · 480 MB) so the row chips render meaningfully in the demo. Production reads from the user\'s account. Size estimates reflect realistic ratios: Characters is metadata-only (KBs), Chats is text transcripts (low-MB), Images are many-but-medium (tens of MB), Videos are few-but-heavy (hundreds of MB).'],
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
