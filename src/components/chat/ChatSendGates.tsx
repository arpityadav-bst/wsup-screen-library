'use client'

import LoginSheet from '@/components/ui/LoginSheet'

interface ChatSendGatesProps {
  loginGateOpen: boolean
  setLoginGateOpen: (open: boolean) => void
  onSignIn: () => void
}

// LoginSheet preset for the chat-screen out-of-free-msgs gate. Other gate intercepts
// (CreditServicePopup, BuyCreditsSheet) live in chat/page.tsx so they're driven by chatState.
export default function ChatSendGates({ loginGateOpen, setLoginGateOpen, onSignIn }: ChatSendGatesProps) {
  return (
    <LoginSheet
      open={loginGateOpen}
      onClose={() => setLoginGateOpen(false)}
      onSignIn={onSignIn}
      headline="Keep chatting"
      subtitle="Free messages used up. New users get 50 credits on sign-in."
    />
  )
}
