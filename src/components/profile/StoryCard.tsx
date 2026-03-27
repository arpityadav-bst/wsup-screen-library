'use client'

import { useState } from 'react'

interface StoryCardProps {
  character: { name: string; avatar: string; img: string }
  caption: string
  likes: number
  comments: number
  date: string
  time: string
  aspectRatio?: string
}

export default function StoryCard({ character, caption, likes, comments, date, time, aspectRatio = '1/1' }: StoryCardProps) {
  const [liked, setLiked] = useState(false)

  return (
    <div className="bg-profile-sheet-bg rounded-card border border-white-10 overflow-hidden mb-s">
      {/* Image + header */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={character.img} alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)' }}
        />
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-s">
          <div className="flex items-center gap-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={character.avatar} alt={character.name} className="w-[34px] h-[34px] rounded-full object-cover object-top shrink-0" />
            <span className="text-sm font-bold text-text-title drop-shadow-sm">{character.name}</span>
          </div>
          <button className="px-s py-xxs rounded-pill border border-white-30 bg-white-10 backdrop-blur-bg text-xs font-semibold text-text-title cursor-pointer">
            Chat
          </button>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-xxs px-s py-xs">
        {/* Like */}
        <button onClick={() => setLiked(l => !l)} className={`flex items-center gap-xxs bg-transparent border-none cursor-pointer px-xs py-xxs ${liked ? 'text-status-alert' : 'text-accent-light'}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'}>
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium">{likes + (liked ? 1 : 0)}</span>
        </button>

        {/* Comments */}
        <button className="flex items-center gap-xxs bg-transparent border-none cursor-pointer px-xs py-xxs text-accent-light">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="8" cy="11" r="1" fill="currentColor" /><circle cx="12" cy="11" r="1" fill="currentColor" /><circle cx="16" cy="11" r="1" fill="currentColor" />
          </svg>
          <span className="text-sm font-medium">{comments}</span>
        </button>

        {/* Share */}
        <button className="flex items-center justify-center bg-transparent border-none cursor-pointer px-xs py-xxs text-accent-light">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* Enter This Story — S size primary button */}
        <button className="ml-auto flex items-center gap-xxs px-m py-xs rounded-pill bg-accent text-sm font-semibold text-text-title cursor-pointer shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Enter This Story
        </button>

        {/* 3-dot menu */}
        <button className="flex items-center justify-center bg-transparent border-none cursor-pointer px-xxs py-xxs text-accent-light shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>

      {/* Caption */}
      <div className="px-s pb-s">
        <p className="text-sm text-text-subtitle leading-relaxed line-clamp-3">{caption}</p>
        <span className="text-xxs text-text-xxsmall mt-xxs inline-block">{date} · {time}</span>
      </div>
    </div>
  )
}
