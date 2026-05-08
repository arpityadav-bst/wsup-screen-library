'use client'

import { useCallback, useState, type Dispatch, type SetStateAction } from 'react'
import { useAuth } from '@/lib/AuthContext'
import { FLOW_AFTER_LOGIN, type FlowMode, type ChatDemoState } from './chat-config'

// Demo-compressed thresholds — real WSUP would track actual credit balance vs per-msg cost.
// Counters reset on page reload (fresh /chat visit = fresh quota).
const FREE_MSG_LIMIT = 3
const PAID_MSG_LIMIT = 3

export function useSendGate(
  flowMode: FlowMode,
  setChatState: Dispatch<SetStateAction<ChatDemoState>>,
  setToast: (msg: string | null) => void,
) {
  const { isLoggedIn, login, logout } = useAuth()
  const [freeMsgsUsed, setFreeMsgsUsed] = useState(0)
  const [paidMsgsUsed, setPaidMsgsUsed] = useState(0)
  const [loginGateOpen, setLoginGateOpen] = useState(false)

  // Returns true if send is gated (caller must NOT send the message).
  const checkBeforeSend = useCallback(() => {
    if (!isLoggedIn && freeMsgsUsed >= FREE_MSG_LIMIT) {
      setLoginGateOpen(true)
      return true
    }
    if (isLoggedIn && paidMsgsUsed >= PAID_MSG_LIMIT) {
      setChatState('credit-service-popup')
      return true
    }
    return false
  }, [isLoggedIn, freeMsgsUsed, paidMsgsUsed, setChatState])

  const recordSent = useCallback(() => {
    if (isLoggedIn) setPaidMsgsUsed((n) => n + 1)
    else setFreeMsgsUsed((n) => n + 1)
  }, [isLoggedIn])

  // LoginSheet onSignIn handler — flips auth, closes gate, resets paid counter, then routes to the
  // flow's post-login popup (claim-credits / model-selection / nothing) and fires its toast.
  const handleSignIn = useCallback(() => {
    login()
    setLoginGateOpen(false)
    setPaidMsgsUsed(0)
    const after = FLOW_AFTER_LOGIN[flowMode]
    if (after.toast) setToast(after.toast)
    if (after.nextState) setChatState(after.nextState)
  }, [login, flowMode, setChatState, setToast])

  // Full reset — used when the dev-panel Flow toggle switches between flows so designer can
  // re-walk a journey without reloading the page. Logs out + zeroes counters + closes login gate.
  const reset = useCallback(() => {
    setFreeMsgsUsed(0)
    setPaidMsgsUsed(0)
    setLoginGateOpen(false)
    logout()
  }, [logout])

  return {
    gateState: { loginGateOpen, setLoginGateOpen },
    checkBeforeSend,
    recordSent,
    handleSignIn,
    reset,
  }
}
