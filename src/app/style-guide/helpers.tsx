'use client'

import { useRef, useEffect } from 'react'

// ── Layout helpers ───────────────────────────────────────────────────

export function Section({
  id, title, children, onVisible
}: {
  id: string
  title: string
  children: React.ReactNode
  onVisible: (id: string) => void
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(id) },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [id, onVisible])

  return (
    <section ref={ref} id={id} className="mb-16 scroll-mt-8">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-white text-lg font-semibold shrink-0">{title}</h2>
        <div className="flex-1 border-t border-white-10" />
      </div>
      <div className="flex flex-wrap gap-10">{children}</div>
    </section>
  )
}

export function ColorGrid({
  label, swatches, extra
}: {
  label: string
  swatches: { name: string; hex: string; dark?: boolean }[]
  extra?: React.ReactNode
}) {
  return (
    <div>
      <SubLabel>{label}</SubLabel>
      <div className="flex flex-wrap gap-3 items-end">
        {swatches.map(s => <Swatch key={s.name} {...s} />)}
        {extra}
      </div>
    </div>
  )
}

export function Swatch({ name, hex }: { name: string; hex: string; dark?: boolean }) {
  return (
    <div id={`token-${name}`} className="group flex flex-col gap-2 cursor-default">
      <div
        className="w-16 h-12 rounded-card border border-white-10 transition-transform group-hover:scale-105"
        style={{ background: hex }}
      />
      <span className="text-text-xsmall text-xxs leading-tight max-w-[64px]">{name}</span>
      <span className="text-text-xxsmall text-xxs leading-tight max-w-[64px] font-mono opacity-70">
        {hex.length > 10 ? hex.slice(0, 10) + '…' : hex}
      </span>
    </div>
  )
}

export function AlphaSwatch({ name, color, onLight }: { name: string; color: string; onLight?: boolean }) {
  return (
    <div id={`token-${name}`} className="flex flex-col gap-1 items-center">
      <div
        className="w-10 h-10 rounded-button border border-white-10"
        style={{ background: onLight ? '#ffffff' : undefined, position: 'relative' }}
      >
        <div className="absolute inset-0 rounded-button" style={{ background: color }} />
      </div>
      <span className="text-text-xxsmall text-xxs font-mono">{name.split('-')[1]}</span>
    </div>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-white-05 border border-white-10 rounded px-2 py-0.5 text-xxs font-mono text-text-xsmall whitespace-nowrap">
      {children}
    </span>
  )
}

export function StateLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[6px]">
      <div className="w-[2px] h-3 rounded-full bg-accent-light opacity-60 shrink-0" />
      <span className="text-xxs text-text-xxsmall uppercase tracking-wider">{children}</span>
    </div>
  )
}

export function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="label-xs shrink-0">{children}</span>
      <div className="flex-1 border-t border-white-10" />
    </div>
  )
}

export function PreviewBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-m bg-white-05 border border-white-10 rounded-card border-dashed ${className ?? ''}`}>
      {children}
    </div>
  )
}

// ── Token linking ──────────────────────────────────────────────────

const SPACING_TOKENS = new Set(['xxxs','xxs','xs','s','m','l','xl','xxl','xxxl'])
const RADIUS_TOKENS  = new Set(['popup','card','button','pill'])
const SHADOW_TOKENS  = new Set(['small','normal','big','button','dark'])
const BLUR_TOKENS    = new Set(['bg','heavy'])

const ALPHA_STEPS = ['05','10','20','30','40','50','60','70','80','90']
const KNOWN_TOKEN_IDS = new Set<string>([
  'token-accent','token-accent-hover','token-accent-dark','token-accent-dark-hover','token-accent-light','token-accent-ultra-light',
  'token-secondary','token-secondary-hover','token-secondary-ultra-dark','token-secondary-surface',
  'token-brand-yellow','token-brand-purple','token-brand-blue',
  'token-gradient-purple','token-gradient-blue','token-gradient-warm-light','token-gradient-warm-mid','token-gradient-warm-dark',
  'token-credit-bg','token-credit-gold','token-credit-orange','token-avatar',
  'token-status-alert','token-status-error','token-status-warning','token-status-success','token-status-positive','token-status-idle','token-status-info',
  'token-text-title','token-text-subtitle','token-text-body','token-text-label','token-text-small','token-text-xsmall','token-text-dim','token-text-xxsmall',
  'token-page-bg','token-page-divider','token-page-overlay','token-page-footer','token-footer-bg',
  'token-nav-hover-bg','token-nav-active-bg','token-nav-icon','token-nav-active-icon',
  'token-card-bg','token-card-border','token-card-hover-bg','token-card-hover-border',
  'token-forms-bg','token-forms-border','token-forms-focus-border','token-forms-error-border','token-forms-active-bg','token-forms-disabled-bg',
  'token-chat-ai-bubble','token-chat-ai-active','token-chat-user-bubble','token-chat-premium-border','token-chat-badge','token-chat-scrim-bottom',
  'token-coachmark-bg',
  'token-header-icon-border','token-header-icon-hover-bg',
  ...ALPHA_STEPS.map(n => `token-white-${n}`),
  ...ALPHA_STEPS.map(n => `token-black-${n}`),
  ...Array.from(SPACING_TOKENS, n => `token-spacing-${n}`),
  ...Array.from(RADIUS_TOKENS,  n => `token-radius-${n}`),
  ...Array.from(SHADOW_TOKENS,  n => `token-shadow-${n}`),
  ...Array.from(BLUR_TOKENS,    n => `token-blur-${n}`),
])

function getTokenId(raw: string): string | null {
  const word = raw.replace(/^[a-z-]+:/, '')
  if (word.includes('[') || word.includes(']')) return null
  const colorM = word.match(/^(?:bg|text|border|ring|fill|stroke|from|to|via|decoration)-(.+)$/)
  if (colorM) {
    const rest = colorM[1]
    if (['xs','sm','base','lg','xl','2xl','3xl','4xl','5xl','6xl'].includes(rest)) return null
    if (['transparent','white','black','current','inherit','none'].includes(rest)) return null
    return `token-${rest}`
  }
  const spaceM = word.match(/^(?:px|py|pt|pr|pb|pl|p|mx|my|mt|mr|mb|ml|m|gap|gap-x|gap-y)-(.+)$/)
  if (spaceM && SPACING_TOKENS.has(spaceM[1])) return `token-spacing-${spaceM[1]}`
  const radM = word.match(/^rounded-(.+)$/)
  if (radM && RADIUS_TOKENS.has(radM[1])) return `token-radius-${radM[1]}`
  const shadowM = word.match(/^shadow-(.+)$/)
  if (shadowM && SHADOW_TOKENS.has(shadowM[1])) return `token-shadow-${shadowM[1]}`
  const blurM = word.match(/^backdrop-blur-(.+)$/)
  if (blurM && BLUR_TOKENS.has(blurM[1])) return `token-blur-${blurM[1]}`
  return null
}

function scrollToToken(tokenId: string) {
  const el = document.getElementById(tokenId)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el.classList.remove('token-highlight')
  void el.offsetWidth
  el.classList.add('token-highlight')
  setTimeout(() => el.classList.remove('token-highlight'), 2900)
}

export function TokenCell({ value }: { value: string }) {
  const parts = value.split(/(\s+)/)
  return (
    <span className="font-mono text-xxs min-w-0 break-all leading-relaxed">
      {parts.map((part, i) => {
        const trimmed = part.trim()
        if (!trimmed) return <span key={i}>{part}</span>
        const tokenId = getTokenId(trimmed)
        if (tokenId && KNOWN_TOKEN_IDS.has(tokenId)) {
          return (
            <button
              key={i}
              onClick={() => scrollToToken(tokenId)}
              className="text-secondary underline decoration-dotted underline-offset-2 hover:text-secondary-hover transition-colors cursor-pointer font-mono text-xxs"
            >
              {part}
            </button>
          )
        }
        return <span key={i} className="text-text-xsmall">{part}</span>
      })}
    </span>
  )
}
