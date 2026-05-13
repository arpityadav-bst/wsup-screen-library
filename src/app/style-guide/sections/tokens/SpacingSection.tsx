'use client'

import { Section, SubLabel, Tag } from '../../helpers'

const SPACING_SCALE: [string, string][] = [
  ['xxxs', '2px'],
  ['xxs', '4px'],
  ['xs', '8px'],
  ['icon-btn', '10px'],
  ['s', '12px'],
  ['m', '16px'],
  ['l', '20px'],
  ['xl', '24px'],
  ['xxl', '32px'],
  ['xxxl', '40px'],
  ['2xxxl', '48px'],
  ['3xxxl', '56px'],
  ['4xl', '64px'],
  ['5xl', '72px'],
  ['6xl', '80px'],
]

// Max-width tokens — cap container widths in a tokenized way. Each represents a discrete container "size class"
// (popup-narrow = compact intervention popup; popup-medium = content card / wider popup; chat-bubble = AI message bubble).
const MAX_WIDTH_TOKENS: [string, string, string][] = [
  ['popup-narrow', '420px', 'ModelPickerSheet, ChatStyleSheet, SafetyBanner desktop card, MemoryLimitPopup, EmptyState read-line'],
  ['popup-medium', '480px', 'Onboarding overlay desktop popup, edit-character form, lifecycle/profile-card showcases'],
  ['chat-bubble',  '290px', 'ChatMessages.AIBubble + DeckCard opening bubble — AI speech bubble max-width'],
]

export default function SpacingSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Spacing" title="Spacing" onVisible={onSectionVisible}>
      <div>
        <SubLabel>Scale</SubLabel>
        <div className="flex flex-col gap-3">
          {SPACING_SCALE.map(([name, val]) => (
            <div id={`token-spacing-${name}`} key={name} className="flex items-center gap-4">
              <div className="w-8 text-right">
                <Tag>{name}</Tag>
              </div>
              <div className="bg-accent-light rounded-sm shrink-0" style={{ width: val, height: '10px' }} />
              <span className="text-text-xsmall text-xs">{val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <SubLabel>Max-width tokens</SubLabel>
        <div className="flex flex-col gap-3">
          {MAX_WIDTH_TOKENS.map(([name, val, usage]) => (
            <div id={`token-${name}`} key={name} className="flex items-center gap-4">
              <div className="w-28 shrink-0">
                <Tag>{name}</Tag>
              </div>
              <div className="bg-accent-light rounded-sm shrink-0" style={{ width: val, height: '6px', maxWidth: '100%' }} />
              <div className="flex flex-col">
                <span className="text-text-xsmall text-xs">{val}</span>
                <span className="text-text-xxsmall text-xxs leading-snug">{usage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
