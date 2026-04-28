'use client'

import { useState } from 'react'
import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'
import LoginSheet from '@/components/ui/LoginSheet'
import Button from '@/components/ui/Button'

export default function LoginSheetSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const [openDefault, setOpenDefault] = useState(false)
  const [openPurchase, setOpenPurchase] = useState(false)
  const [openCta, setOpenCta] = useState(false)

  return (
    <Section id="Login Sheet" title="Login Sheet" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Live triggers — copy adapts per context</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Same pattern, different headline + subtitle. Desktop: horizontal 2-col modal (form left, character image right). Mobile: bottom-sheet with character image + radial fade above, form below.</p>
        <PreviewBox className="flex gap-s flex-wrap">
          <Button size="s" variant="secondary" onClick={() => setOpenDefault(true)}>Default (character creation)</Button>
          <Button size="s" variant="secondary" onClick={() => setOpenPurchase(true)}>Purchase-flow context</Button>
          <Button size="s" variant="secondary" onClick={() => setOpenCta(true)}>CTA mode (single button + footer)</Button>
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['desktop: max-w-[720px] h-[420px] flex 2-col', 'Modal split — form left (40%), character image fills 60%'],
            ['mobile: h-[440px] form / h-[360px] cta — bottom-sheet over full-viewport image', 'Image fills the top with a radial fade; form sits over the bottom'],
            ['bg-profile-sheet-bg bg-surface-premium', 'Form surface — same premium token stack as BuyCreditsSheet'],
            ['rounded-tl-popup rounded-tr-popup (mobile)', 'Only top corners rounded on bottom-sheet variant'],
            ['backdrop-blur-popup on mobile form', 'Blurred surface over image for legibility'],
            ['headline: ReactNode, subtitle: string props', 'Adapted per trigger — "character creation" / "save credits" / "continue"'],
            ['mode: "form" (default) | "cta"', 'form = Email + Google + Apple; cta = single Button + footer hint (gateway / value-prop screens)'],
            ['Form mode: EmailField → OR divider → Google → Apple', 'Email-first; social providers stack below the divider'],
            ['Apple = bg-black + border-white-20, Google = bg-white', 'Brand-pure styling differentiates the two providers on the dark surface'],
            ['CTA mode: ctaLabel (string) + footer (string)', 'Single primary Button + small hint text below; for streak-promo and similar value-prop variants'],
            ['onSignIn fires on email submit, Google, Apple, or CTA click', 'All paths run the same handler — dev handoff, no real auth'],
            ['AuthContext.login() inside onSignIn + resume pending action', 'Caller injects what to resume after sign-in'],
            ['LogoMark floats at top-center (desktop) / overlapping -top-[32px] (mobile)', 'App-icon mark ties the form to the brand'],
            ['ESC + backdrop click close', 'Standard modal dismissal'],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={cls} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <LoginSheet
        open={openDefault}
        onClose={() => setOpenDefault(false)}
        onSignIn={() => setOpenDefault(false)}
      />
      <LoginSheet
        open={openPurchase}
        onClose={() => setOpenPurchase(false)}
        onSignIn={() => setOpenPurchase(false)}
        headline={<>Sign in to continue</>}
        subtitle="Keep your credits across every device."
      />
      <LoginSheet
        open={openCta}
        onClose={() => setOpenCta(false)}
        onSignIn={() => setOpenCta(false)}
        headline={<>Save your free credits</>}
        subtitle="Sign in to keep your streak and credits across all your devices."
        mode="cta"
        ctaLabel="Sign in to claim"
        footer="We'll move your streak to your account on first sign-in."
      />
    </Section>
  )
}
