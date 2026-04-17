'use client'

import { useState } from 'react'
import { Section, SubLabel } from '../../helpers'
import CharacterStatesSheet from '@/components/profile/CharacterStatesSheet'
import LogoutConfirmSheet from '@/components/profile/LogoutConfirmSheet'
import Button from '@/components/ui/Button'

export default function ProfileOverlaysSection({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const [statesOpen, setStatesOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)

  return (
    <Section id="Profile Overlays" title="Profile Overlays" onVisible={onSectionVisible}>

      <div>
        <SubLabel>Tap to open overlays</SubLabel>
        <div className="flex flex-wrap gap-s">
          <Button variant="secondary" size="s" onClick={() => setStatesOpen(true)}>
            Character States Sheet
          </Button>
          <Button variant="secondary" size="s" onClick={() => setLogoutOpen(true)}>
            Logout Confirm
          </Button>
        </div>
      </div>

      <CharacterStatesSheet open={statesOpen} onClose={() => setStatesOpen(false)} />
      <LogoutConfirmSheet open={logoutOpen} onClose={() => setLogoutOpen(false)} onConfirm={() => setLogoutOpen(false)} />

    </Section>
  )
}
