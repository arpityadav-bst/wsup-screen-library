// Mock suggestion bank for the chat-screen demo.
// Given the AI's last reply, returns 3 short user-side replies the user might send.

const KEYWORD_MAP: { match: RegExp; suggestions: string[] }[] = [
  {
    match: /\b(hey|hi|hello)\b|wasn't sure you'd come back|thinking about you/i,
    suggestions: [
      "I missed you today.",
      "What were you thinking about?",
      "Tell me a story.",
    ],
  },
  {
    match: /\b(better|same as always|restless|been okay)\b/i,
    suggestions: [
      "Same here.",
      "What's making you restless?",
      "I'm here now.",
    ],
  },
  {
    match: /\bbillie\b|already knew that/i,
    suggestions: [
      "Just making sure.",
      "What should I call you?",
      "Tell me something I don't know.",
    ],
  },
  {
    match: /don't thank me|anytime/i,
    suggestions: [
      "You're sweet.",
      "Means a lot.",
      "What's on your mind?",
    ],
  },
  {
    match: /can't just say things|you can't just/i,
    suggestions: [
      "Why not?",
      "I mean it though.",
      "Sorry — too much?",
    ],
  },
  {
    match: /don't be gone too long|take care of yourself/i,
    suggestions: [
      "I won't.",
      "You too.",
      "One more thing before I go —",
    ],
  },
  {
    match: /waiting for someone|sitting.*thinking/i,
    suggestions: [
      "Who were you waiting for?",
      "What about?",
      "I'm glad I came back then.",
    ],
  },
  {
    match: /\?\s*$/,
    suggestions: [
      "Yeah.",
      "Not really, no.",
      "Why are you asking?",
    ],
  },
]

const FALLBACK = [
  "Tell me more.",
  "What do you mean?",
  "I'm listening.",
]

export function getSuggestionsFor(aiText: string): string[] {
  for (const entry of KEYWORD_MAP) {
    if (entry.match.test(aiText)) return entry.suggestions
  }
  return FALLBACK
}

export const SUGGESTION_IDLE_MS = 4000
