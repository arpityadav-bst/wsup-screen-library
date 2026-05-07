// Chat LLM model catalog — drives ModelPickerSheet + the model pill in ChatBar.
// Mirrors production wsup.ai's 7-model lineup.

export type ModelId =
  | 'llama-3'
  | 'mistral-nemo'
  | 'qwen-plus-character'
  | 'deepseek-v3'
  | 'minimax-m2-her'
  | 'deepseek-v4-pro'
  | 'claude-opus-4-6'

export type ModelTier = 'current' | 'legacy'

export interface Model {
  id: ModelId
  name: string
  personality: string
  // null = free tier, number = credits per message
  cost: null | number
  // 1-4 — drives the signal-bars icon color tier (≤2 green, =3 yellow, =4 red)
  complexity: 1 | 2 | 3 | 4
  // 'current' = featured in ChatStyleSheet first screen; 'legacy' = behind the disclosure
  tier: ModelTier
  // Short c.ai-style line shown in ChatStyleRow (≤6 words ideal)
  tagline: string
  description: string
}

export const MODELS: Model[] = [
  { id: 'llama-3',             name: 'Llama 3',             personality: 'Classic',    cost: null, complexity: 1, tier: 'legacy',  tagline: 'Quick chats, no friction',         description: 'Fast, unlimited casual conversations.' },
  { id: 'mistral-nemo',        name: 'Mistral Nemo',        personality: 'Weaver',     cost: null, complexity: 2, tier: 'legacy',  tagline: 'Uninhibited and wild',             description: 'Uninhibited creativity for dark fantasy and chaos.' },
  { id: 'qwen-plus-character', name: 'Qwen Plus Character', personality: 'Strategist', cost: 1,    complexity: 2, tier: 'legacy',  tagline: 'Sharp tactical minds',             description: 'Advanced reasoning for smart villains and mysteries.' },
  { id: 'deepseek-v3',         name: 'DeepSeek V3',         personality: 'Storyteller',cost: 2,    complexity: 3, tier: 'legacy',  tagline: 'Soulful, immersive prose',         description: 'The gold standard for immersive, soulful storytelling.' },
  { id: 'minimax-m2-her',      name: 'MiniMax M2 Her',      personality: 'Luminary',   cost: 5,    complexity: 3, tier: 'current', tagline: 'Voice that holds across scenes',   description: "Holds your character's voice across every twist, beat, and scene." },
  { id: 'deepseek-v4-pro',     name: 'DeepSeek V4 Pro',     personality: 'Architect',  cost: 10,   complexity: 4, tier: 'current', tagline: 'Deep memory, deeper roleplay',     description: 'Long-context reasoning with DeepSeek V4 (pro) — deeper memory, richer storytelling, premium roleplay.' },
  { id: 'claude-opus-4-6',     name: 'Claude Opus 4.6',     personality: 'Visionary',  cost: 20,   complexity: 4, tier: 'current', tagline: 'Reads between the lines',          description: 'Unmatched for subtext and human-like emotional depth.' },
]

export const DEFAULT_MODEL_ID: ModelId = 'claude-opus-4-6'

export function getModel(id: ModelId): Model {
  const m = MODELS.find((m) => m.id === id)
  if (!m) throw new Error(`Unknown model id: ${id}`)
  return m
}

export function formatCost(cost: Model['cost']): string {
  return cost === null ? 'Free' : `${cost} / msg`
}
