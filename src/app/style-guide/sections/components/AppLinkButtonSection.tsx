'use client'

import { Section, SubLabel, TokenCell } from '../../helpers'
import AppLinkButton from '@/components/shared/AppLinkButton'

export default function AppLinkButtonSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="App Link Button" title="App Link Button" onVisible={onSectionVisible}>
      <div className="w-full">
        <SubLabel>External-app suggestion link button. 32px logo + name + external link icon. Clickable anchor that opens the destination in a new tab via <code className="text-accent-light">target=&quot;_blank&quot;</code> + <code className="text-accent-light">rel=&quot;noopener noreferrer&quot;</code>. Used in wind-down surfaces (WindDownPopup + WindDownDetailsPopup) for the &ldquo;Other apps to try&rdquo; section. Replaced an earlier 48px AppCard pattern at S35 because the button-style with an external-link arrow icon reads more like an off-ramp than a static card.</SubLabel>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Live examples (real links — clicking opens in new tab)</SubLabel>
        <div className="flex flex-col gap-xs max-w-[440px]">
          <AppLinkButton href="https://now.gg/apps/cloud-whale-interactive-technology-llc/10386/polybuzz.html" logo="/external/polybuzz.png" name="Polybuzz" />
          <AppLinkButton href="https://now.gg/apps/subsup123/5772/talkie-creative-ai-community.html" logo="/external/talkie.png" name="Talkie" />
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Side-by-side pairing (codified for 2 co-equal off-ramp options)</SubLabel>
        <div className="flex flex-row gap-xs max-w-[440px]">
          <div className="flex-1 min-w-0">
            <AppLinkButton href="https://now.gg/apps/cloud-whale-interactive-technology-llc/10386/polybuzz.html" logo="/external/polybuzz.png" name="Polybuzz" />
          </div>
          <div className="flex-1 min-w-0">
            <AppLinkButton href="https://now.gg/apps/subsup123/5772/talkie-creative-ai-community.html" logo="/external/talkie.png" name="Talkie" />
          </div>
        </div>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Container — <a target="_blank" rel="noopener noreferrer">', 'Whole row is the click target. target="_blank" opens in a new tab; rel="noopener noreferrer" is a security best-practice for external links (prevents the linked page from accessing window.opener).'],
            ['Chrome — flex items-center gap-s px-m py-s rounded-card', '3-column flex row with consistent gap. Card-rounded corners and px-m py-s padding mirror other clickable card primitives in WSUP.'],
            ['Background — bg-white-05 + border border-white-10', 'Light tint to read as a distinct interactive surface against the popup background. Same tint family as other shared/ row buttons.'],
            ['Hover — bg-white-10 + border-white-20 + transition-colors', 'Both bg and border shift on hover. Standard WSUP interactive hover response — surface lifts one tier of white-alpha intensity.'],
            ['Logo — 32×32 next/image, rounded-button, shrink-0', '32px square logo with rounded-button corners (matches app-icon shape conventions). shrink-0 to prevent flex from collapsing it under tight space.'],
            ['Name — text-sm font-medium text-text-title, flex-1', 'Body-scale text at medium weight + title color (100% white). flex-1 fills the row between logo and icon.'],
            ['External link icon — ExternalLinkIcon size=14 text-text-small', 'Standard WSUP external-link arrow (ui/ExternalLinkIcon). 14px size + 60% white communicates "opens externally" without competing with the name.'],
            ['Side-by-side pairing — flex-1 min-w-0 wrappers', 'When 2 AppLinkButtons sit in a flex-row, wrap each in a flex-1 min-w-0 div. The min-w-0 is load-bearing — without it the 32px shrink-0 logo forces overflow at narrow widths.'],
            ['Consumed by — WindDownPopup + WindDownDetailsPopup via WindDownOtherApps', 'Both wind-down popups use this primitive inside the shared WindDownOtherApps section component. If a 3rd domain needs an external-app suggestion list, promote AppLinkButton from shared/ to ui/.'],
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
