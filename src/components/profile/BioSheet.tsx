'use client'

import { useEffect } from 'react'
import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'

interface BioSheetProps {
  open: boolean
  onClose: () => void
  name: string
  bio: string
}

function BioContent({ bio }: { bio: string }) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto p-l pb-m" style={{ scrollbarWidth: 'none' }}>
      <p className="text-sm text-text-subtitle leading-[1.75] whitespace-pre-line">{bio}</p>
    </div>
  )
}

export default function BioSheet({ open, onClose, name, bio }: BioSheetProps) {
  return (
    <>
      {/* Mobile */}
      <BottomSheet open={open} onClose={onClose} title={name} maxHeight="78%" fillHeight>
        <BioContent bio={bio} />
      </BottomSheet>

      {/* Desktop */}
      <CenterPopup open={open} onClose={onClose} title={name} maxWidth="520px">
        <BioContent bio={bio} />
      </CenterPopup>
    </>
  )
}
