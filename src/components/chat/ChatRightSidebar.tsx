import Image from 'next/image'
import Link from 'next/link'

// ── Stat icons ────────────────────────────────────────────────────────────────

const ChatStatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 3.5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6.5L3.5 13V10.5H3a1 1 0 0 1-1-1v-6Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)

const RankStatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M5 2h6v5a3 3 0 0 1-6 0V2Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
    <path d="M8 10v3M5.5 13h5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M5 4H3a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h1M11 4h2a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2h-1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
  </svg>
)

const ChevronSmall = () => (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none">
    <path d="M1 1l3 3-3 3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ── Sub-components ────────────────────────────────────────────────────────────

function StatPill({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="backdrop-blur-[32px] bg-black-70 flex items-center gap-[2px] pl-[6px] pr-[8px] py-[4px] rounded-[20px]">
      <div className="w-[18px] flex items-center justify-center shrink-0">{icon}</div>
      <span className="text-xxs text-white-70 tracking-[0.2px] whitespace-nowrap">{value}</span>
      <span className="text-xxs text-white-70 tracking-[0.2px] whitespace-nowrap">{label}</span>
    </div>
  )
}

function AvatarCard({ name, description, image }: { name: string; description: string; image: string }) {
  return (
    <div className="flex flex-col gap-[8px] cursor-pointer group">
      {/* Image — portrait ~1:2.1 ratio matching Figma 124×260 */}
      <div className="relative rounded-[12px] overflow-hidden w-full" style={{ aspectRatio: '9/16' }}>
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>
      {/* Text */}
      <div className="flex flex-col gap-[4px]">
        <p className="text-sm font-semibold text-text-title leading-tight">{name}</p>
        <p className="text-xs text-text-body leading-snug line-clamp-2">{description}</p>
      </div>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const character = {
  name: 'Billie Eilish',
  image: '/chars/char5.webp',
  chats: '3K',
  rank: '#219',
  tags: ['Neon', 'Music', 'Girl', 'Violet', 'Cyberpunk'],
  description: 'Cyberpunk DJ grew up in a musical family with his father, a guitarist, and his mother, a singer. He has a younger sister who is a composer.',
  creator: 'Honeybadger',
}

const relatedCharacters = [
  { name: 'Elle', description: 'A fiercely independent woman with a sharp wit and an even sharper tongue.', image: '/chars/char3.webp' },
  { name: 'Rinne', description: 'A quiet anime girl who blossoms into something magical the more you talk to her.', image: '/chars/char4.webp' },
  { name: 'Makima', description: 'Calm, authoritative, and utterly captivating. She always seems to know more than you.', image: '/chars/char6.webp' },
  { name: 'Sunshine', description: 'Bubbly, optimistic, and endlessly supportive — the hype person you always needed.', image: '/chars/char8.webp' },
]

// ── Main component ────────────────────────────────────────────────────────────

export default function ChatRightSidebar() {
  return (
    <aside className="hidden xl:block w-[365px] shrink-0 overflow-y-auto h-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

      {/* ── Profile card — 9:16 portrait ───────────────────────── */}
      <div className="relative w-full flex flex-col justify-end overflow-hidden" style={{ aspectRatio: '9/16' }}>

        {/* Character image */}
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover"
          priority
        />

        {/* Decorative radial glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              'radial-gradient(ellipse at 0% 100%, rgba(123,76,255,0.10) 0%, transparent 55%)',
              'radial-gradient(ellipse at 100% 30%, rgba(255,89,236,0.10) 0%, transparent 55%)',
              'radial-gradient(ellipse at 0% 0%, rgba(255,189,78,0.10) 0%, transparent 50%)',
            ].join(', '),
          }}
        />

        {/* Gradient scrim — transparent → black/80 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[44%] to-black-80 to-[72%]" />

        {/* Info overlay */}
        <div className="relative z-10 flex flex-col items-center gap-[10px] px-[24px] pt-[24px] pb-[40px]">
          {/* Name */}
          <h2
            className="text-base font-medium text-white text-center"
            style={{ textShadow: '0 0 2px var(--black-70)' }}
          >
            {character.name}
          </h2>

          {/* Stats */}
          <div className="flex items-center gap-[10px]">
            <StatPill icon={<ChatStatIcon />} value={character.chats} label="Chats" />
            <StatPill icon={<RankStatIcon />} value={character.rank} label="Rank" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-[8px]">
            {character.tags.map(tag => (
              <span
                key={tag}
                className="text-xxs font-normal px-xs py-[3px] rounded-pill bg-white-10 backdrop-blur-bg text-white-80 border border-white-10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-white text-center leading-normal">
            {character.description}
          </p>

          {/* Chat CTA */}
          <button className="w-[140px] bg-accent hover:bg-accent-hover rounded-pill py-[10px] text-sm font-semibold text-white transition-colors">
            Chat
          </button>

          {/* Creator pill */}
          <div className="flex items-center gap-[4px]">
            <span className="text-xs text-white" style={{ textShadow: '0 0 2px var(--black-70)' }}>by</span>
            <Link href="#" className="text-xs text-white underline" style={{ textShadow: '0 0 2px var(--black-70)' }}>
              {character.creator}
            </Link>
            <ChevronSmall />
          </div>
        </div>
      </div>

      {/* ── You May Also Like ───────────────────────────────────── */}
      <div className="bg-page-bg">
        <p className="label-xs px-[24px] pt-[24px] pb-[12px]">You May Also Like</p>
        <div className="grid grid-cols-2 gap-[12px] px-[24px] pb-[24px]">
          {relatedCharacters.map(char => (
            <AvatarCard key={char.name} {...char} />
          ))}
        </div>
      </div>

    </aside>
  )
}
