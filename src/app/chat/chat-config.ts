// Configuration constants for the /chat demo page — extracted to keep page.tsx under 300 lines.

import type { CharacterState } from '@/components/chat/ChatHeader'
import type { ChatMessage } from '@/components/chat/ChatMessages'
import type { SafetyVariant } from '@/lib/safetyVariants'

export const SUGGESTIONS_PREF_KEY = 'wsup_chat_suggestions_enabled'

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
  | 'safety-self-harm'
  | 'safety-medical'
  | 'safety-financial'

export const STATES: ChatDemoState[] = [
  'active',
  'dormant-inactive',
  'dormant-moderation',
  'removed',
  'context-exhausted-popup',
  'chat-style-popup',
  'claim-credits-popup',
  'credit-service-popup',
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
  'safety-self-harm': 'Safety: Self-harm',
  'safety-medical': 'Safety: Medical',
  'safety-financial': 'Safety: Financial',
}

export const SAFETY_STATE_TO_VARIANT: Partial<Record<ChatDemoState, SafetyVariant>> = {
  'safety-self-harm': 'self-harm',
  'safety-medical': 'medical',
  'safety-financial': 'financial',
}

// Flow = an end-to-end demo journey that binds the post-login routing decision.
// FlowMode is the dev-panel "Flow" axis; ChatDemoState is the "State" axis. Two axes, both visible
// in the R-key dev panel — Flow shows which journey is being demoed, State shows the current step.
export type FlowMode = 'new-user' | 'returning'

export const FLOWS: FlowMode[] = ['new-user', 'returning']

export const FLOW_LABELS: Record<FlowMode, string> = {
  'new-user': 'New user',
  'returning': 'Returning user',
}

// What happens after sign-in for each flow. `nextState` opens the corresponding popup.
// New user → StreakClaimPopup (popup itself announces the +50 credits, no toast needed).
// Returning user → ChatStyleSheet (model selection on a fresh chat).
export const FLOW_AFTER_LOGIN: Record<FlowMode, { toast?: string; nextState?: ChatDemoState }> = {
  'new-user': { nextState: 'claim-credits-popup' },
  'returning': { nextState: 'chat-style-popup' },
}

export function getBannerVariant(state: ChatDemoState) {
  if (state === 'dormant-inactive') return 'inactivity'
  if (state === 'dormant-moderation') return 'moderation'
  if (state === 'removed') return 'removed'
  return null
}
