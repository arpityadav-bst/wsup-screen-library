'use client'

import { useState } from 'react'
import SubpageHeader from '@/components/ui/SubpageHeader'
import EmptyState from '@/components/ui/EmptyState'

interface BlockedCreator {
  name: string
  img: string
}

interface BlockedListViewProps {
  open: boolean
  onClose: () => void
  blocked: BlockedCreator[]
  /** 'fullscreen' = mobile slide-in overlay; 'sidebar' = desktop overlay inside the right sidebar */
  mode?: 'fullscreen' | 'sidebar'
}

/** Single list of blocked creators with per-row Unblock CTA.
 *  Surface anatomy mirrors SocialView (mobile fullscreen / desktop sidebar overlay), minus the tabbar — only one list lives here.
 *  CTA flips in place: "Unblock" (filled) ↔ "Blocked" (outlined). Single-tap, no confirm — taste rule:
 *  *deliberate-management-context relaxes confirmation friction*. The user navigated here to manage their blocked list;
 *  the friction was paid by the navigation itself. */
export default function BlockedListView({ open, onClose, blocked, mode = 'fullscreen' }: BlockedListViewProps) {
  const [unblocked, setUnblocked] = useState<Record<string, boolean>>({})

  if (!open) return null
  const isSidebar = mode === 'sidebar'

  const list = (
    <div className={`flex-1 min-h-0 overflow-y-auto ${isSidebar ? '' : 'pb-[72px]'}`} style={{ scrollbarWidth: 'none' }}>
      {blocked.length === 0 ? (
        <EmptyState variant="all-good" message="You haven't blocked anyone." />
      ) : blocked.map((b, i) => {
        const isUnblocked = unblocked[b.name]
        const toggle = () => setUnblocked(prev => ({ ...prev, [b.name]: !prev[b.name] }))
        const label = isUnblocked ? 'Blocked' : 'Unblock'
        const filled = !isUnblocked

        return (
          <div key={b.name} className={`flex items-center px-l py-s ${i < blocked.length - 1 ? 'border-b border-white-05' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.img} alt={b.name} className={`rounded-full object-cover shrink-0 bg-white-20 ${isSidebar ? 'w-xxxl h-xxxl' : 'w-2xxxl h-2xxxl'}`} />
            <span className={`flex-1 ml-s font-semibold text-text-title ${isSidebar ? 'text-sm' : 'text-base'}`}>{b.name}</span>
            <div
              onClick={toggle}
              className={`text-center w-[108px] py-xs rounded-pill text-sm font-semibold cursor-pointer shrink-0 transition-colors ${
                filled
                  ? 'bg-white-80 text-accent'
                  : 'bg-transparent border border-white-20 text-text-body'
              }`}
            >
              {label}
            </div>
          </div>
        )
      })}
    </div>
  )

  if (isSidebar) {
    return (
      <div className="absolute inset-0 bg-page-bg z-10 flex flex-col">
        <div className="flex items-center px-xs shrink-0 h-3xxxl">
          <button onClick={onClose} className="p-icon-btn rounded-full hover:bg-white-10 transition-colors text-white-90 border-none bg-transparent cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 16.8333 13.5" fill="none">
              <path d="M6.97727 0.5L0.5 6.75M0.5 6.75L6.97727 13M0.5 6.75H16.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="ml-xs text-base font-semibold text-text-title">Blocked creators</span>
        </div>
        <div className="h-px bg-white-10 shrink-0" />
        {list}
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-page-bg flex flex-col"
      style={{ animation: 'slide-in-right 0.26s cubic-bezier(0.32,0.72,0,1) forwards' }}
    >
      <SubpageHeader
        backLabel="Profile"
        onBack={onClose}
        right={<span className="font-semibold text-sm text-text-title">Blocked creators</span>}
      />
      {list}
    </div>
  )
}
