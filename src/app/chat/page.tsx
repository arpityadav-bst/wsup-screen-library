'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import ChatHeader from '@/components/chat/ChatHeader'
import type { CharacterState } from '@/components/chat/ChatHeader'
import ChatMessages from '@/components/chat/ChatMessages'
import ChatBar from '@/components/chat/ChatBar'
import ChatRightSidebar from '@/components/chat/ChatRightSidebar'
import DormancyBanner from '@/components/chat/DormancyBanner'

const CHARACTER_IMAGE = '/chars/char5.webp'
const CHARACTER_AVATAR = '/chars/avatars/char5.jpg'

const STATES: CharacterState[] = ['active', 'dormant-inactive', 'dormant-moderation', 'removed']
const STATE_LABELS: Record<CharacterState, string> = {
  'active': 'Active',
  'dormant-inactive': 'Dormant (Inactive)',
  'dormant-moderation': 'Dormant (Moderation)',
  'removed': 'Removed',
}

function getBannerVariant(state: CharacterState) {
  if (state === 'dormant-inactive') return 'inactivity'
  if (state === 'dormant-moderation') return 'moderation'
  if (state === 'removed') return 'removed'
  return null
}

export default function ChatPage() {
  const [characterState, setCharacterState] = useState<CharacterState>('active')
  const [showToggle, setShowToggle] = useState(false)
  const [isCreator, setIsCreator] = useState(false)
  const bannerVariant = getBannerVariant(characterState)
  const isRemoved = characterState === 'removed'

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'r' || e.key === 'R') {
        if (e.shiftKey) {
          setCharacterState(prev => {
            const i = STATES.indexOf(prev)
            return STATES[(i + 1) % STATES.length]
          })
        } else {
          setShowToggle(prev => !prev)
        }
      }
      if (e.key === 'c' || e.key === 'C') {
        setIsCreator(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="bg-page-bg">
      {/* Header + sidebar — desktop only */}
      <div className="hidden md:block">
        <Header />
        <Sidebar />
      </div>

      {/* Full-viewport chat layout */}
      <main className="md:ml-[365px] md:mt-[60px] flex h-screen md:h-[calc(100vh-60px)]">

        {/* Center: chat column */}
        <div className="relative flex-1 flex flex-col min-w-0 md:border-r md:border-white-10 overflow-hidden">

          {/* Character image bg — mobile only */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src={CHARACTER_IMAGE}
              alt=""
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-black-10" />
          </div>

          {/* Bottom chatbar scrim — mobile only */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[160px] md:hidden pointer-events-none"
            style={{ background: 'linear-gradient(to top, #000000 0%, var(--black-80) 38.7%, rgba(0,0,0,0) 87.6%)' }}
          />

          {/* Chat UI */}
          <div className="relative z-10 flex flex-col h-full">
            <ChatHeader
              characterName="Billie Eilish"
              characterImage={CHARACTER_AVATAR}
              creatorName="Honeybadger"
              characterState={characterState}
            />
            {bannerVariant && <DormancyBanner variant={bannerVariant} isCreator={isCreator} />}
            <ChatMessages />
            {isRemoved ? (
              <div className="flex items-center justify-center px-m py-m bg-page-bg border-t border-white-10 shrink-0 md:bg-transparent">
                <span className="text-xs text-white-40">Messaging isn&apos;t available for this character.</span>
              </div>
            ) : (
              <ChatBar />
            )}
          </div>
        </div>

        {/* Right sidebar — desktop only */}
        <ChatRightSidebar />
      </main>

      {/* State toggle — press R to show/hide, Shift+R to cycle states */}
      {showToggle && (
        <div className="fixed bottom-m right-m z-[70] flex flex-col gap-xxs bg-secondary-surface backdrop-blur-popup rounded-card p-s shadow-big border border-white-10"
          style={{ animation: 'fade-in 0.15s ease-out' }}
        >
          <span className="text-xxs font-semibold text-text-dim uppercase tracking-[0.8px] mb-xxs">
            State · <span className="text-text-xxsmall normal-case">R toggle · Shift+R cycle · C creator</span>
          </span>
          <label className="flex items-center gap-xxs text-xs text-text-small cursor-pointer mb-xxs">
            <input type="checkbox" checked={isCreator} onChange={() => setIsCreator(prev => !prev)} className="cursor-pointer" />
            Creator view
          </label>
          {STATES.map((state) => (
            <button
              key={state}
              onClick={() => setCharacterState(state)}
              className={`text-left px-s py-xxs rounded-button text-xs cursor-pointer border-none transition-colors ${
                characterState === state
                  ? 'bg-accent text-text-title font-medium'
                  : 'bg-transparent text-text-small hover:bg-white-10'
              }`}
            >
              {STATE_LABELS[state]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
