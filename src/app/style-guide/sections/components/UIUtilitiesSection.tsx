'use client'

import { Section, SubLabel } from '../../helpers'
import AvatarRing from '@/components/ui/AvatarRing'
import TrendArrow from '@/components/ui/TrendArrow'
import SubpageHeader from '@/components/ui/SubpageHeader'
import MenuItem from '@/components/ui/MenuItem'

export default function UIUtilitiesSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="UI Utilities" title="UI Utilities" onVisible={onSectionVisible}>

      {/* AvatarRing */}
      <div>
        <SubLabel>AvatarRing</SubLabel>
        <div className="flex items-center gap-xl">
          <AvatarRing src="/chars/char5.webp" alt="Alex" size={48} />
          <AvatarRing src="/chars/char1.webp" alt="Blue Fire" size={64} />
          <AvatarRing src="/chars/char2.webp" alt="Magic Library" size={80} />
        </div>
      </div>

      {/* TrendArrow */}
      <div>
        <SubLabel>TrendArrow</SubLabel>
        <div className="flex items-center gap-xl">
          <div className="flex items-center gap-xs">
            <TrendArrow trend={5} />
            <span className="text-xs text-text-small">Up 5</span>
          </div>
          <div className="flex items-center gap-xs">
            <TrendArrow trend={-3} />
            <span className="text-xs text-text-small">Down 3</span>
          </div>
          <div className="flex items-center gap-xs">
            <TrendArrow trend={0} />
            <span className="text-xs text-text-small">No change</span>
          </div>
        </div>
      </div>

      {/* SubpageHeader */}
      <div className="w-full max-w-[414px]">
        <SubLabel>SubpageHeader</SubLabel>
        <div className="border border-white-10 rounded-card overflow-hidden">
          <SubpageHeader backLabel="Followers" onBack={() => {}} />
        </div>
      </div>

      {/* MenuItem */}
      <div className="w-full max-w-[300px]">
        <SubLabel>MenuItem</SubLabel>
        <div className="flex flex-col bg-white-05 border border-white-10 rounded-card overflow-hidden">
          <MenuItem label="Edit Character" onClick={() => {}} />
          <MenuItem label="Share" onClick={() => {}} />
          <MenuItem label="Delete" onClick={() => {}} destructive />
        </div>
      </div>

    </Section>
  )
}
