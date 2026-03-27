'use client'

import { useState } from 'react'
import BottomSheet from '@/components/ui/BottomSheet'
import BadgeDetailPopup from './BadgeDetailPopup'
import type { Badge } from './BadgesWidget'

interface BadgesSheetProps {
  open: boolean
  onClose: () => void
  badges: Badge[]
}

export default function BadgesSheet({ open, onClose, badges }: BadgesSheetProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)

  return (
    <BottomSheet open={open} onClose={onClose} title="Badges" subtitle={`${badges.length} earned`} fillHeight>
      <div className="relative flex-1 min-h-0">
        <div className="h-full overflow-y-auto p-m pb-m" style={{ scrollbarWidth: 'none' }}>
          <div className="grid grid-cols-3 gap-s">
            {badges.map((b) => (
              <div
                key={b.label}
                onClick={() => setSelectedBadge(b)}
                className="flex flex-col items-center py-s px-s rounded-card bg-white-05 border border-white-10 cursor-pointer"
              >
                <div
                  className="flex items-center justify-center w-xxxl h-xxxl rounded-full text-lg mb-xs shrink-0"
                  style={{ background: `${b.color}15`, border: `1.5px solid ${b.color}35` }}
                >
                  {b.emoji}
                </div>
                <span className="text-xs text-text-subtitle font-medium text-center leading-tight w-full">{b.label}</span>
                <span className="text-xs text-text-xsmall text-center mt-xxs leading-tight">{b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BadgeDetailPopup badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </BottomSheet>
  )
}
