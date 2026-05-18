import AppLinkButton from '@/components/shared/AppLinkButton'

// External-app URLs — confirmed by designer S35
const POLYBUZZ_URL = 'https://now.gg/apps/cloud-whale-interactive-technology-llc/10386/polybuzz.html'
const TALKIE_URL = 'https://now.gg/apps/subsup123/5772/talkie-creative-ai-community.html'

interface WindDownOtherAppsProps {
  /** Optional outer-wrapper className for parent-context overrides (e.g. mt-l text-left
   *  on the centered popup where this section needs left-aligned content). */
  className?: string
}

// "Other apps to try" section — flanked-label divider + side-by-side AppLinkButtons.
// Extracted at Gate 3 (2 consumers: WindDownPopup + WindDownDetailsPopup). Polybuzz +
// Talkie URLs co-located here so both popups stay in sync — single source of truth.
// Adding a 3rd app or swapping URLs only touches this file.
export default function WindDownOtherApps({ className = '' }: WindDownOtherAppsProps) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="flex items-center gap-s w-full mb-s">
        <div className="flex-1 border-t border-white-10" />
        <span className="label-xs shrink-0">Other apps to try</span>
        <div className="flex-1 border-t border-white-10" />
      </div>
      <div className="flex flex-row gap-xs w-full">
        <div className="flex-1 min-w-0">
          <AppLinkButton href={POLYBUZZ_URL} logo="/external/polybuzz.png" name="Polybuzz" />
        </div>
        <div className="flex-1 min-w-0">
          <AppLinkButton href={TALKIE_URL} logo="/external/talkie.png" name="Talkie" />
        </div>
      </div>
    </div>
  )
}
