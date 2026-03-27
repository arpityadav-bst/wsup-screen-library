'use client'

import ColorsSection from './tokens/ColorsSection'
import TypographySection from './tokens/TypographySection'
import SpacingSection from './tokens/SpacingSection'
import RadiusSection from './tokens/RadiusSection'
import ShadowsSection from './tokens/ShadowsSection'
import BlurSection from './tokens/BlurSection'
import UtilitiesSection from './tokens/UtilitiesSection'

export default function TokensTab({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  return (
    <>
      <ColorsSection onSectionVisible={onSectionVisible} />
      <TypographySection onSectionVisible={onSectionVisible} />
      <SpacingSection onSectionVisible={onSectionVisible} />
      <RadiusSection onSectionVisible={onSectionVisible} />
      <ShadowsSection onSectionVisible={onSectionVisible} />
      <BlurSection onSectionVisible={onSectionVisible} />
      <UtilitiesSection onSectionVisible={onSectionVisible} />
    </>
  )
}
