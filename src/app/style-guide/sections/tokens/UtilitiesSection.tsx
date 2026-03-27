'use client'

import { Section, SubLabel, Tag } from '../../helpers'

export default function UtilitiesSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <Section id="Utilities" title="Utilities" onVisible={onSectionVisible}>

      <div>
        <SubLabel>CSS Utility Classes</SubLabel>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4 bg-white-05 border border-white-10 rounded-card px-5 py-4">
            <span className="label-xs">Section Header Label</span>
            <Tag>label-xs</Tag>
            <span className="text-text-xsmall text-xs">10px · medium · text-small · tracked · uppercase</span>
          </div>
          <div className="flex flex-wrap gap-6 items-start">
            <div className="flex flex-col gap-2">
              <div className="w-[150px] h-[100px] glass rounded-card flex items-center justify-center">
                <span className="text-text-body text-sm">Glass surface</span>
              </div>
              <Tag>.glass</Tag>
              <span className="text-text-xxsmall text-xs">white-10 bg + backdrop-blur-bg</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-[150px] h-[100px] rounded-card overflow-hidden relative bg-white-10">
                <div className="char-overlay absolute inset-0" />
                <span className="absolute bottom-2 left-3 text-white text-xs">Overlay text</span>
              </div>
              <Tag>.char-overlay</Tag>
              <span className="text-text-xxsmall text-xs">black/85 → transparent gradient</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-[60px] h-[60px] placeholder-icon flex items-center justify-center">
                <span className="text-text-xxsmall text-xxs text-center leading-tight font-mono">.placeholder-icon</span>
              </div>
              <span className="text-text-xxsmall text-xs">white 10% fill + stroke</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SubLabel>Gradient Reference</SubLabel>
        <div className="flex flex-wrap gap-6 items-start">
          <div className="flex flex-col gap-2">
            <div className="w-[150px] h-[80px] rounded-card" style={{ background: 'linear-gradient(90deg, var(--color-gradient-purple), var(--color-gradient-blue))' }} />
            <Tag>Brand gradient</Tag>
            <span className="text-text-xxsmall text-xs">gradient-purple → gradient-blue</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-[150px] h-[80px] rounded-card bg-gradient-to-t from-black via-black-60 via-[38%] to-transparent to-[62%]" />
            <Tag>Card scrim</Tag>
            <span className="text-text-xxsmall text-xs">from-black via-black-60 via-[38%]</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-[150px] h-[80px] rounded-card bg-gradient-to-t from-accent/20 to-transparent" />
            <Tag>Hover accent tint</Tag>
            <span className="text-text-xxsmall text-xs">from-accent/20 to-transparent</span>
          </div>
        </div>
      </div>

    </Section>
  )
}
