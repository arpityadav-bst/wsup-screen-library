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
    description: 'This character hasn\'t had new conversations in 30 days. It\'s not shown on explore pages, category pages, or search results. Existing users can continue their conversations.',
    checklist: [
      { text: 'Not visible on explore or search', allowed: false },
      { text: 'New users cannot discover it', allowed: false },
      { text: 'Existing users can still chat', allowed: true },
      { text: 'Creator can view and chat from profile', allowed: true },
    ],
    cta: { label: 'Can be revived for 20 credits →', color: '#82a1ff' },
    cardBg: 'rgba(255,255,255,0.03)',
  },
  {
    title: 'Dormant - Policy Review',
    pillLabel: 'Policy Review',
    accentColor: '#ffc32a',
    dotColor: '#ffc32a',
    pillBg: 'rgba(255,195,42,0.12)',
    pillText: '#ffd666',
    description: 'This character is currently being reviewed against our content policy. The reason is shown on the character card. Existing users can continue their conversations.',
    checklist: [
      { text: 'Not visible on explore or search', allowed: false },
      { text: 'New users cannot discover it', allowed: false },
      { text: 'Existing users can still chat', allowed: true },
      { text: 'Creator can view from profile', allowed: true },
    ],
    cta: { label: 'Can edit and re-submit through revival flow →', color: '#82a1ff' },
    cardBg: 'rgba(255,195,42,0.04)',
  },
  {
    title: 'Under Review',
    pillLabel: 'Under Review',
    accentColor: '#82a1ff',
    dotColor: '#82a1ff',
    pillBg: 'rgba(130,161,255,0.12)',
    pillText: '#a3bfff',
    description: 'Your edits are being reviewed. No action is needed from you. Existing users can continue their conversations.',
    checklist: [
      { text: 'Not visible on explore or search', allowed: false },
      { text: 'Existing users can still chat', allowed: true },
      { text: 'Review usually takes a few minutes', allowed: true },
    ],
    cardBg: 'rgba(130,161,255,0.04)',
  },
  {
    title: 'Approved',
    pillLabel: 'Approved',
    accentColor: '#398b4d',
    dotColor: '#398b4d',
    pillBg: 'rgba(57,139,77,0.15)',
    pillText: '#6ec97e',
    description: 'Your edits have been reviewed and approved. Your character will return to active distribution shortly.',
    checklist: [
      { text: 'Will return to explore and search', allowed: true },
      { text: 'New users can discover it again', allowed: true },
      { text: 'You can dismiss this notification', allowed: true },
    ],
    cardBg: 'rgba(57,139,77,0.04)',
  },
  {
    title: 'Rejected',
    pillLabel: 'Rejected',
    accentColor: '#de5a48',
    dotColor: '#de5a48',
    pillBg: 'rgba(222,90,72,0.12)',
    pillText: '#f08070',
    description: 'This character did not meet our content policy. The reason is shown on the character card. Existing users can continue their conversations.',
    checklist: [
      { text: 'Not visible on explore or search', allowed: false },
      { text: 'Existing users can still chat', allowed: true },
      { text: 'Creator can edit and re-submit', allowed: true },
    ],
    cta: { label: 'Can edit and re-submit through revival flow →', color: '#82a1ff' },
    cardBg: 'rgba(222,90,72,0.04)',
  },
  {
    title: 'Removed',
    pillLabel: 'Removed',
    accentColor: '#de5a48',
    dotColor: '#de5a48',
    pillBg: 'rgba(222,90,72,0.12)',
    pillText: '#f08070',
    description: 'This character has been removed from the platform. It is not visible anywhere. It cannot be found, shared, or accessed.',
    checklist: [
      { text: 'Not visible anywhere', allowed: false },
      { text: 'New users cannot find it', allowed: false },
      { text: 'No new chats allowed', allowed: false },
      { text: 'Existing chat history is read-only', allowed: true },
    ],
    cta: { label: 'Contact support →', color: 'rgba(255,255,255,0.5)' },
    cardBg: 'rgba(222,90,72,0.04)',
  },
]

function StatesContent() {
  return (
    <div className="flex-1 overflow-y-auto scroll-hide px-l py-m">
      <p className="text-sm text-text-body leading-relaxed mb-s">
        Every character on wsup.ai has a state that determines how it appears and who can interact with it.
      </p>
      <a
        href="https://medium.com/@wsup"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-s px-s py-xs rounded-card bg-white-05 hover:bg-white-10 border border-white-05 hover:border-white-10 transition-all cursor-pointer no-underline mb-l group"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-xsmall shrink-0"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
        <span className="flex-1 text-xs text-text-subtitle underline decoration-white-10 underline-offset-2 group-hover:text-text-title group-hover:decoration-white-20 transition-colors">How character states work</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-xxsmall group-hover:text-text-xsmall group-hover:translate-x-0.5 transition-all shrink-0"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
      </a>
      {STATE_CARDS.map((card) => (
        <StateExplainerCard key={card.title} data={card} />
      ))}
      <div className="pt-xl pb-xxl">
        <div className="h-px bg-white-10 mb-m" />
        <p className="text-sm text-text-small">Have questions?</p>
        <p className="text-xs text-text-xxsmall leading-relaxed mt-xxs">
          Visit our{' '}
          <a href="https://help.wsup.ai" className="text-secondary no-underline hover:underline">help center</a>
          {' '}or{' '}
          <a href="mailto:support@wsup.ai" className="text-secondary no-underline hover:underline">contact support</a>
          {' '}for more information.
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
