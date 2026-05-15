'use client'

import ChatStyleSheet from '@/components/chat/ChatStyleSheet'
import StreakClaimPopup from '@/components/ui/StreakClaimPopup'
import CreditServicePopup from '@/components/chat/CreditServicePopup'
import ModelDeprecatedSheet from '@/components/chat/ModelDeprecatedSheet'
import { getModel, type ModelId } from '@/lib/models'
import type { ChatDemoState } from './chat-config'

interface ChatStateOverlaysProps {
  chatState: ChatDemoState
  setChatState: (state: ChatDemoState) => void
  selectedModelId: ModelId
  setSelectedModelId: (id: ModelId) => void
  setToast: (text: string | null) => void
  setBuyCreditsOpen: (open: boolean) => void
}

// Page-level overlay mounts driven by the chat state machine. Each popup opens when
// `chatState === <its-state>` and dismisses back to 'active' on close. Extracted from page.tsx
// at S33 to keep the page under the 300-line file rule — the popup-mount stack was the cleanest
// semantic unit to lift (all share the same trigger pattern).
//
// WatchAdBubble (the 'ad-bubble' flow surface) is mounted in page.tsx INSIDE the chat column —
// it renders inline above ChatBar. WatchAdSheet (the 'ad-sheet' flow surface) is mounted at page
// root in page.tsx so its scrim covers the full viewport. Neither lives here because both have
// flow-specific mount locations the popup-state-machine pattern doesn't support.
export default function ChatStateOverlays({
  chatState,
  setChatState,
  selectedModelId,
  setSelectedModelId,
  setToast,
  setBuyCreditsOpen,
}: ChatStateOverlaysProps) {
  return (
    <>
      <ChatStyleSheet
        open={chatState === 'chat-style-popup'}
        onClose={() => setChatState('active')}
        onCommit={(id) => {
          setSelectedModelId(id)
          setToast(`Switched to ${getModel(id).name}`)
        }}
        selectedId={selectedModelId}
      />

      <StreakClaimPopup
        open={chatState === 'claim-credits-popup'}
        onClose={() => setChatState('active')}
        balance={10}
        streakDay={3}
        tomorrowReward={15}
        dailyCheckInEarn={15}
      />

      <CreditServicePopup
        open={chatState === 'credit-service-popup'}
        onClose={() => setChatState('active')}
        onBuyCredits={() => { setChatState('active'); setBuyCreditsOpen(true) }}
      />

      <ModelDeprecatedSheet
        open={chatState === 'model-deprecated-popup'}
        onClose={() => setChatState('active')}
        onPickModel={() => setChatState('chat-style-popup')}
      />
    </>
  )
}
