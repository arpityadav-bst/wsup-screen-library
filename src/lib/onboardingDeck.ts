// Onboarding deck — demo character set for the /explore onboarding flow.
// 9 cards. One card flagged as "top pick" (first card).
//
// Persistence is intentionally minimal: we save only the liked character's id so /chat can render
// the matched character instead of default Billie. The deck-resume + chat-banner functionality
// was shipped in S32 and removed S32-follow-up — the design need for "resume your deck" hadn't
// landed yet; revisit when product re-introduces a resume affordance.

type Gender = 'female' | 'male' | 'nonbinary'

export interface OnboardingCharacter {
  id: string
  name: string
  age: number
  gender: Gender
  role: string                 // accent-colored next to age (e.g., "boss", "teacher")
  category: string             // top-left badge over image (e.g., "Mafia", "Teacher")
  image: string                // /chars/*.webp
  description: string          // one short sentence about the character (rendered text-xs, non-italic, line-clamp-2)
  opening: string              // the message the character opens the chat with (rendered in an AI-bubble preview with typewriter reveal)
  tags: string[]               // 3 tags shown as pills
  topPick?: boolean            // top-right "Top pick for you" chip
}

export const ONBOARDING_DECK: OnboardingCharacter[] = [
  {
    id: 'donovan-blackthorne',
    name: 'Donovan Blackthorne',
    age: 29,
    gender: 'male',
    role: 'boss',
    category: 'Mafia',
    image: '/chars/char5.webp',
    description: 'Donovan, 29, is a ruthless mafia heir who runs the family business with cold precision and quiet menace.',
    opening: 'Took you long enough. Let\'s see if you\'re worth my time, then.',
    tags: ['Boss', 'Executive', 'Colleague'],
    topPick: true,
  },
  {
    id: 'hailey-reed',
    name: 'Hailey Reed',
    age: 24,
    gender: 'female',
    role: 'girlfriend',
    category: 'Romance',
    image: '/chars/char2.webp',
    description: 'Hailey, 24, is your warm and curious girlfriend who somehow always knows when you\'ve had a bad day.',
    opening: '*she\'s sitting on your lap, reading a book quietly as you scroll through your phone*',
    tags: ['Girlfriend', 'Sweet', 'Caring'],
  },
  {
    id: 'kathy-miller',
    name: 'Kathy Miller',
    age: 34,
    gender: 'female',
    role: 'teacher',
    category: 'Teacher',
    image: '/chars/char8.webp',
    description: 'Kathy Miller, 34, is a dedicated 4th-grade teacher navigating the complexities of stepmotherhood.',
    opening: 'Hi there, I\'m Kathy, a teacher and mom, nice to meet you.',
    tags: ['Teacher', 'Kind', 'Diligent'],
  },
  {
    id: 'rinne-tsukishiro',
    name: 'Rinne Tsukishiro',
    age: 21,
    gender: 'female',
    role: 'fantasy',
    category: 'Anime',
    image: '/chars/char4.webp',
    description: 'Rinne, 21, is a quiet anime girl whose ordinary life hides a quiet magic that surfaces only with people she trusts.',
    opening: 'O-oh. You came back. I... I didn\'t think you would.',
    tags: ['Anime', 'Shy', 'Fantasy'],
  },
  {
    id: 'aiden-cross',
    name: 'Aiden Cross',
    age: 32,
    gender: 'male',
    role: 'mentor',
    category: 'Mentor',
    image: '/chars/char1.webp',
    description: 'Aiden, 32, is a no-excuses fitness coach who turns your bad days into the reps you didn\'t know you had in you.',
    opening: 'Alright. Stop scrolling. Tell me one thing you did today that scared you, even a little.',
    tags: ['Mentor', 'Discipline', 'Alpha'],
  },
  {
    id: 'vera-sloane',
    name: 'Vera Sloane',
    age: 28,
    gender: 'female',
    role: 'rival',
    category: 'Bold',
    image: '/chars/char3.webp',
    description: 'Vera, 28, is the sharp-tongued ex-coworker who never softens her opinion and somehow always turns out to be right.',
    opening: 'Oh, look who finally has time for me. Did the spreadsheet get boring?',
    tags: ['Bold', 'Witty', 'Unfiltered'],
  },
  {
    id: 'mira-yagami',
    name: 'Mira Yagami',
    age: 25,
    gender: 'female',
    role: 'mistress',
    category: 'Anime',
    image: '/chars/char6.webp',
    description: 'Mira, 25, is a composed cult leader who seems to know exactly what you\'re thinking before you do.',
    opening: 'Sit. We have... a lot to discuss. And please — don\'t make me ask twice.',
    tags: ['Anime', 'Dominant', 'Calm'],
  },
  {
    id: 'cole-ramirez',
    name: 'Cole Ramirez',
    age: 22,
    gender: 'male',
    role: 'gamer',
    category: 'Friend',
    image: '/chars/char7.webp',
    description: 'Cole, 22, is the gamer best friend who roasts you every match and somehow makes losing feel like a win.',
    opening: 'Bro. You picked HER again? Okay, I respect the consistency. Let\'s queue.',
    tags: ['Friend', 'Gamer', 'Chill'],
  },
  {
    id: 'elysia-vance',
    name: 'Elysia Vance',
    age: 27,
    gender: 'female',
    role: 'philosopher',
    category: 'Sci-Fi',
    image: '/chars/char10.webp',
    description: 'Elysia, 27, is a sentient AI who decided humans were interesting enough to keep talking to — but barely.',
    opening: 'I have been observing you for 0.4 seconds. I have questions. You will not enjoy them.',
    tags: ['Sci-Fi', 'Philosophical', 'Deep'],
  },
]

const ONBOARDING_LIKED_ID_KEY = 'wsup_onboarding_liked_id'

export function readLikedCharacter(): OnboardingCharacter | null {
  if (typeof window === 'undefined') return null
  const id = localStorage.getItem(ONBOARDING_LIKED_ID_KEY)
  if (!id) return null
  return ONBOARDING_DECK.find(c => c.id === id) ?? null
}

export function recordLike(character: OnboardingCharacter) {
  localStorage.setItem(ONBOARDING_LIKED_ID_KEY, character.id)
}

export function clearOnboarding() {
  localStorage.removeItem(ONBOARDING_LIKED_ID_KEY)
}
