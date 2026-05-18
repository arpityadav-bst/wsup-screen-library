import AppLinkButton from '@/components/shared/AppLinkButton'

// External-app URLs — confirmed by designer S35
const POLYBUZZ_URL = 'https://now.gg/apps/cloud-whale-interactive-technology-llc/10386/polybuzz.html'
const TALKIE_URL = 'https://now.gg/apps/subsup123/5772/talkie-creative-ai-community.html'

interface WindDownOtherAppsProps {
  /** Optional outer-wrapper className for parent-context overrides (e.g. mt-l text-left
   *  on the centered popup where this section needs left-aligned content). */
  className?: string
  /** Render label inside a flanked-line divider (`─── LABEL ───`). Use TRUE when this
   *  is the only section label on the surface (first-exposure popup); use FALSE when
   *  peer section labels exist on the same surface (details popup) — the flanked chrome
   *  over-emphasizes one section vs others when peers are present. Codified scope clause
   *  on the S35 flanked-divider taste rule (S36 amendment). */
  flanked?: boolean
  /** Extra classes applied to the section label. Use `text-text-dim` (40%) in details
   *  popup contexts where the label sits above plain-prose body — gives the recede needed
   *  for clear label-vs-body contrast. Default empty keeps `label-xs`'s native 60% which
   *  reads fine when neighbors have structural weight (cards, lists, dividers). */
  labelClassName?: string
}

// "Other apps to try" section — side-by-side AppLinkButtons with a label that either
// flanks between two divider lines (`flanked=true`) or sits as a plain `label-xs`
// section heading (`flanked=false`, default).
//
// Extracted at Gate 3 (2 consumers: WindDownPopup uses flanked, WindDownDetailsPopup uses
// plain). Polybuzz + Talkie URLs co-located here as single source of truth — adding a
// 3rd app or swapping URLs only touches this file.
export default function WindDownOtherApps({
  className = '',
  flanked = false,
  labelClassName = '',
}: WindDownOtherAppsProps) {
  return (
    <div className={`flex flex-col ${flanked ? '' : 'gap-xs'} w-full ${className}`}>
      {flanked ? (
        <div className="flex items-center gap-s w-full mb-s">
          <div className="flex-1 border-t border-white-10" />
          <span className={`label-xs shrink-0 ${labelClassName}`}>Other apps to try</span>
          <div className="flex-1 border-t border-white-10" />
        </div>
      ) : (
        <span className={`label-xs ${labelClassName}`}>Other apps to try</span>
      )}
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
