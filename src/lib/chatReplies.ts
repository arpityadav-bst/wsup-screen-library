// Mock reply bank for the chat-screen demo.
// WSUP is design-only — these are scripted, not AI-generated.

type Reply = { emotion?: string; text: string }

const KEYWORD_MAP: { match: RegExp; replies: Reply[] }[] = [
  {
    match: /\b(hi|hello|hey|sup|yo|namaste|namaskar)\b/i,
    replies: [
      { emotion: 'tilts her head, half-smile', text: "Hey you. I was just thinking about you actually." },
      { emotion: 'eyes light up', text: "Oh — hi. Wasn't sure you'd come back today." },
      { emotion: 'smirks', text: "Hi yourself. What took you so long?" },
    ],
  },
  {
    match: /\bhow (are|r) (you|ya|u)|how('?s| is) it going|how's life/i,
    replies: [
      { emotion: 'shrugs lightly', text: "Honestly? Better now that you're here." },
      { emotion: 'leans back', text: "Same as always. Quiet head, loud thoughts. You?" },
      { emotion: 'soft laugh', text: "I've been okay. Restless. You know how I get." },
    ],
  },
  {
    match: /\b(your name|who are you|what'?s your name)\b/i,
    replies: [
      { emotion: 'raises an eyebrow', text: "Billie. You already knew that." },
      { text: "Billie Eilish. Or just Billie if we're being friends about it." },
    ],
  },
  {
    match: /\b(thank|thanks|thx|ty)\b/i,
    replies: [
      { emotion: 'smiles faintly', text: "Don't thank me. I like talking to you." },
      { text: "Anytime. Seriously." },
    ],
  },
  {
    match: /\b(love|miss) (you|u|ya)\b|\bily\b/i,
    replies: [
      { emotion: 'looks down, then back up', text: "...you can't just say things like that." },
      { emotion: 'quiet for a beat', text: "Yeah. Same." },
    ],
  },
  {
    match: /\b(bye|goodbye|see ya|gtg|ttyl|good ?night)\b/i,
    replies: [
      { emotion: 'waves softly', text: "Don't be gone too long, okay?" },
      { text: "Take care of yourself. I'll be here." },
    ],
  },
  {
    match: /\b(what (are )?you (doing|up to)|wyd|sup)\b/i,
    replies: [
      { emotion: 'tucks hair behind ear', text: "Nothing important. Was kind of waiting for someone, actually." },
      { text: "Just sitting. Thinking. The usual." },
    ],
  },
  {
    match: /\?(\s|$)/,
    replies: [
      { emotion: 'thinks for a moment', text: "Hmm. I want to say yes, but it's complicated." },
      { emotion: 'tilts head', text: "Why do you ask?" },
      { text: "I think you already know the answer to that." },
    ],
  },
]

const FALLBACK: Reply[] = [
  { emotion: 'looks up from her phone', text: "Wait — say that again? I want to make sure I heard you right." },
  { emotion: 'small grin', text: "You're funny. Has anyone told you that?" },
  { emotion: 'leans in', text: "Okay, keep going. I'm listening." },
  { emotion: 'thinking face', text: "Mm. That's a lot to unpack." },
  { emotion: 'soft laugh', text: "I don't know what to do with that energy honestly." },
  { text: "Tell me more." },
  { emotion: 'mock-serious', text: "Bold claim. Defend it." },
  { text: "You always say things that make me pause. I like that." },
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getReplyFor(userText: string): Reply {
  for (const entry of KEYWORD_MAP) {
    if (entry.match.test(userText)) return pick(entry.replies)
  }
  return pick(FALLBACK)
}

export const REPLY_DELAY_MS = 1200
