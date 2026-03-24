'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16.8333 13.5" fill="none">
    <path d="M6.97727 0.5L0.5 6.75M0.5 6.75L6.97727 13M0.5 6.75H16.3333" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PlusIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M5 2v6M2 5h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const ChevronSmall = () => (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none">
    <path d="M1 1l3 3-3 3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DotsVerticalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="rgba(255,255,255,0.9)">
    <circle cx="10" cy="4.5" r="1.5" />
    <circle cx="10" cy="10" r="1.5" />
    <circle cx="10" cy="15.5" r="1.5" />
  </svg>
)

const GameIcon = () => (
  <svg width="22" height="22" viewBox="0 0 512 512" fill="rgba(255,255,255,0.9)">
    <path d="M350.18 221.99c-.24 0-.48 0-.72 0-15.49.4-27.73 13.3-27.33 28.84.41 15.23 12.88 27.32 28.02 27.32.26 0 .52 0 .78-.01 15.5-.4 27.73-13.3 27.34-28.8-.39-15.26-12.9-27.35-28.08-27.35zM396.91 147.2c-.25 0-.5 0-.75 0-15.5.42-27.73 13.3-27.34 28.83.41 15.23 12.9 27.32 28.03 27.32.26 0 .53 0 .8-.01 15.49-.39 27.74-13.3 27.34-28.79-.41-15.26-12.89-27.35-28.08-27.35z" />
    <path d="M511.97,363.87c-1.2-66.8-9.09-134.35-22.03-202.53-10.54-47.37-48.46-89.56-109.05-92.65-1.56-.06-3.08-.1-4.56-.1-40.44,0-50.39,23.26-98.08,23.26-.47,0-.94,0-1.42,0-6.91-.04-13.82-.06-20.73-.06s-13.93,.02-20.9,.06c-.48,0-.95,0-1.42,0-47.69,0-57.68-23.25-98.08-23.25-1.48,0-3,.03-4.56,.1-60.6,3.09-99.7,45.17-109.09,92.65C9.09,229.53,1.2,297.06,0,363.86c-.29,46.51,45.63,77.45,75.93,79.57,1.23,.09,2.45,.14,3.67,.14,56.81,0,102.1-98.93,136.79-98.94,13.23,.08,26.47,.12,39.7,.12s26.35-.04,39.52-.12c34.69,0,79.96,98.95,136.8,98.95,1.22,0,2.44-.05,3.67-.14,30.29-2.12,77.4-33.27,75.89-79.57Zm-78.55,41.67c-.07,0-.13,0-.2,.01-.27,.02-.54,.03-.81,.03-5.11,0-12.77-3.83-21.55-10.79-11.7-9.27-23.68-22.49-35.26-35.27-24.65-27.2-47.93-52.88-79.99-52.89-.08,0-.15,0-.23,0-13.04,.08-26.26,.11-39.3,.11s-26.38-.04-39.47-.12c-.08,0-.15,0-.23,0-32.05,0-55.34,25.69-79.99,52.89-11.58,12.78-23.56,25.99-35.26,35.26-8.78,6.96-16.43,10.79-21.54,10.79-.27,0-.54-.01-.8-.03-.07,0-.14-.01-.21-.02-12.44-.87-40.59-17.35-40.58-41.25,1.12-61.94,8.1-125.96,21.33-195.69,3.25-16.26,11.62-31.2,23.6-42.09,13.14-11.95,30.41-18.8,49.94-19.83,.96-.04,1.9-.06,2.81-.06,11.51,0,18.31,2.93,29.58,7.79,15.12,6.52,35.82,15.46,68.5,15.46,.56,0,1.14,0,1.71,0,6.84-.04,13.77-.06,20.61-.06s13.66,.02,20.44,.06c.57,0,1.14,0,1.71,0,32.68,0,53.38-8.94,68.49-15.46,11.26-4.86,18.06-7.8,29.59-7.8,.91,0,1.86,.02,2.82,.06,44.26,2.34,66.99,33.65,73.58,62.41,13.19,69.65,20.14,133.6,21.25,195.48,0,.19,0,.37,.01,.56,.75,22.95-28.16,39.56-40.57,40.43Z" />
    <path d="M190.01,193.68h-28.34v-28.34c0-10.49-8.51-19-19-19s-19,8.51-19,19v28.34h-28.34c-10.49,0-19,8.51-19,19s8.51,19,19,19h28.34v28.34c0,10.49,8.51,19,19,19s19-8.51,19-19v-28.34h28.34c10.49,0,19-8.51,19-19s-8.51-19-19-19Z" />
  </svg>
)

interface ChatHeaderProps {
  characterName: string
  characterImage: string
  creatorName: string
}

// DEV MODE: coachmark always visible. For production, wire showCoachmark to
// useState(() => !localStorage.getItem('wsup_game_seen')) and set
// localStorage.setItem('wsup_game_seen', '1') inside dismissCoachmark().
export default function ChatHeader({ characterName, characterImage, creatorName }: ChatHeaderProps) {
  const [showCoachmark, setShowCoachmark] = useState(true)

  return (
    <div className="h-[56px] md:border-b md:border-white-10 flex items-center px-xs shrink-0 md:bg-none bg-gradient-to-b from-black to-transparent">
      {/* Back */}
      <Link href="/explore" className="p-[10px] rounded-full hover:bg-white-10 transition-colors shrink-0">
        <BackIcon />
      </Link>

      {/* Avatar + add group overlay */}
      <div className="relative shrink-0 mr-m">
        <div className="w-10 h-10 rounded-full ring-1 ring-white-10 overflow-hidden">
          <Image src={characterImage} alt={characterName} width={40} height={40} className="object-cover w-full h-full" />
        </div>
        <button className="absolute -bottom-1 -right-2 w-[22px] h-[22px] bg-accent border-2 border-page-bg rounded-full flex items-center justify-center hover:bg-accent-hover transition-colors">
          <PlusIcon />
        </button>
      </div>

      {/* Name + creator */}
      <div className="flex flex-col gap-[2px] flex-1 min-w-0">
        <h2 className="text-text-title font-medium text-sm leading-tight truncate">{characterName}</h2>
        <div className="flex items-center gap-[4px]">
          <span className="text-xs text-text-body leading-tight">by</span>
          <Link href="#" className="text-xs text-white underline leading-tight whitespace-nowrap">{creatorName}</Link>
          <ChevronSmall />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center shrink-0">
        {/* Call — warm gradient mask */}
        <button className="p-[10px] rounded-full hover:bg-white-10 transition-colors">
          <div style={{
            width: 20, height: 20,
            backgroundImage: 'var(--icon-gradient-warm)',
            maskImage: "url('/icons/icon-call.svg')",
            maskSize: '20px 20px', maskRepeat: 'no-repeat', maskPosition: '0 0',
            WebkitMaskImage: "url('/icons/icon-call.svg')",
            WebkitMaskSize: '20px 20px', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: '0 0',
          }} />
        </button>
        {/* Gallery — white 70% mask */}
        <button className="p-[10px] rounded-full hover:bg-white-10 transition-colors">
          <div style={{
            width: 20, height: 20,
            backgroundColor: 'var(--white-90)',
            maskImage: "url('/icons/icon-gallery.svg')",
            maskSize: '20px 20px', maskRepeat: 'no-repeat', maskPosition: '0 0',
            WebkitMaskImage: "url('/icons/icon-gallery.svg')",
            WebkitMaskSize: '20px 20px', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: '0 0',
          }} />
        </button>

        {/* Game — dot badge + coachmark */}
        <div className="relative">
          <button className="relative p-[10px] rounded-full hover:bg-white-10 transition-colors">
            <GameIcon />
            <span className="absolute top-[6px] right-[6px] w-[8px] h-[8px] rounded-full bg-status-alert animate-pulse" />
          </button>

          {/* Coachmark — appears on first open, dismissable */}
          {showCoachmark && (
            <div className="absolute top-full -right-[6px] mt-[6px] w-[220px] backdrop-blur-[40px] bg-chat-ai-active border border-accent rounded-[16px] shadow-[0_12px_32px_rgba(0,0,0,0.5)] z-50">
              {/* Arrow pointing up toward game icon */}
              <div className="absolute -top-[7px] right-[20px] w-[14px] h-[14px] bg-chat-ai-active border-t border-l border-accent rotate-45" />
              <div className="px-[14px] pt-[12px] pb-[14px]">
                {/* Label + dismiss */}
                <div className="flex items-center justify-between mb-[10px]">
                  <span className="label-xs text-white">New Feature</span>
                  <button
                    onClick={() => setShowCoachmark(false)}
                    className="w-[18px] h-[18px] flex items-center justify-center rounded-full hover:bg-white-10 transition-colors shrink-0"
                    aria-label="Dismiss"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Icon + title row */}
                <div className="flex items-center gap-[8px] mb-[6px] bg-white-10 rounded-[10px] px-[8px] py-[6px]">
                  <div className="w-[32px] h-[32px] rounded-[10px] flex items-center justify-center shrink-0 bg-accent">
                    <svg width="18" height="18" viewBox="0 0 512 512" fill="white">
                      <path d="M350.18 221.99c-.24 0-.48 0-.72 0-15.49.4-27.73 13.3-27.33 28.84.41 15.23 12.88 27.32 28.02 27.32.26 0 .52 0 .78-.01 15.5-.4 27.73-13.3 27.34-28.8-.39-15.26-12.9-27.35-28.08-27.35zM396.91 147.2c-.25 0-.5 0-.75 0-15.5.42-27.73 13.3-27.34 28.83.41 15.23 12.9 27.32 28.03 27.32.26 0 .53 0 .8-.01 15.49-.39 27.74-13.3 27.34-28.79-.41-15.26-12.89-27.35-28.08-27.35z" />
                      <path d="M511.97,363.87c-1.2-66.8-9.09-134.35-22.03-202.53-10.54-47.37-48.46-89.56-109.05-92.65-1.56-.06-3.08-.1-4.56-.1-40.44,0-50.39,23.26-98.08,23.26-.47,0-.94,0-1.42,0-6.91-.04-13.82-.06-20.73-.06s-13.93,.02-20.9,.06c-.48,0-.95,0-1.42,0-47.69,0-57.68-23.25-98.08-23.25-1.48,0-3,.03-4.56,.1-60.6,3.09-99.7,45.17-109.09,92.65C9.09,229.53,1.2,297.06,0,363.86c-.29,46.51,45.63,77.45,75.93,79.57,1.23,.09,2.45,.14,3.67,.14,56.81,0,102.1-98.93,136.79-98.94,13.23,.08,26.47,.12,39.7,.12s26.35-.04,39.52-.12c34.69,0,79.96,98.95,136.8,98.95,1.22,0,2.44-.05,3.67-.14,30.29-2.12,77.4-33.27,75.89-79.57Zm-78.55,41.67c-.07,0-.13,0-.2,.01-.27,.02-.54,.03-.81,.03-5.11,0-12.77-3.83-21.55-10.79-11.7-9.27-23.68-22.49-35.26-35.27-24.65-27.2-47.93-52.88-79.99-52.89-.08,0-.15,0-.23,0-13.04,.08-26.26,.11-39.3,.11s-26.38-.04-39.47-.12c-.08,0-.15,0-.23,0-32.05,0-55.34,25.69-79.99,52.89-11.58,12.78-23.56,25.99-35.26,35.26-8.78,6.96-16.43,10.79-21.54,10.79-.27,0-.54-.01-.8-.03-.07,0-.14-.01-.21-.02-12.44-.87-40.59-17.35-40.58-41.25,1.12-61.94,8.1-125.96,21.33-195.69,3.25-16.26,11.62-31.2,23.6-42.09,13.14-11.95,30.41-18.8,49.94-19.83,.96-.04,1.9-.06,2.81-.06,11.51,0,18.31,2.93,29.58,7.79,15.12,6.52,35.82,15.46,68.5,15.46,.56,0,1.14,0,1.71,0,6.84-.04,13.77-.06,20.61-.06s13.66,.02,20.44,.06c.57,0,1.14,0,1.71,0,32.68,0,53.38-8.94,68.49-15.46,11.26-4.86,18.06-7.8,29.59-7.8,.91,0,1.86,.02,2.82,.06,44.26,2.34,66.99,33.65,73.58,62.41,13.19,69.65,20.14,133.6,21.25,195.48,0,.19,0,.37,.01,.56,.75,22.95-28.16,39.56-40.57,40.43Z" />
                      <path d="M190.01,193.68h-28.34v-28.34c0-10.49-8.51-19-19-19s-19,8.51-19,19v28.34h-28.34c-10.49,0-19,8.51-19,19s8.51,19,19,19h28.34v28.34c0,10.49,8.51,19,19,19s19-8.51,19-19v-28.34h28.34c10.49,0,19-8.51,19-19s-8.51-19-19-19Z" />
                    </svg>
                  </div>
                  <p className="text-[13px] font-semibold text-text-title leading-tight">Play Games</p>
                </div>

                {/* Description */}
                <p className="text-sm text-white-50">
                  A whole new way to connect with {characterName}!
                </p>
              </div>
            </div>
          )}
        </div>

        <button className="p-[10px] rounded-full hover:bg-white-10 transition-colors">
          <DotsVerticalIcon />
        </button>
      </div>
    </div>
  )
}
