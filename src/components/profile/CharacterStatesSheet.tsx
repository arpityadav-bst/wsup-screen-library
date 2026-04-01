'use client'

import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import StateExplainerCard from './StateExplainerCard'
import type { StateCardData } from './StateExplainerCard'

interface CharacterStatesSheetProps {
  open: boolean
  onClose: () => void
}

const SHEET_TITLE = 'Character States'
const SHEET_SUBTITLE = 'What each state means for your characters'

const STATE_CARDS: StateCardData[] = [
  {
    title: 'Active',
    pillLabel: 'Live',
    accentColor: '#398b4d',
    dotColor: '#398b4d',
    pillBg: 'rgba(57,139,77,0.15)',
    pillText: '#6ec97e',
    description: 'Your character is live on wsup.ai. It appears in explore pages, category pages, and search results. Anyone can discover and start chatting with it.',
    checklist: [
      { text: 'Visible on explore and search', allowed: true },
      { text: 'New users can discover it', allowed: true },
      { text: 'Existing users can chat', allowed: true },
      { text: 'You earn engagement normally', allowed: true },
    ],
    cardBg: 'rgba(57,139,77,0.06)',
  },
  {
    title: 'Dormant - Inactive',
    pillLabel: 'Inactive',
    accentColor: 'rgba(255,255,255,0.3)',
    dotColor: 'rgba(255,255,255,0.4)',
    pillBg: 'rgba(255,255,255,0.08)',
    pillText: 'rgba(255,255,255,0.5)',
    description: 'Your character has had no new conversations in 30 days, so it has been moved out of distribution. Existing users can still chat with it.',
    checklist: [
      { text: 'Not visible on explore or search', allowed: false },
      { text: 'New users cannot discover it', allowed: false },
      { text: 'Existing users can still chat', allowed: true },
      { text: 'Creator can view on profile', allowed: true },
    ],
    nextBox: {
      label: 'What happens next',
      text: 'If nobody chats for 60 days, it will be permanently removed.',
    },
    cta: { label: 'Revive for 20 credits to get back into distribution →', color: '#82a1ff' },
    cardBg: 'rgba(255,255,255,0.03)',
  },
  {
    title: 'Dormant - Policy Review',
    pillLabel: 'Policy Review',
    accentColor: '#ffc32a',
    dotColor: '#ffc32a',
    pillBg: 'rgba(255,195,42,0.12)',
    pillText: '#ffd666',
    description: 'Your character was reviewed and found to not meet our content policy. The specific reason is shown on your character dashboard.',
    checklist: [
      { text: 'Not visible on explore or search', allowed: false },
      { text: 'New users cannot discover it', allowed: false },
      { text: 'Existing users can still chat', allowed: true },
      { text: 'Creator can view on profile', allowed: true },
    ],
    nextBox: {
      label: 'What happens next',
      text: 'If nobody chats for 60 days it will be permanently removed. You can appeal by editing the character to address the policy concern.',
    },
    cta: { label: 'Appeal and revive for 20 credits →', color: '#82a1ff' },
    cardBg: 'rgba(255,195,42,0.04)',
  },
  {
    title: 'Removed',
    pillLabel: 'Removed',
    accentColor: '#de5a48',
    dotColor: '#de5a48',
    pillBg: 'rgba(222,90,72,0.12)',
    pillText: '#f08070',
    description: 'Your character has been permanently removed for a serious policy violation. It cannot be found, shared, or accessed by new users.',
    checklist: [
      { text: 'Not visible anywhere', allowed: false },
      { text: 'New users cannot find it', allowed: false },
      { text: 'No new chats allowed', allowed: false },
      { text: 'Existing chat history is read-only', allowed: true },
    ],
    nextBox: {
      label: 'What happens next',
      text: 'This character cannot be revived through self-service. Contact our support team if you believe this was made in error.',
    },
    cta: { label: 'Contact support →', color: 'rgba(255,255,255,0.5)' },
    cardBg: 'rgba(222,90,72,0.04)',
  },
]

function StatesContent() {
  return (
    <div className="flex-1 overflow-y-auto scroll-hide px-l py-m">
      <p className="text-sm text-text-body leading-relaxed mb-l">
        Every character on wsup.ai has a state that determines how it appears and who can interact with it.
      </p>
      {STATE_CARDS.map((card) => (
        <StateExplainerCard key={card.title} data={card} />
      ))}
      <div className="pt-xl pb-xxl">
        <div className="h-px bg-white-10 mb-m" />
        <p className="text-sm text-text-small">Have questions?</p>
        <p className="text-xs text-text-xxsmall leading-relaxed">
          Visit our help center or contact support for more information.
        </p>
      </div>
    </div>
  )
}

export default function CharacterStatesSheet({ open, onClose }: CharacterStatesSheetProps) {
  return (
    <>
      {/* Mobile */}
      <BottomSheet open={open} onClose={onClose} title={SHEET_TITLE} subtitle={SHEET_SUBTITLE} fillHeight>
        <StatesContent />
      </BottomSheet>
      {/* Desktop */}
      <CenterPopup open={open} onClose={onClose} title={SHEET_TITLE} subtitle={SHEET_SUBTITLE} maxWidth="520px">
        <StatesContent />
      </CenterPopup>
    </>
  )
}
