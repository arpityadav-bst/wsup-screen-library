'use client'

import { Section, SubLabel } from '../../helpers'
import DailyCheckInCard from '@/components/ui/DailyCheckInCard'
import RewardRow from '@/components/ui/RewardRow'

export default function RewardCardsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Reward Cards" title="Reward Cards" onVisible={onSectionVisible}>

      <div className="w-full max-w-[440px]">
        <SubLabel>DailyCheckInCard</SubLabel>
        <p className="text-xs text-text-small mb-s">
          Inset card used inside StreakBlock and StreakClaimPopup. Optional <code className="text-text-title">dayBadge</code> renders a small uppercase &ldquo;DAY N&rdquo; gold label at the top — used in the popup variant where the streak status needs to live inside the card (no surrounding header strip).
        </p>
        <div className="flex flex-col gap-s">
          <DailyCheckInCard earnValue={10} onClaim={() => {}} />
          <DailyCheckInCard dayBadge={3} earnValue={15} onClaim={() => {}} />
          <DailyCheckInCard dayBadge={3} earnValue={15} claimable={false} />
        </div>
      </div>

      <div className="w-full max-w-[440px]">
        <SubLabel>RewardRow</SubLabel>
        <p className="text-xs text-text-small mb-s">
          Generic earn-row primitive: label + Earn N + Claim button. Used by CreditSidebar&rsquo;s Daily / One-Time Rewards lists. Auto-swaps the button label to &ldquo;Claimed&rdquo; (secondary, disabled) when <code className="text-text-title">claimable</code> is false.
        </p>
        <div className="flex flex-col gap-xs bg-white-05 rounded-card p-m">
          <RewardRow label="Sign-up on wsup" earnValue={10} onClaim={() => {}} />
          <div className="border-t border-white-10" />
          <RewardRow label="Create a character" earnValue={10} onClaim={() => {}} />
          <div className="border-t border-white-10" />
          <RewardRow label="Already claimed" earnValue={10} claimable={false} />
        </div>
      </div>

    </Section>
  )
}
