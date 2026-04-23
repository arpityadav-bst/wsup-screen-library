'use client'

import { Section, SubLabel, Tag } from '../../helpers'
import Badge from '@/components/ui/Badge'

export default function TagsCardsSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Tags & Cards" title="Tags & Cards" onVisible={onSectionVisible}>

      <div>
        <SubLabel>Tags / Pills</SubLabel>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex flex-col items-start gap-2">
            <span className="text-xxs font-normal px-xs py-[3px] rounded-pill bg-white-10 backdrop-blur-bg text-white-80 border border-white-10">
              Default
            </span>
            <Tag>Default</Tag>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-xxs font-normal px-xs py-[3px] rounded-pill bg-status-alert text-white">
              Alert
            </span>
            <Tag>Status alert</Tag>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-xxs font-normal px-xs py-[3px] rounded-pill bg-accent/20 backdrop-blur-bg text-accent-light border border-accent/30">
              Category
            </span>
            <Tag>Accent tint</Tag>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Badge Component</SubLabel>
        <p className="text-text-xsmall text-xs mb-3">Status badge for lightweight state indicators. Component: <code className="text-accent-light">{'<Badge>'}</code> in <code className="text-accent-light">src/components/ui/Badge.tsx</code>. Sentence case, `font-medium`, tinted bg + border per variant. Use for completion/verification state labels (&quot;Deposited&quot;, &quot;Verified&quot;, &quot;Failed&quot;, etc.).</p>
        <div className="flex flex-wrap gap-s items-center">
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="success">Deposited</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="alert">Failed</Badge>
        </div>
      </div>

      <div>
        <SubLabel>Cards</SubLabel>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-2">
            <div className="w-[140px] h-[200px] bg-card-bg border border-card-border rounded-card relative overflow-hidden hover:border-card-hover-border transition-all">
              <div className="absolute inset-0 bg-white-05" />
              <div className="absolute bottom-0 left-0 right-0 p-xs">
                <p className="text-text-title text-xs font-semibold truncate">Character Name</p>
                <p className="text-text-body text-xxs truncate">Description text here</p>
              </div>
            </div>
            <Tag>card-bg / card-border</Tag>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-[140px] h-[200px] bg-card-hover-bg border border-card-hover-border rounded-card relative overflow-hidden transition-all">
              <div className="absolute inset-0 bg-white-05" />
              <div className="absolute bottom-0 left-0 right-0 p-xs">
                <p className="text-text-title text-xs font-semibold truncate">Character Name</p>
                <p className="text-text-body text-xxs truncate">Description text here</p>
              </div>
            </div>
            <Tag>Hover state</Tag>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Chat Bubbles</SubLabel>
        <div className="flex flex-col gap-3 max-w-[300px]">
          <div className="self-end bg-chat-user-bubble text-white text-sm px-m py-xs rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl max-w-[80%]">
            Hey, what's up?
          </div>
          <div className="self-start bg-chat-ai-bubble text-text-body text-sm px-m py-xs rounded-tl-2xl rounded-tr-2xl rounded-br-2xl max-w-[80%]">
            Not much, just here to chat!
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Navigation Item</SubLabel>
        <div className="flex flex-col gap-1 w-[240px] bg-white-05 rounded-card p-2">
          <div className="flex items-center gap-xs px-xl py-m rounded-card text-text-title text-xs font-normal" style={{ backgroundImage: 'linear-gradient(90deg, rgba(114,233,241,0.1) 0%, rgba(113,146,229,0.1) 50%, rgba(98,87,215,0.1) 100%), linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%)' }}>
            <div className="w-4 h-4 rounded-sm bg-white-20 shrink-0" />
            Explore
          </div>
          <div className="flex items-center gap-xs px-xl py-m rounded-card text-white-70 text-xs font-normal hover:bg-white-05">
            <div className="w-4 h-4 rounded-sm bg-white-10 shrink-0" />
            Stories
          </div>
        </div>
        <div className="flex gap-3 mt-3">
          <Tag>Active: gradient bg + text-text-title</Tag>
          <Tag>Inactive: text-white-70 + hover:bg-white-05</Tag>
        </div>
      </div>

    </Section>
  )
}
