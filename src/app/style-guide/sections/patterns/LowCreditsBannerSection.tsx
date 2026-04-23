'use client'

import { Section, SubLabel, StateLabel } from '../../helpers'
import LowCreditsBanner from '@/components/shared/LowCreditsBanner'

export default function LowCreditsBannerSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Low Credits Banner" title="Low Credits Banner" onVisible={onSectionVisible}>
      <div className="w-full max-w-[760px] flex flex-col gap-l">
        <div>
          <SubLabel>Default — 10 credits left, ~3 replies</SubLabel>
          <LowCreditsBanner credits={10} estimatedReplies={3} />
          <StateLabel>Subtle alert tint (status-alert at 10% bg, 30% border). Red dot pulses via animate-ping. Primary button opens CreditSidebar via global event.</StateLabel>
        </div>

        <div>
          <SubLabel>Near-zero — 2 credits left</SubLabel>
          <LowCreditsBanner credits={2} estimatedReplies={1} />
          <StateLabel>Same styling across thresholds — banner tone doesn&apos;t escalate. Parent decides when to render.</StateLabel>
        </div>

        <div className="mt-s p-s bg-white-05 rounded-card border border-white-10 text-xs text-text-body leading-relaxed max-w-[600px]">
          <p className="font-semibold text-text-title mb-xxs">Behavior</p>
          <p>Dismissible via X (local state, resets on re-mount). &quot;Add credits&quot; dispatches <code className="text-accent-light">wsup:open-credit-sidebar</code> event — Header listens and opens CreditSidebar. Use the <code className="text-accent-light">onAddCredits</code> prop to override.</p>
          <p className="mt-xxs">Parent owns the threshold logic — the banner just renders. Typical trigger: credits below 20.</p>
        </div>
      </div>
    </Section>
  )
}
