// Mock suggestion bank for the chat-screen demo.
// Mirrors production shape: each suggestion has an italic action narration + a spoken reply.
// The action describes what the user does (scene-setting); the text is what they actually say.

export type Suggestion = {
  action: string
  text: string
}

const KEYWORD_MAP: { match: RegExp; suggestions: Suggestion[] }[] = [
  {
    match: /\b(hey|hi|hello)\b|wasn't sure you'd come back|thinking about you/i,
    suggestions: [
      { action: 'I lean against the doorway, arms folded with a small smile', text: 'I missed you today.' },
      { action: 'I tilt my head, eyes searching yours with quiet curiosity', text: 'What were you thinking about?' },
      { action: 'I drop into the chair beside you, kicking my feet up', text: 'Tell me a story.' },
    ],
  },
  {
    match: /\b(better|same as always|restless|been okay)\b/i,
    suggestions: [
      { action: 'I exhale slowly, shoulders dropping as I meet your eyes', text: 'Same here.' },
      { action: 'I pull my knees up, leaning forward like I really want to know', text: "What's making you restless?" },
      { action: 'I reach across and squeeze your hand once, gentle but sure', text: "I'm here now." },
    ],
  },
  {
    match: /\bbillie\b|already knew that/i,
    suggestions: [
      { action: 'I shrug, half-grinning at how serious you sounded', text: 'Just making sure.' },
      { action: 'I prop my chin in my hand, eyes playful', text: 'What should I call you?' },
      { action: 'I lean in closer, voice dropping to almost a whisper', text: "Tell me something I don't know." },
    ],
  },
  {
    match: /don't thank me|anytime/i,
    suggestions: [
      { action: 'I look down for a second, fighting back a smile', text: "You're sweet." },
      { action: 'I press a hand to my chest, eyes warm', text: 'Means a lot.' },
      { action: 'I tilt my head, watching you carefully', text: "What's on your mind?" },
    ],
  },
  {
    match: /can't just say things|you can't just/i,
    suggestions: [
      { action: 'I raise an eyebrow, the corner of my mouth lifting', text: 'Why not?' },
      { action: 'I hold your gaze, refusing to look away', text: 'I mean it though.' },
      { action: 'I rub the back of my neck, glancing away with a sheepish laugh', text: 'Sorry — too much?' },
    ],
  },
  {
    match: /don't be gone too long|take care of yourself/i,
    suggestions: [
      { action: 'I cross my heart with one finger, mock-solemn', text: "I won't." },
      { action: 'I step back, giving you a small wave', text: 'You too.' },
      { action: 'I pause at the door, turning halfway back', text: 'One more thing before I go —' },
    ],
  },
  {
    match: /waiting for someone|sitting.*thinking/i,
    suggestions: [
      { action: 'I sit down across from you, curiosity sharpening', text: 'Who were you waiting for?' },
      { action: 'I lean my chin on my hand, fully tuned in', text: 'What about?' },
      { action: 'I bump my shoulder gently against yours', text: "I'm glad I came back then." },
    ],
  },
  {
    match: /\?\s*$/,
    suggestions: [
      { action: 'I nod once, slow and certain', text: 'Yeah.' },
      { action: 'I scrunch up my nose, shaking my head', text: 'Not really, no.' },
      { action: 'I narrow my eyes at you, half-amused half-suspicious', text: 'Why are you asking?' },
    ],
  },
]

const FALLBACK: Suggestion[] = [
  { action: 'I lean in closer, eyes wide and waiting', text: 'Tell me more.' },
  { action: 'I tilt my head, brow furrowing slightly', text: 'What do you mean?' },
  { action: 'I settle back into the chair, ready to hear it out', text: "I'm listening." },
]

export function getSuggestionsFor(aiText: string): Suggestion[] {
  for (const entry of KEYWORD_MAP) {
    if (entry.match.test(aiText)) return entry.suggestions
  }
  return FALLBACK
}

export const SUGGESTION_IDLE_MS = 4000
