'use client'

import BottomSheet from '@/components/ui/BottomSheet'
import CloseButton from '@/components/ui/CloseButton'
import Button from '@/components/ui/Button'
import { getModel, type ModelId } from '@/lib/models'

interface ModelDeprecatedSheetProps {
  open: boolean
  onClose: () => void
  // Closes this sheet AND opens ChatStyleSheet so the user can pick a different model.
  onPickModel: () => void
  // Defaults wire the demo for the Llama 3 → Qwen migration; props expose the API for future
  // free-model deprecations (e.g. Mistral Nemo) without forking the component.
  deprecatedModelId?: ModelId
  replacementModelId?: ModelId
}

// Announcement bell — inline SVG, white-10 surface + white-10 stroke per WSUP icon convention.
// 64×64 surface keeps it noticeable without competing with the headline; 28×28 glyph sits at ~44%
// fill ratio, matching the visual weight of CreditServicePopup's 82×82 hex icon at smaller scale.
// Subtle ringing animation — damped oscillation ~1.4s then ~2.6s of stillness, looped (5s cycle).
// `transform-origin: 50% 15%` pivots from the bell-cap, not the body, so the swing looks like
// a real bell ringing. Keyframes live in globals.css as `bell-ring`.
function AnnouncementIcon() {
  return (
    <div className="w-[64px] h-[64px] rounded-full bg-white-10 border border-white-10 flex items-center justify-center text-text-title">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        style={{ transformOrigin: '50% 15%', animation: 'bell-ring 5s ease-in-out infinite' }}
      >
        <path d="M18 8a6 6 0 1 0-12 0v4l-1.5 3h15L18 12V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M9.5 17.5a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// Mobile-only intervention popup. Minimal anatomy: announcement icon → title → body →
// primary CTA → link CTA. No replacement-model preview, no balance pill, no internal dividers.
// Body copy carries the model retirement + cost; the picker is always one tap away via the
// secondary link if the user wants to compare or switch.
//
// Real-world context: the deprecated model is being RETIRED (removed from catalog), not just
// repriced. Llama 3 won't be selectable anymore; Qwen Plus becomes the default and
// the most basic option going forward. Body copy reflects this precisely — "has retired"
// communicates the catalog removal, not a tier change.
//
// Sibling-surface inheritance (Gate 2.2): chrome family matches CreditServicePopup (centered
// stack on BottomSheet) but the structural pattern is closer to a MemoryLimitPopup-style
// informational announcement than a credits/buy flow. Action-first headline per codified taste
// rule — "Keep chatting with credits" names the user's verb, not the blocked state.
export default function ModelDeprecatedSheet({
  open,
  onClose,
  onPickModel,
  deprecatedModelId = 'llama-3',
  replacementModelId = 'qwen-plus-character',
}: ModelDeprecatedSheetProps) {
  const deprecated = getModel(deprecatedModelId)
  const replacement = getModel(replacementModelId)
  const replacementCost = replacement.cost ?? 0
  const costPhrase = replacementCost === 1 ? '1 credit per reply' : `${replacementCost} credits per reply`

  return (
    <BottomSheet open={open} onClose={onClose} zIndex={70}>
      <div className="relative flex flex-col items-center px-l pt-l pb-l gap-m">
        <CloseButton onClose={onClose} className="absolute top-s right-s" />
        <AnnouncementIcon />

        <div className="flex flex-col items-center gap-xs">
          <span className="eyebrow-label">Chat model update</span>
          <h2 className="text-xl font-semibold text-text-title text-center text-balance">
            Keep chatting with credits
          </h2>
          <p className="text-sm text-text-body text-center text-balance">
            {deprecated.name} has retired. {replacement.name}{' '}
            <span className="whitespace-nowrap">takes over</span>
            {' '}— same characters, {costPhrase}.
          </p>
        </div>

        <div className="flex flex-col gap-s w-full pt-s">
          <Button variant="primary" fullWidth onClick={onClose}>
            Continue
          </Button>
          <button onClick={onPickModel} className="link text-sm text-center self-center">
            Pick a different model
          </button>
        </div>
      </div>
    </BottomSheet>
  )
}
