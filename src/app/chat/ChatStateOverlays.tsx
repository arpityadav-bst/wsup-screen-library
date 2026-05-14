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
  setSelectedModelId: (id: ModelId) => void
  setToast: (text: string | null) => void
  setModelPickerOpen: (open: boolean) => void
  setBuyCreditsOpen: (open: boolean) => void
}

// Page-level overlay mounts driven by the chat state machine. Each popup opens when
// `chatState === <its-state>` and dismisses back to 'active' on close. Extracted from page.tsx
// at S33 to keep the page under the 300-line file rule — the popup-mount stack was the cleanest
// semantic unit to lift (all share the same trigger pattern).
//
// WatchAdGate is mounted separately in page.tsx (inside the chat column) because its 'bubble'
// variant needs to absolute-position above the ChatBar — it can't live at page level.
export default function ChatStateOverlays({
  chatState,
  setChatState,
  setSelectedModelId,
  setToast,
  setModelPickerOpen,
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
        onPickModel={() => { setChatState('active'); setModelPickerOpen(true) }}
      />
    </>
  )
}
