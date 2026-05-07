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
  'safety-self-harm': 'Safety: Self-harm',
  'safety-medical': 'Safety: Medical',
  'safety-financial': 'Safety: Financial',
}

export const SAFETY_STATE_TO_VARIANT: Partial<Record<ChatDemoState, SafetyVariant>> = {
  'safety-self-harm': 'self-harm',
  'safety-medical': 'medical',
  'safety-financial': 'financial',
}

export function getBannerVariant(state: ChatDemoState) {
  if (state === 'dormant-inactive') return 'inactivity'
  if (state === 'dormant-moderation') return 'moderation'
  if (state === 'removed') return 'removed'
  return null
}
