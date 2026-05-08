'use client'

import { useEffect, type Dispatch, type SetStateAction } from 'react'
import { STATES, type ChatDemoState } from './chat-config'

// Dev-only R-key handler for the chat page: R toggles the state panel; Shift+R cycles
// through ChatDemoState (active / dormant variants / popups / safety). Inputs are ignored
// so the key doesn't interfere with typing in the ChatBar.
export function useDevStateCycle(
  setChatState: Dispatch<SetStateAction<ChatDemoState>>,
  setShowToggle: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key !== 'r' && e.key !== 'R') return
      if (e.shiftKey) setChatState((p) => STATES[(STATES.indexOf(p) + 1) % STATES.length])
      else setShowToggle((p) => !p)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setChatState, setShowToggle])
}
