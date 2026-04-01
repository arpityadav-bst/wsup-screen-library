'use client'

import { Section, SubLabel, Tag } from '../../helpers'
import DormantCharacterCard from '@/components/profile/DormantCharacterCard'
import RemovedCharacterCard from '@/components/profile/RemovedCharacterCard'

export default function LifecycleSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Lifecycle" title="Lifecycle" onVisible={onSectionVisible}>

      {/* State badges */}
      <div>
        <SubLabel>State Badges</SubLabel>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex flex-col items-start gap-2">
            <span className="inline-flex items-center gap-[4px] px-xs py-xxxs rounded-pill text-[11px] font-medium bg-white-10 text-text-small">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              Inactive
            </span>
            <Tag>Dormant inactive</Tag>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="inline-flex items-center gap-[4px] px-xs py-xxxs rounded-pill text-[11px] font-medium bg-status-warning/[0.12] text-status-warning">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Policy Review
            </span>
            <Tag>Dormant moderation</Tag>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="inline-flex items-center gap-[4px] px-xs py-xxxs rounded-pill text-[11px] font-medium bg-status-alert/[0.15] text-status-alert">
              Removed
            </span>
            <Tag>Removed</Tag>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="inline-flex items-center px-xs py-xxxs bg-status-alert rounded-pill text-[10px] font-medium text-white">
              Removed
            </span>
            <Tag>Chat header badge</Tag>
          </div>
        </div>
      </div>

      {/* Status dots */}
      <div>
        <SubLabel>Status Dots</SubLabel>
        <div className="flex flex-wrap gap-4 items-center">
          {[
            { color: '#398b4d', label: 'Active (status-positive)' },
            { color: '#ffc32a', label: 'Dormant (status-warning)' },
            { color: '#de5a48', label: 'Removed (status-alert)' },
            { color: 'rgba(255,255,255,0.4)', label: 'Inactive (white-40)' },
          ].map((d) => (
            <div key={d.label} className="flex items-center gap-xs">
              <span className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: d.color }} />
              <Tag>{d.label}</Tag>
            </div>
          ))}
        </div>
      </div>

      {/* Dormant cards */}
      {/* Card variants in grid */}
      <div className="w-full max-w-[414px]">
        <SubLabel>Dormant Cards (grid layout)</SubLabel>
        <div className="grid grid-cols-2 gap-s">
          <DormantCharacterCard
            name="Mika" img="/chars/char10.webp"
            stateType="inactive" chats="18.1K" daysUntilRemoval={42}
          />
          <DormantCharacterCard
            name="Joo Jaekyung" img="/chars/char12.webp"
            stateType="moderation" reason="IP infringement: manhwa character" chats="48.4K" daysUntilRemoval={38}
          />
        </div>
      </div>

      <div className="w-full max-w-[414px]">
        <SubLabel>Removed Card (grid layout)</SubLabel>
        <div className="grid grid-cols-2 gap-s">
          <RemovedCharacterCard
            name="Class 1A MHA" img="/chars/char15.webp"
            reason="Minor in inappropriate context" chats="19.7K"
          />
        </div>
      </div>

    </Section>
  )
}
