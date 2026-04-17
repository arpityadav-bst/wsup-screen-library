'use client'

import { useState } from 'react'
import { Section, SubLabel, Tag } from '../../helpers'
import DormantCharacterCard from '@/components/profile/DormantCharacterCard'
import ReviveConfirmSheet from '@/components/profile/ReviveConfirmSheet'
import EmptyState from '@/components/ui/EmptyState'
import CreditFeeAccordion from '@/components/ui/CreditFeeAccordion'
import ButtonComp from '@/components/ui/Button'
import Button from '@/components/ui/Button'

const STATE_BADGES: { label: string; bg: string; text: string; border: string; tag: string; icon?: React.ReactNode }[] = [
  {
    label: 'Inactive', bg: 'bg-black-50', text: 'text-white-60', border: 'border-white-10', tag: 'Dormant inactive',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  },
  {
    label: 'Policy Review', bg: 'bg-status-warning/[0.20]', text: 'text-status-warning', border: 'border-status-warning/[0.30]', tag: 'Dormant moderation',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
  },
  {
    label: 'Under Review', bg: 'bg-forms-focus-border/[0.15]', text: 'text-forms-focus-border', border: 'border-forms-focus-border/[0.30]', tag: 'Edits submitted',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  },
  {
    label: 'Approved', bg: 'bg-status-success/[0.15]', text: 'text-status-success', border: 'border-status-success/[0.30]', tag: 'Review passed (Active card)',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  },
  {
    label: 'Rejected', bg: 'bg-status-alert/[0.15]', text: 'text-status-alert', border: 'border-status-alert/[0.30]', tag: 'Edits rejected',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>,
  },
  {
    label: 'Removed', bg: 'bg-status-alert/[0.25]', text: 'text-status-alert', border: 'border-status-alert/[0.30]', tag: 'Terminal state',
    icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>,
  },
]

export default function LifecycleSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const [reviveOpen, setReviveOpen] = useState(false)
  const [reviveLowOpen, setReviveLowOpen] = useState(false)

  return (
    <Section id="Lifecycle" title="Lifecycle" onVisible={onSectionVisible}>

      {/* State badges */}
      <div>
        <SubLabel>State Badges</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Tap a badge on a card to see a contextual tooltip. Uses <code className="text-accent-light">BadgeTooltip</code> component.</p>
        <div className="flex flex-wrap gap-3 items-center">
          {STATE_BADGES.map((b) => (
            <div key={b.label} className="flex flex-col items-start gap-2">
              <span className={`inline-flex items-center gap-xxs px-xs py-xxxs rounded-pill text-xxs font-medium ${b.bg} ${b.text} border ${b.border}`}>
                {b.icon}
                {b.label}
              </span>
              <Tag>{b.tag}</Tag>
            </div>
          ))}
        </div>
      </div>

      {/* Status dots */}
      <div>
        <SubLabel>Status Dots (Filter Pills)</SubLabel>
        <div className="flex flex-wrap gap-4 items-center">
          {[
            { color: '#398b4d', label: 'Active' },
            { color: '#ffc32a', label: 'Needs Attention' },
            { color: '#de5a48', label: 'Removed' },
          ].map((d) => (
            <div key={d.label} className="flex items-center gap-xs">
              <span className="w-[8px] h-[8px] rounded-pill" style={{ backgroundColor: d.color }} />
              <Tag>{d.label}</Tag>
            </div>
          ))}
        </div>
      </div>

      {/* Needs Attention cards */}
      <div className="w-full max-w-[480px]">
        <SubLabel>Needs Attention Cards</SubLabel>
        <div className="grid grid-cols-2 gap-s">
          <DormantCharacterCard name="Mika" img="/chars/char10.webp" stateType="inactive" chats="18.1K" lastChatDaysAgo={42} />
          <DormantCharacterCard name="Harlo" img="/chars/char11.webp" stateType="under-review" chats="21.8K" />
        </div>
      </div>

      <div className="w-full max-w-[480px]">
        <SubLabel>Needs Attention — Review States</SubLabel>
        <div className="grid grid-cols-2 gap-s">
          <DormantCharacterCard name="Joo Jaekyung" img="/chars/char12.webp" stateType="moderation" chats="48.4K" lastChatDaysAgo={38} />
          <DormantCharacterCard name="Roblox Story" img="/chars/char13.webp" stateType="rejected" chats="90.4K" lastChatDaysAgo={38} />
        </div>
      </div>

      <div className="w-full max-w-[480px]">
        <SubLabel>Removed Cards (grayscale, Contact Support)</SubLabel>
        <div className="grid grid-cols-2 gap-s">
          <DormantCharacterCard name="Class 1A MHA" img="/chars/char15.webp" stateType="removed" chats="19.7K" />
        </div>
      </div>

      {/* Empty States */}
      <div className="w-full max-w-[480px]">
        <SubLabel>Empty States (per dashboard tab)</SubLabel>
        <div className="flex flex-col gap-s border border-white-10 rounded-card overflow-hidden">
          <EmptyState message="No active characters" />
          <div className="h-px bg-white-10" />
          <EmptyState message="Nothing needs attention" />
          <div className="h-px bg-white-10" />
          <EmptyState message="No removed characters" />
        </div>
      </div>

      {/* Zero Characters — new creator CTA */}
      <div className="w-full max-w-[480px]">
        <SubLabel>Zero Characters (new creator)</SubLabel>
        <div className="border border-white-10 rounded-card overflow-hidden">
          <div className="flex flex-col items-center justify-center py-4xl gap-m text-center">
            <svg className="w-xxl h-xxl text-white-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <p className="text-sm text-text-dim">Create your first character</p>
            <ButtonComp variant="primary" size="m">Create Character</ButtonComp>
          </div>
        </div>
      </div>

      {/* Credit Fee Accordion */}
      <div className="w-full max-w-[480px]">
        <SubLabel>Credit Fee Accordion (shared component)</SubLabel>
        <div className="p-m border border-white-10 rounded-card">
          <CreditFeeAccordion />
        </div>
      </div>

      {/* ReviveConfirmSheet */}
      <div className="w-full max-w-[480px]">
        <SubLabel>Revival Confirmation (tap to open)</SubLabel>
        <div className="flex gap-s">
          <Button variant="secondary" size="s" onClick={() => setReviveOpen(true)}>
            Sufficient credits
          </Button>
          <Button variant="secondary" size="s" onClick={() => setReviveLowOpen(true)}>
            Insufficient credits
          </Button>
        </div>
        <ReviveConfirmSheet
          open={reviveOpen}
          onClose={() => setReviveOpen(false)}
          onConfirm={() => setReviveOpen(false)}
          characterName="Joo Jaekyung"
          characterImg="/chars/char12.webp"
          stateType="moderation"
          reason="IP/Trademark"
          credits={20}
          userBalance={120}
        />
        <ReviveConfirmSheet
          open={reviveLowOpen}
          onClose={() => setReviveLowOpen(false)}
          onConfirm={() => setReviveLowOpen(false)}
          characterName="Roblox Story"
          characterImg="/chars/char13.webp"
          stateType="rejected"
          reason="IP/Trademark"
          credits={20}
          userBalance={8}
        />
      </div>

    </Section>
  )
}
