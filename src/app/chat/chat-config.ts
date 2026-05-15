// Configuration constants for the /chat demo page — extracted to keep page.tsx under 300 lines.

import type { CharacterState } from '@/components/chat/ChatHeader'
import type { ChatMessage } from '@/components/chat/ChatMessages'
import type { SafetyVariant } from '@/lib/safetyVariants'

export const SUGGESTIONS_PREF_KEY = 'wsup_chat_suggestions_enabled'

// Watch-ad gate frequency for the demo. After this many successful sends, the next send fires
// the ad-gate (production scales to N = 9 / 16 / 24 / 32 per product config; demo uses 1 so the
// designer sees the gate immediately after their 1st "hi" — 1 free send, 2nd attempt gates).
export const MAX_SENDS_BEFORE_AD_DEMO = 1

export const SEED_MESSAGES: ChatMessage[] = [
  { id: 'seed-u1', role: 'user', text: 'Namaskar Sara ji', emotion: 'laugh softly with gentle smile looking into your eyes' },
  { id: 'seed-a1', role: 'ai', text: 'I am Billie! You can call me Billie. I have a Katana ✌', emotion: 'She blinks, smiles and say,' },
]

export const CHARACTER_IMAGE = '/chars/char5.webp'
export const CHARACTER_AVATAR = '/chars/avatars/char5.jpg'

export type ChatDemoState =
  | CharacterState
  | 'context-exhausted-popup'
  | 'chat-style-popup'
  | 'claim-credits-popup'
  | 'credit-service-popup'
  | 'model-deprecated-popup'
  | 'watch-ad-popup'
  | 'safety-self-harm'
  | 'safety-medical'
  | 'safety-financial'

// NOTE: 'watch-ad-popup' is intentionally NOT in STATES — it's no longer a preview-only state.
// Triggered exclusively by the 'ad' FlowMode (real send-time flow). Selecting Ad flow in the
// dev panel opens the popup immediately for preview + enables the gate to fire every Nth send.
export const STATES: ChatDemoState[] = [
  'active',
  'dormant-inactive',
  'dormant-moderation',
  'removed',
  'context-exhausted-popup',
  'chat-style-popup',
  'claim-credits-popup',
  'credit-service-popup',
  'model-deprecated-popup',
  'safety-self-harm',
  'safety-medical',
  'safety-financial',
]

export const STATE_LABELS: Record<ChatDemoState, string> = {
  'active': 'Active',
  'dormant-inactive': 'Dormant (Inactive)',
  'dormant-moderation': 'Dormant (Moderation)',
  'removed': 'Removed',
  'context-exhausted-popup': 'Memory full',
  'chat-style-popup': 'Model selection',
  'claim-credits-popup': 'Claim free credits',
  'credit-service-popup': 'Out of credits popup',
  'model-deprecated-popup': 'Llama 3 deprecated (mobile only)',
  'watch-ad-popup': 'Watch ad',
  'safety-self-harm': 'Safety: Self-harm',
  'safety-medical': 'Safety: Medical',
  'safety-financial': 'Safety: Financial',
}

export const SAFETY_STATE_TO_VARIANT: Partial<Record<ChatDemoState, SafetyVariant>> = {
  'safety-self-harm': 'self-harm',
  'safety-medical': 'medical',
  'safety-financial': 'financial',
}

// Flow = an end-to-end demo journey. FlowMode is the dev-panel "Flow" axis; ChatDemoState is the
// "State" axis. Four flows:
//   - 'new-user' / 'returning' — login-routing flows (drives post-sign-in destination)
//   - 'ad-bubble'              — ad-gate flow with AI-chat-bubble UI; gate fires on send
//   - 'ad-sheet'               — ad-gate flow with BottomSheet (mobile) / CenterPopup (desktop); gate fires on send
// Both ad-flows render on mobile + desktop; both gate-on-send (no instant preview). Designer picks
// which UI treatment to test via the Flow toggler. Send a message to trigger the gate in either flow.
export type FlowMode = 'new-user' | 'returning' | 'ad-bubble' | 'ad-sheet'

export const FLOWS: FlowMode[] = ['new-user', 'returning', 'ad-bubble', 'ad-sheet']

export const FLOW_LABELS: Record<FlowMode, string> = {
  'new-user': 'New user',
  'returning': 'Returning user',
  'ad-bubble': 'Ad flow - AI chat bubble',
  'ad-sheet': 'Ad flow - Bottom sheet',
}

// What happens after sign-in for each flow. `nextState` opens the corresponding popup.
// New user → StreakClaimPopup. Returning user → ChatStyleSheet. Ad flows → no special post-login
// behavior (the gate fires on send, not on login).
export const FLOW_AFTER_LOGIN: Record<FlowMode, { toast?: string; nextState?: ChatDemoState }> = {
  'new-user': { nextState: 'claim-credits-popup' },
  'returning': { nextState: 'chat-style-popup' },
  'ad-bubble': { nextState: 'active' },
  'ad-sheet': { nextState: 'active' },
}

export function getBannerVariant(state: ChatDemoState) {
  if (state === 'dormant-inactive') return 'inactivity'
  if (state === 'dormant-moderation') return 'moderation'
  if (state === 'removed') return 'removed'
  return null
}
