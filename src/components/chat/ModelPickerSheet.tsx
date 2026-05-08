'use client'

import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import CloseButton from '@/components/ui/CloseButton'
import CreditsBalancePill from '@/components/ui/CreditsBalancePill'
import { ModelRow } from './ModelPickerInternals'
import { MODELS, type ModelId } from '@/lib/models'

interface ModelPickerSheetProps {
  open: boolean
  onClose: () => void
  selectedId: ModelId
  onSelect: (id: ModelId) => void
  creditsBalance: number
}

function PickerHeader({ creditsBalance, onClose }: { creditsBalance: number; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between px-l py-m shrink-0">
      <p className="font-semibold text-base text-text-title">Chat LLMs</p>
      <div className="flex items-center gap-s">
        <CreditsBalancePill label="Credits" value={creditsBalance} />
        <CloseButton onClose={onClose} />
      </div>
    </div>
  )
}

function PickerBody({ selectedId, onSelect, creditsBalance, onClose }: { selectedId: ModelId; onSelect: (id: ModelId) => void; creditsBalance: number; onClose: () => void }) {
  const handleSelect = (id: ModelId) => {
    onSelect(id)
    onClose()
  }
  return (
    <>
      <PickerHeader creditsBalance={creditsBalance} onClose={onClose} />
      <div className="flex flex-col gap-s px-l pb-l">
        {MODELS.map((m) => (
          <ModelRow
            key={m.id}
            model={m}
            selected={m.id === selectedId}
            onSelect={() => handleSelect(m.id)}
          />
        ))}
      </div>
    </>
  )
}

export default function ModelPickerSheet({ open, onClose, selectedId, onSelect, creditsBalance }: ModelPickerSheetProps) {
  return (
    <>
      <BottomSheet open={open} onClose={onClose} zIndex={70}>
        <div className="overflow-y-auto scroll-hide flex flex-col">
          <PickerBody selectedId={selectedId} onSelect={onSelect} creditsBalance={creditsBalance} onClose={onClose} />
        </div>
      </BottomSheet>
      <CenterPopup open={open} onClose={onClose} maxWidth="420px" zIndex={70}>
        <div className="flex flex-col">
          <PickerBody selectedId={selectedId} onSelect={onSelect} creditsBalance={creditsBalance} onClose={onClose} />
        </div>
      </CenterPopup>
    </>
  )
}
