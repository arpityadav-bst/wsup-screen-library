'use client'

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import DeckCard from './DeckCard'
import type { OnboardingCharacter } from '@/lib/onboardingDeck'

export interface DeckCardSwiperHandle {
  swipe: (dir: 'left' | 'right') => void
}

interface DeckCardSwiperProps {
  character: OnboardingCharacter
  // When false, the card renders without drag/animation/tint pipelines — used for peek cards behind the top.
  // We keep the same component type across positions so React reconciliation preserves the underlying DeckCard
  // (and its Image) when a peek card promotes to the top after a swipe — no unmount/remount blink.
  interactive?: boolean
  onSkip?: () => void
  onLike?: () => void
  // Fires the moment a commit starts (button / kbd / drag-past-threshold). Parent uses this to start
  // animating the peek cards up to their next slot positions, in parallel with the fly-off.
  onCommitStart?: (dir: 'left' | 'right') => void
}

const SWIPE_THRESHOLD = 80
const FLY_DISTANCE = 600
const FLY_ROTATION = 30
const ANIM_MS = 320

const DeckCardSwiper = forwardRef<DeckCardSwiperHandle, DeckCardSwiperProps>(({ character, interactive = true, onSkip, onLike, onCommitStart }, ref) => {
  const [dragX, setDragX] = useState(0)
  const [committing, setCommitting] = useState<null | 'left' | 'right'>(null)
  const dragStartX = useRef<number | null>(null)
  const dragId = useRef<number | null>(null)

  useEffect(() => { setDragX(0); setCommitting(null); dragStartX.current = null }, [character.id])

  const commit = (dir: 'left' | 'right') => {
    if (!interactive) return
    if (committing) return
    setCommitting(dir)
    onCommitStart?.(dir)
    window.setTimeout(() => {
      if (dir === 'left') onSkip?.()
      else onLike?.()
    }, ANIM_MS)
  }

  useImperativeHandle(ref, () => ({ swipe: commit }), [committing, interactive])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || committing) return
    dragStartX.current = e.clientX
    dragId.current = e.pointerId
    ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || committing || dragStartX.current == null || dragId.current !== e.pointerId) return
    setDragX(e.clientX - dragStartX.current)
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || dragId.current !== e.pointerId) return
    try { (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId) } catch {}
    const start = dragStartX.current
    dragStartX.current = null
    dragId.current = null
    if (start == null) return
    const dx = e.clientX - start
    if (Math.abs(dx) > SWIPE_THRESHOLD) commit(dx > 0 ? 'right' : 'left')
    else setDragX(0)
  }

  // Top card transform — drag offset / commit fly-off. Peek cards stay at translate(0) rot(0); their slot wrapper
  // (in OnboardingDeckStep) handles their peek scale/translate/opacity.
  let x = 0, rot = 0, cardOpacity = 1
  if (interactive) {
    if (committing === 'left') { x = -FLY_DISTANCE; rot = -FLY_ROTATION; cardOpacity = 0 }
    else if (committing === 'right') { x = FLY_DISTANCE; rot = FLY_ROTATION; cardOpacity = 0 }
    else { x = dragX; rot = dragX * 0.06; cardOpacity = 1 }
  }

  const useTransition = !interactive || committing != null || dragStartX.current == null
  const redTint = interactive ? (committing === 'left' ? 1 : Math.max(0, Math.min(1, -dragX / 120))) : 0
  const greenTint = interactive ? (committing === 'right' ? 1 : Math.max(0, Math.min(1, dragX / 120))) : 0

  const handlers = interactive ? { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp } : {}

  return (
    <div
      className={`relative w-full h-full ${interactive ? 'select-none cursor-grab active:cursor-grabbing' : ''}`}
      style={{
        transform: `translateX(${x}px) rotate(${rot}deg)`,
        opacity: cardOpacity,
        transition: useTransition ? `transform ${ANIM_MS}ms ease-out, opacity ${ANIM_MS}ms ease-out` : 'none',
        touchAction: interactive ? 'pan-y' : 'auto',
      }}
      {...handlers}
    >
      <DeckCard character={character} animate={interactive} />
      {redTint > 0 && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-card pointer-events-none ring-2 ring-status-alert"
          style={{
            background: 'linear-gradient(135deg, rgba(222,90,72,0.55) 0%, rgba(222,90,72,0.15) 100%)',
            opacity: redTint,
            transition: 'opacity 120ms',
          }}
        />
      )}
      {greenTint > 0 && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-card pointer-events-none ring-2 ring-status-success"
          style={{
            background: 'linear-gradient(135deg, rgba(179,214,97,0.55) 0%, rgba(179,214,97,0.15) 100%)',
            opacity: greenTint,
            transition: 'opacity 120ms',
          }}
        />
      )}
    </div>
  )
})

DeckCardSwiper.displayName = 'DeckCardSwiper'
export default DeckCardSwiper
