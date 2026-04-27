'use client'

import { useState } from 'react'
import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'
import StreakClaimPopup from '@/components/ui/StreakClaimPopup'
import Button from '@/components/ui/Button'

export default function StreakClaimSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const [openDefault, setOpenDefault] = useState(false)
  const [openClaimed, setOpenClaimed] = useState(false)

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
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['Compound: BottomSheet (mobile) + CenterPopup (desktop)', 'Same content, viewport-axis-aware shells'],
            ['Surface stack: 2 layers (sheet + Daily check-in inset)', 'Outer streak card dropped via StreakBlock bare prop — no redundant box-on-box-on-box'],
            ['StreakBlock bare={true}', 'Header strip + Daily check-in card + footnote sit directly on the popup surface'],
            ['No tier-pill grid', 'Progression preview belongs in the credit hub (CreditSidebar), not the action-focused popup'],
            ['No secondary rewards', 'Other earn paths (Chat, Create a post) live in the credit hub. Popup is strictly streak claim'],
            ['Auth gate — Claim → LoginSheet → resume on sign-in', 'gateAction pattern (same as BuyCreditsSheet). Gate copy: &ldquo;Sign in to claim&rdquo; / &ldquo;So your credits go to the right account.&rdquo;'],
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
    </Section>
  )
}
