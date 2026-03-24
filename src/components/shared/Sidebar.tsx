'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useEffect, useState, useCallback } from 'react'
import GenerateImagesCard from '@/components/shared/GenerateImagesCard'

// All icons sourced directly from Figma component assets

function StoriesIcon({ active }: { active?: boolean }) {
  const fill = active ? 'white' : 'rgba(255,255,255,0.8)'
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.999 11.833C12.827 11.833 13.4998 12.5044 13.5 13.333V14.333C13.5 14.6092 13.2761 14.833 13 14.833C12.7239 14.833 12.5 14.6092 12.5 14.333V13.333C12.4998 13.0574 12.2754 12.833 11.999 12.833H4.00098C3.72457 12.833 3.50018 13.0574 3.5 13.333V14.333C3.5 14.6092 3.27614 14.833 3 14.833C2.72386 14.833 2.5 14.6092 2.5 14.333V13.333C2.50018 12.5044 3.17303 11.833 4.00098 11.833H11.999ZM12 5.33301C13.1045 5.33301 13.9998 6.22859 14 7.33301V8.66699C13.9998 9.77141 13.1045 10.667 12 10.667H4C2.89554 10.667 2.00018 9.77141 2 8.66699V7.33301C2.00018 6.22859 2.89554 5.33301 4 5.33301H12ZM13 1.16699C13.2761 1.16699 13.5 1.39085 13.5 1.66699V2.66699C13.4998 3.49527 12.8283 4.16699 12 4.16699H4C3.17168 4.16699 2.50018 3.49527 2.5 2.66699V1.66699C2.5 1.39085 2.72386 1.16699 3 1.16699C3.27614 1.16699 3.5 1.39085 3.5 1.66699V2.66699C3.50018 2.94298 3.72397 3.16699 4 3.16699H12C12.276 3.16699 12.4998 2.94298 12.5 2.66699V1.66699C12.5 1.39085 12.7239 1.16699 13 1.16699Z" fill={fill} />
    </svg>
  )
}

function ExploreIcon({ active }: { active?: boolean }) {
  const fill = active ? 'white' : 'rgba(255,255,255,0.8)'
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 0C3.93993 1.68111 5.31889 3.06007 7 3C5.31889 2.93993 3.93993 4.31889 4 6C4.06007 4.31889 2.68111 2.93993 1 3C2.68111 3.06007 4.06007 1.68111 4 0Z" fill={fill} />
      <path d="M10 2C9.89989 4.80184 12.1982 7.10011 15 7C12.1982 6.89989 9.89989 9.19816 10 12C10.1001 9.19816 7.80184 6.89989 5 7C7.80184 7.10011 10.1001 4.80184 10 2Z" fill={fill} />
      <path d="M5 8C4.91991 10.2415 6.75852 12.0801 9 12C6.75852 11.9199 4.91991 13.7585 5 16C5.08009 13.7585 3.24148 11.9199 1 12C3.24148 12.0801 5.08009 10.2415 5 8Z" fill={fill} />
    </svg>
  )
}

function CreateCharIcon({ active }: { active?: boolean }) {
  const stroke = active ? 'white' : 'rgba(255,255,255,0.8)'
  return (
    <svg width="20" height="21" viewBox="0 0 16 16.1667" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.6667 6.3772V11.5C14.6667 13.7091 12.8758 15.5 10.6667 15.5H5.33333C3.12419 15.5 1.33333 13.7091 1.33333 11.5V6.16662C1.33333 3.95748 3.12419 2.16663 5.33333 2.16663H8" stroke={stroke} strokeLinecap="round" />
      <path d="M6 10.8333C6 10.8333 7 11.5 8 11.5C9 11.5 10 10.8333 10 10.8333" stroke={stroke} strokeLinecap="round" />
      <line x1="5.83333" y1="7.33333" x2="5.83333" y2="8.33333" stroke={stroke} strokeLinecap="round" />
      <line x1="9.83333" y1="7.33333" x2="9.83333" y2="8.33333" stroke={stroke} strokeLinecap="round" />
      <path d="M12.6667 0.5V2.83333M12.6667 5.16667V2.83333M12.6667 2.83333H10.3333H15" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CreateStoryIcon({ active }: { active?: boolean }) {
  const fill = active ? 'white' : 'rgba(255,255,255,0.8)'
  return (
    <svg width="20" height="20" viewBox="0 0 16.2002 16.1098" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.09961 0C3.63799 0.000206197 0 3.53247 0 7.91504C0.000223913 12.2974 3.63813 15.8289 8.09961 15.8291C12.5613 15.8291 16.2 12.2976 16.2002 7.91504C16.2002 6.72347 15.9306 5.5915 15.4473 4.57715C15.3284 4.32804 15.0295 4.22213 14.7803 4.34082C14.531 4.4596 14.4252 4.75853 14.5439 5.00781C14.9649 5.8912 15.2002 6.87602 15.2002 7.91504C15.2 11.7221 12.0324 14.8291 8.09961 14.8291C4.167 14.8289 1.00022 11.722 1 7.91504C1 4.10788 4.16686 1.00021 8.09961 1C8.81636 1 9.50824 1.10318 10.1592 1.29492C10.4238 1.37264 10.7011 1.22154 10.7793 0.957031C10.8573 0.692195 10.7062 0.414028 10.4414 0.335938C9.69953 0.117408 8.91285 0 8.09961 0ZM13.3677 0.29159C13.2757 0.0491448 12.9243 0.0491449 12.8323 0.29159L12.6989 0.643244C12.45 1.29958 11.9196 1.81706 11.2468 2.05993L10.8864 2.19005C10.6379 2.27976 10.6379 2.62267 10.8864 2.71239L11.2468 2.84251C11.9196 3.08538 12.45 3.60286 12.6989 4.25919L12.8323 4.61085C12.9243 4.85329 13.2757 4.85329 13.3677 4.61085L13.5011 4.25919C13.75 3.60286 14.2804 3.08538 14.9532 2.84251L15.3136 2.71239C15.5621 2.62267 15.5621 2.27976 15.3136 2.19005L14.9532 2.05993C14.2804 1.81706 13.75 1.29958 13.5011 0.643244L13.3677 0.29159ZM7.6 7.41463V4.79268C7.6 4.51654 7.82386 4.29268 8.1 4.29268C8.37614 4.29268 8.6 4.51654 8.6 4.79268V7.41463H11.3C11.5761 7.41463 11.8 7.63849 11.8 7.91463C11.8 8.19078 11.5761 8.41463 11.3 8.41463H8.6V11.0368C8.59987 11.3129 8.37606 11.5368 8.1 11.5368C7.82394 11.5368 7.60013 11.3129 7.6 11.0368V8.41463H4.89961C4.62365 8.41442 4.39961 8.19065 4.39961 7.91463C4.39961 7.63862 4.62365 7.41484 4.89961 7.41463H7.6Z" fill={fill} />
    </svg>
  )
}

function GenerateImagesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="genImg0" x1="4.86191" y1="0.692763" x2="14.9241" y2="16.0388" gradientUnits="userSpaceOnUse">
          <stop style={{ stopColor: 'var(--color-gradient-warm-light)' }} /><stop offset="0.481054" style={{ stopColor: 'var(--color-gradient-warm-mid)' }} /><stop offset="1" style={{ stopColor: 'var(--color-gradient-warm-dark)' }} />
        </linearGradient>
        <linearGradient id="genImg1" x1="5.30241" y1="7.80492" x2="9.09022" y2="18.1685" gradientUnits="userSpaceOnUse">
          <stop style={{ stopColor: 'var(--color-gradient-warm-light)' }} /><stop offset="0.481054" style={{ stopColor: 'var(--color-gradient-warm-mid)' }} /><stop offset="1" style={{ stopColor: 'var(--color-gradient-warm-dark)' }} />
        </linearGradient>
        <linearGradient id="genImg2" x1="4.68958" y1="3.55083" x2="7.28773" y2="7.51102" gradientUnits="userSpaceOnUse">
          <stop style={{ stopColor: 'var(--color-gradient-warm-light)' }} /><stop offset="0.481054" style={{ stopColor: 'var(--color-gradient-warm-mid)' }} /><stop offset="1" style={{ stopColor: 'var(--color-gradient-warm-dark)' }} />
        </linearGradient>
        <clipPath id="genImgClip"><rect width="16" height="16" fill="white" /></clipPath>
      </defs>
      <g clipPath="url(#genImgClip)">
        <path d="M4.53613 0.5H11.4717C12.7049 0.500111 13.7015 0.930418 14.3906 1.65039C15.0815 2.37236 15.5 3.42454 15.5 4.73145V10.1621C15.5 11.0782 15.4455 12.4264 14.8584 13.5371C14.5705 14.0817 14.1561 14.5641 13.5547 14.9141C12.9516 15.265 12.1298 15.5 11 15.5H4C3.10347 15.5 2.26336 15.235 1.63379 14.4795C0.989831 13.7065 0.5 12.3425 0.5 10V4.73145C0.5 3.42454 0.91856 2.37233 1.61035 1.65039C2.30045 0.930326 3.29911 0.5 4.53613 0.5Z" stroke="url(#genImg0)" />
        <path d="M16 10.1616V11.2688C16 11.4528 15.992 11.6376 15.976 11.8208C15.752 14.3488 13.996 16 11.4632 16H4.53599C3.25359 16 2.17119 15.584 1.39359 14.8288C1.08577 14.5459 0.828472 14.2126 0.632786 13.8432C0.896786 13.5216 1.19279 13.1696 1.48239 12.8168C1.90831 12.3088 2.32781 11.7954 2.74079 11.2768C3.18079 10.7312 4.34399 9.29599 5.95519 9.96959C6.28319 10.1056 6.57199 10.2976 6.83679 10.4664C7.48639 10.9 7.75839 11.028 8.21519 10.7792C8.72079 10.5072 9.04959 9.96959 9.39359 9.40799C9.57759 9.11039 9.76239 8.82239 9.96319 8.55759C10.8368 7.41919 12.1832 7.11439 13.3056 7.78799C13.8672 8.12399 14.348 8.54959 14.7968 8.98239C14.8928 9.07839 14.9888 9.16719 15.0768 9.25519C15.1968 9.37519 15.5992 9.77679 16 10.1616Z" fill="url(#genImg1)" />
        <path d="M7.56321 5.4376C7.55841 5.98359 7.33944 6.50588 6.95342 6.89204C6.5674 7.27821 6.0452 7.49739 5.49921 7.5024C4.37281 7.5024 3.43521 6.564 3.43521 5.4376C3.43521 4.3112 4.37281 3.372 5.49921 3.372C6.62481 3.372 7.56321 4.3112 7.56321 5.4376Z" fill="url(#genImg2)" />
      </g>
    </svg>
  )
}

const navItems = [
  { label: 'Stories', href: '/stories', Icon: StoriesIcon },
  { label: 'Explore', href: '/explore', Icon: ExploreIcon },
  { label: 'Create Character', href: '/create-character', Icon: CreateCharIcon },
  { label: 'Create Story', href: '/create-story', Icon: CreateStoryIcon },
]

type ChatItem = {
  name: string
  preview: string
  time: string
  avatar: string
  isGroup?: boolean
  participants?: number
  sender?: string
}

const recentChats: ChatItem[] = [
  { name: 'Sarah', preview: 'How about now?', time: '5m', avatar: '/chars/avatars/char1.jpg' },
  { name: 'Night Crew', preview: 'Oh, I think I do, Ghostface, and I thin...', time: '2d', avatar: '/chars/avatars/char2.jpg', isGroup: true, participants: 4, sender: 'Makima' },
  { name: 'Elle', preview: 'What about it?', time: '1h', avatar: '/chars/avatars/char2.jpg' },
  { name: 'Makima', preview: 'would you like to eat keema by makima?', time: 'Yesterday', avatar: '/chars/avatars/char3.jpg' },
  { name: 'Sunshine', preview: 'hello there...', time: 'Yesterday', avatar: '/chars/avatars/char4.jpg' },
  { name: 'Squad', preview: 'New diet plan should be consisting of balanced', time: 'Yesterday', avatar: '/chars/avatars/char5.jpg', isGroup: true, participants: 6, sender: 'Rinne' },
  { name: 'Roye', preview: 'u there?', time: 'Mon', avatar: '/chars/avatars/char5.jpg' },
  { name: 'Kai', preview: 'bro you free tonight?', time: 'Mon', avatar: '/chars/avatars/char7.jpg' },
  { name: 'Aurelio', preview: 'Ah, a fine evening it is indeed.', time: 'Sun', avatar: '/chars/avatars/char9.jpg' },
  { name: 'Nova', preview: 'What does it mean to truly exist?', time: 'Sun', avatar: '/chars/avatars/char10.jpg' },
  { name: 'Aria', preview: 'I missed talking to you!', time: 'Sat', avatar: '/chars/avatars/char6.jpg' },
  { name: 'Zara', preview: 'Did you see that? Insane.', time: 'Sat', avatar: '/chars/avatars/char8.jpg' },
]

const activeNavGradient = 'linear-gradient(90deg, rgba(114,233,241,0.1) 0%, rgba(113,146,229,0.1) 50%, rgba(98,87,215,0.1) 100%), linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%)'

export default function Sidebar() {
  const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollVisible, setScrollVisible] = useState(false)
  const [thumbTop, setThumbTop] = useState(0)
  const [thumbHeight, setThumbHeight] = useState(0)
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateThumb = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const ratio = el.clientHeight / el.scrollHeight
    setThumbHeight(Math.max(ratio * el.clientHeight, 24))
    setThumbTop((el.scrollTop / el.scrollHeight) * el.clientHeight)
  }, [])

  const onScroll = useCallback(() => {
    updateThumb()
    setScrollVisible(true)
    if (fadeTimer.current) clearTimeout(fadeTimer.current)
    fadeTimer.current = setTimeout(() => setScrollVisible(false), 800)
  }, [updateThumb])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateThumb()
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [onScroll, updateThumb])

  return (
    <aside className="fixed top-[60px] left-0 bottom-0 w-[365px] bg-page-bg border-r border-white-10 flex flex-col z-40">

      {/* Generate Images card */}
      <div className="px-3 pt-3 pb-1 shrink-0">
        <GenerateImagesCard uid="sidebar" />
      </div>

      {/* Nav items */}
      <nav className="flex flex-col shrink-0">
        {navItems.map(({ label, href, Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-2 px-6 py-4 text-[12px] font-normal transition-colors hover:bg-white-05 ${active ? 'text-text-title' : 'text-white-70'}`}
              style={active ? { backgroundImage: activeNavGradient } : undefined}
            >
              <Icon active={active} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Divider */}
      <div className="border-t border-white-10 shrink-0" />

      {/* Recent Chats */}
      <div className="flex-1 min-h-0 relative">
        {/* Custom scrollbar thumb */}
        <div
          className="absolute right-0 w-[2px] rounded-full pointer-events-none z-50 transition-opacity duration-300"
          style={{
            top: thumbTop,
            height: thumbHeight,
            backgroundColor: 'rgba(255,255,255,0.2)',
            opacity: scrollVisible ? 1 : 0,
          }}
        />
      <div ref={scrollRef} className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center justify-between px-6 py-3">
          <span className="label-xs">Recent Chats</span>
          <button className="text-secondary text-[10px] font-semibold tracking-[0.2px] flex items-center justify-center gap-[3px]">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" className="shrink-0 relative -top-[1px]">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="leading-none">GROUP CHAT</span>
          </button>
        </div>

        <div className="flex flex-col">
          {recentChats.map((chat, i) => (
            <div key={chat.name} className="relative group">
              <div className="flex items-center gap-3 px-6 py-4 hover:bg-white-05 cursor-pointer transition-colors">

                {/* Avatar */}
                <div className="relative shrink-0 w-9 h-9">
                  <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-white-20">
                    <Image src={chat.avatar} alt={chat.name} width={72} height={72} className="object-cover w-full h-full" unoptimized />
                  </div>
                  {/* Group participant count badge — bottom center */}
                  {chat.isGroup && (
                    <div className="absolute -bottom-2 -right-2 bg-secondary-surface rounded-full w-[24px] h-[24px] flex items-center justify-center text-[11px] font-medium text-white-60 leading-none" style={{ boxShadow: '0 0 0 2px var(--page-bg)' }}>
                      <span className="relative top-[0px] -left-[1px]">+{chat.participants}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-white-70 text-sm font-medium leading-[1.45]">{chat.name}</p>
                  <div className="flex items-center gap-1 text-[12px] font-normal leading-[1.3]">
                    <p className="text-text-dim truncate min-w-0">
                      {chat.isGroup && chat.sender && (
                        <span className="text-white-70">{chat.sender}: </span>
                      )}
                      {chat.preview}
                    </p>
                    <span className="text-text-dim shrink-0 whitespace-nowrap">· {chat.time}</span>
                  </div>
                </div>
              </div>

              {/* Close button on hover */}
              <button aria-label="Remove chat" className="absolute top-3 right-4 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity p-1 rounded-full hover:bg-white-20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white-20">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1l8 8M9 1L1 9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {i < recentChats.length - 1 && (
                <div className="absolute bottom-0 left-6 right-6 border-t border-white-10" />
              )}
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-white-10 px-6 py-3">
        <p className="text-[10px] font-normal text-text-xxsmall">© 2026 now.gg. All rights reserved.</p>
      </div>
    </aside>
  )
}
