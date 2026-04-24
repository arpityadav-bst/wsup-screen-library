'use client'

import LoginSheet from '@/components/ui/LoginSheet'
import { useAuth } from '@/lib/AuthContext'

interface ProfileLoginGateProps {
  open: boolean
  onClose: () => void
  onSignedIn?: () => void
}

/** LoginSheet preset for "access your profile" triggers (Header avatar + BottomNav profile tap). Single copy source. */
export default function ProfileLoginGate({ open, onClose, onSignedIn }: ProfileLoginGateProps) {
  const { login } = useAuth()
  return (
    <LoginSheet
      open={open}
      onClose={onClose}
      onSignIn={() => { login(); onClose(); onSignedIn?.() }}
      headline={<>Sign in to access<br />your profile</>}
      subtitle="So we can save your characters, chats and credits."
    />
  )
}
