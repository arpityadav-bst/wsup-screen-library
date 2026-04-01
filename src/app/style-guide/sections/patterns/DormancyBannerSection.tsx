'use client'

import { Section, SubLabel } from '../../helpers'
import DormancyBanner from '@/components/chat/DormancyBanner'

export default function DormancyBannerSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Dormancy Banner" title="Dormancy Banner" onVisible={onSectionVisible}>
      <div className="w-full max-w-[414px] flex flex-col gap-6">
        <div>
          <SubLabel>Inactivity — gray subtle</SubLabel>
          <div className="rounded-card overflow-hidden border border-white-10">
            <DormancyBanner variant="inactivity" />
          </div>
        </div>

        <div>
          <SubLabel>Moderation — yellow tint</SubLabel>
          <div className="rounded-card overflow-hidden border border-white-10">
            <DormancyBanner variant="moderation" />
          </div>
        </div>

        <div>
          <SubLabel>Removed — red tint</SubLabel>
          <div className="rounded-card overflow-hidden border border-white-10">
            <DormancyBanner variant="removed" />
          </div>
        </div>

        <div>
          <SubLabel>Removed Footer (replaces chat input)</SubLabel>
          <div className="flex items-center justify-center px-m py-m bg-page-bg border border-white-10 rounded-card">
            <span className="text-[13px] text-white-40">This character is no longer available.</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
