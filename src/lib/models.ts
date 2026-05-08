// Chat LLM model catalog — drives ModelPickerSheet + ChatStyleSheet + the model pill in ChatBar.

export type ModelId =
  | 'llama-3'
  | 'qwen-plus-character'
  | 'deepseek-v3'
  | 'claude-opus-4-6'
  | 'mistral-nemo'
  | 'minimax-m2-her'
  | 'deepseek-v4-pro'

export type ModelTier = 'primary' | 'other'

export interface Model {
  id: ModelId
  name: string
  personality: string
  // null = free tier, number = credits per message
  cost: null | number
  // 1-4 — drives the signal-bars icon color tier (≤2 green, =3 yellow, =4 red)
  complexity: 1 | 2 | 3 | 4
  // 'primary' = ChatStyleSheet step 1 (popular default options); 'other' = behind ChatStyleSheet's "Other models" disclosure (less popular)
  tier: ModelTier
  // When true, ModelRow renders a gradient "Available only in app" chip next to the cost chip.
  appOnly?: boolean
  description: string
}

export const MODELS: Model[] = [
  { id: 'llama-3',             name: 'Llama 3',             personality: 'Classic',     cost: null, complexity: 1, tier: 'primary', appOnly: true, description: 'Fast, unlimited casual conversations.' },
  { id: 'qwen-plus-character', name: 'Qwen Plus Character', personality: 'Strategist',  cost: 1,    complexity: 2, tier: 'primary', description: 'Advanced reasoning for smart villains and mysteries.' },
  { id: 'deepseek-v3',         name: 'DeepSeek V3',         personality: 'Storyteller', cost: 2,    complexity: 3, tier: 'primary', description: 'The gold standard for immersive, soulful storytelling.' },
  { id: 'claude-opus-4-6',     name: 'Claude Opus 4.6',     personality: 'Visionary',   cost: 20,   complexity: 4, tier: 'primary', description: 'Unmatched for subtext and human-like emotional depth.' },
  { id: 'mistral-nemo',        name: 'Mistral Nemo',        personality: 'Weaver',      cost: null, complexity: 2, tier: 'other',   appOnly: true, description: 'Uninhibited creativity for dark fantasy and chaos.' },
  { id: 'minimax-m2-her',      name: 'MiniMax M2 Her',      personality: 'Luminary',    cost: 5,    complexity: 3, tier: 'other',   description: "Holds your character's voice across every twist, beat, and scene." },
  { id: 'deepseek-v4-pro',     name: 'DeepSeek V4 Pro',     personality: 'Architect',   cost: 10,   complexity: 4, tier: 'other',   description: 'Long-context reasoning with DeepSeek V4 (pro) — deeper memory, richer storytelling, premium roleplay.' },
]

export const DEFAULT_MODEL_ID: ModelId = 'qwen-plus-character'

export function getModel(id: ModelId): Model {
  const m = MODELS.find((m) => m.id === id)
  if (!m) throw new Error(`Unknown model id: ${id}`)
  return m
}

export function formatCost(cost: Model['cost']): string {
  return cost === null ? 'Free' : `${cost} / msg`
}
