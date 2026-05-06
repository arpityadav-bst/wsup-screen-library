'use client'

import { useState } from 'react'
import { Section, SubLabel, PreviewBox, TokenCell } from '../../helpers'
import Button from '@/components/ui/Button'
import BlockedListView from '@/components/profile/BlockedListView'
import { BLOCKED_CREATORS } from '@/lib/mockData'

export default function BlockedListSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const [openEmpty, setOpenEmpty] = useState(false)

  return (
    <Section id="Blocked List" title="Blocked List" onVisible={onSectionVisible}>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Live triggers</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Self-only management surface. Opened from <code className="text-text-title">MenuSheet</code> &rarr; &ldquo;Blocked creators&rdquo;. Mobile: full-screen slide-in (z=50). Desktop: sidebar overlay inside <code className="text-text-title">ProfileRightSidebar</code> (z=10). Single list — no Followers/Following-style tabbar.</p>
        <PreviewBox className="flex gap-s flex-wrap">
          <Button size="s" variant="secondary" onClick={() => setOpen(true)}>Open (5 blocked)</Button>
          <Button size="s" variant="secondary" onClick={() => setOpenEmpty(true)}>Open (empty state)</Button>
        </PreviewBox>
      </div>

      <div className="min-w-[440px] flex-1">
        <SubLabel>Anatomy</SubLabel>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          {[
            ['API: <BlockedListView open onClose blocked mode?>', 'Single list. mode="fullscreen" (mobile) or "sidebar" (desktop overlay inside ProfileRightSidebar)'],
            ['Mobile: SubpageHeader (back to Profile) + scrollable list', 'Title "Blocked creators" rendered in the right slot of SubpageHeader — same anatomy as MyCardsView'],
            ['Desktop: sidebar back-button row (h-3xxxl) + hairline + list', 'Inline header instead of SubpageHeader to match SocialView\'s sidebar mode'],
            ['Row: avatar w-2xxxl (40) mobile / w-xxxl (32) desktop + name + CTA pill', 'Same row anatomy as SocialView — gap-s between avatar and name, CTA right-aligned w-[108px]'],
            ['CTA flips in place: "Unblock" (filled) ↔ "Blocked" (outlined)', 'Filled state: bg-white-80 text-accent. Outlined state: bg-transparent border border-white-20 text-text-body'],
            ['Single-tap, no confirmation on either state', 'Reverse-of-confirmed-action rule + deliberate-management-context — friction was paid by navigating into this list'],
            ['Empty state: EmptyState variant="all-good"', '"You haven\'t blocked anyone." Rare in practice — mock data ships with 5 blocked'],
            ['Lives in src/components/profile/BlockedListView.tsx', 'Same dual-surface pattern as SocialView (mobile fullscreen / desktop sidebar overlay)'],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-[6px] border-b border-white-05 last:border-0">
              <TokenCell value={cls} />
              <span className="text-text-xxsmall text-right shrink-0 max-w-[45%]">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-l">
          <SubLabel>When to use</SubLabel>
        </div>
        <div className="flex flex-col gap-s text-xs text-text-body bg-white-05 border border-white-10 rounded-card p-m w-full">
          <p className="text-text-body">Use this pattern (single-list management overlay) when:</p>
          <ul className="list-disc pl-m space-y-1 text-text-small">
            <li>The user is managing a single category of items they previously took an action on (blocked, muted, archived)</li>
            <li>The list is opened from a profile-level menu, not from a stat or social affordance</li>
            <li>The primary per-row action is the reverse of the original action (Unblock, Unmute, Restore)</li>
          </ul>
          <p className="text-text-body mt-s">Don&apos;t use this for:</p>
          <ul className="list-disc pl-m space-y-1 text-text-small">
            <li>Followers / Following — those are tabbed; use <code className="text-text-title">SocialView</code></li>
            <li>Cards / collections — use <code className="text-text-title">MyCardsView</code> (grid, desktop CenterPopup)</li>
            <li>Lists with a primary one-shot action — use a sheet, not an overlay</li>
          </ul>
        </div>
      </div>

      <BlockedListView open={open} onClose={() => setOpen(false)} blocked={BLOCKED_CREATORS} />
      <BlockedListView open={openEmpty} onClose={() => setOpenEmpty(false)} blocked={[]} />

    </Section>
  )
}
