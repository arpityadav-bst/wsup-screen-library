'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { OnboardingCharacter } from '@/lib/onboardingDeck'

interface DeckCardProps {
  character: OnboardingCharacter
  // When true, the opening bubble runs a typing-indicator → message reveal sequence after a 1s pause.
  // Set to true only on the top (interactive) card so the animation triggers for whichever card is currently in focus.
  // Peek cards behind keep their bubble suppressed entirely — the bubble is the "this card is active" signal.
  animate?: boolean
}

const BUBBLE_OPEN_DELAY_MS = 1000   // card visible → bubble pops in with typing dots
const BUBBLE_TYPING_MS = 1400       // dots animate → message starts typing
const TYPEWRITER_CHAR_MS = 25       // per-char delay; ~40 chars/sec, feels like brisk-natural typing

type BubblePhase = 'hidden' | 'typing' | 'message'

function TypingDots() {
  return (
    <div className="flex items-center gap-[3px] py-[2px]">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-[5px] h-[5px] bg-white-50 rounded-pill animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
        />
      ))}
    </div>
  )
}

// Per-category gradient + glyph. The badge is the card's most-glanced element after the photo,
// so each category earns its own visual personality (color + icon).
// Categories outside this map fall back to a neutral white-10 chip (forward-compatible).
const CATEGORY_VISUALS: Record<string, { gradient: string; glyph: React.ReactNode }> = {
  Mafia:   { gradient: 'linear-gradient(135deg, #7a0000 0%, #1a0000 100%)', glyph: <Spade /> },
  Romance: { gradient: 'linear-gradient(135deg, #ff5ec4 0%, #6e1c5d 100%)', glyph: <Heart /> },
  Teacher: { gradient: 'linear-gradient(135deg, #5cb850 0%, #1f5a18 100%)', glyph: <Book /> },
  Anime:   { gradient: 'linear-gradient(135deg, #c64aff 0%, #4b1a78 100%)', glyph: <Sparkle /> },
  Mentor:  { gradient: 'linear-gradient(135deg, #ff9a3c 0%, #6e3a08 100%)', glyph: <Bolt /> },
  Bold:    { gradient: 'linear-gradient(135deg, #ff5050 0%, #5a0e0e 100%)', glyph: <Flame /> },
  Friend:  { gradient: 'linear-gradient(135deg, #21c8c0 0%, #0a4544 100%)', glyph: <Smile /> },
  'Sci-Fi':{ gradient: 'linear-gradient(135deg, #5b8cff 0%, #1a2a5e 100%)', glyph: <Orbit /> },
}

// Tall portrait card sized to the explore CharacterCard's visual weight. This component fills its parent (w-full h-full);
// the parent — DeckCardSwiper inside OnboardingDeckStep's aspect-[9/16] sizing container — owns the dimensions.
// Image fills the surface, gradient scrim concentrates at the bottom, content overlays. Typography density mirrors
// the explore card (text-base name / text-xs description / text-xxs tags / non-italic) so the matchmaking deck reads
// at the same scale as the discovery grid — the user has already learned this card shape on /explore; the onboarding
// deck is the same vocabulary in a swiper.
export default function DeckCard({ character, animate = false }: DeckCardProps) {
  const cat = CATEGORY_VISUALS[character.category]
  const avatar = character.image.replace(/^\/chars\/(char\d+)\.webp$/, '/chars/avatars/$1.jpg')

  // Bubble reveal state — only top card animates; peek cards never render the bubble.
  // Animation re-runs whenever `animate` becomes true (fresh top card on initial load OR peek-promotes-to-top
  // post-swipe) or when the character behind the card changes (e.g., dev panel jumps the deck).
  const [bubblePhase, setBubblePhase] = useState<BubblePhase>('hidden')
  const [charsShown, setCharsShown] = useState(0)
  useEffect(() => {
    if (!animate) return
    setBubblePhase('hidden')
    setCharsShown(0)
    const t1 = window.setTimeout(() => setBubblePhase('typing'), BUBBLE_OPEN_DELAY_MS)
    const t2 = window.setTimeout(() => setBubblePhase('message'), BUBBLE_OPEN_DELAY_MS + BUBBLE_TYPING_MS)
    return () => { window.clearTimeout(t1); window.clearTimeout(t2) }
  }, [animate, character.id])

  // Typewriter — reveals the opening message one character at a time once phase enters 'message'.
  // Bubble grows with the text (no min-h reserve) so the user feels the character typing in real time.
  useEffect(() => {
    if (bubblePhase !== 'message') return
    const text = character.opening
    const interval = window.setInterval(() => {
      setCharsShown(prev => {
        if (prev >= text.length) { window.clearInterval(interval); return prev }
        return prev + 1
      })
    }, TYPEWRITER_CHAR_MS)
    return () => window.clearInterval(interval)
  }, [bubblePhase, character.opening])

  return (
    <div className="relative rounded-card overflow-hidden ring-1 ring-white-10 shadow-normal w-full h-full">
      <Image src={character.image} alt={character.name} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 320px" priority />

      {/* Scrim — concentrated at bottom for text legibility (matches CharacterCard pattern) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black-60 via-[42%] to-transparent to-[60%]" />

      {/* Top-left category badge — per-category gradient + glyph; sized smaller to match the card's overall density */}
      <div className="absolute top-xs left-xs flex items-center gap-xxs px-xs py-xxs rounded-pill border border-white-20 shadow-small" style={{ background: cat?.gradient ?? 'rgba(255,255,255,0.10)' }}>
        <span className="text-text-title flex items-center [&_svg]:w-[10px] [&_svg]:h-[10px]">{cat?.glyph ?? <Sparkle />}</span>
        <span className="text-xxs font-semibold text-text-title leading-none tracking-[0.2px]">{character.category}</span>
      </div>

      {/* Top-right top-pick chip — only on flagged cards */}
      {character.topPick && (
        <div className="absolute top-xs right-xs flex items-center gap-xxs px-xs py-xxs rounded-pill bg-black-60 backdrop-blur-popup border border-white-10">
          <span className="w-[6px] h-[6px] rounded-full bg-status-success" />
          <span className="text-xxs font-medium text-text-title leading-none">Top pick for you</span>
        </div>
      )}

      {/* Bottom content — overlaid on image. Order top-to-bottom: name/meta/desc → tags → bubble.
          Bubble sits at the bottom (closest to the card's tail-corner of the bubble itself) and is rendered
          only on the active card after a delayed typing-reveal — see `animate` + `bubblePhase` above. */}
      <div className="absolute bottom-0 left-0 right-0 p-s flex flex-col gap-xs">
        <div>
          <h3 className="text-base font-semibold text-text-title leading-tight">{character.name}</h3>
          <div className="flex items-center gap-xs mt-xxxs text-xs text-text-body">
            <span>{character.gender}</span>
            <span className="text-text-dim">·</span>
            <span>age {character.age}</span>
          </div>
          <p className="text-xs text-text-body leading-snug mt-xxs line-clamp-2">{character.description}</p>
        </div>

        {/* Tags — matches the explore CharacterCard tag chip style */}
        <div className="flex flex-wrap gap-xxs">
          {character.tags.map(tag => (
            <span key={tag} className="text-xxs font-normal px-xs py-[3px] rounded-pill bg-white-10 backdrop-blur-bg text-white-80 border border-white-10">
              {tag}
            </span>
          ))}
        </div>

        {/* Opening bubble — only on active card, only after delay. Avatar bottom-aligns to the bubble's tail corner. */}
        {animate && bubblePhase !== 'hidden' && (
          <div className="flex items-end gap-xs" style={{ animation: 'fade-in 0.25s ease-out' }}>
            <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 ring-1 ring-white-10">
              <Image src={avatar} alt="" fill className="object-cover object-top" sizes="28px" />
            </div>
            <div className="flex-1 min-w-0 bg-chat-ai-bubble px-s py-xs rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
              {bubblePhase === 'typing'
                ? <TypingDots />
                : <p className="text-xs text-white leading-snug">{character.opening.slice(0, charsShown)}</p>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Inline category glyphs — viewBox 12×12; rendered at 10px via parent's `[&_svg]:w-[10px]` so the badge stays compact next to its label.
function Spade()   { return <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden><path d="M6 1L2 5.5C1.4 6.2 1 7 1 7.8a2.5 2.5 0 0 0 4 2L4.5 11h3L7 9.8a2.5 2.5 0 0 0 4-2c0-.8-.4-1.6-1-2.3L6 1z" /></svg> }
function Heart()   { return <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden><path d="M6 11s-3.6-2.4-4.8-4.9C.4 4.8 1.4 2 3.4 2c.9 0 1.6.4 2.1 1l.5.7.5-.7c.5-.6 1.2-1 2.1-1 2 0 3 2.8 2.2 4.1C9.6 8.6 6 11 6 11z" /></svg> }
function Book()    { return <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="M2 2.5h3.2A1.5 1.5 0 0 1 6.7 4v6M10 2.5H6.8A1.5 1.5 0 0 0 5.3 4v6M2 2.5v7h4.7M10 2.5v7H5.3" /></svg> }
function Sparkle() { return <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden><path d="M6 1l1.2 3 3 1-3 1L6 9l-1.2-3-3-1 3-1L6 1z" /></svg> }
function Bolt()    { return <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden><path d="M7 1L2 7h3l-1 4 5-6H6l1-4z" /></svg> }
function Flame()   { return <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden><path d="M6 1c1 2 3 3 3 6a3 3 0 0 1-6 0c0-1.4.6-2.4 1.4-3.2C5 5 5.5 4 5.5 3c.3.6.5 1 1 1 .3 0 .4-1-.5-3z" /></svg> }
function Smile()   { return <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><circle cx="6" cy="6" r="4.5" /><circle cx="4.5" cy="5" r="0.6" fill="currentColor" stroke="none" /><circle cx="7.5" cy="5" r="0.6" fill="currentColor" stroke="none" /><path d="M4 7.5c.5.7 1.2 1.1 2 1.1s1.5-.4 2-1.1" strokeLinecap="round" /></svg> }
function Orbit()   { return <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><circle cx="6" cy="6" r="2" fill="currentColor" stroke="none" /><ellipse cx="6" cy="6" rx="5" ry="2" /></svg> }
