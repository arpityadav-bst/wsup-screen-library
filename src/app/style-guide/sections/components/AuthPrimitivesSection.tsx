'use client'

import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'
import EmailField from '@/components/ui/EmailField'
import GoogleSignIn from '@/components/ui/GoogleSignIn'
import { useState } from 'react'

export default function AuthPrimitivesSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const [email, setEmail] = useState('')
  return (
    <Section id="Auth Primitives" title="Auth Primitives" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Email Field</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Used in LoginSheet. Pill-shaped input with a submit arrow on the right. Full width.</p>
        <PreviewBox>
          <div className="w-full max-w-[340px]">
            <EmailField value={email} onChange={setEmail} onSubmit={() => {}} />
          </div>
        </PreviewBox>

        <div className="mt-m" />
        <SubLabel>Google Sign-In</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">White pill button with the Google G-logo + label. Used wherever OAuth sign-in is offered.</p>
        <PreviewBox>
          <div className="w-full max-w-[340px]">
            <GoogleSignIn onClick={() => {}} />
          </div>
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['EmailField bg-white-10 rounded-[24px] pl-m pr-xs py-[10px]', 'Pill-shape, generous left padding, right-side arrow button'],
            ['placeholder:text-white-20 caret-white outline-none', 'Input styling — muted placeholder, bright caret'],
            ['12px arrow stroke 1.5 text-white-70', 'Inline submit arrow — clickable, calls onSubmit'],
            ['GoogleSignIn h-[40px] rounded-pill bg-white', 'White pill — stands out on dark popup surface'],
            ['text-sm text-black + 21×21 Google G logo', 'Content — label + glyph at designed sizes'],
            ['hover:opacity-90 transition-opacity', 'Hover state for both primitives'],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={cls} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
            </div>
          ))}
        </div>
      </div>

    </Section>
  )
}
