'use client'

import { useState } from 'react'
import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'
import StreakClaimPopup, { STREAK_LOGIN_VARIANTS } from '@/components/ui/StreakClaimPopup'
import LoginSheet from '@/components/ui/LoginSheet'
import Button from '@/components/ui/Button'

export default function StreakClaimSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const [openDefault, setOpenDefault] = useState(false)
  const [openClaimed, setOpenClaimed] = useState(false)
  const [openLoginStandard, setOpenLoginStandard] = useState(false)
  const [openLoginPromo, setOpenLoginPromo] = useState(false)

  return (
    <Section id="Streak Claim" title="Streak Claim Popup" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Live triggers</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Mounts on Explore page open. Mobile: BottomSheet (z=70). Desktop: 440px CenterPopup (z=70). Two surface layers only — sheet itself + the Daily check-in inset card. Click Claim → LoginSheet auth gate; on sign-in the action resolves and the button flips to &ldquo;Claimed&rdquo;.</p>
        <PreviewBox className="flex gap-s flex-wrap">
          <Button size="s" variant="secondary" onClick={() => setOpenDefault(true)}>Default (Day 3, 15 to claim)</Button>
          <Button size="s" variant="secondary" onClick={() => setOpenClaimed(true)}>Daily already claimed</Button>
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Login gate variants</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Two copy + layout treatments for the auth gate triggered by Claim. <strong className="text-text-title">Standard (1)</strong>: direct sign-in form (Email + Google + Apple). <strong className="text-text-title">Promo (2)</strong>: 2-step flow — persuasion screen with single &ldquo;Sign in to claim&rdquo; CTA + portability hint, then tapping the CTA reveals Email + Google + Apple in the same popup (headline stays &ldquo;Save your free credits&rdquo; for continuity). When the gate is open on <code className="text-text-title">/explore</code>, use the <code className="text-text-title">Variant 1 / 2</code> pills above the popup&rsquo;s top-right to compare live.</p>
        <PreviewBox className="flex gap-s flex-wrap">
          <Button size="s" variant="secondary" onClick={() => setOpenLoginStandard(true)}>Standard (form)</Button>
          <Button size="s" variant="secondary" onClick={() => setOpenLoginPromo(true)}>Promo (CTA)</Button>
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Compound: BottomSheet (mobile) + CenterPopup (desktop)', 'Same content, viewport-axis-aware shells'],
            ['Surface stack: 2 layers (sheet + Daily check-in inset)', 'Outer streak card dropped via StreakBlock bare prop — no redundant box-on-box-on-box'],
            ['StreakBlock bare={true}', 'Header strip + Daily check-in card + footnote sit directly on the popup surface'],
            ['No tier-pill grid', 'Progression preview belongs in the credit hub (CreditSidebar), not the action-focused popup'],
            ['No secondary rewards', 'Other earn paths (Chat, Create a post) live in the credit hub. Popup is strictly streak claim'],
            ['Auth gate — Claim → LoginSheet → resume on sign-in', 'gateAction pattern (same as BuyCreditsSheet). Gate copy: &ldquo;Sign in to claim your credits&rdquo; / &ldquo;Unlock free credits and start chatting.&rdquo; — benefit-forward, not account-hygiene'],
            ['Closing LoginSheet drops the pending action', 'User stays unclaimed; can re-click Claim to re-trigger gate, or close popup'],
            ['Internal claimed state resets when popup closes', 'Fresh demo each visit'],
            ['CloseButton absolute top-xs right-xs', 'Self-mounted; primitives render no header chrome when title prop omitted'],
            ['ExploreEarnLink: .link utility + chevron-right', 'Same blue link as CreditSidebar &ldquo;How creator rewards work&rdquo;'],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={cls} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <StreakClaimPopup
        open={openDefault}
        onClose={() => setOpenDefault(false)}
        balance={10}
        streakDay={3}
        tomorrowReward={15}
        dailyCheckInEarn={15}
      />
      <StreakClaimPopup
        open={openClaimed}
        onClose={() => setOpenClaimed(false)}
        balance={25}
        streakDay={3}
        tomorrowReward={15}
        dailyCheckInEarn={15}
        dailyCheckInClaimable={false}
      />

      <LoginSheet
        open={openLoginStandard}
        onClose={() => setOpenLoginStandard(false)}
        onSignIn={() => setOpenLoginStandard(false)}
        headline={STREAK_LOGIN_VARIANTS.standard.headline}
        subtitle={STREAK_LOGIN_VARIANTS.standard.subtitle}
        mode={STREAK_LOGIN_VARIANTS.standard.mode}
      />
      <LoginSheet
        open={openLoginPromo}
        onClose={() => setOpenLoginPromo(false)}
        onSignIn={() => setOpenLoginPromo(false)}
        headline={STREAK_LOGIN_VARIANTS.promo.headline}
        subtitle={STREAK_LOGIN_VARIANTS.promo.subtitle}
        mode={STREAK_LOGIN_VARIANTS.promo.mode}
        ctaLabel={STREAK_LOGIN_VARIANTS.promo.ctaLabel}
        footer={STREAK_LOGIN_VARIANTS.promo.footer}
      />
    </Section>
  )
}
