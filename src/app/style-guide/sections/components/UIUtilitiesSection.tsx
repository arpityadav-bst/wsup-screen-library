'use client'

import { Section, SubLabel } from '../../helpers'
import AvatarRing from '@/components/ui/AvatarRing'
import TrendArrow from '@/components/ui/TrendArrow'
import SubpageHeader from '@/components/ui/SubpageHeader'
import MenuItem from '@/components/ui/MenuItem'
import CloseButton from '@/components/ui/CloseButton'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'

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

      {/* EmptyState */}
      <div>
        <SubLabel>EmptyState</SubLabel>
        <p className="text-xs text-text-small mb-s max-w-[520px]">
          Centered emoji + dim caption + optional CTA child. Container has <code className="text-text-title">py-4xl px-l</code> for breathing space at viewport edges; message is capped at <code className="text-text-title">max-w-[420px]</code> for comfortable read-line length on wider columns. Use over hand-rolled empty placeholders. Six variants — emoji is variant-driven, message is per-instance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-m max-w-[760px]">
          <div className="bg-white-05 border border-white-10 rounded-card overflow-hidden">
            <EmptyState variant="default" message="Nothing here yet." />
          </div>
          <div className="bg-white-05 border border-white-10 rounded-card overflow-hidden">
            <EmptyState variant="no-active" message="No active characters" />
          </div>
          <div className="bg-white-05 border border-white-10 rounded-card overflow-hidden">
            <EmptyState variant="all-good" message="Nothing needs attention" />
          </div>
          <div className="bg-white-05 border border-white-10 rounded-card overflow-hidden">
            <EmptyState variant="no-removed" message="No removed characters" />
          </div>
          <div className="bg-white-05 border border-white-10 rounded-card overflow-hidden">
            <EmptyState variant="create" message="Create your first character">
              <Button variant="primary" size="m">Create Character</Button>
            </EmptyState>
          </div>
          <div className="bg-white-05 border border-white-10 rounded-card overflow-hidden">
            <EmptyState variant="blocked" message="You blocked Honeybadger. Their characters and stories are hidden. Unblock to see them again." />
          </div>
        </div>
      </div>

      {/* CloseButton */}
      <div>
        <SubLabel>CloseButton</SubLabel>
        <p className="text-xs text-text-small mb-s max-w-[520px]">
          Canonical X primitive for sheets, modals, sidebars, and dismissible banners. Use over hand-rolled inline buttons. Accepts <code className="text-text-title">size</code> (default 20) and <code className="text-text-title">className</code> overrides via twMerge — pass <code className="text-text-title">text-white-50</code> or <code className="text-text-title">p-xxs</code> to swap defaults.
        </p>
        <div className="flex items-center gap-xl">
          <div className="flex flex-col items-center gap-xxs">
            <CloseButton onClose={() => {}} />
            <span className="text-xs text-text-small">Default · 20px</span>
          </div>
          <div className="flex flex-col items-center gap-xxs">
            <CloseButton onClose={() => {}} size={16} />
            <span className="text-xs text-text-small">Compact · 16px</span>
          </div>
          <div className="flex flex-col items-center gap-xxs">
            <CloseButton onClose={() => {}} size={16} className="p-xxs text-white-50 hover:text-white-90 hover:bg-transparent" />
            <span className="text-xs text-text-small">Banner · muted</span>
          </div>
        </div>
      </div>

    </Section>
  )
}
