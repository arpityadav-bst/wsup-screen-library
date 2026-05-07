'use client'

import BottomSheet from '@/components/ui/BottomSheet'
import CenterPopup from '@/components/ui/CenterPopup'
import CloseButton from '@/components/ui/CloseButton'
import CoinIcon from '@/components/ui/CoinIcon'
import CreditsBalancePill from '@/components/ui/CreditsBalancePill'
import { SignalIcon, CheckBadge, Chip } from './ModelPickerInternals'
import { MODELS, type Model, type ModelId, formatCost } from '@/lib/models'

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

function ModelRow({ model, selected, onSelect }: { model: Model; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex flex-col gap-xxs px-m py-s rounded-card text-left transition-colors w-full
                  ${selected
                    ? 'ring-2 ring-accent bg-accent/10'
                    : 'bg-white-05 border border-white-10 hover:bg-white-10'}`}
    >
      <div className="flex items-center gap-xs flex-wrap min-w-0 pr-9">
        <span className="text-sm font-semibold text-text-title leading-[16px]">{model.name}</span>
        <Chip><SignalIcon complexity={model.complexity} /></Chip>
        <Chip>{model.personality}</Chip>
        <Chip icon={<CoinIcon size={10} />}>{formatCost(model.cost)}</Chip>
      </div>
      <p className="text-xs text-text-body">{model.description}</p>
      {selected && (
        <div className="absolute top-1/2 -translate-y-1/2 right-m">
          <CheckBadge />
        </div>
      )}
    </button>
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
