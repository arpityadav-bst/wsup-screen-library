'use client'

import { Section, SubLabel } from '../../helpers'
import DormancyBanner from '@/components/chat/DormancyBanner'

export default function DormancyBannerSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Dormancy Banner" title="Dormancy Banner" onVisible={onSectionVisible}>
      <div className="w-full max-w-[414px] flex flex-col gap-xl">
        <div>
          <SubLabel>Inactivity — Revive link shown</SubLabel>
          <div className="rounded-card overflow-hidden border border-white-10">
            <DormancyBanner variant="inactivity" />
          </div>
        </div>

        <div>
          <SubLabel>Moderation — Revive link shown</SubLabel>
          <div className="rounded-card overflow-hidden border border-white-10">
            <DormancyBanner variant="moderation" />
          </div>
        </div>

        <div>
          <SubLabel>Removed — no Revive link</SubLabel>
          <div className="rounded-card overflow-hidden border border-white-10">
            <DormancyBanner variant="removed" />
          </div>
        </div>

        <div>
          <SubLabel>Removed Footer (replaces chat input)</SubLabel>
          <div className="flex items-center justify-center px-m py-m bg-page-bg border border-white-10 rounded-card">
            <span className="text-xs text-white-40">Messaging isn&apos;t available for this character.</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
