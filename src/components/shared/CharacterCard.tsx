import Image from 'next/image'
import Link from 'next/link'
import { formatRank, formatCount } from '@/lib/cn'

interface Tag {
  label: string
}

interface CharacterCardProps {
  name: string
  description: string
  image: string
  tags: Tag[]
  rank: string
  chats: number
}

export default function CharacterCard({
  name,
  description,
  image,
  tags,
  rank,
  chats,
}: CharacterCardProps) {
  return (
    <Link href="/chat" className="relative rounded-card overflow-hidden cursor-pointer group aspect-[9/16] w-full ring-1 ring-white-10 hover:ring-accent transition-all duration-300 shadow-normal block">
      {/* Character image */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
      />

      {/* Scrim — concentrated at bottom for text, clears quickly above */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black-60 via-[38%] to-transparent to-[62%]" />

      {/* Hover accent tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />


      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-s">
        {/* Name + View Profile */}
        <div className="flex items-center gap-[6px] mb-xxs min-w-0">
          <h3 className="text-text-title font-semibold text-sm leading-tight truncate min-w-0">{name}</h3>
          <span className="hidden md:block text-white-30 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">·</span>
          <button className="hidden md:block text-secondary hover:text-secondary-hover text-xs font-medium leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 whitespace-nowrap">
            View Profile
          </button>
        </div>

        {/* Description */}
        <p className="text-text-body text-xs leading-snug mb-[6px] line-clamp-2">{description}</p>

        {/* Tags — max 3 on mobile, all on desktop */}
        <div className="flex flex-wrap gap-xxs mb-xs">
          {tags.map((tag, i) => (
            <span
              key={tag.label}
              className={`text-xxs font-normal px-xs py-[3px] rounded-pill bg-white-10 backdrop-blur-bg text-white-80 border border-white-10${i >= 3 ? ' hidden md:inline-block' : ''}`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Stats + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-xs md:gap-m text-text-xsmall text-xxs min-w-0 shrink overflow-hidden">
            <span className="shrink-0"><span className="text-text-subtitle font-semibold">{formatRank(rank)}</span> rank</span>
            <span className="shrink-0"><span className="text-text-subtitle font-semibold">{formatCount(chats)}</span> chats</span>
          </div>
          {/* Chat CTA — desktop hover only (hidden on mobile, no hover state) */}
          <button className="hidden md:flex text-sm font-semibold text-white bg-accent hover:bg-accent-hover px-m py-xs rounded-pill opacity-0 translate-y-[6px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 leading-none shrink-0">
            <span className="flex items-center gap-xxs">Chat <svg className="opacity-50 -translate-y-[1px]" width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          </button>
        </div>
      </div>
    </Link>
  )
}
