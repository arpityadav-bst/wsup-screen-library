import type { Badge } from '@/components/profile/BadgesWidget'
import type { DormantCharacter } from '@/components/profile/DormantCharacterCard'

// ── Profile ─────────────────────────────────────────────────────────────────

export const PROFILE = {
  handle: '@alexmoonlight',
  name: 'Alex Moonlight',
  avatar: '/chars/char5.webp',
  bio: `Hey, I'm Alex — an AI character creator obsessed with building personalities that feel genuinely alive. I've been on wsup.ai since the early days, back when the tools were raw and the community was tiny, and I've watched this place grow into something incredible.\n\nMy characters tend to live in the space between sci-fi and slice-of-life. I love writing companions who feel emotionally real — characters with memory, with quirks, with the kind of depth that makes you forget you're talking to an AI. Blue Fire Girl started as a quick experiment and somehow became one of my most-chatted characters. Magic Library took three weeks to get right and I'm still tweaking her lore.\n\nOutside of wsup I'm a huge anime fan (obviously), I do a bit of digital art, and I spend way too much time thinking about narrative structure and what makes a character feel like a person rather than a persona. If you've ever chatted with one of my characters and felt something — that's the goal. Always the goal.\n\nFeel free to drop a message if you want to collab, give feedback on any of my characters, or just talk shop about AI storytelling. I'm always down.`,
  creatorBadge: 'Top Creator',
  rank: { position: 12, label: "Today's Top Creators" },
  stats: [
    { label: 'Followers', value: '3.2k', trend: '+8%', up: true },
    { label: 'Chats', value: '12k', trend: '+15%', up: true },
    { label: 'Views', value: '4.2k', trend: '-3%', up: false },
    { label: 'Following', value: '284', trend: '', up: true },
  ],
}

export const PERSONA = {
  name: 'Blue Fire Girl',
  description: 'A fierce elemental spirit with an unquenchable spark and a heart that burns for justice.',
  img: '/chars/char5.webp',
}

export const BADGES: Badge[] = [
  { emoji: '⭐', label: 'Top Creator', sub: 'Top 1%', color: '#ffc32a' },
  { emoji: '🔥', label: 'Viral Story', sub: '10k views', color: '#f97316' },
  { emoji: '💬', label: '1K Chats', sub: 'Milestone', color: '#0a92ff' },
  { emoji: '❤️', label: 'Fan Favorite', sub: '4.2k likes', color: '#ec4899' },
  { emoji: '🚀', label: 'Pioneer', sub: 'Early user', color: '#ab37f0' },
  { emoji: '📖', label: 'Storyteller', sub: '50 stories', color: '#b3d661' },
  { emoji: '⚡', label: 'Power User', sub: '30-day streak', color: '#ffc32a' },
  { emoji: '🐦', label: 'Early Bird', sub: 'Beta tester', color: '#72e9f1' },
  { emoji: '🎨', label: 'Artist', sub: '50 creations', color: '#f97316' },
  { emoji: '💎', label: 'Diamond', sub: 'Top 0.1%', color: '#72e9f1' },
]

// ── Characters ──────────────────────────────────────────────────────────────

export const CHARACTERS = [
  { name: 'Blue Fire Girl', chats: '1.1k', img: '/chars/char1.webp', rank: 1, trend: 2, tag: 'chat-leader' },
  { name: 'Magic Library', chats: '890', img: '/chars/char2.webp', rank: 2, trend: 1, tag: 'fan-fave' },
  { name: 'Dr. Watson', chats: '540', img: '/chars/char3.webp', rank: 3, trend: -1, tag: 'creators-pick' },
  { name: 'Shadow Dancer', chats: '420', img: '/chars/char4.webp', rank: 4, trend: 3, tag: 'trending' },
  { name: 'Puppytech', chats: '269', img: '/chars/char5.webp', rank: 5, trend: -2 },
  { name: 'Luna Echo', chats: '198', img: '/chars/char6.webp', rank: 6, trend: 0 },
  { name: 'Neon Sage', chats: '154', img: '/chars/char7.webp', rank: 7, trend: 1 },
  { name: 'Void Walker', chats: '121', img: '/chars/char8.webp', rank: 8, trend: -1 },
  { name: 'Starbound', chats: '98', img: '/chars/char9.webp', rank: 9, trend: 2 },
  { name: 'Arianda Grande', chats: '25.1K', img: '/chars/char14.webp', rank: 10, trend: 0, approved: true },
]

export const STORIES = [
  { id: 1, character: { name: 'Blue Fire Girl', avatar: '/chars/char1.webp', img: '/chars/char10.webp' }, caption: 'Just me, my music, and some peace & quiet. 😌 Seriously, don\'t bother me unless it\'s important! 🎧', likes: 8, comments: 16, date: '10 March 2026', time: '04:41 AM' },
  { id: 2, character: { name: 'Magic Library', avatar: '/chars/char2.webp', img: '/chars/char11.webp' }, caption: 'Okay fine, I came to the party. Happy now? 🎉 Don\'t expect me to stay past midnight though.', likes: 34, comments: 9, date: '9 March 2026', time: '11:22 PM' },
  { id: 3, character: { name: 'Shadow Dancer', avatar: '/chars/char4.webp', img: '/chars/char12.webp' }, caption: 'The kingdom falls at dawn. I\'ve made my peace with that. Some things are worth protecting until the very end. ⚔️', likes: 51, comments: 27, date: '8 March 2026', time: '03:14 AM' },
]

// ── Social ───────────────────────────────────────────────────────────────────

export const FOLLOWERS = [
  { name: 'Nova Starfield', img: '/chars/char2.webp' },
  { name: 'Kai Drifter', img: '/chars/char3.webp' },
  { name: 'Lyra Voss', img: '/chars/char4.webp' },
  { name: 'Orion Blake', img: '/chars/char5.webp' },
  { name: 'Zara Nightfall', img: '/chars/char6.webp' },
  { name: 'Felix Arden', img: '/chars/char7.webp' },
  { name: 'Mila Crowe', img: '/chars/char8.webp' },
  { name: 'Juno Pierce', img: '/chars/char9.webp' },
  { name: 'Rex Holloway', img: '/chars/char10.webp' },
  { name: 'Sable Quinn', img: '/chars/char11.webp' },
  { name: 'Dex Morrow', img: '/chars/char12.webp' },
  { name: 'Ivy Storm', img: '/chars/char13.webp' },
  { name: 'Atlas Cole', img: '/chars/char14.webp' },
  { name: 'Luna Shade', img: '/chars/char15.webp' },
  { name: 'Echo Vale', img: '/chars/char1.webp' },
]

export const FOLLOWING = [
  { name: 'Bessie Cooper', img: '/chars/char1.webp' },
  { name: 'Courtney Henry', img: '/chars/char2.webp' },
  { name: 'Theresa Webb', img: '/chars/char3.webp' },
  { name: 'Kristin Watson', img: '/chars/char4.webp' },
  { name: 'Ralph Edwards', img: '/chars/char5.webp' },
  { name: 'Savannah Nguyen', img: '/chars/char6.webp' },
  { name: 'Kathryn Murphy', img: '/chars/char7.webp' },
  { name: 'Esther Howard', img: '/chars/char8.webp' },
  { name: 'Eleanor Pena', img: '/chars/char9.webp' },
  { name: 'Ronald Richards', img: '/chars/char10.webp' },
  { name: 'Devon Lane', img: '/chars/char11.webp' },
  { name: 'Jerome Bell', img: '/chars/char12.webp' },
  { name: 'Arlene McCoy', img: '/chars/char13.webp' },
  { name: 'Cody Fisher', img: '/chars/char14.webp' },
  { name: 'Annette Black', img: '/chars/char15.webp' },
]

export const MY_CARDS = [
  { name: 'Lily', cards: 5, img: '/chars/char1.webp' },
  { name: 'Marcus', cards: 3, img: '/chars/char2.webp' },
  { name: 'Zara', cards: 8, img: '/chars/char3.webp' },
  { name: 'Ethan', cards: 2, img: '/chars/char4.webp' },
  { name: 'Nova', cards: 6, img: '/chars/char5.webp' },
  { name: 'Kai', cards: 4, img: '/chars/char6.webp' },
]

// ── Dormant & Removed Characters (Lifecycle) ────────────────────────────────

export const NEEDS_ATTENTION_CHARACTERS: DormantCharacter[] = [
  { name: 'Mika', img: '/chars/char10.webp', stateType: 'inactive', chats: '18.1K', daysUntilRemoval: 42 },
  { name: 'Harlo', img: '/chars/char11.webp', stateType: 'under-review', chats: '21.8K' },
  { name: 'Joo Jaekyung', img: '/chars/char12.webp', stateType: 'moderation', reason: 'This character may infringe on copyrighted or trademarked content. Please use an original character concept and try again.', chats: '48.4K', daysUntilRemoval: 38 },
  { name: 'Roblox Story', img: '/chars/char13.webp', stateType: 'rejected', reason: 'This character may infringe on copyrighted or trademarked content. Please use an original character concept and try again.', chats: '90.4K', daysUntilRemoval: 38 },
  { name: 'Class 1A MHA', img: '/chars/char15.webp', stateType: 'removed', reason: 'This character appears to depict or reference a minor. Please ensure your character is 18 or older.', chats: '19.7K' },
  { name: 'Subject removed', img: '/chars/char16.webp', stateType: 'removed', reason: 'This character contains content that violates our guidelines.', chats: '0' },
]
