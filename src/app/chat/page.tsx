'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import ChatHeader from '@/components/chat/ChatHeader'
import type { CharacterState } from '@/components/chat/ChatHeader'
import ChatMessages from '@/components/chat/ChatMessages'
import type { ChatMessage } from '@/components/chat/ChatMessages'
import ChatBar from '@/components/chat/ChatBar'
import ChatRightSidebar from '@/components/chat/ChatRightSidebar'
import DormancyBanner from '@/components/chat/DormancyBanner'
import MemoryLimitPopup from '@/components/chat/MemoryLimitPopup'
import SuggestedReplies from '@/components/chat/SuggestedReplies'
import SafetyBanner from '@/components/chat/SafetyBanner'
import DevStateToggle, { DevStateOption } from '@/components/ui/DevStateToggle'
import Toast from '@/components/ui/Toast'
import { getReplyFor, REPLY_DELAY_MS } from '@/lib/chatReplies'
import { getSuggestionsFor, SUGGESTION_IDLE_MS } from '@/lib/chatSuggestions'
import { detectSafetyCategory } from '@/lib/safetyDetect'
import type { SafetyVariant } from '@/lib/safetyVariants'
import {
  SUGGESTIONS_PREF_KEY,
  SEED_MESSAGES,
  CHARACTER_IMAGE,
  CHARACTER_AVATAR,
  STATES,
  STATE_LABELS,
  SAFETY_STATE_TO_VARIANT,
  getBannerVariant,
  type ChatDemoState,
} from './chat-config'

export default function ChatPage() {
  const [chatState, setChatState] = useState<ChatDemoState>('active')
  const [showToggle, setShowToggle] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(SEED_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)
  const [draft, setDraft] = useState('')
  const [suggestionsEnabled, setSuggestionsEnabled] = useState(true)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [safetyBanner, setSafetyBanner] = useState<SafetyVariant | null>(null)
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputAreaRef = useRef<HTMLDivElement>(null)
  const bannerVariant = getBannerVariant(chatState)
  const isRemoved = chatState === 'removed'
  const showInstallPopup = chatState === 'context-exhausted-popup'
  // Safety banner overrides character-state banners and other surfaces — it's the highest-priority intervention.
  const devSafetyVariant = SAFETY_STATE_TO_VARIANT[chatState] ?? null
  const activeSafetyVariant = safetyBanner ?? devSafetyVariant
  const headerCharacterState: CharacterState =
    chatState === 'context-exhausted-popup' ||
    chatState === 'safety-self-harm' ||
    chatState === 'safety-medical' ||
    chatState === 'safety-financial'
      ? 'active'
      : chatState

  // Hydrate suggestions preference from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SUGGESTIONS_PREF_KEY)
    if (stored === '0') setSuggestionsEnabled(false)
  }, [])

  const cancelIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = null
  }

  const startIdleTimer = () => {
    cancelIdleTimer()
    idleTimerRef.current = setTimeout(() => setShowSuggestions(true), SUGGESTION_IDLE_MS)
  }

  const handleSend = (text: string) => {
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)
    setShowSuggestions(false)
    cancelIdleTimer()
    // Detect safety category in the user's message — first match wins; existing banner upgrades only on more-severe match (severity order is in detectSafetyCategory).
    const detected = detectSafetyCategory(text)
    if (detected) setSafetyBanner(detected)
    if (replyTimerRef.current) clearTimeout(replyTimerRef.current)
    replyTimerRef.current = setTimeout(() => {
      const reply = getReplyFor(text)
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'ai', text: reply.text, emotion: reply.emotion }])
      setIsTyping(false)
      if (suggestionsEnabled) startIdleTimer()
    }, REPLY_DELAY_MS)
  }

  const handleDraftChange = (text: string) => {
    setDraft(text)
    if (text.length > 0 && showSuggestions) setShowSuggestions(false)
    if (text.length > 0) cancelIdleTimer()
  }

  const handlePickSuggestion = (text: string) => {
    setDraft(text)
    setShowSuggestions(false)
  }

  const handleToggleSuggestions = () => {
    setSuggestionsEnabled((prev) => {
      const next = !prev
      localStorage.setItem(SUGGESTIONS_PREF_KEY, next ? '1' : '0')
      if (!next) {
        setShowSuggestions(false)
        cancelIdleTimer()
        setToast('Auto-suggestions off. Turn back on from the chat menu.')
      } else {
        setToast('Auto-suggestions on.')
      }
      return next
    })
  }

  const lastAiText = [...messages].reverse().find((m) => m.role === 'ai')?.text ?? ''
  const suggestions = lastAiText ? getSuggestionsFor(lastAiText) : []

  useEffect(() => () => {
    if (replyTimerRef.current) clearTimeout(replyTimerRef.current)
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'r' || e.key === 'R') {
        if (e.shiftKey) {
          setChatState(prev => {
            const i = STATES.indexOf(prev)
            return STATES[(i + 1) % STATES.length]
          })
        } else {
          setShowToggle(prev => !prev)
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Auto-fire the memory limit popup 2s after page load — only if user hasn't manually changed state
  useEffect(() => {
    const timer = setTimeout(() => {
      setChatState(prev => (prev === 'active' ? 'context-exhausted-popup' : prev))
    }, 2000)
    return () => clearTimeout(timer)
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
            {/* Safety banner — mobile: absolute overlay anchored to the top of the chat viewport.
                Doesn't push ChatHeader down; header stays in flow underneath and is visually covered by the banner.
                On desktop the banner sits BELOW ChatHeader (rendered further down) — header still anchors who-am-I-talking-to context. */}
            {activeSafetyVariant && (
              <div className="md:hidden absolute top-0 left-0 right-0 z-20">
                <SafetyBanner
                  variant={activeSafetyVariant}
                  onClose={() => {
                    setSafetyBanner(null)
                    if (devSafetyVariant) setChatState('active')
                  }}
                />
              </div>
            )}
            <ChatHeader
              characterName="Billie Eilish"
              characterImage={CHARACTER_AVATAR}
              creatorName="Honeybadger"
              characterState={headerCharacterState}
              suggestionsEnabled={suggestionsEnabled}
              onToggleSuggestions={handleToggleSuggestions}
            />
            {/* Desktop SafetyBanner / DormancyBanner (mutually exclusive, safety wins) */}
            {activeSafetyVariant ? (
              <div className="hidden md:block">
                <SafetyBanner
                  variant={activeSafetyVariant}
                  onClose={() => {
                    setSafetyBanner(null)
                    if (devSafetyVariant) setChatState('active')
                  }}
                />
              </div>
            ) : (
              bannerVariant && <DormancyBanner variant={bannerVariant} />
            )}
            <ChatMessages messages={messages} isTyping={isTyping} characterName="Billie Eilish" />
            {isRemoved ? (
              <div className="flex items-center justify-center px-m py-m bg-page-bg border-t border-white-10 shrink-0 md:bg-transparent">
                <span className="text-xs text-white-40">Messaging isn&apos;t available for this character.</span>
              </div>
            ) : (
              <div ref={inputAreaRef} className="relative shrink-0">
                {showSuggestions && suggestions.length > 0 && (
                  <SuggestedReplies
                    suggestions={suggestions}
                    onPick={handlePickSuggestion}
                    onDisable={handleToggleSuggestions}
                  />
                )}
                <ChatBar
                  value={draft}
                  onChange={handleDraftChange}
                  onSend={handleSend}
                  containerRef={inputAreaRef}
                />
              </div>
            )}

            {/* Backdrop overlay — full chat area, modal-style, when popup is showing */}
            {showInstallPopup && !isRemoved && (
              <>
                <div
                  className="absolute inset-0 bg-black-60 pointer-events-none z-20"
                  aria-hidden
                />
                {/* Popup — anchored above ChatBar */}
                <div className="absolute bottom-[88px] left-0 right-0 px-m md:px-2xxxl pt-12 z-30 pointer-events-none">
                  <div className="pointer-events-auto">
                    <MemoryLimitPopup
                      characterName="Billie"
                      characterImage={CHARACTER_AVATAR}
                      onDismiss={() => setChatState('active')}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right sidebar — desktop only */}
        <ChatRightSidebar />
      </main>

      <Toast open={!!toast} message={toast ?? ''} onClose={() => setToast(null)} />

      <DevStateToggle open={showToggle} title="State" hint="R toggle · Shift+R cycle">
        {STATES.map((state) => (
          <DevStateOption
            key={state}
            active={chatState === state}
            onClick={() => setChatState(state)}
          >
            {STATE_LABELS[state]}
          </DevStateOption>
        ))}
      </DevStateToggle>
    </div>
  )
}
