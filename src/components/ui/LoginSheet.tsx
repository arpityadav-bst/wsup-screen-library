'use client'

import Image from 'next/image'
import { useEffect, useState, type ReactNode } from 'react'
import EmailField from './EmailField'
import GoogleSignIn from './GoogleSignIn'
import AppleSignIn from './AppleSignIn'
import CloseButton from './CloseButton'
import Button from './Button'

export type LoginSheetMode = 'form' | 'cta'

export interface VariantSwitcherProps {
  current: string
  variants: { id: string; label: string }[]
  onChange: (id: string) => void
}

interface LoginSheetProps {
  open: boolean
  onClose: () => void
  onSignIn: () => void
  headline?: ReactNode
  subtitle?: string
  characterImage?: string
  mode?: LoginSheetMode
  ctaLabel?: string
  footer?: string
  variantSwitcher?: VariantSwitcherProps
}

type Align = 'start' | 'center'

const DEFAULT_HEADLINE = (
  <>
    Let&apos;s dive into
    <br />
    character creation
  </>
)
const DEFAULT_SUBTITLE = 'Create detailed characters and bring them to life.'
const DEFAULT_CHARACTER_IMAGE = '/login-character.png'

function LogoMark({ className = '', size = 48 }: { className?: string; size?: number }) {
  const height = Math.round(size * (42 / 48))
  return (
    <div className={`shrink-0 ${className}`}>
      <Image src="/wsup-logo.svg" alt="wsup" width={size} height={height} className="object-contain drop-shadow-lg" priority />
    </div>
  )
}

function LegalFooter({ align = 'center' }: { align?: Align }) {
  const text = align === 'start' ? 'text-left' : 'text-center'
  return (
    <p className={`text-xxs text-white-20 tracking-[0.2px] leading-[1.25] w-full ${text}`}>
      By continuing, you accept wsup.ai&apos;s <span className="text-white-40">Terms</span> and <span className="text-white-40">Privacy Policy.</span>
    </p>
  )
}

function CopyBlock({ align, headline, subtitle }: { align: Align; headline: ReactNode; subtitle: string }) {
  const cls = align === 'start' ? 'text-left items-start' : 'text-center items-center'
  return (
    <div className={`flex flex-col gap-xs w-full ${cls}`}>
      <h2 className="font-semibold text-2xl leading-[1.25] text-text-title">{headline}</h2>
      <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#72e9f1] via-[#7192e5] to-[#6257d7]">
        {subtitle}
      </p>
    </div>
  )
}

function InputBlock({ email, setEmail, onSignIn }: { email: string; setEmail: (v: string) => void; onSignIn: () => void }) {
  return (
    <div className="flex flex-col gap-xs w-full">
      <EmailField value={email} onChange={setEmail} onSubmit={onSignIn} placeholder="Email address" />
      <div className="flex items-center gap-s h-[18px]">
        <div className="flex-1 h-px bg-white-10" />
        <span className="text-sm text-white-20">OR</span>
        <div className="flex-1 h-px bg-white-10" />
      </div>
      <GoogleSignIn onClick={onSignIn} label="Login with Google" />
      <AppleSignIn onClick={onSignIn} />
    </div>
  )
}

function CtaBlock({ align, ctaLabel, footer, onSignIn }: { align: Align; ctaLabel: string; footer?: string; onSignIn: () => void }) {
  const text = align === 'start' ? 'text-left' : 'text-center'
  return (
    <div className="flex flex-col gap-s w-full">
      <Button variant="primary" fullWidth onClick={onSignIn}>{ctaLabel}</Button>
      {footer && (
        <p className={`text-xs text-text-small leading-[1.4] w-full ${text}`}>{footer}</p>
      )}
    </div>
  )
}

function VariantSwitcherPills({ current, variants, onChange, className = '', style }: VariantSwitcherProps & { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`flex items-center gap-xxs px-xxs py-xxxs rounded-pill bg-black-55 backdrop-blur-bg border border-white-10 ${className}`}
      style={style}
    >
      <span className="text-xxs uppercase tracking-[0.4px] text-white-40 px-xxs">Variant</span>
      {variants.map(v => (
        <button
          key={v.id}
          type="button"
          onClick={() => onChange(v.id)}
          className={`text-xs leading-none px-xs py-xxs rounded-pill border-none cursor-pointer transition-colors ${
            current === v.id
              ? 'bg-white text-black font-medium'
              : 'bg-transparent text-white-60 hover:text-white-90 hover:bg-white-10'
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  )
}

export default function LoginSheet({
  open,
  onClose,
  onSignIn,
  headline = DEFAULT_HEADLINE,
  subtitle = DEFAULT_SUBTITLE,
  characterImage = DEFAULT_CHARACTER_IMAGE,
  mode = 'form',
  ctaLabel = 'Continue',
  footer,
  variantSwitcher,
}: LoginSheetProps) {
  const [email, setEmail] = useState('')
  const [internalMode, setInternalMode] = useState<LoginSheetMode>(mode)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    setInternalMode(mode)
    if (!open) setEmail('')
  }, [open, mode])

  if (!open) return null

  const advanceToProviders = () => setInternalMode('form')

  const ActionBlock = internalMode === 'cta'
    ? <CtaBlock align="start" ctaLabel={ctaLabel} footer={footer} onSignIn={advanceToProviders} />
    : <InputBlock email={email} setEmail={setEmail} onSignIn={onSignIn} />

  const ActionBlockCenter = internalMode === 'cta'
    ? <CtaBlock align="center" ctaLabel={ctaLabel} footer={footer} onSignIn={advanceToProviders} />
    : <InputBlock email={email} setEmail={setEmail} onSignIn={onSignIn} />

  return (
    <>
      {/* Desktop — 40/60 split, left-aligned form with distributed vertical spacing */}
      <div className="fixed inset-0 hidden md:flex items-center justify-center" style={{ zIndex: 90 }}>
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black-55"
          style={{ animation: 'fade-in 0.2s ease-out' }}
        />
        <div className="relative w-full max-w-[720px]">
          {variantSwitcher && (
            <VariantSwitcherPills
              {...variantSwitcher}
              className="absolute right-0"
              style={{ bottom: 'calc(100% + 10px)' }}
            />
          )}
          <div
            className="relative flex w-full h-[420px] rounded-popup overflow-hidden border border-white-20 shadow-popup"
            style={{ animation: 'slide-up 0.24s cubic-bezier(0.32,0.72,0,1)' }}
          >
            <div className={`relative w-[40%] shrink-0 bg-footer-bg bg-surface-premium flex flex-col px-l pt-l pb-l ${internalMode === 'cta' ? '' : 'justify-between'}`}>
              <LogoMark />
              <div className={`flex flex-col gap-l ${internalMode === 'cta' ? 'flex-1 justify-center' : ''}`}>
                <CopyBlock align="start" headline={headline} subtitle={subtitle} />
                {ActionBlock}
              </div>
              <LegalFooter align="start" />
            </div>
            <div className="relative w-[60%]">
              <Image src={characterImage} alt="" fill className="object-cover object-top" sizes="432px" />
              <div
                aria-hidden
                className="absolute top-0 right-0 left-0 h-[140px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)' }}
              />
              <CloseButton onClose={onClose} className="absolute top-s right-s" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — bottom sheet with image top, form bottom */}
      <div className="fixed inset-0 md:hidden flex flex-col" style={{ zIndex: 90 }}>
        <div className="absolute inset-0 overflow-hidden">
          <Image src={characterImage} alt="" fill className="object-cover object-top" priority sizes="100vw" />
          {/* Subtle fade toward the bottom where the form sheet sits — image stays clearly visible */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(21,21,21,0.35) 70%, #151515 100%)',
            }}
          />
        </div>
        <div className="relative mt-auto">
          {variantSwitcher && (
            <VariantSwitcherPills
              {...variantSwitcher}
              className="absolute right-xs"
              style={{ bottom: 'calc(100% + 10px)' }}
            />
          )}
          <div
            className={`relative ${internalMode === 'cta' ? 'h-[360px]' : 'h-[440px]'} backdrop-blur-popup bg-profile-sheet-bg bg-surface-premium border-t border-l border-r border-white-20 rounded-tl-popup rounded-tr-popup flex flex-col items-center justify-between pt-[84px] pb-l px-l shadow-popup`}
            style={{ animation: 'slide-up 0.28s cubic-bezier(0.32,0.72,0,1)' }}
          >
            <LogoMark size={72} className="absolute -top-[32px]" />
            <CloseButton onClose={onClose} className="absolute top-xxs right-xxs" />
            <CopyBlock align="center" headline={headline} subtitle={subtitle} />
            {ActionBlockCenter}
            <LegalFooter align="center" />
          </div>
        </div>
      </div>
    </>
  )
}
