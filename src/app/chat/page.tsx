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
import SafetyBanner from '@/components/chat/SafetyBanner'
import MemoryLimitOverlay from '@/components/chat/MemoryLimitOverlay'
import SuggestedReplies from '@/components/chat/SuggestedReplies'
import ModelPickerSheet from '@/components/chat/ModelPickerSheet'
import ChatStyleSheet from '@/components/chat/ChatStyleSheet'
import ChatSendGates from '@/components/chat/ChatSendGates'
import StreakClaimPopup from '@/components/ui/StreakClaimPopup'
import CreditServicePopup from '@/components/chat/CreditServicePopup'
import BuyCreditsSheet from '@/components/ui/BuyCreditsSheet'
import ChatDevPanel from '@/components/chat/ChatDevPanel'
import { DEFAULT_MODEL_ID, getModel, type ModelId } from '@/lib/models'
import { useSendGate } from './useSendGate'
import { useDevStateCycle } from './useDevStateCycle'
import { useChatCharacter } from './useChatCharacter'
import Toast from '@/components/ui/Toast'
import { getReplyFor, REPLY_DELAY_MS } from '@/lib/chatReplies'
import { getSuggestionsFor, SUGGESTION_IDLE_MS } from '@/lib/chatSuggestions'
import { detectSafetyCategory } from '@/lib/safetyDetect'
import type { SafetyVariant } from '@/lib/safetyVariants'
import {
  SUGGESTIONS_PREF_KEY,
  SEED_MESSAGES,
  SAFETY_STATE_TO_VARIANT,
  getBannerVariant,
  type ChatDemoState,
  type FlowMode,
} from './chat-config'

export default function ChatPage() {
  const [chatState, setChatState] = useState<ChatDemoState>('active')
  const [showToggle, setShowToggle] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(SEED_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)
  const [draft, setDraft] = useState('')
  const [suggestionsEnabled, setSuggestionsEnabled] = useState(true)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestionsExpanded, setSuggestionsExpanded] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [safetyBanner, setSafetyBanner] = useState<SafetyVariant | null>(null)
  const [selectedModelId, setSelectedModelId] = useState<ModelId>(DEFAULT_MODEL_ID)
  const [modelPickerOpen, setModelPickerOpen] = useState(false)
  const [buyCreditsOpen, setBuyCreditsOpen] = useState(false)
  const [flowMode, setFlowMode] = useState<FlowMode>('new-user')
  const character = useChatCharacter()
  const sendGate = useSendGate(flowMode, setChatState, setToast)
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputAreaRef = useRef<HTMLDivElement>(null)
  const bannerVariant = getBannerVariant(chatState)
  const isRemoved = chatState === 'removed'
  const showInstallPopup = chatState === 'context-exhausted-popup'
  // Safety banner overrides character-state banners and other surfaces — it's the highest-priority intervention.
  const devSafetyVariant = SAFETY_STATE_TO_VARIANT[chatState] ?? null
  const activeSafetyVariant = safetyBanner ?? devSafetyVariant
  const POPUP_STATES = ['context-exhausted-popup', 'chat-style-popup', 'claim-credits-popup', 'credit-service-popup', 'safety-self-harm', 'safety-medical', 'safety-financial'] as const
  const headerCharacterState: CharacterState = (POPUP_STATES as readonly string[]).includes(chatState) ? 'active' : chatState as CharacterState

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
    if (sendGate.checkBeforeSend()) return
    sendGate.recordSent()
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)
    setShowSuggestions(false)
    setSuggestionsExpanded(false)
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
    setSuggestionsExpanded(false)
  }

  const handleOpenSuggestions = () => {
    cancelIdleTimer()
    setShowSuggestions(true)
    setSuggestionsExpanded(true)
  }

  const handleSafetyClose = () => {
    setSafetyBanner(null)
    if (devSafetyVariant) setChatState('active')
  }

  // Flow toggle resets the journey so designer can re-walk a flow without reload.
  const handleFlowChange = (newFlow: FlowMode) => { if (newFlow !== flowMode) { setFlowMode(newFlow); sendGate.reset(); setChatState('active'); setModelPickerOpen(false); setBuyCreditsOpen(false) } }

  const handleToggleSuggestions = () => {
    setSuggestionsEnabled((prev) => {
      const next = !prev
      localStorage.setItem(SUGGESTIONS_PREF_KEY, next ? '1' : '0')
      if (!next) {
        setShowSuggestions(false)
    setSuggestionsExpanded(false)
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

  useDevStateCycle(setChatState, setShowToggle)

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
              src={character.image}
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
              characterName={character.fullName}
              characterImage={character.avatar}
              creatorName="Honeybadger"
              characterState={headerCharacterState}
              suggestionsEnabled={suggestionsEnabled}
              onToggleSuggestions={handleToggleSuggestions}
              onSwitchLLMs={() => setModelPickerOpen(true)}
            />
            {/* Safety wins over Dormancy. Safety renders mobile = full-bleed top overlay (covers header), desktop = centered floating card per PM directive — single mount avoids gradient-ID collisions across viewports. */}
            {activeSafetyVariant && (
              <div className="absolute z-20 top-0 left-0 right-0 md:top-1/2 md:left-1/2 md:right-auto md:-translate-x-1/2 md:-translate-y-1/2">
                <SafetyBanner variant={activeSafetyVariant} onClose={handleSafetyClose} />
              </div>
            )}
            {!activeSafetyVariant && bannerVariant && <DormancyBanner variant={bannerVariant} />}
            <ChatMessages messages={messages} isTyping={isTyping} characterName={character.fullName} />
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
                    expanded={suggestionsExpanded}
                    onExpandedChange={setSuggestionsExpanded}
                  />
                )}
                <ChatBar
                  value={draft}
                  onChange={handleDraftChange}
                  onSend={handleSend}
                  onOpenSuggestions={handleOpenSuggestions}
                  onOpenModels={() => setModelPickerOpen(true)}
                  selectedModelName={getModel(selectedModelId).name}
                  forceExpanded={modelPickerOpen}
                  containerRef={inputAreaRef}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar — desktop only */}
        <ChatRightSidebar />
      </main>

      {/* Page-level mount — outside chat column's z-10 stacking context so z-70 covers Header + Sidebar globally. */}
      <MemoryLimitOverlay
        open={showInstallPopup && !isRemoved}
        characterName={character.shortName}
        characterImage={character.avatar}
        onDismiss={() => setChatState('active')}
      />

      <Toast open={!!toast} message={toast ?? ''} onClose={() => setToast(null)} />

      <ModelPickerSheet
        open={modelPickerOpen}
        onClose={() => setModelPickerOpen(false)}
        selectedId={selectedModelId}
        onSelect={(id) => {
          if (id !== selectedModelId) setToast(`Switched to ${getModel(id).name}`)
          setSelectedModelId(id)
        }}
        creditsBalance={498}
      />

      <ChatStyleSheet
        open={chatState === 'chat-style-popup'}
        onClose={() => setChatState('active')}
        onCommit={(id) => {
          setSelectedModelId(id)
          setToast(`Switched to ${getModel(id).name}`)
        }}
      />

      <ChatSendGates {...sendGate.gateState} onSignIn={sendGate.handleSignIn} />

      <StreakClaimPopup
        open={chatState === 'claim-credits-popup'}
        onClose={() => setChatState('active')}
        balance={10}
        streakDay={3}
        tomorrowReward={15}
        dailyCheckInEarn={15}
      />

      <CreditServicePopup open={chatState === 'credit-service-popup'} onClose={() => setChatState('active')} onBuyCredits={() => { setChatState('active'); setBuyCreditsOpen(true) }} />
      <BuyCreditsSheet open={buyCreditsOpen} onClose={() => setBuyCreditsOpen(false)} />

      <ChatDevPanel open={showToggle} flowMode={flowMode} setFlowMode={handleFlowChange} chatState={chatState} setChatState={setChatState} />
    </div>
  )
}
